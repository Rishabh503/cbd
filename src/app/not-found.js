"use client";

import Link from "next/link";
import { ArrowRight, WifiOff } from "lucide-react";
import "./v2/v2.css";

export default function NotFound() {
  return (
    <div
      className="opt-a-body"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        className="bento-card"
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "48px 32px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
        }}
      >
        {/* Animated Rotated Badge */}
        <div
          style={{
            background: "var(--gold)",
            border: "3px solid var(--ink)",
            padding: "10px 20px",
            borderRadius: "12px",
            boxShadow: "4px 4px 0px var(--ink)",
            transform: "rotate(-2.5deg)",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <WifiOff size={20} style={{ color: "var(--ink)" }} />
          <span style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "0.02em", color: "var(--ink)", textTransform: "uppercase" }}>
            404 ✦ Lost Connection
          </span>
        </div>

        {/* Headline */}
        <h1 className="headline-a" style={{ fontSize: "clamp(26px, 5vw, 36px)", marginTop: "12px" }}>
          Node Disconnected
        </h1>

        {/* Description */}
        <p className="subheadline-a" style={{ margin: "0 auto", fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: 1.6 }}>
          The path you are looking for has disconnected from the CBD collaboration ecosystem. Make sure you entered the correct address or return home.
        </p>

        {/* Status Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", margin: "8px 0" }}>
          <span style={{ fontSize: "10.5px", fontWeight: 800, background: "var(--sand)", border: "1.5px solid var(--ink)", padding: "4px 8px", borderRadius: "6px", textTransform: "uppercase" }}>
            📡 Port Offline
          </span>
          <span style={{ fontSize: "10.5px", fontWeight: 800, background: "var(--cream)", border: "1.5px solid var(--ink)", padding: "4px 8px", borderRadius: "6px", textTransform: "uppercase" }}>
            🔍 Route Scan Error
          </span>
        </div>

        {/* Redirect Button */}
        <Link href="/" className="btn-brutal" style={{ marginTop: "12px", textDecoration: "none" }}>
          Return to Ecosystem <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
