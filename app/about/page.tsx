import Image from "next/image";
import { AboutArtworkGallery } from "@/components/about-artwork-gallery";
import { FadeIn } from "@/components/fade-in";
import { PageTransition } from "@/components/page-transition";
import { homeImageSrc } from "@/lib/home-image-src";

export const metadata = {
  title: "About — Your Name",
  description:
    "Product designer based in New York — solar, fintech, consumer technology, and fine art.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] tracking-[-0.03em]">
              Product designer, artist, and lifelong student.
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-border px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">
          <FadeIn>
            <Image
              src={homeImageSrc("/assets/images/selfie2.png")}
              alt="Portrait photo"
              width={1478}
              height={1396}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </FadeIn>

          <FadeIn delay={0.08}>
            <div>
              <h2 className="flex items-center gap-4 text-xl font-light tracking-tight text-foreground md:text-2xl">
                About me
                <span className="emoji" aria-hidden>
                  👨🏻‍💻 / 👨🏻‍🎨
                </span>
              </h2>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
                <p>I&apos;m a product designer based in New York.</p>
                <p>
                  Over the last decade I&apos;ve worked on products in solar,
                  fintech, and consumer technology, helping teams tackle
                  everything from enterprise workflows to consumer financial
                  tools.
                </p>
                <p>
                  Outside of work, I practice drawing and painting from life
                  whenever I get the chance. I previously studied at Grand
                  Central Atelier part-time — evenings and weekends — and I care
                  deeply about striving for excellence in my craft, whether
                  digitally or in the studio.
                </p>
                <p>
                  When I&apos;m not designing or painting, I love exploring this
                  beautiful earth through climbing, surfing, or wandering city
                  parks with my dog.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 pb-28 pt-24 md:px-10 md:pb-32 md:pt-32">
        <div
          aria-hidden
          className="absolute inset-0 bg-[#0a0a0a]"
          style={{
            clipPath: "polygon(0 4rem, 100% 0, 100% 100%, 0 100%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl text-[#fafafa]">
          <FadeIn>
            <h2 className="text-sm tracking-widest text-[#a3a3a3] uppercase">
              Recent Fine Art Works
            </h2>
          </FadeIn>
          <FadeIn delay={0.08} className="mt-10">
            <AboutArtworkGallery theme="dark" />
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
