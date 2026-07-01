-- ============================================================
-- Triple M — Supabase Migration
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql/new)
-- ============================================================

-- 1. Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- English
  name TEXT NOT NULL DEFAULT '',
  url TEXT DEFAULT '',
  light TEXT DEFAULT '',
  dark TEXT DEFAULT '',
  alt TEXT DEFAULT '',
  tag TEXT DEFAULT 'Web App',
  description TEXT DEFAULT '',
  what_we_did JSONB DEFAULT '[]',
  tech JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  -- Arabic
  name_ar TEXT NOT NULL DEFAULT '',
  alt_ar TEXT DEFAULT '',
  description_ar TEXT DEFAULT '',
  what_we_did_ar JSONB DEFAULT '[]',
  features_ar JSONB DEFAULT '[]',
  -- Meta
  visible BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Admins table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies for projects
-- Anyone (even anonymous) can read visible projects
CREATE POLICY "Anyone can read visible projects"
  ON projects FOR SELECT
  USING (visible = true);

-- Authenticated admins can read ALL projects (including hidden)
CREATE POLICY "Admins can read all projects"
  ON projects FOR SELECT
  USING (auth.role() = 'authenticated' AND auth.uid() IN (SELECT id FROM admins));

-- Only admins can insert
CREATE POLICY "Admins can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() IN (SELECT id FROM admins));

-- Only admins can update
CREATE POLICY "Admins can update projects"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated' AND auth.uid() IN (SELECT id FROM admins));

-- Only admins can delete
CREATE POLICY "Admins can delete projects"
  ON projects FOR DELETE
  USING (auth.role() = 'authenticated' AND auth.uid() IN (SELECT id FROM admins));

-- 5. RLS policies for admins table
-- Any authenticated user can read the admins table (needed to check if they're an admin)
CREATE POLICY "Authenticated users can read admins"
  ON admins FOR SELECT
  USING (auth.role() = 'authenticated');

-- 6. Storage bucket for project images
-- Run this separately in the Supabase dashboard:
-- Go to Storage → Create a new bucket named "projects" (public bucket)

-- 7. Seed: Insert first admin (replace with actual user ID after creating user)
-- Instructions:
--   a. Go to Authentication → Users → Invite user: mahmoudmagdyn123@gmail.com
--   b. After user accepts, get the user ID from Authentication → Users
--   c. Run: INSERT INTO admins (id, email) VALUES ('<user-id-from-step-b>', 'mahmoudmagdyn123@gmail.com');
