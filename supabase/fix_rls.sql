-- Fix RLS policies for contact_submissions table

-- First, disable RLS temporarily
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;

-- Create the correct policy for public inserts
CREATE POLICY "Enable insert for all users" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Also allow reads (in case you want to view submissions later)
CREATE POLICY "Enable select for all users" ON contact_submissions
  FOR SELECT USING (true);

-- Optional: Enable updates for status changes
CREATE POLICY "Enable update for all users" ON contact_submissions
  FOR UPDATE USING (true);

-- Check the current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'contact_submissions';
