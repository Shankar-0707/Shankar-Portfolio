"use client";

import { GraduationCap, BookOpen, Laptop } from "lucide-react";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <section
      id="education"
      className="py-28 overflow-hidden scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center"
        >
          Education & <span className="text-orange-500">Learning</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-zinc-400 text-center mt-4 mb-20 max-w-xl mx-auto"
        >
          My academic background and the learning paths I’ve followed to build a
          strong foundation in software development.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">

          {/* CARD 1: IGNOU */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative glass-card p-8 hover:border-orange-500/60 hover:shadow-[0_0_35px_rgba(255,138,0,0.12)] transition-all duration-500 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full -z-10 group-hover:bg-orange-500/10 transition-colors duration-500" />
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <GraduationCap size={26} />
              </div>
              <h3 className="text-xl font-semibold leading-snug">
                Bachelor of Computer Applications (BCA)
              </h3>
            </div>

            <p className="text-orange-400 font-medium text-sm mb-4">
              Indira Gandhi National Open University (IGNOU)
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Currently pursuing BCA with a focus on computer science
              fundamentals, programming concepts, and application development.
              Alongside academics, I actively build projects and practice DSA.
            </p>

            <div className="mt-8 pt-4 border-t border-white/5">
              <p className="text-zinc-500 text-xs">
                College: Sri Guru Tegh Bahadur Khalsa College, Delhi
              </p>
            </div>
          </motion.div>

          {/* CARD 2: Full Stack Knowledge */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative glass-card p-8 hover:border-orange-500/60 hover:shadow-[0_0_35px_rgba(255,138,0,0.12)] transition-all duration-500 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full -z-10 group-hover:bg-orange-500/10 transition-colors duration-500" />
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <Laptop size={24} />
              </div>
              <h3 className="text-xl font-semibold leading-snug">
                Full Stack Web Development
              </h3>
            </div>

            <p className="text-orange-400 font-medium text-sm mb-4">
              Self-Taught & Project-Based Learning
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Mastered the MERN stack (MongoDB, Express, React, Node.js) and Next.js through rigorous hands-on projects. Specialized in RESTful APIs, modern UI libraries like Tailwind, and scalable system architecture.
            </p>

            <div className="mt-8 pt-4 border-t border-white/5">
              <p className="text-zinc-500 text-xs">
                Real-world projects and robust backend engineering
              </p>
            </div>
          </motion.div>

          {/* CARD 3: Courses */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative glass-card p-8 hover:border-orange-500/60 hover:shadow-[0_0_35px_rgba(255,138,0,0.12)] transition-all duration-500 group overflow-hidden md:col-span-2 lg:col-span-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full -z-10 group-hover:bg-orange-500/10 transition-colors duration-500" />

            <div className="flex flex-col gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-semibold leading-snug">
                Courses & Certifications
              </h3>
            </div>

            <ul className="space-y-5 text-sm text-zinc-400 mt-4">
              <li className="flex gap-3">
                <span className="text-orange-500 relative top-[2px]">▹</span>
                <span><strong className="text-white font-medium">C++ with DSA</strong> — Love Babbar (CodeHelp)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 relative top-[2px]">▹</span>
                <span><strong className="text-white font-medium">Computer Fundamentals</strong> — OS, Networking basics</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 relative top-[2px]">▹</span>
                <span><strong className="text-white font-medium">Problem Solving</strong> — Daily LeetCode (100+ Qns Solved)</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
