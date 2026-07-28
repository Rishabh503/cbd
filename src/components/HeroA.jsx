"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Star, Zap, Flame, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

export default function HeroA() {
  const [activeCategory, setActiveCategory] = useState("brands");
  const [cursorText, setCursorText] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [isLiked, setIsLiked] = useState(true);

  const categories = {
    brands: {
      title: "BRANDS & CREATORS",
      badge: "✦ BUZZ",
      desc: "Uniting brand visibility with strategic, high-performing creator matchmaking. We build the trusted framework that allows authentic collaborations to thrive.",
    },
    businesses: {
      title: "BUSINESSES & COLLEGES",
      badge: "✦ GROWTH",
      desc: "Helping businesses scale by connecting them directly with high-energy student ambassador networks. We build local talent pipelines that drive conversions.",
    },
    events: {
      title: "EVENTS & SPONSORS",
      badge: "✦ IMPACT",
      desc: "Empowering event organizers to secure brand sponsors, converting local fests and communities into high-impact experiential marketing spaces.",
    },
  };

  // Custom Emoji Cursor logic
  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  const triggerCursor = (text) => {
    setCursorText(text);
    setShowCursor(true);
  };

  const hideCursor = () => {
    setShowCursor(false);
  };

  const handleLinkClick = (e, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <section className="hero-a" id="top">
        <div className="opt-a-bg-grid" />

        {/* Custom Genz Hover Cursor */}
        {showCursor && (
          <div
            style={{
              position: "fixed",
              left: `${cursorPos.x + 12}px`,
              top: `${cursorPos.y + 12}px`,
              pointerEvents: "none",
              zIndex: 999999,
              background: "var(--gold)",
              color: "var(--ink)",
              border: "2px solid var(--ink)",
              padding: "4px 8px",
              borderRadius: "6px",
              fontFamily: "var(--sans)",
              fontWeight: 800,
              fontSize: "11px",
              boxShadow: "3px 3px 0px var(--ink)",
              textTransform: "uppercase",
              animation: "scalePop 0.15s ease",
            }}
          >
            {cursorText}
          </div>
        )}

        <div className="container">
          <div className="bento-grid">
            
            {/* Row 1: Full Width Intro Hero Box (Span 12) */}
            <div
              className="bento-card bento-intro"
              onMouseEnter={() => triggerCursor("Let's Go! 🚀")}
              onMouseLeave={hideCursor}
            >
              <div className="intro-split">
                
                {/* Left side text and buttons */}
                <div className="intro-left">
                  <div style={{ display: "inline-flex", gap: "8px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, background: "var(--sand)", border: "1.5px solid var(--ink)", padding: "4px 8px", borderRadius: "6px", textTransform: "uppercase" }}>
                      🚀 Disrupting Marketing
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 800, background: "var(--cream)", border: "1.5px solid var(--ink)", padding: "4px 8px", borderRadius: "6px", textTransform: "uppercase" }}>
                      🤝 Growth-Driven
                    </span>
                  </div>
                  
                  <h1 className="headline-a">
                    We don't just market.<br />
                    We connect people who <span className="highlight">create growth.</span>
                  </h1>

                  <p className="subheadline-a">
                    CBD is a trusted ecosystem bringing together the people who create growth — Brands, Creators, Businesses, Colleges, and Communities.
                  </p>

                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "10px" }}>
                    <a
                      href="#contact"
                      onClick={(e) => handleLinkClick(e, "contact")}
                      className="btn-brutal"
                    >
                      Start Collaborating <ArrowRight size={18} />
                    </a>
                    <a
                      href="#about"
                      onClick={(e) => handleLinkClick(e, "about")}
                      className="btn-brutal btn-brutal-outline"
                    >
                      Learn Our Story
                    </a>
                  </div>
                </div>

                {/* Right side centered Smartphone mockup containing Instagram Feed Post */}
                <div className="intro-right" onMouseEnter={() => triggerCursor("Collab Post 📱")} onMouseLeave={hideCursor}>
                  <div className="phone-mockup">
                    {/* Speaker Notch */}
                    <div className="phone-notch" />

                    <div className="phone-screen">
                      {/* Instagram Header */}
                      <div className="insta-header">
                        <div className="insta-profile-left">
                          <div className="insta-story-ring">
                            <div className="insta-avatar">P</div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span className="insta-username">pulse_creator</span>
                            <span style={{ fontSize: "6.5px", color: "var(--ink-soft)", fontWeight: 700, textTransform: "uppercase" }}>Sponsored Match</span>
                          </div>
                        </div>
                        <div className="insta-header-menu">
                          <MoreHorizontal size={14} />
                        </div>
                      </div>

                      {/* Instagram Post Image showing Collaboration benefits & SVG graph */}
                      <div className="insta-post-img">
                        {/* Partnership connector bridge */}
                        <div className="post-match-bridge">
                          <div className="post-brand-capsule">Aura Drinks</div>
                          <div className="post-bridge-line">
                            <div className="post-bridge-badge">MATCHED BY CBD</div>
                          </div>
                          <div className="post-brand-capsule">Pulse</div>
                        </div>

                        {/* Glowing SVG growth line graph */}
                        <div className="post-graph-container">
                          <svg className="post-graph-svg" viewBox="0 0 180 70" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="graph-grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            {/* Shaded Area under graph */}
                            <path className="post-graph-area" d="M 10 65 Q 50 55, 80 40 T 130 25 T 170 10 L 170 65 Z" />
                            {/* Golden glowing curve line */}
                            <path className="post-graph-path" d="M 10 65 Q 50 55, 80 40 T 130 25 T 170 10" />
                            {/* Grid node dots */}
                            <circle cx="10" cy="65" r="2" fill="var(--ivory)" stroke="var(--ink)" strokeWidth="1" />
                            <circle cx="170" cy="10" r="2.5" fill="var(--gold)" stroke="var(--ink)" strokeWidth="1" />
                          </svg>

                          {/* Floating outcome metric badges */}
                          <div className="post-graph-badge" style={{ top: "2px", right: "6px" }}>
                            📈 +30% Sales
                          </div>
                          <div className="post-graph-badge" style={{ bottom: "10px", left: "14px" }}>
                            🔥 12.4% Conv.
                          </div>
                        </div>
                      </div>

                      {/* Instagram Actions Footer Block */}
                      <div className="insta-footer-content">
                        {/* Actions Row */}
                        <div className="insta-actions-row">
                          <div className="insta-actions-left">
                            <Heart
                              size={13}
                              fill={isLiked ? "var(--burgundy)" : "none"}
                              style={{ color: isLiked ? "var(--burgundy)" : "var(--ink)", cursor: "pointer" }}
                              onClick={() => setIsLiked(!isLiked)}
                            />
                            <MessageCircle size={13} />
                            <Send size={13} />
                          </div>
                          <Bookmark size={13} />
                        </div>

                        {/* Likes counter */}
                        <div className="insta-likes">
                          {isLiked ? "12,843 likes" : "12,842 likes"}
                        </div>

                        {/* Caption */}
                        <div className="insta-caption">
                          <strong>pulse_creator</strong>
                          Massive thanks to @cbd.in for matching us with Aura Energy! Crossed 1M views in 5 days! 🚀📈
                        </div>

                        {/* Timestamp */}
                        <div className="insta-timestamp">
                          2 days ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Row 2, Bento 3: Collab Blueprint Zine Timeline (Span 6) */}
            <div
              className="bento-card bento-collab-blueprint"
              onMouseEnter={() => triggerCursor("The Strategy 🗺️")}
              onMouseLeave={hideCursor}
            >
              <div>
                <span style={{ fontSize: "10px", fontWeight: 800, color: "var(--ink-soft)", textTransform: "uppercase" }}>
                  ✦ Execution Blueprint
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, marginTop: "4px", textTransform: "uppercase" }}>
                  How CBD Grows You
                </h3>
              </div>

              {/* Steps timeline horizontal */}
              <div className="blueprint-timeline">
                
                {/* Step 1 */}
                <div className="blueprint-step">
                  <div className="blueprint-step-num">1</div>
                  <div>
                    <h4 className="blueprint-step-title">Match</h4>
                    <p className="blueprint-step-desc">
                      CBD curates demographic connections based on creator reach.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="blueprint-step">
                  <div className="blueprint-step-num">2</div>
                  <div>
                    <h4 className="blueprint-step-title">Launch</h4>
                    <p className="blueprint-step-desc">
                      Ambassador drives and direct campus activations go live.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="blueprint-step">
                  <div className="blueprint-step-num">3</div>
                  <div>
                    <h4 className="blueprint-step-title">Disrupt</h4>
                    <p className="blueprint-step-desc">
                      Campaign hits social streams, yielding viral metrics.
                    </p>
                  </div>
                </div>

              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", fontWeight: 800, borderTop: "2px dashed var(--border)", paddingTop: "10px", marginTop: "12px" }}>
                <span>Simple 3-Step Growth Workflow</span>
                <span style={{ color: "var(--burgundy)" }}>Growth Route ✦</span>
              </div>
            </div>

            {/* Row 2, Bento 4: Core Idea Verticals Toggle Panel (Span 6) */}
            <div
              className="bento-card bento-toggles"
              onMouseEnter={() => triggerCursor("Who We Help! ✨")}
              onMouseLeave={hideCursor}
            >
              <div>
                <span style={{ fontSize: "10px", fontWeight: 800, color: "var(--sage)", textTransform: "uppercase" }}>
                  ✦ Core Idea
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, marginTop: "4px", textTransform: "uppercase" }}>
                  Who We Connect
                </h3>
              </div>

              <div className="bento-pill-select">
                {Object.keys(categories).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`pill-opt-a ${activeCategory === cat ? "active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="pill-popover">
                <span style={{ fontWeight: 800, display: "block", fontSize: "11.5px", color: "var(--burgundy)", marginBottom: "4px" }}>
                  {categories[activeCategory].title} {categories[activeCategory].badge}
                </span>
                <p style={{ margin: 0, fontSize: "11px", color: "var(--ink)", lineHeight: 1.4 }}>
                  {categories[activeCategory].desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ticker marquee - Positioned relatively below the Bento Hero as a section separator */}
      <div className="opt-a-marquee">
        <div className="opt-a-marquee-content">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="opt-a-marquee-item">
              <span>CONNECT PEOPLE</span> <Star className="opt-a-star" size={14} fill="var(--gold)" />
              <span>BUZZ TOGETHER</span> <Zap className="opt-a-star" size={14} fill="var(--burgundy-hover)" />
              <span>DISRUPT THE MARKET</span> <Sparkles className="opt-a-star" size={14} fill="var(--gold)" />
              <span>GROWTH ECOSYSTEM</span> <Flame className="opt-a-star" size={14} fill="var(--burgundy-hover)" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
