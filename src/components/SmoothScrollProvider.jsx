"use client";

import { useEffect, useRef } from "react";

/**
 * SmoothScrollProvider
 * Wraps the app in Lenis smooth scrolling.
 * - Uses RAF (requestAnimationFrame) loop synced with framer-motion's raf
 * - Automatically disabled on reduced-motion preference
 * - Cleans up on unmount
 */
export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect user's reduced-motion setting
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    let lenis;
    let rafId;

    async function initLenis() {
      const Lenis = (await import("lenis")).default;

      lenis = new Lenis({
        duration: 1.3,          // scroll duration multiplier — higher = slower/smoother
        easing: (t) =>
          t === 1 ? 1 : 1 - Math.pow(2, -10 * t), // easeOutExpo
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisRef.current = lenis;

      // RAF loop
      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Sync anchor hash links with Lenis
      const handleAnchor = (e) => {
        const anchor = e.target.closest("a[href^='#']");
        if (!anchor) return;
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        
        try {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -32, duration: 1.4 });
          }
        } catch (err) {
          // Ignore invalid selectors
        }
      };
      
      document.addEventListener("click", handleAnchor);
      lenis.__handleAnchorListner = handleAnchor; // Store to remove later
    }

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        if (lenis.__handleAnchorListner) {
          document.removeEventListener("click", lenis.__handleAnchorListner);
        }
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
