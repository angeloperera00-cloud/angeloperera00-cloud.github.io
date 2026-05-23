const WHATSAPP_NUMBER = "393475777866";
const MESSAGE = encodeURIComponent(
  "Hi Glow! I'd like to request a custom candle. Here are my ideas:"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;

const SpecialRequest = () => {
  return (
    <section
      id="special-request"
      className="py-24 px-6 md:px-12 bg-secondary/40"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Made to order
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
          Special Request Candles
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Looking for something one of a kind? We craft bespoke candles for
          weddings, gifts, events, and personal rituals — custom scents,
          colors, vessels and labels, made by hand just for you.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300 hover:scale-[1.02]"
        >
          <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.388 1.094-1.938 2.002-3.17 2.266-.844.18-1.946.322-5.656-1.216-4.748-1.966-7.804-6.778-8.038-7.094-.226-.316-1.9-2.53-1.9-4.826s1.2-3.426 1.628-3.894c.388-.426.912-.614 1.216-.614.148 0 .28.008.4.014.428.018.642.044.924.716.354.838 1.216 2.962 1.322 3.178.108.216.216.508.068.796-.14.296-.264.428-.48.676-.216.248-.422.438-.638.706-.198.234-.42.484-.178.912.242.428 1.076 1.776 2.312 2.878 1.59 1.416 2.928 1.854 3.344 2.06.316.156.694.132.944-.132.318-.338.71-.898 1.108-1.452.284-.396.642-.446.99-.298.354.14 2.242 1.058 2.626 1.25.384.194.642.288.736.45.092.162.092.938-.296 2.032z" />
          </svg>
          Request on WhatsApp
        </a>
      </div>
    </section>
  );
};

export default SpecialRequest;
