-- Enum of platform roles
CREATE TYPE public.platform_role AS ENUM ('buyer_importer','supplier_exporter','logistics_provider','asman_analyst','administrator');

-- ---------- profiles ----------
CREATE TABLE public.profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  phone text,
  country text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins read all profiles" ON public.profiles FOR SELECT TO authenticated USING (app_private.has_role(auth.uid(), 'admin'::public.app_role));

-- ---------- platform_roles ----------
CREATE TABLE public.platform_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.platform_role NOT NULL,
  granted_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT, INSERT ON public.platform_roles TO authenticated;
GRANT ALL ON public.platform_roles TO service_role;
ALTER TABLE public.platform_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own platform roles" ON public.platform_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users self-assign public roles only" ON public.platform_roles FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND role IN ('buyer_importer'::public.platform_role,'supplier_exporter'::public.platform_role,'logistics_provider'::public.platform_role)
  );
CREATE POLICY "Admins manage platform roles" ON public.platform_roles FOR ALL TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION app_private.has_platform_role(_user_id uuid, _role public.platform_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, app_private AS $$
  SELECT EXISTS (SELECT 1 FROM public.platform_roles WHERE user_id = _user_id AND role = _role)
$$;

-- ---------- companies ----------
CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name text NOT NULL,
  trading_name text,
  country text NOT NULL,
  registration_number text,
  website text,
  business_type text NOT NULL,
  primary_contact_name text NOT NULL,
  primary_contact_email text NOT NULL,
  primary_contact_phone text,
  verification_status text NOT NULL DEFAULT 'unverified',
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.companies TO authenticated;
GRANT ALL ON public.companies TO service_role;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- ---------- company_memberships ----------
CREATE TABLE public.company_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  membership_role text NOT NULL DEFAULT 'owner',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, user_id)
);
GRANT SELECT, INSERT, UPDATE ON public.company_memberships TO authenticated;
GRANT ALL ON public.company_memberships TO service_role;
ALTER TABLE public.company_memberships ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION app_private.is_company_member(_company_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, app_private AS $$
  SELECT EXISTS (SELECT 1 FROM public.company_memberships WHERE company_id = _company_id AND user_id = _user_id)
$$;

CREATE OR REPLACE FUNCTION app_private.is_company_owner(_company_id uuid, _user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, app_private AS $$
  SELECT EXISTS (SELECT 1 FROM public.company_memberships WHERE company_id = _company_id AND user_id = _user_id AND membership_role = 'owner')
$$;

CREATE POLICY "Members read their companies" ON public.companies FOR SELECT TO authenticated
  USING (app_private.is_company_member(id, auth.uid()) OR created_by = auth.uid() OR app_private.has_role(auth.uid(),'admin'::public.app_role));
CREATE POLICY "Users create companies" ON public.companies FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid() AND verification_status = 'unverified');
CREATE POLICY "Owners update their company" ON public.companies FOR UPDATE TO authenticated
  USING (app_private.is_company_owner(id, auth.uid()) OR app_private.has_role(auth.uid(),'admin'::public.app_role))
  WITH CHECK (app_private.is_company_owner(id, auth.uid()) OR app_private.has_role(auth.uid(),'admin'::public.app_role));

CREATE POLICY "Members read memberships of their companies" ON public.company_memberships FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR app_private.is_company_member(company_id, auth.uid()) OR app_private.has_role(auth.uid(),'admin'::public.app_role));
CREATE POLICY "Creators join their own company" ON public.company_memberships FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (SELECT 1 FROM public.companies c WHERE c.id = company_id AND c.created_by = auth.uid())
  );
CREATE POLICY "Owners update memberships" ON public.company_memberships FOR UPDATE TO authenticated
  USING (app_private.is_company_owner(company_id, auth.uid()) OR app_private.has_role(auth.uid(),'admin'::public.app_role))
  WITH CHECK (app_private.is_company_owner(company_id, auth.uid()) OR app_private.has_role(auth.uid(),'admin'::public.app_role));

-- ---------- onboarding_progress ----------
CREATE TABLE public.onboarding_progress (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role_selected boolean NOT NULL DEFAULT false,
  profile_completed boolean NOT NULL DEFAULT false,
  company_completed boolean NOT NULL DEFAULT false,
  current_step text NOT NULL DEFAULT 'role',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.onboarding_progress TO authenticated;
GRANT ALL ON public.onboarding_progress TO service_role;
ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own onboarding" ON public.onboarding_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own onboarding" ON public.onboarding_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own onboarding" ON public.onboarding_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins read onboarding" ON public.onboarding_progress FOR SELECT TO authenticated USING (app_private.has_role(auth.uid(),'admin'::public.app_role));

-- ---------- updated_at triggers ----------
CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER platform_roles_set_updated_at BEFORE UPDATE ON public.platform_roles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER companies_set_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER company_memberships_set_updated_at BEFORE UPDATE ON public.company_memberships FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER onboarding_progress_set_updated_at BEFORE UPDATE ON public.onboarding_progress FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();