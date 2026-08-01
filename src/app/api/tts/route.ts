import { NextRequest, NextResponse } from "next/server";
import { getTTSLevelById, getRandomTTSLevel, TTS_LEVELS } from "@/lib/ttsDatabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const levelId = searchParams.get("levelId");

    let level = levelId ? getTTSLevelById(levelId) : getRandomTTSLevel();
    
    return NextResponse.json({
      level,
      totalLevels: TTS_LEVELS.length
    });
  } catch (error) {
    console.error("Error in GET /api/tts:", error);
    return NextResponse.json({ error: "Gagal mengambil data TTS" }, { status: 500 });
  }
}
