import { supabase } from '@/integrations/supabase/client';

export const migrateAppsToDatabase = async () => {
  const apps = [
    { title: 'E-commerce Platform', description: 'Complete online store solution', image_url: '/src/assets/app-ecommerce-moroccan.jpg', icon_name: 'ShoppingCart', category: 'ecommerce', gradient: 'from-orange-500 to-red-600', display_order: 1 },
    { title: 'Analytics Dashboard', description: 'Business intelligence tool', image_url: '/src/assets/app-dashboard-moroccan.jpg', icon_name: 'BarChart3', category: 'business', gradient: 'from-blue-500 to-indigo-600', display_order: 2 },
    { title: 'Café Management', description: 'Restaurant POS system', image_url: '/src/assets/app-cafe-moroccan.jpg', icon_name: 'Coffee', category: 'business', gradient: 'from-amber-500 to-orange-600', display_order: 3 },
    { title: 'Legal Practice Manager', description: 'Law firm management', image_url: '/src/assets/app-lawyer-moroccan.jpg', icon_name: 'Scale', category: 'business', gradient: 'from-purple-500 to-pink-600', display_order: 4 },
    { title: 'Medical Portal', description: 'Healthcare management', image_url: '/src/assets/app-doctor-moroccan.jpg', icon_name: 'Stethoscope', category: 'healthcare', gradient: 'from-green-500 to-teal-600', display_order: 5 },
    { title: 'School Management', description: 'Education platform', image_url: '/src/assets/app-school-moroccan.jpg', icon_name: 'GraduationCap', category: 'education', gradient: 'from-cyan-500 to-blue-600', display_order: 6 },
    { title: 'Real Estate Portal', description: 'Property marketplace', image_url: '/src/assets/app-realestate-moroccan.jpg', icon_name: 'Building2', category: 'realestate', gradient: 'from-yellow-500 to-orange-500', display_order: 7 },
    { title: 'Hotel Booking', description: 'Hospitality system', image_url: '/src/assets/app-booking-moroccan.jpg', icon_name: 'Hotel', category: 'hospitality', gradient: 'from-indigo-500 to-purple-600', display_order: 8 },
    { title: 'Logistics Tracker', description: 'Supply chain management', image_url: '/src/assets/app-logistics-moroccan.jpg', icon_name: 'Truck', category: 'logistics', gradient: 'from-slate-500 to-gray-700', display_order: 9 },
    { title: 'FinTech Platform', description: 'Financial services', image_url: '/src/assets/app-fintech-moroccan.jpg', icon_name: 'Wallet', category: 'finance', gradient: 'from-emerald-500 to-green-600', display_order: 10 },
    { title: 'Fitness Tracker', description: 'Health & wellness app', image_url: '/src/assets/app-fitness-moroccan.jpg', icon_name: 'Dumbbell', category: 'health', gradient: 'from-rose-500 to-pink-600', display_order: 11 },
    { title: 'Event Manager', description: 'Event planning tool', image_url: '/src/assets/app-events-moroccan.jpg', icon_name: 'Calendar', category: 'events', gradient: 'from-violet-500 to-purple-600', display_order: 12 },
    { title: 'CRM System', description: 'Customer relationship management', image_url: '/src/assets/app-crm-moroccan.jpg', icon_name: 'Users', category: 'business', gradient: 'from-blue-500 to-cyan-600', display_order: 13 },
    { title: 'Project Manager', description: 'Team collaboration tool', image_url: '/src/assets/app-project-moroccan.jpg', icon_name: 'FolderKanban', category: 'productivity', gradient: 'from-teal-500 to-green-600', display_order: 14 },
    { title: 'HR Management', description: 'Human resources platform', image_url: '/src/assets/app-hr-moroccan.jpg', icon_name: 'UserCog', category: 'business', gradient: 'from-orange-500 to-red-500', display_order: 15 },
    { title: 'Inventory System', description: 'Stock management', image_url: '/src/assets/app-inventory-moroccan.jpg', icon_name: 'Package', category: 'business', gradient: 'from-amber-500 to-yellow-600', display_order: 16 },
    { title: 'AI Chatbot', description: 'Conversational AI assistant', image_url: '/src/assets/app-aichat-moroccan.jpg', icon_name: 'Bot', category: 'ai', gradient: 'from-purple-500 to-indigo-600', display_order: 17 },
    { title: 'AI Image Generator', description: 'Creative AI tool', image_url: '/src/assets/app-aiimage-moroccan.jpg', icon_name: 'Wand2', category: 'ai', gradient: 'from-pink-500 to-rose-600', display_order: 18 },
    { title: 'Sales Dashboard', description: 'Revenue analytics', image_url: '/src/assets/app-sales-moroccan.jpg', icon_name: 'TrendingUp', category: 'business', gradient: 'from-green-500 to-emerald-600', display_order: 19 },
    { title: 'Support Desk', description: 'Customer service platform', image_url: '/src/assets/app-support-moroccan.jpg', icon_name: 'Headphones', category: 'business', gradient: 'from-blue-500 to-purple-600', display_order: 20 },
    { title: 'Workflow Automation', description: 'Process automation', image_url: '/src/assets/app-workflow-moroccan.jpg', icon_name: 'Workflow', category: 'productivity', gradient: 'from-cyan-500 to-teal-600', display_order: 21 },
    { title: 'AI Document Reader', description: 'Document analysis', image_url: '/src/assets/app-aidoc-moroccan.jpg', icon_name: 'FileSearch', category: 'ai', gradient: 'from-indigo-500 to-blue-600', display_order: 22 },
    { title: 'Team Collaboration', description: 'Workspace platform', image_url: '/src/assets/app-collaboration-moroccan.jpg', icon_name: 'MessageSquare', category: 'productivity', gradient: 'from-violet-500 to-fuchsia-600', display_order: 23 },
    { title: 'Invoice Generator', description: 'Billing system', image_url: '/src/assets/app-invoice-moroccan.jpg', icon_name: 'FileText', category: 'business', gradient: 'from-slate-500 to-zinc-600', display_order: 24 },
    { title: 'Lead Management', description: 'Sales pipeline tool', image_url: '/src/assets/app-leads-moroccan.jpg', icon_name: 'Target', category: 'business', gradient: 'from-red-500 to-orange-600', display_order: 25 },
    { title: 'AI Content Writer', description: 'Content generation', image_url: '/src/assets/app-aicontent-moroccan.jpg', icon_name: 'PenTool', category: 'ai', gradient: 'from-purple-500 to-pink-600', display_order: 26 },
    { title: 'Analytics Suite', description: 'Data visualization', image_url: '/src/assets/app-analytics-moroccan.jpg', icon_name: 'PieChart', category: 'business', gradient: 'from-blue-500 to-cyan-600', display_order: 27 },
  ];

  try {
    const { data, error } = await supabase
      .from('apps')
      .insert(apps);

    if (error) throw error;

    console.log('✅ Successfully migrated apps to database!');
    return { success: true, data };
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error };
  }
};
