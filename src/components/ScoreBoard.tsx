"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Target, CheckCircle2, Sprout, Trees, Flower2, Award } from "lucide-react";

interface ScoreBoardProps {
  score: number;
  streak: number;
  totalCorrect: number;
  totalAttempted: number;
}

const BADGES = [
  { id: "first-win",    label: "Detektif Pemula",  icon: Sprout, color: "#10b981", condition: (c: number) => c >= 1  },
  { id: "three-streak", label: "Jejak Hijau",       icon: Flame, color: "#f97316", condition: (_: number, s: number) => s >= 3 },
  { id: "five-correct", label: "Penjaga Hutan",     icon: Trees, color: "#22c55e", condition: (c: number) => c >= 5  },
  { id: "ten-correct",  label: "Ahli Botani Muda",  icon: Flower2, color: "#ec4899", condition: (c: number) => c >= 10 },
  { id: "perfect",      label: "Eyang Rimba Jr.",   icon: Trophy, color: "#eab308", condition: (c: number) => c >= 20 },
];

export default function ScoreBoard({ score, streak, totalCorrect, totalAttempted }: ScoreBoardProps) {
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const earnedBadges = BADGES.filter((b) => b.condition(totalCorrect, streak));

  return (
    <motion.div
      className="glass-forest p-5 space-y-5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Score Section */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5">
          <Trophy className="w-4 h-4 text-pixel-gold" />
          <p className="text-[10px] tracking-widest uppercase font-bold text-pixel-parchment" style={{ fontFamily: "var(--font-title)" }}>
            Skor Pemain
          </p>
        </div>
        <motion.p
          key={score}
          className="text-2xl font-bold text-pixel-gold"
          style={{ fontFamily: "var(--font-title)", textShadow: "2px 2px 0px var(--pixel-wood)" }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 350 }}
        >
          {score}
        </motion.p>
      </div>

      {/* Retro Dotted Divider */}
      <div className="border-t-4 border-dotted" style={{ borderColor: "var(--pixel-wood)" }} />

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <StatCell
          label="Benar"
          value={totalCorrect}
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          color="var(--pixel-leaf)"
        />
        <StatCell
          label="Streak"
          value={streak}
          icon={<Flame className="w-4 h-4 text-amber-500" />}
          color="var(--pixel-gold)"
        />
        <StatCell
          label="Akurasi"
          value={`${accuracy}%`}
          icon={<Target className="w-4 h-4 text-rose-400" />}
          color="var(--terracotta)"
        />
      </div>

      {/* Streak Progress bar */}
      {streak > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[8px] text-pixel-parchment font-bold uppercase tracking-wider">
            <span>Streak Multiplier</span>
            <span>+{streak * 5} Poin</span>
          </div>
          <motion.div
            className="bg-pixel-dark border-2 border-pixel-wood overflow-hidden"
            style={{ height: "10px" }}
          >
            <motion.div
              className="h-full bg-pixel-gold"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(streak * 10, 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      )}

      {/* Badges Section */}
      {earnedBadges.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-pixel-gold" />
            <p className="text-[10px] tracking-widest uppercase font-bold text-pixel-parchment" style={{ fontFamily: "var(--font-title)" }}>
              Lencana
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.map((badge, i) => {
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  className="flex items-center gap-1.5 px-2 py-1 bg-pixel-dark border-2 transition-colors"
                  style={{
                    borderColor: "var(--pixel-wood)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  title={badge.label}
                >
                  <BadgeIcon className="w-3.5 h-3.5" style={{ color: badge.color }} />
                  <span className="text-[8px] font-bold uppercase tracking-wider text-pixel-parchment" style={{ fontFamily: "var(--font-title)" }}>
                    {badge.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Motivational Bottom Text */}
      <div className="text-center py-2 px-3 bg-pixel-dark/30 border-2 border-pixel-wood text-[10px] text-pixel-parchment font-medium italic leading-relaxed">
        {totalCorrect === 0
          ? "Petualangan dimulai! Pecahkan teka-teki Eyang 🌿"
          : streak >= 3
          ? `Luar biasa! ${streak} beruntun tanpa cela! 🔥`
          : `Spesimen botani terkumpul: ${totalCorrect} spesimen! 🍃`}
      </div>
    </motion.div>
  );
}

function StatCell({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 p-1.5 bg-pixel-dark border-2" style={{ borderColor: "var(--pixel-wood)" }}>
      <div className="mb-0.5">{icon}</div>
      <motion.span
        key={String(value)}
        className="text-xs font-bold"
        style={{ color, fontFamily: "var(--font-title)" }}
        initial={{ y: -2, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {value}
      </motion.span>
      <span className="text-[8px] uppercase font-bold tracking-wider text-pixel-parchment/60">{label}</span>
    </div>
  );
}
