import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
    { key: 'home', id: 'home' },
    { key: 'about', id: 'about' },
    { key: 'skills', id: 'skills' },
    { key: 'appsPortfolio', id: 'apps-portfolio' },
    { key: 'certifications', id: 'certifications' },
    { key: 'testimonials', id: 'testimonials' },
    { key: 'contact', id: 'contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-md border-b border-border' : 'bg-background/80 backdrop-blur-md'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Yahya Houssini Home"
          >
            <img 
              src="/logo.png" 
              alt="Yahya Houssini Logo" 
              className="h-10 w-10" 
              loading="eager" 
              width="40" 
              height="40" 
            />
            <span className="text-xl font-bold text-foreground">yahya.</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-secondary/50 backdrop-blur-sm rounded-full px-2 py-2 border border-border/50">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </nav>

          {/* Language Switcher - Desktop */}
          <div className="hidden lg:flex items-center gap-2 bg-secondary/50 backdrop-blur-sm rounded-full px-2 py-2 border border-border/50">
            <Button
              variant={i18n.language === 'en' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => changeLanguage('en')}
              className="text-xs rounded-full"
            >
              EN
            </Button>
            <Button
              variant={i18n.language === 'fr' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => changeLanguage('fr')}
              className="text-xs rounded-full"
            >
              FR
            </Button>
            <Button
              variant={i18n.language === 'ar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => changeLanguage('ar')}
              className="text-xs rounded-full"
            >
              AR
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-secondary/50 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-border animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
              <div className="flex gap-2 pt-2 px-4">
                <Button
                  variant={i18n.language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => changeLanguage('en')}
                  className="text-xs flex-1"
                >
                  EN
                </Button>
                <Button
                  variant={i18n.language === 'fr' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => changeLanguage('fr')}
                  className="text-xs flex-1"
                >
                  FR
                </Button>
                <Button
                  variant={i18n.language === 'ar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => changeLanguage('ar')}
                  className="text-xs flex-1"
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
