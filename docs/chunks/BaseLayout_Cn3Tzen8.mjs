import { a as createAstro, c as createComponent, b as renderTemplate, d as addAttribute, m as maybeRenderHead, f as renderSlot, e as renderScript, A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as IncompatibleDescriptorOptions, g as UnsupportedImageConversion, t as toStyleString, N as NoImageMetadata, F as FailedToFetchRemoteImageDimensions, h as ExpectedImageOptions, i as ExpectedNotESMImage, j as InvalidImageService, k as ImageMissingAlt, s as spreadAttributes, l as ExperimentalFontsNotEnabled, n as FontFamilyNotFound, u as unescapeHTML, r as renderComponent, o as renderHead } from './astro/server_B5cfr19O.mjs';
import 'piccolore';
/* empty css                         */
import { clsx } from 'clsx';
import { joinPaths, isRemotePath } from '@astrojs/internal-helpers/path';
import { isRemoteAllowed } from '@astrojs/internal-helpers/remote';
import * as mime from 'mrmime';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { twMerge } from 'tailwind-merge';
import { useState, useEffect } from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDownIcon, XIcon, Check } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const SITE_TITLE = "Momentum - Healthcare Scheduling Software by BioSked";
const SITE_DESCRIPTION = "Momentum by BioSked: AI-powered healthcare scheduling software for hospitals, clinics, and medical practices. Automate physician scheduling, RVU tracking, shift management, and compliance for radiology, emergency medicine, anesthesiology, and specialty practices.";
const SITE_METADATA = {
  title: {
    default: SITE_TITLE},
  description: SITE_DESCRIPTION,
  keywords: [
    "healthcare scheduling software",
    "medical staff scheduling",
    "RVU scheduling",
    "hospital staffing software",
    "radiology scheduling software",
    "emergency department scheduling",
    "anesthesiology scheduling",
    "physician scheduling",
    "clinic scheduling software",
    "medical practice scheduling",
    "hospital group scheduling",
    "multi-site healthcare scheduling",
    "pathology scheduling software",
    "cardiology practice scheduling",
    "OBGYN scheduling",
    "pediatric practice scheduling",
    "residency scheduling software",
    "ophthalmology scheduling",
    "telemedicine scheduling",
    "primary care scheduling",
    "healthcare workforce management",
    "medical group scheduling",
    "ambulatory scheduling",
    "clinical scheduling software",
    "staff scheduling automation"
  ],
  authors: [{ name: "BioSked Team" }],
  creator: "Momentum by BioSked",
  publisher: "BioSked Inc.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" }
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }]
  },
  openGraph: {
    siteName: "Momentum by BioSked",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Momentum by BioSked - AI-Powered Healthcare Scheduling Software for Hospitals and Clinics"
      }
    ]
  }
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$8 = createAstro("https://newwebsite.biosked.com");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = Astro2.site ? new URL(Astro2.url.pathname, Astro2.site) : null;
  const { title, description, image } = Astro2.props;
  const finalTitle = title || SITE_METADATA.title.default;
  const finalDescription = description || SITE_METADATA.description;
  const finalImage = image || SITE_METADATA.openGraph.images[0].url;
  const imageURL = new URL(finalImage, Astro2.url);
  return renderTemplate(_a || (_a = __template(['<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots"', '><meta name="keywords"', '><meta name="author"', '><meta name="creator"', '><meta name="publisher"', "><script>\n  (function() {\n    const theme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');\n    if (theme === 'dark') document.documentElement.classList.add('dark');\n  })();\n<\/script><style>\n  html {\n    color-scheme: light dark;\n  }\n</style>", "", "", '<link rel="manifest" href="/favicon/site.webmanifest"><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"', "", '><link rel="alternate" hreflang="en-US"', '><link rel="alternate" hreflang="en-GB"', '><link rel="alternate" hreflang="x-default"', '><meta name="generator"', ">", "<title>", '</title><meta name="title"', '><meta name="description"', '><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:site_name"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:width"', '><meta property="og:image:height"', '><meta property="og:image:alt"', '><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@graph": [\n    {\n      "@type": "Organization",\n      "@id": "https://www.biosked.com/#organization",\n      "name": "BioSked Inc.",\n      "legalName": "BioSked Inc.",\n      "url": "https://www.biosked.com",\n      "logo": {\n        "@type": "ImageObject",\n        "url": "https://www.biosked.com/images/logo.png",\n        "width": 512,\n        "height": 512\n      },\n      "description": "Healthcare technology company specializing in AI-powered scheduling and workforce management solutions for hospitals, clinics, medical practices, and multi-specialty groups including radiology, emergency medicine, anesthesiology, and more.",\n      "address": [\n        {\n          "@type": "PostalAddress",\n          "addressCountry": "US"\n        },\n        {\n          "@type": "PostalAddress",\n          "addressCountry": "EU"\n        }\n      ],\n      "contactPoint": [\n        {\n          "@type": "ContactPoint",\n          "contactType": "Sales",\n          "email": "sales@biosked.com",\n          "availableLanguage": ["English"]\n        },\n        {\n          "@type": "ContactPoint",\n          "contactType": "Customer Support",\n          "email": "support@biosked.com",\n          "availableLanguage": ["English"]\n        }\n      ],\n      "sameAs": [\n        "https://www.linkedin.com/company/biosked"\n      ],\n      "areaServed": [\n        {\n          "@type": "Country",\n          "name": "United States"\n        },\n        {\n          "@type": "Place",\n          "name": "European Union"\n        }\n      ]\n    },\n    {\n      "@type": "WebSite",\n      "@id": "https://www.biosked.com/#website",\n      "url": "https://www.biosked.com",\n      "name": "Momentum by BioSked",\n      "description": "Momentum: AI-powered healthcare scheduling software for hospitals, clinics, and medical practices",\n      "publisher": {\n        "@id": "https://www.biosked.com/#organization"\n      },\n      "inLanguage": "en-US",\n      "potentialAction": {\n        "@type": "SearchAction",\n        "target": "https://www.biosked.com/search?q={search_term_string}",\n        "query-input": "required name=search_term_string"\n      }\n    },\n    {\n      "@type": "SoftwareApplication",\n      "@id": "https://www.biosked.com/#software",\n      "name": "Momentum",\n      "applicationCategory": "BusinessApplication",\n      "applicationSubCategory": "Healthcare Management Software",\n      "operatingSystem": "Web, iOS, Android",\n      "description": "Healthcare scheduling software for radiology, emergency medicine, anesthesiology, pathology, cardiology, OB/GYN, pediatrics, ophthalmology, telemedicine, and primary care. Automates schedule generation, shift swaps, RVU tracking, and compliance for hospitals, clinics, and medical groups.",\n      "url": "https://www.biosked.com",\n      "offers": {\n        "@type": "Offer",\n        "price": "0",\n        "priceCurrency": "USD",\n        "priceValidUntil": "2025-12-31",\n        "availability": "https://schema.org/InStock",\n        "url": "https://www.biosked.com/pricing"\n      },\n      "aggregateRating": {\n        "@type": "AggregateRating",\n        "ratingValue": "4.8",\n        "reviewCount": "150",\n        "bestRating": "5",\n        "worstRating": "1"\n      },\n      "creator": {\n        "@id": "https://www.biosked.com/#organization"\n      },\n      "audience": [\n        {\n          "@type": "Audience",\n          "audienceType": "Hospital Groups"\n        },\n        {\n          "@type": "Audience",\n          "audienceType": "Medical Clinics"\n        },\n        {\n          "@type": "Audience",\n          "audienceType": "Large Medical Practices"\n        },\n        {\n          "@type": "Audience",\n          "audienceType": "Small Medical Practices"\n        },\n        {\n          "@type": "Audience",\n          "audienceType": "Radiology Departments"\n        },\n        {\n          "@type": "Audience",\n          "audienceType": "Emergency Departments"\n        },\n        {\n          "@type": "Audience",\n          "audienceType": "Specialty Medical Groups"\n        }\n      ],\n      "featureList": [\n        "Automated schedule generation",\n        "RVU scheduling and tracking",\n        "Radiology scheduling optimization",\n        "Emergency department scheduling",\n        "Multi-site scheduling",\n        "Shift swap management",\n        "Compliance tracking",\n        "Staff optimization",\n        "AI-powered scheduling",\n        "Mobile app access",\n        "Real-time notifications",\n        "Specialty-specific templates"\n      ],\n      "screenshot": "https://www.biosked.com/images/screenshot.png"\n    }\n  ]\n}\n<\/script>'])), addAttribute(`${"index" }, ${"follow" }`, "content"), addAttribute(SITE_METADATA.keywords.join(", "), "content"), addAttribute(SITE_METADATA.authors[0].name, "content"), addAttribute(SITE_METADATA.creator, "content"), addAttribute(SITE_METADATA.publisher, "content"), SITE_METADATA.icons.icon.map((icon) => renderTemplate`<link rel="icon"${addAttribute(icon.type, "type")}${addAttribute(icon.sizes, "sizes")}${addAttribute(icon.url, "href")}>`), SITE_METADATA.icons.apple.map((icon) => renderTemplate`<link rel="apple-touch-icon"${addAttribute(icon.sizes, "sizes")}${addAttribute(icon.url, "href")}>`), SITE_METADATA.icons.shortcut.map((icon) => renderTemplate`<link rel="shortcut icon"${addAttribute(icon.url, "href")}>`), addAttribute(SITE_TITLE, "title"), addAttribute(Astro2.site ? new URL("rss.xml", Astro2.site).toString() : "/rss.xml", "href"), addAttribute(`https://www.biosked.com${Astro2.url.pathname}`, "href"), addAttribute(`https://www.biosked.com${Astro2.url.pathname}`, "href"), addAttribute(`https://www.biosked.com${Astro2.url.pathname}`, "href"), addAttribute(Astro2.generator, "content"), canonicalURL && renderTemplate`<link rel="canonical"${addAttribute(canonicalURL, "href")}>`, finalTitle, addAttribute(finalTitle, "content"), addAttribute(finalDescription, "content"), addAttribute(Astro2.url, "content"), addAttribute(SITE_METADATA.openGraph.siteName, "content"), addAttribute(finalTitle, "content"), addAttribute(finalDescription, "content"), addAttribute(imageURL, "content"), addAttribute(SITE_METADATA.openGraph.images[0].width.toString(), "content"), addAttribute(SITE_METADATA.openGraph.images[0].height.toString(), "content"), addAttribute(SITE_METADATA.openGraph.images[0].alt, "content"), addAttribute(Astro2.url, "content"), addAttribute(finalTitle, "content"), addAttribute(finalDescription, "content"), addAttribute(imageURL, "content"));
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/BaseHead.astro", void 0);

const $$Astro$7 = createAstro("https://newwebsite.biosked.com");
const $$NavigationProvider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$NavigationProvider;
  const { currentPath } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div data-navigation-provider${addAttribute(currentPath, "data-current-path")}> ${renderSlot($$result, $$slots["default"])} </div> ${renderScript($$result, "/Users/biofred/Documents/Dev/marketing-site/src/components/elements/NavigationProvider.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/elements/NavigationProvider.astro", void 0);

const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position"
];

const DEFAULT_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  960,
  // older horizontal phones
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  1920,
  // 1080p
  2048,
  // QXGA
  2560,
  // WQXGA
  3200,
  // QHD+
  3840,
  // 4K
  4480,
  // 4.5K
  5120,
  // 5K
  6016
  // 6K
];
const LIMITED_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  2048,
  // QXGA
  2560
  // WQXGA
];
const getWidths = ({
  width,
  layout,
  breakpoints = DEFAULT_RESOLUTIONS,
  originalWidth
}) => {
  const smallerThanOriginal = (w) => !originalWidth || w <= originalWidth;
  if (layout === "full-width") {
    return breakpoints.filter(smallerThanOriginal);
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  const maxSize = originalWidth ? Math.min(doubleWidth, originalWidth) : doubleWidth;
  if (layout === "fixed") {
    return originalWidth && width > originalWidth ? [originalWidth] : [width, maxSize];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      ...breakpoints
    ].filter((w) => w <= maxSize).sort((a, b) => a - b);
  }
  return [];
};
const getSizesAttribute = ({
  width,
  layout
}) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    // If screen is wider than the max size then image width is the max size,
    // otherwise it's the width of the screen
    case "constrained":
      return `(min-width: ${width}px) ${width}px, 100vw`;
    // Image is always the same width, whatever the size of the screen
    case "fixed":
      return `${width}px`;
    // Image is always the width of the screen
    case "full-width":
      return `100vw`;
    case "none":
    default:
      return void 0;
  }
};

function isESMImportedImage(src) {
  return typeof src === "object" || typeof src === "function" && "src" in src;
}
function isRemoteImage(src) {
  return typeof src === "string";
}
async function resolveSrc(src) {
  if (typeof src === "object" && "then" in src) {
    const resource = await src;
    return resource.default ?? resource;
  }
  return src;
}

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const sortNumeric = (a, b) => a - b;
const baseService = {
  validateOptions(options) {
    if (!options.src || !isRemoteImage(options.src) && !isESMImportedImage(options.src)) {
      throw new AstroError({
        ...ExpectedImage,
        message: ExpectedImage.message(
          JSON.stringify(options.src),
          typeof options.src,
          JSON.stringify(options, (_, v) => v === void 0 ? null : v)
        )
      });
    }
    if (!isESMImportedImage(options.src)) {
      if (options.src.startsWith("/@fs/") || !isRemotePath(options.src) && !options.src.startsWith("/")) {
        throw new AstroError({
          ...LocalImageUsedWrongly,
          message: LocalImageUsedWrongly.message(options.src)
        });
      }
      let missingDimension;
      if (!options.width && !options.height) {
        missingDimension = "both";
      } else if (!options.width && options.height) {
        missingDimension = "width";
      } else if (options.width && !options.height) {
        missingDimension = "height";
      }
      if (missingDimension) {
        throw new AstroError({
          ...MissingImageDimension,
          message: MissingImageDimension.message(missingDimension, options.src)
        });
      }
    } else {
      if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
        throw new AstroError({
          ...UnsupportedImageFormat,
          message: UnsupportedImageFormat.message(
            options.src.format,
            options.src.src,
            VALID_SUPPORTED_FORMATS
          )
        });
      }
      if (options.widths && options.densities) {
        throw new AstroError(IncompatibleDescriptorOptions);
      }
      if (options.src.format === "svg") {
        options.format = "svg";
      }
      if (options.src.format === "svg" && options.format !== "svg" || options.src.format !== "svg" && options.format === "svg") {
        throw new AstroError(UnsupportedImageConversion);
      }
    }
    if (!options.format) {
      options.format = DEFAULT_OUTPUT_FORMAT;
    }
    if (options.width) options.width = Math.round(options.width);
    if (options.height) options.height = Math.round(options.height);
    if (options.layout && options.width && options.height) {
      options.fit ??= "cover";
      delete options.layout;
    }
    if (options.fit === "none") {
      delete options.fit;
    }
    return options;
  },
  getHTMLAttributes(options) {
    const { targetWidth, targetHeight } = getTargetDimensions(options);
    const {
      src,
      width,
      height,
      format,
      quality,
      densities,
      widths,
      formats,
      layout,
      priority,
      fit,
      position,
      ...attributes
    } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getSrcSet(options) {
    const { targetWidth, targetHeight } = getTargetDimensions(options);
    const aspectRatio = targetWidth / targetHeight;
    const { widths, densities } = options;
    const targetFormat = options.format ?? DEFAULT_OUTPUT_FORMAT;
    let transformedWidths = (widths ?? []).sort(sortNumeric);
    let imageWidth = options.width;
    let maxWidth = Infinity;
    if (isESMImportedImage(options.src)) {
      imageWidth = options.src.width;
      maxWidth = imageWidth;
      if (transformedWidths.length > 0 && transformedWidths.at(-1) > maxWidth) {
        transformedWidths = transformedWidths.filter((width) => width <= maxWidth);
        transformedWidths.push(maxWidth);
      }
    }
    transformedWidths = Array.from(new Set(transformedWidths));
    const {
      width: transformWidth,
      height: transformHeight,
      ...transformWithoutDimensions
    } = options;
    let allWidths = [];
    if (densities) {
      const densityValues = densities.map((density) => {
        if (typeof density === "number") {
          return density;
        } else {
          return parseFloat(density);
        }
      });
      const densityWidths = densityValues.sort(sortNumeric).map((density) => Math.round(targetWidth * density));
      allWidths = densityWidths.map((width, index) => ({
        width,
        descriptor: `${densityValues[index]}x`
      }));
    } else if (transformedWidths.length > 0) {
      allWidths = transformedWidths.map((width) => ({
        width,
        descriptor: `${width}w`
      }));
    }
    return allWidths.map(({ width, descriptor }) => {
      const height = Math.round(width / aspectRatio);
      const transform = { ...transformWithoutDimensions, width, height };
      return {
        transform,
        descriptor,
        attributes: {
          type: `image/${targetFormat}`
        }
      };
    });
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format",
      fit: "fit",
      position: "position"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/", imageConfig.endpoint.route);
    let url = `${imageEndpoint}?${searchParams}`;
    if (imageConfig.assetQueryParams) {
      const assetQueryString = imageConfig.assetQueryParams.toString();
      if (assetQueryString) {
        url += "&" + assetQueryString;
      }
    }
    return url;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q"),
      fit: params.get("fit"),
      position: params.get("position") ?? void 0
    };
    return transform;
  }
};
function getTargetDimensions(options) {
  let targetWidth = options.width;
  let targetHeight = options.height;
  if (isESMImportedImage(options.src)) {
    const aspectRatio = options.src.width / options.src.height;
    if (targetHeight && !targetWidth) {
      targetWidth = Math.round(targetHeight * aspectRatio);
    } else if (targetWidth && !targetHeight) {
      targetHeight = Math.round(targetWidth / aspectRatio);
    } else if (!targetWidth && !targetHeight) {
      targetWidth = options.src.width;
      targetHeight = options.src.height;
    }
  }
  return {
    targetWidth,
    targetHeight
  };
}

function isImageMetadata(src) {
  return src.fsPath && !("fsPath" in src);
}

const cssFitValues = ["fill", "contain", "cover", "scale-down"];
function addCSSVarsToStyle(vars, styles) {
  const cssVars = Object.entries(vars).filter(([_, value]) => value !== void 0 && value !== false).map(([key, value]) => `--${key}: ${value};`).join(" ");
  if (!styles) {
    return cssVars;
  }
  const style = typeof styles === "string" ? styles : toStyleString(styles);
  return `${cssVars} ${style}`;
}

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4) return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize) return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box) break;
    if (box.name === boxName) return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  avis: "avif",
  // avif-sequence
  mif1: "heif",
  msf1: "heif",
  // heif-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected || "avis" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1) return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(i);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = extractorRegExps.width.exec(root);
  const height = extractorRegExps.height.exec(root);
  const viewbox = extractorRegExps.viewbox.exec(root);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = extractorRegExps.root.exec(toUTF8String(input));
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function imageMetadata(data, src) {
  let result;
  try {
    result = lookup(data);
  } catch {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
  if (!result.height || !result.width || !result.type) {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
  const { width, height, type, orientation } = result;
  const isPortrait = (orientation || 0) >= 5;
  return {
    width: isPortrait ? height : width,
    height: isPortrait ? width : height,
    format: type,
    orientation
  };
}

async function inferRemoteSize(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = await imageMetadata(accumulatedChunks, url);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch {
      }
    }
  }
  throw new AstroError({
    ...NoImageMetadata,
    message: NoImageMetadata.message(url)
  });
}

const PLACEHOLDER_BASE = "astro://placeholder";
function createPlaceholderURL(pathOrUrl) {
  return new URL(pathOrUrl, PLACEHOLDER_BASE);
}
function stringifyPlaceholderURL(url) {
  return url.href.replace(PLACEHOLDER_BASE, "");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './sharp_C7OhdBDp.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  if (isImageMetadata(options)) {
    throw new AstroError(ExpectedNotESMImage);
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  let originalWidth;
  let originalHeight;
  if (options.inferSize && isRemoteImage(resolvedOptions.src) && isRemotePath(resolvedOptions.src)) {
    const result = await inferRemoteSize(resolvedOptions.src);
    resolvedOptions.width ??= result.width;
    resolvedOptions.height ??= result.height;
    originalWidth = result.width;
    originalHeight = result.height;
    delete resolvedOptions.inferSize;
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  if (isESMImportedImage(clonedSrc)) {
    originalWidth = clonedSrc.width;
    originalHeight = clonedSrc.height;
  }
  if (originalWidth && originalHeight) {
    const aspectRatio = originalWidth / originalHeight;
    if (resolvedOptions.height && !resolvedOptions.width) {
      resolvedOptions.width = Math.round(resolvedOptions.height * aspectRatio);
    } else if (resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.height = Math.round(resolvedOptions.width / aspectRatio);
    } else if (!resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.width = originalWidth;
      resolvedOptions.height = originalHeight;
    }
  }
  resolvedOptions.src = clonedSrc;
  const layout = options.layout ?? imageConfig.layout ?? "none";
  if (resolvedOptions.priority) {
    resolvedOptions.loading ??= "eager";
    resolvedOptions.decoding ??= "sync";
    resolvedOptions.fetchpriority ??= "high";
    delete resolvedOptions.priority;
  } else {
    resolvedOptions.loading ??= "lazy";
    resolvedOptions.decoding ??= "async";
    resolvedOptions.fetchpriority ??= "auto";
  }
  if (layout !== "none") {
    resolvedOptions.widths ||= getWidths({
      width: resolvedOptions.width,
      layout,
      originalWidth,
      breakpoints: imageConfig.breakpoints?.length ? imageConfig.breakpoints : isLocalService(service) ? LIMITED_RESOLUTIONS : DEFAULT_RESOLUTIONS
    });
    resolvedOptions.sizes ||= getSizesAttribute({ width: resolvedOptions.width, layout });
    delete resolvedOptions.densities;
    resolvedOptions.style = addCSSVarsToStyle(
      {
        fit: cssFitValues.includes(resolvedOptions.fit ?? "") && resolvedOptions.fit,
        pos: resolvedOptions.position
      },
      resolvedOptions.style
    );
    resolvedOptions["data-astro-image"] = layout;
  }
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  const matchesValidatedTransform = (transform) => transform.width === validatedOptions.width && transform.height === validatedOptions.height && transform.format === validatedOptions.format;
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesValidatedTransform(srcSet.transform) ? imageURL : await service.getURL(srcSet.transform, imageConfig),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    })
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesValidatedTransform(srcSet.transform) ? imageURL : globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    });
  } else if (imageConfig.assetQueryParams) {
    const imageURLObj = createPlaceholderURL(imageURL);
    imageConfig.assetQueryParams.forEach((value, key) => {
      imageURLObj.searchParams.set(key, value);
    });
    imageURL = stringifyPlaceholderURL(imageURLObj);
    srcSets = srcSets.map((srcSet) => {
      const urlObj = createPlaceholderURL(srcSet.url);
      imageConfig.assetQueryParams.forEach((value, key) => {
        urlObj.searchParams.set(key, value);
      });
      return {
        ...srcSet,
        url: stringifyPlaceholderURL(urlObj)
      };
    });
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$6 = createAstro("https://newwebsite.biosked.com");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const layout = props.layout ?? imageConfig.layout ?? "none";
  if (layout !== "none") {
    props.layout ??= imageConfig.layout;
    props.fit ??= imageConfig.objectFit ?? "cover";
    props.position ??= imageConfig.objectPosition ?? "center";
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  const { class: className, ...attributes } = { ...additionalAttributes, ...image.attributes };
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}>`;
}, "/Users/biofred/Documents/Dev/marketing-site/node_modules/astro/components/Image.astro", void 0);

const $$Astro$5 = createAstro("https://newwebsite.biosked.com");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  const layout = props.layout ?? imageConfig.layout ?? "none";
  const useResponsive = layout !== "none";
  if (useResponsive) {
    props.layout ??= imageConfig.layout;
    props.fit ??= imageConfig.objectFit ?? "cover";
    props.position ??= imageConfig.objectPosition ?? "center";
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  const { class: className, ...attributes } = {
    ...imgAdditionalAttributes,
    ...fallbackImage.attributes
  };
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths && !useResponsive ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute(mime.lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })}  <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}> </picture>`;
}, "/Users/biofred/Documents/Dev/marketing-site/node_modules/astro/components/Picture.astro", void 0);

const fontsMod = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

function filterPreloads(data, preload) {
  if (!preload) {
    return null;
  }
  if (preload === true) {
    return data;
  }
  return data.filter(
    ({ weight, style, subset }) => preload.some((p) => {
      if (p.weight !== void 0 && weight !== void 0 && !checkWeight(p.weight.toString(), weight)) {
        return false;
      }
      if (p.style !== void 0 && p.style !== style) {
        return false;
      }
      if (p.subset !== void 0 && p.subset !== subset) {
        return false;
      }
      return true;
    })
  );
}
function checkWeight(input, target) {
  const trimmedInput = input.trim();
  if (trimmedInput.includes(" ")) {
    return trimmedInput === target;
  }
  if (target.includes(" ")) {
    const [a, b] = target.split(" ");
    const parsedInput = Number.parseInt(input);
    return parsedInput >= Number.parseInt(a) && parsedInput <= Number.parseInt(b);
  }
  return input === target;
}

const $$Astro$4 = createAstro("https://newwebsite.biosked.com");
const $$Font = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Font;
  const { internalConsumableMap } = fontsMod;
  if (!internalConsumableMap) {
    throw new AstroError(ExperimentalFontsNotEnabled);
  }
  const { cssVariable, preload = false } = Astro2.props;
  const data = internalConsumableMap.get(cssVariable);
  if (!data) {
    throw new AstroError({
      ...FontFamilyNotFound,
      message: FontFamilyNotFound.message(cssVariable)
    });
  }
  const filteredPreloadData = filterPreloads(data.preloadData, preload);
  return renderTemplate`<style>${unescapeHTML(data.css)}</style>${filteredPreloadData?.map(({ url, type }) => renderTemplate`<link rel="preload"${addAttribute(url, "href")} as="font"${addAttribute(`font/${type}`, "type")} crossorigin>`)}`;
}, "/Users/biofred/Documents/Dev/marketing-site/node_modules/astro/components/Font.astro", void 0);

const assetQueryParams = undefined;
							const imageConfig = {"endpoint":{"route":"/_image"},"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[],"responsiveStyles":false};
							Object.defineProperty(imageConfig, 'assetQueryParams', {
								value: assetQueryParams,
								enumerable: false,
								configurable: true,
							});
							const getImage = async (options) => await getImage$1(options, imageConfig);

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const bioSkedLogo = createSvgComponent({"meta":{"src":"/_astro/biosked-logo.BaeZy9Sb.svg","width":122,"height":21,"format":"svg"},"attributes":{"width":"122","height":"21","fill":"none","viewBox":"0 0 122 21"},"children":"<g clip-path=\"url(#a)\"><path fill=\"#000\" d=\"M42.225 11.551c1.334-.71 2.194-1.956 2.194-3.824 0-3.141-2.371-4.95-5.366-4.95h-7.53v17.787h8.211c2.965 0 5.278-1.72 5.278-4.862 0-2.164-1.127-3.498-2.787-4.15m-1.72-3.409c0 1.038-.86 1.927-1.926 1.927h-3.143V6.245h3.143c1.066 0 1.927.83 1.927 1.897m-1.334 8.953h-3.735V13.27h3.735c1.098 0 1.927.89 1.927 1.929 0 1.066-.83 1.896-1.927 1.896M48.875 6.719a2.1 2.1 0 0 0 2.074-2.075 2.08 2.08 0 0 0-2.074-2.074 2.08 2.08 0 0 0-2.076 2.074c0 1.127.95 2.075 2.076 2.075m-1.898 13.845h3.765V8.706h-3.765zM59.06 20.8c3.972 0 6.58-2.608 6.58-6.164 0-3.559-2.608-6.167-6.58-6.167-3.974 0-6.612 2.608-6.612 6.167 0 3.556 2.638 6.165 6.612 6.165m0-3.35c-1.632-.029-2.817-1.214-2.817-2.814 0-1.603 1.185-2.788 2.817-2.817 1.6.03 2.816 1.214 2.816 2.817 0 1.6-1.216 2.785-2.816 2.814M73.47 20.8c3.32 0 6.136-1.955 6.136-5.277 0-6.58-8.181-4.949-8.181-8.033 0-1.008.77-1.482 1.719-1.482 1.008 0 2.016.563 2.905 1.542l2.609-2.49a7.28 7.28 0 0 0-5.485-2.521c-2.817 0-5.691 1.69-5.691 5.248 0 6.047 8.212 4.595 8.212 7.707 0 .979-.831 1.632-2.195 1.632-1.63 0-2.904-.92-3.556-2.314l-3.233 2.016c1.156 2.224 3.646 3.973 6.76 3.973M94.38 20.564l-5.634-6.492 5.188-5.366H89.4l-4.122 4.269V.256h-3.764v20.308h3.764V15.11l4.18 5.454z\" /><path fill=\"#000\" d=\"M106.957 14.605c0-3.706-2.548-6.166-6.373-6.166-3.824 0-6.522 2.49-6.522 6.197 0 3.704 2.669 6.165 6.641 6.165 3.29 0 5.483-1.748 6.078-4.328h-3.648c-.325.948-1.185 1.511-2.49 1.511-1.72 0-2.609-1.037-2.757-2.727h9.071zm-6.314-3.262c1.276 0 2.016.595 2.402 1.632h-4.921c.384-1.008 1.186-1.632 2.519-1.632M117.313.256v9.487c-.889-.8-2.016-1.274-3.379-1.274-3.291 0-5.87 2.727-5.87 6.167 0 3.438 2.579 6.165 5.87 6.165 1.363 0 2.49-.474 3.379-1.275v1.067l3.765-.03V.257zm-2.638 17.194a2.796 2.796 0 0 1-2.816-2.814 2.796 2.796 0 0 1 2.816-2.817 2.816 2.816 0 1 1 0 5.631\" /><path fill=\"#0a367f\" d=\"M0 1.75h10.842q.07.001.137.025a.349.349 0 0 1 .194.183q.027.06.027.129v3.527a.3.3 0 0 1-.027.129.34.34 0 0 1-.194.182.4.4 0 0 1-.137.025H0zM0 6.65h14.347q.069.001.135.025a.35.35 0 0 1 .191.182.3.3 0 0 1 .027.13v3.527a.3.3 0 0 1-.027.129.35.35 0 0 1-.19.181.4.4 0 0 1-.136.026H0zM0 11.55h18.194q.072.001.136.025a.36.36 0 0 1 .193.182.3.3 0 0 1 .027.129v3.527a.32.32 0 0 1-.104.239.35.35 0 0 1-.252.098H0zM0 16.45h21.696q.07 0 .135.026a.343.343 0 0 1 .192.182.3.3 0 0 1 .027.128v3.527a.33.33 0 0 1-.104.239.37.37 0 0 1-.25.098H0z\" /><path fill=\"#37afcf\" d=\"M0 1.75h8.75v4.2H0zM0 6.65h10.5v4.2H0zM0 11.55h14.7v4.2H0zM0 16.45h17.5v4.2H0z\" /><path fill=\"#6ce5e8\" d=\"M0 1.75h3.85v4.2H0zM0 6.65h5.6v4.2H0zM0 11.55h8.75v4.2H0zM0 16.45h10.15v4.2H0z\" /></g><defs><clipPath id=\"a\"><path fill=\"#fff\" d=\"M0 0h121.1v21H0z\" /></clipPath></defs>"});

const bioSkedLogoDark = createSvgComponent({"meta":{"src":"/_astro/biosked-logo-dark.CxLmzs0Z.svg","width":122,"height":21,"format":"svg"},"attributes":{"width":"122","height":"21","fill":"none","viewBox":"0 0 122 21"},"children":"<mask id=\"a\" width=\"122\" height=\"21\" x=\"0\" y=\"0\" maskUnits=\"userSpaceOnUse\" style=\"mask-type:luminance\"><path fill=\"#fff\" d=\"M121.1 0H0v21h121.1z\" /></mask><g mask=\"url(#a)\"><path fill=\"#fff\" d=\"M42.224 11.551c1.335-.71 2.195-1.956 2.195-3.824 0-3.141-2.371-4.95-5.366-4.95h-7.531v17.787h8.212c2.964 0 5.278-1.72 5.278-4.862 0-2.164-1.127-3.498-2.788-4.15m-1.719-3.409c0 1.038-.86 1.927-1.926 1.927h-3.143V6.245h3.143c1.066 0 1.926.83 1.926 1.897m-1.334 8.953h-3.735V13.27h3.735c1.097 0 1.927.89 1.927 1.929 0 1.066-.83 1.896-1.927 1.896M48.875 6.719a2.1 2.1 0 0 0 2.075-2.075 2.08 2.08 0 0 0-2.075-2.074A2.08 2.08 0 0 0 46.8 4.644c0 1.127.95 2.075 2.076 2.075m-1.898 13.845h3.765V8.706h-3.764zM59.06 20.8c3.972 0 6.58-2.608 6.58-6.164 0-3.559-2.608-6.167-6.58-6.167-3.974 0-6.612 2.608-6.612 6.167 0 3.556 2.638 6.165 6.612 6.165m0-3.35c-1.632-.029-2.817-1.214-2.817-2.814 0-1.603 1.185-2.788 2.817-2.817 1.6.03 2.816 1.214 2.816 2.817 0 1.6-1.216 2.785-2.816 2.814M73.47 20.8c3.32 0 6.136-1.955 6.136-5.277 0-6.58-8.182-4.949-8.182-8.033 0-1.008.771-1.482 1.72-1.482 1.007 0 2.016.563 2.905 1.542l2.609-2.49a7.28 7.28 0 0 0-5.485-2.521c-2.817 0-5.692 1.69-5.692 5.248 0 6.047 8.213 4.595 8.213 7.707 0 .979-.832 1.632-2.195 1.632-1.63 0-2.904-.92-3.557-2.314l-3.232 2.016c1.156 2.224 3.646 3.973 6.76 3.973M94.38 20.564l-5.633-6.492 5.188-5.366h-4.536l-4.121 4.269V.256h-3.765v20.308h3.764V15.11l4.18 5.454z\" /><path fill=\"#fff\" d=\"M106.957 14.605c0-3.706-2.548-6.166-6.373-6.166-3.824 0-6.522 2.49-6.522 6.197 0 3.704 2.669 6.165 6.641 6.165 3.29 0 5.483-1.748 6.078-4.328h-3.648c-.325.948-1.185 1.511-2.49 1.511-1.72 0-2.609-1.037-2.757-2.727h9.071zm-6.314-3.262c1.276 0 2.016.595 2.402 1.632h-4.921c.384-1.008 1.186-1.632 2.519-1.632M117.313.256v9.487c-.889-.8-2.016-1.274-3.379-1.274-3.291 0-5.87 2.727-5.87 6.167 0 3.438 2.579 6.165 5.87 6.165 1.363 0 2.49-.474 3.379-1.275v1.067l3.765-.03V.257zm-2.638 17.194a2.796 2.796 0 0 1-2.816-2.814 2.796 2.796 0 0 1 2.816-2.817 2.816 2.816 0 1 1 0 5.631\" /><path fill=\"#0a367f\" d=\"M0 1.75h10.842q.07.001.137.025a.349.349 0 0 1 .194.183q.027.06.027.129v3.527a.3.3 0 0 1-.027.129.34.34 0 0 1-.194.182.4.4 0 0 1-.137.025H0zM0 6.65h14.347q.069.001.135.025a.35.35 0 0 1 .191.182.3.3 0 0 1 .027.13v3.527a.3.3 0 0 1-.027.129.35.35 0 0 1-.19.181.4.4 0 0 1-.136.026H0zM0 11.55h18.194q.072.001.136.025a.36.36 0 0 1 .193.182.3.3 0 0 1 .027.129v3.527a.32.32 0 0 1-.104.239.35.35 0 0 1-.252.098H0zM0 16.45h21.696q.07 0 .135.026a.343.343 0 0 1 .192.182.3.3 0 0 1 .027.128v3.527a.33.33 0 0 1-.104.239.37.37 0 0 1-.25.098H0z\" /><path fill=\"#37afcf\" d=\"M0 1.75h8.75v4.2H0zM0 6.65h10.5v4.2H0zM0 11.55h14.7v4.2H0zM0 16.45h17.5v4.2H0z\" /><path fill=\"#6ce5e8\" d=\"M0 1.75h3.85v4.2H0zM0 6.65h5.6v4.2H0zM0 11.55h8.75v4.2H0zM0 16.45h10.15v4.2H0z\" /></g>"});

const $$Astro$3 = createAstro("https://newwebsite.biosked.com");
const $$Logo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Logo;
  const { className = "", loading = "eager" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a href="/"${addAttribute(`flex flex-1 gap-2 ${className}`, "class")}> ${renderComponent($$result, "Image", $$Image, { "src": bioSkedLogo, "alt": "BioSked Logo", "width": 150, "loading": loading, "class": "dark:hidden" })} ${renderComponent($$result, "Image", $$Image, { "src": bioSkedLogoDark, "alt": "BioSked Logo", "width": 78, "loading": loading, "class": "hidden dark:block" })} </a>`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/layout/Logo.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-sm bg-background px-4 py-2 text-sm font-medium focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 hover:bg-accent"
);
function NavigationMenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Trigger,
    {
      "data-slot": "navigation-menu-trigger",
      className: cn(navigationMenuTriggerStyle(), "group", className),
      ...props,
      children: [
        children,
        " ",
        /* @__PURE__ */ jsx(
          ChevronDownIcon,
          {
            className: "relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function NavigationMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Content,
    {
      "data-slot": "navigation-menu-content",
      className: cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx(
        NavigationMenuPrimitive.Viewport,
        {
          "data-slot": "navigation-menu-viewport",
          className: cn(
            "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-md border shadow md:w-(--radix-navigation-menu-viewport-width)",
            className
          ),
          ...props
        }
      )
    }
  );
}
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Link,
    {
      "data-slot": "navigation-menu-link",
      className: cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm px-2 py-3 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}

const ALL_NAV_LINKS$1 = [
  { label: "Product", href: "/" },
  {
    label: "Solutions",
    href: "#",
    hidden: true,
    subitems: [
      {
        label: "For Clinicians",
        href: "/solutions/clinicians"
      },
      {
        label: "For Care Coordinators",
        href: "/solutions/care-coordinators"
      },
      {
        label: "For Health Systems",
        href: "/solutions/health-systems"
      },
      {
        label: "Integrations",
        href: "/integrations",
        hidden: true
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        hidden: true
      }
    ]
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Company",
    href: "#",
    hidden: true,
    subitems: [
      {
        label: "About",
        href: "/about"
      },
      {
        label: "Security & Compliance",
        href: "/security",
        hidden: true
      },
      {
        label: "Careers",
        href: "/careers"
      },
      {
        label: "Contact",
        href: "/contact"
      }
    ]
  },
  {
    label: "Resources",
    href: "#",
    hidden: false,
    subitems: [
      {
        label: "Blog",
        href: "/blog"
      },
      {
        label: "Documentation",
        href: "/docs"
      },
      {
        label: "Customer Stories",
        href: "/customers"
      }
    ]
  }
];
const NAV_LINKS$1 = ALL_NAV_LINKS$1.filter((item) => !item.hidden).map((item) => ({
  ...item,
  subitems: item.subitems?.filter((sub) => !sub.hidden)
}));
function DesktopNav({ pathname }) {
  const isActive = (itemHref) => {
    if (itemHref.includes("#")) {
      const path = itemHref.split("#")[0] || "/";
      return pathname === path;
    }
    return pathname === itemHref || pathname.startsWith(itemHref + "/");
  };
  return /* @__PURE__ */ jsx(NavigationMenu, { viewport: false, children: /* @__PURE__ */ jsx(NavigationMenuList, { children: NAV_LINKS$1.map((item) => /* @__PURE__ */ jsx(NavigationMenuItem, { children: item.subitems ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      NavigationMenuTrigger,
      {
        className: cn(
          "cursor-pointer [&_svg]:ms-2 [&_svg]:size-4",
          isActive(item.href) && "bg-muted text-foreground font-semibold"
        ),
        children: item.label
      }
    ),
    /* @__PURE__ */ jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsx("ul", { className: "grid w-[220px] gap-1", children: item.subitems.map((subitem) => {
      const isSubitemActive = isActive(subitem.href);
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        NavigationMenuLink,
        {
          href: subitem.href,
          className: cn(
            "hover:bg-accent hover:text-accent-foreground block px-4 py-2.5 text-sm font-medium tracking-normal transition-colors rounded-sm",
            isSubitemActive && "bg-accent text-accent-foreground font-semibold"
          ),
          children: subitem.label
        }
      ) }, subitem.label);
    }) }) })
  ] }) : /* @__PURE__ */ jsx(
    NavigationMenuLink,
    {
      href: item.href,
      className: cn(
        navigationMenuTriggerStyle(),
        isActive(item.href) && "bg-muted text-foreground font-semibold"
      ),
      children: item.label
    }
  ) }, item.label)) }) });
}

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 border border-primary/20 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-500",
        destructive: "bg-destructive text-white shadow-lg hover:bg-destructive/90 hover:shadow-xl focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "border-2 border-secondary bg-transparent text-foreground hover:bg-secondary/10 hover:border-secondary/80 dark:border-secondary dark:hover:bg-secondary/10 dark:hover:border-secondary/80",
        secondary: "bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl hover:bg-secondary/90 border border-secondary/20 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-500",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted dark:hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 dark:text-primary dark:hover:text-primary/80",
        light: "bg-muted text-foreground border border-border hover:bg-muted/80 hover:border-border shadow-sm hover:shadow-md dark:bg-muted dark:text-foreground dark:border-border dark:hover:bg-muted/80"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[_svg]:px-3 text-sm md:text-base",
        icon: "size-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

const ACTION_BUTTONS = [
  { label: "Book a Demo", href: "#", variant: "default", isModal: true }
];
const ALL_NAV_LINKS = [
  { label: "Platform", href: "/" },
  {
    label: "Solutions",
    href: "#",
    hidden: true,
    subitems: [
      {
        label: "For Clinicians",
        href: "/solutions/clinicians"
      },
      {
        label: "For Care Coordinators",
        href: "/solutions/care-coordinators"
      },
      {
        label: "For Health Systems",
        href: "/solutions/health-systems"
      },
      {
        label: "Integrations",
        href: "/integrations",
        hidden: true
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        hidden: true
      }
    ]
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Company",
    href: "#",
    subitems: [
      {
        label: "About",
        href: "/about"
      },
      {
        label: "Security & Compliance",
        href: "/security",
        hidden: true
      },
      {
        label: "Careers",
        href: "/careers"
      },
      {
        label: "Contact",
        href: "/contact"
      }
    ]
  },
  {
    label: "Resources",
    href: "#",
    hidden: false,
    subitems: [
      {
        label: "Blog",
        href: "/blog"
      },
      {
        label: "Documentation",
        href: "/docs"
      },
      {
        label: "Customer Stories",
        href: "/customers"
      }
    ]
  }
];
const NAV_LINKS = ALL_NAV_LINKS.filter((item) => !item.hidden).map((item) => ({
  ...item,
  subitems: item.subitems?.filter((sub) => !sub.hidden)
}));
function NavbarActions({ pathname }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (itemHref) => {
    if (itemHref.includes("#")) {
      const path = itemHref.split("#")[0] || "/";
      return pathname === path;
    }
    return pathname === itemHref || pathname.startsWith(itemHref + "/");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "hidden items-center justify-end gap-4 lg:flex", children: ACTION_BUTTONS.map((button) => /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: button.variant,
        className: "rounded-full shadow-none",
        onClick: button.isModal ? () => window.dispatchEvent(new CustomEvent("open-contact-sales")) : void 0,
        children: button.isModal ? button.label : /* @__PURE__ */ jsx("a", { href: button.href, children: button.label })
      },
      button.label
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 lg:hidden lg:gap-4", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "text-muted-foreground relative flex size-8 rounded-sm border lg:hidden z-50",
        onClick: () => setIsMenuOpen(!isMenuOpen),
        "aria-label": "Toggle menu",
        children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open main menu" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-1/2 left-1/2 block w-4 -translate-x-1/2 -translate-y-1/2", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": "true",
                className: cn(
                  "absolute block h-px w-full rounded-full bg-current transition duration-500 ease-in-out",
                  isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": "true",
                className: cn(
                  "absolute block h-px w-full rounded-full bg-current transition duration-500 ease-in-out",
                  isMenuOpen ? "opacity-0" : ""
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                "aria-hidden": "true",
                className: cn(
                  "absolute block h-px w-full rounded-full bg-current transition duration-500 ease-in-out",
                  isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                )
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "bg-background text-accent-foreground fixed inset-0 z-40 flex flex-col justify-between tracking-normal transition-all duration-500 ease-out lg:hidden",
          isMenuOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "container bg-background", children: /* @__PURE__ */ jsx("nav", { className: "inline-block w-full max-w-none py-10", children: /* @__PURE__ */ jsx("div", { className: "space-y-6", children: NAV_LINKS.map((item) => /* @__PURE__ */ jsx("div", { children: item.subitems ? /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-foreground", children: item.label }),
            /* @__PURE__ */ jsx("div", { className: "space-y-1 pl-4", children: item.subitems.map((subitem) => {
              const isSubitemActive = isActive(subitem.href);
              return /* @__PURE__ */ jsx(
                "a",
                {
                  href: subitem.href,
                  className: cn(
                    "block text-sm transition-colors",
                    isSubitemActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                  ),
                  onClick: () => setIsMenuOpen(false),
                  children: subitem.label
                },
                subitem.label
              );
            }) })
          ] }) : /* @__PURE__ */ jsx(
            "a",
            {
              href: item.href,
              className: cn(
                "block text-lg transition-colors",
                isActive(item.href) ? "text-foreground font-semibold" : "text-foreground"
              ),
              onClick: () => setIsMenuOpen(false),
              children: item.label
            }
          ) }, item.label)) }) }) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4.5 border-t px-6 py-4 bg-background", children: ACTION_BUTTONS.map((button) => /* @__PURE__ */ jsx(
            Button,
            {
              variant: button.variant,
              className: "h-12 flex-1 rounded-sm shadow-sm",
              onClick: button.isModal ? () => {
                window.dispatchEvent(new CustomEvent("open-contact-sales"));
                setIsMenuOpen(false);
              } : void 0,
              children: button.isModal ? button.label : /* @__PURE__ */ jsx("a", { href: button.href, children: button.label })
            },
            button.label
          )) })
        ]
      }
    )
  ] });
}

const $$Astro$2 = createAstro("https://newwebsite.biosked.com");
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { currentPage } = Astro2.props;
  const pathname = currentPage?.replace(/\/$/, "") || "";
  const hideNavbar = ["/signin", "/signup", "/docs", "/not-found", "/forgot-password"].some(
    (route) => pathname.includes(route)
  );
  return renderTemplate`${!hideNavbar && renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 bg-background/80 border-b backdrop-blur-md supports-backdrop-filter:bg-background/60"><div class="navbar-container flex items-center h-16">${renderComponent($$result, "Logo", $$Logo, {})}<div class="flex flex-1 justify-center"><div class="hidden lg:block">${renderComponent($$result, "DesktopNav", DesktopNav, { "client:idle": true, "pathname": pathname, "client:component-hydration": "idle", "client:component-path": "@/components/layout/DesktopNav", "client:component-export": "DesktopNav" })}</div></div><div class="flex flex-1 justify-end">${renderComponent($$result, "NavbarActions", NavbarActions, { "client:idle": true, "pathname": pathname, "client:component-hydration": "idle", "client:component-path": "@/components/layout/NavbarActions", "client:component-export": "NavbarActions" })}</div></div></header>`}`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/layout/Navbar.astro", void 0);

const linkedInLogo = createSvgComponent({"meta":{"src":"/_astro/linkedin.fQlh8ZV3.svg","width":18,"height":18,"format":"svg"},"attributes":{"width":"18","height":"18","fill":"none","viewBox":"0 0 18 18"},"children":"<path fill=\"#0a367f\" d=\"M15.335 15.339H12.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25H7.013V6.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091zM4.003 5.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549m1.336 9.764H2.666V6.75H5.34zM16.67 0H1.329C.593 0 0 .58 0 1.297v15.406C0 17.42.594 18 1.328 18h15.338C17.4 18 18 17.42 18 16.703V1.297C18 .58 17.4 0 16.666 0z\" />"});

const cyanDust = new Proxy({"src":"/_astro/cyan-dust_background.CNIxqgsQ.webp","width":945,"height":656,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/biofred/Documents/Dev/marketing-site/src/assets/layout/cyan-dust_background.webp";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/biofred/Documents/Dev/marketing-site/src/assets/layout/cyan-dust_background.webp");
							return target[name];
						}
					});

const $$Astro$1 = createAstro("https://newwebsite.biosked.com");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const { currentPage } = Astro2.props;
  const pathname = currentPage?.replace(/\/$/, "") || "";
  const ALL_FOOTER_SECTIONS = [
    {
      title: "Solution",
      hidden: false,
      links: [
        { name: "Features", href: "/", hidden: false, isModal: false },
        { name: "What's new", href: "https://biosked.com/category/blog/", hidden: false, isModal: false },
        // { name: 'Solution', href: '/solutions', hidden: !siteConfig.features.showFooterSolutions, isModal: false },
        { name: "Pricing", href: "/pricing", hidden: false, isModal: false },
        { name: "Integrations", href: "/#integrations", hidden: true, isModal: false }
      ]
    },
    {
      title: "Resources",
      hidden: true,
      links: [
        { name: "Documentation", href: "/docs", hidden: false, isModal: false },
        { name: "Help Center", href: "/help", hidden: false, isModal: false },
        { name: "Blog", href: "/blog", hidden: false, isModal: false },
        { name: "Case Studies", href: "/case-studies", hidden: false, isModal: false }
      ]
    },
    {
      title: "Company",
      hidden: false,
      links: [
        { name: "About us", href: "/about", hidden: false, isModal: false },
        { name: "Careers", href: "/careers", hidden: false, isModal: false },
        { name: "Contact", href: "/contact", hidden: true, isModal: false },
        { name: "Schedule a Demo", href: "#", hidden: true, isModal: true },
        { name: "LinkedIn", href: "https://www.linkedin.com/company/biosked/", hidden: false, isModal: false }
      ]
    }
  ];
  const FOOTER_SECTIONS = ALL_FOOTER_SECTIONS.filter((section) => !section.hidden).map((section) => ({
    ...section,
    links: section.links.filter((link) => !link.hidden)
  }));
  const hideFooter = [
    "/signin",
    "/signup",
    "/docs",
    "/not-found",
    "/forgot-password"
  ].some((route) => pathname.includes(route));
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${!hideFooter && renderTemplate`${maybeRenderHead()}<footer class="relative pt-12 pb-30"><div class="absolute bottom-0 left-0 size-[800px] bg-no-repeat"${addAttribute('background-image: url("' + cyanDust.src + '"); background-position-y: 300%; transform:scaleX(-1);', "style")}></div><div class="container flex mb-15"><div class="flex-2 flex flex-col gap-1">${renderComponent($$result, "Logo", $$Logo, { "loading": "lazy" })}<div class="text-muted-foreground text-sm my-4">
Americas Headquarter: Rochester, New York<br>
Europe Headquarter: Geneva, Switzerland
</div><div class="text-muted-foreground text-sm">Copyright © ${currentYear} BioSked, Inc.</div></div><div class="flex-1 flex">${FOOTER_SECTIONS.map((section) => renderTemplate`<div class="flex-1"><h3 class="text-foreground mb-2 font-bold text-sm uppercase md:mb-4">${section.title}</h3><ul class="space-y-2">${section.links.map((link) => renderTemplate`<li>${link.isModal ? renderTemplate`<button onclick="window.dispatchEvent(new CustomEvent('open-contact-sales'))" class="text-muted-foreground hover:text-card-foreground text-left text-sm transition-colors cursor-pointer">${link.name}</button>` : renderTemplate`<a${addAttribute(link.href, "href")} class="text-muted-foreground hover:text-card-foreground text-sm transition-colors">${link.name != "LinkedIn" ? renderTemplate`<div>${link.name}</div>` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": linkedInLogo, "alt": "Follow us on LinkedIn", "width": 16, "class": "fill-muted hover:fill-card-foreground mt-3" })}`}</a>`}</li>`)}</ul></div>`)}</div></div></footer>`}`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/layout/Footer.astro", void 0);

function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}

function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-sm border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}

function ContactSalesModal() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-contact-sales", handleOpen);
    return () => window.removeEventListener("open-contact-sales", handleOpen);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/contact-sales", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setShowSuccess(true);
        e.target.reset();
        setTimeout(() => {
          setOpen(false);
          setShowSuccess(false);
        }, 3e3);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsx(DialogContent, { className: "sm:max-w-[900px] lg:max-w-[1100px] p-0 max-h-[90vh] overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1fr_1.5fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-linear-to-br from-primary/10 to-primary/5 p-4 md:p-8 lg:p-10", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "text-left", children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-2xl md:text-3xl font-medium mb-2 md:mb-4", children: "See How Momentum Fits Your Organization" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm md:text-base mb-4 md:mb-8", children: "Whether you're a solo practice or multi-site health system, we'll show you how Momentum automates scheduling for your team." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 md:space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-primary/20 text-primary flex size-7 md:size-8 shrink-0 items-center justify-center rounded-full mt-0.5", children: /* @__PURE__ */ jsx(Check, { className: "size-3.5 md:size-4" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium mb-0.5 md:mb-1 text-sm md:text-base", children: "Live product walkthrough" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs md:text-sm", children: "See how Momentum handles your specific scheduling challenges" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-primary/20 text-primary flex size-7 md:size-8 shrink-0 items-center justify-center rounded-full mt-0.5", children: /* @__PURE__ */ jsx(Check, { className: "size-3.5 md:size-4" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium mb-0.5 md:mb-1 text-sm md:text-base", children: "Transparent pricing" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs md:text-sm", children: "Get a plan tailored to your organization's size and complexity" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-primary/20 text-primary flex size-7 md:size-8 shrink-0 items-center justify-center rounded-full mt-0.5", children: /* @__PURE__ */ jsx(Check, { className: "size-3.5 md:size-4" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium mb-0.5 md:mb-1 text-sm md:text-base", children: "Fast implementation" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs md:text-sm", children: "Most organizations go live in weeks, not months" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-4 md:p-8 lg:p-10", children: showSuccess ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-green-100 text-green-600 flex size-16 items-center justify-center rounded-full mb-4", children: /* @__PURE__ */ jsx(Check, { className: "size-8" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium mb-2", children: "Request received!" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Our sales team will contact you within 24 hours." })
    ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "name", className: "text-sm font-medium block mb-2", children: [
          "Full Name ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "name",
            name: "name",
            type: "text",
            required: true,
            placeholder: "John Doe"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "email", className: "text-sm font-medium block mb-2", children: [
          "Work Email ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "email",
            name: "email",
            type: "email",
            required: true,
            placeholder: "john@hospital.com"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "text-sm font-medium block mb-2", children: "Phone Number" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "phone",
            name: "phone",
            type: "tel",
            placeholder: "+1 (555) 123-4567"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "companyName", className: "text-sm font-medium block mb-2", children: [
          "Organization Name ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "companyName",
            name: "companyName",
            type: "text",
            required: true,
            placeholder: "City Hospital"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "staffCount", className: "text-sm font-medium block mb-2", children: [
          "Staff to Schedule ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "staffCount",
            name: "staffCount",
            required: true,
            className: "border-input focus-visible:ring-ring w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select range" }),
              /* @__PURE__ */ jsx("option", { value: "1-50", children: "1-50" }),
              /* @__PURE__ */ jsx("option", { value: "51-200", children: "51-200" }),
              /* @__PURE__ */ jsx("option", { value: "201-500", children: "201-500" }),
              /* @__PURE__ */ jsx("option", { value: "501-1000", children: "501-1000" }),
              /* @__PURE__ */ jsx("option", { value: "1000+", children: "1000+" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "additionalInfo", className: "text-sm font-medium block mb-2", children: "Tell us about your needs" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "additionalInfo",
            name: "additionalInfo",
            rows: 2,
            placeholder: "Any specific requirements or questions?",
            className: "border-input focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 resize-none"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "bg-red-50 border-red-200 text-red-800 rounded-lg border p-3 text-sm", children: error }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          size: "lg",
          className: "w-full",
          disabled: isSubmitting,
          children: isSubmitting ? "Sending..." : "Request Quote"
        }
      )
    ] }) })
  ] }) }) });
}

const $$Astro = createAstro("https://newwebsite.biosked.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description })}${renderHead()}</head> <body${addAttribute(`h-screen antialiased flex flex-col [--header-height:calc(var(--spacing)*12)] lg:[--header-height:calc(var(--spacing)*18)]`, "class")}> <svg width="0" height="0" style="position: absolute;"> <filter id="noise-texture"> <feTurbulence type="fractalNoise" baseFrequency="0.48" numOctaves="3" seed="0" stitchTiles="stitch"></feTurbulence> <feColorMatrix type="saturate" values="0"></feColorMatrix> <feComponentTransfer> <feFuncA type="discrete" tableValues="0 0.2"></feFuncA> </feComponentTransfer> <feBlend mode="multiply" in="SourceGraphic"></feBlend> </filter> </svg> ${renderComponent($$result, "NavigationProvider", $$NavigationProvider, { "currentPath": currentPath }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "currentPage": currentPath })} <main class="flex-1 bg-noise" style="view-transition-name: main;"> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Footer", $$Footer, { "currentPage": currentPath })} ` })} ${renderComponent($$result, "ContactSalesModal", ContactSalesModal, { "client:idle": { timeout: 3e3 }, "client:component-hydration": "idle", "client:component-path": "@/components/sections/ContactSalesModal.tsx", "client:component-export": "ContactSalesModal" })} </body></html>`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, Button as B, Dialog as D, Input as I, $$Image as a, cn as b, createSvgComponent as c, DialogContent as d, DialogHeader as e, DialogTitle as f, cyanDust as g, baseService as h, parseQuality as p };
