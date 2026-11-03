import type { IconName } from '@/components/icons/sprite';

/* ==========================================================================
   Profile content for the home page sections (copy from your design).
   ========================================================================== */

export const hero = {
  eyebrow: 'iOS. WEB. GAME.',
  titleLines: ['Developer', 'Building', 'Digital', 'Experiences'],
  roles: ['iOS Engineer', 'Full-Stack Engineer'],
  rolesLine2: 'Content Creator & Digital Marketer',
  availability: ['Available for', 'freelance & full-time'],
};

export const about = {
  headline: ['I turn complex', 'ideas into', 'real solutions.'],
  paragraphs: [
    "I'm Angelo Perera, an iOS, Web & Game Developer with 5+ years of freelance experience creating fast, accessible and meaningful digital products. I love turning ideas into real-world solutions that people enjoy using.",
    "Currently, I'm attending the Apple Developer Academy at the University of Naples Federico II, where I'm constantly pushing my limits and building next-generation apps.",
  ],
  tagline: ['Developer', 'Creator', 'Problem solver'],
  quote: "Code is not just what I do, it's how I solve problems, express ideas and create impact.",
  stats: [
    { icon: 'i-calendar', count: 5, suffix: '+', label: 'Years experience', text: 'Building high quality apps, games and web solutions.' },
    { icon: 'i-box', count: 100, suffix: '+', label: 'Apps delivered', text: 'Published on App Store with thousands of happy users.' },
    { icon: 'i-users', count: 121, suffix: 'K+', label: 'YouTube subscribers', text: 'Grown since 2021 with 635K+ hours of watch time.' },
    { icon: 'i-square-play', count: 153, suffix: 'M+', label: 'YouTube views', text: 'Creating content that educates, inspires and entertains.' },
    { icon: 'i-graduation-cap', value: 'Apple', label: 'Developer Academy', text: 'Selected for the prestigious Apple Developer Academy (Naples, Italy).' },
    { icon: 'i-target', count: 1, suffix: '', label: 'Goal', text: 'To build impactful products and make a positive difference.' },
  ] as { icon: IconName; count?: number; suffix?: string; value?: string; label: string; text: string }[],
};

export const experience = [
  {
    date: '2021 – Present',
    icon: 'i-smartphone' as IconName,
    title: 'iOS Developer',
    org: 'Freelancer',
    points: [
      'Developed 100+ native iOS applications for international clients.',
      'Built high performance, scalable and user-friendly apps.',
      'Integrated REST APIs, Firebase, and modern frameworks.',
      'Focused on clean architecture and best coding practices.',
    ],
    tags: ['Swift', 'SwiftUI', 'UIKit', 'Firebase', 'REST APIs', 'CoreData'],
  },
  {
    date: '2021 – Present',
    icon: 'i-square-play' as IconName,
    title: 'YouTube Creator & Digital Marketer',
    org: 'YouTube',
    points: [
      'Grew my channel to 121K+ subscribers and 153M+ views.',
      'Created educational and tech content about iOS and development.',
      'Specialized in Shorts strategy, SEO and audience growth.',
    ],
    tags: ['YouTube', 'Shorts', 'SEO', 'Content Strategy', 'Analytics'],
  },
];

/** Skill tile: brand image, sprite glyph tinted with a color, or a monogram tile. */
export type SkillTile =
  | { label: string; img: string }
  | { label: string; glyph: IconName; color: string; line?: boolean }
  | { label: string; mono: string; bg: string; color: string; word?: boolean }
  | { label: string; monoGlyph: IconName; bg: string; color: string };

const img = (label: string, file: string): SkillTile => ({ label, img: `/icons/${file}.svg` });

export const skills: { title: string; tiles: SkillTile[] }[] = [
  {
    title: 'Apple Ecosystem',
    tiles: [
      img('Swift', 'swift'),
      { label: 'SwiftUI', glyph: 'b-swift', color: '#1D8CF8' },
      { label: 'UIKit', mono: 'UI', bg: '#0B1230', color: '#5FA8FF' },
      { label: 'ARKit', glyph: 'i-scan-eye', color: '#7A5CFA', line: true },
      { label: 'RealityKit', glyph: 'i-box', color: '#E5A100', line: true },
      { label: 'VisionOS', mono: 'vision', bg: '#0B0B0F', color: '#fff', word: true },
      { label: 'CoreData', glyph: 'i-database', color: '#2E7CF6', line: true },
      { label: 'CoreMotion', glyph: 'i-rotate-3d', color: '#19A974', line: true },
      { label: 'HealthKit', glyph: 'i-heart-fill', color: '#FF2D55' },
      { label: 'WatchKit', monoGlyph: 'i-watch', bg: '#0B0B0F', color: '#fff' },
      { label: 'SwiftData', glyph: 'i-layers', color: '#F05138', line: true },
      { label: 'Swift Package Manager', glyph: 'i-package', color: '#A0763B', line: true },
      { label: 'CloudKit', glyph: 'i-cloud', color: '#2E8CF6', line: true },
      { label: 'SharePlay', glyph: 'i-users', color: '#34C759', line: true },
      { label: 'Game Center', glyph: 'i-trophy', color: '#FF2D55', line: true },
      { label: 'Sign in with Apple', monoGlyph: 'b-apple', bg: '#000', color: '#fff' },
      { label: 'Swift Playgrounds', glyph: 'b-swift', color: '#F05138' },
    ],
  },
  {
    title: 'Frontend & Backend',
    tiles: [
      { label: 'SwiftUI', glyph: 'b-swift', color: '#1D8CF8' },
      img('JavaScript', 'javascript'),
      img('TypeScript', 'typescript'),
      img('HTML', 'html5'),
      img('CSS', 'css3'),
      img('Firebase', 'firebase'),
      { label: 'REST API', glyph: 'i-braces', color: '#2FB35A', line: true },
      img('Supabase', 'supabase'),
      img('Node.js', 'nodejs'),
      { label: 'Stripe', glyph: 'b-stripe', color: '#635BFF' },
      img('C', 'c'),
      img('C++', 'cplusplus'),
      img('MongoDB', 'mongodb'),
      img('AWS', 'aws'),
      img('Discord.js', 'discordjs'),
    ],
  },
  {
    title: 'Game Development',
    tiles: [
      img('Unity', 'unity'),
      img('C#', 'csharp'),
      { label: 'SpriteKit', glyph: 'i-shapes', color: '#2E7CF6', line: true },
      { label: 'Physics', glyph: 'i-atom', color: '#5B5F6B', line: true },
      { label: 'AI', glyph: 'i-brain', color: '#C251E0', line: true },
      { label: 'Animation', glyph: 'i-person-standing', color: '#1D8CF8', line: true },
      { label: 'Particle System', glyph: 'i-sparkles', color: '#8E5CF6', line: true },
      { label: 'Game Design', glyph: 'i-gamepad-2', color: '#2B3A67', line: true },
      img('Git', 'git'),
      { label: 'Plastic SCM', glyph: 'i-git-branch', color: '#F05A28', line: true },
    ],
  },
  {
    title: 'AI & Emerging Tech',
    tiles: [
      { label: 'Machine Learning', mono: 'ML', bg: '#0E1D2A', color: '#4FD1C5' },
      { label: 'Vision Framework', glyph: 'i-eye', color: '#2E7CF6', line: true },
      { label: 'Spatial Computing', monoGlyph: 'i-cuboid', bg: '#0B0B0F', color: '#fff' },
      { label: 'LiDAR', glyph: 'i-radar', color: '#2E7CF6', line: true },
      { label: 'Computer Vision', glyph: 'i-scan-eye', color: '#0D0D0D', line: true },
      { label: 'Natural Language Processing', glyph: 'i-message-square-text', color: '#10A37F', line: true },
      { label: 'Core ML', mono: 'ML', bg: 'linear-gradient(145deg,#38D1C2,#1E8F8A)', color: '#fff' },
      { label: 'Create ML', mono: 'ML', bg: 'linear-gradient(145deg,#7CC2FF,#3D7BF5)', color: '#fff' },
      { label: 'AR', glyph: 'i-cuboid', color: '#7A5CFA', line: true },
      { label: 'Cybersecurity', glyph: 'i-shield-check', color: '#2E5BFF', line: true },
      { label: 'Apple Intelligence', mono: '✦', bg: 'linear-gradient(145deg,#FF9F45,#E84FD3 55%,#5B7CFA)', color: '#fff' },
      { label: 'Foundation Models', glyph: 'i-atom', color: '#30B07A', line: true },
    ],
  },
  {
    title: 'Tools & Platforms',
    tiles: [
      img('Xcode', 'xcode'),
      img('GitHub', 'github'),
      img('Git', 'git'),
      img('Figma', 'figma'),
      img('Postman', 'postman'),
      img('Trello', 'trello'),
      img('Notion', 'notion'),
      img('VS Code', 'vscode'),
      img('Docker', 'docker'),
    ],
  },
  {
    title: 'Design & Creative',
    tiles: [
      img('Figma', 'figma'),
      img('Adobe XD', 'xd'),
      img('Photoshop', 'photoshop'),
      img('Illustrator', 'illustrator'),
      img('Premiere Pro', 'premierepro'),
      img('After Effects', 'aftereffects'),
      { label: 'Lightroom', mono: 'Lr', bg: '#001E36', color: '#31A8FF' },
      img('Blender', 'blender'),
      { label: 'InDesign', mono: 'Id', bg: '#49021F', color: '#FF3366' },
      img('Canva', 'canva'),
    ],
  },
];

export const skillKpis = [
  { icon: 'i-code' as IconName, count: 70, suffix: '+', label: 'Technologies' },
  { icon: 'i-layers' as IconName, count: 6, suffix: '+', label: 'Categories' },
  { icon: 'i-rocket' as IconName, count: 100, suffix: '+', label: 'Projects built' },
];

export const builtWith: { icon: IconName; label: string; line?: boolean }[] = [
  { icon: 'b-swift-bird', label: 'Swift' },
  { icon: 'b-swift-bird', label: 'SwiftUI' },
  { icon: 'i-scan-eye', label: 'ARKit', line: true },
  { icon: 'i-box', label: 'RealityKit', line: true },
  { icon: 'i-glasses', label: 'VisionOS', line: true },
  { icon: 'b-unity', label: 'Unity' },
  { icon: 'b-firebase', label: 'Firebase' },
  { icon: 'b-figma', label: 'Figma' },
];

export const education = {
  years: '2024 – 2026',
  status: 'Currently attending',
  title: 'Apple Developer Academy',
  institution: 'University of Naples Federico II · Naples, Italy',
  description:
    'Intensive program focused on iOS development, teamwork, design and building real world apps with Apple technologies.',
  focus: ['iOS Development', 'Teamwork', 'Design', 'Apple Technologies'],
};

export type CertLogo = 'academy' | 'udemy' | 'harvard' | 'javascript' | 'swift' | 'webdev';

export const certifications: { id: string; logo: CertLogo; years: string; title: string; issuer: string; text: string }[] = [
  { id: 'apple-academy', logo: 'academy', years: '2024 – 2026', title: 'Apple Developer Academy', issuer: 'University of Naples Federico II', text: 'Intensive program focused on iOS development, teamwork, design and building real world apps with Apple technologies.' },
  { id: 'udemy-se', logo: 'udemy', years: '2020', title: 'Software Engineering Diploma', issuer: 'Udemy', text: 'Comprehensive diploma covering software engineering principles, data structures, algorithms and system design.' },
  { id: 'cs50', logo: 'harvard', years: '2024', title: 'CS50: Introduction to Computer Science', issuer: 'Harvard University', text: "Completed CS50 – Harvard's introduction to computer science covering programming, algorithms and more." },
  { id: 'fcc-js', logo: 'javascript', years: '2024', title: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', text: 'Certified in JavaScript algorithms and data structures building logic and problem solving skills.' },
  { id: 'udemy-ios', logo: 'swift', years: '2023', title: 'Junior iOS App Developer Course', issuer: 'Udemy', text: 'Focused on Swift, SwiftUI, iOS development, app architecture and building real world iOS projects.' },
  { id: 'webdev-bootcamp', logo: 'webdev', years: '2022', title: 'The Web Development Bootcamp', issuer: 'Udemy', text: 'Full stack web development course covering HTML, CSS, JavaScript, Node.js, React and databases.' },
];

export const youtube = {
  lede: 'I create educational and tech content about iOS and development, with a focus on Shorts strategy, SEO and audience growth.',
  tags: ['YouTube', 'Shorts', 'SEO', 'Content Strategy', 'Analytics'],
  stats: [
    { count: 153, suffix: 'M+', label: 'Total views', exact: '153,090,644 views' },
    { count: 121, suffix: 'K+', label: 'Subscribers', exact: '+121.1K subscribers' },
    { count: 635, suffix: 'K+', label: 'Hours watched', exact: '635.8K hours of watch time' },
  ],
  since: 'June 2021',
  points: [
    'Grew the channel to 121K+ subscribers and 153M+ views since June 2021.',
    'Created educational and tech content about iOS and development.',
    'Specialized in Shorts strategy, SEO and audience growth.',
  ],
};
