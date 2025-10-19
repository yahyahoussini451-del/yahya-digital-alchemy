import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, BarChart3, Coffee, Scale, Stethoscope, GraduationCap } from 'lucide-react';

import ecommerceApp from '@/assets/app-ecommerce-moroccan.jpg';
import dashboard from '@/assets/app-dashboard-moroccan.jpg';
import cafe from '@/assets/app-cafe-moroccan.jpg';
import lawyer from '@/assets/app-lawyer-moroccan.jpg';
import doctor from '@/assets/app-doctor-moroccan.jpg';
import school from '@/assets/app-school-moroccan.jpg';

export const AppsPortfolio = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const apps = [
    {
      key: 'ecommerceApp',
      image: ecommerceApp,
      icon: ShoppingCart,
      category: 'ecommerce',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      key: 'dashboard',
      image: dashboard,
      icon: BarChart3,
      category: 'business',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      key: 'cafe',
      image: cafe,
      icon: Coffee,
      category: 'business',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      key: 'lawyer',
      image: lawyer,
      icon: Scale,
      category: 'business',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      key: 'doctor',
      image: doctor,
      icon: Stethoscope,
      category: 'healthcare',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      key: 'school',
      image: school,
      icon: GraduationCap,
      category: 'education',
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('appsPortfolio.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('appsPortfolio.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-primary/10 h-full">
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={app.image} 
                      alt={t(`appsPortfolio.apps.${app.key}.title`)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    <div className="absolute top-4 right-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${app.gradient} text-white`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {t(`appsPortfolio.categories.${app.category}`)}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {t(`appsPortfolio.apps.${app.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(`appsPortfolio.apps.${app.key}.description`)}
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
