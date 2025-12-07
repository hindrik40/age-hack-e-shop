-- Create cart_recovery_emails table for tracking recovery email campaigns
CREATE TABLE cart_recovery_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email_type VARCHAR(20) NOT NULL CHECK (email_type IN ('first', 'reminder', 'final')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  opened BOOLEAN DEFAULT FALSE,
  clicked BOOLEAN DEFAULT FALSE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_cart_recovery_emails_user_id ON cart_recovery_emails(user_id);
CREATE INDEX idx_cart_recovery_emails_email_type ON cart_recovery_emails(email_type);
CREATE INDEX idx_cart_recovery_emails_sent_at ON cart_recovery_emails(sent_at DESC);
CREATE INDEX idx_cart_recovery_emails_opened ON cart_recovery_emails(opened);
CREATE INDEX idx_cart_recovery_emails_clicked ON cart_recovery_emails(clicked);

-- Grant permissions
GRANT ALL ON cart_recovery_emails TO authenticated;
GRANT SELECT ON cart_recovery_emails TO anon;

-- Create RLS (Row Level Security) policies
ALTER TABLE cart_recovery_emails ENABLE ROW LEVEL SECURITY;

-- Users can only see their own recovery emails
CREATE POLICY "Users can view own recovery emails" ON cart_recovery_emails
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own recovery emails
CREATE POLICY "Users can insert own recovery emails" ON cart_recovery_emails
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update opened_at when opened is set to true
CREATE OR REPLACE FUNCTION update_cart_recovery_opened_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.opened = TRUE AND OLD.opened = FALSE THEN
    NEW.opened_at = TIMEZONE('utc'::text, NOW());
  END IF;
  IF NEW.clicked = TRUE AND OLD.clicked = FALSE THEN
    NEW.clicked_at = TIMEZONE('utc'::text, NOW());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update opened_at and clicked_at
CREATE TRIGGER update_cart_recovery_timestamps_trigger
  BEFORE UPDATE ON cart_recovery_emails
  FOR EACH ROW
  EXECUTE FUNCTION update_cart_recovery_opened_at();