type CaseStudySectionHeaderProps = {
  title: string;
  dark?: boolean;
  className?: string;
};

export function CaseStudySectionHeader({
  title,
  dark = false,
  className = "",
}: CaseStudySectionHeaderProps) {
  return (
    <div className={`border-t border-border pt-8 ${className}`}>
      <h2
        className={`text-[clamp(2.25rem,5vw,4rem)] font-light leading-none tracking-tight ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
