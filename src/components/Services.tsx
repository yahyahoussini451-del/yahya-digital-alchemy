import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Bot, Megaphone, Rocket } from 'lucide-react';

export const Services = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Code,
      title: t('services.webApp.title'),
      description: t('services.webApp.desc'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Bot,
      title: t('services.aiAuto.title'),
      description: t('services.aiAuto.desc'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Megaphone,
      title: t('services.mediaBuying.title'),
      description: t('services.mediaBuying.desc'),
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Rocket,
      title: t('services.saas.title'),
      description: t('services.saas.desc'),
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            {t('services.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-card rounded-2xl p-8 h-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
