function scrubSpoilers(text, plantName) {
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

  console.log("Text before:", text);
  console.log("Variations to scrub:", variations);

  for (const variant of variations) {
    const escaped = variant.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    scrubbed = scrubbed.replace(regex, replacement);
    console.log("After word boundary replace:", scrubbed);
    
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
    console.log("After simple replace:", scrubbed);
  }

  return scrubbed;
}

const riddle = "Aku berdiri kokoh di perbatasan darat dan laut, menghadapi deburan ombak pasang setiap hari. Akarku menjulur keluar dari batang bagaikan kaki-kaki kepiting raksasa yang mencengkeram erat lumpur pantai untuk melindungi daratan dari ancaman abrasi.";
const result = scrubSpoilers(riddle, "Mangrove");
console.log("Result:", result);
