"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [animateIn, setAnimateIn] = useState(false);
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);

  const heroRef = useRef(null);
  const heroObjectsRef = useRef(null);

  const words = ["CONNECT.", "BUZZ.", "DISRUPT."];

  // Typing animation
  useEffect(() => {
    setMounted(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTypedText(words.join(" "));
      setAnimateIn(true);
      return;
    }

    let wordIdx = 0;
    let charIdx = 0;
    let activeTimer;

    const typeStep = () => {
      if (wordIdx >= words.length) {
        activeTimer = setTimeout(() => {
          setAnimateIn(true);
        }, 300);
        return;
      }

      const word = words[wordIdx];
      if (charIdx <= word.length) {
        setTypedText(
          words.slice(0, wordIdx).join(" ") +
            (wordIdx > 0 ? " " : "") +
            word.slice(0, charIdx)
        );
        charIdx++;
        activeTimer = setTimeout(typeStep, 70);
      } else {
        wordIdx++;
        charIdx = 0;
        activeTimer = setTimeout(typeStep, 380);
      }
    };

    activeTimer = setTimeout(typeStep, 500);
    return () => clearTimeout(activeTimer);
  }, []);

  // background network of lines
  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      if (!heroRef.current) return;
      const w = heroRef.current.offsetWidth;
      const h = heroRef.current.offsetHeight;
      const count = w < 640 ? 10 : 16;
      const pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
      }));

      const tempLines = [];
      const threshold = w * 0.18;
      pts.forEach((p, i) => {
        pts.forEach((q, j) => {
          if (j <= i) return;
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < threshold) {
            const opacity = (1 - d / threshold) * 0.25;
            tempLines.push({ x1: p.x, y1: p.y, x2: q.x, y2: q.y, opacity });
          }
        });
      });

      setPoints(pts);
      setLines(tempLines);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  // parallax scrolling/hover
  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasHover || reduceMotion) return;

    const handleMouseMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      const objects = heroObjectsRef.current?.querySelectorAll(".hero-object");
      if (!objects) return;
      objects.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || 12);
        const x = nx * depth;
        const y = ny * depth;
        el.style.transform = `translate(${x}px, ${y}px) rotate(var(--r, 0deg))`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLinkClick = (e, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section ref={heroRef} className="hero" id="top">
      {mounted && (
        <svg
          id="hero-lines"
          aria-hidden="true"
          viewBox={
            heroRef.current
              ? `0 0 ${heroRef.current.offsetWidth} ${heroRef.current.offsetHeight}`
              : "0 0 1000 600"
          }
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {lines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#8F3F55"
              strokeWidth="1"
              opacity={line.opacity}
            />
          ))}
          {points.map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="1.6" fill="#8F3F55" opacity="0.4" />
          ))}
        </svg>
      )}

      <div
        ref={heroObjectsRef}
        className="hero-objects"
        id="heroObjects"
        aria-hidden="true"
      >
        <div
          className={`hero-object ${animateIn ? "in" : ""}`}
          data-depth="18"
          style={{ top: "16%", left: "8%", "--r": "-8deg" }}
        >
          <svg width="70" height="46" viewBox="0 0 70 46">
            <rect x="1" y="1" width="68" height="44" rx="4" fill="#FCFAF8" stroke="#D8C5B8" />
            <circle cx="16" cy="23" r="7" fill="none" stroke="#8F3F55" strokeWidth="1.4" />
            <line x1="30" y1="16" x2="58" y2="16" stroke="#D8C5B8" strokeWidth="1.4" />
            <line x1="30" y1="24" x2="52" y2="24" stroke="#D8C5B8" strokeWidth="1.4" />
            <line x1="30" y1="32" x2="46" y2="32" stroke="#D8C5B8" strokeWidth="1.4" />
          </svg>
        </div>
        <div
          className={`hero-object ${animateIn ? "in" : ""}`}
          data-depth="10"
          style={{ top: "64%", left: "6%", "--r": "6deg" }}
        >
          <svg width="58" height="58" viewBox="0 0 58 58">
            <ellipse cx="29" cy="46" rx="20" ry="5" fill="#E4D4C7" />
            <path d="M12 20 h34 v22 a17 17 0 0 1 -34 0 z" fill="#FCFAF8" stroke="#D8C5B8" />
            <path d="M20 20 v-4 a9 9 0 0 1 18 0 v4" fill="none" stroke="#C67A5C" strokeWidth="2" />
          </svg>
        </div>
        <div
          className={`hero-object ${animateIn ? "in" : ""}`}
          data-depth="24"
          style={{ top: "12%", right: "9%", "--r": "5deg" }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect x="2" y="2" width="60" height="60" rx="3" fill="#FCFAF8" stroke="#D8C5B8" />
            <rect x="10" y="10" width="44" height="34" fill="#EEE3D8" />
            <rect x="2" y="2" width="60" height="60" rx="3" fill="none" stroke="#D8C5B8" />
            <circle cx="32" cy="27" r="10" fill="none" stroke="#7F8C6A" />
          </svg>
        </div>
        <div
          className={`hero-object ${animateIn ? "in" : ""}`}
          data-depth="14"
          style={{ top: "70%", right: "11%", "--r": "-5deg" }}
        >
          <svg width="72" height="46" viewBox="0 0 72 46">
            <rect x="1" y="1" width="70" height="44" rx="5" fill="#5E1E2C" />
            <path d="M8 34 L20 12 L36 34 Z" fill="none" stroke="#C9A56A" strokeWidth="1.2" opacity=".6" />
            <text x="14" y="20" fontFamily="Georgia,serif" fontSize="9" fill="#F8F4F1">BOARDING</text>
            <line x1="10" y1="26" x2="62" y2="26" stroke="#8a5a63" strokeWidth="1" />
            <text x="10" y="38" fontFamily="Georgia,serif" fontSize="7" fill="#C9A56A">CBD → GROWTH</text>
          </svg>
        </div>
        <div
          className={`hero-object ${animateIn ? "in" : ""}`}
          data-depth="8"
          style={{ top: "40%", left: "2%", "--r": "-3deg" }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <rect x="4" y="4" width="32" height="32" rx="2" fill="#FCFAF8" stroke="#D8C5B8" />
            <path d="M4 6 C 10 2, 30 2, 36 6" fill="none" stroke="#D8C5B8" />
          </svg>
        </div>
      </div>

      <div className="hero-typecursor" id="typeTarget" aria-live="polite">
        <span>{typedText}</span>
        <span className="caret" />
      </div>

      <h1 className={`hero-headline hero-fade ${animateIn ? "in" : ""}`} id="heroHeadline">
        We don't just market.<br />
        We connect people who <em>create growth.</em>
      </h1>

      <div className={`hero-sub hero-fade ${animateIn ? "in" : ""}`} id="heroSub">
        <div className="hero-pills">
          <span className="pill">Brands</span>
          <span className="pill">Creators</span>
          <span className="pill">Communities</span>
          <span className="pill">Businesses</span>
          <span className="pill">Colleges</span>
        </div>
        <span className="growing-line">Growing together through meaningful collaborations.</span>
      </div>

      <div className={`hero-actions hero-fade ${animateIn ? "in" : ""}`} id="heroActions">
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, "contact")}
          className="btn btn-primary"
        >
          Start Collaborating <ArrowRight style={{ width: "16px", height: "16px" }} />
        </a>
        <a
          href="#about"
          onClick={(e) => handleLinkClick(e, "about")}
          className="btn btn-outline"
        >
          Learn Our Story
        </a>
      </div>

      <div className={`hero-scroll-cue ${animateIn ? "in" : ""}`} id="scrollCue">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
