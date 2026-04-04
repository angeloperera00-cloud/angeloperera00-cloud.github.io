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
    <section className="py-24 md:py-32 px-6 bg-secondary/50" ref={ref}>
      <div
        className={`max-w-lg mx-auto text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
          Stay Illuminated
        </p>
        <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-4">
          Join the Glow
        </h2>
        <p className="body-refined text-muted-foreground mb-10">
          Receive seasonal scent drops, rituals for the home, and quiet inspiration — delivered softly to your inbox.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent border-b border-foreground/20 px-1 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3 border border-foreground/20 font-body text-xs tracking-[0.2em] uppercase text-foreground hover:bg-foreground/5 transition-colors"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <p className="body-refined text-accent animate-fade-up">
            Thank you — welcome to the ritual. ✦
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
