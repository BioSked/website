import { toSwissGerman } from '../swissGerman';
import { MARKET as GERMAN_MARKET } from './de';
import type { MarketContent } from './types';

const base = toSwissGerman(GERMAN_MARKET);

/** German-language Swiss market content, based on DE copy and Swiss pricing. */
export const MARKET: MarketContent = {
    ...base,
    demo: {
        ...base.demo,
        metaTitle: 'Momentum-Demo Schweiz | BioSked',
        metaDescription:
            'Vereinbaren Sie eine Momentum-Demo für Ihr Ärzteteam in der Schweiz: Dienstplanung, Pikett, Planungswünsche, Zeiterfassung und Lohnexport an Ihrem konkreten Fall.',
    },
    getquote: {
        ...base.getquote!,
        metaTitle: 'Momentum-Angebot Schweiz | BioSked',
        metaDescription:
            'Fordern Sie ein individuelles Momentum-Angebot in CHF an, abgestimmt auf Teamgrösse, Standorte, Dienstmodelle und Module Ihrer Schweizer Organisation.',
    },
    security: {
        ...base.security!,
        metaTitle: 'Sicherheit & Daten Schweiz | BioSked',
        metaDescription:
            'Wie Momentum Planungsdaten für Schweizer Organisationen verarbeitet: EU-Hosting, vertraglich dokumentierter Datenschutz, Verschlüsselung und rollenbasierte Zugriffe.',
    },
    references: {
        ...base.references!,
        metaTitle: 'Momentum-Referenzen Schweiz | BioSked',
        metaDescription:
            'Veröffentlichte Momentum-Fallstudien zu Dienstplanung, Zeiteinsparung, Integrationen und fairer Verteilung, eingeordnet für Schweizer Gesundheitsteams.',
    },
    thankyou: {
        ...base.thankyou!,
        title: 'Anfrage erhalten | BioSked Schweiz',
    },
    pricing: {
        ...base.pricing,
        metaTitle: 'Momentum-Preise Schweiz | BioSked',
        metaDescription:
            'Momentum für Schweizer Gesundheitsteams ab CHF 5.99 pro eingeplanter Fachkraft und Monat. Der Endpreis richtet sich nach Teamgrösse, Standorten und Modulen.',
        anchor: 'Ab <strong>CHF 5.99</strong> pro eingeplanter Fachkraft und Monat.',
    },
};
