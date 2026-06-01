type CaseStudyIntroPanelProps = {
  className?: string;
};

export function CaseStudyIntroPanel({ className = "" }: CaseStudyIntroPanelProps) {
  return (
    <div className={`space-y-10 ${className}`}>
      <section>
        <h2 className="text-sm font-medium tracking-tight text-foreground">
          Overview
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted italic md:text-lg">
          Train Fitness is a unique workout app offering a completely hands-free
          experience. Its AI technology detects your movements to identify the
          150 exercises you&apos;re performing and counts your reps
          automatically. The app also provides a complete social experience,
          allowing users to stay motivated by connecting with friends.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {[
          { label: "Open", desc: "Launch the app" },
          { label: "Move", desc: "For any exercise" },
          { label: "Detect", desc: "Counts reps automatically" },
          { label: "Log", desc: "Entire workout saved" },
        ].map((step) => (
          <div key={step.label} className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface">
              <span className="text-xs text-muted">{step.label[0]}</span>
            </div>
            <p className="mt-2 text-xs leading-snug text-muted">{step.label}</p>
            <p className="text-[10px] text-muted/70">{step.desc}</p>
          </div>
        ))}
      </section>

      <p className="text-base leading-relaxed text-muted italic md:text-lg">
        I joined Train as their sole designer after their first round of funding.
        My role involved creating the entire visual experience and collaborating
        closely with the founders on product features and the overall vision. I
        was tasked with bringing their AI technology to life in preparation for
        the app&apos;s first app store launch.
      </p>

      <section>
        <h2 className="text-sm font-medium tracking-tight text-foreground">
          Project details
        </h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="text-muted">Duration:</dt>
            <dd className="text-foreground">6 months</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">Role:</dt>
            <dd className="text-foreground">Product Designer</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted">Team:</dt>
            <dd className="text-foreground">2 founders, 3 engineers</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
