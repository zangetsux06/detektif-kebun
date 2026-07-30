import { NextRequest, NextResponse } from "next/server";
import { generateWithCascade } from "@/lib/gemini";
import { LOCAL_RIDDLES, getPlantFirstLetter } from "@/lib/riddles";
export { LOCAL_RIDDLES };

export const dynamic = "force-dynamic";

const FLORA_POOL = [
  "Rafflesia arnoldii", "Bunga Bangkai", "Kantong Semar (Nepenthes)", "Melati Putih",
  "Anggrek Bulan", "Kayu Cendana", "Pohon Ulin (Kayu Besi)", "Pohon Damar",
  "Pohon Jati", "Pohon Mahoni", "Pohon Trembesi", "Bambu Betung",
  "Kapur Barus", "Kenanga", "Bunga Cempaka", "Edelweiss Jawa",
  "Pohon Meranti", "Pohon Gaharu", "Rotan", "Teratai Raksasa (Nymphaea)",
  "Pohon Pinus Merkusi", "Buah Merah Papua", "Daun Sirih", "Pohon Sagu"
];

export function scrubSpoilers(text: string, plantName: string): string {
  if (!text) return text;
  
  let scrubbed = text;
  const variations = [plantName];
  
  const cleanParts = plantName.replace(/[()]/g, " ").split(/\s+/).map(w => w.trim()).filter(Boolean);
  if (cleanParts.length > 1) {
    variations.push(cleanParts.join(" "));
  }
  
  const commonWords = new Set([
    "pohon", "bunga", "tanaman", "putih", "hitam", "merah", "kuning", "hijau",
    "besar", "kecil", "wangi", "papua", "bulan", "jati", "aren", "rotan",
    "bambu", "kayu", "daun", "batu", "air", "akar", "batang", "hutan",
    "rawa", "pantai", "laut", "sungai", "gunung", "pulau", "timur", "barat",
    "utara", "selatan", "petung", "ulin", "pandan", "teratai", "lotus",
  ]);

  cleanParts.forEach(word => {
    const lowerWord = word.toLowerCase();
    if (word.length >= 5 && !commonWords.has(lowerWord)) {
      variations.push(word);
    }
  });

  variations.sort((a, b) => b.length - a.length);

  const lowerName = plantName.toLowerCase();
  let replacement = "tanaman ini";
  if (lowerName.includes("pohon")) {
    replacement = "pohon ini";
  } else if (lowerName.includes("bunga") || lowerName.includes("melati") || lowerName.includes("anggrek") || lowerName.includes("kenanga")) {
    replacement = "bunga ini";
  }

  for (const variant of variations) {
    const escaped = variant.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    scrubbed = scrubbed.replace(regex, replacement);
  }

  return scrubbed || text;
}

export async function GET(request: NextRequest) {
  let excludedPlants: string[] = [];
  try {
    const { searchParams } = new URL(request.url);
    const excludeParam = searchParams.get("exclude") || "";
    excludedPlants = excludeParam 
      ? excludeParam.split(",").map(p => decodeURIComponent(p).trim().toLowerCase()) 
      : [];
  } catch (e) {
    console.warn("Gagal parse searchParams:", e);
  }

  try {
    let availableFlora = FLORA_POOL.filter(p => !excludedPlants.includes(p.toLowerCase()));
    if (availableFlora.length === 0) {
      availableFlora = FLORA_POOL;
    }

    const selectedPlant = availableFlora[Math.floor(Math.random() * availableFlora.length)];

    const prompt = `
Buat sebuah teka-teki botani dalam format JSON untuk tanaman: "${selectedPlant}".

Format JSON yang HARUS dikembalikan (tanpa markdown):
{
  "riddle": "Teks teka-teki puitis dari Eyang Rimba (3-5 kalimat, jangan sebutkan nama tanaman)",
  "clues": [
    "Petunjuk tingkat 1 (Agak tersamar tentang kegunaan atau sifat umum tanaman, jangan sebutkan nama tanaman)",
    "Petunjuk tingkat 2 (Karakteristik fisik, bentuk daun/batang/bunga tanaman secara detail, jangan sebutkan nama tanaman)",
    "Petunjuk tingkat 3 (Sangat spesifik, menyebut nama daerah khas atau keunikan terbesarnya, jangan sebutkan nama tanaman)"
  ],
  "category": "Kategori tanaman (contoh: Bunga Liar, Pohon Hutan, Tanaman Hias, dsb)",
  "difficulty": "mudah | sedang | sulit",
  "funFact": "Satu fakta menarik tentang tanaman ini (jangan sebutkan nama tanaman asli secara utuh atau sebagian, gunakan kata ganti seperti 'tanaman ini', 'bunga ini', atau 'pohon ini')"
}

PENTING: 
- JANGAN PERNAH menyebutkan nama tanaman "${selectedPlant}" secara utuh, sebagian, atau singkatannya dalam seluruh field JSON ("riddle", "clues", maupun "funFact"). 
- Gunakan kata ganti universal seperti "tanaman ini", "pohon ini", or "bunga ini" jika perlu merujuk pada tanaman tersebut.
- Buat 3 petunjuk bertahap dari petunjuk 1 (sulit) hingga petunjuk 3 (mudah).
`;

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API timeout (3.5s)")), 3500)
    );
    const text = await Promise.race([generateWithCascade(prompt, true), timeoutPromise]);

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Gagal mem-parse respons JSON dari Gemini");
      }
    }

    if (!parsed || typeof parsed !== "object" || !parsed.riddle || !parsed.clues || !parsed.funFact || !parsed.category || !parsed.difficulty) {
      throw new Error("Respons JSON dari Gemini tidak lengkap atau cacat.");
    }

    const firstLetter = getPlantFirstLetter(selectedPlant);
    const encodedPlant = Buffer.from(selectedPlant).toString("base64");

    const scrubbedRiddle = scrubSpoilers(parsed.riddle, selectedPlant) || parsed.riddle;
    const scrubbedClues = Array.isArray(parsed.clues) 
      ? parsed.clues.map((c: string) => scrubSpoilers(c, selectedPlant) || c) 
      : [];
    const scrubbedFunFact = scrubSpoilers(parsed.funFact, selectedPlant) || parsed.funFact;

    return NextResponse.json({
      riddle: scrubbedRiddle,
      clues: scrubbedClues,
      category: parsed.category,
      difficulty: parsed.difficulty,
      funFact: scrubbedFunFact,
      firstLetter,
      encodedPlant,
      id: Date.now().toString(),
      isFallback: false
    });
  } catch (error) {
    console.warn("⚠️ Gagal memanggil Gemini API, beralih ke Fallback Database Lokal:", (error as Error).message || error);
    
    let availableLocal = LOCAL_RIDDLES.filter(r => !excludedPlants.includes(r.plantName.toLowerCase()));
    if (availableLocal.length === 0) {
      availableLocal = LOCAL_RIDDLES;
    }

    const fallback = availableLocal[Math.floor(Math.random() * availableLocal.length)];
    const firstLetter = getPlantFirstLetter(fallback.plantName);
    const encodedPlant = Buffer.from(fallback.plantName).toString("base64");

    return NextResponse.json({
      riddle: scrubSpoilers(fallback.riddle, fallback.plantName) || fallback.riddle,
      clues: fallback.clues.map(c => scrubSpoilers(c, fallback.plantName) || c),
      category: fallback.category,
      difficulty: fallback.difficulty,
      funFact: scrubSpoilers(fallback.funFact, fallback.plantName) || fallback.funFact,
      firstLetter,
      encodedPlant,
      id: "local_" + Date.now().toString() + "_" + Math.floor(Math.random() * 100),
      isFallback: true
    });
  }
}
