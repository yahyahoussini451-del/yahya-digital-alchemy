-- Create apps table for portfolio
CREATE TABLE public.apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  category TEXT NOT NULL,
  gradient TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;

-- Anyone can view apps
CREATE POLICY "Anyone can view apps"
ON public.apps
FOR SELECT
USING (true);

-- Admins can insert apps
CREATE POLICY "Admins can insert apps"
ON public.apps
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update apps
CREATE POLICY "Admins can update apps"
ON public.apps
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete apps
CREATE POLICY "Admins can delete apps"
ON public.apps
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_apps_updated_at
BEFORE UPDATE ON public.apps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for ordering
CREATE INDEX idx_apps_display_order ON public.apps(display_order);