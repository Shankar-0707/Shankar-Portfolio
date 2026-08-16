"use client";

import { motion } from "framer-motion";
import BlurText from "@/components/ui/BlurText";
import DecryptedText from "@/components/ui/DecryptedText";

export default function Hero() {
  return (
    <section
      id="home"
      className="
        scroll-mt-28
        relative
        min-h-[92vh] md:min-h-screen
        flex items-start md:items-center
        pt-28 md:pt-0
        px-6 md:px-10
        overflow-hidden
      "
    >
      {/* Huge Backing Glow for Desktop */}
      <div className="absolute top-1/4 left-0 w-[50vh] h-[50vh] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          {/* Status Badge — BlurText */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-[0.2em] mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <BlurText
              text="FULL STACK DEVELOPER"
              animateBy="letters"
              delay={35}
              duration={0.5}
              direction="top"
            />
          </div>

          {/* Heading — DecryptedText on name */}
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Hi, I&apos;m <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 flex mt-1">
              <DecryptedText
                text="Shankar Jangid"
                speed={45}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                once={true}
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500"
                encryptedClassName="text-orange-500/40"
              />
            </span>
          </h1>

          {/* Subtitle — BlurText word-by-word */}
          <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
            <BlurText
              text="I am a Full Stack Developer. I build clean, fast, and highly interactive applications using modern tools."
              animateBy="words"
              delay={55}
              duration={0.55}
              direction="bottom"
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <a
              href="#projects"
              className="
                group relative inline-flex justify-center items-center gap-2
                px-8 py-4 rounded-full overflow-hidden
                bg-orange-500 text-white font-semibold tracking-wide
                transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(255,138,0,0.5)]
              "
            >
              Explore Projects
            </a>

            <a
              href="#contact"
              className="
                inline-flex justify-center items-center
                px-8 py-4 rounded-full
                border-2 border-white/10 bg-white/5 backdrop-blur-md text-white font-semibold tracking-wide
                hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400 transition-all duration-300
              "
            >
              Contact Me
            </a>
          </div>

          {/* MOBILE VISUAL FILL */}
          <div className="block md:hidden mt-14">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent mb-6" />
            <p className="text-xs text-gray-500 tracking-widest text-center">
              SCROLL TO EXPLORE
            </p>
          </div>
        </motion.div>

        {/* RIGHT IMAGE (DESKTOP ONLY) */}
        <div className="hidden lg:flex justify-center lg:justify-end relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-500/15 blur-[100px] rounded-full pointer-events-none -z-0" />
          
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-b from-orange-500/10 to-transparent p-1.5 shadow-[0_0_50px_rgba(249,115,22,0.15)]"
          >
            <img
              src="/hero/Shankar.jpg"
              alt="Shankar Jangid"
              className="w-full max-w-[340px] xl:max-w-[400px] max-h-[420px] xl:max-h-[460px] object-cover object-top rounded-2xl select-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

