import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface LineItemInput {
  priceId: string;
  quantity: number;
  meta?: Record<string, string>; // fragrance, colour, size label etc.
}

interface RequestBody {
  items: LineItemInput[];
  customerEmail?: string;
  returnUrl: string;
  environment: StripeEnv;
}

function validate(body: any): body is RequestBody {
  if (!body || !Array.isArray(body.items) || body.items.length === 0) return false;
  if (typeof body.returnUrl !== "string") return false;
  if (body.environment !== "sandbox" && body.environment !== "live") return false;
  for (const item of body.items) {
    if (typeof item.priceId !== "string" || !/^[a-zA-Z0-9_-]+$/.test(item.priceId)) return false;
    if (typeof item.quantity !== "number" || item.quantity < 1 || item.quantity > 100) return false;
  }
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    if (!validate(body)) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = createStripeClient(body.environment);

    // Resolve all priceIds (human-readable lookup_keys) to Stripe price IDs.
    const lookupKeys = [...new Set(body.items.map((i) => i.priceId))];
    const prices = await stripe.prices.list({ lookup_keys: lookupKeys, limit: 100 });
    const priceMap = new Map(prices.data.map((p) => [p.lookup_key!, p]));

    for (const lk of lookupKeys) {
      if (!priceMap.has(lk)) {
        return new Response(JSON.stringify({ error: `Price not found: ${lk}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const lineItems = body.items.map((i) => ({
      price: priceMap.get(i.priceId)!.id,
      quantity: i.quantity,
    }));

    // Cart snapshot stored in session metadata so the webhook can persist
    // exact line items with their fragrance/colour/size selections.
    const cartSnapshot = body.items.map((i) => ({
      priceId: i.priceId,
      quantity: i.quantity,
      ...(i.meta || {}),
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: body.returnUrl,
      shipping_address_collection: {
        allowed_countries: [
          "IT", "FR", "DE", "ES", "PT", "NL", "BE", "AT", "IE", "GR",
          "FI", "SE", "DK", "PL", "CZ", "HU", "RO", "BG", "HR", "SI",
          "SK", "EE", "LV", "LT", "LU", "MT", "CY", "GB", "CH", "NO",
          "US", "CA", "AU", "NZ",
        ],
      },
      phone_number_collection: { enabled: true },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "eur" },
            display_name: "Italy — Standard",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 4 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1200, currency: "eur" },
            display_name: "Europe — Standard",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 2500, currency: "eur" },
            display_name: "Rest of World — Standard",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 7 },
              maximum: { unit: "business_day", value: 14 },
            },
          },
        },
      ],
      ...(body.customerEmail && { customer_email: body.customerEmail }),
      payment_intent_data: {
        description: `Glow Angel order (${body.items.reduce((s, i) => s + i.quantity, 0)} items)`,
      },
      metadata: {
        cart: JSON.stringify(cartSnapshot).slice(0, 500),
      },
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-checkout error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
