import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Award, Briefcase, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const EEATSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const credentials = [
    {
      icon: Briefcase,
      title: t('eeat.experience.title'),
      value: t('eeat.experience.value'),
      description: t('eeat.experience.description'),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: t('eeat.expertise.title'),
      value: t('eeat.expertise.value'),
      description: t('eeat.expertise.description'),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: t('eeat.authority.title'),
      value: t('eeat.authority.value'),
      description: t('eeat.authority.description'),
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: TrendingUp,
      title: t('eeat.trust.title'),
      value: t('eeat.trust.value'),
      description: t('eeat.trust.description'),
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/20 via-background to-muted/20"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('eeat.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('eeat.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((credential, index) => {
            const Icon = credential.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-primary/10 h-full">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${credential.gradient} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {credential.title}
                    </h3>
                    <p className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {credential.value}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {credential.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
