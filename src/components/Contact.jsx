"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Mail, Send, Check } from "lucide-react";

// Inline brand SVGs to prevent Lucide v1.x import warnings
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

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cardRef = useRef(null);

  // 3D Tilt effect on hover
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      // Calculate rotation angles (max 8 degrees)
      const rotateX = ((yc - y) / yc) * 8;
      const rotateY = ((x - xc) / xc) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    };

    card.addEventListener("mousemove", handleMouseMove, { passive: true });
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      alert("Form submission requires a Web3Forms Access Key. Please add NEXT_PUBLIC_WEB3FORMS_KEY to your .env.local file.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `New Inquiry from ${formState.name} (CBD Website)`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        alert("Submission failed: " + (result.message || "Please try again or email us directly at contact@thecbd.in"));
      }
    } catch (error) {
      console.error(error);
      alert("Submission error. Please check your connection or email us directly at contact@thecbd.in");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-grid-custom">
        {/* Left Column: Direct info, Trust factors */}
        <div className="contact-info-column reveal">
          <div className="eyebrow">Start A Conversation</div>
          <h2>
            Let's build
            <br />
            something <em>lasting.</em>
          </h2>
          <p className="contact-description">
            We align brands, student communities, and creators into a high-trust, structured
            collaboration model that drives measurable success. No vanity metrics. No spam.
          </p>

          <div className="trust-points">
            <div className="trust-point">
              <span className="trust-number">100%</span>
              <span className="trust-label">Direct, professional channel partner routing</span>
            </div>
            <div className="trust-point">
              <span className="trust-number">24 Hrs</span>
              <span className="trust-label">Guaranteed response turnaround time</span>
            </div>
          </div>
        </div>

        {/* Right Column: Redesigned interactive card */}
        <div className="contact-card-column reveal">
          <div ref={cardRef} className="modern-contact-card">
            {submitted ? (
              <div className="success-state">
                <div className="success-badge">
                  <Check style={{ width: "24px", height: "24px", color: "var(--cream)" }} />
                </div>
                <h3>Message Sent!</h3>
                <p>We appreciate you reaching out. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-card-form">
                <div className="bc-label" style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "16px" }}>
                  Send a Direct Message
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Your Email Address"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project or target goals..."
                    required
                    rows="3"
                    className="form-input form-textarea"
                  />
                </div>

                <button type="submit" className="btn btn-primary form-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Inquiry <Send style={{ width: "14px", height: "14px", marginLeft: "8px" }} />
                    </>
                  )}
                </button>

                <div className="bc-divider" />

                <div className="bc-label" style={{ fontSize: "11px", fontWeight: "700", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: "12px", marginBottom: "12px", textAlign: "center" }}>
                  Or Connect Directly
                </div>

                <div className="quick-links-row">
                  <a href="tel:+919871012714" className="quick-link-pill" title="Call Us">
                    <Phone style={{ width: "15px", height: "15px" }} />
                  </a>
                  <a href="mailto:contact@thecbd.in" className="quick-link-pill" title="Email Us">
                    <Mail style={{ width: "15px", height: "15px" }} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/thecbdin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-link-pill"
                    title="LinkedIn"
                  >
                    <LinkedinIcon style={{ width: "15px", height: "15px" }} />
                  </a>
                  <a
                    href="https://www.instagram.com/thecbd.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-link-pill"
                    title="Instagram"
                  >
                    <InstagramIcon style={{ width: "15px", height: "15px" }} />
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
