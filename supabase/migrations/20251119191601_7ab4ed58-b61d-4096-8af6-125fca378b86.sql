-- Create certifications table with multi-language support
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  issuer_en TEXT NOT NULL,
  issuer_fr TEXT NOT NULL,
  issuer_ar TEXT NOT NULL,
  description_en TEXT,
  description_fr TEXT,
  description_ar TEXT,
  image_url TEXT NOT NULL,
  credential_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view certifications"
ON public.certifications FOR SELECT
USING (true);

CREATE POLICY "Admins can insert certifications"
ON public.certifications FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update certifications"
ON public.certifications FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete certifications"
ON public.certifications FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_certifications_updated_at
BEFORE UPDATE ON public.certifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();