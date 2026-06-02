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
}

function TypewriterText({ text, active, onComplete, speed = 10 }: { text: string; active: boolean; onComplete: () => void; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

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

export default function BotanicalCanvas({
  plantName,
  botanicalFacts,
  habitat,
  localNames,
  onNextRiddle,
  score = 0,
  streak = 0,
  isGalleryView = false,
}: BotanicalCanvasProps) {
  const [svgData, setSvgData] = useState<BotanicalSVGData | null>(null);
  const [drawnPaths, setDrawnPaths] = useState<number>(0);
  const [showFacts, setShowFacts] = useState(false);
  const [totalDuration, setTotalDuration] = useState(5000);
  const [triggerFlash, setTriggerFlash] = useState(false);
  const [currentTypingFact, setCurrentTypingFact] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
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
        setSvgData(data.svgData);
        setTotalDuration(data.totalDuration || 5000);
        setDrawnPaths(0);

        // Schedule each path to become visible
        data.svgData.paths.forEach((_: SVGPath, idx: number) => {
          const t = setTimeout(() => {
            setDrawnPaths((prev) => Math.max(prev, idx + 1));
          }, data.svgData.paths[idx].delay);
          timersRef.current.push(t);
        });

        // Show facts and trigger glow flash after drawing completes
        const factTimer = setTimeout(() => {
          setShowFacts(true);
          setTriggerFlash(true);
        }, data.totalDuration + 200);
        timersRef.current.push(factTimer);
      })
      .catch(() => {
        // Fallback: use generic data inline
        setDrawnPaths(999);
        setShowFacts(true);
      });

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [plantName]);

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
            Kamu berhasil menebak <span className="text-white font-bold uppercase">{plantName}</span>!
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
        {!isGalleryView && (
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
            {drawnPaths < (svgData?.paths.length ?? 0) ? (
              <>
                <Loader2 className="w-3.5 h-3.5 text-pixel-leaf animate-spin" />
                <span className="text-[8px] font-bold uppercase tracking-wider text-pixel-leaf" style={{ fontFamily: "var(--font-title)" }}>Melukis...</span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 bg-emerald-600" />
                <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-800" style={{ fontFamily: "var(--font-title)" }}>Selesai</span>
              </>
            )}
          </div>
        </div>

        <div
          className="flex items-center justify-center p-6 border-b-4 border-pixel-wood"
          style={{
            minHeight: "260px",
            backgroundColor: "#c5b992",
            backgroundImage: "linear-gradient(to right, rgba(94, 60, 37, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(94, 60, 37, 0.12) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            imageRendering: "pixelated",
          }}
        >
          {svgData ? (
            <svg
              viewBox={svgData.viewBox}
              className="w-full max-w-[260px] h-auto"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.15))" }}
            >
              <title>{svgData.title}</title>
              {svgData.paths.slice(0, drawnPaths).map((path, i) => (
                <motion.path
                  key={i}
                  d={path.d}
                  stroke="#1a1c14"
                  strokeWidth={path.strokeWidth >= 2.5 ? 5.5 : 4}
                  fill="none"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
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
            className="card-parchment p-6 space-y-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header / Common Name */}
            <div className="border-b-2 border-pixel-wood/25 pb-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-pixel-wood/60" style={{ fontFamily: "var(--font-title)" }}>
                Identifikasi Spesimen
              </span>
              <h3 className="font-bold text-lg text-pixel-dark mt-1" style={{ fontFamily: "var(--font-title)" }}>
                {plantName}
              </h3>
            </div>

            {/* Local names */}
            {localNames?.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center bg-pixel-dark/5 p-2 border-2 border-pixel-wood">
                <Tag className="w-3.5 h-3.5 text-pixel-leaf flex-shrink-0" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-pixel-wood/75 mr-1" style={{ fontFamily: "var(--font-title)" }}>Nama Lokal:</span>
                <div className="flex flex-wrap gap-1.5">
                  {localNames.map((name, i) => (
                    <motion.span
                      key={i}
                      className="text-xs px-2.5 py-0.5 border-2 border-pixel-wood font-bold bg-white text-pixel-dark italic"
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
              <div className="flex items-start gap-2.5 p-3 border-2 border-pixel-wood bg-pixel-dark/20 text-xs text-pixel-dark font-medium leading-relaxed">
                <MapPin className="w-4 h-4 text-pixel-wood flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider text-pixel-wood text-[9px] block mb-0.5" style={{ fontFamily: "var(--font-title)" }}>Habitat Alami Nusantara</span>
                  <span className="italic">{habitat}</span>
                </div>
              </div>
            )}

            {/* Facts list */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 border-b-2 border-pixel-wood/25 pb-1">
                <Info className="w-3.5 h-3.5 text-pixel-leaf" />
                <h4 className="text-[9px] font-bold uppercase tracking-wider text-pixel-wood/65" style={{ fontFamily: "var(--font-title)" }}>Catatan Karakteristik Botani</h4>
              </div>
              <ul className="space-y-2">
                {botanicalFacts.map((fact, i) => {
                  const isVisible = currentTypingFact >= i;
                  return (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-pixel-dark font-medium leading-relaxed"
                      initial={{ opacity: 0, x: -8 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="w-2.5 h-2.5 bg-pixel-leaf flex-shrink-0 mt-1.5" style={{ opacity: isVisible ? 1 : 0 }} />
                      {isVisible ? (
                        <TypewriterText
                          text={fact}
                          active={currentTypingFact === i}
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
                onClick={onNextRiddle}
                className="btn-organic flex items-center gap-2 text-xs px-6 py-3 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Soal Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
