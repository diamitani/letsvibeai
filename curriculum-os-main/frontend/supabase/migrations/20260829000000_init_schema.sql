-- CurriculumOS Initial MVP Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (Tied to Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  stripe_customer_id TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Brand Kits
CREATE TABLE public.brand_kits (
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
CREATE POLICY "Users can view own brand kits" ON public.brand_kits FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Users can insert own brand kits" ON public.brand_kits FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own brand kits" ON public.brand_kits FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own brand kits" ON public.brand_kits FOR DELETE USING (auth.uid() = author_id);

-- 3. Curricula
CREATE TABLE public.curricula (
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
CREATE POLICY "Users can view own curricula" ON public.curricula FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Users can view published curricula" ON public.curricula FOR SELECT USING (status = 'published');
CREATE POLICY "Users can insert own curricula" ON public.curricula FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own curricula" ON public.curricula FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own curricula" ON public.curricula FOR DELETE USING (auth.uid() = author_id);

-- 4. Modules
CREATE TABLE public.modules (
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
-- For modules, we check if the user owns the parent curriculum, or if the parent curriculum is published.
CREATE POLICY "Users can view modules of published curricula" ON public.modules FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.curricula WHERE id = modules.curriculum_id AND status = 'published')
);
CREATE POLICY "Users can view own modules" ON public.modules FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.curricula WHERE id = modules.curriculum_id AND author_id = auth.uid())
);
CREATE POLICY "Users can manage own modules" ON public.modules FOR ALL USING (
  EXISTS (SELECT 1 FROM public.curricula WHERE id = modules.curriculum_id AND author_id = auth.uid())
);

-- 5. Video Assets
CREATE TABLE public.video_assets (
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
CREATE POLICY "Users can view own video assets" ON public.video_assets FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.modules m 
    JOIN public.curricula c ON m.curriculum_id = c.id 
    WHERE m.id = video_assets.module_id AND (c.author_id = auth.uid() OR c.status = 'published')
  )
);
CREATE POLICY "Users can manage own video assets" ON public.video_assets FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.modules m 
    JOIN public.curricula c ON m.curriculum_id = c.id 
    WHERE m.id = video_assets.module_id AND c.author_id = auth.uid()
  )
);

-- Function to automatically update 'updated_at' on modify
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_brand_kits_modtime BEFORE UPDATE ON public.brand_kits FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_curricula_modtime BEFORE UPDATE ON public.curricula FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_modules_modtime BEFORE UPDATE ON public.modules FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_video_assets_modtime BEFORE UPDATE ON public.video_assets FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Setup Auth Trigger for Profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
