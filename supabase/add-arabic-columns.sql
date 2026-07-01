-- Run this on your existing projects table to add Arabic columns
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS name_ar TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS alt_ar TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_ar TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS what_we_did_ar JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS features_ar JSONB DEFAULT '[]';

-- Also add storage RLS policies if not done yet
DROP POLICY IF EXISTS "Anyone can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;

CREATE POLICY "Anyone can view project images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'projects');

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
