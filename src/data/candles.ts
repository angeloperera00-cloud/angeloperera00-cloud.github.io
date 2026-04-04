import candleAmber from "@/assets/candle-amber.jpg";
import candleSage from "@/assets/candle-sage.jpg";
import candleVanilla from "@/assets/candle-vanilla.jpg";
import candleFig from "@/assets/candle-fig.jpg";

export interface CandleProduct {
  slug: string;
  name: string;
  notes: string;
  price: number;
  image: string;
  description: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  burnTime: string;
  sizes: { label: string; weight: string; price: number }[];
}

export const candles: CandleProduct[] = [
  {
    slug: "amber-dusk",
    name: "Amber Dusk",
    notes: "Amber · Warm Musk · Tonka",
    price: 48,
    image: candleAmber,
    description:
      "A warm, enveloping scent that captures the golden hour — when the last light clings to the horizon and everything slows. Amber Dusk fills your space with rich resinous amber, a whisper of warm musk, and the creamy sweetness of tonka bean.",
    topNotes: "Bergamot, Pink Pepper",
    heartNotes: "Amber Resin, Warm Musk",
    baseNotes: "Tonka Bean, Benzoin, Vanilla",
    burnTime: "50–60 hours",
    sizes: [
      { label: "Petite", weight: "120g", price: 28 },
      { label: "Classic", weight: "240g", price: 48 },
      { label: "Grand", weight: "400g", price: 72 },
    ],
  },
  {
    slug: "sage-lavender",
    name: "Sage & Lavender",
    notes: "Clary Sage · Lavender · Cedarwood",
    price: 44,
    image: candleSage,
    description:
      "An herbal meditation in wax. Sage & Lavender draws from the wild gardens of Provence — aromatic, calming, and deeply grounding. Let it carry you into a state of quiet contemplation.",
    topNotes: "Eucalyptus, Green Leaves",
    heartNotes: "Clary Sage, French Lavender",
    baseNotes: "Cedarwood, White Musk",
    burnTime: "50–60 hours",
    sizes: [
      { label: "Petite", weight: "120g", price: 26 },
      { label: "Classic", weight: "240g", price: 44 },
      { label: "Grand", weight: "400g", price: 68 },
    ],
  },
  {
    slug: "vanilla-santal",
    name: "Vanilla Santal",
    notes: "Vanilla · Sandalwood · Soft Smoke",
    price: 46,
    image: candleVanilla,
    description:
      "A scent of quiet luxury. Vanilla Santal wraps your room in velvety warmth — creamy Madagascar vanilla layered over smooth sandalwood, with the faintest trail of soft woodsmoke. Intimate, comforting, unforgettable.",
    topNotes: "Cardamom, Saffron",
    heartNotes: "Madagascar Vanilla, Sandalwood",
    baseNotes: "Soft Smoke, Cashmere Musk",
    burnTime: "50–60 hours",
    sizes: [
      { label: "Petite", weight: "120g", price: 28 },
      { label: "Classic", weight: "240g", price: 46 },
      { label: "Grand", weight: "400g", price: 70 },
    ],
  },
  {
    slug: "fig-cedar",
    name: "Fig & Cedar",
    notes: "Wild Fig · Cedar · Earth",
    price: 44,
    image: candleFig,
    description:
      "A walk through a sun-dappled forest where ripe figs fall from ancient trees. Fig & Cedar balances the sweetness of wild fig with the dry warmth of cedarwood and a mossy, earthy base. Nature, distilled.",
    topNotes: "Fig Leaf, Green Stems",
    heartNotes: "Wild Fig, Atlas Cedar",
    baseNotes: "Vetiver, Oakmoss, Earth",
    burnTime: "50–60 hours",
    sizes: [
      { label: "Petite", weight: "120g", price: 26 },
      { label: "Classic", weight: "240g", price: 44 },
      { label: "Grand", weight: "400g", price: 68 },
    ],
  },
];

export const getCandleBySlug = (slug: string) =>
  candles.find((c) => c.slug === slug);
