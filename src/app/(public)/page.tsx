import { HeroSection } from "@/components/home/HeroSection";
import { NewsSection } from "@/components/home/NewsSection";
import { TableSection } from "@/components/home/TableSection";
import { SquadSection } from "@/components/home/SquadSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { FixturesSection } from "@/components/home/FixturesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NewsSection />
      <TableSection />
      <FixturesSection />
      <ResultsSection />
      <SquadSection />
    </>
  );
}
