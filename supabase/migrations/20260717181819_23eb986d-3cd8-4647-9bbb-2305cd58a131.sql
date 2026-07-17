
-- =========================================================
-- insights_posts table
-- =========================================================
CREATE TABLE public.insights_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  body_markdown text NOT NULL DEFAULT '',
  featured_image_path text,
  seo_title text,
  meta_description text,
  og_image_url text,
  canonical_url text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.insights_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.insights_posts TO authenticated;
GRANT ALL ON public.insights_posts TO service_role;

ALTER TABLE public.insights_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON public.insights_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Admins can read all posts"
  ON public.insights_posts FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert posts"
  ON public.insights_posts FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts"
  ON public.insights_posts FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts"
  ON public.insights_posts FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER insights_posts_set_updated_at
  BEFORE UPDATE ON public.insights_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX insights_posts_published_idx
  ON public.insights_posts (published, published_at DESC);

-- =========================================================
-- Storage policies for post-images (private bucket)
-- Admins can upload / list / delete; reads are proxied by the app.
-- =========================================================
CREATE POLICY "Admins can view post-images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload post-images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update post-images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete post-images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- Auto-claim admin for the owner email
-- =========================================================
CREATE OR REPLACE FUNCTION public.claim_admin_if_owner()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text;
BEGIN
  IF v_uid IS NULL THEN
    RETURN false;
  END IF;

  SELECT email INTO v_email FROM auth.users WHERE id = v_uid;

  IF lower(coalesce(v_email, '')) = 'aishau6066@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_uid, 'admin'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
    RETURN true;
  END IF;

  RETURN false;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_admin_if_owner() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.claim_admin_if_owner() TO authenticated;

-- =========================================================
-- 3 sample published posts
-- =========================================================
INSERT INTO public.insights_posts (slug, title, excerpt, body_markdown, seo_title, meta_description, published, published_at)
VALUES
(
  'nigerian-sesame-global-demand',
  'Why Global Demand for Nigerian Sesame Keeps Rising',
  'Nigeria is one of the world''s largest sesame producers. Here is what buyers in Asia and the Middle East look for — and how ASMAN Prime Hub ensures every shipment meets it.',
  E'## A quiet giant of African agriculture\n\nSesame is one of Nigeria''s highest-value non-oil exports, with the bulk of shipments moving into Japan, Turkey, India and the Gulf. Demand keeps rising for one reason: buyers want origin-traceable, low-moisture, clean-seed lots — and Nigerian white sesame consistently meets that spec when handled by an experienced exporter.\n\n## What international buyers actually check\n\n- **Purity** — 99% minimum, free from stones and foreign material.\n- **Moisture** — below 6% at loading.\n- **FFA (free fatty acid)** — under 2% for premium contracts.\n- **Origin documents** — NEPC certificate, phytosanitary, certificate of origin.\n\n## How we handle it\n\nEvery ASMAN Prime Hub sesame contract is sourced from vetted farm clusters in Jigawa, Kano and Nasarawa, cleaned at partner facilities, tested pre-shipment, and moved under CIF or FOB terms through Apapa or Tin Can. We handle documentation, inspection and freight coordination end to end.',
  'Nigerian Sesame Export: Why Global Demand Keeps Rising',
  'A practical look at why buyers in Asia and the Middle East keep coming back to Nigerian sesame — and the exact quality specs ASMAN Prime Hub delivers on every shipment.',
  true,
  now() - interval '5 days'
),
(
  'hibiscus-export-guide',
  'Exporting Nigerian Hibiscus: A Buyer''s Guide',
  'Dried hibiscus (zobo) is Nigeria''s fastest-growing herbal export. Learn the grades, the seasons, and the paperwork behind every container we ship.',
  E'## The Nigerian hibiscus opportunity\n\nMexico, Germany and the United States absorb most of Nigeria''s dried hibiscus, using it for beverages, teas and natural food colouring. Prices reward exporters who deliver on colour, cleanliness and consistency — not the lowest FOB.\n\n## Grades we supply\n\n- **Grade A** — deep burgundy calyx, minimal stem, uniform size.\n- **Grade B** — commercial grade for bulk beverage buyers.\n\n## Season and lead time\n\nHarvest runs November through February. Book contracts early — Q1 lots move fast and Q3 stock is limited.\n\n## Compliance\n\nEvery ASMAN shipment ships with NAFDAC documentation, phytosanitary certificate and NEPC endorsement, palletised to buyer spec.',
  'Nigerian Hibiscus Export Guide — Grades, Season, Compliance',
  'Grades, harvest timing and paperwork you should know before importing dried hibiscus from Nigeria — from ASMAN Prime Hub.',
  true,
  now() - interval '2 days'
),
(
  'sourcing-verified-suppliers-nigeria',
  'How We Verify Suppliers Before You Wire a Single Dollar',
  'The single biggest reason international trade deals fail is unverified suppliers. Here is the ASMAN Prime Hub verification playbook.',
  E'## The problem with online sourcing\n\nWhatsApp catalogues and unverified "traders" on trade portals cost importers millions every year. Fake CAC numbers, ghost warehouses, and pre-payment scams are still common in the West African commodity trade.\n\n## Our verification steps\n\n1. **Legal identity check** — CAC number verified against the Corporate Affairs Commission database.\n2. **Physical inspection** — our team visits the warehouse, factory or farm cluster.\n3. **Sample review** — pre-shipment samples tested for spec.\n4. **Banking check** — company account confirmed against registered directors.\n5. **Reference calls** — at least two recent international buyers.\n\n## What you get\n\nA verified supplier report before any funds move, and a single accountable partner (us) if anything goes wrong at loading, transit or discharge.',
  'Supplier Verification in Nigeria — The ASMAN Prime Hub Playbook',
  'The 5-step verification process ASMAN Prime Hub runs on every Nigerian supplier before an international buyer wires a single dollar.',
  true,
  now() - interval '12 hours'
);
