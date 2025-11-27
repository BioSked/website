import { a as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, s as spreadAttributes, f as renderSlot, b as renderTemplate } from './astro/server_B5cfr19O.mjs';
import { b as cn } from './BaseLayout_Cn3Tzen8.mjs';
import 'clsx';

const $$Astro = createAstro("https://newwebsite.biosked.com");
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const { className = "", ...props } = Astro2.props;
  const classes = cn(
    "bg-card text-card-foreground border-input flex flex-col gap-6 rounded-xl border py-6 dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] transition-all hover:border-ring/80",
    className
  );
  return renderTemplate`${maybeRenderHead()}<div data-slot="card"${addAttribute(classes, "class")}${spreadAttributes(props)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/ui/Card.astro", void 0);

export { $$Card as $ };
