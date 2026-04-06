import { useEffect, useRef, useState } from "react";
import storyImage from "@/assets/brand-story.jpg";

const BrandStory = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image - asymmetric offset */}
        <div
          className={`transition-all duration-1000 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="md:ml-8 md:-mt-12">
            <img
              src={storyImage}
              alt="Artisan hand-pouring candle wax in a warm workshop"
              loading="lazy"
              width={800}
              height={1000}
              className="w-full max-w-md mx-auto md:mx-0 object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Text */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">Our Story</p>
          <h2 className="heading-display text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            Born from
            <br />
            Stillness
          </h2>
          <div className="space-y-5 body-refined text-muted-foreground">
            <p>
              Lumière was born in a quiet studio in the Naples in Italy, where the rhythm of the day is set by light and
              shadow. Each candle is hand-poured in small batches using 100% natural soy wax and cotton wicks.
            </p>
            <p>
              We source our fragrance oils from artisan perfumers who share our devotion to subtlety, never
              overpowering, always evocative. Every scent is designed to transform a room into a sanctuary.
            </p>
            <p>Burning time: 50–60 hours of slow, steady warmth.</p>
          </div>
          <div className="mt-10 h-px w-16 bg-accent" />
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
