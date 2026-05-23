import { useEffect, useRef, useState } from "react";

const Atmosphere = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  // 18 floating bokeh particles
  const bokeh = Array.from({ length: 18 }).map((_, i) => ({
    left: `${(i * 37) % 100}%`,
    bottom: `${-10 + (i * 13) % 30}%`,
    size: 6 + (i % 5) * 4,
    delay: (i * 0.7) % 8,
    duration: 9 + (i % 6),
    bx: `${((i * 17) % 60) - 30}px`,
  }));

  return (
    <section ref={ref} className="relative h-[90vh] w-full overflow-hidden vignette">
      {/* Layered radial candlelight */}
      <div className="absolute inset-0 bg-room" />
      <div className="absolute inset-0" style={{
        background:
          "radial-gradient(ellipse 30% 50% at 50% 60%, hsl(var(--glow-amber)/.5), transparent 60%)",
        filter: "blur(40px)",
      }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Bokeh dots */}
      <div className="absolute inset-0 pointer-events-none">
        {bokeh.map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: b.left,
              bottom: b.bottom,
              width: b.size, height: b.size,
              background: "radial-gradient(circle, hsl(var(--glow-amber)/.85), transparent 70%)",
              filter: "blur(2px)",
              animation: `bokeh-float ${b.duration}s ease-in ${b.delay}s infinite`,
              ['--bx' as any]: b.bx,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className={`relative z-10 h-full flex items-center justify-center px-6 text-center transition-all duration-[1400ms] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="max-w-2xl">
          <p className="small-caps text-[hsl(var(--antique-gold))] text-xs mb-6">L'atmosfera</p>
          <p className="heading-cinema text-3xl md:text-5xl text-[hsl(var(--champagne))] leading-tight">
            <em>"A room lit by candlelight is a room that remembers
            how to breathe."</em>
          </p>
          <p className="mt-8 small-caps text-foreground/55 text-[10px]">— Napoli, 2024</p>
        </div>
      </div>
    </section>
  );
};

export default Atmosphere;
