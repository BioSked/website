import { useState } from 'react';
import { cn } from '@/lib/utils';
import bioSkedLogo from '@/assets/logos/biosked-logo.svg';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavbarActionsProps {
    pagename: string;
}

const ACTION_BUTTONS = [
    { label: 'Book a Demo', href: '/bookdemo', variant: 'default' as const, isModal: false },
];

export function NavbarActions({ pagename, navLinks}: NavbarActionsProps)
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const MOBILE_LINK = navLinks.filter(item => item.showMobile).map(item => ({
        ...item,
        subitems: item.subitems?.filter(sub => sub.showMobile),
    }));

    const DESKTOP_LINK = navLinks.filter(item => item.showDesktop).map(item => ({
        ...item,
        subitems: item.subitems?.filter(sub => sub.showDesktop),
    }));

    return (
        <>
        <header
            className="sticky top-0 z-50 bg-linear-to-t from-background/0 to-white/80 border-b backdrop-blur-md supports-backdrop-filter:bg-background/60"
        >
            <div class="container max-w-5xl flex items-center h-16">
                <a href="/" className="flex flex-1 gap-2">
                    <img 
                        src={bioSkedLogo.src} 
                        alt="BioSked" 
                        width={125}
                    />
                </a>
                <div class="flex flex-1 justify-center hidden md:block">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            {DESKTOP_LINK.map((item) => (
                                <NavigationMenuItem key={item.label}>
                                    {item.subitems ? (
                                        <>
                                        <NavigationMenuTrigger className="cursor-pointer [&_svg]:ms-2 [&_svg]:size-4">
                                            {item.label}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className={'-ml-3'}>
                                            <div class="bg-white/5 border-1 border-secondary/10 rounded-sm p-1">
                                                <ul className="grid w-[220px] gap-0">
                                                    {item.subitems.map((subitem) => {
                                                        return (
                                                            <li key={subitem.label}>
                                                                <NavigationMenuLink
                                                                    href={subitem.href}
                                                                    className="text-foreground! px-3"
                                                                >
                                                                    {subitem.label}
                                                                    <div className={cn("text-muted-foreground -mt-1")}>{subitem.alt}</div>
                                                                </NavigationMenuLink>
                                                            </li>
                                                            );
                                                    })}
                                                </ul>
                                            </div>
                                        </NavigationMenuContent>
                                        </>
                                        ) : (
                                        <NavigationMenuLink
                                            href={item.href + (pagename=='/' && item.anchor ? item.anchor : '')}
                                            className={cn(
                                                navigationMenuTriggerStyle()
                                                )}
                                        >
                                            {item.label}
                                        </NavigationMenuLink>
                                        )}
                                    </NavigationMenuItem>
                                    ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex flex-1 justify-end">
                    <div className="items-center justify-end gap-4 flex">
                        {ACTION_BUTTONS.map((button) => (
                            <a href={button.href} key={button.label}>
                                <Button
                                    key={button.label}
                                    variant={button.variant}
                                    size="xs"
                                    className="lg:h-9 lg:text-sm lg:font-bold lg:px-4"
                                    onClick={button.isModal ? () => window.dispatchEvent(new CustomEvent('open-contact-sales')) : undefined}
                                >
                                    {button.label}
                                </Button>
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 md:hidden lg:gap-4">
                        <button
                            className="text-foreground relative flex size-8 rounded-sm lg:hidden z-50 ml-4"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className={cn(
                                'absolute top-1/2 left-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transition-all ease-out duration-400',
                                isMenuOpen ? 'rotate-180' : '',
                            )}>
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
                </div>
            </div>
        </header>
        <div
            className={cn(
                'text-accent-foreground fixed top-0 inset-0 z-40 flex flex-col justify-between tracking-normal transition-all duration-300 ease-out lg:hidden will-change-opacity bg-background/80 backdrop-blur',
                isMenuOpen
                ? 'opacity-100 pointer-events-auto'
                : '-translate-y-2 opacity-0 pointer-events-none',
                )}
        >
            <div className="container mt-16">
                <nav className="inline-block w-full max-w-none pt-6 font-semibold text-muted-foreground">
                    {MOBILE_LINK.map((item) => (
                        <div key={item.label}>
                            {item.subitems ? <div className="text-sm mt-8 mb-4">{item.label}</div> : ''}
                            {item.subitems ? (
                                item.subitems.map((subitem) => (
                                    <a
                                        key={subitem.label}
                                        href={subitem.href}
                                        className={cn("block text-xl transition-colors text-foreground mb-4")}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {subitem.label}
                                    </a>
                                    ))
                                ) : (
                                <a
                                    href={item.href}
                                    className={cn("block text-xl transition-colors text-foreground mb-4")}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    </>
    );
}
