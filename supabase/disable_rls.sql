-- QUICK FIX: Disable RLS completely on all tables
-- This will allow public access to both certificate tracking and contact forms

ALTER TABLE vault_certificates DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- Check that RLS is disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('vault_certificates', 'contact_submissions');
