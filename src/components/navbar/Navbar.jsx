"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-6 left-10 z-50 hidden lg:block">
        <ul className="flex gap-8">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <a
                href={item.href}
                className="text-sm uppercase tracking-widest text-white"
              >
                {item.name}
              </a>
              <span
                className="
                  absolute left-0 -bottom-1
                  h-[1.5px] w-0
                  bg-orange-500
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </li>
          ))}
        </ul>
      </nav>

      <nav className="fixed top-6 right-6 z-50 lg:hidden">
        <motion.button
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.92 }}
          className="
            relative
            w-12 h-12
            rounded-full
            flex items-center justify-center
            bg-black/60
            backdrop-blur-xl
            border border-white/10
            shadow-[0_0_30px_rgba(255,138,0,0.25)]
          "
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <X size={22} className="text-orange-500" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Menu size={22} className="text-orange-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
                absolute right-0 mt-5
                w-52
                rounded-2xl
                bg-black/80
                backdrop-blur-xl
                border border-white/10
                overflow-hidden
                shadow-[0_20px_60px_rgba(0,0,0,0.7)]
              "
            >
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="
                        block px-6 py-4
                        text-sm text-white
                        tracking-wide
                        hover:bg-orange-500/10
                        hover:text-orange-500
                        transition
                      "
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
