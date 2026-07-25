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

export default function WhoWeHelp() {
  const [ordered, setOrdered] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [scatterCoords, setScatterCoords] = useState([]);
  const stageRef = useRef(null);

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
            setDimensions({
              w: entry.target.offsetWidth,
              h: entry.target.offsetHeight,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(stage);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
    };
  }, []);

  const cx = dimensions.w / 2;
  const cy = dimensions.h / 2;
  const r = Math.min(dimensions.w, dimensions.h) * 0.34;

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

            if (ordered && dimensions.w > 0) {
              if (i === 1 || i === 2) {
                // Right-side nodes (Creator, Business) -> text to the right
                textStyle = {
                  ...textStyle,
                  left: "100%",
                  marginLeft: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                };
              } else if (i === 4 || i === 5) {
                // Left-side nodes (Event, Community) -> text to the left
                textStyle = {
                  ...textStyle,
                  right: "100%",
                  marginRight: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                };
              } else {
                // Top/Bottom nodes (Brand, College) -> text below
                textStyle = {
                  ...textStyle,
                  top: "100%",
                  marginTop: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                };
              }
            } else {
              // Scattered layout -> text below
              textStyle = {
                ...textStyle,
                top: "100%",
                marginTop: "8px",
                left: "50%",
                transform: "translateX(-50%)",
              };
            }

            return (
              <div
                key={i}
                className="chaos-node"
                style={{
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  transition: "left 1.4s var(--ease), top 1.4s var(--ease)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "64px",
                  height: "64px",
                  ...style,
                }}
              >
                <div
                  className="cn-icon"
                  style={{
                    margin: 0,
                    width: "64px",
                    height: "64px",
                  }}
                >
                  <Icon style={{ width: "26px", height: "26px", color: "var(--burgundy)" }} />
                </div>
                <span style={textStyle}>{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="problem-copy reveal">
          <div className="eyebrow">Who We Help</div>
          <h2>
            Different Goals
            <br />
            <em>One Connected Ecosystem</em>
          </h2>
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
        </div>
      </div>
    </section>
  );
}
