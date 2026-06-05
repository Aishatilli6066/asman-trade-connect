
ALTER TABLE public.trade_inquiries ALTER COLUMN company_name DROP NOT NULL;
ALTER TABLE public.trade_inquiries
  ADD COLUMN IF NOT EXISTS business_type text,
  ADD COLUMN IF NOT EXISTS product_required text,
  ADD COLUMN IF NOT EXISTS quantity text,
  ADD COLUMN IF NOT EXISTS budget_range text,
  ADD COLUMN IF NOT EXISTS timeline text,
  ADD COLUMN IF NOT EXISTS target_market text,
  ADD COLUMN IF NOT EXISTS shipping_method text,
  ADD COLUMN IF NOT EXISTS consent boolean DEFAULT false;

DROP POLICY IF EXISTS "Anyone can submit trade inquiries" ON public.trade_inquiries;
CREATE POLICY "Anyone can submit trade inquiries"
  ON public.trade_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(country) BETWEEN 1 AND 100
    AND length(whatsapp) BETWEEN 3 AND 50
    AND length(service_interest) BETWEEN 1 AND 200
    AND length(message) BETWEEN 1 AND 5000
  );
