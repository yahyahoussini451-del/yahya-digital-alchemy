import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, BarChart3, Coffee, Scale, Stethoscope, GraduationCap, Building2, Hotel, Truck, Wallet, Dumbbell, Calendar, Users, FolderKanban, UserCog, Package, Bot, Wand2, TrendingUp, Headphones, Workflow, FileSearch, MessageSquare, FileText, Target, PenTool, PieChart, Search } from 'lucide-react';

import ecommerceApp from '@/assets/app-ecommerce-moroccan.jpg';
import dashboard from '@/assets/app-dashboard-moroccan.jpg';
import cafe from '@/assets/app-cafe-moroccan.jpg';
import lawyer from '@/assets/app-lawyer-moroccan.jpg';
import doctor from '@/assets/app-doctor-moroccan.jpg';
import school from '@/assets/app-school-moroccan.jpg';
import realestate from '@/assets/app-realestate-moroccan.jpg';
import booking from '@/assets/app-booking-moroccan.jpg';
import logistics from '@/assets/app-logistics-moroccan.jpg';
import fintech from '@/assets/app-fintech-moroccan.jpg';
import fitness from '@/assets/app-fitness-moroccan.jpg';
import events from '@/assets/app-events-moroccan.jpg';
import crm from '@/assets/app-crm-moroccan.jpg';
import project from '@/assets/app-project-moroccan.jpg';
import hr from '@/assets/app-hr-moroccan.jpg';
import inventory from '@/assets/app-inventory-moroccan.jpg';
import aichat from '@/assets/app-aichat-moroccan.jpg';
import aiimage from '@/assets/app-aiimage-moroccan.jpg';
import sales from '@/assets/app-sales-moroccan.jpg';
import support from '@/assets/app-support-moroccan.jpg';
import workflow from '@/assets/app-workflow-moroccan.jpg';
import aidoc from '@/assets/app-aidoc-moroccan.jpg';
import collaboration from '@/assets/app-collaboration-moroccan.jpg';
import invoice from '@/assets/app-invoice-moroccan.jpg';
import leads from '@/assets/app-leads-moroccan.jpg';
import aicontent from '@/assets/app-aicontent-moroccan.jpg';
import analytics from '@/assets/app-analytics-moroccan.jpg';

export const AppsPortfolio = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const apps = [
    {
      key: 'ecommerceApp',
      image: ecommerceApp,
      icon: ShoppingCart,
      category: 'ecommerce',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      key: 'dashboard',
      image: dashboard,
      icon: BarChart3,
      category: 'business',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      key: 'cafe',
      image: cafe,
      icon: Coffee,
      category: 'business',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      key: 'lawyer',
      image: lawyer,
      icon: Scale,
      category: 'business',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      key: 'doctor',
      image: doctor,
      icon: Stethoscope,
      category: 'healthcare',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      key: 'school',
      image: school,
      icon: GraduationCap,
      category: 'education',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      key: 'realestate',
      image: realestate,
      icon: Building2,
      category: 'realestate',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      key: 'booking',
      image: booking,
      icon: Hotel,
      category: 'hospitality',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      key: 'logistics',
      image: logistics,
      icon: Truck,
      category: 'logistics',
      gradient: 'from-slate-500 to-gray-700'
    },
    {
      key: 'fintech',
      image: fintech,
      icon: Wallet,
      category: 'fintech',
      gradient: 'from-emerald-500 to-green-700'
    },
    {
      key: 'fitness',
      image: fitness,
      icon: Dumbbell,
      category: 'business',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      key: 'events',
      image: events,
      icon: Calendar,
      category: 'business',
      gradient: 'from-violet-500 to-fuchsia-600'
    },
    {
      key: 'crm',
      image: crm,
      icon: Users,
      category: 'business',
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      key: 'project',
      image: project,
      icon: FolderKanban,
      category: 'business',
      gradient: 'from-orange-600 to-red-500'
    },
    {
      key: 'hr',
      image: hr,
      icon: UserCog,
      category: 'business',
      gradient: 'from-teal-500 to-emerald-600'
    },
    {
      key: 'inventory',
      image: inventory,
      icon: Package,
      category: 'business',
      gradient: 'from-gray-600 to-slate-700'
    },
    {
      key: 'aichat',
      image: aichat,
      icon: Bot,
      category: 'ai',
      gradient: 'from-purple-600 to-pink-500'
    },
    {
      key: 'aiimage',
      image: aiimage,
      icon: Wand2,
      category: 'ai',
      gradient: 'from-fuchsia-500 to-pink-600'
    },
    {
      key: 'sales',
      image: sales,
      icon: TrendingUp,
      category: 'business',
      gradient: 'from-amber-600 to-orange-700'
    },
    {
      key: 'support',
      image: support,
      icon: Headphones,
      category: 'business',
      gradient: 'from-cyan-500 to-teal-600'
    },
    {
      key: 'workflow',
      image: workflow,
      icon: Workflow,
      category: 'business',
      gradient: 'from-indigo-600 to-blue-700'
    },
    {
      key: 'aidoc',
      image: aidoc,
      icon: FileSearch,
      category: 'ai',
      gradient: 'from-blue-700 to-indigo-800'
    },
    {
      key: 'collaboration',
      image: collaboration,
      icon: MessageSquare,
      category: 'business',
      gradient: 'from-violet-600 to-purple-700'
    },
    {
      key: 'invoice',
      image: invoice,
      icon: FileText,
      category: 'business',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      key: 'leads',
      image: leads,
      icon: Target,
      category: 'business',
      gradient: 'from-green-600 to-teal-700'
    },
    {
      key: 'aicontent',
      image: aicontent,
      icon: PenTool,
      category: 'ai',
      gradient: 'from-pink-600 to-rose-700'
    },
    {
      key: 'analytics',
      image: analytics,
      icon: PieChart,
      category: 'business',
      gradient: 'from-slate-700 to-gray-800'
    }
  ];

  const categories = ['all', 'business', 'ecommerce', 'healthcare', 'education', 'realestate', 'hospitality', 'logistics', 'fintech', 'fitness', 'events', 'ai'];

  const filteredApps = apps.filter(app => {
    const matchesSearch = t(`appsPortfolio.apps.${app.key}.title`).toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t(`appsPortfolio.apps.${app.key}.description`).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('appsPortfolio.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('appsPortfolio.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 space-y-6"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('appsPortfolio.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {t(`appsPortfolio.categories.${category}`)}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredApps.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-muted-foreground text-lg">{t('appsPortfolio.noResults')}</p>
            </motion.div>
          ) : (
            filteredApps.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a 
                  href="https://brandhub.ma/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-primary/10 h-full cursor-pointer">
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={app.image} 
                      alt={t(`appsPortfolio.apps.${app.key}.title`)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      width="640"
                      height="360"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    <div className="absolute top-4 right-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${app.gradient} text-white`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {t(`appsPortfolio.categories.${app.category}`)}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {t(`appsPortfolio.apps.${app.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t(`appsPortfolio.apps.${app.key}.description`)}
                    </p>
                  </CardContent>
                 </Card>
                </a>
              </motion.div>
            );
          })
          )}
        </div>
      </div>
    </section>
  );
};
