import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { candles } from "@/data/candles";

const ScentCard = ({ candle, index }: { candle: typeof candles[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -y * 8, ry: x * 10 });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div
      ref={ref}
      className={`perspective-1000 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <Link to={`/scent/${candle.slug}`} className="group block">
        <div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative preserve-3d transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
          }}
        >
          {/* Golden glow under the card */}
          <div className="absolute -inset-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
               style={{
                 background: "radial-gradient(ellipse at 50% 90%, hsl(var(--glow-amber)/.55), transparent 60%)",
                 filter: "blur(30px)",
                 transform: "translateZ(-30px)",
               }} />

          {/* Image frame */}
          <div className="relative overflow-hidden bg-[hsl(var(--secondary))] aspect-[4/5]">
            <img
              src={candle.image}
              alt={candle.name}
              loading="lazy"
              width={640}
              height={800}
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-110"
            />
            {/* Lit from below */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                 style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(var(--glow-amber)/.45), transparent 70%)" }} />
            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{ background: "radial-gradient(ellipse at center, transparent 55%, hsl(var(--background)/.65) 100%)" }} />
          </div>
        </div>

        <div className="mt-5 px-1">
          <h3 className="heading-cinema text-2xl text-[hsl(var(--champagne))] mb-1">
            <em>{candle.name}</em>
          </h3>
          <p className="small-caps text-[10px] text-foreground/50 mb-2">{candle.notes}</p>
          <p className="font-body text-sm tracking-widest text-[hsl(var(--antique-gold))]">
            €{candle.price.toFixed(2)}
          </p>
        </div>
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
    <section id="scents" className="relative py-28 md:py-40 px-6 max-w-7xl mx-auto">
      <div
        ref={ref}
        className={`text-center mb-20 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="small-caps text-[hsl(var(--antique-gold))] text-xs mb-5">
          La collezione
        </p>
        <h2 className="heading-cinema text-5xl md:text-7xl text-[hsl(var(--champagne))]">
          Our <em className="text-[hsl(var(--glow-amber))]">Scents</em>
        </h2>
        <div className="h-px w-16 bg-[hsl(var(--antique-gold))] mx-auto mt-8" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-x-10">
        {candles.map((candle, i) => (
          <ScentCard key={candle.slug} candle={candle} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Scents;
