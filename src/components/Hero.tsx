import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

export const Hero = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="home">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1280&auto=format&fit=crop"
        bgImageSrc="https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?q=80&w=1920&auto=format&fit=crop"
        title="Build Intelligent Digital Experiences."
        subtitle="Full Stack Developer & Media Buyer Expert — combining technology and strategy to help brands grow."
        scrollToExpand="Scroll to explore"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-[hsl(330,81%,60%)] to-[hsl(340,82%,52%)] hover:opacity-90 transition-opacity text-white font-medium px-8"
            >
              {t('hero.viewWork')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-2 font-medium px-8"
            >
              {t('hero.hireMe')}
            </Button>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
};
