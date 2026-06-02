"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Lock } from "lucide-react";
import { PLANT_ICON_MAP, getNormalizedPlantKey } from "./BotanicalCanvas";


const ALL_FLORA = [
  { name: "Rafflesia",          habitat: "Hutan Tropis",   difficulty: "sulit"  },
  { name: "Anggrek Bulan",      habitat: "Hutan Lembap",   difficulty: "sedang" },
  { name: "Kantong Semar",      habitat: "Rawa-rawa",      difficulty: "sedang" },
  { name: "Melati",             habitat: "Pekarangan",     difficulty: "mudah"  },
  { name: "Kenanga",            habitat: "Pekarangan",     difficulty: "mudah"  },
  { name: "Bunga Bangkai",      habitat: "Hutan Tropis",   difficulty: "sulit"  },
  { name: "Teratai",            habitat: "Danau & Kolam",  difficulty: "sedang" },
  { name: "Rotan",              habitat: "Hutan Tropis",   difficulty: "sedang" },
  { name: "Kayu Putih",         habitat: "Hutan Terbuka",  difficulty: "mudah"  },
  { name: "Bambu",              habitat: "Tepi Sungai",    difficulty: "mudah"  },
  { name: "Mangrove",           habitat: "Tepi Pantai",    difficulty: "sedang" },
  { name: "Jati",               habitat: "Hutan Musim",    difficulty: "sedang" },
  { name: "Cempaka",            habitat: "Hutan Tropis",   difficulty: "mudah"  },
  { name: "Karet",              habitat: "Perkebunan",     difficulty: "sedang" },
  { name: "Durian",             habitat: "Hutan Tropis",   difficulty: "sulit"  },
] as const;

type FloraEntry = (typeof ALL_FLORA)[number];

interface DiscoveredPlant {
  plantName: string;
  botanicalFacts: string[];
  habitat: string;
  localNames: string[];
  discoveredAt: string;
  difficulty: "mudah" | "sedang" | "sulit";
}

interface FloraCollectionModalProps {
  open: boolean;
  onClose: () => void;
  discoveredGallery: DiscoveredPlant[];
  onSelectPlant: (plant: DiscoveredPlant) => void;
  onResetGallery: () => void;
}

const DIFF_BADGE: Record<string, { label: string; bg: string; text: string; border: string }> = {
  mudah:  { label: "EASY",   bg: "#4a5d23", text: "#bed58e", border: "#1a1c14" },
  sedang: { label: "NORMAL", bg: "#92703a", text: "#fde68a", border: "#1a1c14" },
  sulit:  { label: "HARD",   bg: "#93000a", text: "#ffdad6", border: "#1a1c14" },
};

const MODE_BADGE: Record<string, { label: string; bg: string; text: string; border: string }> = {
  mudah:  { label: "MODE: MUDAH",  bg: "#4a5d23", text: "#bed58e", border: "#1a1c14" },
  sedang: { label: "MODE: NORMAL", bg: "#92703a", text: "#fde68a", border: "#1a1c14" },
  sulit:  { label: "MODE: SULIT",  bg: "#93000a", text: "#ffdad6", border: "#1a1c14" },
};

export default function FloraCollectionModal({
  open,
  onClose,
  discoveredGallery,
  onSelectPlant,
  onResetGallery,
}: FloraCollectionModalProps) {
  const discoveredNames = new Set(discoveredGallery.map((p) => getNormalizedPlantKey(p.plantName)));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] bg-black/70 flex items-center justify-center p-3 sm:p-6 md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* ── Double-Layered Wood Frame ── */}
          <motion.div
            className="relative w-full max-w-4xl flex flex-col"
            style={{
              maxHeight: "90vh",
              backgroundColor: "#2f1503",
              /* outer pixel border */
              boxShadow:
                "0 -4px 0 0 #3a351e, 0 4px 0 0 #120e01, -4px 0 0 0 #3a351e, 4px 0 0 0 #120e01, 0 0 0 4px #2f1503",
              padding: "8px",
            }}
            initial={{ scale: 0.9, y: 32, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 32, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner wood panel */}
            <div
              className="flex flex-col overflow-hidden flex-1 px-4 sm:px-6 pt-6"
              style={{
                backgroundColor: "#5e3c25",
                boxShadow:
                  "inset 4px 4px 0 0 #92623a, inset -4px -4px 0 0 #2f1503",
                maxHeight: "calc(90vh - 16px)",
              }}
            >
              {/* ── Header ── */}
              <div className="text-center mb-6 flex-shrink-0">
                <h1
                  className="uppercase text-[#ecc246] mb-2"
                  style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "18px",
                    lineHeight: "28px",
                    textShadow:
                      "2px 0 0 #3a2010, -2px 0 0 #3a2010, 0 2px 0 #3a2010, 0 -2px 0 #3a2010, 3px 3px 0 #120e01",
                  }}
                >
                  KOLEKSI FLORA
                </h1>
                <div
                  className="mx-auto"
                  style={{ width: "128px", height: "4px", backgroundColor: "#ecc246" }}
                />
                <p
                  className="mt-2 text-[#c6c8b8] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-body)", fontSize: "11px" }}
                >
                  {discoveredGallery.length} / 15 Spesimen Ditemukan
                </p>
                {discoveredGallery.length > 0 && (
                  <button
                    onClick={onResetGallery}
                    className="mt-1 flex items-center gap-1 mx-auto text-red-300 hover:text-red-200 bg-red-950/40 hover:bg-red-900/60 border border-red-700 px-2 py-0.5 cursor-pointer transition-all"
                    style={{ fontFamily: "var(--font-body)", fontSize: "11px" }}
                  >
                    <Trash2 className="w-3 h-3" />
                    Reset Koleksi
                  </button>
                )}
              </div>

              {/* ── Scrollable Grid ── */}
              <div
                className="flex-1 overflow-y-auto pr-1"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#5e3c25 #2f1503" }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-6">
                  {ALL_FLORA.map((flora: FloraEntry, index: number) => {
                    const isDiscovered = discoveredNames.has(flora.name);
                    const discoveredData = discoveredGallery.find(
                      (p) => getNormalizedPlantKey(p.plantName) === flora.name,
                    );
                    const badge = discoveredData
                      ? MODE_BADGE[discoveredData.difficulty]
                      : DIFF_BADGE[flora.difficulty];
                    const iconSrc = PLANT_ICON_MAP[flora.name];

                    // Icon area content
                    const iconContent = isDiscovered ? (
                      iconSrc ? (
                        <img
                          src={iconSrc}
                          alt={`Ikon ${flora.name}`}
                          className="w-16 h-16 object-contain"
                          style={{ imageRendering: "pixelated" }}
                        />
                      ) : (
                        /* Fallback inline SVG jika PNG belum tersedia */
                        <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="2.5" fill={
                            flora.difficulty === "mudah" ? "#4ade80"
                            : flora.difficulty === "sedang" ? "#fbbf24"
                            : "#f87171"
                          } />
                          {[0, 60, 120, 180, 240, 300].map((deg) => (
                            <ellipse
                              key={deg}
                              cx="12" cy="7" rx="2" ry="3.5"
                              fill={flora.difficulty === "mudah" ? "#4ade80" : flora.difficulty === "sedang" ? "#fbbf24" : "#f87171"}
                              opacity="0.85"
                              transform={`rotate(${deg} 12 12)`}
                            />
                          ))}
                        </svg>
                      )
                    ) : (
                      <Lock className="w-10 h-10 text-[#6b7280]" />
                    );

                    return (
                      <motion.button
                        key={flora.name}
                        onClick={() => {
                          if (isDiscovered && discoveredData) {
                            onSelectPlant(discoveredData);
                            onClose();
                          }
                        }}
                        disabled={!isDiscovered}
                        className={`flex flex-col p-3 sm:p-4 text-left transition-transform
                          ${isDiscovered ? "cursor-pointer hover:-translate-y-1" : "cursor-default opacity-75 grayscale"}
                        `}
                        style={{
                          backgroundColor: "#f4eedd",
                          backgroundImage:
                            "radial-gradient(#e2d8b8 1px, transparent 1px)",
                          backgroundSize: "8px 8px",
                          border: "4px solid #2f1503",
                          imageRendering: "pixelated",
                        }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        whileHover={isDiscovered ? { y: -4 } : {}}
                        whileTap={isDiscovered ? { scale: 0.97 } : {}}
                        title={isDiscovered ? `Lihat detail ${flora.name}` : "Belum ditemukan"}
                      >
                        {/* Image Area */}
                        <div
                          className="w-full mb-3 flex items-center justify-center"
                          style={{
                            aspectRatio: "1",
                            backgroundColor: isDiscovered ? "#3a4428" : "#2d2d2d",
                            border: "2px solid #1a1c14",
                          }}
                        >
                          {iconContent}
                        </div>

                        {/* Plant Name */}
                        <p
                          className="uppercase mb-0.5"
                          style={{
                            fontFamily: "var(--font-title)",
                            fontSize: "7px",
                            color: isDiscovered ? "#2f1503" : "#5a4a3a",
                            lineHeight: "12px",
                            letterSpacing: "0.05em",
                            fontStyle: isDiscovered ? "normal" : "normal",
                          }}
                        >
                          {isDiscovered ? flora.name.toUpperCase() : "UNKNOWN"}
                        </p>

                        {/* Habitat */}
                        <p
                          className="uppercase mb-2"
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "10px",
                            color: isDiscovered ? "#472913" : "#7a6050",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {isDiscovered ? flora.habitat : "Belum Teridentifikasi"}
                        </p>

                        {/* Difficulty Badge — hanya tampil jika sudah ditemukan */}
                        {isDiscovered && (
                          <div
                            className="inline-block px-2 py-0.5"
                            style={{
                              backgroundColor: badge.bg,
                              color: badge.text,
                              border: `2px solid ${badge.border}`,
                              fontFamily: "var(--font-body)",
                              fontSize: "11px",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {badge.label}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* ── Footer ── */}
              <div
                className="flex-shrink-0 flex justify-center py-5"
                style={{ borderTop: "4px solid #2f1503" }}
              >
                <motion.button
                  onClick={onClose}
                  className="relative group px-12 py-3 uppercase"
                  style={{
                    backgroundColor: "#4a5d23",
                    color: "#bed58e",
                    fontFamily: "var(--font-body)",
                    fontSize: "16px",
                    letterSpacing: "0.1em",
                    border: "4px solid #1a1c14",
                    boxShadow: "0 0 0px 0px rgba(100,180,50,0)",
                    transition: "box-shadow 0.2s ease, filter 0.2s ease",
                  }}
                  whileHover={{
                    scale: 1.05,
                    filter: "brightness(1.18)",
                    boxShadow: "0 0 18px 4px rgba(100,200,60,0.35), 0 0 6px 1px rgba(100,200,60,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="relative z-10 drop-shadow-sm">TUTUP JURNAL</span>

                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
