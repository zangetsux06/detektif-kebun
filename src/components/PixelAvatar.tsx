"use client";

import React from "react";

export interface PixelAvatarData {
  id: string;
  char: string;
  label: string;
}

export const PIXEL_AVATAR_LIST: PixelAvatarData[] = [
  { id: "owl", char: "🦉", label: "Burung Hantu Bijak" },
  { id: "fox", char: "🦊", label: "Rubah Rimba" },
  { id: "mushroom", char: "🍄", label: "Jamur Hutan" },
  { id: "leaf", char: "🍀", label: "Daun Beruntung" },
  { id: "flower", char: "🌸", label: "Teratai Indah" },
  { id: "wood", char: "🪵", label: "Kayu Purba" },
  { id: "detective", char: "🕵️", label: "Detektif Kebun" },
  { id: "tiger", char: "🐯", label: "Harimau Jawa" },
];

interface PixelAvatarProps {
  id?: string;
  char?: string;
  size?: number | string;
  className?: string;
}

// 8-Bit Pixel Art SVGs for each profile avatar character
export function PixelAvatar({ id, char, size = 32, className = "" }: PixelAvatarProps) {
  // Determine key
  const avatarId = id || PIXEL_AVATAR_LIST.find((a) => a.char === char)?.id || "leaf";

  switch (avatarId) {
    case "owl":
      return <PixelOwlSvg size={size} className={className} />;
    case "fox":
      return <PixelFoxSvg size={size} className={className} />;
    case "mushroom":
      return <PixelMushroomSvg size={size} className={className} />;
    case "flower":
      return <PixelFlowerAvatarSvg size={size} className={className} />;
    case "wood":
      return <PixelWoodSvg size={size} className={className} />;
    case "detective":
      return <PixelDetectiveSvg size={size} className={className} />;
    case "tiger":
      return <PixelTigerSvg size={size} className={className} />;
    case "leaf":
    default:
      return <PixelLeafSvg size={size} className={className} />;
  }
}

// ─── 8-Bit Pixel Wise Owl 🦉 ──────────────────────────────────────────────────
function PixelOwlSvg({ size, className }: { size: number | string; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" className={className}>
      {/* Ears / Feathers */}
      <path d="M2 1h3v2H2V1zm9 0h3v2h-3V1z" fill="#78350f" />
      {/* Head Outer */}
      <path d="M2 3h12v7H2V3z" fill="#92400e" />
      <path d="M3 4h10v5H3V4z" fill="#b45309" />
      {/* Eyes Outer White Glasses Ring */}
      <path d="M3 4h4v4H3V4zm6 0h4v4H9V4z" fill="#ffffff" />
      {/* Pupil Golden / Black */}
      <path d="M4 5h2v2H4V5zm6 0h2v2h-2V5z" fill="#020617" />
      <path d="M5 5h1v1H5V5zm6 0h1v1h-1V5z" fill="#facc15" />
      {/* Beak */}
      <path d="M7 6h2v2H7V6z" fill="#f59e0b" />
      {/* Body */}
      <path d="M3 10h10v4H3v-4z" fill="#78350f" />
      {/* Belly Feathers */}
      <path d="M5 10h6v3H5v-3z" fill="#fef3c7" />
      <path d="M6 11h1v1H6v-1zm3 0h1v1H9v-1z" fill="#d97706" />
      {/* Feet */}
      <path d="M4 14h3v1H4v-1zm5 0h3v1H9v-1z" fill="#f59e0b" />
    </svg>
  );
}

// ─── 8-Bit Pixel Fox 🦊 ───────────────────────────────────────────────────────
function PixelFoxSvg({ size, className }: { size: number | string; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" className={className}>
      {/* Ears Outer */}
      <path d="M2 1h3v4H2V1zm9 0h3v4h-3V1z" fill="#ea580c" />
      <path d="M3 2h1v2H3V2zm9 0h1v2h-1V2z" fill="#1e293b" />
      {/* Head */}
      <path d="M2 4h12v5H2V4z" fill="#ea580c" />
      {/* White Cheeks */}
      <path d="M2 8h4v3H2V8zm8 0h4v3h-4V8z" fill="#ffffff" />
      {/* Snout & Nose */}
      <path d="M6 8h4v4H6V8z" fill="#f97316" />
      <path d="M7 11h2v1H7v-1z" fill="#0f172a" />
      {/* Eyes */}
      <path d="M4 6h2v2H4V6zm6 0h2v2h-2V6z" fill="#0f172a" />
      <path d="M5 6h1v1H5V6zm6 0h1v1h-1V6z" fill="#ffffff" />
      {/* Body & Chest White */}
      <path d="M4 12h8v3H4v-3z" fill="#c2410c" />
      <path d="M6 12h4v3H6v-3z" fill="#ffffff" />
    </svg>
  );
}

// ─── 8-Bit Pixel Mushroom 🍄 ──────────────────────────────────────────────────
function PixelMushroomSvg({ size, className }: { size: number | string; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" className={className}>
      {/* Cap Outer */}
      <path d="M4 1h8v1H4V1zm-2 2h12v6H2V3z" fill="#dc2626" />
      <path d="M1 5h14v3H1V5z" fill="#b91c1c" />
      {/* White Dots on Cap */}
      <path d="M3 3h3v2H3V3zm7 1h3v2h-3V4zm-4 4h3v1H6V8z" fill="#ffffff" />
      {/* Stem */}
      <path d="M5 9h6v6H5V9z" fill="#fef3c7" />
      <path d="M6 10h4v4H6v-4z" fill="#ffffff" />
      {/* Eyes on Stem (Super Mario Style) */}
      <path d="M6 11h1v2H6v-2zm3 0h1v2H9v-2z" fill="#1e293b" />
    </svg>
  );
}

// ─── 8-Bit Pixel Clover / Leaf 🍀 ─────────────────────────────────────────────
function PixelLeafSvg({ size, className }: { size: number | string; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" className={className}>
      {/* Top Leaf */}
      <path d="M6 1h4v4H6V1z" fill="#166534" />
      <path d="M7 2h2v2H7V2z" fill="#4ade80" />
      {/* Left Leaf */}
      <path d="M1 6h4v4H1V6z" fill="#15803d" />
      <path d="M2 7h2v2H2V7z" fill="#22c55e" />
      {/* Right Leaf */}
      <path d="M11 6h4v4h-4V6z" fill="#166534" />
      <path d="M12 7h2v2h-2V7z" fill="#86efac" />
      {/* Bottom Leaf */}
      <path d="M6 10h4v4H6v-4z" fill="#15803d" />
      <path d="M7 11h2v2H7v-2z" fill="#4ade80" />
      {/* Stem */}
      <path d="M7 8h2v7H7V8z" fill="#14532d" />
    </svg>
  );
}

// ─── 8-Bit Pixel Lotus Flower 🌸 ──────────────────────────────────────────────
function PixelFlowerAvatarSvg({ size, className }: { size: number | string; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" className={className}>
      {/* Petals Outer */}
      <path d="M6 1h4v3H6V1zm-4 4h3v4H2V5zm10 0h3v4h-3V5zm-4 7h4v3H6v-3z" fill="#db2777" />
      <path d="M4 3h2v2H4V3zm6 0h2v2h-2V3zm-6 6h2v2H4V9zm6 0h2v2h-2V9z" fill="#f472b6" />
      {/* Center Core */}
      <path d="M6 5h4v4H6V5z" fill="#fbbf24" />
      <path d="M7 6h2v2H7V6z" fill="#fef08a" />
      {/* Water pad leaf below */}
      <path d="M1 13h14v2H1v-2z" fill="#047857" />
      <path d="M3 14h10v1H3v-1z" fill="#10b981" />
    </svg>
  );
}

// ─── 8-Bit Pixel Wood 🪵 ──────────────────────────────────────────────────────
function PixelWoodSvg({ size, className }: { size: number | string; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" className={className}>
      {/* Bark Outer */}
      <path d="M3 2h10v12H3V2z" fill="#78350f" />
      <path d="M4 3h8v10H4V3z" fill="#92400e" />
      {/* Wood Rings */}
      <path d="M5 4h6v8H5V4z" fill="#b45309" />
      <path d="M6 5h4v6H6V5z" fill="#d97706" />
      <path d="M7 7h2v2H7V7z" fill="#f59e0b" />
      {/* Small Sprout on Wood */}
      <path d="M11 1h2v3h-2V1z" fill="#22c55e" />
      <path d="M12 2h2v1h-2V2z" fill="#4ade80" />
    </svg>
  );
}

// ─── 8-Bit Pixel Detective Hat 🕵️ ─────────────────────────────────────────────
function PixelDetectiveSvg({ size, className }: { size: number | string; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" className={className}>
      {/* Hat Crown */}
      <path d="M5 2h6v3H5V2z" fill="#451a03" />
      <path d="M4 5h8v3H4V5z" fill="#78350f" />
      {/* Hat Ribbon/Stripe */}
      <path d="M4 7h8v1H4V7z" fill="#c9a227" />
      {/* Hat Brim */}
      <path d="M1 8h14v2H1V8z" fill="#451a03" />
      <path d="M2 9h12v1H2V9z" fill="#78350f" />
      {/* Magnifying Glass */}
      <path d="M9 10h4v4H9v-4z" fill="#0284c7" />
      <path d="M10 11h2v2h-2v-2z" fill="#e0f2fe" />
      <path d="M13 14h2v2h-2v-2z" fill="#78350f" />
    </svg>
  );
}

// ─── 8-Bit Pixel Tiger 🐯 ─────────────────────────────────────────────────────
function PixelTigerSvg({ size, className }: { size: number | string; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges" className={className}>
      {/* Ears */}
      <path d="M2 1h3v3H2V1zm9 0h3v3h-3V1z" fill="#d97706" />
      <path d="M3 2h1v1H3V2zm9 0h1v1h-1V2z" fill="#fef3c7" />
      {/* Head */}
      <path d="M2 4h12v7H2V4z" fill="#f59e0b" />
      {/* Black Stripes */}
      <path d="M7 4h2v2H7V4zm-4 5h2v2H3V9zm8 0h2v2h-2V9z" fill="#1e1b4b" />
      {/* White Snout */}
      <path d="M5 8h6v3H5V8z" fill="#ffffff" />
      {/* Nose */}
      <path d="M7 9h2v1H7V9z" fill="#ec4899" />
      {/* Eyes */}
      <path d="M4 6h2v2H4V6zm6 0h2v2h-2V6z" fill="#0f172a" />
      <path d="M5 6h1v1H5V6zm6 0h1v1h-1V6z" fill="#facc15" />
    </svg>
  );
}
