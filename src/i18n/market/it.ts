/**
 * Italian market content (demo, pricing, homepage quote band,
 * security/data page /it/sicurezza-e-dati, references page /it/referenze).
 * Terminology follows the official Momentum app-store copy (IT): turni,
 * guardie e reperibilità, scambio turni, ferie e assenze, preferenze.
 * Copy follows the v2 messaging brief: expert register (informal tu),
 * ROI only with published attribution (CHIREC 2025, IMAGIR, IMALLIANCE,
 * Les Cèdres, client-since-2010 longevity), status quo = Excel + informal
 * swaps, hosting = European Union, no assistant messaging.
 */
import type { MarketContent } from './types';

export const MARKET: MarketContent = {
    quote: {
        text: 'Non mi aspettavo che Momentum avesse un impatto simile. È chiaro, fluido, automatizzato. Sono impressionato dalla capacità dello strumento di generare turni così ottimizzati rispettando quasi tutte le preferenze.',
        author: 'Dr Frédéric Cavallotto',
        role: 'Primario del Pronto Soccorso, Ospedale di Braine-l’Alleud (Gruppo CHIREC), Belgio',
        stats: [
            { value: '4–5 ore', label: 'per creare i turni di un mese, invece di 4 giorni' },
            { value: 'fino al 90%', label: 'di tempo in meno sulla gestione dei turni' },
            { value: '90–100%', label: 'di soddisfazione del personale' },
        ],
    },
    demo: {
        metaTitle: 'Richiedi una demo | BioSked Momentum Italia',
        metaDescription:
            'Prenota una demo di Momentum: la piattaforma applicata ai tuoi turni, alle guardie e reperibilità, ai contatori di equità e alle tue sedi — con i risultati misurati nei casi pubblicati.',
        heading: 'Vedi Momentum applicato alla tua organizzazione',
        sub: 'Prepariamo la demo sul tuo contesto: regole di pianificazione e contratti, guardie e reperibilità, contatori di equità, gestione multi-sede e integrazioni con i sistemi che già usi.',
        steps: [
            'Demo personalizzata — su esempi tratti dalla tua pianificazione reale',
            'Analisi del perimetro — team, sedi, moduli, integrazioni',
            'Proposta su misura — trasparente e verificabile',
        ],
        privacyNote: 'Hosting nell’Unione Europea · GDPR · accordo sul trattamento dei dati su richiesta',
        formTitle: 'Richiedi una demo',
    },
    getquote: {
        metaTitle: 'Richiedi un preventivo | BioSked Momentum',
        metaDescription: 'Richiedi un preventivo Momentum costruito su collaboratori pianificati, sedi e moduli effettivamente utilizzati dalla tua struttura.',
        heading: 'Inizia con Momentum',
        sub: 'Descrivici in breve la tua organizzazione — professionisti pianificati, sedi, sistemi da collegare — e ti ricontattiamo con una proposta e un piano di implementazione.',
        formTitle: 'Richiedi un preventivo',
    },
    security: {
        metaTitle: 'Sicurezza e dati | BioSked Momentum Italia',
        metaDescription:
            'Come Momentum tratta i dati di pianificazione: hosting nell’Unione Europea, GDPR e accordo sul trattamento dei dati su richiesta, crittografia, accessi basati sui ruoli, nessuna sorveglianza individuale.',
        kicker: 'Sicurezza e dati',
        heading: 'Impegni verificabili, non slogan',
        lead: 'Responsabili IT e DPO fanno domande precise. Queste sono le nostre risposte, nei limiti di ciò che documentiamo contrattualmente — il dettaglio si esamina con il tuo team durante la fase di analisi.',
        points: [
            {
                title: 'Hosting nell’Unione Europea',
                text: 'I dati di produzione Momentum dei nostri clienti europei sono ospitati nell’Unione Europea. Le modalità precise — localizzazione, sub-responsabili — sono documentate contrattualmente.',
            },
            {
                title: 'GDPR e accordo sul trattamento dei dati',
                text: 'Bio-Optronics Sàrl opera come responsabile del trattamento ai sensi del GDPR per i dati di pianificazione dei propri clienti. Un accordo sul trattamento dei dati (DPA) è disponibile su richiesta, con l’elenco dei sub-responsabili.',
            },
            {
                title: 'Dati di pianificazione, non cartelle cliniche',
                text: 'Momentum tratta i dati necessari alla pianificazione delle équipe: dati identificativi dei professionisti, assegnazioni, contatori, orari di lavoro. La piattaforma non è destinata a ospitare cartelle cliniche dei pazienti.',
            },
            {
                title: 'Crittografia',
                text: 'Gli scambi con la piattaforma sono cifrati in transito (TLS) e i dati sono cifrati a riposo presso il nostro fornitore di infrastruttura.',
            },
            {
                title: 'Accessi e tracciabilità',
                text: 'I diritti di accesso in Momentum sono definiti per ruoli e privilegi, amministrati dalla tua organizzazione. Le richieste — ferie, scambi, desiderata — sono tracciate nell’applicazione.',
            },
            {
                title: 'Cosa Momentum non fa',
                text: 'Momentum non è uno strumento di sorveglianza del personale: nessuna valutazione individuale delle persone, nessuna analisi comportamentale. I contatori servono a garantire l’equità della ripartizione e sono visibili alle équipe stesse.',
            },
        ],
        contactLine: 'Domande su GDPR, accordo sul trattamento dei dati o sub-responsabili:',
    },
    references: {
        metaTitle: 'Referenze | BioSked Momentum Italia',
        metaDescription:
            'Casi pubblicati Momentum: pronto soccorso CHIREC (creazione dei turni mensili da 4 giorni a 4–5 ore), CHU di Angers, IRIS GRIM, IMAGIR, CIM Les Cèdres. Risultati misurati nella pianificazione di équipe mediche.',
        kicker: 'Referenze',
        heading: 'Casi pubblicati, risultati misurati',
        lead: 'Oltre 250 organizzazioni sanitarie pianificano con Momentum. Qui trovi una selezione dei casi pubblicati — pronto soccorso, radiologia multi-sede, équipe mediche — con i numeri dichiarati dai clienti stessi.',
        featured: {
            org: 'CHIREC — Ospedale di Braine-l’Alleud',
            specialty: 'Pronto soccorso',
            factsLine: 'Belgio · 40.000 accessi all’anno · 25–30 medici',
            paragraphs: [
                'Prima di Momentum, la pianificazione si faceva a mano, su carta e su Excel: 4 giorni di lavoro per i turni di un mese, desiderata e ferie difficili da integrare, continui scambi di email.',
                'Il servizio ha confrontato più soluzioni e ha scelto Momentum, già in uso nella radiologia del gruppo CHIREC: gestione di contratti e specialità multiple, guardie e desiderata, calcolo automatico delle ore con esportazione verso i sistemi HR, turni consultabili online in tempo reale da tutta l’équipe. L’avvio per i medici del pronto soccorso è avvenuto a fine 2024.',
                'Il caso di studio pubblicato (maggio 2025) documenta la creazione dei turni mensili passata da 4 giorni a 4–5 ore, meno email di aggiustamento, una migliore equità percepita nella ripartizione degli orari e meno correzioni sulle retribuzioni.',
            ],
            quote: {
                text: 'Non mi aspettavo che Momentum avesse un impatto simile. È chiaro, fluido, automatizzato. Sono impressionato dalla capacità dello strumento di generare turni così ottimizzati rispettando quasi tutte le preferenze.',
                author: 'Dr Frédéric Cavallotto',
                role: 'Primario del Pronto Soccorso',
            },
            stats: [
                { value: '4–5 ore', label: 'per i turni di un mese, invece di 4 giorni' },
                { value: 'fino al 90%', label: 'di tempo in meno sulla gestione dei turni' },
                { value: '90–100%', label: 'di soddisfazione del personale' },
            ],
        },
        others: [
            {
                org: 'CHU di Angers',
                specialty: 'Pronto soccorso e SAMU',
                line: '52 medici con attività condivisa tra pronto soccorso e SAMU, pianificati con Momentum dal 2021: guardie e weekend ripartiti con criteri di equità, desiderata e scambi gestiti nell’app.',
            },
            {
                org: 'IRIS GRIM — Nantes',
                specialty: 'Radiologia',
                line: '45 radiologi e 240 professionisti; nel 2020 il gruppo ha sostituito lo strumento di pianificazione sviluppato internamente con Momentum.',
            },
            {
                org: 'IMAGIR — Bordeaux',
                specialty: 'Radiologia multi-sede',
                line: 'Circa 40 radiologi su 9 sedi; secondo il caso di studio pubblicato, l’interconnessione tra Momentum, EasyDoct e Kelio «permette il recupero di un equivalente a tempo pieno, se non due».',
            },
            {
                org: 'CIM Les Cèdres — Saint-Malo',
                specialty: 'Radiologia',
                line: '18 radiologi; cliente dal 2014: turni collegati al RIS di NGI, timbrature e gestione delle ferie nella stessa piattaforma.',
            },
        ],
        languageNote: 'I casi di studio completi sono pubblicati in francese.',
        fullStudiesLabel: 'Consulta i casi di studio (in francese)',
        demoCta: 'Richiedi una demo',
    },
    thankyou: {
        slug: 'grazie',
        title: 'Richiesta ricevuta | BioSked Momentum',
        heading: 'Grazie — abbiamo ricevuto la tua richiesta.',
        body: 'Ti ricontatteremo personalmente per fissare un appuntamento. Se vuoi anticiparci qualche dettaglio su team, sedi o processo di pianificazione attuale, scrivici a info@biosked.com.',
        back: 'Torna alla homepage',
    },
    pricing: {
        metaTitle: 'Prezzi | BioSked Momentum Italia',
        metaDescription:
            'Momentum per ospedali, gruppi di radiologia e cliniche: piattaforma, app mobile, implementazione guidata e supporto inclusi. L’offerta si costruisce su collaboratori, sedi e moduli. Richiedi un preventivo.',
        kicker: 'Prezzi',
        heading: 'Un’offerta costruita sulla tua organizzazione',
        lead: 'Ogni struttura sanitaria pianifica in modo diverso: per questo l’offerta è definita su misura. Si basa su collaboratori pianificati, sedi e moduli effettivamente usati, con implementazione guidata e supporto inclusi fin dal primo giorno. Il metro per valutarla è il ritorno: nei casi pubblicati, la creazione dei turni mensili passa da 4 giorni a 4–5 ore (CHIREC, 2025) — fino al 90% di tempo amministrativo in meno.',
        anchor: 'A partire da <strong>5,99 €</strong> per professionista pianificato al mese.',
        includedTitle: 'Sempre incluso nell’abbonamento',
        included: [
            {
                title: 'Piattaforma e app mobile',
                text: 'La piattaforma Momentum per chi pianifica e l’app iOS e Android per tutto il team: accesso con Face ID o impronta, turni consultabili anche offline, disponibile in 5 lingue.',
            },
            {
                title: 'Generazione automatica dei turni',
                text: 'Turni generati nel rispetto di contratti, competenze, regole sull’orario di lavoro e desiderata individuali, con contatori di equità e gravosità visibili a tutto il team.',
            },
            {
                title: 'Implementazione guidata e formazione',
                text: 'Configuriamo insieme regole di pianificazione, guardie, reperibilità e contatori, e formiamo pianificatori e team. Dopo oltre 15 anni di progetti di pianificazione medica, sappiamo dove un avvio si blocca — e come evitarlo.',
            },
            {
                title: 'Integrazioni',
                text: 'RIS, prenotazioni, HR e timbrature, calendari personali ed export verso il sistema paghe: dati allineati, senza doppio inserimento. Nel gruppo di radiologia IMAGIR (circa 40 radiologi, 9 sedi), l’interconnessione tra Momentum, EasyDoct e Kelio «permette il recupero di un equivalente a tempo pieno, se non due».',
            },
            {
                title: 'Supporto continuo e aggiornamenti',
                text: 'Un team di supporto dedicato e aggiornamenti regolari della piattaforma, inclusi nell’abbonamento. Il nostro cliente più longevo pianifica con Momentum dal 2010, sulla stessa piattaforma, sempre aggiornata.',
            },
            {
                title: 'Hosting nell’Unione Europea e GDPR',
                text: 'I dati sono ospitati nell’Unione Europea e trattati in linea con il GDPR; su richiesta forniamo la documentazione per il tuo referente privacy o DPO.',
            },
        ],
        faqTitle: 'Domande frequenti',
        faq: [
            {
                q: 'Come viene calcolato il preventivo?',
                a: 'Su quattro piani (Starter, Plus, Pro, Enterprise) e tre elementi: il numero di collaboratori pianificati, il numero di sedi e i moduli che scegli — ad esempio scambio turni, timbrature o integrazioni. Paghi solo ciò che la tua organizzazione usa davvero.',
            },
            {
                q: 'Possiamo iniziare in piccolo e crescere poi?',
                a: 'Sì. Puoi cambiare piano in qualsiasi momento e combinare piani diversi per team — tutto in un unico account.',
            },
            {
                q: 'Quanto tempo fa risparmiare, concretamente?',
                a: 'Dipende dal punto di partenza — spesso Excel, email e scambi informali. Nei casi pubblicati: creazione dei turni mensili da 4 giorni a 4–5 ore e fino al 90% di tempo in meno sulla gestione degli orari (CHIREC, 2025); con le integrazioni, «il recupero di un equivalente a tempo pieno, se non due» (IMAGIR).',
            },
            {
                q: 'Come funziona l’implementazione?',
                a: 'Un team dedicato configura con te regole di pianificazione, guardie, reperibilità e contatori, forma i pianificatori e accompagna il team fino al go-live e oltre. L’implementazione guidata fa parte dell’offerta, non è un extra.',
            },
            {
                q: 'Momentum si integra con i nostri sistemi?',
                a: 'Sì: RIS, sistemi HR e di timbratura, sistema paghe e calendari personali del team. Le integrazioni necessarie si definiscono durante l’analisi iniziale e rientrano nell’offerta.',
            },
            {
                q: 'Dove sono ospitati i nostri dati?',
                a: 'Nell’Unione Europea. Il trattamento è allineato al GDPR e, su richiesta, forniamo la documentazione per la valutazione da parte del tuo team privacy o del DPO.',
            },
            {
                q: 'Momentum è una soluzione sovrana?',
                a: 'Il contratto è con Bio-Optronics Sàrl, la nostra entità svizzera — la tua controparte contrattuale è europea, non una società americana. E i tuoi dati restano ospitati nell’Unione Europea.',
            },
            {
                q: 'Come si parte?',
                a: 'In tre passi: una demo costruita su turni e regole del tuo contesto, una fase di analisi per definire insieme regole, sedi e integrazioni, e un’offerta con il piano di implementazione.',
            },
        ],
        demoCta: 'Richiedi una demo',
        quoteCta: 'Richiedi un preventivo',
    },
};
