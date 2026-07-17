import { mkdir, rm, writeFile } from "node:fs/promises";
import { basename, extname } from "node:path";

const API_URL =
  "https://biosked.fr/wp-json/wp/v2/posts?per_page=100&_embed=1";
const BLOG_DIR = new URL("../src/pages/blog/", import.meta.url);
const ASSET_DIR = new URL("../src/assets/fr-blog/", import.meta.url);
const FALLBACK_IMAGE = "../../assets/images/healthcare-planning.webp";

const COMMON_ENTITIES = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": '"',
  "&#039;": "'",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&rdquo;": "”",
  "&ldquo;": "“",
  "&hellip;": "…",
  "&#8217;": "’",
  "&#8216;": "‘",
  "&#8220;": "“",
  "&#8221;": "”",
  "&#8230;": "…",
  "&#038;": "&",
};

function decodeEntities(value = "") {
  return value
    .replace(/&(nbsp|amp|quot|rsquo|lsquo|rdquo|ldquo|hellip);|&#0?39;|&#8217;|&#8216;|&#8220;|&#8221;|&#8230;|&#038;/g, (entity) => COMMON_ENTITIES[entity] ?? entity)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16))
    );
}

function stripHtml(html = "") {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function yamlString(value = "") {
  return JSON.stringify(decodeEntities(value).replace(/\s+/g, " ").trim());
}

function sanitizeFilename(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function normalizeInternalLinks(content) {
  return content
    .replace(/https:\/\/biosked\.fr\/demander-une-demo\/?/g, "/demo/")
    .replace(/https:\/\/biosked\.fr\/blog\//g, "/blog/")
    .replace(/https:\/\/biosked\.fr\/secteurs-soins\//g, "/secteurs-soins/")
    .replace(/https:\/\/biosked\.fr\/fonctionnalites\//g, "/fonctionnalites/")
    .replace(/https:\/\/biosked\.fr\/ressources\/temoignages\/?/g, "/cas-clients/")
    .replace(/https:\/\/biosked\.fr\/la-societe-biosked\/nous-connaitre\/?/g, "/about/");
}

async function downloadAsset(url, prefix) {
  if (!url) return FALLBACK_IMAGE;

  const source = new URL(url);
  const extension = extname(source.pathname) || ".jpg";
  const rawName = basename(source.pathname, extension);
  const filename = `${sanitizeFilename(prefix)}-${sanitizeFilename(rawName)}${extension.toLowerCase()}`;
  const fileUrl = new URL(filename, ASSET_DIR);
  const response = await fetch(url);

  if (!response.ok) {
    console.warn(`Could not download ${url}: ${response.status}`);
    return FALLBACK_IMAGE;
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(fileUrl, bytes);
  return `../../assets/fr-blog/${filename}`;
}

async function localizeInlineImages(content, slug) {
  const imageUrls = [...content.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => match[1])
    .filter((url) => url.startsWith("https://biosked.fr/wp-content/uploads/"));

  let localized = content;

  for (const [index, url] of [...new Set(imageUrls)].entries()) {
    const localPath = await downloadAsset(url, `${slug}-inline-${index + 1}`);
    localized = localized.replaceAll(url, localPath);
  }

  return localized;
}

async function main() {
  await mkdir(BLOG_DIR, { recursive: true });
  await rm(ASSET_DIR, { recursive: true, force: true });
  await mkdir(ASSET_DIR, { recursive: true });

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`WordPress API request failed: ${response.status}`);
  }

  const posts = await response.json();

  for (const post of posts) {
    const title = decodeEntities(post.title?.rendered ?? post.slug);
    const date = post.date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10);
    const author = post._embedded?.author?.[0]?.name ?? "BioSked";
    const featuredUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    const image = await downloadAsset(featuredUrl, `${date}-${post.slug}`);
    const excerpt = stripHtml(post.excerpt?.rendered ?? "").replace(/\s*\[…\]$/, "");
    const description =
      excerpt.length > 220 ? `${excerpt.slice(0, 217).trim()}...` : excerpt;
    const content = await localizeInlineImages(
      normalizeInternalLinks(post.content?.rendered ?? ""),
      post.slug
    );

    const markdown = `---
layout: "@layouts/ArticleLayout.astro"
date: ${date}
author: ${yamlString(author)}
title: ${yamlString(title)}
description: ${yamlString(description)}
image: "${image}"
canonicalPath: "/blog/${post.slug}/"
sourceUrl: "https://biosked.fr/blog/${post.slug}/"
---

![${title}](${image})

${content}
`;

    await writeFile(new URL(`${post.slug}.md`, BLOG_DIR), markdown);
  }

  console.log(`Imported ${posts.length} French blog posts into ${BLOG_DIR.pathname}`);
}

await main();
