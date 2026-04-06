import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCandleBySlug } from "@/data/candles";
import { ArrowLeft, Flame, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const candle = getCandleBySlug(slug || "");
  const [selectedSize, setSelectedSize] = useState(1);
  const [visible, setVisible] = useState(false);
  const { addItem, isLoading } = useCartStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!candle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-display text-3xl text-foreground mb-4">Scent not found</h1>
          <Link to="/" className="font-body text-sm text-accent hover:underline">
            ← Return home
          </Link>
        </div>
      </div>
    );
  }

  const currentSize = candle.sizes[selectedSize];

  const handleAddToCart = async () => {
    // Build a mock ShopifyProduct-shaped object from local candle data
    // since the store doesn't have real Shopify products yet
    const fakeVariantId = `gid://shopify/ProductVariant/${candle.slug}-${currentSize.label}`;
    
    await addItem({
      product: {
        node: {
          id: `gid://shopify/Product/${candle.slug}`,
          title: candle.name,
          description: candle.description,
          handle: candle.slug,
          priceRange: {
            minVariantPrice: {
              amount: String(currentSize.price),
              currencyCode: "USD",
            },
          },
          images: {
            edges: [{ node: { url: candle.image, altText: candle.name } }],
          },
          variants: { edges: [] },
          options: [],
        },
      },
      variantId: fakeVariantId,
      variantTitle: currentSize.label,
      price: { amount: String(currentSize.price), currencyCode: "USD" },
      quantity: 1,
      selectedOptions: [{ name: "Size", value: `${currentSize.label} · ${currentSize.weight}` }],
    });

    toast.success(`${candle.name} (${currentSize.label}) added to cart`, {
      description: `$${currentSize.price} · ${currentSize.weight}`,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="px-6 pt-8">
        <Link
          to="/#scents"
          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div
          className={`transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <img
            src={candle.image}
            alt={candle.name}
            width={640}
            height={800}
            className="w-full max-w-lg mx-auto object-cover shadow-2xl"
          />
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">
            Lumière Collection
          </p>
          <h1 className="heading-display text-4xl md:text-5xl text-foreground mb-2">
            {candle.name}
          </h1>
          <p className="body-refined text-sm text-muted-foreground mb-8">
            {candle.notes}
          </p>

          <p className="body-refined text-muted-foreground mb-10 leading-relaxed">
            {candle.description}
          </p>

          <div className="mb-10 space-y-3">
            <h3 className="font-body text-xs tracking-[0.3em] uppercase text-foreground/70 mb-4">
              Scent Profile
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Top", value: candle.topNotes },
                { label: "Heart", value: candle.heartNotes },
                { label: "Base", value: candle.baseNotes },
              ].map((note) => (
                <div key={note.label}>
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-accent mb-1">
                    {note.label}
                  </p>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {note.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-10 text-muted-foreground">
            <Flame className="w-4 h-4 text-accent" />
            <span className="font-body text-xs tracking-wider">
              Burn time: {candle.burnTime}
            </span>
          </div>

          <div className="mb-8">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-foreground/70 mb-4">
              Size
            </p>
            <div className="flex gap-3">
              {candle.sizes.map((size, i) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(i)}
                  className={`px-5 py-3 border font-body text-xs tracking-wider transition-all ${
                    selectedSize === i
                      ? "border-foreground bg-foreground text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/40"
                  }`}
                >
                  <span className="block">{size.label}</span>
                  <span className="block text-[10px] mt-0.5 opacity-60">{size.weight}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-heading text-3xl font-light text-foreground">
              ${currentSize.price}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="flex-1 py-4 bg-foreground text-primary-foreground font-body text-xs tracking-[0.25em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to Cart"}
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-border space-y-3">
            <p className="font-body text-xs text-muted-foreground">
              100% natural soy wax · Cotton wick · Hand-poured
            </p>
            <p className="font-body text-xs text-muted-foreground">
              Free shipping on orders over $75
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
