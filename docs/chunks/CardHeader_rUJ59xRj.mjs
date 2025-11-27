import { a as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, s as spreadAttributes, f as renderSlot, b as renderTemplate } from './astro/server_B5cfr19O.mjs';
import { b as cn } from './BaseLayout_Cn3Tzen8.mjs';
import 'clsx';

const $$Astro = createAstro("https://newwebsite.biosked.com");
const $$CardHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardHeader;
  const { className = "", ...props } = Astro2.props;
  const classes = cn(
    "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
    className
  );
  return renderTemplate`${maybeRenderHead()}<div data-slot="card-header"${addAttribute(classes, "class")}${spreadAttributes(props)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/ui/CardHeader.astro", void 0);

export { $$CardHeader as $ };
