import { loadStripe, type Stripe } from "@stripe/stripe-js";

type StripeEnv = "sandbox" | "live";

const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;
const environment: StripeEnv = clientToken?.startsWith("pk_test_") ? "sandbox" : "live";

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!clientToken) return Promise.resolve(null);
  if (!stripePromise) stripePromise = loadStripe(clientToken);
  return stripePromise;
}

export function hasStripeToken(): boolean {
  return Boolean(clientToken);
}

export function getStripeEnvironment(): StripeEnv {
  return environment;
}
