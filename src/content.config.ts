import { defineCollection } from "astro:content";
import { glob, file } from 'astro/loaders';
import { z } from "astro/zod";

const enPosts = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/pages/blog/posts" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        image: image(),
        author: z.string(),
        date: z.date(),
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

// const frPosts = defineCollection({
//     loader: glob({ pattern: "**/*.md", base: "./src/pages/blog/posts/fr" }),
//     schema: ({ image }) => z.object({
//         title: z.string(),
//         description: z.string(),
//         image: image(),
//         author: z.string(),
//         date: z.date()
//     }),
// });

export const collections = { enPosts, enChangelogs};