import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface SVGPath {
  d: string;
  stroke: string;
  strokeWidth: number;
  delay: number; // ms
  duration: number; // ms
  type: "stem" | "leaf" | "flower" | "detail" | "root";
}

interface BotanicalSVGData {
  paths: SVGPath[];
  viewBox: string;
  title: string;
  colorScheme: {
    stem: string;
    leaf: string;
    flower: string;
    detail: string;
  };
}

function getStringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// ─── 1. KANTONG SEMAR ────────────────────────────────────────────────────────
function generateKantongSemar(): BotanicalSVGData {
  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Kantong Semar",
    colorScheme: {
      stem: "#4a5d23",
      leaf: "#5a7a2a",
      flower: "#c9a227",
      detail: "#8b5a2b",
    },
    paths: [
      { d: "M 200 480 C 190 380 210 280 200 150", stroke: "#4a5d23", strokeWidth: 3, delay: 0, duration: 1100, type: "stem" },
      
      { d: "M 200 360 C 160 360 130 350 120 340", stroke: "#5a7a2a", strokeWidth: 2, delay: 600, duration: 600, type: "leaf" },
      { d: "M 120 340 C 110 330 90 350 90 380", stroke: "#4a5d23", strokeWidth: 1.2, delay: 1000, duration: 600, type: "stem" },
      { d: "M 90 380 C 70 380 65 430 85 440 C 105 450 110 410 95 385 Z", stroke: "#8b5a2b", strokeWidth: 1.5, delay: 1400, duration: 800, type: "detail" },
      { d: "M 85 378 C 75 365 100 360 95 380 Z", stroke: "#c9a227", strokeWidth: 1.2, delay: 2000, duration: 500, type: "detail" },
      
      { d: "M 200 300 C 240 300 270 290 280 280", stroke: "#5a7a2a", strokeWidth: 2, delay: 800, duration: 600, type: "leaf" },
      { d: "M 280 280 C 290 270 310 290 310 320", stroke: "#4a5d23", strokeWidth: 1.2, delay: 1200, duration: 600, type: "stem" },
      { d: "M 310 320 C 330 320 335 370 315 380 C 295 390 290 350 305 325 Z", stroke: "#8b5a2b", strokeWidth: 1.5, delay: 1600, duration: 800, type: "detail" },
      { d: "M 315 318 C 325 305 300 300 305 320 Z", stroke: "#c9a227", strokeWidth: 1.2, delay: 2200, duration: 500, type: "detail" },
      
      { d: "M 200 150 C 190 120 210 90 200 70 C 190 50 180 70 185 80", stroke: "#4a5d23", strokeWidth: 1.5, delay: 1100, duration: 800, type: "stem" },
      { d: "M 200 180 C 170 170 180 150 200 150 Z", stroke: "#5a7a2a", strokeWidth: 1.5, delay: 1500, duration: 500, type: "leaf" },
    ]
  };
}

// ─── 2. RAFFLESIA ARNOLDII ──────────────────────────────────────────────────
function generateRafflesia(): BotanicalSVGData {
  return {
    viewBox: "0 0 400 400",
    title: "Sketsa Rafflesia arnoldii",
    colorScheme: {
      stem: "#5e3c25",
      leaf: "#5e3c25",
      flower: "#a04020",
      detail: "#e8bf45",
    },
    paths: [
      { d: "M 200 200 m -35 0 a 35 35 0 1 0 70 0 a 35 35 0 1 0 -70 0 Z", stroke: "#5e3c25", strokeWidth: 3, delay: 0, duration: 800, type: "detail" },
      { d: "M 200 200 m -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0 Z", stroke: "#a04020", strokeWidth: 2, delay: 400, duration: 800, type: "detail" },
      
      { d: "M 170 160 C 130 80 270 80 230 160 Z", stroke: "#a04020", strokeWidth: 2.5, delay: 1000, duration: 700, type: "flower" },
      { d: "M 235 175 C 320 120 340 220 245 225 Z", stroke: "#a04020", strokeWidth: 2.5, delay: 1300, duration: 700, type: "flower" },
      { d: "M 225 240 C 280 320 170 330 180 248 Z", stroke: "#a04020", strokeWidth: 2.5, delay: 1600, duration: 700, type: "flower" },
      { d: "M 175 245 C 100 310 90 220 160 215 Z", stroke: "#a04020", strokeWidth: 2.5, delay: 1900, duration: 700, type: "flower" },
      { d: "M 155 205 C 80 150 140 90 170 155 Z", stroke: "#a04020", strokeWidth: 2.5, delay: 2200, duration: 700, type: "flower" },
      
      { d: "M 120 250 C 130 275 160 275 170 245", stroke: "#5e3c25", strokeWidth: 2, delay: 2700, duration: 500, type: "root" },
      { d: "M 230 245 C 240 275 270 275 280 250", stroke: "#5e3c25", strokeWidth: 2, delay: 2900, duration: 500, type: "root" },
      
      { d: "M 190 120 A 4 4 0 1 1 190 119 Z", stroke: "#e8bf45", strokeWidth: 2, delay: 3200, duration: 200, type: "detail" },
      { d: "M 210 120 A 4 4 0 1 1 210 119 Z", stroke: "#e8bf45", strokeWidth: 2, delay: 3300, duration: 200, type: "detail" },
      { d: "M 270 170 A 5 5 0 1 1 270 169 Z", stroke: "#e8bf45", strokeWidth: 2, delay: 3400, duration: 200, type: "detail" },
      { d: "M 260 195 A 4 4 0 1 1 260 194 Z", stroke: "#e8bf45", strokeWidth: 2, delay: 3500, duration: 200, type: "detail" },
      { d: "M 220 280 A 6 6 0 1 1 220 279 Z", stroke: "#e8bf45", strokeWidth: 2, delay: 3600, duration: 200, type: "detail" },
      { d: "M 180 280 A 5 5 0 1 1 180 279 Z", stroke: "#e8bf45", strokeWidth: 2, delay: 3700, duration: 200, type: "detail" },
      { d: "M 130 230 A 4 4 0 1 1 130 229 Z", stroke: "#e8bf45", strokeWidth: 2, delay: 3800, duration: 200, type: "detail" },
      { d: "M 140 180 A 5 5 0 1 1 140 179 Z", stroke: "#e8bf45", strokeWidth: 2, delay: 3900, duration: 200, type: "detail" }
    ]
  };
}

// ─── 3. ANGGREK (ORCHID) ────────────────────────────────────────────────────
function generateAnggrek(): BotanicalSVGData {
  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Anggrek",
    colorScheme: {
      stem: "#4a5d23",
      leaf: "#4a5d23",
      flower: "#da70d6",
      detail: "#e8bf45",
    },
    paths: [
      { d: "M 100 460 C 110 330 180 210 280 160 C 310 145 330 150 350 165", stroke: "#4a5d23", strokeWidth: 3, delay: 0, duration: 1200, type: "stem" },
      
      { d: "M 100 450 C 40 430 30 360 60 410 C 80 440 95 445 100 450 Z", stroke: "#4a5d23", strokeWidth: 2, delay: 700, duration: 700, type: "leaf" },
      { d: "M 100 450 C 160 430 180 380 150 420 C 130 445 110 448 100 450 Z", stroke: "#4a5d23", strokeWidth: 2, delay: 900, duration: 700, type: "leaf" },
      
      { d: "M 180 250 C 170 200 190 200 180 250 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 1300, duration: 400, type: "flower" },
      { d: "M 180 250 C 140 230 140 210 180 235 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 1500, duration: 400, type: "flower" },
      { d: "M 180 250 C 220 230 220 210 180 235 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 1600, duration: 400, type: "flower" },
      { d: "M 180 250 C 150 280 165 290 180 250 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 1700, duration: 400, type: "flower" },
      { d: "M 180 250 C 210 280 195 290 180 250 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 1800, duration: 400, type: "flower" },
      { d: "M 180 250 C 170 275 190 275 180 250 Z", stroke: "#e8bf45", strokeWidth: 1.5, delay: 1900, duration: 300, type: "detail" },
      
      { d: "M 260 190 C 250 140 270 140 260 190 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 1800, duration: 400, type: "flower" },
      { d: "M 260 190 C 220 170 220 150 260 175 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 2000, duration: 400, type: "flower" },
      { d: "M 260 190 C 300 170 300 150 260 175 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 2100, duration: 400, type: "flower" },
      { d: "M 260 190 C 230 220 245 230 260 190 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 2200, duration: 400, type: "flower" },
      { d: "M 260 190 C 290 220 275 230 260 190 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 2300, duration: 400, type: "flower" },
      { d: "M 260 190 C 250 215 270 215 260 190 Z", stroke: "#e8bf45", strokeWidth: 1.5, delay: 2400, duration: 300, type: "detail" },
      
      { d: "M 320 150 C 310 100 330 100 320 150 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 2300, duration: 400, type: "flower" },
      { d: "M 320 150 C 280 130 280 110 320 135 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 2500, duration: 400, type: "flower" },
      { d: "M 320 150 C 360 130 360 110 320 135 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 2600, duration: 400, type: "flower" },
      { d: "M 320 150 C 290 180 305 190 320 150 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 2700, duration: 400, type: "flower" },
      { d: "M 320 150 C 350 180 335 190 320 150 Z", stroke: "#da70d6", strokeWidth: 1.5, delay: 2800, duration: 400, type: "flower" },
      { d: "M 320 150 C 310 175 330 175 320 150 Z", stroke: "#e8bf45", strokeWidth: 1.5, delay: 2900, duration: 300, type: "detail" }
    ]
  };
}

// ─── 4. BAMBU (BAMBOO) / ROTAN ──────────────────────────────────────────────
function generateBambu(): BotanicalSVGData {
  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Bambu",
    colorScheme: {
      stem: "#8a9a5b",
      leaf: "#4a5d23",
      flower: "#2d4026",
      detail: "#2d4026",
    },
    paths: [
      { d: "M 160 480 L 157 410", stroke: "#8a9a5b", strokeWidth: 6, delay: 0, duration: 300, type: "stem" },
      { d: "M 154 410 C 151 409 163 409 160 410", stroke: "#2d4026", strokeWidth: 1.5, delay: 300, duration: 100, type: "detail" },
      { d: "M 157 410 L 153 330", stroke: "#8a9a5b", strokeWidth: 5.5, delay: 400, duration: 300, type: "stem" },
      { d: "M 150 330 C 147 329 159 329 156 330", stroke: "#2d4026", strokeWidth: 1.5, delay: 700, duration: 100, type: "detail" },
      { d: "M 153 330 L 148 240", stroke: "#8a9a5b", strokeWidth: 5, delay: 800, duration: 300, type: "stem" },
      { d: "M 145 240 C 142 239 154 239 151 240", stroke: "#2d4026", strokeWidth: 1.5, delay: 1100, duration: 100, type: "detail" },
      { d: "M 148 240 L 142 140", stroke: "#8a9a5b", strokeWidth: 4.5, delay: 1200, duration: 400, type: "stem" },
      { d: "M 139 140 C 136 139 148 139 145 140", stroke: "#2d4026", strokeWidth: 1.5, delay: 1600, duration: 100, type: "detail" },
      { d: "M 142 140 L 135 40", stroke: "#8a9a5b", strokeWidth: 4, delay: 1700, duration: 400, type: "stem" },

      { d: "M 240 480 L 243 390", stroke: "#8a9a5b", strokeWidth: 5.5, delay: 200, duration: 450, type: "stem" },
      { d: "M 240 390 C 237 389 249 389 246 390", stroke: "#2d4026", strokeWidth: 1.5, delay: 650, duration: 100, type: "detail" },
      { d: "M 243 390 L 247 290", stroke: "#8a9a5b", strokeWidth: 5, delay: 750, duration: 450, type: "stem" },
      { d: "M 244 290 C 241 289 253 289 250 290", stroke: "#2d4026", strokeWidth: 1.5, delay: 1200, duration: 100, type: "detail" },
      { d: "M 247 290 L 252 170", stroke: "#8a9a5b", strokeWidth: 4.5, delay: 1300, duration: 500, type: "stem" },
      { d: "M 249 170 C 246 169 258 169 255 170", stroke: "#2d4026", strokeWidth: 1.5, delay: 1800, duration: 100, type: "detail" },
      { d: "M 252 170 L 258 70", stroke: "#8a9a5b", strokeWidth: 4, delay: 1900, duration: 450, type: "stem" },

      { d: "M 151 240 C 120 230 100 240 80 250", stroke: "#8a9a5b", strokeWidth: 1.5, delay: 1300, duration: 300, type: "stem" },
      { d: "M 80 250 C 60 230 40 240 20 250 C 40 260 60 260 80 250 Z", stroke: "#4a5d23", strokeWidth: 1.2, delay: 1600, duration: 500, type: "leaf" },
      { d: "M 95 242 C 85 220 70 215 55 210 C 70 225 85 235 95 242 Z", stroke: "#4a5d23", strokeWidth: 1.2, delay: 1800, duration: 500, type: "leaf" },
      
      { d: "M 250 290 C 280 270 310 280 330 290", stroke: "#8a9a5b", strokeWidth: 1.5, delay: 1400, duration: 300, type: "stem" },
      { d: "M 330 290 C 360 280 380 290 395 300 C 375 310 355 310 330 290 Z", stroke: "#4a5d23", strokeWidth: 1.2, delay: 1700, duration: 500, type: "leaf" },
      { d: "M 300 283 C 320 260 340 255 360 250 C 340 265 320 275 300 283 Z", stroke: "#4a5d23", strokeWidth: 1.2, delay: 1900, duration: 500, type: "leaf" }
    ]
  };
}

// ─── 5. POHON (TREE) ────────────────────────────────────────────────────────
function generateTree(plantName: string): BotanicalSVGData {
  const hash = getStringHash(plantName);
  const foliageColors = ["#2d4026", "#3a4f32", "#4a5d23", "#228b22", "#006400"];
  const barkColors = ["#5e3c25", "#8b5a2b", "#a0522d", "#8b4513", "#3d2314"];
  
  const foliageColor = foliageColors[hash % foliageColors.length];
  const barkColor = barkColors[Math.floor(hash / 4) % barkColors.length];
  
  return {
    viewBox: "0 0 400 500",
    title: `Sketsa ${plantName}`,
    colorScheme: {
      stem: barkColor,
      leaf: foliageColor,
      flower: "#c9a227",
      detail: "#2b1a10",
    },
    paths: [
      // --- Batang Utama Bertekstur ---
      { d: "M 180 470 C 182 380 185 320 180 280", stroke: barkColor, strokeWidth: 4, delay: 0, duration: 1000, type: "stem" },
      { d: "M 220 470 C 218 380 215 320 220 280", stroke: barkColor, strokeWidth: 4, delay: 100, duration: 1000, type: "stem" },
      { d: "M 193 470 C 195 385 197 325 195 280", stroke: barkColor, strokeWidth: 2, delay: 200, duration: 1000, type: "detail" },
      { d: "M 207 470 C 205 385 203 325 205 280", stroke: barkColor, strokeWidth: 2, delay: 300, duration: 1000, type: "detail" },

      // --- Akar ---
      { d: "M 180 460 C 160 470 140 480 120 488", stroke: barkColor, strokeWidth: 3.5, delay: 400, duration: 600, type: "root" },
      { d: "M 193 465 C 180 475 165 485 150 492", stroke: barkColor, strokeWidth: 2, delay: 450, duration: 600, type: "root" },
      { d: "M 220 460 C 240 470 260 480 280 488", stroke: barkColor, strokeWidth: 3.5, delay: 500, duration: 600, type: "root" },
      { d: "M 207 465 C 220 475 235 485 250 492", stroke: barkColor, strokeWidth: 2, delay: 550, duration: 600, type: "root" },

      // --- Cabang Utama ---
      { d: "M 180 280 C 150 260 120 240 100 200", stroke: barkColor, strokeWidth: 3.5, delay: 600, duration: 800, type: "stem" },
      { d: "M 220 280 C 250 260 280 240 300 200", stroke: barkColor, strokeWidth: 3.5, delay: 650, duration: 800, type: "stem" },
      { d: "M 200 280 C 205 240 195 200 200 160", stroke: barkColor, strokeWidth: 3, delay: 700, duration: 800, type: "stem" },

      // --- Ranting/Twig ---
      { d: "M 100 200 C 80 180 60 170 50 150", stroke: barkColor, strokeWidth: 2, delay: 800, duration: 800, type: "stem" },
      { d: "M 100 200 C 110 180 120 160 115 130", stroke: barkColor, strokeWidth: 2, delay: 900, duration: 800, type: "stem" },
      { d: "M 300 200 C 290 180 280 160 285 130", stroke: barkColor, strokeWidth: 2, delay: 850, duration: 800, type: "stem" },
      { d: "M 300 200 C 320 180 340 170 350 150", stroke: barkColor, strokeWidth: 2, delay: 950, duration: 800, type: "stem" },
      { d: "M 200 160 C 185 140 170 120 165 95", stroke: barkColor, strokeWidth: 2, delay: 1000, duration: 800, type: "stem" },
      { d: "M 200 160 C 215 140 230 120 235 95", stroke: barkColor, strokeWidth: 2, delay: 1050, duration: 800, type: "stem" },

      // --- Cluster Tajuk Daun Awan (Overlap Cloud Canopy) ---
      { d: "M 50 150 c -25 -5 -40 20 -20 35 c -15 20 10 35 25 25 c 20 15 35 -10 25 -25 c 15 -20 -10 -35 -30 -35 Z", stroke: foliageColor, strokeWidth: 2, delay: 1200, duration: 900, type: "leaf" },
      { d: "M 115 130 c -15 -20 -35 0 -20 20 c -20 15 0 35 20 20 c 20 15 35 -5 15 -25 c 15 -15 -5 -30 -15 -15 Z", stroke: foliageColor, strokeWidth: 2, delay: 1300, duration: 900, type: "leaf" },
      { d: "M 165 95 c -15 -20 -35 0 -20 20 c -20 15 0 35 20 20 c 20 15 35 -5 15 -25 c 15 -15 -5 -30 -15 -15 Z", stroke: foliageColor, strokeWidth: 2, delay: 1400, duration: 900, type: "leaf" },
      { d: "M 235 95 c -15 -20 -35 0 -20 20 c -20 15 0 35 20 20 c 20 15 35 -5 15 -25 c 15 -15 -5 -30 -15 -15 Z", stroke: foliageColor, strokeWidth: 2, delay: 1500, duration: 900, type: "leaf" },
      { d: "M 285 130 c -15 -20 -35 0 -20 20 c -20 15 0 35 20 20 c 20 15 35 -5 15 -25 c 15 -15 -5 -30 -15 -15 Z", stroke: foliageColor, strokeWidth: 2, delay: 1600, duration: 900, type: "leaf" },
      { d: "M 350 150 c -25 -5 -40 20 -20 35 c -15 20 10 35 25 25 c 20 15 35 -10 25 -25 c 15 -20 -10 -35 -30 -35 Z", stroke: foliageColor, strokeWidth: 2, delay: 1700, duration: 900, type: "leaf" },
      { d: "M 200 60 c -20 -15 -35 5 -20 25 c -20 15 0 30 20 20 c 20 15 35 -5 15 -25 c 15 -15 -5 -30 -15 -20 Z", stroke: foliageColor, strokeWidth: 2, delay: 1800, duration: 900, type: "leaf" },

      // --- Detail Guratan Daun ---
      { d: "M 45 160 c 5 5 15 -5 10 -15", stroke: "#2b1a10", strokeWidth: 1, delay: 2000, duration: 500, type: "detail" },
      { d: "M 160 105 c 5 5 15 -5 10 -15", stroke: "#2b1a10", strokeWidth: 1, delay: 2100, duration: 500, type: "detail" },
      { d: "M 240 105 c 5 5 15 -5 10 -15", stroke: "#2b1a10", strokeWidth: 1, delay: 2200, duration: 500, type: "detail" },
      { d: "M 345 160 c 5 5 15 -5 10 -15", stroke: "#2b1a10", strokeWidth: 1, delay: 2300, duration: 500, type: "detail" },
      { d: "M 195 70 c 5 5 15 -5 10 -15", stroke: "#2b1a10", strokeWidth: 1, delay: 2400, duration: 500, type: "detail" },

      // --- Dedaunan Melayang Tertiup Angin ---
      { d: "M 75 220 c 0 -10 10 -10 15 0 c 0 10 -10 10 -15 0 Z", stroke: foliageColor, strokeWidth: 1, delay: 2500, duration: 500, type: "leaf" },
      { d: "M 130 180 c 0 -10 10 -10 15 0 c 0 10 -10 10 -15 0 Z", stroke: foliageColor, strokeWidth: 1, delay: 2600, duration: 500, type: "leaf" },
      { d: "M 270 180 c 0 -10 10 -10 15 0 c 0 10 -10 10 -15 0 Z", stroke: foliageColor, strokeWidth: 1, delay: 2700, duration: 500, type: "leaf" },
      { d: "M 315 220 c 0 -10 10 -10 15 0 c 0 10 -10 10 -15 0 Z", stroke: foliageColor, strokeWidth: 1, delay: 2800, duration: 500, type: "leaf" },
    ]
  };
}

function generatePohonAren(): BotanicalSVGData {
  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Pohon Aren",
    colorScheme: {
      stem: "#3d2314",
      leaf: "#2d4026",
      flower: "#c9a227",
      detail: "#1b2a1a",
    },
    paths: [
      // Trunk (Batang Aren yang berserat ijuk)
      { d: "M 190 480 C 192 380 195 280 195 180", stroke: "#3d2314", strokeWidth: 7, delay: 0, duration: 900, type: "stem" },
      { d: "M 210 480 C 208 380 205 280 205 180", stroke: "#3d2314", strokeWidth: 7, delay: 100, duration: 900, type: "stem" },
      // Ijuk fibers (serat hitam kasar di batang)
      { d: "M 192 420 Q 200 425 208 420", stroke: "#1b2a1a", strokeWidth: 2, delay: 300, duration: 300, type: "detail" },
      { d: "M 193 370 Q 200 375 207 370", stroke: "#1b2a1a", strokeWidth: 2, delay: 400, duration: 300, type: "detail" },
      { d: "M 194 320 Q 200 325 206 320", stroke: "#1b2a1a", strokeWidth: 2, delay: 500, duration: 300, type: "detail" },
      { d: "M 195 270 Q 200 275 205 270", stroke: "#1b2a1a", strokeWidth: 2, delay: 600, duration: 300, type: "detail" },
      { d: "M 195 220 Q 200 225 205 220", stroke: "#1b2a1a", strokeWidth: 2, delay: 700, duration: 300, type: "detail" },

      // Hanging Fruit Clusters (Tandan buah aren / kolang-kaling)
      { d: "M 195 190 Q 180 220 175 260", stroke: "#8b5a2b", strokeWidth: 2.5, delay: 800, duration: 600, type: "stem" },
      { d: "M 175 260 c -5 0 -8 5 -5 10 c 3 5 8 5 10 0 c 2 -5 -1 -10 -5 -10 Z", stroke: "#c9a227", strokeWidth: 1.5, delay: 1300, duration: 400, type: "flower" },
      { d: "M 170 240 c -5 0 -8 5 -5 10 c 3 5 8 5 10 0 c 2 -5 -1 -10 -5 -10 Z", stroke: "#c9a227", strokeWidth: 1.5, delay: 1400, duration: 400, type: "flower" },
      { d: "M 180 220 c -5 0 -8 5 -5 10 c 3 5 8 5 10 0 c 2 -5 -1 -10 -5 -10 Z", stroke: "#c9a227", strokeWidth: 1.5, delay: 1500, duration: 400, type: "flower" },

      // Palm Fronds (Pelepah & Daun Aren menjari)
      // Frond 1 (Kiri Bawah)
      { d: "M 200 180 Q 150 180 100 230", stroke: "#2d4026", strokeWidth: 3.5, delay: 900, duration: 700, type: "leaf" },
      { d: "M 160 180 L 155 200 M 140 185 L 132 210 M 120 195 L 110 220 M 100 210 L 92 230", stroke: "#4a5d23", strokeWidth: 1.5, delay: 1600, duration: 500, type: "leaf" },
      
      // Frond 2 (Kiri Atas)
      { d: "M 200 180 Q 130 140 70 170", stroke: "#2d4026", strokeWidth: 3.5, delay: 1000, duration: 700, type: "leaf" },
      { d: "M 160 162 L 150 180 M 140 152 L 128 175 M 120 146 L 105 170 M 100 144 L 82 165 M 80 148 L 62 165", stroke: "#4a5d23", strokeWidth: 1.5, delay: 1700, duration: 500, type: "leaf" },

      // Frond 3 (Tengah Atas)
      { d: "M 200 180 Q 200 100 200 60", stroke: "#2d4026", strokeWidth: 3.5, delay: 1100, duration: 700, type: "leaf" },
      { d: "M 200 150 L 180 140 M 200 130 L 180 120 M 200 110 L 180 100 M 200 90 L 180 80 M 200 150 L 220 140 M 200 130 L 220 120 M 200 110 L 220 100 M 200 90 L 220 80", stroke: "#4a5d23", strokeWidth: 1.5, delay: 1800, duration: 500, type: "leaf" },

      // Frond 4 (Kanan Atas)
      { d: "M 200 180 Q 270 140 330 170", stroke: "#2d4026", strokeWidth: 3.5, delay: 1150, duration: 700, type: "leaf" },
      { d: "M 240 162 L 250 180 M 260 152 L 272 175 M 280 146 L 295 170 M 300 144 L 318 165 M 320 148 L 338 165", stroke: "#4a5d23", strokeWidth: 1.5, delay: 1900, duration: 500, type: "leaf" },

      // Frond 5 (Kanan Bawah)
      { d: "M 200 180 Q 250 180 300 230", stroke: "#2d4026", strokeWidth: 3.5, delay: 1200, duration: 700, type: "leaf" },
      { d: "M 240 180 L 245 200 M 260 185 L 268 210 M 270 195 L 290 220 M 300 210 L 308 230", stroke: "#4a5d23", strokeWidth: 1.5, delay: 2000, duration: 500, type: "leaf" }
    ]
  };
}

function generatePohonJati(): BotanicalSVGData {
  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Pohon Jati",
    colorScheme: {
      stem: "#5e3c25",
      leaf: "#4a5d23",
      flower: "#c9a227",
      detail: "#3d2314",
    },
    paths: [
      // Thick rugged trunk (Batang jati bertekstur kasar)
      { d: "M 180 470 C 185 350 190 260 190 220", stroke: "#5e3c25", strokeWidth: 5.5, delay: 0, duration: 900, type: "stem" },
      { d: "M 220 470 C 215 350 210 260 210 220", stroke: "#5e3c25", strokeWidth: 5.5, delay: 100, duration: 900, type: "stem" },
      // Bark texture lines (Guratan batang)
      { d: "M 195 450 C 197 360 200 280 198 220", stroke: "#3d2314", strokeWidth: 1.8, delay: 300, duration: 900, type: "detail" },
      { d: "M 205 450 C 203 360 200 280 202 220", stroke: "#3d2314", strokeWidth: 1.8, delay: 400, duration: 900, type: "detail" },

      // Strong main branches (Dahan kuat)
      { d: "M 190 220 C 160 180 120 160 90 160", stroke: "#5e3c25", strokeWidth: 3.5, delay: 500, duration: 700, type: "stem" },
      { d: "M 210 220 C 240 180 280 160 310 160", stroke: "#5e3c25", strokeWidth: 3.5, delay: 600, duration: 700, type: "stem" },
      { d: "M 200 220 C 200 170 200 140 200 120", stroke: "#5e3c25", strokeWidth: 3, delay: 700, duration: 600, type: "stem" },

      // Broad Teak Leaves (Daun Jati Lebar Khas)
      // Leaf 1 (Left branch tip)
      { d: "M 90 160 C 60 130 70 90 100 120 C 120 140 110 150 90 160 Z", stroke: "#4a5d23", strokeWidth: 2, delay: 1000, duration: 600, type: "leaf" },
      { d: "M 90 160 Q 82 135 100 120", stroke: "#3a4f32", strokeWidth: 1.2, delay: 1600, duration: 400, type: "detail" },

      // Leaf 2 (Right branch tip)
      { d: "M 310 160 C 340 130 330 90 300 120 C 280 140 290 150 310 160 Z", stroke: "#4a5d23", strokeWidth: 2, delay: 1100, duration: 600, type: "leaf" },
      { d: "M 310 160 Q 318 135 300 120", stroke: "#3a4f32", strokeWidth: 1.2, delay: 1700, duration: 400, type: "detail" },

      // Leaf 3 (Top center)
      { d: "M 200 120 C 170 90 180 50 200 80 C 220 50 230 90 200 120 Z", stroke: "#4a5d23", strokeWidth: 2, delay: 1200, duration: 600, type: "leaf" },
      { d: "M 200 120 Q 200 95 200 80", stroke: "#3a4f32", strokeWidth: 1.2, delay: 1800, duration: 400, type: "detail" },

      // Leaf 4 (Left inner)
      { d: "M 140 190 C 110 170 120 130 150 150 C 165 160 160 180 140 190 Z", stroke: "#4a5d23", strokeWidth: 2, delay: 1300, duration: 600, type: "leaf" },
      // Leaf 5 (Right inner)
      { d: "M 260 190 C 290 170 280 130 250 150 C 235 160 240 180 260 190 Z", stroke: "#4a5d23", strokeWidth: 2, delay: 1400, duration: 600, type: "leaf" },

      // Ground (Tanah)
      { d: "M 130 470 C 170 480 230 480 270 470", stroke: "#5e3c25", strokeWidth: 2, delay: 800, duration: 500, type: "root" }
    ]
  };
}

function generatePohonUlin(): BotanicalSVGData {
  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Pohon Ulin",
    colorScheme: {
      stem: "#3d2314",
      leaf: "#2d4026",
      flower: "#c9a227",
      detail: "#1b2a1a",
    },
    paths: [
      // Massive columnar trunk (Batang ulin lurus tiang besi)
      { d: "M 175 480 L 180 180", stroke: "#3d2314", strokeWidth: 7.5, delay: 0, duration: 1000, type: "stem" },
      { d: "M 225 480 L 220 180", stroke: "#3d2314", strokeWidth: 7.5, delay: 100, duration: 1000, type: "stem" },
      { d: "M 190 480 L 192 180", stroke: "#1b2a1a", strokeWidth: 1.8, delay: 300, duration: 1000, type: "detail" },
      { d: "M 210 480 L 208 180", stroke: "#1b2a1a", strokeWidth: 1.8, delay: 400, duration: 1000, type: "detail" },

      // Buttress roots (Akar papan banir yang kokoh khas pohon ulin hutan primer)
      { d: "M 175 440 C 140 450 100 465 70 485", stroke: "#3d2314", strokeWidth: 5, delay: 500, duration: 600, type: "root" },
      { d: "M 225 440 C 260 450 300 465 330 485", stroke: "#3d2314", strokeWidth: 5, delay: 600, duration: 600, type: "root" },

      // Crown branches at the top (Dahan tinggi)
      { d: "M 180 180 C 150 140 110 120 70 120", stroke: "#3d2314", strokeWidth: 3.5, delay: 700, duration: 700, type: "stem" },
      { d: "M 220 180 C 250 140 290 120 330 120", stroke: "#3d2314", strokeWidth: 3.5, delay: 800, duration: 700, type: "stem" },
      { d: "M 200 180 L 200 100", stroke: "#3d2314", strokeWidth: 3, delay: 900, duration: 600, type: "stem" },

      // Dense heavy canopy (Tajuk daun lebat menutupi dahan tinggi)
      { d: "M 70 120 c -15 -10 -30 10 -15 25 c -10 15 10 25 20 15 c 15 10 25 -10 15 -20 c 10 -15 -10 -25 -20 -20 Z", stroke: "#2d4026", strokeWidth: 2, delay: 1100, duration: 800, type: "leaf" },
      { d: "M 330 120 c -15 -10 -30 10 -15 25 c -10 15 10 25 20 15 c 15 10 25 -10 15 -20 c 10 -15 -10 -25 -20 -20 Z", stroke: "#2d4026", strokeWidth: 2, delay: 1200, duration: 800, type: "leaf" },
      { d: "M 200 100 c -20 -15 -35 5 -20 25 c -15 15 5 25 20 15 c 20 15 35 -5 20 -25 c 15 -15 -5 -25 -20 -15 Z", stroke: "#2d4026", strokeWidth: 2, delay: 1300, duration: 800, type: "leaf" },

      // Extra top canopies
      { d: "M 130 130 c -15 -10 -30 10 -15 25 c -10 15 10 25 20 15 c 15 10 25 -10 15 -20 Z", stroke: "#2d4026", strokeWidth: 2, delay: 1400, duration: 800, type: "leaf" },
      { d: "M 270 130 c -15 -10 -30 10 -15 25 c -10 15 10 25 20 15 c 15 10 25 -10 15 -20 Z", stroke: "#2d4026", strokeWidth: 2, delay: 1500, duration: 800, type: "leaf" }
    ]
  };
}

// ─── 6. BUNGA MELATI (JASMINE) ──────────────────────────────────────────────
function generateMelati(): BotanicalSVGData {
  // Warna khas sketsa melati: outline hitam kecoklatan tua, isian abu hampir putih
  const stemColor  = "#3a2c1e"; // coklat tua hangat untuk batang & tangkai
  const leafColor  = "#3a5520"; // hijau daun melati medium
  const leafVein   = "#2b4018"; // tulang daun lebih tua
  const petalLine  = "#5c5047"; // outline kelopak: abu-coklat (sketsa pensil)
  const petalFill  = "#f7f3ed"; // isi kelopak: putih krem sangat lembut
  const sepalColor = "#4a6030"; // sepal/kelopak pelindung hijau tua
  const stamenCol  = "#c8a840"; // benang sari emas
  const budColor   = "#e8e0d0"; // kuncup sebelum mekar (sedikit krem)

  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Bunga Melati",
    colorScheme: {
      stem:   stemColor,
      leaf:   leafColor,
      flower: petalFill,
      detail: petalLine,
    },
    paths: [
      // ══════════════════════════════════════════════════════════
      // BAGIAN 1: BATANG UTAMA & RANTING (Twining Main Stem)
      // Batang meliuk halus dari bawah ke atas, khas tanaman rambat
      // ══════════════════════════════════════════════════════════
      // Batang utama: meliuk S dari bawah kanan ke kiri atas
      { d: "M 230 490 C 225 440 190 400 185 360 C 180 320 210 285 200 250 C 190 215 160 195 155 170 C 150 145 165 115 160 90", stroke: stemColor, strokeWidth: 2.8, delay: 0, duration: 1200, type: "stem" },
      // Cabang kanan bawah (menuju kluster bunga kanan)
      { d: "M 200 250 C 220 240 245 235 265 230", stroke: stemColor, strokeWidth: 2, delay: 400, duration: 500, type: "stem" },
      { d: "M 265 230 C 275 225 285 215 295 210", stroke: stemColor, strokeWidth: 1.5, delay: 900, duration: 400, type: "stem" },
      // Cabang kiri tengah (menuju bunga tengah & kuncup kiri)
      { d: "M 185 360 C 165 355 145 345 125 340", stroke: stemColor, strokeWidth: 1.8, delay: 200, duration: 500, type: "stem" },
      { d: "M 125 340 C 110 335 95 325 85 315", stroke: stemColor, strokeWidth: 1.4, delay: 700, duration: 400, type: "stem" },
      // Sub-ranting atas kiri (ke bunga kiri atas)
      { d: "M 160 90 C 150 80 138 70 130 60", stroke: stemColor, strokeWidth: 1.2, delay: 1000, duration: 350, type: "stem" },
      { d: "M 160 90 C 172 82 185 78 195 72", stroke: stemColor, strokeWidth: 1.2, delay: 1100, duration: 350, type: "stem" },
      // Sub-ranting untuk kuncup bawah kanan
      { d: "M 265 230 C 270 245 268 255 265 265", stroke: stemColor, strokeWidth: 1.2, delay: 1000, duration: 300, type: "stem" },

      // ══════════════════════════════════════════════════════════
      // BAGIAN 2: DAUN MELATI (Oval, Opposite, with clear veins)
      // Daun melati: oval agak bulat, sedikit bergelombang, tulang daun jelas
      // ══════════════════════════════════════════════════════════
      // Daun 1 — kiri bawah besar
      { d: "M 185 360 C 158 348 128 352 108 370 C 100 380 106 395 120 398 C 140 402 168 388 185 360 Z", stroke: leafColor, strokeWidth: 1.8, delay: 600, duration: 700, type: "leaf" },
      { d: "M 185 360 Q 145 376 108 370", stroke: leafVein, strokeWidth: 1, delay: 1300, duration: 450, type: "detail" },
      { d: "M 160 358 Q 157 368 150 372 M 140 360 Q 135 370 128 375 M 122 364 Q 118 373 113 378", stroke: leafVein, strokeWidth: 0.7, delay: 1750, duration: 400, type: "detail" },

      // Daun 2 — kanan bawah (pasangan daun 1)
      { d: "M 215 355 C 240 342 270 345 285 362 C 293 372 288 386 275 390 C 258 396 232 383 215 355 Z", stroke: leafColor, strokeWidth: 1.8, delay: 650, duration: 700, type: "leaf" },
      { d: "M 215 355 Q 252 371 285 362", stroke: leafVein, strokeWidth: 1, delay: 1350, duration: 450, type: "detail" },
      { d: "M 238 355 Q 243 365 250 370 M 258 357 Q 264 366 270 371 M 276 361 Q 280 369 282 375", stroke: leafVein, strokeWidth: 0.7, delay: 1800, duration: 400, type: "detail" },

      // Daun 3 — kiri tengah atas
      { d: "M 155 170 C 128 162 103 168 88 184 C 80 195 86 210 100 213 C 118 216 142 202 155 170 Z", stroke: leafColor, strokeWidth: 1.6, delay: 800, duration: 650, type: "leaf" },
      { d: "M 155 170 Q 118 188 88 184", stroke: leafVein, strokeWidth: 0.9, delay: 1450, duration: 400, type: "detail" },
      { d: "M 135 172 Q 130 182 124 187 M 115 175 Q 108 184 103 190", stroke: leafVein, strokeWidth: 0.6, delay: 1850, duration: 350, type: "detail" },

      // Daun 4 — kanan tengah atas (pasangan daun 3)
      { d: "M 200 250 C 222 240 248 243 260 258 C 266 268 260 282 247 285 C 230 288 210 274 200 250 Z", stroke: leafColor, strokeWidth: 1.6, delay: 850, duration: 650, type: "leaf" },
      { d: "M 200 250 Q 232 264 260 258", stroke: leafVein, strokeWidth: 0.9, delay: 1500, duration: 400, type: "detail" },
      { d: "M 220 251 Q 225 261 232 265 M 240 253 Q 246 262 252 266", stroke: leafVein, strokeWidth: 0.6, delay: 1900, duration: 350, type: "detail" },

      // Daun 5 — kecil di atas kiri, dekat bunga
      { d: "M 130 60 C 108 52 88 58 78 72 C 72 82 78 95 92 97 C 108 99 126 85 130 60 Z", stroke: leafColor, strokeWidth: 1.4, delay: 950, duration: 600, type: "leaf" },
      { d: "M 130 60 Q 102 76 78 72", stroke: leafVein, strokeWidth: 0.8, delay: 1550, duration: 380, type: "detail" },

      // Daun 6 — kecil kanan atas
      { d: "M 195 72 C 214 62 234 66 242 80 C 248 90 242 103 228 105 C 212 107 196 94 195 72 Z", stroke: leafColor, strokeWidth: 1.4, delay: 1000, duration: 600, type: "leaf" },
      { d: "M 195 72 Q 220 86 242 80", stroke: leafVein, strokeWidth: 0.8, delay: 1600, duration: 380, type: "detail" },

      // ══════════════════════════════════════════════════════════
      // BAGIAN 3: KUNCUP MELATI (Spiral Bud — bentuk torpedo)
      // Kuncup melati khas: panjang lonjong, kelopak melingkar spiral,
      // sepal runcing hijau di pangkal
      // ══════════════════════════════════════════════════════════
      // --- KUNCUP A (ujung ranting bawah kanan) ---
      // Sepal kuncup A
      { d: "M 263 268 C 258 265 265 260 268 262 Z M 263 268 C 268 263 272 262 273 265 Z M 263 268 C 262 262 266 258 270 259 Z", stroke: sepalColor, strokeWidth: 1, delay: 1600, duration: 350, type: "detail" },
      // Badan kuncup A (torpedo oval)
      { d: "M 263 268 C 256 255 255 240 262 228 C 269 216 276 214 280 220 C 284 226 283 242 278 254 C 273 266 268 270 263 268 Z", stroke: petalLine, strokeWidth: 1.4, delay: 1650, duration: 500, type: "flower" },
      // Garis spiral kuncup A (ciri khas kuncup melati)
      { d: "M 266 264 C 261 252 261 238 268 227", stroke: petalLine, strokeWidth: 0.7, delay: 2150, duration: 350, type: "detail" },
      { d: "M 271 265 C 268 254 267 240 272 229", stroke: petalLine, strokeWidth: 0.7, delay: 2200, duration: 350, type: "detail" },

      // --- KUNCUP B (ujung ranting kiri bawah) ---
      // Sepal kuncup B
      { d: "M 85 315 C 80 312 87 307 90 309 Z M 85 315 C 90 310 94 309 95 312 Z M 85 315 C 84 309 88 305 92 306 Z", stroke: sepalColor, strokeWidth: 1, delay: 1700, duration: 350, type: "detail" },
      // Badan kuncup B
      { d: "M 85 315 C 78 302 77 287 84 275 C 91 263 98 261 102 267 C 106 273 105 289 100 301 C 95 313 90 317 85 315 Z", stroke: petalLine, strokeWidth: 1.4, delay: 1750, duration: 500, type: "flower" },
      // Garis spiral kuncup B
      { d: "M 88 311 C 83 299 83 285 90 274", stroke: petalLine, strokeWidth: 0.7, delay: 2250, duration: 350, type: "detail" },
      { d: "M 93 312 C 90 301 89 287 94 276", stroke: petalLine, strokeWidth: 0.7, delay: 2300, duration: 350, type: "detail" },

      // ══════════════════════════════════════════════════════════
      // BAGIAN 4: BUNGA MELATI MEKAR (KLUSTER UTAMA — 3 bunga)
      // Setiap bunga: tabung kecil di tengah + 5–7 kelopak oval memancar
      // Diameter bunga ~55–65px. Pusat bunga: lingkaran kecil.
      // ══════════════════════════════════════════════════════════

      // ── BUNGA 1: MEKAR PENUH (pusat komposisi, atas tengah) ──
      // Center: (160, 90) — menghadap depan sempurna
      // Tabung tengah / corolla tube
      { d: "M 157 93 C 156 88 158 84 160 83 C 162 82 165 84 165 88 L 165 93 C 163 95 157 95 157 93 Z", stroke: sepalColor, strokeWidth: 1.2, delay: 2000, duration: 300, type: "detail" },
      // 6 kelopak oval memancar dari pusat (160, 90)
      // Kelopak 1 — atas
      { d: "M 160 90 C 153 80 150 65 157 52 C 162 42 168 42 170 52 C 173 64 168 80 160 90 Z", stroke: petalLine, strokeWidth: 1.5, delay: 2100, duration: 500, type: "flower" },
      // Kelopak 2 — kanan atas
      { d: "M 160 90 C 170 82 184 75 194 78 C 203 81 204 87 198 92 C 191 98 176 96 160 90 Z", stroke: petalLine, strokeWidth: 1.5, delay: 2200, duration: 500, type: "flower" },
      // Kelopak 3 — kanan bawah
      { d: "M 160 90 C 168 98 172 114 167 124 C 162 133 156 132 153 123 C 149 113 152 98 160 90 Z", stroke: petalLine, strokeWidth: 1.5, delay: 2300, duration: 500, type: "flower" },
      // Kelopak 4 — bawah
      { d: "M 160 90 C 152 100 140 110 128 110 C 118 109 115 103 120 96 C 126 89 140 88 160 90 Z", stroke: petalLine, strokeWidth: 1.5, delay: 2400, duration: 500, type: "flower" },
      // Kelopak 5 — kiri atas
      { d: "M 160 90 C 150 82 138 76 129 79 C 121 82 120 89 127 94 C 134 100 147 97 160 90 Z", stroke: petalLine, strokeWidth: 1.5, delay: 2500, duration: 500, type: "flower" },
      // Kelopak 6 — kiri (setengah tersembunyi)
      { d: "M 160 90 C 155 84 147 80 139 80 C 132 80 130 84 133 89 C 136 94 144 94 160 90 Z", stroke: petalLine, strokeWidth: 1.2, delay: 2600, duration: 450, type: "flower" },
      // Guratan tengah tiap kelopak (petal midrib) — Bunga 1
      { d: "M 160 90 Q 160 70 160 56", stroke: petalLine, strokeWidth: 0.6, delay: 2700, duration: 300, type: "detail" },
      { d: "M 160 90 Q 176 84 190 80", stroke: petalLine, strokeWidth: 0.6, delay: 2750, duration: 300, type: "detail" },
      { d: "M 160 90 Q 166 104 164 118", stroke: petalLine, strokeWidth: 0.6, delay: 2800, duration: 300, type: "detail" },
      { d: "M 160 90 Q 144 100 130 106", stroke: petalLine, strokeWidth: 0.6, delay: 2850, duration: 300, type: "detail" },
      { d: "M 160 90 Q 144 82 130 82", stroke: petalLine, strokeWidth: 0.6, delay: 2900, duration: 300, type: "detail" },
      // Benang sari Bunga 1
      { d: "M 160 90 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 Z", stroke: stamenCol, strokeWidth: 1.2, delay: 3200, duration: 200, type: "detail" },
      { d: "M 158 88 L 155 85 M 162 88 L 165 85 M 160 86 L 160 83 M 158 92 L 155 95 M 162 92 L 165 95", stroke: stamenCol, strokeWidth: 0.9, delay: 3300, duration: 200, type: "detail" },

      // ── BUNGA 2: MEKAR PENUH (kanan, sedikit lebih kecil) ──
      // Center: (295, 210) — menghadap depan, sedikit miring
      // Tabung corolla
      { d: "M 292 213 C 291 208 293 204 295 203 C 297 202 300 204 300 208 L 300 213 C 298 215 292 215 292 213 Z", stroke: sepalColor, strokeWidth: 1.1, delay: 2050, duration: 300, type: "detail" },
      // 6 kelopak oval (sedikit lebih kecil, r~28)
      // Kelopak 1 atas
      { d: "M 295 210 C 289 201 287 188 293 177 C 298 169 303 169 306 178 C 308 189 304 202 295 210 Z", stroke: petalLine, strokeWidth: 1.4, delay: 2150, duration: 480, type: "flower" },
      // Kelopak 2 kanan atas
      { d: "M 295 210 C 304 203 317 198 326 201 C 334 204 334 209 329 213 C 322 217 309 215 295 210 Z", stroke: petalLine, strokeWidth: 1.4, delay: 2250, duration: 480, type: "flower" },
      // Kelopak 3 kanan bawah
      { d: "M 295 210 C 303 217 307 231 303 240 C 299 248 293 247 290 239 C 287 230 290 217 295 210 Z", stroke: petalLine, strokeWidth: 1.4, delay: 2350, duration: 480, type: "flower" },
      // Kelopak 4 bawah
      { d: "M 295 210 C 289 219 278 227 268 226 C 260 225 258 219 263 213 C 268 207 281 207 295 210 Z", stroke: petalLine, strokeWidth: 1.4, delay: 2450, duration: 480, type: "flower" },
      // Kelopak 5 kiri atas
      { d: "M 295 210 C 287 203 276 198 268 201 C 261 204 261 210 267 215 C 273 220 285 217 295 210 Z", stroke: petalLine, strokeWidth: 1.4, delay: 2550, duration: 480, type: "flower" },
      // Kelopak 6 (tertutup sebagian)
      { d: "M 295 210 C 290 205 283 202 277 203 C 271 204 270 208 273 212 C 276 216 284 215 295 210 Z", stroke: petalLine, strokeWidth: 1.1, delay: 2650, duration: 450, type: "flower" },
      // Midrib Bunga 2
      { d: "M 295 210 Q 295 192 296 181 M 295 210 Q 310 205 322 203 M 295 210 Q 301 224 300 234 M 295 210 Q 281 218 272 222 M 295 210 Q 279 205 270 203", stroke: petalLine, strokeWidth: 0.6, delay: 2750, duration: 300, type: "detail" },
      // Benang sari Bunga 2
      { d: "M 295 210 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z", stroke: stamenCol, strokeWidth: 1.1, delay: 3250, duration: 200, type: "detail" },
      { d: "M 293 208 L 291 206 M 297 208 L 299 206 M 295 207 L 295 204 M 293 212 L 291 214 M 297 212 L 299 214", stroke: stamenCol, strokeWidth: 0.8, delay: 3350, duration: 200, type: "detail" },

      // ── BUNGA 3: SETENGAH MEKAR / PERSPEKTIF SAMPING ──
      // Posisi: (195, 72) — tampak sedikit menyamping, khas kluster
      // Sepal / corolla tube tampak samping (elips pendek)
      { d: "M 190 75 C 189 70 192 67 196 66 C 200 65 204 68 204 73 C 204 78 201 80 196 81 C 192 82 190 79 190 75 Z", stroke: sepalColor, strokeWidth: 1, delay: 2020, duration: 300, type: "detail" },
      // Kelopak tampak samping (hanya 4 yang terlihat, selebihnya tersembunyi)
      // Kelopak atas
      { d: "M 196 73 C 190 63 188 50 194 40 C 198 33 203 33 205 40 C 208 51 205 64 196 73 Z", stroke: petalLine, strokeWidth: 1.3, delay: 2120, duration: 460, type: "flower" },
      // Kelopak kanan
      { d: "M 196 73 C 205 67 217 64 225 68 C 232 71 232 77 226 80 C 219 84 207 80 196 73 Z", stroke: petalLine, strokeWidth: 1.3, delay: 2220, duration: 460, type: "flower" },
      // Kelopak kiri
      { d: "M 196 73 C 188 67 177 65 170 69 C 164 73 165 79 171 82 C 178 85 189 80 196 73 Z", stroke: petalLine, strokeWidth: 1.3, delay: 2320, duration: 460, type: "flower" },
      // Kelopak bawah
      { d: "M 196 73 C 200 82 200 94 196 102 C 192 109 188 108 187 101 C 185 93 189 81 196 73 Z", stroke: petalLine, strokeWidth: 1.3, delay: 2420, duration: 460, type: "flower" },
      // Kelopak kanan-bawah (tertutup sebagian)
      { d: "M 196 73 C 203 78 212 80 218 84 C 222 87 220 91 215 91 C 209 90 201 83 196 73 Z", stroke: petalLine, strokeWidth: 1.1, delay: 2520, duration: 440, type: "flower" },
      // Midrib Bunga 3
      { d: "M 196 73 Q 196 57 197 44 M 196 73 Q 208 69 220 71 M 196 73 Q 184 69 174 72 M 196 73 Q 196 85 196 97", stroke: petalLine, strokeWidth: 0.6, delay: 2700, duration: 300, type: "detail" },
      // Benang sari Bunga 3 (kecil)
      { d: "M 196 73 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z", stroke: stamenCol, strokeWidth: 1, delay: 3150, duration: 200, type: "detail" },
      { d: "M 194 71 L 192 69 M 198 71 L 200 69 M 196 70 L 196 67 M 194 75 L 192 77 M 198 75 L 200 77", stroke: stamenCol, strokeWidth: 0.8, delay: 3250, duration: 200, type: "detail" },

      // ══════════════════════════════════════════════════════════
      // BAGIAN 5: AKSEN AKHIR — Arsir & Tekstur Sketsa
      // Garis pendek tipis untuk memberi kesan sketsa tangan
      // ══════════════════════════════════════════════════════════
      // Arsir ringan pada batang utama
      { d: "M 228 485 Q 225 475 226 465 M 220 440 Q 218 430 220 420 M 212 395 Q 210 385 212 375 M 202 350 Q 200 340 202 330 M 194 305 Q 192 295 194 285 M 184 268 Q 183 260 185 252", stroke: stemColor, strokeWidth: 0.7, delay: 3400, duration: 600, type: "detail" },
      // Arsir vena tambahan daun 1
      { d: "M 172 362 Q 168 372 162 376 M 152 366 Q 147 375 143 379", stroke: leafVein, strokeWidth: 0.6, delay: 3500, duration: 400, type: "detail" },
      // Arsir vena tambahan daun 2
      { d: "M 228 361 Q 233 371 240 375 M 250 362 Q 256 371 262 375", stroke: leafVein, strokeWidth: 0.6, delay: 3550, duration: 400, type: "detail" },
    ]
  };
}

// ─── 6. CLASSIC FLOWERS (KENANGA, MAWAR, DLL) ───────────────────────────────
function generateMelatiOrClassicFlower(plantName: string): BotanicalSVGData {
  const isMelati = plantName.toLowerCase().includes("melati");
  const flowerColor = isMelati ? "#f4eedd" : "#c9a227";
  const leafColor = "#4a5d23";
  
  return {
    viewBox: "0 0 400 450",
    title: `Sketsa ${plantName}`,
    colorScheme: {
      stem: "#3d2e1f",
      leaf: leafColor,
      flower: flowerColor,
      detail: "#2b4010",
    },
    paths: [
      { d: "M 200 420 C 190 320 210 240 200 180", stroke: "#3d2e1f", strokeWidth: 3, delay: 0, duration: 900, type: "stem" },
      { d: "M 200 280 C 160 250 120 230 90 200", stroke: "#3d2e1f", strokeWidth: 2, delay: 600, duration: 700, type: "stem" },
      { d: "M 200 250 C 240 220 280 200 310 170", stroke: "#3d2e1f", strokeWidth: 2, delay: 700, duration: 700, type: "stem" },
      
      { d: "M 90 200 C 65 190 60 160 80 150 C 95 140 100 170 90 200 Z", stroke: leafColor, strokeWidth: 1.5, delay: 1200, duration: 700, type: "leaf" },
      { d: "M 310 170 C 335 160 340 130 320 120 C 305 110 300 140 310 170 Z", stroke: leafColor, strokeWidth: 1.5, delay: 1300, duration: 700, type: "leaf" },
      { d: "M 200 180 C 175 170 170 140 190 130 C 205 120 210 150 200 180 Z", stroke: leafColor, strokeWidth: 1.5, delay: 1400, duration: 700, type: "leaf" },
      
      { d: "M 200 130 C 190 110 210 110 200 130 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 1800, duration: 450, type: "flower" },
      { d: "M 200 130 C 220 120 220 140 200 130 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 1950, duration: 450, type: "flower" },
      { d: "M 200 130 C 210 150 190 150 200 130 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2100, duration: 450, type: "flower" },
      { d: "M 200 130 C 180 140 180 120 200 130 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2250, duration: 450, type: "flower" },
      { d: "M 200 130 C 190 135 210 145 200 130 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2400, duration: 450, type: "flower" },
      
      { d: "M 80 150 Z C 70 130 90 130 80 150 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2000, duration: 450, type: "flower" },
      { d: "M 80 150 C 100 140 100 160 80 150 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2150, duration: 450, type: "flower" },
      { d: "M 80 150 C 90 170 70 170 80 150 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2300, duration: 450, type: "flower" },
      { d: "M 80 150 C 60 160 60 140 80 150 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2450, duration: 450, type: "flower" },
      
      { d: "M 320 120 C 310 100 330 100 320 120 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2200, duration: 450, type: "flower" },
      { d: "M 320 120 C 340 110 340 130 320 120 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2350, duration: 450, type: "flower" },
      { d: "M 320 120 C 330 140 310 140 320 120 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2500, duration: 450, type: "flower" },
      { d: "M 320 120 C 300 130 300 110 320 120 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2650, duration: 450, type: "flower" },
      
      { d: "M 199 129 A 1 1 0 1 1 199 128 Z", stroke: "#e8bf45", strokeWidth: 1.5, delay: 2800, duration: 200, type: "detail" },
      { d: "M 79 149 A 1 1 0 1 1 79 148 Z", stroke: "#e8bf45", strokeWidth: 1.5, delay: 2900, duration: 200, type: "detail" },
      { d: "M 319 119 A 1 1 0 1 1 319 118 Z", stroke: "#e8bf45", strokeWidth: 1.5, delay: 3000, duration: 200, type: "detail" }
    ]
  };
}

// ─── 7. PROCEDURAL / GENERIC BOTANICAL ──────────────────────────────────────
function generateProceduralGeneric(plantName: string): BotanicalSVGData {
  const hash = getStringHash(plantName);
  
  const leafColors = ["#5a7a2a", "#4e6a27", "#6b8e23", "#3a5f25", "#3cb371", "#2e8b57"];
  const flowerColors = ["#c9a227", "#d87093", "#e07a5f", "#f4eedd", "#ffb703", "#fb8500", "#c084fc", "#e63946"];
  
  const leafColor = leafColors[hash % leafColors.length];
  const flowerColor = flowerColors[Math.floor(hash / 4) % flowerColors.length];
  
  const stemOffset1 = (hash % 40) - 20;
  const stemOffset2 = (Math.floor(hash / 8) % 40) - 20;
  
  return {
    viewBox: "0 0 400 500",
    title: `Sketsa ${plantName}`,
    colorScheme: {
      stem: "#4a5d23",
      leaf: leafColor,
      flower: flowerColor,
      detail: "#3a4a1a",
    },
    paths: [
      { d: `M 200 480 C ${200 + stemOffset1} 380 ${200 + stemOffset2} 280 200 160`, stroke: "#4a5d23", strokeWidth: 3, delay: 0, duration: 1200, type: "stem" },
      
      { d: `M 200 350 C 170 340 130 320 100 310`, stroke: "#4a5d23", strokeWidth: 2, delay: 700, duration: 800, type: "stem" },
      { d: `M 200 310 C 230 300 270 280 300 270`, stroke: "#4a5d23", strokeWidth: 2, delay: 900, duration: 800, type: "stem" },
      
      { d: `M 100 310 C 80 280 90 250 110 290 Z`, stroke: leafColor, strokeWidth: 1.5, delay: 1400, duration: 900, type: "leaf" },
      { d: `M 300 270 C 320 240 310 210 290 250 Z`, stroke: leafColor, strokeWidth: 1.5, delay: 1600, duration: 900, type: "leaf" },
      
      { d: `M 200 160 C 200 130 200 100 200 90`, stroke: "#4a5d23", strokeWidth: 2, delay: 1800, duration: 600, type: "stem" },
      
      { d: "M 200 90 C 180 70 160 50 155 35 C 150 20 160 10 170 15 C 180 20 190 40 200 65 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2300, duration: 700, type: "flower" },
      { d: "M 200 90 C 220 70 240 50 245 35 C 250 20 240 10 230 15 C 220 20 210 40 200 65 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2500, duration: 700, type: "flower" },
      { d: "M 200 90 C 175 80 150 80 135 70 C 120 60 120 45 130 40 C 140 35 160 50 175 65 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2700, duration: 700, type: "flower" },
      { d: "M 200 90 C 225 80 250 80 265 70 C 280 60 280 45 270 40 C 260 35 240 50 225 65 Z", stroke: flowerColor, strokeWidth: 1.5, delay: 2900, duration: 700, type: "flower" },
      
      { d: "M 197 88 A 3 3 0 1 1 197 87 Z", stroke: "#e8bf45", strokeWidth: 2, delay: 3500, duration: 400, type: "detail" }
    ]
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plantName } = body as { plantName: string };

    if (!plantName) {
      return NextResponse.json({ error: "Nama tanaman diperlukan" }, { status: 400 });
    }

    let svgData: BotanicalSVGData;
    const nameLower = plantName.toLowerCase();

    if (nameLower.includes("kantong semar") || nameLower.includes("nepenthes")) {
      svgData = generateKantongSemar();
    } else if (nameLower.includes("rafflesia") || nameLower.includes("bangkai") || nameLower.includes("patma")) {
      svgData = generateRafflesia();
    } else if (nameLower.includes("anggrek") || nameLower.includes("orchid")) {
      svgData = generateAnggrek();
    } else if (nameLower.includes("bambu") || nameLower.includes("bamboo") || nameLower.includes("rotan") || nameLower.includes("sagu")) {
      svgData = generateBambu();
    } else if (nameLower.includes("jati")) {
      svgData = generatePohonJati();
    } else if (nameLower.includes("aren")) {
      svgData = generatePohonAren();
    } else if (nameLower.includes("ulin")) {
      svgData = generatePohonUlin();
    } else if (
      nameLower.includes("pohon") || 
      nameLower.includes("cendana") || 
      nameLower.includes("meranti") || 
      nameLower.includes("karet") || 
      nameLower.includes("nangka") || 
      nameLower.includes("durian") || 
      nameLower.includes("lontar") ||
      nameLower.includes("sandalwood")
    ) {
      svgData = generateTree(plantName);
    } else if (nameLower.includes("melati")) {
      svgData = generateMelati();
    } else if (
      nameLower.includes("kenanga") || 
      nameLower.includes("bunga") || 
      nameLower.includes("mawar")
    ) {
      svgData = generateMelatiOrClassicFlower(plantName);
    } else {
      svgData = generateProceduralGeneric(plantName);
    }

    console.log(`[BotanicalArt] plantName: "${plantName}", matched style: "${svgData.title}"`);

    const totalDuration = Math.max(...svgData.paths.map((p) => p.delay + p.duration));

    return NextResponse.json({
      svgData,
      totalDuration,
      message: `Sketsa botani ${plantName} siap dilukis`,
    }, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      }
    });
  } catch (error) {
    console.error("Error di /api/botanical-art:", error);
    return NextResponse.json(
      { error: "Gagal memuat sketsa botani" },
      { status: 500 }
    );
  }
}
