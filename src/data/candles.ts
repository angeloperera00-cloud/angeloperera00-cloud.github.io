import daisyBud from "@/assets/glow-daisy-bud.jpg";
import peonyM from "@/assets/glow-peony-m.jpg";
import peonyL from "@/assets/glow-peony-l.jpg";
import tulipBouquet from "@/assets/glow-tulip-bouquet.jpg";
import templeFlower from "@/assets/glow-temple-flower.jpg";
import daisyFlower from "@/assets/glow-daisy-flower.jpg";
import tulip from "@/assets/glow-tulip.jpg";
import rose from "@/assets/glow-rose.jpg";
import roseBud from "@/assets/glow-rose-bud.jpg";
import yarnBall from "@/assets/glow-yarn-ball.jpg";
import swirlingWave from "@/assets/glow-swirling-wave.jpg";
import heartBear from "@/assets/glow-heart-bear.jpg";
import angelGirl from "@/assets/glow-angel-girl.jpg";
import angelBoy from "@/assets/glow-angel-boy.jpg";
import angelBless from "@/assets/glow-angel-bless.jpg";
import bubbleSmall from "@/assets/glow-bubble-small.jpg";
import bubble from "@/assets/glow-bubble.jpg";
import heart from "@/assets/glow-heart.jpg";
import cylinderS from "@/assets/glow-cylinder-s.jpg";
import cylinderL from "@/assets/glow-cylinder-l.jpg";

export interface CandleSize {
  label: string;
  weight: string; // dimensions string
  price: number;
}

export interface CandleProduct {
  slug: string;
  name: string;
  notes: string; // dimensions summary shown under name
  price: number;
  image: string;
  description: string;
  sizes: CandleSize[];
}

export const availableFragrances = [
  "Madagascar Vanilla",
  "Rose Garden",
  "Ocean Breeze",
  "Frangipani & Lime",
];

export const availableColours = [
  "Light Blue",
  "Beige",
  "White",
  "Black",
  "Green",
  "Dark Blue",
  "Violet",
  "Red",
  "Pink",
];

const oneSize = (label: string, dims: string, price: number): CandleSize[] => [
  { label, weight: dims, price },
];

export const candles: CandleProduct[] = [
  {
    slug: "daisy-bud",
    name: "Daisy Bud",
    notes: "3.3 x 4.5 cm",
    price: 1.5,
    image: daisyBud,
    description:
      "A petite daisy bud candle, perfect as a delicate accent or a thoughtful favour. Handcrafted in natural soy wax with a clean cotton wick.",
    sizes: oneSize("One size", "3.3 x 4.5 cm", 1.5),
  },
  {
    slug: "peony-flower-m",
    name: "Peony Flower M",
    notes: "4.5 x 9.6 cm",
    price: 3.5,
    image: peonyM,
    description:
      "A medium peony flower candle with soft, sculpted petals. A romantic centrepiece for any quiet ritual.",
    sizes: oneSize("Medium", "4.5 x 9.6 cm", 3.5),
  },
  {
    slug: "peony-flower-l",
    name: "Peony Flower L",
    notes: "5.5 x 11.5 cm",
    price: 5.5,
    image: peonyL,
    description:
      "A large peony bloom, beautifully detailed and full of presence. Made with natural soy wax and a clean burning cotton wick.",
    sizes: oneSize("Large", "5.5 x 11.5 cm", 5.5),
  },
  {
    slug: "tulip-flower-bouquet",
    name: "Tulip Flower Bouquet",
    notes: "9.8 x 6.4 cm",
    price: 5.5,
    image: tulipBouquet,
    description:
      "A cluster of tulip blooms gathered into a delicate bouquet, sculpted in soft soy wax. A heartfelt gift that never wilts.",
    sizes: oneSize("One size", "9.8 x 6.4 cm", 5.5),
  },
  {
    slug: "temple-flower",
    name: "Temple Flower",
    notes: "7 x 2.2 cm",
    price: 1.2,
    image: templeFlower,
    description:
      "A serene temple flower candle, low and graceful. Lovely floated in a shallow bowl of water or set on a stone tray.",
    sizes: oneSize("One size", "7 x 2.2 cm", 1.2),
  },
  {
    slug: "daisy-flower",
    name: "Daisy Flower",
    notes: "5.6 x 5.8 cm",
    price: 1.0,
    image: daisyFlower,
    description:
      "A cheerful daisy in bloom, hand poured in natural soy wax. Simple, sweet and quietly beautiful.",
    sizes: oneSize("One size", "5.6 x 5.8 cm", 1.0),
  },
  {
    slug: "tulip",
    name: "Tulip",
    notes: "4.3 x 1.69 cm",
    price: 1.5,
    image: tulip,
    description:
      "A single tulip candle on a soft round base. Petite, elegant and full of springtime charm.",
    sizes: oneSize("One size", "4.3 x 1.69 cm", 1.5),
  },
  {
    slug: "rose",
    name: "Rose",
    notes: "4.5 x 1.77 cm",
    price: 1.5,
    image: rose,
    description:
      "A sculpted rose in full bloom, hand poured in natural soy wax. A timeless gesture in candle form.",
    sizes: oneSize("One size", "4.5 x 1.77 cm", 1.5),
  },
  {
    slug: "rose-bud",
    name: "Rose Bud",
    notes: "4.7 x 1.85 cm",
    price: 1.5,
    image: roseBud,
    description:
      "A delicate rose bud, just about to open. Soft, romantic and perfect for favours and place settings.",
    sizes: oneSize("One size", "4.7 x 1.85 cm", 1.5),
  },
  {
    slug: "yarn-ball",
    name: "Yarn Ball",
    notes: "5.6 x 6.7 cm",
    price: 3.0,
    image: yarnBall,
    description:
      "A playful yarn ball candle, sculpted with soft winding strands. A warm, tactile little object for cosy spaces.",
    sizes: oneSize("One size", "5.6 x 6.7 cm", 3.0),
  },
  {
    slug: "swirling-wave-ball",
    name: "Swirling Wave Ball",
    notes: "5.7 x 6 cm",
    price: 3.5,
    image: swirlingWave,
    description:
      "A swirling wave ball candle with soft sculpted ridges that catch the light beautifully. Calm, gentle and modern.",
    sizes: oneSize("One size", "5.7 x 6 cm", 3.5),
  },
  {
    slug: "heart-shaped-bear",
    name: "Heart Shaped Bear",
    notes: "6.8 x 5.9 cm",
    price: 4.0,
    image: heartBear,
    description:
      "A little bear hugging a heart, hand poured in soy wax. A tender keepsake for someone you love.",
    sizes: oneSize("One size", "6.8 x 5.9 cm", 4.0),
  },
  {
    slug: "prayer-girl-angel",
    name: "Prayer Girl Angel",
    notes: "6.5 x 10 cm",
    price: 6.0,
    image: angelGirl,
    description:
      "A praying girl angel candle, sculpted with quiet detail. A meaningful piece for ceremonies, blessings and remembrance.",
    sizes: oneSize("One size", "6.5 x 10 cm", 6.0),
  },
  {
    slug: "prayer-boy-angel",
    name: "Prayer Boy Angel",
    notes: "6.5 x 11 cm",
    price: 6.0,
    image: angelBoy,
    description:
      "A praying boy angel candle, hand finished with care. Lovely for christenings, communions and gentle gifting.",
    sizes: oneSize("One size", "6.5 x 11 cm", 6.0),
  },
  {
    slug: "bless-angel",
    name: "Bless Angel",
    notes: "6.1 x 10.5 cm",
    price: 4.5,
    image: angelBless,
    description:
      "A serene blessing angel candle in soft soy wax. A quiet light for sacred and reflective moments.",
    sizes: oneSize("One size", "6.1 x 10.5 cm", 4.5),
  },
  {
    slug: "bubble-dessert-cube-small",
    name: "Bubble Dessert Cube Small",
    notes: "4 x 4 cm",
    price: 1.3,
    image: bubbleSmall,
    description:
      "A small bubble cube candle, soft and pillowy. Pair a few together for a modern, sculptural arrangement.",
    sizes: oneSize("Small", "4 x 4 cm", 1.3),
  },
  {
    slug: "bubble-dessert-cube",
    name: "Bubble Dessert Cube",
    notes: "6 x 6 cm",
    price: 3.5,
    image: bubble,
    description:
      "A larger bubble cube candle, sculpted with playful curves. A sweet, contemporary statement piece.",
    sizes: oneSize("Regular", "6 x 6 cm", 3.5),
  },
  {
    slug: "heart-shape",
    name: "Heart Shape",
    notes: "S, M and L sizes",
    price: 2.5,
    image: heart,
    description:
      "A classic heart shaped candle, available in three sizes. Lovely on its own or grouped together as a soft, glowing trio.",
    sizes: [
      { label: "Small", weight: "5 x 4.5 cm", price: 2.5 },
      { label: "Medium", weight: "7.7 x 6.9 cm", price: 4.0 },
      { label: "Large", weight: "10 x 9 cm", price: 5.5 },
    ],
  },
  {
    slug: "cylinder-shape-s",
    name: "Cylinder Shape S",
    notes: "5 x 8.7 cm",
    price: 3.5,
    image: cylinderS,
    description:
      "A small ribbed cylinder candle with quiet, architectural lines. A calm everyday glow.",
    sizes: oneSize("Small", "5 x 8.7 cm", 3.5),
  },
  {
    slug: "cylinder-shape-l",
    name: "Cylinder Shape L",
    notes: "6.5 x 8.7 cm",
    price: 4.5,
    image: cylinderL,
    description:
      "A large ribbed cylinder candle with a soft, sculptural presence. Beautiful solo or in a cluster.",
    sizes: oneSize("Large", "6.5 x 8.7 cm", 4.5),
  },
];

export const getCandleBySlug = (slug: string) =>
  candles.find((c) => c.slug === slug);
