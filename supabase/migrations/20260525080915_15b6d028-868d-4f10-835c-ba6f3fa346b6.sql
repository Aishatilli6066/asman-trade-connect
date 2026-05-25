
CREATE TABLE public.trade_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  service_interest TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  company TEXT,
  country TEXT NOT NULL,
  trade_interest TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.export_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  commodity TEXT NOT NULL,
  quantity TEXT NOT NULL,
  shipping_destination TEXT NOT NULL,
  shipping_method TEXT,
  requirements TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.trade_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit trade inquiries"
  ON public.trade_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can submit consultation requests"
  ON public.consultation_requests FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can submit export inquiries"
  ON public.export_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
