import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Lazy load translations for better initial load performance
i18n
  .use(initReactI18next)
  .init({
    resources: {},
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false // Prevent suspense for better performance
    }
  });

// Load translations asynchronously
const loadTranslations = async () => {
  const [en, fr, ar] = await Promise.all([
    import('./locales/en.json'),
    import('./locales/fr.json'),
    import('./locales/ar.json')
  ]);
  
  i18n.addResourceBundle('en', 'translation', en.default);
  i18n.addResourceBundle('fr', 'translation', fr.default);
  i18n.addResourceBundle('ar', 'translation', ar.default);
};

loadTranslations();

// RTL support - automatically switch direction when language changes
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

// Set initial direction
const initialDir = i18n.language === 'ar' ? 'rtl' : 'ltr';
document.documentElement.dir = initialDir;
document.documentElement.lang = i18n.language;

export default i18n;
