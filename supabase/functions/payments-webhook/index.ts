import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient, verifyWebhook } from "../_shared/stripe.ts";

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
  }
  return _supabase;
}

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  const stripe = createStripeClient(env);

  // Fetch full line items with product expansion so we can persist names + prices.
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ["data.price.product"],
  });

  let cartMeta: Array<Record<string, any>> = [];
  try {
    cartMeta = session.metadata?.cart ? JSON.parse(session.metadata.cart) : [];
  } catch {
    cartMeta = [];
  }

  const items = lineItems.data.map((li: any, idx: number) => {
    const product = li.price?.product;
    return {
      name: typeof product === "object" ? product.name : undefined,
      price_id: li.price?.lookup_key || li.price?.id,
      quantity: li.quantity,
      amount_subtotal: li.amount_subtotal,
      amount_total: li.amount_total,
      currency: li.currency,
      meta: cartMeta[idx] || null,
    };
  });

  const shipping = session.collected_information?.shipping_details
    || session.shipping_details
    || session.customer_details?.address ? { address: session.customer_details?.address, name: session.customer_details?.name } : null;

  const address = shipping?.address || session.customer_details?.address || {};
  const name = shipping?.name || session.customer_details?.name || null;

  await getSupabase().from("orders").upsert(
    {
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent,
      customer_email: session.customer_details?.email || session.customer_email,
      customer_name: name,
      total_amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status === "paid" ? "paid" : session.payment_status,
      items,
      shipping_name: name,
      shipping_line1: address?.line1 || null,
      shipping_line2: address?.line2 || null,
      shipping_city: address?.city || null,
      shipping_state: address?.state || null,
      shipping_postal_code: address?.postal_code || null,
      shipping_country: address?.country || null,
      environment: env,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_session_id" },
  );
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    console.error("Webhook invalid env:", rawEnv);
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const env: StripeEnv = rawEnv;

  try {
    const event = await verifyWebhook(req, env);

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await handleCheckoutCompleted(event.data.object, env);
        break;
      case "transaction.completed":
        // Lovable payments aggregate event — checkout.session.completed already handled.
        break;
      default:
        console.log("Unhandled event:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});
