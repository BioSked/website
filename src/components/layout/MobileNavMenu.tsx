import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { siteConfig } from "@/config";

const ALL_NAV_LINKS = [
  { label: 'Platform', href: '/' },
  {
    label: 'Solutions',
    href: '#',
    hidden: !siteConfig.features.showSolutions,
    subitems: [
      {
        label: 'For Clinicians',
        href: '/solutions/clinicians',
      },
      {
        label: 'For Care Coordinators',
        href: '/solutions/care-coordinators',
      },
      {
        label: 'For Health Systems',
        href: '/solutions/health-systems',
      },
      {
        label: 'Integrations',
        href: '/integrations',
        hidden: !siteConfig.features.showIntegrations,
      },
      {
        label: 'Case Studies',
        href: '/case-studies',
        hidden: !siteConfig.features.showCaseStudies,
      },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Company',
    href: '#',
    subitems: [
      {
        label: 'About',
        href: '/about',
      },
      {
        label: 'Security & Compliance',
        href: '/security',
        hidden: !siteConfig.features.showSecurityCompliance,
      },
      {
        label: 'Careers',
        href: '/careers',
      },
      {
        label: 'Contact',
        href: '/contact',
      },
    ],
  },
  {
    label: 'Resources',
    href: '#',
    hidden: !siteConfig.features.showResources,
    subitems: [
      {
        label: 'Blog',
        href: '/blog',
      },
      {
        label: 'Documentation',
        href: '/docs',
      },
      {
        label: 'Customer Stories',
        href: '/customers',
      },
    ],
  },
];

const NAV_LINKS = ALL_NAV_LINKS.filter(item => !item.hidden).map(item => ({
  ...item,
  subitems: item.subitems?.filter(sub => !sub.hidden),
}));

const icons: Record<string, React.FC<{ className?: string }>> = {
  Link2: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
      <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
      <line x1="8" x2="16" y1="12" y2="12"></line>
    </svg>
  ),
  BarChart3: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"></path>
      <path d="M18 17V9"></path>
      <path d="M13 17V5"></path>
      <path d="M8 17v-3"></path>
    </svg>
  ),
  Filter: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  ),
};

interface MobileNavMenuProps {
  pathname: string;
}

export function MobileNavMenu({ pathname }: MobileNavMenuProps) {
  const isActive = (itemHref: string) => {

    if (itemHref.includes('#')) {
      const path = itemHref.split('#')[0] || '/';
      return pathname === path;
    }
    return pathname === itemHref || pathname.startsWith(itemHref + '/');
  };

  return (
    <nav className="inline-block w-full max-w-none py-10">
      <ul className="w-full flex-col items-start gap-0">
        {NAV_LINKS.map((item) => (
          <li key={item.label} className="w-full py-3">
            {item.subitems ? (
              <Accordion type="single" collapsible>
                <AccordionItem value={item.label}>
                  <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between px-2 py-3 text-base font-normal hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="space-y-1">
                      {item.subitems.map((subitem) => {
                        const isSubitemActive = isActive(subitem.href);
                        return (
                          <a
                            key={subitem.label}
                            href={subitem.href}
                            className={cn(
                              "text-muted-foreground hover:bg-muted block px-4 py-2.5 text-sm font-medium transition-colors rounded-md",
                              isSubitemActive && "bg-muted text-foreground font-semibold"
                            )}
                          >
                            {subitem.label}
                          </a>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <a
                href={item.href}
                className={cn(
                  "hover:text-foreground text-base transition-colors block px-2",
                  isActive(item.href) && "font-semibold text-foreground"
                )}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
