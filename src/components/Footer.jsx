"use client";

import { Mail } from "lucide-react";
import Logo from "@/components/Logo";

// Standard brand SVGs
const LinkedinIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const handleLinkClick = (e, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer>
      <div className="container footer-inner">
        <div style={{ width: "110px", height: "88px", margin: "0 auto 24px" }}>
          <Logo color="#FCFAF8" />
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <a href="#about" onClick={(e) => handleLinkClick(e, "about")}>
            About
          </a>
          <a href="#problem" onClick={(e) => handleLinkClick(e, "problem")}>
            Who We Help
          </a>
          <a href="#how-it-works" onClick={(e) => handleLinkClick(e, "how-it-works")}>
            How CBD Works
          </a>
          <a href="#verticals" onClick={(e) => handleLinkClick(e, "verticals")}>
            Our Verticals
          </a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")}>
            Contact
          </a>
        </nav>

        <div className="footer-social">
          <a
            href="https://www.linkedin.com/company/thecbdin/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CBD on LinkedIn"
          >
            <LinkedinIcon style={{ width: "15px", height: "15px" }} />
          </a>
          <a
            href="https://www.instagram.com/thecbd.in/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CBD on Instagram"
          >
            <InstagramIcon style={{ width: "15px", height: "15px" }} />
          </a>
          <a href="mailto:contact@thecbd.in" aria-label="Email CBD">
            <Mail style={{ width: "15px", height: "15px" }} />
          </a>
        </div>

        <div className="footer-rule" />
        <div className="footer-copy">&copy; 2026 CBD. All rights reserved.</div>
      </div>
    </footer>
  );
}
