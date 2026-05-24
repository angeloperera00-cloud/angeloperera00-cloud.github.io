import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const WHATSAPP_NUMBER = "393475777866";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currency = items[0]?.price.currencyCode || "EUR";

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    const lines = items.map((item) => {
      const opts = item.selectedOptions.map((o) => o.value).join(" · ");
      const lineTotal = (parseFloat(item.price.amount) * item.quantity).toFixed(2);
      return `• ${item.product.node.title} (${opts}) ×${item.quantity} — ${item.price.currencyCode} ${lineTotal}`;
    }).join("\n");
    const message =
      `Hi! I'd like to order from Glow ✨\n\n${lines}\n\nTotal: ${currency} ${totalPrice.toFixed(2)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 backdrop-blur-sm text-foreground hover:bg-foreground/20 transition-all"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-body flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-background">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-heading text-2xl font-light">Shopping Cart</SheetTitle>
          <SheetDescription className="font-body text-sm">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-body text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 border-b border-border">
                      <div className="w-16 h-16 bg-secondary/20 overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-lg font-light truncate">{item.product.node.title}</h4>
                        <p className="font-body text-xs text-muted-foreground">{item.selectedOptions.map(o => o.value).join(' · ')}</p>
                        <p className="font-body text-sm text-accent mt-1">{item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <button onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-foreground transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-7 h-7 border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-body text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="w-7 h-7 border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-heading text-xl font-light">Total</span>
                  <span className="font-heading text-2xl font-light">{items[0]?.price.currencyCode || '€'} {totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="w-full py-4 bg-foreground text-primary-foreground font-body text-xs tracking-[0.25em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><svg viewBox="0 0 32 32" className="w-4 h-4 fill-current"><path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0z"/></svg>Order via WhatsApp</>}
                </button>
                <div className="pt-2">
                  <p className="text-center font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Secure online payment available
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {/* Visa */}
                    <div className="h-7 w-11 rounded-md bg-white border border-border flex items-center justify-center" aria-label="Visa">
                      <svg viewBox="0 0 48 16" className="h-3"><text x="0" y="14" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="900" fill="#1A1F71" fontStyle="italic">VISA</text></svg>
                    </div>
                    {/* Mastercard */}
                    <div className="h-7 w-11 rounded-md bg-white border border-border flex items-center justify-center gap-[-4px]" aria-label="Mastercard">
                      <svg viewBox="0 0 32 20" className="h-4">
                        <circle cx="12" cy="10" r="7" fill="#EB001B" />
                        <circle cx="20" cy="10" r="7" fill="#F79E1B" />
                        <path d="M16 5a7 7 0 0 1 0 10 7 7 0 0 1 0-10z" fill="#FF5F00" />
                      </svg>
                    </div>
                    {/* Amex */}
                    <div className="h-7 w-11 rounded-md bg-[#1F72CD] flex items-center justify-center" aria-label="American Express">
                      <svg viewBox="0 0 48 16" className="h-2.5"><text x="0" y="13" fontFamily="Arial Black, sans-serif" fontSize="14" fontWeight="900" fill="#fff">AMEX</text></svg>
                    </div>
                    {/* PayPal */}
                    <div className="h-7 w-11 rounded-md bg-white border border-border flex items-center justify-center" aria-label="PayPal">
                      <svg viewBox="0 0 56 16" className="h-2.5"><text x="0" y="13" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="#003087" fontStyle="italic">Pay</text><text x="26" y="13" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="#009CDE" fontStyle="italic">Pal</text></svg>
                    </div>
                    {/* Apple Pay */}
                    <div className="h-7 w-11 rounded-md bg-black flex items-center justify-center gap-0.5" aria-label="Apple Pay">
                      <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white"><path d="M17.05 12.04c-.02-2.36 1.93-3.5 2.02-3.55-1.1-1.6-2.81-1.82-3.42-1.85-1.45-.15-2.84.86-3.58.86-.75 0-1.88-.84-3.1-.82-1.6.02-3.07.93-3.89 2.36-1.66 2.88-.42 7.13 1.19 9.46.79 1.14 1.72 2.42 2.94 2.37 1.18-.05 1.63-.76 3.06-.76 1.42 0 1.83.76 3.08.74 1.27-.02 2.08-1.16 2.85-2.3.9-1.32 1.27-2.6 1.29-2.67-.03-.01-2.47-.95-2.49-3.78zM14.7 5.04c.65-.79 1.09-1.88.97-2.97-.94.04-2.07.63-2.74 1.41-.6.7-1.13 1.81-.99 2.88 1.05.08 2.11-.53 2.76-1.32z"/></svg>
                      <span className="text-white text-[7px] font-semibold">Pay</span>
                    </div>
                    {/* Google Pay */}
                    <div className="h-7 w-11 rounded-md bg-white border border-border flex items-center justify-center" aria-label="Google Pay">
                      <svg viewBox="0 0 56 16" className="h-2.5"><text x="0" y="13" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="500" fill="#5F6368">G</text><text x="9" y="13" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="500" fill="#EA4335">o</text><text x="17" y="13" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="500" fill="#FBBC04">o</text><text x="25" y="13" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="500" fill="#4285F4">g</text><text x="33" y="13" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="500" fill="#34A853">le</text><text x="46" y="13" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" fill="#5F6368">Pay</text></svg>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
