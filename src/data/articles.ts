export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
};

export const articles: Article[] = [
  {
    id: 1,
    title: "Citrullin: Kväveoxid och Åldrande",
    slug: "citrullin",
    excerpt: "Lär dig hur citrullin påverkar produktionen av kväveoxid och dess betydelse för hjärtats hälsa och åldrande.",
    category: "Anti-aging",
    readTime: "5 min",
    date: "2024-12-02",
    tags: ["Citrullin", "Kväveoxid", "Hjärta", "Åldrande"]
  },
  {
    id: 2,
    title: "De 12 tecknen på åldrande och varför de är viktiga",
    slug: "aging-signs",
    excerpt: "En översikt över de centrala biologiska processer som driver åldrande och hur de påverkar hälsa och livslängd.",
    category: "Vetenskapliga studier > Anti-aging",
    readTime: "8 min",
    date: "2025-01-13",
    tags: ["Åldrande", "Cellbiologi", "Livslängd"]
  },
  {
    id: 3,
    title: "Supplements: Timing och helhetsstrategi",
    slug: "supplement-timing",
    excerpt: "Sammanställning av tillskott, dosering och timing inom ramen för en helhetlig anti-aging-strategi.",
    category: "Vetenskapliga studier > Anti-aging",
    readTime: "6 min",
    date: "2025-01-14",
    tags: ["Tillskott", "Dosering", "Strategi"]
  },
  {
    id: 4,
    title: "Kosttillskott: När och Hur du ska ta dem för Maximal Effekt",
    slug: "supplement-timing-2",
    excerpt: "En komplett praktisk guide för att optimera ditt tillskottsschema. Lär dig vilka tillskott som fungerar tillsammans och vilka som konkurrerar.",
    category: "Näring",
    readTime: "15 min",
    date: "2024-12-02",
    tags: ["Kosttillskott", "Timing", "Praktisk Guide", "Vitaminer", "Interaktioner", "Dagsschema"]
  },
  {
    id: 5,
    title: "Anti-Aging Nutrition: Timing och livsstil",
    slug: "anti-aging-nutrition",
    excerpt: "Evidensbaserade principer kring kost, näringsämnen och timing kopplat till anti-aging.",
    category: "Vetenskapliga studier > Anti-aging",
    readTime: "7 min",
    date: "2025-01-14",
    tags: ["Nutrition", "Timing", "Livsstil"]
  },
  {
    id: 6,
    title: "Mage-tarm-vagusnerven: Din Hjälp till Bättre Hälsa och Längre Liv",
    slug: "vagus-nerve-health",
    excerpt: "Upptäck hur vagusnerven styr ditt autonoma nervsystem och lär dig 10 bevisade metoder för att stimulera den för bättre hälsa och minskad stress.",
    category: "Hälsa",
    readTime: "18 min",
    date: "2024-12-02",
    tags: ["Vagusnerv", "Autonoma nervsystemet", "Stress", "Hälsa", "Andning", "Motion", "Kosttillskott"]
  },
  {
    id: 7,
    title: "Terapeutiska peptider – översikter 2025",
    slug: "therapeutic-peptides-2025",
    excerpt: "Översikt över godkända läkemedel (GLP-1, somatostatin, antimikrobiella peptider) samt nya administrationsvägar (oral, nasal, mikronålar). PMC gratis fulltext.",
    category: "Vetenskapliga studier > Peptidforskning",
    readTime: "10 min",
    date: "2025-01-15",
    tags: ["Peptider", "Terapi", "GLP-1", "Somatostatin", "AMP", "Administrationsvägar"]
  },
  {
    id: 8,
    title: "Recent advances in peptide-based drug development (Nature 2025)",
    slug: "peptide-drug-development-2025",
    excerpt: "Sammanfattar de senaste 24 månaders kliniska prövningar (semaglutid, peptidbaserade lungcancer-vacciner) och leveranssystem (liposomala peptider, PEGylering). Nature fulltext (open).",
    category: "Vetenskapliga studier > Peptidforskning",
    readTime: "12 min",
    date: "2025-02-10",
    tags: ["Peptider", "Forskning", "Semaglutid", "Vaccin", "Liposomer", "PEGylering"]
  },
  {
    id: 9,
    title: "Synthetic Peptides and Peptidomimetics (Int J Mol Sci 2024)",
    slug: "synthetic-peptides-peptidomimetics-2024",
    excerpt: "Fem originalstudier: ny myxinidin-derivat mot cystisk fibros-biofilm, cykliska lipopeptider vs S. aureus & C. albicans (MIC 4 µg/mL). MDPI Special Issue.",
    category: "Vetenskapliga studier > Peptidforskning",
    readTime: "9 min",
    date: "2024-11-20",
    tags: ["AMP", "Biofilm", "Myxinidin", "Lipopeptider", "S. aureus", "C. albicans"]
  },
  {
    id: 10,
    title: "Computer-aided design of non-hemolytic AMP",
    slug: "non-hemolytic-amp-ml",
    excerpt: "Maskininlärningsmodell tränad på >40 000 peptider → 18 nya kandidater med hög selektivitet (IC₅₀ bakterier ≤ 2 µM, <1 % hemolys). PMC gratis.",
    category: "Vetenskapliga studier > Peptidforskning",
    readTime: "8 min",
    date: "2024-10-05",
    tags: ["AMP", "Maskininlärning", "Selektivitet", "IC50", "Hemolys", "PMC"]
  },
  {
    id: 11,
    title: "Turning Back the Clock – Anti-Aging Science in 2025",
    slug: "anti-aging-science-2025",
    excerpt: "En uppdaterad översikt över anti-aging-forskning 2025: sju huvudvägar, AI-acceleration, senolytika, mitokondriepeptider, NAD, reprogrammering och kliniska data.",
    category: "Vetenskapliga studier > Anti-aging",
    readTime: "15 min",
    date: "2025-01-15",
    tags: ["Anti-aging", "Forskning", "Peptider", "Senolytics", "Mitokondrier", "NAD", "AI", "Terapi"]
  },

  {
    id: 13,
    title: "DMAE – Hjärna och Anti-aging: Vetenskaplig sammanställning",
    slug: "dmae-brain-anti-aging",
    excerpt: "Dimetylaminoetanol (DMAE): potentiella effekter på kognition, acetylkolin, neuroprotektion samt hudens fasthet och anti-aging.",
    category: "Vetenskapliga studier > Anti-aging",
    readTime: "6 min",
    date: "2025-01-13",
    tags: ["DMAE", "Neurokemi", "Anti-aging"]
  },
  {
    id: 14,
    title: "Anti-Aging Nutrition: Timing och livsstil",
    slug: "anti-aging-nutrition",
    excerpt: "Evidensbaserade principer kring kost, näringsämnen och timing kopplat till anti-aging.",
    category: "Vetenskapliga studier > Anti-aging",
    readTime: "7 min",
    date: "2025-01-14",
    tags: ["Nutrition", "Timing", "Livsstil"]
  },
  {
    id: 15,
    title: "Supplements: Timing och helhetsstrategi",
    slug: "supplement-timing",
    excerpt: "Sammanställning av tillskott, dosering och timing inom ramen för en helhetlig anti-aging-strategi.",
    category: "Vetenskapliga studier > Anti-aging",
    readTime: "6 min",
    date: "2025-01-14",
    tags: ["Tillskott", "Dosering", "Strategi"]
  }
];