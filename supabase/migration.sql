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
CREATE POLICY  "Anyone can read visible projects"
  ON projects FOR SELECT
  USING (visible = true);

-- Any authenticated user is admin (login page is private, no public sign-up)
CREATE POLICY  "Authenticated users can read all projects"
  ON projects FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY  "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY  "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY  "Authenticated users can delete projects"
  ON projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- 5. RLS policies for admins table (kept for audit, but no longer required by app)
CREATE POLICY  "Users can read own admin record"
  ON admins FOR SELECT
  USING (auth.uid() = id);

-- 6. Storage bucket for project images
-- Create bucket: Go to Storage → Create a new bucket named "projects" (public bucket)
-- Then run the storage policies from fix-rls-security.sql

-- 7. Create admin users
-- Instructions:
--   a. Go to Authentication → Users → Add User (enter email + password)
--   b. Done — no need to insert into admins table (any authenticated user is admin)
