"use client";

import React from "react";

interface PixelIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
}

// ─── 8-Bit Pixel Flame Icon ──────────────────────────────────────────────────
export function PixelFlame({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Outer Fire Base (Dark Red / Orange) */}
      <path d="M7 1h2v2H7zM6 3h4v2H6zM5 5h6v2H5zM4 7h8v2H4zM3 9h10v5H3zM4 14h8v1H4z" fill="#dc2626" />
      {/* Mid Fire (Orange / Gold) */}
      <path d="M7 3h2v2H7zM6 5h4v2H6zM5 7h6v2H5zM4 9h8v4H4zM5 13h6v1H5z" fill="#f97316" />
      {/* Inner Flame (Yellow / Gold) */}
      <path d="M7 6h2v2H7zM6 8h4v2H6zM6 10h4v2H6zM7 12h2v1H7z" fill="#facc15" />
      {/* Core Hot Center (White/Bright) */}
      <path d="M7 9h2v2H7z" fill="#fef08a" />
    </svg>
  );
}

// ─── 8-Bit Pixel Trophy Icon ────────────────────────────────────────────────
export function PixelTrophy({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Handles */}
      <path d="M1 3h3v5H2V7H1V3zm11 0h3v4h-1v1h-2V3z" fill="#b45309" />
      {/* Trophy Bowl Outer */}
      <path d="M4 2h8v5H4V2z" fill="#f59e0b" />
      <path d="M5 7h6v2H5V7zm1 2h4v1H6V9z" fill="#d97706" />
      {/* Highlights */}
      <path d="M5 3h2v3H5V3z" fill="#fef08a" />
      {/* Stem & Base */}
      <path d="M7 10h2v3H7v-3z" fill="#78350f" />
      <path d="M4 13h8v2H4v-2z" fill="#92400e" />
      <path d="M5 14h6v1H5v-1z" fill="#f59e0b" />
    </svg>
  );
}

// ─── 8-Bit Pixel Target Icon ────────────────────────────────────────────────
export function PixelTarget({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Outer Ring */}
      <path d="M5 1h6v1H5V1zm-3 3h2v1H2V4zm10 0h2v1h-2V4zM1 5h1v6H1V5zm13 0h1v6h-1V5zM2 11h2v1H2v-1zm10 0h2v1h-2v-1zM5 14h6v1H5v-1z" fill="#e11d48" />
      {/* Middle White Ring */}
      <path d="M5 3h6v2H5V3zm-2 2h2v6H3V5zm10 0h2v6h-2V5zM5 11h6v2H5v-2z" fill="#ffffff" />
      {/* Inner Red Bullseye */}
      <path d="M6 6h4v4H6V6z" fill="#e11d48" />
      {/* Center Yellow Point */}
      <path d="M7 7h2v2H7V7z" fill="#fef08a" />
    </svg>
  );
}

// ─── 8-Bit Pixel Sprout Icon ────────────────────────────────────────────────
export function PixelSprout({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Left Leaf */}
      <path d="M3 3h3v1H3V3zm-1 1h5v2H2V4zm1 2h4v1H3V6z" fill="#22c55e" />
      <path d="M4 4h2v1H4V4z" fill="#86efac" />
      {/* Right Leaf */}
      <path d="M10 2h3v1h-3V2zm-1 1h5v2H9V3zm1 2h4v1h-4V5z" fill="#15803d" />
      <path d="M10 3h2v1h-2V3z" fill="#4ade80" />
      {/* Stem */}
      <path d="M7 6h2v7H7V6z" fill="#166534" />
      {/* Soil */}
      <path d="M3 13h10v2H3v-2z" fill="#78350f" />
    </svg>
  );
}

// ─── 8-Bit Pixel Trees Icon ────────────────────────────────────────────────
export function PixelTrees({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Tree 1 Top */}
      <path d="M7 1h2v2H7V1zM6 3h4v2H6V3zM5 5h6v3H5V5z" fill="#15803d" />
      <path d="M7 2h1v1H7V2zm-1 2h2v1H6V4z" fill="#4ade80" />
      {/* Tree 1 Trunk */}
      <path d="M7 8h2v5H7V8z" fill="#78350f" />
      {/* Tree 2 (Left) */}
      <path d="M2 5h3v2H2V5zM1 7h5v3H1V7z" fill="#166534" />
      <path d="M3 10h1v3H3v-3z" fill="#92400e" />
      {/* Tree 3 (Right) */}
      <path d="M11 4h3v2h-3V4zm-1 2h5v4h-5V6z" fill="#14532d" />
      <path d="M12 10h1v3h-1v-3z" fill="#78350f" />
      {/* Ground Grass */}
      <path d="M0 13h16v3H0v-3z" fill="#365314" />
    </svg>
  );
}

// ─── 8-Bit Pixel Flower Icon ────────────────────────────────────────────────
export function PixelFlower({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Petals (Pink/Magenta) */}
      <path d="M6 1h4v2H6V1zm-4 4h2v4H2V5zm10 0h2v4h-2V5zm-4 8h4v2H6v-2z" fill="#ec4899" />
      <path d="M4 3h2v2H4V3zm6 0h2v2h-2V3zM4 9h2v2H4V9zm6 0h2v2h-2V9z" fill="#f472b6" />
      {/* Center Core (Gold) */}
      <path d="M6 5h4v4H6V5z" fill="#f59e0b" />
      <path d="M7 6h2v2H7V6z" fill="#fef08a" />
      {/* Stem & Leaves */}
      <path d="M7 11h2v4H7v-4z" fill="#15803d" />
      <path d="M5 12h2v1H5v-1zm4 1h2v1H9v-1z" fill="#22c55e" />
    </svg>
  );
}

// ─── 8-Bit Pixel Award Icon ─────────────────────────────────────────────────
export function PixelAward({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Outer Medal Circle */}
      <path d="M5 1h6v1H5V1zm-3 3h2v1H2V4zm10 0h2v1h-2V4zM1 5h1v4H1V5zm13 0h1v4h-1V5zM2 9h2v1H2V9zm10 0h2v1h-2V9zM5 10h6v1H5v-1z" fill="#d97706" />
      {/* Gold Inner Fill */}
      <path d="M5 2h6v2H5V2zm-2 2h10v5H3V4zm2 5h6v1H5V9z" fill="#fbbf24" />
      {/* Star Center */}
      <path d="M7 3h2v5H7V3zm-2 2h6v1H5V5z" fill="#fef08a" />
      {/* Ribbon Tails */}
      <path d="M4 11h3v4L5.5 13.5 4 15v-4zm5 0h3v4l-1.5-1.5L9 15v-4z" fill="#dc2626" />
    </svg>
  );
}

// ─── 8-Bit Pixel Check Icon ─────────────────────────────────────────────────
export function PixelCheck({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Outer Box */}
      <path d="M2 1h12v14H2V1z" fill="#166534" />
      <path d="M3 2h10v12H3V2z" fill="#15803d" />
      {/* Checkmark */}
      <path d="M11 4h2v2h-2V4zm-2 2h2v2H9V6zm-2 2h2v2H7V8zm-2-2h2v2H5V6zm-2-2h2v2H3V4z" fill="#22c55e" />
      <path d="M11 5h1v1h-1V5zm-2 2h1v1H9V7zm-2 2h1v1H7V9zm-2-2h1v1H5V7zm-2-2h1v1H3V5z" fill="#bbf7d0" />
    </svg>
  );
}

// ─── 8-Bit Pixel LogOut / Door Icon ──────────────────────────────────────────
export function PixelLogOut({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Door Frame */}
      <path d="M2 1h9v1H2V1zm0 1h2v12H2V2zm0 12h9v1H2v-1zM9 2h2v4H9V2zm0 8h2v4H9v-4z" fill="#991b1b" />
      {/* Door Frame Inner Highlight */}
      <path d="M3 2h1v12H3V2zm0 0h7v1H3V2zm0 11h7v1H3v-1z" fill="#ef4444" />
      {/* Exit Arrow */}
      <path d="M9 7h4v2H9V7zm3-2h2v2h-2V5zm0 4h2v2h-2V9zm2-2h2v2h-2V7z" fill="#ffffff" />
    </svg>
  );
}

// ─── 8-Bit Pixel Sparkles Icon ──────────────────────────────────────────────
export function PixelSparkles({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Big Sparkle Center */}
      <path d="M7 1h2v14H7V1zm-6 6h14v2H1V7z" fill="#fbbf24" />
      <path d="M6 6h4v4H6V6z" fill="#fef08a" />
      {/* Corner Pixels */}
      <path d="M5 5h2v2H5V5zm4 0h2v2H9V5zm-4 4h2v2H5V9zm4 4h2v2H9v-2z" fill="#f59e0b" />
      {/* Mini Sparkle top right */}
      <path d="M12 2h2v2h-2V2zm-1 1h4v1h-4V3z" fill="#ffffff" />
    </svg>
  );
}

// ─── 8-Bit Pixel MapPin Icon ────────────────────────────────────────────────
export function PixelMapPin({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Pin Head */}
      <path d="M5 1h6v1H5V1zm-3 3h2v1H2V4zm10 0h2v1h-2V4zM1 5h1v4H1V5zm13 0h1v4h-1V5zM2 9h2v1H2V9zm10 0h2v1h-2V9z" fill="#dc2626" />
      <path d="M3 2h10v7H3V2z" fill="#ef4444" />
      {/* Hole */}
      <path d="M6 4h4v3H6V4z" fill="#ffffff" />
      {/* Pointer Tail */}
      <path d="M5 10h6v1H5v-1zm1 1h4v2H6v-2zm1 2h2v2H7v-2z" fill="#b91c1c" />
    </svg>
  );
}

// ─── 8-Bit Pixel Tag Icon ────────────────────────────────────────────────────
export function PixelTag({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      <path d="M2 2h6v2H2V2zm6 2h2v2H8V4zm2 2h2v2h-2V6zm2 2h2v2h-2V8zm-2 2h2v2h-2v-2zm-2 2h2v2H8v-2zm-6 0h6v2H2v-2zm0-8h2v8H2V4z" fill="#b45309" />
      <path d="M4 4h4v2H4V4zm4 2h2v2H8V6zm2 2h2v2h-2V8zm-2 2h2v2H8v-2zm-4 0h4v2H4v-2zm0-4h2v4H4V6z" fill="#d97706" />
      {/* Tag hole */}
      <path d="M4 4h2v2H4V4z" fill="#ffffff" />
    </svg>
  );
}

// ─── 8-Bit Pixel Info Icon ───────────────────────────────────────────────────
export function PixelInfo({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      <path d="M5 1h6v2H5V1zm-3 3h2v1H2V4zm10 0h2v1h-2V4zM1 5h1v6H1V5zm13 0h1v6h-1V5zM2 11h2v1H2v-1zm10 0h2v1h-2v-1zM5 13h6v2H5v-2z" fill="#0284c7" />
      <path d="M3 2h10v11H3V2z" fill="#38bdf8" />
      {/* i dot */}
      <path d="M7 4h2v2H7V4z" fill="#ffffff" />
      {/* i stem */}
      <path d="M7 7h2v5H7V7z" fill="#ffffff" />
    </svg>
  );
}

// ─── 8-Bit Pixel Help Icon ───────────────────────────────────────────────────
export function PixelHelp({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      <path d="M5 1h6v2H5V1zm-3 3h2v1H2V4zm10 0h2v1h-2V4zM1 5h1v6H1V5zm13 0h1v6h-1V5zM2 11h2v1H2v-1zm10 0h2v1h-2v-1zM5 13h6v2H5v-2z" fill="#c9a227" />
      <path d="M3 2h10v11H3V2z" fill="#e2b941" />
      {/* ? Mark */}
      <path d="M6 3h4v1H6V3zm3 1h2v2H9V4zm-2 2h2v2H7V6zm0 3h2v1H7V9zm0 2h2v1H7v-1z" fill="#12130e" />
    </svg>
  );
}

// ─── 8-Bit Pixel Compass Icon ────────────────────────────────────────────────
export function PixelCompass({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      <path d="M5 1h6v1H5V1zm-3 3h2v1H2V4zm10 0h2v1h-2V4zM1 5h1v6H1V5zm13 0h1v6h-1V5zM2 11h2v1H2v-1zm10 0h2v1h-2v-1zM5 14h6v1H5v-1z" fill="#5e3c25" />
      <path d="M3 2h10v11H3V2z" fill="#d4cbab" />
      {/* North Needle Red */}
      <path d="M8 3h2v5H8V3zm-2 3h2v2H6V6z" fill="#dc2626" />
      {/* South Needle Dark */}
      <path d="M6 8h2v5H6V8zm2-3h2v2H8V5z" fill="#1e293b" />
      {/* Center Pivot */}
      <path d="M7 7h2v2H7V7z" fill="#facc15" />
    </svg>
  );
}

// ─── 8-Bit Pixel Lock Icon ───────────────────────────────────────────────────
export function PixelLock({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Shackle */}
      <path d="M5 1h6v2H5V1zm-1 2h2v4H4V3zm6 0h2v4h-2V3z" fill="#94a3b8" />
      <path d="M6 2h4v1H6V2z" fill="#e2e8f0" />
      {/* Body */}
      <path d="M2 6h12v9H2V6z" fill="#b45309" />
      <path d="M3 7h10v7H3V7z" fill="#d97706" />
      {/* Keyhole */}
      <path d="M7 9h2v2H7V9zm0 1h2v3H7v-3z" fill="#1e1b4b" />
    </svg>
  );
}

// ─── 8-Bit Pixel Trash Icon ──────────────────────────────────────────────────
export function PixelTrash({ size = 16, className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Handle & Lid */}
      <path d="M6 1h4v1H6V1zM1 3h14v2H1V3z" fill="#991b1b" />
      {/* Bin Body */}
      <path d="M3 5h10v10H3V5z" fill="#dc2626" />
      {/* Rib lines */}
      <path d="M5 7h1v6H5V7zm3 0h1v6H8V7zm3 0h1v6h-1V7z" fill="#7f1d1d" />
    </svg>
  );
}

// ─── 8-Bit Pixel Leaf Icon ──────────────────────────────────────────────────
export function PixelLeaf({ size = 20, color = "#4a5d23", className = "", ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      {...props}
    >
      {/* Outer Leaf Silhouette */}
      <path d="M8 1h3v2H8V1zm3 2h2v3h-2V3zm2 3h1v4h-1V6zm-1 4h-2v2h2v-2zm-2 2h-3v2h3v-2z" fill="#1a1c14" />
      {/* Main Leaf Fill */}
      <path d="M6 3h4v2H6V3zm-2 2h7v4H4V5zm1 4h6v2H5V9zm2 2h2v2H7v-2z" fill={color} />
      {/* Leaf Highlights */}
      <path d="M7 3h2v2H7V3zm-2 2h3v2H5V5zm0 2h2v2H5V7z" fill="#7ba036" />
      {/* Central Leaf Vein */}
      <path d="M7 4h1v7H7V4zm-1 7h1v2H6v-2z" fill="#c9a227" />
      {/* Stem */}
      <path d="M4 12h2v2H4v-2zm-2 2h2v2H2v-2z" fill="#5e3c25" />
    </svg>
  );
}
