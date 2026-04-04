import { Flame } from "lucide-react";

const Footer = () => {
  const links = [
    { label: "Shop", href: "#scents" },
    { label: "Our Story", href: "#story" },
    { label: "Shipping", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Flame icon */}
        <Flame className="w-6 h-6 text-accent mb-6 animate-gentle-float" />

        {/* Brand */}
        <p className="font-heading text-2xl font-light tracking-widest text-foreground mb-8">
          Lumière
        </p>

        {/* Nav */}
        <nav className="flex flex-wrap justify-center gap-8 mb-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="font-body text-xs text-muted-foreground/50">
          © 2026 Lumière. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
