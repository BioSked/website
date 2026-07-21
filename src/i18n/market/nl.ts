import type { MarketContent } from './types';

/**
 * Dutch (Belgium + Netherlands) market content.
 * Terminology follows the official Momentum app-store copy (NL):
 * roosters, diensten, wacht- en bereikbaarheidsdiensten, dienstenbeurs,
 * verlof, voorkeuren. U-form throughout (B2B healthcare).
 * Positioning: physician-team scheduling depth + tijdregistratie in the
 * same platform (Belgian working-time-registration context, factual only).
 * CHIREC (Braine-l'Alleud) is the proximity proof. Published claims only.
 */
export const MARKET: MarketContent = {
    quote: {
        text: 'Ik had niet verwacht dat Momentum zo’n impact zou hebben. Het is overzichtelijk, vlot en geautomatiseerd. Ik ben onder de indruk van hoe de tool zulke geoptimaliseerde roosters weet te genereren en daarbij vrijwel alle wensen inwilligt. Dankzij Momentum besteed ik minder tijd aan de opmaak van de roosters en kan ik me meer toeleggen op het medisch beheer van de dienst.',
        author: 'Dr Frédéric Cavallotto',
        role: 'Diensthoofd Spoedgevallen, Hôpital de Braine-l’Alleud (Groupe CHIREC), België',
        stats: [
            { value: 'tot 90%', label: 'minder tijd aan roosterbeheer' },
            { value: '4 dagen → 4–5 uur', label: 'opmaak van het rooster, per maand' },
            { value: '90–100%', label: 'tevredenheid onder de medewerkers' },
        ],
    },
    demo: {
        metaTitle: 'Demo aanvragen | BioSked Momentum',
        metaDescription:
            'Plan een demo van Momentum: automatische roostergeneratie, wacht- en bereikbaarheidsdiensten, verlof, tijdregistratie en rapportages – afgestemd op uw organisatie.',
        heading: 'Bekijk hoe Momentum bij uw organisatie past',
        sub: 'We laten u zien hoe Momentum het rooster volgens uw regels genereert, wacht- en bereikbaarheidsdiensten over uw locaties verdeelt en verlof en voorkeuren ordent – aan de hand van voorbeelden uit uw specialisme. De applicatie is beschikbaar in het Nederlands; de demo wordt in het Engels of het Frans gegeven.',
        steps: [
            'Persoonlijke demo — aan de hand van uw eigen roosterpraktijk',
            'Behoefteanalyse — teams, locaties, modules, integraties',
            'Voorstel op maat — transparant onderbouwd',
        ],
        privacyNote: 'Hosting in de Europese Unie · AVG · verwerkersovereenkomst op aanvraag',
        formTitle: 'Demo aanvragen',
        formId: '86756c6e-ad74-4d9e-8f3a-68b36b459ba0', // "EN- One page Dutch Request a demo" — sizing (numemployees) + city fields; notifies marketing@, MQL lifecycle
    },
    getquote: {
        metaTitle: 'Offerte aanvragen | BioSked Momentum',
        metaDescription: 'Vraag een Momentum-offerte op maat aan – afgestemd op teamgrootte, locaties en modules van uw organisatie.',
        heading: 'Aan de slag met Momentum',
        sub: 'Beschrijf kort uw organisatie – teamgrootte, locaties en systemen – dan ontvangt u van ons een concreet voorstel voor de volgende stap.',
        formTitle: 'Offerte aanvragen',
    },
    security: {
        metaTitle: 'Beveiliging en gegevens | BioSked Momentum',
        metaDescription:
            'Hoe Momentum met planningsgegevens omgaat: hosting in de Europese Unie, AVG en verwerkersovereenkomst op verzoek, versleuteling, toegang per rol en traceerbaarheid – en geen surveillance van individuele medewerkers.',
        kicker: 'Beveiliging & gegevens',
        heading: 'Controleerbare afspraken, geen slogans',
        lead: 'IT-verantwoordelijken en DPO’s stellen precieze vragen. Dit zijn onze antwoorden, in lijn met wat we contractueel vastleggen; de details nemen we tijdens de intake met uw team door.',
        points: [
            {
                title: 'Hosting in de Europese Unie',
                text: 'De Momentum-productiegegevens van onze Europese klanten worden gehost in de Europese Unie. De precieze invulling – locatie, subverwerkers – leggen we contractueel vast.',
            },
            {
                title: 'AVG en verwerkersovereenkomst',
                text: 'Bio-Optronics Sàrl treedt voor de planningsgegevens van haar klanten op als verwerker in de zin van de AVG (GDPR). Een verwerkersovereenkomst is op verzoek beschikbaar, met de lijst van subverwerkers.',
            },
            {
                title: 'Planningsgegevens, geen patiëntendossiers',
                text: 'Momentum verwerkt de gegevens die nodig zijn om teams in te roosteren: werkgerelateerde gegevens van medewerkers, toewijzingen, tellers en arbeidstijden. De oplossing is niet bedoeld voor de opslag van medische patiëntendossiers.',
            },
            {
                title: 'Versleuteling',
                text: 'Het verkeer van en naar het platform is versleuteld (TLS), en de gegevens worden bij onze infrastructuurleverancier versleuteld opgeslagen.',
            },
            {
                title: 'Toegang en traceerbaarheid',
                text: 'De toegangsrechten in Momentum zijn per rol en bevoegdheid gedefinieerd en worden door uw eigen organisatie beheerd. Aanvragen – verlof, dienstruilen, voorkeuren – worden in de applicatie geregistreerd en blijven traceerbaar.',
            },
            {
                title: 'Wat Momentum niet doet',
                text: 'Momentum is geen surveillance-instrument: het kent geen individuele scores aan medewerkers toe en doet niet aan gedragsdetectie. De tellers ondersteunen de eerlijke verdeling van de diensten en zijn zichtbaar voor de teams zelf.',
            },
        ],
        contactLine: 'Vragen over de AVG, de verwerkersovereenkomst of subverwerkers:',
    },
    references: {
        metaTitle: 'Referenties | BioSked Momentum',
        metaDescription:
            'Referenties van Momentum: de spoedgevallendienst van CHIREC Braine-l’Alleud (4 dagen → 4–5 uur roosteropmaak per maand), CHU Angers, IRIS GRIM, IMAGIR en CIM Les Cèdres – gepubliceerde casestudy’s met concrete cijfers.',
        kicker: 'Referenties',
        heading: 'Gepubliceerde cases, concrete cijfers',
        lead: 'Meer dan 250 zorgorganisaties in negen landen plannen met Momentum. Hieronder een selectie uit de gepubliceerde casestudy’s, met de cijfers en namen zoals ze zijn gepubliceerd – te beginnen dicht bij huis, op de spoedgevallendienst van CHIREC in Braine-l’Alleud.',
        featured: {
            org: 'CHIREC – Hôpital de Braine-l’Alleud (België)',
            specialty: 'Spoedgevallen',
            factsLine: '40.000 patiënten per jaar · 25–30 artsen · in gebruik sinds eind 2024',
            paragraphs: [
                'Tot eind 2024 werd het rooster van de spoedgevallendienst handmatig opgemaakt, op papier en in Excel: vier dagen werk per maandrooster, een zware administratieve last en een voortdurende stroom e-mails over wijzigingen, met soms overbezetting doordat voorkeuren en verlof moeilijk te verwerken waren.',
                'Momentum draaide al op de radiologieafdeling van de CHIREC-groep en werd eind 2024 voor de urgentieartsen uitgerold. De doorslag gaven drie zaken: de omgang met medische complexiteit (meerdere contracten, rotaties, wachtdiensten, voorkeuren), de automatische urenberekening met export naar HR, en het online rooster dat voor het hele team in realtime wordt bijgewerkt.',
                'De casestudy van mei 2025 documenteert het resultaat: de opmaak van het maandrooster daalde van 4 dagen naar 4–5 uur, het roosterbeheer kost tot 90% minder tijd en de verdeling van de uren wordt als eerlijker ervaren.',
            ],
            quote: {
                text: 'Ik had niet verwacht dat Momentum zo’n impact zou hebben. Het is overzichtelijk, vlot en geautomatiseerd. Ik ben onder de indruk van hoe de tool zulke geoptimaliseerde roosters weet te genereren en daarbij vrijwel alle wensen inwilligt. Dankzij Momentum besteed ik minder tijd aan de opmaak van de roosters en kan ik me meer toeleggen op het medisch beheer van de dienst.',
                author: 'Dr Frédéric Cavallotto',
                role: 'Diensthoofd Spoedgevallen, Hôpital de Braine-l’Alleud',
            },
            stats: [
                { value: '4 dagen → 4–5 uur', label: 'opmaak van het rooster, per maand' },
                { value: 'tot 90%', label: 'minder tijd aan roosterbeheer' },
                { value: '90–100%', label: 'tevredenheid onder de medewerkers' },
            ],
        },
        others: [
            {
                org: 'CHU Angers',
                specialty: 'Spoedgevallen & Samu',
                line: 'Universitair ziekenhuis; de 52 artsen van het departement urgentiegeneeskunde, met gedeelde activiteit tussen spoedgevallen en Samu, plannen sinds 2021 met Momentum – met tellers en rapporten die de eerlijke verdeling van wacht- en weekenddiensten controleerbaar maken.',
            },
            {
                org: 'IRIS GRIM (Nantes)',
                specialty: 'Radiologie',
                line: 'Radiologiegroep met 45 radiologen en 240 andere medewerkers; verving in 2020 een zelfontwikkelde planningstool door de automatische roostergeneratie van Momentum.',
            },
            {
                org: 'IMAGIR (Bordeaux)',
                specialty: 'Radiologie',
                line: 'Zo’n 40 radiologen op 9 locaties; volgens de eigen casestudy levert de koppeling tussen Momentum, EasyDoct en Kelio één fte op, of zelfs twee.',
            },
            {
                org: 'CIM Les Cèdres (Saint-Malo)',
                specialty: 'Radiologie',
                line: '18 radiologen op vijf vestigingen; klant sinds 2014, met een koppeling aan het RIS (NGI) en tijdregistratie in hetzelfde platform als het rooster.',
            },
        ],
        languageNote: 'De volledige casestudy’s zijn in het Frans gepubliceerd.',
        fullStudiesLabel: 'Naar de Franse casestudy’s',
        demoCta: 'Demo aanvragen',
    },
    thankyou: {
        slug: 'bedankt',
        title: 'Aanvraag ontvangen | BioSked Momentum',
        heading: 'Bedankt — uw aanvraag is ontvangen.',
        body: 'We nemen persoonlijk contact met u op om een afspraak in te plannen. Wilt u vooraf details delen over teams, locaties of uw huidige planningsproces? Mail dan naar info@biosked.com.',
        back: 'Terug naar de startpagina',
    },
    pricing: {
        metaTitle: 'Prijzen | BioSked Momentum',
        metaDescription:
            'Momentum-prijzen: een offerte op maat naar teamgrootte, locaties en modules – met begeleide implementatie, training, integraties en doorlopende support inbegrepen.',
        kicker: 'Prijzen',
        heading: 'Een abonnement op maat van uw organisatie',
        lead: 'Elke zorgorganisatie plant anders. Uw offerte wordt daarom samengesteld op basis van teamgrootte, locaties en modules – met begeleide implementatie, integraties en persoonlijke support altijd inbegrepen. De waarde is meetbaar: op de spoedgevallendienst van CHIREC daalde de opmaak van het rooster van 4 dagen naar 4–5 uur per maand, tot 90% minder tijd aan roosterbeheer (casestudy 2025).',
        anchor: 'Vanaf <strong>€ 5,99</strong> per ingeplande zorgprofessional per maand.',
        includedTitle: 'Inbegrepen in elk abonnement',
        included: [
            {
                title: 'Platform en mobiele app',
                text: 'Het volledige Momentum-platform plus de nieuwe app voor iOS en Android – met Face ID, offline toegang en vijf talen – voor al uw medewerkers.',
            },
            {
                title: 'Automatische roostergeneratie',
                text: 'Roosters gegenereerd binnen contracten, competenties, werktijdregels en persoonlijke voorkeuren – eerlijk verdeeld, met tellers die het hele team kan inzien.',
            },
            {
                title: 'Begeleide implementatie en training',
                text: 'Een implementatiespecialist van BioSked configureert samen met uw planners de roosterregels, tellers en wacht- en bereikbaarheidsdiensten, en traint uw team tot het eerste automatisch gegenereerde rooster staat.',
            },
            {
                title: 'Integraties',
                text: 'Koppelingen met uw RIS (zoals NGI), afsprakenplanning (EasyDoct), HR- en tijdregistratiesystemen (Kelio/Bodet) en persoonlijke agenda’s, plus export naar de salarisadministratie – ingericht tijdens de implementatie.',
            },
            {
                title: 'Doorlopende support en updates',
                text: 'Een vast aanspreekpunt, snelle ondersteuning en alle nieuwe functies – zonder meerkosten.',
            },
            {
                title: 'Hosting in de EU, conform de AVG',
                text: 'Uw gegevens worden gehost in de Europese Unie en verwerkt volgens de AVG (GDPR); de afspraken hierover leggen we vast in een verwerkersovereenkomst.',
            },
        ],
        faqTitle: 'Veelgestelde vragen',
        faq: [
            {
                q: 'Hoe wordt onze offerte samengesteld?',
                a: 'Op basis van vier plannen (Starter, Plus, Pro, Enterprise) en drie factoren: het aantal medewerkers dat u inroostert, het aantal locaties en de modules die u kiest – zoals tijdregistratie of de dienstenbeurs. U betaalt alleen voor wat uw organisatie werkelijk gebruikt.',
            },
            {
                q: 'Kunnen we klein beginnen en later opschalen?',
                a: 'Ja. U wisselt op elk moment van plan en kunt plannen per team combineren — alles binnen één account.',
            },
            {
                q: 'Wat levert Momentum concreet op?',
                a: 'Vier effecten uit gepubliceerde casestudy’s. Tijd: op de spoedgevallendienst van CHIREC Braine-l’Alleud daalde de opmaak van het rooster van 4 dagen naar 4–5 uur per maand – tot 90% minder tijd aan roosterbeheer. Bezetting: radiologiegroep IMAGIR schat de winst van de koppeling tussen Momentum, EasyDoct en Kelio op een fte, soms twee. Loon: doordat rooster en geklokte uren uit hetzelfde platform komen, wordt de aanlevering naar de salarisadministratie betrouwbaar. Behoud: de verdeling van wacht-, weekend- en feestdagdiensten is aantoonbaar eerlijk, met tellers die het hele team kan inzien – in de gepubliceerde cases ligt de tevredenheid van medewerkers op 90–100%.',
            },
            {
                q: 'Hoe ondersteunt Momentum arbeidstijdregistratie in de Belgische zorg?',
                a: 'In de Belgische zorgsector worden de verplichtingen rond de registratie van arbeidstijd de komende jaren aangescherpt, met 2027 als horizon. Momentum houdt tijdregistratie (klokken) in hetzelfde platform als het rooster: medewerkers klokken op de dienst die voor hen gepland staat, en geplande en gewerkte uren staan naast elkaar – beschikbaar voor rapportage en loonexport. De juridische beoordeling van uw registratieplicht blijft aan uw organisatie; Momentum levert de geregistreerde uren.',
            },
            {
                q: 'Koppelt Momentum met onze bestaande systemen?',
                a: 'Ja. Bij klanten draaien koppelingen met het RIS (NGI), de afsprakenplanning (EasyDoct) en HR- en tijdregistratiesystemen (Kelio/Bodet); daarnaast synchroniseert Momentum diensten met persoonlijke agenda’s en exporteert het naar de salarisadministratie. Tijdens de intake brengen we uw systeemlandschap in kaart en nemen we de gewenste koppelingen op in het implementatieplan.',
            },
            {
                q: 'Waar worden onze gegevens gehost en hoe zit het met de AVG?',
                a: 'Uw gegevens worden gehost in de Europese Unie. BioSked treedt op als verwerker conform de AVG (GDPR) en legt de afspraken over gegevensverwerking vast in een verwerkersovereenkomst.',
            },
            {
                q: 'Hoe soeverein is Momentum?',
                a: 'Uw contract sluit u met Bio-Optronics Sàrl, onze Zwitserse entiteit — uw contractpartner is Europees, geen Amerikaans bedrijf. En uw gegevens blijven gehost in de Europese Unie.',
            },
            {
                q: 'Hoe gaan we van start?',
                a: 'In drie stappen: u vraagt een demo aan die we afstemmen op uw specialisme, we brengen in een intakegesprek uw teams, locaties en integraties in kaart, en u ontvangt een heldere offerte op maat. Vanaf dat moment bepaalt u het tempo.',
            },
        ],
        demoCta: 'Demo aanvragen',
        quoteCta: 'Offerte aanvragen',
    },
};
