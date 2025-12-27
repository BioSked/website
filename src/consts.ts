

export const SITE_TITLE = 'Momentum - Healthcare Scheduling Software by BioSked';
export const SITE_DESCRIPTION =
'Momentum by BioSked: AI-powered healthcare scheduling software for hospitals, clinics, and medical practices. Automate physician scheduling, RVU tracking, shift management, and compliance for radiology, emergency medicine, anesthesiology, and specialty practices.';

export const NAV_LINKS = [
    {
        label: 'nav.product',
        alt: 'nav.product-subtitle',
        href: '/',
        anchor: '#momentum',
        showMobile: true,
        showDesktop: true,
    },
    {
        label: 'nav.domains',
        alt: 'nav.domains-subtitle',
        href: '#',
        showMobile: false,
        showDesktop: false,
        subitems: [
            {
                label: 'Clinicians',
                alt: '',
                href: '/solutions/clinicians',
                showDesktop: false,
            },
            {
                label: 'Care Coordinators',
                alt: '',
                href: '/solutions/care-coordinators',
                showDesktop: false,
            },
            {
                label: 'Health Systems',
                alt: '',
                href: '/solutions/health-systems',
                showDesktop: false,
            },
            {
                label: 'Case Studies',
                alt: '',
                href: '/case-studies',
                showDesktop: false,
            },
        ],
    },
    {
        label: 'nav.pricing',
        alt: 'nav.pricing-subtitle',
        href: '/pricing',
        showMobile: true,
        showDesktop: true,
    },
    {
        label: 'nav.resources',
        alt: 'nav.resources-subtitle',
        href: '#',
        showMobile: true,
        showDesktop: true,
        subitems: [
            {
                label: 'Integrations',
                alt: '',
                href: '/integrations',
                showDesktop: false,
                showMobile: false,
            },
            {
                label: 'nav.about',
                alt: 'nav.about-subtitle',
                href: '/about',
                showDesktop: true,
                showMobile: true
            },
            {
                label: 'nav.security',
                alt: '',
                href: '/security',
                showDesktop: false,
                showMobile: false,
            },
            {
                label: 'nav.careers',
                alt: 'nav.careers-subtitle',
                href: '/careers',
                showDesktop: true,
                showMobile: true
            },
            {
                label: 'nav.help',
                alt: 'nav.help-subtitle',
                href: 'https://kb.biosked.fr/en/knowledge/kb-tickets/new',
                showDesktop: true,
                showMobile: false,
            },
        ],
    },
    {
        label: 'nav.blog',
        alt: 'nav.blog-subtitle',
        href: '/blog',
        showDesktop: true,
        showMobile: true,
    }
];

export const siteConfig = {
  features: {
    showSolutions: false,
    showResources: true,
    showIntegrations: false,
    showSecurityCompliance: false,
    showCaseStudies: false,
    showFooterSolutions: false,
    showFooterIntegrations: false,
    showFooterResources: false,
  },
  site: {
    name: 'Momentum',
    description: 'Smart Staff Scheduling For Healthcare',
  },
} as const;

export type FeatureFlags = typeof siteConfig.features;

export const SITE_METADATA = {
    title: {
        default: SITE_TITLE,
        template: '%s | Momentum by BioSked',
    },
    description: SITE_DESCRIPTION,
    keywords: [
        'healthcare scheduling software',
        'medical staff scheduling',
        'RVU scheduling',
        'hospital staffing software',
        'radiology scheduling software',
        'emergency department scheduling',
        'anesthesiology scheduling',
        'physician scheduling',
        'clinic scheduling software',
        'medical practice scheduling',
        'hospital group scheduling',
        'multi-site healthcare scheduling',
        'pathology scheduling software',
        'cardiology practice scheduling',
        'OBGYN scheduling',
        'pediatric practice scheduling',
        'residency scheduling software',
        'ophthalmology scheduling',
        'telemedicine scheduling',
        'primary care scheduling',
        'healthcare workforce management',
        'medical group scheduling',
        'ambulatory scheduling',
        'clinical scheduling software',
        'staff scheduling automation',
    ],
    authors: [{ name: 'BioSked Team' }],
    creator: 'Momentum by BioSked',
    publisher: 'BioSked Inc.',
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: [
            { url: '/favicon/favicon.ico', sizes: '48x48' },
            { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon/favicon.ico' },
        ],
        apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
        shortcut: [{ url: '/favicon/favicon.ico' }],
    },
    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        siteName: 'Momentum by BioSked',
        locale: 'en_US',
        localeAlternate: ['en_GB', 'en_EU'],
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Momentum by BioSked - AI-Powered Healthcare Scheduling Software for Hospitals and Clinics',
            },
        ],
    },
};
