import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import profileImage from '@/assets/yahya-profile.webp';

export const About = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            {t('about.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={profileImage}
                  alt="Yahya Houssini - Professional Web Developer and Branding Expert in Morocco"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width="600"
                  height="600"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsl(330,81%,60%)] to-[hsl(340,82%,52%)] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.bio')}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center p-4 rounded-xl bg-secondary">
                  <div className="text-3xl font-bold text-gradient mb-1">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary">
                  <div className="text-3xl font-bold text-gradient mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary">
                  <div className="text-3xl font-bold text-gradient mb-1">30+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
