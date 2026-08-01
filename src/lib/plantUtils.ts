export function getNormalizedPlantKey(name: string): string {
  if (!name) return "";
  const lowerName = name.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();

  if (lowerName.includes("rafflesia") || lowerName.includes("patma")) return "Rafflesia";
  if (lowerName.includes("semar") || lowerName.includes("nepenthes") || lowerName.includes("periuk kera")) return "Kantong Semar";
  if (lowerName.includes("bangkai") || lowerName.includes("titan") || lowerName.includes("amorphophallus") || lowerName.includes("suweg")) return "Bunga Bangkai";
  if (lowerName.includes("anggrek") || lowerName.includes("phalaenopsis")) return "Anggrek Bulan";
  if (lowerName.includes("melati") || lowerName.includes("jasminum") || lowerName.includes("menur")) return "Melati";
  if (lowerName.includes("kenanga") || lowerName.includes("ylang") || lowerName.includes("cananga")) return "Kenanga";
  if (lowerName.includes("teratai") || lowerName.includes("lotus") || lowerName.includes("nymphaea")) return "Teratai";
  if (lowerName.includes("rotan") || lowerName.includes("calamus")) return "Rotan";
  if (lowerName.includes("kayu putih") || lowerName.includes("eucalyptus") || lowerName.includes("melaleuca")) return "Kayu Putih";
  if (lowerName.includes("bambu") || lowerName.includes("pring") || lowerName.includes("petung")) return "Bambu";
  if (lowerName.includes("bakau") || lowerName.includes("mangrove") || lowerName.includes("rhizophora")) return "Mangrove";
  if (lowerName.includes("jati") || lowerName.includes("ulin") || lowerName.includes("gaharu") || lowerName.includes("meranti") || lowerName.includes("pinus") || lowerName.includes("mahoni") || lowerName.includes("trembesi")) return "Jati";
  if (lowerName.includes("cempaka") || lowerName.includes("cendana") || lowerName.includes("magnolia") || lowerName.includes("santalum")) return "Cempaka";
  if (lowerName.includes("karet") || lowerName.includes("damar") || lowerName.includes("agathis") || lowerName.includes("hevea")) return "Karet";
  if (lowerName.includes("durian") || lowerName.includes("durio")) return "Durian";

  return "Jati";
}

export function formatPlantName(name: string) {
  if (!name) return { common: "", scientific: null };
  const match = name.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return {
      common: match[1].trim(),
      scientific: match[2].trim()
    };
  }
  
  if (name.toLowerCase() === "rafflesia arnoldii") {
    return {
      common: "Rafflesia",
      scientific: "Rafflesia arnoldii"
    };
  }
  
  return {
    common: name,
    scientific: null
  };
}
