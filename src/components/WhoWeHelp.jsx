"use client";

import { useEffect, useState, useRef } from "react";
import { Briefcase, Sparkles, Store, GraduationCap, Calendar, Users } from "lucide-react";

const chaosData = [
  { icon: Briefcase, label: "Brand" },
  { icon: Sparkles, label: "Creator" },
  { icon: Store, label: "Business" },
  { icon: GraduationCap, label: "College" },
  { icon: Calendar, label: "Event" },
  { icon: Users, label: "Community" },
];

const optAContent = [
  {
    badge: "Brands ✦ Go Viral",
    stat: "3x Conv. Rate",
    title: "Launch Campus Campaigns",
    desc: "Run high-converting, viral content drives across major student networks and subcultures to dominate student word-of-mouth.",
  },
  {
    badge: "Creators ✦ Get Sponsored",
    stat: "Direct Collabs",
    title: "Get Paid To Create",
    desc: "Match directly with high-quality brands and execute sponsored campaigns with pre-structured, transparent brief templates.",
  },
  {
    badge: "Businesses ✦ Local Scaling",
    stat: "Local Power",
    title: "Deploy Ambassador Armies",
    desc: "Build and scale your local sales pipeline by deploying high-energy student ambassadors to acquire new customers at low cost.",
  },
  {
    badge: "Colleges ✦ Fest Funding",
    stat: "Fast Funding",
    title: "Fund Campus Events",
    desc: "Pitch directly to corporate brands and secure major fest sponsorships in under 2 weeks, leaving paper forms behind.",
  },
  {
    badge: "Events ✦ Experiential",
    stat: "Packed Seats",
    title: "Sell Out Your Stages",
    desc: "Turn college fests, local shows, and student gatherings into experiential brand advertising channels while driving sold-out attendance.",
  },
  {
    badge: "Communities ✦ Perks",
    stat: "Active Hubs",
    title: "Unlock Exclusive Deals",
    desc: "Provide your community members with high-value brand perks, custom merchandise partnerships, and active professional sponsorships.",
  },
];

export default function WhoWeHelp({ isOptionA = false }) {
  const [ordered, setOrdered] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [scatterCoords, setScatterCoords] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const coords = chaosData.map(() => ({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
    }));
    setScatterCoords(coords);
  }, []);

  const updateDimensions = () => {
    const stage = stageRef.current;
    if (!stage) return;
    setDimensions({
      w: stage.offsetWidth,
      h: stage.offsetHeight,
    });
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const stage = stageRef.current;
    if (!stage) return () => window.removeEventListener("resize", updateDimensions);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOrdered(true);
            stage.classList.add("in");
            setDimensions({
              w: entry.target.offsetWidth,
              h: entry.target.offsetHeight,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(stage);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
    };
  }, []);

  const cx = dimensions.w / 2;
  const cy = dimensions.h / 2;
  const r = Math.min(dimensions.w, dimensions.h) * (isMobile ? 0.26 : 0.36);

  const getOrderedCoords = (i) => {
    const angle = (Math.PI * 2 * i) / chaosData.length - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const renderedLines = [];
  if (ordered && dimensions.w > 0) {
    for (let i = 0; i < chaosData.length; i++) {
      const a = getOrderedCoords(i);
      const b = getOrderedCoords((i + 1) % chaosData.length);
      renderedLines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    }
  }

  return (
    <section className="problem-section" id="problem">
      <div className="container problem-split">
        <div
          ref={stageRef}
          className={`chaos-stage reveal ${ordered ? "ordered" : ""}`}
          id="chaosStage"
        >
          <svg className="chaos-svg" id="chaosLines">
            {ordered &&
              renderedLines.map((line, i) => (
                <line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="var(--burgundy)"
                  strokeWidth="1"
                  opacity="0.4"
                  style={{ transition: "opacity 1.4s var(--ease)" }}
                />
              ))}
          </svg>
          {chaosData.map((item, i) => {
            const Icon = item.icon;
            const hasCoords = scatterCoords.length > 0;
            const scatterX = hasCoords ? scatterCoords[i].x : 50;
            const scatterY = hasCoords ? scatterCoords[i].y : 50;

            const orderedPos = getOrderedCoords(i);
            const style = ordered && dimensions.w > 0
              ? {
                  left: `${orderedPos.x}px`,
                  top: `${orderedPos.y}px`,
                }
              : {
                  left: `${scatterX}%`,
                  top: `${scatterY}%`,
                };

            let textStyle = {
              position: "absolute",
              whiteSpace: "nowrap",
              transition: "all 1.4s var(--ease)",
            };

            if (ordered) {
              const labelMargin = isMobile ? "8px" : "14px";
              if (i === 1 || i === 2) {
                // Right-side nodes (Creator, Business) -> text to the right
                textStyle = {
                  ...textStyle,
                  left: "100%",
                  marginLeft: labelMargin,
                  top: "50%",
                  transform: "translateY(-50%)",
                };
              } else if (i === 4 || i === 5) {
                // Left-side nodes (Event, Community) -> text to the left
                textStyle = {
                  ...textStyle,
                  right: "100%",
                  marginRight: labelMargin,
                  top: "50%",
                  transform: "translateY(-50%)",
                };
              } else if (i === 0) {
                // Top node (Brand) -> text above
                textStyle = {
                  ...textStyle,
                  bottom: "100%",
                  marginBottom: labelMargin,
                  left: "50%",
                  transform: "translateX(-50%)",
                };
              } else {
                // Bottom node (College) -> text below
                textStyle = {
                  ...textStyle,
                  top: "100%",
                  marginTop: labelMargin,
                  left: "50%",
                  transform: "translateX(-50%)",
                };
              }
            } else {
              // Scattered layout -> text below
              textStyle = {
                ...textStyle,
                top: "100%",
                marginTop: "10px",
                left: "50%",
                transform: "translateX(-50%)",
              };
            }

            const isActive = activeIndex === i;
            const nodeDimen = isOptionA 
              ? (isActive ? (isMobile ? "68px" : "96px") : (isMobile ? "54px" : "80px"))
              : (isMobile ? "50px" : "72px");
            const iconSize = isOptionA 
              ? (isActive ? (isMobile ? "24px" : "38px") : (isMobile ? "20px" : "32px"))
              : (isMobile ? "18px" : "28px");

            return (
              <div
                key={i}
                className={`chaos-node ${isActive ? "active" : ""}`}
                onClick={() => {
                  setOrdered(true);
                  setActiveIndex(i);
                }}
                onMouseEnter={() => {
                  setOrdered(true);
                  setActiveIndex(i);
                }}
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  transition: "left 1.4s var(--ease), top 1.4s var(--ease), width 0.3s var(--ease-soft), height 0.3s var(--ease-soft)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: nodeDimen,
                  height: nodeDimen,
                  cursor: "pointer",
                  zIndex: isActive ? 20 : 10,
                  opacity: isOptionA && !isActive ? 0.75 : 1,
                  ...style,
                }}
              >
                <div
                  className="cn-icon"
                  style={{
                    margin: 0,
                    width: nodeDimen,
                    height: nodeDimen,
                    transition: "width 0.3s var(--ease-soft), height 0.3s var(--ease-soft)",
                  }}
                >
                  <Icon style={{ 
                    width: iconSize, 
                    height: iconSize, 
                    color: isActive ? "var(--burgundy-hover)" : "var(--burgundy)",
                    transition: "width 0.3s var(--ease-soft), height 0.3s var(--ease-soft)"
                  }} />
                </div>
                <span style={{
                  ...textStyle,
                  fontWeight: 800,
                  fontSize: isMobile ? (isActive ? "12px" : "11px") : (isOptionA ? (isActive ? "14.5px" : "12.5px") : "12.5px"),
                  color: isActive ? "var(--burgundy)" : "var(--ink)",
                  transition: "all 0.3s var(--ease-soft)",
                }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="problem-copy reveal">
          <div className="eyebrow">Who We Help</div>
          <h2>
            Different Goals
            <br />
            {isOptionA ? <span>One Connected <em>Ecosystem</em></span> : <em>One Connected Ecosystem</em>}
          </h2>
          {isOptionA ? (
            <div className="opt-a-detail-container" style={{ marginTop: "24px" }}>
              {/* Dynamic details card replacing static grid list */}
              <div className="opt-a-detail-card" key={activeIndex}>
                <div className="opt-a-detail-header">
                  <span className="opt-a-detail-badge">
                    {optAContent[activeIndex].badge}
                  </span>
                  <span className="opt-a-detail-stat">
                    {optAContent[activeIndex].stat}
                  </span>
                </div>
                
                <h3 className="opt-a-detail-title">
                  {optAContent[activeIndex].title}
                </h3>
                
                <p className="opt-a-detail-desc">
                  {optAContent[activeIndex].desc}
                </p>

                <div className="opt-a-detail-footer">
                  <span>Target: {chaosData[activeIndex].label}s</span>
                  <span className="arrow">✦ Click or Hover Nodes to Explore</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p style={{ marginTop: "18px", color: "var(--ink-soft)", fontSize: "15.5px" }}>
                Brands, creators, businesses, colleges, and communities all grow differently—but they
                grow better together. CBD brings together the people and organizations that drive ideas
                forward. Whether you're looking to build your brand, find meaningful collaborations,
                secure sponsorships, grow a community, or create unforgettable experiences, we help the
                right people find each other.
              </p>
              <ul className="problem-list">
                <li>Brands looking to build authentic reach and lasting partnerships.</li>
                <li>Creators and influencers seeking meaningful collaboration opportunities.</li>
                <li>Startups and businesses ready to grow through strategy and community.</li>
                <li>Colleges and student societies building impactful events and initiatives.</li>
                <li>Event organizers connecting with sponsors, speakers, and partners.</li>
                <li>Communities and organizations creating stronger professional networks.</li>
              </ul>
              <p style={{ marginTop: "18px", color: "var(--ink-soft)", fontSize: "15.5px" }}>
                Whether you're launching a campaign, planning an event, growing a business, or building a
                community, CBD creates an ecosystem where opportunities become conversations,
                conversations become partnerships, and partnerships create lasting growth.
              </p>
              <p className="problem-close">
                Because every meaningful collaboration starts with the right introduction.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
