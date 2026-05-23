import { useEffect, useRef, useState } from "react";
import storyImage from "@/assets/brand-story.jpg";

const BrandStory = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="relative py-28 md:py-40 px-6 overflow-hidden" ref={ref}>
      {/* atmospheric backdrop */}
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-[hsl(var(--terracotta))]/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        {/* Image with vignette frame */}
        <div
          className={`md:col-span-7 transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="relative vignette overflow-hidden">
            <img
              src={storyImage}
              alt="Artisan hand-pouring candle wax in a warm Naples workshop"
              loading="lazy"
              width={1000}
              height={1200}
              className="w-full aspect-[4/5] object-cover grayscale-[15%] contrast-110 brightness-90 animate-slow-pan"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30 pointer-events-none" />
          </div>
        </div>

        {/* Editorial copy */}
        <div
          className={`md:col-span-5 transition-all duration-[1200ms] delay-300 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          <p className="small-caps text-[hsl(var(--antique-gold))] text-xs mb-6">
            La nostra storia
          </p>
          <h2 className="heading-cinema text-5xl md:text-6xl text-[hsl(var(--champagne))] mb-10 leading-[.95]">
            Born from<br />
            <em className="text-[hsl(var(--glow-amber))]">stillness</em>.
          </h2>
          <div className="space-y-6 body-refined text-foreground/75 text-lg">
            <p>
              Glow is born in a quiet studio in Naples, where the rhythm of the day
              is set by light, shadow, and the slow Tyrrhenian sun. Each candle is
              hand-poured in small batches.
            </p>
            <p>
              We source botanical fragrance oils from artisan perfumers who share
              our devotion to subtlety — never overpowering, always evocative.
            </p>
            <p className="italic text-[hsl(var(--champagne))]/80">
              Fatto a mano, con cura, una candela alla volta.
            </p>
          </div>
          <div className="mt-12 h-px w-20 bg-[hsl(var(--antique-gold))]" />
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
