import { c as createComponent, a as createAstro, r as renderComponent, m as maybeRenderHead, b as renderTemplate } from '../chunks/astro/server_B5cfr19O.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Cn3Tzen8.mjs';
import { $ as $$Button } from '../chunks/Button_CCc4pUqf.mjs';
import { $ as $$ } from '../chunks/.Layout_BgpQaMGz.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://newwebsite.biosked.com");
const $$Home = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Home;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "house", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path> ` })}`;
}, "/Users/biofred/Documents/Dev/marketing-site/node_modules/lucide-astro/dist/Home.astro", void 0);

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Page Not Found | Momentum by BioSked", "description": "The page you're looking for doesn't exist. Return to our homepage or contact us for help." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section-padding relative overflow-hidden bg-surface"> <div class="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30"> <div class="blob-primary absolute top-1/3 right-1/4 size-[500px] rounded-full blur-3xl"></div> <div class="blob-accent absolute bottom-1/3 left-1/4 size-[400px] rounded-full blur-3xl"></div> </div> <div class="container relative z-10"> <div class="mx-auto max-w-3xl text-center"> <div class="mb-6"> <span class="text-9xl font-bold text-muted-foreground/30 dark:text-muted-foreground/20">404</span> </div> <h1 class="text-display-hero mb-4">
Page Not Found
</h1> <p class="mx-auto max-w-2xl text-lead text-muted-foreground mb-8">
Looks like this page took an unscheduled break. Let's get you back on track.
</p> <div class="flex flex-wrap justify-center gap-4 mb-12"> ${renderComponent($$result2, "Button", $$Button, { "size": "sm", "variant": "default", "className": "rounded-full shadow-none", "href": "/" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Home", $$Home, { "class": "size-4" })}
Back to Home
` })} </div> <div class="mt-16 pt-12 border-t border-border"> <h2 class="text-xl font-semibold mb-6">Helpful Links</h2> <div class="grid md:grid-cols-3 gap-6 text-left"> <a href="/pricing" class="group p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card hover:bg-accent/5"> <h3 class="font-semibold mb-2 group-hover:text-primary transition-colors">
Pricing Plans
</h3> <p class="text-sm text-muted-foreground">
View our transparent pricing for healthcare scheduling software
</p> </a> <a href="/about" class="group p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card hover:bg-accent/5"> <h3 class="font-semibold mb-2 group-hover:text-primary transition-colors">
About Us
</h3> <p class="text-sm text-muted-foreground">
Learn about BioSked and our Momentum platform
</p> </a> <a href="/careers" class="group p-6 rounded-lg border border-border hover:border-primary transition-colors bg-card hover:bg-accent/5"> <h3 class="font-semibold mb-2 group-hover:text-primary transition-colors">
Careers
</h3> <p class="text-sm text-muted-foreground">
Join our team and help transform healthcare scheduling
</p> </a> </div> </div> <div class="mt-12"> <p class="text-sm text-muted-foreground">
Looking for something specific?
<a href="/contact" class="text-primary hover:underline font-medium">
Contact our team
</a>
and we'll help you find it.
</p> </div> </div> </div> </section> ` })}`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/pages/404.astro", void 0);

const $$file = "/Users/biofred/Documents/Dev/marketing-site/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
