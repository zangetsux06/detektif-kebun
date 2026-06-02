"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EyangRimbaProps {
  message: string;
  mood?: "neutral" | "excited" | "thinking" | "sad" | "proud";
  isTyping?: boolean;
  performanceMode?: boolean;
}

const MOOD_EXPRESSIONS: Record<string, { emoji: string; eyeClass: string; mouthClass: string }> = {
  neutral:  { emoji: "🌿", eyeClass: "eyes-normal",   mouthClass: "mouth-smile" },
  excited:  { emoji: "✨", eyeClass: "eyes-wide",     mouthClass: "mouth-open"  },
  thinking: { emoji: "🍃", eyeClass: "eyes-squint",   mouthClass: "mouth-hmm"   },
  sad:      { emoji: "🍂", eyeClass: "eyes-droopy",   mouthClass: "mouth-frown" },
  proud:    { emoji: "🌸", eyeClass: "eyes-happy",    mouthClass: "mouth-big"   },
};

export default function EyangRimba({ message, mood = "neutral", isTyping = false, performanceMode = false }: EyangRimbaProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const expression = MOOD_EXPRESSIONS[mood];

  useEffect(() => {
    if (!message) return;
    setDisplayedText("");
    setIsAnimating(true);

    let i = 0;
    const speed = 28; // ms per char

    const type = () => {
      if (i < message.length) {
        setDisplayedText(message.slice(0, i + 1));
        i++;
        timerRef.current = setTimeout(type, speed);
      } else {
        setIsAnimating(false);
      }
    };

    timerRef.current = setTimeout(type, 100);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [message]);

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
      {/* Avatar */}
      <motion.div
        className="relative flex-shrink-0 mx-auto sm:mx-0"
        animate={(!performanceMode && mood === "excited") ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 0.5, repeat: (!performanceMode && mood === "excited") ? 2 : 0 }}
      >
        {/* Glow blocky effect */}
        {!performanceMode && (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "rgba(74,93,35,0.3)", margin: "-4px" }}
          />
        )}

        {/* Avatar SVG - Boxy style */}
        <div
          className="relative w-20 h-20 border-4 flex items-center justify-center bg-pixel-moss"
          style={{
            borderColor: "var(--pixel-wood)",
            boxShadow: "4px 4px 0 0 rgba(0,0,0,0.25)",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full [image-rendering:pixelated]" xmlns="http://www.w3.org/2000/svg">
            {/* Background of the frame */}
            <rect x="0" y="0" width="100" height="100" fill="#1e2415" />
            
            {/* Side hair */}
            <rect x="28" y="32" width="6" height="24" fill="#f8fafc" />
            <rect x="66" y="32" width="6" height="24" fill="#f8fafc" />
            
            {/* Hat / Topi Petualang */}
            <rect x="24" y="24" width="52" height="6" fill="#3a2510" />
            <rect x="34" y="10" width="32" height="14" fill="#4a3018" />
            <rect x="34" y="20" width="32" height="4" fill="#c9a227" />
            <rect x="62" y="10" width="8" height="8" fill="#4a5d23" />
            <rect x="64" y="12" width="4" height="4" fill="#84cc16" />
            
            {/* Face */}
            <rect x="32" y="30" width="36" height="28" fill="#c8956b" />
            
            {/* Bushy white eyebrows */}
            <rect x="34" y="34" width="12" height="3" fill="#f8fafc" />
            <rect x="54" y="34" width="12" height="3" fill="#f8fafc" />
            
            {/* Glasses frames & Lenses */}
            <rect x="36" y="38" width="10" height="8" fill="#5e3c25" />
            <rect x="38" y="40" width="6" height="4" fill="#e0f2fe" />
            <rect x="54" y="38" width="10" height="8" fill="#5e3c25" />
            <rect x="56" y="40" width="6" height="4" fill="#e0f2fe" />
            <rect x="46" y="40" width="8" height="2" fill="#5e3c25" />
            
            {/* Eyes (dark pupils inside lenses) */}
            <rect x="40" y="41" width="2" height="2" fill="#1a1c14" />
            <rect x="58" y="41" width="2" height="2" fill="#1a1c14" />
            
            {/* Big nose */}
            <rect x="46" y="45" width="8" height="6" fill="#a0705a" />
            
            {/* Mustache & Mouth */}
            <rect x="46" y="52" width="8" height="2" fill="#5e3c25" />
            <rect x="38" y="52" width="24" height="4" fill="#f8fafc" />
            
            {/* Wise beard */}
            <rect x="34" y="56" width="32" height="20" fill="#f8fafc" />
            <rect x="40" y="76" width="20" height="10" fill="#f8fafc" />
            
            {/* Shading details on beard */}
            <rect x="36" y="62" width="4" height="12" fill="#cbd5e1" />
            <rect x="60" y="62" width="4" height="12" fill="#cbd5e1" />
            <rect x="44" y="72" width="12" height="8" fill="#cbd5e1" />
          </svg>

          {/* Mood emoji */}
          <AnimatePresence>
            <motion.div
              key={mood}
              className="absolute bottom-0 right-0 text-[10px] leading-none bg-pixel-wood text-pixel-parchment p-0.5 border border-pixel-parchment"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {expression.emoji}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Speech bubble */}
      <div className="flex-1 w-full relative">
        <motion.div
          className="relative p-4 min-h-[4rem] border-4 bg-pixel-moss"
          style={{
            borderColor: "var(--pixel-wood)",
            boxShadow: "4px 4px 0 0 rgba(0,0,0,0.25)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Name tag */}
          <div
            className="text-[9px] font-bold mb-2 tracking-widest uppercase inline-block bg-pixel-wood px-2 py-0.5 text-pixel-gold"
            style={{ fontFamily: "var(--font-title)" }}
          >
            Eyang Rimba
          </div>

          {/* Message text */}
          <p
            className="leading-relaxed"
            style={{ color: "var(--pixel-parchment)", fontFamily: "var(--font-prose)", fontSize: "1.25rem", lineHeight: "1.9" }}
          >
            {displayedText}
            {/* Typing cursor */}
            {(isAnimating || isTyping) && (
              <span
                className="inline-block ml-1 w-2 h-4 align-middle bg-pixel-gold"
                style={{
                  animation: "typewriter-cursor 0.7s ease-in-out infinite",
                }}
              />
            )}
          </p>

          {/* Loading dots when isTyping */}
          {isTyping && !message && (
            <div className="flex gap-1.5 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 bg-pixel-gold"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
