"use client";

import { useEffect, useState, useRef } from "react";
import { 
  Users, 
  Handshake, 
  TrendingUp, 
  Tag, 
  Landmark, 
  Briefcase, 
  Calendar, 
  User, 
  ArrowRight 
} from "lucide-react";
import Logo from "@/components/Logo";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [lineCoords, setLineCoords] = useState([]);
  
  const diagramRef = useRef(null);
  const centerRef = useRef(null);
  const cardRefs = useRef([]);

  // Setup array of refs for the 6 cards
  const addToRefs = (el, index) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current[index] = el;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate connection lines coordinates
  useEffect(() => {
    if (!mounted) return;

    const calculateLines = () => {
      const wrapper = diagramRef.current;
      const center = centerRef.current;
      if (!wrapper || !center) return;

      const wrapRect = wrapper.getBoundingClientRect();
      const centerRect = center.getBoundingClientRect();

      // Center point of the CBD circle logo
      const cx = centerRect.left - wrapRect.left + centerRect.width / 2;
      const cy = centerRect.top - wrapRect.top + centerRect.height / 2;

      const tempLines = [];
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        
        const kx = cardRect.left - wrapRect.left + cardRect.width / 2;
        const ky = cardRect.top - wrapRect.top + cardRect.height / 2;

        tempLines.push({ x1: cx, y1: cy, x2: kx, y2: ky });
      });

      setLineCoords(tempLines);
    };

    // Calculate immediately and after a short paint delay
    calculateLines();
    const timer = setTimeout(calculateLines, 150);

    window.addEventListener("resize", calculateLines);
    return () => {
      window.removeEventListener("resize", calculateLines);
      clearTimeout(timer);
    };
  }, [mounted]);

  const handleLinkClick = (e, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  };

  // Center logo coordinates for lines and circles
  const cx = diagramRef.current && centerRef.current
    ? (centerRef.current.getBoundingClientRect().left - diagramRef.current.getBoundingClientRect().left + centerRef.current.getBoundingClientRect().width / 2)
    : 270;
  const cy = diagramRef.current && centerRef.current
    ? (centerRef.current.getBoundingClientRect().top - diagramRef.current.getBoundingClientRect().top + centerRef.current.getBoundingClientRect().height / 2)
    : 240;

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-split-container">
          
          {/* Left copywriting and details */}
          <div className="hero-content-left">
            <h1 className="hero-main-title">
              One ecosystem.<br />
              Infinite possibilities.<br />
              <em>Stronger together.</em>
            </h1>
            <p className="hero-main-desc">
              CBD unites brands, creators, businesses, colleges and communities to spark collaborations that create real impact. Find the right people. Build meaningful partnerships. Grow together.
            </p>

            <div className="hero-actions-row">
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
          </div>

          {/* Right graphic circle nodes network */}
          <div className="hero-graphic-right">
            <div ref={diagramRef} className="hero-diagram-wrapper">
              
              {/* Central Circle logo with complete vector SVG CBD mark */}
              <div ref={centerRef} className="diagram-center-circle" style={{ padding: "0" }}>
                <Logo showWordmark={true} width="105px" height="85px" color="var(--burgundy)" />
              </div>

              {/* Dynamic SVG Connecting Curved Lines Layer */}
              {mounted && lineCoords.length > 0 && (
                <svg className="diagram-svg-lines">
                  {/* Concentric orbital rings behind nodes */}
                  <circle cx={cx} cy={cy} r="90" fill="none" stroke="var(--burgundy)" strokeWidth="1" opacity="0.1" />
                  <circle cx={cx} cy={cy} r="145" fill="none" stroke="var(--burgundy)" strokeWidth="1" opacity="0.07" />
                  <circle cx={cx} cy={cy} r="200" fill="none" stroke="var(--burgundy)" strokeWidth="1" opacity="0.04" />

                  {/* Faint orbit ring junction dots */}
                  <circle cx={cx - 122} cy={cy - 78} r="3" fill="var(--burgundy)" opacity="0.3" />
                  <circle cx={cx + 122} cy={cy + 78} r="3" fill="var(--burgundy)" opacity="0.3" />
                  <circle cx={cx - 60} cy={cy + 130} r="3" fill="var(--burgundy)" opacity="0.3" />

                  {/* Connecting curved lines and midpoint dots */}
                  {lineCoords.map((line, i) => {
                    const x1 = line.x1;
                    const y1 = line.y1;
                    const x2 = line.x2;
                    const y2 = line.y2;

                    // Calculate midpoint coordinates
                    const mx = (x1 + x2) / 2;
                    const my = (y1 + y2) / 2;

                    // Perpendicular normal vector calculations
                    const dx = x2 - x1;
                    const dy = y2 - y1;
                    const len = Math.hypot(dx, dy);
                    const nx = -dy / len;
                    const ny = dx / len;

                    // Perpendicular offset distance for bezier control points to create curves
                    const offset = 30; 
                    const px = mx + nx * offset;
                    const py = my + ny * offset;

                    // Calculate precise midpoint on the Bezier curve at t = 0.5
                    const bx = 0.25 * x1 + 0.5 * px + 0.25 * x2;
                    const by = 0.25 * y1 + 0.5 * py + 0.25 * y2;

                    return (
                      <g key={i}>
                        <path
                          d={`M ${x1} ${y1} Q ${px} ${py} ${x2} ${y2}`}
                          fill="none"
                          stroke="var(--burgundy)"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          opacity="0.3"
                        />
                        <circle cx={bx} cy={by} r="3.5" fill="var(--burgundy)" opacity="0.4" />
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* Radiating cards mapping (wraps in mobile-grid via CSS) */}
              <div className="diagram-grid-mobile">
                {/* Node 1: Brands */}
                <div
                  ref={(el) => addToRefs(el, 0)}
                  className="diagram-node-card brands-node"
                >
                  <div className="diagram-node-icon-box">
                    <Tag style={{ width: "16px", height: "16px" }} />
                  </div>
                  <div className="diagram-node-text">
                    <span className="diagram-node-title">Brands</span>
                    <span className="diagram-node-desc">Build authentic reach. Drive lasting impact.</span>
                  </div>
                </div>

                {/* Node 2: Colleges */}
                <div
                  ref={(el) => addToRefs(el, 1)}
                  className="diagram-node-card colleges-node"
                >
                  <div className="diagram-node-icon-box">
                    <Landmark style={{ width: "16px", height: "16px" }} />
                  </div>
                  <div className="diagram-node-text">
                    <span className="diagram-node-title">Colleges & Societies</span>
                    <span className="diagram-node-desc">Build events. Find partners. Create impact.</span>
                  </div>
                </div>

                {/* Node 3: Businesses & Startups */}
                <div
                  ref={(el) => addToRefs(el, 2)}
                  className="diagram-node-card startups-node"
                >
                  <div className="diagram-node-icon-box">
                    <Briefcase style={{ width: "16px", height: "16px" }} />
                  </div>
                  <div className="diagram-node-text">
                    <span className="diagram-node-title">Businesses & Startups</span>
                    <span className="diagram-node-desc">Grow through strategy. Scale with communities.</span>
                  </div>
                </div>

                {/* Node 4: Communities */}
                <div
                  ref={(el) => addToRefs(el, 3)}
                  className="diagram-node-card communities-node"
                >
                  <div className="diagram-node-icon-box">
                    <Users style={{ width: "16px", height: "16px" }} />
                  </div>
                  <div className="diagram-node-text">
                    <span className="diagram-node-title">Communities</span>
                    <span className="diagram-node-desc">Build networks. Create opportunities.</span>
                  </div>
                </div>

                {/* Node 5: Event Organizers */}
                <div
                  ref={(el) => addToRefs(el, 4)}
                  className="diagram-node-card events-node"
                >
                  <div className="diagram-node-icon-box">
                    <Calendar style={{ width: "16px", height: "16px" }} />
                  </div>
                  <div className="diagram-node-text">
                    <span className="diagram-node-title">Event Organizers</span>
                    <span className="diagram-node-desc">Connect with sponsors, speakers & partners.</span>
                  </div>
                </div>

                {/* Node 6: Creators */}
                <div
                  ref={(el) => addToRefs(el, 5)}
                  className="diagram-node-card creators-node"
                >
                  <div className="diagram-node-icon-box">
                    <User style={{ width: "16px", height: "16px" }} />
                  </div>
                  <div className="diagram-node-text">
                    <span className="diagram-node-title">Creators</span>
                    <span className="diagram-node-desc">Find collaborations. Amplify your influence.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
