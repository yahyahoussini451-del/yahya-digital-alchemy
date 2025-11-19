/**
 * Sitemap Generator Utility
 * Run this script to generate sitemap.xml
 * Usage: node -r esbuild-register src/utils/generateSitemap.ts
 */

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: { lang: string; href: string }[];
}

const baseUrl = 'https://yahyahoussini.com';
const languages = ['en', 'fr', 'ar'];

const routes: Omit<SitemapUrl, 'lastmod' | 'alternates'>[] = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 },
  { loc: '/#about', changefreq: 'monthly', priority: 0.8 },
  { loc: '/#skills', changefreq: 'monthly', priority: 0.8 },
  { loc: '/#apps', changefreq: 'weekly', priority: 0.9 },
  { loc: '/#projects', changefreq: 'weekly', priority: 0.9 },
  { loc: '/#services', changefreq: 'monthly', priority: 0.9 },
  { loc: '/#certifications', changefreq: 'monthly', priority: 0.7 },
  { loc: '/#testimonials', changefreq: 'monthly', priority: 0.7 },
  { loc: '/#blog', changefreq: 'weekly', priority: 0.8 },
  { loc: '/#faq', changefreq: 'monthly', priority: 0.8 },
  { loc: '/#contact', changefreq: 'monthly', priority: 0.9 }
];

function generateSitemap(): string {
  const now = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  routes.forEach(route => {
    languages.forEach(lang => {
      const url = lang === 'en' ? `${baseUrl}${route.loc}` : `${baseUrl}/${lang}${route.loc}`;
      
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      
      // Add hreflang alternates
      languages.forEach(altLang => {
        const altUrl = altLang === 'en' ? `${baseUrl}${route.loc}` : `${baseUrl}/${altLang}${route.loc}`;
        const hreflang = altLang === 'fr' ? 'fr-FR' : altLang === 'ar' ? 'ar-MA' : 'en-US';
        xml += `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${altUrl}"/>\n`;
      });
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${route.loc}"/>\n`;
      
      xml += '  </url>\n';
    });
  });

  xml += '</urlset>';
  return xml;
}

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 0

# Google
User-agent: Googlebot
Allow: /

# Bing
User-agent: Bingbot
Allow: /
`;
}

// Export functions for use in build scripts
export { generateSitemap, generateRobotsTxt };

// CLI execution
if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  
  const sitemapContent = generateSitemap();
  const robotsContent = generateRobotsTxt();
  
  const publicDir = path.join(__dirname, '../../public');
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
  
  console.log('✅ sitemap.xml generated successfully');
  console.log('✅ robots.txt generated successfully');
}
