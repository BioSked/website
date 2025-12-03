import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqData: FAQItem[];
}

export function FAQAccordion({ faqData }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="max-w-2xl mx-auto">
      {faqData.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="border bg-background/60 mb-4 rounded border-none outline-1 outline-border shadow-none [&[data-state='closed']]:hover:outline-primary [&[data-state='closed']]:hover:outline-2 rounded-lg transition-none duration-300"
        >
          <AccordionTrigger className="cursor-pointer px-5 py-4 duration-300 [&[data-state='open']]:pb-2 text-base w-full font-semibold hover:no-underline md:text-lg lg:text-xl">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-foreground/75 text-base leading-relaxed sm:pr-8 lg:pr-12 pl-5">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
