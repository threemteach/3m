  -- ============================================================
  -- Triple M — Security Fixes
  -- Run this AFTER migration.sql
  -- ============================================================

  -- 1. Fix: Restrict admins table to own record only
  --    Before: any authenticated user could list all admin emails/UUIDs
  --    After: only the current user can see their own admin record
  DROP POLICY IF EXISTS "Authenticated users can read admins" ON admins;
  DROP POLICY IF EXISTS "Users can read own admin record" ON admins;
  CREATE POLICY "Users can read own admin record"
    ON admins FOR SELECT
    USING (auth.uid() = id);

  -- 2. Auto-update updated_at on project changes
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
  CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

  -- 3. Simplify: any authenticated user is admin (login page is private)
  DROP POLICY IF EXISTS "Admins can read all projects" ON projects;
  DROP POLICY IF EXISTS "Admins can insert projects" ON projects;
  DROP POLICY IF EXISTS "Admins can update projects" ON projects;
  DROP POLICY IF EXISTS "Admins can delete projects" ON projects;
  DROP POLICY IF EXISTS "Authenticated users can read all projects" ON projects;
  DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
  DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
  DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;

  CREATE POLICY "Authenticated users can read all projects"
    ON projects FOR SELECT
    USING (auth.role() = 'authenticated');

  CREATE POLICY "Authenticated users can insert projects"
    ON projects FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

  CREATE POLICY "Authenticated users can update projects"
    ON projects FOR UPDATE
    USING (auth.role() = 'authenticated');

  CREATE POLICY "Authenticated users can delete projects"
    ON projects FOR DELETE
    USING (auth.role() = 'authenticated');

  -- Storage: same simplification
  DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
  DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;

  CREATE POLICY "Authenticated users can upload project images"
    ON storage.objects FOR INSERT
    WITH CHECK (
      bucket_id = 'projects'
      AND auth.role() = 'authenticated'
    );

  CREATE POLICY "Authenticated users can delete project images"
    ON storage.objects FOR DELETE
    USING (
      bucket_id = 'projects'
      AND auth.role() = 'authenticated'
    );

  -- 4. Ensure RLS is enabled (safe to re-run)
  ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
  ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
