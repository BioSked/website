import { c as createComponent, a as createAstro, r as renderComponent, m as maybeRenderHead, b as renderTemplate, d as addAttribute, s as spreadAttributes, e as renderScript } from '../chunks/astro/server_B5cfr19O.mjs';
import 'piccolore';
import { b as cn, $ as $$BaseLayout } from '../chunks/BaseLayout_Cn3Tzen8.mjs';
import { $ as $$Card } from '../chunks/Card_CBulsP23.mjs';
import { $ as $$CardHeader } from '../chunks/CardHeader_rUJ59xRj.mjs';
import { $ as $$CardContent } from '../chunks/CardContent_CYkE1JzS.mjs';
import { $ as $$Button } from '../chunks/Button_CCc4pUqf.mjs';
import 'clsx';
import { $ as $$ } from '../chunks/.Layout_BgpQaMGz.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://newwebsite.biosked.com");
const $$BookOpen = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BookOpen;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "book-open", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M12 7v14"></path> <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path> ` })}`;
}, "/Users/biofred/Documents/Dev/marketing-site/node_modules/lucide-astro/dist/BookOpen.astro", void 0);

const $$Astro = createAstro("https://newwebsite.biosked.com");
const $$Input = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Input;
  const {
    className = "",
    type = "text",
    ...props
  } = Astro2.props;
  const classes = cn(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-sm border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    className
  );
  return renderTemplate`${maybeRenderHead()}<input${addAttribute(type, "type")} data-slot="input"${addAttribute(classes, "class")}${spreadAttributes(props)}>`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/ui/Input.astro", void 0);

const prerender = true;
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact Us | Momentum Support & Sales | BioSked", "description": "Get expert help with Momentum healthcare scheduling software. Contact BioSked for demos, support, and sales inquiries. Email sales@biosked.com. Our team is ready to help streamline your hospital, clinic, or practice operations." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section-padding bg-surface"> <div class="container"> <div class="mx-auto max-w-3xl text-center"> <h1 class="text-display-hero">
Let's Talk About Your Scheduling Challenges
</h1> <p class="text-muted-foreground mt-6 text-lead">
Whether you're a solo practice or large health system, our team is here to help you find the right solution.
</p> </div> <div class="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3"> <div class="lg:col-span-2"> ${renderComponent($$result2, "Card", $$Card, { "className": "h-full" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardHeader", $$CardHeader, {}, { "default": async ($$result4) => renderTemplate` <h2 class="text-display-card">Contact Our Team</h2> <p class="text-muted-foreground">
Questions about features, pricing, or implementation? We'll respond within 24 hours.
</p> ` })} ${renderComponent($$result3, "CardContent", $$CardContent, {}, { "default": async ($$result4) => renderTemplate` <div id="success-message" class="bg-green-50 border-green-200 text-green-800 mb-6 hidden rounded-lg border p-4"> <div class="flex items-center gap-3"> <div class="bg-green-100 text-green-600 flex size-10 shrink-0 items-center justify-center rounded-full"> <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <div> <p class="font-medium">Message sent successfully!</p> <p class="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p> </div> </div> </div> <div id="error-message" class="bg-red-50 border-red-200 text-red-800 mb-6 hidden rounded-lg border p-4"> <p class="font-medium">Something went wrong. Please try again.</p> </div> <form id="contact-form" enctype="multipart/form-data" class="space-y-6"> <div class="grid gap-6 md:grid-cols-2"> <div> <label for="firstname" class="text-sm font-medium">
First Name <span class="text-red-500">*</span> </label> ${renderComponent($$result4, "Input", $$Input, { "id": "firstname", "name": "firstname", "type": "text", "required": true, "placeholder": "John", "className": "mt-2" })} </div> <div> <label for="lastname" class="text-sm font-medium">
Last Name <span class="text-red-500">*</span> </label> ${renderComponent($$result4, "Input", $$Input, { "id": "lastname", "name": "lastname", "type": "text", "required": true, "placeholder": "Doe", "className": "mt-2" })} </div> </div> <div> <label for="email" class="text-sm font-medium">
Email <span class="text-red-500">*</span> </label> ${renderComponent($$result4, "Input", $$Input, { "id": "email", "name": "email", "type": "email", "required": true, "placeholder": "john@hospital.com", "className": "mt-2" })} </div> <div> <label for="mobilephone" class="text-sm font-medium">
Phone Number
</label> ${renderComponent($$result4, "Input", $$Input, { "id": "mobilephone", "name": "mobilephone", "type": "tel", "placeholder": "+1 (555) 123-4567", "className": "mt-2" })} </div> <div> <label for="subject" class="text-sm font-medium">
Topic <span class="text-red-500">*</span> </label> ${renderComponent($$result4, "Input", $$Input, { "id": "subject", "name": "subject", "type": "text", "required": true, "placeholder": "Question about pricing", "className": "mt-2" })} </div> <div> <label for="content" class="text-sm font-medium">
Problem Description <span class="text-red-500">*</span> </label> <textarea id="content" name="content" required rows="6" placeholder="Tell us about your needs..." class="border-input focus-visible:ring-ring mt-2 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"></textarea> </div> <div> <label for="attachment" class="text-sm font-medium">
Attach Screenshot or Video (Optional)
</label> <input id="attachment" name="attachment" type="file" accept="image/*,video/*,.pdf" class="border-input mt-2 w-full rounded-md border px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium"> <p class="text-muted-foreground mt-1 text-xs">
Max file size: 10MB. Accepted formats: images, videos, PDF
</p> </div> ${renderComponent($$result4, "Button", $$Button, { "type": "submit", "size": "lg", "className": "w-full", "id": "submit-btn" }, { "default": async ($$result5) => renderTemplate`
Send Message
` })} </form> ${renderScript($$result4, "/Users/biofred/Documents/Dev/marketing-site/src/pages/contact.astro?astro&type=script&index=0&lang.ts")} ` })} ` })} </div> <div> ${renderComponent($$result2, "Card", $$Card, { "className": "hover:shadow-primary/5 h-fit gap-6 transition-all duration-300 hover:shadow-lg" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardHeader", $$CardHeader, { "className": "gap-6" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "BookOpen", $$BookOpen, { "className": "text-secondary size-16 stroke-1" })} <h3 class="text-2xl">Knowledge Base</h3> ` })} ${renderComponent($$result3, "CardContent", $$CardContent, { "className": "pt-0" }, { "default": async ($$result4) => renderTemplate` <p class="text-muted-foreground">
Find answers to common questions, setup guides, and best practices in
                our comprehensive documentation.
</p> ` })} ${renderComponent($$result3, "CardContent", $$CardContent, { "className": "mt-auto pt-0" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "Button", $$Button, { "size": "lg", "variant": "light", "className": "h-12 w-full" }, { "default": async ($$result5) => renderTemplate` <a href="https://kb.biosked.fr/en/knowledge" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2">
Browse Docs
</a> ` })} ` })} ` })} </div> </div> </div> </section> ` })}`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/pages/contact.astro", void 0);

const $$file = "/Users/biofred/Documents/Dev/marketing-site/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Contact,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
