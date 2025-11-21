import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase } from 'lucide-react';
import heroSpeaking from '@/assets/hero-speaking.png';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc={heroSpeaking}
      bgImageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
      title={t('hero.title')}
      subtitle={t('hero.subtitle')}
      scrollToExpand={t('hero.scrollToExpand')}
      textBlend
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="group text-lg px-8 py-6"
            asChild
          >
            <a href="#projects">
              {t('hero.viewWork')}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6"
            asChild
          >
            <a href="#contact">
              <Briefcase className="mr-2" />
              {t('hero.hireMe')}
            </a>
          </Button>
        </div>

        {/* Floating stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
          <div className="bg-card p-6 rounded-xl shadow-lg border text-center">
            <div className="text-3xl font-bold text-primary">10+</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.years')}</div>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-lg border text-center">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.projects')}</div>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-lg border text-center">
            <div className="text-3xl font-bold text-primary">100+</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.clients')}</div>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-lg border text-center">
            <div className="text-3xl font-bold text-primary">15+</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.awards')}</div>
          </div>
        </div>
      </div>
    </ScrollExpandMedia>
  );
};
