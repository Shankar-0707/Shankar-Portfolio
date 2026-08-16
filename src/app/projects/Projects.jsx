"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

const CircularGallery = dynamic(
  () => import("@/components/ui/CircularGallery/CircularGallery"),
  { ssr: false }
);

const projects = [
  {
  id: 1,
  title: "Skill-Link",
  shortTitle: "Skill-Link",
  description:
    "Built an end-to-end service marketplace connecting customers with organizations through role-based authentication, reservations, and service handoff. Engineered a transactional escrow and virtual wallet system with a 5% platform commission and OTP-based payout verification. Integrated Razorpay payments, multi-step KYC, Redis-backed rate limiting, and automated PDF invoicing with asynchronous email delivery.",
  image: "/projects/Skill-Link.png",
  tech: [
    "NestJS",
    "PostgreSQL",
    "Prisma ORM",
    "React.js",
    "Redis",
    "Razorpay",
    "Cloudinary",
    "OAuth 2.0",
    "RBAC",
  ],
  liveUrl: "https://www.linkskill.org.in/",
  codeUrl: "https://github.com/Shankar-0707/Skill-Link.git",
},
  {
  id: 2,
  title: "TaskPilot – AI-Powered Full-Stack Platform",
  shortTitle: "TaskPilot",
  description:
    "Built a full-stack AI platform for text summarization, language translation, image generation, and audio transcription using Google Gemini AI. Designed a scalable background job system with Redis and BullMQ to process resource-intensive AI tasks asynchronously without blocking the main application.",
  image: "/projects/TaskPilot.png",
  tech: [
    "React",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Redis",
    "BullMQ",
    "Gemini AI",
  ],
  liveUrl: "https://atr-web-phi.vercel.app/",
  codeUrl: "https://github.com/Shankar-0707/ATR.git",
},
 {
  id: 3,
  title: "DSA-DUDE",
  shortTitle: "DSA Platform",
  description:
    "An interactive DSA learning platform with problem approaches, quizzes, PDF summarization, visualizations, and an AI-powered assistant for personalized learning.",
  image: "/projects/DSA-DUDE.png",
  tech: [
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Gemini 2.5 Flash",
  ],
  liveUrl: "https://dsa-dude-pmne.vercel.app/",
  codeUrl: "https://github.com/Shankar-0707/DSA-DUDE.git",
},
 {
  id: 4,
  title: "MyCleaners – Company Website",
  shortTitle: "MyCleaners",
  description:
    "Built the complete company website from scratch using Next.js and deployed it on Vercel, with server-side rendering and performance optimizations for a fast and responsive user experience.",
  image: "/projects/MyCleaners.png",
  tech: [
    "Next.js",
    "React",
    "JavaScript",
    "SSR",
    "Vercel",
  ],
  liveUrl: "https://myc-website.vercel.",
},
  {
  id: 5,
  title: "Gcommit – Developer CLI Tool",
  shortTitle: "Gcommit",
  description:
    "An open-source developer CLI tool that automates structured Git commit message generation while providing in-terminal code review and unused file detection. Includes interactive prompts and reusable commit templates following conventional commit standards, with 500+ weekly downloads.",
  image: "/projects/Gcommit.png",
  tech: [
    "JavaScript",
    "Node.js",
    "CLI",
    "NPM",
    "Git",
  ],
  liveUrl: "https://www.npmjs.com/package/@shankar07/gcommitt",
  codeUrl: "https://github.com/Shankar-0707/gcommit.git",
},
];

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // 🔥 RESPONSIVE LOGIC
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // mobile
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // tablet
      } else {
        setCardsPerView(3); // desktop
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const CARD_WIDTH = 360;
  const MAX_INDEX = Math.max(projects.length - cardsPerView, 0);

  return (
    <section id="projects" className="py-28 overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center"
        >
          Featured <span className="text-orange-500">Projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-zinc-400 text-center mt-4 mb-16"
        >
          A showcase of my selected work
        </motion.p>

        {/* CIRCULAR GALLERY */}
        <div className="w-full h-[600px] mt-10 rounded-3xl overflow-hidden border border-white/10 bg-black/20 shadow-[0_0_40px_rgba(255,138,0,0.1)] relative">
          <CircularGallery
            items={projects.map((p) => ({ image: p.image, text: p.shortTitle }))}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            font="bold 22px Inter, sans-serif"
          />
          {/* Instructions overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-500 font-medium tracking-widest text-xs uppercase pointer-events-none bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md">
            Scroll to explore
          </div>
        </div>

        {/* PROJECT DETAILS GRID */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl overflow-hidden hover:border-orange-500/50 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,138,0,0.15)] transition-all duration-500 p-7 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-3 text-white transition-colors duration-300 drop-shadow-md">
                {project.title}
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300/80 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 text-sm font-semibold mt-auto pt-4 border-t border-white/5">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 rounded-xl bg-orange-500 text-white flex items-center justify-center gap-2 hover:bg-orange-400 hover:shadow-[0_0_20px_rgba(255,138,0,0.4)] transition-all duration-300"
                >
                  <ExternalLink size={16} /> Visit App
                </a>
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center gap-2 hover:bg-white/10 hover:text-orange-400 transition-all duration-300"
                >
                  <Github size={16} /> Source
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
