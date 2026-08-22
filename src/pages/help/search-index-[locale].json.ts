import type { APIRoute } from 'astro';
import { KB_ACTIVE_LOCALES, kbSnapshot } from '@/lib/kb';

export const prerender = true;

export function getStaticPaths() {
  return KB_ACTIVE_LOCALES.map((locale) => ({ params: { locale } }));
}

export const GET: APIRoute = ({ params }) => {
  const index = kbSnapshot.articles
    .filter((article) => article.locale === params.locale)
    .map((article) => ({
      id: article.articleId,
      locale: article.locale,
      title: article.title,
      description: article.description,
      category: article.primaryCategory?.title ?? '',
      subcategory: article.subcategory ?? '',
      path: `${article.sitePath}/`,
      searchText: article.searchText,
    }));

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
