import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Parallax layers
  const bg = `translateY(${scrollY * 0.35}px) scale(${1.08 + scrollY * 0.0002})`;
  const mid = `translateY(${scrollY * 0.18}px)`;
  const fg = `translateY(${scrollY * -0.05}px)`;
  const fade = Math.max(0, 1 - scrollY / 600);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden vignette bg-background"
    >
      {/* Letterbox bars */}
      <div className="letterbox-top" />
      <div className="letterbox-bottom" />

      {/* Background candlelight room (pure CSS) */}
      <div
        className="absolute inset-0 bg-room animate-slow-pan"
        style={{ transform: bg, filter: "blur(2px)" }}
      />
      {/* Deep warm gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />

      {/* Midground: flame + glow halo */}
      <div
        className="absolute inset-0 flex items-end justify-center pointer-events-none"
        style={{ transform: mid }}
      >
        <div className="relative mb-[28vh]">
          {/* Volumetric glow */}
          <div className="absolute -inset-40 rounded-full bg-[hsl(var(--glow-amber))]/30 blur-3xl animate-flame-flicker" />
          <div className="absolute -inset-24 rounded-full bg-[hsl(var(--flame-orange))]/25 blur-2xl animate-flame-flicker" style={{ animationDelay: '.3s' }} />
          {/* Flame core */}
          <div className="relative w-3 h-10 mx-auto">
            <div
              className="absolute inset-0 rounded-full animate-flame-core"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 70%, hsl(var(--champagne)) 0%, hsl(var(--glow-amber)) 30%, hsl(var(--flame-orange)) 65%, transparent 80%)",
                filter: "blur(1px)",
              }}
            />
          </div>
          {/* Wick base */}
          <div className="w-px h-6 mx-auto bg-gradient-to-b from-foreground/40 to-transparent" />
        </div>
      </div>

      {/* Foreground content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        style={{ transform: fg, opacity: fade }}
      >
        <p
          className={`small-caps text-[hsl(var(--champagne))]/70 mb-10 text-sm transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Glow · Napoli
        </p>

        <h1
          className={`heading-cinema text-[18vw] md:text-[14rem] leading-[.85] text-[hsl(var(--champagne))] text-glow transition-all duration-[1400ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontWeight: 300, letterSpacing: "-0.04em" }}
        >
          Glow
        </h1>

        <p
          className={`mt-10 italic text-[hsl(var(--champagne))]/75 text-lg md:text-xl tracking-wide transition-all duration-1000 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          Artigianale. Botanico. Napoli.
        </p>

        <a
          href="#scents"
          className={`cinema-btn mt-14 transition-all duration-1000 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span>Esplora la Collezione</span>
        </a>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 z-20 small-caps text-[hsl(var(--champagne))]/45 text-[10px]">
        scroll
      </div>
    </section>
  );
};

export default Hero;
