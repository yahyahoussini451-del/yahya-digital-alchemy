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
  
  // Dynamic title format: [Service] | [City/Region] | Yahya Houssini
  const siteTitle = title 
    ? `${title} | ${t('seo.region')} | Yahya Houssini`
    : t('seo.defaultTitle');
  
  const siteDescription = description || t('seo.defaultDescription');
  const siteKeywords = keywords || t('seo.defaultKeywords');
  const canonicalUrl = `https://yahyahoussini.pro${location.pathname}`;
  
  // Hreflang configuration for multi-region targeting
  const hreflangs = [
    { lang: 'fr-FR', url: `https://yahyahoussini.pro/fr${location.pathname}` },
    { lang: 'en-US', url: `https://yahyahoussini.pro/en${location.pathname}` },
    { lang: 'ar-MA', url: `https://yahyahoussini.pro/ar${location.pathname}` },
    { lang: 'x-default', url: canonicalUrl }
  ];

  // Professional Service Schema (JSON-LD) for Google AI Overviews
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Yahya Houssini - Développeur Web & Expert IA | Morocco",
    "alternateName": [
      "يحيى حسيني - مطور ويب وخبير الذكاء الاصطناعي",
      "Yahya Houssini - Web Developer & AI Expert Morocco"
    ],
    "url": "https://yahyahoussini.pro",
    "logo": "https://yahyahoussini.pro/logo.png",
    "image": image,
    "description": siteDescription,
    "telephone": "+212-XXX-XXXXXX",
    "email": "yahyahoussini366@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MA",
      "addressRegion": "Morocco"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.5731",
      "longitude": "-7.5898"
    },
    "founder": {
      "@type": "Person",
      "name": "Yahya Houssini",
      "alternateName": "يحيى حسيني",
      "jobTitle": "Full Stack Developer & AI Specialist",
      "url": "https://yahyahoussini.pro",
      "image": "https://yahyahoussini.pro/yahya-profile.webp",
      "sameAs": [
        "https://www.linkedin.com/in/yahyahoussini",
        "https://github.com/yahyahoussini",
        "https://www.instagram.com/yahyahoussini"
      ],
      "knowsAbout": [
        "Web Development",
        "React",
        "AI Automation",
        "SEO Maroc",
        "Full Stack Development",
        "AI Integration",
        "Machine Learning",
        "Digital Marketing Morocco",
        "Media Buying MENA",
        "E-commerce Solutions",
        "SaaS Development"
      ],
      "knowsLanguage": [
        {
          "@type": "Language",
          "name": "French",
          "alternateName": "fr"
        },
        {
          "@type": "Language",
          "name": "English",
          "alternateName": "en"
        },
        {
          "@type": "Language",
          "name": "Arabic",
          "alternateName": "ar"
        }
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Google Business Intelligence Professional Certificate",
          "credentialCategory": "certification",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Google"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Google Data Analytics Professional Certificate",
          "credentialCategory": "certification",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Google"
          }
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
        "name": "Morocco",
        "alternateName": ["Maroc", "المغرب"]
      },
      {
        "@type": "Country",
        "name": "France",
        "alternateName": ["فرنسا"]
      },
      {
        "@type": "Place",
        "name": "Middle East",
        "alternateName": ["Moyen-Orient", "الشرق الأوسط"]
      },
      {
        "@type": "Country",
        "name": "United Arab Emirates",
        "alternateName": ["UAE", "الإمارات"]
      },
      {
        "@type": "Country",
        "name": "Saudi Arabia",
        "alternateName": ["المملكة العربية السعودية"]
      }
    ],
    "serviceType": [
      "Web Development Morocco",
      "SEO Services Maroc",
      "E-commerce Development MENA",
      "AI Integration",
      "Digital Marketing Morocco",
      "Media Buying Middle East",
      "UI/UX Design",
      "Full Stack Development"
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "AggregateOffer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "MAD"
    }
  };

  // Person Schema for E-E-A-T (Experience, Expertise, Authority, Trust)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yahya Houssini",
    "alternateName": "Yahya Houssini - Full Stack Developer",
    "description": "Moroccan Full Stack Developer & Media Buyer with 5+ years of experience. Specialized in React, AI Integration, and SEO optimization.",
    "url": "https://yahyahoussini.pro",
    "image": "https://yahyahoussini.com/yahya-profile.webp",
    "email": "mailto:contact@yahyahoussini.com",
    "telephone": "+212-XXX-XXXXXX",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MA",
      "addressLocality": "Morocco"
    },
    "jobTitle": "Full Stack Developer & AI Specialist",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
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
        "item": "https://yahyahoussini.com"
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
      <meta name="author" content="Yahya Houssini" />
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
      <meta name="twitter:creator" content="@yahyahoussini" />

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
