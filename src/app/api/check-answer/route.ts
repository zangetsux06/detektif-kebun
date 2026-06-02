import { NextRequest, NextResponse } from "next/server";
import { getGeminiModelJSON } from "@/lib/gemini";
import { LOCAL_RIDDLES } from "../riddle/route";

interface CheckAnswerRequest {
  answer: string;
  encodedPlant: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckAnswerRequest = await request.json();
    const { answer, encodedPlant } = body;

    if (!answer || !encodedPlant) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 },
      );
    }

    const plantName = Buffer.from(encodedPlant, "base64").toString("utf-8");
    const cleanAnswer = answer.trim().toLowerCase();
    const cleanPlantName = plantName.toLowerCase();

    // Reject answers shorter than 4 characters
    if (cleanAnswer.length < 4) {
      return NextResponse.json({
        correct: false,
        plantName: plantName,
        feedback:
          "Jawabanmu terlalu pendek, Nak. Masukkan paling tidak 4 huruf agar Eyang yakin itu bukan ketidaksengajaan.",
        botanicalFacts: [],
        habitat: "",
        localNames: [],
      });
    }

    // ─── OPTION A: Uji Coba Cepat dengan Database Lokal dulu ────────────────
    const matchedLocal = LOCAL_RIDDLES.find(
      (r) =>
        r.plantName.toLowerCase() === cleanPlantName ||
        r.plantName.toLowerCase().includes(cleanPlantName) ||
        cleanPlantName.includes(r.plantName.toLowerCase()),
    );

    // Cek kecocokan dasar secara lokal (tanpa perlu panggil AI jika jawaban sangat mirip)
    // Ini menghemat kuota dan mempercepat respon
    const directMatch =
      cleanAnswer.length >= 4 &&
      (cleanPlantName.includes(cleanAnswer) ||
        cleanAnswer.includes(
          cleanPlantName.split(" ")[0].replace(/[^a-zA-Z]/g, ""),
        ) ||
        (matchedLocal &&
          matchedLocal.localNames.some((name) =>
            cleanAnswer.includes(name.toLowerCase()),
          )));

    // Jika terjadi kecocokan teks yang sangat mirip, kita langsung berikan jawaban benar
    if (directMatch && matchedLocal) {
      return NextResponse.json({
        correct: true,
        plantName: matchedLocal.plantName,
        feedback: `Luar biasa, Nak! Tepat sekali. Itu adalah ${matchedLocal.plantName}. Pengetahuanmu tentang flora Nusantara sungguh mengagumkan!`,
        botanicalFacts: matchedLocal.botanicalFacts,
        habitat: matchedLocal.habitat,
        localNames: matchedLocal.localNames,
      });
    }

    // ─── OPTION B: Panggil Gemini API untuk evaluasi yang cerdas ────────────
    try {
      const model = getGeminiModelJSON();

      const prompt = `
Evaluasi apakah jawaban pemain benar untuk teka-teki botani ini.

Tanaman yang benar: "${plantName}"
Jawaban pemain: "${answer}"

Kriteria BENAR:
- Nama tanaman yang tepat (boleh nama umum atau ilmiah)
- Nama yang mirip atau sinonim yang dikenal luas
- Ejaan yang sedikit berbeda tapi jelas merujuk tanaman yang sama
- Boleh hanya menyebut nama generik (contoh: "kantong semar" untuk Nepenthes)

Kembalikan JSON berikut (TANPA markdown):
{
  "correct": true/false
}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Gagal mem-parse respons JSON");
        }
      }

      if (parsed.correct) {
        const matched =
          LOCAL_RIDDLES.find(
            (r) =>
              r.plantName.toLowerCase() === cleanPlantName ||
              r.plantName.toLowerCase().includes(cleanPlantName) ||
              cleanPlantName.includes(r.plantName.toLowerCase()),
          ) || matchedLocal;

        return NextResponse.json({
          correct: true,
          plantName: matched ? matched.plantName : plantName,
          feedback: matched
            ? `Luar biasa, Nak! Tepat sekali. Itu adalah ${matched.plantName}. Pengetahuanmu tentang flora Nusantara sungguh mengagumkan!`
            : `Luar biasa, Nak! Tepat sekali. Itu adalah ${plantName}. Pengetahuanmu tentang flora Nusantara sungguh mengagumkan!`,
          botanicalFacts: matched
            ? matched.botanicalFacts
            : [
                "Memiliki nama unik berdasarkan bentuk tubuh atau fungsinya.",
                "Tumbuh liar dan lestari di berbagai penjuru kepulauan Nusantara.",
                "Merupakan bagian penting dari warisan ekosistem hutan hujan tropis kita.",
              ],
          habitat: matched
            ? matched.habitat
            : "Hutan tropis kepulauan Indonesia.",
          localNames: matched ? matched.localNames : [plantName],
        });
      } else {
        return NextResponse.json({
          correct: false,
          plantName: plantName,
          feedback:
            "Aduh, masih kurang tepat sedikit lagi, Nak. Cobalah perhatikan ciri khasnya sekali lagi dan jangan patah semangat!",
          botanicalFacts: [],
          habitat: "",
          localNames: [],
        });
      }
    } catch (aiError) {
      console.warn(
        "⚠️ Gagal mengevaluasi dengan Gemini AI, menggunakan evaluasi lokal:",
        aiError,
      );

      // Jika AI gagal tapi jawaban pemain mirip dengan nama tanaman, nyatakan benar
      const basePlantWords = plantName
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .split(" ");
      const isCorrectLocal =
        basePlantWords.some(
          (word) => word.length > 3 && cleanAnswer.includes(word),
        ) || cleanAnswer.includes(plantName.toLowerCase().split(" ")[0]);

      if (isCorrectLocal) {
        return NextResponse.json({
          correct: true,
          plantName: plantName,
          feedback: `Benar sekali, Nak! Hebat, jawabanmu tepat. Itu adalah ${plantName}. Terus pertahankan prestasimu!`,
          botanicalFacts: matchedLocal
            ? matchedLocal.botanicalFacts
            : [
                "Memiliki nama unik berdasarkan bentuk tubuh atau fungsinya.",
                "Tumbuh liar dan lestari di berbagai penjuru kepulauan Nusantara.",
                "Merupakan bagian penting dari warisan ekosistem hutan hujan tropis kita.",
              ],
          habitat: matchedLocal
            ? matchedLocal.habitat
            : "Hutan tropis kepulauan Indonesia.",
          localNames: matchedLocal ? matchedLocal.localNames : [plantName],
        });
      } else {
        return NextResponse.json({
          correct: false,
          plantName: plantName,
          feedback:
            "Aduh, masih kurang tepat sedikit lagi, Nak. Cobalah perhatikan ciri khasnya sekali lagi dan jangan patah semangat!",
          botanicalFacts: [],
          habitat: "",
          localNames: [],
        });
      }
    }
  } catch (error) {
    console.error("Error di /api/check-answer:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memeriksa jawaban. Coba lagi." },
      { status: 500 },
    );
  }
}
