/**
 * Homepage copy for the de/nl/it market pages.
 * Terminology follows the official Momentum app-store copy (EN/FR/DE/NL/IT),
 * which is the approved vocabulary per language (see migration/materials/).
 * The published proof points (250+ organizations, 1,000+ sites, 50,000+
 * users, 9 countries) mirror the English reference homepage.
 */
export interface HomeContent {
    metaTitle: string;
    metaDescription: string;
    hero: {
        title: string;
        lead: string;
        demoLabel: string;
        tourLabel: string;
        badges: [string, string, string];
    };
    features: {
        heading: string;
        sub: string;
        items: { title: string; text: string }[];
    };
    cta: {
        heading: string;
        sub: string;
        buttonLabel: string;
    };
}

export const HOME_CONTENT: Record<'de' | 'nl' | 'it', HomeContent> = {
    de: {
        metaTitle: 'Momentum – Dienstplanung für ärztliche Teams | BioSked',
        metaDescription:
            'Momentum von BioSked automatisiert Dienst-, Bereitschafts- und Rufdienstplanung für ärztliche Teams: regelkonform, fair und standortübergreifend.',
        hero: {
            title: 'Dienstplanung für ärztliche Teams',
            lead: 'Dienste, Bereitschaften, Rufdienste: faire, regelkonforme Dienstpläne – automatisch generiert statt in Excel gepflegt.',
            demoLabel: 'Demo anfragen',
            tourLabel: '1-Minuten-Tour ansehen (EN)',
            badges: ['15+ Jahre Dienstplanung', '250+ Einrichtungen', '50.000+ Nutzer'],
        },
        features: {
            heading: 'Gebaut für die schwierigsten Dienstpläne',
            sub: 'Ärztliche Dienstplanung ist ein anderes Problem als Personaleinsatzplanung in der Pflege: Bereitschafts- und Rufdienste, Arbeitszeitregeln, standortübergreifende Besetzung, Fairness über Monate hinweg. Momentum ist genau dafür gebaut.',
            items: [
                { title: 'Automatische Planerstellung', text: 'Dienstpläne werden unter Berücksichtigung von Verträgen, Qualifikationen, Arbeitszeitregeln und individuellen Planungswünschen automatisch generiert. In der Notaufnahme des CHIREC (Braine-l’Alleud, Belgien) sank der Aufwand für den Monatsplan von 4 Tagen auf 4–5 Stunden.' },
                { title: 'Bereitschafts- und Rufdienste', text: 'Bereitschafts-, Ruf- und Pikettdienste zentral planen, Besetzung und Kontinuität absichern – der Plan ist an jedem Standort aktuell und einsehbar.' },
                { title: 'Faire Verteilung, nachvollziehbare Zähler', text: 'Zähler für Nacht-, Wochenend- und Feiertagsdienste, die jedes Teammitglied einsehen kann. Wer wie viel trägt, ist belegbar – Verteilungsfragen werden anhand von Zahlen geklärt, und eine nachweislich faire Verteilung hilft, Fachkräfte zu halten.' },
                { title: 'Planungswünsche & Abwesenheiten', text: 'Wünsche, Urlaub und Abwesenheiten werden digital erfasst und automatisch im Plan berücksichtigt – nachvollziehbar statt per Zettel, E-Mail und Zuruf.' },
                { title: 'Dienstbörse', text: 'Dienste abgeben, tauschen oder übernehmen – regelkonform geprüft und für die Planung dokumentiert, statt informeller Tauschabsprachen neben dem Plan.' },
                { title: 'Zeiterfassung, Berichte & Lohnexport', text: 'Erfasste Zeiten und Stundenzähler liefern eine verlässliche Grundlage für die Lohnabrechnung. Anbindungen an RIS (NGI), Terminplanung (EasyDoct) sowie Zeitwirtschaft und HR (Kelio/Bodet) sind im Kundenbetrieb bewährt – die Radiologiegruppe IMAGIR beziffert den Effekt der Integrationen in ihrer Fallstudie auf ein bis zwei Vollzeitstellen.' },
            ],
        },
        cta: {
            heading: 'Bis zu 90 % weniger Zeitaufwand für die Dienstplanung',
            sub: 'Dokumentiert in der CHIREC-Fallstudie 2025: Monatsplanung von 4 Tagen auf 4–5 Stunden, Zufriedenheit im Team 90–100 %. Über 250 Gesundheitseinrichtungen planen mit Momentum an mehr als 1.000 Standorten in 9 Ländern.',
            buttonLabel: 'Demo anfragen',
        },
    },
    nl: {
        metaTitle: 'Momentum: Roosterplanning voor artsenteams | BioSked',
        metaDescription:
            'Momentum van BioSked automatiseert zorgroosters voor artsenteams, inclusief wacht- en bereikbaarheidsdiensten, eerlijke verdeling en tijdregistratie.',
        hero: {
            title: 'Gebouwd voor de moeilijkste roosters in de zorg',
            lead: 'Wachtdiensten, bereikbaarheid, voorkeuren: eerlijke, regelconforme roosters – automatisch gegenereerd in plaats van handmatig in Excel.',
            demoLabel: 'Demo aanvragen',
            tourLabel: 'Bekijk de tour van 1 minuut (EN)',
            badges: ['15+ jaar ervaring', '250+ zorgorganisaties', '50.000+ gebruikers'],
        },
        features: {
            heading: 'Van roostergeneratie tot loonexport',
            sub: 'Een artsenrooster is geen gewoon personeelsrooster: wacht- en bereikbaarheidsdiensten, werktijdregels, bezetting over meerdere campussen, eerlijkheid die maanden overspant. Momentum dekt dat volledige planningsproces in één platform. De applicatie is beschikbaar in het Nederlands.',
            items: [
                { title: 'Automatische roostergeneratie', text: 'Roosters gegenereerd binnen contracten, competenties, werktijdregels en persoonlijke voorkeuren. De planner beoordeelt het voorstel en stuurt bij, in plaats van elke maand zelf te puzzelen.' },
                { title: 'Wacht- en bereikbaarheidsdiensten', text: 'Wachtdiensten en bereikbaarheid gepland over meerdere campussen en teams, met bewaking van rusttijden en continuïteit. Iedereen ziet dezelfde, actuele versie.' },
                { title: 'Eerlijke verdeling, zichtbaar voor iedereen', text: 'Tellers voor weekend-, feestdag- en wachtdiensten en voor de zwaarte van diensten. Wie wat draagt is aantoonbaar in plaats van een kwestie van gevoel – dat beslecht verdelingsdiscussies met cijfers en helpt artsen behouden.' },
                { title: 'Verlof, voorkeuren en dienstenbeurs', text: 'Verlofaanvragen, roostervoorkeuren en het ruilen of overnemen van diensten lopen via het platform, volgens de roosterregels – niet via losse berichten en mailtjes.' },
                { title: 'Tijdregistratie naast het rooster', text: 'Klokken gebeurt in hetzelfde platform als het rooster: medewerkers klokken op de dienst die voor hen gepland staat, en geplande en gewerkte uren staan naast elkaar. De verplichtingen rond arbeidstijdregistratie in de Belgische zorg worden de komende jaren aangescherpt – daar is dan geen apart systeem voor nodig.' },
                { title: 'Rapportages, loonexport en integraties', text: 'Urentellers, activiteitenrapporten en export naar de salarisadministratie: doordat rooster en geklokte uren uit hetzelfde systeem komen, klopt de basis voor de loonverwerking. Koppelingen met RIS (NGI), afsprakenplanning (EasyDoct) en HR en tijdregistratie (Kelio/Bodet) draaien bij klanten in productie – radiologiegroep IMAGIR becijfert de winst van die koppelingen in haar casestudy op een fte, soms twee.' },
            ],
        },
        cta: {
            heading: 'Van 4 dagen naar 4–5 uur roosterwerk per maand',
            sub: 'Dat is het gedocumenteerde resultaat op de spoedgevallendienst van het CHIREC-ziekenhuis in Braine-l’Alleud (casestudy 2025). Momentum plant vandaag de diensten van 250+ zorgorganisaties op meer dan 1.000 locaties in 9 landen. Bekijk in een demo wat het met uw rooster doet.',
            buttonLabel: 'Demo aanvragen',
        },
    },
    it: {
        metaTitle: 'Momentum: pianificazione dei turni medici | BioSked',
        metaDescription:
            'Momentum di BioSked automatizza i turni per ospedali, gruppi di radiologia e team medici multi-sede, con regole, reperibilità, equità e rilevazione ore.',
        hero: {
            title: 'Pianificazione dei turni per gruppi di radiologia e team medici',
            lead: 'Guardie, reperibilità, preferenze: turni equi e conformi alle regole – generati automaticamente, non gestiti a mano in Excel.',
            demoLabel: 'Richiedi una demo',
            tourLabel: 'Guarda il tour di 1 minuto (EN)',
            badges: ['15+ anni di esperienza', '250+ organizzazioni sanitarie', '1.000+ sedi'],
        },
        features: {
            heading: 'Costruito per i vincoli reali della pianificazione medica',
            sub: 'Contratti, guardie, equità, sedi multiple: ogni vincolo che oggi gestisci a mano ha un posto preciso nella piattaforma.',
            items: [
                { title: 'Generazione automatica sotto vincoli', text: "Turni generati nel rispetto di contratti, competenze, regole sull'orario di lavoro, desiderata individuali e gravosità dei turni. Il centro di radiologia Les Cèdres (18 radiologi, 5 sedi) li genera solo 3 volte all'anno." },
                { title: 'Guardie e reperibilità', text: 'Copertura pianificata su tutte le sedi, smonti e riposi rispettati, continuità del servizio. In caso di assenza o imprevisto, il sistema propone i sostituti compatibili: i turni si riadattano in modo quasi immediato.' },
                { title: 'Equità misurabile', text: 'Contatori di guardie, festivi lavorati, reperibilità e gravosità visibili a tutto il team: la distribuzione dei turni si verifica, non si discute. Nei casi pubblicati, la soddisfazione del personale raggiunge il 90–100% (CHIREC, 2025).' },
                { title: 'Ferie, assenze e scambio turni', text: 'Richieste e desiderata tracciati in piattaforma; scambi e sostituzioni con regole e copertura verificate in automatico, notifiche in tempo reale a ogni modifica — al posto di messaggi e telefonate.' },
                { title: 'Multi-sede e medici condivisi', text: 'Una sola pianificazione per team distribuiti su più sedi: competenze e medici condivisi tra le sedi, visione consolidata per chi coordina. IMALLIANCE pianifica 34 radiologi su 12 sedi con Momentum.' },
                { title: 'Timbrature, report ed export paghe', text: 'Ore effettive rilevate con la timbratura, contatori sempre aggiornati ed esportazione verso il sistema paghe: le buste paga si basano su dati affidabili, non su ricostruzioni di fine mese.' },
            ],
        },
        cta: {
            heading: 'Oltre 250 organizzazioni sanitarie pianificano con Momentum',
            sub: 'Più di 1.000 sedi in 9 paesi, da oltre 15 anni: radiologia, pronto soccorso, anestesia e team ospedalieri. Una demo mostra Momentum applicato ai tuoi turni, alle tue regole e alle tue sedi.',
            buttonLabel: 'Richiedi una demo',
        },
    },
};
