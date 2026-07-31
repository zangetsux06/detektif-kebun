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
  updatedAt: string;
}

export const dynamic = "force-dynamic";

// Persistent file storage path for serverless/local environments
const DATA_DIR = process.env.NODE_ENV === "production" ? "/tmp" : path.join(process.cwd(), ".data");
const FILE_PATH = path.join(DATA_DIR, "global_leaderboard.json");

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
        globalMemoryStore = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn("⚠️ Failed to read global_leaderboard.json, using in-memory store:", e);
  }
  return globalMemoryStore;
}

function saveLeaderboardStore(entries: LeaderboardEntry[]) {
  globalMemoryStore = entries;
  try {
    ensureDataDirExists();
    fs.writeFileSync(FILE_PATH, JSON.stringify(entries, null, 2), "utf-8");
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
    const newEntry: LeaderboardEntry = body.entry;

    if (!newEntry || (!newEntry.id && !newEntry.email)) {
      return NextResponse.json({ error: "Data entri leaderboard tidak valid" }, { status: 400 });
    }

    const currentEntries = readLeaderboardStore();
    const entryId = newEntry.id || newEntry.email || "user_" + Date.now();

    const existingIndex = currentEntries.findIndex(
      (e) => e.id === entryId || (newEntry.email && e.email === newEntry.email)
    );

    let updatedList = [...currentEntries];

    if (existingIndex >= 0) {
      const existing = updatedList[existingIndex];

      // Update entry if new score is higher or equal
      const newScore = Math.max(existing.score, newEntry.score || 0);
      const newCorrect = Math.max(existing.totalCorrect || 0, newEntry.totalCorrect || 0);
      const newAttempted = Math.max(existing.totalAttempted || 0, newEntry.totalAttempted || 0);
      const newFlora = Math.max(existing.floraCount || 0, newEntry.floraCount || 0);
      const newStreak = Math.max(existing.maxStreak || 0, newEntry.maxStreak || 0);

      // Best duration (fastest time for best score)
      let newDuration = existing.durationSeconds;
      if (newEntry.durationSeconds > 0) {
        if (newEntry.score > existing.score || existing.durationSeconds === 0) {
          newDuration = newEntry.durationSeconds;
        } else if (newEntry.score === existing.score) {
          newDuration = Math.min(existing.durationSeconds, newEntry.durationSeconds);
        }
      }

      updatedList[existingIndex] = {
        ...existing,
        name: newEntry.name || existing.name,
        email: newEntry.email || existing.email,
        picture: newEntry.picture || existing.picture,
        avatarType: newEntry.avatarType || existing.avatarType,
        customAvatar: newEntry.customAvatar || existing.customAvatar,
        title: newEntry.title || existing.title,
        score: newScore,
        totalCorrect: newCorrect,
        totalAttempted: newAttempted,
        durationSeconds: newDuration,
        floraCount: newFlora,
        maxStreak: newStreak,
        updatedAt: "Baru saja",
      };
    } else {
      updatedList.push({
        id: entryId,
        name: newEntry.name || "Detektif Rimba",
        email: newEntry.email || "",
        picture: newEntry.picture || "",
        avatarType: newEntry.avatarType || "google",
        customAvatar: newEntry.customAvatar || "🍀",
        title: newEntry.title || "Pramuka Botanis",
        score: newEntry.score || 0,
        totalCorrect: newEntry.totalCorrect || 0,
        totalAttempted: newEntry.totalAttempted || 0,
        durationSeconds: newEntry.durationSeconds || 0,
        floraCount: newEntry.floraCount || 0,
        maxStreak: newEntry.maxStreak || 0,
        updatedAt: "Baru saja",
      });
    }

    const sortedList = sortLeaderboard(updatedList);
    saveLeaderboardStore(sortedList);

    return NextResponse.json({ success: true, entries: sortedList });
  } catch (error) {
    console.error("Error in POST /api/leaderboard:", error);
    return NextResponse.json({ error: "Gagal menyimpan ke leaderboard global" }, { status: 500 });
  }
}
