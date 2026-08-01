"use client";

export default function Logo({ width = "100%", height = "100%", className = "", style = {} }) {
  return (
    <img 
      src="/cbd_logo.png" 
      alt="CBD Logo" 
      className={className}
      style={{
        width: width,
        height: height,
        objectFit: "contain",
        display: "block",
        ...style
      }} 
    />
  );
}
