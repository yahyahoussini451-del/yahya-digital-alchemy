import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, TrendingUp, Palette, Award, Briefcase, Box, BarChart3 } from 'lucide-react';

export const Skills = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      icon: Code2,
      title: t('skills.fullstack.title'),
      level: t('skills.fullstack.level'),
      skills: t('skills.fullstack.items', { returnObjects: true }) as string[],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: t('skills.branding.title'),
      level: t('skills.branding.level'),
      skills: t('skills.branding.items', { returnObjects: true }) as string[],
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Box,
      title: t('skills.3d.title'),
      level: t('skills.3d.level'),
      skills: t('skills.3d.items', { returnObjects: true }) as string[],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Brain,
      title: t('skills.ai.title'),
      level: t('skills.ai.level'),
      skills: t('skills.ai.items', { returnObjects: true }) as string[],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: BarChart3,
      title: t('skills.bi.title'),
      level: t('skills.bi.level'),
      skills: t('skills.bi.items', { returnObjects: true }) as string[],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Briefcase,
      title: t('skills.business.title'),
      level: t('skills.business.level'),
      skills: t('skills.business.items', { returnObjects: true }) as string[],
      color: 'from-cyan-500 to-teal-500'
    }
  ];

  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {t('skills.title')}
          </h2>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 rounded-2xl bg-card shadow-md"
            >
              <div className="text-4xl font-bold text-gradient mb-2">50+</div>
              <div className="text-sm text-muted-foreground">{t('skills.stats.users')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 rounded-2xl bg-card shadow-md"
            >
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-sm text-muted-foreground">{t('skills.stats.winner')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center p-6 rounded-2xl bg-card shadow-md"
            >
              <div className="text-4xl mb-2">📊</div>
              <div className="text-sm text-muted-foreground">{t('skills.stats.certified')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-6 rounded-2xl bg-card shadow-md"
            >
              <div className="text-4xl mb-2">🤖</div>
              <div className="text-sm text-muted-foreground">{t('skills.stats.expert')}</div>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card rounded-2xl p-6 h-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-medium">{category.level}</p>
                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm text-muted-foreground flex-1">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
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
