import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
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
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4" />Checkout</>}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
