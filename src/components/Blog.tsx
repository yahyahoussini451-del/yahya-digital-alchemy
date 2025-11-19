import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const Blog = () => {
  const { t } = useTranslation();

  const blogPosts = [
    {
      id: 1,
      category: t('blog.categories.ai'),
      title: t('blog.posts.aiWhatsapp.title'),
      excerpt: t('blog.posts.aiWhatsapp.excerpt'),
      date: t('blog.posts.aiWhatsapp.date'),
      readTime: '8 min',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      category: t('blog.categories.development'),
      title: t('blog.posts.saasArchitecture.title'),
      excerpt: t('blog.posts.saasArchitecture.excerpt'),
      date: t('blog.posts.saasArchitecture.date'),
      readTime: '12 min',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      category: t('blog.categories.business'),
      title: t('blog.posts.mediaBuying.title'),
      excerpt: t('blog.posts.mediaBuying.excerpt'),
      date: t('blog.posts.mediaBuying.date'),
      readTime: '10 min',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      category: t('blog.categories.design'),
      title: t('blog.posts.brandIdentity.title'),
      excerpt: t('blog.posts.brandIdentity.excerpt'),
      date: t('blog.posts.brandIdentity.date'),
      readTime: '6 min',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <div className={`h-2 bg-gradient-to-r ${post.gradient}`} />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Button variant="ghost" className="group/btn p-0 h-auto" asChild>
                    <a href="/blog">
                      <span className="mr-2">{t('blog.readMore')}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};