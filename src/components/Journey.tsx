import { useTranslation } from 'react-i18next';
import { Lightbulb, Palette, Code, TestTube, Rocket, TrendingUp } from 'lucide-react';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';

export const Journey = () => {
  const { t } = useTranslation();

  const timelineData = [
    {
      id: 1,
      title: "Strategy & Planning",
      date: "Phase 1",
      content: "Defining project scope, requirements gathering, and strategic planning for successful execution.",
      category: "Planning",
      icon: Lightbulb,
      relatedIds: [2],
      status: "completed" as const,
      energy: 100,
    },
    {
      id: 2,
      title: "Design & Branding",
      date: "Phase 2",
      content: "Creating stunning visual identities, UI/UX design, and brand systems that captivate audiences.",
      category: "Design",
      icon: Palette,
      relatedIds: [1, 3],
      status: "completed" as const,
      energy: 95,
    },
    {
      id: 3,
      title: "Development",
      date: "Phase 3",
      content: "Building robust, scalable applications with cutting-edge technologies and best practices.",
      category: "Development",
      icon: Code,
      relatedIds: [2, 4],
      status: "in-progress" as const,
      energy: 85,
    },
    {
      id: 4,
      title: "Testing & QA",
      date: "Phase 4",
      content: "Rigorous testing, quality assurance, and optimization to ensure flawless performance.",
      category: "Testing",
      icon: TestTube,
      relatedIds: [3, 5],
      status: "in-progress" as const,
      energy: 70,
    },
    {
      id: 5,
      title: "Launch & Deploy",
      date: "Phase 5",
      content: "Strategic deployment, monitoring, and ensuring smooth launch with zero downtime.",
      category: "Launch",
      icon: Rocket,
      relatedIds: [4, 6],
      status: "pending" as const,
      energy: 50,
    },
    {
      id: 6,
      title: "Growth & Scale",
      date: "Phase 6",
      content: "Continuous optimization, scaling infrastructure, and driving growth through data-driven insights.",
      category: "Growth",
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
