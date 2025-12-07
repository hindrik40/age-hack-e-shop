export interface AntiAgingIngredient {
  name: string;
  category: string;
  description: string;
  benefits: string[];
  usage: string;
  concentration: string;
  skinType: string[];
  timeToResults: string;
  scientificEvidence: string;
}

export const antiAgingIngredients: AntiAgingIngredient[] = [
  {
    name: 'Retinol (Vitamin A)',
    category: 'Retinoider',
    description: 'Guldstandarden inom anti-aging. Retinol är en fettsyra-form av vitamin A som konverteras till retinsyra i huden.',
    benefits: ['Stimulerar kollagenproduktion', 'Reducerar rynkor och fina linjer', 'Förbättrar hudstruktur', 'Minskar pigmentfläckar'],
    usage: 'Används på kvällen efter rengöring. Börja med låg koncentration 2-3 gånger per vecka.',
    concentration: '0.3% - 1.0% för bästa resultat',
    skinType: ['Alla hudtyper utom mycket känslig', 'Åldrande hud', 'Acne-benägen hud'],
    timeToResults: '8-12 veckor för synliga resultat',
    scientificEvidence: 'Över 40 års klinisk forskning visar signifikant förbättring av rynkdjup och hudtjocklek.'
  },
  {
    name: 'Hyaluronsyra',
    category: 'Återfuktning',
    description: 'En naturlig substans i huden som kan binda upp till 1000 gånger sin vikt i vatten.',
    benefits: ['Djup återfuktning', 'Fyller ut fina linjer', 'Förbättrar hudelasticitet', 'Stärker hudbarriären'],
    usage: 'Kan användas morgon och kväll. Applicera på fuktig hud för bästa effekt.',
    concentration: 'Multi-molekylär: Låg (50-100 kDa), Medium (500-800 kDa), Hög (1000-1400 kDa)',
    skinType: ['Alla hudtyper', 'Torstig hud', 'Åldrande hud', 'Känslig hud'],
    timeToResults: 'Omedelbar återfuktning, 4-6 veckor för strukturförbättring',
    scientificEvidence: 'Kliniska studier visar 40% minskning av rynkdjup efter 6 veckor.'
  },
  {
    name: 'Vitamin C (L-Ascorbinsyra)',
    category: 'Antioxidanter',
    description: 'En kraftfull antioxidant som skyddar mot fria radikaler och stimulerar kollagenproduktion.',
    benefits: ['Skyddar mot miljöskador', 'Jämnar ut hudtonen', 'Stimulerar kollagen', 'Minskar pigmentfläckar'],
    usage: 'Morgonapplikation under solskydd. Används på rengjord hud.',
    concentration: '15-20% för optimal effektivitet',
    skinType: ['Alla hudtyper utom mycket känslig', 'Pigmenterad hud', 'Solskadad hud'],
    timeToResults: '4-8 veckor för pigmentering, 12 veckor för kollagenstimulering',
    scientificEvidence: 'Dubbelblinda studier visar signifikant förbättring av hudton och kollagennivåer.'
  },
  {
    name: 'Niacinamide (Vitamin B3)',
    category: 'Vitaminer',
    description: 'En mångsidig ingrediens som förbättrar hudbarriären och minskar inflammation.',
    benefits: ['Minimerar porer', 'Reglerar talgproduktion', 'Stärker hudbarriären', 'Minskar rodnad'],
    usage: 'Kan användas morgon och kväll. Kompatibel med de flesta andra ingredienser.',
    concentration: '5-10% för bästa effekt',
    skinType: ['Alla hudtyper', 'Acne-benägen hud', 'Känslig hud', 'Oljig hud'],
    timeToResults: '2-4 veckor för porförminskning, 8 veckor för barriärförbättring',
    scientificEvidence: 'Kliniska studier visar 52% minskning av porstorlek efter 8 veckor.'
  },
  {
    name: 'Peptider (Matrixyl, Argireline)',
    category: 'Signalproteiner',
    description: 'Små proteiner som signalerar till hudceller att producera kollagen och reparera skador.',
    benefits: ['Stimulerar kollagenproduktion', 'Minskar mimiska rynkor', 'Förbättrar hudfasthet', 'Reparerar åldersskador'],
    usage: 'Appliceras morgon och kväll på rengjord hud. Kombinera med antioxidanter.',
    concentration: '3-8% för signalpeptider, 10% för muskelavslappnande peptider',
    skinType: ['Alla hudtyper', 'Åldrande hud', 'Mogen hud'],
    timeToResults: '4-8 veckor för mimiska rynkor, 12 veckor för kollagenökning',
    scientificEvidence: 'Studier visar 68% minskning av rynkdjup med Matrixyl 3000 efter 12 veckor.'
  },
  {
    name: 'Alfa-Hydroxisyror (AHA)',
    category: 'Kemisk exfoliering',
    description: 'Vattenlösliga syror som exfolierar hudens yta och stimulerar cellförnyelse.',
    benefits: ['Exfolierar döda hudceller', 'Stimulerar kollagenproduktion', 'Förbättrar hudtextur', 'Minskar pigmentfläckar'],
    usage: 'Används på kvällen 2-3 gånger per vecka. Följ alltid med solskydd på dagen.',
    concentration: '5-10% för dagligt bruk, 20-30% för professionella behandlingar',
    skinType: ['Normal till torr hud', 'Solskadad hud', 'Pigmenterad hud', 'Åldrande hud'],
    timeToResults: '2-4 veckor för texturförbättring, 6-8 veckor för pigmentering',
    scientificEvidence: 'Kliniska studier visar signifikant förbättring av hudtextur och pigmentering.'
  }
];

export const antiAgingRoutines = {
  morning: [
    'Rengöring med mild rengöringsprodukt',
    'C-Vitamin serum (15-20%)',
    'Hyaluronsyra serum för återfuktning',
    'Solskydd SPF 30+ (viktigaste steget!)'
  ],
  evening: [
    'Dubbelrengöring för att ta bort smink och SPF',
    'Retinol eller AHA (alternera kvällar)',
    'Niacinamide serum för barriärstärkning',
    'Återfuktande kräm med ceramider'
  ],
  weekly: [
    'Kemisk exfoliering 1-2 gånger per vecka',
    'Lermask för djuprengöring',
    'Sheet mask med antioxidanter',
    'Ansiktsmassage för cirkulation'
  ]
};

export const ageSpecificRecommendations = {
  '20-30': {
    focus: 'Förebyggande vård och skydd',
    keyIngredients: ['C-Vitamin', 'Hyaluronsyra', 'Solskydd'],
    routine: 'Enkel rutin med fokus på skydd och återfuktning'
  },
  '30-40': {
    focus: 'Tidiga ålderstecken och kollagenstimulering',
    keyIngredients: ['Retinol', 'Niacinamide', 'Peptider', 'Antioxidanter'],
    routine: 'Lägg till retinol och peptider för kollagenstimulering'
  },
  '40-50': {
    focus: 'Rynkreducering och fasthetsförbättring',
    keyIngredients: ['Högkoncentrerad retinol', 'Peptider', 'Tillväxtfaktorer', 'AHA'],
    routine: 'Avancerad rutin med flera aktiva ingredienser'
  },
  '50+': {
    focus: 'Intensiv reparation och näring',
    keyIngredients: ['Retinaldehyd', 'EGF', 'DNA-enzymer', 'Fettsyror'],
    routine: 'Komplett anti-aging rutin med professionella ingredienser'
  }
};

export const skinConcerns = {
  rynkor: {
    description: 'Linjer och veck i huden orsakade av åldrande och mimik',
    bestIngredients: ['Retinol', 'Peptider', 'Hyaluronsyra', 'AHA'],
    recommendedProducts: ['Retinol Komplex 1.0%', 'Matrixyl 3000 Komplex', 'Multi-Molekylär Hyaluronsyra'],
    applicationTips: 'Använd retinol på kvällen, peptider morgon och kväll'
  },
  pigmentering: {
    description: 'Ojämn hudton, mörka fläckar och solskador',
    bestIngredients: ['C-Vitamin', 'Niacinamide', 'Retinol', 'AHA'],
    recommendedProducts: ['C-Vitamin 20% Serum', 'Niacinamide 10% + Zink', 'Glykolsyra 10% Gel'],
    applicationTips: 'Var konsekvent med solskydd för att förhindra ny pigmentering'
  },
  torrhet: {
    description: 'Brist på fukt och lipider i huden',
    bestIngredients: ['Hyaluronsyra', 'Ceramider', 'Glycerin', 'Fettsyror'],
    recommendedProducts: ['Multi-Molekylär Hyaluronsyra', 'Hyaluronsyra + Panthenol', 'Marint Kollagen Typ I & III'],
    applicationTips: 'Applicera på fuktig hud för bästa absorption'
  },
  'tappad fasthet': {
    description: 'Slapp hud och minskad elasticitet',
    bestIngredients: ['Peptider', 'Retinol', 'Tillväxtfaktorer', 'Niacinamide'],
    recommendedProducts: ['Copper Peptide Serum 1%', 'EGF Epidermal Growth Factor', 'Retinaldehyd Serum 0.1%'],
    applicationTips: 'Massera uppåt och utåt för att stimulera cirkulation'
  }
};