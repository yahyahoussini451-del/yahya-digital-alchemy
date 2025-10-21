import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const Pricing = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const packages = [
    {
      name: "Starter",
      description: "Perfect for small businesses and startups",
      price: "$2,500",
      duration: "one-time",
      features: [
        "Landing page design",
        "Responsive mobile design",
        "Contact form integration",
        "Basic SEO optimization",
        "1 month support",
        "Fast delivery (2 weeks)"
      ],
      popular: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Professional",
      description: "Most popular for growing businesses",
      price: "$5,500",
      duration: "one-time",
      features: [
        "Multi-page website (up to 10 pages)",
        "Custom design & branding",
        "Advanced SEO optimization",
        "Analytics integration",
        "Backend API integration",
        "3 months support & updates",
        "Premium hosting setup"
      ],
      popular: true,
      gradient: "from-[hsl(330,81%,60%)] to-[hsl(340,82%,52%)]"
    },
    {
      name: "Enterprise",
      description: "Full-scale solutions for ambitious projects",
      price: "$12,000+",
      duration: "project-based",
      features: [
        "Custom web application",
        "Full-stack development",
        "User authentication system",
        "Database design & setup",
        "AI/ML integration",
        "Payment gateway integration",
        "6 months support & maintenance",
        "Dedicated developer support",
        "Performance optimization"
      ],
      popular: false,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Service Packages
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing for every stage of your digital journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`relative p-8 h-full flex flex-col ${
                  pkg.popular ? 'border-primary shadow-xl scale-105' : 'border-border'
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className={`bg-gradient-to-r ${pkg.gradient} text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1`}>
                        <Sparkles className="w-4 h-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-muted-foreground text-sm">{pkg.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      <span className="text-muted-foreground">/ {pkg.duration}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className={pkg.popular 
                      ? `w-full bg-gradient-to-r ${pkg.gradient} hover:opacity-90 text-white`
                      : "w-full"
                    }
                    onClick={() => window.open('https://wa.me/212703026422?text=Hi! I\'m interested in the ' + pkg.name + ' package', '_blank')}
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Need a custom solution? Let's discuss your project
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('mailto:yahyahoussini366@gmail.com?subject=Custom Project Inquiry', '_blank')}
            >
              Request Custom Quote
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
