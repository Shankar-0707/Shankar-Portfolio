"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * CustomCursor — Smooth magnetic orange cursor with glow trail
 * Replaces default OS cursor site-wide.
 * Hides automatically on touch devices.
 * Grows on hovering over interactive elements (buttons, links, inputs).
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const rawX = useRef(0);
  const rawY = useRef(0);

  // Spring-smoothed values for the main cursor
  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  // Slightly laggier spring for the trailing ring
  const ringConfig = { damping: 18, stiffness: 130, mass: 0.8 };
  const ringX = useSpring(0, ringConfig);
  const ringY = useSpring(0, ringConfig);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    // Hide default cursor globally
    document.documentElement.style.cursor = "none";

    const onMove = (e) => {
      rawX.current = e.clientX;
      rawY.current = e.clientY;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    // Hover detection on interactive elements
    const onMouseOver = (e) => {
      const target = e.target.closest("a, button, input, textarea, select, [data-cursor-hover]");
      setHovering(!!target);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (isTouchDevice) return null;

  const dotSize = clicking ? 6 : 8;
  const ringSize = hovering ? 52 : clicking ? 28 : 36;

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          translateX: `-${ringSize / 2}px`,
          translateY: `-${ringSize / 2}px`,
          width: ringSize,
          height: ringSize,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          borderRadius: "50%",
          border: hovering ? "2px solid #ff8a00" : "1.5px solid rgba(255,138,0,0.5)",
          background: hovering ? "rgba(255,138,0,0.08)" : "transparent",
          boxShadow: hovering
            ? "0 0 20px rgba(255,138,0,0.4), 0 0 40px rgba(255,138,0,0.15)"
            : "0 0 10px rgba(255,138,0,0.2)",
          transition: "width 0.2s ease, height 0.2s ease, border 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, translate 0.2s ease",
        }}
      />

      {/* Inner dot cursor */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: `-${dotSize / 2}px`,
          translateY: `-${dotSize / 2}px`,
          width: dotSize,
          height: dotSize,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          borderRadius: "50%",
          background: "radial-gradient(circle, #ffb703, #ff8a00)",
          boxShadow: "0 0 8px rgba(255,138,0,0.9), 0 0 18px rgba(255,138,0,0.4)",
          transition: "width 0.1s ease, height 0.1s ease, translate 0.1s ease",
        }}
      />
    </>
  );
}
