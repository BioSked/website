/**
 * Dutch (Belgium) content for the working-time-registration page.
 * Context: Belgian healthcare employers face tightening working-time
 * registration obligations toward 2027. Framing is strictly factual —
 * no statute names, no date-of-force promises, no certified-compliance
 * claims; the legal assessment stays with the customer (mirrors the
 * pricing FAQ in nl.ts). Momentum capabilities named are LIVE today:
 * klokken op de geplande dienst, gepland vs gewerkt naast elkaar,
 * rusttijden bewaakt bij wacht- en bereikbaarheidsdiensten, rapportage
 * en loonexport. CHIREC (Braine-l’Alleud) is the proximity proof.
 * U-form throughout; published claims only.
 */
export interface Be2027Content {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    heading: string;
    lead: string;
    sections: { heading: string; paragraphs: string[] }[];
    facts: { value: string; label: string }[];
    demoCta: string;
    homeModule: { heading: string; text: string; linkLabel: string };
}

export const BE2027: Be2027Content = {
    metaTitle: 'Arbeidstijdregistratie zorg België 2027 | BioSked Momentum',
    metaDescription:
        'Arbeidstijdregistratie in de Belgische zorg richting 2027: hoe planningsteams rooster en geklokte uren in één platform bijhouden, tot en met de loonexport.',
    kicker: 'Arbeidstijdregistratie in België',
    heading: 'Arbeidstijdregistratie richting 2027 begint bij het rooster',
    lead: 'In de Belgische zorgsector worden de verplichtingen rond de registratie van arbeidstijd de komende jaren aangescherpt, met 2027 als horizon. Planningsteams die rooster en geklokte uren nu al in hetzelfde platform bijhouden, hoeven straks geen tweede administratie op te zetten. In Momentum klokken medewerkers op de dienst die voor hen gepland staat – wacht- en bereikbaarheidsdiensten inbegrepen.',
    sections: [
        {
            heading: 'Wat er verandert, en waarom planningsteams niet wachten',
            paragraphs: [
                'De richting is duidelijk: van Belgische zorgwerkgevers wordt een sluitende, controleerbare registratie van de gewerkte arbeidstijd verwacht, en die verplichtingen worden richting 2027 aangescherpt. Wat dat precies betekent, verschilt per statuut en per instelling; de juridische beoordeling van uw registratieplicht blijft dan ook aan uw organisatie. Wat vaststaat, is dat de registratie moet aansluiten op de roosterpraktijk – ook voor wachtdiensten, oproepen en de rusttijden daaromheen.',
                'Daarom bereiden planningsverantwoordelijken zich nu al voor. Wie wacht tot de verplichting concreet wordt, moet registratie, tellers en de aanlevering aan de loonadministratie onder tijdsdruk tegelijk invoeren; wie vandaag begint, brengt rooster, tijdregistratie en loonexport stap voor stap op orde.',
            ],
        },
        {
            heading: 'Een apart kloksysteem verplaatst het probleem',
            paragraphs: [
                'Een kloksysteem naast het rooster levert twee administraties op: de diensten staan in het ene systeem, de geklokte uren in het andere. Elke wijziging – een dienstruil, een oproep tijdens de wachtdienst, een uitloop op spoedgevallen – moet dan op twee plaatsen worden bijgehouden, en elk verschil tussen gepland en gewerkt moet achteraf handmatig worden verklaard.',
                'Momentum houdt beide in één platform bij, en dat draait vandaag al: medewerkers klokken op de dienst die voor hen gepland staat, geplande en gewerkte uren staan naast elkaar, en de rusttijden worden bewaakt – ook rond wacht- en bereikbaarheidsdiensten. Rapportage en loonexport komen uit dezelfde bron. Op de spoedgevallendienst van CHIREC in Braine-l’Alleud gaf naast de roostergeneratie ook de automatische urenberekening met export naar HR de doorslag; de casestudy van mei 2025 documenteert een daling van de roosteropmaak van 4 dagen naar 4–5 uur per maand.',
            ],
        },
        {
            heading: 'Zo bereidt u zich voor',
            paragraphs: [
                'We beginnen bij uw eigen roosters: in een persoonlijke demo laten we zien hoe Momentum die volgens uw regels genereert en hoe het klokken daarop aansluit, aan de hand van voorbeelden uit uw specialisme. Daarna brengen we in een behoefteanalyse uw teams, locaties, modules en integraties in kaart – inclusief de koppeling met uw HR- en loonsystemen.',
                'U ontvangt vervolgens een transparant onderbouwd voorstel op maat. Vanaf dat moment bepaalt u het tempo: u kunt met het rooster starten en de tijdregistratie daarna aanzetten, ruim vóór de verplichtingen concreet worden.',
            ],
        },
    ],
    facts: [
        { value: '4 dagen → 4–5 uur', label: 'roosteropmaak per maand – CHIREC, casestudy 2025' },
        { value: '250+', label: 'zorgorganisaties plannen met Momentum' },
        { value: '15+ jaar', label: 'medische roosterplanning' },
    ],
    demoCta: 'Demo aanvragen',
    homeModule: {
        heading: 'Arbeidstijdregistratie in België',
        text: 'De verplichtingen rond de registratie van arbeidstijd in de Belgische zorg worden richting 2027 aangescherpt. Lees hoe planningsteams rooster en geklokte uren nu al in één platform bijhouden – wacht- en bereikbaarheidsdiensten inbegrepen.',
        linkLabel: 'Meer over arbeidstijdregistratie richting 2027',
    },
};
