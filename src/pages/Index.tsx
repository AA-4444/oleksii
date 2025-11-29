import { CustomCursor } from "@/components/CustomCursor";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/WorkSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="relative bg-background">
      <CustomCursor />
      <InteractiveBackground />
      <NoiseOverlay />
      <ScrollProgress />
      
      <main className="relative z-10">
        <Hero />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>

      <footer className="relative z-10 py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 Creative Portfolio. All rights reserved.</p>
          <p>Designed & Developed with passion</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
