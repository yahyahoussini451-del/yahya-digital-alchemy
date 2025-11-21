import { useTranslation } from 'react-i18next';
import { Lightbulb, Palette, Code, TestTube, Rocket, TrendingUp } from 'lucide-react';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';

export const Journey = () => {
  const { t } = useTranslation();

  const timelineData = [
    {
      id: 1,
      title: t('journey.phases.strategy.title'),
      date: t('journey.phases.strategy.phase'),
      content: t('journey.phases.strategy.content'),
      category: t('journey.phases.strategy.category'),
      icon: Lightbulb,
      relatedIds: [2],
      status: "completed" as const,
      energy: 100,
    },
    {
      id: 2,
      title: t('journey.phases.design.title'),
      date: t('journey.phases.design.phase'),
      content: t('journey.phases.design.content'),
      category: t('journey.phases.design.category'),
      icon: Palette,
      relatedIds: [1, 3],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 3,
      title: t('journey.phases.development.title'),
      date: t('journey.phases.development.phase'),
      content: t('journey.phases.development.content'),
      category: t('journey.phases.development.category'),
      icon: Code,
      relatedIds: [2, 4],
      status: "in-progress" as const,
      energy: 85,
    },
    {
      id: 4,
      title: t('journey.phases.testing.title'),
      date: t('journey.phases.testing.phase'),
      content: t('journey.phases.testing.content'),
      category: t('journey.phases.testing.category'),
      icon: TestTube,
      relatedIds: [3, 5],
      status: "in-progress" as const,
      energy: 70,
    },
    {
      id: 5,
      title: t('journey.phases.launch.title'),
      date: t('journey.phases.launch.phase'),
      content: t('journey.phases.launch.content'),
      category: t('journey.phases.launch.category'),
      icon: Rocket,
      relatedIds: [4, 6],
      status: "pending" as const,
      energy: 50,
    },
    {
      id: 6,
      title: t('journey.phases.growth.title'),
      date: t('journey.phases.growth.phase'),
      content: t('journey.phases.growth.content'),
      category: t('journey.phases.growth.category'),
      icon: TrendingUp,
      relatedIds: [5],
      status: "pending" as const,
      energy: 30,
    },
  ];

  return (
    <section id="journey" className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-black pointer-events-none"></div>
      <div className="relative">
        <div className="text-center py-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {t('journey.title', 'My Development Journey')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('journey.subtitle', 'Explore the phases of how I transform ideas into digital reality')}
          </p>
        </div>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </section>
  );
};
