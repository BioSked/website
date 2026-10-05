/**
 * Blog listings (index pages and RSS) for en and fr: the regular posts, the
 * English guides (src/pages/guides/) and scheduled articles flagged
 * `blog: true` once their date has come (src/data/publishSchedule.mjs).
 */
import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';
import { scheduleItem } from './publishSchedule.mjs';
import { isPublished } from './scheduledContent';
import physicianCallCover from '../assets/fr-blog/2026-10-04-planning-de-garde-medecins-editorial.webp';

export interface FeedItem {
    href: string;
    title: string;
    description: string;
    image: ImageMetadata;
    date: Date;
    /** Real author names only; team handles such as "Marketing" are not shown. */
    author: string;
    order: number;
}

const realName = (author: string) => (/\s/.test(author.trim()) ? author.trim() : '');

// English guides live outside the blog folder; the French guide is a blog post already.
// Covers are imported one by one: a glob over src/assets would ship every original file.
interface GuideFrontmatter { title: string; description: string; date: string }
const guidePages = import.meta.glob<{ frontmatter: GuideFrontmatter }>('../pages/guides/*.md', { eager: true });
const GUIDE_COVERS: Record<string, ImageMetadata> = { 'physician-call-schedule': physicianCallCover };

function englishGuides(): FeedItem[] {
    return Object.entries(guidePages).map(([file, page]) => {
        const slug = file.split('/').pop()!.replace(/\.md$/, '');
        const image = GUIDE_COVERS[slug];
        if (!image) throw new Error(`Add the cover of /guides/${slug}/ to GUIDE_COVERS in src/data/blogFeed.ts`);
        const fm = page.frontmatter;
        return { href: `/guides/${slug}/`, title: fm.title, description: fm.description, image, date: new Date(fm.date), author: '', order: 0 };
    });
}

export async function blogFeed(locale: 'en' | 'fr'): Promise<FeedItem[]> {
    const own: FeedItem[] = locale === 'fr'
        ? (await getCollection('frPosts')).map((p) => ({ href: `/fr/blog/${p.id}/`, title: p.data.title, description: p.data.description, image: p.data.image, date: p.data.date, author: realName(p.data.author), order: 0 }))
        : (await getCollection('enPosts')).map((p) => ({ href: `/blog/posts/${p.id}/`, title: p.data.title, description: p.data.description, image: p.data.image, date: p.data.date, author: realName(p.data.author), order: p.data.sortOrder }));
    const scheduled: FeedItem[] = (await getCollection('scheduled')).flatMap((e) => {
        const item = scheduleItem(e.data.key);
        if (!item || !e.data.blog || !e.data.image || item.locale !== locale || !isPublished(item.key)) return [];
        return [{ href: item.path, title: e.data.title, description: e.data.description, image: e.data.image, date: new Date(item.date), author: '', order: 0 }];
    });
    const guides = locale === 'en' ? englishGuides() : [];
    return [...own, ...guides, ...scheduled].sort((a, b) => b.date.valueOf() - a.date.valueOf() || b.order - a.order || a.href.localeCompare(b.href));
}
