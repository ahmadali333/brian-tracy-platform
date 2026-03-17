import { useEffect, RefObject } from 'react';

/**
 * Pure native scroll — no Lenis, no GSAP ScrollTrigger refresh.
 * GSAP ScrollTrigger is only used locally in HeroGlobe for the globe scrub.
 */
export const useLenis = () => {
  // Intentionally empty — kept for API compatibility.
  // ScrollTrigger.refresh() was removed because it was fighting
  // with Framer Motion's own scroll tracking every tick.
};

export const useParallax = (ref: RefObject<HTMLElement>, speed: number = 0.5) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      element.style.transform = `translate3d(0, ${-(scrolled * speed)}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);
};

export const scrollTo = (target: string | number) => {
  if (typeof target === 'string') {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};
