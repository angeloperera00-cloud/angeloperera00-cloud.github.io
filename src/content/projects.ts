import type { Project, Screenshot, DeviceKind } from './types';

/* ==========================================================================
   Projects
   --------------------------------------------------------------------------
   To add a project, copy one object, give it a unique `slug`, and fill what
   you have. Anything left empty is simply not rendered (or shows as a marked
   draft while `site.showPlaceholders` is true).

   Images live in /public/images/projects/<slug>/:
     cover.webp       ~1800×650 (≈2.8:1), used on cards and the case-study hero
     screen-1.webp …  native screenshots; use the device's real resolution
   ========================================================================== */

/** Empty screenshot slots, shown as labelled placeholders until you add `src`. */
const slots = (...devices: DeviceKind[]): Screenshot[] =>
  devices.map((device, i) => ({ device, alt: `Screenshot ${i + 1}` }));

export const projects: Project[] = [
  {
    slug: 'mtlab',
    title: 'MTLab',
    summary: 'A virtual mechanical engineering lab: explore and operate an interactive 3D lathe, on screen or in AR.',
    featured: true,
    order: 1,
    categories: ['spatial', 'ios'],
    platforms: ['iPad', 'iPhone'],
    chips: [
      { icon: 'b-apple', label: 'iPadOS & iOS' },
      { icon: 'i-cuboid', label: 'Augmented reality', line: true },
      { icon: 'b-swift-bird', label: 'Swift' },
    ],
    tech: [
      { icon: 'b-swift-bird', label: 'Swift' },
      { icon: 'i-cuboid', label: 'Augmented reality', line: true },
      { icon: 'i-box', label: '3D simulation', line: true },
    ],
    icon: { src: '/images/projects/mtlab/icon.png', alt: 'MTLab app icon' },
    accent: '#3A4DB0',
    cover: { src: '/images/projects/mtlab/cover.webp', alt: 'Two MTLab iPad screens: the 3D lathe placed in AR on a tiled floor, and the Manual Machines list' },
    year: '2026',
    screenshots: [
      {
        device: 'ipad',
        orientation: 'landscape',
        width: 1742,
        height: 1264,
        src: '/images/projects/mtlab/screen-1.webp',
        alt: 'MTLab placing a 3D lathe in augmented reality with Start Machine and Turning Operation controls',
        caption: 'AR lathe with machine controls',
      },
      {
        device: 'ipad',
        orientation: 'landscape',
        width: 1728,
        height: 1234,
        src: '/images/projects/mtlab/screen-2.webp',
        alt: 'MTLab Manual Machines screen listing the Lathe Machine module with its progress bar',
        caption: 'Manual Machines catalogue with progress tracking',
      },
    ],
    showcase: 1,
    caseStudy: {
      overview:
        'MTLab is a virtual mechanical engineering laboratory. It uses interactive 3D simulations to teach how industrial machines work, starting with the lathe, for mechanical engineering students, engineering colleges, industrial training institutes and technical educators.',
      problem: {
        paragraphs: [
          "Students learning how industrial machines work often get little hands-on time with real equipment: machines are expensive, shared and not always safe for beginners. From theory alone, it is hard to picture how parts like the chuck and the carriage actually move.",
        ],
      },
      role: {
        paragraphs: ["Developer on the team. I wrote the app's code: the interactive 3D lathe, the machine theory screens and the AR mode that places the machine in the room."],
      },
      solutions: {
        bullets: [
          'Interactive 3D lathe simulation.',
          'Guided machine theory with explanations of each part.',
          'Chuck rotation and carriage motion.',
          'Turning operation demonstration.',
          'AR visualization that places the machine in the room.',
        ],
      },
      results: {
        paragraphs: [
          'Live on the App Store in the Education category, free, for iPhone and iPad. Next on the roadmap: milling, drilling, CNC operations and more equipment.',
        ],
      },
    },
    links: { appStore: 'https://apps.apple.com/it/app/mtlab/id6760047220?l=en-GB' },
  },
  {
    slug: 'tennisland',
    title: 'TennisLand',
    summary: '3D tennis game for Apple TV, played with the Siri Remote.',
    featured: true,
    order: 2,
    categories: ['ios'],
    platforms: ['Apple TV'],
    chips: [
      { icon: 'i-tv', label: 'Apple TV', line: true },
      { icon: 'i-gamepad-2', label: 'Siri Remote controls', line: true },
      { icon: 'b-unity', label: 'Unity' },
      { icon: 'b-swift-bird', label: 'Swift' },
    ],
    tech: [
      { img: '/icons/unity.svg', label: 'Unity' },
      { img: '/icons/csharp.svg', label: 'C#' },
      { icon: 'b-swift-bird', label: 'Swift' },
      { icon: 'i-tv', label: 'tvOS', line: true },
    ],
    icon: { src: '/images/projects/tennisland/icon.png', alt: 'TennisLand app icon' },
    accent: '#C8E03A',
    cover: { src: '/images/projects/tennisland/cover.webp', alt: 'Aerial view of a blue tennis court inside a packed stadium' },
    screenshots: [
      { device: 'poster', width: 1448, height: 1086, src: '/images/projects/tennisland/screen-1.webp', alt: 'TennisLand gameplay on a TV next to an Apple TV and Siri Remote', caption: 'Played on Apple TV with the Siri Remote' },
      { device: 'poster', width: 1536, height: 1024, src: '/images/projects/tennisland/screen-2.webp', alt: 'TennisLand Apple TV home menu with Play, Challenges, Tournaments, Players and Settings', caption: 'Home: play, challenges, tournaments and players' },
      { device: 'poster', width: 1448, height: 1086, src: '/images/projects/tennisland/screen-3.webp', alt: 'A player in yellow hitting a backhand in the TennisLand stadium', caption: 'Stadium court' },
      { device: 'poster', width: 1448, height: 1086, src: '/images/projects/tennisland/screen-4.webp', alt: 'Baseline view across the net in the TennisLand stadium', caption: 'Baseline view' },
      { device: 'poster', width: 1800, height: 971, src: '/images/projects/tennisland/screen-5.webp', alt: 'Aerial view of the TennisLand stadium and court', caption: 'The arena' },
    ],
    showcase: 0,
    caseStudy: {
      overview:
        'TennisLand is a 3D tennis game for Apple TV, played on the big screen with the Siri Remote. Beyond matches, it brings challenges, tournaments and players together in one place.',
      problem: {
        paragraphs: [
          "Tennis games usually need a game controller or a phone screen. TennisLand set out to bring a full 3D tennis match to the living-room TV, playable with just the Siri Remote that comes with every Apple TV.",
        ],
      },
      role: {
        paragraphs: ["Developer on the team. I coded the game: the 3D court and stadium, the Siri Remote controls, and the menus for challenges, tournaments and players."],
      },
      solutions: {
        bullets: [
          'Full 3D stadium and court built for the TV screen.',
          'Played with the Siri Remote.',
          'Home menu with Play, Challenges, Tournaments, Players and Settings.',
          'Tournaments section to follow Grand Slam, ATP and WTA events.',
        ],
      },
      results: {
        paragraphs: ['Coming soon to the App Store on Apple TV.'],
      },
    },
    links: {},
  },

  {
    slug: 'propel',
    title: 'Propel',
    summary: 'LiDAR navigation for blind and low-vision people: haptic and sound alerts as obstacles get closer, plus spoken product labels.',
    order: 10,
    categories: ['spatial', 'ai', 'ios'],
    platforms: ['iPad', 'iPhone'],
    chips: [
      { icon: 'i-radar', label: 'LiDAR', line: true },
      { icon: 'i-scan-eye', label: 'Vision text recognition', line: true },
      { icon: 'b-swift-bird', label: 'Swift' },
    ],
    tech: [
      { icon: 'b-swift-bird', label: 'Swift' },
      { icon: 'b-swift', label: 'SwiftUI' },
      { icon: 'i-radar', label: 'LiDAR depth sensing', line: true },
      { icon: 'i-scan-eye', label: 'Vision text recognition', line: true },
      { icon: 'i-heart', label: 'Haptics & audio feedback', line: true },
    ],
    icon: { src: '/images/projects/propel/icon.png', alt: 'Propel app icon: a letter A with a white cane' },
    accent: '#3E8EDB',
    cover: { src: '/images/projects/propel/cover.webp', alt: 'Three Propel iPad screens: a close obstacle warning, a clear corridor and a scanned product label' },
    year: '2026',
    screenshots: [
      { device: 'ipad', width: 1536, height: 2049, src: '/images/projects/propel/screen-1.webp', alt: 'Propel Scan Space mode showing a clear corridor at 1.9 m, severity Far', caption: 'Scan Space: path clear, 1.9 m' },
      { device: 'ipad', width: 1536, height: 2049, src: '/images/projects/propel/screen-2.webp', alt: 'Propel Scan Space mode turned red with a wall 0.4 m away, severity Very Close', caption: 'Obstacle 0.4 m away: Stop' },
      { device: 'ipad', width: 1536, height: 2049, src: '/images/projects/propel/screen-3.webp', alt: 'Propel Read Label mode reading a drink can as FANTA zero sugar 330ml', caption: 'Read Label: product name and size spoken aloud' },
    ],
    caseStudy: {
      overview:
        'Propel helps blind and low-vision people move through space and shop independently. It uses the LiDAR scanner to measure the distance to whatever is ahead and turns it into haptic and sound feedback that grows stronger as an obstacle gets closer. In a supermarket, it reads product labels aloud, including the product name and size.',
      problem: {
        paragraphs: [
          'Getting around an unfamiliar space and identifying products on a shelf are everyday tasks that still depend heavily on sighted help. Propel was designed with the Italian blind community CIVES, building on their real experience of these situations.',
        ],
      },
      process: {
        paragraphs: [
          'Developed together with members of CIVES, whose feedback shaped how distance is communicated and how the two modes work. Created for the Swift Student Challenge 2025/26.',
        ],
      },
      role: {
        paragraphs: ["Developer on the team. I wrote the code for both modes: LiDAR distance sensing with haptic and sound feedback, and the camera label reader."],
      },
      solutions: {
        bullets: [
          'Scan Space: LiDAR depth sensing measures the distance to the nearest obstacle in real time.',
          'Three clear states (Clear, Caution, Stop) shown with colour and severity, from Far to Very Close.',
          'Haptic and sound feedback that intensifies as an object gets nearer, so it works without looking at the screen.',
          'Read Label: point the camera at a product to hear its name and size, for example the millilitres on a can.',
        ],
      },
    },
    links: {},
  },

  {
    slug: 'eyecheck',
    title: 'EyeCheck',
    summary: 'Understand your vision in minutes: AR eye-chart and colour perception tests on iPhone, with simple explanations of conditions like myopia.',
    featured: true,
    order: 3,
    categories: ['spatial', 'ios'],
    platforms: ['iPhone'],
    chips: [
      { icon: 'b-apple', label: 'iOS' },
      { icon: 'i-cuboid', label: 'Augmented reality', line: true },
      { icon: 'i-eye', label: 'Vision tests', line: true },
      { icon: 'b-swift-bird', label: 'Swift' },
    ],
    tech: [
      { icon: 'b-swift-bird', label: 'Swift' },
      { icon: 'i-cuboid', label: 'Augmented reality', line: true },
    ],
    icon: { src: '/images/projects/eyecheck/icon.png', alt: 'EyeCheck app icon: a stylised blue eye with a measuring dial' },
    accent: '#2B8FE0',
    cover: { src: '/images/projects/eyecheck/cover.webp', alt: 'Five EyeCheck iPhone screens: home, consent, AR eye chart, AR glasses and results' },
    screenshots: [
      { device: 'iphone', width: 1000, height: 2167, island: false, src: '/images/projects/eyecheck/screen-1.webp', alt: 'EyeCheck home: Start Visual Test and Start Color Perception Test', caption: 'Understand your vision in minutes' },
      { device: 'iphone', width: 1000, height: 2167, island: false, src: '/images/projects/eyecheck/screen-2.webp', alt: 'EyeCheck consent and setup screen explaining results are informational only', caption: 'Consent & setup: educational use only' },
      { device: 'iphone', width: 1000, height: 2040, src: '/images/projects/eyecheck/screen-3.webp', alt: 'A Snellen eye chart placed in AR on a table, with a blur slider', caption: 'AR eye chart placement' },
      { device: 'iphone', width: 1000, height: 1843, src: '/images/projects/eyecheck/screen-4.webp', alt: 'Virtual glasses placed in AR on a table', caption: 'AR glasses placement' },
      { device: 'iphone', width: 1000, height: 2167, island: false, src: '/images/projects/eyecheck/screen-5.webp', alt: 'Vision Analysis Myopia screen with an eye diagram and correction slider', caption: 'Vision analysis: myopia explained' },
      { device: 'iphone', width: 1000, height: 2167, island: false, src: '/images/projects/eyecheck/screen-6.webp', alt: 'EyeCheck results screen with Retake Test and Share buttons', caption: 'Results, retake and share' },
    ],
    caseStudy: {
      overview:
        'EyeCheck helps people understand their vision in a fun, interactive way. It places a real-size eye chart and virtual glasses in the room with augmented reality, runs a visual test and a colour perception test, and explains conditions such as myopia with interactive diagrams. It is built for everyone and is clearly framed as an educational tool, not a substitute for a professional eye exam.',
      problem: {
        paragraphs: [
          "Many people only think about their eyesight at an eye exam, and terms like myopia are hard to picture. There was room for a friendly, interactive way to try a vision test at home and understand what it means, while making clear it does not replace a professional exam.",
        ],
      },
      role: {
        paragraphs: ["Developer on the team. I coded the AR eye chart and glasses placement, the visual and colour perception tests, and the vision analysis screens."],
      },
      solutions: {
        bullets: [
          'Visual test with a Snellen eye chart placed in AR, and a slider to simulate blur.',
          'Colour perception test.',
          'AR glasses placement to see how a correction lens changes the view.',
          'Vision analysis screens that explain myopia, with a slider showing how a lens moves the focus point back to the retina.',
          'Consent and setup step: informational use only, plus guidance on lighting and space for AR.',
          'Results screen with Retake Test and Share EyeCheck with Friends.',
        ],
      },
    },
    links: {},
  },

  {
    slug: 'stikar',
    title: 'StikAR',
    summary: 'Leave stickers in AR: drop virtual stickers in real places, then come back to find them again.',
    featured: true,
    order: 4,
    categories: ['spatial', 'ios'],
    platforms: ['iPad', 'iPhone'],
    chips: [
      { icon: 'i-cuboid', label: 'Augmented reality', line: true },
      { icon: 'i-map-pin', label: 'Location zones', line: true },
      { icon: 'b-swift-bird', label: 'Swift' },
    ],
    tech: [
      { icon: 'b-swift-bird', label: 'Swift' },
      { icon: 'i-cuboid', label: 'Augmented reality', line: true },
      { icon: 'i-map-pin', label: 'Location zones', line: true },
    ],
    icon: { src: '/images/projects/stikar/icon.png', alt: 'StikAR app icon' },
    accent: '#6CC24A',
    cover: { src: '/images/projects/stikar/cover.webp', alt: 'Three StikAR App Store screenshots: choosing stickers, connecting with people nearby and finding memories left by others' },
    year: '2026',
    screenshots: [
      { device: 'poster', width: 852, height: 1124, src: '/images/projects/stikar/screen-1.webp', alt: 'StikAR title screen: Drop stickers into the real world', caption: 'Drop stickers into the real world' },
      { device: 'poster', width: 836, height: 1120, src: '/images/projects/stikar/screen-2.webp', alt: 'iPad showing the StikAR sticker picker over the camera view', caption: 'Choose among 15+ different stickers' },
      { device: 'poster', width: 832, height: 1120, src: '/images/projects/stikar/screen-3.webp', alt: 'A pixel heart sticker placed in AR above Naples rooftops', caption: 'Connect with people around you' },
      { device: 'poster', width: 844, height: 1122, src: '/images/projects/stikar/screen-4.webp', alt: 'A pixel finger-heart sticker left by another user, seen on iPad', caption: 'See the memories other people left before you' },
    ],
    caseStudy: {
      overview:
        'StikAR lets people place virtual stickers in real locations and find them again later. It is built around simple, playful spatial interaction and a shared experience: sign in with just a username, drop stickers into the world, and return to a zone to see them reappear.',
      problem: {
        paragraphs: [
          "Sharing a moment usually means a post that disappears in a feed. StikAR asks a different question: what if you could leave something in the place itself, for friends or strangers to discover when they get there?",
        ],
      },
      role: {
        paragraphs: ["Developer on a five-person team, credited on the App Store listing. I wrote code for the AR sticker experience: placing stickers in real places, reloading them in a zone, and moving and resizing them."],
      },
      solutions: {
        bullets: [
          'Drop stickers into the real world with AR, choosing from 15+ pixel-art stickers.',
          'Return to a zone to reload stickers placed there earlier.',
          'Reposition and resize stickers in space.',
          'Use the app with only a username.',
          'Photo Mode: take personal photos and place them in AR.',
        ],
      },
      results: {
        paragraphs: [
          'Live on the App Store for iPhone and iPad, free, in the Social Networking category. Version 1.0 shipped on 20 March; version 1.1 added Photo Mode on 6 May. Supports VoiceOver.',
        ],
      },
    },
    links: { appStore: 'https://apps.apple.com/it/app/stikar/id6759322534?l=en-GB' },
  },
  {
    slug: 'wanderly',
    title: 'Wanderly',
    summary: 'Your smart travel companion for discovering places, planning trips and exploring the world.',
    order: 5,
    categories: ['ios'],
    platforms: ['iPhone'],
    chips: [
      { icon: 'b-apple', label: 'iOS' },
      { icon: 'i-globe', label: 'Travel discovery', line: true },
      { icon: 'b-swift-bird', label: 'Swift' },
    ],
    tech: [
      { icon: 'b-swift-bird', label: 'Swift' },
      { icon: 'b-swift', label: 'SwiftUI' },
    ],
    icon: { src: '/images/projects/wanderly/icon.png', alt: 'Wanderly app icon' },
    accent: '#F28A2E',
    cover: { src: '/images/projects/wanderly/cover.webp', alt: 'Five Wanderly iPhone screens: Discover, Explore, Profile and Saved' },
    screenshots: [
      { device: 'iphone', width: 290, height: 598, src: '/images/projects/wanderly/screen-1.webp', alt: 'Wanderly Discover screen with search, category filters and trending Machu Picchu', caption: 'Discover trending destinations' },
      { device: 'iphone', width: 286, height: 600, src: '/images/projects/wanderly/screen-2.webp', alt: 'Wanderly Explore screen listing countries by continent', caption: 'Explore 88 countries by continent' },
      { device: 'iphone', width: 290, height: 600, src: '/images/projects/wanderly/screen-3.webp', alt: 'Wanderly Discover screen with Santorini trending and top-rated places', caption: 'Trending now and top rated' },
      { device: 'iphone', width: 288, height: 600, src: '/images/projects/wanderly/screen-4.webp', alt: 'Wanderly Italy country page with top places such as the Amalfi Coast', caption: 'Country pages with top places' },
      { device: 'iphone', width: 282, height: 598, src: '/images/projects/wanderly/screen-5.webp', alt: 'Wanderly Saved list of five places with ratings', caption: 'Save places for later' },
      { device: 'iphone', width: 286, height: 598, src: '/images/projects/wanderly/screen-6.webp', alt: 'Wanderly Profile with travel stats, badges and a digital passport', caption: 'Badges and a digital passport' },
    ],
    caseStudy: {
      problem: {
        paragraphs: [
          "Planning a trip often means jumping between search, maps, notes and social media. Wanderly brings discovering places, saving ideas and keeping track of where you have been into one app.",
        ],
      },
      role: {
        paragraphs: ["Developer on the team. I coded the app's screens and features: Discover, Explore by country, Saved places and the Profile with badges and a digital passport."],
      },
      solutions: {
        bullets: [
          'Discover tab with destination search, category filters (beaches, mountains, cultural), trending and top-rated places.',
          'Explore tab covering 88 countries, filterable by continent.',
          'Country pages with their top places and ratings.',
          'Saved list to collect places for future trips.',
          'Profile with travel stats, achievement badges and a digital passport of visited countries.',
        ],
      },
    },
    links: {},
  },


  {
    slug: 'v-fit',
    title: 'V Fit',
    summary: 'AI gym and recovery coach: on-device body scans, posture scores and workouts that adapt to how recovered each muscle is.',
    order: 6,
    categories: ['ios', 'ai'],
    platforms: ['iPhone'],
    chips: [
      { icon: 'b-apple', label: 'iOS' },
      { icon: 'i-scan-eye', label: 'Vision framework', line: true },
      { icon: 'i-brain', label: 'On-device AI', line: true },
      { icon: 'b-swift-bird', label: 'Swift' },
    ],
    tech: [
      { icon: 'b-swift-bird', label: 'Swift' },
      { icon: 'b-swift', label: 'SwiftUI' },
      { icon: 'i-scan-eye', label: 'Vision framework', line: true },
      { icon: 'i-brain', label: 'On-device AI', line: true },
    ],
    icon: { src: '/images/projects/vfit/icon.png', alt: 'V Fit app icon' },
    accent: '#C6F432',
    cover: { src: '/images/projects/vfit/cover.webp', alt: 'Five V Fit App Store screenshots fanned on a dark lime background: daily plan, workout, recovery, body twin and posture' },
    year: '2026',
    screenshots: [
      { device: 'poster', width: 386, height: 868, src: '/images/projects/vfit/screen-1.webp', alt: 'V Fit home with today\'s plan and recovery, sleep, soreness and hydration overview', caption: 'Your training, adapted daily' },
      { device: 'poster', width: 388, height: 860, src: '/images/projects/vfit/screen-2.webp', alt: 'V Fit workout list for Lower Body B', caption: 'Follow a plan built for you' },
      { device: 'poster', width: 390, height: 858, src: '/images/projects/vfit/screen-3.webp', alt: 'V Fit recovery score and per-muscle recovery forecast', caption: 'Train when muscles are ready' },
      { device: 'poster', width: 396, height: 870, src: '/images/projects/vfit/screen-4.webp', alt: 'V Fit body twin with muscle readiness map, body type and symmetry', caption: 'Understand your body' },
      { device: 'poster', width: 388, height: 862, src: '/images/projects/vfit/screen-5.webp', alt: 'V Fit posture score with front body scan landmarks', caption: 'Improve your posture' },
      { device: 'poster', width: 386, height: 870, src: '/images/projects/vfit/screen-6.webp', alt: 'V Fit set logging screen with weight and reps controls', caption: 'Log sets without breaking focus' },
    ],
    caseStudy: {
      overview:
        'V Fit is an AI gym and recovery tracker for people working toward a leaner physique, more muscle or better movement. It scans the body with the iPhone camera and Apple\'s Vision framework, tracks how recovered each muscle group is, and builds workouts around that readiness. Scans are processed on-device, it needs no account, and no subscription.',
      role: {
        paragraphs: ['Solo project: I designed, built and published the app on the App Store under my own developer account.'],
      },
      problem: {
        paragraphs: [
          "Most workout apps give you the same plan whether you slept badly or your legs are still sore. People who train seriously need to know which muscles are recovered and how their posture and symmetry change, without sending body photos to a server.",
        ],
      },
      solutions: {
        bullets: [
          'Camera body scan with Vision: posture score, shoulder alignment, hip tilt, knee and ankle position, and muscle symmetry.',
          'Body twin that tracks body type, muscle symmetry and posture trends over time.',
          'Per-muscle recovery tracking from sleep, soreness, hydration and training history.',
          'AI-generated workout splits based on goal, fitness level and days per week.',
          'Progressive overload suggestions drawn from training history.',
          'Private by design: on-device processing, no account, no data sent to servers.',
        ],
      },
      results: {
        paragraphs: ['Live on the App Store for iPhone in Health & Fitness, free with no subscription, rated 5.0.'],
      },
    },
    links: { appStore: 'https://apps.apple.com/it/app/v-fit-gym-recovery-coach/id6790101371?l=en-GB' },
  },

  {
    slug: 'country-dash',
    title: 'Country Dash',
    summary: 'Geo Quiz: guess countries from their flag or map shape in 5 seconds, build streaks and unlock badges.',
    order: 7,
    categories: ['ios'],
    platforms: ['iPhone'],
    chips: [
      { icon: 'b-apple', label: 'iOS' },
      { icon: 'i-globe', label: 'Geography quiz', line: true },
      { icon: 'b-swift-bird', label: 'Swift' },
    ],
    tech: [
      { icon: 'b-swift-bird', label: 'Swift' },
      { icon: 'b-swift', label: 'SwiftUI' },
    ],
    icon: { src: '/images/projects/country-dash/icon.png', alt: 'Country Dash app icon: a smiling globe explorer with a compass' },
    accent: '#3A7BEA',
    cover: { src: '/images/projects/country-dash/cover.webp', alt: 'Four Country Dash App Store screenshots: home, game modes, map challenge and badges' },
    screenshots: [
      { device: 'poster', width: 820, height: 1774, src: '/images/projects/country-dash/screen-1.webp', alt: 'Country Dash home with level, best score, streak and Start Game', caption: 'Start the challenge' },
      { device: 'poster', width: 820, height: 1774, src: '/images/projects/country-dash/screen-2.webp', alt: 'Game modes: Flag, Map, Mixed and 60 Second Rush', caption: 'Choose your game mode' },
      { device: 'poster', width: 820, height: 1774, src: '/images/projects/country-dash/screen-3.webp', alt: 'Map Challenge asking which country is highlighted, with Brazil shown', caption: 'Test your map skills' },
      { device: 'poster', width: 820, height: 1774, src: '/images/projects/country-dash/screen-4.webp', alt: 'Badges screen with 12 badges to earn', caption: 'Earn badges, challenge yourself' },
    ],
    caseStudy: {
      overview:
        'Country Dash is a fast geography quiz for iPhone. Every question gives you 5 seconds to name a country, from well-known ones to the obscure. Short rounds make it easy to play in a spare minute, and there is no account to create.',
      role: {
        paragraphs: ['Solo project: designed, built and published on the App Store under my own developer account.'],
      },
      problem: {
        paragraphs: [
          "Geography quizzes often feel slow or like homework. Country Dash makes learning countries quick and addictive: 5 seconds per question and short rounds you can play in a spare minute.",
        ],
      },
      solutions: {
        bullets: [
          'A 5-second timer on every question.',
          'Four modes: Flag Challenge, Map Challenge, Mixed Challenge and 60 Second Rush.',
          'Streaks and high scores; one wrong answer resets the streak.',
          'Levels, XP, accuracy stats and 12 badges to unlock.',
          'A fun fact after each answer.',
          'No account required.',
        ],
      },
      results: {
        paragraphs: ['Live on the App Store for iPhone in the Trivia category, free, rated 4+.'],
      },
    },
    links: { appStore: 'https://apps.apple.com/it/app/country-dash-geo-quiz/id6787658865?l=en-GB' },
  },
  {
    slug: 'poop-run',
    title: 'Poop Run',
    summary: 'An endless 3D runner: dodge obstacles down a tree-lined road as the speed keeps climbing.',
    order: 8,
    categories: [],
    platforms: [],
    chips: [
      { icon: 'i-gamepad-2', label: 'Game', line: true },
    ],
    tech: [],
    icon: { src: '/images/projects/poop-run/icon.png', alt: 'Poop Run game icon' },
    accent: '#2C63E0',
    cover: { src: '/images/projects/poop-run/cover.webp', alt: 'The Poop Run logo between two gameplay screens of the runner on a tree-lined road' },
    screenshots: [
      { device: 'poster', width: 1254, height: 1254, src: '/images/projects/poop-run/screen-1.webp', alt: 'The runner jumping over obstacles, score 95 and speed 14', caption: 'Jump the obstacles' },
      { device: 'poster', width: 1254, height: 1254, src: '/images/projects/poop-run/screen-2.webp', alt: 'The runner on the road with obstacles ahead, score 61 and speed 13', caption: 'Score and speed keep climbing' },
    ],
    caseStudy: {
      overview:
        'Poop Run is an endless 3D runner. The player races down a tree-lined road, jumping and switching lanes to dodge obstacles while the score and speed keep going up.',
      problem: {
        paragraphs: [
          "Endless runners are perfect for quick sessions, but many of them feel the same. Poop Run gives the genre a funny theme and simple controls: run, jump and dodge while the speed keeps climbing.",
        ],
      },
      role: {
        paragraphs: ["Developer on the team. I coded the game: the endless road, lane switching and jumping, the obstacles, and the score and speed system."],
      },
      solutions: {
        bullets: [
          'Endless 3D road with trees and street lamps.',
          'Jump and dodge obstacles across the lanes.',
          'Live score and speed counters.',
        ],
      },
    },
    links: { video: 'https://www.youtube.com/shorts/1W0UyTt0Uvc' },
  },

  {
    slug: 'coachplan',
    title: 'CoachPlan',
    summary: 'An app for personal trainers: build workout plans and weekly nutrition plans for each client, then export them in one tap.',
    order: 9,
    categories: ['ios'],
    platforms: ['iPhone'],
    chips: [
      { icon: 'b-apple', label: 'iOS' },
      { icon: 'b-swift', label: 'SwiftUI' },
      { icon: 'i-users', label: 'Client plans', line: true },
      { icon: 'i-calendar', label: 'Weekly planner', line: true },
    ],
    tech: [
      { icon: 'b-swift-bird', label: 'Swift' },
      { icon: 'b-swift', label: 'SwiftUI' },
    ],
    icon: { src: '/images/projects/coachplan/icon.png', alt: 'CoachPlan app icon: a white dumbbell over a green leaf' },
    accent: '#2FA866',
    cover: { src: '/images/projects/coachplan/cover.webp', alt: 'Three CoachPlan iPhone screens on a green background: home, workout plan and nutrition plan' },
    screenshots: [
      { device: 'poster', width: 651, height: 1201, src: '/images/projects/coachplan/screen-1.webp', alt: 'CoachPlan home with the selected client and two actions: create a workout plan or a nutrition plan', caption: 'Pick a client, then create' },
      { device: 'poster', width: 645, height: 1207, src: '/images/projects/coachplan/screen-2.webp', alt: 'Workout plan for Monday with exercises, sets, reps, rest and photos', caption: 'Exercises, sets, reps and rest' },
      { device: 'poster', width: 697, height: 1207, src: '/images/projects/coachplan/screen-3.webp', alt: 'Weekly nutrition plan grid with meals from breakfast to before bed for each day', caption: 'A full week of meals' },
    ],
    caseStudy: {
      overview:
        'CoachPlan is built for personal trainers. From one home screen the trainer picks a client and creates either a workout plan or a weekly nutrition plan, then exports it to share with the client.',
      problem: {
        paragraphs: [
          "Personal trainers often build workout and nutrition plans in spreadsheets, notes or chat messages, which is slow and easy to mix up between clients. CoachPlan keeps both plans for every client in one place and exports them in one tap.",
        ],
      },
      role: {
        paragraphs: ["Developer on the team. I coded the app: client selection, the workout plan builder, the weekly nutrition grid and export."],
      },
      solutions: {
        bullets: [
          'Client selector on every screen, so each plan belongs to one client.',
          'Workout plans by day: add exercises manually with sets, reps, rest time and a photo.',
          'Nutrition plans as a weekly grid: breakfast, snacks, lunch, dinner and before bed, Monday to Sunday.',
          'Optional notes on each plan and one-tap Export.',
        ],
      },
    },
    links: {},
  },

  /* ---- Reserved slots: replace each with a real project (delete `placeholder`). ---- */
  ...[11].map<Project>((n) => ({
    slug: `project-${String(n).padStart(2, '0')}`,
    title: `Project ${String(n).padStart(2, '0')}`,
    summary: 'Reserved slot. Add the title, summary, cover, screenshots and case study in src/content/projects.ts.',
    placeholder: true,
    order: n,
    categories: [],
    platforms: [],
    chips: [],
    tech: [],
    icon: { monogram: String(n).padStart(2, '0'), background: '#141415', color: '#77746F' },
    accent: '#5B5854',
    screenshots: [],
    caseStudy: {},
    links: {},
  })),
];
