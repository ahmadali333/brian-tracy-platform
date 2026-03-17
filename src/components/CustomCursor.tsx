import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const isVisibleRef = useRef(false);
  const opacityMain = useMotionValue(0);
  const opacityTrail = useMotionValue(0);

  // Raw motion values for main cursor — no spring overhead, instant response
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Only the trail gets springs — 2 springs instead of 6
  const trailX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const trailY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          opacityMain.set(1);
          opacityTrail.set(0.5);
        }
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => { opacityMain.set(0); opacityTrail.set(0); isVisibleRef.current = false; };
    const handleMouseEnter = () => { opacityMain.set(1); opacityTrail.set(0.5); isVisibleRef.current = true; };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-hide]')) {
        opacityMain.set(0);
        opacityTrail.set(0);
        return;
      }
      const hoverElement = target.closest('[data-cursor]');
      if (hoverElement) {
        setIsHovering(true);
        setCursorText(hoverElement.getAttribute('data-cursor') || "");
      }
    };

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-hide]')) {
        if (isVisibleRef.current) {
          opacityMain.set(1);
          opacityTrail.set(0.5);
        }
      }
      setIsHovering(false);
      setCursorText("");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [cursorX, cursorY, opacityMain, opacityTrail]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Trail cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-foreground/40 w-10 h-10"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: opacityTrail,
          scale: isHovering ? 2.5 : 1,
        }}
      />

      {/* Main cursor — raw values, no spring delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-foreground flex items-center justify-center w-4 h-4"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: opacityMain,
          scale: isClicking ? 0.8 : isHovering ? 5 : 1,
        }}
      >
        {cursorText && (
          <motion.span
            className="text-background text-xs font-medium whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
