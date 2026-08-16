"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Code2, ShieldCheck, Terminal } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import VariableProximity from "@/components/ui/VariableProximity";

export default function About() {
  const containerRef = useRef(null);

  return (
    <section id="about" className="py-24 px-6 scroll-mt-28" ref={containerRef}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* VariableProximity Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 cursor-default select-none">
            <VariableProximity
              label="About"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              containerRef={containerRef}
              radius={140}
              falloff="exponential"
              className="text-white"
            />
            {" "}
            <VariableProximity
              label="Me"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              containerRef={containerRef}
              radius={140}
              falloff="exponential"
              className="text-orange-500"
            />
          </h2>

          <p className="text-zinc-400 leading-relaxed mb-6">
            I am an{" "}
            <span className="text-white font-medium">Aspiring Software Engineer and Full Stack Developer</span>{" "}
            with a strong commands on creating{" "}
            <span className="text-orange-500">
              clean, responsive, and scalable applications
            </span>
            . I have experience building{" "}
            <span className="text-white font-medium">Full-stack applications, Backend systems, REST APIs, and AI-powered solutions, </span>
              with a strong foundation in DSA and core computer science.
          </p>

          <p className="text-zinc-400 leading-relaxed mb-6">
            I enjoy working across different technologies and 
            <span className="text-orange-500"> adapt quickly to new tools and environments</span>{" "}
          
            <span className="text-white font-medium">depending on the problem I’m solving.</span>
          
          </p>

          <p className="text-zinc-400 leading-relaxed mb-10">
            Beyond tech, I’m into gym, cricket, and continuously learning new things.
          </p>

          <a
            href="/projects/Shankar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              px-7 py-3
              bg-orange-500 text-white text-sm
              rounded-3xl
              transition-all duration-300
              hover:bg-orange-400
              hover:shadow-[0_0_30px_rgba(255,138,0,0.45)]
            "
          >
            Download Resume
          </a>
        </motion.div>

        {/* RIGHT STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* PROJECTS */}
          <motion.div
            whileHover={{ y: -8 }}
            className="glass-card p-6 text-center transition"
          >
            <Code2 className="mx-auto mb-4 text-orange-500" size={26} />
            <h3 className="text-3xl font-bold text-white">
              <CountUp to={15} duration={1.8} suffix="+" />
            </h3>
            <p className="text-zinc-400 text-sm mt-1">Projects Built</p>
          </motion.div>

          {/* LEETCODE */}
          <motion.div
            whileHover={{ y: -8 }}
            className="glass-card p-6 text-center transition"
          >
            <Terminal className="mx-auto mb-4 text-orange-500" size={26} />
            <h3 className="text-3xl font-bold text-white">
              <CountUp to={700} duration={2} suffix="+" />
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              LeetCode Problems Solved
            </p>
          </motion.div>

          {/* MINDSET */}
<motion.div
  whileHover={{ y: -8 }}
  className="glass-card p-6 text-center transition"
>
  <ShieldCheck className="mx-auto mb-4 text-orange-500" size={26} />
  <h3 className="text-xl font-semibold text-white">Self-Driven</h3>
  <p className="text-zinc-400 text-sm mt-1">Always Improving</p>
</motion.div>
        </div>
      </div>
    </section>
  );
}
