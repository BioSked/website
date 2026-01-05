# BioSked Website

Welcome to our marketing and multilingual website built with Astro, React, and Tailwind CSS.

## 🚀 Tech Stack

- **[Astro](https://astro.build)** - Static site generator with partial hydration
- **[React](https://react.dev)** - UI components with islands architecture
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **[MDX](https://mdxjs.com)** - Markdown with JSX support for content

## 📁 Project Structure

```
/
├── public/             # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── assets/            # Images, logos, and media files
│   ├── components/        # Reusable UI components
│   │   ├── elements/      # Basic UI elements
│   │   ├── layout/        # Layout components
│   │   ├── sections/      # Page sections
│   │   └── ui/            # UI components
│   ├── i18n/              # Internationalization
│   │   └── locales/       # Translation files (en, fr)
│   ├── layouts/           # Page layouts and templates
│   ├── lib/               # Utility functions and helpers
│   ├── pages/             # File-based routing
│   │   ├── blog/          # Main Blog
│   │   ├── blog/posts     # Blog pages (English)
│   │   ├── blog/posts/fr  # Blog pages (French)
│   │   └── legal/         # Legal pages
│   ├── styles/            # Global styles
│   ├── consts.ts          # Site constants and configuration
│   └── content.config.ts
├── astro.config.mjs       # Astro configuration
├── package.json
└── tsconfig.json          # TypeScript configuration
```

## 🌍 Key Features and Dependencies

- **Internationalization (i18n)**: English and French support with URL-based locale routing
- **Static Site Generation**: Fast, SEO-friendly static output
- **Component Islands**: React components hydrated only when needed
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Content Management**: MDX support for rich content authoring (the BioSked Blog)
- **SEO Optimized**: Automatic sitemap generation and meta tags
- **Animations**: Motion library for smooth interactions
- **Analytics**: Google Tag Manager support
- **Icons**: Lucide icons for both Astro and React
- **Styling**: Class Variance Authority, clsx, tailwind-merge


## 🚦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

- **Site URL**: `https://biosked.com`
- **Output**: Static site generation
- **Locales**: English (default), French
- **Prefetch**: Hover-based link prefetching
- **Code Splitting**: Separate chunks for React and form vendors

## 👨‍💻 How to add a Blog post

All blog posts are located in `src/pages/blog/posts` and are written using the [Markdown format](https://www.markdownguide.org/cheat-sheet/) To add a post for either language simply:

1. Create a new `.md` file eith in `src/pages/blog/posts` or `src/pages/blog/posts/fr` for French articles – you can also duplicate an existing one and rename it.
2. Name your file with a date+title pattern like this `YYYY-MM-DD-article-title.md` (eg. `2026-01-05-happy-new-year.md`)
3. Make sure your `.md` files starts with the necessary meta-data such as _Title_, _Description_, _Author_, _Date_ and _Image_.
3. If your blog post includes an image, place it in `src/assets/images`
3. Commit your changes on GitHub
4. Done. The website will automatically rebuilt itself with your new blog post.
