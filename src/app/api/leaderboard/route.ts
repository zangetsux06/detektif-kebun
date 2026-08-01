import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface LeaderboardEntry {
  id: string;
  name: string;
  email?: string;
  avatarType: "google" | "custom" | "custom_image";
  customAvatar?: string;
  picture?: string;
  title: string;
  score: number;
  totalCorrect: number;
  totalAttempted: number;
  durationSeconds: number;
  floraCount: number;
  maxStreak: number;
  ttsScore?: number;
  ttsCompleted?: number;
  updatedAt: string;
}

export const dynamic = "force-dynamic";

// Persistent file storage path for serverless/local environments
const DATA_DIR = process.env.NODE_ENV === "production" ? "/tmp" : path.join(process.cwd(), ".data");
const FILE_PATH = path.join(DATA_DIR, "global_leaderboard.json");

const DUMMY_IDS = new Set(["eyang_rimba", "kapitan_botanis", "pakar_rimba"]);
const DUMMY_NAMES = new Set(["Eyang Rimba Agung", "Kapitan Botanis", "Rani Sumatra"]);

function sanitizeEntries(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  if (!Array.isArray(entries)) return [];
  return entries.filter(
    (e) => e && e.id && !DUMMY_IDS.has(e.id) && !DUMMY_NAMES.has(e.name)
  );
}

// In-memory fallback store
let globalMemoryStore: LeaderboardEntry[] = [];

function ensureDataDirExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    console.warn("⚠️ Failed to create data directory:", e);
  }
}

function readLeaderboardStore(): LeaderboardEntry[] {
  try {
    ensureDataDirExists();
    if (fs.existsSync(FILE_PATH)) {
      const fileData = fs.readFileSync(FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        const cleaned = sanitizeEntries(parsed);
        globalMemoryStore = cleaned;
        return cleaned;
      }
    }
  } catch (e) {
    console.warn("⚠️ Failed to read global_leaderboard.json, using in-memory store:", e);
  }
  globalMemoryStore = sanitizeEntries(globalMemoryStore);
  return globalMemoryStore;
}

function saveLeaderboardStore(entries: LeaderboardEntry[]) {
  const cleaned = sanitizeEntries(entries);
  globalMemoryStore = cleaned;
  try {
    ensureDataDirExists();
    fs.writeFileSync(FILE_PATH, JSON.stringify(cleaned, null, 2), "utf-8");
  } catch (e) {
    console.warn("⚠️ Failed to save global_leaderboard.json to filesystem:", e);
  }
}

function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    // 1. Total Score (descending)
    if (b.score !== a.score) return b.score - a.score;
    // 2. Total Correct Answers (descending)
    if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect;
    // 3. Duration in seconds (ascending - faster completion ranks higher)
    if (a.durationSeconds > 0 && b.durationSeconds > 0 && a.durationSeconds !== b.durationSeconds) {
      return a.durationSeconds - b.durationSeconds;
    }
    // 4. Discovered Flora Count (descending)
    return b.floraCount - a.floraCount;
  });
}

function mergeLeaderboardEntries(current: LeaderboardEntry[], incoming: LeaderboardEntry[]): LeaderboardEntry[] {
  const result = [...current];

  for (const item of incoming) {
    if (!item || (!item.id && !item.email)) continue;

    const itemKey = item.id || item.email || "";

    const idx = result.findIndex(
      (e) => (itemKey && e.id === itemKey) || (item.email && e.email === item.email)
    );

    if (idx >= 0) {
      const existing = result[idx];

      // Keep highest score!
      const bestScore = Math.max(existing.score, item.score || 0);
      const bestCorrect = Math.max(existing.totalCorrect || 0, item.totalCorrect || 0);
      const bestAttempted = Math.max(existing.totalAttempted || 0, item.totalAttempted || 0);
      const bestFlora = Math.max(existing.floraCount || 0, item.floraCount || 0);
      const bestStreak = Math.max(existing.maxStreak || 0, item.maxStreak || 0);
      const bestTtsScore = Math.max(existing.ttsScore || 0, item.ttsScore || 0);
      const bestTtsCompleted = Math.max(existing.ttsCompleted || 0, item.ttsCompleted || 0);

      // Best duration (fastest time for best score)
      let bestDuration = existing.durationSeconds;
      if (item.durationSeconds > 0) {
        if (item.score > existing.score || existing.durationSeconds === 0) {
          bestDuration = item.durationSeconds;
        } else if (item.score === existing.score) {
          bestDuration = Math.min(existing.durationSeconds, item.durationSeconds);
        }
      }

      result[idx] = {
        ...existing,
        name: item.name || existing.name,
        email: item.email || existing.email,
        picture: item.picture || existing.picture,
        avatarType: item.avatarType || existing.avatarType,
        customAvatar: item.customAvatar || existing.customAvatar,
        title: item.title || existing.title,
        score: bestScore,
        totalCorrect: bestCorrect,
        totalAttempted: bestAttempted,
        durationSeconds: bestDuration,
        floraCount: bestFlora,
        maxStreak: bestStreak,
        ttsScore: bestTtsScore,
        ttsCompleted: bestTtsCompleted,
        updatedAt: item.score > existing.score || (item.ttsScore || 0) > (existing.ttsScore || 0) ? "Baru saja" : existing.updatedAt,
      };
    } else {
      result.push(item);
    }
  }

  return sortLeaderboard(result);
}

// ─── GET /api/leaderboard ───────────────────────────────────────────────────
export async function GET() {
  try {
    const entries = readLeaderboardStore();
    const sorted = sortLeaderboard(entries);
    return NextResponse.json({ entries: sorted });
  } catch (error) {
    console.error("Error in GET /api/leaderboard:", error);
    return NextResponse.json({ entries: [] }, { status: 500 });
  }
}

// ─── POST /api/leaderboard ──────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const incomingList: LeaderboardEntry[] = Array.isArray(body.entries)
      ? body.entries
      : body.entry
      ? [body.entry]
      : [];

    if (incomingList.length === 0) {
      return NextResponse.json({ error: "Data entri leaderboard tidak valid" }, { status: 400 });
    }

    const currentEntries = readLeaderboardStore();
    const updatedList = mergeLeaderboardEntries(currentEntries, incomingList);
    saveLeaderboardStore(updatedList);

    return NextResponse.json({ success: true, entries: updatedList });
  } catch (error) {
    console.error("Error in POST /api/leaderboard:", error);
    return NextResponse.json({ error: "Gagal menyimpan ke leaderboard global" }, { status: 500 });
  }
}
