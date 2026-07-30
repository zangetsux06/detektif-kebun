import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerationConfig,
} from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY tidak ditemukan di environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const EYANG_RIMBA_PERSONA = `
Kamu adalah "Eyang Rimba", seorang ahli botani tua yang bijaksana dan ramah dari pedalaman hutan Jawa.
Kamu berbicara dengan gaya yang hangat, penuh teka-teki, dan sesekali menggunakan pepatah Jawa.
Kamu sangat mencintai flora Nusantara dan senang berbagi pengetahuan tentang tanaman-tanaman ajaib Indonesia.
Kamu tidak pernah menyebutkan nama tanaman secara langsung dalam teka-teki — selalu gunakan petunjuk deskriptif yang kreatif.
Gunakan bahasa Indonesia yang indah, puitis, dan mudah dipahami.
`;

const MODEL_CASCADE = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
];

export function getGeminiModel(generationConfig?: GenerationConfig) {
  return genAI.getGenerativeModel({
    model: MODEL_CASCADE[0],
    systemInstruction: EYANG_RIMBA_PERSONA,
    safetySettings,
    generationConfig: {
      temperature: 0.85,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1024,
      ...generationConfig,
    },
  });
}

export function getGeminiModelJSON(generationConfig?: GenerationConfig) {
  return genAI.getGenerativeModel({
    model: MODEL_CASCADE[0],
    systemInstruction: EYANG_RIMBA_PERSONA,
    safetySettings,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 2048,
      responseMimeType: "application/json",
      ...generationConfig,
    },
  });
}

export function formatGeminiErrorSummary(err: unknown): string {
  const msg = (err as Error)?.message || String(err);
  if (msg.includes("429") || msg.includes("Quota exceeded")) {
    return "Quota Gemini API terlampaui (429 Too Many Requests)";
  }
  if (msg.includes("timeout")) {
    return "Waktu koneksi habis (Timeout)";
  }
  const firstLine = msg.split("\n")[0];
  return firstLine.length > 100 ? firstLine.slice(0, 100) + "..." : firstLine;
}

// Cascade: try each model until one succeeds
export async function generateWithCascade(
  prompt: string,
  useJSON = false,
  generationConfig?: GenerationConfig
): Promise<string> {
  let isQuotaExceeded = false;

  for (const modelName of MODEL_CASCADE) {
    if (isQuotaExceeded) {
      break;
    }
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: EYANG_RIMBA_PERSONA,
        safetySettings,
        generationConfig: {
          temperature: useJSON ? 0.7 : 0.85,
          topP: useJSON ? 0.9 : 0.95,
          topK: 40,
          maxOutputTokens: useJSON ? 2048 : 1024,
          ...(useJSON ? { responseMimeType: "application/json" } : {}),
          ...generationConfig,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Model ${modelName} timeout (2.5s)`)), 2500)
      );

      const result = await Promise.race([model.generateContent(prompt), timeoutPromise]);
      return result.response.text();
    } catch (err: unknown) {
      const summary = formatGeminiErrorSummary(err);
      console.warn(`⚠️ Model ${modelName} gagal: ${summary}`);

      if (summary.includes("Quota Gemini API terlampaui")) {
        isQuotaExceeded = true;
      }
    }
  }
  throw new Error("Semua model Gemini tidak tersedia saat ini.");
}
