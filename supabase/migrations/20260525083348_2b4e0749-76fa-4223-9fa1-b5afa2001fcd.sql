
-- Admin role infrastructure
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admin-only SELECT policies on inquiry tables
CREATE POLICY "Admins can view trade inquiries" ON public.trade_inquiries
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view consultation requests" ON public.consultation_requests
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view export inquiries" ON public.export_inquiries
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Tighten public INSERT policies with basic length validation
DROP POLICY IF EXISTS "Anyone can submit trade inquiries" ON public.trade_inquiries;
CREATE POLICY "Anyone can submit trade inquiries" ON public.trade_inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(company_name) BETWEEN 1 AND 200
    AND length(country) BETWEEN 1 AND 100
    AND length(whatsapp) BETWEEN 3 AND 50
    AND length(service_interest) BETWEEN 1 AND 200
    AND length(message) BETWEEN 1 AND 5000
  );

DROP POLICY IF EXISTS "Anyone can submit consultation requests" ON public.consultation_requests;
CREATE POLICY "Anyone can submit consultation requests" ON public.consultation_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(whatsapp) BETWEEN 3 AND 50
    AND length(country) BETWEEN 1 AND 100
    AND length(trade_interest) BETWEEN 1 AND 300
    AND (company IS NULL OR length(company) <= 200)
    AND (budget_range IS NULL OR length(budget_range) <= 100)
    AND (timeline IS NULL OR length(timeline) <= 100)
    AND (notes IS NULL OR length(notes) <= 5000)
  );

DROP POLICY IF EXISTS "Anyone can submit export inquiries" ON public.export_inquiries;
CREATE POLICY "Anyone can submit export inquiries" ON public.export_inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 200
    AND length(company_name) BETWEEN 1 AND 200
    AND length(country) BETWEEN 1 AND 100
    AND length(email) BETWEEN 3 AND 320
    AND length(whatsapp) BETWEEN 3 AND 50
    AND length(commodity) BETWEEN 1 AND 200
    AND length(quantity) BETWEEN 1 AND 200
    AND length(shipping_destination) BETWEEN 1 AND 200
    AND (shipping_method IS NULL OR length(shipping_method) <= 100)
    AND (requirements IS NULL OR length(requirements) <= 5000)
  );
