import { getCaseStudy } from "@/lib/case-studies";
import { FadeIn } from "@/components/fade-in";
import { MoreWorkSection } from "@/components/more-work-section";
import { PageTransition } from "@/components/page-transition";
import { SldEditorContent } from "@/components/sld-editor/content";
import { SldEditorProjectOverview } from "@/components/sld-editor-project-overview";
import { SldHeroMedia } from "@/components/sld-hero-media";

const study = getCaseStudy("sld-editor")!;

export const metadata = {
  title: `${study.title} — Your Name`,
  description: study.excerpt,
};

export default function SldEditorPage() {
  return (
    <PageTransition>
      <section className="relative px-6 pb-16 pt-32 md:px-10 md:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,0,0,0.03)_0%,transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <FadeIn delay={0.05}>
              <SldEditorProjectOverview />
            </FadeIn>

            <FadeIn delay={0.1} className="flex items-center">
              <SldHeroMedia className="w-full" />
            </FadeIn>
          </div>
        </div>
      </section>

      <SldEditorContent />

      <MoreWorkSection currentId="sld-editor" />
    </PageTransition>
  );
}
