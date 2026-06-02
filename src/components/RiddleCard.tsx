"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  HelpCircle,
  Lightbulb,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface RiddleData {
  riddle: string;
  clues: string[];
  category: string;
  difficulty: "mudah" | "sedang" | "sulit";
  funFact: string;
  firstLetter: string;
  encodedPlant: string;
  id: string;
}

interface CheckResult {
  correct: boolean;
  plantName: string;
  feedback: string;
  botanicalFacts: string[];
  habitat: string;
  localNames: string[];
}

interface RiddleCardProps {
  riddleData: RiddleData | null;
  isLoading: boolean;
  onAnswerResult: (result: CheckResult) => void;
  onCorrectAnswer: (plantName: string) => void;
  onEyangMessage: (
    msg: string,
    mood: "neutral" | "excited" | "thinking" | "sad" | "proud",
  ) => void;
  onResetStreak: () => void;
  onNextRiddle: () => void;
  onGameOver: () => void;
  isCorrect?: boolean;
  gameMode?: "easy" | "normal" | "hard";
  extraLivesSession?: number;
  extraCluesForNextQuestion?: number;
  isTimeStoppedForNextQuestion?: boolean;
  attemptsProp?: number;
  onUpdateAttempts?: (val: number) => void;
  questionIndex?: number;
}

const DIFFICULTY_CONFIG = {
  mudah: { label: "Mudah", color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  sedang: { label: "Sedang", color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  sulit: { label: "Sulit", color: "#f87171", bg: "rgba(248,113,113,0.12)" },
};

function PixelHeart({ active }: { active: boolean }) {
  const color = "#1a1c14"; // black outline
  const activeColor = "#ef4444"; // red
  const activeLight = "#ff6b6b"; // light red highlight
  
  if (active) {
    return (
      <svg
        viewBox="0 0 8 8"
        className="w-5 h-5 [image-rendering:pixelated]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outline */}
        <rect x="1" y="0" width="2" height="1" fill={color} />
        <rect x="5" y="0" width="2" height="1" fill={color} />
        <rect x="0" y="1" width="1" height="3" fill={color} />
        <rect x="3" y="1" width="2" height="1" fill={color} />
        <rect x="7" y="1" width="1" height="3" fill={color} />
        <rect x="1" y="4" width="1" height="1" fill={color} />
        <rect x="6" y="4" width="1" height="1" fill={color} />
        <rect x="2" y="5" width="1" height="1" fill={color} />
        <rect x="5" y="5" width="1" height="1" fill={color} />
        <rect x="3" y="6" width="2" height="1" fill={color} />
        
        {/* Fill */}
        <rect x="1" y="1" width="2" height="3" fill={activeColor} />
        <rect x="5" y="1" width="2" height="3" fill={activeColor} />
        <rect x="3" y="2" width="2" height="4" fill={activeColor} />
        <rect x="2" y="4" width="4" height="1" fill={activeColor} />
        
        {/* Highlight */}
        <rect x="1" y="1" width="1" height="1" fill={activeLight} />
        <rect x="5" y="1" width="1" height="1" fill={activeLight} />
      </svg>
    );
  } else {
    // Broken Heart / Lost Life
    const fillGray = "#4b5563"; // medium gray
    
    return (
      <svg
        viewBox="0 0 8 8"
        className="w-5 h-5 [image-rendering:pixelated]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outline */}
        <rect x="1" y="0" width="2" height="1" fill={color} />
        <rect x="5" y="0" width="2" height="1" fill={color} />
        <rect x="0" y="1" width="1" height="3" fill={color} />
        <rect x="3" y="1" width="2" height="1" fill={color} />
        <rect x="7" y="1" width="1" height="3" fill={color} />
        <rect x="1" y="4" width="1" height="1" fill={color} />
        <rect x="6" y="4" width="1" height="1" fill={color} />
        <rect x="2" y="5" width="1" height="1" fill={color} />
        <rect x="5" y="5" width="1" height="1" fill={color} />
        <rect x="3" y="6" width="2" height="1" fill={color} />
        
        {/* Fill */}
        <rect x="1" y="1" width="2" height="3" fill={fillGray} />
        <rect x="5" y="1" width="2" height="3" fill={fillGray} />
        <rect x="3" y="2" width="2" height="4" fill={fillGray} />
        <rect x="2" y="4" width="4" height="1" fill={fillGray} />
        
        {/* Crack (zigzag transparent/outline-color line) */}
        <rect x="2" y="1" width="1" height="1" fill={color} />
        <rect x="3" y="2" width="1" height="1" fill={color} />
        <rect x="4" y="3" width="1" height="1" fill={color} />
        <rect x="3" y="4" width="1" height="1" fill={color} />
        <rect x="4" y="5" width="1" height="1" fill={color} />
      </svg>
    );
  }
}

function PixelLightbulb() {
  const frameColor = "#1a1c14";
  const bulbColor = "#c9a227"; // gold yellow
  const glowColor = "#fbbf24"; // bright yellow
  const metalColor = "#82785a"; // bronze gray
  
  const pixels = [
    // Top dome
    { x: 3, y: 1, w: 6, h: 1, c: frameColor },
    { x: 2, y: 2, w: 1, h: 4, c: frameColor },
    { x: 9, y: 2, w: 1, h: 4, c: frameColor },
    
    // Fill top
    { x: 3, y: 2, w: 6, h: 4, c: bulbColor },
    // Highlight
    { x: 4, y: 2, w: 2, h: 2, c: glowColor },
    { x: 6, y: 2, w: 1, h: 1, c: glowColor },
    
    // Neck outline
    { x: 3, y: 6, w: 1, h: 1, c: frameColor },
    { x: 8, y: 6, w: 1, h: 1, c: frameColor },
    { x: 4, y: 6, w: 4, h: 1, c: bulbColor },
    
    // Metal base threads
    { x: 4, y: 7, w: 4, h: 1, c: frameColor },
    { x: 4, y: 8, w: 4, h: 1, c: metalColor },
    { x: 4, y: 9, w: 4, h: 1, c: frameColor },
    // Side boundaries of metal
    { x: 3, y: 7, w: 1, h: 2, c: frameColor },
    { x: 8, y: 7, w: 1, h: 2, c: frameColor },
  ];
  
  return (
    <svg viewBox="0 0 12 12" className="w-8 h-8 [image-rendering:pixelated] mb-2" xmlns="http://www.w3.org/2000/svg">
      {pixels.map((p, idx) => (
        <rect key={idx} x={p.x} y={p.y} width={p.w} height={p.h} fill={p.c} />
      ))}
    </svg>
  );
}

// ─── Play Beep ─────────────────────────────────────────────────────────────
const playBeep = (freq = 800, duration = 0.1, type = "sine") => {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type as OscillatorType;
    oscillator.frequency.value = freq;
    
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn("AudioContext failed to start", e);
  }
};

// ─── Pixel Hourglass ───────────────────────────────────────────────────────
function PixelHourglass({ timeLeft }: { timeLeft: number }) {
  const frameColor = "#5e3c25";
  const glassColor = "#cbd5e1";
  const sandColor = "#fbbf24";

  const showTopRow3 = timeLeft > 45;
  const showTopRow4 = timeLeft > 30;
  const showTopRow5 = timeLeft > 15;
  const showTopRow6 = timeLeft > 0;

  const showBottomRow9 = timeLeft <= 15;
  const showBottomRow10 = timeLeft <= 30;
  const showBottomRow11 = timeLeft <= 45;
  const showBottomRow12 = timeLeft <= 60;

  const showStream = timeLeft > 0 && timeLeft < 60;

  const pixels: { x: number; y: number; color: string; className?: string }[] = [];

  // Top and Bottom plates
  for (let x = 2; x <= 13; x++) {
    pixels.push({ x, y: 1, color: frameColor });
    pixels.push({ x, y: 14, color: frameColor });
  }
  for (let x = 3; x <= 12; x++) {
    pixels.push({ x, y: 2, color: frameColor });
    pixels.push({ x, y: 13, color: frameColor });
  }

  // Pillars (left and right edges)
  for (let y = 3; y <= 12; y++) {
    pixels.push({ x: 2, y, color: frameColor });
    pixels.push({ x: 13, y, color: frameColor });
  }

  // Glass bulb outlines (diagonal)
  const glassWalls = [
    { y: 3, x1: 3, x2: 12 },
    { y: 4, x1: 4, x2: 11 },
    { y: 5, x1: 5, x2: 10 },
    { y: 6, x1: 6, x2: 9 },
    { y: 7, x1: 7, x2: 8 },
    { y: 8, x1: 7, x2: 8 },
    { y: 9, x1: 6, x2: 9 },
    { y: 10, x1: 5, x2: 10 },
    { y: 11, x1: 4, x2: 11 },
    { y: 12, x1: 3, x2: 12 }
  ];

  glassWalls.forEach(({ y, x1, x2 }) => {
    pixels.push({ x: x1, y, color: frameColor });
    pixels.push({ x: x2, y, color: frameColor });
  });

  // Fill bulbs (sand or glass)
  const fillRow = (y: number, startX: number, endX: number, isSand: boolean) => {
    for (let x = startX; x <= endX; x++) {
      pixels.push({ x, y, color: isSand ? sandColor : glassColor });
    }
  };

  // Top bulb interior
  fillRow(3, 4, 11, showTopRow3);
  fillRow(4, 5, 10, showTopRow4);
  fillRow(5, 6, 9, showTopRow5);
  fillRow(6, 7, 8, showTopRow6);

  // Bottom bulb interior
  fillRow(9, 7, 8, showBottomRow9);
  fillRow(10, 6, 9, showBottomRow10);
  fillRow(11, 5, 10, showBottomRow11);
  fillRow(12, 4, 11, showBottomRow12);

  // Falling sand stream in the neck (Rows 7 and 8)
  if (showStream) {
    pixels.push({ x: 7, y: 7, color: sandColor, className: "animate-sand-stream" });
    pixels.push({ x: 8, y: 7, color: sandColor, className: "animate-sand-stream" });
    pixels.push({ x: 7, y: 8, color: sandColor, className: "animate-sand-stream" });
    pixels.push({ x: 8, y: 8, color: sandColor, className: "animate-sand-stream" });
  } else {
    pixels.push({ x: 7, y: 7, color: glassColor });
    pixels.push({ x: 8, y: 7, color: glassColor });
    pixels.push({ x: 7, y: 8, color: glassColor });
    pixels.push({ x: 8, y: 8, color: glassColor });
  }

  return (
    <svg
      viewBox="0 0 16 16"
      className="w-10 h-10 [image-rendering:pixelated]"
      xmlns="http://www.w3.org/2000/svg"
    >
      {pixels.map((p, idx) => (
        <rect
          key={idx}
          x={p.x}
          y={p.y}
          width={1}
          height={1}
          fill={p.color}
          className={p.className}
        />
      ))}
    </svg>
  );
}

export default function RiddleCard({
  riddleData,
  isLoading,
  onAnswerResult,
  onCorrectAnswer,
  onEyangMessage,
  onResetStreak,
  onNextRiddle,
  onGameOver,
  isCorrect = false,
  gameMode = "normal",
  extraLivesSession = 0,
  extraCluesForNextQuestion = 0,
  isTimeStoppedForNextQuestion = false,
  attemptsProp = 0,
  onUpdateAttempts,
  questionIndex,
}: RiddleCardProps) {
  const [answer, setAnswer] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [localAttempts, setLocalAttempts] = useState(0);
  const attempts = onUpdateAttempts ? attemptsProp : localAttempts;
  const setAttempts = onUpdateAttempts || setLocalAttempts;
  const [questionAttempts, setQuestionAttempts] = useState(0);
  const [lastWrong, setLastWrong] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFailedEasy, setIsFailedEasy] = useState(false); // Backwards compatibility if needed, but we will use isFailedQuestion
  const [isFailedQuestion, setIsFailedQuestion] = useState(false);
  const [revealedPlantName, setRevealedPlantName] = useState("");
  const [displayedRiddle, setDisplayedRiddle] = useState("");
  const [isTypingRiddle, setIsTypingRiddle] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [timeLeft, setTimeLeft] = useState(gameMode === "hard" ? 30 : 60);

  const maxLives = (gameMode === "hard" ? 2 : 3) + extraLivesSession;
  const currentLives = maxLives - attempts;

  const handleTimeout = () => {
    const realName = atob(riddleData?.encodedPlant ?? "");

    if (gameMode === "hard") {
      setIsGameOver(true);
      setAttempts(maxLives);
      setQuestionAttempts((q) => q + 1);
      setRevealedPlantName(realName);
      onResetStreak();
      onAnswerResult({
        correct: false,
        plantName: realName,
        feedback: "",
        botanicalFacts: [],
        habitat: "",
        localNames: [],
      });
      onEyangMessage(
        `Waktumu habis di Mode Sulit, Nak! Petualanganmu berakhir seketika. Jawabannya adalah *${realName}*.`,
        "sad",
      );
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setQuestionAttempts((q) => q + 1);
      setLastWrong(true);
      setTimeout(() => setLastWrong(false), 800);

      if (nextAttempts >= maxLives) {
        setIsFailedQuestion(true);
        setRevealedPlantName(realName);
        onResetStreak();
        onAnswerResult({
          correct: false,
          plantName: realName,
          feedback: "",
          botanicalFacts: [],
          habitat: "",
          localNames: [],
        });
        onEyangMessage(
          `Aduh, waktu habis dan petunjukmu sudah habis, Nak. Jawabannya adalah *${realName}*. Mari kita lanjut ke soal berikutnya.`,
          "neutral",
        );
      } else {
        onEyangMessage(
          `Waktu habis, Nak! Eyang kurangi nyawamu satu. (Nyawamu sisa ${maxLives - nextAttempts}. Ini petunjuk tambahan!)`,
          "neutral",
        );
        setTimeLeft(60);
      }
    }
  };

  const handleTimeoutRef = useRef(handleTimeout);
  useEffect(() => {
    handleTimeoutRef.current = handleTimeout;
  }, [handleTimeout]);

  // Timer Tick Effect
  useEffect(() => {
    console.log("RiddleCard timer tick effect triggered. isTimeStoppedForNextQuestion:", isTimeStoppedForNextQuestion, "isLoading:", isLoading, "isCorrect:", isCorrect, "isGameOver:", isGameOver);
    if (gameMode === "easy" || isTimeStoppedForNextQuestion || isCorrect || isGameOver || isLoading || !riddleData) {
      console.log("RiddleCard timer tick effect returning early (no tick started).");
      return;
    }

    console.log("RiddleCard timer tick effect starting interval. timeLeft:", timeLeft);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      console.log("RiddleCard timer tick effect clearing interval.");
      clearInterval(interval);
    };
  }, [riddleData?.id, isCorrect, isGameOver, isLoading, gameMode, isTimeStoppedForNextQuestion]);

  // Trigger timeout logic safely outside rendering
  useEffect(() => {
    if (gameMode === "easy" || isTimeStoppedForNextQuestion || isCorrect || isGameOver || isLoading || !riddleData) {
      return;
    }

    if (timeLeft === 0) {
      handleTimeoutRef.current();
    }
  }, [timeLeft, gameMode, isCorrect, isGameOver, isLoading, riddleData, isTimeStoppedForNextQuestion]);

  // Audio warning beep Effect
  useEffect(() => {
    if (gameMode === "easy" || isTimeStoppedForNextQuestion || isCorrect || isGameOver || isLoading || !riddleData) {
      return;
    }
    if (timeLeft <= 10 && timeLeft > 0) {
      playBeep(600, 0.12, "triangle");
    } else if (timeLeft === 0) {
      playBeep(180, 0.45, "sawtooth");
    }
  }, [timeLeft, gameMode, isCorrect, isGameOver, isLoading, riddleData, isTimeStoppedForNextQuestion]);



  useEffect(() => {
    if (isCorrect) return; // Prevent resetting states when the guess is correct

    setAnswer("");
    if (gameMode !== "hard") {
      setAttempts(0);
    }
    setQuestionAttempts(0);
    setLastWrong(false);
    setIsGameOver(false);
    setIsFailedEasy(false);
    setIsFailedQuestion(false);
    setRevealedPlantName("");
    setTimeLeft(gameMode === "hard" ? 30 : 60);
    setTimeout(() => inputRef.current?.focus(), 400);

    if (!riddleData?.riddle) {
      setDisplayedRiddle("");
      setIsTypingRiddle(false);
      return;
    }
    setDisplayedRiddle("");
    setIsTypingRiddle(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedRiddle(riddleData.riddle.slice(0, i + 1));
      i++;
      if (i >= riddleData.riddle.length) {
        clearInterval(interval);
        setIsTypingRiddle(false);
      }
    }, 18); // typing speed
    return () => {
      clearInterval(interval);
      setIsTypingRiddle(false);
    };
  }, [riddleData?.id, riddleData?.riddle, isCorrect, gameMode]);

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const circle = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.style.cssText = `
      position:absolute; border-radius:50%; background:rgba(255,255,255,0.3);
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      transform:scale(0); animation:ripple 0.6s linear; pointer-events:none;
    `;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 700);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || !riddleData || isChecking || isGameOver) return;

    const trimmedAnswer = answer.trim();
    if (trimmedAnswer.length < 4) {
      onEyangMessage(
        "Jawabanmu terlalu pendek, Nak. Masukkan paling tidak 4 huruf agar Eyang yakin itu bukan ketidaksengajaan.",
        "thinking",
      );
      return;
    }

    setIsChecking(true);
    onEyangMessage(
      "Hmm... biarkan aku memeriksa jawabanmu, Nak...",
      "thinking",
    );

    try {
      const res = await fetch("/api/check-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer: trimmedAnswer,
          encodedPlant: riddleData.encodedPlant,
        }),
      });
      const result: CheckResult = await res.json();

      if (result.correct) {
        onAnswerResult(result);
        onEyangMessage(result.feedback, "proud");
        onCorrectAnswer(result.plantName);
        setAnswer("");
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        setQuestionAttempts((q) => q + 1);

        setLastWrong(true);
        setTimeout(() => setLastWrong(false), 800);

        // In Hard Mode, any single wrong answer breaks the streak immediately
        if (gameMode === "hard") {
          onResetStreak();
        }

        if (nextAttempts >= maxLives) {
          const realName = atob(riddleData.encodedPlant);
          setRevealedPlantName(realName);
          onResetStreak(); // Break streak when attempts are exhausted
          
          if (gameMode === "easy" || gameMode === "normal") {
            setIsFailedQuestion(true);
            setIsFailedEasy(true);
            onAnswerResult({
              correct: false,
              plantName: realName,
              feedback: "",
              botanicalFacts: [],
              habitat: "",
              localNames: [],
            });
            onEyangMessage(
              `Sayang sekali, petunjukmu sudah habis, Nak. Jawabannya adalah *${realName}*. Mari kita lanjut ke soal berikutnya.`,
              "neutral",
            );
          } else {
            // Game Over State (Hard mode)
            setIsGameOver(true);
            onAnswerResult({
              correct: false,
              plantName: realName,
              feedback: "",
              botanicalFacts: [],
              habitat: "",
              localNames: [],
            });
            onEyangMessage(
              `Aduh, sayang sekali nyawamu sudah habis, Nak. Jawabannya adalah *${realName}*. Mari kembali ke perkemahan untuk mempelajari tumbuhan Nusantara lainnya!`,
              "sad",
            );
          }
        } else {
          // Masih sisa nyawa
          onEyangMessage(
            `${result.feedback} (Nyawamu sisa ${maxLives - nextAttempts}. Eyang berikan petunjuk tambahan!)`,
            "neutral",
          );
        }
      }
    } catch {
      onEyangMessage(
        "Maaf, ada gangguan di hutan... coba lagi ya, Nak.",
        "neutral",
      );
    } finally {
      setIsChecking(false);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        className="card-wood-rpg p-8 flex flex-col items-center justify-center gap-4 min-h-[280px]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Loader2 className="w-10 h-10 text-olive-green animate-spin" />
        <p
          className="text-center font-bold uppercase tracking-wider text-earth-brown text-sm"
          style={{ fontFamily: "var(--font-title)" }}
        >
          Eyang Rimba sedang meramu teka-teki...
        </p>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-olive-green"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  if (!riddleData) {
    return (
      <motion.div
        className="card-wood-rpg p-8 flex flex-col items-center justify-center gap-4 min-h-[280px]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <AlertCircle className="w-10 h-10 text-red-500 animate-bounce" />
        <p
          className="text-center font-bold uppercase tracking-wider text-red-700 text-sm"
          style={{ fontFamily: "var(--font-title)" }}
        >
          Gagal memuat teka-teki botani
        </p>
        <p className="text-xs text-pixel-dark font-medium text-center">
          Sepertinya ada kabut tebal di hutan (koneksi API terputus).
        </p>
        <motion.button
          type="button"
          onClick={onNextRiddle}
          className="btn-organic py-2.5 px-6 bg-pixel-wood border-pixel-wood text-white cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Coba Lagi
        </motion.button>
      </motion.div>
    );
  }

  const diff =
    DIFFICULTY_CONFIG[riddleData.difficulty] || DIFFICULTY_CONFIG.sedang;

  return (
    <motion.div
      key={riddleData.id}
      className="card-wood-rpg h-auto flex flex-col m-1"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Header bar */}
      <div className="px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-b-4 border-pixel-wood bg-pixel-moss">
        <div className="flex items-center gap-2 text-white">
          <Compass className="w-4 h-4 text-pixel-gold" />
          <span
            className="text-section-label"
          >
            Investigasi Spesimen
          </span>
        </div>

        {/* Lives Display (Pixel Hearts) */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-pixel-dark border-2 border-pixel-wood">
          {[...Array(maxLives)].map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-center"
              animate={
                i >= currentLives ? { scale: [1, 1.2, 1], opacity: 0.3 } : {}
              }
              transition={{ duration: 0.4 }}
            >
              <PixelHeart active={i < currentLives} />
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span
            className="text-[8px] font-bold uppercase tracking-wider px-2.5 py-0.5 border-2"
            style={{
              backgroundColor: diff.bg,
              color: diff.color,
              borderColor: "var(--pixel-wood)",
            }}
          >
            {diff.label}
          </span>
          <span
            className="text-[8px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-pixel-dark border-2 text-white"
            style={{ borderColor: "var(--pixel-wood)" }}
          >
            {riddleData.category}
          </span>
        </div>
      </div>

      <div className="px-6 pt-6 pb-20 space-y-5">
        <style>{`
          @keyframes pixel-pulse {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 1; }
          }
          @keyframes pixel-shake {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            20% { transform: translate(-2px, 1px) rotate(-0.5deg); }
            40% { transform: translate(1px, -1px) rotate(0.5deg); }
            60% { transform: translate(-1px, 2px) rotate(0deg); }
            80% { transform: translate(2px, 1px) rotate(0.5deg); }
          }
          .animate-pixel-shake {
            animation: pixel-shake 0.15s infinite;
          }
          .animate-pixel-pulse-red {
            animation: pixel-pulse-red 1s infinite ease-in-out;
          }
          @keyframes pixel-pulse-red {
            0%, 100% { border-color: #b91c1c; background-color: rgba(127, 29, 29, 0.15); filter: drop-shadow(0 0 2px rgba(220, 38, 38, 0.4)); }
            50% { border-color: #ef4444; background-color: rgba(127, 29, 29, 0.35); filter: drop-shadow(0 0 8px rgba(220, 38, 38, 0.8)); }
          }
          .animate-sand-stream {
            animation: pixel-pulse 0.4s infinite step-end;
          }
        `}</style>

        {/* Timer Box */}
        {gameMode !== "easy" && !isGameOver && (
          <div 
            className={`flex items-center justify-center gap-3 p-3 border-4 transition-all duration-300
              ${isTimeStoppedForNextQuestion 
                ? "border-sky-600 bg-sky-950/15 shadow-[0_0_8px_rgba(56,189,248,0.5)]" 
                : (timeLeft <= 10 ? "animate-pixel-pulse-red border-red-700 bg-red-950/15" : "border-pixel-wood bg-pixel-moss/10")}`}
            style={{ imageRendering: "pixelated" }}
          >
            <div className={timeLeft <= 10 && !isTimeStoppedForNextQuestion ? "animate-pixel-shake" : ""}>
              {isTimeStoppedForNextQuestion ? (
                <div className="animate-pulse">
                  <PixelHourglass timeLeft={30} />
                </div>
              ) : (
                <PixelHourglass timeLeft={timeLeft} />
              )}
            </div>
            <div className="flex flex-col">
              <span 
                className={`text-[9px] font-bold uppercase tracking-wider
                  ${isTimeStoppedForNextQuestion 
                    ? "text-sky-500" 
                    : (timeLeft <= 10 ? "text-red-700" : "text-pixel-wood")}`}
                style={{ fontFamily: "var(--font-title)" }}
              >
                {isTimeStoppedForNextQuestion ? "Waktu Beku ❄️" : "Sisa Waktu"}
              </span>
              <span 
                className={`text-xl font-bold leading-none mt-1
                  ${isTimeStoppedForNextQuestion 
                    ? "text-sky-600 animate-pulse" 
                    : (timeLeft <= 10 ? "text-red-700" : "text-pixel-dark")}`}
                style={{ fontFamily: "var(--font-title)" }}
              >
                {isTimeStoppedForNextQuestion ? "Beku (30s)" : `${timeLeft} Detik`}
              </span>
            </div>
          </div>
        )}

        {/* Riddle & First Letter */}
        <div
          className="p-5 space-y-3 border-4 border-pixel-wood bg-pixel-moss/10"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Label badge */}
          <div className="inline-flex items-center gap-1.5">
            <span
              className="px-3 py-1 border-2 border-pixel-wood text-[9px] font-bold uppercase tracking-wider bg-pixel-leaf text-pixel-parchment"
              style={{ fontFamily: "var(--font-title)", letterSpacing: "0.14em" }}
            >
              Pernyataan Eyang
            </span>
          </div>

          <p
            className="text-riddle-body leading-loose"
          >
            &ldquo;{displayedRiddle}
            {isTypingRiddle && (
              <span
                className="inline-block ml-1 w-2.5 h-4.5 align-middle bg-pixel-gold"
                style={{
                  animation: "typewriter-cursor 0.7s ease-in-out infinite",
                }}
              />
            )}
            &rdquo;
          </p>

          {/* First Letter Clue (Always Visible) */}
          <div className="flex items-center gap-2 pt-2.5 border-t-2 border-dashed border-pixel-wood/30 text-xs font-bold text-pixel-wood uppercase tracking-wider">
            <span>🏷️</span>
            <span>
              Huruf Awalan Spesimen:{" "}
              <strong
                className="text-white text-[10px] uppercase bg-pixel-wood px-2 py-0.5 border-2 border-pixel-wood ml-1"
                style={{ fontFamily: "var(--font-title)" }}
              >
                {riddleData.firstLetter}
              </strong>
            </span>
          </div>
        </div>

        {/* Fun fact */}
        <div className="card-showcase-gold p-4 flex flex-col items-center text-center">
          <div className="card-parchment w-full p-5 text-pixel-dark flex flex-col items-center relative gap-2">
            <PixelLightbulb />
            <span className="text-fun-fact-header block">
              FUN FACT FLORA
            </span>
            <p
              className="font-semibold text-pixel-dark leading-relaxed max-w-sm"
              style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: "1.8" }}
            >
              {riddleData.funFact}
            </p>
          </div>
        </div>

        {/* Dynamic Clues Display */}
        <div className="space-y-2">
          {riddleData.clues &&
            riddleData.clues.map((clue, idx) => {
              const isRevealed = (questionAttempts + extraCluesForNextQuestion) > idx;
              return (
                <AnimatePresence key={idx}>
                  {isRevealed && (
                    <motion.div
                      className="flex items-start gap-2.5 p-3.5 border-2 border-pixel-wood bg-pixel-parchment-dark"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-pixel-wood" />
                      <div className="text-xs sm:text-sm text-pixel-dark font-medium leading-relaxed">
                        <strong
                          className="uppercase tracking-wider text-[9px] block mb-0.5 text-pixel-wood"
                          style={{ fontFamily: "var(--font-title)" }}
                        >
                          Petunjuk Tambahan #{idx + 1}
                        </strong>
                        {clue}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
        </div>

        {/* Answer form / Game Over / Failed Question View */}
        {isFailedQuestion ? (
          <motion.div
            className="p-5 text-center space-y-4 border-4 border-pixel-wood bg-pixel-parchment-dark"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center justify-center gap-2 text-pixel-wood">
              <span className="text-lg">🍂</span>
              <p
                className="text-sm font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Petunjuk Habis
              </p>
            </div>
            <p
              className="text-xs font-semibold text-pixel-dark leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Jawaban yang benar adalah:{" "}
              <span className="text-red-750 font-extrabold underline uppercase">
                {revealedPlantName}
              </span>
              .
            </p>
            <motion.button
              type="button"
              id="next-riddle-easy-failed-btn"
              onClick={onNextRiddle}
              className="btn-organic w-full py-3.5 bg-pixel-wood hover:bg-pixel-wood/80 border-pixel-wood text-white cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {questionIndex && questionIndex >= 15 ? "🏁 Selesai Penyelidikan" : "👉 Lanjut ke Soal Berikutnya"}
            </motion.button>
          </motion.div>
        ) : !isGameOver ? (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <div className="relative my-5">
              <motion.input
                ref={inputRef}
                id="answer-input"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Ketik nama tanaman di sini..."
                className="input-organic pr-10"
                disabled={isChecking}
                animate={lastWrong ? { x: [-6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                autoComplete="off"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
                🌿
              </span>
            </div>

            <motion.button
              ref={btnRef}
              id="submit-answer-btn"
              type="submit"
              className="btn-organic w-full flex items-center justify-center gap-2 cursor-pointer"
              disabled={!answer.trim() || isChecking}
              onClick={handleRipple}
              whileTap={{ scale: 0.96 }}
              style={{ opacity: !answer.trim() || isChecking ? 0.65 : 1 }}
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Memvalidasi...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4 text-white" />
                  <span>Tebak Spesimen! ({currentLives} Nyawa)</span>
                </>
              )}
            </motion.button>
          </form>
        ) : (
          <motion.div
            className="p-5 text-center space-y-4 border-4 border-red-700 bg-red-950/20"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center justify-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5 animate-bounce" />
              <p
                className="text-sm font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Penjelajahan Gagal
              </p>
            </div>
            <p
              className="text-xs font-semibold text-pixel-dark"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Kesempatanmu habis! Jawabannya adalah{" "}
              <span className="text-red-750 font-extrabold underline uppercase">
                {revealedPlantName}
              </span>
              .
            </p>
            <motion.button
              type="button"
              id="game-over-riddle-btn"
              onClick={onGameOver}
              className="btn-organic w-full py-3.5 bg-red-800 hover:bg-red-900 border-pixel-wood text-white cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🥀 Akhiri Penjelajahan (Game Over)
            </motion.button>
          </motion.div>
        )}

        {/* Attempts status text */}
        {!isGameOver && questionAttempts > 0 && (
          <p className="relative block mt-6 mb-4 text-center text-[10px] uppercase font-bold tracking-widest text-red-700" style={{ fontFamily: "var(--font-title)" }}>
            Salah {questionAttempts}x • Sisa nyawa: {currentLives} Jantung
          </p>
        )}
      </div>
    </motion.div>
  );
}
