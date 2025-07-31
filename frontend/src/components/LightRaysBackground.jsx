// src/components/LightRaysBackground.jsx
import React from "react";

const LightRaysBackground = () => {
  return (
    <svg
      className="fixed inset-0 -z-10 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </radialGradient>
        <mask id="mask">
          <rect width="100%" height="100%" fill="url(#light)" />
        </mask>
      </defs>
      <g mask="url(#mask)">
        {[...Array(60)].map((_, i) => (
          <line
            key={i}
            x1="50%"
            y1="50%"
            x2={`${50 + 50 * Math.cos((i * 6 * Math.PI) / 180)}%`}
            y2={`${50 + 50 * Math.sin((i * 6 * Math.PI) / 180)}%`}
            stroke="white"
            strokeOpacity="0.02"
            strokeWidth="1"
          />
        ))}
      </g>
    </svg>
  );
};

export default LightRaysBackground;
