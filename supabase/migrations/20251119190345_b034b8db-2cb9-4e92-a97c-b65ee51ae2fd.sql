-- Create storage buckets for app assets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('app-icons', 'app-icons', true),
  ('app-covers', 'app-covers', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for app icons
CREATE POLICY "Anyone can view app icons"
ON storage.objects FOR SELECT
USING (bucket_id = 'app-icons');

CREATE POLICY "Admins can upload app icons"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'app-icons' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update app icons"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'app-icons' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete app icons"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'app-icons' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Create storage policies for app covers
CREATE POLICY "Anyone can view app covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'app-covers');

CREATE POLICY "Admins can upload app covers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'app-covers' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update app covers"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'app-covers' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete app covers"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'app-covers' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Add new columns to apps table for icon_url and gradient HEX colors
ALTER TABLE apps 
ADD COLUMN IF NOT EXISTS icon_url text,
ADD COLUMN IF NOT EXISTS gradient_start text,
ADD COLUMN IF NOT EXISTS gradient_end text;