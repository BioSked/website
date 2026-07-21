/**
 * Localized plan tiers for the pricing pages — mirrors the English
 * Pricing section (same four tiers, no per-card prices; the per-locale
 * price anchor lives in the page hero). Plan NAMES stay in English
 * (product tier names), descriptions/features are localized.
 */

export interface LocalizedPlan {
    id: string;
    title: string;
    color: string;
    description: string;
    monthlyPrice: number | null;
    popular: boolean;
    baseOn?: string;
    features: string[];
}

export interface PricingPlansContent {
    heading: string;
    sub: string;
    plans: LocalizedPlan[];
    labels: {
        includes: string;
        everythingIn: string;
        recommended: string;
        request: string;
        letsTalk: string;
        quoteHref: string;
    };
}

function plans(
    d: { starter: string; plus: string; pro: string; enterprise: string },
    f: { starter: string[]; plus: string[]; pro: string[]; enterprise: string[] },
): LocalizedPlan[] {
    return [
        { id: 'starter', title: 'Starter', color: 'green', description: d.starter, monthlyPrice: 5.99, popular: false, features: f.starter },
        { id: 'plus', title: 'Plus', color: 'cyan', description: d.plus, monthlyPrice: 8.99, popular: false, baseOn: 'starter', features: f.plus },
        { id: 'pro', title: 'Pro', color: 'orange', description: d.pro, monthlyPrice: 10.99, popular: true, baseOn: 'plus', features: f.pro },
        { id: 'enterprise', title: 'Enterprise', color: 'cyan', description: d.enterprise, monthlyPrice: null, popular: false, features: f.enterprise },
    ];
}

const FR: PricingPlansContent = {
    heading: 'Des formules adaptées à chaque équipe',
    sub: 'De la planification simple à l’automatisation complète, chaque équipe a ses besoins. Choisissez une formule unique pour tout l’effectif ou combinez-les selon les services — le tout sur un même compte.',
    plans: plans(
        {
            starter: 'Pour les petites équipes aux rotations simples',
            plus: 'Pour les services à couverture complexe',
            pro: 'Pour les grands groupes et le multi-spécialités',
            enterprise: 'Pour les établissements et groupes multi-sites',
        },
        {
            starter: ['Planification centralisée', 'Gestion des demandes', 'Application web et mobile simple'],
            plus: ['Automatisation des trames de planning', 'Paramétrage personnalisé', 'Badgeage et suivi RH', 'Statistiques et rapports'],
            pro: ['Automatisation complète par IA', 'Multi-sites', 'Accompagnement expert au déploiement', 'ROI maximal', 'Support prioritaire'],
            enterprise: ['Solution sur mesure', 'Interlocuteur dédié', 'Engagements de service (SLA)', 'Authentification unique (SSO)', 'Intégrations sur mesure et accès API'],
        },
    ),
    labels: {
        includes: 'Comprend :',
        everythingIn: 'Tout {base}, plus :',
        recommended: 'Recommandée',
        request: 'Demander la formule {plan}',
        letsTalk: 'Parlons-en',
        quoteHref: '/fr/getquote/',
    },
};

const DE: PricingPlansContent = {
    heading: 'Für jedes Team der passende Plan',
    sub: 'Von der einfachen Dienstplanung bis zur vollständigen Automatisierung: Wählen Sie einen Plan für alle oder kombinieren Sie Pläne je Team — alles in einem Konto.',
    plans: plans(
        {
            starter: 'Für kleine Teams mit einfachen Rotationen',
            plus: 'Für Abteilungen mit komplexer Besetzung',
            pro: 'Für große oder fachübergreifende Teams',
            enterprise: 'Für Kliniken und Verbünde mit mehreren Standorten',
        },
        {
            starter: ['Zentrale Dienstplanung', 'Antragsverwaltung', 'Einfache Web- und Mobile-App'],
            plus: ['Intelligente Dienstmuster-Automatisierung', 'Individuelle Einrichtung', 'Zeiterfassung (HR)', 'Auswertungen und Berichte'],
            pro: ['Vollständige KI-Automatisierung', 'Multi-Standort', 'Expertenbegleitung beim Rollout', 'Stärkster ROI', 'Prioritäts-Support'],
            enterprise: ['Maßgeschneiderte Lösung', 'Persönlicher Ansprechpartner', 'Service Level Agreements (SLAs)', 'Single Sign-on (SSO)', 'Individuelle Integrationen und API-Zugang'],
        },
    ),
    labels: {
        includes: 'Enthält:',
        everythingIn: 'Alles aus {base}, plus:',
        recommended: 'Empfohlen',
        request: '{plan} anfragen',
        letsTalk: 'Sprechen wir darüber',
        quoteHref: '/de/getquote/',
    },
};

const NL: PricingPlansContent = {
    heading: 'Voor elk team een passend plan',
    sub: 'Van eenvoudige roosterplanning tot volledige automatisering: kies één plan voor iedereen of combineer plannen per team — alles binnen één account.',
    plans: plans(
        {
            starter: 'Voor kleine teams met eenvoudige roosters',
            plus: 'Voor afdelingen met complexe bezetting',
            pro: 'Voor grote of multidisciplinaire teams',
            enterprise: 'Voor zorggroepen met meerdere locaties',
        },
        {
            starter: ['Gecentraliseerde roosterplanning', 'Beheer van verzoeken', 'Eenvoudige web- en mobiele app'],
            plus: ['Slimme dienstpatroon-automatisering', 'Persoonlijke inrichting', 'Tijdregistratie (HR)', 'Analyses en rapportages'],
            pro: ['Volledige AI-automatisering', 'Meerdere locaties', 'Deskundige begeleiding bij implementatie', 'Sterkste ROI', 'Prioriteitssupport'],
            enterprise: ['Oplossing op maat', 'Vast aanspreekpunt', 'Service level agreements (SLA’s)', 'Single sign-on (SSO)', 'Maatwerkintegraties en API-toegang'],
        },
    ),
    labels: {
        includes: 'Inbegrepen:',
        everythingIn: 'Alles uit {base}, plus:',
        recommended: 'Aanbevolen',
        request: '{plan} aanvragen',
        letsTalk: 'Laten we praten',
        quoteHref: '/nl/getquote/',
    },
};

const IT: PricingPlansContent = {
    heading: 'Un piano per ogni team',
    sub: 'Dalla pianificazione semplice all’automazione completa: scegliete un unico piano per tutti o combinate piani diversi per team — tutto in un unico account.',
    plans: plans(
        {
            starter: 'Per piccoli team con rotazioni semplici',
            plus: 'Per reparti con coperture complesse',
            pro: 'Per gruppi grandi o multi-specialità',
            enterprise: 'Per strutture e gruppi multi-sede',
        },
        {
            starter: ['Pianificazione centralizzata', 'Gestione delle richieste', 'App web e mobile intuitiva'],
            plus: ['Automazione intelligente dei turni ricorrenti', 'Configurazione personalizzata', 'Rilevazione presenze (HR)', 'Analisi e report'],
            pro: ['Automazione completa con IA', 'Multi-sede', 'Affiancamento esperto al deployment', 'ROI più elevato', 'Supporto prioritario'],
            enterprise: ['Soluzione su misura', 'Referente dedicato', 'Service level agreement (SLA)', 'Single sign-on (SSO)', 'Integrazioni su misura e accesso API'],
        },
    ),
    labels: {
        includes: 'Include:',
        everythingIn: 'Tutto di {base}, più:',
        recommended: 'Consigliato',
        request: 'Richiedi il piano {plan}',
        letsTalk: 'Parliamone',
        quoteHref: '/it/getquote/',
    },
};

const FR_CH: PricingPlansContent = { ...FR, labels: { ...FR.labels, quoteHref: '/fr-ch/getquote/' } };

export const PRICING_PLANS: Record<string, PricingPlansContent> = {
    fr: FR,
    'fr-ch': FR_CH,
    de: DE,
    nl: NL,
    it: IT,
};
