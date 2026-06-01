import { PageTransition } from "@/components/page-transition";
import {
  NerdwalletRetirementCalculatorContent,
  NerdwalletRetirementCalculatorHero,
} from "@/components/nerdwallet-retirement-calculator-content";
import { MoreWorkSection } from "@/components/more-work-section";

export const metadata = {
  title: "NerdWallet Retirement Calculator — Your Name",
  description:
    "Helping users understand retirement readiness and take action through a mobile-first planning experience.",
};

export default function NerdwalletRetirementCalculatorPage() {
  return (
    <PageTransition>
      <NerdwalletRetirementCalculatorHero />
      <NerdwalletRetirementCalculatorContent />
      <MoreWorkSection currentId="nerdwallet-retirement-calculator" />
    </PageTransition>
  );
}
