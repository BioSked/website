import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config";

const ALL_NAV_LINKS = [
    { label: 'Product', href: '/', anchor: '#momentum' },
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
      label: 'Resources',
      href: '#',
      subitems: [
        {
          label: 'About us',
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
          label: 'Help & Support',
          href: 'https://kb.biosked.fr/en/knowledge/kb-tickets/new',
        },
      ],
    },
    {
      label: 'Resources',
      href: '#',
      hidden: !siteConfig.features.showResources,
      hidden: true,
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

interface DesktopNavProps {
  pathname: string;
  pagename: string;
}

export function DesktopNav({ pathname,pagename }: DesktopNavProps) {
  const isActive = (itemHref: string) => {

    if (itemHref.includes('#')) {
      const path = itemHref.split('#')[0] || '/';
      return pathname === path;
    }
    return pathname === itemHref || pathname.startsWith(itemHref + '/');
  };

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {NAV_LINKS.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.subitems ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    "cursor-pointer [&_svg]:ms-2 [&_svg]:size-4",
                    isActive(item.href) && "bg-muted text-foreground font-semibold"
                  )}
                >
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-0">
                    {item.subitems.map((subitem) => {
                      const isSubitemActive = isActive(subitem.href);
                      return (
                        <li key={subitem.label}>
                          <NavigationMenuLink
                            href={subitem.href}
                            className={cn(
                              "",
                              isSubitemActive && ""
                            )}
                          >
                            {subitem.label}
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                href={item.href + (pagename=='/' && item.anchor ? item.anchor : '')}
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive(item.href)
                )}
              >
                {item.label}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
