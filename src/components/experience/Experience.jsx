"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const timeline = [
  {
  year: "Jan 2026 – June 2026",
  title: "Full Stack Developer Intern — MyCleaners",
  points: [
    "Built 20+ RESTful APIs for a role-based store management system using Node.js, Express, Prisma, and PostgreSQL",
    "Developed core user management, order processing, and invoice workflows with relational database modeling",
    "Built and deployed the company website using Next.js with SSR and performance optimization",
  ],
},
  {
    year: "2025 – Present",
    title: "Full Stack Web Development",
    points: [
      "Building scalable full-stack applications using MERN stack & Next.js",
      "Developing secure RESTful APIs, authentication, and Databases",
      "Continuously learning and integrating modern interactive UI tools",
    ],
  },
 {
  year: "2025 – Present",
  title: "Data Structures & Algorithms",
  points: [
    "Solved 700+ problems across LeetCode and other coding platforms",
    "Developed a strong problem-solving mindset with focus on writing efficient and optimized solutions",
    "Consistently practiced DSA in C++ for coding interviews and for Contests.",
  ],
},
 {
  year: "2025 – 2026",
  title: "Hackathons & Competitive Engineering",
  points: [
    "Runner-up at CodeClash 2.0, held at the Google office",
    "Secured 1st place at Mind Over Data Hackathon, BVCOE",
    "Ranked 6th out of 100 participants at NMG Labs Forge Sprint 2 for building an Agentic AI orchestration system",
  ],
},
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6">
      <Reveal>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-center">
            Experience & <span className="text-orange-500">Learning</span>
          </h2>

          <p className="text-center text-zinc-400 mt-3 mb-20 max-w-xl mx-auto">
            A journey of continuous learning through hands-on projects,
            practice, and real-world problem solving.
          </p>

          <div className="relative mt-16 lg:mt-24">
            {/* Center Line Glow - Hidden on mobile, Center on md+ */}
            <div className="absolute left-[22px] md:left-1/2 top-0 h-full w-[4px] bg-orange-500/20 blur-sm md:-translate-x-1/2" />
            {/* Center Line Solid - Left aligned on mobile, Center on md+ */}
            <div className="absolute left-[22px] md:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-orange-500 via-orange-500/20 to-transparent md:-translate-x-1/2" />

            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
                  className={`mb-12 md:mb-20 flex w-full justify-end ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Card Container - full width offset on mobile, 50%-30px on desktop safely locked */}
                  <div className="relative w-[calc(100%-60px)] md:w-[calc(50%-30px)] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-orange-500/50 hover:shadow-[0_0_35px_rgba(255,138,0,0.15)] transition-all duration-500 group overflow-hidden cursor-pointer">
                    
                    {/* Hover Glow Background inside card */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full -z-10 group-hover:bg-orange-500/10 transition-colors duration-500" />

                    {/* Timeline Dot Desktop */}
                    <div
                      className={`absolute top-8 w-6 h-6 rounded-full border-[5px] border-black bg-orange-500 shadow-[0_0_15px_rgba(255,138,0,0.8)] z-10 group-hover:scale-125 group-hover:shadow-[0_0_25px_rgba(255,138,0,1)] transition-all duration-300 hidden md:block ${
                        isLeft ? "-right-[30px] translate-x-1/2" : "-left-[30px] -translate-x-1/2"
                      }`}
                    />
                    
                    {/* Mobile Dot */}
                    <div className="absolute top-8 -left-[38px] -translate-x-1/2 w-5 h-5 rounded-full border-[4px] border-black bg-orange-500 md:hidden z-10 shadow-[0_0_10px_rgba(255,138,0,0.8)]" />

                    <div className="inline-block px-3 md:px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] md:text-xs font-bold text-orange-400 tracking-wider uppercase mb-3 md:mb-4 shadow-inner">
                      {item.year}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mt-1 mb-4 md:mb-5 text-white group-hover:text-orange-400 transition-colors duration-300">
                      {item.title}
                    </h3>

                    <ul className="space-y-3 md:space-y-4 text-zinc-400 text-xs md:text-sm leading-relaxed">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex gap-2 md:gap-3 items-start">
                          <CheckCircle2 className="text-orange-500/60 mt-[2px] flex-shrink-0" size={14} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
