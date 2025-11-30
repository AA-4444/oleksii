import { InteractiveBackground } from "@/components/InteractiveBackground";
import { HeroSection } from "@/components/HeroSection";
import { FactsGridSection } from "@/components/FactsGridSection";
import { PhilosophySection } from "@/components/PhilosophySection";
import { WorkSection } from "@/components/WorkSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative">
      <InteractiveBackground />
      <HeroSection />
      <FactsGridSection />
      <PhilosophySection />
      <WorkSection />
      <ExpertiseSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
