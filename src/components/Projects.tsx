import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Projects = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      name: t('projects.brandhub.name'),
      description: t('projects.brandhub.desc'),
      tech: ['React', 'Node.js', 'MongoDB', 'Brand Platform'],
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      name: t('projects.multicommerce.name'),
      description: t('projects.multicommerce.desc'),
      tech: ['React', 'Node.js', 'Custom Themes', 'Multi-Tenant'],
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      name: t('projects.tussna.name'),
      description: t('projects.tussna.desc'),
      tech: ['React', 'Node.js', 'AI', 'eCommerce'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      name: t('projects.aiponics.name'),
      description: t('projects.aiponics.desc'),
      tech: ['IoT', 'AI', 'React', 'Python'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: t('projects.yahyagent.name'),
      description: t('projects.yahyagent.desc'),
      tech: ['WhatsApp API', 'OpenAI', 'n8n', 'Node.js'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: t('projects.saas.name'),
      description: t('projects.saas.desc'),
      tech: ['React', 'MongoDB', 'Express', 'SaaS'],
      gradient: 'from-cyan-500 to-teal-500'
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            {t('projects.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{project.name}</span>
                      <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
