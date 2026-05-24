import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    if (sessionId) clearCart();
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-lg text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 mx-auto text-accent" />
        <h1 className="font-heading text-4xl font-light">Thank you</h1>
        <p className="font-body text-muted-foreground">
          Your order has been received. We&apos;ll send a confirmation email shortly and
          start preparing your candles with care.
        </p>
        {sessionId && (
          <p className="font-body text-xs text-muted-foreground tracking-wider">
            Order reference: {sessionId.slice(-12)}
          </p>
        )}
        <Link
          to="/"
          className="inline-block mt-4 px-8 py-3 bg-foreground text-primary-foreground font-body text-xs tracking-[0.25em] uppercase hover:opacity-90 transition-opacity"
        >
          Continue browsing
        </Link>
      </div>
    </div>
  );
}
