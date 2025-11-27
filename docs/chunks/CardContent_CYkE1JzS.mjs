import { a as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, s as spreadAttributes, f as renderSlot, b as renderTemplate } from './astro/server_B5cfr19O.mjs';
import { b as cn } from './BaseLayout_Cn3Tzen8.mjs';
import 'clsx';

const $$Astro = createAstro("https://newwebsite.biosked.com");
const $$CardContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardContent;
  const { className = "", ...props } = Astro2.props;
  const classes = cn("px-6", className);
  return renderTemplate`${maybeRenderHead()}<div data-slot="card-content"${addAttribute(classes, "class")}${spreadAttributes(props)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/ui/CardContent.astro", void 0);

export { $$CardContent as $ };
