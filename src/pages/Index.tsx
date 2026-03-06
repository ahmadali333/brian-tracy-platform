import { HeroSection } from "@/components/HeroSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { OurClientsSection } from "@/components/OurClientsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TeamSection } from "@/components/TeamSection";
import { FAQSection } from "@/components/FAQSection";
import { InsightsSection } from "@/components/InsightsSection";
import { ContactSection } from "@/components/ContactSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useLenis } from "@/hooks/useLenis";
import { useEffect, useRef, useState } from "react";
import { usePageMetadata } from "@/hooks/usePageMetadata";

// Persists across route changes but resets on full page reload
let homeAssetsLoaded = false;

const Index = () => {
  // Initialize Lenis smooth scrolling
  useLenis();

  // SEO Meta Tags
  usePageMetadata({
    title: "Forrof | Leading Software & Digital Solutions Agency",
    description: "Transform your business with Forrof's expert software development, branding, web design, mobile apps, SEO, SaaS, cloud solutions, and digital services. Trusted by businesses worldwide.",
    keywords: "forrof, software agency, web development, mobile app development, UI UX design, branding, SEO services, SaaS development, cloud solutions, cybersecurity, automation, digital transformation, custom software, software development company",
  });

  const [isLoading, setIsLoading] = useState(!homeAssetsLoaded);
  const [progress, setProgress] = useState(homeAssetsLoaded ? 100 : 0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (homeAssetsLoaded) return;

    let cancelled = false;
    const startTime = performance.now();
    const MIN_DISPLAY = 1500;

    const finish = () => {
      if (cancelled) return;
      setProgress(100);
      homeAssetsLoaded = true;
      // Small delay so user sees 100% before fade out
      setTimeout(() => {
        if (!cancelled) setIsLoading(false);
      }, 400);
    };

    const waitForAssets = () => {
      const images = mainRef.current
        ? Array.from(mainRef.current.querySelectorAll("img"))
        : [];

      // +1 for document ready as an extra "asset"
      const total = images.length + 1;
      let loaded = 0;

      const tick = () => {
        loaded++;
        if (!cancelled) {
          setProgress(Math.round((loaded / total) * 100));
        }
        if (loaded >= total) {
          const elapsed = performance.now() - startTime;
          const remaining = Math.max(0, MIN_DISPLAY - elapsed);
          setTimeout(finish, remaining);
        }
      };

      // Track each image
      images.forEach((img) => {
        if (img.complete) {
          tick();
        } else {
          img.addEventListener("load", tick, { once: true });
          img.addEventListener("error", tick, { once: true });
        }
      });

      // Track document ready
      if (document.readyState === "complete") {
        tick();
      } else {
        window.addEventListener("load", tick, { once: true });
      }
    };

    const raf = requestAnimationFrame(() => {
      waitForAssets();
    });

    // Safety timeout — never show loader for more than 10s
    const safetyTimeout = setTimeout(finish, 10000);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} progress={progress} />

      <main ref={mainRef}>
        <HeroSection />
        <OurClientsSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <PricingSection />
        <MarqueeSection />
        <TestimonialsSection />
        {/* <TeamSection /> */}
        <FAQSection />
        <InsightsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
