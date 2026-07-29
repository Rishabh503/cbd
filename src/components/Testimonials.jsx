"use client";

import { useState } from "react";
import testimonialData from "@/data/testimonials.json";

// Vector logos representing each brand / collaboration group (used as high-fidelity fallbacks)
const CSILogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--burgundy)" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" stroke="var(--burgundy)" strokeWidth="1.5" strokeDasharray="3 1.5" />
    <circle cx="12" cy="12" r="7.5" stroke="var(--burgundy)" strokeWidth="0.8" />
    <text x="12" y="15.5" fill="var(--burgundy)" fontSize="8.5" fontWeight="950" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.04em">CSI</text>
  </svg>
);

const AWSLogo = () => (
  <svg width="46" height="28" viewBox="0 0 48 24" fill="none">
    <text x="3" y="15" fill="var(--burgundy)" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="-0.06em">aws</text>
    <path d="M6 19c6 4.5 22 4.5 28 0" stroke="var(--burgundy)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M31 17l4 2.5-2.5 4z" fill="var(--burgundy)" />
  </svg>
);

const ComedianLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--burgundy)" strokeWidth="1.5">
    <rect x="9" y="2" width="6" height="10" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" />
    <line x1="9" y1="6" x2="15" y2="6" stroke="var(--burgundy)" strokeWidth="1" />
    <line x1="9" y1="9" x2="15" y2="9" stroke="var(--burgundy)" strokeWidth="1" />
  </svg>
);

const MAITCrestLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" stroke="var(--burgundy)" strokeWidth="1.5" fill="none" />
    <path d="M12 7v7M9 10.5h6" stroke="var(--burgundy)" strokeWidth="1.2" />
    <path d="M8 17h8" stroke="var(--burgundy)" strokeWidth="1.5" />
    <path d="M12 14.5v2.5" stroke="var(--burgundy)" strokeWidth="1.2" />
  </svg>
);

const MercedesBenzLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="var(--burgundy)" strokeWidth="1.2" fill="none" />
    <path d="M12 12L12 2.5L13.3 11.25Z" fill="var(--burgundy)" />
    <path d="M12 12L20.23 16.75L12 13.5Z" fill="var(--burgundy)" />
    <path d="M12 12L3.77 16.75L10.7 11.25Z" fill="var(--burgundy)" />
    <path d="M12 12L12 2.5L10.7 11.25Z" fill="var(--burgundy)" fillOpacity="0.35" />
    <path d="M12 12L20.23 16.75L13.3 11.25Z" fill="var(--burgundy)" fillOpacity="0.35" />
    <path d="M12 12L3.77 16.75L12 13.5Z" fill="var(--burgundy)" fillOpacity="0.35" />
  </svg>
);

const PVRLogo = () => (
  <svg width="72" height="24" viewBox="0 0 80 24" fill="none">
    <text x="1" y="17" fill="var(--burgundy)" fontSize="17" fontWeight="900" fontFamily="Times New Roman, Georgia, serif" letterSpacing="0.04em">PVR</text>
    <line x1="43" y1="3" x2="43" y2="18" stroke="var(--burgundy)" strokeWidth="1.5" />
    <text x="48" y="16" fill="var(--burgundy)" fontSize="11" fontWeight="600" fontFamily="sans-serif" letterSpacing="0.08em">INOX</text>
  </svg>
);

const PizzaHutLogo = () => (
  <svg width="36" height="32" viewBox="0 0 24 20" fill="none">
    <path d="M12 2C8 4.5 4 8 2 10.5c0 0 3-.5 6-.5 1 0 2 1 4 2.5 2-1.5 3-2.5 4-2.5 3 0 6 .5 6 .5-2-2.5-6-6-10-8.5z" fill="var(--burgundy)" />
    <path d="M1.5 13.5c4-1 17-1 21 0 .5.1.5.8 0 1-4 1.2-17 1.2-21 0-.5-.2-.5-.9 0-1z" fill="var(--burgundy)" fillOpacity="0.8" />
  </svg>
);

const logoMap = {
  csi: <CSILogo />,
  aws: <AWSLogo />,
  comedian: <ComedianLogo />,
  techDept: <MAITCrestLogo />,
  dean: <MAITCrestLogo />,
  aids: <MAITCrestLogo />,
  mercedes: <MercedesBenzLogo />,
  pvr: <PVRLogo />,
  pizzahut: <PizzaHutLogo />,
};

// Subcomponent to dynamically load logo image or fallback to custom SVG
function TestimonialLogo({ testimonial }) {
  const [loadError, setLoadError] = useState(false);
  const fallbackSVG = logoMap[testimonial.logoKey] || <MAITCrestLogo />;

  if (loadError || !testimonial.logoUrl) {
    return fallbackSVG;
  }

  return (
    <img
      src={testimonial.logoUrl}
      alt={`${testimonial.role} Logo`}
      onError={() => setLoadError(true)}
      style={{
        maxHeight: "36px",
        maxWidth: "120px",
        width: "auto",
        height: "auto",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Testimonials</div>
          <h2>Why partner with CBD?</h2>
          <p>Real feedback from brands, creators, and campus networks who have built growth with us.</p>
        </div>

        <div className="testimonials-grid reveal">
          {testimonialData.map((t, idx) => {
            const hasIconTop = t.iconPos.startsWith("top");
            const hasDotTop = t.dotPos.startsWith("top");
            
            return (
              <div key={idx} className={`t-card ${t.class}`}>
                <div className="t-card-inner">
                  {/* Icon & Dot Pattern (Top Placements) */}
                  {hasIconTop && (
                    <div className={`t-icon-box ${t.iconPos}`}>
                      <TestimonialLogo testimonial={t} />
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
                      <TestimonialLogo testimonial={t} />
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
