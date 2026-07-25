"use client";

export default function Logo({ width = "100%", height = "100%", color = "#8F3F55", showWordmark = true }) {
  if (!showWordmark) {
    return (
      <svg
        viewBox="30 10 140 90"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <g fill={color} font-family="'Georgia', 'Times New Roman', serif" font-weight="bold">
          {/* Letter C */}
          <text x="35" y="85" font-size="90" letter-spacing="-6">
            C
          </text>
          {/* Letter B */}
          <text x="78" y="76" font-size="70">
            B
          </text>
          {/* Letter D */}
          <text x="116" y="94" font-size="82">
            D
          </text>
        </g>

        {/* Concentric waves inside B's bottom loop (radiating leftward) */}
        <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
          <path d="M102,68 A 4 4 0 0 0 102,74" />
          <path d="M102,64 A 8 8 0 0 0 102,78" />
          <path d="M102,60 A 12 12 0 0 0 102,82" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 160"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <g fill={color} font-family="'Georgia', 'Times New Roman', serif" font-weight="bold">
        {/* Letter C */}
        <text x="35" y="85" font-size="90" letter-spacing="-6">
          C
        </text>
        {/* Letter B */}
        <text x="78" y="76" font-size="70">
          B
        </text>
        {/* Letter D */}
        <text x="116" y="94" font-size="82">
          D
        </text>
      </g>

      {/* Concentric waves inside B's bottom loop (radiating leftward) */}
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
        <path d="M102,68 A 4 4 0 0 0 102,74" />
        <path d="M102,64 A 8 8 0 0 0 102,78" />
        <path d="M102,60 A 12 12 0 0 0 102,82" />
      </g>

      {/* Wordmark below */}
      <text
        x="100"
        y="122"
        font-family="'Georgia', 'Times New Roman', serif"
        font-size="20"
        letter-spacing="10"
        text-anchor="middle"
        fill={color}
      >
        CBD
      </text>

      {/* Separator line with end dots */}
      <line x1="45" y1="134" x2="155" y2="134" stroke={color} strokeWidth="1.2" />
      <circle cx="45" cy="134" r="2.5" fill={color} />
      <circle cx="155" cy="134" r="2.5" fill={color} />

      {/* Tagline */}
      <text
        x="100"
        y="150"
        font-family="'Inter', -apple-system, sans-serif"
        font-weight="700"
        font-size="8"
        letter-spacing="3.5"
        text-anchor="middle"
        fill={color}
      >
        CONNECT  •  BUZZ  •  DISRUPT
      </text>
    </svg>
  );
}
