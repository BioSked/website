import type { APIRoute } from 'astro';
import { kbSnapshot } from '@/lib/kb';

export const prerender = true;

export const GET: APIRoute = () => {
  const index = kbSnapshot.articles.map((article) => ({
    id: article.articleId,
    locale: article.locale,
    title: article.title,
    description: article.description,
    category: article.primaryCategory?.title ?? '',
    subcategory: article.subcategory ?? '',
    path: `${article.previewPath}/`,
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
