import { c as createComponent, b as renderTemplate, r as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_B5cfr19O.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Cn3Tzen8.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = true;
const $$Careers = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", ` <script type="text/javascript">
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWorkable);
  } else {
    loadWorkable();
  }

  function loadWorkable() {
    const script = document.createElement('script');
    script.src = 'https://www.workable.com/assets/embed.js';
    script.onload = function() {
      whr(document).ready(function() {
        whr_embed(687206, {"base":"jobs","detail":"titles","zoom":"country", "grouping": "department" });
      });
    };
    document.body.appendChild(script);
  }
<\/script> `])), renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Careers at BioSked | Join Our Healthcare Technology Team", "description": "Join BioSked's mission to revolutionize healthcare scheduling with our Momentum platform. Explore engineering, product, and sales careers at a fast-growing healthcare technology company serving the US and EU. Remote-friendly positions available." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section-padding relative overflow-hidden bg-surface"> <div class="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-45"> <div class="blob-primary absolute top-0 left-0 size-[600px] rounded-full blur-3xl will-change-transform -translate-y-1/3"></div> <div class="blob-accent absolute right-0 bottom-1/3 size-[500px] rounded-full blur-3xl will-change-transform"></div> </div> <div class="container relative z-10"> <div class="mx-auto max-w-3xl text-center"> <h1 class="text-display-hero">
Join Our Team
</h1> <p class="mx-auto mt-6 max-w-2xl text-lead text-muted-foreground">
Help us transform healthcare scheduling and make a real impact—from solo physicians to large health systems. We're building intelligent automation that gives healthcare teams time back for what matters: patient care, strategic planning, and work-life balance.
</p> </div> <div class="mx-auto mt-12 max-w-5xl"> <div id="whr_embed_hook"></div> </div> </div> </section> ` }));
}, "/Users/biofred/Documents/Dev/marketing-site/src/pages/careers.astro", void 0);

const $$file = "/Users/biofred/Documents/Dev/marketing-site/src/pages/careers.astro";
const $$url = "/careers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Careers,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
