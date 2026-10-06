-- CurriculumOS Initial MVP Schema (Idempotent)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (Tied to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  stripe_customer_id TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Public profiles are viewable by everyone.') THEN
    CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile.') THEN
    CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile.') THEN
    CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- 2. Brand Kits
CREATE TABLE IF NOT EXISTS public.brand_kits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  font_body TEXT DEFAULT 'Inter',
  font_display TEXT DEFAULT 'Playfair Display',
  color_primary TEXT DEFAULT '#000000',
  color_secondary TEXT DEFAULT '#ffffff',
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for brand_kits
ALTER TABLE public.brand_kits ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'brand_kits' AND policyname = 'Users can view own brand kits') THEN
    CREATE POLICY "Users can view own brand kits" ON public.brand_kits FOR SELECT USING (auth.uid() = author_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'brand_kits' AND policyname = 'Users can insert own brand kits') THEN
    CREATE POLICY "Users can insert own brand kits" ON public.brand_kits FOR INSERT WITH CHECK (auth.uid() = author_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'brand_kits' AND policyname = 'Users can update own brand kits') THEN
    CREATE POLICY "Users can update own brand kits" ON public.brand_kits FOR UPDATE USING (auth.uid() = author_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'brand_kits' AND policyname = 'Users can delete own brand kits') THEN
    CREATE POLICY "Users can delete own brand kits" ON public.brand_kits FOR DELETE USING (auth.uid() = author_id);
  END IF;
END $$;

-- 3. Curricula
CREATE TABLE IF NOT EXISTS public.curricula (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  brand_kit_id UUID REFERENCES public.brand_kits(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_audience TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for curricula
ALTER TABLE public.curricula ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'curricula' AND policyname = 'Users can view own curricula') THEN
    CREATE POLICY "Users can view own curricula" ON public.curricula FOR SELECT USING (auth.uid() = author_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'curricula' AND policyname = 'Users can view published curricula') THEN
    CREATE POLICY "Users can view published curricula" ON public.curricula FOR SELECT USING (status = 'published');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'curricula' AND policyname = 'Users can insert own curricula') THEN
    CREATE POLICY "Users can insert own curricula" ON public.curricula FOR INSERT WITH CHECK (auth.uid() = author_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'curricula' AND policyname = 'Users can update own curricula') THEN
    CREATE POLICY "Users can update own curricula" ON public.curricula FOR UPDATE USING (auth.uid() = author_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'curricula' AND policyname = 'Users can delete own curricula') THEN
    CREATE POLICY "Users can delete own curricula" ON public.curricula FOR DELETE USING (auth.uid() = author_id);
  END IF;
END $$;

-- 4. Modules
CREATE TABLE IF NOT EXISTS public.modules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  curriculum_id UUID REFERENCES public.curricula(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  order_index INTEGER DEFAULT 0,
  estimated_duration_mins INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for modules
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'modules' AND policyname = 'Users can view modules of published curricula') THEN
    CREATE POLICY "Users can view modules of published curricula" ON public.modules FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.curricula WHERE id = modules.curriculum_id AND status = 'published')
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'modules' AND policyname = 'Users can view own modules') THEN
    CREATE POLICY "Users can view own modules" ON public.modules FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.curricula WHERE id = modules.curriculum_id AND author_id = auth.uid())
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'modules' AND policyname = 'Users can manage own modules') THEN
    CREATE POLICY "Users can manage own modules" ON public.modules FOR ALL USING (
      EXISTS (SELECT 1 FROM public.curricula WHERE id = modules.curriculum_id AND author_id = auth.uid())
    );
  END IF;
END $$;

-- 5. Video Assets
CREATE TABLE IF NOT EXISTS public.video_assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'rendering', 'completed', 'failed')),
  mp4_url TEXT,
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for video_assets
ALTER TABLE public.video_assets ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'video_assets' AND policyname = 'Users can view own video assets') THEN
    CREATE POLICY "Users can view own video assets" ON public.video_assets FOR SELECT USING (
      EXISTS (
        SELECT 1 FROM public.modules
        JOIN public.curricula ON public.modules.curriculum_id = public.curricula.id
        WHERE public.modules.id = video_assets.module_id AND public.curricula.author_id = auth.uid()
      )
    );
  END IF;
END $$;
