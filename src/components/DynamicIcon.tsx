import { icons, LucideProps } from 'lucide-react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const IconComponent = icons[name as keyof typeof icons];
  
  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
};
