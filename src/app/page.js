"use client";

import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Experience from "@/components/experience/Experience";
import Projects from "@/app/projects/Projects";
import Contact from "@/app/contact/Contacts";
// import Education from "@/components/education/Education";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      {/* <Education /> */}
      <Projects />
      <Contact />
    </>
  );
}
