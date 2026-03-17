import { HeroSection } from "@/components/HeroSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { OurClientsSection } from "@/components/OurClientsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { BusinessScaleSection } from "@/components/BusinessScaleSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { InsightsSection } from "@/components/InsightsSection";
import { ContactSection } from "@/components/ContactSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useLenis } from "@/hooks/useLenis";
import { useEffect, useState } from "react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

let homeShown = false;

const Index = () => {
  useLenis();

  usePageMetadata({
    title: "Forrof | Leading Software & Digital Solutions Agency",
    description: "Transform your business with Forrof's expert software development, branding, web design, mobile apps, SEO, SaaS, cloud solutions, and digital services. Trusted by businesses worldwide.",
    keywords: "forrof, software agency, web development, mobile app development, UI UX design, branding, SEO services, SaaS development, cloud solutions, cybersecurity, automation, digital transformation, custom software, software development company",
  });

  const [isLoading, setIsLoading] = useState(!homeShown);

  useEffect(() => {
    if (homeShown) return;
    homeShown = true;
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <main className="overflow-x-clip">
        <HeroSection />
        <OurClientsSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <BusinessScaleSection />
        <MarqueeSection />
        <TestimonialsSection />
        <FAQSection />
        <InsightsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
