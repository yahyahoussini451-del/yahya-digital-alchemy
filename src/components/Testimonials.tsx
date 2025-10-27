import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = Array.from({ length: 19 }, (_, i) => ({
    quote: t(`testimonials.quote${i + 1}`),
    author: t(`testimonials.author${i + 1}`),
    role: t(`testimonials.role${i + 1}`),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Customer${i + 1}`
  }));

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            {t('testimonials.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 relative"
              >
                <Quote className="absolute top-4 right-4 w-10 h-10 text-accent/20" />
                <div className="relative z-10">
                  <p className="text-base text-muted-foreground mb-4 leading-relaxed italic line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
