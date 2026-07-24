import assert from 'node:assert/strict';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import sharp from 'sharp';
import config from '../astro.config.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const siteOrigin = 'https://biosked.com';
const blogSourceDirs = [
  path.join(projectRoot, 'src/pages/blog/posts'),
  path.join(projectRoot, 'src/pages/fr/blog'),
];
const forbiddenBlogSourcePatterns = [
  { pattern: /\[\/?et_pb_[^\]]*\]/i, label: 'Divi shortcode' },
  { pattern: /\bet_pb_[\w-]*/i, label: 'Divi builder markup' },
  { pattern: /@ET-DC@|\b(?:fb_built|_builder_version|theme_builder_area|global_colors_info)\s*=/i, label: 'Divi builder token' },
  { pattern: /<!--\s*\/?wp:/i, label: 'WordPress block marker' },
  { pattern: /\[\/?(?:vc_|fusion_|elementor)[^\]]*\]/i, label: 'legacy page-builder shortcode' },
  { pattern: /(?:[?&]|&amp;)_gl=/i, label: 'historical Google Analytics linker token' },
  {
    pattern: /^(?:\t| {4,})<\/?(?:a|article|blockquote|br|code|div|em|figure|figcaption|h[1-6]|iframe|img|li|ol|p|picture|pre|section|span|strong|table|tbody|td|th|thead|tr|ul|video)\b/im,
    label: 'indented HTML that Markdown would expose as code',
  },
];
const visibleBlogLeakPatterns = [
  {
    pattern: /\[\/?(?:et_pb_|vc_|fusion_|elementor)[^\]]*\]/i,
    label: 'page-builder shortcode',
  },
  {
    pattern: /@ET-DC@|\b(?:fb_built|_builder_version|theme_builder_area|global_colors_info)\s*=/i,
    label: 'page-builder token',
  },
  {
    pattern: /(?:&(?:amp;)*lt;|&#0*60;|&#x0*3c;)\s*\/?\s*(?:a|article|blockquote|br|code|div|em|figure|figcaption|h[1-6]|iframe|img|li|ol|p|picture|pre|section|span|strong|table|tbody|td|th|thead|tr|ul|video)\b/i,
    label: 'escaped structural HTML',
  },
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  }));
  return nested.flat();
}

function attributes(tag) {
  const parsed = {};
  for (const match of tag.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    const name = match[1].replace(/^</, '').toLowerCase();
    parsed[name] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return parsed;
}

function metaContent(html, attribute, value) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/gsi)]
    .map((match) => attributes(match[0]))
    .find((attrs) => attrs[attribute] === value);
  return tag?.content;
}

function linkHref(html, rel) {
  const tag = [...html.matchAll(/<link\b[^>]*>/gsi)]
    .map((match) => attributes(match[0]))
    .find((attrs) => (attrs.rel ?? '').split(/\s+/).includes(rel));
  return tag?.href;
}

function executeRedirect(html, search, hash) {
  const openingTag = '<script>';
  const start = html.indexOf(openingTag);
  const end = html.indexOf('</script>', start + openingTag.length);
  assert.ok(start >= 0 && end > start, 'redirect page must contain an executable redirect script');
  const script = html.slice(start + openingTag.length, end);
  let redirectedTo = null;
  runInNewContext(script, {
    URLSearchParams,
    Set,
    location: {
      search,
      hash,
      replace(value) {
        redirectedTo = value;
      },
    },
  });
  return redirectedTo;
}

function titleText(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
}

function navbarIsland(html) {
  return html.match(/<astro-island\b[^>]*component-export=["']NavbarActions["'][^>]*>/i)?.[0];
}

function localOutputPath(urlString) {
  const url = new URL(urlString, siteOrigin);
  if (url.origin !== siteOrigin) return null;
  const pathname = decodeURIComponent(url.pathname);
  if (path.extname(pathname)) return path.join(distDir, pathname.slice(1));
  return path.join(distDir, pathname.slice(1), 'index.html');
}

function expectedOpenGraphLocale(canonicalUrl) {
  const pathname = new URL(canonicalUrl).pathname;
  if (pathname === '/fr-ch' || pathname.startsWith('/fr-ch/')) return 'fr_CH';
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr_FR';
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de_DE';
  if (pathname === '/nl' || pathname.startsWith('/nl/')) return 'nl_NL';
  if (pathname === '/it' || pathname.startsWith('/it/')) return 'it_IT';
  return 'en_US';
}

function withoutNonVisibleMarkup(html) {
  return html
    .replace(/<(?:script|style|noscript|template|svg)\b[^>]*>[\s\S]*?<\/(?:script|style|noscript|template|svg)>/gi, '')
    .replace(/<!--([\s\S]*?)-->/g, '');
}

function mainContent(html, context) {
  const content = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert.ok(content, `${context} must contain a main content landmark`);
  return content;
}

async function assertLocalUrlExists(urlString, context) {
  const outputPath = localOutputPath(urlString);
  if (!outputPath) return;
  await assert.doesNotReject(
    access(outputPath),
    `${context} points to a missing build artifact: ${urlString}`,
  );
}

function collectStructuredAssets(value, key = '') {
  const assetKeys = new Set(['image', 'logo', 'screenshot', 'thumbnailUrl', 'contentUrl']);
  const direct = assetKeys.has(key)
    ? typeof value === 'string'
      ? [value]
      : value && typeof value === 'object' && typeof value.url === 'string'
        ? [value.url]
        : []
    : [];

  if (Array.isArray(value)) {
    return [...direct, ...value.flatMap((item) => collectStructuredAssets(item, key))];
  }
  if (value && typeof value === 'object') {
    return [
      ...direct,
      ...Object.entries(value).flatMap(([childKey, childValue]) =>
        collectStructuredAssets(childValue, childKey),
      ),
    ];
  }
  return direct;
}

await access(distDir);
const htmlFiles = (await walk(distDir)).filter((file) => file.endsWith('.html'));
const blogSourceFiles = (await Promise.all(blogSourceDirs.map((directory) => walk(directory))))
  .flat()
  .filter((file) => file.endsWith('.md'));
const expectedBlogOutputPaths = new Set(blogSourceFiles.map((file) => {
  const relativeSourcePath = path.relative(projectRoot, file).split(path.sep).join('/');
  const outputStem = relativeSourcePath
    .replace(/^src\/pages\//, '')
    .replace(/\.md$/, '');
  return `${outputStem}/index.html`;
}));
assert.equal(
  expectedBlogOutputPaths.size,
  blogSourceFiles.length,
  'blog source files must map to unique output routes',
);
for (const file of blogSourceFiles) {
  const source = await readFile(file, 'utf8');
  const relativePath = path.relative(projectRoot, file);
  for (const { pattern, label } of forbiddenBlogSourcePatterns) {
    assert.doesNotMatch(source, pattern, `${relativePath} contains ${label} that can leak into rendered content`);
  }
}
const sitemapText = await readFile(path.join(distDir, 'sitemap-0.xml'), 'utf8');
const sitemapUrls = new Set([...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
let checkedPages = 0;
let checkedImages = 0;
let checkedStructuredAssets = 0;
let checkedBlogPages = 0;
const builtBlogOutputPaths = new Set();
const sitemapTitles = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relativePath = path.relative(distDir, file);
  const relativePathPosix = relativePath.split(path.sep).join('/');
  const isRedirect = /<meta\b[^>]*http-equiv=["']refresh["']/i.test(html);
  if (isRedirect) continue;

  const isBlogArticle = /^(?:blog\/posts|fr\/blog)\/.+\/index\.html$/.test(relativePathPosix);
  if (isBlogArticle) {
    const visibleMarkup = withoutNonVisibleMarkup(html);
    for (const { pattern, label } of visibleBlogLeakPatterns) {
      assert.doesNotMatch(visibleMarkup, pattern, `${relativePath} exposes ${label} to readers`);
    }
    assert.doesNotMatch(
      html,
      /(?:[?&]|&amp;)_gl=/i,
      `${relativePath} contains a historical Google Analytics linker token`,
    );
    checkedBlogPages += 1;
    builtBlogOutputPaths.add(relativePathPosix);
  }

  checkedPages += 1;
  const pageTitle = titleText(html);
  assert.ok(pageTitle, `${relativePath} is missing a title`);
  const description = metaContent(html, 'name', 'description');
  assert.ok(description, `${relativePath} is missing a meta description`);
  const robots = metaContent(html, 'name', 'robots') ?? '';
  const isIndexable = !/(^|\s|,)noindex(,|\s|$)/.test(robots);
  const routePath = relativePath === 'index.html' ? '/' : `/${relativePath.replace(/index\.html$/, '')}`;
  const isInSitemap = sitemapUrls.has(`${siteOrigin}${routePath}`);
  if (isInSitemap && !routePath.startsWith('/fr-ch/')) {
    sitemapTitles.set(pageTitle, [...(sitemapTitles.get(pageTitle) ?? []), routePath]);
  }
  if (isIndexable && isInSitemap) {
    assert.ok(description.length >= 70, `${relativePath} meta description must be at least 70 characters; found ${description.length}`);
    for (const match of html.matchAll(/<a\b[^>]*>/gsi)) {
      const href = attributes(match[0]).href;
      if (!href?.startsWith('/') || href.startsWith('//')) continue;
      const pathname = new URL(href, siteOrigin).pathname;
      if (pathname === '/' || path.posix.extname(pathname)) continue;
      assert.ok(pathname.endsWith('/'), `${relativePath} links to a non-canonical directory URL: ${href}`);
    }
  }
  const h1Count = [...html.matchAll(/<h1\b[^>]*>/gsi)].length;
  if (isIndexable) {
    assert.equal(h1Count, 1, `${relativePath} must contain exactly one h1; found ${h1Count}`);
  }
  const canonicalUrl = linkHref(html, 'canonical');
  assert.ok(canonicalUrl, `${relativePath} is missing a canonical URL`);

  const isNotFoundPage = relativePath === '404.html' || /(^|\/)404\/index\.html$/.test(relativePath);
  if (isNotFoundPage) {
    assert.match(
      metaContent(html, 'name', 'robots') ?? '',
      /(^|\s|,)noindex(,|\s|$)/,
      `${relativePath} must be noindex`,
    );
  }

  const openGraphUrl = metaContent(html, 'property', 'og:url');
  const openGraphLocale = metaContent(html, 'property', 'og:locale');
  assert.equal(openGraphUrl, canonicalUrl, `${relativePath} og:url must match its canonical URL`);
  assert.equal(
    openGraphLocale,
    expectedOpenGraphLocale(canonicalUrl),
    `${relativePath} og:locale must match its canonical locale`,
  );

  const twitterUrl = metaContent(html, 'name', 'twitter:url');
  assert.equal(twitterUrl, canonicalUrl, `${relativePath} twitter:url must match its canonical URL`);
  assert.equal(
    metaContent(html, 'name', 'twitter:card'),
    'summary_large_image',
    `${relativePath} must use a large-image X card`,
  );

  for (const match of html.matchAll(/<img\b[^>]*>/gsi)) {
    const attrs = attributes(match[0]);
    assert.ok(Object.hasOwn(attrs, 'alt'), `${relativePath} contains an image without an alt attribute: ${match[0].slice(0, 180)}`);
    checkedImages += 1;
  }

  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gsi)) {
    let data;
    assert.doesNotThrow(() => {
      data = JSON.parse(match[1]);
    }, `${relativePath} contains invalid JSON-LD`);

    for (const assetUrl of collectStructuredAssets(data)) {
      await assertLocalUrlExists(assetUrl, `${relativePath} JSON-LD`);
      checkedStructuredAssets += 1;
    }
  }

  const openGraphImage = metaContent(html, 'property', 'og:image');
  assert.ok(openGraphImage, `${relativePath} is missing og:image`);
  await assertLocalUrlExists(openGraphImage, `${relativePath} og:image`);

  const twitterImage = metaContent(html, 'name', 'twitter:image');
  assert.ok(twitterImage, `${relativePath} is missing twitter:image`);
  await assertLocalUrlExists(twitterImage, `${relativePath} twitter:image`);
}

assert.equal(
  checkedBlogPages,
  blogSourceFiles.length,
  `built blog coverage must match source inventory; checked ${checkedBlogPages}, found ${blogSourceFiles.length} sources`,
);
assert.deepEqual(
  [...builtBlogOutputPaths].sort(),
  [...expectedBlogOutputPaths].sort(),
  'non-redirect blog output routes must exactly match their source files',
);

const aiRadiologyArticle = await readFile(
  path.join(distDir, 'fr/blog/lintelligence-artificielle-peut-elle-remplacer-a-terme-lactivite-du-radiologue/index.html'),
  'utf8',
);
assert.match(
  aiRadiologyArticle,
  /<em>« La spécialité n’est pas en concurrence avec l’IA\.[\s\S]{0,1800}»,<\/em>\s+finit par conclure Alexandre Nérot\./,
  'AI radiology article must render the quotation as emphasis without exposing Markdown delimiters',
);

const replacementArticle = await readFile(
  path.join(distDir, 'fr/blog/comment-gerer-les-remplacements-en-centre-de-radiologie/index.html'),
  'utf8',
);
assert.match(
  replacementArticle,
  /prévues par<\/em>\s+<a\b[^>]*>\s*<em>l’article L\.4131-2<\/em><\/a>/,
  'replacement article must retain a visible word boundary before its legal link',
);

const emergencySchedulingArticle = await readFile(
  path.join(distDir, 'fr/blog/optimiser-les-plannings-dequipes-dans-les-services-durgence/index.html'),
  'utf8',
);
assert.match(
  emergencySchedulingArticle,
  /href="\/fr\/cas-clients\/chu-angers\/"[^>]*>Télécharger l’étude<\/a>\s*<\/p>\s*<p\b[\s\S]{0,300}?En conclusion, Momentum/,
  'emergency scheduling CTA and conclusion must remain separate paragraphs',
);

const expectedHardBreaks = [
  {
    outputPath: 'fr/blog/etat-des-lieux-de-la-medecine-en-cardiologie-et-des-maladies-cardiovasculaires-en-france/index.html',
    associations: [
      /France \?<br>\s*Prévalence/,
      /graves\.<br>\s*Cartographie/,
      /France<br>\s*Tout d’abord/,
      /hommes\)\.<br>\s*De plus/,
    ],
  },
  {
    outputPath: 'fr/blog/momentum-pour-les-anesthesistes/index.html',
    associations: [/opératoires\.<br>\s*En quelques clics/],
  },
  {
    outputPath: 'fr/blog/nouveaute-momentum-une-vue-par-shift-pour-une-meilleure-coordination-sur-le-terrain/index.html',
    associations: [
      /<strong\b[^>]*>shifts<\/strong> :<br>\s*☀️/,
      /terrain\.<br>\s*✅/,
      /moment\.<br>\s*✅/,
      /privés<br>\s*📸/,
      /médicale<br>\s*🚑/,
      /d’urgence<br>\s*💉/,
      /opératoires<br>\s*…/,
      /personnalisée\.<br>\s*Contactez-nous/,
    ],
  },
  {
    outputPath: 'fr/blog/optimisez-vos-plannings-dequipes-durgence-avec-lia-decouvrez-momentum-au-congres-des-urgences-2025/index.html',
    associations: [/optimisés\.<br>\s*<strong\b[^>]*>Résultat/],
  },
  {
    outputPath: 'fr/blog/pourquoi-prioriser-et-optimiser-la-planification-de-son-etablissement-de-sante/index.html',
    associations: [
      /prouver\.<br>\s*Les logiciels/,
      /médicales\.<br>\s*Ces logiciels/,
    ],
  },
];
for (const { outputPath, associations } of expectedHardBreaks) {
  const html = await readFile(path.join(distDir, outputPath), 'utf8');
  const content = mainContent(html, outputPath);
  assert.equal(
    [...content.matchAll(/<br\b/g)].length,
    associations.length,
    `${outputPath} must retain exactly ${associations.length} editorial hard break(s)`,
  );
  for (const association of associations) {
    assert.match(content, association, `${outputPath} must retain its original line-break association`);
  }
}

const expectedNewTabAnchors = [
  ['fr/blog/biosked-reinvente-la-planification-des-equipes-medicales-avec-la-nouvelle-version-de-momentum/index.html', '/fr/demo/', 'Demander une démo'],
  ['fr/blog/maitriser-la-planification-des-equipes-anesthesistes-et-iades-avec-momentum/index.html', '/fr/secteurs-soins/anesthesie/', 'Lire la suite'],
  ['fr/blog/momentum-pour-les-anesthesistes/index.html', '/fr/ressources/', 'Demandez votre démo personnalisée'],
  ['fr/blog/optimiser-la-planification-en-radiologie/index.html', '/fr/cas-clients/imagir-bordeaux/', 'Téléchargez l’étude de cas'],
  ['fr/blog/optimiser-les-plannings-dequipes-dans-les-services-durgence/index.html', '/fr/cas-clients/chu-angers/', 'Télécharger l’étude'],
  ['fr/blog/optimiser-les-plannings-dequipes-dans-les-services-durgence/index.html', '/fr/secteurs-soins/urgences/', 'Lire la suite'],
  ['fr/blog/pourquoi-prioriser-et-optimiser-la-planification-de-son-etablissement-de-sante/index.html', '/fr/ressources/', 'Télécharger notre Livre Blanc'],
];
for (const [outputPath, href, text] of expectedNewTabAnchors) {
  const html = await readFile(path.join(distDir, outputPath), 'utf8');
  const content = mainContent(html, outputPath);
  const anchor = [...content.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gsi)]
    .find((match) => match[1].replace(/<[^>]+>/g, '').trim() === text);
  assert.ok(anchor, `${outputPath} must retain the “${text}” link`);
  const attrs = attributes(anchor[0]);
  assert.equal(attrs.href, href, `${outputPath} “${text}” href changed`);
  assert.equal(attrs.target, '_blank', `${outputPath} “${text}” must retain target=_blank`);
  const rel = new Set((attrs.rel ?? '').split(/\s+/));
  assert.ok(rel.has('noopener') && rel.has('noreferrer'), `${outputPath} “${text}” must secure its new tab`);
}

const anesthesiaLaunchArticle = await readFile(
  path.join(distDir, 'fr/blog/momentum-pour-les-anesthesistes/index.html'),
  'utf8',
);
const anesthesiaLaunchContent = mainContent(
  anesthesiaLaunchArticle,
  'fr/blog/momentum-pour-les-anesthesistes/index.html',
);
const anesthesiaLaunchVisibleText = anesthesiaLaunchContent.replace(/<[^>]+>/g, '');
assert.match(
  anesthesiaLaunchVisibleText,
  /contactez-nous sur info@biosked\.com ou demandez/,
  'anesthesia launch article must keep the visible info@biosked.com address',
);
assert.doesNotMatch(
  anesthesiaLaunchContent,
  /href=["']mailto:info@biosked\.com/i,
  'anesthesia launch article must keep info@biosked.com as plain text',
);

for (const [pageTitle, routes] of sitemapTitles) {
  assert.equal(routes.length, 1, `sitemap pages must have unique titles; "${pageTitle}" is used by ${routes.join(', ')}`);
}

const homepageRoutes = ['', 'fr', 'fr-ch', 'de', 'nl', 'it'];
for (const route of homepageRoutes) {
  const label = route || 'en';
  const html = await readFile(path.join(distDir, route, 'index.html'), 'utf8');
  const pageTitle = titleText(html);
  const pageDescription = metaContent(html, 'name', 'description');
  assert.ok(pageTitle.length >= 30 && pageTitle.length <= 60, `${label} home title must be 30-60 characters; found ${pageTitle.length}`);
  assert.ok(pageDescription.length >= 120 && pageDescription.length <= 160, `${label} home description must be 120-160 characters; found ${pageDescription.length}`);
  assert.equal(linkHref(html, 'canonical'), `${siteOrigin}/${route ? `${route}/` : ''}`, `${label} home canonical URL is incorrect`);
}

const englishHomepage = await readFile(path.join(distDir, 'index.html'), 'utf8');
const englishHomepageImages = [...englishHomepage.matchAll(/<img\b[^>]*>/gsi)]
  .map((match) => attributes(match[0]));
const phoneImageTag = [...englishHomepage.matchAll(/<img\b[^>]*>/gsi)]
  .map((match) => attributes(match[0]))
  .find((attrs) => attrs.alt === 'MM Mobile');
assert.ok(phoneImageTag?.srcset, 'home mobile-app preview must use a responsive srcset');
assert.ok(phoneImageTag?.sizes, 'home mobile-app preview must declare responsive sizes');
assert.equal(phoneImageTag?.loading, 'lazy', 'hidden home mobile-app preview must not load eagerly on small screens');
assert.equal(phoneImageTag?.fetchpriority, 'low', 'hidden home mobile-app preview must have low fetch priority');
const frenchHomepage = await readFile(path.join(distDir, 'fr/index.html'), 'utf8');
const frenchSwissHomepage = await readFile(path.join(distDir, 'fr-ch/index.html'), 'utf8');
const frenchPhoneImageTag = [...frenchHomepage.matchAll(/<img\b[^>]*>/gsi)]
  .map((match) => attributes(match[0]))
  .find((attrs) => (attrs.alt ?? '').startsWith('Application mobile Momentum'));
assert.equal(frenchPhoneImageTag?.loading, 'lazy', 'hidden French mobile-app preview must not load eagerly on small screens');
assert.equal(frenchPhoneImageTag?.fetchpriority, 'low', 'hidden French mobile-app preview must have low fetch priority');
const heroScreenshotTag = [...englishHomepage.matchAll(/<img\b[^>]*>/gsi)]
  .map((match) => attributes(match[0]))
  .find((attrs) => attrs.id === 'hero-image');
assert.match(heroScreenshotTag?.sizes ?? '', /calc\(100vw - 3rem\)/, 'home hero screenshot sizes must reflect mobile container padding');
assert.match(heroScreenshotTag?.srcset ?? '', /\s400w(?:,|$)/, 'home hero screenshot must include a 400px candidate');
assert.match(heroScreenshotTag?.srcset ?? '', /\s1280w(?:,|$)/, 'home hero screenshot must include a 1280px candidate');
const rvuImageTag = englishHomepageImages.find((attrs) => attrs.alt === 'RVU Scheduling');
assert.match(rvuImageTag?.srcset ?? '', /\s240w(?:,|$)/, 'home RVU image must include a 240px candidate');
assert.match(rvuImageTag?.srcset ?? '', /\s320w(?:,|$)/, 'home RVU image must include a 320px candidate');
assert.match(rvuImageTag?.srcset ?? '', /\s640w(?:,|$)/, 'home RVU image must include a 640px candidate');
const expectedRvuSizes = '(min-width: 640px) 384px, (min-width: 494px) 256px, calc(66.667vw - 4.583rem)';
assert.equal(rvuImageTag?.sizes, expectedRvuSizes, 'home RVU sizes must reflect its mobile width and 256px cap');
for (const relativePath of [
  'src/components/sections/RVU.astro',
  'src/components/sections/fr/RVU.astro',
]) {
  const component = await readFile(path.join(projectRoot, relativePath), 'utf8');
  assert.match(
    component,
    /class="[^"]*\bw-full\b[^"]*\bmax-w-sm\b[^"]*"/,
    `${relativePath} must give the responsive image wrapper an explicit width`,
  );
}
const quoteImageTags = englishHomepageImages.filter((attrs) => (attrs.src ?? '').includes('/quote.'));
assert.ok(quoteImageTags.length > 0, 'home testimonials must render decorative quote marks');
for (const quoteImageTag of quoteImageTags) {
  assert.equal(quoteImageTag.alt, '', 'decorative quote marks must retain an empty alt attribute');
  assert.equal(quoteImageTag.width, '35', 'decorative quote marks must retain their intrinsic width');
  assert.equal(quoteImageTag.height, '31', 'decorative quote marks must retain their intrinsic height');
  assert.match(quoteImageTag.class ?? '', /(?:^|\s)h-auto(?:\s|$)/, 'decorative quote marks must preserve their aspect ratio');
}
for (const relativePath of [
  'src/components/sections/TestimonialsCarouselSection.tsx',
  'src/components/sections/fr/TestimonialsCarouselSection.tsx',
]) {
  const component = await readFile(path.join(projectRoot, relativePath), 'utf8');
  const footerClass = component.match(/<div className="([^"]*\bmt-auto\b[^"]*)">/)?.[1] ?? '';
  assert.ok(footerClass, `${relativePath} must pin every testimonial identity row to the card bottom`);
  assert.match(footerClass, /(?:^|\s)sm:items-end(?:\s|$)/, `${relativePath} must bottom-align identity and logo content on card rows`);
  assert.doesNotMatch(footerClass, /(?:^|\s)mb-4(?:\s|$)/, `${relativePath} must not float identity rows above the card padding`);
}
for (const [alt, assetStem, extension = 'webp'] of [
  ['Rochester Regional Health', 'rrh'],
  ['Lakewood Health System', 'lakewood'],
  ['Washington Medical Center', 'washington-medicine'],
  ['IRIS GRIM', 'iris-grim', 'svg'],
  ['CHU Angers', 'chu'],
  ['Imagir', 'imagir-or'],
  ['CHIREC — Hôpital de Braine-l’Alleud', 'chirec-2015'],
]) {
  const matchingImage = englishHomepageImages.find(
    (attrs) => attrs.alt === alt && new RegExp(`/${assetStem}\\.`).test(attrs.src ?? ''),
  );
  assert.ok(matchingImage, `home page must pair ${alt} with its matching customer asset`);
  assert.match(matchingImage.src ?? '', new RegExp(`\\.${extension}$`), `${alt} carousel logo must use ${extension.toUpperCase()}`);
}
assert.equal(
  englishHomepageImages.filter((attrs) => attrs.alt === 'IRIS GRIM' && /\/irimed\./.test(attrs.src ?? '')).length,
  0,
  'IRIS GRIM must never be paired with an unrelated IRIMED logo',
);
assert.doesNotMatch(englishHomepage, />\s*IRIS GRIM\s*</, 'IRIS GRIM must render its logo instead of a text fallback');
const frenchHomepageImages = [...frenchHomepage.matchAll(/<img\b[^>]*>/gsi)]
  .map((match) => attributes(match[0]));
const frenchSwissHomepageImages = [...frenchSwissHomepage.matchAll(/<img\b[^>]*>/gsi)]
  .map((match) => attributes(match[0]));
const frenchRvuImageTag = frenchHomepageImages.find((attrs) => attrs.alt === 'Planification avec volumes RVU');
assert.match(frenchRvuImageTag?.srcset ?? '', /\s240w(?:,|$)/, 'French RVU image must include a 240px candidate');
assert.match(frenchRvuImageTag?.srcset ?? '', /\s320w(?:,|$)/, 'French RVU image must include a 320px candidate');
assert.match(frenchRvuImageTag?.srcset ?? '', /\s640w(?:,|$)/, 'French RVU image must include a 640px candidate');
assert.equal(frenchRvuImageTag?.sizes, expectedRvuSizes, 'French RVU sizes must match the English responsive geometry');
const frenchTestimonialLogos = [
  ['IMAGIR Bordeaux', 'imagir-or', 'webp'],
  ['CHU Angers', 'chu', 'webp'],
  ['IMALLIANCE HDF', 'imalliance-hdf', 'png'],
  ['IRIS GRIM', 'iris-grim', 'svg'],
  ['Imagerie Médicale Les Cèdres', 'cedres', 'png'],
  ['Hôpital Européen de Marseille', 'hopital-europeen', 'svg'],
  ['CHIREC', 'chirec-2015', 'webp'],
];
const frenchTestimonialSource = await readFile(
  path.join(projectRoot, 'src/components/sections/fr/TestimonialsCarouselSection.tsx'),
  'utf8',
);
const frenchTestimonialData = frenchTestimonialSource.slice(
  frenchTestimonialSource.indexOf('const testimonials = ['),
  frenchTestimonialSource.indexOf('export default function'),
);
const frenchTestimonialRecords = [...frenchTestimonialData.matchAll(/\{\s*id:\s*'[^']+'[\s\S]*?\n\s*\},/g)]
  .map((match) => match[0]);
for (const [name, hospital, logoVariable] of [
  ['Anthony Bagot', 'IMAGIR Bordeaux', 'imagirLogo'],
  ['Thomas Boishardy', 'CHU Angers', 'chuLogo'],
  ['Dominique Molmy', 'IMALLIANCE HDF', 'imallianceLogo'],
  ['Équipe de planification', 'IRIS GRIM', 'irisGrimLogo'],
  ['Karine Delaunay', 'Imagerie Médicale Les Cèdres', 'cedresLogo'],
  ['Docteur Stordeur', 'Hôpital Européen de Marseille', 'hopitalEuropeenLogo'],
  ['Frédéric Cavallotto', 'CHIREC', 'chirecLogo'],
]) {
  const record = frenchTestimonialRecords.find((candidate) => candidate.includes(`hospital: '${hospital}'`));
  assert.ok(record, `French testimonial data must contain the ${hospital} record`);
  assert.ok(record.includes(`name: '${name}'`), `${hospital} must remain associated with ${name}`);
  assert.ok(record.includes(`logo: ${logoVariable}`), `${hospital} must remain associated with ${logoVariable}`);
}
for (const [locale, homepageImages] of [
  ['French', frenchHomepageImages],
  ['French-Swiss', frenchSwissHomepageImages],
]) {
  const testimonialImages = homepageImages.filter((attrs) =>
    /(?:^|\s)filter-\[grayscale\(1\)\](?:\s|$)/.test(attrs.class ?? ''),
  );
  for (const [alt, assetStem, extension] of frenchTestimonialLogos) {
    const matchingImage = testimonialImages.find(
      (attrs) => attrs.alt === alt && new RegExp(`/${assetStem}\\.`).test(attrs.src ?? ''),
    );
    assert.ok(matchingImage, `${locale} homepage must pair ${alt} with its matching customer logo`);
    assert.match(matchingImage.src ?? '', new RegExp(`\\.${extension}$`), `${locale} ${alt} testimonial logo must use ${extension.toUpperCase()}`);
  }
  assert.equal(
    testimonialImages.filter((attrs) => frenchTestimonialLogos.some(([alt]) => attrs.alt === alt)).length,
    frenchTestimonialLogos.length,
    `${locale} homepage must render one customer logo for every testimonial`,
  );
}
const irisGrimCarouselImages = [englishHomepageImages, frenchHomepageImages, frenchSwissHomepageImages]
  .map((images) => images.find((attrs) => attrs.alt === 'IRIS GRIM' && /\/iris-grim\.[^/]+\.svg$/.test(attrs.src ?? '')));
for (const irisGrimCarouselImage of irisGrimCarouselImages) {
  assert.ok(irisGrimCarouselImage, 'English, French, and French-Swiss homepages must render the authentic IRIS GRIM SVG');
  assert.match(irisGrimCarouselImage.class ?? '', /(?:^|\s)filter-\[grayscale\(1\)\](?:\s|$)/, 'IRIS GRIM logo must use the shared grayscale treatment');
  assert.match(irisGrimCarouselImage.class ?? '', /(?:^|\s)opacity-50(?:\s|$)/, 'IRIS GRIM logo must use the shared muted contrast');
  assert.match(irisGrimCarouselImage.class ?? '', /(?:^|\s)max-h-10(?:\s|$)/, 'IRIS GRIM logo must use the shared height limit');
  assert.match(irisGrimCarouselImage.class ?? '', /(?:^|\s)max-w-\[120px\](?:\s|$)/, 'IRIS GRIM logo must use the shared width limit');
}
assert.equal(
  frenchHomepageImages.filter(
    (attrs) => attrs.alt === 'Hôpital Européen de Marseille' && /\/chu\./.test(attrs.src ?? ''),
  ).length,
  0,
  'Hôpital Européen de Marseille must never be paired with a CHU Angers logo',
);
const carouselAssetBudgets = [
  ...['chirec-2015', 'chu', 'imagir-or', 'lakewood', 'rrh', 'washington-medicine'].map((name) => ({
    relativePath: `src/assets/companies/carousel/${name}.webp`,
    format: 'webp',
    maxWidth: 320,
    maxHeight: 96,
    maxBytes: 20_000,
  })),
  ...['cedres', 'imalliance-hdf'].map((name) => ({
    relativePath: `src/assets/companies/carousel/${name}.png`,
    format: 'png',
    maxWidth: 320,
    maxHeight: 100,
    maxBytes: 30_000,
  })),
];
for (const budget of carouselAssetBudgets) {
  const assetPath = path.join(projectRoot, budget.relativePath);
  const [metadata, file] = await Promise.all([sharp(assetPath).metadata(), stat(assetPath)]);
  assert.equal(metadata.format, budget.format, `${budget.relativePath} must remain ${budget.format.toUpperCase()}`);
  assert.ok((metadata.width ?? Infinity) <= budget.maxWidth, `${budget.relativePath} exceeds its width budget`);
  assert.ok((metadata.height ?? Infinity) <= budget.maxHeight, `${budget.relativePath} exceeds its height budget`);
  assert.ok(file.size <= budget.maxBytes, `${budget.relativePath} exceeds its byte budget`);
}
const { data: imalliancePixels } = await sharp(
  path.join(projectRoot, 'src/assets/companies/carousel/imalliance-hdf.png'),
)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
let imallianceVisiblePixels = 0;
let imallianceMaxChannel = 0;
for (let offset = 0; offset < imalliancePixels.length; offset += 4) {
  if (imalliancePixels[offset + 3] === 0) continue;
  imallianceVisiblePixels += 1;
  imallianceMaxChannel = Math.max(
    imallianceMaxChannel,
    imalliancePixels[offset],
    imalliancePixels[offset + 1],
    imalliancePixels[offset + 2],
  );
}
assert.ok(imallianceVisiblePixels > 8_000, 'IMALLIANCE HDF mark must retain its full visible geometry');
assert.ok(
  imallianceMaxChannel <= 8,
  'IMALLIANCE HDF mark must remain a dark monochrome adaptation so the official white header wordmark stays legible on light testimonial cards',
);
for (const obsoleteLandscape of ['cedres.webp', 'imalliance-hdf.webp']) {
  await assert.rejects(
    stat(path.join(projectRoot, 'src/assets/case-studies/carousel', obsoleteLandscape)),
    (error) => error?.code === 'ENOENT',
    `${obsoleteLandscape} must not survive as a testimonial logo`,
  );
}

const irisCaseStudyAsset = 'src/assets/case-studies/iris-grim-clinique-jules-verne.webp';
const irisCaseStudyPath = path.join(projectRoot, irisCaseStudyAsset);
const [irisCaseStudyStats, irisCaseStudyMeta] = await Promise.all([
  stat(irisCaseStudyPath),
  sharp(irisCaseStudyPath).metadata(),
]);
assert.equal(irisCaseStudyMeta.format, 'webp', `${irisCaseStudyAsset} must stay WebP`);
assert.equal(irisCaseStudyMeta.width, 1600, `${irisCaseStudyAsset} width drifted`);
assert.equal(irisCaseStudyMeta.height, 1000, `${irisCaseStudyAsset} height drifted`);
assert.ok(irisCaseStudyStats.size <= 200_000, `${irisCaseStudyAsset} exceeds 200 KB`);
await assert.rejects(
  stat(path.join(projectRoot, 'src/assets/case-studies/iris-grim.jpg')),
  (error) => error?.code === 'ENOENT',
  'Legacy Nantes landmark should be removed after the licensed clinic photo replacement',
);
for (const [locale, html, homepageImages] of [
  ['French', frenchHomepage, frenchHomepageImages],
  ['French-Swiss', frenchSwissHomepage, frenchSwissHomepageImages],
]) {
  assert.match(
    html,
    /iris-grim-clinique-jules-verne\.[^"'\s>]*\.webp/i,
    `${locale} case-study card must render the licensed Clinique Jules Verne photo`,
  );
  const irisCaseStudyImage = homepageImages.find((attrs) =>
    /\/iris-grim-clinique-jules-verne\./.test(attrs.src ?? ''),
  );
  assert.equal(
    irisCaseStudyImage?.alt,
    'Clinique Jules Verne à Nantes, site d’imagerie IRIS GRIM',
    `${locale} case-study photo must describe the actual IRIS GRIM site`,
  );
  assert.match(
    html,
    /https:\/\/commons\.wikimedia\.org\/wiki\/File:Clinique_Jules_Verne\.jpg/,
    `${locale} page must credit the photo source`,
  );
  assert.match(
    html,
    /https:\/\/creativecommons\.org\/licenses\/by-sa\/3\.0\//,
    `${locale} page must link the CC BY-SA 3.0 license`,
  );
  assert.match(html, /Photo « Clinique Jules Verne »/, `${locale} page must name the licensed photograph`);
  assert.match(
    html,
    /adaptation recadrée sous CC BY-SA 3\.0/,
    `${locale} page must disclose the crop and retain the derivative license`,
  );
}

const svgLogoBudgets = [
  { name: 'iris-grim', maxBytes: 10_000 },
  { name: 'hopital-europeen', maxBytes: 16_000 },
];
for (const { name, maxBytes } of svgLogoBudgets) {
  const assetPath = path.join(projectRoot, `src/assets/companies/carousel/${name}.svg`);
  const [source, file, metadata] = await Promise.all([
    readFile(assetPath, 'utf8'),
    stat(assetPath),
    sharp(assetPath).metadata(),
  ]);
  assert.equal(metadata.format, 'svg', `${name} logo must remain parseable SVG`);
  assert.match(source, /<svg\b[^>]*viewBox=/, `${name} logo must retain a scalable viewBox`);
  assert.doesNotMatch(
    source,
    /<(?:script|foreignObject|iframe|object|embed)\b|javascript:|\son\w+\s*=/i,
    `${name} logo must not contain executable or embedded foreign content`,
  );
  assert.doesNotMatch(
    source,
    /\b(?:href|src)\s*=\s*["']\s*(?:https?:|\/\/|data:|javascript:)/i,
    `${name} logo must not load external or data-URI resources`,
  );
  assert.doesNotMatch(
    source,
    /@import\b|url\(\s*["']?\s*(?:https?:|\/\/|data:|javascript:)/i,
    `${name} logo must not import external CSS resources`,
  );
  assert.ok(file.size <= maxBytes, `${name} SVG exceeds its carousel byte budget`);
}
const irisGrimLogoSource = await readFile(path.join(projectRoot, 'src/assets/companies/carousel/iris-grim.svg'), 'utf8');
assert.match(irisGrimLogoSource, /<svg\b[^>]*viewBox="0 0 273\.72 113\.68"/, 'IRIS GRIM logo must retain its complete intrinsic viewBox');
const englishStructuredData = [...englishHomepage.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gsi)]
  .map((match) => JSON.parse(match[1]));
const organization = englishStructuredData
  .flatMap((data) => data['@graph'] ?? [data])
  .find((item) => item['@type'] === 'Organization');
assert.equal(
  organization?.address?.streetAddress,
  'Suite 93, 770 Ayrault Road',
  'Organization structured data must include the complete public mailing address',
);
const decorativeDustTags = [...englishHomepage.matchAll(/<div\b[^>]*data-decorative-dust-src[^>]*>/gsi)]
  .map((match) => attributes(match[0]));
assert.ok(decorativeDustTags.length >= 4, 'home page must retain its desktop decorative dust layers');
for (const dustTag of decorativeDustTags) {
  assert.match(dustTag['data-decorative-dust-src'] ?? '', /cyan-dust_background/, 'decorative dust must retain its desktop image');
  assert.ok(!(dustTag.style ?? '').includes('background-image'), 'decorative dust must not expose a preloadable inline background');
}
const heroDustTag = decorativeDustTags.find((attrs) => (attrs.class ?? '').includes('top-1/4') && (attrs.class ?? '').includes('right-0'));
assert.ok(heroDustTag, 'home hero must retain its decorative dust layer');
assert.match(heroDustTag.class ?? '', /(?:^|\s)hidden(?:\s|$)/, 'decorative hero dust must not render on small screens');
assert.match(heroDustTag.class ?? '', /(?:^|\s)md:block(?:\s|$)/, 'decorative hero dust must remain visible on larger screens');
const decorativeDustComponent = await readFile(path.join(projectRoot, 'src/components/ui/DecorativeDust.astro'), 'utf8');
assert.ok(
  decorativeDustComponent.includes("matchMedia('(min-width: 768px)')"),
  'decorative dust must be loaded only after the desktop media query matches',
);
const languageButton = [...englishHomepage.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gsi)]
  .map((match) => ({
    attrs: attributes(match[0]),
    text: match[1].match(/<span\b[^>]*class="[^"]*\buppercase\b[^"]*"[^>]*>([^<]+)<\/span>/i)?.[1].trim() ?? '',
  }))
  .find((button) => (button.attrs['aria-label'] ?? '').startsWith('Change language'));
assert.ok(languageButton, 'home navbar must render the language selector');
assert.match(
  languageButton.text,
  /^[a-z]{2}(?:-[a-z]{2})?$/i,
  'language selector must expose a visible language code before testing its accessible name',
);
assert.match(
  (languageButton.attrs['aria-label'] ?? '').toUpperCase(),
  new RegExp(`\\b${languageButton.text.toUpperCase()}\\b`),
  'language selector accessible name must include its visible language code',
);

for (const [route, helpLabel, supportLocale] of [
  ['', 'Help', 'en'],
  ['fr', 'Aide', 'fr'],
  ['fr-ch', 'Aide', 'fr'],
  ['de', 'Hilfe', 'en'],
  ['nl', 'Hulp', 'en'],
  ['it', 'Aiuto', 'en'],
]) {
  const locale = route || 'en';
  const html = await readFile(path.join(distDir, route, 'index.html'), 'utf8');
  const navbar = navbarIsland(html);
  const helpUrl = `https://kb.biosked.com/${supportLocale}/knowledge/kb-tickets/new`;
  assert.ok(navbar, `${locale} home must render the interactive navbar`);
  assert.ok(
    navbar.includes(`&quot;label&quot;:[0,&quot;${helpLabel}&quot;]`),
    `${locale} Resources menu must contain the localized Help label`,
  );
  assert.ok(
    navbar.includes(`&quot;href&quot;:[0,&quot;${helpUrl}&quot;],&quot;showDesktop&quot;:[0,true],&quot;showMobile&quot;:[0,true]`),
    `${locale} Resources menu must expose ${helpUrl} on desktop and mobile`,
  );
}

const quoteBandSource = await readFile(
  path.join(projectRoot, 'src/components/sections/intl/QuoteBand.astro'),
  'utf8',
);
assert.match(
  quoteBandSource,
  /<\/blockquote>\s*<figcaption class="mt-5">[\s\S]*?<\/figcaption>\s*<\/figure>/,
  'international quote attribution must remain the direct final figcaption child of its figure',
);

for (const [route, logoAlt] of [
  ['de', 'Logo der CHIREC-Krankenhausgruppe'],
  ['nl', 'Logo van de CHIREC-ziekenhuisgroep'],
  ['it', 'Logo del gruppo ospedaliero CHIREC'],
]) {
  const html = await readFile(path.join(distDir, route, 'index.html'), 'utf8');
  const images = [...html.matchAll(/<img\b[^>]*>/gsi)].map((match) => attributes(match[0]));
  const chirecLogo = images.find(
    (attrs) => attrs.alt === logoAlt && /\/chirec-2015\./.test(attrs.src ?? ''),
  );
  assert.ok(chirecLogo, `${route} homepage testimonial must render the matching CHIREC customer logo`);
  assert.match(chirecLogo.class ?? '', /(?:^|\s)grayscale(?:\s|$)/, `${route} CHIREC logo must use the shared grayscale treatment`);
  assert.match(chirecLogo.class ?? '', /(?:^|\s)opacity-75(?:\s|$)/, `${route} CHIREC logo must use the shared muted contrast`);
  assert.match(chirecLogo.class ?? '', /(?:^|\s)max-h-12(?:\s|$)/, `${route} CHIREC logo must use the shared height limit`);
}

const llmsPath = path.join(distDir, 'llms.txt');
const llmsText = await readFile(llmsPath, 'utf8');
assert.match(llmsText, /^# Momentum by BioSked\s*$/m, 'llms.txt must contain the site H1');
assert.match(llmsText, /^> \S.+$/m, 'llms.txt must contain a summary blockquote');
assert.match(llmsText, /^## Product and company\s*$/m, 'llms.txt must contain the primary links section');
const llmsLinkLines = llmsText.split('\n').filter((line) => /^-\s*\[/.test(line));
assert.ok(llmsLinkLines.length > 0, 'llms.txt must contain at least one Markdown link');
for (const line of llmsLinkLines) {
  const match = line.match(/^-\s*\[[^\]]+\]\(([^)]+)\)(?::.*)?$/);
  assert.ok(match, `llms.txt contains a malformed link: ${line}`);
  const url = new URL(match[1]);
  assert.equal(url.protocol, 'https:', `llms.txt link must use HTTPS: ${url}`);
  assert.equal(url.origin, siteOrigin, `llms.txt link must stay on ${siteOrigin}: ${url}`);
  assert.equal(url.search, '', `llms.txt link must not contain a query string: ${url}`);
  assert.equal(url.hash, '', `llms.txt link must not contain a fragment: ${url}`);
  await assertLocalUrlExists(url.toString(), 'llms.txt');
}

const robotsText = await readFile(path.join(distDir, 'robots.txt'), 'utf8');
assert.match(robotsText, /^Sitemap: https:\/\/biosked\.com\/sitemap-index\.xml$/m, 'robots.txt must advertise the sitemap');
assert.match(
  robotsText,
  /^User-agent: OAI-SearchBot\s*\nAllow: \/$/m,
  'robots.txt must explicitly allow OpenAI search indexing',
);
for (const bot of ['AhrefsBot', 'DotBot']) {
  const block = robotsText
    .split(/(?=^User-agent:)/m)
    .find((entry) => entry.startsWith(`User-agent: ${bot}`));
  assert.ok(block, `robots.txt must define a rate-limited ${bot} policy`);
  assert.doesNotMatch(block, /^Disallow:/m, `robots.txt must not block reputable SEO crawler ${bot}`);
  assert.match(block, /^Crawl-delay: 10$/m, `robots.txt must rate-limit ${bot}`);
}

assert.doesNotMatch(
  sitemapText,
  /https:\/\/biosked\.com\/(?:fr-ch-ch|fr-fr|de-de|nl-nl|it-it)\//,
  'sitemap must not contain duplicated locale prefixes',
);

for (const route of Object.keys(config.redirects ?? {})) {
  const html = await readFile(path.join(distDir, ...route.split('/'), 'index.html'), 'utf8');
  assert.match(html, /location\.search/, `${route} redirect must preserve query parameters`);
  assert.match(html, /location\.hash/, `${route} redirect must preserve fragments`);
  assert.match(html, /new URLSearchParams\(location\.search\)/, `${route} redirect must filter attribution parameters`);
  assert.match(html, /utm_source/, `${route} redirect must allow standard UTM attribution`);
  assert.doesNotMatch(html, /target\s*\+\s*location\.search/, `${route} redirect must not forward raw query data`);
  assert.doesNotMatch(html, /fixedHash\s*\|\|\s*location\.hash/, `${route} redirect must not forward arbitrary fragments`);
  assert.match(html, /location\.replace/, `${route} redirect must replace browser history`);
  assert.match(metaContent(html, 'name', 'robots') ?? '', /noindex/, `${route} redirect must be noindex`);
  assert.equal(metaContent(html, 'name', 'referrer'), 'no-referrer', `${route} redirect must not leak the source URL as a referrer`);
  assert.ok(linkHref(html, 'canonical'), `${route} redirect must declare its canonical destination`);
}

for (const [route, destination] of [
  ['contact', '/demo/'],
  ['demander-une-demonstration', '/fr/demo/'],
]) {
  const html = await readFile(path.join(distDir, route, 'index.html'), 'utf8');
  assert.match(html, /location\.search/, `${route} redirect must preserve query parameters`);
  assert.match(html, /location\.hash/, `${route} redirect must preserve fragments`);
  assert.match(html, /location\.replace/, `${route} redirect must replace browser history`);
  assert.match(html, new RegExp(`const target=${JSON.stringify(destination).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
  assert.equal(linkHref(html, 'canonical'), `${siteOrigin}${destination}`, `${route} redirect canonical must match its destination`);
}

const supportRedirectHtml = await readFile(path.join(distDir, 'support', 'index.html'), 'utf8');
assert.equal(
  linkHref(supportRedirectHtml, 'canonical'),
  'https://kb.biosked.com/fr/knowledge/kb-tickets/new',
  'external support redirect must not add a redirect-chain trailing slash',
);

const contactRedirectHtml = await readFile(path.join(distDir, 'contact', 'index.html'), 'utf8');
assert.equal(
  executeRedirect(contactRedirectHtml, '?utm_source=qa&email=john%40example.com&token=secret', '#contact'),
  '/demo/?utm_source=qa#contact',
  'contact redirect must retain allowed attribution and drop PII-like query data',
);
assert.equal(
  executeRedirect(contactRedirectHtml, '?email=john%40example.com', '#john%40example.com'),
  '/demo/',
  'contact redirect must drop non-attribution query data and unsafe fragments',
);
assert.equal(
  executeRedirect(contactRedirectHtml, '', '#patient-Jane-Doe'),
  '/demo/',
  'contact redirect must drop arbitrary text fragments that could contain private data',
);

const fixedFragmentRedirectHtml = await readFile(path.join(distDir, 'la-societe-biosked', 'lequipe', 'index.html'), 'utf8');
assert.equal(
  executeRedirect(fixedFragmentRedirectHtml, '?utm_medium=organic', '#ignored'),
  '/fr/about/?utm_medium=organic#equipe',
  'configured destination fragment must override an incoming fragment',
);

console.log(`SEO checks passed: ${checkedPages} pages, ${checkedBlogPages} blog articles, ${checkedImages} images, ${checkedStructuredAssets} structured-data assets, llms.txt, and robots.txt.`);
