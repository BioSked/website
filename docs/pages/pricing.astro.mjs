import { c as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate, a as createAstro, d as addAttribute, s as spreadAttributes, f as renderSlot, u as unescapeHTML } from '../chunks/astro/server_B5cfr19O.mjs';
import 'piccolore';
import { b as cn, c as createSvgComponent, B as Button, D as Dialog, d as DialogContent, e as DialogHeader, f as DialogTitle, I as Input, $ as $$BaseLayout } from '../chunks/BaseLayout_Cn3Tzen8.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { ChevronRight, Check, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { C as Card, a as CardHeader, b as CardContent } from '../chunks/card_guOmbWRd.mjs';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { $ as $$Card } from '../chunks/Card_CBulsP23.mjs';
import { $ as $$CardHeader } from '../chunks/CardHeader_rUJ59xRj.mjs';
import { $ as $$CardContent } from '../chunks/CardContent_CYkE1JzS.mjs';
import 'clsx';
import { $ as $$Button } from '../chunks/Button_CCc4pUqf.mjs';
import { $ as $$CTA } from '../chunks/CTA_DmW27yOY.mjs';
export { renderers } from '../renderers.mjs';

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}

const starterPlanLogo = createSvgComponent({"meta":{"src":"/_astro/starter-plan.BWF6Dn5Y.svg","width":50,"height":46,"format":"svg"},"attributes":{"width":"50","height":"46","fill":"none","viewBox":"0 0 50 46"},"children":"<path fill=\"url(#a)\" d=\"M0 0h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><path fill=\"url(#b)\" d=\"M0 12h21a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><path fill=\"url(#c)\" d=\"M0 24h29a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><path fill=\"url(#d)\" d=\"M0 36h43a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><defs><linearGradient id=\"a\" x1=\"0\" x2=\"14\" y1=\"5\" y2=\"5\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".99\" stop-color=\"#66d870\" /></linearGradient><linearGradient id=\"b\" x1=\"0\" x2=\"22\" y1=\"17\" y2=\"17\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".99\" stop-color=\"#66d870\" /></linearGradient><linearGradient id=\"c\" x1=\"0\" x2=\"30\" y1=\"29\" y2=\"29\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".99\" stop-color=\"#66d870\" /></linearGradient><linearGradient id=\"d\" x1=\"0\" x2=\"44\" y1=\"41\" y2=\"41\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".99\" stop-color=\"#66d870\" /></linearGradient></defs>"});

const plusPlanLogo = createSvgComponent({"meta":{"src":"/_astro/plus-plan.DogpMFhA.svg","width":50,"height":46,"format":"svg"},"attributes":{"width":"50","height":"46","fill":"none","viewBox":"0 0 50 46"},"children":"<path fill=\"url(#a)\" d=\"M0 0h19a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><path fill=\"url(#b)\" d=\"M0 12h27a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><path fill=\"url(#c)\" d=\"M0 24h35a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><path fill=\"url(#d)\" d=\"M0 36h47a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><defs><linearGradient id=\"a\" x1=\"0\" x2=\"20\" y1=\"5\" y2=\"5\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".962\" stop-color=\"#6ce5e8\" stop-opacity=\".91\" /></linearGradient><linearGradient id=\"b\" x1=\"0\" x2=\"28\" y1=\"17\" y2=\"17\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".962\" stop-color=\"#6ce5e8\" stop-opacity=\".91\" /></linearGradient><linearGradient id=\"c\" x1=\"0\" x2=\"36\" y1=\"29\" y2=\"29\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".962\" stop-color=\"#6ce5e8\" stop-opacity=\".91\" /></linearGradient><linearGradient id=\"d\" x1=\"0\" x2=\"48\" y1=\"41\" y2=\"41\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".962\" stop-color=\"#6ce5e8\" stop-opacity=\".91\" /></linearGradient></defs>"});

const proPlanLogo = createSvgComponent({"meta":{"src":"/_astro/pro-plan.nnpKDuNH.svg","width":50,"height":46,"format":"svg"},"attributes":{"width":"50","height":"46","fill":"none","viewBox":"0 0 50 46"},"children":"<path fill=\"url(#a)\" d=\"M0 0h25a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><path fill=\"url(#b)\" d=\"M0 12h33a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><path fill=\"url(#c)\" d=\"M0 24h41a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><path fill=\"url(#d)\" d=\"M0 36h49a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H0z\" /><defs><linearGradient id=\"a\" x1=\"0\" x2=\"26\" y1=\"5\" y2=\"5\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".938\" stop-color=\"#cf7637\" /></linearGradient><linearGradient id=\"b\" x1=\"0\" x2=\"34\" y1=\"17\" y2=\"17\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".938\" stop-color=\"#cf7637\" /></linearGradient><linearGradient id=\"c\" x1=\"0\" x2=\"42\" y1=\"29\" y2=\"29\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".938\" stop-color=\"#cf7637\" /></linearGradient><linearGradient id=\"d\" x1=\"0\" x2=\"50\" y1=\"41\" y2=\"41\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#0a367f\" /><stop offset=\".938\" stop-color=\"#cf7637\" /></linearGradient></defs>"});

function PricingCards({ plans }) {
  const planLogos = {
    "starter": starterPlanLogo,
    "plus": plusPlanLogo,
    "pro": proPlanLogo
  };
  const buildFeatureList = (plan) => {
    const allFeatures = [];
    if (plan.baseOn) {
      const basePlan = plans.find((p) => p.id === plan.baseOn);
      if (basePlan) {
        allFeatures.push({
          name: `Everything in ${basePlan.title}, plus:`,
          included: true
        });
      }
    }
    plan.features.forEach((feature) => {
      allFeatures.push({ name: feature, included: true });
    });
    return allFeatures;
  };
  const standardPlans = plans.filter((p) => p.id !== "enterprise");
  const enterprisePlan = plans.find((p) => p.id === "enterprise");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mt-12 grid gap-4 lg:grid-cols-3", children: standardPlans.map((plan) => {
      const features = buildFeatureList(plan);
      return /* @__PURE__ */ jsxs(
        Card,
        {
          className: "bg-border hover:shadow-primary/5 h-full gap-4 p-3 transition-all duration-300 hover:shadow-lg",
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "bg-card rounded-md p-4 md:p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium", children: plan.title }),
                  plan.popular && /* @__PURE__ */ jsx(Badge, { className: "rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300", children: "Popular" })
                ] }),
                planLogos[plan.id] && /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: planLogos[plan.id].src,
                    alt: `${plan.title} logo`,
                    className: "h-8 w-auto"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "font-normal text-sm text-muted-foreground", children: plan.description }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 md:mt-8", children: [
                /* @__PURE__ */ jsx("div", { className: "text-muted-foreground mt-2 text-sm", children: "As low as" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-2xl font-medium", children: "$" }),
                  /* @__PURE__ */ jsx("span", { className: "text-4xl font-semibold md:text-5xl", children: plan.monthlyPrice }),
                  /* @__PURE__ */ jsx("span", { className: "text-xl text-muted-foreground", children: "/mo" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-muted-foreground mt-2 text-sm", children: "per user" }),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    className: "mt-6 h-10 w-full",
                    onClick: () => {
                      window.dispatchEvent(new CustomEvent("open-get-started", {
                        detail: { plan: plan.title }
                      }));
                    },
                    children: [
                      "Get Started",
                      /* @__PURE__ */ jsx("div", { className: "bg-background/15 border-background/10 grid size-5.5 place-items-center rounded-full border", children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" }) })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "grid gap-3 p-4 pt-3 md:p-6 md:pt-4", children: features.map((feature, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsx("div", { className: "border-muted-foreground flex size-4 items-center justify-center rounded-full border-[0.5px]", children: /* @__PURE__ */ jsx(Check, { className: "text-muted-foreground size-2.5" }) }) }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "text-sm leading-tight",
                    feature.name.startsWith("Everything") ? "font-medium text-muted-foreground" : "text-muted-foreground/80"
                  ),
                  children: feature.name
                }
              )
            ] }, index)) })
          ]
        },
        plan.id
      );
    }) }),
    enterprisePlan && /* @__PURE__ */ jsx("div", { className: "mx-auto mt-4", children: /* @__PURE__ */ jsxs(Card, { className: "bg-border hover:shadow-primary/5 gap-4 p-3 transition-all duration-300 hover:shadow-lg", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "bg-card rounded-md p-4 md:p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-medium", children: enterprisePlan.title }),
          /* @__PURE__ */ jsx("div", { className: "font-normal text-sm text-muted-foreground", children: enterprisePlan.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 md:w-80", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-semibold", children: "Custom Pricing" }),
          /* @__PURE__ */ jsx(Button, { className: "h-10 w-full", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "/contact", children: [
            "Contact Sales",
            /* @__PURE__ */ jsx("div", { className: "bg-background/15 border-background/10 grid size-5.5 place-items-center rounded-full border", children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" }) })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "grid gap-3 p-4 pt-3 md:grid-cols-2 md:p-6 md:pt-4 lg:grid-cols-3", children: buildFeatureList(enterprisePlan).map((feature, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "mt-0.5", children: /* @__PURE__ */ jsx("div", { className: "border-muted-foreground flex size-4 items-center justify-center rounded-full border-[0.5px]", children: /* @__PURE__ */ jsx(Check, { className: "text-muted-foreground size-2.5" }) }) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "text-sm leading-tight",
              feature.name.startsWith("Everything") ? "font-medium text-muted-foreground" : "text-muted-foreground/80"
            ),
            children: feature.name
          }
        )
      ] }, index)) })
    ] }) })
  ] });
}

const $$Pricing$1 = createComponent(($$result, $$props, $$slots) => {
  const pricingPlans = [
    {
      id: "starter",
      title: "Starter",
      description: "For small groups with simple rotations",
      monthlyPrice: 4.99,
      popular: false,
      features: [
        "Centralized time-off & shift requests",
        "Web + mobile app access",
        "Basic schedule templates"
      ]
    },
    {
      id: "plus",
      title: "Plus",
      description: "For departments with complex coverage",
      monthlyPrice: 8.99,
      popular: false,
      baseOn: "starter",
      features: [
        "Automated shift patterns & rotations",
        "Custom configuration for your workflows",
        "Time & attendance tracking",
        "Schedule analytics & reporting"
      ]
    },
    {
      id: "pro",
      title: "Pro",
      description: "For large or multi-specialty groups",
      monthlyPrice: 10.99,
      popular: true,
      baseOn: "plus",
      features: [
        "Full rules-based schedule automation",
        "Multi-site scheduling support",
        "Expert deployment & configuration",
        "ROI analysis & optimization",
        "Priority support (faster response times)"
      ]
    },
    {
      id: "enterprise",
      title: "Enterprise",
      description: "For health systems with multiple facilities",
      monthlyPrice: null,
      popular: false,
      baseOn: "pro",
      features: [
        "Dedicated account manager",
        "Service level agreements (99.9% uptime)",
        "Single sign-on (SSO)",
        "API access & custom integrations",
        "White-label options"
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="section-padding relative overflow-hidden bg-surface"> <div class="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-45"> <div class="blob-accent absolute top-0 left-0 size-[600px] rounded-full blur-3xl will-change-transform -translate-y-1/3 md:-translate-x-1/3 md:translate-y-0"></div> <div class="blob-primary absolute right-0 bottom-0 size-[500px] rounded-full blur-3xl will-change-transform translate-y-1/3 md:top-0 md:translate-x-1/3 md:translate-y-0"></div> </div> <div class="from-background/30 to-background/30 pointer-events-none absolute inset-0 z-1 bg-linear-to-b"></div> <div class="bigger-container relative z-10"> <div class="text-center"> <h2 class="text-display-hero">
Transparent Pricing for Every Size Organization
</h2> <p class="text-muted-foreground mx-auto mt-6 max-w-2xl text-lead">
From small practices to large health systems—choose one plan for your entire organization or mix-and-match by department. All plans include unlimited schedules, templates, and support.
</p> </div> ${renderComponent($$result, "PricingCards", PricingCards, { "client:load": true, "plans": pricingPlans, "client:component-hydration": "load", "client:component-path": "/Users/biofred/Documents/Dev/marketing-site/src/components/sections/PricingCards.tsx", "client:component-export": "PricingCards" })} </div> </section>`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/sections/Pricing.astro", void 0);

function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-90",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(Plus, { className: "text-muted-foreground stroke-2.5 pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}

function FAQAccordion({ faqData }) {
  return /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-4", children: faqData.map((faq) => /* @__PURE__ */ jsxs(
    AccordionItem,
    {
      value: faq.id,
      className: "border-input hover:shadow-primary/5 rounded-lg border! px-6 py-2 transition-all duration-300 hover:shadow-md",
      children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "cursor-pointer text-base font-medium hover:no-underline md:text-lg lg:text-xl", children: faq.question }),
        /* @__PURE__ */ jsx(AccordionContent, { className: "text-muted-foreground pb-6 text-base leading-relaxed", children: faq.answer })
      ]
    },
    faq.id
  )) });
}

const $$Astro = createAstro("https://newwebsite.biosked.com");
const $$CardFooter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardFooter;
  const { className = "", ...props } = Astro2.props;
  const classes = cn("flex items-center px-6 [.border-t]:pt-6", className);
  return renderTemplate`${maybeRenderHead()}<div data-slot="card-footer"${addAttribute(classes, "class")}${spreadAttributes(props)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/ui/CardFooter.astro", void 0);

const $$FAQ = createComponent(($$result, $$props, $$slots) => {
  const faqData = [
    {
      id: "pricing-calculation",
      question: "How is pricing calculated?",
      answer: "Per active user per month. A user is anyone who builds schedules OR gets scheduled."
    },
    {
      id: "upgrade-later",
      question: "Can we start small and scale up?",
      answer: "Yes. Upgrade or downgrade anytime. Mix plans across departments (e.g., Starter for admin staff, Plus for clinical teams)."
    },
    {
      id: "compliance",
      question: "Is this compliant with healthcare regulations?",
      answer: "Yes. We're fully HIPAA and GDPR compliant. We only store scheduling data, not PHI."
    },
    {
      id: "implementation",
      question: "What's included in implementation?",
      answer: "All plans include onboarding and configuration support. Pro and Enterprise include dedicated project management and custom rule setup."
    },
    {
      id: "control",
      question: "Do we lose control over our schedules?",
      answer: "No. Momentum automates the repetitive work (pattern generation, conflict checking, fairness tracking) but you maintain full control over rules, exceptions, and final approval. Think of it as an intelligent assistant, not a replacement."
    },
    {
      id: "time-reinvestment",
      question: "What do teams do with the time they save?",
      answer: "Most scheduling teams reinvest saved time into strategic workforce planning, staff development, credentialing support, and proactive problem-solving. Momentum makes your team more effective, not smaller."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="section-padding relative bg-surface-alt"> <div class="container"> <h2 class="text-display-section">
Frequently asked questions
</h2> <div class="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-3"> <div class="lg:col-span-2"> ${renderComponent($$result, "FAQAccordion", FAQAccordion, { "client:visible": true, "faqData": faqData, "client:component-hydration": "visible", "client:component-path": "/Users/biofred/Documents/Dev/marketing-site/src/components/sections/FAQAccordion.tsx", "client:component-export": "FAQAccordion" })} </div> ${renderComponent($$result, "Card", $$Card, { "className": "hover:shadow-primary/5 h-full gap-6 transition-all duration-300 hover:shadow-lg" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", $$CardHeader, { "className": "gap-6 flex content-center justify-center" }, { "default": ($$result3) => renderTemplate` <h3 class="text-display-card">Still have questions?</h3> ` })} ${renderComponent($$result2, "CardContent", $$CardContent, { "className": "pt-0" }, { "default": ($$result3) => renderTemplate` <p class="text-muted-foreground">
Talk to our team about volume pricing, multi-site deployments, or custom integrations.
</p> ` })} ${renderComponent($$result2, "CardFooter", $$CardFooter, { "className": "mt-auto flex flex-col gap-3" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", $$Button, { "size": "lg", "className": "h-12 w-full gap-4 rounded-full pl-5.5! before:rounded-full", "onclick": "window.dispatchEvent(new CustomEvent('open-contact-sales'))" }, { "default": ($$result4) => renderTemplate`
Schedule a Demo
<div class="bg-background/15 border-background/10 grid size-5.5 place-items-center rounded-full border"> ${renderComponent($$result4, "ChevronRight", ChevronRight, { "className": "size-4" })} </div> ` })} ${renderComponent($$result3, "Button", $$Button, { "size": "lg", "variant": "light", "className": "group h-12 w-full gap-4" }, { "default": ($$result4) => renderTemplate` <a href="/contact" class="w-full h-full flex items-center justify-center">
Contact Us
</a> ` })} ` })} ` })} </div> </div> </section>`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/components/sections/FAQ.astro", void 0);

function GetStartedModal({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [selectedPlan, setSelectedPlan] = useState("");
  useEffect(() => {
    const handleOpen = (e) => {
      setSelectedPlan(e.detail.plan || "");
      setIsOpen(true);
      setMessage({ type: "", text: "" });
    };
    window.addEventListener("open-get-started", handleOpen);
    return () => window.removeEventListener("open-get-started", handleOpen);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/get-started", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        setMessage({ type: "success", text: result.message });
        e.target.reset();
        setTimeout(() => setIsOpen(false), 2e3);
      } else {
        setMessage({ type: "error", text: result.error || "Something went wrong. Please try again." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to submit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto sm:max-w-[600px]", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { className: "text-2xl font-semibold", children: "Get Started with Momentum" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Tell us about your organization and we'll help you find the right plan" })
    ] }),
    message.text && /* @__PURE__ */ jsx(
      "div",
      {
        className: `rounded-lg border p-4 ${message.type === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`,
        children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: message.text })
      }
    ),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: "Contact Information" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "name", className: "text-sm font-medium", children: [
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
                placeholder: "John Doe",
                className: "mt-1.5"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "email", className: "text-sm font-medium", children: [
              "Email ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                name: "email",
                type: "email",
                required: true,
                placeholder: "john@hospital.com",
                className: "mt-1.5"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "text-sm font-medium", children: "Phone Number" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "phone",
                name: "phone",
                type: "tel",
                placeholder: "+1 (555) 123-4567",
                className: "mt-1.5"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "text-sm font-medium", children: "Job Title" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "title",
                name: "title",
                type: "text",
                placeholder: "Scheduling Coordinator",
                className: "mt-1.5"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 border-t pt-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: "Organization Details" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "organization", className: "text-sm font-medium", children: [
            "Organization Name ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "organization",
              name: "organization",
              type: "text",
              required: true,
              placeholder: "City Hospital",
              className: "mt-1.5"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "departmentCount", className: "text-sm font-medium", children: [
              "Number of Departments ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "departmentCount",
                name: "departmentCount",
                required: true,
                className: "border-input focus-visible:ring-ring mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select..." }),
                  /* @__PURE__ */ jsx("option", { value: "1-3", children: "1-3 departments" }),
                  /* @__PURE__ */ jsx("option", { value: "4-10", children: "4-10 departments" }),
                  /* @__PURE__ */ jsx("option", { value: "11-25", children: "11-25 departments" }),
                  /* @__PURE__ */ jsx("option", { value: "26-50", children: "26-50 departments" }),
                  /* @__PURE__ */ jsx("option", { value: "50+", children: "50+ departments" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "staffCount", className: "text-sm font-medium", children: [
              "Total Staff Size ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "staffCount",
                name: "staffCount",
                required: true,
                className: "border-input focus-visible:ring-ring mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select..." }),
                  /* @__PURE__ */ jsx("option", { value: "1-50", children: "1-50" }),
                  /* @__PURE__ */ jsx("option", { value: "51-200", children: "51-200" }),
                  /* @__PURE__ */ jsx("option", { value: "201-500", children: "201-500" }),
                  /* @__PURE__ */ jsx("option", { value: "501-1000", children: "501-1000" }),
                  /* @__PURE__ */ jsx("option", { value: "1000+", children: "1000+" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "specialties", className: "text-sm font-medium", children: "Primary Specialties/Departments" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "specialties",
              name: "specialties",
              type: "text",
              placeholder: "e.g., Cardiology, Emergency, Surgery",
              className: "mt-1.5"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1 text-xs", children: "List your main specialties or departments (optional)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 border-t pt-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: "Plan Selection" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "plan", className: "text-sm font-medium", children: [
            "Preferred Plan ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "plan",
              name: "plan",
              required: true,
              value: selectedPlan,
              onChange: (e) => setSelectedPlan(e.target.value),
              className: "border-input focus-visible:ring-ring mt-1.5 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select a plan..." }),
                /* @__PURE__ */ jsx("option", { value: "Starter", children: "Starter - Essential scheduling" }),
                /* @__PURE__ */ jsx("option", { value: "Plus", children: "Plus - Advanced features" }),
                /* @__PURE__ */ jsx("option", { value: "Pro", children: "Pro - Full platform access" }),
                /* @__PURE__ */ jsx("option", { value: "Enterprise", children: "Enterprise - Custom solution" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "additionalInfo", className: "text-sm font-medium", children: "Additional Information" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "additionalInfo",
              name: "additionalInfo",
              rows: 3,
              placeholder: "Tell us about your specific needs or questions...",
              className: "border-input focus-visible:ring-ring mt-1.5 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", className: "w-full", disabled: isSubmitting, children: isSubmitting ? "Submitting..." : "Submit Request" })
    ] })
  ] }) });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = true;
const $$Pricing = createComponent(($$result, $$props, $$slots) => {
  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Momentum Healthcare Scheduling Software",
    "description": "AI-powered healthcare scheduling software for hospitals, clinics, and medical practices",
    "brand": {
      "@type": "Brand",
      "name": "BioSked"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter Plan",
        "description": "For small groups with simple rotations",
        "price": "4.99",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "4.99",
          "priceCurrency": "USD",
          "unitText": "per provider per month"
        },
        "availability": "https://schema.org/InStock",
        "url": "https://www.biosked.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Plus Plan",
        "description": "For departments with complex coverage",
        "price": "8.99",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "8.99",
          "priceCurrency": "USD",
          "unitText": "per provider per month"
        },
        "availability": "https://schema.org/InStock",
        "url": "https://www.biosked.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "description": "For large or multi-specialty groups",
        "price": "10.99",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "10.99",
          "priceCurrency": "USD",
          "unitText": "per provider per month"
        },
        "availability": "https://schema.org/InStock",
        "url": "https://www.biosked.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Enterprise Plan",
        "description": "For health systems with multiple facilities",
        "price": "0",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "USD",
          "valueAddedTaxIncluded": false
        },
        "availability": "https://schema.org/InStock",
        "url": "https://www.biosked.com/pricing"
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Pricing | Momentum Healthcare Scheduling Plans | BioSked", "description": "Transparent pricing for Momentum healthcare scheduling software that scales from small practices to large hospital groups. Compare plans for radiology, emergency medicine, and multi-specialty clinics. Free trial available. No credit card required." }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> ", " ", " ", " ", " "])), unescapeHTML(JSON.stringify(pricingStructuredData)), renderComponent($$result2, "PricingSection", $$Pricing$1, {}), renderComponent($$result2, "FAQ", $$FAQ, {}), renderComponent($$result2, "CTA", $$CTA, {}), renderComponent($$result2, "GetStartedModal", GetStartedModal, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/sections/GetStartedModal", "client:component-export": "GetStartedModal" })) })}`;
}, "/Users/biofred/Documents/Dev/marketing-site/src/pages/pricing.astro", void 0);

const $$file = "/Users/biofred/Documents/Dev/marketing-site/src/pages/pricing.astro";
const $$url = "/pricing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
