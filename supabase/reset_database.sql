-- Drop existing tables if they exist
DROP TABLE IF EXISTS contact_submissions;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS vault_certificates;

-- Drop existing functions and triggers
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS log_changes();

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view all certificates" ON vault_certificates;
DROP POLICY IF EXISTS "Admins can insert certificates" ON vault_certificates;
DROP POLICY IF EXISTS "Admins can update certificates" ON vault_certificates;
DROP POLICY IF EXISTS "Admins can delete certificates" ON vault_certificates;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all audit logs" ON audit_logs;
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;

-- Now run the new schema (copy and paste the contents of schema_simple.sql after this)
