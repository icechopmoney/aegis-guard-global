-- Add ownership column to vault_certificates (run in Supabase SQL Editor)
-- Ownership appears in the certificate header; Assigned Custodian moves to details next to Depositor Nationality.

ALTER TABLE vault_certificates
ADD COLUMN IF NOT EXISTS ownership text;

-- Backfill existing rows: set ownership from assigned_custodian so current data still displays
UPDATE vault_certificates
SET ownership = assigned_custodian
WHERE ownership IS NULL;

-- Optional: make ownership required for new rows (uncomment if desired)
-- ALTER TABLE vault_certificates ALTER COLUMN ownership SET NOT NULL;
