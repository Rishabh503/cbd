"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const spySections = ["about", "problem", "how-it-works", "verticals", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.01, rootMargin: "-45% 0px -45% 0px" }
    );

    spySections.forEach((sec) => observer.observe(sec));

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLinkClick = (e, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`} id="siteHeader">
        <div className="container nav-inner">
          <a
            href="#top"
            onClick={(e) => handleLinkClick(e, "top")}
            className="logo"
            aria-label="CBD — Connect. Buzz. Disrupt."
          >
            <div className="logo-container" style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "52px", height: "42px" }}>
                <Logo showWordmark={true} />
              </div>
            </div>
          </a>

          <nav className="nav-links" id="navLinks" aria-label="Primary">
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, "about")}
              className={activeSection === "about" ? "active" : ""}
            >
              About
            </a>
            <a
              href="#problem"
              onClick={(e) => handleLinkClick(e, "problem")}
              className={activeSection === "problem" ? "active" : ""}
            >
              Who We Help
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleLinkClick(e, "how-it-works")}
              className={activeSection === "how-it-works" ? "active" : ""}
            >
              How CBD Works
            </a>
            <a
              href="#verticals"
              onClick={(e) => handleLinkClick(e, "verticals")}
              className={activeSection === "verticals" ? "active" : ""}
            >
              Our Verticals
            </a>
          </nav>

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "contact")}
            className="nav-cta card-btn"
          >
            Contact Us <ArrowUpRight style={{ width: "16px", height: "16px" }} />
          </a>

          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobileMenu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu style={{ width: "18px", height: "18px" }} />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} id="mobileMenu">
        <button
          className="mobile-close"
          id="mobileClose"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        >
          <X style={{ width: "18px", height: "18px" }} />
        </button>
        <a
          href="#about"
          onClick={(e) => handleLinkClick(e, "about")}
          className={activeSection === "about" ? "active" : ""}
        >
          About
        </a>
        <a
          href="#problem"
          onClick={(e) => handleLinkClick(e, "problem")}
          className={activeSection === "problem" ? "active" : ""}
        >
          Who We Help
        </a>
        <a
          href="#how-it-works"
          onClick={(e) => handleLinkClick(e, "how-it-works")}
          className={activeSection === "how-it-works" ? "active" : ""}
        >
          How CBD Works
        </a>
        <a
          href="#verticals"
          onClick={(e) => handleLinkClick(e, "verticals")}
          className={activeSection === "verticals" ? "active" : ""}
        >
          Our Verticals
        </a>
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, "contact")}
          className={activeSection === "contact" ? "active" : ""}
        >
          Contact
        </a>
      </div>
    </>
  );
}
