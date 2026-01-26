import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Brain, Palette, Box, BarChart3, Briefcase } from 'lucide-react';

export const Skills = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);

  // Helper function to safely get skill items array
  const getSkillItems = (key: string): string[] => {
    const items = t(key, { returnObjects: true });
    if (Array.isArray(items)) {
      return items as string[];
    }
    return [];
  };

  const skillCategories = [
    {
      icon: Code2,
      title: t('skills.fullstack.title'),
      level: t('skills.fullstack.level'),
      skills: getSkillItems('skills.fullstack.items'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: t('skills.branding.title'),
      level: t('skills.branding.level'),
      skills: getSkillItems('skills.branding.items'),
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Box,
      title: t('skills.3d.title'),
      level: t('skills.3d.level'),
      skills: getSkillItems('skills.3d.items'),
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Brain,
      title: t('skills.ai.title'),
      level: t('skills.ai.level'),
      skills: getSkillItems('skills.ai.items'),
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: BarChart3,
      title: t('skills.bi.title'),
      level: t('skills.bi.level'),
      skills: getSkillItems('skills.bi.items'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Briefcase,
      title: t('skills.business.title'),
      level: t('skills.business.level'),
      skills: getSkillItems('skills.business.items'),
      color: 'from-cyan-500 to-teal-500'
    }
  ];

  // Duplicate categories for seamless loop
  const duplicatedCategories = [...skillCategories, ...skillCategories];

  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary/30 overflow-hidden">
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
        </motion.div>
      </div>

      {/* Horizontal Scrolling Marquee - Row 1 */}
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-6 py-4"
          animate={{
            x: [0, -50 * skillCategories.length * 6],
          }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          whileHover={{ animationPlayState: 'paused' }}
          {...(isPaused && { animate: undefined })}
        >
          {duplicatedCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={`row1-${category.title}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="bg-card rounded-2xl p-6 w-80 shadow-md hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-primary/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                      <p className="text-xs text-muted-foreground font-medium">{category.level}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {category.skills.length > 4 && (
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                        +{category.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Horizontal Scrolling Marquee - Row 2 (Reverse) */}
      <div 
        className="relative w-full mt-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-6 py-4"
          animate={{
            x: [-50 * skillCategories.length * 6, 0],
          }}
          transition={{
            x: {
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          {...(isPaused && { animate: undefined })}
        >
          {[...duplicatedCategories].reverse().map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={`row2-${category.title}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="bg-card rounded-2xl p-6 w-80 shadow-md hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-primary/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                      <p className="text-xs text-muted-foreground font-medium">{category.level}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {category.skills.length > 4 && (
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                        +{category.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};