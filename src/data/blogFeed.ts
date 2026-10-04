/**
 * Blog listings (index pages and RSS) for en and fr: the regular posts plus
 * scheduled articles flagged `blog: true` once their date has come
 * (src/data/publishSchedule.mjs).
 */
import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';
import { isLive, scheduleItem } from './publishSchedule.mjs';

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

export async function blogFeed(locale: 'en' | 'fr'): Promise<FeedItem[]> {
    const own: FeedItem[] = locale === 'fr'
        ? (await getCollection('frPosts')).map((p) => ({ href: `/fr/blog/${p.id}/`, title: p.data.title, description: p.data.description, image: p.data.image, date: p.data.date, author: realName(p.data.author), order: 0 }))
        : (await getCollection('enPosts')).map((p) => ({ href: `/blog/posts/${p.id}/`, title: p.data.title, description: p.data.description, image: p.data.image, date: p.data.date, author: realName(p.data.author), order: p.data.sortOrder }));
    const scheduled: FeedItem[] = (await getCollection('scheduled')).flatMap((e) => {
        const item = scheduleItem(e.data.key);
        if (!item || !e.data.blog || !e.data.image || item.locale !== locale || !isLive(item.key)) return [];
        return [{ href: item.path, title: e.data.title, description: e.data.description, image: e.data.image, date: new Date(item.date), author: '', order: 0 }];
    });
    return [...own, ...scheduled].sort((a, b) => b.date.valueOf() - a.date.valueOf() || b.order - a.order || a.href.localeCompare(b.href));
}
