import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, User, Wrench, Briefcase, Award, MessageSquare, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setActiveSection(id);
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const navItems = [
    { key: 'home', id: 'home', icon: Home },
    { key: 'about', id: 'about', icon: User },
    { key: 'skills', id: 'skills', icon: Wrench },
    { key: 'projects', id: 'projects', icon: Briefcase },
    { key: 'certifications', id: 'certifications', icon: Award },
    { key: 'testimonials', id: 'testimonials', icon: MessageSquare },
    { key: 'contact', id: 'contact', icon: Mail }
  ];

  const tubelightNavItems = navItems.map(item => ({
    name: t(`nav.${item.key}`),
    onClick: () => scrollToSection(item.id),
    icon: item.icon
  }));

  return (
    <>
      {/* Top Bar with Logo and Language Switcher */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Yahya Houssini Home"
            >
              <img src="/logo.png" alt="Yahya Houssini Logo - Web Developer and Branding Agency" className="h-10 w-10" loading="eager" width="40" height="40" />
              <span className="text-xl font-bold text-foreground">yahya.</span>
            </button>

            {/* Language Switcher - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant={i18n.language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('en')}
                className="text-xs"
              >
                EN
              </Button>
              <Button
                variant={i18n.language === 'fr' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('fr')}
                className="text-xs"
              >
                FR
              </Button>
              <Button
                variant={i18n.language === 'ar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('ar')}
                className="text-xs"
              >
                AR
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-4 pt-2 border-t border-border">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                ))}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant={i18n.language === 'en' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => changeLanguage('en')}
                    className="text-xs"
                  >
                    EN
                  </Button>
                  <Button
                    variant={i18n.language === 'fr' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => changeLanguage('fr')}
                    className="text-xs"
                  >
                    FR
                  </Button>
                  <Button
                    variant={i18n.language === 'ar' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => changeLanguage('ar')}
                    className="text-xs"
                  >
                    AR
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Tubelight Navigation - Desktop Only */}
      <div className="hidden lg:block fixed top-20 left-1/2 -translate-x-1/2 z-50">
        <NavBar 
          items={tubelightNavItems} 
          activeTab={t(`nav.${activeSection}`)}
          isMobile={isMobile}
        />
      </div>
    </>
  );
};
