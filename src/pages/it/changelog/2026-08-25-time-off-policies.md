---
layout: "@layouts/ChangelogLayout.astro"
date: 2026-08-25
version: "4.7.0"
author: BioSked
title: 🗓️ Politiche per le ferie, richieste pre-approvate, costruzioni più rapide
description: Momentum 4.7 porta le politiche per le ferie, la pre-approvazione delle richieste, i conteggi nella Panoramica data e una costruzione classica molto più rapida, seguita da release più piccole il 26 agosto e il 1° settembre 2026.
image: "../../../assets/images/momentum4-7-it.png"
lang: it

---

![Momentum 4.7](../../../assets/images/momentum4-7-it.png)

Distribuita per gradi dal 17 agosto e su tutte le istanze europee il 25 agosto 2026, seguita da release più piccole il 26 agosto e il 1° settembre. Tre delle nuove funzionalità sono dietro un interruttore per istanza: le attiviamo per gradi, istanze più attive per prime. Dillo al tuo referente BioSked se vuoi essere tra i primi.

### ✨ Novità

- **Politiche per le ferie:** le regole di maturazione stanno in un solo posto invece di essere solo annuali, e un termine di contratto può usare più politiche, per esempio ferie annuali, malattia e giorni di anzianità. Le maturazioni annuali esistenti migrano in una politica per termine di contratto. Dietro un interruttore per istanza.
- **Pre-approvare le richieste:** segna un insieme di richieste come pre-approvate, avvia una costruzione di prova per verificare la copertura, poi approva definitivamente o annulla. Il personale riceve la notifica solo all'approvazione finale. Dietro un interruttore per istanza.
- **Richieste nella Panoramica data:** mostra le richieste in sospeso accanto agli incarichi che toccano, secondo il filtro attivo. Dietro un interruttore per istanza.
- **Conteggi nella Panoramica data:** l'opzione di visualizzazione "Mostra conteggi" indica quanti incarichi, o punti, contiene un giorno o un gruppo, in entrambi i layout e con qualsiasi raggruppamento.
- **Turni scoperti nella Cronologia:** la cronologia può ora mostrare i turni che aspettano ancora qualcuno.
- **Gli scambi si concludono senza una seconda approvazione** quando la persona che accetta ha già il diritto "Modifica richieste: approva/rifiuta". Prima nell'app mobile; la pagina richieste sul web seguirà.
- **Le richieste in sospeso mantengono l'ordine di invio,** con una nuova colonna Creato per ordinare.
- **Gli amministratori ricevono una notifica** quando qualcuno viene rimosso da un incarico già pubblicato.

### 💎 Miglioramenti

- **La costruzione classica è circa 58 volte più rapida:** da 43 minuti a 45 secondi sul nostro cliente di riferimento.
- **Costruzioni identiche danno pianificazioni identiche.** Se un modello conteneva più righe identiche per lo stesso ruolo, l'ordine in cui vengono coperte è ora fisso.
- **Le grandi modifiche massive si completano** invece di fallire a metà: spostare 200 incarichi richiede ora 6 accessi al database invece di 324.
- **Le schede al passaggio del mouse nella griglia di pianificazione sono leggibili:** testo più grande, schede più larghe, commenti che vanno a capo.
- **I filtri salvati si aprono sul periodo salvato.**
- **Il supporto vede perché un accesso è fallito,** così i problemi di accesso si risolvono in un solo scambio.
- **Gli aggiornamenti dell'app mobile raggiungono prima un piccolo gruppo,** poi tutti.

### 🪲 Correzioni

- **Conteggio orario e valori delle ferie:** il motore di calcolo moderno riproduce ora esattamente il precedente. Prima del passaggio abbiamo ricalcolato 4,3 milioni di valori del riepilogo ferie su 325 database di produzione: zero differenze. I periodi di lavoro sovrapposti non cambiano più da una schermata all'altra, e il dettaglio del conteggio orario non dà più errore.
- Approvare o pre-approvare due volte una richiesta non duplica più i suoi giorni nella pianificazione, e il personale non riceve più due notifiche.
- La riga dei totali della Panoramica data conta le richieste pre-approvate.
- La pubblicazione massiva dalla nuova Panoramica data non fallisce più in blocco: le righe che non possono essere pubblicate vengono saltate, le altre passano.
- Pubblicare un livello vuoto non pubblica nulla, invece di tutti i livelli.
- Pubblicare e annullare la pubblicazione funzionano dalla selezione multipla e dalla modifica massiva.
- Le richieste inviate dall'app mobile creano ora una notifica e una voce nel registro cronologico.
- Le notifiche agli amministratori rispettano le loro caselle di controllo, e le notifiche di ruolo eliminato contengono tutti i dettagli.
- Pubblicare un turno non assegnato nel Job Board non interrompe più le altre notifiche.
- I ruoli possono essere eliminati dopo l'approvazione di una candidatura nel Job Board.
- Il personale vede di nuovo le note pubbliche nella Panoramica data classica, note del giorno comprese.
- Il menu a tendina del personale è di nuovo in ordine alfabetico, le linee di separazione dei gruppi di ruoli sono di nuovo visibili, e le colonne della vista elenco corrispondono a Momentum Classic.
- L'esportazione Excel non mostra più un messaggio di errore, le esportazioni SFTP pianificate contengono tutto ciò che contiene un'esportazione manuale, e l'esportazione del calendario funziona di nuovo.
- Gli incarichi creati da richieste approvate raggiungono ora i calendari esterni collegati, come Outlook.
- Annullare l'avviso "timbratura dimenticata" non elimina più una timbratura precedente.
- La convalida degli incarichi si ferma allo scadere del tempo invece di continuare per minuti.
- I link di attivazione sopportano un secondo clic, e il personale con password lunghe può di nuovo accedere.
- Una modifica massiva fallita ora lo segnala e mantiene la tua selezione.
