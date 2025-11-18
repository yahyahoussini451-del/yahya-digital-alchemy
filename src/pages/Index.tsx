import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
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
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import '@/i18n/config';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />
      <main>
        <Hero />
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
