"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  BookOpen,
  Lock,
  Sprout,
  Compass,
  Trophy,
  CheckCircle2,
  Target,
  Skull,
  LogOut,
  RotateCcw,
  Home,
  X,
  Flower2,
  ArrowLeft,
  User,
  Edit3,
  Check,
  LogIn,
  Camera,
} from "lucide-react";
import {
  PixelFlame,
  PixelLogOut,
  PixelLeaf,
  PixelCrown,
  PixelScroll,
  PixelCrossword,
} from "@/components/PixelIcon";
import { PixelAvatar, PIXEL_AVATAR_LIST } from "@/components/PixelAvatar";
import { getClientFallbackRiddle } from "@/lib/riddles";
import EyangRimba from "@/components/EyangRimba";
import RiddleCard from "@/components/RiddleCard";
import ScoreBoard from "@/components/ScoreBoard";
import BotanicalCanvas from "@/components/BotanicalCanvas";
import FloraCollectionModal from "@/components/FloraCollectionModal";
import ImageCropModal from "@/components/ImageCropModal";
import TTSFloraModal from "@/components/TTSFloraModal";
import LeaderboardModal, {
  LeaderboardEntry,
  DEFAULT_INITIAL_LEADERBOARD,
} from "@/components/LeaderboardModal";
import EyangClueImg from "@/assets/Eyang_Time_Stop.png";
import EyangNyawaImg from "@/assets/Eyang_Nyawa.png";
import EyangTimeStopImg from "@/assets/Eyang_Clue.png";

const ForestBackground = dynamic(() => import("@/components/ForestBackground"), { ssr: false });

// ─── Pixel Art Icons (Reference: Google Stitch Showcase) ───────────────────
function PixelChest() {
  const frameColor = "#1a1c14";
  const woodColor = "#855635";
  const lockColor = "#c9a227";
  const woodDark = "#5e3c25";
  
  const pixels = [
    // Top lid outline
    { x: 2, y: 2, w: 12, h: 1, c: frameColor },
    // Side outlines
    { x: 2, y: 3, w: 1, h: 9, c: frameColor },
    { x: 13, y: 3, w: 1, h: 9, c: frameColor },
    // Bottom outline
    { x: 3, y: 12, w: 10, h: 1, c: frameColor },
    // Lid horizontal seam
    { x: 3, y: 6, w: 10, h: 1, c: frameColor },
    // Wood fills
    { x: 3, y: 3, w: 10, h: 3, c: woodColor }, // Lid
    { x: 3, y: 7, w: 10, h: 5, c: woodDark },  // Bottom box
    // Iron bands (left and right)
    { x: 4, y: 2, w: 2, h: 10, c: frameColor },
    { x: 10, y: 2, w: 2, h: 10, c: frameColor },
    // Lock plate
    { x: 7, y: 5, w: 2, h: 3, c: lockColor },
    { x: 7, y: 6, w: 2, h: 1, c: frameColor }, // keyhole
  ];
  
  return (
    <svg viewBox="0 0 16 16" className="w-8 h-8 [image-rendering:pixelated]" xmlns="http://www.w3.org/2000/svg">
      {pixels.map((p, idx) => (
        <rect key={idx} x={p.x} y={p.y} width={p.w} height={p.h} fill={p.c} />
      ))}
    </svg>
  );
}

function PixelCoin() {
  const frameColor = "#5e3c25";
  const goldColor = "#c9a227";
  const lightGold = "#fbbf24";
  
  const pixels = [
    { x: 2, y: 0, w: 4, h: 1, c: frameColor },
    { x: 1, y: 1, w: 1, h: 1, c: frameColor },
    { x: 6, y: 1, w: 1, h: 1, c: frameColor },
    { x: 0, y: 2, w: 1, h: 4, c: frameColor },
    { x: 7, y: 2, w: 1, h: 4, c: frameColor },
    { x: 1, y: 6, w: 1, h: 1, c: frameColor },
    { x: 6, y: 6, w: 1, h: 1, c: frameColor },
    { x: 2, y: 7, w: 4, h: 1, c: frameColor },
    
    // Fill
    { x: 2, y: 1, w: 4, h: 1, c: lightGold },
    { x: 1, y: 2, w: 1, h: 4, c: lightGold },
    { x: 2, y: 2, w: 4, h: 4, c: goldColor },
    { x: 6, y: 2, w: 1, h: 4, c: goldColor },
    { x: 2, y: 6, w: 4, h: 1, c: goldColor },
    
    // Highlight
    { x: 2, y: 2, w: 2, h: 1, c: lightGold },
    { x: 2, y: 3, w: 1, h: 1, c: lightGold },
  ];
  
  return (
    <svg viewBox="0 0 8 8" className="w-4 h-4 [image-rendering:pixelated]" xmlns="http://www.w3.org/2000/svg">
      {pixels.map((p, idx) => (
        <rect key={idx} x={p.x} y={p.y} width={p.w} height={p.h} fill={p.c} />
      ))}
    </svg>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────
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

interface DiscoveredPlant {
  plantName: string;
  botanicalFacts: string[];
  habitat: string;
  localNames: string[];
  discoveredAt: string;
  difficulty: "mudah" | "sedang" | "sulit";
}

type GamePhase = "intro" | "playing" | "correct" | "summary";
type EyangMood = "neutral" | "excited" | "thinking" | "sad" | "proud";
type GameMode = "easy" | "normal" | "hard";

// ─── Intro Messages ─────────────────────────────────────────────────────────
const INTRO_MESSAGES = [
  "Selamat datang, Nak! Aku Eyang Rimba, penjaga rahasia hutan Nusantara yang telah kujaga selama ratusan tahun.",
  "Hutan kita menyimpan ribuan misteri tanaman ajaib. Apakah kamu siap menjadi Detektif Kebun hari ini?",
  "Aku akan memberikan petunjuk, dan tugasmu adalah menebak nama tanaman yang kumaksud. Ayo kita mulai petualangan!",
];

const PIXEL_AVATARS = PIXEL_AVATAR_LIST;

// ─── Scoring ────────────────────────────────────────────────────────────────
const SCORE_MAP = { mudah: 10, sedang: 20, sulit: 35 };
const MODE_MULTIPLIER: Record<string, number> = { easy: 1, normal: 2, hard: 3 };

export default function HomePage() {
  const [gamePhase, setGamePhase]         = useState<GamePhase>("intro");
  const [performanceMode, setPerformanceMode] = useState(false);
  const [riddleData, setRiddleData]       = useState<RiddleData | null>(null);
  const [isLoadingRiddle, setIsLoading]   = useState(false);
  const [prefetchedRiddle, setPrefetchedRiddle] = useState<RiddleData | null>(null);
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [checkResult, setCheckResult]     = useState<CheckResult | null>(null);
  const [eyangMessage, setEyangMessage]   = useState(INTRO_MESSAGES[0]);
  const [eyangMood, setEyangMood]         = useState<EyangMood>("excited");
  const [introStep, setIntroStep]         = useState(0);
  const [selectedModeStep, setSelectedModeStep] = useState<"mode_select" | "difficulty_select">("mode_select");
  const [score, setScore]                 = useState(0);
  const [ttsScore, setTtsScore]           = useState(0);
  const [ttsCompleted, setTtsCompleted]   = useState(0);
  const [streak, setStreak]               = useState(0);
  const [totalCorrect, setTotalCorrect]   = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [isEyangTyping, setIsEyangTyping] = useState(false);
  const isTransitioningRef = useRef(false);

  // Gallery and layout states
  const [discoveredGallery, setDiscoveredGallery] = useState<DiscoveredPlant[]>([]);
  const [selectedGalleryPlant, setSelectedGalleryPlant] = useState<DiscoveredPlant | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCollectionPanel, setShowCollectionPanel] = useState(false);

  // Game session states
  const [sessionQuestionIndex, setSessionQuestionIndex] = useState(1);
  const [sessionPlantsAsked, setSessionPlantsAsked]     = useState<string[]>([]);
  const [sessionDiscoveredPlants, setSessionDiscoveredPlants] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed]     = useState(true);
  const [isSessionFailed, setIsSessionFailed]           = useState(false);
  const [gameMode, setGameMode]                         = useState<GameMode>("normal");
  const [sessionAttempts, setSessionAttempts]           = useState(0);

  // User Profile States
  interface UserProfile {
    id?: string;
    name: string;
    email: string;
    picture: string;
    googlePicture?: string;
    avatarType: "google" | "custom" | "custom_image";
    customAvatar: string;
    title: string;
  }
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showGoogleConfigModal, setShowGoogleConfigModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showTTSModal, setShowTTSModal] = useState(false);
  const [ttsSessionKey, setTtsSessionKey] = useState(0);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>(DEFAULT_INITIAL_LEADERBOARD);

  const handleTTSScoreEarned = useCallback((earnedScore: number) => {
    // TTS score is tracked separately (its own leaderboard tab), NOT added to
    // the main Riddles score.
    setTtsScore((p) => p + earnedScore);
    setTtsCompleted((p) => p + 1);
  }, []);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [customClientIdInput, setCustomClientIdInput] = useState("");
  const [showSurrenderConfirm, setShowSurrenderConfirm] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🍀");
  const [customUploadedImage, setCustomUploadedImage] = useState<string>("");
  const [rawUploadedImage, setRawUploadedImage] = useState<string>("");
  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const calculateTitle = useCallback((discoveredCount: number) => {
    if (discoveredCount === 0) return "Detektif Pemula";
    if (discoveredCount <= 3) return "Pencari Jejak Hutan";
    if (discoveredCount <= 7) return "Pakar Botani Rimba";
    if (discoveredCount <= 11) return "Ksatria Hijau";
    if (discoveredCount <= 14) return "Pelindung Nusantara";
    return "Eyang Rimba Agung";
  }, []);

  // Special Card Reward States
  const [hasReceivedSpecialCard, setHasReceivedSpecialCard] = useState(false);
  const [showSpecialCardModal, setShowSpecialCardModal] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<("life" | "clues" | "time")[]>([]);
  const [extraLivesSession, setExtraLivesSession] = useState(0);
  const [cluesQuestionIndex, setCluesQuestionIndex] = useState(0);
  const [timeStopQuestionIndex, setTimeStopQuestionIndex] = useState(0);
  const [lifeNotification, setLifeNotification] = useState<string | null>(null);

  const showLifeNotification = (message: string) => {
    setLifeNotification(message);
    setTimeout(() => {
      setLifeNotification((prev) => (prev === message ? null : prev));
    }, 4000);
  };

  const isGameActive = gamePhase === "playing" || gamePhase === "correct";
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  // ─── Fetching Riddle Data ──────────────────────────────────────────────────
  const fetchRiddle = useCallback(async (currentSessionPlants: string[]) => {
    setIsLoading(true);
    setIsEyangTyping(true);
    setEyangMessage("");
    setCheckResult(null);

    const excludeQuery = currentSessionPlants.map(encodeURIComponent).join(",");
    const url = excludeQuery ? `/api/riddle?exclude=${excludeQuery}` : "/api/riddle";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    try {
      const res = await fetch(url, { cache: "no-store", signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP Error status ${res.status}`);

      const data: RiddleData = await res.json();
      if (!data || !data.riddle || typeof data.riddle !== "string" || !data.riddle.trim()) {
        throw new Error("Respons teka-teki dari server kosong.");
      }

      setRiddleData(data);

      if (data.encodedPlant) {
        try {
          const plantName = atob(data.encodedPlant);
          setSessionPlantsAsked((prev) => {
            if (prev.includes(plantName)) return prev;
            return [...prev, plantName];
          });
        } catch (e) {
          console.warn("Gagal atob encodedPlant:", e);
        }
      }

      setEyangMessage("Baiklah, Nak... dengarkan baik-baik teka-tekiku ini. Apa gerangan namanya?");
      setEyangMood("thinking");
    } catch (err) {
      clearTimeout(timeoutId);
      const msg = err instanceof Error ? (err.name === "AbortError" ? "Waktu koneksi habis (Timeout)" : err.message) : String(err);
      console.warn(`⚠️ Gagal memuat teka-teki dari API, menggunakan Fallback Lokal Client: ${msg}`);
      const fallbackData = getClientFallbackRiddle(currentSessionPlants);
      setRiddleData(fallbackData);

      if (fallbackData.encodedPlant) {
        try {
          const plantName = atob(fallbackData.encodedPlant);
          setSessionPlantsAsked((prev) => {
            if (prev.includes(plantName)) return prev;
            return [...prev, plantName];
          });
        } catch (e) {
          console.warn("Gagal atob encodedPlant:", e);
        }
      }

      setEyangMessage("Eyang merapalkan mantra purba untuk memunculkan teka-teki dari Kitab Hutan Rimba!");
      setEyangMood("excited");
    } finally {
      setIsLoading(false);
      setIsEyangTyping(false);
      isTransitioningRef.current = false;
    }
  }, []);

  // ─── Pre-fetching the Next Riddle ─────────────────────────────────────────
  const prefetchNextRiddle = useCallback(async (currentSessionPlants: string[]) => {
    if (isPrefetching) return;
    setIsPrefetching(true);

    const excludeQuery = currentSessionPlants.map(encodeURIComponent).join(",");
    const url = excludeQuery ? `/api/riddle?exclude=${excludeQuery}` : "/api/riddle";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    try {
      const res = await fetch(url, { cache: "no-store", signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error("Prefetch HTTP error");
      const data: RiddleData = await res.json();
      if (data && data.riddle && typeof data.riddle === "string" && data.riddle.trim()) {
        setPrefetchedRiddle(data);
      } else {
        setPrefetchedRiddle(getClientFallbackRiddle(currentSessionPlants));
      }
    } catch (e) {
      clearTimeout(timeoutId);
      const msg = e instanceof Error ? (e.name === "AbortError" ? "Waktu koneksi habis (Timeout)" : e.message) : String(e);
      console.warn(`⚠️ Gagal mem-prefetch teka-teki berikutnya, menggunakan fallback: ${msg}`);
      setPrefetchedRiddle(getClientFallbackRiddle(currentSessionPlants));
    } finally {
      setIsPrefetching(false);
    }
  }, [isPrefetching]);

  // 1. Prefetch the very first riddle when in intro lobby
  useEffect(() => {
    if (isSessionLoaded && gamePhase === "intro" && !prefetchedRiddle && !isPrefetching) {
      setTimeout(() => {
        prefetchNextRiddle([]);
      }, 0);
    }
  }, [isSessionLoaded, gamePhase, prefetchedRiddle, isPrefetching, prefetchNextRiddle]);

  // 2. Prefetch the subsequent riddles in the background during gameplay
  useEffect(() => {
    if (isSessionLoaded && gamePhase === "playing" && riddleData && !prefetchedRiddle && !isPrefetching) {
      setTimeout(() => {
        prefetchNextRiddle(sessionPlantsAsked);
      }, 0);
    }
  }, [isSessionLoaded, gamePhase, riddleData, prefetchedRiddle, isPrefetching, sessionPlantsAsked, prefetchNextRiddle]);

  // 3. Ensure riddleData is valid when in playing phase (e.g. after browser refresh or broken fetch)
  useEffect(() => {
    if (isSessionLoaded && (gamePhase === "playing" || gamePhase === "correct")) {
      if (!riddleData || !riddleData.riddle || typeof riddleData.riddle !== "string" || !riddleData.riddle.trim()) {
        console.warn("⚠️ Sesi aktif tidak memiliki data soal valid. Memuat teka-teki baru...");
        setTimeout(() => {
          fetchRiddle(sessionPlantsAsked);
        }, 0);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 0);
      }
    }
  }, [isSessionLoaded, gamePhase, riddleData, fetchRiddle, sessionPlantsAsked]);

  // ─── Hydration from sessionStorage (Game Session) ──────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSession = sessionStorage.getItem("detektif_kebun_active_session");
      if (savedSession) {
        try {
          const session = JSON.parse(savedSession);
          setTimeout(() => {
            if (session.gamePhase) setGamePhase(session.gamePhase);
            if (typeof session.sessionQuestionIndex === "number") setSessionQuestionIndex(session.sessionQuestionIndex);
            if (Array.isArray(session.sessionPlantsAsked)) setSessionPlantsAsked(session.sessionPlantsAsked);
            if (Array.isArray(session.sessionDiscoveredPlants)) setSessionDiscoveredPlants(session.sessionDiscoveredPlants);
            if (session.gameMode) setGameMode(session.gameMode);
            if (typeof session.extraLivesSession === "number") setExtraLivesSession(session.extraLivesSession);
            if (typeof session.cluesQuestionIndex === "number") setCluesQuestionIndex(session.cluesQuestionIndex);
            if (typeof session.timeStopQuestionIndex === "number") setTimeStopQuestionIndex(session.timeStopQuestionIndex);
            if (typeof session.sessionAttempts === "number") setSessionAttempts(session.sessionAttempts);
            if (typeof session.hasReceivedSpecialCard === "boolean") setHasReceivedSpecialCard(session.hasReceivedSpecialCard);
            if (typeof session.showSpecialCardModal === "boolean") setShowSpecialCardModal(session.showSpecialCardModal);
            if (Array.isArray(session.shuffledCards)) setShuffledCards(session.shuffledCards);
            if (typeof session.streak === "number") setStreak(session.streak);
            if (typeof session.score === "number") setScore(session.score);
            if (typeof session.totalCorrect === "number") setTotalCorrect(session.totalCorrect);
            if (typeof session.totalAttempted === "number") setTotalAttempted(session.totalAttempted);
            if (session.riddleData) setRiddleData(session.riddleData);
            if (session.checkResult !== undefined) setCheckResult(session.checkResult);
            if (session.eyangMessage) setEyangMessage(session.eyangMessage);
            if (session.eyangMood) setEyangMood(session.eyangMood);
            if (session.prefetchedRiddle) setPrefetchedRiddle(session.prefetchedRiddle);
            setIsSidebarOpen(false);
            setIsSidebarCollapsed(true);
          }, 0);
        } catch (e) {
          console.error("Gagal mem-parse sesi aktif dari sessionStorage", e);
        }
      }
      setTimeout(() => {
        setIsSessionLoaded(true);
      }, 0);
    }
  }, []);

  // Load user profile from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("detektif_kebun_user");
      if (savedUser) {
        try {
          const profile = JSON.parse(savedUser);
          setTimeout(() => {
            setUserProfile(profile);
            setEditingName(profile.name);
            setSelectedAvatar(profile.avatarType === "google" ? "google_pic" : (profile.customAvatar || "🍀"));
          }, 0);
        } catch (e) {
          console.error("Gagal mem-parse profil pengguna", e);
        }
      }
    }
  }, []);

  // Update dynamic title when discovered gallery changes
  useEffect(() => {
    if (userProfile) {
      const currentTitle = calculateTitle(discoveredGallery.length);
      if (userProfile.title !== currentTitle) {
        const updatedProfile = { ...userProfile, title: currentTitle };
        setTimeout(() => {
          setUserProfile(updatedProfile);
          localStorage.setItem("detektif_kebun_user", JSON.stringify(updatedProfile));
          if (updatedProfile.email) {
            localStorage.setItem(`detektif_kebun_user_${updatedProfile.email}`, JSON.stringify(updatedProfile));
          }
        }, 0);
      }
    }
  }, [discoveredGallery.length, userProfile, calculateTitle]);

  // Google OAuth redirect extraction & user account sync
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      if (accessToken) {
        window.history.replaceState(null, "", window.location.pathname);
        
        const fetchUserProfile = async (token: string) => {
          setEyangMessage("Menghubungkan ke akun Google...");
          setEyangMood("thinking");
          try {
            const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
              const data = await res.json();
              const accountKey = data.email || data.sub || "google_user";

              // Check if account has saved profile, gallery, and stats
              let savedAccountProfile: UserProfile | null = null;
              const savedUserStr = localStorage.getItem(`detektif_kebun_user_${accountKey}`);
              if (savedUserStr) {
                try { savedAccountProfile = JSON.parse(savedUserStr); } catch (e) { console.error(e); }
              }

              let accountGallery: DiscoveredPlant[] = [];
              const savedGalleryStr = localStorage.getItem(`detektif_kebun_gallery_${accountKey}`);
              if (savedGalleryStr) {
                try { accountGallery = JSON.parse(savedGalleryStr); } catch (e) { console.error(e); }
              } else {
                // If no account gallery exists yet, preserve current active gallery if any
                const activeGalleryStr = localStorage.getItem("detektif_kebun_gallery");
                if (activeGalleryStr) {
                  try { accountGallery = JSON.parse(activeGalleryStr); } catch (e) { console.error(e); }
                }
              }
              setDiscoveredGallery(accountGallery);

              const savedStatsStr = localStorage.getItem(`detektif_kebun_stats_${accountKey}`);
              if (savedStatsStr) {
                try {
                  const stats = JSON.parse(savedStatsStr);
                  if (typeof stats.score === "number") setScore(stats.score);
                  if (typeof stats.streak === "number") setStreak(stats.streak);
                  if (typeof stats.totalCorrect === "number") setTotalCorrect(stats.totalCorrect);
                  if (typeof stats.totalAttempted === "number") setTotalAttempted(stats.totalAttempted);
                } catch (e) { console.error(e); }
              }

              const profileData: UserProfile = {
                id: data.sub || data.email,
                name: savedAccountProfile?.name || data.name || "Detektif Rimba",
                email: data.email || "",
                picture: data.picture || "",
                avatarType: savedAccountProfile?.avatarType || "google",
                customAvatar: savedAccountProfile?.customAvatar || "🍀",
                title: calculateTitle(accountGallery.length),
              };

              setUserProfile(profileData);
              setEditingName(profileData.name);
              setSelectedAvatar(profileData.avatarType === "google" ? "google_pic" : (profileData.customAvatar || "🍀"));

              // Store active user profile and account-specific user data
              localStorage.setItem("detektif_kebun_user", JSON.stringify(profileData));
              localStorage.setItem(`detektif_kebun_user_${accountKey}`, JSON.stringify(profileData));
              localStorage.setItem(`detektif_kebun_gallery_${accountKey}`, JSON.stringify(accountGallery));
              localStorage.setItem("detektif_kebun_gallery", JSON.stringify(accountGallery));

              setEyangMessage(`Selamat datang kembali di rimba, Detektif ${profileData.name}! 🌟`);
              setEyangMood("proud");
              showLifeNotification("Login Google Berhasil! ✨");
              
              // Open profile modal automatically so user can customize name & avatar as requested
              setShowProfileModal(true);
            } else {
              setEyangMessage("Gagal masuk dengan Google. Coba lagi, ya?");
              setEyangMood("sad");
            }
          } catch (err) {
            console.error("Error fetching user profile", err);
            setEyangMessage("Ada gangguan koneksi ke Google. Coba lagi.");
            setEyangMood("sad");
          }
        };
        fetchUserProfile(accessToken);
      }
    }
  }, [calculateTitle]);

  const handleDemoLogin = () => {
    const demoProfile: UserProfile = {
      id: "demo_user",
      name: "Detektif Nusantara",
      email: "detektif@nusantara.org",
      picture: "",
      avatarType: "custom",
      customAvatar: "🦉",
      title: calculateTitle(discoveredGallery.length),
    };
    setUserProfile(demoProfile);
    setEditingName(demoProfile.name);
    setSelectedAvatar("🦉");
    localStorage.setItem("detektif_kebun_user", JSON.stringify(demoProfile));
    setEyangMessage("Masuk sebagai Detektif Nusantara (Mode Demo)! 🦉");
    setEyangMood("proud");
    showLifeNotification("Berhasil Masuk!");
  };

  const handleGoogleLogin = () => {
    const savedClientId = typeof window !== "undefined" ? localStorage.getItem("detektif_kebun_google_client_id") : null;
    const envClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    const clientId = savedClientId || (envClientId && envClientId !== "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com" ? envClientId : null);
    
    if (!clientId) {
      setShowGoogleConfigModal(true);
      return;
    }

    const redirectUri = window.location.origin;
    const scope = "openid profile email";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    setUserProfile(null);
    localStorage.removeItem("detektif_kebun_user");
    localStorage.removeItem("detektif_kebun_gallery");
    localStorage.removeItem("detektif_kebun_stats");
    setDiscoveredGallery([]);
    setScore(0);
    setStreak(0);
    setTotalCorrect(0);
    setTotalAttempted(0);
    setEyangMessage("Kamu telah keluar. Sampai jumpa di petualangan berikutnya!");
    setEyangMood("neutral");
    showLifeNotification("Keluar Berhasil! 🚪");
    setShowProfileModal(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setRawUploadedImage(event.target.result as string);
        setShowCropModal(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropSave = (croppedDataUrl: string) => {
    setCustomUploadedImage(croppedDataUrl);
    setSelectedAvatar("custom_upload");
    if (typeof window !== "undefined") {
      localStorage.setItem("detektif_kebun_custom_avatar", croppedDataUrl);
    }
  };

  const handleSaveProfile = () => {
    if (!userProfile) return;
    const isCustomImage = selectedAvatar === "custom_upload";
    const isGoogle = selectedAvatar === "google_pic";

    const pictureUrl = isCustomImage
      ? customUploadedImage
      : isGoogle
      ? (userProfile.googlePicture || userProfile.picture)
      : "";

    const updated: UserProfile = {
      ...userProfile,
      name: editingName.trim() || userProfile.name,
      picture: pictureUrl,
      googlePicture: userProfile.googlePicture || (isGoogle ? userProfile.picture : ""),
      customAvatar: !isGoogle && !isCustomImage ? selectedAvatar : "🍀",
      avatarType: isCustomImage ? "custom_image" : isGoogle ? "google" : "custom"
    };

    setUserProfile(updated);
    localStorage.setItem("detektif_kebun_user", JSON.stringify(updated));
    if (updated.email) {
      localStorage.setItem(`detektif_kebun_user_${updated.email}`, JSON.stringify(updated));
    }
    if (customUploadedImage && isCustomImage) {
      localStorage.setItem("detektif_kebun_custom_avatar", customUploadedImage);
    }
    showLifeNotification("Profil Diperbarui! 📝");
    setShowProfileModal(false);

    // Sync updated profile avatar to global leaderboard!
    saveLeaderboardRecord();
  };

  // Save active session state to sessionStorage on any changes
  useEffect(() => {
    if (!isSessionLoaded) return;
    if (typeof window !== "undefined") {
      if (gamePhase === "intro" || gamePhase === "summary") {
        sessionStorage.removeItem("detektif_kebun_active_session");
        return;
      }
      const sessionData = {
        gamePhase,
        sessionQuestionIndex,
        sessionPlantsAsked,
        sessionDiscoveredPlants,
        gameMode,
        extraLivesSession,
        cluesQuestionIndex,
        timeStopQuestionIndex,
        sessionAttempts,
        hasReceivedSpecialCard,
        showSpecialCardModal,
        shuffledCards,
        streak,
        score,
        totalCorrect,
        totalAttempted,
        riddleData,
        checkResult,
        eyangMessage,
        eyangMood,
        prefetchedRiddle,
      };
      sessionStorage.setItem("detektif_kebun_active_session", JSON.stringify(sessionData));
    }
  }, [
    isSessionLoaded,
    gamePhase,
    sessionQuestionIndex,
    sessionPlantsAsked,
    sessionDiscoveredPlants,
    gameMode,
    extraLivesSession,
    cluesQuestionIndex,
    timeStopQuestionIndex,
    sessionAttempts,
    hasReceivedSpecialCard,
    showSpecialCardModal,
    shuffledCards,
    streak,
    score,
    totalCorrect,
    totalAttempted,
    riddleData,
    checkResult,
    eyangMessage,
    eyangMood,
    prefetchedRiddle,
  ]);

  // ─── Hydration from localStorage ──────────────────────────────────────────
  useEffect(() => {
    // Load discovered plants gallery
    const savedGallery = localStorage.getItem("detektif_kebun_gallery");
    if (savedGallery) {
      try {
        const gallery = JSON.parse(savedGallery);
        setTimeout(() => {
          setDiscoveredGallery(gallery);
        }, 0);
      } catch (e) {
        console.error("Gagal mem-parse data galeri dari localStorage", e);
      }
    }

    // Load stats
    const savedStats = localStorage.getItem("detektif_kebun_stats");
    if (savedStats) {
      try {
        const stats = JSON.parse(savedStats);
        setTimeout(() => {
          if (typeof stats.score === "number") setScore(stats.score);
          if (typeof stats.streak === "number") setStreak(stats.streak);
          if (typeof stats.totalCorrect === "number") setTotalCorrect(stats.totalCorrect);
          if (typeof stats.totalAttempted === "number") setTotalAttempted(stats.totalAttempted);
        }, 0);
      } catch (e) {
        console.error("Gagal mem-parse stats dari localStorage", e);
      }
    }

    // Load performance mode setting
    const savedPerf = localStorage.getItem("detektif_kebun_perf_mode");
    if (savedPerf === "true") {
      setTimeout(() => {
        setPerformanceMode(true);
      }, 0);
    }

    // Load Leaderboard data
    const savedLb = localStorage.getItem("detektif_kebun_leaderboard");
    if (savedLb) {
      try {
        const parsed = JSON.parse(savedLb);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTimeout(() => {
            setLeaderboardEntries(parsed);
          }, 0);
        }
      } catch (e) {
        console.error("Gagal load leaderboard dari localStorage", e);
      }
    }
  }, []);

  // Update performance mode setting
  useEffect(() => {
    localStorage.setItem("detektif_kebun_perf_mode", String(performanceMode));
  }, [performanceMode]);

  // Active session duration timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (gamePhase === "playing") {
      timer = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gamePhase]);

  // ─── Fetch Global Leaderboard API ─────────────────────────────────────────
  const fetchGlobalLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.entries)) {
          setLeaderboardEntries(data.entries);
          localStorage.setItem("detektif_kebun_leaderboard", JSON.stringify(data.entries));
        }
      }
    } catch (e) {
      console.warn("Gagal mengambil leaderboard global:", e);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch("/api/leaderboard");
        if (res.ok && !ignore) {
          const data = await res.json();
          if (Array.isArray(data.entries) && !ignore) {
            const dummyIds = new Set(["eyang_rimba", "kapitan_botanis", "pakar_rimba"]);
            const dummyNames = new Set(["Eyang Rimba Agung", "Kapitan Botanis", "Rani Sumatra"]);
            const cleanEntries = data.entries.filter(
              (e: LeaderboardEntry) => e && e.id && !dummyIds.has(e.id) && !dummyNames.has(e.name)
            );
            setLeaderboardEntries(cleanEntries);
            localStorage.setItem("detektif_kebun_leaderboard", JSON.stringify(cleanEntries));
          }
        }
      } catch (e) {
        console.warn("Gagal mengambil leaderboard global:", e);
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
  }, []);

  // ─── Save / Update Leaderboard Record Callback ──────────────────────────────
  const saveLeaderboardRecord = useCallback(
    (
      finalScore?: number,
      finalCorrect?: number,
      finalAttempted?: number,
      finalDuration?: number
    ) => {
      if (!userProfile) return;

      const activeScore = finalScore ?? score;
      const activeCorrect = finalCorrect ?? totalCorrect;
      const activeAttempted = finalAttempted ?? totalAttempted;
      const activeDuration = finalDuration ?? sessionDuration;
      const activeFloraCount = discoveredGallery.length;

      const currentProfile: UserProfile = userProfile || {
        id: "demo_user",
        name: "Detektif Nusantara",
        email: "detektif@nusantara.org",
        picture: "",
        avatarType: "custom",
        customAvatar: "🦉",
        title: calculateTitle(discoveredGallery.length),
      };

      const entryId = currentProfile.id || currentProfile.email || "demo_user";

      const entryToPost = {
        id: entryId,
        name: currentProfile.name,
        email: currentProfile.email,
        picture: currentProfile.picture,
        avatarType: currentProfile.avatarType,
        customAvatar: currentProfile.customAvatar,
        title: currentProfile.title,
        score: activeScore,
        totalCorrect: activeCorrect,
        totalAttempted: activeAttempted,
        durationSeconds: activeDuration,
        floraCount: activeFloraCount,
        maxStreak: streak,
        ttsScore,
        ttsCompleted,
        updatedAt: "Baru saja",
      };

      fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry: entryToPost }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.entries)) {
            setLeaderboardEntries(data.entries);
            localStorage.setItem("detektif_kebun_leaderboard", JSON.stringify(data.entries));
          }
        })
        .catch((err) => console.warn("Error posting to global leaderboard:", err));
    },
    [score, totalCorrect, totalAttempted, sessionDuration, discoveredGallery.length, userProfile, calculateTitle, streak, ttsScore, ttsCompleted]
  );

  // Update stats in localStorage on change
  useEffect(() => {
    if (score === 0 && streak === 0 && totalCorrect === 0 && totalAttempted === 0) return;
    const statsData = { score, streak, totalCorrect, totalAttempted };
    localStorage.setItem(
      "detektif_kebun_stats",
      JSON.stringify(statsData)
    );
    if (userProfile?.email) {
      localStorage.setItem(`detektif_kebun_stats_${userProfile.email}`, JSON.stringify(statsData));
    }
    // Auto sync to leaderboard ONLY if user is logged in and actively playing/finishing a session
    if (userProfile && (gamePhase === "playing" || gamePhase === "summary")) {
      saveLeaderboardRecord(score, totalCorrect, totalAttempted, sessionDuration);
    }
  }, [score, streak, totalCorrect, totalAttempted, userProfile, sessionDuration, saveLeaderboardRecord, gamePhase]);

  // Cycle through intro messages on click
  const handleIntroNext = () => {
    if (introStep < INTRO_MESSAGES.length - 1) {
      const next = introStep + 1;
      setIntroStep(next);
      setEyangMessage(INTRO_MESSAGES[next]);
      setEyangMood(next === INTRO_MESSAGES.length - 1 ? "excited" : "neutral");
    } else {
      startGame();
    }
  };



  const startGame = (mode: GameMode = "normal") => {
    setGameMode(mode);
    isTransitioningRef.current = false;
    setIsSidebarOpen(false);
    setIsSidebarCollapsed(true);
    setScore(0);
    setStreak(0);
    setTotalCorrect(0);
    setTotalAttempted(0);
    setSessionDuration(0);
    setSessionQuestionIndex(1);
    setSessionPlantsAsked([]);
    setSessionDiscoveredPlants([]);
    setIsSessionFailed(false);
    setSessionAttempts(0);
    
    // Reset Special Card Reward States
    setHasReceivedSpecialCard(false);
    setShowSpecialCardModal(false);
    setShuffledCards([]);
    setExtraLivesSession(0);
    setCluesQuestionIndex(0);
    setTimeStopQuestionIndex(0);

    setGamePhase("playing");
    if (prefetchedRiddle) {
      const firstRiddle = prefetchedRiddle;
      setRiddleData(firstRiddle);
      const plantName = atob(firstRiddle.encodedPlant);
      setSessionPlantsAsked([plantName]);
      setPrefetchedRiddle(null);
      setEyangMessage("Baiklah, Nak... dengarkan baik-baik teka-tekiku ini. Apa gerangan namanya?");
      setEyangMood("thinking");
    } else {
      fetchRiddle([]);
    }
  };

  const handleGameOver = () => {
    setIsSessionFailed(true);
    setGamePhase("summary");
    setEyangMessage(
      "Sayang sekali, Nak. Usahamu terhenti di sini karena kehabisan nyawa. Hutan Nusantara menyimpan misteri yang luas, jangan berkecil hati. Belajarlah lagi dan kembali ke sini jika sudah siap!"
    );
    setEyangMood("sad");
  };

  const handleResetGallery = () => {
    const confirmReset = window.confirm(
      "Apakah kamu yakin ingin mereset Jurnal Botani? Semua flora yang sudah kamu temukan akan terhapus dari catatan."
    );
    if (confirmReset) {
      localStorage.removeItem("detektif_kebun_gallery");
      localStorage.removeItem("detektif_kebun_stats");
      setDiscoveredGallery([]);
      setScore(0);
      setStreak(0);
      setTotalCorrect(0);
      setTotalAttempted(0);
      alert("Jurnal Botani telah berhasil direset!");
    }
  };

  const finishGame = useCallback(() => {
    setGamePhase("summary");
    
    const pct = totalAttempted > 0 ? (totalCorrect / totalAttempted) : 0;
    
    if (sessionQuestionIndex >= 15 && totalAttempted >= 15) {
      if (pct === 1) {
        setEyangMessage("Luar biasa, Nak! Pengetahuan botanimu sungguh sempurna. Kamulah Sang Penjaga Rimba Sejati!");
        setEyangMood("proud");
      } else if (pct >= 0.8) {
        setEyangMessage("Hebat sekali! Kamu memahami rahasia flora Nusantara dengan sangat baik. Teruskan perjuanganmu melestarikan alam!");
        setEyangMood("proud");
      } else if (pct >= 0.5) {
        setEyangMessage("Cukup bagus, Nak! Pengetahuanmu tentang tanaman tropis sudah lumayan. Hutan ini menyambutmu hangat.");
        setEyangMood("excited");
      } else {
        setEyangMessage("Jangan berkecil hati, Nak. Belajar dari alam membutuhkan waktu. Eyang yakin lain kali kamu akan lebih hebat.");
        setEyangMood("neutral");
      }
    } else {
      setEyangMessage("Keputusan bijak untuk beristirahat dan memulihkan tenaga, Nak. Alam selalu menantimu untuk kembali berpetualang!");
      setEyangMood("neutral");
    }
  }, [totalCorrect, totalAttempted, sessionQuestionIndex]);

  const handleAnswerResult = (result: CheckResult) => {
    // Lock description states if answer was already correctly evaluated to prevent accidental resets
    if (checkResult?.correct && !result.correct) {
      return;
    }
    setTotalAttempted((p) => p + 1);
    setCheckResult(result);
    if (result.correct) {
      const basePoints = SCORE_MAP[riddleData?.difficulty ?? "sedang"];
      const multiplier = MODE_MULTIPLIER[gameMode] ?? 1;
      const pts = basePoints * multiplier;
      setScore((p) => p + pts + streak * 5 * multiplier); // streak bonus juga di-scale
      const newStreak = streak + 1;
      setStreak(newStreak);

      if (gameMode === "hard" && newStreak === 5 && !hasReceivedSpecialCard) {
        // Shuffle 3 special reward cards
        const cards: ("life" | "clues" | "time")[] = ["life", "clues", "time"];
        for (let i = cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        setShuffledCards(cards);
        setShowSpecialCardModal(true);
        setHasReceivedSpecialCard(true);
      } else if (gameMode === "hard" && hasReceivedSpecialCard && newStreak % 3 === 0) {
        if (sessionAttempts === 1) {
          setSessionAttempts(0);
          showLifeNotification("Bonus +1 Nyawa dari Streak! ❤️");
          setEyangMessage(`Luar biasa, Nak! Streak ${newStreak}x menjawab benar membawakanmu karunia +1 Nyawa dari Eyang! ❤️`);
          setEyangMood("excited");
        } else {
          setEyangMessage(`Hebat sekali, Nak! Kamu mencapai streak ${newStreak}x jawaban benar! Pertahankan fokusmu! 🌟`);
          setEyangMood("excited");
        }
      }
      setTotalCorrect((p) => p + 1);

      setSessionDiscoveredPlants((prev) => {
        if (prev.includes(result.plantName)) return prev;
        return [...prev, result.plantName];
      });

      // Add to discovered gallery if not already exists
      setDiscoveredGallery((prev) => {
        const alreadyExists = prev.some(
          (p) => p.plantName.toLowerCase() === result.plantName.toLowerCase()
        );
        if (alreadyExists) return prev;

        const newPlant: DiscoveredPlant = {
          plantName: result.plantName,
          botanicalFacts: result.botanicalFacts,
          habitat: result.habitat,
          localNames: result.localNames,
          discoveredAt: new Date().toISOString(),
          difficulty: gameMode === "easy" ? "mudah" : gameMode === "hard" ? "sulit" : "sedang",
        };

        const updated = [newPlant, ...prev];
        localStorage.setItem("detektif_kebun_gallery", JSON.stringify(updated));
        if (userProfile?.email) {
          localStorage.setItem(`detektif_kebun_gallery_${userProfile.email}`, JSON.stringify(updated));
        }
        return updated;
      });
    } else {
      setStreak(0);
    }
  };

  const handleCorrectAnswer = () => {
    setGamePhase("correct");
  };

  const resetStreak = useCallback(() => {
    setStreak(0);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setIsSidebarCollapsed((prev) => !prev);
    } else {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  const handleSelectSpecialCard = (cardType: "life" | "clues" | "time") => {
    if (cardType === "life") {
      if (gameMode === "hard") {
        if (sessionAttempts === 1) {
          setSessionAttempts(0);
          showLifeNotification("Nyawa Terpulihkan! ❤️");
        } else {
          showLifeNotification("Nyawa sudah penuh! ❤️");
        }
      } else {
        setExtraLivesSession(1);
        showLifeNotification("+1 Nyawa Cadangan! ❤️");
      }
    } else if (cardType === "clues") {
      setCluesQuestionIndex(sessionQuestionIndex + 1);
    } else if (cardType === "time") {
      setTimeStopQuestionIndex(sessionQuestionIndex + 1);
    }
    setShowSpecialCardModal(false);
  };

  const handleNextRiddle = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    if (sessionQuestionIndex >= 15) {
      finishGame();
      return;
    }

    if (gameMode !== "hard") {
      setSessionAttempts(0);
    }
    setSessionQuestionIndex((idx) => idx + 1);
    setGamePhase("playing");
    setEyangMessage("Bagus sekali! Mari kita lanjutkan dengan teka-teki berikutnya...");
    setEyangMood("excited");
    setCheckResult(null);

    if (prefetchedRiddle) {
      const nextRiddle = prefetchedRiddle;
      setRiddleData(nextRiddle);
      const plantName = atob(nextRiddle.encodedPlant);
      setSessionPlantsAsked((prev) => {
        if (prev.includes(plantName)) return prev;
        return [...prev, plantName];
      });
      setPrefetchedRiddle(null);
      setIsLoading(false);
      setIsEyangTyping(false);
      isTransitioningRef.current = false;
    } else {
      fetchRiddle(sessionPlantsAsked);
    }
  };

  const handleEyangMessage = (msg: string, mood: EyangMood) => {
    setEyangMessage(msg);
    setEyangMood(mood);
  };

  return (
    <div className="relative h-screen flex flex-col lg:flex-row overflow-hidden">
      {!performanceMode && <div className="crt-overlay" />}
      {/* Ambient forest background */}
      <ForestBackground performanceMode={performanceMode} />

      {/* Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(27,42,26,0.6) 100%)" }}
      />

      {/* ── Mobile Top Bar ───────────────────────────────────────── */}
      <div className="lg:hidden relative z-30 p-4 flex items-center justify-between border-b-4 border-pixel-wood bg-pixel-moss sticky top-0 w-full">
        <div className="flex items-center gap-2">
          {gamePhase === "intro" && introStep === INTRO_MESSAGES.length - 1 && (
            <motion.button
              onClick={() => {
                setIntroStep(0);
                setIsSidebarOpen(false);
                setIsSidebarCollapsed(true);
                sessionStorage.removeItem("detektif_kebun_active_session");
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1.5 px-3 py-2 border-2 border-pixel-wood text-[9px] font-bold uppercase tracking-wider text-pixel-parchment cursor-pointer"
              style={{
                backgroundColor: "#5e3c25",
                fontFamily: "var(--font-title)",
              }}
              whileHover={{ filter: "brightness(1.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Lobby</span>
            </motion.button>
          )}

          <motion.button
            onClick={isGameActive ? undefined : toggleSidebar}
            disabled={isGameActive}
            className={`flex items-center gap-2 px-4 py-2 border-2 text-[9px] font-bold uppercase tracking-wider transition-all duration-200
              ${isGameActive 
                ? "border-red-500/20 bg-red-950/20 text-red-400 cursor-not-allowed" 
                : "border-pixel-wood bg-pixel-leaf text-pixel-parchment hover:bg-pixel-moss cursor-pointer"
              }`}
            whileHover={isGameActive ? {} : { scale: 1.05 }}
            whileTap={isGameActive ? {} : { scale: 0.95 }}
            style={{ fontFamily: "var(--font-title)" }}
          >
            <motion.span
              className="inline-flex items-center justify-center text-sm"
              animate={{ rotate: isSidebarOpen ? 360 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {isGameActive ? <Lock className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
            </motion.span>
            <span>{isGameActive ? "Terkunci" : "Jurnal"}</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPerformanceMode((prev) => !prev)}
            className={`px-2 py-1 border-2 text-[8px] font-bold uppercase tracking-wider cursor-pointer ${
              performanceMode ? "bg-amber-750 text-amber-100 border-amber-500" : "bg-pixel-leaf text-pixel-parchment border-pixel-wood"
            }`}
            style={{ fontFamily: "var(--font-title)" }}
            title="Toggle Mode Hemat Daya (Performa)"
          >
            {performanceMode ? "⚡ HEMAT" : "🎨 ANIMASI"}
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-pixel-parchment" style={{ fontFamily: "var(--font-title)" }}>Skor:</span>
            <span className="text-sm font-bold text-pixel-gold" style={{ fontFamily: "var(--font-title)" }}>{score}</span>
          </div>
          {streak > 0 && (
            <div className="flex items-center gap-1 text-[9px] text-pixel-gold font-bold bg-pixel-dark border-2 border-pixel-wood px-2 py-0.5">
              <PixelFlame size={14} />
              <span style={{ fontFamily: "var(--font-title)" }}>{streak}x</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Left Sidebar (Jurnal Botani) ─────────────────────────── */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r-4 border-pixel-wood shadow-2xl transition-all duration-300 ease-in-out overflow-hidden
          ${isSidebarOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full"}
          lg:translate-x-0 lg:static lg:h-full lg:self-stretch
          ${isSidebarCollapsed ? "lg:w-0 lg:opacity-0 lg:pointer-events-none" : "lg:w-80 lg:opacity-100 lg:pointer-events-auto"}
        `}
        style={{
          backgroundColor: "var(--pixel-parchment)",
          color: "var(--pixel-dark)",
        }}
      >
        <div className="w-80 h-full flex flex-col flex-shrink-0 min-h-full">
          {/* Sidebar Header */}
          <div className="p-5 border-b-4 border-pixel-wood flex items-center justify-between bg-pixel-moss/10">
            <div className="flex items-center gap-2.5">
              <motion.button
                onClick={toggleSidebar}
                className="text-pixel-dark hover:text-pixel-wood transition-colors p-1 lg:hidden flex items-center justify-center"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title="Tutup Jurnal"
              >
                <BookOpen className="w-5 h-5" />
              </motion.button>
              <span className="hidden lg:inline-flex items-center select-none text-pixel-dark">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider ml-1 text-pixel-wood" style={{ fontFamily: "var(--font-title)" }}>
                  Jurnal Botani
                </h2>
                <p className="text-[8px] uppercase tracking-widest opacity-60 font-bold ml-1" style={{ fontFamily: "var(--font-title)" }}>
                  Catatan Penjelajah
                </p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden hover:text-pixel-wood p-1 transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* JURNAL BOTANI EYANG RIMBA - Sprite Card */}
            <div className="card-forest p-3 flex items-center gap-3">
              {/* Miniature Avatar Sprite Eyang Rimba */}
              <div 
                className="w-12 h-12 border-2 flex items-center justify-center bg-pixel-moss flex-shrink-0"
                style={{ borderColor: "var(--pixel-wood)", boxShadow: "2px 2px 0 0 rgba(0,0,0,0.2)" }}
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
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-pixel-gold" style={{ fontFamily: "var(--font-title)" }}>
                  JURNAL BOTANI EYANG RIMBA
                </h4>
                <p className="text-[8px] text-pixel-parchment/60 font-bold uppercase mt-1" style={{ fontFamily: "var(--font-title)" }}>
                  Sang Penjaga Rimba
                </p>
              </div>
            </div>

            {/* Section 1: Tentang Game */}
            <div className="space-y-2">
              <h3
                className="text-[10px] font-bold uppercase tracking-widest text-pixel-wood border-b-2 border-pixel-wood/25 pb-1"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Tentang Jurnal
              </h3>
              <p className="text-xs leading-relaxed opacity-85 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                Selamat datang di petualangan botani Nusantara. Pecahkan teka-teki dari <strong>Eyang Rimba</strong> untuk menemukan flora-flora ajaib Indonesia dan mengisi lembaran jurnal ini.
              </p>
            </div>

            {/* Section 2: Cara Bermain */}
            <div className="space-y-2">
              <h3
                className="text-[10px] font-bold uppercase tracking-widest text-pixel-wood border-b-2 border-pixel-wood/25 pb-1"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Petunjuk
              </h3>
              <ul className="text-xs space-y-1.5 opacity-85 list-none font-medium pl-0" style={{ fontFamily: "var(--font-body)" }}>
                <li className="flex items-start gap-2">
                  <span className="text-pixel-leaf">■</span>
                  <span>Tebak nama tanaman berdasarkan teka-teki puitis Eyang Rimba.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pixel-leaf">■</span>
                  <span>Perhatikan petunjuk huruf awalan nama tanaman yang diberikan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">■</span>
                  <span>Kamu punya 3 nyawa. Kegagalan membuka petunjuk tambahan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pixel-gold">■</span>
                  <span>Jawaban tepat melukis sketsa botani & menyimpan spesimen.</span>
                </li>
              </ul>
            </div>

            {/* Section 3: Koleksi Flora - Compact Button */}
            <div className="space-y-2">
              <h3
                className="text-[10px] font-bold uppercase tracking-widest text-pixel-wood border-b-2 border-pixel-wood/25 pb-1"
                style={{ fontFamily: "var(--font-title)" }}
              >
                Koleksi
              </h3>
              <motion.button
                onClick={() => {
                  setShowCollectionPanel(true);
                  setIsSidebarOpen(false);
                }}
                className="w-full bg-[#12130e] border-2 border-pixel-gold p-1 shadow-lg cursor-pointer flex items-center gap-2 transition-all duration-150"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{ imageRendering: "pixelated" }}
              >
                {/* Left Chest Icon Container */}
                <div
                  className="w-12 h-10 border-2 border-[#12130e] bg-pixel-wood flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: "inset 2px 2px 0 0 #92623a, inset -2px -2px 0 0 #3a2010" }}
                >
                  <PixelChest />
                </div>
                {/* Right Value Area */}
                <div 
                  className="flex-1 flex items-center justify-between px-3 bg-pixel-wood border-2 border-[#12130e] h-10 text-pixel-parchment"
                  style={{ boxShadow: "inset 2px 2px 0 0 #92623a, inset -2px -2px 0 0 #3a2010" }}
                >
                  <div className="flex items-center justify-center">
                    <PixelCoin />
                  </div>
                  <span className="text-[9px] font-bold tracking-widest text-pixel-gold" style={{ fontFamily: "var(--font-title)" }}>
                    {discoveredGallery.length} / 15
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
          {/* Sidebar Footer */}
          <div className="p-4 border-t-4 border-pixel-wood text-center text-[8px] opacity-60 font-bold flex items-center justify-center gap-1 text-pixel-dark bg-pixel-moss/10" style={{ fontFamily: "var(--font-title)" }}>
            <Compass className="w-3.5 h-3.5 text-pixel-wood" />
            <span>DETEKTIF KEBUN v1.2 RETRO</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── Right Main Content Area ────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-between items-center w-full h-full pb-10 overflow-x-hidden overflow-y-auto">
        {/* Profil / Login Badge - Top Right (Desktop) */}
        {gamePhase === "intro" && (
          <div className="fixed top-6 right-6 z-50 hidden lg:flex items-center gap-2">
            {/* Leaderboard Button */}
            <motion.button
              onClick={() => setShowLeaderboardModal(true)}
              className="flex items-center gap-3 px-3 py-2 bg-[#2d1b10] border-2 border-pixel-wood hover:border-pixel-gold rounded-sm shadow-[0_4px_0_#1a0f09] hover:shadow-[0_2px_0_#1a0f09] hover:translate-y-[2px] transition-all group cursor-pointer"
              style={{ imageRendering: "pixelated" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              title="Lihat Papan Peringkat Rimba"
            >
              <div className="w-10 h-10 rounded-sm border-2 border-[#1a0f09] bg-[#12130e] flex items-center justify-center overflow-hidden shadow-inner group-hover:border-pixel-gold transition-colors">
                <PixelCrown size={24} className="text-[#facc15]" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[11px] font-extrabold text-[#e4d6a7] uppercase tracking-wider group-hover:text-pixel-gold transition-colors" style={{ fontFamily: "var(--font-title)" }}>
                  Peringkat
                </span>
                <span className="text-[9px] font-bold text-[#8b9973] mt-0.5" style={{ fontFamily: "var(--font-title)" }}>
                  👑 Hall of Fame
                </span>
              </div>
            </motion.button>

            {userProfile ? (
              <motion.button
                onClick={() => {
                  setEditingName(userProfile.name);
                  setSelectedAvatar(userProfile.avatarType === "google" ? "google_pic" : userProfile.customAvatar);
                  setShowProfileModal(true);
                }}
                className="flex items-center gap-3 px-3 py-2 bg-[#2d1b10] border-2 border-pixel-wood hover:border-pixel-gold rounded-sm shadow-[0_4px_0_#1a0f09] hover:shadow-[0_2px_0_#1a0f09] hover:translate-y-[2px] transition-all group cursor-pointer"
                style={{ imageRendering: "pixelated" }}
              >
                <div className="w-10 h-10 rounded-sm border-2 border-[#1a0f09] bg-[#12130e] flex items-center justify-center overflow-hidden shadow-inner group-hover:border-pixel-gold transition-colors">
                  {userProfile.avatarType === "google" && userProfile.picture ? (
                    <Image src={userProfile.picture} alt="Google Profile" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                  ) : (
                    <PixelAvatar char={userProfile.customAvatar} size={24} />
                  )}
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] font-extrabold text-[#e4d6a7] uppercase tracking-wider group-hover:text-pixel-gold transition-colors" style={{ fontFamily: "var(--font-title)" }}>
                    {userProfile.name}
                  </span>
                  <span className="text-[9px] font-bold text-[#8b9973] mt-0.5" style={{ fontFamily: "var(--font-title)" }}>
                    🏆 {userProfile.title}
                  </span>
                </div>
              </motion.button>
            ) : (
              <motion.button
                onClick={handleGoogleLogin}
                className="btn-organic text-[9px] px-5 py-3 flex items-center gap-2 cursor-pointer shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: "var(--pixel-wood)",
                  color: "#fff",
                  fontFamily: "var(--font-title)",
                  border: "4px solid var(--pixel-wood)",
                }}
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk</span>
              </motion.button>
            )}
          </div>
        )}

        {/* Floating Button Stack — Book (+ optional Lobby) */}
        <motion.div
          className="fixed top-6 z-50 hidden lg:flex flex-col"
          style={{ left: 24 }}
          animate={{
            x: isGameActive ? 0 : (isSidebarCollapsed ? 0 : 320),
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          {/* Tombol Buku / Jurnal */}
          <motion.button
            onClick={isGameActive ? undefined : toggleSidebar}
            disabled={isGameActive}
            className={`p-3.5 border-4 shadow-2xl flex items-center justify-center transition-all duration-300
              ${isGameActive
                ? "border-red-500/20 bg-red-950/20 cursor-not-allowed text-red-400"
                : "border-pixel-wood bg-pixel-moss text-pixel-gold hover:bg-pixel-leaf cursor-pointer"
              }`}
            whileHover={isGameActive ? {} : { scale: 1.1 }}
            whileTap={isGameActive ? {} : { scale: 0.9 }}
            animate={{
              rotate: isGameActive ? 0 : (isSidebarCollapsed ? 0 : 360),
            }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            title={isGameActive ? "Jurnal Terkunci saat Bermain" : (isSidebarCollapsed ? "Buka Jurnal Botani" : "Tutup Jurnal Botani")}
          >
            <motion.span
              key={isGameActive ? "locked" : (isSidebarCollapsed ? "closed" : "open")}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center justify-center"
            >
              {isGameActive ? <Lock className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            </motion.span>
          </motion.button>

          {/* Tombol Mode Performa */}
          <motion.button
            onClick={() => setPerformanceMode((prev) => !prev)}
            className={`p-3.5 border-4 border-t-0 shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
              performanceMode ? "bg-amber-800 text-amber-100 border-pixel-wood" : "bg-pixel-moss text-pixel-gold border-pixel-wood"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={performanceMode ? "Mode Hemat Daya: Aktif" : "Mode Hemat Daya: Nonaktif (Visual Indah)"}
          >
            <span className="text-xs font-bold leading-none" style={{ fontFamily: "var(--font-title)" }}>
              {performanceMode ? "⚡" : "🎨"}
            </span>
          </motion.button>

          {/* Tombol Kembali ke Lobby — hanya muncul di halaman pemilihan tingkat kesulitan */}
          {gamePhase === "intro" && introStep === INTRO_MESSAGES.length - 1 && (
            <motion.button
              onClick={() => {
                setIntroStep(0);
                setIsSidebarOpen(false);
                setIsSidebarCollapsed(true);
                sessionStorage.removeItem("detektif_kebun_active_session");
              }}
              initial={{ opacity: 0, scaleY: 0.5 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.5 }}
              transition={{ duration: 0.15 }}
              className="p-3.5 border-4 border-pixel-wood flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: "#5e3c25",
                color: "#f4eedd",
                borderTop: "none",
                boxShadow: "0 4px 0 0 #1a1c14",
              }}
              whileHover={{ filter: "brightness(1.2)" }}
              whileTap={{ scale: 0.92 }}
              title="Kembali ke Lobby"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </motion.button>
          )}
        </motion.div>

        {/* Header */}
        <header className="text-center pt-8 pb-4 px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative leaf row (Retro Pixel Art) */}
            <div className="flex items-center justify-center gap-3 mb-3">
              {[
                { color: "#4a5d23", size: 22, delay: 0 },
                { color: "#647c35", size: 26, delay: 0.2 },
                { color: "#c9a227", size: 28, delay: 0.4 },
                { color: "#7ba036", size: 26, delay: 0.6 },
                { color: "#4a5d23", size: 22, delay: 0.8 },
              ].map((leaf, i) => (
                <motion.div
                  key={i}
                  className="inline-flex items-center justify-center filter drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: leaf.delay }}
                >
                  <PixelLeaf size={leaf.size} color={leaf.color} />
                </motion.div>
              ))}
            </div>

            <h1
              className="text-rpg-title text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "var(--font-title)" }}
            >
              Detektif Kebun
            </h1>
            <p className="text-subtitle-pixel mt-3">
              · Teka-Teki Flora Nusantara ·
            </p>
          </motion.div>
        </header>

        {/* Main game area */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 pb-12 flex flex-col gap-6">
          {/* Profil / Login Badge (Mobile) */}
          {gamePhase === "intro" && (
            <div className="lg:hidden w-full flex items-center justify-end gap-2 px-1 mt-1 z-30">
              {/* Mobile Leaderboard Button */}
              <motion.button
                onClick={() => setShowLeaderboardModal(true)}
                className="flex items-center gap-2.5 px-3 py-1.5 bg-[#1c150c] border-2 border-[#5e3c25] hover:border-[#c9a227] rounded-sm shadow-[0_3px_0_#0f0a05] cursor-pointer transition-all group shrink-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ imageRendering: "pixelated" }}
                title="Papan Peringkat Rimba"
              >
                <div className="w-8 h-8 rounded-sm border-2 border-[#c9a227] bg-[#12130e] flex items-center justify-center overflow-hidden shrink-0">
                  <PixelCrown size={20} className="text-[#facc15]" />
                </div>
                <div className="flex flex-col items-start leading-tight min-w-0">
                  <span className="text-[10px] sm:text-xs font-extrabold text-[#f4eedd] group-hover:text-pixel-gold tracking-wide truncate block" style={{ fontFamily: "var(--font-title)" }}>
                    Peringkat
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold text-[#a4b486] mt-0.5 truncate block" style={{ fontFamily: "var(--font-title)" }}>
                    👑 Hall of Fame
                  </span>
                </div>
              </motion.button>

              {userProfile ? (
                <motion.button
                  onClick={() => {
                    setEditingName(userProfile.name);
                    setSelectedAvatar(userProfile.avatarType === "google" ? "google_pic" : userProfile.customAvatar);
                    setShowProfileModal(true);
                  }}
                  className="flex items-center gap-2.5 px-3 py-1.5 bg-[#1c150c] border-2 border-[#5e3c25] hover:border-[#c9a227] rounded-sm shadow-[0_3px_0_#0f0a05] cursor-pointer transition-all group max-w-[85vw]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ imageRendering: "pixelated" }}
                >
                  <div className="w-8 h-8 rounded-sm border-2 border-[#c9a227] bg-[#12130e] flex items-center justify-center overflow-hidden shrink-0">
                    {userProfile.avatarType === "google" && userProfile.picture ? (
                      <Image src={userProfile.picture} alt="Google Profile" width={32} height={32} className="w-full h-full object-cover" unoptimized />
                    ) : (
                      <PixelAvatar char={userProfile.customAvatar} size={22} />
                    )}
                  </div>
                  <div className="flex flex-col items-start leading-tight min-w-0 flex-1">
                    <span className="text-[10px] sm:text-xs font-extrabold text-[#f4eedd] group-hover:text-pixel-gold tracking-wide truncate max-w-[130px] sm:max-w-[180px] block" style={{ fontFamily: "var(--font-title)" }}>
                      {userProfile.name}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-[#a4b486] mt-0.5 truncate max-w-[130px] sm:max-w-[180px] block" style={{ fontFamily: "var(--font-title)" }}>
                      🏆 {userProfile.title}
                    </span>
                  </div>
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleGoogleLogin}
                  className="btn-organic text-[9px] px-4 py-2 flex items-center gap-1.5 cursor-pointer shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    backgroundColor: "var(--pixel-wood)",
                    color: "#fff",
                    fontFamily: "var(--font-title)",
                    border: "3px solid var(--pixel-wood)",
                  }}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Masuk</span>
                </motion.button>
              )}
            </div>
          )}

          {/* Eyang Rimba chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <EyangRimba
              message={eyangMessage}
              mood={eyangMood}
              isTyping={isEyangTyping}
              performanceMode={performanceMode}
            />
          </motion.div>

          {/* Session Progress Bar and Stop Button */}
          {(gamePhase === "playing" || gamePhase === "correct") && (
            <motion.div
              className="w-full flex flex-wrap items-center justify-between gap-3.5 px-6 py-4.5 sm:py-5 border-4 border-pixel-wood bg-pixel-moss shadow-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-pixel-dark/50 border border-pixel-wood/60 rounded-xs">
                  <Sprout className="text-pixel-gold w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-pixel-parchment">
                    Progres: <span className="text-pixel-gold font-bold ml-1" style={{ fontFamily: "var(--font-title)" }}>Soal {sessionQuestionIndex} / 15</span>
                  </span>
                </div>
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase px-3 py-1 border-2 
                  ${gameMode === "easy" ? "border-pixel-wood bg-pixel-leaf text-pixel-parchment" : 
                    gameMode === "normal" ? "border-pixel-wood bg-pixel-gold text-pixel-dark" : 
                    "border-red-700 bg-red-800 text-white"}`}
                  style={{ fontFamily: "var(--font-title)" }}
                >
                  Mode: {gameMode === "easy" ? "Mudah" : gameMode === "normal" ? "Normal" : "Sulit"}
                </span>
              </div>
              <motion.button
                onClick={() => setShowSurrenderConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-pixel-wood bg-red-800 text-[9px] sm:text-xs font-bold uppercase text-white hover:bg-red-900 transition-all duration-100 cursor-pointer shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "var(--font-title)" }}
              >
                <PixelLogOut size={16} />
                <span>Menyerah</span>
              </motion.button>
            </motion.div>
          )}

          {/* Intro phase */}
          <AnimatePresence mode="wait">
            {gamePhase === "intro" && (
              <motion.div
                key="intro"
                className="flex flex-col items-center gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Decorative botanical illustration - Boxy 8-bit style */}
                <motion.div
                  className="relative"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 220 260" width="180" height="220" xmlns="http://www.w3.org/2000/svg" className="[image-rendering:pixelated]" style={{ filter: "drop-shadow(3px 4px 0px rgba(0,0,0,0.15))" }}>
                    {/* Ground */}
                    <rect x="50" y="240" width="120" height="8" fill="#5e3c25" />
                    {/* Main stem */}
                    <rect x="108" y="112" width="4" height="128" fill="#4a5d23" />
                    {/* Left branch */}
                    <rect x="76" y="172" width="32" height="4" fill="#4a5d23" />
                    <rect x="76" y="160" width="4" height="12" fill="#4a5d23" />
                    {/* Right branch */}
                    <rect x="112" y="148" width="32" height="4" fill="#4a5d23" />
                    <rect x="140" y="136" width="4" height="12" fill="#4a5d23" />
                    {/* Left leaf */}
                    <rect x="64" y="144" width="16" height="16" fill="#3a4a1a" />
                    <rect x="68" y="148" width="8" height="8" fill="#4a5d23" />
                    {/* Right leaf */}
                    <rect x="140" y="120" width="16" height="16" fill="#5a7a2a" />
                    <rect x="144" y="124" width="8" height="8" fill="#6b7c3a" />
                    {/* Flower center */}
                    <rect x="100" y="96" width="20" height="16" fill="#c9a227" />
                    <rect x="104" y="100" width="12" height="8" fill="#e8bf45" />
                    {/* Flower petals */}
                    {/* Top petal */}
                    <rect x="106" y="84" width="8" height="12" fill="#e5ddc5" />
                    {/* Bottom petal */}
                    <rect x="106" y="112" width="8" height="12" fill="#e5ddc5" />
                    {/* Left petal */}
                    <rect x="88" y="100" width="12" height="8" fill="#e5ddc5" />
                    {/* Right petal */}
                    <rect x="120" y="100" width="12" height="8" fill="#e5ddc5" />
                    {/* Roots */}
                    <rect x="96" y="248" width="4" height="8" fill="#3a2510" />
                    <rect x="120" y="248" width="4" height="8" fill="#3a2510" />
                  </svg>
                </motion.div>

                {/* CTA button */}
                <div className="flex flex-col items-center gap-4 w-full">
                  {introStep < INTRO_MESSAGES.length - 1 ? (
                    <motion.button
                      id="start-game-btn"
                      onClick={handleIntroNext}
                      className="btn-organic text-xs px-8 py-3.5 cursor-pointer"
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                    >
                      Lanjut →
                    </motion.button>
                  ) : selectedModeStep === "mode_select" ? (
                    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
                      {/* Title */}
                      <div className="flex flex-col items-center gap-2">
                        <p
                          className="text-lg font-bold uppercase tracking-[0.3em] text-pixel-gold"
                          style={{
                            fontFamily: "var(--font-title)",
                            textShadow: "0 0 12px rgba(236,194,70,0.7), 2px 2px 0 #3a2010, -1px -1px 0 #3a2010",
                          }}
                        >
                          🌿 PILIH MODE PERMAINAN ⚔️
                        </p>
                        <div
                          className="w-48 h-0.5"
                          style={{ background: "linear-gradient(to right, transparent, #ecc246, transparent)" }}
                        />
                      </div>

                      {/* Mode Choice Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        {/* MODE 1: RIDDLE BOTANI NUSANTARA */}
                        <button
                          onClick={() => setSelectedModeStep("difficulty_select")}
                          className="group relative flex flex-col items-center gap-3 px-6 py-6 border-4 border-pixel-wood cursor-pointer active:translate-y-1.5 transition-all text-center"
                          style={{
                            fontFamily: "var(--font-title)",
                            backgroundColor: "#2f1503",
                            boxShadow: "0 6px 0 0 #1a1c14",
                            imageRendering: "pixelated",
                          }}
                        >
                          <PixelScroll size={44} className="group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#fde68a]">
                              MODE 1: RIDDLE BOTANI
                            </span>
                            <p className="text-xs text-[#f4eedd]/80 font-normal leading-relaxed">
                              Petualangan tebak flora Nusantara dari bait puitis Eyang Rimba &amp; melukis 15 sketsa spesimen.
                            </p>
                          </div>
                          <div className="mt-2 text-[10px] uppercase font-bold text-[#facc15] bg-[#5e3c25] px-3 py-1 border border-[#facc15]">
                            Mulai Riddles Rimba →
                          </div>
                        </button>

                        {/* MODE 2: KISI-KISI SILANG BOTANI */}
                        <button
                          onClick={() => {
                            setTtsSessionKey((k) => k + 1);
                            setShowTTSModal(true);
                          }}
                          className="group relative flex flex-col items-center gap-3 px-6 py-6 border-4 border-pixel-wood cursor-pointer active:translate-y-1.5 transition-all text-center"
                          style={{
                            fontFamily: "var(--font-title)",
                            backgroundColor: "#171302",
                            boxShadow: "0 6px 0 0 #1a1c14",
                            imageRendering: "pixelated",
                          }}
                        >
                          <PixelCrossword size={44} className="group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ecc246]">
                              MODE 2: KISI SILANG RIMBA
                            </span>
                            <p className="text-xs text-[#f4eedd]/80 font-normal leading-relaxed">
                              Tantangan Teka-Teki Silang bersilang ubin batu &amp; kayu antik dengan petunjuk rahasia Eyang Rimba.
                            </p>
                          </div>
                          <div className="mt-2 text-[10px] uppercase font-bold text-[#fef08a] bg-[#4a5d23] px-3 py-1 border border-[#ecc246]">
                            Buka Kisi Silang 🌿
                          </div>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
                      {/* Back button */}
                      <button
                        onClick={() => setSelectedModeStep("mode_select")}
                        className="self-start text-xs font-bold text-[#fde68a] hover:text-[#facc15] flex items-center gap-1 cursor-pointer underline mb-[-8px]"
                        style={{ fontFamily: "var(--font-title)" }}
                      >
                        ← Kembali ke Pilih Mode
                      </button>

                      {/* Title — lebih jelas & terang */}
                      <div className="flex flex-col items-center gap-2">
                        <p
                          className="text-lg font-bold uppercase tracking-[0.3em] text-pixel-gold"
                          style={{
                            fontFamily: "var(--font-title)",
                            textShadow: "0 0 12px rgba(236,194,70,0.7), 2px 2px 0 #3a2010, -1px -1px 0 #3a2010",
                          }}
                        >
                          ⚔️ PILIH TINGKAT KESULITAN ⚔️
                        </p>
                        <div
                          className="w-48 h-0.5"
                          style={{ background: "linear-gradient(to right, transparent, #ecc246, transparent)" }}
                        />
                      </div>

                      {/* Chunky RPG Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">

                        {/* MUDAH */}
                        <button
                          onClick={() => startGame("easy")}
                          className="group relative flex flex-col items-center gap-3 px-5 py-6 border-4 border-pixel-wood cursor-pointer active:translate-y-1.5"
                          style={{
                            fontFamily: "var(--font-title)",
                            backgroundColor: "#2d5a1b",
                            boxShadow: "0 6px 0 0 #1a1c14",
                            imageRendering: "pixelated",
                            transition: "transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease",
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = "0 3px 0 0 #1a1c14, 0 0 20px 4px rgba(100,220,60,0.45)";
                            e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                            e.currentTarget.style.filter = "brightness(1.2)";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = "0 6px 0 0 #1a1c14";
                            e.currentTarget.style.transform = "translateY(0) scale(1)";
                            e.currentTarget.style.filter = "brightness(1)";
                          }}
                          onMouseDown={e => {
                            e.currentTarget.style.boxShadow = "0 0px 0 0 #1a1c14";
                            e.currentTarget.style.transform = "translateY(6px) scale(0.98)";
                          }}
                          onMouseUp={e => {
                            e.currentTarget.style.boxShadow = "0 3px 0 0 #1a1c14, 0 0 20px 4px rgba(100,220,60,0.45)";
                            e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                          }}
                        >
                          <div className="w-12 h-12 transition-transform duration-150 group-hover:scale-110 flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 8 8" className="w-full h-full [image-rendering:pixelated]" xmlns="http://www.w3.org/2000/svg">
                              <rect x="4" y="0" width="2" height="1" fill="#1a1c14" />
                              <rect x="3" y="1" width="1" height="1" fill="#1a1c14" />
                              <rect x="6" y="1" width="1" height="1" fill="#1a1c14" />
                              <rect x="2" y="2" width="1" height="1" fill="#1a1c14" />
                              <rect x="6" y="2" width="1" height="1" fill="#1a1c14" />
                              <rect x="1" y="3" width="1" height="1" fill="#1a1c14" />
                              <rect x="5" y="3" width="1" height="1" fill="#1a1c14" />
                              <rect x="0" y="4" width="1" height="1" fill="#1a1c14" />
                              <rect x="4" y="4" width="1" height="1" fill="#1a1c14" />
                              <rect x="1" y="5" width="1" height="1" fill="#1a1c14" />
                              <rect x="3" y="5" width="1" height="1" fill="#1a1c14" />
                              <rect x="2" y="6" width="1" height="1" fill="#1a1c14" />
                              <rect x="1" y="7" width="2" height="1" fill="#5e3c25" />
                              <rect x="4" y="1" width="2" height="1" fill="#86efac" />
                              <rect x="3" y="2" width="2" height="1" fill="#86efac" />
                              <rect x="5" y="2" width="1" height="1" fill="#4ade80" />
                              <rect x="2" y="3" width="2" height="1" fill="#86efac" />
                              <rect x="4" y="3" width="1" height="1" fill="#4ade80" />
                              <rect x="1" y="4" width="2" height="1" fill="#86efac" />
                              <rect x="3" y="4" width="1" height="1" fill="#4ade80" />
                              <rect x="2" y="5" width="1" height="1" fill="#4ade80" />
                            </svg>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className="text-xl font-bold uppercase tracking-widest text-[#bed58e]"
                              style={{ textShadow: "2px 2px 0 #1a2e0a" }}
                            >
                              MUDAH
                            </span>
                            <span
                              className="text-sm text-[#89c060]/80 font-medium"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              Tanpa Timer
                            </span>
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-[#bed58e]/50 border border-[#bed58e]/20 px-2 py-0.5" style={{ fontFamily: "var(--font-body)" }}>
                            Santai &amp; Explore
                          </div>
                        </button>

                        {/* NORMAL */}
                        <button
                          onClick={() => startGame("normal")}
                          className="group relative flex flex-col items-center gap-3 px-5 py-6 border-4 border-pixel-wood cursor-pointer active:translate-y-1.5"
                          style={{
                            fontFamily: "var(--font-title)",
                            backgroundColor: "#7a5c10",
                            boxShadow: "0 6px 0 0 #1a1c14",
                            imageRendering: "pixelated",
                            transition: "transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease",
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = "0 3px 0 0 #1a1c14, 0 0 20px 4px rgba(250,190,50,0.5)";
                            e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                            e.currentTarget.style.filter = "brightness(1.2)";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = "0 6px 0 0 #1a1c14";
                            e.currentTarget.style.transform = "translateY(0) scale(1)";
                            e.currentTarget.style.filter = "brightness(1)";
                          }}
                          onMouseDown={e => {
                            e.currentTarget.style.boxShadow = "0 0px 0 0 #1a1c14";
                            e.currentTarget.style.transform = "translateY(6px) scale(0.98)";
                          }}
                          onMouseUp={e => {
                            e.currentTarget.style.boxShadow = "0 3px 0 0 #1a1c14, 0 0 20px 4px rgba(250,190,50,0.5)";
                            e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                          }}
                        >
                          <div className="w-12 h-12 transition-transform duration-150 group-hover:scale-110 flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 8 8" className="w-full h-full [image-rendering:pixelated]" xmlns="http://www.w3.org/2000/svg">
                              <rect x="3" y="0" width="2" height="1" fill="#1a1c14" />
                              <rect x="2" y="1" width="1" height="1" fill="#1a1c14" />
                              <rect x="5" y="1" width="1" height="1" fill="#1a1c14" />
                              <rect x="1" y="2" width="1" height="1" fill="#1a1c14" />
                              <rect x="6" y="2" width="1" height="1" fill="#1a1c14" />
                              <rect x="0" y="3" width="1" height="1" fill="#1a1c14" />
                              <rect x="7" y="3" width="1" height="1" fill="#1a1c14" />
                              <rect x="0" y="4" width="1" height="3" fill="#1a1c14" />
                              <rect x="7" y="4" width="1" height="3" fill="#1a1c14" />
                              <rect x="1" y="7" width="6" height="1" fill="#1a1c14" />
                              <rect x="3" y="1" width="2" height="1" fill="#ef4444" />
                              <rect x="2" y="2" width="4" height="1" fill="#ef4444" />
                              <rect x="1" y="3" width="6" height="4" fill="#ef4444" />
                              <rect x="3" y="2" width="2" height="1" fill="#f97316" />
                              <rect x="2" y="3" width="4" height="1" fill="#f97316" />
                              <rect x="2" y="4" width="4" height="2" fill="#f97316" />
                              <rect x="3" y="6" width="2" height="1" fill="#f97316" />
                              <rect x="3" y="3" width="2" height="3" fill="#f59e0b" />
                            </svg>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className="text-xl font-bold uppercase tracking-widest text-[#fde68a]"
                              style={{ textShadow: "2px 2px 0 #3a2a00" }}
                            >
                              NORMAL
                            </span>
                            <span
                              className="text-sm text-[#fbbf24]/80 font-medium"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              Timer 60 Detik
                            </span>
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-[#fde68a]/50 border border-[#fde68a]/20 px-2 py-0.5" style={{ fontFamily: "var(--font-body)" }}>
                            Tantangan Seimbang
                          </div>
                        </button>

                        {/* SULIT */}
                        <button
                          onClick={() => startGame("hard")}
                          className="group relative flex flex-col items-center gap-3 px-5 py-6 border-4 border-pixel-wood cursor-pointer active:translate-y-1.5"
                          style={{
                            fontFamily: "var(--font-title)",
                            backgroundColor: "#7f1d1d",
                            boxShadow: "0 6px 0 0 #1a1c14",
                            imageRendering: "pixelated",
                            transition: "transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease",
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = "0 3px 0 0 #1a1c14, 0 0 20px 4px rgba(240,60,60,0.5)";
                            e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                            e.currentTarget.style.filter = "brightness(1.2)";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = "0 6px 0 0 #1a1c14";
                            e.currentTarget.style.transform = "translateY(0) scale(1)";
                            e.currentTarget.style.filter = "brightness(1)";
                          }}
                          onMouseDown={e => {
                            e.currentTarget.style.boxShadow = "0 0px 0 0 #1a1c14";
                            e.currentTarget.style.transform = "translateY(6px) scale(0.98)";
                          }}
                          onMouseUp={e => {
                            e.currentTarget.style.boxShadow = "0 3px 0 0 #1a1c14, 0 0 20px 4px rgba(240,60,60,0.5)";
                            e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                          }}
                        >
                          <div className="w-12 h-12 transition-transform duration-150 group-hover:scale-110 flex items-center justify-center flex-shrink-0">
                            <svg viewBox="0 0 8 8" className="w-full h-full [image-rendering:pixelated]" xmlns="http://www.w3.org/2000/svg">
                              <rect x="2" y="0" width="4" height="1" fill="#1a1c14" />
                              <rect x="1" y="1" width="1" height="5" fill="#1a1c14" />
                              <rect x="6" y="1" width="1" height="5" fill="#1a1c14" />
                              <rect x="0" y="2" width="1" height="4" fill="#1a1c14" />
                              <rect x="7" y="2" width="1" height="4" fill="#1a1c14" />
                              <rect x="1" y="6" width="1" height="1" fill="#1a1c14" />
                              <rect x="6" y="6" width="1" height="1" fill="#1a1c14" />
                              <rect x="2" y="7" width="4" height="1" fill="#1a1c14" />
                              <rect x="2" y="1" width="4" height="1" fill="#ffffff" />
                              <rect x="1" y="2" width="6" height="4" fill="#ffffff" />
                              <rect x="2" y="6" width="4" height="1" fill="#ffffff" />
                              <rect x="2" y="3" width="1" height="1" fill="#1a1c14" />
                              <rect x="5" y="3" width="1" height="1" fill="#1a1c14" />
                              <rect x="3" y="4" width="2" height="1" fill="#1a1c14" />
                              <rect x="3" y="6" width="1" height="1" fill="#d1d5db" />
                              <rect x="4" y="6" width="1" height="1" fill="#d1d5db" />
                            </svg>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className="text-xl font-bold uppercase tracking-widest text-[#ffdad6]"
                              style={{ textShadow: "2px 2px 0 #4a0000" }}
                            >
                              SULIT
                            </span>
                            <span
                              className="text-sm text-[#f87171]/80 font-medium"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              30 Detik &amp; Gugur
                            </span>
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-[#ffdad6]/50 border border-[#ffdad6]/20 px-2 py-0.5" style={{ fontFamily: "var(--font-body)" }}>
                            Hanya Untuk Jagoan
                          </div>
                        </button>

                      </div>
                    </div>
                  )}

                  {/* Step dots - boxy */}
                  <div className="flex gap-2.5">
                    {INTRO_MESSAGES.map((_, i) => (
                      <div
                        key={i}
                        className="w-3.5 h-3.5 border-2 border-pixel-wood transition-all duration-100"
                        style={{ 
                          backgroundColor: i <= introStep ? "var(--pixel-gold)" : "rgba(26,28,20,0.15)", 
                          transform: i === introStep ? "scale(1.1)" : "scale(1)" 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Playing phase */}
            {gamePhase === "playing" && (
              <motion.div
                key="playing"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Riddle card — takes 2/3 width on desktop */}
                <div className="md:col-span-2">
                  <RiddleCard
                    riddleData={riddleData}
                    isLoading={isLoadingRiddle}
                    onAnswerResult={handleAnswerResult}
                    onCorrectAnswer={handleCorrectAnswer}
                    onEyangMessage={handleEyangMessage}
                    onResetStreak={resetStreak}
                    onNextRiddle={handleNextRiddle}
                    onGameOver={handleGameOver}
                    isCorrect={checkResult?.correct ?? false}
                    gameMode={gameMode}
                    extraLivesSession={extraLivesSession}
                    extraCluesForNextQuestion={sessionQuestionIndex === cluesQuestionIndex ? 2 : 0}
                    isTimeStoppedForNextQuestion={sessionQuestionIndex === timeStopQuestionIndex}
                    attemptsProp={sessionAttempts}
                    onUpdateAttempts={setSessionAttempts}
                    questionIndex={sessionQuestionIndex}
                  />
                </div>

                {/* Scoreboard — 1/3 width */}
                <div className="md:col-span-1">
                  <ScoreBoard
                    score={score}
                    streak={streak}
                    totalCorrect={totalCorrect}
                    totalAttempted={totalAttempted}
                  />
                </div>
              </motion.div>
            )}

            {/* Correct answer / Reward phase */}
            {gamePhase === "correct" && checkResult && (
              <motion.div
                key="correct"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="md:col-span-2">
                  <BotanicalCanvas
                    plantName={checkResult.plantName}
                    botanicalFacts={checkResult.botanicalFacts}
                    habitat={checkResult.habitat}
                    localNames={checkResult.localNames}
                    onNextRiddle={handleNextRiddle}
                    score={score}
                    streak={streak}
                    isGalleryView={false}
                    questionIndex={sessionQuestionIndex}
                    discoveryMode={gameMode === "easy" ? "mudah" : gameMode === "hard" ? "sulit" : "sedang"}
                    performanceMode={performanceMode}
                  />
                </div>
                <div className="md:col-span-1">
                  <ScoreBoard
                    score={score}
                    streak={streak}
                    totalCorrect={totalCorrect}
                    totalAttempted={totalAttempted}
                  />
                </div>
              </motion.div>
            )}

            {/* Summary / Game End phase */}
            {gamePhase === "summary" && (
              <motion.div
                key="summary"
                className="relative overflow-hidden w-full max-w-2xl mx-auto card-parchment p-8 flex flex-col gap-6"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -30 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ imageRendering: "pixelated" }}
              >
              {/* ─── Celebration Burst — hanya saat Tamat 15 soal ─── */}
              {!isSessionFailed && sessionQuestionIndex >= 15 && totalCorrect >= 10 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-none">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const colors = ["#ecc246", "#89c060", "#f87171", "#60a5fa", "#f4eedd", "#c084fc"];
                    const color = colors[i % colors.length];
                    const left = `${4 + (i * 3.4) % 92}%`;
                    const delay = (i * 0.09) % 1.2;
                    const size = 6 + (i % 4) * 3;
                    return (
                      <motion.div
                        key={i}
                        className="absolute top-0"
                        style={{ left, width: size, height: size, backgroundColor: color }}
                        initial={{ y: -20, opacity: 1, rotate: 0 }}
                        animate={{
                          y: [0, 180 + (i % 5) * 40],
                          opacity: [1, 1, 0],
                          rotate: [0, 180 + i * 25],
                        }}
                        transition={{ duration: 1.6, delay, ease: "easeIn", repeat: 2, repeatDelay: 0.5 }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Header */}
                <div className="text-center border-b-4 border-pixel-wood pb-4">
                  {isSessionFailed ? (
                    <Skull className="w-12 h-12 text-red-600 mx-auto mb-2" />
                  ) : (
                    <Trophy className="w-12 h-12 text-pixel-gold mx-auto mb-2" />
                  )}
                  <h2 className="text-lg sm:text-xl font-bold text-pixel-dark uppercase tracking-wider" style={{ fontFamily: "var(--font-title)" }}>
                    Akhir Penjelajahan
                  </h2>
                  <p className="text-[8px] uppercase tracking-widest text-pixel-wood font-bold mt-2" style={{ fontFamily: "var(--font-title)" }}>
                    Laporan Hasil Penyelidikan
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ fontFamily: "var(--font-body)" }}>
                  <div className="p-4 border-2 border-pixel-wood bg-pixel-dark/5 text-center flex flex-col items-center justify-center space-y-1">
                    <Trophy className="w-5 h-5 text-pixel-gold" />
                    <p className="text-[8px] uppercase tracking-wider text-pixel-wood font-bold" style={{ fontFamily: "var(--font-title)" }}>Skor</p>
                    <motion.p
                      className="text-xl font-bold text-pixel-wood"
                      style={{ fontFamily: "var(--font-title)" }}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {score}
                    </motion.p>
                    {gameMode !== "easy" && (
                      <span className="text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 border border-pixel-wood/40" style={{ fontFamily: "var(--font-title)", color: gameMode === "normal" ? "#b45309" : "#b91c1c" }}>
                        {gameMode === "normal" ? "2× Skor" : "3× Skor"}
                      </span>
                    )}
                  </div>
                  <div className="p-4 border-2 border-pixel-wood bg-pixel-dark/5 text-center flex flex-col items-center justify-center space-y-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <p className="text-[8px] uppercase tracking-wider text-pixel-wood font-bold" style={{ fontFamily: "var(--font-title)" }}>Benar</p>
                    <p className="text-lg font-bold text-pixel-dark" style={{ fontFamily: "var(--font-title)" }}>
                      {totalCorrect} <span className="text-xs text-pixel-wood/60">/ {totalAttempted}</span>
                    </p>
                  </div>
                  <div className="p-4 border-2 border-pixel-wood bg-pixel-dark/5 text-center flex flex-col items-center justify-center space-y-1">
                    <Target className="w-5 h-5 text-rose-500" />
                    <p className="text-[8px] uppercase tracking-wider text-pixel-wood font-bold" style={{ fontFamily: "var(--font-title)" }}>Akurasi</p>
                    <p className="text-lg font-bold text-emerald-800" style={{ fontFamily: "var(--font-title)" }}>
                      {totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0}%
                    </p>
                  </div>
                </div>

                {/* Session Status Badge */}
                <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                  {isSessionFailed ? (
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold px-4 py-1.5 border-2 border-red-500 text-red-700 bg-red-50 uppercase tracking-wider" style={{ fontFamily: "var(--font-title)" }}>
                      🥀 Game Over
                    </span>
                  ) : sessionQuestionIndex >= 15 && totalAttempted >= 15 ? (
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold px-4 py-1.5 border-2 border-emerald-500 text-emerald-700 bg-emerald-50 uppercase tracking-wider" style={{ fontFamily: "var(--font-title)" }}>
                      ✨ Tamat (15 Soal)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold px-4 py-1.5 border-2 border-pixel-wood text-pixel-wood bg-pixel-parchment uppercase tracking-wider" style={{ fontFamily: "var(--font-title)" }}>
                      🚪 Keluar (Soal {sessionQuestionIndex}/15)
                    </span>
                  )}

                  <span className={`inline-flex items-center gap-1.5 text-[9px] font-bold px-4 py-1.5 border-2 uppercase tracking-wider
                    ${gameMode === "easy" ? "border-pixel-wood text-pixel-leaf bg-emerald-50" : 
                      gameMode === "normal" ? "border-pixel-wood text-amber-700 bg-amber-50" : 
                      "border-red-700 text-red-700 bg-red-50"}`}
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    Mode: {gameMode === "easy" ? "Mudah" : gameMode === "normal" ? "Normal" : "Sulit"}
                  </span>
                </div>

                {/* Discovered plants in this session */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-pixel-wood border-b-2 border-pixel-wood/25 pb-1" style={{ fontFamily: "var(--font-title)" }}>
                    Flora Teridentifikasi:
                  </h3>
                  {sessionDiscoveredPlants.length === 0 ? (
                    <p className="text-xs text-center text-pixel-wood/60 italic py-2" style={{ fontFamily: "var(--font-body)" }}>
                      Belum ada spesimen yang berhasil diidentifikasi pada sesi ini.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {sessionDiscoveredPlants.map((plant) => (
                        <span
                          key={plant}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-pixel-wood bg-white text-xs text-pixel-dark font-bold"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          <Sprout className="w-3.5 h-3.5 text-pixel-leaf" /> {plant}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Restart Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <motion.button
                    onClick={() => {
                      startGame(gameMode);
                    }}
                    className="btn-organic flex-1 py-3 flex items-center justify-center gap-2 text-xs cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                    <span>Main Lagi!</span>
                  </motion.button>
                  <motion.button
                    onClick={() => setShowLeaderboardModal(true)}
                    className="py-3 px-4 border-4 border-pixel-wood bg-[#2f1503] hover:bg-[#5e3c25] text-[#facc15] font-bold text-[9px] uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    <PixelCrown size={18} className="text-[#facc15]" />
                    <span>Peringkat</span>
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setGamePhase("intro");
                      setEyangMessage(INTRO_MESSAGES[0]);
                      setEyangMood("excited");
                      setIntroStep(0);
                    }}
                    className="flex-1 py-3 border-4 border-pixel-wood bg-white hover:bg-pixel-parchment text-pixel-dark font-bold text-[9px] uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    <Home className="w-4 h-4 text-pixel-dark" />
                    <span>Kembali</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="text-center py-4 px-4 w-full mt-auto">
          <p className="text-[10px]" style={{ color: "rgba(212,203,171,0.4)", fontFamily: "var(--font-title)" }}>
            ■ DETEKTIF KEBUN retro 8-bit ■
          </p>

        </footer>
      </div>

      {/* ── Gallery Review Modal Overlay ─────────────────────────── */}
      <AnimatePresence>
        {selectedGalleryPlant && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Backdrop click to close */}
            <div
              className="absolute inset-0 cursor-default"
              onClick={() => setSelectedGalleryPlant(null)}
            />

            {/* Modal Container */}
            <motion.div
              className="relative w-full max-w-xl card-parchment p-6 max-h-[90vh] overflow-y-auto z-10 flex flex-col gap-6"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
            >
              {/* Botanical Sketch Canvas & Facts */}
              <div className="flex-1 overflow-y-auto">
                <BotanicalCanvas
                  plantName={selectedGalleryPlant.plantName}
                  botanicalFacts={selectedGalleryPlant.botanicalFacts}
                  habitat={selectedGalleryPlant.habitat}
                  localNames={selectedGalleryPlant.localNames}
                  isGalleryView={true}
                  discoveryMode={selectedGalleryPlant.difficulty}
                  performanceMode={performanceMode}
                />
              </div>

              {/* Footer action - back to collection */}
              <div className="flex justify-end pt-2 border-t-4 border-pixel-wood">
                <button
                  onClick={() => {
                    setSelectedGalleryPlant(null);
                    setShowCollectionPanel(true);
                  }}
                  className="btn-organic text-xs py-2 px-6 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Kembali ke Koleksi</span>
                  <Flower2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔮 Special Card Selection Overlay (5-Streak Hard Mode Reward) 🔮 */}
      <AnimatePresence>
        {showSpecialCardModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 backdrop-blur-md bg-black/75 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="max-w-4xl w-full flex flex-col items-center text-center space-y-8 my-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-pixel-gold bg-pixel-moss border-2 border-pixel-wood px-4 py-1.5 uppercase tracking-widest" style={{ fontFamily: "var(--font-title)" }}>
                  🌟 STREAK 5x MODE SULIT 🌟
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white uppercase mt-4 tracking-wider" style={{ fontFamily: "var(--font-title)", textShadow: "2px 2px 0px #000" }}>
                  Pusaka Karunia Eyang
                </h2>
                <p className="text-xs text-pixel-parchment/80 font-medium max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  Kamu telah menunjukkan kegigihan luar biasa di rimba. Pilih salah satu kartu pusaka di bawah ini untuk membantumu menyelidiki spesimen selanjutnya:
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center px-4">
                {shuffledCards.map((cardType, idx) => {
                  const animDelay = idx * 0.25;
                  
                  if (cardType === "life") {
                    return (
                      <motion.button
                        key="life"
                        onClick={() => handleSelectSpecialCard("life")}
                        className="cursor-pointer transition-all relative group bg-transparent border-none outline-none flex flex-col items-center max-w-[240px] md:max-w-[260px]"
                        style={{ 
                          imageRendering: "pixelated"
                        }}
                        initial={{ opacity: 0, y: 150 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: animDelay, type: "spring", stiffness: 90, damping: 7 }
                        }}
                        whileHover={{ y: -12, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image 
                          src={EyangNyawaImg} 
                          alt="Kartu Nyawa - Bantuan Eyang" 
                          className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(239,68,68,0.9)] transition-all duration-300"
                        />
                      </motion.button>
                    );
                  }

                  if (cardType === "clues") {
                    return (
                      <motion.button
                        key="clues"
                        onClick={() => handleSelectSpecialCard("clues")}
                        className="cursor-pointer transition-all relative group bg-transparent border-none outline-none flex flex-col items-center max-w-[240px] md:max-w-[260px]"
                        style={{ 
                          imageRendering: "pixelated"
                        }}
                        initial={{ opacity: 0, y: 150 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: animDelay, type: "spring", stiffness: 90, damping: 7 }
                        }}
                        whileHover={{ y: -12, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image 
                          src={EyangClueImg} 
                          alt="Kartu Petunjuk - Buku Panduan Rimba" 
                          className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(34,197,94,0.9)] transition-all duration-300"
                        />
                      </motion.button>
                    );
                  }

                  if (cardType === "time") {
                    return (
                      <motion.button
                        key="time"
                        onClick={() => handleSelectSpecialCard("time")}
                        className="cursor-pointer transition-all relative group bg-transparent border-none outline-none flex flex-col items-center max-w-[240px] md:max-w-[260px]"
                        style={{ 
                          imageRendering: "pixelated"
                        }}
                        initial={{ opacity: 0, y: 150 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: animDelay, type: "spring", stiffness: 90, damping: 7 }
                        }}
                        whileHover={{ y: -12, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image 
                          src={EyangTimeStopImg} 
                          alt="Kartu Waktu - Kekuatan Alam" 
                          className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.9)] transition-all duration-300"
                        />
                      </motion.button>
                    );
                  }
                  return null;
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Flora Collection Modal (RPG Wood Frame Design) ─── */}
      <FloraCollectionModal
        open={showCollectionPanel}
        onClose={() => setShowCollectionPanel(false)}
        discoveredGallery={discoveredGallery}
        onSelectPlant={(plant) => {
          setSelectedGalleryPlant(plant);
          setShowCollectionPanel(false);
        }}
        onResetGallery={handleResetGallery}
      />

      {/* Toast Notification for Life Gain */}
      <AnimatePresence>
        {lifeNotification && (
          <motion.div
            className="fixed top-6 right-6 z-[200] px-5 py-4 border-2 border-pixel-wood bg-[#12130e]/95 backdrop-blur-md text-pixel-gold font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-[4px_4px_0_rgba(0,0,0,0.5),0_10px_25px_rgba(0,0,0,0.5)] rounded-sm"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ fontFamily: "var(--font-title)", imageRendering: "pixelated" }}
          >
            <span className="text-red-500 animate-bounce">❤️</span>
            <span>{lifeNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Profile Modal (RPG Wood Frame Design) ─── */}
      <AnimatePresence>
        {showProfileModal && userProfile && (
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs z-[140] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card-wood-rpg w-full max-w-md flex flex-col relative border-4 border-pixel-wood"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ imageRendering: "pixelated" }}
            >
              {/* Header */}
              <div className="px-5 py-3.5 border-b-4 border-pixel-wood bg-pixel-moss flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <User className="w-4 h-4 text-pixel-gold" />
                  <span className="text-section-label" style={{ fontFamily: "var(--font-title)" }}>
                    Profil Detektif
                  </span>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-pixel-parchment hover:text-pixel-gold transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6 px-10 py-6 overflow-x-hidden overflow-y-auto max-h-[75vh] relative z-10 box-border w-full">
                {/* Avatar Display */}
                <div className="flex flex-col items-center gap-3 mt-2">
                  <div className="relative w-20 h-20 border-4 border-pixel-gold bg-[#12130e] flex items-center justify-center overflow-hidden p-1 shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ imageRendering: "pixelated" }}>
                    {selectedAvatar === "custom_upload" && customUploadedImage ? (
                      <Image src={customUploadedImage} alt="Custom Profile" width={80} height={80} className="w-full h-full object-cover" unoptimized />
                    ) : selectedAvatar === "google_pic" && (userProfile.googlePicture || userProfile.picture) ? (
                      <Image src={userProfile.googlePicture || userProfile.picture} alt="Google Profile" width={80} height={80} className="w-full h-full object-cover" unoptimized />
                    ) : (
                      <PixelAvatar char={selectedAvatar} size={48} />
                    )}
                  </div>
                  <div className="bg-pixel-dark border-2 border-pixel-wood px-4 py-1.5 shadow-md">
                    <span className="text-[11px] font-bold text-pixel-gold uppercase tracking-wider" style={{ fontFamily: "var(--font-title)" }}>
                      🏆 {userProfile.title}
                    </span>
                  </div>
                </div>

                {/* Edit Name Input */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-pixel-dark/80 block pl-6" style={{ fontFamily: "var(--font-title)" }}>
                    Nama Detektif
                  </label>
                  <div className="relative w-full box-border">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      placeholder="Masukkan nama..."
                      className="input-parchment pr-10 w-full box-border"
                      maxLength={18}
                      autoComplete="off"
                    />
                    <Edit3 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5e3c25]" />
                  </div>
                </div>

                {/* Avatar Selector */}
                <div className="flex flex-col gap-2.5 w-full">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-pixel-dark/80 block pl-6" style={{ fontFamily: "var(--font-title)" }}>
                    Pilih Avatar / Unggah Foto
                  </label>
                  <div className="flex flex-wrap gap-3 pl-4">
                    {/* Upload Custom Image Option */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-14 h-14 border-4 cursor-pointer overflow-hidden flex flex-col items-center justify-center p-1 transition-all duration-150 ease-out hover:scale-105 ${
                        selectedAvatar === "custom_upload" && customUploadedImage
                          ? "border-pixel-gold bg-pixel-moss shadow-[0_0_15px_rgba(201,162,39,0.8)] ring-2 ring-pixel-gold/40"
                          : "border-pixel-wood bg-[#12130e] hover:border-pixel-gold/70"
                      }`}
                      style={{ imageRendering: "pixelated" }}
                      title="Unggah Foto dari HP / Laptop (Bisa Potong)"
                    >
                      {customUploadedImage ? (
                        <Image src={customUploadedImage} alt="Custom" width={56} height={56} className="w-full h-full object-cover" unoptimized />
                      ) : (
                        <div className="flex flex-col items-center text-[#fde68a]">
                          <Camera className="w-5 h-5 text-pixel-gold" />
                          <span className="text-[7px] font-bold mt-0.5" style={{ fontFamily: "var(--font-title)" }}>UNGGAH</span>
                        </div>
                      )}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />

                    {/* Google Pic option if logged in via google */}
                    {(userProfile.googlePicture || userProfile.picture) && (
                      <button
                        type="button"
                        onClick={() => setSelectedAvatar("google_pic")}
                        className={`w-14 h-14 border-4 cursor-pointer overflow-hidden flex items-center justify-center p-0.5 transition-all duration-150 ease-out hover:scale-105 ${
                          selectedAvatar === "google_pic"
                            ? "border-pixel-gold bg-pixel-moss shadow-[0_0_15px_rgba(201,162,39,0.8)] ring-2 ring-pixel-gold/40"
                            : "border-pixel-wood bg-[#12130e] hover:border-pixel-gold/70"
                        }`}
                        style={{ imageRendering: "pixelated" }}
                        title="Foto Akun Google"
                      >
                        <Image src={userProfile.googlePicture || userProfile.picture} alt="Google" width={56} height={56} className="w-full h-full object-cover" unoptimized />
                      </button>
                    )}
                    {PIXEL_AVATARS.map((av) => {
                      const isSelected = selectedAvatar === av.char || selectedAvatar === av.id;
                      return (
                        <button
                          key={av.id || av.char}
                          type="button"
                          onClick={() => setSelectedAvatar(av.char)}
                          className={`w-14 h-14 border-4 cursor-pointer flex items-center justify-center p-2 transition-all duration-150 ease-out hover:scale-105 ${
                            isSelected
                              ? "border-pixel-gold bg-pixel-moss shadow-[0_0_15px_rgba(201,162,39,0.8)] ring-2 ring-pixel-gold/40"
                              : "border-pixel-wood bg-[#12130e] hover:border-pixel-gold/70 hover:bg-[#1c1e14]"
                          }`}
                          style={{ imageRendering: "pixelated" }}
                          title={av.label}
                        >
                          <PixelAvatar id={av.id} char={av.char} size={32} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Statistics Box */}
                <div className="p-4 border-4 border-pixel-wood bg-pixel-moss/10 rounded-sm flex flex-col gap-3 shadow-inner box-border w-full">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-pixel-dark border-b-2 border-pixel-wood/30 pb-2 pl-5" style={{ fontFamily: "var(--font-title)" }}>
                    Statistik Detektif
                  </h4>
                  <div className="flex flex-col gap-4 mt-1 w-full px-5">
                    {/* Visual Progress Bar */}
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="flex justify-between items-end">
                        <span className="text-[9px] opacity-80 font-bold uppercase text-pixel-dark">Spesimen Ditemukan</span>
                        <span className="text-[10px] font-extrabold text-pixel-gold drop-shadow-sm" style={{ fontFamily: "var(--font-title)" }}>
                          {discoveredGallery.length} / 15
                        </span>
                      </div>
                      <div className="w-full progress-bar-wood h-3.5">
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${Math.min(100, (discoveredGallery.length / 15) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-5 py-4 border-t-4 border-pixel-wood bg-pixel-moss/5 flex items-center gap-3">
                <motion.button
                  onClick={handleSaveProfile}
                  className="btn-organic flex-1 py-3 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.95, y: 2 }}
                >
                  <Check className="w-4 h-4 text-white" />
                  <span>Simpan Perubahan</span>
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  className="btn-organic py-3 px-4 text-xs flex items-center justify-center gap-2 cursor-pointer bg-[#7a2020] border-[#4a1010] text-[#ffcccc] shadow-lg hover:bg-[#5a1010]"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.95, y: 2 }}
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 text-white" />
                  <span>Keluar</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Double Confirmation Modal for Menyerah ───────────────────── */}
      <AnimatePresence>
        {showSurrenderConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="card-showcase-gold p-4 max-w-sm w-full relative text-center shadow-2xl"
              style={{ imageRendering: "pixelated" }}
            >
              <div className="card-parchment w-full p-5 text-pixel-dark flex flex-col items-center gap-3 relative">
                <div className="w-12 h-12 bg-red-900 border-2 border-pixel-wood flex items-center justify-center shadow-inner">
                  <PixelLogOut size={26} />
                </div>

                <h3 className="text-xs font-bold text-red-900 uppercase tracking-widest" style={{ fontFamily: "var(--font-title)" }}>
                  Konfirmasi Menyerah
                </h3>

                <p className="text-xs font-semibold text-pixel-dark leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  Apakah kamu yakin ingin menyerah dari investigasi ini, Detektif? Progres sesi teka-teki saat ini akan dihentikan.
                </p>

                <div className="flex items-center justify-center gap-3 w-full mt-2">
                  <motion.button
                    onClick={() => setShowSurrenderConfirm(false)}
                    className="flex-1 py-2.5 px-3 border-2 border-pixel-wood bg-pixel-moss text-pixel-parchment hover:bg-pixel-leaf text-[9px] font-bold uppercase cursor-pointer shadow-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    Batal
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      setShowSurrenderConfirm(false);
                      finishGame();
                    }}
                    className="flex-1 py-2.5 px-3 border-2 border-pixel-wood bg-red-800 text-white hover:bg-red-900 text-[9px] font-bold uppercase cursor-pointer shadow-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    Ya, Menyerah
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Google Client ID Configuration Modal ───────────────────── */}
      <AnimatePresence>
        {showGoogleConfigModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="card-wood-rpg max-w-md w-full relative text-center shadow-2xl border-4 border-pixel-wood"
              style={{ imageRendering: "pixelated" }}
            >
              <div className="px-5 py-3.5 border-b-4 border-pixel-wood bg-pixel-moss flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <LogIn className="w-4 h-4 text-pixel-gold" />
                  <span className="text-section-label" style={{ fontFamily: "var(--font-title)" }}>
                    Login Google OAuth
                  </span>
                </div>
                <button
                  onClick={() => setShowGoogleConfigModal(false)}
                  className="text-pixel-parchment hover:text-pixel-gold transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 text-pixel-dark flex flex-col gap-4 text-left">
                <p className="text-xs leading-relaxed font-semibold">
                  Google Client ID belum terkonfigurasi. Masukkan Google OAuth Client ID Anda (atau gunakan Mode Demo):
                </p>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-pixel-dark/80" style={{ fontFamily: "var(--font-title)" }}>
                    Google Client ID
                  </label>
                  <input
                    type="text"
                    value={customClientIdInput}
                    onChange={(e) => setCustomClientIdInput(e.target.value)}
                    placeholder="xxxx-xxxx.apps.googleusercontent.com"
                    className="input-parchment text-xs w-full p-2.5 border-2 border-pixel-wood"
                  />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <motion.button
                    onClick={() => {
                      if (!customClientIdInput.trim()) {
                        showLifeNotification("Harap masukkan Client ID yang valid!");
                        return;
                      }
                      localStorage.setItem("detektif_kebun_google_client_id", customClientIdInput.trim());
                      setShowGoogleConfigModal(false);
                      handleGoogleLogin();
                    }}
                    className="btn-organic py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Simpan & Masuk dengan Google</span>
                  </motion.button>

                  <div className="flex items-center gap-2 my-1">
                    <div className="flex-1 h-px bg-pixel-wood/30"></div>
                    <span className="text-[9px] uppercase font-bold text-pixel-dark/60">atau</span>
                    <div className="flex-1 h-px bg-pixel-wood/30"></div>
                  </div>

                  <motion.button
                    onClick={() => {
                      setShowGoogleConfigModal(false);
                      handleDemoLogin();
                    }}
                    className="py-2.5 px-3 border-2 border-pixel-wood bg-pixel-moss text-pixel-parchment hover:bg-pixel-leaf text-xs font-bold uppercase cursor-pointer shadow-md text-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    Masuk Mode Demo (Tanpa Google)
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Leaderboard Modal ────────────────────────────────────────── */}
      <LeaderboardModal
        open={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        entries={leaderboardEntries}
        currentUserId={userProfile?.id}
        currentUserEmail={userProfile?.email}
        isLoggedIn={!!userProfile}
        onLoginTrigger={handleGoogleLogin}
        onRefresh={fetchGlobalLeaderboard}
      />

      {/* ── TTS Flora Modal ───────────────────────────────────────────── */}
      <TTSFloraModal
        key={ttsSessionKey}
        open={showTTSModal}
        onClose={() => setShowTTSModal(false)}
        onScoreEarned={handleTTSScoreEarned}
      />

      {/* ── Custom Image Crop Modal ────────────────────────────────────── */}
      <ImageCropModal
        open={showCropModal}
        imageSrc={rawUploadedImage}
        onClose={() => setShowCropModal(false)}
        onCropSave={handleCropSave}
      />
    </div>
  );
}

