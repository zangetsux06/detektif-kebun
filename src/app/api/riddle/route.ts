import { NextRequest, NextResponse } from "next/server";
import { generateWithCascade } from "@/lib/gemini";

export const dynamic = "force-dynamic";

// Bank data teka-teki lokal premium sebagai fallback jika API Key bermasalah/404/Limit
export const LOCAL_RIDDLES = [
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
    localNames: ["Phalaenopsis amabilis", "Anggrek Bulan Putih"]
  },
  {
    plantName: "Bambu Petung",
    riddle: "Tumbuh tegak menjulang tinggi secara berkelompok, batangku hijau tua berbulu beludru saat muda. Batangku berongga di tengah, bersekat-sekat kuat, dan tunas mudaku sangat lezat dimakan.",
    clues: [
      "Tinggi batangku bisa mencapai 30 meter dengan diameter lingkar batang yang sangat besar.",
      "Kekuatanku luar biasa, menjadikanku pilar bangunan tradisional hingga jembatan penyeberangan sungai.",
      "Merupakan salah satu jenis bambu terbesar di Nusantara, sering digunakan untuk struktur berat."
    ],
    category: "Rumput Raksasa",
    difficulty: "mudah",
    funFact: "Jenis bambu ini adalah yang memiliki diameter terbesar di Indonesia, bisa mencapai lebih dari 20 cm.",
    botanicalFacts: [
      "Tumbuh sangat cepat, dapat bertambah tinggi beberapa sentimeter dalam sehari.",
      "Batangnya sangat elastis sehingga tahan terhadap terpaan angin badai dan gempa.",
      "Memiliki sistem akar serabut yang sangat kuat untuk mengikat air dan mencegah erosi tanah."
    ],
    habitat: "Daerah tropis basah, bantaran sungai, dan lereng perbukitan lembap.",
    localNames: ["Bambu Betung", "Pring Petung", "Buluh Petung"]
  },
  {
    plantName: "Rotan (Calamus)",
    riddle: "Aku tidak berdiri tegak sendiri, melainkan memanjat pohon hutan dengan duri-duri tajam pelindungku. Batangku langsing liat dan sangat fleksibel, setelah dibersihkan durinya aku berubah menjadi perabotan rumah tangga berestetika tinggi.",
    clues: [
      "Batangku sangat panjang merambat di kanopi hutan, berduri rapat untuk pertahanan.",
      "Batangku tidak berongga melainkan padat dan liat, sangat elastis jika dipanaskan.",
      "Indonesia adalah penghasil komoditas anyaman dari tanaman merambat ini terbesar di dunia."
    ],
    category: "Palma Merambat",
    difficulty: "sedang",
    funFact: "Hampir 70% kebutuhan komoditas anyaman ini di seluruh dunia dipasok dari hutan-hutan di kepulauan Indonesia.",
    botanicalFacts: [
      "Merupakan anggota keluarga palem-paleman (Arecaceae) yang tumbuh memanjat.",
      "Menggunakan duri pada pelepah daunnya untuk mencengkeram ranting pohon lain demi mencapai sinar matahari.",
      "Dapat dipanen batangnya tanpa harus menebang pohon inang penyangganya."
    ],
    habitat: "Hutan hujan tropis dataran rendah di Kalimantan, Sumatra, dan Sulawesi.",
    localNames: ["Uai", "Paku Durian", "Calamus Vine"]
  },
  {
    plantName: "Kenanga",
    riddle: "Bungaku kuning kehijauan merumbai layu bagai pita tak beraturan. Namun aromaku sangat harum semerbak memikat hati, menjadikanku bahan baku parfum dunia kelas atas dan minyak esensial aromaterapi.",
    clues: [
      "Kelopak bungaku sempit memanjang berwarna kuning kehijauan dengan aroma manis yang kuat.",
      "Minyak hasil penyulingan bungaku sangat terkenal di dunia wewangian dengan nama Ylang-Ylang.",
      "Ditetapkan sebagai bunga identitas provinsi Sumatra Utara."
    ],
    category: "Tanaman Hias",
    difficulty: "mudah",
    funFact: "Nama ilmiah tanaman ini mencerminkan keharuman aromanya yang luar biasa wangi.",
    botanicalFacts: [
      "Memiliki bunga yang tumbuh bergerombol di ketiak daun pohon yang cukup tinggi.",
      "Kandungan minyak atsirinya berkhasiat menurunkan tekanan darah dan meredakan stres.",
      "Mekar sepanjang tahun di iklim khatulistiwa hangat."
    ],
    habitat: "Hutan tropis dataran rendah basah dengan paparan sinar matahari penuh.",
    localNames: ["Ylang-Ylang", "Kananga", "Bunga Pita Wangi"]
  },
  {
    plantName: "Pohon Jati",
    riddle: "Di musim kemarau panjang, aku menggugurkan seluruh daunku agar tetap bertahan hidup di tanah kering. Kayuku berwarna cokelat keemasan, sangat awet dan tahan serangan rayap, menjadikanku raja kayu untuk perabotan mewah.",
    clues: [
      "Aku meranggas (menggugurkan daun) di musim kemarau sebagai adaptasi kekeringan.",
      "Kayuku mengandung minyak alami berkadar tinggi yang menolak air dan membasmi serangga perusak.",
      "Daunku berukuran sangat lebar dan bertekstur kasar, sering dipakai sebagai pembungkus makanan tradisional."
    ],
    category: "Pohon Hutan",
    difficulty: "sedang",
    funFact: "Meskipun kayunya sangat keras, pohon ini membutuhkan waktu puluhan tahun untuk tumbuh dewasa sepenuhnya.",
    botanicalFacts: [
      "Mengandung silika alami dalam serat kayunya yang melindunginya dari pembusukan.",
      "Memiliki getah merah gelap di dalam batangnya yang melindunginya dari jamur kayu.",
      "Daunnya yang lebar mengandung pigmen merah alami yang sering digunakan sebagai pewarna."
    ],
    habitat: "Hutan musim tropis dengan curah hujan sedang dan tanah berkapur.",
    localNames: ["Jati Jawa", "Teakwood", "Pringgitan"]
  },
  {
    plantName: "Teratai",
    riddle: "Aku hidup dengan tenang mengapung di atas permukaan air tenang. Daunku bundar lebar bagaikan piring hijau raksasa yang menadah embun pagi, sementara bungaku yang anggun berwarna merah jambu mekar indah menyambut hangatnya sinar mentari pagi.",
    clues: [
      "Aku adalah tanaman air dengan rimpang yang tertanam kuat di dasar lumpur kolam.",
      "Daunku yang lebar memiliki lapisan lilin sehingga air tidak bisa membasahinya.",
      "Bungaku mekar megah di atas air dengan kelopak berlapis-lapis berwarna merah muda atau putih."
    ],
    category: "Tanaman Air",
    difficulty: "sedang",
    funFact: "Bunga teratai mekar penuh di pagi hari dan akan menutup kembali saat matahari terbenam.",
    botanicalFacts: [
      "Memiliki nama ilmiah Nymphaea.",
      "Batang berongganya mengalirkan oksigen langsung dari permukaan ke akar di dasar lumpur.",
      "Daun lebar membantu penguapan air yang tinggi serta menghalangi cahaya matahari untuk menjaga suhu kolam."
    ],
    habitat: "Kolam tenang, rawa dataran rendah, atau danau berarus lambat.",
    localNames: ["Lotus", "Nymphaea", "Bunga Padma Air"]
  },
  {
    plantName: "Kayu Putih",
    riddle: "Kulit batangku tebal dan terasa empuk bagaikan gabus putih yang bisa dikelupas lapis demi lapis. Daunku yang lonjong bila diremas akan mengeluarkan aroma hangat menyegarkan yang biasa disuling untuk menjadi minyak pelindung tubuh dari gigitan serangga dan angin dingin.",
    clues: [
      "Batangku berkelupas putih keabu-abuan dan kayunya sangat tahan di tanah gersang.",
      "Daunku disuling secara tradisional untuk menghasilkan minyak kayu putih yang hangat.",
      "Aku tumbuh subur di wilayah kering Maluku dan Nusa Tenggara."
    ],
    category: "Pohon Hutan",
    difficulty: "mudah",
    funFact: "Minyak atsiri dari daun tanaman ini mengandung senyawa sineol yang memberikan sensasi hangat di kulit.",
    botanicalFacts: [
      "Memiliki nama ilmiah Melaleuca cajuputi.",
      "Tahan terhadap kebakaran hutan karena kulit batangnya yang tebal melindungi kambium dalam.",
      "Memiliki bunga berbulu kecil mirip sikat botol berwarna putih kekuningan."
    ],
    habitat: "Hutan sabana kering, tanah berpasir, dan rawa gambut pesisir.",
    localNames: ["Gelam", "Cajuput", "Kayu Gelam"]
  },
  {
    plantName: "Mangrove",
    riddle: "Aku berdiri kokoh di perbatasan darat dan laut, menghadapi deburan ombak pasang setiap hari. Akarku menjulur keluar dari batang bagaikan kaki-kaki kepiting raksasa yang mencengkeram erat lumpur pantai untuk melindungi daratan dari ancaman abrasi.",
    clues: [
      "Aku membentuk hutan bakau pelindung garis pantai dari hantaman ombak laut.",
      "Memiliki akar napas (pneumatofor) yang menyembul ke atas lumpur untuk menghirup oksigen.",
      "Buahku bertunas saat masih menggantung di pohon (vivipari) agar bisa langsung tumbuh saat jatuh ke lumpur."
    ],
    category: "Pohon Pantai",
    difficulty: "sedang",
    funFact: "Hutan mangrove mampu menyerap emisi karbon hingga lima kali lebih banyak dibanding hutan hujan daratan.",
    botanicalFacts: [
      "Memiliki kelenjar khusus pada daun untuk menyaring dan membuang kelebihan garam laut.",
      "Akar tunjangnya yang rapat meredam energi gelombang tsunami secara alami.",
      "Menjadi habitat asri kepiting bakau, udang, dan berbagai burung pesisir."
    ],
    habitat: "Estuari berlumpur pasang surut, daerah pesisir pantai tropis, dan muara sungai.",
    localNames: ["Bakau", "Mangal", "Tanjang"]
  },
  {
    plantName: "Cempaka",
    riddle: "Keharumanku sangat melegenda di tanah Nusantara, sering kali diselipkan di daun telinga atau anyaman rambut penari adat tradisional. Bungaku berwarna kuning jingga dengan kelopak runcing memanjang yang merebak wangi manis nan magis di sore hari.",
    clues: [
      "Bungaku beraroma sangat harum dan berwarna kuning tua jingga yang mencolok.",
      "Pohonku cukup tinggi dan kayunya sangat baik untuk bahan ukiran tradisional.",
      "Merupakan bunga identitas dari provinsi Aceh dengan sebutan Bungong Jeumpa."
    ],
    category: "Tanaman Hias",
    difficulty: "mudah",
    funFact: "Bunga ini disuling untuk industri parfum mewah dunia karena minyak atsirinya yang sangat pekat dan wangi.",
    botanicalFacts: [
      "Memiliki nama ilmiah Magnolia champaca dari famili Magnoliaceae.",
      "Tumbuh subur di daerah tropis basah dengan penyinaran matahari sedang.",
      "Biji bunganya berwarna merah cerah yang disukai burung hutan."
    ],
    habitat: "Pinggiran hutan hujan tropis basah dan pekarangan rumah pedesaan Nusantara.",
    localNames: ["Bungong Jeumpa", "Kantil Kuning", "Campaka"]
  },
  {
    plantName: "Karet",
    riddle: "Kulit batangku sengaja disayat miring oleh para petani di pagi hari yang buta. Dari sayatan itu, meneteslah cairan putih kental bagaikan susu yang ditampung dalam mangkuk kecil untuk diolah menjadi bahan ban kendaraan di seluruh penjuru dunia.",
    clues: [
      "Aku menghasilkan getah putih (lateks) yang merupakan bahan baku karet alam utama.",
      "Sayatan spiral pada kulit batangku dilakukan secara berkala tanpa mematikan pohon.",
      "Tumbuh tinggi dengan tajuk rindang di perkebunan-perkebunan besar Sumatra dan Kalimantan."
    ],
    category: "Pohon Industri",
    difficulty: "sedang",
    funFact: "Lateks disadap pada pagi hari karena tekanan turgor sel tanaman paling tinggi sehingga getah mengalir deras.",
    botanicalFacts: [
      "Memiliki nama ilmiah Hevea brasiliensis.",
      "Buahnya berupa polong keras yang akan meledak saat matang untuk melontarkan bijinya.",
      "Mengalami gugur daun musiman di bawah pengaruh cuaca kering."
    ],
    habitat: "Perkebunan tropis dataran rendah berdrainase baik dengan curah hujan tinggi.",
    localNames: ["Pohon Rambung", "Hevea", "Getah Karet"]
  },
  {
    plantName: "Durian",
    riddle: "Aku dijuluki sebagai raja dari segala buah di rimba raya. Kulit buahku dipenuhi duri-duri tajam yang kokoh melindunginya. Namun di balik pelindung seram itu, tersimpan daging buah berwarna kuning mentega beraroma manis menyengat yang sangat memikat lidah.",
    clues: [
      "Aku adalah Raja Buah (King of Fruit) yang sangat terkenal di Asia Tenggara.",
      "Buahku tumbuh menggantung di dahan pohon raksasa yang tinggi.",
      "Aroma buahku sangat tajam dan membagi opini orang antara sangat suka atau benci."
    ],
    category: "Pohon Buah",
    difficulty: "sulit",
    funFact: "Duri pada kulit buahnya berfungsi melindungi biji di dalamnya dari hewan pemakan buah sebelum biji matang sempurna.",
    botanicalFacts: [
      "Memiliki nama ilmiah Durio zibethinus.",
      "Bunga durian mekar di malam hari dan diserbuki oleh kelelawar pemakan nektar.",
      "Pohonnya dapat mencapai umur ratusan tahun dengan tinggi lebih dari 45 meter."
    ],
    habitat: "Hutan hujan tropis dataran rendah berhumus tebal.",
    localNames: ["Duren", "Raja Buah", "Ambetan"]
  }
];

export const FLORA_POOL = [
  "Rafflesia arnoldii", "Kantong Semar (Nepenthes)", "Melati Putih", "Anggrek Bulan",
  "Bambu Petung", "Rotan (Calamus)", "Kenanga", "Pohon Jati", "Bunga Bangkai",
  "Teratai", "Kayu Putih", "Mangrove", "Cempaka", "Karet", "Durian"
];

// Helper to get the first letter of a plant name, skipping common prefixes like Pohon, Bunga, Tanaman
export function getPlantFirstLetter(name: string): string {
  const baseName = name.replace(/^(pohon|bunga|tanaman)\s+/i, "");
  const cleanName = baseName.replace(/[^a-zA-Z\s]/g, "").trim();
  return cleanName.charAt(0).toUpperCase() || "?";
}

// Programmatic scrubber to remove any accidental plant name spoilers/leaks in riddles, clues, or fun facts
export function scrubSpoilers(text: string, plantName: string): string {
  if (!text) return text;
  
  let scrubbed = text;
  const variations = [plantName];
  
  // Clean parentheses and extract individual key terms
  const cleanParts = plantName.replace(/[()]/g, " ").split(/\s+/).map(w => w.trim()).filter(Boolean);
  if (cleanParts.length > 1) {
    variations.push(cleanParts.join(" "));
  }
  
  // Kata-kata umum Bahasa Indonesia yang TIDAK boleh di-scrub
  // (meskipun muncul sebagai bagian dari nama tanaman)
  const commonWords = new Set([
    "pohon", "bunga", "tanaman", "putih", "hitam", "merah", "kuning", "hijau",
    "besar", "kecil", "wangi", "papua", "bulan", "jati", "aren", "rotan",
    "bambu", "kayu", "daun", "batu", "air", "akar", "batang", "hutan",
    "rawa", "pantai", "laut", "sungai", "gunung", "pulau", "timur", "barat",
    "utara", "selatan", "petung", "ulin", "pandan", "teratai", "lotus",
  ]);
  cleanParts.forEach(word => {
    const lowerWord = word.toLowerCase();
    // Hanya scrub kata spesifik dengan panjang ≥5 karakter dan bukan kata umum
    if (word.length >= 5 && !commonWords.has(lowerWord)) {
      variations.push(word);
    }
  });

  // Sort variations descending by length to scrub longest terms first
  variations.sort((a, b) => b.length - a.length);

  // Determine standard pronoun
  const lowerName = plantName.toLowerCase();
  let replacement = "tanaman ini";
  if (lowerName.includes("pohon")) {
    replacement = "pohon ini";
  } else if (lowerName.includes("bunga") || lowerName.includes("melati") || lowerName.includes("anggrek") || lowerName.includes("kenanga")) {
    replacement = "bunga ini";
  }

  for (const variant of variations) {
    // 1. Match word boundary if possible
    const escaped = variant.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    scrubbed = scrubbed.replace(regex, replacement);
    
    // 2. Safe partial replacement (prevent replacement inside words like "sejati")
    const simpleRegex = new RegExp(escaped, "gi");
    scrubbed = scrubbed.replace(simpleRegex, (match) => {
      const index = scrubbed.indexOf(match);
      if (index > 0) {
        const charBefore = scrubbed[index - 1];
        if (/[a-zA-Z]/.test(charBefore)) return match;
      }
      if (index + match.length < scrubbed.length) {
        const charAfter = scrubbed[index + match.length];
        if (/[a-zA-Z]/.test(charAfter)) return match;
      }
      return replacement;
    });
  }

  return scrubbed;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const excludeParam = searchParams.get("exclude") || "";
    const excludedPlants = excludeParam 
      ? excludeParam.split(",").map(p => decodeURIComponent(p).trim().toLowerCase()) 
      : [];

    // Filter available flora pool
    let availableFlora = FLORA_POOL.filter(p => !excludedPlants.includes(p.toLowerCase()));
    
    // If all flora have been discovered, reset the pool to avoid empty options
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

    const text = await generateWithCascade(prompt, true);

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

    // Validasi kelengkapan data hasil parsing untuk menghindari soal kosong di client
    if (!parsed || typeof parsed !== "object" || !parsed.riddle || !parsed.clues || !parsed.funFact || !parsed.category || !parsed.difficulty) {
      throw new Error("Respons JSON dari Gemini tidak lengkap atau cacat.");
    }

    const firstLetter = getPlantFirstLetter(selectedPlant);
    const encodedPlant = Buffer.from(selectedPlant).toString("base64");

    // Scrub any accidental leaks from the Gemini response content
    const scrubbedRiddle = scrubSpoilers(parsed.riddle, selectedPlant);
    const scrubbedClues = Array.isArray(parsed.clues) 
      ? parsed.clues.map((c: string) => scrubSpoilers(c, selectedPlant)) 
      : [];
    const scrubbedFunFact = scrubSpoilers(parsed.funFact, selectedPlant);

    return NextResponse.json({
      riddle: scrubbedRiddle,
      clues: scrubbedClues,
      category: parsed.category,
      difficulty: parsed.difficulty,
      funFact: scrubbedFunFact,
      firstLetter,
      encodedPlant,
      id: Date.now().toString(),
    });
  } catch (error) {
    console.warn("⚠️ Gagal memanggil Gemini API, beralih ke Fallback Database Lokal:", (error as Error).message || error);
    
    const { searchParams } = new URL(request.url);
    const excludeParam = searchParams.get("exclude") || "";
    const excludedPlants = excludeParam 
      ? excludeParam.split(",").map(p => decodeURIComponent(p).trim().toLowerCase()) 
      : [];

    // Filter available local riddles
    let availableLocal = LOCAL_RIDDLES.filter(r => !excludedPlants.includes(r.plantName.toLowerCase()));
    
    // Reset pool if all local riddles have been answered
    if (availableLocal.length === 0) {
      availableLocal = LOCAL_RIDDLES;
    }

    const fallback = availableLocal[Math.floor(Math.random() * availableLocal.length)];
    const firstLetter = getPlantFirstLetter(fallback.plantName);
    const encodedPlant = Buffer.from(fallback.plantName).toString("base64");

    return NextResponse.json({
      riddle: scrubSpoilers(fallback.riddle, fallback.plantName),
      clues: fallback.clues.map(c => scrubSpoilers(c, fallback.plantName)),
      category: fallback.category,
      difficulty: fallback.difficulty,
      funFact: scrubSpoilers(fallback.funFact, fallback.plantName),
      firstLetter,
      encodedPlant,
      id: "local_" + Date.now().toString() + "_" + Math.floor(Math.random() * 100),
      isFallback: true
    });
  }
}
