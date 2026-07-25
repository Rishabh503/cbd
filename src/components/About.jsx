"use client";

import { useEffect, useState, useRef } from "react";

export default function About() {
  const [folderOpen, setFolderOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const folderStageRef = useRef(null);

  useEffect(() => {
    const stage = folderStageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFolderOpen(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Sync copy fade out and fade in when active index changes
  useEffect(() => {
    setFadeClass("fade-out");
    const t = setTimeout(() => {
      setDisplayIndex(activeIndex);
      setFadeClass("fade-in");
    }, 220);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const cards = [
    {
      tag: "01 / BRANDS",
      badge: "B",
      title: "Brands & Creators",
      desc: "Uniting brand visibility with strategic, high-performing creator matchmaking. We build the trusted framework that allows authentic collaborations to thrive.",
      db: "collab.db",
      rot: "1deg",
      highlights: ["Matchmaking", "Campaign Creative", "Performance Tracking"],
      detailTitle: "Brands & Creators",
      detailSubtitle: "Strategic Visibility & Creator Partnerships",
      detailDesc: "We connect brands looking for authentic market visibility with creators searching for meaningful collaboration. By matching campaign objectives with creator demographics, we drive sustainable conversions rather than vanity metrics.",
      detailList: [
        "Demographic-aligned creator matchmaking",
        "High-impact campaign creative direction",
        "Performance tracking & attribution metrics",
        "Direct brand-sponsored content activations",
      ],
    },
    {
      tag: "02 / GROWTH",
      badge: "G",
      title: "Businesses & Colleges",
      desc: "Helping local businesses scale by connecting them with campus networks. We establish long-term campus presence and recruit active ambassador programs.",
      db: "talent.db",
      rot: "-3deg",
      highlights: ["Campus Ambition", "Talent Pipelines", "On-Ground Drives"],
      detailTitle: "Businesses & Colleges",
      detailSubtitle: "Youth Marketing & Campus Channels",
      detailDesc: "Connecting national and local businesses with the vibrant, high-energy networks of colleges and student communities. We establish long-term campus presence and recruit active student brand ambassadors.",
      detailList: [
        "Student ambassador network setup",
        "On-campus experiential marketing drives",
        "Direct community engagement programs",
        "Strategic youth channel market routing",
      ],
    },
    {
      tag: "03 / SPONSOR",
      badge: "E",
      title: "Events & Communities",
      desc: "Empowering cultural event organizers and community builders to secure sponsorships. We align community-driven fests with brands ready to fund high-impact experiences.",
      db: "impact.db",
      rot: "2deg",
      highlights: ["Sponsor Routing", "Fest Partnerships", "Outreach Scale"],
      detailTitle: "Events & Communities",
      detailSubtitle: "Sponsorship Routing & Cultural Reach",
      detailDesc: "Empowering cultural event organizers and community builders to secure long-term sponsorships. We align community-driven fests with brand sponsors ready to fund and co-create high-impact experiences.",
      detailList: [
        "Sponsorship matching & pitch alignment",
        "Cultural fest & event sponsorships",
        "Community impact activation plans",
        "Experiential space brand integrations",
      ],
    },
  ];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + 3) % 3);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % 3);
  };

  const activeCardCopy = cards[displayIndex];

  return (
    <section id="about">
      <div className="container about-grid">
        <div className="folder-stage-wrapper">
          <div
            ref={folderStageRef}
            className={`folder-stage reveal ${folderOpen ? "open" : ""}`}
            id="folderStage"
          >
            {cards.map((card, i) => {
              let style = {};

              if (folderOpen) {
                const diff = (i - activeIndex + 3) % 3;
                if (diff === 0) {
                  // Active center card (slid high up, in front of background cards)
                  style = {
                    transform: "translate(-50%, -64%) scale(1.025) rotate(0deg)",
                    zIndex: 4,
                    opacity: 1,
                    cursor: "default",
                    boxShadow: "0 20px 40px -15px rgba(45, 38, 40, .25)",
                  };
                } else if (diff === 1) {
                  // Right background card
                  style = {
                    transform: "translate(-15%, -48%) scale(0.96) rotate(6deg)",
                    zIndex: 3,
                    opacity: 0.85,
                    cursor: "pointer",
                  };
                } else {
                  // Left background card
                  style = {
                    transform: "translate(-85%, -48%) scale(0.96) rotate(-6deg)",
                    zIndex: 2,
                    opacity: 0.85,
                    cursor: "pointer",
                  };
                }
              } else {
                // Tucked closed state
                style = {
                  transform: `translate(-50%, -50%) rotate(${card.rot})`,
                  zIndex: 3 - i,
                  opacity: 1,
                };
              }

              return (
                <div
                  key={i}
                  className="folder-doc"
                  style={{
                    ...style,
                    transition: "transform 0.8s var(--ease), opacity 0.8s var(--ease), z-index 0.8s, box-shadow 0.8s",
                  }}
                  onClick={() => folderOpen && setActiveIndex(i)}
                >
                  <div className="card-header">
                    <span className="card-tag">{card.tag}</span>
                    <div className="card-badge">{card.badge}</div>
                  </div>
                  <h3>{card.title}</h3>
                  <p className="card-desc">{card.desc}</p>
                  
                  {/* Visual highlight pills inside the card */}
                  <div className="card-highlights">
                    {card.highlights.map((h, idx) => (
                      <span key={idx} className="card-h-pill">
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="card-footer">
                    <span>{card.db}</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              );
            })}

            <div className="folder-base">
              <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMax meet">
                <path d="M4 30 L70 30 L84 44 L196 44 L196 122 L4 122 Z" fill="#E4D4C7" stroke="#D8C5B8" />
                <path d="M2 44 L198 44 L198 126 L2 126 Z" fill="#EEE3D8" stroke="#D8C5B8" />
              </svg>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="folder-controls">
            <button onClick={handlePrev} className="ctrl-btn" aria-label="Previous card">
              ←
            </button>
            <div className="ctrl-dots">
              {cards.map((_, idx) => (
                <span
                  key={idx}
                  className={`ctrl-dot ${idx === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
            <button onClick={handleNext} className="ctrl-btn" aria-label="Next card">
              →
            </button>
          </div>
        </div>

        {/* Dynamic Detail Panel synchronizing with the active card */}
        <div className={`about-copy ${fadeClass}`}>
          <div className="eyebrow">About CBD</div>
          <h2>{activeCardCopy.detailTitle}</h2>
          <p className="lede">{activeCardCopy.detailSubtitle}</p>

          <p style={{ marginTop: "18px" }}>
            {activeCardCopy.detailDesc}
          </p>

          <div className="about-detail-list">
            {activeCardCopy.detailList.map((item, idx) => (
              <div key={idx} className="about-detail-item">
                <span className="about-detail-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <p className="signoff" style={{ marginTop: "24px" }}>
            Click an index card or use controls to swap files.
          </p>
        </div>
      </div>
    </section>
  );
}
