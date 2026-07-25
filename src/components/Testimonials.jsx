"use client";

import { useEffect, useState } from "react";

// Thin line-art custom SVGs matching the Fox Protocol references
const DoubleSquareIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--burgundy)" strokeWidth="1.2">
    <rect x="3" y="3" width="12" height="12" rx="1.5" />
    <rect x="9" y="9" width="12" height="12" rx="1.5" strokeDasharray="3 1" />
  </svg>
);

const ClockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--burgundy)" strokeWidth="1.2">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
);

const ProfileKeyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--burgundy)" strokeWidth="1.2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <circle cx="18" cy="11" r="2.5" />
  </svg>
);

const NetworkBranchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--burgundy)" strokeWidth="1.2">
    <path d="M12 2v20M17 5H7M19 12H5M12 12c-2.5 0-5 2.5-5 5" />
    <circle cx="12" cy="2" r="1.5" fill="var(--burgundy)" />
    <circle cx="12" cy="22" r="1.5" fill="var(--burgundy)" />
    <circle cx="19" cy="12" r="1.5" fill="var(--burgundy)" />
    <circle cx="5" cy="12" r="1.5" fill="var(--burgundy)" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--burgundy)" strokeWidth="1.2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default function Testimonials() {
  const testimonials = [
    {
      class: "t-card-1",
      icon: <DoubleSquareIcon />,
      iconPos: "top-left",
      dotPos: "top-right",
      title: "Brands & Campaigns",
      quote: "Working with CBD changed how we approach student activations. We saw a 3x increase in conversions compared to standard digital ads, with zero marketing budget wasted.",
      author: "Ananya Mehta",
      role: "Head of Growth, Elevate Brands",
    },
    {
      class: "t-card-2",
      icon: <ClockIcon />,
      iconPos: "bottom-left",
      dotPos: "bottom-right",
      title: "Creator Partnerships",
      quote: "CBD makes partnerships straightforward. No vague briefs or endless chasing. Everything is pre-structured and aligned to what our audience actually likes.",
      author: "Rohan Sharma",
      role: "Lifestyle & Tech Content Creator",
    },
    {
      class: "t-card-3",
      icon: <ProfileKeyIcon />,
      iconPos: "top-left",
      dotPos: "top-right",
      title: "Campus Networks",
      quote: "Securing sponsorships used to take months. CBD connected us with the right brands in weeks. They speak the language of both campus fests and corporate sponsors.",
      author: "Kabir Sen",
      role: "President, Cultural Committee",
    },
    {
      class: "t-card-4",
      icon: <NetworkBranchIcon />,
      iconPos: "top-right",
      dotPos: "top-left",
      title: "Local Ambitions",
      quote: "We wanted on-ground campus presence but didn't know how to route it. CBD's ambassador network gave us direct, high-trust access to 5+ major college campus channels instantly.",
      author: "Vikram Aditya",
      role: "Founder, LocalLoop India",
    },
    {
      class: "t-card-5",
      icon: <ShieldIcon />,
      iconPos: "bottom-left",
      dotPos: "bottom-right",
      title: "Community Outreach",
      quote: "CBD helped us launch a campaign that was genuinely co-created. The community felt heard, and the brand partner got real, sustained engagement, not just passive clicks on a banner.",
      author: "Priya Nair",
      role: "Organizer, Impact Network Fest",
    },
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Testimonials</div>
          <h2>Why partner with CBD?</h2>
          <p>Real feedback from brands, creators, and organizers who have built growth with us.</p>
        </div>

        <div className="testimonials-grid reveal">
          {testimonials.map((t, idx) => {
            const hasIconTop = t.iconPos.startsWith("top");
            const hasDotTop = t.dotPos.startsWith("top");
            
            return (
              <div key={idx} className={`t-card ${t.class}`}>
                <div className="t-card-inner">
                  {/* Icon & Dot Pattern (Top Placements) */}
                  {hasIconTop && (
                    <div className={`t-icon-box ${t.iconPos}`}>
                      {t.icon}
                    </div>
                  )}
                  {hasDotTop && (
                    <div className={`t-dots ${t.dotPos}`} />
                  )}

                  {/* Testimonial Content */}
                  <div className="t-content">
                    <span className="t-tag">{t.title}</span>
                    <p className="t-text">"{t.quote}"</p>
                    <div className="t-author">
                      <span className="t-name">{t.author}</span>
                      <span className="t-role">{t.role}</span>
                    </div>
                  </div>

                  {/* Icon & Dot Pattern (Bottom Placements) */}
                  {!hasIconTop && (
                    <div className={`t-icon-box ${t.iconPos}`}>
                      {t.icon}
                    </div>
                  )}
                  {!hasDotTop && (
                    <div className={`t-dots ${t.dotPos}`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
