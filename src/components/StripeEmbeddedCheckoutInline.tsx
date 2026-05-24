import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment, hasStripeToken } from "@/lib/stripe";
import { supabase } from "@/integrations/supabase/client";

export interface CheckoutLineItem {
  priceId: string;
  quantity: number;
  meta?: Record<string, string>;
}

interface Props {
  items: CheckoutLineItem[];
  customerEmail?: string;
  returnUrl?: string;
}

export function StripeEmbeddedCheckoutInline({ items, customerEmail, returnUrl }: Props) {
  if (!hasStripeToken()) {
    return (
      <div className="p-8 text-center space-y-3">
        <h3 className="font-heading text-2xl font-light">Checkout unavailable</h3>
        <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
          Payments aren&apos;t configured for this environment yet. Please complete
          the payments go-live setup to accept real orders here.
        </p>
      </div>
    );
  }

  const fetchClientSecret = async (): Promise<string> => {
    const finalReturnUrl =
      returnUrl ||
      `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`;

    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: {
        items,
        customerEmail,
        returnUrl: finalReturnUrl,
        environment: getStripeEnvironment(),
      },
    });
    if (error || !data?.clientSecret) {
      throw new Error(error?.message || "Failed to create checkout session");
    }
    return data.clientSecret;
  };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
