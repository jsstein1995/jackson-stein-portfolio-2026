import { FadeIn } from "@/components/fade-in";
import { PageTransition } from "@/components/page-transition";

export const metadata = {
  title: "Sales Mode Redesign — Your Name",
  description: "Case study coming soon.",
};

export default function SalesModeRedesignPage() {
  return (
    <PageTransition>
      <section className="relative px-6 pb-8 pt-32 md:px-10 md:pb-12 md:pt-36">
        <div className="relative mx-auto max-w-[72rem]">
          <FadeIn delay={0.05}>
            <p className="text-sm tracking-widest text-muted uppercase">
              Selected work · Aurora Solar
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.06] tracking-[-0.03em] text-foreground">
              Sales Mode Redesign
            </h1>
          </FadeIn>

          <FadeIn delay={0.09}>
            <p className="mt-4 text-sm leading-snug text-foreground md:text-base">
              Senior Product Designer · Product Strategy · UX Design
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-2 text-xs tracking-wide text-muted md:text-sm">
              2023 · Aurora Solar
            </p>
          </FadeIn>

          <FadeIn delay={0.12} className="mt-24">
            <p className="text-lg tracking-tight text-muted md:text-xl">
              Coming soon
            </p>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
