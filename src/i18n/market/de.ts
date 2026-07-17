import type { MarketContent } from './types';

/**
 * German (DACH) market content: homepage quote band, demo page, pricing page,
 * security/data page (/de/sicherheit-und-daten) and references page (/de/referenzen).
 * Positioning per messaging brief (DE/CH): physician/specialist scheduling
 * depth — Dienst-, Bereitschafts- und Rufdienstplanung under Arbeitszeitregeln,
 * multi-standort, fairness with traceable counters. Sober B2B register, Sie-Form.
 * Terminology follows the approved Momentum app-store copy (Dienstplan, Dienste,
 * Dienstbörse, Bereitschaft/Pikett, Planungswünsche, Abwesenheiten).
 * Only published proof points are used; pricing is quote-based (EU strategy).
 */
export const MARKET: MarketContent = {
    quote: {
        text: 'Ich hätte nicht erwartet, dass Momentum eine solche Wirkung hat. Alles ist klar, flüssig, automatisiert. Ich bin beeindruckt, wie das Tool derart optimierte Dienstpläne generiert und dabei fast alle Wünsche berücksichtigt. Dank Momentum verbringe ich weniger Zeit mit der Planerstellung und habe mehr Zeit für die medizinische Leitung der Abteilung.',
        author: 'Dr. Frédéric Cavallotto',
        role: 'Leiter der Notaufnahme, Hôpital de Braine-l’Alleud (Groupe CHIREC), Belgien',
        stats: [
            { value: 'Bis zu 90 %', label: 'weniger Zeitaufwand für die Dienstplanung' },
            { value: '4 Tage → 4–5 Std.', label: 'Dienstplanerstellung pro Monat' },
            { value: '90–100 %', label: 'Zufriedenheit im Team' },
        ],
    },
    demo: {
        metaTitle: 'Demo anfragen | BioSked Momentum',
        metaDescription:
            'Vereinbaren Sie eine Momentum-Demo für Ihre ärztlichen Teams: automatische Dienstplanerstellung unter Arbeitszeitregeln, Bereitschafts- und Rufdienste, Planungswünsche, Zeiterfassung und Lohnexport – gezeigt an Ihrem konkreten Planungsfall.',
        heading: 'Sehen Sie Momentum an Ihrem eigenen Planungsfall',
        sub: 'Wir zeigen Ihnen Momentum an Ihrem konkreten Fall: Ihre Dienst-, Bereitschafts- und Rufdienstmodelle, Ihre Arbeitszeitregeln, Ihre Standorte. Sie sehen, wie der Plan generiert wird, wie Planungswünsche und Abwesenheiten einfließen und welche Zähler Ihr Team einsehen kann.',
        steps: [
            'Persönliche Demo – am Beispiel Ihrer eigenen Planung',
            'Bedarfsgespräch – Teamgröße, Standorte, Module, Integrationen',
            'Individuelles Angebot – nachvollziehbar kalkuliert',
        ],
        privacyNote: 'Hosting in der Europäischen Union · DSGVO-konforme Verarbeitung · Auftragsverarbeitungsvertrag auf Anfrage',
        formTitle: 'Demo anfragen',
    },
    getquote: {
        metaTitle: 'Angebot anfordern | BioSked Momentum',
        metaDescription: 'Fordern Sie ein individuelles Momentum-Angebot an – abgestimmt auf Teamgröße, Standorte und Module Ihrer Einrichtung.',
        heading: 'Mit Momentum starten',
        sub: 'Beschreiben Sie uns kurz Ihre Organisation – Teamgröße, Standorte, Dienstmodelle. Wir melden uns mit einem konkreten Vorschlag für die nächsten Schritte.',
        formTitle: 'Angebot anfordern',
    },
    security: {
        metaTitle: 'Sicherheit & Daten | BioSked Momentum',
        metaDescription:
            'Wie Momentum Planungsdaten verarbeitet: Hosting in der Europäischen Union, Auftragsverarbeitung nach DSGVO mit AV-Vertrag auf Anfrage, Verschlüsselung, rollenbasierte Zugriffe – und keine Überwachung einzelner Mitarbeitender.',
        kicker: 'Sicherheit & Daten',
        heading: 'Überprüfbare Zusagen, keine Schlagworte',
        lead: 'IT-Verantwortliche und Datenschutzbeauftragte stellen präzise Fragen. Hier sind unsere Antworten – im Rahmen dessen, was wir vertraglich dokumentieren. Die Einzelheiten prüfen wir gemeinsam mit Ihrem Team bei der Projektvorbereitung.',
        points: [
            {
                title: 'Hosting in der Europäischen Union',
                text: 'Die Momentum-Produktionsdaten unserer europäischen Kunden werden in der Europäischen Union gehostet. Die genauen Modalitäten – Standort und Unterauftragsverarbeiter – sind vertraglich dokumentiert.',
            },
            {
                title: 'DSGVO und Auftragsverarbeitungsvertrag',
                text: 'Bio-Optronics Sàrl verarbeitet die Planungsdaten ihrer Kunden als Auftragsverarbeiter im Sinne der DSGVO. Einen Auftragsverarbeitungsvertrag stellen wir auf Anfrage bereit – einschließlich der Liste der Unterauftragsverarbeiter.',
            },
            {
                title: 'Planungsdaten, keine Patientenakten',
                text: 'Momentum verarbeitet die Daten, die für die Planung Ihrer Teams erforderlich sind: berufliche Stammdaten, Einsätze, Zähler, Arbeitszeiten. Die Plattform ist nicht dafür bestimmt, Patientenakten zu speichern.',
            },
            {
                title: 'Verschlüsselung',
                text: 'Daten sind bei der Übertragung verschlüsselt (TLS) und werden bei unserem Infrastrukturanbieter verschlüsselt gespeichert.',
            },
            {
                title: 'Zugriffsrechte und Nachvollziehbarkeit',
                text: 'Zugriffsrechte in Momentum sind nach Rollen und Berechtigungen definiert und werden von Ihrer Organisation verwaltet. Anfragen – Urlaub, Diensttausch, Planungswünsche – werden in der Anwendung nachvollziehbar dokumentiert.',
            },
            {
                title: 'Was Momentum nicht tut',
                text: 'Momentum ist kein Instrument zur Mitarbeiterüberwachung: keine individuelle Bewertung von Personen, keine Verhaltensanalyse. Die Zähler dienen der fairen Verteilung der Dienste – und sind für das Team selbst einsehbar.',
            },
        ],
        contactLine: 'Fragen zu DSGVO, Auftragsverarbeitungsvertrag oder Unterauftragsverarbeitern:',
    },
    references: {
        metaTitle: 'Referenzen | BioSked Momentum',
        metaDescription:
            'Veröffentlichte Momentum-Fallstudien: die Notaufnahme der CHIREC-Gruppe (Monatsplanung von 4 Tagen auf 4–5 Stunden), CHU Angers, IRIS GRIM, IMAGIR und CIM Les Cèdres – Ergebnisse mit Quellenangabe.',
        kicker: 'Referenzen',
        heading: 'Ergebnisse, die unsere Kunden veröffentlicht haben',
        lead: 'Seit über 15 Jahren planen Gesundheitseinrichtungen ihre ärztlichen Teams mit Momentum – mehr als 250 Organisationen mit über 1 000 Standorten in neun Ländern. Eine Auswahl veröffentlichter Fallstudien, mit Zahlen und Quellen.',
        featured: {
            org: 'Hôpital de Braine-l’Alleud (Groupe CHIREC)',
            specialty: 'Notaufnahme',
            factsLine: 'Belgien · 40 000 Patientenkontakte pro Jahr · 25–30 Ärztinnen und Ärzte · seit Ende 2024',
            paragraphs: [
                'Vor Momentum entstand der Dienstplan der Notaufnahme auf Papier und in Excel: 4 Tage Arbeit pro Monatsplan, eine hohe administrative Last und laufende E-Mail-Abstimmungen. Planungswünsche und Urlaube ließen sich nur schwer einarbeiten und führten zeitweise zu Überbesetzungen.',
                'Ende 2024 führte das Team Momentum ein – die Radiologie der CHIREC-Gruppe arbeitete bereits damit. Ausschlaggebend waren laut Fallstudie drei Punkte: die Abbildung der medizinischen Komplexität (mehrere Vertragsmodelle, Spezialisierungen, Rotationen, Dienste, Planungswünsche), die automatische Planerstellung mit Stundenberechnung und HR-Export sowie der Online-Zugriff auf den Plan für das gesamte Team.',
                'Das veröffentlichte Ergebnis: Die Monatsplanung sank von 4 Tagen auf 4–5 Stunden, der Zeitaufwand für die Verwaltung der Dienstpläne um bis zu 90 %. Die geleisteten Stunden sind für Leitung und Lohnabrechnung nachvollziehbar, und die Verteilung der Dienste wird im Team als fairer wahrgenommen.',
            ],
            quote: {
                text: 'Ich hätte nicht erwartet, dass Momentum eine solche Wirkung hat. Alles ist klar, flüssig, automatisiert. Ich bin beeindruckt, wie das Tool derart optimierte Dienstpläne generiert und dabei fast alle Wünsche berücksichtigt. Dank Momentum verbringe ich weniger Zeit mit der Planerstellung und habe mehr Zeit für die medizinische Leitung der Abteilung.',
                author: 'Dr. Frédéric Cavallotto',
                role: 'Leiter der Notaufnahme',
            },
            stats: [
                { value: '4 Tage → 4–5 Std.', label: 'Dienstplanerstellung pro Monat' },
                { value: 'Bis zu 90 %', label: 'weniger Zeitaufwand für die Dienstplanung' },
                { value: '90–100 %', label: 'Zufriedenheit im Team' },
            ],
        },
        others: [
            {
                org: 'CHU Angers',
                specialty: 'Notaufnahme & Samu',
                line: '52 Notfallmedizinerinnen und -mediziner mit geteilter Tätigkeit zwischen Notaufnahme und Notarztdienst (Samu) planen seit 2021 mit Momentum; die Verteilung von Diensten und Wochenenden ist über Zähler für das ganze Team nachvollziehbar.',
            },
            {
                org: 'IRIS GRIM (Nantes)',
                specialty: 'Radiologie',
                line: '45 Radiologinnen und Radiologen sowie 240 weitere Fachkräfte; der Verbund ersetzte 2020 sein selbst entwickeltes Planungstool durch Momentum und plant damit über acht Praxisstandorte und die Großgeräte in vier Kliniken hinweg.',
            },
            {
                org: 'IMAGIR (Bordeaux)',
                specialty: 'Radiologie',
                line: 'Rund 40 Radiologinnen und Radiologen an neun Standorten; die veröffentlichte Fallstudie beziffert den Effekt der Integrationen mit EasyDoct (Terminvergabe) und Kelio (Zeitwirtschaft) auf ein bis zwei Vollzeitstellen.',
            },
            {
                org: 'CIM Les Cèdres (Saint-Malo)',
                specialty: 'Radiologie',
                line: '18 Radiologinnen und Radiologen, Kunde seit 2014; Momentum ist an das RIS (NGI) angebunden und führt Zeiterfassung, Urlaubsverwaltung und automatische Planerstellung in einer Anwendung zusammen.',
            },
        ],
        languageNote: 'Die vollständigen Fallstudien sind auf Französisch veröffentlicht.',
        fullStudiesLabel: 'Zu den französischen Fallstudien',
        demoCta: 'Demo anfragen',
    },
    thankyou: {
        slug: 'danke',
        title: 'Anfrage erhalten | BioSked Momentum',
        heading: 'Vielen Dank – Ihre Anfrage ist bei uns eingegangen.',
        body: 'Wir melden uns persönlich bei Ihnen, um einen Termin zu vereinbaren. Wenn Sie uns vorab Details zu Ihren Teams, Standorten oder Ihrem aktuellen Planungsprozess senden möchten: info@biosked.com.',
        back: 'Zurück zur Startseite',
    },
    pricing: {
        metaTitle: 'Preise | BioSked Momentum',
        metaDescription:
            'Momentum-Preise: ein individuelles Angebot nach Teamgröße, Standorten und Modulen – mit begleiteter Einführung, Schulung, Integrationen und laufendem Support.',
        kicker: 'Preise',
        heading: 'Ein Angebot, das zu Ihrer Organisation passt',
        lead: 'Keine Einrichtung plant wie die andere. Deshalb erstellen wir Ihr Angebot individuell – nach Teamgröße, Standorten und den Modulen, die Sie einsetzen möchten. Immer enthalten: eine begleitete Einführung, bei der wir Ihre Planungsregeln konfigurieren, Ihre Systeme anbinden und Ihr Team schulen. Den Nutzen können Sie an veröffentlichten Zahlen messen: bis zu 90 % weniger Zeitaufwand für die Dienstplanung – beim CHIREC sank die Monatsplanung von 4 Tagen auf 4–5 Stunden.',
        anchor: 'Ab <strong>5,99 €</strong> pro eingeplanter Fachkraft und Monat.',
        includedTitle: 'In jedem Abonnement enthalten',
        included: [
            {
                title: 'Plattform & mobile App',
                text: 'Die vollständige Momentum-Plattform und die neue App für iOS und Android – mit biometrischer Anmeldung und Offline-Zugriff, in fünf Sprachen – für Ihr gesamtes Team.',
            },
            {
                title: 'Automatische Planerstellung',
                text: 'Automatisch generierte Dienstpläne, die Verträge, Qualifikationen, Arbeitszeitregeln und individuelle Planungswünsche berücksichtigen – fair verteilt, mit Zählern, die jedes Teammitglied nachvollziehen kann.',
            },
            {
                title: 'Begleitete Einführung & Schulung',
                text: 'Wir konfigurieren Ihre Planungsregeln, begleiten den Go-live und schulen Planende wie Mitarbeitende – bis der erste automatisch erstellte Dienstplan steht.',
            },
            {
                title: 'Integrationen',
                text: 'Anbindungen an RIS (z. B. NGI), Terminplanung (EasyDoct), Zeitwirtschaft und HR (Kelio/Bodet), persönliche Kalender und Export zur Lohnabrechnung – Ihre Daten fließen ohne Doppelerfassung.',
            },
            {
                title: 'Laufender Support & Updates',
                text: 'Persönlicher Support im laufenden Betrieb und regelmäßige Produkt-Updates – ohne Projektaufwand auf Ihrer Seite.',
            },
            {
                title: 'EU-Hosting & DSGVO',
                text: 'Ihre Daten werden in der Europäischen Union gehostet und DSGVO-konform verarbeitet – inklusive Auftragsverarbeitungsvertrag.',
            },
        ],
        faqTitle: 'Häufige Fragen',
        faq: [
            {
                q: 'Wie setzt sich der Preis zusammen?',
                a: 'Drei Faktoren bestimmen den Preis: die Größe Ihres Teams, die Zahl Ihrer Standorte und die Module, die Sie nutzen möchten – etwa automatische Planerstellung, Dienstbörse, Zeiterfassung oder Berichte. So zahlen Sie nur für das, was Ihre Organisation wirklich braucht.',
            },
            {
                q: 'Wie rechnet sich Momentum?',
                a: 'Gerechnet wird gegen den realen Status quo – Excel-Tabellen, Tauschabsprachen per E-Mail, Verteilungen, die niemand belegen kann. Vier Hebel, jeweils mit veröffentlichtem Beleg: Zeit (bis zu 90 % weniger Zeitaufwand für die Dienstplanung; CHIREC: von 4 Tagen auf 4–5 Stunden pro Monat), Personaleinsatz (die Radiologiegruppe IMAGIR beziffert den Effekt der Integrationen auf ein bis zwei Vollzeitstellen), verlässliche Lohnabrechnung (erfasste Zeiten und Stundenzähler fließen direkt in den Lohnexport) und faire Verteilung als Beitrag zur Mitarbeiterbindung (nachvollziehbare Zähler statt Verteilungsdiskussionen; Zufriedenheit in veröffentlichten Fallstudien 90–100 %).',
            },
            {
                q: 'Wie läuft die Einführung ab?',
                a: 'Ein erfahrenes Team begleitet Sie von der Konfiguration Ihrer Planungsregeln über die Anbindung Ihrer Systeme bis zum Go-live – inklusive Schulung für Planende und Mitarbeitende. Einführung und Schulung sind Teil des Angebots, kein Zusatzprojekt.',
            },
            {
                q: 'Lässt sich Momentum an unsere bestehenden Systeme anbinden?',
                a: 'Ja. Im Kundenbetrieb bewährt sind Anbindungen an RIS (NGI), Terminplanung (EasyDoct), Zeitwirtschaft und HR (Kelio/Bodet), persönliche Kalender sowie der Export zur Lohnabrechnung. Welche Integrationen für Sie sinnvoll sind, klären wir im Bedarfsgespräch – die Umsetzung übernehmen wir im Rahmen der Einführung.',
            },
            {
                q: 'Wo werden unsere Daten gehostet – und wie steht es um die DSGVO?',
                a: 'Ihre Daten werden in der Europäischen Union gehostet und DSGVO-konform verarbeitet. Einen Auftragsverarbeitungsvertrag und Details zur Datenverarbeitung stellen wir Ihnen im Angebotsprozess zur Verfügung.',
            },
            {
                q: 'Wie starten wir am besten?',
                a: 'In drei Schritten: Fragen Sie zunächst eine Demo an – wir zeigen Momentum an Ihrem Anwendungsfall. Anschließend klären wir in einem kurzen Bedarfsgespräch Teamgröße, Standorte und Module. Auf dieser Basis erhalten Sie Ihr individuelles Angebot.',
            },
        ],
        demoCta: 'Demo anfragen',
        quoteCta: 'Angebot anfordern',
    },
};
