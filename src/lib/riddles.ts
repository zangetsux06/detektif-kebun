// Bank data teka-teki lokal premium sebagai fallback jika API Key Gemini habis/limit/offline

export interface LocalRiddle {
  plantName: string;
  riddle: string;
  clues: string[];
  category: string;
  difficulty: "mudah" | "sedang" | "sulit";
  funFact: string;
  botanicalFacts: string[];
  habitat: string;
  localNames: string[];
}

export const LOCAL_RIDDLES: LocalRiddle[] = [
  {
    plantName: "Kantong Semar (Nepenthes)",
    riddle: "Aku tumbuh merambat di tanah miskin hara. Bentuk tubuhku mirip cangkir bertutup yang menawan hati. Namun waspadalah para serangga kecil, sekali terpeleset ke dalam cairanku yang manis, kamu takkan pernah kembali ke angkasa.",
    clues: [
      "Aku tumbuh di rawa atau lereng gunung dengan tanah masam yang miskin nitrogen.",
      "Bentuk tubuhku menyerupai periuk kera atau cangkir dengan tutup licin berlumur nektar manis.",
      "Aku menjebak dan memakan serangga kecil dengan bantuan cairan asam pencerna di dalam kantungku."
    ],
    category: "Tanaman Karnivora",
    difficulty: "sedang",
    funFact: "Cairan di dalam kantungnya steril sebelum kantung itu terbuka pertama kalinya.",
    botanicalFacts: [
      "Menggunakan nektar manis di bibir kantung untuk menjebak serangga.",
      "Mencerna mangsa untuk mendapatkan nutrisi nitrogen yang tidak ada di tanah asam.",
      "Banyak ditemukan di pulau Kalimantan dan Sumatra."
    ],
    habitat: "Hutan hujan tropis basah dengan tanah masam dan rendah nitrogen.",
    localNames: ["Semar Mego", "Periuk Kera", "Ketuyut"]
  },
  {
    plantName: "Rafflesia arnoldii",
    riddle: "Aku adalah raksasa yang tak memiliki daun, batang, maupun akar sejati. Aku hidup menumpang pada tumbuhan merambat di kegelapan lantai hutan. Saat mekar, diameter mahkotaku bisa mencapai satu meter, menyebarkan aroma busuk yang mengundang lalat pembantu penyerbukan.",
    clues: [
      "Aku tidak memiliki daun, batang, maupun akar sejati karena aku adalah tumbuhan parasit obligat.",
      "Saat mekar di lantai hutan, kelopak bunga duniaku bisa mencapai diameter satu meter.",
      "Aku mengeluarkan aroma busuk menyengat mirip daging busuk untuk memikat lalat penyerbuk."
    ],
    category: "Bunga Liar",
    difficulty: "sulit",
    funFact: "Merupakan salah satu bunga nasional Indonesia dan dinobatkan sebagai bunga langka terbesar di dunia.",
    botanicalFacts: [
      "Merupakan tumbuhan parasit obligat pada tanaman inang merambat jenis Tetrastigma.",
      "Hanya mekar selama 5 hingga 7 hari sebelum membusuk dan mati.",
      "Tidak melakukan fotosintesis karena tidak memiliki klorofil."
    ],
    habitat: "Lantai hutan hujan tropis Sumatra, khususnya di kawasan Bengkulu.",
    localNames: ["Cendawan Patma", "Bunga Bangkai Arnoldii"]
  },
  {
    plantName: "Bunga Bangkai",
    riddle: "Ukuranku sangat tinggi menjulang bagaikan menara di lantai hutan Sumatra. Aku bukan bunga biasa, melainkan perbungaan terbesar di dunia yang mekar dengan selubung merah hati berkerut. Saat mekar, aku menyebarkan bau bangkai yang menyengat demi mengundang kumbang dan lalat penyerbuk.",
    clues: [
      "Aku adalah Titan Arum, salah satu flora raksasa yang sangat dilindungi.",
      "Bentukku mirip menara kuning (spadix) yang dikelilingi kelopak berkerut ungu kemerahan.",
      "Aku mengeluarkan bau busuk seperti daging mati untuk menarik perhatian serangga."
    ],
    category: "Bunga Liar",
    difficulty: "sulit",
    funFact: "Bunga ini hanya mekar penuh selama kurang lebih 24 hingga 48 jam sebelum akhirnya layu kembali.",
    botanicalFacts: [
      "Memiliki nama ilmiah Amorphophallus titanum.",
      "Menggunakan panas tubuh (termogenesis) untuk menyebarkan bau busuk lebih jauh.",
      "Memiliki fase vegetatif di mana ia tumbuh menjadi pohon berdaun tunggal sebelum masuk fase berbunga."
    ],
    habitat: "Hutan hujan tropis Sumatra, terutama di lereng bukit yang lembap.",
    localNames: ["Titan Arum", "Suweg Raksasa", "Bunga Bangkai"]
  },
  {
    plantName: "Melati Putih",
    riddle: "Mahkotaku mungil berwarna seputih salju, melambangkan kesucian dan ketulusan hati. Keharumanku merebak lembut di malam hari, sering kali menghiasi rambut pengantin dalam upacara adat tradisional Nusantara.",
    clues: [
      "Bungaku berukuran kecil, berwarna seputih salju, dan melambangkan lambang kesucian.",
      "Keharumanku yang khas sering dipadukan ke dalam teh tradisional Indonesia atau kosmetik.",
      "Ditetapkan secara resmi sebagai Puspa Bangsa Indonesia dan menghiasi rambut pengantin perempuan Jawa."
    ],
    category: "Tanaman Hias",
    difficulty: "mudah",
    funFact: "Bunga ini ditetapkan secara resmi sebagai Puspa Bangsa Indonesia berdasarkan Keputusan Presiden Nomor 4 Tahun 1993.",
    botanicalFacts: [
      "Menggunakan minyak atsiri yang digunakan untuk aromaterapi dan kosmetik.",
      "Dapat tumbuh subur sepanjang tahun di daerah beriklim tropis hangat.",
      "Bunganya mekar di pagi hari namun aromanya paling kuat saat senja dan malam hari."
    ],
    habitat: "Daerah tropis dengan paparan sinar matahari penuh hingga tempat agak teduh.",
    localNames: ["Menur", "Malati", "Meteh"]
  },
  {
    plantName: "Anggrek Bulan",
    riddle: "Aku menggantung anggun di batang-batang pohon hutan. Mahkota bungaku lebar bersayap putih bersih dengan corak kuning kemerahan di bagian tengahnya. Aku mampu mekar sangat lama, bagaikan rembulan yang setia menyinari kegelapan malam.",
    clues: [
      "Aku hidup menempel pada dahan pohon tinggi di hutan sebagai tumbuhan epifit non-parasit.",
      "Mahkota bungaku berwarna putih bersih, berukuran lebar mirip bentangan sayap kupu-kupu.",
      "Ditetapkan sebagai Puspa Pesona Indonesia dan bunga ilmiahku bernama Phalaenopsis amabilis."
    ],
    category: "Bunga Liar",
    difficulty: "sedang",
    funFact: "Dapat mekar terus menerus selama 2 hingga 3 bulan tanpa layu.",
    botanicalFacts: [
      "Merupakan tanaman epifit (menempel pada inang tanpa merugikan inang tersebut).",
      "Memiliki akar tebal berlapis velamen untuk menyerap air langsung dari kelembapan udara.",
      "Pertama kali ditemukan di wilayah Maluku oleh Rumphius."
    ],
    habitat: "Menempel pada dahan pohon di daerah lembap dengan naungan cukup.",
    localNames: ["Anggrek Meneer", "Puspa Pesona"]
  },
  {
    plantName: "Kayu Cendana",
    riddle: "Batang kayuku menyimpan aroma wangi abadi yang menenangkan jiwa. Minyak essensial dari tubuhku telah dicari para pedagang dunia sejak ratusan tahun lalu. Aku tumbuh perlahan di tanah berbatu Nusa Tenggara, memberikan keharuman yang tak pudar oleh waktu.",
    clues: [
      "Aku adalah pohon penghasil kayu harum khas dari Nusa Tenggara Timur.",
      "Kayu dan minyakku digunakan sebagai bahan dupa, parfum mewah, serta ukiran kerajinan.",
      "Akarku memerlukan tanaman inang lain saat masih muda untuk menyerap hara (parasit fakultatif)."
    ],
    category: "Pohon Hutan",
    difficulty: "sedang",
    funFact: "Aroma wangi kayu cendana bisa bertahan hingga puluhan tahun bahkan setelah direbahkan.",
    botanicalFacts: [
      "Nama ilmiahnya Santalum album.",
      "Merupakan salah satu kayu termahal di dunia karena kandungan minyak santalol.",
      "Membutuhkan tanaman inang pendamping untuk tumbuh maksimal saat persemaian."
    ],
    habitat: "Daerah kering dan berbatu dengan musim kemarau tegas di Nusa Tenggara Timur.",
    localNames: ["Cendana Wangi", "Hau Seni"]
  },
  {
    plantName: "Pohon Ulin (Kayu Besi)",
    riddle: "Aku adalah raksasa tangguh penjelajah zaman dari hutan Kalimantan. Tubuhku begitu padat dan berat hingga tenggelam di dalam air. Batang kayuku tak membusuk oleh guyuran hujan maupun rayap, menjadikanku sang Kayu Besi pelindung Nusantara.",
    clues: [
      "Aku dikenal sebagai Kayu Besi dari Kalimantan karena ketahanan kayunya yang luar biasa.",
      "Kayuku begitu padat hingga tenggelam jika dimasukkan ke dalam air laut maupun air tawar.",
      "Tahan terhadap air laut, perubahan cuaca ekstrem, dan serangan rayap tanpa perlu diawetkan."
    ],
    category: "Pohon Hutan",
    difficulty: "sulit",
    funFact: "Pohon ulin tumbuh sangat lambat, membutuhkan waktu hingga ratusan tahun untuk mencapai diameter satu meter.",
    botanicalFacts: [
      "Nama ilmiahnya Eusideroxylon zwageri.",
      "Tumbuhan endemik hutan hujan tropis Kalimantan dan Sumatra.",
      "Kerap dimanfaatkan untuk konstruksi jembatan, sirap rumah, dan tiang tiang dermaga."
    ],
    habitat: "Hutan dataran rendah tropis basah hingga ketinggian 400 meter di atas permukaan laut.",
    localNames: ["Kayu Besi", "Bulian", "Onglen"]
  },
  {
    plantName: "Pohon Damar",
    riddle: "Tinggi batangku menjulang lurus menembus kanopi hutan tropis. Dari torehan batangku, keluar getah bening mengeras yang berkilau bagaikan kristal. Getahku menerangi kegelapan malam sebagai bahan pelapis damar kuno dan industri cat modern.",
    clues: [
      "Aku adalah pohon konifer asli Nusantara penghasil getah kopal/damar berkilau.",
      "Batangku lurus dan sangat tinggi, sering dimanfaatkan sebagai pohon penghijauan.",
      "Getahku diolah menjadi vernis, bahan cat, kopal, dan pelapis kertas."
    ],
    category: "Pohon Hutan",
    difficulty: "mudah",
    funFact: "Getah damar telah diekspor ke berbagai belahan dunia sejak zaman Jalur Rempah kuno.",
    botanicalFacts: [
      "Nama ilmiahnya Agathis dammara.",
      "Dapat tumbuh mencapai tinggi lebih dari 60 meter.",
      "Biji dihasilkan dari runjung (cone) bulat bersisik."
    ],
    habitat: "Hutan pegunungan tropis basah di Maluku, Sulawesi, hingga Papua.",
    localNames: ["Kopal", "Damar Minyak", "Ki Damar"]
  }
];

export function getPlantFirstLetter(plantName: string): string {
  if (!plantName) return "A";
  
  // Remove parenthetical scientific names, e.g. "Pohon Ulin (Kayu Besi)" -> "Pohon Ulin"
  const cleanName = plantName.replace(/\(.*?\)/g, "").replace(/[()]/g, "").trim();
  
  // Split into words
  const words = cleanName.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "A";
  
  // Generic prefix words to skip if there are additional words (e.g. Pohon Gaharu -> Gaharu)
  const prefixesToSkip = new Set(["pohon", "bunga", "tanaman", "kayu"]);
  
  let targetWord = words[0];
  if (words.length > 1 && prefixesToSkip.has(words[0].toLowerCase())) {
    targetWord = words[1];
  }
  
  const firstChar = targetWord.charAt(0).toUpperCase();
  return /[A-Z0-9]/.test(firstChar) ? firstChar : "A";
}

export function getClientFallbackRiddle(excludedPlants: string[] = []) {
  const excludedLower = excludedPlants.map((p) => p.toLowerCase());
  let available = LOCAL_RIDDLES.filter(
    (r) => !excludedLower.includes(r.plantName.toLowerCase())
  );
  if (available.length === 0) {
    available = LOCAL_RIDDLES;
  }
  const fallback = available[Math.floor(Math.random() * available.length)];
  const firstLetter = getPlantFirstLetter(fallback.plantName);
  const encodedPlant = Buffer.from(fallback.plantName).toString("base64");

  return {
    riddle: fallback.riddle,
    clues: fallback.clues,
    category: fallback.category,
    difficulty: fallback.difficulty,
    funFact: fallback.funFact,
    firstLetter,
    encodedPlant,
    id: "fallback_" + Date.now().toString() + "_" + Math.floor(Math.random() * 100),
    isFallback: true,
  };
}
