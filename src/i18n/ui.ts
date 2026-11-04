import type { Lang } from './index';

/* ==========================================================================
   Interface strings (everything that isn't profile or project content).
   ========================================================================== */

const en = {
  nav: {
    about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills', education: 'Education',
    certifications: 'Certifications', youtube: 'YouTube', writing: 'Writing', contact: 'Contact',
    letsTalk: "Let's talk", openMenu: 'Open menu', closeMenu: 'Close menu', backToTop: 'back to top',
    language: 'Language', skip: 'Skip to content',
  },
  hero: { viewProjects: 'View projects', downloadCv: 'Download CV', cvIn: 'CV in', badgeTop: 'AVAILABLE FOR', badgeBottom: 'FREELANCE & FULL-TIME', badgeLabel: 'Available for freelance and full-time work', portraitAlt: 'Angelo Perera in a navy suit and white shirt', copyEmail: 'Copy email address', copyPhone: 'Copy phone number', intro: 'Introduction' },
  about: { label: 'About me' },
  whatido: {
    label: 'Services', titleA: 'What I', titleB: 'do.',
    lede: 'These are the areas I work in. Pick one and the projects below filter to match.',
    project: 'project', projects: 'projects', soon: 'Coming soon', all: 'All projects', groupLabel: 'Filter projects by area',
    cards: {
      ios: { title: 'iOS Development', text: 'Native Swift and SwiftUI apps for iPhone, iPad, Apple Watch and Apple TV. Where I feel most at home.' },
      spatial: { title: 'AR & Spatial Computing', text: 'ARKit, RealityKit and LiDAR experiences that live in the room around you.' },
      ai: { title: 'AI Integration', text: 'On-device models with Vision and Foundation Models that do real work, not demos.' },
      web: { title: 'Web Development', text: 'Fast, accessible sites and full-stack apps, from a weekend MVP to production.' },
      games: { title: 'Game Development', text: 'Games for iPhone and Apple TV, from five-second quizzes to 3D tennis.' },
    },
  },
  experience: { label: 'Experience', titleA: 'My', titleB: 'journey.', lede: 'A timeline of my professional experience, projects and roles that shaped my skills.' },
  projects: {
    label: 'Featured projects', titleA: "Things I've", titleB: 'built.', lede: 'A selection of my recent work. Each project is built with passion, solves real problems and delivers meaningful impact.',
    viewAll: 'View all projects', more: 'More projects', builtWith: 'Built with', viewCase: 'View case study', featured: 'Featured',
    all: 'All projects', filterLabel: 'Filter projects by category', search: 'Search projects', none: 'No projects match', noneCat: 'this category', showAll: 'Show all projects',
    pageLabel: 'Projects', pageTitleA: 'All', pageTitleB: 'projects.', pageLede: 'Apps, games and experiments across iOS, spatial computing, AI and the web. Filter by area or search by technology.',
    reserved: 'reserved slot', placeholder: 'Placeholder', chipsLabel: 'Platforms and technologies',
  },
  categories: { ios: 'iOS / SwiftUI', spatial: 'AR / Spatial Computing', ai: 'AI / Machine Learning', web: 'Web / Other', games: 'Games' },
  categoriesShort: { ios: 'iOS', spatial: 'AR / Spatial', ai: 'AI / ML', web: 'Web', games: 'Games' },
  cs: {
    allProjects: 'All projects', project: 'Project', platforms: 'Platforms', category: 'Category', year: 'Year', builtWith: 'Built with',
    overview: 'Overview', interface: 'Interface', caseStudy: 'Case study', technology: 'Technology', nextProject: 'Next project',
    tapHint: 'Tap any screen to view it full size.', slotsHint: 'Screenshot slots sized to each device. Drop native-resolution images into the project folder to fill them.',
    overviewHint: 'Add a longer overview (caseStudy.overview): the context, audience and what makes the project interesting.',
    sections: {
      problem: ['The problem', 'Who it is for and what was broken, slow or missing.'],
      role: ['My role & contributions', 'What you owned: design, architecture, features, team size.'],
      process: ['Design & development process', 'How you went from idea to shipped build.'],
      challenges: ['Technical challenges', 'The hardest problems and why they were hard.'],
      solutions: ['Solutions & features', 'How you solved them and the features that came out of it.'],
      results: ['Results', 'Outcomes: users, ratings, awards, performance, what you learned.'],
    },
    links: { appStore: 'App Store', testFlight: 'TestFlight', github: 'GitHub', website: 'Website', video: 'Watch the video' },
    screenshots: 'screenshots', enlarge: 'Enlarge screenshot', of: 'of', prev: 'Previous screenshots', next: 'Next screenshots', viewer: 'screenshot viewer', close: 'Close viewer', prevOne: 'Previous screenshot', nextOne: 'Next screenshot', screenshot: 'Screenshot',
  },
  skills: { label: 'Skills', titleA: 'Technologies', titleB: 'I work', titleC: 'with.', lede: 'I work with a modern tech stack to build high quality, scalable and efficient digital products. Constantly learning, exploring and mastering new technologies.' },
  education: { label: 'Education', titleA: 'Learning', titleB: 'by building.', lede: 'Hands-on training at the Apple Developer Academy, backed by continuous self-directed study.', continuous: 'Continuous learning', certs: 'certifications', seeCerts: 'See certifications' },
  certs: { label: 'Certifications', titleA: 'Proof of', titleB: 'knowledge.', lede: "Continuous learning is part of my journey. These certifications represent the skills, knowledge and dedication I've built over the years.", count: 'Certifications', years: 'Years of learning', verifiedPct: 'Verified', verified: 'Verified', bar1: 'I believe in lifelong learning and staying up to date with the latest technologies.', bar2: 'More certifications and achievements coming soon.', motto: 'Keep Learning, Keep Building.' },
  youtube: { label: 'YouTube', titleA: 'Teaching', titleB: 'on YouTube.', visit: 'Visit channel', since: 'Channel stats since' },
  writing: { label: 'Writing', titleA: 'Writing &', titleB: 'insights.', lede: "Thoughts on software engineering, iOS development, design, and the technologies I'm exploring.", follow: 'Follow on Medium', viewAll: 'View all articles', featured: 'Featured', read: 'Read article', minRead: 'min read', search: 'Search articles', allTopics: 'All topics', filterLabel: 'Filter articles by topic', article: 'article', articles: 'articles', in: 'in', matching: 'matching', none: 'No articles match', noneTopic: 'this topic', clear: 'Clear filters', loadMore: 'Load more', empty: 'Articles are on the way.', pubDate: 'Publication date', readTime: 'Reading time', draftNote: 'Layout preview. Your Medium articles replace these cards once added in src/content/articles.ts.' },
  contact: {
    label: "Let's work together", titleA: "Let's build", titleB: 'something', titleC: 'amazing.', lede1: 'Have a project in mind or want to collaborate?', lede2: "I'd love to hear from you.",
    name: 'Your Name', email: 'Your Email', message: 'Your Message', nameLabel: 'Your name', emailLabel: 'Your email', messageLabel: 'Your message', send: 'Send message', sending: 'Sending…',
    errName: 'Please enter your name.', errEmail: 'Please enter a valid email address, like name@example.com.', errMsg: 'Please write a message of at least 10 characters.',
    ok: (first: string, email: string) => `Thanks, ${first}. Your message was sent. I'll reply to ${email}.`,
    fail: (to: string) => `The message couldn't be sent. Please email ${to} directly.`,
    mailto: (to: string) => `Your email app should open with the message ready to send. If nothing opens, write to ${to}.`,
    subject: (name: string) => `Project inquiry from ${name}`,
  },
  footer: { rights: 'All rights reserved.', built: 'Designed & Built with', love: 'love', top: 'Back to top' },
  toast: { linkMissing: "This link isn't available yet.", copied: 'Copied', selected: 'Selected — press ⌘C or Ctrl+C to copy' },
  notFound: { label: 'Page not found', a: 'This page', b: "doesn't exist.", home: 'Back to home' },
  meta: { projects: 'Projects', projectsDesc: 'Apps, games and experiments by Angelo Perera across iOS, spatial computing, AI and the web.', caseStudy: 'Case study', writing: 'Writing & Insights' },
  device: { placeholder: 'Placeholder', placeholderFor: 'Placeholder for a', screenshot: 'screenshot' },
};

type UI = typeof en;

const it: UI = {
  nav: {
    about: 'Chi sono', experience: 'Esperienza', projects: 'Progetti', skills: 'Competenze', education: 'Formazione',
    certifications: 'Certificazioni', youtube: 'YouTube', writing: 'Articoli', contact: 'Contatti',
    letsTalk: 'Parliamone', openMenu: 'Apri menu', closeMenu: 'Chiudi menu', backToTop: 'torna su',
    language: 'Lingua', skip: 'Vai al contenuto',
  },
  hero: { viewProjects: 'Vedi i progetti', downloadCv: 'Scarica CV', cvIn: 'CV in', badgeTop: 'DISPONIBILE PER', badgeBottom: 'FREELANCE E FULL-TIME', badgeLabel: 'Disponibile per lavoro freelance e full-time', portraitAlt: 'Angelo Perera in giacca blu e camicia bianca', copyEmail: "Copia l'indirizzo email", copyPhone: 'Copia il numero di telefono', intro: 'Introduzione' },
  about: { label: 'Chi sono' },
  whatido: {
    label: 'Servizi', titleA: 'Cosa', titleB: 'faccio.',
    lede: 'Queste sono le aree in cui lavoro. Scegline una e i progetti qui sotto si filtrano di conseguenza.',
    project: 'progetto', projects: 'progetti', soon: 'In arrivo', all: 'Tutti i progetti', groupLabel: 'Filtra i progetti per area',
    cards: {
      ios: { title: 'Sviluppo iOS', text: 'App native in Swift e SwiftUI per iPhone, iPad, Apple Watch e Apple TV. Dove mi sento a casa.' },
      spatial: { title: 'AR e Spatial Computing', text: 'Esperienze con ARKit, RealityKit e LiDAR che vivono nella stanza intorno a te.' },
      ai: { title: 'Integrazione AI', text: 'Modelli on-device con Vision e Foundation Models che lavorano davvero, non demo.' },
      web: { title: 'Sviluppo Web', text: 'Siti veloci e accessibili e app full-stack, da un MVP del weekend alla produzione.' },
      games: { title: 'Sviluppo di giochi', text: 'Giochi per iPhone e Apple TV, dai quiz da cinque secondi al tennis 3D.' },
    },
  },
  experience: { label: 'Esperienza', titleA: 'Il mio', titleB: 'percorso.', lede: 'Una timeline delle esperienze professionali, dei progetti e dei ruoli che hanno formato le mie competenze.' },
  projects: {
    label: 'Progetti in evidenza', titleA: 'Cose che ho', titleB: 'creato.', lede: 'Una selezione dei miei lavori recenti. Ogni progetto nasce dalla passione, risolve problemi reali e ha un impatto concreto.',
    viewAll: 'Tutti i progetti', more: 'Altri progetti', builtWith: 'Realizzati con', viewCase: 'Vedi il case study', featured: 'In evidenza',
    all: 'Tutti i progetti', filterLabel: 'Filtra i progetti per categoria', search: 'Cerca progetti', none: 'Nessun progetto corrisponde a', noneCat: 'questa categoria', showAll: 'Mostra tutti i progetti',
    pageLabel: 'Progetti', pageTitleA: 'Tutti i', pageTitleB: 'progetti.', pageLede: "App, giochi ed esperimenti tra iOS, spatial computing, AI e web. Filtra per area o cerca per tecnologia.",
    reserved: 'spazio riservato', placeholder: 'Segnaposto', chipsLabel: 'Piattaforme e tecnologie',
  },
  categories: { ios: 'iOS / SwiftUI', spatial: 'AR / Spatial Computing', ai: 'AI / Machine Learning', web: 'Web / Altro', games: 'Giochi' },
  categoriesShort: { ios: 'iOS', spatial: 'AR / Spatial', ai: 'AI / ML', web: 'Web', games: 'Giochi' },
  cs: {
    allProjects: 'Tutti i progetti', project: 'Progetto', platforms: 'Piattaforme', category: 'Categoria', year: 'Anno', builtWith: 'Realizzato con',
    overview: 'Panoramica', interface: 'Interfaccia', caseStudy: 'Case study', technology: 'Tecnologie', nextProject: 'Prossimo progetto',
    tapHint: 'Tocca una schermata per vederla a schermo intero.', slotsHint: 'Spazi per gli screenshot dimensionati per ogni dispositivo. Aggiungi le immagini nella cartella del progetto.',
    overviewHint: "Aggiungi una panoramica più lunga (caseStudy.overview): contesto, pubblico e cosa rende interessante il progetto.",
    sections: {
      problem: ['Il problema', 'Per chi è e cosa mancava o non funzionava.'],
      role: ['Il mio ruolo e contributo', 'Di cosa ti sei occupato: design, architettura, funzionalità, dimensione del team.'],
      process: ['Processo di design e sviluppo', "Come sei passato dall'idea alla build pubblicata."],
      challenges: ['Sfide tecniche', 'I problemi più difficili e perché lo erano.'],
      solutions: ['Soluzioni e funzionalità', 'Come li hai risolti e le funzionalità che ne sono nate.'],
      results: ['Risultati', 'Esiti: utenti, valutazioni, premi, prestazioni, cosa hai imparato.'],
    },
    links: { appStore: 'App Store', testFlight: 'TestFlight', github: 'GitHub', website: 'Sito web', video: 'Guarda il video' },
    screenshots: 'screenshot', enlarge: 'Ingrandisci lo screenshot', of: 'di', prev: 'Screenshot precedenti', next: 'Screenshot successivi', viewer: 'visualizzatore screenshot', close: 'Chiudi', prevOne: 'Screenshot precedente', nextOne: 'Screenshot successivo', screenshot: 'Screenshot',
  },
  skills: { label: 'Competenze', titleA: 'Le tecnologie', titleB: 'che', titleC: 'uso.', lede: 'Lavoro con uno stack moderno per creare prodotti digitali di qualità, scalabili ed efficienti. Imparo, esploro e approfondisco sempre nuove tecnologie.' },
  education: { label: 'Formazione', titleA: 'Imparare', titleB: 'creando.', lede: "Formazione pratica all'Apple Developer Academy, affiancata da uno studio autonomo continuo.", continuous: 'Formazione continua', certs: 'certificazioni', seeCerts: 'Vedi le certificazioni' },
  certs: { label: 'Certificazioni', titleA: 'Le prove delle', titleB: 'competenze.', lede: 'La formazione continua fa parte del mio percorso. Queste certificazioni rappresentano le competenze, le conoscenze e l\'impegno costruiti negli anni.', count: 'Certificazioni', years: 'Anni di formazione', verifiedPct: 'Verificate', verified: 'Verificata', bar1: 'Credo nella formazione continua e nel restare aggiornato sulle ultime tecnologie.', bar2: 'Altre certificazioni e traguardi in arrivo.', motto: 'Continua a imparare, continua a creare.' },
  youtube: { label: 'YouTube', titleA: 'Insegno', titleB: 'su YouTube.', visit: 'Vai al canale', since: 'Statistiche del canale da' },
  writing: { label: 'Articoli', titleA: 'Articoli e', titleB: 'riflessioni.', lede: 'Riflessioni su ingegneria del software, sviluppo iOS, design e le tecnologie che sto esplorando.', follow: 'Seguimi su Medium', viewAll: 'Tutti gli articoli', featured: 'In evidenza', read: "Leggi l'articolo", minRead: 'min di lettura', search: 'Cerca articoli', allTopics: 'Tutti gli argomenti', filterLabel: 'Filtra gli articoli per argomento', article: 'articolo', articles: 'articoli', in: 'in', matching: 'per', none: 'Nessun articolo corrisponde a', noneTopic: 'questo argomento', clear: 'Azzera i filtri', loadMore: 'Carica altri', empty: 'Gli articoli sono in arrivo.', pubDate: 'Data di pubblicazione', readTime: 'Tempo di lettura', draftNote: 'Anteprima del layout. I tuoi articoli Medium sostituiranno queste schede una volta aggiunti in src/content/articles.ts.' },
  contact: {
    label: 'Lavoriamo insieme', titleA: 'Creiamo', titleB: 'qualcosa di', titleC: 'straordinario.', lede1: 'Hai un progetto in mente o vuoi collaborare?', lede2: 'Mi farebbe piacere sentirti.',
    name: 'Il tuo nome', email: 'La tua email', message: 'Il tuo messaggio', nameLabel: 'Il tuo nome', emailLabel: 'La tua email', messageLabel: 'Il tuo messaggio', send: 'Invia messaggio', sending: 'Invio in corso…',
    errName: 'Inserisci il tuo nome.', errEmail: 'Inserisci un indirizzo email valido, ad esempio nome@esempio.com.', errMsg: 'Scrivi un messaggio di almeno 10 caratteri.',
    ok: (first: string, email: string) => `Grazie, ${first}. Il messaggio è stato inviato. Ti risponderò a ${email}.`,
    fail: (to: string) => `Non è stato possibile inviare il messaggio. Scrivimi direttamente a ${to}.`,
    mailto: (to: string) => `Dovrebbe aprirsi la tua app email con il messaggio pronto da inviare. Se non si apre nulla, scrivi a ${to}.`,
    subject: (name: string) => `Richiesta di progetto da ${name}`,
  },
  footer: { rights: 'Tutti i diritti riservati.', built: 'Progettato e sviluppato con', love: 'amore', top: 'Torna su' },
  toast: { linkMissing: 'Questo link non è ancora disponibile.', copied: 'Copiato', selected: 'Selezionato: premi ⌘C o Ctrl+C per copiare' },
  notFound: { label: 'Pagina non trovata', a: 'Questa pagina', b: 'non esiste.', home: 'Torna alla home' },
  meta: { projects: 'Progetti', projectsDesc: 'App, giochi ed esperimenti di Angelo Perera tra iOS, spatial computing, AI e web.', caseStudy: 'Case study', writing: 'Articoli e riflessioni' },
  device: { placeholder: 'Segnaposto', placeholderFor: 'Segnaposto per uno screenshot', screenshot: '' },
};

export const UI_STRINGS: Record<Lang, UI> = { en, it };
export const t = (lang: Lang) => UI_STRINGS[lang];
export type { UI };
