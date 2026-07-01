-- ============================================================
-- Triple M — Security Fixes
-- Run this AFTER migration.sql
-- ============================================================

-- 1. Fix: Restrict admins table to own record only
--    Before: any authenticated user could list all admin emails/UUIDs
--    After: only the current user can see their own admin record
DROP POLICY IF EXISTS "Authenticated users can read admins" ON admins;
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

-- 3. Ensure RLS is enabled (safe to re-run)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
