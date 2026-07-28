"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Layers, Sparkles, Wand2, ArrowLeftRight } from "lucide-react";

export default function VersionSwitcher() {
  return null; // Temporarily disabled by user request
  
  const pathname = usePathname();

  const versions = [
    {
      id: "original",
      name: "Original Design",
      path: "/",
      icon: Layers,
      color: "var(--ink-soft)",
      desc: "Current elegant editorial layout",
    },
    {
      id: "v2",
      name: "Option v2: Bento Brutalism",
      path: "/v2",
      icon: Wand2,
      color: "var(--burgundy)",
      desc: "Bold grid-locked kinetic vibe",
    },
  ];

  const currentVersion = versions.find((v) => v.path === pathname) || versions[0];

  const handleSwitch = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 99999,
        fontFamily: "var(--sans)",
      }}
      className="version-switcher-container"
    >
      {/* Styles injected directly for portability and independence from global CSS */}
      <style jsx global>{`
        .vs-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(252, 250, 248, 0.9);
          border: 1.5px solid var(--border);
          padding: 10px 18px;
          border-radius: 100px;
          box-shadow: 0 8px 30px rgba(45, 38, 40, 0.12);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: var(--ink);
        }
        .vs-trigger:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: var(--burgundy);
          box-shadow: 0 12px 35px rgba(143, 63, 85, 0.2);
        }
        .vs-panel {
          position: absolute;
          bottom: 60px;
          right: 0;
          width: 320px;
          background: rgba(252, 250, 248, 0.95);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 15px 45px rgba(45, 38, 40, 0.18);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: vsSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: bottom right;
        }
        @keyframes vsSlideUp {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .vs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--ink-soft);
          border-bottom: 1px solid rgba(216, 197, 184, 0.4);
          padding-bottom: 8px;
          margin-bottom: 4px;
        }
        .vs-option {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 12px;
          background: transparent;
          border: 1px solid transparent;
          text-align: left;
          transition: all 0.2s ease;
          width: 100%;
        }
        .vs-option:hover {
          background: rgba(228, 212, 199, 0.4);
          transform: translateX(-2px);
        }
        .vs-option.active {
          background: rgba(143, 63, 85, 0.08);
          border-color: rgba(143, 63, 85, 0.2);
        }
        .vs-opt-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          background: var(--cream);
          border: 1px solid var(--border);
          color: var(--burgundy);
        }
        .vs-opt-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .vs-opt-name {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .vs-opt-desc {
          font-size: 11px;
          color: var(--ink-soft);
          line-height: 1.3;
        }
        .vs-pulse {
          width: 6px;
          height: 6px;
          background-color: var(--burgundy);
          border-radius: 50%;
          display: inline-block;
          animation: vsPulse 1.8s infinite;
        }
        @keyframes vsPulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(143, 63, 85, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(143, 63, 85, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(143, 63, 85, 0);
          }
        }
      `}</style>

      {isOpen && (
        <div className="vs-panel">
          <div className="vs-header">
            <span>Choose UI Concept</span>
            <span className="vs-pulse" />
          </div>
          {versions.map((ver) => {
            const IconComponent = ver.icon;
            const isActive = ver.path === pathname;
            return (
              <button
                key={ver.id}
                onClick={() => handleSwitch(ver.path)}
                className={`vs-option ${isActive ? "active" : ""}`}
              >
                <div
                  className="vs-opt-icon"
                  style={{
                    color: ver.id === currentVersion.id ? "var(--burgundy)" : "var(--ink-soft)",
                    borderColor: ver.id === currentVersion.id ? "var(--burgundy)" : "var(--border)",
                  }}
                >
                  <IconComponent size={16} />
                </div>
                <div className="vs-opt-text">
                  <span className="vs-opt-name">{ver.name}</span>
                  <span className="vs-opt-desc">{ver.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <button className="vs-trigger" onClick={() => setIsOpen(!isOpen)}>
        <ArrowLeftRight size={15} style={{ color: "var(--burgundy)" }} />
        <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.02em" }}>
          UI: {currentVersion.id === "original" ? "Original" : "Bento"}
        </span>
      </button>
    </div>
  );
}
