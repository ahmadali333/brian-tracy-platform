import { useEffect, useRef } from "react";

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const CursorLight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice) return;
    const div = ref.current;
    if (!div) return;

    let rafId = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const target = e.target as HTMLElement;
        if (target?.closest?.("[data-no-cursor-light]")) {
          div.style.opacity = "0";
          return;
        }
        // Use transform instead of re-rendering gradient — GPU composited, no repaint
        div.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
        div.style.opacity = "1";
      });
    };

    const onLeave = () => {
      div.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={ref}
      className="cursor-light"
      style={{ opacity: 0, willChange: "transform, opacity", contain: "layout style" }}
    />
  );
};
