"use client";

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PixelTrophy,
  PixelCrown,
  PixelMedalGold,
  PixelMedalSilver,
  PixelMedalBronze,
  PixelStopwatch,
  PixelLeaf,
  PixelTarget,
  PixelRibbon,
  PixelLock,
} from "./PixelIcon";

export interface LeaderboardEntry {
  id: string;
  name: string;
  email?: string;
  avatarType: "google" | "custom";
  customAvatar?: string;
  picture?: string;
  title: string;
  score: number;
  totalCorrect: number; // out of 15
  totalAttempted: number;
  durationSeconds: number; // e.g. 135 -> "02:15"
  floraCount: number;
  maxStreak: number;
  ttsScore?: number;
  ttsCompleted?: number;
  updatedAt: string;
}

// Clean production leaderboard (no dummy accounts)
export const DEFAULT_INITIAL_LEADERBOARD: LeaderboardEntry[] = [];

interface LeaderboardModalProps {
  open: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
  currentUserId?: string;
  currentUserEmail?: string;
  isLoggedIn: boolean;
  onLoginTrigger?: () => void;
  onRefresh?: () => void;
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function LeaderboardModal({
  open,
  onClose,
  entries,
  currentUserId,
  currentUserEmail,
  isLoggedIn,
  onLoginTrigger,
  onRefresh,
}: LeaderboardModalProps) {
  const [activeTab, setActiveTab] = useState<"score" | "speed" | "journal" | "tts">("score");
  const [countdown, setCountdown] = useState(300); // 5 minutes = 300s
  const [isRefreshing, setIsRefreshing] = useState(false);

  const triggerRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setCountdown(300);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => setIsRefreshing(false), 800);
  }, [onRefresh]);

  // 5-minute Auto Refresh Effect
  React.useEffect(() => {
    if (!open) {
      setCountdown(300);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          triggerRefresh();
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open, triggerRefresh]);

  const handleManualRefresh = () => {
    triggerRefresh();
  };

  // Sorted entries according to selected tab
  const sortedEntries = useMemo(() => {
    const list = [...entries];
    if (activeTab === "score") {
      return list.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect;
        return a.durationSeconds - b.durationSeconds;
      });
    } else if (activeTab === "speed") {
      return list.sort((a, b) => {
        const timeA = a.durationSeconds > 0 ? a.durationSeconds : 999999;
        const timeB = b.durationSeconds > 0 ? b.durationSeconds : 999999;
        if (timeA !== timeB) return timeA - timeB;
        return b.score - a.score;
      });
    } else if (activeTab === "tts") {
      return list.sort((a, b) => {
        const ttsA = a.ttsScore || 0;
        const ttsB = b.ttsScore || 0;
        if (ttsB !== ttsA) return ttsB - ttsA;
        return b.score - a.score;
      });
    } else {
      return list.sort((a, b) => {
        if (b.floraCount !== a.floraCount) return b.floraCount - a.floraCount;
        return b.score - a.score;
      });
    }
  }, [entries, activeTab]);

  // Find active user's rank position
  const activeUserRankIndex = useMemo(() => {
    return sortedEntries.findIndex(
      (item) =>
        (currentUserId && item.id === currentUserId) ||
        (currentUserEmail && item.email === currentUserEmail)
    );
  }, [sortedEntries, currentUserId, currentUserEmail]);

  const currentUserEntry = activeUserRankIndex >= 0 ? sortedEntries[activeUserRankIndex] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          /* Note: Outside click closing disabled per user request */
        >
          {/* Outer Wood Frame */}
          <motion.div
            className="relative w-full max-w-5xl flex flex-col overflow-hidden"
            style={{
              maxHeight: "94vh",
              backgroundColor: "#2f1503",
              boxShadow:
                "0 -4px 0 0 #3a351e, 0 4px 0 0 #120e01, -4px 0 0 0 #3a351e, 4px 0 0 0 #120e01, 0 0 0 4px #2f1503, 0 25px 60px rgba(0,0,0,0.9)",
              padding: "10px",
            }}
            initial={{ scale: 0.9, y: 32, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 32, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner Wood Panel */}
            <div
              className="flex flex-col flex-1 overflow-hidden"
              style={{
                backgroundColor: "#5e3c25",
                boxShadow:
                  "inset 4px 4px 0 0 #92623a, inset -4px -4px 0 0 #2f1503",
                padding: "20px",
              }}
            >
              {/* Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-[#92623a] mb-5 gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-none flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "#2f1503",
                      boxShadow: "inset 2px 2px 0 0 #92623a",
                    }}
                  >
                    <PixelCrown size={32} className="text-[#facc15] animate-pulse" />
                  </div>
                  <div>
                    <h2
                      className="text-base sm:text-2xl font-bold tracking-wide text-[#fde68a] uppercase drop-shadow-md"
                      style={{ fontFamily: "'Press Start 2P', monospace, sans-serif" }}
                    >
                      Papan Peringkat Rimba
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <p className="text-xs text-[#d97706] font-semibold">
                        Aula Kehormatan Detektif Flora Nusantara 🌿
                      </p>

                      {isLoggedIn && (
                        <button
                          onClick={handleManualRefresh}
                          title="Klik untuk perbarui data sekarang"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold bg-[#1a0e03] text-[#86efac] border border-[#22c55e]/50 hover:border-[#22c55e] transition-colors cursor-pointer"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          <span className={`inline-block ${isRefreshing ? "animate-spin" : ""}`}>🔄</span>
                          <span>Auto-Refresh: {formatDuration(countdown)}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Explicit Close Button (Only way to exit modal) */}
                <button
                  onClick={onClose}
                  className="self-end sm:self-auto px-4 py-2 text-xs font-bold text-[#fde68a] bg-[#2f1503] hover:bg-[#93000a] transition-colors border-2 border-[#92623a] active:scale-95 cursor-pointer uppercase shadow-md flex items-center gap-1.5"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  <span>✕</span>
                  <span>TUTUP</span>
                </button>
              </div>

              {/* ── UNAUTHENTICATED (NOT LOGGED IN) ALERT SCREEN ── */}
              {!isLoggedIn ? (
                <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-[#2f1503] border-4 border-[#92623a] shadow-inner my-auto gap-4">
                  <div className="w-16 h-16 bg-[#1a0e03] border-2 border-[#facc15] flex items-center justify-center shadow-lg relative">
                    <PixelLock size={36} className="text-[#facc15]" />
                  </div>
                  <h3
                    className="text-sm sm:text-lg font-bold text-[#fde68a] uppercase tracking-wide leading-relaxed"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    Gerbang Aula Kehormatan Terkunci!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#f4eedd]/90 max-w-xl leading-relaxed">
                    Maaf Detektif! Papan Peringkat Rimba hanya dapat diakses & diukir oleh detektif yang sudah terdaftar dan login. Silakan masuk terlebih dahulu untuk melihat dan mencatatkan rekor penjelajahanmu!
                  </p>
                </div>
              ) : (
                /* ── AUTHENTICATED LEADERBOARD VIEW ── */
                <>
                  {/* Filter Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                    <button
                      onClick={() => setActiveTab("score")}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 text-[10px] sm:text-xs font-bold transition-all cursor-pointer border-2 ${
                        activeTab === "score"
                          ? "bg-[#92703a] text-[#fef08a] border-[#facc15] shadow-inner"
                          : "bg-[#2f1503] text-[#d97706] border-[#5e3c25] hover:bg-[#3a200b]"
                      }`}
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      <PixelTrophy size={16} />
                      <span>SKOR UTAMA</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("speed")}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 text-[10px] sm:text-xs font-bold transition-all cursor-pointer border-2 ${
                        activeTab === "speed"
                          ? "bg-[#92703a] text-[#fef08a] border-[#facc15] shadow-inner"
                          : "bg-[#2f1503] text-[#d97706] border-[#5e3c25] hover:bg-[#3a200b]"
                      }`}
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      <PixelStopwatch size={16} />
                      <span>SPEEDRUN</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("journal")}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 text-[10px] sm:text-xs font-bold transition-all cursor-pointer border-2 ${
                        activeTab === "journal"
                          ? "bg-[#92703a] text-[#fef08a] border-[#facc15] shadow-inner"
                          : "bg-[#2f1503] text-[#d97706] border-[#5e3c25] hover:bg-[#3a200b]"
                      }`}
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      <PixelLeaf size={16} />
                      <span>KOLEKSI</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("tts")}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 text-[10px] sm:text-xs font-bold transition-all cursor-pointer border-2 ${
                        activeTab === "tts"
                          ? "bg-[#92703a] text-[#fef08a] border-[#facc15] shadow-inner"
                          : "bg-[#2f1503] text-[#d97706] border-[#5e3c25] hover:bg-[#3a200b]"
                      }`}
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      <span>🧩</span>
                      <span>TTS FLORA</span>
                    </button>
                  </div>

                  {/* Empty Entries State */}
                  {sortedEntries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 text-center bg-[#2f1503] border-2 border-[#5e3c25] my-auto gap-3">
                      <div className="text-4xl select-none">🌱</div>
                      <h4
                        className="text-xs sm:text-sm font-bold text-[#fde68a] uppercase"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        Belum Ada Rekor Terdaftar
                      </h4>
                      <p className="text-xs text-[#d97706] max-w-md">
                        Jadilah Detektif pertama yang mengukir sejarah di Aula Kehormatan Rimba! Selesaikan sesi teka-tekimu untuk mencatatkan namamu di sini.
                      </p>
                    </div>
                  ) : (
                    /* Main Leaderboard Table Container */
                    <div
                      className="flex-1 overflow-y-auto pr-1.5 space-y-3 custom-scrollbar"
                      style={{
                        maxHeight: "56vh",
                      }}
                    >
                      {sortedEntries.map((entry, index) => {
                        const rank = index + 1;
                        const isTop1 = rank === 1;
                        const isTop2 = rank === 2;
                        const isTop3 = rank === 3;
                        const isCurrentUser =
                          (currentUserId && entry.id === currentUserId) ||
                          (currentUserEmail && entry.email === currentUserEmail);

                        const displayTitle = isTop1 ? "👑 Maha Detektif Botani" : entry.title;

                        return (
                          <motion.div
                            key={entry.id || index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04 }}
                            className={`relative flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 sm:gap-4 transition-all ${
                              isTop1
                                ? "bg-gradient-to-r from-[#452906] via-[#52330a] to-[#452906] border-2 border-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.35)]"
                                : isTop2
                                ? "bg-[#382617] border-2 border-[#cbd5e1]"
                                : isTop3
                                ? "bg-[#36200d] border-2 border-[#d97706]"
                                : isCurrentUser
                                ? "bg-[#243a1a] border-2 border-[#4ade80]"
                                : "bg-[#2f1503]/90 border border-[#5e3c25] hover:bg-[#3a1d07]"
                            }`}
                          >
                            {/* Left: Rank & Player Info */}
                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                              {/* Rank Badge */}
                              <div className="flex items-center justify-center w-10 h-10 shrink-0 font-bold">
                                {isTop1 ? (
                                  <PixelMedalGold size={34} />
                                ) : isTop2 ? (
                                  <PixelMedalSilver size={34} />
                                ) : isTop3 ? (
                                  <PixelMedalBronze size={34} />
                                ) : (
                                  <div
                                    className="w-8 h-8 flex items-center justify-center bg-[#1a0e03] text-[#d97706] text-xs font-bold border border-[#5e3c25]"
                                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                                  >
                                    #{rank}
                                  </div>
                                )}
                              </div>

                              {/* Player Avatar */}
                              <div className="relative w-12 h-12 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center bg-[#1a0e03] border-2 border-[#92623a] overflow-hidden shadow-md">
                                {entry.picture ? (
                                  <Image
                                    src={entry.picture}
                                    alt={entry.name}
                                    width={52}
                                    height={52}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                  />
                                ) : (
                                  <span className="text-2xl leading-none select-none">
                                    {entry.customAvatar || "🕵️"}
                                  </span>
                                )}
                              </div>

                              {/* Player Details */}
                              <div className="min-w-0 flex flex-col justify-center">
                                <div className="flex items-center gap-2">
                                  <span className="text-base sm:text-lg font-bold text-[#fef08a] truncate tracking-wide">
                                    {entry.name}
                                  </span>
                                  {isCurrentUser && (
                                    <span
                                      className="px-2 py-0.5 text-[9px] font-bold bg-[#166534] text-[#4ade80] border border-[#22c55e] uppercase tracking-wider shrink-0"
                                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                                    >
                                      KAMU
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2 mt-1">
                                  <span
                                    className={`text-[11px] px-2 py-0.5 font-bold ${
                                      isTop1
                                        ? "bg-[#b45309] text-[#fef08a] border border-[#facc15]"
                                        : "text-[#d97706] bg-[#1a0e03]/60 border border-[#5e3c25]/60"
                                    }`}
                                  >
                                    {displayTitle}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Right: Detailed Stats Grid */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 border-t border-[#5e3c25]/50 pt-2 sm:pt-0 sm:border-t-0">
                              {/* Correct / Accuracy */}
                              <div className="flex flex-col items-center sm:items-end bg-[#1a0e03] border border-[#5e3c25] px-3 py-1.5">
                                <div className="flex items-center gap-1.5 text-xs text-[#86efac]">
                                  <PixelTarget size={14} />
                                  <span className="font-bold">{entry.totalCorrect}/15</span>
                                </div>
                                <span className="text-[9px] text-[#a3e635] uppercase tracking-wider mt-0.5">Akurasi</span>
                              </div>

                              {/* Time Duration */}
                              <div className="flex flex-col items-center sm:items-end bg-[#1a0e03] border border-[#5e3c25] px-3 py-1.5">
                                <div className="flex items-center gap-1.5 text-xs text-[#7dd3fc]">
                                  <PixelStopwatch size={14} />
                                  <span
                                    className="font-bold"
                                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                                  >
                                    {formatDuration(entry.durationSeconds)}
                                  </span>
                                </div>
                                <span className="text-[9px] text-[#38bdf8] uppercase tracking-wider mt-0.5">Waktu</span>
                              </div>

                              {/* Flora Journal Count */}
                              <div className="flex flex-col items-center sm:items-end bg-[#1a0e03] border border-[#5e3c25] px-3 py-1.5">
                                <div className="flex items-center gap-1.5 text-xs text-[#fde047]">
                                  <PixelLeaf size={14} />
                                  <span className="font-bold">{entry.floraCount} Flora</span>
                                </div>
                                <span className="text-[9px] text-[#eab308] uppercase tracking-wider mt-0.5">Jurnal</span>
                              </div>

                              {/* Main Score Display */}
                              <div
                                className={`flex flex-col items-center sm:items-end min-w-[85px] sm:min-w-[100px] py-1.5 px-3 border ${
                                  isTop1
                                    ? "bg-[#451a03] border-[#facc15]"
                                    : "bg-[#1a0e03] border-[#92623a]"
                                }`}
                              >
                                <span
                                  className="text-sm sm:text-base font-bold text-[#facc15]"
                                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                                >
                                  {entry.score.toLocaleString()}
                                </span>
                                <span className="text-[9px] text-[#d97706] uppercase tracking-widest font-semibold mt-0.5">
                                  POIN
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {/* Active User Rank Footer */}
                  {currentUserEntry && (
                    <div className="mt-4 pt-3 border-t-2 border-[#92623a] flex flex-col sm:flex-row items-center justify-between bg-[#1a0e03] p-3.5 border border-[#5e3c25] gap-2">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#fde68a]">
                        <PixelRibbon size={20} color="#facc15" />
                        <span>
                          Posisi Kamu Saat Ini:{" "}
                          <strong className="text-[#facc15] font-bold">
                            #{activeUserRankIndex + 1} dari {sortedEntries.length} Detektif
                          </strong>
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-[#86efac] font-bold">
                        Skor Tertinggi: {currentUserEntry.score.toLocaleString()} Poin
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
