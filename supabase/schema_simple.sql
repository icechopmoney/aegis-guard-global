-- Prime Vault Services Database Schema (Simplified - No Admin Interface)

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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Form Submissions Table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, reviewed, responded
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE vault_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vault_certificates (public read access for tracking)
CREATE POLICY "Anyone can view certificates for tracking" ON vault_certificates
  FOR SELECT USING (true);

-- RLS Policies for contact_submissions (anyone can submit)
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_vault_certificates_tracking_reference ON vault_certificates(tracking_reference);
CREATE INDEX idx_vault_certificates_status ON vault_certificates(status);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_vault_certificates_updated_at 
  BEFORE UPDATE ON vault_certificates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at 
  BEFORE UPDATE ON contact_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for certificates
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
