/**
 * Home-page mobile-app section — copy per locale.
 * Headings reuse the approved App Store subtitles (Momentum App Store Copy
 * EN-FR-DE-NL-IT); benefits follow the launch-announcement capability list.
 * Deliberately does NOT name the in-app assistant (teaser policy) and does
 * not use the internal project name.
 */
export interface MobileAppContent {
    eyebrow: string;
    heading: string;
    lead: string;
    bullets: string[];
    calendarNote: string;
    availability: string;
    imageAlt: string;
    /** Which mockup to show: French UI for fr/fr-ch, English UI elsewhere. */
    imageVariant: 'en' | 'fr';
}

export const MOBILE_APP: Record<'en' | 'fr' | 'fr-ch' | 'de' | 'nl' | 'it', MobileAppContent> = {
    en: {
        eyebrow: 'The Momentum mobile app',
        heading: 'Your schedule, in your pocket',
        lead: 'The all-new Momentum app gives physicians and staff their schedule, shifts, and requests on iPhone and Android — schedulers publish once, and everyone is up to date, instantly.',
        bullets: [
            'Day, week, or month at a glance — even offline',
            'Give, swap, take, and bid on shifts from anywhere',
            'Time-off requests and preferences sent in seconds',
            'Real-time notifications the moment a schedule changes',
            'Face ID sign-in, Microsoft SSO, five languages',
        ],
        calendarNote: 'Your Momentum schedule can also appear in Outlook or your favorite calendar app.',
        availability: 'Included with Momentum · iPhone & Android',
        imageAlt: 'Momentum healthcare scheduling app on iPhone — weekly medical staff schedule with shifts and vacation',
        imageVariant: 'en',
    },
    fr: {
        eyebrow: 'L’application mobile Momentum',
        heading: 'Votre planning, dans la poche',
        lead: 'La nouvelle application Momentum donne aux médecins et aux équipes leur planning, leurs services et leurs demandes sur iPhone et Android — le planificateur publie une fois, tout le monde est à jour, instantanément.',
        bullets: [
            'Jour, semaine ou mois en un coup d’œil — même hors ligne',
            'Céder, échanger ou reprendre un service, où que vous soyez',
            'Congés et désidératas envoyés en quelques secondes',
            'Notification en temps réel dès qu’un planning change',
            'Connexion Face ID, SSO Microsoft, cinq langues',
        ],
        calendarNote: 'Votre planning Momentum peut aussi s’afficher dans Outlook ou votre agenda habituel.',
        availability: 'Inclus avec Momentum · iPhone & Android',
        imageAlt: 'Application mobile Momentum de planification médicale sur iPhone — planning hebdomadaire avec services et congés',
        imageVariant: 'fr',
    },
    'fr-ch': {
        eyebrow: 'L’application mobile Momentum',
        heading: 'Votre planning, dans la poche',
        lead: 'La nouvelle application Momentum donne aux médecins et aux équipes leur planning, leurs services et leurs demandes sur iPhone et Android — le planificateur publie une fois, tout le monde est à jour, instantanément.',
        bullets: [
            'Jour, semaine ou mois en un coup d’œil — même hors ligne',
            'Céder, échanger ou reprendre un service, où que vous soyez',
            'Congés et désidératas envoyés en quelques secondes',
            'Notification en temps réel dès qu’un planning change',
            'Connexion Face ID, SSO Microsoft, cinq langues',
        ],
        calendarNote: 'Votre planning Momentum peut aussi s’afficher dans Outlook ou votre agenda habituel.',
        availability: 'Inclus avec Momentum · iPhone & Android',
        imageAlt: 'Application mobile Momentum de planification médicale sur iPhone — planning hebdomadaire avec services et congés',
        imageVariant: 'fr',
    },
    de: {
        eyebrow: 'Die Momentum Mobile-App',
        heading: 'Ihr Dienstplan, immer dabei',
        lead: 'Die neue Momentum-App bringt Ärztinnen, Ärzten und Teams ihren Dienstplan, ihre Dienste und Anträge aufs iPhone oder Android-Gerät — die Planung wird einmal veröffentlicht, und alle sind sofort auf dem aktuellen Stand.',
        bullets: [
            'Tag, Woche oder Monat auf einen Blick — auch offline',
            'Dienste abgeben, tauschen oder übernehmen, von überall',
            'Urlaub und Planungswünsche in Sekunden eingereicht',
            'Echtzeit-Benachrichtigung, sobald sich der Plan ändert',
            'Face-ID-Anmeldung, Microsoft-SSO, fünf Sprachen',
        ],
        calendarNote: 'Ihr Momentum-Dienstplan lässt sich auch in Outlook oder Ihrem gewohnten Kalender anzeigen.',
        availability: 'In Momentum enthalten · iPhone & Android',
        imageAlt: 'Momentum Dienstplan-App auf dem iPhone — Wochenansicht mit Diensten und Urlaub für ärztliche Teams',
        imageVariant: 'en',
    },
    nl: {
        eyebrow: 'De Momentum mobiele app',
        heading: 'Uw rooster, altijd bij u',
        lead: 'De nieuwe Momentum-app geeft artsen en teams hun rooster, diensten en aanvragen op iPhone en Android — de planner publiceert één keer, en iedereen is direct bij.',
        bullets: [
            'Dag, week of maand in één oogopslag — ook offline',
            'Diensten overdragen, ruilen of overnemen, waar u ook bent',
            'Verlof en voorkeuren in enkele seconden aangevraagd',
            'Realtime meldingen zodra het rooster wijzigt',
            'Inloggen met Face ID of Microsoft, vijf talen',
        ],
        calendarNote: 'Uw Momentum-rooster kan ook verschijnen in Outlook of uw vertrouwde agenda-app.',
        availability: 'Inbegrepen bij Momentum · iPhone & Android',
        imageAlt: 'Momentum roosterapp voor de zorg op iPhone — weekoverzicht met diensten en verlof',
        imageVariant: 'en',
    },
    it: {
        eyebrow: 'L’app mobile Momentum',
        heading: 'La tua pianificazione, con te',
        lead: 'La nuova app Momentum dà a medici e team turni, guardie e richieste su iPhone e Android — chi pianifica pubblica una volta, e tutti sono subito aggiornati.',
        bullets: [
            'Giorno, settimana o mese a colpo d’occhio — anche offline',
            'Cedi, scambia o prendi un turno, ovunque tu sia',
            'Ferie e desiderata inviati in pochi secondi',
            'Notifiche in tempo reale a ogni modifica del turno',
            'Accesso con Face ID o Microsoft, cinque lingue',
        ],
        calendarNote: 'La tua pianificazione Momentum può comparire anche in Outlook o nel tuo calendario abituale.',
        availability: 'Incluso in Momentum · iPhone & Android',
        imageAlt: 'App Momentum per la pianificazione dei turni sanitari su iPhone — vista settimanale con turni e ferie',
        imageVariant: 'en',
    },
};
