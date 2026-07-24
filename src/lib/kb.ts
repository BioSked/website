import snapshotJson from '@/data/generated/hubspot-kb.json';

export const KB_PREVIEW_PREFIX = '/kb-preview';
export const KB_LOCALES = ['en', 'fr'] as const;
export type KbLocale = (typeof KB_LOCALES)[number];

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

export const kbSnapshot = snapshotJson as unknown as KbSnapshot;

export const kbCopy = {
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
} satisfies Record<KbLocale, Record<string, string | ((count: number) => string)>>;

export function isKbLocale(value: string | undefined): value is KbLocale {
  return value === 'en' || value === 'fr';
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
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
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
  const labels: Record<KbLocale, string> = { en: 'English', fr: 'Français' };
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
  const article = articlesInCategory(category).find((candidate) => {
    const otherLocale = category.locale === 'en' ? 'fr' : 'en';
    return Boolean(candidate.alternates[otherLocale]);
  });
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
