import { Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const id = href.slice(1);
      // If we're not on the home page, navigate there first
      if (window.location.pathname !== "/") {
        navigate("/" + href);
      } else {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const links = [
    { label: "Shop", href: "#scents" },
    { label: "Our Story", href: "#story" },
    { label: "Shipping", href: "#newsletter" },
    { label: "Contact", href: "#newsletter" },
  ];

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <Flame className="w-6 h-6 text-accent mb-6 animate-gentle-float" />

        <p className="font-heading text-2xl font-light tracking-widest text-foreground mb-8">
          Lumière
        </p>

        <nav className="flex flex-wrap justify-center gap-8 mb-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-body text-xs text-muted-foreground/50">
          © 2026 Lumière. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
