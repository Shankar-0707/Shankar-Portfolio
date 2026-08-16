"use client";

import { forwardRef, useMemo, useRef, useEffect, useCallback, useState } from "react";

/**
 * VariableProximity — React Bits component
 * Morphs font variation axes (weight, width) based on mouse proximity.
 * Requires a variable font. Falls back to weight scaling gracefully.
 *
 * Usage:
 *   <VariableProximity
 *     label="About Me"
 *     fromFontVariationSettings="'wght' 400"
 *     toFontVariationSettings="'wght' 900"
 *     containerRef={containerRef}
 *     radius={120}
 *     falloff="exponential"
 *   />
 */
const VariableProximity = forwardRef(function VariableProximity(
  {
    label,
    fromFontVariationSettings = "'wght' 400",
    toFontVariationSettings = "'wght' 900",
    containerRef,
    radius = 100,
    falloff = "exponential", // "linear" | "exponential" | "gaussian"
    className = "",
    style,
    onClick,
    ...rest
  },
  ref
) {
  const letterRefs = useRef([]);
  const interpolatedRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: null, y: null });
  const frameId = useRef(null);

  // Parse font variation axis strings into structured data
  const parsedSettings = useMemo(() => {
    const parse = (str) =>
      new Map(
        str
          .split(",")
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.trim().split(" ");
            return [name.replace(/['"]/g, ""), parseFloat(value)];
          })
      );
    const from = parse(fromFontVariationSettings);
    const to = parse(toFontVariationSettings);
    return Array.from(from.entries()).map(([axis, fromVal]) => ({
      axis,
      fromVal,
      toVal: to.get(axis) ?? fromVal,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  // Track mouse relative to container
  useEffect(() => {
    const onMove = (e) => {
      const el = containerRef?.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      } else {
        mousePos.current = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [containerRef]);

  const getFalloff = useCallback(
    (distance) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      switch (falloff) {
        case "exponential":
          return norm ** 2;
        case "gaussian":
          return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
        default:
          return norm;
      }
    },
    [radius, falloff]
  );

  // RAF loop — animate letter weights
  useEffect(() => {
    const container = containerRef?.current;

    const tick = () => {
      const { x, y } = mousePos.current;
      if (lastPos.current.x === x && lastPos.current.y === y) {
        frameId.current = requestAnimationFrame(tick);
        return;
      }
      lastPos.current = { x, y };

      const containerRect = container?.getBoundingClientRect();

      letterRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - (containerRect?.left ?? 0);
        const cy = rect.top + rect.height / 2 - (containerRect?.top ?? 0);
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

        if (dist >= radius) {
          el.style.fontVariationSettings = fromFontVariationSettings;
          return;
        }
        const f = getFalloff(dist);
        const settings = parsedSettings
          .map(({ axis, fromVal, toVal }) => {
            const v = fromVal + (toVal - fromVal) * f;
            return `'${axis}' ${v}`;
          })
          .join(", ");
        el.style.fontVariationSettings = settings;
      });

      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, [containerRef, parsedSettings, fromFontVariationSettings, radius, getFalloff]);

  // Split label into words → letters
  const words = label.split(" ");
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline", ...style }}
      onClick={onClick}
      {...rest}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char) => {
            const idx = letterIndex++;
            return (
              <span
                key={idx}
                ref={(el) => (letterRefs.current[idx] = el)}
                style={{
                  display: "inline-block",
                  fontVariationSettings:
                    interpolatedRef.current[idx] ?? fromFontVariationSettings,
                  transition: "font-variation-settings 0.05s linear",
                }}
                aria-hidden="true"
              >
                {char}
              </span>
            );
          })}
          {wi < words.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

export default VariableProximity;
