-- Create testimonials table with multi-language support
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_en TEXT NOT NULL,
  quote_fr TEXT NOT NULL,
  quote_ar TEXT NOT NULL,
  author_en TEXT NOT NULL,
  author_fr TEXT NOT NULL,
  author_ar TEXT NOT NULL,
  role_en TEXT NOT NULL,
  role_fr TEXT NOT NULL,
  role_ar TEXT NOT NULL,
  avatar_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view testimonials" 
ON public.testimonials 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update testimonials" 
ON public.testimonials 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete testimonials" 
ON public.testimonials 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();