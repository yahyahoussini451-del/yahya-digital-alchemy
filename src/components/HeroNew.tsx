import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import heroSpeaking from '@/assets/hero-speaking.png';

export const HeroNew = () => {
  const { t } = useTranslation();

  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc={heroSpeaking}
      bgImageSrc={heroSpeaking}
      title={t('hero.title')}
      subtitle={t('hero.subtitle')}
      scrollToExpand="Scroll to explore"
      textBlend={false}
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="group" asChild>
            <a href="#contact">
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#apps-portfolio">
              {t('hero.viewWork')}
              <Download className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pt-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5+</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.experience')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.projects')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">30+</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.clients')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3+</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.awards')}</div>
          </div>
        </div>
      </div>
    </ScrollExpandMedia>
  );
};
