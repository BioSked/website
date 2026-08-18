import snapshotJson from '@/data/generated/hubspot-kb.json';
import translationsJson from '@/data/generated/kb-translations.json';

export const KB_PREVIEW_PREFIX = '/kb-preview';

/** en and fr come from HubSpot; de, nl and it are translated from those. */
export const KB_LOCALES = ['en', 'fr', 'de', 'nl', 'it'] as const;
export type KbLocale = (typeof KB_LOCALES)[number];

/** Translated locales, kept in a separate file so a HubSpot re-sync cannot drop them. */
export const KB_TRANSLATED_LOCALES = ['de', 'nl', 'it'] as const;
export type KbTranslatedLocale = (typeof KB_TRANSLATED_LOCALES)[number];

/**
 * Site locales that reuse another locale's knowledge base rather than having
 * their own translation: Swiss French reads the French KB, Swiss German the
 * German one.
 */
export const KB_LOCALE_ALIASES: Record<string, KbLocale> = { 'fr-ch': 'fr', 'de-ch': 'de' };

/** Resolve any site locale (including fr-ch / de-ch) to the KB locale that serves it. */
export function kbLocaleFor(siteLocale: string): KbLocale {
  if (KB_LOCALE_ALIASES[siteLocale]) return KB_LOCALE_ALIASES[siteLocale];
  return (KB_LOCALES as readonly string[]).includes(siteLocale) ? (siteLocale as KbLocale) : 'en';
}

export interface KbBreadcrumb {
  title: string;
  sourceUrl: string;
  path: string;
}

export interface KbArticle {
  articleId: string;
  locale: KbLocale;
  title: string;
  description: string;
  sourceUrl: string;
  sourcePath: string;
  previewPath: string;
  lastModified: string | null;
  breadcrumbs: KbBreadcrumb[];
  primaryCategory: { title: string; path: string } | null;
  subcategory: string | null;
  alternates: Partial<Record<KbLocale, string>>;
  bodyHtml: string;
  searchText: string;
}

export interface KbCategory {
  locale: KbLocale;
  title: string;
  path: string;
  previewPath: string;
  articlePaths: string[];
  subcategories: string[];
}

export interface KbFormConfig {
  portalId: string;
  formId: string;
  region: string;
}

export interface KbSnapshot {
  schemaVersion: number;
  sourceHost: string;
  sourceSitemap: string;
  sourceMode: string;
  sourceCandidateCount: number;
  articles: KbArticle[];
  categories: KbCategory[];
  forms: Record<KbLocale, KbFormConfig>;
  contentHash: string;
  generatedAt: string;
}

export interface KbLanguageLink {
  code: KbLocale;
  label: string;
  href: string;
  active: boolean;
}

interface KbTranslationEntry {
  title: string;
  description: string;
  bodyHtml: string;
  searchText: string;
}

interface KbTranslations {
  schemaVersion: number;
  generatedFrom: string;
  languages: string[];
  categories: Record<string, Record<string, string>>;
  subcategories: Record<string, Record<string, string>>;
  copy: Record<string, Record<string, string>>;
  articles: Record<string, Record<string, KbTranslationEntry>>;
}

const kbTranslations = translationsJson as unknown as KbTranslations;
const baseSnapshot = snapshotJson as unknown as KbSnapshot;

const KB_SOURCE_HOST = 'https://kb.biosked.com';
const slugOf = (sourcePath: string): string => sourcePath.split('/knowledge/')[1] ?? '';
const translate = (dictionary: Record<string, Record<string, string>>, value: string | null, locale: string): string =>
  (value && dictionary[value]?.[locale]) || value || '';

/**
 * Build the de/nl/it articles and categories by overlaying the translation file
 * on their source article (English when one exists, otherwise French).
 * Slugs are reused from the source: the KB is noindex, so stable ASCII URLs are
 * worth more than translated ones, and it keeps every locale one to one.
 * sourceUrl still points at the real HubSpot article, which only exists in en/fr.
 */
function buildMergedSnapshot(): KbSnapshot {
  const articles = [...baseSnapshot.articles];
  const categories = [...baseSnapshot.categories];
  const sourceById = new Map(baseSnapshot.articles.map((article) => [article.articleId, article]));
  const pathByLocaleAndId = new Map<string, string>();

  for (const locale of KB_TRANSLATED_LOCALES) {
    const entries = kbTranslations.articles?.[locale] ?? {};
    for (const [articleId, entry] of Object.entries(entries)) {
      const source = sourceById.get(articleId);
      if (!source) continue;
      pathByLocaleAndId.set(`${locale}:${articleId}`, `/${locale}/knowledge/${slugOf(source.sourcePath)}`);
    }
  }

  for (const locale of KB_TRANSLATED_LOCALES) {
    const entries = kbTranslations.articles?.[locale] ?? {};
    const homeTitle = kbTranslations.copy?.[locale]?.siteTitle ?? 'Momentum Knowledge Base';
    const localeArticles: KbArticle[] = [];

    for (const [articleId, entry] of Object.entries(entries)) {
      const source = sourceById.get(articleId);
      if (!source) continue;
      const sourcePath = `/${locale}/knowledge/${slugOf(source.sourcePath)}`;
      const categoryTitle = translate(kbTranslations.categories, source.primaryCategory?.title ?? null, locale);
      const categoryPath = source.primaryCategory
        ? `/${locale}/knowledge/${slugOf(source.primaryCategory.path)}`
        : null;
      const subcategory = source.subcategory
        ? translate(kbTranslations.subcategories, source.subcategory, locale)
        : null;

      const alternates: Partial<Record<KbLocale, string>> = { ...source.alternates };
      alternates[source.locale] = source.sourcePath;
      for (const other of KB_TRANSLATED_LOCALES) {
        const path = pathByLocaleAndId.get(`${other}:${articleId}`);
        if (path) alternates[other] = path;
      }

      const breadcrumbs: KbBreadcrumb[] = [
        { title: homeTitle, sourceUrl: `${KB_SOURCE_HOST}/${locale}/knowledge`, path: `/${locale}/knowledge` },
      ];
      if (categoryPath && categoryTitle) {
        breadcrumbs.push({ title: categoryTitle, sourceUrl: `${KB_SOURCE_HOST}${categoryPath}`, path: categoryPath });
      }
      if (subcategory) {
        breadcrumbs.push({ title: subcategory, sourceUrl: `${KB_SOURCE_HOST}${sourcePath}`, path: sourcePath });
      }

      const article: KbArticle = {
        articleId: `${articleId}-${locale}`,
        locale,
        title: entry.title,
        description: entry.description,
        // The translated pages are generated, so the canonical source stays the
        // HubSpot article they were translated from.
        sourceUrl: source.sourceUrl,
        sourcePath,
        previewPath: `${KB_PREVIEW_PREFIX}${sourcePath}`,
        lastModified: source.lastModified,
        breadcrumbs,
        primaryCategory: categoryPath && categoryTitle ? { title: categoryTitle, path: categoryPath } : null,
        subcategory,
        alternates,
        bodyHtml: entry.bodyHtml,
        searchText: entry.searchText,
      };
      localeArticles.push(article);
      articles.push(article);
    }

    const byCategoryPath = new Map<string, KbArticle[]>();
    for (const article of localeArticles) {
      const path = article.primaryCategory?.path;
      if (!path) continue;
      const list = byCategoryPath.get(path) ?? [];
      list.push(article);
      byCategoryPath.set(path, list);
    }
    for (const [path, list] of byCategoryPath) {
      categories.push({
        locale,
        title: list[0].primaryCategory?.title ?? '',
        path,
        previewPath: `${KB_PREVIEW_PREFIX}${path}`,
        articlePaths: list.map((article) => article.sourcePath),
        subcategories: [...new Set(list.map((article) => article.subcategory).filter(Boolean) as string[])].sort(),
      });
    }
  }

  // de/nl/it have no localised HubSpot support form, so they use the English one.
  const forms = { ...baseSnapshot.forms } as Record<KbLocale, KbFormConfig>;
  for (const locale of KB_TRANSLATED_LOCALES) forms[locale] = baseSnapshot.forms.en;

  return { ...baseSnapshot, articles, categories, forms };
}

export const kbSnapshot = buildMergedSnapshot();

/**
 * Locales that actually have content. A translated locale only appears once its
 * articles are in kb-translations.json, so the site never ships an empty
 * knowledge base language.
 */
export const KB_ACTIVE_LOCALES: KbLocale[] = KB_LOCALES.filter((locale) =>
  kbSnapshot.articles.some((article) => article.locale === locale),
);

const baseCopy = {
  en: {
    siteTitle: 'Momentum Knowledge Base',
    siteDescription: 'Practical guides, product answers and direct access to BioSked support.',
    searchPlaceholder: 'Search the knowledge base',
    searchLabel: 'Search help articles',
    searchHint: 'Start typing to search titles, categories and article content.',
    noResults: 'No matching articles found.',
    categoriesTitle: 'Browse by category',
    categoryCount: (count: number) => `${count} article${count === 1 ? '' : 's'}`,
    latestTitle: 'Recently updated',
    allArticles: 'View all articles',
    backToHome: 'Knowledge base home',
    support: 'Contact support',
    supportTitle: 'Still need help?',
    supportDescription: 'Send the BioSked support team the details and we will route your request to the right person.',
    supportFormTitle: 'Submit a support request',
    supportFormDescription: 'Use the existing BioSked support form. Your request follows the current Help Desk routing.',
    formLoading: 'Loading the secure support form...',
    formFallback: 'The form did not load. Open the original support form instead.',
    formFallbackLink: 'Open support form',
    articleUpdated: 'Updated',
    relatedArticles: 'More in this category',
    helpfulQuestion: 'Was this article helpful?',
    helpfulYes: 'Yes',
    helpfulNo: 'No',
    feedbackThanks: 'Thanks for the feedback.',
    sourceLabel: 'Managed in HubSpot',
    previewLabel: 'Preview',
    previewNotice: 'This is the rollback-safe preview. The current HubSpot knowledge base remains live.',
    openArticle: 'Read article',
    chooseLanguage: 'Choose your knowledge base language',
    english: 'English',
    french: 'Français',
  },
  fr: {
    siteTitle: 'Base de connaissances Momentum',
    siteDescription: 'Guides pratiques, réponses produit et accès direct au support BioSked.',
    searchPlaceholder: 'Rechercher dans la base de connaissances',
    searchLabel: 'Rechercher des articles d’aide',
    searchHint: 'Commencez à saisir pour rechercher dans les titres, catégories et articles.',
    noResults: 'Aucun article correspondant.',
    categoriesTitle: 'Parcourir par catégorie',
    categoryCount: (count: number) => `${count} article${count === 1 ? '' : 's'}`,
    latestTitle: 'Récemment mis à jour',
    allArticles: 'Voir tous les articles',
    backToHome: 'Accueil de la base de connaissances',
    support: 'Contacter le support',
    supportTitle: 'Besoin d’aide ?',
    supportDescription: 'Envoyez les détails à l’équipe support BioSked. Votre demande sera dirigée vers la bonne personne.',
    supportFormTitle: 'Envoyer une demande au support',
    supportFormDescription: 'Utilisez le formulaire BioSked existant. Votre demande suit le routage actuel du Help Desk.',
    formLoading: 'Chargement du formulaire de support sécurisé...',
    formFallback: 'Le formulaire ne s’est pas chargé. Ouvrez le formulaire de support d’origine.',
    formFallbackLink: 'Ouvrir le formulaire de support',
    articleUpdated: 'Mis à jour',
    relatedArticles: 'Plus d’articles dans cette catégorie',
    helpfulQuestion: 'Cet article vous a-t-il aidé ?',
    helpfulYes: 'Oui',
    helpfulNo: 'Non',
    feedbackThanks: 'Merci pour votre retour.',
    sourceLabel: 'Géré dans HubSpot',
    previewLabel: 'Aperçu',
    previewNotice: 'Ceci est l’aperçu réversible. La base de connaissances HubSpot actuelle reste en ligne.',
    openArticle: 'Lire l’article',
    chooseLanguage: 'Choisissez la langue de la base de connaissances',
    english: 'English',
    french: 'Français',
  },
};

/**
 * de/nl/it interface copy lives in the translations file so the wording can be
 * refreshed without touching code. categoryCount is rebuilt here because a
 * function cannot be stored in JSON.
 */
const translatedCopy = Object.fromEntries(
  KB_TRANSLATED_LOCALES.map((locale) => {
    const copy = kbTranslations.copy?.[locale] ?? {};
    const { articleCountOne, articleCountMany, ...rest } = copy;
    return [
      locale,
      {
        ...rest,
        english: 'English',
        french: 'Français',
        categoryCount: (count: number) =>
          count === 1
            ? articleCountOne ?? '1'
            : (articleCountMany ?? '{count}').replace('{count}', String(count)),
      },
    ];
  }),
) as Record<KbTranslatedLocale, (typeof baseCopy)['en']>;

export const kbCopy = { ...baseCopy, ...translatedCopy } satisfies Record<
  KbLocale,
  Record<string, string | ((count: number) => string)>
>;

export function isKbLocale(value: string | undefined): value is KbLocale {
  return typeof value === 'string' && (KB_LOCALES as readonly string[]).includes(value);
}

export function previewPathFor(sourcePath: string): string {
  return `${KB_PREVIEW_PREFIX}${sourcePath}`;
}

export function kbHomePath(locale: KbLocale): string {
  return `${KB_PREVIEW_PREFIX}/${locale}/knowledge/`;
}

export function kbSupportPath(locale: KbLocale): string {
  return `${KB_PREVIEW_PREFIX}/${locale}/knowledge/kb-tickets/new/`;
}

export function kbSourceSupportUrl(locale: KbLocale): string {
  return `https://kb.biosked.com/${locale}/knowledge/kb-tickets/new`;
}

export function articlesFor(locale: KbLocale): KbArticle[] {
  return kbSnapshot.articles.filter((article) => article.locale === locale);
}

export function categoriesFor(locale: KbLocale): KbCategory[] {
  return kbSnapshot.categories.filter((category) => category.locale === locale);
}

export function articleForSourcePath(sourcePath: string): KbArticle | undefined {
  return kbSnapshot.articles.find((article) => article.sourcePath === sourcePath);
}

export function articlesInCategory(category: KbCategory): KbArticle[] {
  const allowed = new Set(category.articlePaths);
  return kbSnapshot.articles
    .filter((article) => allowed.has(article.sourcePath))
    .sort((left, right) => left.title.localeCompare(right.title, category.locale));
}

export function latestArticles(locale: KbLocale, limit = 6): KbArticle[] {
  return articlesFor(locale)
    .slice()
    .sort((left, right) => (right.lastModified ?? '').localeCompare(left.lastModified ?? ''))
    .slice(0, limit);
}

export function formatKbDate(value: string | null, locale: KbLocale): string | null {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  const dateLocales: Record<KbLocale, string> = {
    en: 'en-US', fr: 'fr-FR', de: 'de-DE', nl: 'nl-NL', it: 'it-IT',
  };
  return new Intl.DateTimeFormat(dateLocales[locale] ?? 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function languageLinks(
  currentLocale: KbLocale,
  paths: Partial<Record<KbLocale, string>> = {},
): KbLanguageLink[] {
  const labels: Record<KbLocale, string> = {
    en: 'English', fr: 'Français', de: 'Deutsch', nl: 'Nederlands', it: 'Italiano',
  };
  return KB_LOCALES.map((code) => ({
    code,
    label: labels[code],
    href: paths[code] ? previewPathFor(paths[code] as string) : kbHomePath(code),
    active: code === currentLocale,
  }));
}

export function articleLanguageLinks(article: KbArticle): KbLanguageLink[] {
  return languageLinks(article.locale, article.alternates);
}

export function categoryLanguageLinks(category: KbCategory): KbLanguageLink[] {
  const paths: Partial<Record<KbLocale, string>> = { [category.locale]: category.path };
  const article = articlesInCategory(category).find((candidate) =>
    KB_LOCALES.some((code) => code !== category.locale && Boolean(candidate.alternates[code])),
  );
  if (article) {
    for (const locale of KB_LOCALES) {
      const alternateArticlePath = article.alternates[locale];
      const alternateArticle = alternateArticlePath ? articleForSourcePath(alternateArticlePath) : undefined;
      if (alternateArticle?.primaryCategory?.path) paths[locale] = alternateArticle.primaryCategory.path;
    }
  }
  return languageLinks(category.locale, paths);
}

export function routeSlug(sourcePath: string, locale: KbLocale): string {
  return decodeURIComponent(sourcePath.replace(`/${locale}/knowledge/`, ''));
}
