import { notFound } from "next/navigation";
import { PageTransition } from "@/components/page-transition";
import {
  FinancingComparisonsContent,
  FinancingComparisonsHero,
} from "@/components/financing-comparisons-content";
import { MoreWorkSection } from "@/components/more-work-section";
import { isProjectHidden } from "@/lib/home-projects";

const ROUTE = "/work/financing-comparisons";

export const metadata = {
  title: "Financing Comparisons — Your Name",
  description:
    "Helping solar sales reps compare financing options and tell a clearer financial story in Aurora Solar Sales Mode.",
};

export default function FinancingComparisonsPage() {
  if (isProjectHidden(ROUTE)) notFound();

  return (
    <PageTransition>
      <FinancingComparisonsHero />
      <FinancingComparisonsContent />
      <MoreWorkSection currentId="financing-comparisons" />
    </PageTransition>
  );
}
