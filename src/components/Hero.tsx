import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import heroSpeaking from '@/assets/hero-speaking.png';

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
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?q=80&w=1920&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Build Intelligent
              </span>
              <br />
              <span className="text-foreground">Digital Experiences</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {t('hero.subtitle', 'Full Stack Developer & Media Buyer Expert — combining technology and strategy to help brands grow.')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
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
                onClick={() => window.location.href = 'mailto:yahyahoussini366@gmail.com?subject=Let\'s Work Together'}
                className="border-2 font-medium px-8"
              >
                {t('hero.hireMe')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl" />
              <img 
                src={heroSpeaking} 
                alt="Yahya Houssini" 
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
