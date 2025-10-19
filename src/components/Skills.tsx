import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, TrendingUp, Palette } from 'lucide-react';

export const Skills = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      icon: Code2,
      title: t('skills.webDev'),
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'React', 'MongoDB'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: t('skills.automation'),
      skills: ['OpenAI API', 'n8n', 'WhatsApp Bots', 'AI Integration'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: t('skills.marketing'),
      skills: ['Meta Ads', 'Google Ads', 'SEO', 'Conversion Optimization'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Palette,
      title: t('skills.creative'),
      skills: ['Canva', 'Notion', 'Figma', 'CapCut'],
      color: 'from-green-500 to-emerald-500'
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
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            {t('skills.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-card rounded-2xl p-6 h-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground"
                        >
                          {skill}
                        </span>
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
