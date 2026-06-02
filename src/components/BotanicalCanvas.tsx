"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Tag, Info, ArrowRight, Loader2 } from "lucide-react";

interface SVGPath {
  d: string;
  stroke: string;
  strokeWidth: number;
  delay: number;
  duration: number;
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

interface BotanicalCanvasProps {
  plantName: string;
  botanicalFacts: string[];
  habitat: string;
  localNames: string[];
  onNextRiddle?: () => void;
  score?: number;
  streak?: number;
  isGalleryView?: boolean;
  questionIndex?: number;
  discoveryMode?: "mudah" | "sedang" | "sulit";
  performanceMode?: boolean;
}

function TypewriterText({ text, active, onComplete, speed = 10 }: { text: string; active: boolean; onComplete: () => void; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!active) {
      setDisplayedText("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onCompleteRef.current();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, active, speed]);

  return <span>{displayedText}</span>;
}

function MiniLeafParticle({ index }: { index: number }) {
  const left = `${(index * 13) % 80 + 10}%`;
  const size = (index % 2 === 0) ? "w-3 h-3" : "w-2 h-2";
  const delay = index * 0.25;
  
  return (
    <motion.div
      className={`absolute ${size} pointer-events-none text-pixel-leaf`}
      style={{ left, bottom: "-10px" }}
      initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
      animate={{ 
        y: -320, 
        x: Math.sin(index * 1.5) * 45,
        opacity: [0, 0.85, 0.85, 0],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration: 3.5, 
        delay, 
        repeat: Infinity,
        ease: "easeOut"
      }}
    >
      <svg viewBox="0 0 8 8" className="w-full h-full [image-rendering:pixelated]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="1" width="2" height="6" />
        <rect x="2" y="2" width="4" height="4" />
        <rect x="1" y="3" width="6" height="2" />
        <rect x="3" y="2" width="1" height="3" fill="#84cc16" />
        <rect x="4" y="3" width="1" height="3" fill="#84cc16" />
      </svg>
    </motion.div>
  );
}

// Global cache for fetched botanical sketches to prevent layout flashes on re-renders
const svgDataCache: Record<string, BotanicalSVGData> = {};

// ─── Mapping nama tumbuhan → file sketsa botani di /public/flora/sketch/ ─────
const PLANT_SKETCH_MAP: Record<string, string> = {
  "Rafflesia":       "/flora/sketch/sketch_rafflesia.png",
  "Kantong Semar":   "/flora/sketch/full_screen_scientific_botanical_illustration_of_tropical_pitcher_plant_kantong.png",
  "Melati":          "/flora/sketch/full_screen_scientific_botanical_illustration_of_jasmine_flowers_melati._style.png",
  "Kenanga":         "/flora/sketch/full_screen_scientific_botanical_illustration_of_ylang_ylang_kenanga._style.png",
  "Bunga Bangkai":   "/flora/sketch/sketch_bunga_bangkai_botanical_illustration.png",
  "Teratai":         "/flora/sketch/sketch_teratai_botanical_illustration.png",
  "Rotan":           "/flora/sketch/sketch_rotan_botanical_illustration.png",
  "Kayu Putih":      "/flora/sketch/sketch_kayu_putih.png",
  "Bambu":           "/flora/sketch/full_screen_scientific_botanical_illustration_of_bamboo_stalks_bambu._style.png",
  "Mangrove":        "/flora/sketch/full_screen_scientific_botanical_illustration_of_mangrove_bakau._style_hand.png",
  "Jati":            "/flora/sketch/sketch_jati_botanical_illustration.png",
  "Cempaka":         "/flora/sketch/sketch_cempaka_botanical_illustration.png",
  "Karet":           "/flora/sketch/sketch_karet_botanical_illustration.png",
  "Durian":          "/flora/sketch/sketch_durian_botanical_illustration.png",
  "Anggrek Bulan":   "/flora/sketch/sketch_anggrek_bulan.png",
};

// ─── Mapping nama tumbuhan → file ikon pixel art di /public/flora/icon/ ──────
const PLANT_ICON_MAP: Record<string, string> = {
  "Rafflesia":       "/flora/icon/icon_rafflesia.png",
  "Kantong Semar":   "/flora/icon/icon_kantong_semar.png",
  "Melati":          "/flora/icon/icon_melati.png",
  "Kenanga":         "/flora/icon/icon_kenanga.png",
  "Bunga Bangkai":   "/flora/icon/icon_bunga_bangkai.png",
  "Teratai":         "/flora/icon/icon_bunga_teratai.png",
  "Rotan":           "/flora/icon/icon_rotan.png",
  "Kayu Putih":      "/flora/icon/icon_kayu_putih.png",
  "Bambu":           "/flora/icon/icon_bambu.png",
  "Mangrove":        "/flora/icon/icon_mangrove.png",
  "Jati":            "/flora/icon/icon_pohon_jati.png",
  "Cempaka":         "/flora/icon/icon_bunga_cempaka.png",
  "Karet":           "/flora/icon/icon_pohon_karet.png",
  "Durian":          "/flora/icon/icon_buah_durian.png",
  "Anggrek Bulan":   "/flora/icon/icon_anggrek_bulan.png",
};

export function getNormalizedPlantKey(name: string): string {
  if (!name) return "";
  const lowerName = name.toLowerCase();

  const officialKeys = [
    "Anggrek Bulan",
    "Bunga Bangkai",
    "Kantong Semar",
    "Rafflesia",
    "Melati",
    "Kenanga",
    "Teratai",
    "Rotan",
    "Kayu Putih",
    "Bambu",
    "Mangrove",
    "Jati",
    "Cempaka",
    "Karet",
    "Durian"
  ];

  for (const key of officialKeys) {
    if (lowerName.includes(key.toLowerCase())) {
      return key;
    }
  }

  // Word-by-word fallback matching
  if (lowerName.includes("rafflesia")) return "Rafflesia";
  if (lowerName.includes("semar")) return "Kantong Semar";
  if (lowerName.includes("melati")) return "Melati";
  if (lowerName.includes("anggrek")) return "Anggrek Bulan";
  if (lowerName.includes("bambu")) return "Bambu";
  if (lowerName.includes("jati")) return "Jati";
  if (lowerName.includes("rotan")) return "Rotan";
  if (lowerName.includes("bakau") || lowerName.includes("mangrove")) return "Mangrove";

  return name;
}

export function formatPlantName(name: string) {
  if (!name) return { common: "", scientific: null };
  const match = name.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return {
      common: match[1].trim(),
      scientific: match[2].trim()
    };
  }
  
  if (name.toLowerCase() === "rafflesia arnoldii") {
    return {
      common: "Rafflesia",
      scientific: "Rafflesia arnoldii"
    };
  }
  
  return {
    common: name,
    scientific: null
  };
}

export { PLANT_ICON_MAP };

export default function BotanicalCanvas({
  plantName,
  botanicalFacts,
  habitat,
  localNames,
  onNextRiddle,
  score = 0,
  streak = 0,
  isGalleryView = false,
  questionIndex,
  discoveryMode,
  performanceMode = false,
}: BotanicalCanvasProps) {
  const [svgData, setSvgData] = useState<BotanicalSVGData | null>(() => {
    return svgDataCache[plantName] || null;
  });
  const [drawnPaths, setDrawnPaths] = useState<number>(() => {
    return svgDataCache[plantName] ? svgDataCache[plantName].paths.length : 0;
  });
  const [showFacts, setShowFacts] = useState(() => {
    return !!svgDataCache[plantName];
  });
  const [totalDuration, setTotalDuration] = useState(5000);
  const [triggerFlash, setTriggerFlash] = useState(false);
  const [currentTypingFact, setCurrentTypingFact] = useState(() => {
    return svgDataCache[plantName] ? 999 : 0; // Skip typewriter if already cached
  });
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const [isNextClicked, setIsNextClicked] = useState(false);
  
  // For image-based sketsa: track if image has loaded and started reveal
  const normalizedKey = getNormalizedPlantKey(plantName);
  const sketchSrc = PLANT_SKETCH_MAP[normalizedKey] || null;
  const [sketchLoaded, setSketchLoaded] = useState(false);
  const [sketchRevealed, setSketchRevealed] = useState(false);
  const isImageMode = !!sketchSrc;

  // Image-mode effect: reveal sketch with ink animation when it loads
  useEffect(() => {
    if (!isImageMode) return;
    setSketchLoaded(false);
    setSketchRevealed(false);
    setShowFacts(false);
    setCurrentTypingFact(0);
    setTriggerFlash(false);
  }, [plantName, isImageMode]);

  useEffect(() => {
    if (!isImageMode) return;
    setIsNextClicked(false);
    if (svgDataCache[plantName]) {
      setSvgData(svgDataCache[plantName]);
      setDrawnPaths(svgDataCache[plantName].paths.length);
      setShowFacts(true);
      setCurrentTypingFact(999);
      return;
    }

    setSvgData(null);
    setDrawnPaths(0);
    setShowFacts(false);
    setTriggerFlash(false);
    setCurrentTypingFact(0);

    // Fetch SVG data
    fetch("/api/botanical-art", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plantName }),
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((data) => {
        svgDataCache[plantName] = data.svgData;
        setSvgData(data.svgData);
        setTotalDuration(data.totalDuration || 5000);
        setDrawnPaths(0);

        data.svgData.paths.forEach((_: SVGPath, idx: number) => {
          const t = setTimeout(() => {
            setDrawnPaths((prev) => Math.max(prev, idx + 1));
          }, data.svgData.paths[idx].delay);
          timersRef.current.push(t);
        });

        const factTimer = setTimeout(() => {
          setShowFacts(true);
          setTriggerFlash(true);
        }, data.totalDuration + 200);
        timersRef.current.push(factTimer);
      })
      .catch(() => {
        setDrawnPaths(999);
        setShowFacts(true);
      });

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [plantName, isImageMode]);

  // When image-mode sketch finishes reveal, show facts
  useEffect(() => {
    if (!isImageMode || !sketchRevealed) return;
    const t = setTimeout(() => {
      setShowFacts(true);
      setTriggerFlash(true);
    }, 400);
    return () => clearTimeout(t);
  }, [isImageMode, sketchRevealed]);

  return (
    <motion.div
      className="w-full space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Success banner */}
      {!isGalleryView && (
        <motion.div
          className="text-center py-4 px-6 relative overflow-hidden border-4 border-pixel-wood bg-pixel-moss"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ imageRendering: "pixelated" }}
        >
          <motion.div
            className="flex justify-center mb-1 text-pixel-gold"
            animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Sparkles className="w-6 h-6 text-pixel-gold" />
          </motion.div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-pixel-gold" style={{ fontFamily: "var(--font-title)" }}>
            LUAR BIASA!
          </h2>
          <p className="text-xs mt-1 text-pixel-parchment font-medium" style={{ fontFamily: "var(--font-body)" }}>
            Kamu berhasil menebak <span className="text-white font-bold uppercase">{formatPlantName(plantName).common}</span>!
          </p>
          {streak >= 2 && (
            <motion.p
              className="text-[9px] mt-2 font-bold uppercase tracking-wider inline-block px-3 py-1 border-2 border-pixel-wood bg-pixel-gold text-pixel-dark"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ fontFamily: "var(--font-title)" }}
            >
              🔥 Streak {streak}x!
            </motion.p>
          )}

          {/* Floating Sparkles Effects */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pixel-gold opacity-50 pointer-events-none text-xs"
              style={{ left: `${12 + i * 15}%`, top: "15%" }}
              animate={{ y: [-4, -20, -4], opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.6, delay: i * 0.18, repeat: 1 }}
            >
              ✦
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Botanical sketch canvas */}
      <div className={`card-parchment overflow-hidden transition-all duration-300 relative ${triggerFlash ? "animate-canvas-glow" : ""}`}>
        {!isGalleryView && !performanceMode && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {[...Array(8)].map((_, i) => (
              <MiniLeafParticle key={i} index={i} />
            ))}
          </div>
        )}
        <div
          className="px-5 py-3 flex items-center justify-between border-b-4 border-pixel-wood bg-pixel-moss/10"
        >
          <div className="flex items-center gap-2">
            <span className="text-emerald-700">✍️</span>
            <span className="text-[9px] font-bold tracking-widest uppercase text-pixel-wood" style={{ fontFamily: "var(--font-title)" }}>
              Sketsa Ilustrasi Botani
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* Image mode: show Selesai when revealed, loading when not */}
            {isImageMode ? (
              sketchRevealed ? (
                <>
                  <span className="w-2.5 h-2.5 bg-emerald-600" />
                  <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-800" style={{ fontFamily: "var(--font-title)" }}>Selesai</span>
                </>
              ) : (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-pixel-leaf animate-spin" />
                  <span className="text-[8px] font-bold uppercase tracking-wider text-pixel-leaf" style={{ fontFamily: "var(--font-title)" }}>Melukis...</span>
                </>
              )
            ) : (
              drawnPaths < (svgData?.paths.length ?? 0) ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-pixel-leaf animate-spin" />
                  <span className="text-[8px] font-bold uppercase tracking-wider text-pixel-leaf" style={{ fontFamily: "var(--font-title)" }}>Melukis...</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 bg-emerald-600" />
                  <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-800" style={{ fontFamily: "var(--font-title)" }}>Selesai</span>
                </>
              )
            )}
          </div>
        </div>

        <div
          className="flex items-center justify-center p-0 border-4 border-double border-pixel-wood m-2 overflow-hidden relative"
          style={{
            minHeight: "280px",
            height: "280px",
            backgroundColor: "#f4eedd",
            backgroundImage: "linear-gradient(to right, rgba(94, 60, 37, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(94, 60, 37, 0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          {/* ── Image-mode: PNG sketsa botani dengan ink-reveal animation ── */}
          {isImageMode && sketchSrc ? (
            <>
              {!sketchLoaded && (
                <motion.div
                  className="flex flex-col items-center gap-2"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Loader2 className="w-8 h-8 text-pixel-leaf animate-spin" />
                  <p className="text-xs font-bold uppercase tracking-wider text-pixel-wood" style={{ fontFamily: "var(--font-title)" }}>
                    Memanggil Ilustrasi...
                  </p>
                </motion.div>
              )}
              <motion.img
                src={sketchSrc}
                alt={`Sketsa botani ${plantName}`}
                className="w-full h-full object-cover"
                style={{
                  display: sketchLoaded ? "block" : "none",
                  filter: "drop-shadow(1px 2px 0px rgba(0,0,0,0.1))",
                  imageRendering: "pixelated",
                }}
                onLoad={() => {
                  setSketchLoaded(true);
                  // Trigger reveal after short delay
                  setTimeout(() => setSketchRevealed(true), 100);
                }}
                initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                animate={sketchRevealed
                  ? { opacity: 1, clipPath: "inset(0% 0 0 0)" }
                  : { opacity: 0, clipPath: "inset(100% 0 0 0)" }
                }
                transition={{ duration: 1.8, ease: [0.2, 0.8, 0.4, 1] }}
              />
            </>
          ) : svgData ? (
            /* ── SVG-mode: animated path drawing (fallback) ── */
            <svg
              viewBox={svgData.viewBox}
              className="w-full max-w-[260px] h-auto"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(1px 2px 0px rgba(0,0,0,0.1))" }}
            >
              <title>{svgData.title}</title>
              {svgData.paths.slice(0, drawnPaths).map((path, i) => (
                <motion.path
                  key={i}
                  d={path.d}
                  stroke="#3e2723"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: path.duration / 1000, ease: "easeInOut" }}
                />
              ))}
            </svg>
          ) : (
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Loader2 className="w-8 h-8 text-pixel-leaf animate-spin" />
              <p className="text-xs font-bold uppercase tracking-wider text-pixel-wood" style={{ fontFamily: "var(--font-title)" }}>
                Memanggil Ilustrasi...
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Botanical facts card */}
      <AnimatePresence>
        {showFacts && (
          <motion.div
            className="card-parchment p-0 space-y-0 mt-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header / Common Name */}
            <div 
              className="px-4 sm:px-8 py-4 pb-3 flex justify-between items-start gap-4"
              style={{ borderBottom: "1px dashed rgba(94, 60, 37, 0.3)" }}
            >
              <div className="flex flex-col">
                <span
                  className="text-[9px] font-bold uppercase tracking-wider text-[#5e3c25] block mb-1"
                  style={{ fontFamily: "var(--font-title)", letterSpacing: "0.12em" }}
                >
                  Identifikasi Spesimen
                </span>
                <div className="flex flex-col mt-1">
                  <h3
                    className="font-bold text-xl text-[#2f1503] leading-tight"
                    style={{
                      fontFamily: "var(--font-title)",
                      textShadow: "1px 1px 0 rgba(255,255,255,0.5)",
                    }}
                  >
                    {formatPlantName(plantName).common}
                  </h3>
                  {formatPlantName(plantName).scientific && (
                    <span
                      className="text-xs italic text-emerald-800 font-semibold mt-0.5"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {formatPlantName(plantName).scientific}
                    </span>
                  )}
                </div>
              </div>

              {/* Discovery Mode Badge */}
              {discoveryMode && (
                <div
                  className="px-2 py-0.5 text-[8px] font-bold uppercase border-2 border-pixel-wood flex-shrink-0"
                  style={{
                    backgroundColor:
                      discoveryMode === "sulit" ? "#93000a" :
                      discoveryMode === "sedang" ? "#92703a" : "#4a5d23",
                    color:
                      discoveryMode === "sulit" ? "#ffdad6" :
                      discoveryMode === "sedang" ? "#fde68a" : "#bed58e",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.08em"
                  }}
                >
                  {discoveryMode === "sulit" ? "MODE SULIT" :
                   discoveryMode === "sedang" ? "MODE NORMAL" : "MODE MUDAH"}
                </div>
              )}
            </div>

            {/* Local names */}
            {localNames?.length > 0 && (
              <div
                className="px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
                style={{ borderBottom: "1px dashed rgba(94, 60, 37, 0.3)" }}
              >
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Tag className="w-3.5 h-3.5 text-[#5e3c25]" />
                  <span 
                    className="font-bold uppercase tracking-wider text-[#5e3c25]" 
                    style={{ fontFamily: "var(--font-prose)", fontSize: "16px" }}
                  >
                    NAMA LOKAL:
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {localNames.map((name, i) => (
                    <motion.span
                      key={i}
                      className="text-xs px-2.5 py-0.5 border-2 border-pixel-wood font-bold bg-white text-pixel-dark italic mr-1.5"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      {name}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Habitat */}
            {habitat && (
              <div 
                className="px-4 sm:px-8 py-4 flex flex-col gap-1.5"
                style={{ borderBottom: "1px dashed rgba(94, 60, 37, 0.3)" }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#5e3c25]" />
                  <span 
                    className="font-bold uppercase tracking-wider text-[#5e3c25]" 
                    style={{ fontFamily: "var(--font-prose)", fontSize: "16px" }}
                  >
                    HABITAT ALAMI:
                  </span>
                </div>
                <p className="text-xs text-pixel-dark italic pl-6 leading-relaxed">
                  {habitat}
                </p>
              </div>
            )}

            {/* Facts list */}
            <div className="px-4 sm:px-8 py-4 space-y-3">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-[#5e3c25]" />
                <span 
                  className="font-bold uppercase tracking-wider text-[#5e3c25]" 
                  style={{ fontFamily: "var(--font-prose)", fontSize: "16px" }}
                >
                  CATATAN KARAKTERISTIK BOTANI:
                </span>
              </div>
              <ul className="space-y-2 pl-4 sm:pl-6">
                {botanicalFacts.map((fact, i) => {
                  const isVisible = currentTypingFact >= i;
                  return (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2.5 text-pixel-dark font-medium leading-relaxed"
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: "1.75" }}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="w-2.5 h-2.5 bg-pixel-leaf flex-shrink-0 mt-1.5" style={{ opacity: isVisible ? 1 : 0 }} />
                      {currentTypingFact > i ? (
                        <span>{fact}</span>
                      ) : currentTypingFact === i ? (
                        <TypewriterText
                          text={fact}
                          active={true}
                          onComplete={() => setCurrentTypingFact((prev) => prev + 1)}
                          speed={12}
                        />
                      ) : (
                        <span className="invisible">{fact}</span>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score + Next button */}
      {!isGalleryView && onNextRiddle && (
        <AnimatePresence>
          {showFacts && (
            <motion.div
              className="flex items-center justify-between pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-left">
                <p className="text-[8px] uppercase font-bold tracking-widest text-pixel-parchment" style={{ fontFamily: "var(--font-title)" }}>Skor Sesi</p>
                <p className="text-xl font-bold text-pixel-gold" style={{ fontFamily: "var(--font-title)", textShadow: "1px 1px 0px var(--pixel-wood)" }}>
                  {score}
                </p>
              </div>

              <motion.button
                id="next-riddle-btn"
                onClick={() => {
                  if (isNextClicked) return;
                  setIsNextClicked(true);
                  onNextRiddle?.();
                }}
                disabled={isNextClicked}
                className={`btn-organic flex items-center gap-2 text-xs px-6 py-3 ${isNextClicked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                whileHover={isNextClicked ? {} : { scale: 1.04 }}
                whileTap={isNextClicked ? {} : { scale: 0.96 }}
              >
                <span>{questionIndex && questionIndex >= 15 ? "Selesai" : "Soal Berikutnya"}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
