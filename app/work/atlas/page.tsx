import { getCaseStudy } from "@/lib/case-studies";
import { MoreWorkSection } from "@/components/more-work-section";
import { PageTransition } from "@/components/page-transition";
import { TrainFitnessHero } from "@/components/train-fitness-hero";
import { TrainFitnessProjectOverview } from "@/components/train-fitness-project-overview";
import { TrainFitnessContent } from "@/components/train-fitness-content";
import { heroWatchImage } from "@/lib/train-images";

const study = getCaseStudy("atlas")!;

export const metadata = {
  title: `${study.title} — Your Name`,
  description: study.excerpt,
};

export default function AtlasPage() {
  return (
    <PageTransition>
      <TrainFitnessHero
        splashSrc="/assets/images/train-splash.gif"
        splashAlt="Train Fitness app preview"
        introPanel={<TrainFitnessProjectOverview compact />}
        watchSrc={heroWatchImage.src}
        watchAlt={heroWatchImage.alt}
      />

      <section className="border-t border-border px-6 pb-16 pt-20 md:hidden md:px-10">
        <div className="mx-auto max-w-7xl">
          <TrainFitnessProjectOverview compact />
        </div>
      </section>

      <TrainFitnessContent />

      <MoreWorkSection currentId="atlas" />
    </PageTransition>
  );
}
