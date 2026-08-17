import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
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

const KV_KEY = "global_leaderboard";

// Vercel KV (Upstash Redis) is the persistent, shared store used in production.
// Fallback to a local file only for development when KV env vars are absent.
const isKVConfigured =
  typeof process.env.KV_REST_API_URL === "string" &&
  process.env.KV_REST_API_URL.length > 0 &&
  typeof process.env.KV_REST_API_TOKEN === "string" &&
  process.env.KV_REST_API_TOKEN.length > 0;

// File storage path for local development
const DATA_DIR = path.join(process.cwd(), ".data");
const FILE_PATH = path.join(DATA_DIR, "global_leaderboard.json");

const DUMMY_IDS = new Set(["eyang_rimba", "kapitan_botanis", "pakar_rimba"]);
const DUMMY_NAMES = new Set(["Eyang Rimba Agung", "Kapitan Botanis", "Rani Sumatra"]);

function sanitizeEntries(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  if (!Array.isArray(entries)) return [];
  return entries.filter(
    (e) => e && e.id && !DUMMY_IDS.has(e.id) && !DUMMY_NAMES.has(e.name)
  );
}

// In-memory fallback store (development only; KV is the source of truth in production)
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

function readFileStore(): LeaderboardEntry[] {
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

function writeFileStore(entries: LeaderboardEntry[]) {
  const cleaned = sanitizeEntries(entries);
  globalMemoryStore = cleaned;
  try {
    ensureDataDirExists();
    fs.writeFileSync(FILE_PATH, JSON.stringify(cleaned, null, 2), "utf-8");
  } catch (e) {
    console.warn("⚠️ Failed to save global_leaderboard.json to filesystem:", e);
  }
}

// Read all entries. In production we use a KV hash keyed by entry id so that
// concurrent writes from different users do not overwrite each other.
async function readLeaderboardStore(): Promise<LeaderboardEntry[]> {
  if (isKVConfigured) {
    try {
      const data = await kv.hgetall<Record<string, LeaderboardEntry>>(KV_KEY);
      if (data && typeof data === "object") {
        const values = Object.values(data).filter((v) => v && typeof v === "object");
        return sanitizeEntries(values as LeaderboardEntry[]);
      }
      return [];
    } catch (e) {
      console.error("⚠️ Failed to read leaderboard from Vercel KV:", e);
      // Fall through to file store on KV failure
    }
  }
  return readFileStore();
}

// Merge one entry into the store atomically (per user id) without clobbering others.
async function saveLeaderboardEntry(item: LeaderboardEntry) {
  if (isKVConfigured) {
    const key = item.id || item.email || "";
    if (!key) return;
    try {
      const existing = await kv.hget<LeaderboardEntry>(KV_KEY, key);
      const merged = mergeEntry(existing ?? undefined, item);
      await kv.hset(KV_KEY, { [key]: merged });
      return;
    } catch (e) {
      console.error("⚠️ Failed to save leaderboard entry to Vercel KV:", e);
      // Fall through to file store on KV failure
    }
  }
  const currentEntries = readFileStore();
  const updatedList = mergeLeaderboardEntries(currentEntries, [item]);
  writeFileStore(updatedList);
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

// Merge a single incoming entry into an existing one, keeping the best stats.
function mergeEntry(existing: LeaderboardEntry | undefined, item: LeaderboardEntry): LeaderboardEntry {
  const base = existing || item;

  // Keep highest score!
  const bestScore = Math.max(existing?.score || 0, item.score || 0);
  const bestCorrect = Math.max(existing?.totalCorrect || 0, item.totalCorrect || 0);
  const bestAttempted = Math.max(existing?.totalAttempted || 0, item.totalAttempted || 0);
  const bestFlora = Math.max(existing?.floraCount || 0, item.floraCount || 0);
  const bestStreak = Math.max(existing?.maxStreak || 0, item.maxStreak || 0);
  const bestTtsScore = Math.max(existing?.ttsScore || 0, item.ttsScore || 0);
  const bestTtsCompleted = Math.max(existing?.ttsCompleted || 0, item.ttsCompleted || 0);

  // Best duration (fastest time for best score)
  let bestDuration = existing?.durationSeconds || 0;
  if (item.durationSeconds > 0) {
    if (item.score > (existing?.score || 0) || bestDuration === 0) {
      bestDuration = item.durationSeconds;
    } else if (item.score === (existing?.score || 0)) {
      bestDuration = Math.min(bestDuration, item.durationSeconds);
    }
  }

  const merged: LeaderboardEntry = {
    ...base,
    name: item.name || base.name,
    email: item.email || base.email,
    picture: item.picture || base.picture,
    avatarType: item.avatarType || base.avatarType,
    customAvatar: item.customAvatar || base.customAvatar,
    title: item.title || base.title,
    score: bestScore,
    totalCorrect: bestCorrect,
    totalAttempted: bestAttempted,
    durationSeconds: bestDuration,
    floraCount: bestFlora,
    maxStreak: bestStreak,
    ttsScore: bestTtsScore,
    ttsCompleted: bestTtsCompleted,
    updatedAt:
      item.score > (existing?.score || 0) || (item.ttsScore || 0) > (existing?.ttsScore || 0)
        ? "Baru saja"
        : base.updatedAt,
  };

  return merged;
}

// Merge a full list (used by the local-file fallback path).
function mergeLeaderboardEntries(current: LeaderboardEntry[], incoming: LeaderboardEntry[]): LeaderboardEntry[] {
  const result = [...current];

  for (const item of incoming) {
    if (!item || (!item.id && !item.email)) continue;

    const itemKey = item.id || item.email || "";
    const idx = result.findIndex(
      (e) => (itemKey && e.id === itemKey) || (item.email && e.email === item.email)
    );

    if (idx >= 0) {
      result[idx] = mergeEntry(result[idx], item);
    } else {
      result.push(item);
    }
  }

  return sortLeaderboard(result);
}

// ─── GET /api/leaderboard ───────────────────────────────────────────────────
export async function GET() {
  try {
    const entries = await readLeaderboardStore();
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

    for (const item of incomingList) {
      if (!item || (!item.id && !item.email)) continue;
      await saveLeaderboardEntry(item);
    }

    const updatedList = sortLeaderboard(await readLeaderboardStore());
    return NextResponse.json({ success: true, entries: updatedList });
  } catch (error) {
    console.error("Error in POST /api/leaderboard:", error);
    return NextResponse.json({ error: "Gagal menyimpan ke leaderboard global" }, { status: 500 });
  }
}
