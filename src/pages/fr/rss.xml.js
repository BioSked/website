import { getCollection } from 'astro:content';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET(context) {
    const posts = (await getCollection('frPosts')).sort((a, b) => b.data.date - a.data.date);
    const site = context.site ?? 'https://biosked.com';
    const items = posts.map((p) => `  <item>
    <title>${esc(p.data.title)}</title>
    <link>${new URL(`/fr/blog/${p.id.replace(/\.md$/, '')}/`, site)}</link>
    <guid>${new URL(`/fr/blog/${p.id.replace(/\.md$/, '')}/`, site)}</guid>
    <description>${esc(p.data.description)}</description>
    <pubDate>${new Date(p.data.date).toUTCString()}</pubDate>
  </item>`).join('\n');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>BioSked Momentum — Blog France</title>
  <link>${new URL('/fr/', site)}</link>
  <description>Planification médicale : gardes, désidératas, équité, IA. Articles BioSked en français.</description>
  <language>fr</language>
${items}
</channel></rss>`;
    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
