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
          className="border bg-background/60 px-5 py-3 mb-4 rounded hover:shadow-primary/5 rounded-lg transition-all duration-300 hover:shadow-md mb-4"
        >
          <AccordionTrigger className="cursor-pointer text-base w-full font-semibold hover:no-underline md:text-lg lg:text-xl">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-foreground/75 text-base leading-relaxed sm:pr-8 lg:pr-12">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
