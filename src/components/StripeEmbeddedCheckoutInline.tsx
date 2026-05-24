import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
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
