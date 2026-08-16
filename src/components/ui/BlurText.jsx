"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

/**
 * BlurText — React Bits inspired component
 * Animates text word-by-word or letter-by-letter with a blur + fade + slide effect.
 */
export default function BlurText({
  text = "",
  animateBy = "words",   // "words" | "letters"
  delay = 80,            // ms stagger between each segment
  duration = 0.6,
  className = "",
  once = true,           // only animate on first view
  direction = "top",     // "top" | "bottom"
}) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const controls = useAnimation();

  const fromY = direction === "top" ? -24 : 24;

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: fromY,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      aria-label={text}
    >
      {elements.map((el, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block"
          aria-hidden="true"
        >
          {el === " " ? "\u00A0" : el}
        </motion.span>
      ))}
    </motion.span>
  );
}
