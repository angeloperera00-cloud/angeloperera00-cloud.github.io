import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { candles } from "@/data/candles";

const ScentCard = ({ candle, index }: { candle: typeof candles[0]; index: number }) => {
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
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Link to={`/scent/${candle.slug}`} className="group block cursor-pointer">
        <div className="overflow-hidden mb-5">
          <img
            src={candle.image}
            alt={candle.name}
            loading="lazy"
            width={640}
            height={800}
            className="w-full aspect-[4/5] object-cover transition-all duration-700 group-hover:scale-105"
          />
        </div>
        <h3 className="font-heading text-2xl font-light text-foreground mb-1">
          {candle.name}
        </h3>
        <p className="body-refined text-sm text-muted-foreground mb-2">
          {candle.notes}
        </p>
        <p className="font-body text-sm tracking-widest text-accent">
          ${candle.price}
        </p>
      </Link>
    </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {candles.map((candle, i) => (
          <ScentCard key={candle.name} candle={candle} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Scents;
