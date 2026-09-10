"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitCommitHorizontal,
  FolderGit2,
  GitPullRequest,
  Rocket,
  ExternalLink,
  Activity,
  Code2,
  Award,
  Flame,
  CheckCircle,
  Zap,
} from "lucide-react";
import { SiGithub, SiLeetcode } from "react-icons/si";
import CountUp from "@/components/ui/CountUp";

/* ─── Skeleton Card ──────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-white/5 mb-4" />
      <div className="h-8 w-24 bg-white/5 rounded mb-2" />
      <div className="h-4 w-32 bg-white/5 rounded" />
    </div>
  );
}

/* ─── Stat Card ──────────────────────────────────────────────────────────── */
function StatCard({ icon: Icon, value, label, prefix = "", suffix = "", isLive = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="glass-card p-6 group hover:border-orange-500/60 hover:shadow-[0_0_35px_rgba(255,138,0,0.12)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full -z-10 group-hover:bg-orange-500/10 transition-colors duration-500" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
            <Icon size={22} />
          </div>
          {isLive && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live
            </span>
          )}
        </div>

        <p className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-baseline gap-1">
          {prefix && <span className="text-zinc-500 text-2xl">{prefix}</span>}
          <CountUp to={typeof value === "number" ? value : 0} duration={2} delay={delay} separator="," />
          {suffix && <span className="text-orange-500 text-2xl">{suffix}</span>}
        </p>
      </div>

      <p className="text-zinc-400 text-sm mt-2 font-medium">{label}</p>
    </motion.div>
  );
}

/* ─── LeetCode Difficulty Bar ────────────────────────────────────────────── */
function DifficultyProgress({ label, count, total, color, delay = 0 }) {
  const percentage = Math.min(100, Math.round((count / total) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold" style={{ color }}>
          {label}
        </span>
        <span className="text-zinc-400 font-mono text-xs">
          <span className="text-white font-bold">{count}</span> / {total} ({percentage}%)
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: delay + 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function GitHubStats() {
  const [activeTab, setActiveTab] = useState("github"); // 'github' | 'leetcode'
  const [githubStats, setGithubStats] = useState(null);
  const [leetcodeStats, setLeetcodeStats] = useState(null);

  useEffect(() => {
    // Fetch GitHub stats
    fetch("/api/github-stats")
      .then((r) => r.json())
      .then((data) => setGithubStats(data))
      .catch(() => {});

    // Fetch LeetCode stats
    fetch("/api/leetcode-stats")
      .then((r) => r.json())
      .then((data) => setLeetcodeStats(data))
      .catch(() => {});
  }, []);

  const ghCards = [
    {
      icon: GitCommitHorizontal,
      value: githubStats?.totalCommits || 1200,
      suffix: "+",
      label: "Total Contributions",
      delay: 0,
    },
    {
      icon: FolderGit2,
      value: githubStats?.publicRepos || 20,
      label: "Public Repositories",
      delay: 0.08,
    },
    {
      icon: GitPullRequest,
      value: githubStats?.totalPRs || 35,
      suffix: "+",
      label: "Pull Requests & Collabs",
      delay: 0.16,
    },
    {
      icon: Rocket,
      value: githubStats?.deployedApps || 10,
      suffix: "+",
      isLive: true,
      label: "Production Deployments",
      delay: 0.24,
    },
  ];

  const lcCards = [
    {
      icon: Code2,
      value: leetcodeStats?.totalSolved || 669,
      suffix: "+",
      label: "Problems Solved",
      delay: 0,
    },
    {
      icon: Zap,
      value: leetcodeStats?.acceptanceRate || 73,
      suffix: "%",
      label: "Acceptance Rate",
      delay: 0.08,
    },
    {
      icon: Award,
      value: leetcodeStats?.ranking || 106565,
      prefix: "#",
      label: "Global Ranking",
      delay: 0.16,
    },
    {
      icon: Flame,
      value: 75,
      suffix: "d+",
      label: "Max Practice Streak",
      delay: 0.24,
    },
  ];

  return (
    <section id="github-stats" className="py-28 px-6 overflow-hidden relative scroll-mt-28">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-600/8 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* ── Section Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center tracking-tight"
        >
          Coding & <span className="text-orange-500">Activity</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-zinc-400 text-center mt-4 mb-10 max-w-xl mx-auto"
        >
          Live metrics from my open-source building, engineering commits, and algorithmic problem solving.
        </motion.p>

        {/* ── Interactive Tab Switcher ── */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("github")}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 ${
                activeTab === "github" ? "text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              {activeTab === "github" && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-[0_0_20px_rgba(255,138,0,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <SiGithub size={16} />
                GitHub Activity
              </span>
            </button>

            <button
              onClick={() => setActiveTab("leetcode")}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 ${
                activeTab === "leetcode" ? "text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              {activeTab === "leetcode" && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-[0_0_20px_rgba(255,138,0,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <SiLeetcode size={16} />
                LeetCode Profile
              </span>
            </button>
          </div>
        </div>

        {/* ── Tab Content Container ── */}
        <AnimatePresence mode="wait">
          {activeTab === "github" ? (
            /* ══════════════════ GITHUB TAB ══════════════════ */
            <motion.div
              key="github-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {ghCards.map((card) => (
                  <StatCard key={card.label} {...card} />
                ))}
              </div>

              {/* Full-Width Contribution Graph */}
              <div className="glass-card p-6 md:p-8 hover:border-orange-500/60 hover:shadow-[0_0_35px_rgba(255,138,0,0.12)] transition-all duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Activity size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Daily Contribution Graph</h3>
                      <p className="text-zinc-500 text-xs">Real-time commit calendar (365 days)</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    Active Contributor
                  </div>
                </div>

                <div className="rounded-xl overflow-x-auto bg-white/[0.02] p-4 md:p-6 border border-white/5 flex justify-center items-center">
                  <img
                    src="https://ghchart.rshah.org/ff8a00/Shankar-0707"
                    alt="Shankar-0707 GitHub daily contribution graph"
                    className="min-w-[650px] w-full max-w-4xl object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* GitHub Profile Footer */}
              <div className="mt-6 glass-card p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 hover:border-orange-500/60 hover:shadow-[0_0_35px_rgba(255,138,0,0.12)] transition-all duration-500">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="relative shrink-0">
                    <img
                      src={githubStats?.avatarUrl || "https://github.com/Shankar-0707.png"}
                      alt="Shankar GitHub avatar"
                      className="w-12 h-12 rounded-full ring-2 ring-orange-500/40 object-cover"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-base">
                      {githubStats?.name || "Shankar Jangid"}
                    </p>
                    <p className="text-zinc-500 text-xs">@{githubStats?.username || "Shankar-0707"}</p>
                    {githubStats?.bio && (
                      <p className="text-zinc-400 text-xs mt-0.5 max-w-sm line-clamp-1">
                        {githubStats.bio}
                      </p>
                    )}
                  </div>
                </div>

                <a
                  href={githubStats?.profileUrl || "https://github.com/Shankar-0707"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-semibold text-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,138,0,0.4)] active:scale-95 shrink-0"
                >
                  View GitHub Profile
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          ) : (
            /* ══════════════════ LEETCODE TAB ══════════════════ */
            <motion.div
              key="leetcode-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {lcCards.map((card) => (
                  <StatCard key={card.label} {...card} />
                ))}
              </div>

              {/* Difficulty Breakdown & Topic Focus Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Difficulty Progress Card */}
                <div className="glass-card p-6 md:p-8 hover:border-orange-500/60 hover:shadow-[0_0_35px_rgba(255,138,0,0.12)] transition-all duration-500 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Code2 size={18} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Difficulty Breakdown</h3>
                        <p className="text-zinc-500 text-xs">Solved problem categorization</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <DifficultyProgress
                        label="Easy"
                        count={leetcodeStats?.easySolved || 301}
                        total={leetcodeStats?.easyTotal || 830}
                        color="#10B981"
                        delay={0.1}
                      />
                      <DifficultyProgress
                        label="Medium"
                        count={leetcodeStats?.mediumSolved || 305}
                        total={leetcodeStats?.mediumTotal || 1750}
                        color="#F59E0B"
                        delay={0.2}
                      />
                      <DifficultyProgress
                        label="Hard"
                        count={leetcodeStats?.hardSolved || 63}
                        total={leetcodeStats?.hardTotal || 750}
                        color="#EF4444"
                        delay={0.3}
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                    <span>Primary Language: <strong className="text-white">C++</strong></span>
                    <span>Total Solved: <strong className="text-orange-400">{leetcodeStats?.totalSolved || 669}+</strong></span>
                  </div>
                </div>

                {/* Core DSA Arsenal Card */}
                <div className="glass-card p-6 md:p-8 hover:border-orange-500/60 hover:shadow-[0_0_35px_rgba(255,138,0,0.12)] transition-all duration-500 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Zap size={18} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Core Algorithms & DS</h3>
                        <p className="text-zinc-500 text-xs">Key topics practiced & mastered in C++</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {[
                        "Dynamic Programming",
                        "Graph Theory & BFS/DFS",
                        "Trees & BST",
                        "Binary Search",
                        "Two Pointers & Sliding Window",
                        "Heap & Priority Queue",
                        "Greedy Algorithms",
                        "Trie & String Hashing",
                        "Recursion & Backtracking",
                        "Bit Manipulation",
                      ].map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 hover:border-orange-500/40 hover:text-orange-400 transition-colors cursor-default"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle size={14} /> Active DSA Practice in C++
                    </span>
                    <span>{leetcodeStats?.totalSolved || 669}+ Problems Completed</span>
                  </div>
                </div>
              </div>

              {/* LeetCode Profile Footer */}
              <div className="glass-card p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 hover:border-orange-500/60 hover:shadow-[0_0_35px_rgba(255,138,0,0.12)] transition-all duration-500">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 text-xl font-bold shrink-0">
                    <SiLeetcode size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-base">Shankar Jangid</p>
                    <p className="text-zinc-500 text-xs">@Shankar_Jangid on LeetCode</p>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      Consistent problem solver focusing on optimal time & space complexity in C++.
                    </p>
                  </div>
                </div>

                <a
                  href="https://leetcode.com/u/Shankar_Jangid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-semibold text-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,138,0,0.4)] active:scale-95 shrink-0"
                >
                  View LeetCode Profile
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
