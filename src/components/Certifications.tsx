import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedCertificates } from '@/components/ui/animated-certificates';
import certGoogleBI1 from '@/assets/cert-google-bi-1.png';
import certGoogleBI2 from '@/assets/cert-google-bi-2.png';
import certMarketingDigital from '@/assets/cert-marketing-digital.png';

export const Certifications = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const certificates = [
    {
      title: t('certifications.googleBI1.title'),
      issuer: t('certifications.googleBI1.issuer'),
      date: t('certifications.googleBI1.date'),
      description: t('certifications.googleBI1.description'),
      src: certGoogleBI1
    },
    {
      title: t('certifications.googleBI2.title'),
      issuer: t('certifications.googleBI2.issuer'),
      date: t('certifications.googleBI2.date'),
      description: t('certifications.googleBI2.description'),
      src: certGoogleBI2
    },
    {
      title: t('certifications.marketingDigital.title'),
      issuer: t('certifications.marketingDigital.issuer'),
      date: t('certifications.marketingDigital.date'),
      description: t('certifications.marketingDigital.description'),
      src: certMarketingDigital
    }
  ];

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
