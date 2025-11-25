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
    // If it's blog, navigate to blog page
    if (id === 'blog') {
      window.location.href = '/blog';
      setIsMobileMenuOpen(false);
      return;
    }
    
    // Force hero to expand immediately before scrolling
    const forceExpandEvent = new Event('forceHeroExpand');
    window.dispatchEvent(forceExpandEvent);
    
    // Wait a bit for the hero to expand, then scroll
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
        setActiveSection(id);
      }
    }, 100);
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
    { key: 'blog', id: 'blog' },
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
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity shrink-0"
            aria-label="Yahya Houssini Home"
          >
            <img 
              src="/logo.png" 
              alt="Yahya Houssini Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10" 
              loading="eager" 
              width="40" 
              height="40" 
            />
            <span className="text-lg sm:text-xl font-bold text-foreground">yahya.</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-secondary/50 backdrop-blur-sm rounded-full px-1.5 lg:px-2 py-1.5 lg:py-2 border border-border/50 mx-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 md:px-4 lg:px-6 py-1.5 lg:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
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
          <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-secondary/50 backdrop-blur-sm rounded-full px-1.5 lg:px-2 py-1.5 lg:py-2 border border-border/50 shrink-0">
            <Button
              variant={i18n.language === 'en' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => changeLanguage('en')}
              className="text-xs rounded-full h-7 lg:h-8 px-2 lg:px-3"
            >
              EN
            </Button>
            <Button
              variant={i18n.language === 'fr' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => changeLanguage('fr')}
              className="text-xs rounded-full h-7 lg:h-8 px-2 lg:px-3"
            >
              FR
            </Button>
            <Button
              variant={i18n.language === 'ar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => changeLanguage('ar')}
              className="text-xs rounded-full h-7 lg:h-8 px-2 lg:px-3"
            >
              AR
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary/50 rounded-lg transition-colors shrink-0"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-3 sm:pb-4 pt-2 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1.5 sm:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors touch-manipulation ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary active:bg-secondary/80'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
              <div className="flex gap-2 pt-2 px-2 sm:px-3">
                <Button
                  variant={i18n.language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => changeLanguage('en')}
                  className="text-xs sm:text-sm flex-1 h-9 sm:h-10 touch-manipulation"
                >
                  EN
                </Button>
                <Button
                  variant={i18n.language === 'fr' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => changeLanguage('fr')}
                  className="text-xs sm:text-sm flex-1 h-9 sm:h-10 touch-manipulation"
                >
                  FR
                </Button>
                <Button
                  variant={i18n.language === 'ar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => changeLanguage('ar')}
                  className="text-xs sm:text-sm flex-1 h-9 sm:h-10 touch-manipulation"
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
