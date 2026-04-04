import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-candle.jpg";

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Lumière luxury candles glowing in warm amber light"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      {/* Flickering glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-glow-amber/20 blur-3xl animate-flicker-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <p
          className={`font-body text-sm tracking-[0.35em] uppercase text-primary-foreground/70 mb-6 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          L u m i è r e
        </p>
        <h1
          className={`heading-display text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-8 transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Light Your Ritual
        </h1>
        <p
          className={`body-refined text-primary-foreground/60 max-w-md mb-10 transition-all duration-1000 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Hand-poured, slow-burning candles crafted for moments of stillness
        </p>
        <a
          href="#scents"
          className={`inline-block px-8 py-3 border border-primary-foreground/30 text-primary-foreground/90 font-body text-sm tracking-[0.2em] uppercase hover:bg-primary-foreground/10 transition-all duration-700 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Discover Our Scents
        </a>
      </div>
    </section>
  );
};

export default Hero;
