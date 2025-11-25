import { Header } from '@/components/Header';
import { HeroNew } from '@/components/HeroNew';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Innovation3D } from '@/components/Innovation3D';
import { TrustBar } from '@/components/TrustBar';
import { EEATSection } from '@/components/EEATSection';
import { AppsPortfolio } from '@/components/AppsPortfolio';
import { Projects } from '@/components/Projects';
import { Services } from '@/components/Services';
import { Blog } from '@/components/Blog';
import { CaseStudies } from '@/components/CaseStudies';
import { Certifications } from '@/components/Certifications';
import { Testimonials } from '@/components/Testimonials';
import { FAQSection } from '@/components/FAQSection';
import { Journey } from '@/components/Journey';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { FAQSchema } from '@/components/FAQSchema';
import { useEffect } from 'react';
import '@/i18n/config';

const Index = () => {
  useEffect(() => {
    // Check if there's a hash in URL (coming from another page)
    const hash = window.location.hash.slice(1); // Remove the #
    
    if (hash) {
      // Force hero to expand
      const forceExpandEvent = new Event('forceHeroExpand');
      window.dispatchEvent(forceExpandEvent);
      
      // Wait for hero expansion and page render, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <FAQSchema />
      <Header />
      <main>
        <HeroNew />
        <TrustBar />
        <About />
        <EEATSection />
        <Skills />
        <Innovation3D />
        <AppsPortfolio />
        <Projects />
        <Services />
        <Blog />
        <CaseStudies />
        <Certifications />
        <Testimonials />
        <FAQSection />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
