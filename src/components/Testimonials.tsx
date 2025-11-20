import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  quote_en: string;
  quote_fr: string;
  quote_ar: string;
  author_en: string;
  author_fr: string;
  author_ar: string;
  role_en: string;
  role_fr: string;
  role_ar: string;
  avatar_url?: string;
}

export const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLangField = (field: 'quote' | 'author' | 'role', testimonial: Testimonial) => {
    const lang = i18n.language;
    if (lang === 'fr') return testimonial[`${field}_fr`];
    if (lang === 'ar') return testimonial[`${field}_ar`];
    return testimonial[`${field}_en`];
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20 md:py-32">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            {t('testimonials.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 relative"
              >
                <Quote className="absolute top-4 right-4 w-10 h-10 text-accent/20" />
                <div className="relative z-10">
                  <p className="text-base text-muted-foreground mb-4 leading-relaxed italic line-clamp-4">
                    "{getLangField('quote', testimonial)}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.id}`}
                      alt={getLangField('author', testimonial)}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm">{getLangField('author', testimonial)}</div>
                      <div className="text-xs text-muted-foreground">{getLangField('role', testimonial)}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
