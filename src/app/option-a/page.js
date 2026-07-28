"use client";

import { useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import HeroA from "@/components/HeroA";
import About from "@/components/About";
import WhoWeHelp from "@/components/WhoWeHelp";
import HowItWorks from "@/components/HowItWorks";
import Verticals from "@/components/Verticals";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import "./option-a.css";

export default function OptionAPage() {
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    // Force a scroll-based indicator for option page if needed
    document.body.className = "opt-a-body";

    return () => {
      revealObserver.disconnect();
      document.body.className = "";
    };
  }, []);

  return (
    <div className="opt-a-body">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <CustomCursor />
      <Header />
      <main id="main">
        <HeroA />
        <About />
        <WhoWeHelp isOptionA={true} />
        <HowItWorks />
        <Verticals />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
