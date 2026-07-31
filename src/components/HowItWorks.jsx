"use client";

import { useEffect, useState, useRef } from "react";
import { Lightbulb, Search, Compass, Link2, Rocket, BarChart3, Infinity as InfinityIcon } from "lucide-react";

const milestones = [
  { icon: Lightbulb, label: "Understand", desc: "Every collaboration begins with listening. We understand your goals, audience, challenges, and ambitions before making a single recommendation." },
  { icon: Search, label: "Research", desc: "We explore our growing network to identify the people, communities, and opportunities best aligned with your vision." },
  { icon: Compass, label: "Strategize", desc: "No two collaborations are alike. We design a tailored roadmap built around your objectives, timeline, and long-term success." },
  { icon: Link2, label: "Connect", desc: "The right introduction changes everything. We bring together the right people and create the foundation for meaningful partnerships." },
  { icon: Rocket, label: "Execute", desc: "From coordination to campaign delivery, we manage every moving piece so every collaboration runs smoothly from start to finish." },
  { icon: BarChart3, label: "Measure", desc: "We evaluate outcomes, gather insights, and refine every collaboration to create even stronger opportunities in the future." },
  { icon: InfinityIcon, label: "Build Beyond", desc: "The first collaboration is only the beginning. Lasting relationships create stronger networks, greater opportunities, and sustainable growth." }
];

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pathLength, setPathLength] = useState(2000);
  const worksStageRef = useRef(null);
  const pathProgressRef = useRef(null);

  const VW = 1000, VH = 220;
  const VW_M = 300, VH_M = 932;
  const MARGIN_Y_M = 70, SPACING_Y_M = 132, SWAY_M = 34;

  useEffect(() => {
    const checkLayout = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  const getTimelineData = () => {
    const n = milestones.length;
    const pts = [];

    if (isMobile) {
      for (let i = 0; i < n; i++) {
        const y = MARGIN_Y_M + SPACING_Y_M * i;
        const x = VW_M / 2 + (i % 2 === 0 ? -SWAY_M : SWAY_M) * (i === 0 || i === n - 1 ? 0.3 : 1);
        pts.push({ x, y });
      }
      let d = `M ${pts[0].x},${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1], cur = pts[i];
        const midY = (prev.y + cur.y) / 2;
        d += ` C ${prev.x},${midY} ${cur.x},${midY} ${cur.x},${cur.y}`;
      }
      return { d, pts, vw: VW_M, vh: VH_M };
    } else {
      const marginX = 60;
      const usable = VW - marginX * 2;
      for (let i = 0; i < n; i++) {
        const x = marginX + (usable * i) / (n - 1);
        const y = VH / 2 + (i % 2 === 0 ? -34 : 34) * (i === 0 || i === n - 1 ? 0.3 : 1);
        pts.push({ x, y });
      }
      let d = `M ${pts[0].x},${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1], cur = pts[i];
        const midX = (prev.x + cur.x) / 2;
        d += ` C ${midX},${prev.y} ${midX},${cur.y} ${cur.x},${cur.y}`;
      }
      return { d, pts, vw: VW, vh: VH };
    }
  };

  const { d: pathD, pts: milestonePts, vw, vh } = getTimelineData();

  useEffect(() => {
    if (pathProgressRef.current) {
      setPathLength(pathProgressRef.current.getTotalLength() || 2000);
    }
  }, [pathD]);

  useEffect(() => {
    const stage = worksStageRef.current;
    if (!stage) return;

    const isDesktopHover = window.matchMedia("(hover: hover)").matches && window.innerWidth >= 1024;

    const handleMouseMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const idx = Math.round(frac * (milestones.length - 1));
      setActiveIndex(idx);
    };

    const handleScroll = () => {
      const rect = stage.getBoundingClientRect();
      const vhWindow = window.innerHeight;
      if (rect.top > vhWindow || rect.bottom < 0) return;
      let raw = (vhWindow * 0.8 - rect.top) / (rect.height + vhWindow * 0.3);
      raw = Math.max(0, Math.min(1, raw));
      const idx = Math.round(raw * (milestones.length - 1));
      setActiveIndex(idx);
    };

    if (isDesktopHover) {
      stage.addEventListener("mousemove", handleMouseMove);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      stage.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const activeFrac = activeIndex / (milestones.length - 1);
  const strokeOffset = pathLength - pathLength * activeFrac;

  return (
    <section id="how-it-works">
      <div className="container">
        <div className="section-head centered reveal">
          <div className="eyebrow">How CBD Works</div>
          <h2>From Introduction To Impact</h2>
          <p style={{ marginLeft: "auto", marginRight: "auto" }}>
            Every successful partnership follows a thoughtful process. Explore the journey below to
            see how CBD transforms an idea into meaningful, long-term growth.
          </p>
        </div>

        <div ref={worksStageRef} className="works-stage reveal" id="worksStage">
          <div className="works-svg-wrap" style={{ overflow: "visible" }}>
            <svg
              id="worksSvg"
              viewBox={`0 0 ${vw} ${vh}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ width: "100%", height: "auto" }}
            >
              <path className="works-path-bg" d={pathD} />
              <path
                ref={pathProgressRef}
                className="works-path-progress"
                d={pathD}
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: strokeOffset,
                  transition: "stroke-dashoffset 0.15s ease-out",
                }}
              />
            </svg>
            <div className="works-milestones" id="worksMilestones">
              {milestonePts.map((pt, i) => {
                const MilestoneIcon = milestones[i].icon;
                const isActive = i <= activeIndex;
                const isCurrentActive = i === activeIndex;
                return (
                  <div
                    key={i}
                    className={`milestone ${isActive ? "active" : ""} ${isCurrentActive ? "current-active" : ""}`}
                    style={{
                      left: `${(pt.x / vw) * 100}%`,
                      top: `${(pt.y / vh) * 100}%`,
                    }}
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <div className="milestone-dot">
                      <MilestoneIcon style={{ width: "20px", height: "20px" }} />
                    </div>
                    <span>{milestones[i].label}</span>
                    {isMobile && isCurrentActive && (
                      <div className="milestone-desc-mobile">
                        {milestones[i].desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {!isMobile && (
            <div className="works-caption">
              <div className="wc-label" id="wcLabel">
                {milestones[activeIndex]?.label}
              </div>
              <div className="wc-desc" id="wcDesc">
                {milestones[activeIndex]?.desc}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
