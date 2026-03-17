import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({
  isLoading,
  onLoadingComplete,
}: LoadingScreenProps) => {
  const [show, setShow] = useState(isLoading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) return;
    const duration = 900;
    const start = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / duration);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [show]);

  useEffect(() => {
    if (!isLoading && show) {
      const t = setTimeout(() => {
        setShow(false);
        onLoadingComplete?.();
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isLoading, show, onLoadingComplete]);

  const pct = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#000" }}
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo + text */}
          <div className="flex flex-col items-center gap-6">
            {/* Logo with glow pulse */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="absolute inset-0 rounded-full blur-[40px]"
                style={{ background: "rgba(0, 212, 170, 0.15)" }}
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src="/logo-white.png"
                alt=""
                width={80}
                height={80}
                className="relative z-10"
              />
            </motion.div>

            {/* Brand name */}
            <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
              forrof
            </h1>
          </div>

          {/* Bottom section */}
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 space-y-5">
            {/* Text + percentage */}
            <div className="flex items-end justify-between">
              <p className="text-white/40 text-sm font-light tracking-wide">
                Building Intelligent Software for the AI Era
              </p>
              <span className="text-white/80 text-xl md:text-2xl font-semibold tabular-nums">
                {pct}%
              </span>
            </div>

            {/* Progress line */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00d4aa, #48f0e7)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
