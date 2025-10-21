import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const CaseStudies = () => {
  const { t } = useTranslation();

  const caseStudies = [
    {
      id: 1,
      title: t('caseStudies.studies.ecommerce.title'),
      client: t('caseStudies.studies.ecommerce.client'),
      industry: t('caseStudies.studies.ecommerce.industry'),
      description: t('caseStudies.studies.ecommerce.description'),
      challenge: t('caseStudies.studies.ecommerce.challenge'),
      solution: t('caseStudies.studies.ecommerce.solution'),
      results: [
        { icon: TrendingUp, value: t('caseStudies.studies.ecommerce.results.sales'), label: t('caseStudies.studies.ecommerce.results.salesLabel') },
        { icon: Users, value: t('caseStudies.studies.ecommerce.results.users'), label: t('caseStudies.studies.ecommerce.results.usersLabel') },
        { icon: Zap, value: t('caseStudies.studies.ecommerce.results.conversion'), label: t('caseStudies.studies.ecommerce.results.conversionLabel') }
      ],
      gradient: 'from-purple-500 to-pink-500',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe']
    },
    {
      id: 2,
      title: t('caseStudies.studies.healthcare.title'),
      client: t('caseStudies.studies.healthcare.client'),
      industry: t('caseStudies.studies.healthcare.industry'),
      description: t('caseStudies.studies.healthcare.description'),
      challenge: t('caseStudies.studies.healthcare.challenge'),
      solution: t('caseStudies.studies.healthcare.solution'),
      results: [
        { icon: Users, value: t('caseStudies.studies.healthcare.results.patients'), label: t('caseStudies.studies.healthcare.results.patientsLabel') },
        { icon: TrendingUp, value: t('caseStudies.studies.healthcare.results.efficiency'), label: t('caseStudies.studies.healthcare.results.efficiencyLabel') },
        { icon: DollarSign, value: t('caseStudies.studies.healthcare.results.costs'), label: t('caseStudies.studies.healthcare.results.costsLabel') }
      ],
      gradient: 'from-blue-500 to-cyan-500',
      tags: ['Vue.js', 'Django', 'PostgreSQL', 'AWS']
    },
    {
      id: 3,
      title: t('caseStudies.studies.aibot.title'),
      client: t('caseStudies.studies.aibot.client'),
      industry: t('caseStudies.studies.aibot.industry'),
      description: t('caseStudies.studies.aibot.description'),
      challenge: t('caseStudies.studies.aibot.challenge'),
      solution: t('caseStudies.studies.aibot.solution'),
      results: [
        { icon: Users, value: t('caseStudies.studies.aibot.results.response'), label: t('caseStudies.studies.aibot.results.responseLabel') },
        { icon: TrendingUp, value: t('caseStudies.studies.aibot.results.leads'), label: t('caseStudies.studies.aibot.results.leadsLabel') },
        { icon: Zap, value: t('caseStudies.studies.aibot.results.automation'), label: t('caseStudies.studies.aibot.results.automationLabel') }
      ],
      gradient: 'from-green-500 to-emerald-500',
      tags: ['GPT-4', 'WhatsApp API', 'Node.js', 'AI']
    }
  ];

  return (
    <section id="case-studies" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('caseStudies.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('caseStudies.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className={`h-2 bg-gradient-to-r ${study.gradient}`} />
                <div className="p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-2">{study.title}</h3>
                      <p className="text-muted-foreground mb-1">{study.client}</p>
                      <p className="text-sm text-muted-foreground mb-6">{study.industry}</p>
                      
                      <p className="text-lg mb-6">{study.description}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-primary">
                            {t('caseStudies.challengeLabel')}
                          </h4>
                          <p className="text-muted-foreground">{study.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 text-primary">
                            {t('caseStudies.solutionLabel')}
                          </h4>
                          <p className="text-muted-foreground">{study.solution}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4">{t('caseStudies.resultsLabel')}</h4>
                      <div className="space-y-6">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${study.gradient}`}>
                              <result.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold">{result.value}</div>
                              <div className="text-sm text-muted-foreground">{result.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};