import type { CaseStudy } from './types';

/* ==========================================================================
   Italian text for projects, keyed by slug. Anything not listed here falls
   back to the English in projects.ts. `captions` follow screenshot order.
   ========================================================================== */

export interface ProjectTranslation {
  title?: string;
  summary?: string;
  caseStudy?: CaseStudy;
  captions?: string[];
}

export const projectsIt: Record<string, ProjectTranslation> = {
  mtlab: {
    summary: 'Un laboratorio virtuale di ingegneria meccanica: esplora e usa un tornio 3D interattivo, su schermo o in AR.',
    captions: ['Tornio in AR con i comandi della macchina', 'Catalogo Macchine manuali con avanzamento'],
    caseStudy: {
      overview:
        "MTLab è un laboratorio virtuale di ingegneria meccanica. Usa simulazioni 3D interattive per insegnare il funzionamento delle macchine industriali, partendo dal tornio, a studenti di ingegneria meccanica, università, istituti tecnici e docenti.",
      problem: { paragraphs: ["Chi studia il funzionamento delle macchine industriali ha spesso poco tempo pratico su attrezzature reali: le macchine sono costose, condivise e non sempre sicure per i principianti. Con la sola teoria è difficile immaginare come si muovono davvero parti come il mandrino e il carrello."] },
      role: { paragraphs: ["Sviluppatore del team. Ho scritto il codice dell'app: il tornio 3D interattivo, le schermate di teoria della macchina e la modalità AR che posiziona la macchina nella stanza."] },
      solutions: {
        bullets: [
          'Simulazione 3D interattiva del tornio.',
          'Teoria guidata della macchina con la spiegazione di ogni componente.',
          'Rotazione del mandrino e movimento del carrello.',
          "Dimostrazione dell'operazione di tornitura.",
          'Visualizzazione in AR che posiziona la macchina nella stanza.',
        ],
      },
      results: {
        paragraphs: [
          "Disponibile sull'App Store nella categoria Istruzione, gratis, per iPhone e iPad. Prossimi passi: fresatura, foratura, operazioni CNC e nuovi macchinari.",
        ],
      },
    },
  },
  tennisland: {
    summary: 'Gioco di tennis 3D per Apple TV, giocato con il telecomando Siri Remote.',
    captions: ['Su Apple TV con il Siri Remote', 'Home: gioca, sfide, tornei e giocatori', 'Il campo dello stadio', 'Vista da fondo campo', "L'arena"],
    caseStudy: {
      overview:
        "TennisLand è un gioco di tennis 3D per Apple TV, da giocare sul grande schermo con il Siri Remote. Oltre alle partite, riunisce in un unico posto sfide, tornei e giocatori.",
      problem: { paragraphs: ["I giochi di tennis di solito richiedono un controller o lo schermo di un telefono. TennisLand porta una partita di tennis in 3D sulla TV di casa, giocabile solo con il Siri Remote incluso con ogni Apple TV."] },
      role: { paragraphs: ["Sviluppatore del team. Ho programmato il gioco: il campo e lo stadio in 3D, i controlli con il Siri Remote e i menu di sfide, tornei e giocatori."] },
      solutions: {
        bullets: [
          'Stadio e campo in 3D pensati per lo schermo della TV.',
          'Si gioca con il Siri Remote.',
          'Menu principale con Gioca, Sfide, Tornei, Giocatori e Impostazioni.',
          'Sezione Tornei per seguire Slam, ATP e WTA.',
        ],
      },
      results: { paragraphs: ["In arrivo sull'App Store per Apple TV."] },
    },
  },
  propel: {
    summary: "Navigazione LiDAR per persone cieche e ipovedenti: avvisi aptici e sonori quando un ostacolo si avvicina, più la lettura vocale delle etichette dei prodotti.",
    captions: ['Scan Space: percorso libero, 1,9 m', 'Ostacolo a 0,4 m: Stop', 'Read Label: nome e formato del prodotto letti ad alta voce'],
    caseStudy: {
      overview:
        "Propel aiuta le persone cieche e ipovedenti a muoversi nello spazio e a fare la spesa in autonomia. Usa lo scanner LiDAR per misurare la distanza da ciò che hanno davanti e la trasforma in un feedback aptico e sonoro che diventa più intenso man mano che l'ostacolo si avvicina. Al supermercato legge ad alta voce le etichette dei prodotti, compresi nome e formato.",
      problem: {
        paragraphs: [
          "Orientarsi in uno spazio sconosciuto e riconoscere i prodotti sugli scaffali sono attività quotidiane che dipendono ancora molto dall'aiuto di una persona vedente. Propel è stato progettato insieme alla comunità italiana di persone cieche CIVES, partendo dalla loro esperienza reale.",
        ],
      },
      process: {
        paragraphs: [
          'Sviluppato con i membri di CIVES, il cui feedback ha definito come comunicare la distanza e come funzionano le due modalità. Creato per lo Swift Student Challenge 2025/26.',
        ],
      },
      role: { paragraphs: ["Sviluppatore del team. Ho scritto il codice di entrambe le modalità: il rilevamento della distanza con il LiDAR con feedback aptico e sonoro, e la lettura delle etichette con la fotocamera."] },
      solutions: {
        bullets: [
          "Scan Space: il sensore LiDAR misura in tempo reale la distanza dall'ostacolo più vicino.",
          'Tre stati chiari (Clear, Caution, Stop) indicati con colore e livello di vicinanza, da Lontano a Molto vicino.',
          "Feedback aptico e sonoro che si intensifica quando un oggetto si avvicina, così funziona anche senza guardare lo schermo.",
          'Read Label: inquadra un prodotto per sentirne nome e formato, ad esempio i millilitri di una lattina.',
        ],
      },
    },
  },
  eyecheck: {
    summary: 'Capisci la tua vista in pochi minuti: test con tabella ottotipica in AR e test di percezione dei colori su iPhone, con spiegazioni semplici di condizioni come la miopia.',
    captions: ['Capisci la tua vista in pochi minuti', 'Consenso e configurazione: solo uso educativo', 'Tabella ottotipica in AR', 'Occhiali virtuali in AR', 'Analisi della vista: la miopia spiegata', 'Risultati, ripeti il test e condividi'],
    caseStudy: {
      overview:
        "EyeCheck aiuta a capire la propria vista in modo divertente e interattivo. Posiziona nella stanza, in realtà aumentata, una tabella ottotipica a grandezza reale e degli occhiali virtuali, offre un test visivo e un test di percezione dei colori e spiega condizioni come la miopia con schemi interattivi. È pensata per tutti ed è presentata chiaramente come strumento educativo, non come sostituto di una visita oculistica.",
      problem: { paragraphs: ["Molte persone pensano alla propria vista solo durante una visita oculistica, e termini come miopia sono difficili da immaginare. Mancava un modo semplice e interattivo per provare un test visivo a casa e capirne il significato, chiarendo che non sostituisce una visita professionale."] },
      role: { paragraphs: ["Sviluppatore del team. Ho programmato il posizionamento in AR della tabella ottotipica e degli occhiali, i test visivo e di percezione dei colori e le schermate di analisi della vista."] },
      solutions: {
        bullets: [
          'Test visivo con tabella ottotipica di Snellen posizionata in AR e uno slider per simulare la sfocatura.',
          'Test di percezione dei colori.',
          'Occhiali virtuali in AR per vedere come una lente correttiva cambia la visione.',
          "Schermate di analisi che spiegano la miopia, con uno slider che mostra come una lente riporta il fuoco sulla retina.",
          "Passaggio di consenso e configurazione: uso solo informativo, con indicazioni su luce e spazio per l'AR.",
          'Schermata dei risultati con Ripeti il test e Condividi EyeCheck con gli amici.',
        ],
      },
    },
  },
  stikar: {
    summary: 'Lascia sticker in AR: posiziona sticker virtuali in luoghi reali e torna a trovarli più tardi.',
    captions: ['Lascia sticker nel mondo reale', 'Scegli tra oltre 15 sticker diversi', 'Entra in contatto con le persone intorno a te', 'Scopri i ricordi che altri hanno lasciato prima di te'],
    caseStudy: {
      overview:
        "StikAR permette di posizionare sticker virtuali in luoghi reali e di ritrovarli in seguito. È pensata per un'interazione spaziale semplice e giocosa e per un'esperienza condivisa: accedi solo con un nome utente, lascia sticker nel mondo e torna in una zona per vederli ricomparire.",
      problem: { paragraphs: ["Condividere un momento di solito significa un post che sparisce nel feed. StikAR propone un'altra idea: e se potessi lasciare qualcosa nel luogo stesso, perché amici o sconosciuti lo scoprano quando ci arrivano?"] },
      role: { paragraphs: ["Sviluppatore in un team di cinque persone, tra i contributori indicati sull'App Store. Ho scritto codice per l'esperienza degli sticker in AR: posizionarli in luoghi reali, ricaricarli in una zona, spostarli e ridimensionarli."] },
      solutions: {
        bullets: [
          'Posiziona sticker nel mondo reale in AR, scegliendo tra oltre 15 sticker in pixel art.',
          'Torna in una zona per ricaricare gli sticker lasciati in precedenza.',
          'Sposta e ridimensiona gli sticker nello spazio.',
          "Usa l'app con un semplice nome utente.",
          'Photo Mode: scatta foto personali e posizionale in AR.',
        ],
      },
      results: {
        paragraphs: [
          "Disponibile sull'App Store per iPhone e iPad, gratis, nella categoria Social network. La versione 1.0 è uscita il 20 marzo; la 1.1 ha aggiunto il Photo Mode il 6 maggio. Supporta VoiceOver.",
        ],
      },
    },
  },
  wanderly: {
    summary: 'Il tuo compagno di viaggio intelligente per scoprire luoghi, pianificare viaggi ed esplorare il mondo.',
    captions: ['Scopri le mete di tendenza', 'Esplora 88 paesi per continente', 'Di tendenza e più votati', 'Pagine dei paesi con i luoghi da non perdere', 'Salva i luoghi per dopo', 'Badge e passaporto digitale'],
    caseStudy: {
      problem: { paragraphs: ["Organizzare un viaggio spesso significa passare continuamente tra ricerca, mappe, note e social. Wanderly riunisce in un'unica app la scoperta dei luoghi, le idee salvate e i posti già visitati."] },
      role: { paragraphs: ["Sviluppatore del team. Ho programmato le schermate e le funzioni dell'app: Scopri, Esplora per paese, Luoghi salvati e il Profilo con badge e passaporto digitale."] },
      solutions: {
        bullets: [
          'Scheda Scopri con ricerca delle mete, filtri per categoria (spiagge, montagne, cultura), luoghi di tendenza e più votati.',
          'Scheda Esplora con 88 paesi, filtrabili per continente.',
          'Pagine dei paesi con i luoghi principali e le valutazioni.',
          'Lista dei salvati per raccogliere i luoghi dei prossimi viaggi.',
          'Profilo con statistiche di viaggio, badge e un passaporto digitale dei paesi visitati.',
        ],
      },
    },
  },
  'v-fit': {
    summary: "Coach AI per palestra e recupero: scansioni del corpo sul dispositivo, punteggio della postura e allenamenti che si adattano al recupero di ogni muscolo.",
    captions: ['Il tuo allenamento, adattato ogni giorno', 'Segui un piano creato per te', 'Allenati quando i muscoli sono pronti', 'Conosci il tuo corpo', 'Migliora la postura', 'Registra le serie senza perdere la concentrazione'],
    caseStudy: {
      overview:
        "V Fit è un tracker AI per palestra e recupero, pensato per chi vuole un fisico più asciutto, più massa muscolare o muoversi meglio. Scansiona il corpo con la fotocamera dell'iPhone e il Vision framework di Apple, monitora il recupero di ogni gruppo muscolare e costruisce gli allenamenti in base a quanto sei pronto. Le scansioni vengono elaborate sul dispositivo, senza account e senza abbonamento.",
      role: {
        paragraphs: ["Progetto individuale: ho progettato, sviluppato e pubblicato l'app sull'App Store con il mio account sviluppatore."],
      },
      problem: { paragraphs: ["La maggior parte delle app di allenamento propone lo stesso piano anche se hai dormito male o hai ancora le gambe indolenzite. Chi si allena seriamente ha bisogno di sapere quali muscoli sono recuperati e come cambiano postura e simmetria, senza inviare foto del corpo a un server."] },
      solutions: {
        bullets: [
          'Scansione del corpo con Vision: punteggio della postura, allineamento delle spalle, inclinazione del bacino, posizione di ginocchia e caviglie e simmetria muscolare.',
          'Gemello digitale che segue nel tempo tipo di corpo, simmetria muscolare e andamento della postura.',
          "Monitoraggio del recupero per ogni muscolo in base a sonno, indolenzimento, idratazione e storico degli allenamenti.",
          'Schede di allenamento generate dall’AI in base a obiettivo, livello e giorni a settimana.',
          'Suggerimenti di sovraccarico progressivo basati sullo storico degli allenamenti.',
          'Privacy by design: elaborazione sul dispositivo, nessun account, nessun dato inviato ai server.',
        ],
      },
      results: {
        paragraphs: ["Disponibile sull'App Store per iPhone nella categoria Salute e fitness, gratis e senza abbonamento, con una valutazione di 5,0."],
      },
    },
  },
  'country-dash': {
    summary: 'Geo Quiz: indovina i paesi dalla bandiera o dalla forma sulla mappa in 5 secondi, costruisci serie di risposte e sblocca badge.',
    captions: ['Inizia la sfida', 'Scegli la modalità di gioco', 'Metti alla prova la tua conoscenza delle mappe', 'Guadagna badge e sfida te stesso'],
    caseStudy: {
      overview:
        "Country Dash è un quiz di geografia veloce per iPhone. Ogni domanda ti dà 5 secondi per indicare un paese, dai più noti ai meno conosciuti. Le partite brevi sono perfette per un minuto libero e non serve creare un account.",
      role: { paragraphs: ["Progetto individuale: progettato, sviluppato e pubblicato sull'App Store con il mio account sviluppatore."] },
      problem: { paragraphs: ["I quiz di geografia spesso sembrano lenti o noiosi come i compiti. Country Dash rende l'apprendimento dei paesi veloce e coinvolgente: 5 secondi per domanda e partite brevi da giocare in un minuto libero."] },
      solutions: {
        bullets: [
          'Un timer di 5 secondi per ogni domanda.',
          'Quattro modalità: Flag Challenge, Map Challenge, Mixed Challenge e 60 Second Rush.',
          'Serie di risposte corrette e record; una risposta sbagliata azzera la serie.',
          'Livelli, XP, statistiche di precisione e 12 badge da sbloccare.',
          'Una curiosità dopo ogni risposta.',
          'Nessun account necessario.',
        ],
      },
      results: { paragraphs: ["Disponibile sull'App Store per iPhone nella categoria Quiz, gratis, classificazione 4+."] },
    },
  },
  'poop-run': {
    summary: 'Un endless runner in 3D: schiva gli ostacoli lungo una strada alberata mentre la velocità continua a salire.',
    captions: ['Salta gli ostacoli', 'Punteggio e velocità continuano a salire'],
    caseStudy: {
      overview: "Poop Run è un endless runner in 3D. Il giocatore corre lungo una strada alberata, saltando e cambiando corsia per evitare gli ostacoli mentre punteggio e velocità aumentano.",
      problem: { paragraphs: ["Gli endless runner sono perfetti per partite veloci, ma molti si somigliano. Poop Run dà al genere un tema divertente e controlli semplici: corri, salta e schiva mentre la velocità continua a salire."] },
      role: { paragraphs: ["Sviluppatore del team. Ho programmato il gioco: la strada infinita, il cambio di corsia e il salto, gli ostacoli e il sistema di punteggio e velocità."] },
      solutions: { bullets: ['Strada infinita in 3D con alberi e lampioni.', 'Salta e schiva gli ostacoli tra le corsie.', 'Contatori di punteggio e velocità in tempo reale.'] },
    },
  },
  coachplan: {
    summary: "Un'app per personal trainer: crea schede di allenamento e piani alimentari settimanali per ogni cliente, poi esportali con un tocco.",
    captions: ['Scegli un cliente e crea', 'Esercizi, serie, ripetizioni e recupero', 'Una settimana intera di pasti'],
    caseStudy: {
      overview: "CoachPlan è pensata per i personal trainer. Dalla home il trainer sceglie un cliente e crea una scheda di allenamento o un piano alimentare settimanale, poi lo esporta per condividerlo con il cliente.",
      problem: { paragraphs: ["I personal trainer spesso preparano schede di allenamento e piani alimentari su fogli di calcolo, note o chat: è lento ed è facile confondere i clienti. CoachPlan tiene entrambi i piani di ogni cliente in un unico posto e li esporta con un tocco."] },
      role: { paragraphs: ["Sviluppatore del team. Ho programmato l'app: la selezione del cliente, la creazione delle schede di allenamento, la griglia alimentare settimanale e l'esportazione."] },
      solutions: { bullets: ['Selettore del cliente in ogni schermata: ogni piano appartiene a un cliente.', 'Schede di allenamento per giorno: esercizi inseriti a mano con serie, ripetizioni, recupero e foto.', 'Piani alimentari a griglia settimanale: colazione, spuntini, pranzo, cena e pre-nanna, da lunedì a domenica.', 'Note opzionali su ogni piano ed Esporta con un tocco.'] },
    },
  },
};

/** Placeholder slots (project-08 …). */
export const placeholderIt = {
  title: (n: string) => `Progetto ${n}`,
  summary: 'Spazio riservato. Aggiungi titolo, descrizione, copertina, screenshot e case study in src/content/projects.ts.',
};
