"use client";

import { useRef, useEffect, useState } from "react";

/**
 * InfiniteLogoStrip — React Bits LogoLoop-inspired component
 * Renders an infinitely scrolling horizontal strip of icon+name pairs.
 * Two rows: top row scrolls left, bottom row scrolls right for visual depth.
 * Pure CSS animation — zero JS runtime cost after mount.
 * Pauses on hover.
 */

const STRIP_CSS = `
@keyframes scroll-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes scroll-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.strip-left  { animation: scroll-left  var(--strip-duration, 28s) linear infinite; }
.strip-right { animation: scroll-right var(--strip-duration, 32s) linear infinite; }
.strip-left:hover,
.strip-right:hover { animation-play-state: paused; }
`;

export default function InfiniteLogoStrip({ rows, speed = 28 }) {
  return (
    <>
      <style>{STRIP_CSS}</style>
      <div className="relative overflow-hidden w-full" style={{ "--strip-duration": `${speed}s` }}>

        {/* Left-edge fade */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        {/* Right-edge fade */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {rows.map((items, rowIdx) => {
          const direction = rowIdx % 2 === 0 ? "strip-left" : "strip-right";
          // Duplicate the list so seamless loop works
          const doubled = [...items, ...items];

          return (
            <div key={rowIdx} className="overflow-hidden py-2">
              <div className={`flex gap-4 w-max ${direction}`}>
                {doubled.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="
                        group flex items-center gap-3
                        px-5 py-3 rounded-2xl
                        bg-white/5 border border-white/10
                        hover:border-white/25 hover:bg-white/10
                        transition-all duration-300 cursor-default
                        flex-shrink-0
                      "
                      style={{ minWidth: "max-content" }}
                    >
                      {/* Colored icon */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/30 border border-white/5 group-hover:bg-black/50 transition-colors duration-300"
                      >
                        <Icon
                          size={18}
                          style={{ color: item.color }}
                          className="drop-shadow-sm flex-shrink-0"
                        />
                      </div>
                      {/* Name */}
                      <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                        {item.name}
                      </span>

                      {/* Bottom accent line on hover */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-[2px] w-0 group-hover:w-full transition-all duration-400 ease-out rounded-b-2xl"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
