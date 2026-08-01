"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Lightbulb,
  RotateCcw,
  Timer,
  Trophy,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Lock,
  AlertTriangle
} from "lucide-react";
import { TTSLevel, TTSClue, TTS_LEVELS } from "@/lib/ttsDatabase";
import { PixelCrossword } from "@/components/PixelIcon";

interface TTSFloraModalProps {
  open: boolean;
  onClose: () => void;
  onScoreEarned?: (score: number) => void;
}

// Helper to dynamically sanitize any plant name spoiler from text
function scrubPlantSpoiler(text: string, plantName: string): string {
  if (!text || !plantName) return text;
  const escaped = plantName.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`\\b${escaped}\\b`, "gi");
  return text.replace(regex, "tanaman ini");
}

export default function TTSFloraModal({ open, onClose, onScoreEarned }: TTSFloraModalProps) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const currentLevel: TTSLevel = TTS_LEVELS[currentLevelIndex] || TTS_LEVELS[0];

  // Map to store inputs per level ID: levelId -> Record<`${row}_${col}`, string>
  const [levelProgressMap, setLevelProgressMap] = useState<Record<string, Record<string, string>>>({});
  
  // Current active grid inputs for current level
  const [gridInputs, setGridInputs] = useState<Record<string, string>>({});
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [activeDirection, setActiveDirection] = useState<"across" | "down">("across");

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedScore, setEarnedScore] = useState(0);

  // Double validation confirmation modals
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Load a level and restore its saved progress
  const loadLevel = useCallback((levelIdx: number, progressMap: Record<string, Record<string, string>>) => {
    const targetLevel = TTS_LEVELS[levelIdx] || TTS_LEVELS[0];
    const savedInputs = progressMap[targetLevel.id] || {};
    
    setGridInputs(savedInputs);
    setSelectedCell(null);
    setIsCompleted(false);
    setShowExitConfirm(false);
    setShowResetConfirm(false);

    if (targetLevel.clues.length > 0) {
      const firstClue = targetLevel.clues[0];
      setSelectedCell({ row: firstClue.row, col: firstClue.col });
      setActiveDirection(firstClue.direction);
    }
  }, []);

  // On modal open, pick random level or reset session progress map
  useEffect(() => {
    if (open) {
      const randomIndex = Math.floor(Math.random() * TTS_LEVELS.length);
      setCurrentLevelIndex(randomIndex);
      setLevelProgressMap({});
      setTimerSeconds(0);
      setHintsLeft(3);
      setEarnedScore(0);
      loadLevel(randomIndex, {});
    }
  }, [open, loadLevel]);

  // Switch Level with Progress Save (Drawback / Level Browsing)
  const handleSwitchLevel = (nextLevelIdx: number) => {
    // 1. Save current level inputs to progress map
    const updatedMap = {
      ...levelProgressMap,
      [currentLevel.id]: gridInputs
    };
    setLevelProgressMap(updatedMap);

    // 2. Switch level index and load stored inputs
    setCurrentLevelIndex(nextLevelIdx);
    loadLevel(nextLevelIdx, updatedMap);
  };

  // Timer Effect
  useEffect(() => {
    if (!open || isCompleted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [open, isCompleted]);

  // Build grid layout metadata
  const validCells = useMemo(() => {
    const map: Record<string, { letter: string; clueNumbers: number[]; acrossClue?: TTSClue; downClue?: TTSClue }> = {};

    currentLevel.clues.forEach((clue) => {
      const { answer, row, col, direction, number } = clue;
      for (let i = 0; i < answer.length; i++) {
        const r = direction === "across" ? row : row + i;
        const c = direction === "across" ? col + i : col;
        const key = `${r}_${c}`;

        if (!map[key]) {
          map[key] = { letter: answer[i], clueNumbers: [] };
        }
        if (i === 0) {
          map[key].clueNumbers.push(number);
        }
        if (direction === "across") map[key].acrossClue = clue;
        if (direction === "down") map[key].downClue = clue;
      }
    });

    return map;
  }, [currentLevel]);

  // Calculate locked cells (Cells belonging to fully solved & correct clues)
  const lockedCellKeys = useMemo(() => {
    const lockedSet = new Set<string>();
    currentLevel.clues.forEach((clue) => {
      const { answer, row, col, direction } = clue;
      let isClueCorrect = true;
      for (let i = 0; i < answer.length; i++) {
        const r = direction === "across" ? row : row + i;
        const c = direction === "across" ? col + i : col;
        const key = `${r}_${c}`;
        if ((gridInputs[key] || "").toUpperCase() !== answer[i]) {
          isClueCorrect = false;
          break;
        }
      }
      if (isClueCorrect) {
        for (let i = 0; i < answer.length; i++) {
          const r = direction === "across" ? row : row + i;
          const c = direction === "across" ? col + i : col;
          lockedSet.add(`${r}_${c}`);
        }
      }
    });
    return lockedSet;
  }, [currentLevel, gridInputs]);

  // Active clue determination based on selected cell & direction
  const activeClue = useMemo(() => {
    if (!selectedCell) return currentLevel.clues[0] || null;
    const key = `${selectedCell.row}_${selectedCell.col}`;
    const cellData = validCells[key];
    if (!cellData) return currentLevel.clues[0] || null;

    if (activeDirection === "across" && cellData.acrossClue) return cellData.acrossClue;
    if (activeDirection === "down" && cellData.downClue) return cellData.downClue;
    return cellData.acrossClue || cellData.downClue || currentLevel.clues[0];
  }, [selectedCell, activeDirection, validCells, currentLevel]);

  // Check completion
  const checkCompletion = useCallback((inputs: Record<string, string>) => {
    const allKeys = Object.keys(validCells);
    if (allKeys.length === 0) return false;

    let correctCount = 0;
    for (const key of allKeys) {
      if ((inputs[key] || "").toUpperCase() === validCells[key].letter) {
        correctCount++;
      }
    }

    if (correctCount === allKeys.length) {
      const baseScore = 300;
      const speedBonus = Math.max(0, 150 - timerSeconds);
      const totalScore = baseScore + speedBonus + hintsLeft * 25;

      setEarnedScore(totalScore);
      setIsCompleted(true);
      if (onScoreEarned) {
        onScoreEarned(totalScore);
      }
      return true;
    }
    return false;
  }, [validCells, timerSeconds, hintsLeft, onScoreEarned]);

  // Key press handler with Auto-Advance in Down/Across direction & Locked Cell Protection
  const handleInputLetter = useCallback((char: string) => {
    if (!selectedCell || isCompleted) return;
    const key = `${selectedCell.row}_${selectedCell.col}`;
    if (!validCells[key]) return;

    let newInputs = gridInputs;

    // Only overwrite letter if the cell is NOT locked
    if (!lockedCellKeys.has(key)) {
      newInputs = { ...gridInputs, [key]: char.toUpperCase() };
      setGridInputs(newInputs);
      // Persist immediately to progress map
      setLevelProgressMap((prev) => ({
        ...prev,
        [currentLevel.id]: newInputs
      }));
    }

    // Auto-advance focus to next cell along activeDirection (down or across)
    let curRow = selectedCell.row;
    let curCol = selectedCell.col;

    for (let step = 1; step <= 10; step++) {
      const nextRow = activeDirection === "down" ? curRow + step : curRow;
      const nextCol = activeDirection === "across" ? curCol + step : curCol;
      const nextKey = `${nextRow}_${nextCol}`;

      if (validCells[nextKey]) {
        setSelectedCell({ row: nextRow, col: nextCol });
        if (!lockedCellKeys.has(nextKey)) {
          break;
        }
      } else {
        break;
      }
    }

    checkCompletion(newInputs);
  }, [selectedCell, isCompleted, validCells, gridInputs, activeDirection, lockedCellKeys, currentLevel, checkCompletion]);

  // Backspace Handler with Locked Cell Protection & Backwards Navigation
  const handleBackspace = useCallback(() => {
    if (!selectedCell || isCompleted) return;
    const key = `${selectedCell.row}_${selectedCell.col}`;

    if (gridInputs[key] && !lockedCellKeys.has(key)) {
      const newInputs = { ...gridInputs };
      delete newInputs[key];
      setGridInputs(newInputs);
      setLevelProgressMap((prev) => ({
        ...prev,
        [currentLevel.id]: newInputs
      }));
    } else {
      let curRow = selectedCell.row;
      let curCol = selectedCell.col;

      for (let step = 1; step <= 10; step++) {
        const prevRow = activeDirection === "down" ? curRow - step : curRow;
        const prevCol = activeDirection === "across" ? curCol - step : curCol;
        const prevKey = `${prevRow}_${prevCol}`;

        if (validCells[prevKey]) {
          setSelectedCell({ row: prevRow, col: prevCol });
          if (!lockedCellKeys.has(prevKey)) {
            const newInputs = { ...gridInputs };
            delete newInputs[prevKey];
            setGridInputs(newInputs);
            setLevelProgressMap((prev) => ({
              ...prev,
              [currentLevel.id]: newInputs
            }));
            break;
          }
        } else {
          break;
        }
      }
    }
  }, [selectedCell, isCompleted, gridInputs, activeDirection, validCells, lockedCellKeys, currentLevel]);

  // Handle Physical Keyboard Event
  useEffect(() => {
    if (!open || isCompleted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "ArrowRight") {
        if (selectedCell) setSelectedCell({ row: selectedCell.row, col: Math.min(currentLevel.gridSize.cols - 1, selectedCell.col + 1) });
      } else if (e.key === "ArrowLeft") {
        if (selectedCell) setSelectedCell({ row: selectedCell.row, col: Math.max(0, selectedCell.col - 1) });
      } else if (e.key === "ArrowDown") {
        if (selectedCell) setSelectedCell({ row: Math.min(currentLevel.gridSize.rows - 1, selectedCell.row + 1), col: selectedCell.col });
      } else if (e.key === "ArrowUp") {
        if (selectedCell) setSelectedCell({ row: Math.max(0, selectedCell.row - 1), col: selectedCell.col });
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleInputLetter(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, isCompleted, selectedCell, currentLevel, handleBackspace, handleInputLetter]);

  // Handle Hint
  const handleUseHint = () => {
    if (hintsLeft <= 0 || !selectedCell || isCompleted) return;
    const key = `${selectedCell.row}_${selectedCell.col}`;
    const cellData = validCells[key];
    if (!cellData) return;

    const newInputs = { ...gridInputs, [key]: cellData.letter };
    setGridInputs(newInputs);
    setLevelProgressMap((prev) => ({
      ...prev,
      [currentLevel.id]: newInputs
    }));
    setHintsLeft((prev) => prev - 1);
    checkCompletion(newInputs);
  };

  // Cell Click Handler with Smart Direction Auto-Select
  const handleCellClick = (r: number, c: number) => {
    const key = `${r}_${c}`;
    const cellData = validCells[key];
    if (!cellData) return;

    if (selectedCell?.row === r && selectedCell?.col === c) {
      if (cellData.acrossClue && cellData.downClue) {
        setActiveDirection((prev) => (prev === "across" ? "down" : "across"));
      }
    } else {
      setSelectedCell({ row: r, col: c });
      if (cellData.acrossClue && !cellData.downClue) {
        setActiveDirection("across");
      } else if (!cellData.acrossClue && cellData.downClue) {
        setActiveDirection("down");
      }
    }
  };

  // Attempt Close with Double Validation
  const handleAttemptClose = () => {
    if (isCompleted || Object.keys(gridInputs).length === 0) {
      onClose();
    } else {
      setShowExitConfirm(true);
    }
  };

  // Attempt Reset with Double Validation
  const handleAttemptReset = () => {
    if (Object.keys(gridInputs).length === 0) {
      setGridInputs({});
      setLevelProgressMap((prev) => ({
        ...prev,
        [currentLevel.id]: {}
      }));
    } else {
      setShowResetConfirm(true);
    }
  };

  // Progress percentage for current level
  const progressPercent = useMemo(() => {
    const total = Object.keys(validCells).length;
    if (total === 0) return 0;
    let correct = 0;
    Object.keys(validCells).forEach((key) => {
      if ((gridInputs[key] || "").toUpperCase() === validCells[key].letter) {
        correct++;
      }
    });
    return Math.round((correct / total) * 100);
  }, [validCells, gridInputs]);

  // Format timer seconds into MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[150] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <motion.div
          className="w-full max-w-5xl bg-[#171302] border-4 border-[#3a351e] shadow-2xl flex flex-col my-auto text-[#ece2c1] relative overflow-hidden"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          {/* Top Bar HUD */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#2f2a14] border-b-4 border-[#3a351e]">
            {/* Title & Level selector with Drawback Progress Save */}
            <div className="flex items-center gap-3">
              <PixelCrossword size={22} className="text-[#ecc246]" />
              <h2
                className="text-xs sm:text-base font-bold text-[#ecc246] uppercase tracking-wider"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                KISI SILANG RIMBA
              </h2>
              {/* Level Selector Tabs with Saved Progress */}
              <div className="hidden sm:flex items-center gap-1 bg-[#171302] px-2 py-1 border border-[#3a351e] text-xs">
                <button
                  onClick={() => {
                    const nextIdx = currentLevelIndex > 0 ? currentLevelIndex - 1 : TTS_LEVELS.length - 1;
                    handleSwitchLevel(nextIdx);
                  }}
                  className="hover:text-[#ecc246] cursor-pointer"
                  title="Level Sebelumnya (Progres Tersimpan)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[#ecc246] font-bold px-1">{currentLevel.title.split(":")[0]}</span>
                <button
                  onClick={() => {
                    const nextIdx = currentLevelIndex < TTS_LEVELS.length - 1 ? currentLevelIndex + 1 : 0;
                    handleSwitchLevel(nextIdx);
                  }}
                  className="hover:text-[#ecc246] cursor-pointer"
                  title="Level Selanjutnya (Progres Tersimpan)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* HUD Status: Timer, Hint, Reset, Close */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Timer */}
              <div className="flex items-center gap-1 bg-[#171302] px-2.5 py-1 border-2 border-[#3a351e] text-xs text-[#ecc246]">
                <Timer className="w-4 h-4" />
                <span className="font-mono font-bold">{formatTime(timerSeconds)}</span>
              </div>

              {/* Hint button */}
              <button
                onClick={handleUseHint}
                disabled={hintsLeft <= 0 || isCompleted}
                className="flex items-center gap-1 px-2.5 py-1 bg-[#5e3c25] hover:bg-[#4a5d23] text-[#ece2c1] border-2 border-[#8a5a3a] disabled:opacity-50 text-xs font-bold uppercase transition-all cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-[#ecc246]" />
                <span>HINT ({hintsLeft})</span>
              </button>

              {/* Reset button */}
              <button
                onClick={handleAttemptReset}
                className="p-1.5 bg-[#5e3c25] hover:bg-[#8a5a3a] border-2 border-[#8a5a3a] text-[#ece2c1] transition-all cursor-pointer"
                title="Reset Papan Level Ini"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Close Button with Double Validation */}
              <button
                onClick={handleAttemptClose}
                className="p-1.5 bg-[#93000a] hover:bg-[#ffb4ab] hover:text-black border-2 border-[#ffdad6] text-[#ece2c1] transition-all cursor-pointer"
                title="Tutup & Keluar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Grid & Clue Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 items-start bg-[#171302]">
            {/* Left: Crossword Grid (Span 7) */}
            <div className="lg:col-span-7 flex flex-col items-center gap-3">
              {/* Level Quick Tabs */}
              <div className="flex gap-2 w-full max-w-md justify-center sm:hidden mb-1">
                {TTS_LEVELS.map((lvl, idx) => (
                  <button
                    key={lvl.id}
                    onClick={() => handleSwitchLevel(idx)}
                    className={`px-3 py-1 text-xs font-bold border ${
                      currentLevelIndex === idx
                        ? "bg-[#ecc246] text-black border-[#ffe08e]"
                        : "bg-[#2f2a14] text-[#ece2c1] border-[#3a351e]"
                    }`}
                  >
                    Lvl {idx + 1}
                  </button>
                ))}
              </div>

              {/* Grid Box */}
              <div className="p-3 sm:p-4 bg-[#5e3c25] border-4 border-[#3d2e00] shadow-xl relative w-full max-w-md">
                <div
                  className="grid gap-1 bg-[#2a1b11] p-2 border-2 border-[#120e01]"
                  style={{
                    gridTemplateColumns: `repeat(${currentLevel.gridSize.cols}, minmax(0, 1fr))`
                  }}
                >
                  {Array.from({ length: currentLevel.gridSize.rows }).map((_, r) =>
                    Array.from({ length: currentLevel.gridSize.cols }).map((_, c) => {
                      const key = `${r}_${c}`;
                      const isValid = !!validCells[key];
                      const isSelected = selectedCell?.row === r && selectedCell?.col === c;
                      const isLocked = lockedCellKeys.has(key);

                      let isHighlight = false;
                      if (activeClue && isValid) {
                        const { answer, row, col, direction } = activeClue;
                        for (let i = 0; i < answer.length; i++) {
                          const cr = direction === "across" ? row : row + i;
                          const cc = direction === "across" ? col + i : col;
                          if (cr === r && cc === c) {
                            isHighlight = true;
                            break;
                          }
                        }
                      }

                      const userChar = gridInputs[key] || "";
                      const cellNumbers = validCells[key]?.clueNumbers || [];

                      if (!isValid) {
                        return (
                          <div
                            key={key}
                            className="w-full aspect-square bg-[#120e01] border border-[#2a1b11]/40"
                          />
                        );
                      }

                      return (
                        <div
                          key={key}
                          onClick={() => handleCellClick(r, c)}
                          className={`w-full aspect-square relative flex items-center justify-center cursor-pointer transition-all border-2 select-none ${
                            isSelected
                              ? "bg-[#ecc246] text-[#171302] border-[#ffe08e] scale-105 z-10 shadow-lg font-extrabold"
                              : isLocked
                              ? "bg-[#2d5a1b] text-[#86efac] border-[#4ade80]"
                              : isHighlight
                              ? "bg-[#4a5d23] text-[#ecc246] border-[#ecc246]"
                              : "bg-[#3a351e] text-[#ece2c1] border-[#120e01] hover:bg-[#3e3922]"
                          }`}
                        >
                          {cellNumbers.length > 0 && (
                            <span className={`absolute top-0.5 left-0.5 text-[8px] sm:text-[10px] font-bold leading-none ${
                              isLocked ? "text-[#86efac]" : "text-[#ecc246]"
                            }`}>
                              {cellNumbers.join("/")}
                            </span>
                          )}

                          {isLocked && !isSelected && (
                            <span className="absolute bottom-0.5 right-0.5 text-[8px] font-bold text-[#86efac] leading-none">
                              ✓
                            </span>
                          )}

                          <span
                            className="font-bold text-xs sm:text-base md:text-lg uppercase"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                          >
                            {userChar}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Virtual Pixel Keyboard for Mobile / Mouse Click */}
              <div className="w-full max-w-md bg-[#2f2a14] p-2 border-2 border-[#3a351e] flex flex-col gap-1.5">
                <div className="flex flex-wrap justify-center gap-1">
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                    <button
                      key={letter}
                      onClick={() => handleInputLetter(letter)}
                      disabled={isCompleted}
                      className="w-7 h-8 sm:w-8 sm:h-9 bg-[#5e3c25] hover:bg-[#4a5d23] active:bg-[#ecc246] active:text-black border-b-2 border-[#2a1b11] text-[#ece2c1] text-xs font-bold uppercase transition-all cursor-pointer"
                    >
                      {letter}
                    </button>
                  ))}
                  <button
                    onClick={handleBackspace}
                    disabled={isCompleted}
                    className="px-2.5 h-8 sm:h-9 bg-[#93000a] hover:bg-[#ffb4ab] hover:text-black border-b-2 border-[#2a1b11] text-[#ece2c1] text-[10px] font-bold uppercase transition-all cursor-pointer"
                  >
                    DEL
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Botanical Parchment Clue Box (Span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* Parchment Box */}
              <div className="bg-[#f4eedd] text-[#3d2e00] p-4 border-4 border-[#3a351e] shadow-xl relative">
                <div className="flex justify-between items-center border-b-2 border-[#d4cca8] pb-2 mb-3">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase text-[#3d2e00]" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                      Catatan Botani #{activeClue?.number || 1}
                    </h3>
                    <span className="text-[10px] font-bold uppercase text-[#5e3c25] tracking-widest flex items-center gap-1 mt-0.5">
                      {activeClue?.direction === "across" ? "↔ MENDATAR" : "↕ MENURUN"} • {activeClue?.category}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#3d2e00] text-[#ecc246] text-[10px] font-bold uppercase">
                    {activeClue?.answer.length} Huruf
                  </span>
                </div>

                {/* Clue Text (Sanitized No Spoiler) */}
                <div className="bg-[#e8dec0] p-3 border-2 border-[#d4cca8] mb-3">
                  <p className="text-xs sm:text-sm font-bold text-[#3d2e00] leading-relaxed">
                    &quot;{scrubPlantSpoiler(activeClue?.clue || "", activeClue?.answer || "")}&quot;
                  </p>
                </div>

                {/* Botanical Fact Box (Sanitized No Spoiler) */}
                <div className="bg-[#3d2e00] text-[#ece2c1] p-3 border-2 border-[#d4cca8] text-xs">
                  <div className="flex items-center gap-1.5 text-[#ecc246] font-bold text-[10px] uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Fakta Unik Eyang Rimba:
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">
                    {scrubPlantSpoiler(activeClue?.botanicalFact || "", activeClue?.answer || "")}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-[#d4cca8]">
                  <div className="flex justify-between text-[10px] font-bold text-[#5e3c25] mb-1">
                    <span>PROGRESS LEVEL INI</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#120e01] h-3 border border-[#3a351e] overflow-hidden">
                    <div
                      className="h-full bg-[#ecc246] transition-all duration-300 shadow-[0_0_8px_rgba(236,194,70,0.6)]"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* All Clues Quick List Accordion */}
              <div className="bg-[#2f2a14] p-3 border-2 border-[#3a351e] text-xs max-h-48 overflow-y-auto">
                <h4 className="font-bold text-[#ecc246] uppercase text-[10px] tracking-wider mb-2">
                  Daftar Soal TTS ({currentLevel.title}):
                </h4>
                <div className="space-y-1">
                  {currentLevel.clues.map((c) => {
                    const isSelected = activeClue?.number === c.number && activeClue?.direction === c.direction;
                    let isClueSolved = true;
                    for (let i = 0; i < c.answer.length; i++) {
                      const r = c.direction === "across" ? c.row : c.row + i;
                      const col = c.direction === "across" ? c.col + i : c.col;
                      if ((gridInputs[`${r}_${col}`] || "").toUpperCase() !== c.answer[i]) {
                        isClueSolved = false;
                        break;
                      }
                    }

                    return (
                      <div
                        key={`${c.direction}_${c.number}`}
                        onClick={() => {
                          setSelectedCell({ row: c.row, col: c.col });
                          setActiveDirection(c.direction);
                        }}
                        className={`p-1.5 cursor-pointer text-[11px] transition-colors border flex items-center justify-between ${
                          isClueSolved
                            ? "bg-[#2d5a1b] text-[#86efac] border-[#4ade80]"
                            : isSelected
                            ? "bg-[#4a5d23] text-[#ecc246] border-[#ecc246]"
                            : "bg-[#171302] hover:bg-[#3a351e] text-[#ece2c1] border-[#3a351e]"
                        }`}
                      >
                        <div>
                          <span className="font-bold text-[#ecc246] mr-1">
                            [{c.direction === "across" ? "M" : "N"}{c.number}]
                          </span>
                          {scrubPlantSpoiler(c.clue, c.answer)}
                        </div>
                        {isClueSolved && (
                          <span className="text-[10px] font-bold text-[#86efac] ml-2 flex items-center gap-0.5">
                            <Lock className="w-3 h-3 inline" /> TEKUNCI
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Double Validation: Exit Confirmation Modal */}
          {showExitConfirm && (
            <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <motion.div
                className="bg-[#2f2a14] border-4 border-[#93000a] p-6 max-w-sm w-full text-center flex flex-col items-center gap-4 text-[#ece2c1] shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="w-14 h-14 bg-[#93000a] text-[#ffdad6] flex items-center justify-center border-2 border-[#ffb4ab]">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div>
                  <h3
                    className="text-xs sm:text-sm font-bold text-[#ffb4ab] uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    Tinggalkan TTS Botani?
                  </h3>
                  <p className="text-xs text-[#ece2c1]/80 leading-relaxed">
                    Progres pengisian teka-teki yang belum selesai pada level ini akan hilang jika kamu keluar sekarang.
                  </p>
                </div>

                <div className="flex gap-2 w-full mt-2">
                  <button
                    onClick={() => setShowExitConfirm(false)}
                    className="flex-1 py-2.5 bg-[#4a5d23] hover:bg-[#5e3c25] text-[#ecc246] font-bold text-xs border-2 border-[#ecc246] cursor-pointer uppercase transition-all"
                  >
                    Batal (Lanjut Playing)
                  </button>
                  <button
                    onClick={() => {
                      setShowExitConfirm(false);
                      onClose();
                    }}
                    className="py-2.5 px-4 bg-[#93000a] hover:bg-[#ffb4ab] hover:text-black text-[#ece2c1] font-bold text-xs border-2 border-[#ffdad6] cursor-pointer uppercase transition-all"
                  >
                    Keluar
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Double Validation: Reset Confirmation Modal */}
          {showResetConfirm && (
            <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <motion.div
                className="bg-[#2f2a14] border-4 border-[#5e3c25] p-6 max-w-sm w-full text-center flex flex-col items-center gap-4 text-[#ece2c1] shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="w-14 h-14 bg-[#5e3c25] text-[#ecc246] flex items-center justify-center border-2 border-[#8a5a3a]">
                  <RotateCcw className="w-8 h-8" />
                </div>
                <div>
                  <h3
                    className="text-xs sm:text-sm font-bold text-[#ecc246] uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    Reset Papan Level Ini?
                  </h3>
                  <p className="text-xs text-[#ece2c1]/80 leading-relaxed">
                    Jawaban yang sudah terisi di papan level ini akan dibersihkan kembali dari awal.
                  </p>
                </div>

                <div className="flex gap-2 w-full mt-2">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-2.5 bg-[#5e3c25] hover:bg-[#8a5a3a] text-[#ece2c1] font-bold text-xs border-2 border-[#3a351e] cursor-pointer uppercase transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      setShowResetConfirm(false);
                      setGridInputs({});
                      setLevelProgressMap((prev) => ({
                        ...prev,
                        [currentLevel.id]: {}
                      }));
                    }}
                    className="flex-1 py-2.5 bg-[#93000a] hover:bg-[#ffb4ab] hover:text-black text-[#ece2c1] font-bold text-xs border-2 border-[#ffdad6] cursor-pointer uppercase transition-all"
                  >
                    Ya, Reset
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Victory Modal Overlay */}
          {isCompleted && (
            <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <motion.div
                className="bg-[#2f2a14] border-4 border-[#ecc246] p-6 max-w-sm w-full text-center flex flex-col items-center gap-4 text-[#ece2c1] shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="w-16 h-16 bg-[#ecc246] text-[#171302] flex items-center justify-center border-4 border-[#fff]">
                  <Trophy className="w-10 h-10" />
                </div>
                <div>
                  <h3
                    className="text-sm sm:text-base font-bold text-[#ecc246] uppercase tracking-wider mb-1"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    TTS Selesai!
                  </h3>
                  <p className="text-xs text-[#ece2c1]/80">
                    Kamu berhasil menyelesaikan seluruh teka-teki botani {currentLevel.title}!
                  </p>
                </div>

                <div className="bg-[#171302] border-2 border-[#ecc246] p-3 w-full flex justify-around text-xs">
                  <div>
                    <span className="text-[#ece2c1]/60 block text-[10px]">WAKTU</span>
                    <span className="text-[#ecc246] font-bold">{formatTime(timerSeconds)}</span>
                  </div>
                  <div>
                    <span className="text-[#ece2c1]/60 block text-[10px]">POIN KEBUN</span>
                    <span className="text-[#ecc246] font-bold">+{earnedScore}</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full mt-2">
                  <button
                    onClick={() => {
                      const nextIdx = (currentLevelIndex + 1) % TTS_LEVELS.length;
                      handleSwitchLevel(nextIdx);
                    }}
                    className="flex-1 py-2 bg-[#4a5d23] hover:bg-[#5e3c25] text-[#ecc246] font-bold text-xs border-2 border-[#ecc246] cursor-pointer uppercase transition-all"
                  >
                    Level Selanjutnya 🎲
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-[#5e3c25] hover:bg-[#8a5a3a] text-[#ece2c1] font-bold text-xs border-2 border-[#3a351e] cursor-pointer uppercase transition-all"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
