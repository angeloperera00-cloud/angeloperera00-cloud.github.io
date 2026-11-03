/* ==========================================================================
   Italian copy for the home page sections. Same shape as profile.ts:
   only text lives here; icons, numbers and order come from profile.ts.
   Keep the arrays in the same order as the English ones.
   ========================================================================== */

export const heroIt = {
  eyebrow: 'Software Engineer',
  titleLines: ['Sviluppo', 'Esperienze', 'Digitali', 'Memorabili'],
  roles: ['iOS Engineer', 'Full-Stack Engineer'],
  rolesLine2: 'Content Creator e Digital Marketer',
  availability: ['Disponibile per', 'freelance e full-time'],
};

export const aboutIt = {
  headline: ['Trasformo idee', 'complesse in', 'soluzioni reali.'],
  paragraphs: [
    'Sono Angelo Perera, sviluppatore iOS, web e di videogiochi con oltre 5 anni di esperienza freelance nella creazione di prodotti digitali veloci, accessibili e significativi. Mi piace trasformare le idee in soluzioni concrete che le persone usano con piacere.',
    "Frequento l'Apple Developer Academy dell'Università degli Studi di Napoli Federico II, dove continuo a superare i miei limiti e a creare app di nuova generazione.",
  ],
  tagline: ['Sviluppatore', 'Creator', 'Problem solver'],
  quote: 'Il codice non è solo ciò che faccio: è il modo in cui risolvo problemi, esprimo idee e creo impatto.',
  stats: [
    { label: 'Anni di esperienza', text: 'Creo app, giochi e soluzioni web di alta qualità.' },
    { label: 'App realizzate', text: "Pubblicate sull'App Store, con migliaia di utenti soddisfatti." },
    { label: 'Iscritti YouTube', text: 'Cresciuti dal 2021, con oltre 635K ore di visualizzazione.' },
    { label: 'Visualizzazioni YouTube', text: 'Contenuti che informano, ispirano e intrattengono.' },
    { label: 'Developer Academy', text: "Selezionato per la prestigiosa Apple Developer Academy (Napoli)." },
    { label: 'Obiettivo', text: 'Creare prodotti di impatto e fare una differenza positiva.' },
  ],
};

export const experienceIt = [
  {
    date: '2021 – Oggi',
    title: 'Sviluppatore iOS',
    org: 'Freelance',
    points: [
      'Sviluppato oltre 100 applicazioni iOS native per clienti internazionali.',
      'Realizzato app performanti, scalabili e facili da usare.',
      'Integrato API REST, Firebase e framework moderni.',
      'Attenzione a un’architettura pulita e alle best practice di sviluppo.',
    ],
  },
  {
    date: '2021 – Oggi',
    title: 'YouTube Creator e Digital Marketer',
    org: 'YouTube',
    points: [
      'Portato il mio canale a oltre 121K iscritti e 153M di visualizzazioni.',
      'Creato contenuti formativi e tecnologici su iOS e sviluppo.',
      'Specializzato in strategia per gli Shorts, SEO e crescita del pubblico.',
    ],
  },
];

export const skillTitlesIt = ['Ecosistema Apple', 'Frontend e Backend', 'Sviluppo di videogiochi', 'AI e tecnologie emergenti', 'Strumenti e piattaforme', 'Design e creatività'];
export const skillKpiLabelsIt = ['Tecnologie', 'Categorie', 'Progetti realizzati'];

export const educationIt = {
  status: 'In corso',
  institution: 'Università degli Studi di Napoli Federico II · Napoli',
  description: "Programma intensivo dedicato allo sviluppo iOS, al lavoro in team, al design e alla creazione di app reali con le tecnologie Apple.",
  focus: ['Sviluppo iOS', 'Lavoro in team', 'Design', 'Tecnologie Apple'],
};

/** Keyed by certification id. Titles stay in their original language. */
export const certTextsIt: Record<string, { issuer?: string; text: string }> = {
  'apple-academy': { issuer: 'Università degli Studi di Napoli Federico II', text: "Programma intensivo dedicato allo sviluppo iOS, al lavoro in team, al design e alla creazione di app reali con le tecnologie Apple." },
  'udemy-se': { text: 'Diploma completo su principi di ingegneria del software, strutture dati, algoritmi e system design.' },
  cs50: { text: "Completato CS50, il corso introduttivo di Harvard all'informatica su programmazione, algoritmi e molto altro." },
  'fcc-js': { text: 'Certificazione su algoritmi e strutture dati in JavaScript, per logica e problem solving.' },
  'udemy-ios': { text: 'Dedicato a Swift, SwiftUI, sviluppo iOS, architettura delle app e realizzazione di progetti iOS reali.' },
  'webdev-bootcamp': { text: 'Corso di sviluppo web full stack su HTML, CSS, JavaScript, Node.js, React e database.' },
};

export const youtubeIt = {
  lede: 'Creo contenuti formativi e tecnologici su iOS e sviluppo, con particolare attenzione alla strategia per gli Shorts, alla SEO e alla crescita del pubblico.',
  tags: ['YouTube', 'Shorts', 'SEO', 'Strategia dei contenuti', 'Analytics'],
  statLabels: ['Visualizzazioni totali', 'Iscritti', 'Ore di visualizzazione'],
  since: 'giugno 2021',
  points: [
    'Portato il canale a oltre 121K iscritti e 153M di visualizzazioni da giugno 2021.',
    'Creato contenuti formativi e tecnologici su iOS e sviluppo.',
    'Specializzato in strategia per gli Shorts, SEO e crescita del pubblico.',
  ],
};
