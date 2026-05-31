import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { candles } from "@/data/candles";

const ScentCard = ({ candle, index }: { candle: typeof candles[0]; index: number }) => {
  return (
    <Link to={`/scent/${candle.slug}`} className="group block cursor-pointer">
      <div className="relative overflow-hidden mb-5 rounded-sm bg-muted/30 shadow-[0_10px_40px_-15px_hsl(var(--foreground)/0.25)] transition-shadow duration-700 group-hover:shadow-[0_25px_60px_-15px_hsl(var(--foreground)/0.45)]">
        <img
          src={candle.image}
          alt={candle.name}
          loading={index < 6 ? "eager" : "lazy"}
          fetchPriority={index < 4 ? "high" : "auto"}
          decoding="async"
          width={640}
          height={800}
          className="w-full aspect-[4/5] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>
      <h3 className="font-heading text-2xl font-light text-foreground mb-1">
        {candle.name}
      </h3>
      <p className="body-refined text-sm text-muted-foreground mb-2">
        {candle.notes}
      </p>
      <p className="font-body text-sm tracking-widest text-accent">
        €{candle.price.toFixed(2)}
      </p>
    </Link>
  );
};

const Scents = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="scents" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <div
        ref={ref}
        className={`text-center mb-16 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
          The Collection
        </p>
        <h2 className="heading-display text-4xl md:text-5xl text-foreground">
          Our Scents
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10">
        {candles.map((candle, i) => (
          <ScentCard key={candle.name} candle={candle} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Scents;
