import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config';

interface NavbarActionsProps {
    pathname: string;
}

const ACTION_BUTTONS = [
    { label: 'Book a Demo', href: '/bookdemo', variant: 'default' as const, isModal: false },
];

const ALL_NAV_LINKS = [
    { label: 'Momentum', href: '/' },
    { label: 'Pricing', href: '/pricing' },
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
	    label: 'About us',
	    href: '/about',
    },
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
];

const NAV_LINKS = ALL_NAV_LINKS.filter(item => !item.hidden).map(item => ({
    ...item,
    subitems: item.subitems?.filter(sub => !sub.hidden),
}));

export function NavbarActions({ pathname }: NavbarActionsProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (itemHref: string) => {
    if (itemHref.includes('#')) {
        const path = itemHref.split('#')[0] || '/';
        return pathname === path;
    }
    return pathname === itemHref || pathname.startsWith(itemHref + '/');
    };

    return (
    <>
    <div className="hidden items-center justify-end gap-4 lg:flex">
        {/*<ThemeToggle />*/}
        {ACTION_BUTTONS.map((button) => (
        <Button
            key={button.label}
            variant={button.variant}
            className="rounded-full shadow-none font-bold border border-white/50 shadow-sm hover:shadow-lg shadow-primary/40 transition-all duration-200 scale-100 hover:scale-103"
            onClick={button.isModal ? () => window.dispatchEvent(new CustomEvent('open-contact-sales')) : undefined}
        >
            {button.isModal ? button.label : <a href={button.href}>{button.label}</a>}
            </Button>
            ))}
    </div>

    <div className="flex items-center gap-2 lg:hidden lg:gap-4">
        {/*<ThemeToggle />*/}
        <button
        className="text-foreground relative flex size-8 rounded-sm lg:hidden z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        >
        <span className="sr-only">Open main menu</span>
        <div className="absolute top-1/2 left-1/2 block w-5 -translate-x-1/2 -translate-y-1/2">
            <span
            aria-hidden="true"
            className={cn(
                'absolute block h-0.5 w-full rounded-full bg-current transition duration-200 ease-in-out',
                isMenuOpen ? 'rotate-45' : '-translate-y-1.5',
                )}
            ></span>
            <span
                aria-hidden="true"
                className={cn(
                'absolute block h-0.5 w-full rounded-full bg-current transition duration-200 ease-in-out',
                isMenuOpen ? 'opacity-0' : '',
                )}
            ></span>
                <span
                aria-hidden="true"
                className={cn(
                    'absolute block h-0.5 w-full rounded-full bg-current transition duration-200 ease-in-out',
                    isMenuOpen ? '-rotate-45' : 'translate-y-1.5',
                    )}
                ></span>
                </div>
            </button>
            </div>

            <div
            className={cn(
                'bg-background text-accent-foreground fixed inset-0 z-40 flex flex-col justify-between tracking-normal transition-all duration-200 ease-out lg:hidden',
                isMenuOpen
                ? 'translate-y-full opacity-100 pointer-events-auto'
                : 'translate-y-12 opacity-0 pointer-events-none',
                )}
            >
            <div className="container bg-background border-t">
                <nav className="inline-block w-full max-w-none pt-8">
                <div className="space-y-6">
                    {NAV_LINKS.map((item) => (
                    <div key={item.label}>
                        {item.subitems ? (
                        <div className="space-y-2">
                            <div className="text-lg font-semibold text-foreground">{item.label}</div>
                            <div className="space-y-1 pl-4">
                            {item.subitems.map((subitem) => {
                                const isSubitemActive = isActive(subitem.href);
                                return (
                                <a
                                    key={subitem.label}
                                    href={subitem.href}
                                    className={cn(
                                    "block text-sm transition-colors",
                                    isSubitemActive
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {subitem.label}
                                </a>
                                );
                            })}
                            </div>
                        </div>
                        ) : (
                        <a
                            href={item.href}
                            className={cn(
                            "block text-lg transition-colors",
                            isActive(item.href)
                            ? "text-foreground"
                            : "text-foreground"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </a>
                        )}
                        </div>
                        ))}
                </div>
                </nav>
            </div>

            <div className="flex flex-col gap-4.5 px-6 py-6 bg-background shadow-md">
                {ACTION_BUTTONS.map((button) => (
                <Button
                    key={button.label}
                    variant={button.variant}
                    className="h-12 flex-1 rounded-sm shadow-sm font-bold shadow-primary/40 border border-white/40"
                    onClick={button.isModal ? () => {
                    window.location.href = '/bookdemo'
                    setIsMenuOpen(false);
                    } : undefined}
                >
                    {button.isModal ? button.label : <a href={button.href}>{button.label}</a>}
                </Button>
                ))}
            </div>
            </div>
            </>
            );
}
