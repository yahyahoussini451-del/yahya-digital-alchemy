import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const navItems = [
    { key: 'home', id: 'home' },
    { key: 'about', id: 'about' },
    { key: 'skills', id: 'skills' },
    { key: 'projects', id: 'projects' },
    { key: 'services', id: 'services' },
    { key: 'certifications', id: 'certifications' },
    { key: 'testimonials', id: 'testimonials' },
    { key: 'contact', id: 'contact' }
  ];

  return (
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </nav>

          {/* Language Switcher */}
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
  );
};
