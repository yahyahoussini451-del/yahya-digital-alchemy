import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiTailwindcss, 
  SiTypescript, 
  SiNodedotjs, 
  SiPython,
  SiGoogleanalytics,
  SiFigma,
  SiSupabase,
  SiVercel,
  SiGit,
  SiMeta,
  SiGoogleads,
  SiGooglesearchconsole,
  SiMongodb,
  SiMysql,
  SiOpenai,
  SiN8N,
  SiShopify,
  SiBlender
} from 'react-icons/si';

export const TrustBar = () => {
  const { t } = useTranslation();

  const technologies = [
    { icon: SiReact, name: 'React.js', color: '#61DAFB' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiPython, name: 'Python', color: '#3776AB' },
    { icon: SiGoogleanalytics, name: 'Google Analytics', color: '#E37400' },
    { icon: SiFigma, name: 'Figma', color: '#F24E1E' },
    { icon: SiSupabase, name: 'Supabase', color: '#3ECF8E' },
    { icon: SiVercel, name: 'Vercel', color: '#000000' },
    { icon: SiGit, name: 'Git', color: '#F05032' },
    { icon: SiMeta, name: 'Meta Ads', color: '#0668E1' },
    { icon: SiGoogleads, name: 'Google Ads', color: '#4285F4' },
    { icon: SiGooglesearchconsole, name: 'Google SEO', color: '#4585F4' },
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
    { icon: SiOpenai, name: 'LLMs & AI', color: '#412991' },
    { icon: SiN8N, name: 'Automation', color: '#EA4B71' },
    { icon: SiShopify, name: 'E-commerce', color: '#96BF48' },
    { icon: SiBlender, name: '3D for Ads', color: '#F5792A' }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {t('trustBar.title')}
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 gap-y-8 items-center justify-center flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group relative"
                >
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                    <Icon 
                      className="w-8 h-8 transition-colors duration-300" 
                      style={{ color: tech.color }}
                    />
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            {t('trustBar.subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
