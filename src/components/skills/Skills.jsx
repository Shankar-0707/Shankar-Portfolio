"use client";

import { motion } from "framer-motion";
import InfiniteLogoStrip from "@/components/ui/InfiniteLogoStrip";
import {
  SiReact, SiNextdotjs, SiJavascript, SiGit, SiGithub,
  SiTailwindcss, SiPython, SiNodedotjs, SiExpress,
  SiMongodb, SiPostman, SiPostgresql, SiTypescript, SiNestjs, SiMysql, SiRedis, SiPrisma, SiDocker, SiN8N,
  SiGooglegemini, SiOpenai, SiAuth0, SiJsonwebtokens 
} from "react-icons/si";

// Split into 2 balanced rows
const ROW_1 = [
  { name: "React.js",     icon: SiReact,       color: "#61DAFB" },
  { name: "Next.js",      icon: SiNextdotjs,   color: "#ffffff" },
  { name: "TypeScript",   icon: SiTypescript,  color: "#3178C6" },
  { name: "JavaScript",   icon: SiJavascript,  color: "#F7DF1E" },
  { name: "Node.js",      icon: SiNodedotjs,   color: "#339933" },
  { name: "NestJS",       icon: SiNestjs,      color: "#E0234E" },
  { name: "Express.js",   icon: SiExpress,     color: "#ffffff" },
  { name: "Python",       icon: SiPython,      color: "#3776AB" },
];

const ROW_2 = [
  { name: "PostgreSQL",   icon: SiPostgresql,  color: "#4169E1" },
  { name: "MongoDB",      icon: SiMongodb,     color: "#47A248" },
  { name: "MySQL",        icon: SiMysql,       color: "#4479A1" },
  { name: "Redis",        icon: SiRedis,       color: "#DC382D" },
  { name: "Prisma",       icon: SiPrisma,      color: "#2D3748" },
  { name: "Docker",       icon: SiDocker,      color: "#2496ED" },
  { name: "Git",          icon: SiGit,         color: "#F05032" },
  { name: "GitHub",       icon: SiGithub,      color: "#ffffff" },
  { name: "Postman",      icon: SiPostman,     color: "#FF6C37" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
];

const ROW_3 = [
  { name: "n8n",            icon: SiN8N,           color: "#EA4B71" },
  { name: "Gemini AI",      icon: SiGooglegemini,  color: "#8E75B2" },
  { name: "Agentic AI",     icon: SiOpenai,        color: "#ffffff" },
  { name: "REST APIs",      icon: SiPostman,       color: "#FF6C37" },
  { name: "Redis",          icon: SiRedis,         color: "#DC382D" },
  { name: "OAuth 2.0",      icon: SiAuth0,         color: "#EB5424" },
  { name: "JWT",            icon: SiJsonwebtokens, color: "#ffffff" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-center px-6"
        >
          Skills &amp; <span className="text-orange-500">Technologies</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-zinc-400 mt-4 mb-16 max-w-xl mx-auto text-center px-6"
        >
          Technologies I use to build modern, responsive, and scalable applications.
        </motion.p>

        {/* LOGO LOOP STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <InfiniteLogoStrip rows={[ROW_1, ROW_2, ROW_3]} speed={28} />
        </motion.div>
      </div>
    </section>
  );
}
