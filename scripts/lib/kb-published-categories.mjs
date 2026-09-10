import { parse } from 'parse5';

// Home-page category listings are authoritative public routes. Article breadcrumbs
// alone are insufficient: one article can remain listed in a secondary category.
export async function discoverMissingCategories(homePages, articles, existing, fetchCategory) {
  const result = [];
  const knownCategories = new Set(existing.map((item) => `${item.locale}:${item.path}`));
  const knownArticles = new Set(articles.map((item) => `${item.locale}:${item.sourcePath}`));
  const attrs = (node, name) => node.attrs?.find((item) => item.name === name)?.value ?? '';
  const hasClass = (node, name) => attrs(node, 'class').split(/\s+/).includes(name);
  const walk = (node) => [node, ...(node.childNodes ?? []).flatMap(walk)];
  const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join(' ');
  const clean = (value) => value.replace(/\s+/g, ' ').replace(/\u2014/g, ' - ').trim();
  for (const home of homePages) {
    const origin = new URL(home.url).origin;
    const prefix = `/${home.locale}/knowledge/`;
    const anchors = walk(parse(home.html)).filter((node) => node.tagName === 'a' && hasClass(node, 'hs-kb-home-list__category-link'));
    if (!anchors.length) throw new Error(`No published categories found at ${home.url}`);
    for (const anchor of anchors) {
      const url = new URL(attrs(anchor, 'href'), home.url);
      if (url.origin !== origin || !url.pathname.startsWith(prefix)) continue;
      const categoryPath = url.pathname.replace(/\/$/, '');
      const key = `${home.locale}:${categoryPath}`;
      if (knownCategories.has(key)) continue;
      const heading = walk(anchor).find((node) => /^h[1-6]$/.test(node.tagName ?? ''));
      const title = clean(text(heading ?? anchor));
      if (!title) throw new Error(`Missing published category title: ${categoryPath}`);
      const categoryUrl = `${origin}${categoryPath}`;
      const document = parse(await fetchCategory(categoryUrl));
      const links = walk(document).filter((node) => node.tagName === 'a' && hasClass(node, 'hs-kb-category-article-list__link'));
      const articlePaths = new Set();
      for (const link of links) {
        const target = new URL(attrs(link, 'href'), categoryUrl);
        if (target.origin !== origin || !target.pathname.startsWith(prefix)) continue;
        const articlePath = target.pathname.replace(/\/$/, '');
        if (!knownArticles.has(`${home.locale}:${articlePath}`)) {
          throw new Error(`Published category ${categoryPath} references an article absent from the snapshot: ${articlePath}`);
        }
        articlePaths.add(articlePath);
      }
      if (!articlePaths.size) throw new Error(`No mirrored articles found in published category ${categoryPath}`);
      result.push({
        locale: home.locale, title, path: categoryPath,
        sitePath: categoryPath.replace(`/${home.locale}/knowledge`, home.locale === 'en' ? '/help' : `/${home.locale}/help`),
        articlePaths: [...articlePaths].sort(), subcategories: [],
      });
      knownCategories.add(key);
    }
  }
  return result;
}
