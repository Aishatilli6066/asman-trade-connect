CREATE SCHEMA IF NOT EXISTS app_private;
REVOKE ALL ON SCHEMA app_private FROM public, anon;
GRANT USAGE ON SCHEMA app_private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION app_private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION app_private.has_role(uuid, public.app_role) FROM public, anon;
GRANT EXECUTE ON FUNCTION app_private.has_role(uuid, public.app_role) TO authenticated, service_role;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
GRANT SELECT ON public.insights_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.insights_posts TO authenticated;
GRANT ALL ON public.insights_posts TO service_role;

DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can view trade inquiries"
  ON public.trade_inquiries
  USING (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can view consultation requests"
  ON public.consultation_requests
  USING (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can view export inquiries"
  ON public.export_inquiries
  USING (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can read all posts"
  ON public.insights_posts
  USING (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can insert posts"
  ON public.insights_posts
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can update posts"
  ON public.insights_posts
  USING (app_private.has_role(auth.uid(), 'admin'))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can delete posts"
  ON public.insights_posts
  USING (app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can view post-images"
  ON storage.objects
  USING (bucket_id = 'post-images' AND app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can upload post-images"
  ON storage.objects
  WITH CHECK (bucket_id = 'post-images' AND app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can update post-images"
  ON storage.objects
  USING (bucket_id = 'post-images' AND app_private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins can delete post-images"
  ON storage.objects
  USING (bucket_id = 'post-images' AND app_private.has_role(auth.uid(), 'admin'));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.claim_admin_if_owner() FROM public, anon, authenticated;