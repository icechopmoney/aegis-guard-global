-- Prime Vault Services Database Schema
-- Vault Certificates Table
CREATE TABLE vault_certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_reference VARCHAR(20) UNIQUE NOT NULL,
  vault_code VARCHAR(50) NOT NULL,
  assigned_custodian VARCHAR(100) NOT NULL,
  transaction_code VARCHAR(50) NOT NULL,
  security_code VARCHAR(50) NOT NULL,
  depositor_name VARCHAR(200) NOT NULL,
  depositor_nationality VARCHAR(100) NOT NULL,
  next_of_kin VARCHAR(200) NOT NULL,
  next_of_kin_nationality VARCHAR(100) NOT NULL,
  date_of_deposit DATE NOT NULL,
  purpose_of_deposit TEXT NOT NULL,
  security_charges VARCHAR(50) NOT NULL,
  consignment_package VARCHAR(200) NOT NULL,
  consignment_content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Admin Users Table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  permissions JSONB DEFAULT '["certificates:read", "certificates:write", "certificates:delete"]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Audit Logs Table
CREATE TABLE audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name VARCHAR(50) NOT NULL,
  record_id UUID NOT NULL,
  action VARCHAR(20) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE vault_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vault_certificates
CREATE POLICY "Admins can view all certificates" ON vault_certificates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert certificates" ON vault_certificates
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update certificates" ON vault_certificates
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete certificates" ON vault_certificates
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- RLS Policies for admin_users
CREATE POLICY "Admins can view all admin users" ON admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- RLS Policies for audit_logs
CREATE POLICY "Admins can view all audit logs" ON audit_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_vault_certificates_tracking_reference ON vault_certificates(tracking_reference);
CREATE INDEX idx_vault_certificates_status ON vault_certificates(status);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_vault_certificates_updated_at 
  BEFORE UPDATE ON vault_certificates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to log changes
CREATE OR REPLACE FUNCTION log_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (table_name, record_id, action, old_data, user_id)
    VALUES (TG_TABLE_NAME, OLD.id, TG_OP, row_to_json(OLD), auth.uid());
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (table_name, record_id, action, old_data, new_data, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(OLD), row_to_json(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (table_name, record_id, action, new_data, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(NEW), auth.uid());
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers for audit logging
CREATE TRIGGER vault_certificates_audit
  AFTER INSERT OR UPDATE OR DELETE ON vault_certificates
  FOR EACH ROW EXECUTE FUNCTION log_changes();

-- Insert sample data
INSERT INTO vault_certificates (
  tracking_reference, vault_code, assigned_custodian, transaction_code, security_code,
  depositor_name, depositor_nationality, next_of_kin, next_of_kin_nationality,
  date_of_deposit, purpose_of_deposit, security_charges, consignment_package, consignment_content
) VALUES 
(
  'AF-2026-0042', 'VC-8741-ZRCH-A3', 'Col. Heinrich Brauer', 'TXN-2026-AF0042-GLD', 'SEC-9827-DELTA-7X',
  'Laurent M. Beaumont', 'France', 'Isabelle C. Beaumont', 'France',
  '2026-02-24', 'Private Storage — Long-Term Investment Holding', 'CHF 47,500.00 / Annum',
  'Sealed Vault Crate — Class IV Armored', 'Gold Bullion — 12 × 1kg LBMA-Certified Bars'
),
(
  'AF-2026-0099', 'VC-3392-ZRCH-B7', 'Cmdr. Elena Vogt', 'TXN-2026-AF0099-ART', 'SEC-5510-OMEGA-2K',
  'Dimitri A. Konstantinos', 'Greece', 'Sophia E. Konstantinos', 'Greece',
  '2026-02-10', 'Legal Custody — Insured Art Collection', 'CHF 62,000.00 / Annum',
  'Climate-Controlled Precious Metals Locker', 'Fine Art — 4 Paintings, Authenticated & Insured ($12.4M)'
),
(
  'AF-2026-0155', 'VC-6178-SING-D1', 'Maj. Rajesh Anand', 'TXN-2026-AF0155-CUR', 'SEC-7743-ALPHA-9R',
  'Chen Wei Lin', 'Singapore', 'Chen Mei Xiang', 'Singapore',
  '2026-01-15', 'International Transfer — Multi-Denomination Currency', 'SGD 28,750.00 / Annum',
  'Armored Case — Dual-Lock Biometric Seal', 'Currency — Multi-Denomination (USD, EUR, GBP, CHF) — $3.2M Equivalent'
);
