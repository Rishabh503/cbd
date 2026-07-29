"use client";

import { Star, Zap, Sparkles, Flame } from "lucide-react";

export default function KineticTicker() {
  return (
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
  );
}
