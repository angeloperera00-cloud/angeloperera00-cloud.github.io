import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (window.location.pathname !== "/") {
        navigate("/" + href);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const links = [
    { label: "Shop", href: "#scents" },
    { label: "Storia", href: "#story" },
    { label: "Atmosfera", href: "#atmosphere" },
    { label: "Contact", href: "#newsletter" },
  ];

  return (
    <footer className="relative py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Tiny flame mark */}
        <div className="relative w-2 h-6 mb-8">
          <div className="absolute -inset-6 rounded-full bg-[hsl(var(--glow-amber))]/30 blur-2xl animate-flame-flicker" />
          <div className="relative w-2 h-6 mx-auto rounded-full animate-flame-core"
               style={{ background: "radial-gradient(ellipse at 50% 70%, hsl(var(--champagne)), hsl(var(--glow-amber)) 40%, hsl(var(--flame-orange)) 80%, transparent)" }} />
        </div>

        <p className="heading-cinema text-4xl text-[hsl(var(--champagne))] mb-2">
          <em>Glow</em>
        </p>
        <p className="small-caps text-[hsl(var(--antique-gold))] text-[10px] mb-10">
          Fatto a mano · Napoli · 2024
        </p>

        <nav className="flex flex-wrap justify-center gap-8 mb-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="small-caps text-foreground/55 hover:text-[hsl(var(--glow-amber))] transition-colors cursor-pointer text-[11px]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-body text-xs text-foreground/35 italic">
          © 2026 Glow. Artigianale. Botanico. Napoli.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
