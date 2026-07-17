import { getCollection } from 'astro:content';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET(context) {
    const posts = (await getCollection('enPosts')).sort((a, b) => b.data.date - a.data.date);
    const site = context.site ?? 'https://biosked.com';
    const items = posts.map((p) => `  <item>
    <title>${esc(p.data.title)}</title>
    <link>${new URL(`/blog/posts/${p.id.replace(/\.md$/, '')}/`, site)}</link>
    <guid>${new URL(`/blog/posts/${p.id.replace(/\.md$/, '')}/`, site)}</guid>
    <description>${esc(p.data.description)}</description>
    <pubDate>${new Date(p.data.date).toUTCString()}</pubDate>
  </item>`).join('\n');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>Momentum by BioSked — Blog</title>
  <link>${site}</link>
  <description>Healthcare staff scheduling: product news and practice insights from BioSked.</description>
  <language>en</language>
${items}
</channel></rss>`;
    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
