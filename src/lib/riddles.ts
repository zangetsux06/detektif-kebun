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
    plantName: "Kantong Semar",
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
    plantName: "Rafflesia",
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
      "Aku adalah salah satu flora raksasa langka yang sangat dilindungi di hutan Sumatra.",
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
    plantName: "Melati",
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
    plantName: "Kenanga",
    riddle: "Bungaku helai-helai panjang berwarna hijau kekuningan yang terkulai anggun. Keharuman minyak atsiri dari mahkotaku sangat harum merebak, sering dijadikan racikan parfum termasyhur dan taburan bunga selamat datang.",
    clues: [
      "Bungaku berbentuk helai-helai memanjang yang menjuntai terkulai halus.",
      "Minyak dari tubuhku (Ylang-Ylang) diekspor untuk bahan dasar parfum internasional.",
      "Bunganya berubah warna dari hijau muda menjadi kuning keemasan saat matang wangi."
    ],
    category: "Tanaman Hias",
    difficulty: "mudah",
    funFact: "Minyak ekstrak dari bunga ini dikenal secara global dengan nama Ylang-Ylang oil.",
    botanicalFacts: [
      "Nama ilmiahnya Cananga odorata.",
      "Aroma bunganya sangat kuat pada sore dan malam hari.",
      "Pohonnya dapat tumbuh sangat tinggi jika dibiarkan di alam liar."
    ],
    habitat: "Hutan hujan dataran rendah dan pekarangan rumah tropis.",
    localNames: ["Ylang-Ylang", "Nanga", "Kanananga"]
  },
  {
    plantName: "Teratai",
    riddle: "Daunku bundar lebar mengapung tenang di atas permukaan air tenang. Bungaku mekar anggun menjulang di atas air, menghadirkan kedamaian dan keindahan murni di tengah danau maupun kolam.",
    clues: [
      "Aku hidup mengapung di perairan tenang seperti danau, kolam, atau rawa.",
      "Daunku lebar melingkar dilapisi lapisan lilin kedap air.",
      "Bungaku mekar anggun di atas tangkai air berwarna putih, merah muda, atau ungu."
    ],
    category: "Tanaman Air",
    difficulty: "sedang",
    funFact: "Bunga ini mekar di pagi hari dan menguncup rapat kembali saat sore menjelang malam.",
    botanicalFacts: [
      "Memiliki nama ilmiah Nymphaea.",
      "Rongga udara di dalam tangkainya membantu sirkulasi oksigen ke akar di dasar lumpur.",
      "Sering menjadi simbol kemurnian dan keindahan dalam berbagai budaya."
    ],
    habitat: "Perairan tawar tenang, danau, rawa, dan kolam.",
    localNames: ["Lotus", "Tarate", "Seroja"]
  },
  {
    plantName: "Rotan",
    riddle: "Batangku fleksibel berduri tajam merambat liar memanjat kanopi hutan. Meskipun berduri menyergat di alam liar, kayuku yang lentur dan kuat telah dianyam menjadi perabot mebel bermutu tinggi ke seluruh penjuru dunia.",
    clues: [
      "Aku adalah tumbuhan palma merambat yang batang bagian luarnya dipenuhi duri tajam.",
      "Batangku sangat lentur, relatif ringan, namun sangat kuat dan tidak mudah patah.",
      "Banyak dimanfaatkan untuk kerajinan anyaman mebel, kursi, dan perabot rumah."
    ],
    category: "Pohon Hutan",
    difficulty: "sedang",
    funFact: "Indonesia merupakan negara penghasil tanaman ini terbesar di dunia (sekitar 80% pasokan global).",
    botanicalFacts: [
      "Termasuk dalam famili Arecaceae (suku pinang-pinangan).",
      "Memiliki duri cambuk (flagellum) untuk mengait dahan pohon lain saat memanjat.",
      "Dapat tumbuh memanjang hingga puluhan meter di lantai hutan."
    ],
    habitat: "Hutan hujan tropis basah di Kalimantan, Sumatra, dan Sulawesi.",
    localNames: ["Calamus", "Penjalin", "Uwi"]
  },
  {
    plantName: "Kayu Putih",
    riddle: "Kulit batangku berlapis-lapis tipis menyerupai kertas yang mudah mengelupas. Dari remasan daunku, keluar aroma minyak hangat yang menyejukkan tubuh dan meredakan masuk angin keluarga Indonesia.",
    clues: [
      "Kulit batangku berwarna keputihan dan mengelupas seperti helai-helai kertas.",
      "Daunku diekstrak melalui penyulingan menjadi minyak penghangat tubuh yang sangat populer.",
      "Tumbuhan ini banyak dibudidayakan di Pulau Buru dan Maluku."
    ],
    category: "Pohon Hutan",
    difficulty: "mudah",
    funFact: "Minyak penghangat alami dari tanaman ini diproduksi melalui proses penyulingan uap dari daun dan rantingnya.",
    botanicalFacts: [
      "Nama ilmiahnya Melaleuca leucadendra.",
      "Mengandung senyawa cineole yang memberikan efek hangat dan antiseptik.",
      "Tahan terhadap kebakaran hutan ringan karena kulit batangnya yang tebal berlapis."
    ],
    habitat: "Hutan terbuka, savana, dan lahan marginal beriklim tropis.",
    localNames: ["Gelam", "Kayu Gelam", "Minyak Kayu Putih"]
  },
  {
    plantName: "Bambu",
    riddle: "Batangku berongga ruas demi ruas, tumbuh menjulang cepat bagai anak panah menuju langit. Rebung mudaku lezat dimasak, sedangkan batang tuaku yang kokoh menjadi bahan bangunan dan kerajinan khas Nusantara.",
    clues: [
      "Aku tumbuh membentuk rumpun kokoh dengan batang berongga beruas-ruas.",
      "Tunas mudaku (rebung) biasa diolah menjadi hidangan lezat khas daerah.",
      "Merupakan salah satu tumbuhan dengan laju pertumbuhan tercepat di dunia."
    ],
    category: "Pohon Hutan",
    difficulty: "mudah",
    funFact: "Beberapa jenis dari tanaman ini dapat tumbuh hingga 90 cm hanya dalam waktu 24 jam!",
    botanicalFacts: [
      "Termasuk dalam famili Poaceae (rumput-rumputan raksasa).",
      "Akar serabutnya yang rapat sangat efektif mencegah erosi dan tanah longsor.",
      "Digunakan untuk bahan alat musik tradisional seperti angklung dan seruling."
    ],
    habitat: "Tepi sungai, lereng bukit, dan lahan tropis lembap.",
    localNames: ["Pring", "Aur", "Buluh"]
  },
  {
    plantName: "Mangrove",
    riddle: "Akarku mencuat tinggi menyangga batang di atas lumpur muara dan sapuan ombak laut. Aku berdiri sebagai benteng alami pelindung pesisir dari abrasi, serta tempat naungan aman bagi benih ikan dan kepiting pantai.",
    clues: [
      "Aku tumbuh berkelompok di zona pasang surut air laut dan muara sungai.",
      "Memiliki akar tunjang atau akar napas yang mencuat kokoh dari dalam lumpur.",
      "Berfungsi penting mencerap emosi abrasi ombak laut dan menyimpan karbon biru."
    ],
    category: "Tanaman Pesisir",
    difficulty: "sedang",
    funFact: "Hutan pesisir dari tanaman ini menyimpan salah satu cadangan karbon terbesar di planet bumi.",
    botanicalFacts: [
      "Nama ilmiah populernya Rhizophora.",
      "Memiliki mekanisme khusus untuk menyaring garam dari air laut melalui akarnya.",
      "Buahnya (viviparous seed) dapat berkecambah saat masih menempel di pohon."
    ],
    habitat: "Pesisir pantai tropis berlumpur dan muara sungai pasang surut.",
    localNames: ["Bakau", "Panggang", "Canting"]
  },
  {
    plantName: "Jati",
    riddle: "Daunku lebar gugur di musim kemarau panjang untuk menghemat air kehidupan. Batang kayu cokelat keemasanku sangat megah, padat, dan tahan puluhan tahun, menjadikanku raja kayu bahan furnitur dan kapal Nusantara.",
    clues: [
      "Aku meluruhkan daunku (meranggas) saat musim kemarau tiba.",
      "Kayuku berwarna cokelat keemasan dengan serat indah, tahan rayap dan cuaca.",
      "Sangat terkenal sebagai bahan utama mebel ukir Jepara berkualitas dunia."
    ],
    category: "Pohon Hutan",
    difficulty: "sedang",
    funFact: "Pohon ini menggugurkan seluruh daunnya di musim kering untuk mengurangi penguapan air.",
    botanicalFacts: [
      "Nama ilmiahnya Tectona grandis.",
      "Mengandung minyak alami yang membuat kayunya sangat awet dan tahan air.",
      "Membutuhkan waktu puluhan tahun untuk mencapai kematangan kayu terbaik."
    ],
    habitat: "Hutan musim dataran rendah beriklim monsun tropis.",
    localNames: ["Teak", "Jatos", "Djati"]
  },
  {
    plantName: "Cempaka",
    riddle: "Bungaku berbentuk mahkota ramping berwarna kuning keemasan atau putih bersih dengan wangi semerbak harum menyejukkan. Dahulu kerap ditanam di sekitar istana kerajaan dan pekarangan rumah tradisional.",
    clues: [
      "Bungaku berwarna kuning keemasan atau putih dengan aroma wangi yang sangat harum.",
      "Merupakan flora identitas (maskot) dari Provinsi Aceh (Cempaka Kuning/Bungong Jeumpa).",
      "Aroma bunganya sering digunakan untuk wewangian tradisional dan upacara adat."
    ],
    category: "Tanaman Hias",
    difficulty: "mudah",
    funFact: "Bunga ini diabadikan dalam lagu daerah Aceh yang sangat terkenal, 'Bungong Jeumpa'.",
    botanicalFacts: [
      "Nama ilmiahnya Magnolia champaca.",
      "Pohonnya dapat tumbuh menjadi pohon peneduh yang rindang.",
      "Minyak aromatik bunganya digunakan dalam industri wewangian premium."
    ],
    habitat: "Hutan hujan tropis basah dan pekarangan rumah.",
    localNames: ["Bungong Jeumpa", "Cempaka Kuning", "Kantil"]
  },
  {
    plantName: "Karet",
    riddle: "Batangku ditoreh berulir oleh para petani di pagi buta. Dari torehan itu, mengalir cairan getah putih susu (lateks) yang ditampung dalam mangkuk kecil untuk diolah menjadi ban kendaraan dan ban berjalan industri dunia.",
    clues: [
      "Dari batangku yang ditoreh miring, mengalir cairan lateks berwarna putih susu.",
      "Lateks dari tubuhku diolah menjadi bahan baku utama karet alam cair dan ban.",
      "Banyak ditanam dalam perkebunan luas di Sumatra dan Kalimantan."
    ],
    category: "Perkebunan",
    difficulty: "sedang",
    funFact: "Getah alami (lateks) dari pohon ini dipanen dengan cara menyadap atau menoreh kulit batangnya.",
    botanicalFacts: [
      "Nama ilmiahnya Hevea brasiliensis.",
      "Biji pohon ini dapat meletup keras dari buahnya yang masak saat siap menyebar.",
      "Indonesia adalah salah satu produsen getah alam terbesar di dunia."
    ],
    habitat: "Perkebunan tropis dataran rendah dengan curah hujan tinggi.",
    localNames: ["Para", "Pohon Karet", "Lateks"]
  },
  {
    plantName: "Durian",
    riddle: "Kulit buahku dipenuhi duri-duri tajam melingkar bagai perisai baja. Namun di balik zirah berduriku, tersembunyi daging buah berwarna kuning keemasan yang manis, legit, dan beraroma tajam menyengat, menjadikanku Sang Raja Buah Tropis.",
    clues: [
      "Kulit luar buahku tajam berduri keras dan aroma buahku sangat menyengat khas.",
      "Dijuluki secara internasional sebagai 'King of Fruits' (Raja Buah).",
      "Daging buahku berwarna kuning/krem dengan rasa manis legit yang sangat kaya."
    ],
    category: "Buah Tropis",
    difficulty: "sulit",
    funFact: "Aroma tajam dari buah ini membuatnya dilarang dibawa ke dalam beberapa hotel dan transportasi umum di Asia.",
    botanicalFacts: [
      "Nama ilmiahnya Durio zibethinus.",
      "Bunganya mekar di malam hari dan diserbuki oleh kelelawar kecil (chiropterophily).",
      "Pohonnya dapat mencapai tinggi puluhan meter di hutan hujan."
    ],
    habitat: "Hutan tropis basah dataran rendah hingga ketinggian menengah.",
    localNames: ["Duren", "Raja Buah", "King of Fruits"]
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
  const prefixesToSkip = new Set(["pohon", "bunga", "tanaman"]);
  
  let targetWord = words[0];
  if (words.length > 1 && prefixesToSkip.has(words[0].toLowerCase())) {
    targetWord = words[1];
  }
  
  const firstChar = targetWord.charAt(0).toUpperCase();
  return /[A-Z0-9]/.test(firstChar) ? firstChar : "A";
}

import { getNormalizedPlantKey } from "@/components/BotanicalCanvas";

export function getClientFallbackRiddle(excludedPlants: string[] = []) {
  const excludedLower = excludedPlants.map((p) => p.toLowerCase());
  const excludedNormalized = excludedPlants.map((p) => getNormalizedPlantKey(p).toLowerCase());

  let available = LOCAL_RIDDLES.filter((r) => {
    const norm = getNormalizedPlantKey(r.plantName).toLowerCase();
    return (
      !excludedLower.includes(r.plantName.toLowerCase()) &&
      !excludedNormalized.includes(norm)
    );
  });
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
