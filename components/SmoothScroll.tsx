"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** The active Lenis instance, or null when smooth scrolling is off (e.g. reduced motion). */
export function getLenis() {
  return instance;
}

/**
 * Wraps the app with Lenis smooth scrolling.
 * Disabled entirely when the user prefers reduced motion (native scroll is used instead),
 * and re-evaluated if that preference changes while the page is open.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const start = () => {
      if (lenis || media.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        anchors: { offset: -80 }, // smooth in-page anchor links, leaving room for a header
      });
      instance = lenis;
    };

    const stop = () => {
      lenis?.destroy();
      lenis = null;
      instance = null;
    };

    const onChange = () => (media.matches ? stop() : start());

    start();
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return <>{children}</>;
}
