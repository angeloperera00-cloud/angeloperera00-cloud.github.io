import { useEffect, useRef, useState } from "react";

const Newsletter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="newsletter" className="relative py-28 md:py-40 px-6 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-room opacity-60 pointer-events-none" />
      <div
        className={`relative max-w-xl mx-auto text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="small-caps text-[hsl(var(--antique-gold))] text-xs mb-5">
          Rimani illuminato
        </p>
        <h2 className="heading-cinema text-4xl md:text-5xl text-[hsl(var(--champagne))] mb-6">
          Join the <em className="text-[hsl(var(--glow-amber))]">Glow</em>
        </h2>
        <p className="body-refined text-foreground/70 mb-12 text-lg italic">
          Seasonal scent drops, rituals for the home, and quiet inspiration —
          delivered softly to your inbox.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="il-tuo@email.com"
              required
              className="flex-1 bg-transparent border-b border-[hsl(var(--champagne))]/25 px-1 py-3 font-body text-base text-[hsl(var(--champagne))] placeholder:text-foreground/40 focus:outline-none focus:border-[hsl(var(--glow-amber))] transition-colors"
            />
            <button type="submit" className="cinema-btn">
              <span>Subscribe</span>
            </button>
          </form>
        ) : (
          <p className="heading-cinema text-2xl text-[hsl(var(--glow-amber))] animate-drift-up">
            <em>Grazie. Welcome to the ritual. ✦</em>
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
