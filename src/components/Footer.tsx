import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground">
          {t('footer.tagline')}
        </div>
      </div>
    </footer>
  );
};
