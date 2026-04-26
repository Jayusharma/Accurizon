"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let rafId = 0;
    let scrollCleanup: (() => void) | undefined;

    const destroyLenis = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      scrollCleanup?.();
      scrollCleanup = undefined;
      lenis?.destroy();
      lenis = null;
      root.removeAttribute("data-scroll-mode");
      root.setAttribute("data-motion", "reduced");
    };

    const initLenis = async () => {
      if (mediaQuery.matches) {
        destroyLenis();
        return;
      }

      root.setAttribute("data-motion", "full");
      root.setAttribute("data-scroll-mode", "lenis");

      lenis = new Lenis({
        autoRaf: false,
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 0.9,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);

      try {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const updateScrollTrigger = () => ScrollTrigger.update();

        lenis.on("scroll", updateScrollTrigger);
        ScrollTrigger.refresh();

        scrollCleanup = () => {
          lenis?.off("scroll", updateScrollTrigger);
        };
      } catch {
        scrollCleanup = undefined;
      }
    };

    void initLenis();

    const handleChange = () => {
      destroyLenis();
      void initLenis();
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      destroyLenis();
    };
  }, []);

  return children;
}
