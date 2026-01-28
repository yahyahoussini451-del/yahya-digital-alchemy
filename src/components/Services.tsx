import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Bot, Megaphone, Rocket, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '212703026422';

export const Services = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getWhatsAppMessage = (serviceKey: string, lang: string): string => {
    const messages: Record<string, Record<string, string>> = {
      webApp: {
        en: "Hello! I'm interested in your Web App Development services. I'd like to discuss my project requirements.",
        fr: "Bonjour ! Je suis intéressé(e) par vos services de Développement d'Applications Web. J'aimerais discuter de mes besoins de projet.",
        ar: "مرحباً! أنا مهتم بخدمات تطوير تطبيقات الويب الخاصة بكم. أود مناقشة متطلبات مشروعي."
      },
      aiAuto: {
        en: "Hello! I'm interested in your AI Automation & WhatsApp Bot services. I'd like to learn more about automating my business.",
        fr: "Bonjour ! Je suis intéressé(e) par vos services d'Automatisation IA et Bots WhatsApp. J'aimerais en savoir plus sur l'automatisation de mon entreprise.",
        ar: "مرحباً! أنا مهتم بخدمات الأتمتة بالذكاء الاصطناعي وروبوتات واتساب. أود معرفة المزيد عن أتمتة أعمالي."
      },
      mediaBuying: {
        en: "Hello! I'm interested in your Media Buying services. I'd like to discuss advertising strategies for my business.",
        fr: "Bonjour ! Je suis intéressé(e) par vos services d'Achat Média. J'aimerais discuter des stratégies publicitaires pour mon entreprise.",
        ar: "مرحباً! أنا مهتم بخدمات شراء الوسائط الخاصة بكم. أود مناقشة استراتيجيات الإعلان لعملي."
      },
      saas: {
        en: "Hello! I'm interested in your SaaS Consulting & MVP Development services. I have a product idea I'd like to bring to life.",
        fr: "Bonjour ! Je suis intéressé(e) par vos services de Conseil SaaS et Développement MVP. J'ai une idée de produit que j'aimerais concrétiser.",
        ar: "مرحباً! أنا مهتم بخدمات استشارات SaaS وتطوير MVP. لدي فكرة منتج أود تحويلها إلى حقيقة."
      }
    };

    return messages[serviceKey]?.[lang] || messages[serviceKey]?.en || '';
  };

  const handleServiceClick = (serviceKey: string) => {
    const currentLang = i18n.language || 'en';
    const message = getWhatsAppMessage(serviceKey, currentLang);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const services = [
    {
      key: 'webApp',
      icon: Code,
      title: t('services.webApp.title'),
      description: t('services.webApp.desc'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'aiAuto',
      icon: Bot,
      title: t('services.aiAuto.title'),
      description: t('services.aiAuto.desc'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      key: 'mediaBuying',
      icon: Megaphone,
      title: t('services.mediaBuying.title'),
      description: t('services.mediaBuying.desc'),
      color: 'from-orange-500 to-red-500'
    },
    {
      key: 'saas',
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
                  key={service.key}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => handleServiceClick(service.key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleServiceClick(service.key);
                    }
                  }}
                  aria-label={`${service.title} - ${t('contact.whatsapp', 'Contact via WhatsApp')}`}
                >
                  <div className="bg-card rounded-2xl p-8 h-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden border border-transparent hover:border-primary/30">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* WhatsApp indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1.5 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </div>
                    </div>
                    
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
