import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { DynamicIcon } from '@/components/DynamicIcon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface App {
  id: string;
  title: string;
  description: string;
  image_url: string;
  icon_name: string;
  icon_url?: string;
  category: string;
  gradient: string;
  gradient_start?: string;
  gradient_end?: string;
  display_order: number;
  demo_url?: string;
}

export const AppsPortfolio = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      console.log('Apps loaded:', data?.length, 'apps');
      setApps(data || []);
    } catch (error) {
      console.error('Error fetching apps:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { key: 'all', color: 'default' },
    { key: 'ecommerce', color: 'orange' },
    { key: 'business', color: 'blue' },
    { key: 'healthcare', color: 'green' },
    { key: 'education', color: 'cyan' },
    { key: 'realestate', color: 'yellow' },
    { key: 'hospitality', color: 'purple' },
    { key: 'logistics', color: 'slate' },
    { key: 'finance', color: 'emerald' },
    { key: 'health', color: 'rose' },
    { key: 'events', color: 'violet' },
    { key: 'productivity', color: 'teal' },
    { key: 'ai', color: 'pink' },
  ];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  console.log('AppsPortfolio - Total apps:', apps.length, 'Filtered apps:', filteredApps.length, 'Loading:', loading);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }


  return (
    <section id="apps-portfolio" ref={ref} className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t('appsPortfolio.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('appsPortfolio.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('appsPortfolio.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg border-2 focus:border-primary transition-colors"
            />
          </div>

          <div className="flex justify-center items-center gap-4 mb-8">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[280px] h-12 text-base">
                <SelectValue placeholder={t('appsPortfolio.categories.all')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.key} value={category.key}>
                    {t(`appsPortfolio.categories.${category.key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={app.image_url}
                      alt={app.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {app.gradient_start && app.gradient_end ? (
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${app.gradient_start}, ${app.gradient_end})`
                        }}
                      >
                        {app.icon_url ? (
                          <img src={app.icon_url} alt={app.title} className="h-20 w-20 animate-pulse" />
                        ) : (
                          <DynamicIcon 
                            name={app.icon_name}
                            className="h-20 w-20 text-white animate-pulse"
                          />
                        )}
                      </div>
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-t ${app.gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                        {app.icon_url ? (
                          <img src={app.icon_url} alt={app.title} className="h-20 w-20 animate-pulse" />
                        ) : (
                          <DynamicIcon 
                            name={app.icon_name}
                            className="h-20 w-20 text-white animate-pulse"
                          />
                        )}
                      </div>
                    )}
                    <Badge 
                      className={`absolute top-4 right-4 backdrop-blur-sm bg-background/80`}
                    >
                      {t(`appsPortfolio.categories.${app.category}`)}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      {app.gradient_start && app.gradient_end ? (
                        <div 
                          className="p-2 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${app.gradient_start}, ${app.gradient_end})`
                          }}
                        >
                          {app.icon_url ? (
                            <img src={app.icon_url} alt={app.title} className="h-6 w-6" />
                          ) : (
                            <DynamicIcon 
                              name={app.icon_name}
                              className="h-6 w-6 text-white"
                            />
                          )}
                        </div>
                      ) : (
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${app.gradient}`}>
                          {app.icon_url ? (
                            <img src={app.icon_url} alt={app.title} className="h-6 w-6" />
                          ) : (
                            <DynamicIcon 
                              name={app.icon_name}
                              className="h-6 w-6 text-white"
                            />
                          )}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {app.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {app.description}
                    </p>
                    {app.demo_url && (
                      <Button 
                        asChild 
                        className="w-full"
                        variant="default"
                      >
                        <a href={app.demo_url} target="_blank" rel="noopener noreferrer">
                          View Demo
                        </a>
                      </Button>
                    )}
                  </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-2xl text-muted-foreground">
              {t('appsPortfolio.noResults')}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};