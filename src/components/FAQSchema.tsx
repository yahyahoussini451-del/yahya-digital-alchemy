import { Helmet } from 'react-helmet-async';

export const FAQSchema = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quels services de développement web proposez-vous au Maroc?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Je propose des services complets de développement web incluant création de sites e-commerce, applications web personnalisées, intégration d'IA, optimisation SEO, et développement full-stack avec React, Node.js et TypeScript. Services disponibles au Maroc, France et Moyen-Orient."
        }
      },
      {
        "@type": "Question",
        "name": "What is your experience in AI integration and automation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With 5+ years of experience, I specialize in AI integration including GPT-4, Claude, custom chatbots, process automation, machine learning models, and AI-powered business solutions for companies in Morocco, Middle East, and France."
        }
      },
      {
        "@type": "Question",
        "name": "هل تقدم خدمات التسويق الرقمي والـ SEO في المنطقة العربية؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "نعم، أقدم خدمات شاملة للتسويق الرقمي وتحسين محركات البحث (SEO) للشركات في المغرب والشرق الأوسط. أتخصص في استراتيجيات التسويق الرقمي، شراء الإعلانات، وتحسين ظهور المواقع على Google."
        }
      },
      {
        "@type": "Question",
        "name": "Combien de temps prend le développement d'une application web?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le délai varie selon la complexité: site vitrine (2-4 semaines), e-commerce (6-12 semaines), application SaaS complexe (3-6 mois). Je travaille avec des méthodes agiles pour livrer rapidement tout en maintenant la qualité."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide ongoing maintenance and support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, I offer comprehensive maintenance packages including security updates, performance optimization, bug fixes, feature additions, and 24/7 technical support for clients in Morocco, France, and Middle East regions."
        }
      },
      {
        "@type": "Question",
        "name": "ما هي تكلفة تطوير موقع إلكتروني احترافي؟",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "تختلف التكلفة حسب متطلبات المشروع. موقع عرض بسيط يبدأ من 15,000 درهم، متجر إلكتروني من 30,000 درهم، تطبيقات مخصصة من 50,000 درهم. أقدم استشارة مجانية لتقييم احتياجاتك."
        }
      },
      {
        "@type": "Question",
        "name": "Travaillez-vous avec des clients internationaux?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, je travaille régulièrement avec des clients au Maroc, en France, aux Émirats Arabes Unis, en Arabie Saoudite et dans toute la région MENA. Je parle français, anglais et arabe couramment."
        }
      },
      {
        "@type": "Question",
        "name": "What technologies do you use for web development?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I specialize in modern tech stack: React.js, Next.js, Vue.js for frontend; Node.js, Express, Python Django for backend; PostgreSQL, MongoDB for databases; AWS, Vercel for hosting; and AI integration with OpenAI, Claude, and custom ML models."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};