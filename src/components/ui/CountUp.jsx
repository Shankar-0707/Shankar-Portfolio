"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

/**
 * CountUp — React Bits inspired animated number counter.
 * Counts from `from` to `to` with a spring animation when scrolled into view.
 */
export default function CountUp({
  to,
  from = 0,
  delay = 0,
  duration = 2,
  className = "",
  separator = "",
  suffix = "",
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const formatValue = useCallback(
    (latest) => {
      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      };
      const formatted = Intl.NumberFormat("en-US", options).format(Math.round(latest));
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(from) + suffix;
    }
  }, [from, suffix, formatValue]);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, motionValue, to, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest) + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, formatValue, suffix]);

  return <span className={className} ref={ref} />;
}
