-- Add demo_url column to apps table
ALTER TABLE apps 
ADD COLUMN IF NOT EXISTS demo_url text;