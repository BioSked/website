/**
 * Per-locale copy for /legal/ and /legal/subprocessors/. The contract text itself
 * exists in English and French only (terms-en.html, terms-fr.html); the other
 * locales show the English text with a localized frame.
 */
import type { LocaleCode } from '@/i18n/locales';
import { toSwissGerman } from '@/i18n/swissGerman';

export interface LegalStrings {
    metaTitle: string;
    metaDescription: string;
    heading: string;
    lead: string;
    contractLanguage: string;
    version: string;
    status: string;
    effective: string;
    issued: string;
    statusDraft: string;
    statusInForce: string;
    effectiveTbd: string;
    downloadEn: string;
    downloadFr: string;
    subprocessorsLink: string;
    toc: string;
    spTitle: string;
    spMetaTitle: string;
    spMetaDescription: string;
    spLead: string;
    back: string;
}

const EN: LegalStrings = {
    metaTitle: 'General Terms and Conditions | Momentum by BioSked',
    metaDescription: 'The Momentum General Terms and Conditions (version 2026-07) with their five annexes: support and service levels, data processing, AI assistant, professional services and regional schedule.',
    heading: 'Momentum General Terms and Conditions',
    lead: 'These terms govern every Momentum subscription. Each order form references them and includes them. This page always shows the current version; earlier versions remain available on request.',
    contractLanguage: 'The contractual language of your agreement is stated in your order form. Customers in France contract on the French text.',
    version: 'Version',
    status: 'Status',
    effective: 'Effective date',
    issued: 'Issued',
    statusDraft: 'Draft under legal review, not yet in force',
    statusInForce: 'In force',
    effectiveTbd: 'To be announced after the review',
    downloadEn: 'Download the PDF (English)',
    downloadFr: 'Download the PDF (French)',
    subprocessorsLink: 'Authorised subprocessors (Annex 2, Schedule D)',
    toc: 'Contents',
    spTitle: 'Authorised subprocessors',
    spMetaTitle: 'Authorised subprocessors | Momentum by BioSked',
    spMetaDescription: 'The subprocessors authorised under Annex 2, Schedule D of the Momentum General Terms and Conditions, with their purpose and their processing region.',
    spLead: 'Changes are notified at least 30 days in advance under section 11.4 of the General Terms; customers may object on reasonable data-protection grounds.',
    back: 'Back to the General Terms',
};

const FR: LegalStrings = {
    metaTitle: 'Conditions Générales | Momentum par BioSked',
    metaDescription: 'Les Conditions Générales Momentum (version 2026-07) et leurs cinq annexes : support et niveaux de service, traitement des données, assistant IA, services professionnels et annexe régionale.',
    heading: 'Conditions Générales Momentum',
    lead: 'Ces conditions régissent tout abonnement Momentum. Chaque bon de commande y fait référence et les joint. Cette page présente toujours la version en vigueur ; les versions antérieures restent disponibles sur demande.',
    contractLanguage: 'La langue contractuelle est indiquée dans votre bon de commande ; les clients établis en France contractent sur le texte français.',
    version: 'Version',
    status: 'Statut',
    effective: 'Date d\'entrée en vigueur',
    issued: 'Édition du',
    statusDraft: 'Projet en revue juridique, pas encore en vigueur',
    statusInForce: 'En vigueur',
    effectiveTbd: 'Communiquée à l\'issue de la revue',
    downloadEn: 'Télécharger le PDF (anglais)',
    downloadFr: 'Télécharger le PDF (français)',
    subprocessorsLink: 'Sous-traitants ultérieurs autorisés (Annexe 2, Annexe D)',
    toc: 'Sommaire',
    spTitle: 'Sous-traitants ultérieurs autorisés',
    spMetaTitle: 'Sous-traitants ultérieurs autorisés | Momentum par BioSked',
    spMetaDescription: 'Les sous-traitants ultérieurs autorisés à l\'Annexe 2, Annexe D des Conditions Générales Momentum, avec leur finalité et leur région de traitement.',
    spLead: 'Les changements sont notifiés avec un préavis d\'au moins 30 jours selon l\'article 11.4 des Conditions Générales ; le client peut s\'y opposer pour des motifs raisonnables de protection des données.',
    back: 'Retour aux Conditions Générales',
};

const DE: LegalStrings = {
    metaTitle: 'Allgemeine Geschäftsbedingungen | Momentum von BioSked',
    metaDescription: 'Die Allgemeinen Geschäftsbedingungen für Momentum (Version 2026-07) mit ihren fünf Anhängen: Support und Service-Level, Datenverarbeitung, KI-Assistent, professionelle Dienstleistungen und regionale Bestimmungen.',
    heading: 'Allgemeine Geschäftsbedingungen Momentum',
    lead: 'Diese Bedingungen gelten für jedes Momentum-Abonnement. Jedes Bestellformular verweist auf sie und enthält sie als Anlage. Diese Seite zeigt stets die aktuelle Fassung; frühere Fassungen sind auf Anfrage erhältlich.',
    contractLanguage: 'Diese Seite zeigt den englischen Vertragstext; eine deutsche Fassung gibt es nicht. Die Vertragssprache Ihres Vertrags ist im Bestellformular angegeben.',
    version: 'Version',
    status: 'Status',
    effective: 'Gültig ab',
    issued: 'Ausgabe vom',
    statusDraft: 'Entwurf in rechtlicher Prüfung, noch nicht in Kraft',
    statusInForce: 'In Kraft',
    effectiveTbd: 'Wird nach Abschluss der Prüfung bekannt gegeben',
    downloadEn: 'PDF herunterladen (Englisch)',
    downloadFr: 'PDF herunterladen (Französisch)',
    subprocessorsLink: 'Zugelassene Unterauftragsverarbeiter (Anhang 2, Schedule D)',
    toc: 'Inhalt',
    spTitle: 'Zugelassene Unterauftragsverarbeiter',
    spMetaTitle: 'Zugelassene Unterauftragsverarbeiter | Momentum von BioSked',
    spMetaDescription: 'Die nach Anhang 2, Schedule D der Allgemeinen Geschäftsbedingungen für Momentum zugelassenen Unterauftragsverarbeiter mit Zweck und Verarbeitungsregion.',
    spLead: 'Änderungen werden nach Abschnitt 11.4 der Allgemeinen Geschäftsbedingungen mindestens 30 Tage im Voraus angekündigt; Kunden können aus berechtigten Datenschutzgründen widersprechen.',
    back: 'Zurück zu den Allgemeinen Geschäftsbedingungen',
};

const NL: LegalStrings = {
    metaTitle: 'Algemene voorwaarden | Momentum van BioSked',
    metaDescription: 'De algemene voorwaarden van Momentum (versie 2026-07) met de vijf bijlagen: support en serviceniveaus, gegevensverwerking, AI-assistent, professionele diensten en regionale bepalingen.',
    heading: 'Algemene voorwaarden Momentum',
    lead: 'Deze voorwaarden gelden voor elk Momentum-abonnement. Elk bestelformulier verwijst ernaar en bevat ze als bijlage. Deze pagina toont altijd de geldende versie; eerdere versies zijn op verzoek beschikbaar.',
    contractLanguage: 'Deze pagina toont de Engelse contracttekst; er is geen Nederlandse versie. De contracttaal van uw overeenkomst staat in uw bestelformulier.',
    version: 'Versie',
    status: 'Status',
    effective: 'Geldig vanaf',
    issued: 'Uitgave van',
    statusDraft: 'Concept in juridische beoordeling, nog niet van kracht',
    statusInForce: 'Van kracht',
    effectiveTbd: 'Wordt bekendgemaakt na afronding van de beoordeling',
    downloadEn: 'Download de pdf (Engels)',
    downloadFr: 'Download de pdf (Frans)',
    subprocessorsLink: 'Toegestane subverwerkers (bijlage 2, schedule D)',
    toc: 'Inhoud',
    spTitle: 'Toegestane subverwerkers',
    spMetaTitle: 'Toegestane subverwerkers | Momentum van BioSked',
    spMetaDescription: 'De subverwerkers die zijn toegestaan onder bijlage 2, schedule D van de algemene voorwaarden van Momentum, met hun doel en verwerkingsregio.',
    spLead: 'Wijzigingen worden ten minste 30 dagen vooraf aangekondigd volgens artikel 11.4 van de algemene voorwaarden; klanten kunnen op redelijke gegevensbeschermingsgronden bezwaar maken.',
    back: 'Terug naar de algemene voorwaarden',
};

const IT: LegalStrings = {
    metaTitle: 'Condizioni generali | Momentum di BioSked',
    metaDescription: 'Le condizioni generali di Momentum (versione 2026-07) con i cinque allegati: supporto e livelli di servizio, trattamento dei dati, assistente IA, servizi professionali e disposizioni regionali.',
    heading: 'Condizioni generali Momentum',
    lead: 'Queste condizioni regolano ogni abbonamento Momentum. Ogni modulo d\'ordine vi fa riferimento e le allega. Questa pagina mostra sempre la versione in vigore; le versioni precedenti restano disponibili su richiesta.',
    contractLanguage: 'Questa pagina mostra il testo contrattuale in inglese; non esiste una versione italiana. La lingua contrattuale del suo contratto è indicata nel modulo d\'ordine.',
    version: 'Versione',
    status: 'Stato',
    effective: 'In vigore dal',
    issued: 'Edizione del',
    statusDraft: 'Bozza in revisione legale, non ancora in vigore',
    statusInForce: 'In vigore',
    effectiveTbd: 'Sarà comunicata al termine della revisione',
    downloadEn: 'Scarica il PDF (inglese)',
    downloadFr: 'Scarica il PDF (francese)',
    subprocessorsLink: 'Subresponsabili autorizzati (allegato 2, schedule D)',
    toc: 'Indice',
    spTitle: 'Subresponsabili autorizzati',
    spMetaTitle: 'Subresponsabili autorizzati | Momentum di BioSked',
    spMetaDescription: 'I subresponsabili autorizzati ai sensi dell\'allegato 2, schedule D delle condizioni generali di Momentum, con la loro finalità e la regione di trattamento.',
    spLead: 'Le modifiche sono notificate con almeno 30 giorni di preavviso ai sensi dell\'articolo 11.4 delle condizioni generali; i clienti possono opporsi per motivi ragionevoli di protezione dei dati.',
    back: 'Torna alle condizioni generali',
};

export const LEGAL_STRINGS: Record<LocaleCode, LegalStrings> = { en: EN, fr: FR, 'fr-ch': FR, de: DE, 'de-ch': toSwissGerman(DE), nl: NL, it: IT };

/** Language of the contract text shown for a locale. */
export function termsBodyLang(locale: LocaleCode): 'en' | 'fr' {
    return locale === 'fr' || locale === 'fr-ch' ? 'fr' : 'en';
}
