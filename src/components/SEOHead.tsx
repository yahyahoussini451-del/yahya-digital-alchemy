import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export const SEOHead = ({ 
  title, 
  description, 
  keywords,
  image = 'https://brandhub.ma/logo.png',
  type = 'website'
}: SEOHeadProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;
  
  // Dynamic title format: [Service] | [City/Region] | Yahya Loutfi
  const siteTitle = title 
    ? `${title} | ${t('seo.region')} | Yahya Loutfi`
    : t('seo.defaultTitle');
  
  const siteDescription = description || t('seo.defaultDescription');
  const siteKeywords = keywords || t('seo.defaultKeywords');
  const canonicalUrl = `https://yahyaloutfi.com${location.pathname}`;
  
  // Hreflang configuration for multi-region targeting
  const hreflangs = [
    { lang: 'fr-FR', url: `https://yahyaloutfi.com/fr${location.pathname}` },
    { lang: 'en-US', url: `https://yahyaloutfi.com/en${location.pathname}` },
    { lang: 'ar-MA', url: `https://yahyaloutfi.com/ar${location.pathname}` },
    { lang: 'x-default', url: canonicalUrl }
  ];

  // Professional Service Schema (JSON-LD) for Google AI Overviews
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Yahya Loutfi - Web Development & SEO Expert",
    "url": "https://yahyaloutfi.com",
    "logo": "https://brandhub.ma/logo.png",
    "image": image,
    "description": siteDescription,
    "founder": {
      "@type": "Person",
      "name": "Yahya Loutfi",
      "jobTitle": "Full Stack Developer & Media Buyer Expert",
      "url": "https://yahyaloutfi.com",
      "image": "https://yahyaloutfi.com/yahya-profile.webp",
      "sameAs": [
        "https://www.linkedin.com/in/yahya-loutfi",
        "https://github.com/yahyaloutfi",
        "https://brandhub.ma"
      ],
      "knowsAbout": [
        "SEO Optimization",
        "React.js Development",
        "JavaScript",
        "TypeScript",
        "UI/UX Design",
        "Full Stack Development",
        "AI Integration",
        "Machine Learning",
        "Digital Marketing",
        "Media Buying",
        "E-commerce Solutions",
        "Business Intelligence"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Google Business Intelligence Professional Certificate",
          "credentialCategory": "certification"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Google Data Analytics Professional Certificate",
          "credentialCategory": "certification"
        }
      ],
      "alumniOf": {
        "@type": "Organization",
        "name": "Professional Training Institute"
      }
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Morocco"
      },
      {
        "@type": "Country",
        "name": "France"
      },
      {
        "@type": "Place",
        "name": "Middle East"
      }
    ],
    "serviceType": [
      "Web Development",
      "SEO Services",
      "E-commerce Development",
      "AI Integration",
      "Digital Marketing",
      "Media Buying",
      "UI/UX Design",
      "Full Stack Development"
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "47"
    }
  };

  // Person Schema for E-E-A-T (Experience, Expertise, Authority, Trust)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yahya Loutfi",
    "alternateName": "Yahya Loutfi - Full Stack Developer",
    "description": "Moroccan Full Stack Developer & Media Buyer with 5+ years of experience. CEO & Co-Founder at brandhub.ma. Specialized in React, AI Integration, and SEO optimization.",
    "url": "https://yahyaloutfi.com",
    "image": "https://yahyaloutfi.com/yahya-profile.webp",
    "email": "mailto:contact@yahyaloutfi.com",
    "telephone": "+212-XXX-XXXXXX",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MA",
      "addressLocality": "Morocco"
    },
    "jobTitle": "Full Stack Developer & SEO Expert",
    "worksFor": {
      "@type": "Organization",
      "name": "brandhub.ma",
      "url": "https://brandhub.ma"
    },
    "knowsLanguage": ["English", "French", "Arabic"],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Morocco"
      },
      "estimatedSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": "50000",
          "maxValue": "150000",
          "unitText": "YEAR"
        }
      },
      "experienceRequirements": "5+ years"
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://yahyaloutfi.com"
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={currentLang} dir={currentLang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content="Yahya Loutfi" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags for International SEO */}
      {hreflangs.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={currentLang === 'fr' ? 'fr_FR' : currentLang === 'ar' ? 'ar_AR' : 'en_US'} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:creator" content="@yahyaloutfi" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Geo Meta Tags for Location-Based SEO */}
      <meta name="geo.region" content="MA" />
      <meta name="geo.placename" content="Morocco" />
      <meta name="geo.position" content="33.971588;-6.849813" />
      <meta name="ICBM" content="33.971588, -6.849813" />

      {/* JSON-LD Structured Data for Google AI Overviews */}
      <script type="application/ld+json">
        {JSON.stringify(professionalServiceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};
