"use client";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useEffect, useState } from "react";

export default function BackgroundParticles() {
  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <Particles
      init={init}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },

        background: {
          color: "#0a0a0a",
        },

        fpsLimit: isMobile ? 40 : 60,

        particles: {
          number: {
            value: isMobile ? 50 : 120,
            density: {
              enable: true,
              area: 900,
            },
          },

          color: {
            value: "#ff8a00",
          },

          opacity: {
            value: 0.28,
          },

          size: {
            value: 1.6,
          },

          move: {
            enable: true,
            speed: isMobile ? 0.35 : 0.5,
            direction: "none",
            outModes: {
              default: "out",
            },
          },

          links: {
            enable: !isMobile,
            distance: 130,
            color: "#ff8a00",
            opacity: 0.18,
            width: 1,
          },
        },

        interactivity: {
          events: {
            onHover: {
              enable: !isMobile,
              mode: "repulse",
            },
          },
          modes: {
            repulse: {
              distance: 140,
              duration: 0.4,
            },
          },
        },

        detectRetina: true,
      }}
    />
  );
}