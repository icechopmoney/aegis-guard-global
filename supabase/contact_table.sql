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
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contact_submissions
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all contact submissions" ON contact_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update contact submissions" ON contact_submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete contact submissions" ON contact_submissions
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_contact_submissions_updated_at 
  BEFORE UPDATE ON contact_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for audit logging
CREATE TRIGGER contact_submissions_audit
  AFTER INSERT OR UPDATE OR DELETE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION log_changes();
