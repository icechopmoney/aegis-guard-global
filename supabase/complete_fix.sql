-- COMPLETE FIX: Remove all old policies and create new simple ones

-- Drop all existing policies that might cause recursion
DROP POLICY IF EXISTS "Admins can view all certificates" ON vault_certificates;
DROP POLICY IF EXISTS "Admins can insert certificates" ON vault_certificates;
DROP POLICY IF EXISTS "Admins can update certificates" ON vault_certificates;
DROP POLICY IF EXISTS "Admins can delete certificates" ON vault_certificates;
DROP POLICY IF EXISTS "Anyone can view certificates for tracking" ON vault_certificates;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all audit logs" ON audit_logs;
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable select for all users" ON contact_submissions;
DROP POLICY IF EXISTS "Enable update for all users" ON contact_submissions;

-- Disable RLS on all tables temporarily
ALTER TABLE vault_certificates DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS only on tables we need
ALTER TABLE vault_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create simple, non-recursive policies

-- Policy for vault_certificates - allow anyone to read (for tracking)
CREATE POLICY "Public read access for certificates" ON vault_certificates
  FOR SELECT USING (true);

-- Policy for contact_submissions - allow anyone to insert (contact form)
CREATE POLICY "Public insert for contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Also allow reading contact submissions (for admin viewing in Supabase)
CREATE POLICY "Public read for contact submissions" ON contact_submissions
  FOR SELECT USING (true);

-- Verify the policies are correct
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual 
FROM pg_policies 
WHERE tablename IN ('vault_certificates', 'contact_submissions')
ORDER BY tablename, policyname;
