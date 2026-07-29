"use client";

export default function Logo({ width = "100%", height = "100%" }) {
  return (
    <img 
      src="/cbd_logo.png" 
      alt="CBD Logo" 
      style={{
        width: width,
        height: height,
        objectFit: "contain",
        display: "block"
      }} 
    />
  );
}
