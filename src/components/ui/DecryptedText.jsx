"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

/**
 * DecryptedText — React Bits inspired component
 * Scrambles text with random characters, then sequentially reveals the real letters.
 * animateOn: "view" | "hover"
 */
export default function DecryptedText({
  text = "",
  speed = 40,
  maxIterations = 12,
  sequential = true,
  revealDirection = "start",
  characters = CHARS,
  className = "",
  encryptedClassName = "text-orange-500/60",
  animateOn = "view",
  once = true,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const availableChars = useMemo(() => characters.split(""), [characters]);

  const shuffleText = useCallback(
    (originalText, revealed) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (revealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    },
    [availableChars]
  );

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set());
    setIsAnimating(true);
  }, []);

  // Auto-start when in view
  useEffect(() => {
    if (animateOn === "view" && isInView && !hasAnimated) {
      triggerDecrypt();
      if (once) setHasAnimated(true);
    }
  }, [isInView, animateOn, hasAnimated, once, triggerDecrypt]);

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return;

    let iteration = 0;
    let currentRevealed = new Set();
    let pointer = 0;

    const interval = setInterval(() => {
      if (sequential) {
        if (pointer < text.length) {
          // reveal characters that are not spaces
          while (pointer < text.length && text[pointer] === " ") {
            currentRevealed.add(pointer);
            pointer++;
          }
          if (pointer < text.length) {
            currentRevealed.add(pointer);
            pointer++;
          }
          setRevealedIndices(new Set(currentRevealed));
          setDisplayText(shuffleText(text, currentRevealed));
        } else {
          setDisplayText(text);
          setIsAnimating(false);
          clearInterval(interval);
        }
      } else {
        iteration++;
        setDisplayText(shuffleText(text, currentRevealed));
        if (iteration >= maxIterations) {
          setDisplayText(text);
          setIsAnimating(false);
          clearInterval(interval);
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, text, shuffleText, sequential, maxIterations, speed]);

  return (
    <span
      ref={ref}
      aria-label={text}
      onMouseEnter={() => animateOn === "hover" && !isAnimating && triggerDecrypt()}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={
            char !== text[i] && char !== " "
              ? encryptedClassName
              : className
          }
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}
