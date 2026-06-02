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
      {
        d: "M 200 480 C 190 380 210 280 200 150",
        stroke: "#4a5d23",
        strokeWidth: 3,
        delay: 0,
        duration: 1100,
        type: "stem",
      },

      {
        d: "M 200 360 C 160 360 130 350 120 340",
        stroke: "#5a7a2a",
        strokeWidth: 2,
        delay: 600,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 120 340 C 110 330 90 350 90 380",
        stroke: "#4a5d23",
        strokeWidth: 1.2,
        delay: 1000,
        duration: 600,
        type: "stem",
      },
      {
        d: "M 90 380 C 70 380 65 430 85 440 C 105 450 110 410 95 385 Z",
        stroke: "#8b5a2b",
        strokeWidth: 1.5,
        delay: 1400,
        duration: 800,
        type: "detail",
      },
      {
        d: "M 85 378 C 75 365 100 360 95 380 Z",
        stroke: "#c9a227",
        strokeWidth: 1.2,
        delay: 2000,
        duration: 500,
        type: "detail",
      },

      {
        d: "M 200 300 C 240 300 270 290 280 280",
        stroke: "#5a7a2a",
        strokeWidth: 2,
        delay: 800,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 280 280 C 290 270 310 290 310 320",
        stroke: "#4a5d23",
        strokeWidth: 1.2,
        delay: 1200,
        duration: 600,
        type: "stem",
      },
      {
        d: "M 310 320 C 330 320 335 370 315 380 C 295 390 290 350 305 325 Z",
        stroke: "#8b5a2b",
        strokeWidth: 1.5,
        delay: 1600,
        duration: 800,
        type: "detail",
      },
      {
        d: "M 315 318 C 325 305 300 300 305 320 Z",
        stroke: "#c9a227",
        strokeWidth: 1.2,
        delay: 2200,
        duration: 500,
        type: "detail",
      },

      {
        d: "M 200 150 C 190 120 210 90 200 70 C 190 50 180 70 185 80",
        stroke: "#4a5d23",
        strokeWidth: 1.5,
        delay: 1100,
        duration: 800,
        type: "stem",
      },
      {
        d: "M 200 180 C 170 170 180 150 200 150 Z",
        stroke: "#5a7a2a",
        strokeWidth: 1.5,
        delay: 1500,
        duration: 500,
        type: "leaf",
      },
    ],
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
      {
        d: "M 200 200 m -35 0 a 35 35 0 1 0 70 0 a 35 35 0 1 0 -70 0 Z",
        stroke: "#5e3c25",
        strokeWidth: 3,
        delay: 0,
        duration: 800,
        type: "detail",
      },
      {
        d: "M 200 200 m -50 0 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0 Z",
        stroke: "#a04020",
        strokeWidth: 2,
        delay: 400,
        duration: 800,
        type: "detail",
      },

      {
        d: "M 170 160 C 130 80 270 80 230 160 Z",
        stroke: "#a04020",
        strokeWidth: 2.5,
        delay: 1000,
        duration: 700,
        type: "flower",
      },
      {
        d: "M 235 175 C 320 120 340 220 245 225 Z",
        stroke: "#a04020",
        strokeWidth: 2.5,
        delay: 1300,
        duration: 700,
        type: "flower",
      },
      {
        d: "M 225 240 C 280 320 170 330 180 248 Z",
        stroke: "#a04020",
        strokeWidth: 2.5,
        delay: 1600,
        duration: 700,
        type: "flower",
      },
      {
        d: "M 175 245 C 100 310 90 220 160 215 Z",
        stroke: "#a04020",
        strokeWidth: 2.5,
        delay: 1900,
        duration: 700,
        type: "flower",
      },
      {
        d: "M 155 205 C 80 150 140 90 170 155 Z",
        stroke: "#a04020",
        strokeWidth: 2.5,
        delay: 2200,
        duration: 700,
        type: "flower",
      },

      {
        d: "M 120 250 C 130 275 160 275 170 245",
        stroke: "#5e3c25",
        strokeWidth: 2,
        delay: 2700,
        duration: 500,
        type: "root",
      },
      {
        d: "M 230 245 C 240 275 270 275 280 250",
        stroke: "#5e3c25",
        strokeWidth: 2,
        delay: 2900,
        duration: 500,
        type: "root",
      },

      {
        d: "M 190 120 A 4 4 0 1 1 190 119 Z",
        stroke: "#e8bf45",
        strokeWidth: 2,
        delay: 3200,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 210 120 A 4 4 0 1 1 210 119 Z",
        stroke: "#e8bf45",
        strokeWidth: 2,
        delay: 3300,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 270 170 A 5 5 0 1 1 270 169 Z",
        stroke: "#e8bf45",
        strokeWidth: 2,
        delay: 3400,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 260 195 A 4 4 0 1 1 260 194 Z",
        stroke: "#e8bf45",
        strokeWidth: 2,
        delay: 3500,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 220 280 A 6 6 0 1 1 220 279 Z",
        stroke: "#e8bf45",
        strokeWidth: 2,
        delay: 3600,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 180 280 A 5 5 0 1 1 180 279 Z",
        stroke: "#e8bf45",
        strokeWidth: 2,
        delay: 3700,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 130 230 A 4 4 0 1 1 130 229 Z",
        stroke: "#e8bf45",
        strokeWidth: 2,
        delay: 3800,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 140 180 A 5 5 0 1 1 140 179 Z",
        stroke: "#e8bf45",
        strokeWidth: 2,
        delay: 3900,
        duration: 200,
        type: "detail",
      },
    ],
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
      {
        d: "M 100 460 C 110 330 180 210 280 160 C 310 145 330 150 350 165",
        stroke: "#4a5d23",
        strokeWidth: 3,
        delay: 0,
        duration: 1200,
        type: "stem",
      },

      {
        d: "M 100 450 C 40 430 30 360 60 410 C 80 440 95 445 100 450 Z",
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 700,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 100 450 C 160 430 180 380 150 420 C 130 445 110 448 100 450 Z",
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 900,
        duration: 700,
        type: "leaf",
      },

      {
        d: "M 180 250 C 170 200 190 200 180 250 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 1300,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 180 250 C 140 230 140 210 180 235 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 1500,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 180 250 C 220 230 220 210 180 235 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 1600,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 180 250 C 150 280 165 290 180 250 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 1700,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 180 250 C 210 280 195 290 180 250 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 1800,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 180 250 C 170 275 190 275 180 250 Z",
        stroke: "#e8bf45",
        strokeWidth: 1.5,
        delay: 1900,
        duration: 300,
        type: "detail",
      },

      {
        d: "M 260 190 C 250 140 270 140 260 190 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 1800,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 260 190 C 220 170 220 150 260 175 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 2000,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 260 190 C 300 170 300 150 260 175 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 2100,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 260 190 C 230 220 245 230 260 190 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 2200,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 260 190 C 290 220 275 230 260 190 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 2300,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 260 190 C 250 215 270 215 260 190 Z",
        stroke: "#e8bf45",
        strokeWidth: 1.5,
        delay: 2400,
        duration: 300,
        type: "detail",
      },

      {
        d: "M 320 150 C 310 100 330 100 320 150 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 2300,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 320 150 C 280 130 280 110 320 135 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 2500,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 320 150 C 360 130 360 110 320 135 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 2600,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 320 150 C 290 180 305 190 320 150 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 2700,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 320 150 C 350 180 335 190 320 150 Z",
        stroke: "#da70d6",
        strokeWidth: 1.5,
        delay: 2800,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 320 150 C 310 175 330 175 320 150 Z",
        stroke: "#e8bf45",
        strokeWidth: 1.5,
        delay: 2900,
        duration: 300,
        type: "detail",
      },
    ],
  };
}

// ─── 4. BAMBU PETUNG (BAMBOO) ────────────────────────────────────────────────
function generateBambu(): BotanicalSVGData {
  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Bambu Petung",
    colorScheme: {
      stem: "#8a9a5b",
      leaf: "#4a5d23",
      flower: "#2d4026",
      detail: "#2d4026",
    },
    paths: [
      {
        d: "M 160 480 L 157 410",
        stroke: "#8a9a5b",
        strokeWidth: 6,
        delay: 0,
        duration: 300,
        type: "stem",
      },
      {
        d: "M 154 410 C 151 409 163 409 160 410",
        stroke: "#2d4026",
        strokeWidth: 1.5,
        delay: 300,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 157 410 L 153 330",
        stroke: "#8a9a5b",
        strokeWidth: 5.5,
        delay: 400,
        duration: 300,
        type: "stem",
      },
      {
        d: "M 150 330 C 147 329 159 329 156 330",
        stroke: "#2d4026",
        strokeWidth: 1.5,
        delay: 700,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 153 330 L 148 240",
        stroke: "#8a9a5b",
        strokeWidth: 5,
        delay: 800,
        duration: 300,
        type: "stem",
      },
      {
        d: "M 145 240 C 142 239 154 239 151 240",
        stroke: "#2d4026",
        strokeWidth: 1.5,
        delay: 1100,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 148 240 L 142 140",
        stroke: "#8a9a5b",
        strokeWidth: 4.5,
        delay: 1200,
        duration: 400,
        type: "stem",
      },
      {
        d: "M 139 140 C 136 139 148 139 145 140",
        stroke: "#2d4026",
        strokeWidth: 1.5,
        delay: 1600,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 142 140 L 135 40",
        stroke: "#8a9a5b",
        strokeWidth: 4,
        delay: 1700,
        duration: 400,
        type: "stem",
      },

      {
        d: "M 240 480 L 243 390",
        stroke: "#8a9a5b",
        strokeWidth: 5.5,
        delay: 200,
        duration: 450,
        type: "stem",
      },
      {
        d: "M 240 390 C 237 389 249 389 246 390",
        stroke: "#2d4026",
        strokeWidth: 1.5,
        delay: 650,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 243 390 L 247 290",
        stroke: "#8a9a5b",
        strokeWidth: 5,
        delay: 750,
        duration: 450,
        type: "stem",
      },
      {
        d: "M 244 290 C 241 289 253 289 250 290",
        stroke: "#2d4026",
        strokeWidth: 1.5,
        delay: 1200,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 247 290 L 252 170",
        stroke: "#8a9a5b",
        strokeWidth: 4.5,
        delay: 1300,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 249 170 C 246 169 258 169 255 170",
        stroke: "#2d4026",
        strokeWidth: 1.5,
        delay: 1800,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 252 170 L 258 70",
        stroke: "#8a9a5b",
        strokeWidth: 4,
        delay: 1900,
        duration: 450,
        type: "stem",
      },

      {
        d: "M 151 240 C 120 230 100 240 80 250",
        stroke: "#8a9a5b",
        strokeWidth: 1.5,
        delay: 1300,
        duration: 300,
        type: "stem",
      },
      {
        d: "M 80 250 C 60 230 40 240 20 250 C 40 260 60 260 80 250 Z",
        stroke: "#4a5d23",
        strokeWidth: 1.2,
        delay: 1600,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 95 242 C 85 220 70 215 55 210 C 70 225 85 235 95 242 Z",
        stroke: "#4a5d23",
        strokeWidth: 1.2,
        delay: 1800,
        duration: 500,
        type: "leaf",
      },

      {
        d: "M 250 290 C 280 270 310 280 330 290",
        stroke: "#8a9a5b",
        strokeWidth: 1.5,
        delay: 1400,
        duration: 300,
        type: "stem",
      },
      {
        d: "M 330 290 C 360 280 380 290 395 300 C 375 310 355 310 330 290 Z",
        stroke: "#4a5d23",
        strokeWidth: 1.2,
        delay: 1700,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 300 283 C 320 260 340 255 360 250 C 340 265 320 275 300 283 Z",
        stroke: "#4a5d23",
        strokeWidth: 1.2,
        delay: 1900,
        duration: 500,
        type: "leaf",
      },
    ],
  };
}

// ─── 4b. ROTAN (CALAMUS) ─────────────────────────────────────────────────────
function generateRotan(): BotanicalSVGData {
  const stemColor = "#6b4226";
  const thornColor = "#4a2d14";
  const leafColor = "#3a5f25";
  const leafVein = "#2b4518";

  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Rotan",
    colorScheme: {
      stem: stemColor,
      leaf: leafColor,
      flower: "#c9a227",
      detail: thornColor,
    },
    paths: [
      // Batang rotan utama — merambat meliuk dari bawah kanan ke kiri atas
      {
        d: "M 330 480 C 310 420 280 380 240 340 C 200 300 170 260 150 210 C 130 160 120 110 130 60",
        stroke: stemColor,
        strokeWidth: 3.5,
        delay: 0,
        duration: 1400,
        type: "stem",
      },
      // Batang rotan kedua (paralel, lebih tipis)
      {
        d: "M 350 470 C 335 415 300 370 265 330 C 230 290 205 250 190 200 C 175 150 168 105 175 55",
        stroke: stemColor,
        strokeWidth: 2.5,
        delay: 200,
        duration: 1300,
        type: "stem",
      },
      // Tekstur ruas batang (buku-buku rotan)
      {
        d: "M 305 410 C 300 408 315 408 310 410",
        stroke: thornColor,
        strokeWidth: 2,
        delay: 400,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 265 340 C 260 338 275 338 270 340",
        stroke: thornColor,
        strokeWidth: 2,
        delay: 500,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 215 270 C 210 268 225 268 220 270",
        stroke: thornColor,
        strokeWidth: 2,
        delay: 600,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 170 200 C 165 198 180 198 175 200",
        stroke: thornColor,
        strokeWidth: 2,
        delay: 700,
        duration: 100,
        type: "detail",
      },
      {
        d: "M 140 130 C 135 128 150 128 145 130",
        stroke: thornColor,
        strokeWidth: 2,
        delay: 800,
        duration: 100,
        type: "detail",
      },

      // Duri-duri tajam khas rotan (berpasangan di setiap ruas)
      {
        d: "M 305 405 L 295 395 M 310 405 L 320 395",
        stroke: thornColor,
        strokeWidth: 1.5,
        delay: 900,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 265 335 L 255 325 M 270 335 L 280 325",
        stroke: thornColor,
        strokeWidth: 1.5,
        delay: 1000,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 215 265 L 205 255 M 220 265 L 230 255",
        stroke: thornColor,
        strokeWidth: 1.5,
        delay: 1100,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 170 195 L 160 185 M 175 195 L 185 185",
        stroke: thornColor,
        strokeWidth: 1.5,
        delay: 1200,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 140 125 L 130 115 M 145 125 L 155 115",
        stroke: thornColor,
        strokeWidth: 1.5,
        delay: 1300,
        duration: 300,
        type: "detail",
      },

      // Pelepah daun sirip menjari (khas palem merambat)
      // Pelepah 1 — kanan bawah
      {
        d: "M 280 370 C 310 350 340 340 370 345",
        stroke: leafColor,
        strokeWidth: 2.5,
        delay: 1400,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 310 352 L 325 335 M 330 348 L 348 332 M 350 345 L 370 330",
        stroke: leafColor,
        strokeWidth: 1.2,
        delay: 2000,
        duration: 400,
        type: "leaf",
      },
      {
        d: "M 310 352 L 320 370 M 330 348 L 342 368 M 350 345 L 365 362",
        stroke: leafColor,
        strokeWidth: 1.2,
        delay: 2100,
        duration: 400,
        type: "leaf",
      },

      // Pelepah 2 — kiri tengah
      {
        d: "M 195 250 C 160 235 120 230 80 240",
        stroke: leafColor,
        strokeWidth: 2.5,
        delay: 1500,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 155 238 L 140 218 M 130 234 L 112 215 M 105 236 L 88 220",
        stroke: leafColor,
        strokeWidth: 1.2,
        delay: 2200,
        duration: 400,
        type: "leaf",
      },
      {
        d: "M 155 238 L 145 258 M 130 234 L 118 255 M 105 236 L 90 255",
        stroke: leafColor,
        strokeWidth: 1.2,
        delay: 2300,
        duration: 400,
        type: "leaf",
      },

      // Pelepah 3 — kiri atas
      {
        d: "M 145 150 C 110 140 75 140 45 150",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 1600,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 110 142 L 100 125 M 85 142 L 72 126 M 65 145 L 50 130",
        stroke: leafColor,
        strokeWidth: 1,
        delay: 2400,
        duration: 400,
        type: "leaf",
      },
      {
        d: "M 110 142 L 102 160 M 85 142 L 75 162 M 65 145 L 52 163",
        stroke: leafColor,
        strokeWidth: 1,
        delay: 2500,
        duration: 400,
        type: "leaf",
      },

      // Pelepah 4 — kanan atas
      {
        d: "M 175 100 C 210 80 250 75 290 85",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 1700,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 215 82 L 228 65 M 245 78 L 260 62 M 270 80 L 288 66",
        stroke: leafColor,
        strokeWidth: 1,
        delay: 2600,
        duration: 400,
        type: "leaf",
      },
      {
        d: "M 215 82 L 222 100 M 245 78 L 255 98 M 270 80 L 282 98",
        stroke: leafColor,
        strokeWidth: 1,
        delay: 2700,
        duration: 400,
        type: "leaf",
      },

      // Flagellum (cambuk panjat khas rotan — ujung sulur panjang)
      {
        d: "M 130 60 C 115 40 100 25 80 15 C 65 8 55 12 50 20",
        stroke: stemColor,
        strokeWidth: 1.5,
        delay: 1800,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 50 20 L 42 12 M 50 20 L 55 10 M 50 20 L 46 28",
        stroke: thornColor,
        strokeWidth: 1,
        delay: 2800,
        duration: 300,
        type: "detail",
      },

      // Pohon inang (siluet batang tiang yang dirambati)
      {
        d: "M 360 480 L 362 30",
        stroke: "#8b7355",
        strokeWidth: 8,
        delay: 100,
        duration: 800,
        type: "stem",
      },
      {
        d: "M 355 480 L 358 30",
        stroke: "#7a6348",
        strokeWidth: 2,
        delay: 150,
        duration: 800,
        type: "detail",
      },
    ],
  };
}

// ─── 4c. KANTONG SEMAR PAPUA ─────────────────────────────────────────────────
function generateKantongSemarPapua(): BotanicalSVGData {
  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Kantong Semar Papua",
    colorScheme: {
      stem: "#4a5d23",
      leaf: "#5a7a2a",
      flower: "#8b1a1a",
      detail: "#3d1010",
    },
    paths: [
      // Batang utama — tebal kokoh khas pegunungan
      {
        d: "M 200 480 C 195 400 205 320 200 220",
        stroke: "#4a5d23",
        strokeWidth: 3.5,
        delay: 0,
        duration: 1000,
        type: "stem",
      },

      // Daun kiri bawah → menuju kantong kiri besar
      {
        d: "M 200 380 C 160 375 130 365 100 350",
        stroke: "#5a7a2a",
        strokeWidth: 2.5,
        delay: 500,
        duration: 600,
        type: "leaf",
      },
      // Kantong kiri besar — silinder kokoh khas Papua
      {
        d: "M 100 350 C 90 340 80 355 75 380",
        stroke: "#4a5d23",
        strokeWidth: 1.5,
        delay: 1100,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 75 380 C 60 385 50 430 65 450 C 80 470 105 465 110 440 C 115 415 105 390 80 385 Z",
        stroke: "#8b1a1a",
        strokeWidth: 2,
        delay: 1600,
        duration: 900,
        type: "detail",
      },
      // Bibir kantung bergelombang tebal merah tua
      {
        d: "M 75 378 C 65 365 85 358 95 370 C 105 358 115 365 105 378",
        stroke: "#3d1010",
        strokeWidth: 2.5,
        delay: 2500,
        duration: 600,
        type: "detail",
      },
      // Garis vertikal kantung (vena kantung)
      {
        d: "M 82 390 L 78 440 M 92 385 L 95 435 M 100 390 L 102 430",
        stroke: "#6b2020",
        strokeWidth: 0.8,
        delay: 2800,
        duration: 400,
        type: "detail",
      },
      // Tutup kantung kiri (peristome lid)
      {
        d: "M 72 370 C 60 350 50 345 55 340 C 60 335 80 340 90 355",
        stroke: "#8b1a1a",
        strokeWidth: 1.5,
        delay: 3100,
        duration: 500,
        type: "detail",
      },

      // Daun kanan → menuju kantong kanan
      {
        d: "M 200 310 C 240 305 280 295 310 280",
        stroke: "#5a7a2a",
        strokeWidth: 2.5,
        delay: 700,
        duration: 600,
        type: "leaf",
      },
      // Kantong kanan — lebih kecil
      {
        d: "M 310 280 C 320 270 325 285 330 310",
        stroke: "#4a5d23",
        strokeWidth: 1.5,
        delay: 1300,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 330 310 C 345 315 355 360 340 375 C 325 390 305 385 300 360 C 295 340 305 318 325 312 Z",
        stroke: "#8b1a1a",
        strokeWidth: 2,
        delay: 1800,
        duration: 900,
        type: "detail",
      },
      // Bibir kantung kanan
      {
        d: "M 328 308 C 338 296 322 290 312 300 C 302 290 295 296 305 308",
        stroke: "#3d1010",
        strokeWidth: 2.5,
        delay: 2700,
        duration: 600,
        type: "detail",
      },
      // Garis vertikal kantung kanan
      {
        d: "M 322 320 L 325 365 M 312 322 L 310 360",
        stroke: "#6b2020",
        strokeWidth: 0.8,
        delay: 3000,
        duration: 400,
        type: "detail",
      },

      // Daun-daun lonjong khas di atas
      {
        d: "M 200 280 C 170 270 160 240 175 225 C 190 210 200 230 200 280 Z",
        stroke: "#5a7a2a",
        strokeWidth: 1.5,
        delay: 900,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 200 250 C 230 240 240 210 225 195 C 210 180 200 200 200 250 Z",
        stroke: "#5a7a2a",
        strokeWidth: 1.5,
        delay: 1000,
        duration: 600,
        type: "leaf",
      },

      // Sulur tendril atas
      {
        d: "M 200 220 C 190 180 210 130 200 80 C 190 50 175 60 180 80",
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 1500,
        duration: 700,
        type: "stem",
      },

      // Batu kapur di bawah (habitat pegunungan gamping Papua)
      {
        d: "M 120 475 C 130 465 160 468 180 480 M 220 478 C 250 465 280 470 300 480",
        stroke: "#9e9685",
        strokeWidth: 2,
        delay: 200,
        duration: 500,
        type: "detail",
      },
      {
        d: "M 160 485 C 170 478 190 480 195 488 M 250 482 C 260 475 275 478 280 486",
        stroke: "#b0a898",
        strokeWidth: 1.5,
        delay: 300,
        duration: 400,
        type: "detail",
      },
    ],
  };
}

// ─── 4d. ANGGREK HITAM (Coelogyne pandurata) ─────────────────────────────────
function generateAnggrekHitam(): BotanicalSVGData {
  const stemColor = "#4a5d23";
  const pseudobulb = "#5a7a2a";
  const petalColor = "#8bc34a";
  const labelColor = "#1a1a1a";
  const labelVein = "#2d4d15";

  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Anggrek Hitam",
    colorScheme: {
      stem: stemColor,
      leaf: pseudobulb,
      flower: labelColor,
      detail: petalColor,
    },
    paths: [
      // Dahan pohon inang (anggrek epifit menempel di dahan)
      {
        d: "M 0 300 C 80 280 160 290 250 285 C 340 280 400 295 400 295",
        stroke: "#6b5040",
        strokeWidth: 8,
        delay: 0,
        duration: 800,
        type: "stem",
      },
      {
        d: "M 0 298 C 80 278 160 288 250 283 C 340 278 400 293 400 293",
        stroke: "#5a4030",
        strokeWidth: 2,
        delay: 50,
        duration: 800,
        type: "detail",
      },

      // Pseudobulb (umbi semu pipih khas Coelogyne)
      {
        d: "M 190 285 C 180 270 175 245 180 225 C 185 205 195 200 205 205 C 215 210 220 230 218 250 C 216 270 210 285 200 290 Z",
        stroke: pseudobulb,
        strokeWidth: 2,
        delay: 600,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 195 280 C 190 265 188 240 192 220",
        stroke: "#4a6a20",
        strokeWidth: 1,
        delay: 1300,
        duration: 400,
        type: "detail",
      },
      {
        d: "M 205 278 C 208 262 210 240 207 222",
        stroke: "#4a6a20",
        strokeWidth: 1,
        delay: 1350,
        duration: 400,
        type: "detail",
      },

      // Daun panjang dari pseudobulb
      {
        d: "M 185 220 C 170 190 140 160 100 140 C 80 132 70 138 75 150 C 80 162 110 170 140 175 Z",
        stroke: stemColor,
        strokeWidth: 2,
        delay: 800,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 185 220 Q 142 178 100 140",
        stroke: "#3a5018",
        strokeWidth: 0.8,
        delay: 1500,
        duration: 400,
        type: "detail",
      },

      {
        d: "M 215 218 C 235 188 265 158 310 140 C 330 132 340 138 335 150 C 330 162 300 168 270 172 Z",
        stroke: stemColor,
        strokeWidth: 2,
        delay: 900,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 215 218 Q 262 178 310 140",
        stroke: "#3a5018",
        strokeWidth: 0.8,
        delay: 1550,
        duration: 400,
        type: "detail",
      },

      // Tangkai bunga menjuntai
      {
        d: "M 200 285 C 195 310 180 340 160 370 C 140 400 120 420 110 430",
        stroke: stemColor,
        strokeWidth: 2,
        delay: 1000,
        duration: 800,
        type: "stem",
      },

      // ─── BUNGA ANGGREK HITAM ───
      // Sepal dorsal (atas)
      {
        d: "M 120 400 C 115 380 125 360 135 350 C 145 340 150 345 148 355 C 145 370 135 385 120 400 Z",
        stroke: petalColor,
        strokeWidth: 1.8,
        delay: 1700,
        duration: 550,
        type: "flower",
      },
      // Sepal lateral kiri
      {
        d: "M 120 400 C 100 395 82 405 72 418 C 65 428 68 435 78 432 C 90 428 105 418 120 400 Z",
        stroke: petalColor,
        strokeWidth: 1.8,
        delay: 1800,
        duration: 550,
        type: "flower",
      },
      // Sepal lateral kanan
      {
        d: "M 120 400 C 140 395 158 405 168 418 C 175 428 172 435 162 432 C 150 428 135 418 120 400 Z",
        stroke: petalColor,
        strokeWidth: 1.8,
        delay: 1900,
        duration: 550,
        type: "flower",
      },
      // Petal atas kiri
      {
        d: "M 120 400 C 105 388 90 378 82 368 C 76 360 80 356 88 360 C 98 366 110 380 120 400 Z",
        stroke: petalColor,
        strokeWidth: 1.5,
        delay: 2000,
        duration: 500,
        type: "flower",
      },
      // Petal atas kanan
      {
        d: "M 120 400 C 135 388 150 378 158 368 C 164 360 160 356 152 360 C 142 366 130 380 120 400 Z",
        stroke: petalColor,
        strokeWidth: 1.5,
        delay: 2100,
        duration: 500,
        type: "flower",
      },

      // LABELLUM HITAM (ciri khas anggrek hitam — beludru gelap)
      {
        d: "M 120 400 C 110 415 95 440 90 455 C 85 470 90 478 100 475 C 110 472 125 458 130 442 C 135 428 132 412 120 400 Z",
        stroke: labelColor,
        strokeWidth: 2.5,
        delay: 2200,
        duration: 700,
        type: "flower",
      },
      // Garis hijau di labellum
      {
        d: "M 115 410 C 110 425 105 445 100 460",
        stroke: labelVein,
        strokeWidth: 1.2,
        delay: 2900,
        duration: 400,
        type: "detail",
      },
      {
        d: "M 125 408 C 122 425 118 445 112 460",
        stroke: labelVein,
        strokeWidth: 1.2,
        delay: 3000,
        duration: 400,
        type: "detail",
      },
      {
        d: "M 120 412 C 118 430 112 452 107 468",
        stroke: labelVein,
        strokeWidth: 0.8,
        delay: 3100,
        duration: 400,
        type: "detail",
      },

      // Gerigi/rambut labellum
      {
        d: "M 95 448 L 88 452 M 98 455 L 90 460 M 102 462 L 95 468",
        stroke: labelColor,
        strokeWidth: 1,
        delay: 3200,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 125 445 L 132 450 M 122 452 L 130 458 M 118 460 L 125 465",
        stroke: labelColor,
        strokeWidth: 1,
        delay: 3300,
        duration: 300,
        type: "detail",
      },

      // Kolom benang sari
      {
        d: "M 118 398 C 117 394 119 390 121 389 C 123 388 125 390 124 394 L 123 398",
        stroke: "#c9a227",
        strokeWidth: 1.2,
        delay: 3400,
        duration: 200,
        type: "detail",
      },

      // Akar udara menggantung dari dahan
      {
        d: "M 160 290 C 165 320 162 360 158 390",
        stroke: "#8b7355",
        strokeWidth: 1,
        delay: 400,
        duration: 600,
        type: "root",
      },
      {
        d: "M 240 288 C 245 315 242 350 238 380",
        stroke: "#8b7355",
        strokeWidth: 1,
        delay: 450,
        duration: 600,
        type: "root",
      },
      {
        d: "M 300 282 C 305 310 302 340 298 365",
        stroke: "#8b7355",
        strokeWidth: 1,
        delay: 500,
        duration: 600,
        type: "root",
      },
    ],
  };
}

// ─── 4e. POHON CENDANA (Sandalwood) ──────────────────────────────────────────
function generatePohonCendana(): BotanicalSVGData {
  const barkColor = "#8b6f47";
  const barkDark = "#5e4a2d";
  const leafColor = "#5a7a3a";
  const leafSmall = "#6b8a4a";

  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Pohon Cendana",
    colorScheme: {
      stem: barkColor,
      leaf: leafColor,
      flower: "#c9a227",
      detail: barkDark,
    },
    paths: [
      // Batang cendana — relatif ramping, kulit abu kecoklatan halus
      {
        d: "M 190 475 C 192 390 195 310 193 250",
        stroke: barkColor,
        strokeWidth: 4,
        delay: 0,
        duration: 900,
        type: "stem",
      },
      {
        d: "M 210 475 C 208 390 205 310 207 250",
        stroke: barkColor,
        strokeWidth: 4,
        delay: 80,
        duration: 900,
        type: "stem",
      },
      // Tekstur kulit halus
      {
        d: "M 198 470 C 200 400 202 330 200 255",
        stroke: barkDark,
        strokeWidth: 1.2,
        delay: 250,
        duration: 800,
        type: "detail",
      },

      // Akar hemiparasit — akar menyebar mencari inang
      {
        d: "M 190 460 C 160 465 120 470 80 478",
        stroke: barkColor,
        strokeWidth: 3,
        delay: 350,
        duration: 600,
        type: "root",
      },
      {
        d: "M 210 460 C 240 465 280 470 320 478",
        stroke: barkColor,
        strokeWidth: 3,
        delay: 400,
        duration: 600,
        type: "root",
      },
      // Akar haustoria (penghisap) ke inang
      {
        d: "M 120 472 C 115 465 108 468 105 475 M 280 474 C 285 467 292 470 295 477",
        stroke: "#a0522d",
        strokeWidth: 1.5,
        delay: 900,
        duration: 400,
        type: "detail",
      },
      // Label akar parasit kecil
      {
        d: "M 105 475 C 100 472 96 475 95 480 M 295 477 C 300 474 304 477 305 482",
        stroke: "#a0522d",
        strokeWidth: 1,
        delay: 1000,
        duration: 300,
        type: "detail",
      },

      // Cabang utama
      {
        d: "M 193 250 C 170 220 140 195 115 180",
        stroke: barkColor,
        strokeWidth: 3,
        delay: 500,
        duration: 700,
        type: "stem",
      },
      {
        d: "M 207 250 C 230 220 260 195 285 180",
        stroke: barkColor,
        strokeWidth: 3,
        delay: 550,
        duration: 700,
        type: "stem",
      },
      {
        d: "M 200 250 C 200 210 200 180 200 150",
        stroke: barkColor,
        strokeWidth: 2.5,
        delay: 600,
        duration: 600,
        type: "stem",
      },

      // Sub-ranting
      {
        d: "M 115 180 C 100 165 85 155 70 150",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 700,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 115 180 C 120 160 125 140 120 120",
        stroke: barkColor,
        strokeWidth: 1.5,
        delay: 750,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 285 180 C 300 165 315 155 330 150",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 800,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 285 180 C 280 160 275 140 280 120",
        stroke: barkColor,
        strokeWidth: 1.5,
        delay: 850,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 200 150 C 185 130 170 115 160 100",
        stroke: barkColor,
        strokeWidth: 1.5,
        delay: 900,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 200 150 C 215 130 230 115 240 100",
        stroke: barkColor,
        strokeWidth: 1.5,
        delay: 950,
        duration: 500,
        type: "stem",
      },

      // Daun cendana — kecil oval berpasangan (opposite), berukuran mungil
      // Pasangan kiri
      {
        d: "M 70 150 C 55 140 50 125 60 118 C 70 111 78 125 70 150 Z",
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1200,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 70 150 C 85 140 90 125 80 118 C 70 111 62 125 70 150 Z",
        stroke: leafSmall,
        strokeWidth: 1.5,
        delay: 1250,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 120 120 C 105 110 100 95 110 88 C 120 81 128 95 120 120 Z",
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1300,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 120 120 C 135 110 140 95 130 88 C 120 81 112 95 120 120 Z",
        stroke: leafSmall,
        strokeWidth: 1.5,
        delay: 1350,
        duration: 500,
        type: "leaf",
      },
      // Pasangan kanan
      {
        d: "M 330 150 C 345 140 350 125 340 118 C 330 111 322 125 330 150 Z",
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1400,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 330 150 C 315 140 310 125 320 118 C 330 111 338 125 330 150 Z",
        stroke: leafSmall,
        strokeWidth: 1.5,
        delay: 1450,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 280 120 C 295 110 300 95 290 88 C 280 81 272 95 280 120 Z",
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1500,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 280 120 C 265 110 260 95 270 88 C 280 81 288 95 280 120 Z",
        stroke: leafSmall,
        strokeWidth: 1.5,
        delay: 1550,
        duration: 500,
        type: "leaf",
      },
      // Pasangan atas
      {
        d: "M 160 100 C 145 90 140 75 150 68 C 160 61 168 75 160 100 Z",
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1600,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 160 100 C 175 90 180 75 170 68 C 160 61 152 75 160 100 Z",
        stroke: leafSmall,
        strokeWidth: 1.5,
        delay: 1650,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 240 100 C 225 90 220 75 230 68 C 240 61 248 75 240 100 Z",
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1700,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 240 100 C 255 90 260 75 250 68 C 240 61 232 75 240 100 Z",
        stroke: leafSmall,
        strokeWidth: 1.5,
        delay: 1750,
        duration: 500,
        type: "leaf",
      },

      // Tulang daun tengah
      {
        d: "M 70 150 Q 60 135 60 118 M 120 120 Q 110 105 110 88 M 330 150 Q 340 135 340 118 M 280 120 Q 290 105 290 88",
        stroke: leafColor,
        strokeWidth: 0.6,
        delay: 1900,
        duration: 400,
        type: "detail",
      },

      // Aura aroma kayu harum (lingkaran tipis transparan)
      {
        d: "M 200 350 m -25 0 a 25 25 0 1 0 50 0 a 25 25 0 1 0 -50 0 Z",
        stroke: "#c9a227",
        strokeWidth: 0.8,
        delay: 2200,
        duration: 600,
        type: "detail",
      },
      {
        d: "M 200 350 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0 Z",
        stroke: "#c9a227",
        strokeWidth: 0.5,
        delay: 2400,
        duration: 600,
        type: "detail",
      },
    ],
  };
}

// ─── 4f. POHON MERANTI (Shorea) ──────────────────────────────────────────────
function generatePohonMeranti(): BotanicalSVGData {
  const barkColor = "#6b4226";
  const barkDetail = "#4a2d14";
  const leafColor = "#2d5016";
  const wingColor = "#8b6f47";

  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Pohon Meranti",
    colorScheme: {
      stem: barkColor,
      leaf: leafColor,
      flower: wingColor,
      detail: barkDetail,
    },
    paths: [
      // Batang meranti — SANGAT lurus tinggi, bebas cabang sampai puncak (ciri khas Dipterocarp)
      {
        d: "M 185 480 L 188 140",
        stroke: barkColor,
        strokeWidth: 8,
        delay: 0,
        duration: 1200,
        type: "stem",
      },
      {
        d: "M 215 480 L 212 140",
        stroke: barkColor,
        strokeWidth: 8,
        delay: 80,
        duration: 1200,
        type: "stem",
      },
      // Guratan kulit retak khas Shorea
      {
        d: "M 195 480 L 196 150",
        stroke: barkDetail,
        strokeWidth: 2,
        delay: 200,
        duration: 1100,
        type: "detail",
      },
      {
        d: "M 205 480 L 204 150",
        stroke: barkDetail,
        strokeWidth: 2,
        delay: 250,
        duration: 1100,
        type: "detail",
      },
      // Kulit retak horizontal
      {
        d: "M 186 420 L 214 420 M 186 360 L 214 360 M 187 300 L 213 300 M 188 240 L 212 240",
        stroke: barkDetail,
        strokeWidth: 1,
        delay: 400,
        duration: 500,
        type: "detail",
      },

      // Akar banir (buttress) — ciri khas pohon hutan primer
      {
        d: "M 185 440 C 150 455 110 470 70 485",
        stroke: barkColor,
        strokeWidth: 4,
        delay: 300,
        duration: 600,
        type: "root",
      },
      {
        d: "M 185 440 C 170 450 155 460 145 470",
        stroke: barkColor,
        strokeWidth: 3,
        delay: 350,
        duration: 500,
        type: "root",
      },
      {
        d: "M 215 440 C 250 455 290 470 330 485",
        stroke: barkColor,
        strokeWidth: 4,
        delay: 380,
        duration: 600,
        type: "root",
      },
      {
        d: "M 215 440 C 230 450 245 460 255 470",
        stroke: barkColor,
        strokeWidth: 3,
        delay: 420,
        duration: 500,
        type: "root",
      },

      // Cabang hanya di puncak (payung tinggi)
      {
        d: "M 188 140 C 160 110 120 90 80 85",
        stroke: barkColor,
        strokeWidth: 3,
        delay: 700,
        duration: 700,
        type: "stem",
      },
      {
        d: "M 212 140 C 240 110 280 90 320 85",
        stroke: barkColor,
        strokeWidth: 3,
        delay: 750,
        duration: 700,
        type: "stem",
      },
      {
        d: "M 200 140 C 200 100 200 75 200 55",
        stroke: barkColor,
        strokeWidth: 2.5,
        delay: 800,
        duration: 600,
        type: "stem",
      },
      {
        d: "M 200 140 C 170 120 140 110 120 108",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 850,
        duration: 600,
        type: "stem",
      },
      {
        d: "M 200 140 C 230 120 260 110 280 108",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 900,
        duration: 600,
        type: "stem",
      },

      // Tajuk daun payung lebar di puncak
      {
        d: "M 80 85 c -20 -10 -30 15 -15 25 c -10 15 10 25 20 15 c 15 8 25 -10 15 -20 c 5 -15 -10 -25 -20 -20 Z",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 1200,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 120 108 c -15 -12 -28 5 -15 20 c -12 12 5 22 18 14 c 14 8 22 -8 12 -18 Z",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 1300,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 200 55 c -20 -15 -35 5 -20 25 c -15 15 5 25 20 15 c 20 15 35 -5 20 -25 c 10 -15 -5 -20 -20 -15 Z",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 1400,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 280 108 c -15 -12 -28 5 -15 20 c -12 12 5 22 18 14 c 14 8 22 -8 12 -18 Z",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 1500,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 320 85 c -20 -10 -30 15 -15 25 c -10 15 10 25 20 15 c 15 8 25 -10 15 -20 c 5 -15 -10 -25 -20 -20 Z",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 1600,
        duration: 800,
        type: "leaf",
      },

      // ─── Buah Samara Bersayap (ciri khas Dipterocarpaceae) ───
      // Buah bersayap 1 — jatuh berputar
      {
        d: "M 150 160 C 148 170 145 180 142 190",
        stroke: wingColor,
        strokeWidth: 1.5,
        delay: 2000,
        duration: 500,
        type: "flower",
      },
      {
        d: "M 142 190 C 130 195 125 188 128 182 C 131 176 140 178 142 190 Z",
        stroke: wingColor,
        strokeWidth: 1.2,
        delay: 2400,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 142 190 C 150 200 155 215 152 230",
        stroke: wingColor,
        strokeWidth: 1,
        delay: 2500,
        duration: 400,
        type: "detail",
      },
      {
        d: "M 142 190 C 134 200 128 215 130 230",
        stroke: wingColor,
        strokeWidth: 1,
        delay: 2550,
        duration: 400,
        type: "detail",
      },

      // Buah bersayap 2
      {
        d: "M 260 155 C 265 165 268 175 270 185",
        stroke: wingColor,
        strokeWidth: 1.5,
        delay: 2100,
        duration: 500,
        type: "flower",
      },
      {
        d: "M 270 185 C 282 190 287 183 284 177 C 281 171 272 173 270 185 Z",
        stroke: wingColor,
        strokeWidth: 1.2,
        delay: 2600,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 270 185 C 278 195 282 210 280 225",
        stroke: wingColor,
        strokeWidth: 1,
        delay: 2700,
        duration: 400,
        type: "detail",
      },
      {
        d: "M 270 185 C 262 195 258 210 260 225",
        stroke: wingColor,
        strokeWidth: 1,
        delay: 2750,
        duration: 400,
        type: "detail",
      },

      // Buah bersayap 3 (kecil, jatuh lebih rendah)
      {
        d: "M 200 170 C 202 185 205 200 203 215",
        stroke: wingColor,
        strokeWidth: 1.2,
        delay: 2200,
        duration: 500,
        type: "flower",
      },
      {
        d: "M 203 215 C 195 222 190 218 192 212 C 194 206 201 208 203 215 Z",
        stroke: wingColor,
        strokeWidth: 1,
        delay: 2800,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 203 215 C 208 225 210 240 207 255",
        stroke: wingColor,
        strokeWidth: 0.8,
        delay: 2900,
        duration: 400,
        type: "detail",
      },
      {
        d: "M 203 215 C 198 225 195 240 197 255",
        stroke: wingColor,
        strokeWidth: 0.8,
        delay: 2950,
        duration: 400,
        type: "detail",
      },

      // Damar/resin menetes dari batang
      {
        d: "M 198 320 C 196 328 197 335 200 340 C 203 335 204 328 202 320",
        stroke: "#c9a227",
        strokeWidth: 1.5,
        delay: 1800,
        duration: 400,
        type: "detail",
      },
    ],
  };
}

// ─── 4g. PANDAN WANGI ────────────────────────────────────────────────────────
function generatePandanWangi(): BotanicalSVGData {
  const leafColor = "#3a8a28";
  const leafDark = "#2a6a18";
  const rootColor = "#6b5040";

  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Pandan Wangi",
    colorScheme: {
      stem: rootColor,
      leaf: leafColor,
      flower: "#c9a227",
      detail: leafDark,
    },
    paths: [
      // Pangkal batang pendek
      {
        d: "M 195 380 L 195 340 M 205 380 L 205 340",
        stroke: leafDark,
        strokeWidth: 3,
        delay: 0,
        duration: 600,
        type: "stem",
      },

      // Akar tunjang (prop roots) — ciri khas pandan
      {
        d: "M 195 380 C 175 400 150 430 130 470",
        stroke: rootColor,
        strokeWidth: 3,
        delay: 200,
        duration: 600,
        type: "root",
      },
      {
        d: "M 205 380 C 225 400 250 430 270 470",
        stroke: rootColor,
        strokeWidth: 3,
        delay: 250,
        duration: 600,
        type: "root",
      },
      {
        d: "M 198 385 C 190 410 185 440 185 480",
        stroke: rootColor,
        strokeWidth: 2.5,
        delay: 300,
        duration: 600,
        type: "root",
      },
      {
        d: "M 202 385 C 210 410 215 440 215 480",
        stroke: rootColor,
        strokeWidth: 2.5,
        delay: 350,
        duration: 600,
        type: "root",
      },
      // Akar kecil di ujung
      {
        d: "M 130 470 C 125 475 120 480 115 485 M 130 470 C 132 478 135 485 134 490",
        stroke: rootColor,
        strokeWidth: 1,
        delay: 800,
        duration: 300,
        type: "root",
      },
      {
        d: "M 270 470 C 275 475 280 480 285 485 M 270 470 C 268 478 265 485 266 490",
        stroke: rootColor,
        strokeWidth: 1,
        delay: 850,
        duration: 300,
        type: "root",
      },

      // Daun pandan — panjang seperti pedang, memancar dari pucuk (rosette)
      // Daun 1 — kiri jauh
      {
        d: "M 200 340 C 170 310 120 260 50 220 C 40 215 35 220 40 228 C 48 238 100 270 160 310 Z",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 600,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 200 340 Q 120 278 50 220",
        stroke: leafDark,
        strokeWidth: 0.8,
        delay: 1400,
        duration: 500,
        type: "detail",
      },

      // Daun 2 — kiri atas
      {
        d: "M 200 340 C 175 300 140 240 100 170 C 95 162 88 165 92 175 C 100 195 150 268 190 320 Z",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 700,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 200 340 Q 148 252 100 170",
        stroke: leafDark,
        strokeWidth: 0.8,
        delay: 1500,
        duration: 500,
        type: "detail",
      },

      // Daun 3 — tengah atas
      {
        d: "M 200 340 C 198 290 195 220 190 140 C 188 130 192 125 198 132 C 205 145 203 230 202 310 Z",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 750,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 200 340 Q 196 240 190 140",
        stroke: leafDark,
        strokeWidth: 0.8,
        delay: 1550,
        duration: 500,
        type: "detail",
      },

      // Daun 4 — kanan atas
      {
        d: "M 200 340 C 225 300 260 240 300 170 C 305 162 312 165 308 175 C 300 195 250 268 210 320 Z",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 800,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 200 340 Q 252 252 300 170",
        stroke: leafDark,
        strokeWidth: 0.8,
        delay: 1600,
        duration: 500,
        type: "detail",
      },

      // Daun 5 — kanan jauh
      {
        d: "M 200 340 C 230 310 280 260 350 220 C 360 215 365 220 360 228 C 352 238 300 270 240 310 Z",
        stroke: leafColor,
        strokeWidth: 2,
        delay: 850,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 200 340 Q 280 278 350 220",
        stroke: leafDark,
        strokeWidth: 0.8,
        delay: 1650,
        duration: 500,
        type: "detail",
      },

      // Daun 6 — kiri bawah
      {
        d: "M 200 340 C 175 345 130 355 70 370 C 60 373 58 380 65 380 C 78 378 140 360 190 345 Z",
        stroke: "#4a9a38",
        strokeWidth: 1.8,
        delay: 900,
        duration: 700,
        type: "leaf",
      },

      // Daun 7 — kanan bawah
      {
        d: "M 200 340 C 225 345 270 355 330 370 C 340 373 342 380 335 380 C 322 378 260 360 210 345 Z",
        stroke: "#4a9a38",
        strokeWidth: 1.8,
        delay: 950,
        duration: 700,
        type: "leaf",
      },

      // Garis aroma harum memancar (aura wangi)
      {
        d: "M 200 320 C 195 312 205 312 200 320",
        stroke: "#c9a227",
        strokeWidth: 0.6,
        delay: 1800,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 192 310 C 188 300 198 298 194 308",
        stroke: "#c9a227",
        strokeWidth: 0.5,
        delay: 1900,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 208 310 C 212 300 202 298 206 308",
        stroke: "#c9a227",
        strokeWidth: 0.5,
        delay: 2000,
        duration: 300,
        type: "detail",
      },
    ],
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
      {
        d: "M 180 470 C 182 380 185 320 180 280",
        stroke: barkColor,
        strokeWidth: 4,
        delay: 0,
        duration: 1000,
        type: "stem",
      },
      {
        d: "M 220 470 C 218 380 215 320 220 280",
        stroke: barkColor,
        strokeWidth: 4,
        delay: 100,
        duration: 1000,
        type: "stem",
      },
      {
        d: "M 193 470 C 195 385 197 325 195 280",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 200,
        duration: 1000,
        type: "detail",
      },
      {
        d: "M 207 470 C 205 385 203 325 205 280",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 300,
        duration: 1000,
        type: "detail",
      },

      // --- Akar ---
      {
        d: "M 180 460 C 160 470 140 480 120 488",
        stroke: barkColor,
        strokeWidth: 3.5,
        delay: 400,
        duration: 600,
        type: "root",
      },
      {
        d: "M 193 465 C 180 475 165 485 150 492",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 450,
        duration: 600,
        type: "root",
      },
      {
        d: "M 220 460 C 240 470 260 480 280 488",
        stroke: barkColor,
        strokeWidth: 3.5,
        delay: 500,
        duration: 600,
        type: "root",
      },
      {
        d: "M 207 465 C 220 475 235 485 250 492",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 550,
        duration: 600,
        type: "root",
      },

      // --- Cabang Utama ---
      {
        d: "M 180 280 C 150 260 120 240 100 200",
        stroke: barkColor,
        strokeWidth: 3.5,
        delay: 600,
        duration: 800,
        type: "stem",
      },
      {
        d: "M 220 280 C 250 260 280 240 300 200",
        stroke: barkColor,
        strokeWidth: 3.5,
        delay: 650,
        duration: 800,
        type: "stem",
      },
      {
        d: "M 200 280 C 205 240 195 200 200 160",
        stroke: barkColor,
        strokeWidth: 3,
        delay: 700,
        duration: 800,
        type: "stem",
      },

      // --- Ranting/Twig ---
      {
        d: "M 100 200 C 80 180 60 170 50 150",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 800,
        duration: 800,
        type: "stem",
      },
      {
        d: "M 100 200 C 110 180 120 160 115 130",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 900,
        duration: 800,
        type: "stem",
      },
      {
        d: "M 300 200 C 290 180 280 160 285 130",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 850,
        duration: 800,
        type: "stem",
      },
      {
        d: "M 300 200 C 320 180 340 170 350 150",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 950,
        duration: 800,
        type: "stem",
      },
      {
        d: "M 200 160 C 185 140 170 120 165 95",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 1000,
        duration: 800,
        type: "stem",
      },
      {
        d: "M 200 160 C 215 140 230 120 235 95",
        stroke: barkColor,
        strokeWidth: 2,
        delay: 1050,
        duration: 800,
        type: "stem",
      },

      // --- Cluster Tajuk Daun Awan (Overlap Cloud Canopy) ---
      {
        d: "M 50 150 c -25 -5 -40 20 -20 35 c -15 20 10 35 25 25 c 20 15 35 -10 25 -25 c 15 -20 -10 -35 -30 -35 Z",
        stroke: foliageColor,
        strokeWidth: 2,
        delay: 1200,
        duration: 900,
        type: "leaf",
      },
      {
        d: "M 115 130 c -15 -20 -35 0 -20 20 c -20 15 0 35 20 20 c 20 15 35 -5 15 -25 c 15 -15 -5 -30 -15 -15 Z",
        stroke: foliageColor,
        strokeWidth: 2,
        delay: 1300,
        duration: 900,
        type: "leaf",
      },
      {
        d: "M 165 95 c -15 -20 -35 0 -20 20 c -20 15 0 35 20 20 c 20 15 35 -5 15 -25 c 15 -15 -5 -30 -15 -15 Z",
        stroke: foliageColor,
        strokeWidth: 2,
        delay: 1400,
        duration: 900,
        type: "leaf",
      },
      {
        d: "M 235 95 c -15 -20 -35 0 -20 20 c -20 15 0 35 20 20 c 20 15 35 -5 15 -25 c 15 -15 -5 -30 -15 -15 Z",
        stroke: foliageColor,
        strokeWidth: 2,
        delay: 1500,
        duration: 900,
        type: "leaf",
      },
      {
        d: "M 285 130 c -15 -20 -35 0 -20 20 c -20 15 0 35 20 20 c 20 15 35 -5 15 -25 c 15 -15 -5 -30 -15 -15 Z",
        stroke: foliageColor,
        strokeWidth: 2,
        delay: 1600,
        duration: 900,
        type: "leaf",
      },
      {
        d: "M 350 150 c -25 -5 -40 20 -20 35 c -15 20 10 35 25 25 c 20 15 35 -10 25 -25 c 15 -20 -10 -35 -30 -35 Z",
        stroke: foliageColor,
        strokeWidth: 2,
        delay: 1700,
        duration: 900,
        type: "leaf",
      },
      {
        d: "M 200 60 c -20 -15 -35 5 -20 25 c -20 15 0 30 20 20 c 20 15 35 -5 15 -25 c 15 -15 -5 -30 -15 -20 Z",
        stroke: foliageColor,
        strokeWidth: 2,
        delay: 1800,
        duration: 900,
        type: "leaf",
      },

      // --- Detail Guratan Daun ---
      {
        d: "M 45 160 c 5 5 15 -5 10 -15",
        stroke: "#2b1a10",
        strokeWidth: 1,
        delay: 2000,
        duration: 500,
        type: "detail",
      },
      {
        d: "M 160 105 c 5 5 15 -5 10 -15",
        stroke: "#2b1a10",
        strokeWidth: 1,
        delay: 2100,
        duration: 500,
        type: "detail",
      },
      {
        d: "M 240 105 c 5 5 15 -5 10 -15",
        stroke: "#2b1a10",
        strokeWidth: 1,
        delay: 2200,
        duration: 500,
        type: "detail",
      },
      {
        d: "M 345 160 c 5 5 15 -5 10 -15",
        stroke: "#2b1a10",
        strokeWidth: 1,
        delay: 2300,
        duration: 500,
        type: "detail",
      },
      {
        d: "M 195 70 c 5 5 15 -5 10 -15",
        stroke: "#2b1a10",
        strokeWidth: 1,
        delay: 2400,
        duration: 500,
        type: "detail",
      },

      // --- Dedaunan Melayang Tertiup Angin ---
      {
        d: "M 75 220 c 0 -10 10 -10 15 0 c 0 10 -10 10 -15 0 Z",
        stroke: foliageColor,
        strokeWidth: 1,
        delay: 2500,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 130 180 c 0 -10 10 -10 15 0 c 0 10 -10 10 -15 0 Z",
        stroke: foliageColor,
        strokeWidth: 1,
        delay: 2600,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 270 180 c 0 -10 10 -10 15 0 c 0 10 -10 10 -15 0 Z",
        stroke: foliageColor,
        strokeWidth: 1,
        delay: 2700,
        duration: 500,
        type: "leaf",
      },
      {
        d: "M 315 220 c 0 -10 10 -10 15 0 c 0 10 -10 10 -15 0 Z",
        stroke: foliageColor,
        strokeWidth: 1,
        delay: 2800,
        duration: 500,
        type: "leaf",
      },
    ],
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
      {
        d: "M 190 480 C 192 380 195 280 195 180",
        stroke: "#3d2314",
        strokeWidth: 7,
        delay: 0,
        duration: 900,
        type: "stem",
      },
      {
        d: "M 210 480 C 208 380 205 280 205 180",
        stroke: "#3d2314",
        strokeWidth: 7,
        delay: 100,
        duration: 900,
        type: "stem",
      },
      // Ijuk fibers (serat hitam kasar di batang)
      {
        d: "M 192 420 Q 200 425 208 420",
        stroke: "#1b2a1a",
        strokeWidth: 2,
        delay: 300,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 193 370 Q 200 375 207 370",
        stroke: "#1b2a1a",
        strokeWidth: 2,
        delay: 400,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 194 320 Q 200 325 206 320",
        stroke: "#1b2a1a",
        strokeWidth: 2,
        delay: 500,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 195 270 Q 200 275 205 270",
        stroke: "#1b2a1a",
        strokeWidth: 2,
        delay: 600,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 195 220 Q 200 225 205 220",
        stroke: "#1b2a1a",
        strokeWidth: 2,
        delay: 700,
        duration: 300,
        type: "detail",
      },

      // Hanging Fruit Clusters (Tandan buah aren / kolang-kaling)
      {
        d: "M 195 190 Q 180 220 175 260",
        stroke: "#8b5a2b",
        strokeWidth: 2.5,
        delay: 800,
        duration: 600,
        type: "stem",
      },
      {
        d: "M 175 260 c -5 0 -8 5 -5 10 c 3 5 8 5 10 0 c 2 -5 -1 -10 -5 -10 Z",
        stroke: "#c9a227",
        strokeWidth: 1.5,
        delay: 1300,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 170 240 c -5 0 -8 5 -5 10 c 3 5 8 5 10 0 c 2 -5 -1 -10 -5 -10 Z",
        stroke: "#c9a227",
        strokeWidth: 1.5,
        delay: 1400,
        duration: 400,
        type: "flower",
      },
      {
        d: "M 180 220 c -5 0 -8 5 -5 10 c 3 5 8 5 10 0 c 2 -5 -1 -10 -5 -10 Z",
        stroke: "#c9a227",
        strokeWidth: 1.5,
        delay: 1500,
        duration: 400,
        type: "flower",
      },

      // Palm Fronds (Pelepah & Daun Aren menjari)
      // Frond 1 (Kiri Bawah)
      {
        d: "M 200 180 Q 150 180 100 230",
        stroke: "#2d4026",
        strokeWidth: 3.5,
        delay: 900,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 160 180 L 155 200 M 140 185 L 132 210 M 120 195 L 110 220 M 100 210 L 92 230",
        stroke: "#4a5d23",
        strokeWidth: 1.5,
        delay: 1600,
        duration: 500,
        type: "leaf",
      },

      // Frond 2 (Kiri Atas)
      {
        d: "M 200 180 Q 130 140 70 170",
        stroke: "#2d4026",
        strokeWidth: 3.5,
        delay: 1000,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 160 162 L 150 180 M 140 152 L 128 175 M 120 146 L 105 170 M 100 144 L 82 165 M 80 148 L 62 165",
        stroke: "#4a5d23",
        strokeWidth: 1.5,
        delay: 1700,
        duration: 500,
        type: "leaf",
      },

      // Frond 3 (Tengah Atas)
      {
        d: "M 200 180 Q 200 100 200 60",
        stroke: "#2d4026",
        strokeWidth: 3.5,
        delay: 1100,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 200 150 L 180 140 M 200 130 L 180 120 M 200 110 L 180 100 M 200 90 L 180 80 M 200 150 L 220 140 M 200 130 L 220 120 M 200 110 L 220 100 M 200 90 L 220 80",
        stroke: "#4a5d23",
        strokeWidth: 1.5,
        delay: 1800,
        duration: 500,
        type: "leaf",
      },

      // Frond 4 (Kanan Atas)
      {
        d: "M 200 180 Q 270 140 330 170",
        stroke: "#2d4026",
        strokeWidth: 3.5,
        delay: 1150,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 240 162 L 250 180 M 260 152 L 272 175 M 280 146 L 295 170 M 300 144 L 318 165 M 320 148 L 338 165",
        stroke: "#4a5d23",
        strokeWidth: 1.5,
        delay: 1900,
        duration: 500,
        type: "leaf",
      },

      // Frond 5 (Kanan Bawah)
      {
        d: "M 200 180 Q 250 180 300 230",
        stroke: "#2d4026",
        strokeWidth: 3.5,
        delay: 1200,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 240 180 L 245 200 M 260 185 L 268 210 M 270 195 L 290 220 M 300 210 L 308 230",
        stroke: "#4a5d23",
        strokeWidth: 1.5,
        delay: 2000,
        duration: 500,
        type: "leaf",
      },
    ],
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
      {
        d: "M 180 470 C 185 350 190 260 190 220",
        stroke: "#5e3c25",
        strokeWidth: 5.5,
        delay: 0,
        duration: 900,
        type: "stem",
      },
      {
        d: "M 220 470 C 215 350 210 260 210 220",
        stroke: "#5e3c25",
        strokeWidth: 5.5,
        delay: 100,
        duration: 900,
        type: "stem",
      },
      // Bark texture lines (Guratan batang)
      {
        d: "M 195 450 C 197 360 200 280 198 220",
        stroke: "#3d2314",
        strokeWidth: 1.8,
        delay: 300,
        duration: 900,
        type: "detail",
      },
      {
        d: "M 205 450 C 203 360 200 280 202 220",
        stroke: "#3d2314",
        strokeWidth: 1.8,
        delay: 400,
        duration: 900,
        type: "detail",
      },

      // Strong main branches (Dahan kuat)
      {
        d: "M 190 220 C 160 180 120 160 90 160",
        stroke: "#5e3c25",
        strokeWidth: 3.5,
        delay: 500,
        duration: 700,
        type: "stem",
      },
      {
        d: "M 210 220 C 240 180 280 160 310 160",
        stroke: "#5e3c25",
        strokeWidth: 3.5,
        delay: 600,
        duration: 700,
        type: "stem",
      },
      {
        d: "M 200 220 C 200 170 200 140 200 120",
        stroke: "#5e3c25",
        strokeWidth: 3,
        delay: 700,
        duration: 600,
        type: "stem",
      },

      // Broad Teak Leaves (Daun Jati Lebar Khas)
      // Leaf 1 (Left branch tip)
      {
        d: "M 90 160 C 60 130 70 90 100 120 C 120 140 110 150 90 160 Z",
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 1000,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 90 160 Q 82 135 100 120",
        stroke: "#3a4f32",
        strokeWidth: 1.2,
        delay: 1600,
        duration: 400,
        type: "detail",
      },

      // Leaf 2 (Right branch tip)
      {
        d: "M 310 160 C 340 130 330 90 300 120 C 280 140 290 150 310 160 Z",
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 1100,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 310 160 Q 318 135 300 120",
        stroke: "#3a4f32",
        strokeWidth: 1.2,
        delay: 1700,
        duration: 400,
        type: "detail",
      },

      // Leaf 3 (Top center)
      {
        d: "M 200 120 C 170 90 180 50 200 80 C 220 50 230 90 200 120 Z",
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 1200,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 200 120 Q 200 95 200 80",
        stroke: "#3a4f32",
        strokeWidth: 1.2,
        delay: 1800,
        duration: 400,
        type: "detail",
      },

      // Leaf 4 (Left inner)
      {
        d: "M 140 190 C 110 170 120 130 150 150 C 165 160 160 180 140 190 Z",
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 1300,
        duration: 600,
        type: "leaf",
      },
      // Leaf 5 (Right inner)
      {
        d: "M 260 190 C 290 170 280 130 250 150 C 235 160 240 180 260 190 Z",
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 1400,
        duration: 600,
        type: "leaf",
      },

      // Ground (Tanah)
      {
        d: "M 130 470 C 170 480 230 480 270 470",
        stroke: "#5e3c25",
        strokeWidth: 2,
        delay: 800,
        duration: 500,
        type: "root",
      },
    ],
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
      {
        d: "M 175 480 L 180 180",
        stroke: "#3d2314",
        strokeWidth: 7.5,
        delay: 0,
        duration: 1000,
        type: "stem",
      },
      {
        d: "M 225 480 L 220 180",
        stroke: "#3d2314",
        strokeWidth: 7.5,
        delay: 100,
        duration: 1000,
        type: "stem",
      },
      {
        d: "M 190 480 L 192 180",
        stroke: "#1b2a1a",
        strokeWidth: 1.8,
        delay: 300,
        duration: 1000,
        type: "detail",
      },
      {
        d: "M 210 480 L 208 180",
        stroke: "#1b2a1a",
        strokeWidth: 1.8,
        delay: 400,
        duration: 1000,
        type: "detail",
      },

      // Buttress roots (Akar papan banir yang kokoh khas pohon ulin hutan primer)
      {
        d: "M 175 440 C 140 450 100 465 70 485",
        stroke: "#3d2314",
        strokeWidth: 5,
        delay: 500,
        duration: 600,
        type: "root",
      },
      {
        d: "M 225 440 C 260 450 300 465 330 485",
        stroke: "#3d2314",
        strokeWidth: 5,
        delay: 600,
        duration: 600,
        type: "root",
      },

      // Crown branches at the top (Dahan tinggi)
      {
        d: "M 180 180 C 150 140 110 120 70 120",
        stroke: "#3d2314",
        strokeWidth: 3.5,
        delay: 700,
        duration: 700,
        type: "stem",
      },
      {
        d: "M 220 180 C 250 140 290 120 330 120",
        stroke: "#3d2314",
        strokeWidth: 3.5,
        delay: 800,
        duration: 700,
        type: "stem",
      },
      {
        d: "M 200 180 L 200 100",
        stroke: "#3d2314",
        strokeWidth: 3,
        delay: 900,
        duration: 600,
        type: "stem",
      },

      // Dense heavy canopy (Tajuk daun lebat menutupi dahan tinggi)
      {
        d: "M 70 120 c -15 -10 -30 10 -15 25 c -10 15 10 25 20 15 c 15 10 25 -10 15 -20 c 10 -15 -10 -25 -20 -20 Z",
        stroke: "#2d4026",
        strokeWidth: 2,
        delay: 1100,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 330 120 c -15 -10 -30 10 -15 25 c -10 15 10 25 20 15 c 15 10 25 -10 15 -20 c 10 -15 -10 -25 -20 -20 Z",
        stroke: "#2d4026",
        strokeWidth: 2,
        delay: 1200,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 200 100 c -20 -15 -35 5 -20 25 c -15 15 5 25 20 15 c 20 15 35 -5 20 -25 c 15 -15 -5 -25 -20 -15 Z",
        stroke: "#2d4026",
        strokeWidth: 2,
        delay: 1300,
        duration: 800,
        type: "leaf",
      },

      // Extra top canopies
      {
        d: "M 130 130 c -15 -10 -30 10 -15 25 c -10 15 10 25 20 15 c 15 10 25 -10 15 -20 Z",
        stroke: "#2d4026",
        strokeWidth: 2,
        delay: 1400,
        duration: 800,
        type: "leaf",
      },
      {
        d: "M 270 130 c -15 -10 -30 10 -15 25 c -10 15 10 25 20 15 c 15 10 25 -10 15 -20 Z",
        stroke: "#2d4026",
        strokeWidth: 2,
        delay: 1500,
        duration: 800,
        type: "leaf",
      },
    ],
  };
}

// ─── 6. BUNGA MELATI (JASMINE) ──────────────────────────────────────────────
function generateMelati(): BotanicalSVGData {
  // Warna khas sketsa melati: outline hitam kecoklatan tua, isian abu hampir putih
  const stemColor = "#3a2c1e"; // coklat tua hangat untuk batang & tangkai
  const leafColor = "#3a5520"; // hijau daun melati medium
  const leafVein = "#2b4018"; // tulang daun lebih tua
  const petalLine = "#5c5047"; // outline kelopak: abu-coklat (sketsa pensil)
  const petalFill = "#f7f3ed"; // isi kelopak: putih krem sangat lembut
  const sepalColor = "#4a6030"; // sepal/kelopak pelindung hijau tua
  const stamenCol = "#c8a840"; // benang sari emas
  const budColor = "#e8e0d0"; // kuncup sebelum mekar (sedikit krem)

  return {
    viewBox: "0 0 400 500",
    title: "Sketsa Bunga Melati",
    colorScheme: {
      stem: stemColor,
      leaf: leafColor,
      flower: petalFill,
      detail: petalLine,
    },
    paths: [
      // ══════════════════════════════════════════════════════════
      // BAGIAN 1: BATANG UTAMA & RANTING (Twining Main Stem)
      // Batang meliuk halus dari bawah ke atas, khas tanaman rambat
      // ══════════════════════════════════════════════════════════
      // Batang utama: meliuk S dari bawah kanan ke kiri atas
      {
        d: "M 230 490 C 225 440 190 400 185 360 C 180 320 210 285 200 250 C 190 215 160 195 155 170 C 150 145 165 115 160 90",
        stroke: stemColor,
        strokeWidth: 2.8,
        delay: 0,
        duration: 1200,
        type: "stem",
      },
      // Cabang kanan bawah (menuju kluster bunga kanan)
      {
        d: "M 200 250 C 220 240 245 235 265 230",
        stroke: stemColor,
        strokeWidth: 2,
        delay: 400,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 265 230 C 275 225 285 215 295 210",
        stroke: stemColor,
        strokeWidth: 1.5,
        delay: 900,
        duration: 400,
        type: "stem",
      },
      // Cabang kiri tengah (menuju bunga tengah & kuncup kiri)
      {
        d: "M 185 360 C 165 355 145 345 125 340",
        stroke: stemColor,
        strokeWidth: 1.8,
        delay: 200,
        duration: 500,
        type: "stem",
      },
      {
        d: "M 125 340 C 110 335 95 325 85 315",
        stroke: stemColor,
        strokeWidth: 1.4,
        delay: 700,
        duration: 400,
        type: "stem",
      },
      // Sub-ranting atas kiri (ke bunga kiri atas)
      {
        d: "M 160 90 C 150 80 138 70 130 60",
        stroke: stemColor,
        strokeWidth: 1.2,
        delay: 1000,
        duration: 350,
        type: "stem",
      },
      {
        d: "M 160 90 C 172 82 185 78 195 72",
        stroke: stemColor,
        strokeWidth: 1.2,
        delay: 1100,
        duration: 350,
        type: "stem",
      },
      // Sub-ranting untuk kuncup bawah kanan
      {
        d: "M 265 230 C 270 245 268 255 265 265",
        stroke: stemColor,
        strokeWidth: 1.2,
        delay: 1000,
        duration: 300,
        type: "stem",
      },

      // ══════════════════════════════════════════════════════════
      // BAGIAN 2: DAUN MELATI (Oval, Opposite, with clear veins)
      // Daun melati: oval agak bulat, sedikit bergelombang, tulang daun jelas
      // ══════════════════════════════════════════════════════════
      // Daun 1 — kiri bawah besar
      {
        d: "M 185 360 C 158 348 128 352 108 370 C 100 380 106 395 120 398 C 140 402 168 388 185 360 Z",
        stroke: leafColor,
        strokeWidth: 1.8,
        delay: 600,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 185 360 Q 145 376 108 370",
        stroke: leafVein,
        strokeWidth: 1,
        delay: 1300,
        duration: 450,
        type: "detail",
      },
      {
        d: "M 160 358 Q 157 368 150 372 M 140 360 Q 135 370 128 375 M 122 364 Q 118 373 113 378",
        stroke: leafVein,
        strokeWidth: 0.7,
        delay: 1750,
        duration: 400,
        type: "detail",
      },

      // Daun 2 — kanan bawah (pasangan daun 1)
      {
        d: "M 215 355 C 240 342 270 345 285 362 C 293 372 288 386 275 390 C 258 396 232 383 215 355 Z",
        stroke: leafColor,
        strokeWidth: 1.8,
        delay: 650,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 215 355 Q 252 371 285 362",
        stroke: leafVein,
        strokeWidth: 1,
        delay: 1350,
        duration: 450,
        type: "detail",
      },
      {
        d: "M 238 355 Q 243 365 250 370 M 258 357 Q 264 366 270 371 M 276 361 Q 280 369 282 375",
        stroke: leafVein,
        strokeWidth: 0.7,
        delay: 1800,
        duration: 400,
        type: "detail",
      },

      // Daun 3 — kiri tengah atas
      {
        d: "M 155 170 C 128 162 103 168 88 184 C 80 195 86 210 100 213 C 118 216 142 202 155 170 Z",
        stroke: leafColor,
        strokeWidth: 1.6,
        delay: 800,
        duration: 650,
        type: "leaf",
      },
      {
        d: "M 155 170 Q 118 188 88 184",
        stroke: leafVein,
        strokeWidth: 0.9,
        delay: 1450,
        duration: 400,
        type: "detail",
      },
      {
        d: "M 135 172 Q 130 182 124 187 M 115 175 Q 108 184 103 190",
        stroke: leafVein,
        strokeWidth: 0.6,
        delay: 1850,
        duration: 350,
        type: "detail",
      },

      // Daun 4 — kanan tengah atas (pasangan daun 3)
      {
        d: "M 200 250 C 222 240 248 243 260 258 C 266 268 260 282 247 285 C 230 288 210 274 200 250 Z",
        stroke: leafColor,
        strokeWidth: 1.6,
        delay: 850,
        duration: 650,
        type: "leaf",
      },
      {
        d: "M 200 250 Q 232 264 260 258",
        stroke: leafVein,
        strokeWidth: 0.9,
        delay: 1500,
        duration: 400,
        type: "detail",
      },
      {
        d: "M 220 251 Q 225 261 232 265 M 240 253 Q 246 262 252 266",
        stroke: leafVein,
        strokeWidth: 0.6,
        delay: 1900,
        duration: 350,
        type: "detail",
      },

      // Daun 5 — kecil di atas kiri, dekat bunga
      {
        d: "M 130 60 C 108 52 88 58 78 72 C 72 82 78 95 92 97 C 108 99 126 85 130 60 Z",
        stroke: leafColor,
        strokeWidth: 1.4,
        delay: 950,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 130 60 Q 102 76 78 72",
        stroke: leafVein,
        strokeWidth: 0.8,
        delay: 1550,
        duration: 380,
        type: "detail",
      },

      // Daun 6 — kecil kanan atas
      {
        d: "M 195 72 C 214 62 234 66 242 80 C 248 90 242 103 228 105 C 212 107 196 94 195 72 Z",
        stroke: leafColor,
        strokeWidth: 1.4,
        delay: 1000,
        duration: 600,
        type: "leaf",
      },
      {
        d: "M 195 72 Q 220 86 242 80",
        stroke: leafVein,
        strokeWidth: 0.8,
        delay: 1600,
        duration: 380,
        type: "detail",
      },

      // ══════════════════════════════════════════════════════════
      // BAGIAN 3: KUNCUP MELATI (Spiral Bud — bentuk torpedo)
      // Kuncup melati khas: panjang lonjong, kelopak melingkar spiral,
      // sepal runcing hijau di pangkal
      // ══════════════════════════════════════════════════════════
      // --- KUNCUP A (ujung ranting bawah kanan) ---
      // Sepal kuncup A
      {
        d: "M 263 268 C 258 265 265 260 268 262 Z M 263 268 C 268 263 272 262 273 265 Z M 263 268 C 262 262 266 258 270 259 Z",
        stroke: sepalColor,
        strokeWidth: 1,
        delay: 1600,
        duration: 350,
        type: "detail",
      },
      // Badan kuncup A (torpedo oval)
      {
        d: "M 263 268 C 256 255 255 240 262 228 C 269 216 276 214 280 220 C 284 226 283 242 278 254 C 273 266 268 270 263 268 Z",
        stroke: petalLine,
        strokeWidth: 1.4,
        delay: 1650,
        duration: 500,
        type: "flower",
      },
      // Garis spiral kuncup A (ciri khas kuncup melati)
      {
        d: "M 266 264 C 261 252 261 238 268 227",
        stroke: petalLine,
        strokeWidth: 0.7,
        delay: 2150,
        duration: 350,
        type: "detail",
      },
      {
        d: "M 271 265 C 268 254 267 240 272 229",
        stroke: petalLine,
        strokeWidth: 0.7,
        delay: 2200,
        duration: 350,
        type: "detail",
      },

      // --- KUNCUP B (ujung ranting kiri bawah) ---
      // Sepal kuncup B
      {
        d: "M 85 315 C 80 312 87 307 90 309 Z M 85 315 C 90 310 94 309 95 312 Z M 85 315 C 84 309 88 305 92 306 Z",
        stroke: sepalColor,
        strokeWidth: 1,
        delay: 1700,
        duration: 350,
        type: "detail",
      },
      // Badan kuncup B
      {
        d: "M 85 315 C 78 302 77 287 84 275 C 91 263 98 261 102 267 C 106 273 105 289 100 301 C 95 313 90 317 85 315 Z",
        stroke: petalLine,
        strokeWidth: 1.4,
        delay: 1750,
        duration: 500,
        type: "flower",
      },
      // Garis spiral kuncup B
      {
        d: "M 88 311 C 83 299 83 285 90 274",
        stroke: petalLine,
        strokeWidth: 0.7,
        delay: 2250,
        duration: 350,
        type: "detail",
      },
      {
        d: "M 93 312 C 90 301 89 287 94 276",
        stroke: petalLine,
        strokeWidth: 0.7,
        delay: 2300,
        duration: 350,
        type: "detail",
      },

      // ══════════════════════════════════════════════════════════
      // BAGIAN 4: BUNGA MELATI MEKAR (KLUSTER UTAMA — 3 bunga)
      // Setiap bunga: tabung kecil di tengah + 5–7 kelopak oval memancar
      // Diameter bunga ~55–65px. Pusat bunga: lingkaran kecil.
      // ══════════════════════════════════════════════════════════

      // ── BUNGA 1: MEKAR PENUH (pusat komposisi, atas tengah) ──
      // Center: (160, 90) — menghadap depan sempurna
      // Tabung tengah / corolla tube
      {
        d: "M 157 93 C 156 88 158 84 160 83 C 162 82 165 84 165 88 L 165 93 C 163 95 157 95 157 93 Z",
        stroke: sepalColor,
        strokeWidth: 1.2,
        delay: 2000,
        duration: 300,
        type: "detail",
      },
      // 6 kelopak oval memancar dari pusat (160, 90)
      // Kelopak 1 — atas
      {
        d: "M 160 90 C 153 80 150 65 157 52 C 162 42 168 42 170 52 C 173 64 168 80 160 90 Z",
        stroke: petalLine,
        strokeWidth: 1.5,
        delay: 2100,
        duration: 500,
        type: "flower",
      },
      // Kelopak 2 — kanan atas
      {
        d: "M 160 90 C 170 82 184 75 194 78 C 203 81 204 87 198 92 C 191 98 176 96 160 90 Z",
        stroke: petalLine,
        strokeWidth: 1.5,
        delay: 2200,
        duration: 500,
        type: "flower",
      },
      // Kelopak 3 — kanan bawah
      {
        d: "M 160 90 C 168 98 172 114 167 124 C 162 133 156 132 153 123 C 149 113 152 98 160 90 Z",
        stroke: petalLine,
        strokeWidth: 1.5,
        delay: 2300,
        duration: 500,
        type: "flower",
      },
      // Kelopak 4 — bawah
      {
        d: "M 160 90 C 152 100 140 110 128 110 C 118 109 115 103 120 96 C 126 89 140 88 160 90 Z",
        stroke: petalLine,
        strokeWidth: 1.5,
        delay: 2400,
        duration: 500,
        type: "flower",
      },
      // Kelopak 5 — kiri atas
      {
        d: "M 160 90 C 150 82 138 76 129 79 C 121 82 120 89 127 94 C 134 100 147 97 160 90 Z",
        stroke: petalLine,
        strokeWidth: 1.5,
        delay: 2500,
        duration: 500,
        type: "flower",
      },
      // Kelopak 6 — kiri (setengah tersembunyi)
      {
        d: "M 160 90 C 155 84 147 80 139 80 C 132 80 130 84 133 89 C 136 94 144 94 160 90 Z",
        stroke: petalLine,
        strokeWidth: 1.2,
        delay: 2600,
        duration: 450,
        type: "flower",
      },
      // Guratan tengah tiap kelopak (petal midrib) — Bunga 1
      {
        d: "M 160 90 Q 160 70 160 56",
        stroke: petalLine,
        strokeWidth: 0.6,
        delay: 2700,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 160 90 Q 176 84 190 80",
        stroke: petalLine,
        strokeWidth: 0.6,
        delay: 2750,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 160 90 Q 166 104 164 118",
        stroke: petalLine,
        strokeWidth: 0.6,
        delay: 2800,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 160 90 Q 144 100 130 106",
        stroke: petalLine,
        strokeWidth: 0.6,
        delay: 2850,
        duration: 300,
        type: "detail",
      },
      {
        d: "M 160 90 Q 144 82 130 82",
        stroke: petalLine,
        strokeWidth: 0.6,
        delay: 2900,
        duration: 300,
        type: "detail",
      },
      // Benang sari Bunga 1
      {
        d: "M 160 90 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 Z",
        stroke: stamenCol,
        strokeWidth: 1.2,
        delay: 3200,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 158 88 L 155 85 M 162 88 L 165 85 M 160 86 L 160 83 M 158 92 L 155 95 M 162 92 L 165 95",
        stroke: stamenCol,
        strokeWidth: 0.9,
        delay: 3300,
        duration: 200,
        type: "detail",
      },

      // ── BUNGA 2: MEKAR PENUH (kanan, sedikit lebih kecil) ──
      // Center: (295, 210) — menghadap depan, sedikit miring
      // Tabung corolla
      {
        d: "M 292 213 C 291 208 293 204 295 203 C 297 202 300 204 300 208 L 300 213 C 298 215 292 215 292 213 Z",
        stroke: sepalColor,
        strokeWidth: 1.1,
        delay: 2050,
        duration: 300,
        type: "detail",
      },
      // 6 kelopak oval (sedikit lebih kecil, r~28)
      // Kelopak 1 atas
      {
        d: "M 295 210 C 289 201 287 188 293 177 C 298 169 303 169 306 178 C 308 189 304 202 295 210 Z",
        stroke: petalLine,
        strokeWidth: 1.4,
        delay: 2150,
        duration: 480,
        type: "flower",
      },
      // Kelopak 2 kanan atas
      {
        d: "M 295 210 C 304 203 317 198 326 201 C 334 204 334 209 329 213 C 322 217 309 215 295 210 Z",
        stroke: petalLine,
        strokeWidth: 1.4,
        delay: 2250,
        duration: 480,
        type: "flower",
      },
      // Kelopak 3 kanan bawah
      {
        d: "M 295 210 C 303 217 307 231 303 240 C 299 248 293 247 290 239 C 287 230 290 217 295 210 Z",
        stroke: petalLine,
        strokeWidth: 1.4,
        delay: 2350,
        duration: 480,
        type: "flower",
      },
      // Kelopak 4 bawah
      {
        d: "M 295 210 C 289 219 278 227 268 226 C 260 225 258 219 263 213 C 268 207 281 207 295 210 Z",
        stroke: petalLine,
        strokeWidth: 1.4,
        delay: 2450,
        duration: 480,
        type: "flower",
      },
      // Kelopak 5 kiri atas
      {
        d: "M 295 210 C 287 203 276 198 268 201 C 261 204 261 210 267 215 C 273 220 285 217 295 210 Z",
        stroke: petalLine,
        strokeWidth: 1.4,
        delay: 2550,
        duration: 480,
        type: "flower",
      },
      // Kelopak 6 (tertutup sebagian)
      {
        d: "M 295 210 C 290 205 283 202 277 203 C 271 204 270 208 273 212 C 276 216 284 215 295 210 Z",
        stroke: petalLine,
        strokeWidth: 1.1,
        delay: 2650,
        duration: 450,
        type: "flower",
      },
      // Midrib Bunga 2
      {
        d: "M 295 210 Q 295 192 296 181 M 295 210 Q 310 205 322 203 M 295 210 Q 301 224 300 234 M 295 210 Q 281 218 272 222 M 295 210 Q 279 205 270 203",
        stroke: petalLine,
        strokeWidth: 0.6,
        delay: 2750,
        duration: 300,
        type: "detail",
      },
      // Benang sari Bunga 2
      {
        d: "M 295 210 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z",
        stroke: stamenCol,
        strokeWidth: 1.1,
        delay: 3250,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 293 208 L 291 206 M 297 208 L 299 206 M 295 207 L 295 204 M 293 212 L 291 214 M 297 212 L 299 214",
        stroke: stamenCol,
        strokeWidth: 0.8,
        delay: 3350,
        duration: 200,
        type: "detail",
      },

      // ── BUNGA 3: SETENGAH MEKAR / PERSPEKTIF SAMPING ──
      // Posisi: (195, 72) — tampak sedikit menyamping, khas kluster
      // Sepal / corolla tube tampak samping (elips pendek)
      {
        d: "M 190 75 C 189 70 192 67 196 66 C 200 65 204 68 204 73 C 204 78 201 80 196 81 C 192 82 190 79 190 75 Z",
        stroke: sepalColor,
        strokeWidth: 1,
        delay: 2020,
        duration: 300,
        type: "detail",
      },
      // Kelopak tampak samping (hanya 4 yang terlihat, selebihnya tersembunyi)
      // Kelopak atas
      {
        d: "M 196 73 C 190 63 188 50 194 40 C 198 33 203 33 205 40 C 208 51 205 64 196 73 Z",
        stroke: petalLine,
        strokeWidth: 1.3,
        delay: 2120,
        duration: 460,
        type: "flower",
      },
      // Kelopak kanan
      {
        d: "M 196 73 C 205 67 217 64 225 68 C 232 71 232 77 226 80 C 219 84 207 80 196 73 Z",
        stroke: petalLine,
        strokeWidth: 1.3,
        delay: 2220,
        duration: 460,
        type: "flower",
      },
      // Kelopak kiri
      {
        d: "M 196 73 C 188 67 177 65 170 69 C 164 73 165 79 171 82 C 178 85 189 80 196 73 Z",
        stroke: petalLine,
        strokeWidth: 1.3,
        delay: 2320,
        duration: 460,
        type: "flower",
      },
      // Kelopak bawah
      {
        d: "M 196 73 C 200 82 200 94 196 102 C 192 109 188 108 187 101 C 185 93 189 81 196 73 Z",
        stroke: petalLine,
        strokeWidth: 1.3,
        delay: 2420,
        duration: 460,
        type: "flower",
      },
      // Kelopak kanan-bawah (tertutup sebagian)
      {
        d: "M 196 73 C 203 78 212 80 218 84 C 222 87 220 91 215 91 C 209 90 201 83 196 73 Z",
        stroke: petalLine,
        strokeWidth: 1.1,
        delay: 2520,
        duration: 440,
        type: "flower",
      },
      // Midrib Bunga 3
      {
        d: "M 196 73 Q 196 57 197 44 M 196 73 Q 208 69 220 71 M 196 73 Q 184 69 174 72 M 196 73 Q 196 85 196 97",
        stroke: petalLine,
        strokeWidth: 0.6,
        delay: 2700,
        duration: 300,
        type: "detail",
      },
      // Benang sari Bunga 3 (kecil)
      {
        d: "M 196 73 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 Z",
        stroke: stamenCol,
        strokeWidth: 1,
        delay: 3150,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 194 71 L 192 69 M 198 71 L 200 69 M 196 70 L 196 67 M 194 75 L 192 77 M 198 75 L 200 77",
        stroke: stamenCol,
        strokeWidth: 0.8,
        delay: 3250,
        duration: 200,
        type: "detail",
      },

      // ══════════════════════════════════════════════════════════
      // BAGIAN 5: AKSEN AKHIR — Arsir & Tekstur Sketsa
      // Garis pendek tipis untuk memberi kesan sketsa tangan
      // ══════════════════════════════════════════════════════════
      // Arsir ringan pada batang utama
      {
        d: "M 228 485 Q 225 475 226 465 M 220 440 Q 218 430 220 420 M 212 395 Q 210 385 212 375 M 202 350 Q 200 340 202 330 M 194 305 Q 192 295 194 285 M 184 268 Q 183 260 185 252",
        stroke: stemColor,
        strokeWidth: 0.7,
        delay: 3400,
        duration: 600,
        type: "detail",
      },
      // Arsir vena tambahan daun 1
      {
        d: "M 172 362 Q 168 372 162 376 M 152 366 Q 147 375 143 379",
        stroke: leafVein,
        strokeWidth: 0.6,
        delay: 3500,
        duration: 400,
        type: "detail",
      },
      // Arsir vena tambahan daun 2
      {
        d: "M 228 361 Q 233 371 240 375 M 250 362 Q 256 371 262 375",
        stroke: leafVein,
        strokeWidth: 0.6,
        delay: 3550,
        duration: 400,
        type: "detail",
      },
    ],
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
      {
        d: "M 200 420 C 190 320 210 240 200 180",
        stroke: "#3d2e1f",
        strokeWidth: 3,
        delay: 0,
        duration: 900,
        type: "stem",
      },
      {
        d: "M 200 280 C 160 250 120 230 90 200",
        stroke: "#3d2e1f",
        strokeWidth: 2,
        delay: 600,
        duration: 700,
        type: "stem",
      },
      {
        d: "M 200 250 C 240 220 280 200 310 170",
        stroke: "#3d2e1f",
        strokeWidth: 2,
        delay: 700,
        duration: 700,
        type: "stem",
      },

      {
        d: "M 90 200 C 65 190 60 160 80 150 C 95 140 100 170 90 200 Z",
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1200,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 310 170 C 335 160 340 130 320 120 C 305 110 300 140 310 170 Z",
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1300,
        duration: 700,
        type: "leaf",
      },
      {
        d: "M 200 180 C 175 170 170 140 190 130 C 205 120 210 150 200 180 Z",
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1400,
        duration: 700,
        type: "leaf",
      },

      {
        d: "M 200 130 C 190 110 210 110 200 130 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 1800,
        duration: 450,
        type: "flower",
      },
      {
        d: "M 200 130 C 220 120 220 140 200 130 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 1950,
        duration: 450,
        type: "flower",
      },
      {
        d: "M 200 130 C 210 150 190 150 200 130 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2100,
        duration: 450,
        type: "flower",
      },
      {
        d: "M 200 130 C 180 140 180 120 200 130 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2250,
        duration: 450,
        type: "flower",
      },
      {
        d: "M 200 130 C 190 135 210 145 200 130 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2400,
        duration: 450,
        type: "flower",
      },

      {
        d: "M 80 150 Z C 70 130 90 130 80 150 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2000,
        duration: 450,
        type: "flower",
      },
      {
        d: "M 80 150 C 100 140 100 160 80 150 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2150,
        duration: 450,
        type: "flower",
      },
      {
        d: "M 80 150 C 90 170 70 170 80 150 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2300,
        duration: 450,
        type: "flower",
      },
      {
        d: "M 80 150 C 60 160 60 140 80 150 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2450,
        duration: 450,
        type: "flower",
      },

      {
        d: "M 320 120 C 310 100 330 100 320 120 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2200,
        duration: 450,
        type: "flower",
      },
      {
        d: "M 320 120 C 340 110 340 130 320 120 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2350,
        duration: 450,
        type: "flower",
      },
      {
        d: "M 320 120 C 330 140 310 140 320 120 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2500,
        duration: 450,
        type: "flower",
      },
      {
        d: "M 320 120 C 300 130 300 110 320 120 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2650,
        duration: 450,
        type: "flower",
      },

      {
        d: "M 199 129 A 1 1 0 1 1 199 128 Z",
        stroke: "#e8bf45",
        strokeWidth: 1.5,
        delay: 2800,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 79 149 A 1 1 0 1 1 79 148 Z",
        stroke: "#e8bf45",
        strokeWidth: 1.5,
        delay: 2900,
        duration: 200,
        type: "detail",
      },
      {
        d: "M 319 119 A 1 1 0 1 1 319 118 Z",
        stroke: "#e8bf45",
        strokeWidth: 1.5,
        delay: 3000,
        duration: 200,
        type: "detail",
      },
    ],
  };
}

// ─── 7. PROCEDURAL / GENERIC BOTANICAL ──────────────────────────────────────
function generateProceduralGeneric(plantName: string): BotanicalSVGData {
  const hash = getStringHash(plantName);

  const leafColors = [
    "#5a7a2a",
    "#4e6a27",
    "#6b8e23",
    "#3a5f25",
    "#3cb371",
    "#2e8b57",
  ];
  const flowerColors = [
    "#c9a227",
    "#d87093",
    "#e07a5f",
    "#f4eedd",
    "#ffb703",
    "#fb8500",
    "#c084fc",
    "#e63946",
  ];

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
      {
        d: `M 200 480 C ${200 + stemOffset1} 380 ${200 + stemOffset2} 280 200 160`,
        stroke: "#4a5d23",
        strokeWidth: 3,
        delay: 0,
        duration: 1200,
        type: "stem",
      },

      {
        d: `M 200 350 C 170 340 130 320 100 310`,
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 700,
        duration: 800,
        type: "stem",
      },
      {
        d: `M 200 310 C 230 300 270 280 300 270`,
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 900,
        duration: 800,
        type: "stem",
      },

      {
        d: `M 100 310 C 80 280 90 250 110 290 Z`,
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1400,
        duration: 900,
        type: "leaf",
      },
      {
        d: `M 300 270 C 320 240 310 210 290 250 Z`,
        stroke: leafColor,
        strokeWidth: 1.5,
        delay: 1600,
        duration: 900,
        type: "leaf",
      },

      {
        d: `M 200 160 C 200 130 200 100 200 90`,
        stroke: "#4a5d23",
        strokeWidth: 2,
        delay: 1800,
        duration: 600,
        type: "stem",
      },

      {
        d: "M 200 90 C 180 70 160 50 155 35 C 150 20 160 10 170 15 C 180 20 190 40 200 65 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2300,
        duration: 700,
        type: "flower",
      },
      {
        d: "M 200 90 C 220 70 240 50 245 35 C 250 20 240 10 230 15 C 220 20 210 40 200 65 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2500,
        duration: 700,
        type: "flower",
      },
      {
        d: "M 200 90 C 175 80 150 80 135 70 C 120 60 120 45 130 40 C 140 35 160 50 175 65 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2700,
        duration: 700,
        type: "flower",
      },
      {
        d: "M 200 90 C 225 80 250 80 265 70 C 280 60 280 45 270 40 C 260 35 240 50 225 65 Z",
        stroke: flowerColor,
        strokeWidth: 1.5,
        delay: 2900,
        duration: 700,
        type: "flower",
      },

      {
        d: "M 197 88 A 3 3 0 1 1 197 87 Z",
        stroke: "#e8bf45",
        strokeWidth: 2,
        delay: 3500,
        duration: 400,
        type: "detail",
      },
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plantName } = body as { plantName: string };

    if (!plantName) {
      return NextResponse.json(
        { error: "Nama tanaman diperlukan" },
        { status: 400 },
      );
    }

    let svgData: BotanicalSVGData;
    const nameLower = plantName.toLowerCase();

    // === Urutan penting: spesifik dulu, generik belakangan ===

    // Kantong Semar Papua harus dicek SEBELUM kantong semar biasa
    if (
      nameLower.includes("kantong semar papua") ||
      nameLower.includes("nepenthes insignis")
    ) {
      svgData = generateKantongSemarPapua();
    } else if (
      nameLower.includes("kantong semar") ||
      nameLower.includes("nepenthes")
    ) {
      svgData = generateKantongSemar();
    } else if (
      nameLower.includes("rafflesia") ||
      nameLower.includes("bangkai") ||
      nameLower.includes("patma")
    ) {
      svgData = generateRafflesia();
      // Anggrek Hitam harus dicek SEBELUM anggrek biasa
    } else if (
      nameLower.includes("anggrek hitam") ||
      nameLower.includes("coelogyne")
    ) {
      svgData = generateAnggrekHitam();
    } else if (nameLower.includes("anggrek") || nameLower.includes("orchid")) {
      svgData = generateAnggrek();
      // Rotan harus terpisah dari bambu
    } else if (nameLower.includes("rotan") || nameLower.includes("calamus")) {
      svgData = generateRotan();
    } else if (
      nameLower.includes("bambu") ||
      nameLower.includes("bamboo") ||
      nameLower.includes("sagu")
    ) {
      svgData = generateBambu();
    } else if (nameLower.includes("pandan")) {
      svgData = generatePandanWangi();
    } else if (nameLower.includes("jati")) {
      svgData = generatePohonJati();
    } else if (nameLower.includes("aren")) {
      svgData = generatePohonAren();
    } else if (nameLower.includes("ulin")) {
      svgData = generatePohonUlin();
      // Cendana dan Meranti mendapat sketsa unik masing-masing
    } else if (
      nameLower.includes("cendana") ||
      nameLower.includes("sandalwood")
    ) {
      svgData = generatePohonCendana();
    } else if (nameLower.includes("meranti") || nameLower.includes("shorea")) {
      svgData = generatePohonMeranti();
    } else if (
      nameLower.includes("pohon") ||
      nameLower.includes("karet") ||
      nameLower.includes("nangka") ||
      nameLower.includes("durian") ||
      nameLower.includes("lontar")
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

    console.log(
      `[BotanicalArt] plantName: "${plantName}", matched style: "${svgData.title}"`,
    );

    const totalDuration = Math.max(
      ...svgData.paths.map((p) => p.delay + p.duration),
    );

    return NextResponse.json(
      {
        svgData,
        totalDuration,
        message: `Sketsa botani ${plantName} siap dilukis`,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("Error di /api/botanical-art:", error);
    return NextResponse.json(
      { error: "Gagal memuat sketsa botani" },
      { status: 500 },
    );
  }
}
