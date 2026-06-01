import { getCaseStudy } from "@/lib/case-studies";
import { FadeIn } from "@/components/fade-in";
import { MoreWorkSection } from "@/components/more-work-section";
import { PageTransition } from "@/components/page-transition";
import { HeroPhoneTransition } from "@/components/hero-phone-transition";
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
      <HeroPhoneTransition
        scrollHeight={210}
        splashSrc="/assets/images/train-splash.gif"
        splashAlt="Train Fitness app preview"
        title="Train Fitness"
        subtitle={study.subtitle}
        introPanel={<TrainFitnessProjectOverview compact />}
        introPanelMobile={<TrainFitnessProjectOverview hero />}
        watchSrc={heroWatchImage.src}
        watchAlt={heroWatchImage.alt}
      />

      {/* Full overview on mobile after scroll */}
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
