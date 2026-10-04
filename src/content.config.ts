import { defineCollection } from "astro:content";
import { glob } from 'astro/loaders';
import { z } from "astro/zod";

const enPosts = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/pages/blog/posts" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        image: image(),
        author: z.string(),
        date: z.date(),
        sortOrder: z.number().default(0),
    }),
});

const frPosts = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/pages/fr/blog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        image: image(),
        author: z.string(),
        date: z.date(),
        canonicalPath: z.string().optional(),
        sourceUrl: z.string().optional(),
    }),
});

const enChangelogs = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/pages/changelog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        image: image(),
        author: z.string(),
        version: z.string(),
        date: z.date(),
    }),
});

const changelogSchema = ({ image }: { image: () => any }) => z.object({
    title: z.string(),
    description: z.string(),
    image: image(),
    author: z.string(),
    version: z.string(),
    date: z.date(),
    lang: z.string().optional(),
});

const frChangelogs = defineCollection({ loader: glob({ pattern: "*.md", base: "./src/pages/fr/changelog" }), schema: changelogSchema });
const deChangelogs = defineCollection({ loader: glob({ pattern: "*.md", base: "./src/pages/de/changelog" }), schema: changelogSchema });
const nlChangelogs = defineCollection({ loader: glob({ pattern: "*.md", base: "./src/pages/nl/changelog" }), schema: changelogSchema });
const itChangelogs = defineCollection({ loader: glob({ pattern: "*.md", base: "./src/pages/it/changelog" }), schema: changelogSchema });

// Articles published on a date set in src/data/publishSchedule.mjs (see src/pages/[...scheduled].astro).
const scheduled = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/scheduled" }),
    schema: ({ image }) => z.object({
        key: z.string(),
        title: z.string(),
        description: z.string(),
        breadcrumb: z.string().optional(),
        byline: z.string().optional(),
        aside: z.object({
            heading: z.string(),
            text: z.string(),
            demo_label: z.string(),
            secondary_label: z.string().optional(),
            secondary_href: z.string().optional(),
        }).optional(),
        blog: z.boolean().default(false),
        image: image().optional(),
    }),
});

export const collections = { scheduled, enPosts, frPosts, enChangelogs, frChangelogs, deChangelogs, nlChangelogs, itChangelogs };
