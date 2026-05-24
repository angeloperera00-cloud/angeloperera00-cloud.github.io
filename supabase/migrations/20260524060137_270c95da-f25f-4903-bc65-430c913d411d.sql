CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text NOT NULL UNIQUE,
  stripe_payment_intent_id text,
  customer_email text,
  customer_name text,
  total_amount integer NOT NULL,
  currency text NOT NULL DEFAULT 'eur',
  status text NOT NULL DEFAULT 'pending',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  shipping_name text,
  shipping_line1 text,
  shipping_line2 text,
  shipping_city text,
  shipping_state text,
  shipping_postal_code text,
  shipping_country text,
  environment text NOT NULL DEFAULT 'sandbox',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_session ON public.orders(stripe_session_id);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Only the service role (webhook) can read/write orders. The shop owner
-- can be granted admin access later via a roles table.
CREATE POLICY "Service role manages orders"
  ON public.orders FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER orders_set_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();