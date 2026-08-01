export interface TTSClue {
  number: number;
  direction: "across" | "down";
  answer: string; // Must be UPPERCASE
  clue: string;
  row: number; // 0-indexed starting row in grid
  col: number; // 0-indexed starting col in grid
  category: string;
  botanicalFact: string;
}

export interface TTSLevel {
  id: string;
  title: string;
  gridSize: { rows: number; cols: number };
  clues: TTSClue[];
}

// Handcrafted TTS puzzles with 100% UNIQUE flora names, verified intersections & 100% sterilized facts (NO SPOILERS).
export const TTS_LEVELS: TTSLevel[] = [
  {
    id: "tts_level_1",
    title: "Level 1: Hutan Kalimantan & Sumatra",
    gridSize: { rows: 12, cols: 10 },
    clues: [
      {
        number: 1,
        direction: "across",
        answer: "CENDANA",
        clue: "Pohon kayu harum berharga tinggi khas Nusa Tenggara.",
        row: 1,
        col: 0,
        category: "Pohon Komersial",
        botanicalFact: "Minyak kayu harum ini sering dijadikan bahan dasar parfum mewah alami."
      },
      {
        number: 2,
        direction: "down",
        answer: "GAHARU",
        clue: "Pohon berminyak wangi mahamahal penghasil gubal rimba.",
        row: 0,
        col: 4,
        category: "Pohon Langka",
        botanicalFact: "Gubal wangi ini terbentuk dari infeksi alami mikoriza pada batang pohon."
      },
      {
        number: 3,
        direction: "across",
        answer: "MERANTI",
        clue: "Pohon kanopi utama penopang ekosistem hutan hujan tropis basah.",
        row: 4,
        col: 2,
        category: "Pohon Kanopi",
        botanicalFact: "Tanaman ini merupakan spesies pohon kayu dominan di kawasan Malesia."
      },
      {
        number: 4,
        direction: "down",
        answer: "NAGASARI",
        clue: "Pohon keramat berkerak wangi yang sering ditanam di komplek kraton.",
        row: 4,
        col: 6,
        category: "Pohon Kuno",
        botanicalFact: "Bunganya yang harum dahulu sering dijadikan campuran ramuan herbal tradisional."
      }
    ]
  },
  {
    id: "tts_level_2",
    title: "Level 2: Flora Kerajaan & Pesisir",
    gridSize: { rows: 9, cols: 10 },
    clues: [
      {
        number: 1,
        direction: "across",
        answer: "PURWACENG",
        clue: "Tanaman herbal penambah stamina khas dataran tinggi Dieng.",
        row: 1,
        col: 0,
        category: "Tanaman Obat",
        botanicalFact: "Akar tanaman ini sering diolah menjadi minuman hangat khas pegunungan."
      },
      {
        number: 2,
        direction: "down",
        answer: "ANGSANA",
        clue: "Pohon peneduh berkayu merah yang mengeluarkan getah merah darah.",
        row: 1,
        col: 4,
        category: "Pohon Peneduh",
        botanicalFact: "Kayu peneduh ini sangat diminati untuk ukiran furnitur halus."
      },
      {
        number: 3,
        direction: "across",
        answer: "SIRSAK",
        clue: "Buah berduri lunak rasa asam manis penangkal racun alami.",
        row: 4,
        col: 4,
        category: "Buah Tropis",
        botanicalFact: "Daun buah ini kaya akan senyawa acetogenin yang berkhasiat tinggi."
      },
      {
        number: 4,
        direction: "down",
        answer: "SAGU",
        clue: "Palem penghasil tepung bahan pangan pokok wilayah timur Nusantara.",
        row: 4,
        col: 7,
        category: "Palem Pangan",
        botanicalFact: "Satu batang pohon tua ini dapat menghasilkan ratusan kilogram pati tepung."
      }
    ]
  },
  {
    id: "tts_level_3",
    title: "Level 3: Pesona Tropis & Rimba Tua",
    gridSize: { rows: 11, cols: 9 },
    clues: [
      {
        number: 1,
        direction: "across",
        answer: "KETAPANG",
        clue: "Pohon peneduh pantai yang daun keringnya menetralkan pH air.",
        row: 1,
        col: 0,
        category: "Flora Pesisir",
        botanicalFact: "Daun pohon peneduh ini mengandung tanin alami yang berfungsi sebagai pembunuh bakteri."
      },
      {
        number: 2,
        direction: "down",
        answer: "PALMA",
        clue: "Suku tumbuhan berbunga yang mencakup kelapa, pinang, dan lontar.",
        row: 1,
        col: 4,
        category: "Suku Tumbuhan",
        botanicalFact: "Familia tumbuhan tropis ini memiliki lebih dari 2.600 spesies Nusantara."
      },
      {
        number: 3,
        direction: "across",
        answer: "MATOA",
        clue: "Buah khas Papua beraroma rasa campuran rambutan, kelengkeng, & durian.",
        row: 4,
        col: 4,
        category: "Buah Endemik",
        botanicalFact: "Buah khas Papua ini kaya akan vitamin C dan E untuk menjaga daya tahan tubuh."
      },
      {
        number: 4,
        direction: "down",
        answer: "TANGKIL",
        clue: "Sebutan lokal melinjo di Sunda yang bijinya menjadi emping.",
        row: 4,
        col: 6,
        category: "Tanaman Serbaguna",
        botanicalFact: "Daun muda dan bijinya merupakan bahan utama emping dan sayur lodeh."
      }
    ]
  }
];

export function getTTSLevelById(id: string): TTSLevel {
  return TTS_LEVELS.find((l) => l.id === id) || TTS_LEVELS[0];
}

export function getRandomTTSLevel(): TTSLevel {
  const randomIndex = Math.floor(Math.random() * TTS_LEVELS.length);
  return TTS_LEVELS[randomIndex];
}
