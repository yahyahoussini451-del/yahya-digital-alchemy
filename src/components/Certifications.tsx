import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { AnimatedCertificates } from '@/components/ui/animated-certificates';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface Certification {
  id: string;
  title_en: string;
  title_fr: string;
  title_ar: string;
  issuer_en: string;
  issuer_fr: string;
  issuer_ar: string;
  description_en?: string;
  description_fr?: string;
  description_ar?: string;
  date_en?: string;
  date_fr?: string;
  date_ar?: string;
  image_url: string;
  credential_url?: string;
}

export const Certifications = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCertifications(data || []);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLangField = (field: 'title' | 'issuer' | 'description' | 'date', cert: Certification) => {
    const lang = i18n.language;
    if (lang === 'fr') return cert[`${field}_fr`];
    if (lang === 'ar') return cert[`${field}_ar`];
    return cert[`${field}_en`];
  };

  const certificates = certifications.map(cert => ({
    title: getLangField('title', cert),
    issuer: getLangField('issuer', cert),
    date: getLangField('date', cert) || '',
    description: getLangField('description', cert) || '',
    src: cert.image_url,
    credentialUrl: cert.credential_url
  }));

  if (loading) {
    return (
      <section id="certifications" className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-20 md:py-32 bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {t('certifications.title')}
          </h2>
          
          <AnimatedCertificates certificates={certificates} autoplay={true} />
        </motion.div>
      </div>
    </section>
  );
};
