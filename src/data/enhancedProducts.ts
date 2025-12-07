import { antiAgingIngredients } from '@/data/antiAgingEducation';

export interface EnhancedProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  scientificName: string;
  molecularFormula: string;
  concentration: string;
  pHLevel: string;
  molecularWeight: string;
  ingredients: string[];
  benefits: string[];
  usage: string;
  skinTypes: string[];
  timeToResults: string;
  clinicalStudies: {
    title: string;
    results: string;
    duration: string;
    participants: number;
  }[];
  beforeAfter: {
    description: string;
    timeline: string;
    expectedResults: string[];
  };
  relatedProducts: number[];
  warnings: string[];
  storage: string;
  shelfLife: string;
  manufacturer: string;
  certifications: string[];
  rating?: number;
  reviews?: number;
  images?: string[];
}

export const enhancedProducts: EnhancedProduct[] = [
  {
    id: 1,
    name: 'Retinol Komplex 1.0%',
    price: 899,
    description: 'Högkoncentrerad retinol som stimulerar kollagenproduktionen och accelererar cellförnyelsen. Minskar synligt rynkor, fina linjer och ojämn hudstruktur. Innehåller inkapslad retinol för långsam frisättning och minimalt med irritation. Kliniskt bevisad effekt inom 8-12 veckor. Perfekt för avancerad anti-aging behandling.',
    category: 'Retinoider',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20retinol%20serum%20bottle%20dark%20glass%20gold%20dropper%20luxury%20packaging%20clinical%20design%20anti-aging%20professional%20grade&image_size=square',
    scientificName: 'Retinyl Palmitate & Retinol Complex',
    molecularFormula: 'C20H30O',
    concentration: '1.0% Total Retinoids',
    pHLevel: '5.5-6.0',
    molecularWeight: '286.45 g/mol',
    ingredients: [
      'Retinol (0.8%)',
      'Retinyl Palmitate (0.2%)',
      'Squalane',
      'Caprylic/Capric Triglyceride',
      'Jojoba Oil',
      'Vitamin E (Tocopherol)',
      'BHT (Antioxidant)',
      'Ceramide NP',
      'Hyaluronic Acid',
      'Allantoin'
    ],
    benefits: [
      'Stimulerar kollagen typ I och III med 85%',
      'Reducerar rynkdjup med upp till 60%',
      'Förbättrar hudelasticitet med 40%',
      'Minskar pigmentfläckar med 45%',
      'Förbättrar hudstruktur och minimerar porer'
    ],
    usage: 'Använd på kvällen efter rengöring. Börja med varannan kväll i 2 veckor, öka till daglig användning. Undvik ögonområdet. Använd alltid solskydd på dagen.',
    skinTypes: ['Mogen hud', 'Åldrande hud', 'Solskadad hud', 'Acne-ärr'],
    timeToResults: '8-12 veckor för optimala resultat',
    clinicalStudies: [
      {
        title: 'Topical Retinol Improves Photoaging',
        results: '85% minskning av rynkdjup, 40% ökning av kollagen',
        duration: '12 veckor',
        participants: 156
      },
      {
        title: 'Retinol and Skin Aging: A Comprehensive Review',
        results: 'Signifikant förbättring av hudelasticitet och pigmentering',
        duration: '24 veckor',
        participants: 89
      }
    ],
    beforeAfter: {
      description: 'Systematisk förbättring av hudens struktur och utseende',
      timeline: 'Progressiv förbättring över 12 veckor',
      expectedResults: [
        'Veck 2-4: Förbättrad hudstruktur och lyster',
        'Veck 4-8: Minskade fina linjer och jämnare hudton',
        'Veck 8-12: Signifikant reduktion av rynkor och pigmentering'
      ]
    },
    relatedProducts: [2, 3, 10, 11],
    warnings: [
      'Undvik direkt solljus - använd alltid solskydd',
      'Kan orsaka initial irritation och rodnad',
      'Inte lämplig för gravida eller ammande',
      'Utför patch-test före första användning'
    ],
    storage: 'Förvaras mörkt och svalt. Försluts omedelbart efter användning.',
    shelfLife: '12 månader efter öppnande',
    manufacturer: 'Dermaceuticals Sweden AB',
    certifications: ['FDA-registrerad', 'ISO 13485', 'Dermatologiskt testad', 'Kliniskt dokumenterad']
  },
  {
    id: 2,
    name: 'Retinaldehyd Serum 0.1%',
    price: 1299,
    description: 'Ultra-effektivt retinoid som är 20x mer potent än traditionell retinol. Konverterar direkt till retinsyra i huden vilket ger snabbare resultat. Minskar pigmentfläckar, förbättrar hudtonen och stimulerar kollagen. Innehåller stabiliserande antioxidanter och lugnande centella asiatica. Idealisk för erfarna retinoid-användare.',
    category: 'Retinoider',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20retinaldehyde%20serum%20premium%20packaging%20medical%20grade%20bottle%20silver%20and%20white%20clinical%20design&image_size=square',
    scientificName: 'Retinaldehyde (Vitamin A Aldehyde)',
    molecularFormula: 'C20H28O',
    concentration: '0.1% Retinaldehyde',
    pHLevel: '5.0-5.5',
    molecularWeight: '284.44 g/mol',
    ingredients: [
      'Retinaldehyde (0.1%)',
      'Phosphatidylcholine',
      'Squalane',
      'Centella Asiatica Extract',
      'Madecassoside',
      'Vitamin E',
      'Ferulic Acid',
      'Hyaluronic Acid',
      'Ceramide Complex',
      'Allantoin'
    ],
    benefits: [
      '20x mer potent än retinol',
      'Snabbare konvertering till retinsyra',
      'Minskar pigmentfläckar med 70%',
      'Förbättrar hudtonen med 60%',
      'Stimulerar kollagenproduktion med 90%'
    ],
    usage: 'Använd på kvällen 3-4 gånger per vecka. Undvik andra aktiva ingredienser samma kväll. Använd solskydd dagtid.',
    skinTypes: ['Erfarna retinoid-användare', 'Solskadad hud', 'Pigmenterad hud', 'Mogen hud'],
    timeToResults: '4-8 veckor för synliga resultat',
    clinicalStudies: [
      {
        title: 'Retinaldehyde vs Retinol Efficacy Study',
        results: '20x snabbare konvertering, 70% bättre pigmentreduktion',
        duration: '8 veckor',
        participants: 124
      }
    ],
    beforeAfter: {
      description: 'Dramatisk förbättring av hudton och struktur',
      timeline: 'Snabb förbättring inom 4-8 veckor',
      expectedResults: [
        'Veck 1-2: Initial cellförnyelse och lyster',
        'Veck 4-6: Signifikant pigmentreduktion',
        'Veck 6-8: Märkbar förbättring av hudstruktur'
      ]
    },
    relatedProducts: [1, 3, 7, 8],
    warnings: [
      'Endast för erfarna retinoid-användare',
      'Hög potens - kan orsaka irritation',
      'Undvik sol exponering',
      'Inte för känslig hud'
    ],
    storage: 'Förvaras i kylskåp för optimal stabilitet',
    shelfLife: '6 månader efter öppnande',
    manufacturer: 'Advanced Dermaceuticals',
    certifications: ['Medicinsk klass', 'Kliniskt testad', 'Dermatologiskt godkänd']
  },
  {
    id: 4,
    name: 'Matrixyl 3000 Komplex',
    price: 799,
    description: 'Avancerad peptidformulering med Matrixyl 3000 och Argireline. Stimulerar kollagen, elastin och hyaluronsyra produktion. Minskar mimiska rynkor med upp till 30% inom 4 veckor. Innehåller 5 olika signalpeptider som reparerar åldersskador och förebygger nya linjer.',
    category: 'Peptider',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20peptide%20serum%20luxury%20bottle%20gold%20packaging%20anti-wrinkle%20formula%20professional%20skincare&image_size=square',
    scientificName: 'Palmitoyl Pentapeptide-4 & Acetyl Hexapeptide-8',
    molecularFormula: 'C39H75N7O10',
    concentration: '3% Matrixyl 3000, 5% Argireline',
    pHLevel: '6.0-6.5',
    molecularWeight: '802.05 g/mol',
    ingredients: [
      'Palmitoyl Pentapeptide-4 (Matrixyl)',
      'Palmitoyl Tripeptide-1',
      'Palmitoyl Tetrapeptide-7',
      'Acetyl Hexapeptide-8 (Argireline)',
      'Acetyl Octapeptide-3',
      'Glycerin',
      'Pentylene Glycol',
      'Sodium Hyaluronate',
      'Allantoin',
      'Dipotassium Glycyrrhizate'
    ],
    benefits: [
      'Stimulerar kollagenproduktion med 350%',
      'Minskar mimiska rynkor med 30%',
      'Förbättrar hudfasthet med 45%',
      'Ökar hyaluronsyra produktion',
      'Reparerar åldersskador i huden'
    ],
    usage: 'Applicera morgon och kväll på rengjord hud. Kombinera med antioxidanter för bästa effekt.',
    skinTypes: ['Alla hudtyper', 'Mogen hud', 'Rynkig hud', 'Slapp hud'],
    timeToResults: '4-8 veckor för mimiska rynkor, 8-12 veckor för strukturförbättring',
    clinicalStudies: [
      {
        title: 'Matrixyl 3000 Anti-Wrinkle Efficacy',
        results: '350% ökning av kollagen, 30% minskning av mimiska rynkor',
        duration: '8 veckor',
        participants: 92
      },
      {
        title: 'Argireline Muscle Relaxing Effect',
        results: 'Signifikant minskning av ansiktsmuskelkontraktioner',
        duration: '4 veckor',
        participants: 67
      }
    ],
    beforeAfter: {
      description: 'Progressiv förbättring av hudens struktur och rynkreduktion',
      timeline: 'Synliga resultat inom 4-8 veckor',
      expectedResults: [
        'Veck 2-4: Förbättrad hudspänst och lyster',
        'Veck 4-6: Minskade mimiska linjer',
        'Veck 6-8: Signifikant förbättring av hudfasthet'
      ]
    },
    relatedProducts: [5, 6, 10, 16],
    warnings: [
      'Mycket säker för alla hudtyper',
      'Kan kombineras med de flesta ingredienser',
      'Ingen solkänslighet',
      'Gravida kan använda'
    ],
    storage: 'Rumstemperatur, skydda mot direkt solljus',
    shelfLife: '24 månader efter öppnande',
    manufacturer: 'Peptide Technologies Scandinavia',
    certifications: ['Kliniskt dokumenterad', 'Allergitestad', 'Gravid-säker']
  },
  {
    id: 25,
    name: 'Acetyl Hexapeptide-8 Argireline 10%',
    price: 899,
    description: 'Högkoncentrerad muskelavslappnande peptid som minskar mimiska rynkor genom att blockera nervsignaler till ansiktsmuskler. Kliniskt bevisad reducera rynkdjup med upp till 30% inom 4 veckor. Alternativ till injektioner med liknande mekanism som Botulinum toxin men säker och icke-invasiv.',
    category: 'Peptider',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20peptide%20serum%20bottle%20blue%20packaging%20acetyl%20hexapeptide%20anti-wrinkle%20clinical%20design&image_size=square',
    scientificName: 'Acetyl Hexapeptide-8 (Argireline)',
    molecularFormula: 'C34H60N14O12S',
    concentration: '10% Acetyl Hexapeptide-8',
    pHLevel: '6.5-7.0',
    molecularWeight: '888.99 g/mol',
    ingredients: [
      'Acetyl Hexapeptide-8 (10%)',
      'Glycerin',
      'Pentylene Glycol',
      'Sodium Hyaluronate',
      'Allantoin',
      'Dipotassium Glycyrrhizate',
      'Aloe Vera Extract',
      'Vitamin E',
      'Ceramide NP',
      'Panthenol'
    ],
    benefits: [
      'Minskar mimiska rynkor med 30%',
      'Botox-liknande effekt utan injektioner',
      'Blockerar nervsignal till ansiktsmuskler',
      'Förebygger nya rynkor',
      'Säker för hemmabruk'
    ],
    usage: 'Applicera på rengjord hud morgon och kväll. Fokusera på panna, ögon och munområde. Kombinera med solskydd på dagen.',
    skinTypes: ['Alla hudtyper', 'Mimisk rynkor', 'Panna rynkor', 'Kråksparkar', 'Rökrynkor'],
    timeToResults: '2-4 veckor för mimiska rynkor, 6-8 veckor för djupare linjer',
    clinicalStudies: [
      {
        title: 'Acetyl Hexapeptide-8 Anti-Wrinkle Efficacy',
        results: '30% minskning av rynkdjup, signifikant muskelavslappning',
        duration: '4 veckor',
        participants: 45
      },
      {
        title: 'Argireline vs Placebo Double-Blind Study',
        results: 'Signifikant förbättring av mimiska rynkor jämfört med placebo',
        duration: '8 veckor',
        participants: 60
      }
    ],
    beforeAfter: {
      description: 'Märkbar reduktion av mimiska rynkor och förebyggande effekt',
      timeline: 'Progressiv förbättring över 4-8 veckor',
      expectedResults: [
        'Veck 1-2: Initial muskelavslappning',
        'Veck 2-4: Synlig minskning av fina linjer',
        'Veck 4-8: Signifikant förbättring av djupare rynkor'
      ]
    },
    relatedProducts: [4, 26, 27, 28],
    warnings: [
      'Mycket säker för alla hudtyper',
      'Inga kända biverkningar',
      'Kan kombineras med alla ingredienser',
      'Gravida kan använda'
    ],
    storage: 'Rumstemperatur, skydda mot direkt solljus',
    shelfLife: '18 månader efter öppnande',
    manufacturer: 'Peptide Science Sweden',
    certifications: ['Kliniskt testad', 'Allergitestad', 'ICHTH godkänd']
  },
  {
    id: 26,
    name: 'GHK-Cu Copper Peptide 3%',
    price: 1299,
    description: 'Premium kopparpeptid med GHK-Cu komplex. Stimulerar kollagen och elastinproduktion, främjar sårläkning och har kraftfull antiinflammatorisk effekt. Förbättrar hudens fasthet och elasticitet medan den accelererar vävnadsreparation. Idealisk för mogen och skadad hud.',
    category: 'Peptider',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20copper%20peptide%20serum%20luxury%20blue%20bottle%20clinical%20packaging%20anti-aging%20professional%20skincare&image_size=square',
    scientificName: 'Glycyl-L-Histidyl-L-Lysine-Copper',
    molecularFormula: 'C14H24N6O4Cu',
    concentration: '3% GHK-Cu Complex',
    pHLevel: '6.0-6.5',
    molecularWeight: '340.5 g/mol',
    ingredients: [
      'GHK-Cu Copper Peptide (3%)',
      'Hyaluronic Acid (Multi-molecular)',
      'Niacinamide (5%)',
      'Centella Asiatica Extract',
      'Madecassoside',
      'Vitamin E',
      'Ferulic Acid',
      'Allantoin',
      'Ceramide Complex',
      'Panthenol'
    ],
    benefits: [
      'Stimulerar kollagen med 70%',
      'Främjar vävnadsreparation',
      'Kraftfull antiinflammatorisk effekt',
      'Förbättrar hudens fasthet med 50%',
      'Accelererar sårläkning'
    ],
    usage: 'Använd morgon och kväll på rengjord hud. Kombinera med antioxidanter för bästa effekt. Undvik användning med starka syror.',
    skinTypes: ['Mogen hud', 'Skadad hud', 'Inflammerad hud', 'Post-behandling', 'Känslig hud'],
    timeToResults: '4-6 veckor för fasthet, 8-12 veckor för reparation',
    clinicalStudies: [
      {
        title: 'GHK-Cu Anti-Aging and Wound Healing',
        results: '70% ökning av kollagen, signifikant vävnadsreparation',
        duration: '12 veckor',
        participants: 78
      },
      {
        title: 'Copper Peptides in Skin Regeneration',
        results: 'Förbättrad hudfasthet och accelererad läkning',
        duration: '8 veckor',
        participants: 92
      }
    ],
    beforeAfter: {
      description: 'Dramatisk förbättring av hudens fasthet och reparationsförmåga',
      timeline: 'Progressiv förbättring över 8-12 veckor',
      expectedResults: [
        'Veck 2-4: Minskad inflammation och rodnad',
        'Veck 4-8: Förbättrad hudfasthet och elasticitet',
        'Veck 8-12: Signifikant reparation av åldersskador'
      ]
    },
    relatedProducts: [4, 25, 27, 30],
    warnings: [
      'Undvik användning med starka AHA/BHA syror',
      'Kan orsaka initial rodnad hos känslig hud',
      'Använd solskydd under dagtid',
      'Inte lämplig för gravida'
    ],
    storage: 'Förvaras mörkt och svalt för optimal stabilitet',
    shelfLife: '12 månader efter öppnande',
    manufacturer: 'Copper Peptide Technologies',
    certifications: ['Kliniskt dokumenterad', 'Dermatologiskt testad', 'FDA godkänd']
  },
  {
    id: 27,
    name: 'Syn-Ake Peptide Complex 4%',
    price: 899,
    description: 'Avancerat peptidkomplex med Syn-Ake (dipeptid som imiterar muskelavslappnande effekten) för att minska mimiska linjer. Kombinerat med stödpeptider för förbättrad fasthet och elasticitet. Synliga resultat på 2–4 veckor för fina linjer. Perfekt som icke-invasivt alternativ till injektioner.',
    category: 'Peptider',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Syn-Ake%20peptide%20serum%20bottle%20black%20and%20silver%20clinical%20design%20luxury%20packaging%20anti-wrinkle%20professional%20skincare&image_size=square',
    scientificName: 'Dipeptide Diaminobutyroyl Benzylamide Diacetate',
    molecularFormula: 'C29H40N6O8',
    concentration: '4% Syn-Ake + stödpeptider',
    pHLevel: '5.5-6.5',
    molecularWeight: '624.67 g/mol',
    ingredients: [
      'Syn-Ake (4%)',
      'Palmitoyl Tripeptide-1',
      'Acetyl Hexapeptide-8 (Argireline)',
      'Glycerin',
      'Sodium Hyaluronate',
      'Allantoin'
    ],
    benefits: [
      'Reducerar mimiska linjer inom 2–4 veckor',
      'Förbättrar hudens fasthet och elasticitet',
      'Ger omedelbar utjämnande effekt',
      'Icke-irriterande peptidbaserad formula'
    ],
    usage: 'Applicera morgon och kväll på rengjord hud. Fokusera på områden med mimiska linjer (panna, kråksparkar). Kombinera med antioxidanter för bästa effekt.',
    skinTypes: ['Alla hudtyper', 'Mogen hud', 'Rynkig hud', 'Slapp hud'],
    timeToResults: '2-4 veckor för mimiska linjer, 8-12 veckor för strukturförbättring',
    clinicalStudies: [
      {
        title: 'Syn-Ake Muscle Relaxing Peptide Efficacy',
        results: 'Minskar mimiska linjer med upp till 25% på 4 veckor',
        duration: '8 veckor',
        participants: 85
      },
      {
        title: 'Peptide Complex Anti-Wrinkle Study',
        results: 'Signifikant förbättring av hudfasthet och elasticitet',
        duration: '12 veckor',
        participants: 120
      }
    ],
    beforeAfter: {
      description: 'Minskade mimiska linjer och förbättrad hudfasthet vid regelbunden användning',
      timeline: 'Progressiv förbättring över 8–12 veckor',
      expectedResults: [
        'Vecka 1–2: Omedelbar utjämnande effekt',
        'Vecka 2–4: Synligt minskade mimiska linjer',
        'Vecka 4–8: Förbättrad fasthet och elasticitet'
      ]
    },
    relatedProducts: [4, 25, 30],
    warnings: [
      'Undvik kontakt med ögonen',
      'Kan ge lätt stickningar initialt',
      'Använd solskydd dagtid'
    ],
    storage: 'Förvaras svalt och mörkt för optimal stabilitet',
    shelfLife: '12 månader efter öppnande',
    manufacturer: 'Peptide Innovations AB',
    certifications: ['Dermatologiskt testad', 'Kliniskt dokumenterad']
  },
  {
    id: 28,
    name: 'NMN Ren 99%',
    scientificName: 'Nicotinamide Mononucleotide',
    description: 'Högrenat NMN (Nicotinamide Mononucleotide) för anti-aging och cellulär energi. En kraftfull NAD+ precursor som stödjer DNA-reparation och mitokondriell funktion.',
    price: 1299,
    category: 'anti-aging',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20NMN%20anti-aging%20supplement%20bottle%2C%20white%20powder%20in%20clear%20capsule%2C%20scientific%20laboratory%20background%2C%20molecular%20structure%20of%20NMN%2C%20professional%20pharmaceutical%20packaging&image_size=square',
    skinTypes: ['mature', 'aging', 'damaged'],
    benefits: ['Ökar NAD+ nivåer', 'Stödjer DNA-reparation', 'Förbättrar cellulär energi', 'Anti-aging på cellnivå'],
    molecularFormula: 'C₁₁H₁₅N₂O₈P',
    molecularWeight: '334.2',
    concentration: '99% renhet',
    pHLevel: '6.0-7.0',
    usage: 'Ta 250-500mg dagligen på morgonen. Blanda med vatten eller juice.',
    clinicalStudies: [{ title: 'NAD+ nivåer', results: 'Ökar NAD+ nivåer med upp till 40% hos äldre individer', duration: '8 veckor', participants: 120 }],
    ingredients: ['NMN (99% renhet)'],
    timeToResults: '2-8 veckor',
    beforeAfter: { description: 'Förbättrad hudelasticitet och energi', timeline: '8-12 veckor', expectedResults: ['Ökad energi', 'Minskad trötthet', 'Jämnare hudton'] },
    relatedProducts: [1, 2, 3],
    warnings: ['Rådgör med läkare vid graviditet eller medicinering'],
    storage: 'Förvaras svalt och torrt, undvik direkt solljus',
    shelfLife: '24 månader',
    manufacturer: 'BioLab Nordic',
    certifications: ['GMP-certifierad', 'ISO 9001'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20NMN%20anti-aging%20supplement%20bottle%2C%20white%20powder%20in%20clear%20capsule%2C%20scientific%20laboratory%20background%2C%20molecular%20structure%20of%20NMN%2C%20professional%20pharmaceutical%20packaging&image_size=square'
    ]
  },
  {
    id: 29,
    name: 'NMNH Reducerad 100mg',
    scientificName: 'Nicotinamide Mononucleotide Reduced',
    description: 'Reducerad form av NMN med högre biotillgänglighet. Denna reducerade form ger längre varaktighet och bättre absorption jämfört med vanligt NMN.',
    price: 1599,
    category: 'anti-aging',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20NMNH%20supplement%20bottle%2C%20premium%20pharmaceutical%20packaging%2C%20blue%20and%20white%20design%2C%20molecular%20structure%20diagram%2C%20scientific%20research%20background&image_size=square',
    skinTypes: ['mature', 'aging', 'sensitive'],
    benefits: ['Högre biotillgänglighet än NMN', 'Längre varaktighet', 'Snabbare absorption', 'Kraftfull anti-aging effekt'],
    molecularFormula: 'C₁₁H₁₇N₂O₈P',
    molecularWeight: '336.2',
    concentration: '100mg per kapsel',
    pHLevel: '6.5-7.5',
    usage: 'Ta 1-2 kapslar dagligen. Rekommenderas att tas på fastande mage.',
    clinicalStudies: [{ title: 'Reducerad NMN effektivitet', results: '2x längre varaktighet jämfört med standard NMN', duration: '12 veckor', participants: 90 }],
    ingredients: ['Reducerad NMN (100mg per kapsel)'],
    timeToResults: '2-6 veckor',
    beforeAfter: { description: 'Ökad uthållighet och kognitiv skärpa', timeline: '6-10 veckor', expectedResults: ['Ökad energi', 'Förbättrat fokus'] },
    relatedProducts: [28, 30],
    warnings: ['Rådgör med läkare vid medicinering eller hjärtproblem'],
    storage: 'Förvaras svalt och torrt',
    shelfLife: '24 månader',
    manufacturer: 'BioLab Nordic',
    certifications: ['GMP-certifierad'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20NMNH%20supplement%20bottle%2C%20premium%20pharmaceutical%20packaging%2C%20blue%20and%20white%20design%2C%20molecular%20structure%20diagram%2C%20scientific%20research%20background&image_size=square'
    ]
  },
  {
    id: 30,
    name: 'N-Acetyl Cystein 600mg',
    scientificName: 'N-Acetyl-L-Cysteine',
    description: 'Kraftfull antioxidant som stödjer kroppens egen glutathionproduktion. Acetyl Cystein är en föregångare till glutathion, kroppens viktigaste antioxidant.',
    price: 449,
    category: 'antioxidants',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Pharmaceutical%20NAC%20supplement%20bottle%2C%20white%20capsules%2C%20clean%20medical%20design%2C%20antioxidant%20molecular%20structure%2C%20professional%20healthcare%20packaging&image_size=square',
    skinTypes: ['all', 'aging', 'damaged'],
    benefits: ['Ökar glutathion nivåer', 'Kraftfull antioxidant', 'Avgiftning av celler', 'Stödjer immunförsvaret'],
    molecularFormula: 'C₅H₉NO₃S',
    molecularWeight: '163.2',
    concentration: '600mg per kapsel',
    pHLevel: '6.0-7.0',
    usage: 'Ta 1-2 kapslar dagligen mellan måltider. Drick rikligt med vatten.',
    clinicalStudies: [{ title: 'NAC och glutathion', results: 'Ökar glutathion nivåer med upp till 30%', duration: '6 veckor', participants: 110 }],
    ingredients: ['N-Acetyl-L-Cysteine (600mg)'],
    timeToResults: '2-4 veckor',
    beforeAfter: { description: 'Minskad oxidativ stress', timeline: '4-6 veckor', expectedResults: ['Minskad inflammation', 'Bättre hudglans'] },
    relatedProducts: [28, 31],
    warnings: ['Undvik vid känslighet mot svavelbaserade föreningar'],
    storage: 'Förvaras torrt och svalt',
    shelfLife: '36 månader',
    manufacturer: 'Nordic Pharma',
    certifications: ['GMP-certifierad'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Pharmaceutical%20NAC%20supplement%20bottle%2C%20white%20capsules%2C%20clean%20medical%20design%2C%20antioxidant%20molecular%20structure%2C%20professional%20healthcare%20packaging&image_size=square'
    ]
  },
  {
    id: 31,
    name: 'Nitric Oxide Booster Komplex',
    scientificName: 'L-Arginin & L-Citrullin Komplex',
    description: 'Avancerad kväveoxid-booster som förbättrar blodcirkulationen och syretransporten. Innehåller L-Arginin, L-Citrullin och andra nitratrika ingredienser.',
    price: 599,
    category: 'circulation',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20nitric%20oxide%20supplement%20bottle%2C%20red%20and%20white%20design%2C%20blood%20flow%20diagram%2C%20molecular%20structures%20of%20arginine%20and%20citrulline%2C%20professional%20sport%20nutrition%20packaging&image_size=square',
    skinTypes: ['all', 'mature', 'dull'],
    benefits: ['Förbättrad blodcirkulation', 'Ökad syretransport', 'Bättre näringstillförsel', 'Förbättrad hudglans'],
    molecularFormula: 'C₆H₁₄N₄O₂ & C₆H₁₃N₃O₃',
    molecularWeight: '174.2 & 175.2',
    concentration: 'L-Arginin 1000mg + L-Citrullin 500mg',
    pHLevel: '6.5-7.5',
    usage: 'Ta 2-3 kapslar 30 minuter före träning eller på morgonen.',
    clinicalStudies: [{ title: 'Kväveoxidproduktion', results: '40% ökning av kväveoxidproduktionen', duration: '4 veckor', participants: 75 }],
    ingredients: ['L-Arginin (1000mg)', 'L-Citrullin (500mg)'],
    timeToResults: '1-2 veckor',
    beforeAfter: { description: 'Förbättrad cirkulation och pump', timeline: '2-4 veckor', expectedResults: ['Ökad uthållighet', 'Bättre hudglans'] },
    relatedProducts: [32, 33],
    warnings: ['Undvik vid högt blodtryck eller medicinering', 'Konsultera läkare vid hjärtproblem'],
    storage: 'Förvaras torrt och svalt',
    shelfLife: '24 månader',
    manufacturer: 'Nordic Performance Labs',
    certifications: ['GMP-certifierad'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20nitric%20oxide%20supplement%20bottle%2C%20red%20and%20white%20design%2C%20blood%20flow%20diagram%2C%20molecular%20structures%20of%20arginine%20and%20citrulline%2C%20professional%20sport%20nutrition%20packaging&image_size=square'
    ]
  },
  {
    id: 32,
    name: 'L-Arginin 1000mg',
    scientificName: 'L-Arginin HCl',
    description: 'Högdoserad L-Arginin för optimal kväveoxidproduktion. L-Arginin är en essentiell aminosyra som spelar en nyckelroll i kväveoxid-syntesen.',
    price: 399,
    category: 'amino-acids',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Pure%20L-Arginine%20supplement%20bottle%2C%20white%20capsules%2C%20clean%20pharmaceutical%20design%2C%20amino%20acid%20molecular%20structure%2C%20professional%20health%20packaging&image_size=square',
    skinTypes: ['all', 'mature', 'dull'],
    benefits: ['Maximal kväveoxidproduktion', 'Förbättrad blodcirkulation', 'Stödjer proteinsyntes', 'Immunförsvarstöd'],
    molecularFormula: 'C₆H₁₄N₄O₂·HCl',
    molecularWeight: '210.7',
    concentration: '1000mg per kapsel',
    pHLevel: '6.0-7.0',
    usage: 'Ta 1-2 kapslar dagligen på fastande mage eller före träning.',
    clinicalStudies: [{ title: 'L-Arginin effekt', results: 'Signifikant ökning av kväveoxidnivåer inom 30 minuter', duration: '2 veckor', participants: 80 }],
    ingredients: ['L-Arginin HCl (1000mg)'],
    timeToResults: '1-2 veckor',
    beforeAfter: { description: 'Snabb NO-ökning och förbättrad cirkulation', timeline: '2-4 veckor', expectedResults: ['Ökad pump', 'Bättre uthållighet'] },
    relatedProducts: [31, 33],
    warnings: ['Rådgör vid hjärt- eller blodtrycksproblem'],
    storage: 'Förvaras torrt och svalt',
    shelfLife: '24 månader',
    manufacturer: 'Nordic Performance Labs',
    certifications: ['GMP-certifierad'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Pure%20L-Arginine%20supplement%20bottle%2C%20white%20capsules%2C%20clean%20pharmaceutical%20design%2C%20amino%20acid%20molecular%20structure%2C%20professional%20health%20packaging&image_size=square'
    ]
  },
  {
    id: 33,
    name: 'Omega-3 EPA/DHA 2000mg',
    scientificName: 'Eikosapentaensyra & Dokosahexaensyra',
    description: 'Högkoncentrerad omega-3 fiskolja med optimal balans av EPA och DHA. Renad genom molekylär destillation för högsta renhet och effektivitet.',
    price: 699,
    category: 'omega-3',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20omega-3%20fish%20oil%20supplements%2C%20golden%20softgel%20capsules%2C%20clean%20pharmaceutical%20bottle%2C%20molecular%20structure%20of%20EPA%20and%20DHA%2C%20professional%20health%20packaging&image_size=square',
    skinTypes: ['all', 'dry', 'inflamed', 'aging'],
    benefits: ['Anti-inflammatorisk effekt', 'Förbättrad hudbarriär', 'Minskad torrhet', 'Hjärn- och hjärt-hälsa'],
    molecularFormula: 'C₂₀H₃₀O₂ & C₂₂H₃₂O₂',
    molecularWeight: '302.5 & 328.5',
    concentration: 'EPA 1200mg + DHA 800mg',
    pHLevel: 'Neutral',
    usage: 'Ta 2-3 kapslar dagligen med måltid. Förvaras svalt och mörkt.',
    clinicalStudies: [{ title: 'Omega-3 och inflammation', results: 'Signifikant minskning av inflammationsmarkörer och förbättrad hudhälsa', duration: '12 veckor', participants: 150 }],
    ingredients: ['EPA (1200mg)', 'DHA (800mg)'],
    timeToResults: '4-8 veckor',
    beforeAfter: { description: 'Anti-inflammatorisk effekt och förbättrad hudbarriär', timeline: '8-12 veckor', expectedResults: ['Minskad rodnad', 'Mjukare hud'] },
    relatedProducts: [34, 35],
    warnings: ['Undvik vid fiskallergi', 'Konsultera läkare vid blodförtunnande medicinering'],
    storage: 'Förvaras svalt och mörkt',
    shelfLife: '24 månader',
    manufacturer: 'Nordic Marine Labs',
    certifications: ['GMP-certifierad', 'IFOS-certifierad'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20omega-3%20fish%20oil%20supplements%2C%20golden%20softgel%20capsules%2C%20clean%20pharmaceutical%20bottle%2C%20molecular%20structure%20of%20EPA%20and%20DHA%2C%20professional%20health%20packaging&image_size=square'
    ]
  },
  {
    id: 34,
    name: 'Antarktisk Krillolja 1000mg',
    scientificName: 'Euphausia superba Oil',
    description: 'Premium krillolja från rena Antarktiska vatten. Innehåller omega-3 i fosfolipidform för överlägsen absorption och innehåller naturligt astaxanthin.',
    price: 899,
    category: 'omega-3',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    skinTypes: ['all', 'sensitive', 'aging', 'inflamed'],
    benefits: ['Överlägsen absorption', 'Naturlig astaxanthin', 'Anti-aging antioxidant', 'Led- och hudhälsa'],
    molecularFormula: 'Omega-3 fosfolipider',
    molecularWeight: '750-850',
    concentration: '1000mg krillolja per kapsel',
    pHLevel: 'Neutral',
    usage: 'Ta 1-2 kapslar dagligen med frukost. Undvik kvällsintag.',
    clinicalStudies: [{ title: 'Krillolja absorption', results: '40% bättre absorption jämfört med fiskolja', duration: '8 veckor', participants: 100 }],
    ingredients: ['Krillolja (1000mg)', 'Astaxanthin (1mg)'],
    timeToResults: '3-6 veckor',
    beforeAfter: { description: 'Förbättrad absorption och anti-aging antioxidanteffekt', timeline: '6-10 veckor', expectedResults: ['Minskad inflammation', 'Ökad elasticitet'] },
    relatedProducts: [33, 35],
    warnings: ['Undvik vid skaldjursallergi'],
    storage: 'Förvaras svalt och mörkt',
    shelfLife: '24 månader',
    manufacturer: 'Nordic Marine Labs',
    certifications: ['GMP-certifierad'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 35,
    name: 'Vegansk Alger Omega-3 1000mg',
    scientificName: 'Schizochytrium sp. Oil',
    description: '100% vegansk omega-3 från mikroalger. Hållbart producerad DHA och EPA från alger utan användning av fisk, idealisk för vegetarianer och veganer.',
    price: 749,
    category: 'omega-3',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Sustainable%20algae%20omega-3%20supplement%2C%20green%20and%20blue%20packaging%2C%20microalgae%20illustration%2C%20vegan%20friendly%20design%2C%20clean%20eco-friendly%20bottle%2C%20plant-based%20omega-3&image_size=square',
    skinTypes: ['all', 'vegan', 'sensitive', 'dry'],
    benefits: ['100% vegansk', 'Hållbart producerad', 'Hög DHA-halt', 'Idealisk för veganer'],
    molecularFormula: 'Algae-derived Omega-3',
    molecularWeight: '800-900',
    concentration: 'DHA 600mg + EPA 400mg',
    pHLevel: 'Neutral',
    usage: 'Ta 1-2 kapslar dagligen med måltid. Förvaras i rumstemperatur.',
    clinicalStudies: [{ title: 'Alger omega-3 effektivitet', results: 'Likvärdig effektivitet med fiskolja för omega-3 nivåer', duration: '16 veckor', participants: 120 }],
    ingredients: ['Algbaserad DHA (600mg)', 'Algbaserad EPA (400mg)'],
    timeToResults: '4-8 veckor',
    beforeAfter: { description: 'Vegansk omega-3 för hud och hjärna', timeline: '8-12 veckor', expectedResults: ['Minskad torrhet', 'Ökad mjukhet'] },
    relatedProducts: [33, 34],
    warnings: ['Förvara bort från direkt ljus'],
    storage: 'Förvaras i rumstemperatur',
    shelfLife: '24 månader',
    manufacturer: 'Nordic Algae Labs',
    certifications: ['GMP-certifierad'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Sustainable%20algae%20omega-3%20supplement%2C%20green%20and%20blue%20packaging%2C%20microalgae%20illustration%2C%20vegan%20friendly%20design%2C%20clean%20eco-friendly%20bottle%2C%20plant-based%20omega-3&image_size=square'
    ]
  },
  {
    id: 36,
    name: 'Omega-7 Havtornolja 500mg',
    scientificName: 'Hippophae rhamnoides Oil',
    description: 'Premium havtornolja rik på omega-7 (palmitoleinsyra) och omega-3. Stödjer hudens naturliga läkningsprocesser och slemhinnornas hälsa.',
    price: 549,
    category: 'omega-3',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Sea%20buckthorn%20omega-7%20supplement%2C%20orange%20softgel%20capsules%2C%20natural%20sea%20buckthorn%20berries%2C%20clean%20pharmaceutical%20bottle%2C%20omega%20fatty%20acid%20molecular%20structure%2C%20premium%20health%20packaging&image_size=square',
    skinTypes: ['dry', 'sensitive', 'mature', 'damaged'],
    benefits: ['Omega-7 rikedom', 'Stödjer hudläkning', 'Slemhinnestöd', 'Anti-inflammatorisk'],
    molecularFormula: 'Omega-7 & Omega-3 komplex',
    molecularWeight: '500-600',
    concentration: 'Omega-7 200mg + Omega-3 150mg',
    pHLevel: 'Neutral',
    usage: 'Ta 1-2 kapslar dagligen med måltid. Kan ökas vid behov.',
    clinicalStudies: [{ title: 'Omega-7 hudhälsa', results: 'Förbättrad hudläkning och minskad inflammation', duration: '10 veckor', participants: 95 }],
    ingredients: ['Havtornolja (500mg)', 'Palmitoleinsyra (Omega-7)', 'Omega-3 komplex'],
    timeToResults: '3-6 veckor',
    beforeAfter: { description: 'Stödjer hudläkning och slemhinnor', timeline: '6-10 veckor', expectedResults: ['Mjukare hud', 'Minskad irritation'] },
    relatedProducts: [33, 35],
    warnings: ['Rådgör vid medicinering'],
    storage: 'Förvaras torrt och svalt',
    shelfLife: '24 månader',
    manufacturer: 'Nordic Botanical Labs',
    certifications: ['GMP-certifierad'],
    images: [
      'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Sea%20buckthorn%20omega-7%20supplement%2C%20orange%20softgel%20capsules%2C%20natural%20sea%20buckthorn%20berries%2C%20clean%20pharmaceutical%20bottle%2C%20omega%20fatty%20acid%20molecular%20structure%2C%20premium%20health%20packaging&image_size=square'
    ]
  },
  {
    id: 31,
    name: 'Ashwagandha KSM-66 500mg',
    price: 449,
    description: 'Premium KSM-66 Ashwagandha, den mest kliniskt studerade formen av denna adaptogena ört. Reducerar kortisol och stress vilket direkt påverkar hudens hälsa genom att minska inflammation och främja kollagenproduktion. Ayurvedisk visdom möter modern vetenskap.',
    category: 'Ayurvediska',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Ashwagandha%20KSM-66%20supplement%20bottle%2C%20organic%20ayurvedic%20design%2C%20ashwagandha%20root%20illustration%2C%20golden%20and%20brown%20colors%2C%20traditional%20indian%20ayurvedic%20medicine%20packaging&image_size=square',
    scientificName: 'Withania somnifera KSM-66',
    molecularFormula: 'C28H38O6 (Withanolider)',
    concentration: '500mg KSM-66 extrakt (5% withanolider)',
    pHLevel: 'Neutral',
    molecularWeight: '470.6 g/mol (Withanolider)',
    ingredients: [
      'KSM-66 Ashwagandha rotextrakt',
      'Vegetabilisk kapsel (cellulosa)',
      'Risextrakt',
      'Magnesiumstearat (vegetabilisk)',
      'Kiseldioxid'
    ],
    benefits: [
      'Reducerar kortisol med upp till 27%',
      'Minskar stress och ångest',
      'Förbättrar sömnkvalitet',
      'Stärker immunförsvaret',
      'Främjar hudens naturliga lyster'
    ],
    usage: 'Ta 1-2 kapslar dagligen, helst på morgonen eller kvällen. Effekt ses efter 2-4 veckor.',
    skinTypes: ['Stressad hud', 'Inflammerad hud', 'Åldrande hud', 'Alla hudtyper'],
    timeToResults: '2-4 veckor för stressreduktion, 6-8 veckor för hudförbättring',
    clinicalStudies: [
      {
        title: 'KSM-66 Ashwagandha for Stress Reduction',
        results: '27% minskning av kortisol, förbättrad sömn och minskad ångest',
        duration: '8 veckor',
        participants: 64
      },
      {
        title: 'Ashwagandha and Skin Health Study',
        results: 'Förbättrad hudlyster och minskad inflammation genom stressreduktion',
        duration: '12 veckor',
        participants: 50
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av stressnivåer och hudhälsa',
      timeline: 'Progressiv förbättring över 6-12 veckor',
      expectedResults: [
        'Veck 2-4: Minskad stress och förbättrad sömn',
        'Veck 4-8: Bättre hudlyster och minskad inflammation',
        'Veck 8-12: Optimal stressbalans och strålande hud'
      ]
    },
    relatedProducts: [32, 33, 34, 35],
    warnings: [
      'Inte rekommenderat under graviditet',
      'Kan interagera med immunsuppressiva läkemedel',
      'Konsultera läkare vid sköldkörtelproblem'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot direkt solljus',
    shelfLife: '24 månader',
    manufacturer: 'Ayurvedic Wellness Sweden',
    certifications: ['USDA Organic', 'Kliniskt testad', 'GMP-certifierad']
  },
  {
    id: 32,
    name: 'Turmeric Curcumin 95% 1000mg',
    price: 399,
    description: 'Högkoncentrerad gurkmeja med 95% curcuminoider, den mest aktiva anti-inflammatoriska komponenten. Kliniskt bevisad att minska systemisk inflammation vilket direkt påverkar hudens åldrande och klarhet. Innehåller svartpeppar för ökad absorption.',
    category: 'Ayurvediska',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Turmeric%20Curcumin%20supplement%20bottle%2C%20bright%20yellow%20and%20orange%20design%2C%20turmeric%20root%20and%20powder%20illustration%2C%20ayurvedic%20anti-inflammatory%20medicine%2C%20traditional%20indian%20healing%20herbs&image_size=square',
    scientificName: 'Curcuma longa L. (95% Curcuminoider)',
    molecularFormula: 'C21H20O6 (Curcumin)',
    concentration: '1000mg Gurkmejaextrakt (95% curcuminoider)',
    pHLevel: 'Neutral',
    molecularWeight: '368.4 g/mol (Curcumin)',
    ingredients: [
      'Gurkmejaextrakt (95% curcuminoider)',
      'Svartpepparextrakt (95% piperin)',
      'Vegetabilisk kapsel',
      'Mikrokristallin cellulosa',
      'Magnesiumstearat'
    ],
    benefits: [
      'Kraftfull anti-inflammatorisk effekt',
      'Minskar ledvärk och stelhet',
      'Förbättrar hudens klarhet',
      'Stärker immunförsvaret',
      'Skyddar mot oxidativ stress'
    ],
    usage: 'Ta 1-2 kapslar dagligen med måltid. För bästa absorption, ta med mat som innehåller fett.',
    skinTypes: ['Inflammerad hud', 'Oren hud', 'Åldrande hud', 'Alla hudtyper'],
    timeToResults: '2-4 veckor för inflammation, 4-8 veckor för hudförbättring',
    clinicalStudies: [
      {
        title: 'Curcumin and Systemic Inflammation',
        results: 'Signifikant minskning av inflammationsmarkörer CRP och IL-6',
        duration: '6 veckor',
        participants: 117
      }
    ],
    beforeAfter: {
      description: 'Gradvis minskning av inflammation och förbättrad hudhälsa',
      timeline: 'Steady förbättring över 4-8 veckor',
      expectedResults: [
        'Veck 1-2: Minskad systemisk inflammation',
        'Veck 2-4: Förbättrad hudkvalitet och minskad rodnad',
        'Veck 4-8: Optimal anti-inflammatorisk effekt och klarare hud'
      ]
    },
    relatedProducts: [31, 33, 36, 38],
    warnings: [
      'Kan interagera med blodförtunnande mediciner',
      'Inte lämplig vid gallsten',
      'Kan orsaka magirritation på fastande mage'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot ljus för att bevara curcumin',
    shelfLife: '24 månader',
    manufacturer: 'Ayurvedic Wellness Sweden',
    certifications: ['95% Standardiserad', 'Kliniskt testad', 'Vegan-certifierad']
  },
  {
    id: 33,
    name: 'Brahmi Bacopa Monnieri 300mg',
    price: 349,
    description: 'Bacopa Monnieri, känd som Brahmi i ayurvedisk medicin, är en kraftfull adaptogen som förbättrar mental klarhet och minskar stress. Indirekt påverkar det hudens hälsa genom att minska stresshormoner och främja bättre sömnkvalitet.',
    category: 'Ayurvediska',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Bacopa%20Monnieri%20supplement%20bottle%2C%20green%20and%20natural%20design%2C%20bacopa%20plant%20and%20leaves%20illustration%2C%20ayurvedic%20brain%20and%20memory%20herb%2C%20traditional%20indian%20nootropic%20medicine&image_size=square',
    scientificName: 'Bacopa monnieri L. (50% bacosider)',
    molecularFormula: 'C28H46O6 (Bacosid A)',
    concentration: '300mg Bacopa extrakt (50% bacosider)',
    pHLevel: 'Neutral',
    molecularWeight: '478.7 g/mol (Bacosid A)',
    ingredients: [
      'Bacopa monnieri extrakt (50% bacosider)',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat',
      'Kiseldioxid'
    ],
    benefits: [
      'Förbättrar minne och koncentration',
      'Minskar mental trötthet',
      'Stödjer stresshantering',
      'Främjar mental klarhet',
      'Förbättrar sömnkvalitet'
    ],
    usage: 'Ta 1-2 kapslar dagligen, heligen på morgonen. Effekt ses efter 4-6 veckor.',
    skinTypes: ['Stressad hud', 'Trött hud', 'Alla hudtyper'],
    timeToResults: '4-6 veckor för mentala fördelar, 6-8 veckor för stressreduktion',
    clinicalStudies: [
      {
        title: 'Bacopa Monnieri and Cognitive Function',
        results: 'Signifikant förbättring av minne och koncentration',
        duration: '12 veckor',
        participants: 76
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av mental klarhet och stresshantering',
      timeline: 'Steady förbättring över 4-8 veckor',
      expectedResults: [
        'Veck 2-4: Förbättrad mental klarhet',
        'Veck 4-6: Bättre stresshantering och minne',
        'Veck 6-8: Optimal mental prestation och lugn'
      ]
    },
    relatedProducts: [31, 32, 34, 35],
    warnings: [
      'Kan orsaka mild magirritation',
      'Inte rekommenderat under graviditet utan läkarkonsultation',
      'Kan interagera med vissa antidepressiva mediciner'
    ],
    storage: 'Förvaras torrt och svalt',
    shelfLife: '24 månader',
    manufacturer: 'Ayurvedic Wellness Sweden',
    certifications: ['50% Standardiserad', 'Kliniskt testad', 'Vegan-certifierad']
  },
  {
    id: 34,
    name: 'Triphala 750mg - Ayurvedisk Detox',
    price: 299,
    description: 'Traditionell ayurvedisk blandning av tre frukter: Amalaki, Bibhitaki och Haritaki. Triphala stödjer matsmältningen och avgiftning, vilket är grundläggande för ren och klar hud. Inflammation i tarmen speglas ofta i hudproblem.',
    category: 'Ayurvediska',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Triphala%20ayurvedic%20supplement%20bottle%2C%20three%20fruits%20illustration%2C%20traditional%20indian%20design%2C%20golden%20and%20brown%20colors%2C%20detox%20and%20digestion%20herbs%2C%20ancient%20ayurvedic%20formula&image_size=square',
    scientificName: 'Emblica officinalis, Terminalia bellirica, Terminalia chebula',
    molecularFormula: 'Komplex blandning av polyfenoler',
    concentration: '750mg Triphala extrakt (1:1 förhållande av de tre frukterna)',
    pHLevel: 'Neutral',
    molecularWeight: 'Varierande polyfenoler',
    ingredients: [
      'Amalaki (Emblica officinalis) fruktpulver',
      'Bibhitaki (Terminalia bellirica) fruktpulver',
      'Haritaki (Terminalia chebula) fruktpulver',
      'Vegetabilisk kapsel',
      'Risextrakt'
    ],
    benefits: [
      'Stödjer matsmältning och avgiftning',
      'Främjar regelbunden tarmfunktion',
      'Rik på antioxidanter och vitamin C',
      'Stödjer hudens klarhet genom intern rening',
      'Traditionell ayurvedisk formula'
    ],
    usage: 'Ta 1-2 kapslar dagligen, helst på kvällen före sänggåendet. Ta med varmt vatten.',
    skinTypes: ['Oren hud', 'Inflammerad hud', 'Alla hudtyper'],
    timeToResults: '1-2 veckor för matsmältning, 4-6 veckor för hudförbättring',
    clinicalStudies: [
      {
        title: 'Triphala and Digestive Health',
        results: 'Förbättrad tarmfunktion och minskad inflammation',
        duration: '4 veckor',
        participants: 90
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av matsmältning och hudkvalitet',
      timeline: 'Steady förbättring över 2-6 veckor',
      expectedResults: [
        'Veck 1-2: Förbättrad matsmältning och tarmfunktion',
        'Veck 2-4: Minskad inflammation och bättre näringsabsorption',
        'Veck 4-6: Klarare hud och bättre allmänhälsa'
      ]
    },
    relatedProducts: [31, 32, 35, 36],
    warnings: [
      'Kan ha laxerande effekt vid hög dos',
      'Inte rekommenderat vid svår diarré',
      'Konsultera läkare vid graviditet'
    ],
    storage: 'Förvaras torrt och svalt',
    shelfLife: '36 månader',
    manufacturer: 'Ayurvedic Wellness Sweden',
    certifications: ['Traditionell formula', 'Ekologiska ingredienser', 'Vegan-certifierad']
  },
  {
    id: 35,
    name: 'Neem 475mg - Blodrenande Ört',
    price: 249,
    description: 'Neem (Azadirachta indica) är en av de mest kraftfulla blodrenande örterna i ayurvedisk medicin. Dess antibakteriella och anti-inflammatoriska egenskaper gör den idealisk för hudproblem och generell avgiftning.',
    category: 'Ayurvediska',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Neem%20supplement%20bottle%2C%20green%20and%20brown%20design%2C%20neem%20leaves%20and%20tree%20illustration%2C%ayurvedic%20blood%20purifying%20herb%2C%20traditional%20indian%20medicine%2C%20natural%20antibacterial%20plant&image_size=square',
    scientificName: 'Azadirachta indica A. Juss.',
    molecularFormula: 'C35H44O16 (Azadirachtin)',
    concentration: '475mg Neem lövpulver',
    pHLevel: 'Neutral',
    molecularWeight: '720.7 g/mol (Azadirachtin)',
    ingredients: [
      'Neem (Azadirachta indica) lövpulver',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat'
    ],
    benefits: [
      'Kraftfullt blodrenande medel',
      'Antibakteriella och anti-inflammatoriska egenskaper',
      'Stödjer hudens renhet',
      'Traditionell ayurvedisk avgiftningsört',
      'Stärker immunförsvaret'
    ],
    usage: 'Ta 1-2 kapslar dagligen efter måltid. Använd i 2-3 veckor, sedan paus i 1 vecka.',
    skinTypes: ['Oren hud', 'Problemhud', 'Alla hudtyper'],
    timeToResults: '2-3 veckor för blodrenande effekt, 4-6 veckor för hudförbättring',
    clinicalStudies: [
      {
        title: 'Neem and Blood Purification',
        results: 'Signifikant förbättring av hudkvalitet genom blodrenande effekt',
        duration: '6 veckor',
        participants: 60
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av blodkvalitet och hudkvalitet',
      timeline: 'Steady förbättring över 3-6 veckor',
      expectedResults: [
        'Veck 1-2: Initial blodrenande effekt',
        'Veck 2-4: Minskad hudinflammation och orenheter',
        'Veck 4-6: Klarare hud och bättre allmänhälsa'
      ]
    },
    relatedProducts: [31, 32, 34, 36],
    warnings: [
      'Inte lämplig för gravida eller ammande',
      'Kan interagera med diabetesmediciner',
      'Använd inte längre än 3 veckor utan paus'
    ],
    storage: 'Förvaras torrt och svalt',
    shelfLife: '24 månader',
    manufacturer: 'Ayurvedic Wellness Sweden',
    certifications: ['Traditionell formula', 'Ekologiska ingredienser', 'Vegan-certifierad']
  },
  {
    id: 36,
    name: 'Amla (Indisk Krusbär) 500mg',
    price: 299,
    description: 'Amla (Phyllanthus emblica) är en av de rikaste naturliga källorna till vitamin C och antioxidanter. Denna kraftfulla ört stödjer immunförsvaret och främjar kollagenproduktion för ungdomlig hud. Traditionellt använd i ayurveda för dess anti-aging egenskaper.',
    category: 'Ayurvediska',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Amla%20Indian%20Gooseberry%20supplement%20bottle%2C%20bright%20green%20and%20yellow%20design%2C%20amla%20fruits%20and%20leaves%20illustration%2C%20rich%20vitamin%20C%20source%2C%20traditional%20ayurvedic%20anti-aging%20herb%2C%20natural%20antioxidant%20power&image_size=square',
    scientificName: 'Phyllanthus emblica L.',
    molecularFormula: 'C6H8O6 (Askorbinsyra)',
    concentration: '500mg Amla fruktpulver',
    pHLevel: 'Sur (på grund av naturlig vitamin C)',
    molecularWeight: '176.1 g/mol (Askorbinsyra)',
    ingredients: [
      'Amla (Phyllanthus emblica) fruktpulver',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat'
    ],
    benefits: [
      'Extremt rik på naturligt vitamin C',
      'Kraftfull antioxidant som skyddar mot åldrande',
      'Stödjer kollagenproduktion',
      'Stärker immunförsvaret',
      'Traditionell anti-aging ört'
    ],
    usage: 'Ta 1-2 kapslar dagligen, heligen på morgonen. Ta med mat för bästa absorption.',
    skinTypes: ['Åldrande hud', 'Trött hud', 'Alla hudtyper'],
    timeToResults: '2-4 veckor för immunförbättring, 4-8 veckor för anti-aging effekt',
    clinicalStudies: [
      {
        title: 'Amla and Vitamin C Content',
        results: '20x högre vitamin C-innehåll jämfört med apelsiner',
        duration: 'Analysstudie',
        participants: 30
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av immunfunktion och hudkvalitet',
      timeline: 'Steady förbättring över 4-8 veckor',
      expectedResults: [
        'Veck 1-2: Ökad energi och immunförbättring',
        'Veck 2-4: Förbättrad hudlyster och minskad trötthet',
        'Veck 4-8: Optimal antioxidanteffekt och ungdomlig hud'
      ]
    },
    relatedProducts: [31, 32, 33, 34],
    warnings: [
      'Kan orsaka magirritation vid hög dos',
      'Inte lämplig för personer med njursten',
      'Kan interagera med järntillskott'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot ljus och värme',
    shelfLife: '24 månader',
    manufacturer: 'Ayurvedic Wellness Sweden',
    certifications: ['Ekologiska ingredienser', 'Rik på naturligt vitamin C', 'Vegan-certifierad']
  },
  {
    id: 37,
    name: 'Tulsi (Helig Basilika) 400mg',
    price: 329,
    description: 'Tulsi (Ocimum sanctum), känd som helig basilika, är en av de mest vördade örterna i ayurvedisk medicin. Denna adaptogena ört balanserar stress, stödjer andningshälsa och främjar mental klarhet. Dess anti-aging egenskaper kommer från dess kraftfulla antioxidantinnehåll.',
    category: 'Ayurvediska',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Tulsi%20Holy%20Basil%20supplement%20bottle%2C%20sacred%20green%20and%20purple%20design%2C%20tulsi%20leaves%20and%20plant%20illustration%2C%20adaptogenic%20stress-relief%20herb%2C%20traditional%20indian%20sacred%20medicine%2C%20natural%20antioxidant%20and%20anti-aging&image_size=square',
    scientificName: 'Ocimum sanctum L.',
    molecularFormula: 'C10H8O4 (Eugenol)',
    concentration: '400mg Tulsi lövpulver',
    pHLevel: 'Neutral',
    molecularWeight: '192.2 g/mol (Eugenol)',
    ingredients: [
      'Tulsi (Ocimum sanctum) lövpulver',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat'
    ],
    benefits: [
      'Adaptogen som balanserar stress',
      'Kraftfull antioxidant för anti-aging',
      'Stödjer andningshälsa',
      'Främjar mental klarhet',
      'Stärker immunförsvaret'
    ],
    usage: 'Ta 1-2 kapslar dagligen, heligen på morgonen. Kan tas med varmt vatten som te.',
    skinTypes: ['Stressad hud', 'Åldrande hud', 'Alla hudtyper'],
    timeToResults: '2-3 veckor för stressbalans, 4-6 veckor för anti-aging effekt',
    clinicalStudies: [
      {
        title: 'Tulsi and Stress Management',
        results: 'Signifikant minskning av stressmarkörer och förbättrad mental klarhet',
        duration: '6 veckor',
        participants: 100
      }
    ],
    beforeAfter: {
      description: 'Gradvis balansering av stress och förbättrad mental hälsa',
      timeline: 'Steady förbättring över 3-6 veckor',
      expectedResults: [
        'Veck 1-2: Initial stressreduktion och mental klarhet',
        'Veck 2-4: Bättre stresshantering och immunförbättring',
        'Veck 4-6: Optimal adaptogen effekt och ungdomlig hud'
      ]
    },
    relatedProducts: [31, 32, 33, 34],
    warnings: [
      'Kan ha mild blodförtunnande effekt',
      'Inte lämplig för personer med lågt blodtryck',
      'Kan interagera med diabetesmediciner'
    ],
    storage: 'Förvaras torrt och svalt',
    shelfLife: '24 månader',
    manufacturer: 'Ayurvedic Wellness Sweden',
    certifications: ['Ekologiska ingredienser', 'Adaptogen standard', 'Vegan-certifierad']
  },
  {
    id: 38,
    name: 'Guggul 250mg - Metabolism & Hud',
    price: 399,
    description: 'Guggul (Commiphora wightii) är en kraftfull harts från myrraträd som traditionellt används i ayurveda för att stödja metabolism och främja hudens hälsa. Dess anti-inflammatoriska egenskaper gör den idealisk för hudproblem och vikthantering.',
    category: 'Ayurvediska',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Guggul%20supplement%20bottle%2C%20golden%20and%20brown%20design%2C%20Commiphora%20wightii%20tree%20and%20resin%20illustration%2C%20ayurvedic%20metabolism%20and%20skin%20herb%2C%20traditional%20indian%20myrrh%20medicine%2C%20natural%20anti-inflammatory%20resin&image_size=square',
    scientificName: 'Commiphora wightii (Arn.) Bhandari',
    molecularFormula: 'C21H28O4 (Guggulsteroner)',
    concentration: '250mg Guggul extrakt (2.5% guggulsteroner)',
    pHLevel: 'Neutral',
    molecularWeight: '344.5 g/mol (Guggulsteroner)',
    ingredients: [
      'Guggul (Commiphora wightii) hartsextrakt',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat'
    ],
    benefits: [
      'Stödjer hälsosam metabolism',
      'Anti-inflammatorisk för hud och leder',
      'Främjar hudens renhet',
      'Traditionell ayurvedisk vikthanteringsört',
      'Stödjer sköldkörtelfunktion'
    ],
    usage: 'Ta 1 kapsel 2-3 gånger dagligen efter måltid. Använd i minst 4-6 veckor för bästa resultat.',
    skinTypes: ['Problemhud', 'Inflammerad hud', 'Alla hudtyper'],
    timeToResults: '2-4 veckor för metabolism, 4-8 veckor för hudförbättring',
    clinicalStudies: [
      {
        title: 'Guggul and Metabolic Health',
        results: 'Förbättrad metabolism och minskad inflammation',
        duration: '12 veckor',
        participants: 80
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av metabolism och hudkvalitet',
      timeline: 'Steady förbättring över 4-8 veckor',
      expectedResults: [
        'Veck 2-4: Förbättrad metabolism och energi',
        'Veck 4-6: Minskad inflammation och bättre hudkvalitet',
        'Veck 6-8: Optimal metabolisk funktion och klar hud'
      ]
    },
    relatedProducts: [31, 32, 34, 35],
    warnings: [
      'Inte lämplig vid akut inflammation',
      'Kan interagera med sköldkörtelmediciner',
      'Undvik vid graviditet och amning'
    ],
    storage: 'Förvaras torrt och svalt',
    shelfLife: '24 månader',
    manufacturer: 'Ayurvedic Wellness Sweden',
    certifications: ['Standardiserad extrakt', 'Traditionell formula', 'Vegan-certifierad']
  },
  // Traditionell Kinesisk Medicin (TCM)
  {
    id: 39,
    name: 'Ginseng (Ren Shen) 500mg - Kinesisk Energi',
    price: 599,
    description: 'Premium Panax ginseng, känd som Ren Shen i traditionell kinesisk medicin, är den ultimata örten för energi, vitalitet och långt liv. Denna adaptogena rot har använts i tusentals år för att stärka Qi (livsenergi) och främja mental och fysisk uthållighet.',
    category: 'Kinesisk Medicin',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Panax%20Ginseng%20supplement%20bottle%2C%20traditional%20chinese%20medicine%20design%2C%20ginseng%20root%20and%20plant%20illustration%2C%20red%20and%20gold%20colors%2C%20ancient%20chinese%20herbal%20medicine%2C%20qi%20energy%20and%20vitality%20tonic&image_size=square',
    scientificName: 'Panax ginseng C.A. Meyer (4% ginsenosider)',
    molecularFormula: 'C42H72O14 (Ginsenosid Rb1)',
    concentration: '500mg Panax ginseng extrakt (4% ginsenosider)',
    pHLevel: 'Neutral',
    molecularWeight: '801.0 g/mol (Ginsenosid Rb1)',
    ingredients: [
      'Panax ginseng rotextrakt (4% ginsenosider)',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat (vegetabilisk)',
      'Kiseldioxid'
    ],
    benefits: [
      'Stärker Qi (livsenergi) enligt TCM',
      'Förbättrar mental klaritet och minne',
      'Ökar fysisk uthållighet och energi',
      'Stödjer immunförsvaret',
      'Främjar långt liv och vitalitet'
    ],
    usage: 'Ta 1-2 kapslar dagligen, helst på morgonen. Använd i 6-8 veckor följt av 1-2 veckors paus enligt TCM-principer.',
    skinTypes: ['Trött hud', 'Åldrande hud', 'Stressad hud', 'Alla hudtyper'],
    timeToResults: '2-4 veckor för energi, 4-8 veckor för anti-aging effekt',
    clinicalStudies: [
      {
        title: 'Panax Ginseng and Cognitive Function',
        results: 'Förbättrad mental prestation och minne hos friska vuxna',
        duration: '8 veckor',
        participants: 112
      },
      {
        title: 'Ginseng and Physical Endurance',
        results: 'Ökad fysisk kapacitet och minskad trötthet',
        duration: '6 veckor',
        participants: 90
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av energi, mental klaritet och vitalitet',
      timeline: 'Steady förbättring över 4-8 veckor',
      expectedResults: [
        'Veck 1-2: Ökad energi och mental klarhet',
        'Veck 2-4: Förbättrad uthållighet och stresshantering',
        'Veck 4-8: Optimal Qi-balans och vitalitet'
      ]
    },
    relatedProducts: [40, 41, 42, 43],
    warnings: [
      'Undvik vid högt blodtryck utan läkarkonsultation',
      'Kan interagera med blodförtunnande mediciner',
      'Inte rekommenderat under graviditet'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot direkt solljus',
    shelfLife: '36 månader',
    manufacturer: 'TCM Wellness Sweden',
    certifications: ['4% Standardiserad', 'Traditionell Kinesisk Medicin', 'GMP-certifierad']
  },
  {
    id: 40,
    name: 'Goji Bär (Gou Qi Zi) 1000mg - Antioxidant',
    price: 399,
    description: 'Premium Lycium barbarum, känd som Gou Qi Zi i traditionell kinesisk medicin, är en kraftfull antioxidant som stödjer ögonhälsa, immunförsvaret och långt liv. Dessa röda "långt-liv-bär" har använts i TCM i över 2000 år för att nära blod och stärka lever och njurar.',
    category: 'Kinesisk Medicin',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Goji%20Berries%20supplement%20bottle%2C%20traditional%20chinese%20medicine%20design%2C%20bright%20red%20goji%20berries%20and%20plant%20illustration%2C%20red%20and%20orange%20colors%2C%20ancient%20chinese%20longevity%20herb%2C%20antioxidant%20and%20eye%20health%20tonic&image_size=square',
    scientificName: 'Lycium barbarum L. (40% polysackarider)',
    molecularFormula: 'C5H12O5 (Fruktos)',
    concentration: '1000mg Goji bärextrakt (40% polysackarider)',
    pHLevel: 'Neutral',
    molecularWeight: '150.1 g/mol (Fruktos)',
    ingredients: [
      'Lycium barbarum (Goji) bärextrakt',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat (vegetabilisk)',
      'Kiseldioxid'
    ],
    benefits: [
      'Närar blod och stärker lever och njurar (TCM)',
      'Kraftfull antioxidant för anti-aging',
      'Stödjer ögonhälsa och syn',
      'Stärker immunförsvaret',
      'Främjar långt liv och vitalitet'
    ],
    usage: 'Ta 1-2 kapslar dagligen, helst på morgonen. Kan tas med varmt vatten som ett traditionellt TCM-te.',
    skinTypes: ['Åldrande hud', 'Trött hud', 'Alla hudtyper'],
    timeToResults: '2-4 veckor för immunförbättring, 4-8 veckor för anti-aging effekt',
    clinicalStudies: [
      {
        title: 'Goji Berries and Antioxidant Activity',
        results: 'Signifikant ökning av antioxidantkapacitet och minskad oxidativ stress',
        duration: '14 dagar',
        participants: 60
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av antioxidantstatus och allmän hälsa',
      timeline: 'Steady förbättring över 4-8 veckor',
      expectedResults: [
        'Veck 1-2: Ökad energi och antioxidanteffekt',
        'Veck 2-4: Förbättrad syn och immunförsvar',
        'Veck 4-8: Optimal anti-aging effekt och vitalitet'
      ]
    },
    relatedProducts: [39, 41, 42, 44],
    warnings: [
      'Kan interagera med blodförtunnande mediciner',
      'Undvik vid allergi mot nattväxter',
      'Kontrollera blodsockernivåer vid diabetes'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot ljus och värme',
    shelfLife: '24 månader',
    manufacturer: 'TCM Wellness Sweden',
    certifications: ['40% Polysackarider', 'Traditionell Kinesisk Medicin', 'Vegan-certifierad']
  },
  {
    id: 41,
    name: 'Dong Quai (Dang Gui) 250mg - Kvinnohälsa',
    price: 449,
    description: 'Angelica sinensis, känd som Dang Gui eller "kvinnans ginseng" i traditionell kinesisk medicin, är den främsta örten för kvinnohälsa och blodcirkulation. Denna blodnärande ört har använts i tusentals år för att balansera hormoner, reglera menstruation och främja strålande hud genom förbättrad blodcirkulation.',
    category: 'Kinesisk Medicin',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Dong%20Quai%20Angelica%20supplement%20bottle%2C%20traditional%20chinese%20medicine%20design%2C%20angelica%20root%20and%20plant%20illustration%2C%20red%20and%20brown%20colors%2C%20ancient%20chinese%20womens%20health%20herb%2C%20female%20hormone%20balance%20and%20blood%20circulation&image_size=square',
    scientificName: 'Angelica sinensis (Oliv.) Diels (1% ligustilider)',
    molecularFormula: 'C12H14O2 (Ligustilid)',
    concentration: '250mg Dong Quai rotextrakt (1% ligustilider)',
    pHLevel: 'Neutral',
    molecularWeight: '190.2 g/mol (Ligustilid)',
    ingredients: [
      'Angelica sinensis (Dong Quai) rotextrakt',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat (vegetabilisk)',
      'Kiseldioxid'
    ],
    benefits: [
      'Närar blod och balanserar hormoner (TCM)',
      'Främjar kvinnohälsa och menstruationsbalans',
      'Förbättrar blodcirkulation för strålande hud',
      'Stödjer lever och hormonell balans',
      'Traditionell "kvinnans ginseng"'
    ],
    usage: 'Ta 1 kapsel 2 gånger dagligen, helst efter måltid. Använd i 3 månader följt av 1 månads paus enligt TCM-principer.',
    skinTypes: ['Trött hud', 'Bleka hud', 'Hormonell hud', 'Alla hudtyper'],
    timeToResults: '4-6 veckor för hormonell balans, 6-8 veckor för hudförbättring',
    clinicalStudies: [
      {
        title: 'Dong Quai and Womens Health',
        results: 'Förbättrad menstruationsregelbundenhet och minskade PMS-symtom',
        duration: '12 veckor',
        participants: 75
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av hormonell balans, blodcirkulation och hudhälsa',
      timeline: 'Steady förbättring över 6-12 veckor',
      expectedResults: [
        'Veck 2-4: Förbättrad blodcirkulation och energi',
        'Veck 4-8: Bättre hormonell balans och menstruationsregelbundenhet',
        'Veck 8-12: Optimal kvinnohälsa och strålande hud'
      ]
    },
    relatedProducts: [39, 40, 42, 45],
    warnings: [
      'Undvik under graviditet utan läkarkonsultation',
      'Kan interagera med blodförtunnande mediciner',
      'Konsultera läkare vid hormonrelaterade tillstånd'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot ljus',
    shelfLife: '36 månader',
    manufacturer: 'TCM Wellness Sweden',
    certifications: ['1% Standardiserad', 'Traditionell Kinesisk Medicin', 'GMP-certifierad']
  },
  {
    id: 42,
    name: 'Reishi Svamp (Ling Zhi) 400mg - Immunförsvar',
    price: 529,
    description: 'Ganoderma lucidum, känd som Ling Zhi eller "odödlighetens svamp" i traditionell kinesisk medicin, är den mest vördade medicinska svampen i Kina. Denna kraftfulla adaptogen stärker immunförsvaret, främjar långt liv och stödjer den naturliga föryngringsprocessen genom att balansera kroppens system.',
    category: 'Kinesisk Medicin',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Reishi%20Mushroom%20supplement%20bottle%2C%20traditional%20chinese%20medicine%20design%2C%20red%20reishi%20mushroom%20and%20wood%20illustration%2C%20dark%20red%20and%20brown%20colors%2C%20ancient%20chinese%20immortality%20mushroom%2C%20immune%20system%20and%20longevity%20tonic&image_size=square',
    scientificName: 'Ganoderma lucidum (Curtis) P. Karst (30% polysackarider)',
    molecularFormula: 'C6H12O6 (Glukos)',
    concentration: '400mg Reishi svampextrakt (30% polysackarider, 5% triterpener)',
    pHLevel: 'Neutral',
    molecularWeight: '180.2 g/mol (Glukos)',
    ingredients: [
      'Ganoderma lucidum (Reishi) svampextrakt',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat (vegetabilisk)',
      'Kiseldioxid'
    ],
    benefits: [
      'Stärker immunförsvaret och Qi (TCM)',
      'Främjar långt liv och vitalitet',
      'Adaptogen som balanserar kroppens system',
      'Kraftfull antioxidant för anti-aging',
      'Stödjer hjärt- och kärlhälsa'
    ],
    usage: 'Ta 1-2 kapslar dagligen, helst på morgonen. Använd regelbundet för bästa immunförbättring.',
    skinTypes: ['Åldrande hud', 'Stressad hud', 'Alla hudtyper'],
    timeToResults: '2-4 veckor för immunförbättring, 4-8 veckor för anti-aging effekt',
    clinicalStudies: [
      {
        title: 'Reishi Mushroom and Immune Function',
        results: 'Signifikant förbättring av immunförsvarsmarkörer och minskad inflammation',
        duration: '8 veckor',
        participants: 135
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av immunfunktion, vitalitet och anti-aging skydd',
      timeline: 'Steady förbättring över 4-8 veckor',
      expectedResults: [
        'Veck 1-2: Initial immunförstärkning och energi',
        'Veck 2-4: Förbättrad stresshantering och vitalitet',
        'Veck 4-8: Optimal immunfunktion och anti-aging skydd'
      ]
    },
    relatedProducts: [39, 40, 41, 43],
    warnings: [
      'Undvik vid autoimmuna sjukdomar utan läkarkonsultation',
      'Kan orsaka mild magirritation',
      'Konsultera läkare vid immunsuppressiva mediciner'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot ljus och värme',
    shelfLife: '36 månader',
    manufacturer: 'TCM Wellness Sweden',
    certifications: ['30% Polysackarider', '5% Triterpener', 'Ekologisk svamp', 'GMP-certifierad']
  },
  {
    id: 43,
    name: 'Schisandra (Wu Wei Zi) 300mg - Lever & Stress',
    price: 389,
    description: 'Schisandra chinensis, känd som Wu Wei Zi eller "de fem smakernas frukt" i traditionell kinesisk medicin, är en unik ört som balanserar alla fem element. Denna kraftfulla adaptogen stödjer leverfunktion, förbättrar stresshantering och främjar mental klarhet genom att harmonisera kroppens inre system.',
    category: 'Kinesisk Medicin',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Schisandra%20Berry%20supplement%20bottle%2C%20traditional%20chinese%20medicine%20design%2C%20red%20schisandra%20berries%20and%20vine%20illustration%2C%20purple%20and%20red%20colors%2C%20ancient%20chinese%20five-flavor%20fruit%2C%20liver%20health%20and%20stress%20adaptogen&image_size=square',
    scientificName: 'Schisandra chinensis (Turcz.) Baill (9% schisandriner)',
    molecularFormula: 'C24H32O7 (Schisandrin B)',
    concentration: '300mg Schisandra extrakt (9% schisandriner)',
    pHLevel: 'Neutral',
    molecularWeight: '432.5 g/mol (Schisandrin B)',
    ingredients: [
      'Schisandra chinensis fruktextrakt (9% schisandriner)',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat (vegetabilisk)',
      'Kiseldioxid'
    ],
    benefits: [
      'Stödjer leverfunktion och detox (TCM)',
      'Adaptogen för stresshantering',
      'Främjar mental klarhet och fokus',
      'Kraftfull antioxidant för anti-aging',
      'Balanserar kroppens fem element'
    ],
    usage: 'Ta 1-2 kapslar dagligen, helst på morgonen. Använd i 6-8 veckor följt av 1-2 veckors paus.',
    skinTypes: ['Stressad hud', 'Trött hud', 'Alla hudtyper'],
    timeToResults: '2-4 veckor för stressreduktion, 4-8 veckor för leverstöd och anti-aging',
    clinicalStudies: [
      {
        title: 'Schisandra and Liver Function',
        results: 'Förbättrad leverfunktion och minskad oxidativ stress',
        duration: '6 veckor',
        participants: 60
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av stresshantering, leverfunktion och mental klarhet',
      timeline: 'Steady förbättring över 4-8 veckor',
      expectedResults: [
        'Veck 1-2: Initial stressreduktion och mental klarhet',
        'Veck 2-4: Förbättrad leverfunktion och energi',
        'Veck 4-8: Optimal stressbalans och anti-aging skydd'
      ]
    },
    relatedProducts: [39, 40, 41, 42],
    warnings: [
      'Undvik vid akuta infektioner',
      'Kan interagera med vissa mediciner',
      'Konsultera läkare vid leversjukdomar'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot ljus',
    shelfLife: '24 månader',
    manufacturer: 'TCM Wellness Sweden',
    certifications: ['9% Schisandriner', 'Traditionell Kinesisk Medicin', 'GMP-certifierad']
  },
  {
    id: 44,
    name: 'Astragalus (Huang Qi) 450mg - Immun & Energi',
    price: 429,
    description: 'Astragalus membranaceus, känd som Huang Qi i traditionell kinesisk medicin, är en av de viktigaste örterna för att stärka immunförsvaret och bygga upp kroppens skyddande Qi. Denna kraftfulla adaptogen stödjer energi, uthållighet och kroppens naturliga försvar mot stress och sjukdomar.',
    category: 'Kinesisk Medicin',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Astragalus%20Root%20supplement%20bottle%2C%20traditional%20chinese%20medicine%20design%2C%astragalus%20plant%20and%20roots%20illustration%2C%20yellow%20and%20brown%20colors%2C%20ancient%20chinese%20immune%20herb%2C%20protective%20qi%20and%20energy%20tonic&image_size=square',
    scientificName: 'Astragalus membranaceus (Fisch.) Bunge (70% polysackarider)',
    molecularFormula: 'C41H68O14 (Astragalosid IV)',
    concentration: '450mg Astragalus rotextrakt (70% polysackarider, 1% astragalosider)',
    pHLevel: 'Neutral',
    molecularWeight: '784.9 g/mol (Astragalosid IV)',
    ingredients: [
      'Astragalus membranaceus rotextrakt (70% polysackarider)',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat (vegetabilisk)',
      'Kiseldioxid'
    ],
    benefits: [
      'Stärker skyddande Qi och immunförsvar (TCM)',
      'Förbättrar energi och fysisk uthållighet',
      'Adaptogen för stresshantering',
      'Främjar hjärt- och kärlhälsa',
      'Kraftfull antioxidant för anti-aging'
    ],
    usage: 'Ta 1-2 kapslar dagligen, helst på morgonen. Använd regelbundet för bästa immunförbättring.',
    skinTypes: ['Stressad hud', 'Åldrande hud', 'Alla hudtyper'],
    timeToResults: '2-4 veckor för immunförbättring, 4-8 veckor för energi och anti-aging',
    clinicalStudies: [
      {
        title: 'Astragalus and Immune Function',
        results: 'Signifikant förbättring av immunförsvarsmarkörer och minskad infektionsfrekvens',
        duration: '8 veckor',
        participants: 120
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av immunfunktion, energi och stresshantering',
      timeline: 'Steady förbättring över 4-8 veckor',
      expectedResults: [
        'Veck 1-2: Initial immunförstärkning och energi',
        'Veck 2-4: Förbättrad stresshantering och uthållighet',
        'Veck 4-8: Optimal immunfunktion och vitalitet'
      ]
    },
    relatedProducts: [39, 40, 41, 42],
    warnings: [
      'Undvik vid autoimmuna sjukdomar utan läkarkonsultation',
      'Kan interagera med immunsuppressiva mediciner',
      'Konsultera läkare vid kroniska sjukdomar'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot ljus och värme',
    shelfLife: '36 månader',
    manufacturer: 'TCM Wellness Sweden',
    certifications: ['70% Polysackarider', 'Traditionell Kinesisk Medicin', 'Ekologisk', 'GMP-certifierad']
  },
  {
    id: 45,
    name: 'Kinesisk Skullcap (Huang Qin) 200mg - Inflammation',
    price: 369,
    description: 'Scutellaria baicalensis, känd som Huang Qin i traditionell kinesisk medicin, är en kraftfull anti-inflammatorisk ört som rensar värme och fukt från kroppen. Denna kraftfulla antioxidant stödjer leverhälsa, minskar inflammation och främjar avslappning genom att balansera kroppens inre miljö.',
    category: 'Kinesisk Medicin',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Chinese%20Skullcap%20supplement%20bottle%2C%20traditional%20chinese%20medicine%20design%2C%20scutellaria%20plant%20and%20flowers%20illustration%2C%20blue%20and%20purple%20colors%2C%20ancient%20chinese%20anti-inflammatory%20herb%2C%20liver%20health%20and%20relaxation%20tonic&image_size=square',
    scientificName: 'Scutellaria baicalensis Georgi (80% baikalin)',
    molecularFormula: 'C21H18O11 (Baikalin)',
    concentration: '200mg Skullcap rotextrakt (80% baikalin)',
    pHLevel: 'Neutral',
    molecularWeight: '446.4 g/mol (Baikalin)',
    ingredients: [
      'Scutellaria baicalensis rotextrakt (80% baikalin)',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat (vegetabilisk)',
      'Kiseldioxid'
    ],
    benefits: [
      'Rensar värme och inflammation (TCM)',
      'Kraftfull anti-inflammatorisk effekt',
      'Stödjer leverhälsa och detox',
      'Främjar avslappning och sömn',
      'Kraftfull antioxidant för anti-aging'
    ],
    usage: 'Ta 1 kapsel 2 gånger dagligen, helst efter måltid. Använd i 4-6 veckor för bästa resultat.',
    skinTypes: ['Inflammerad hud', 'Stressad hud', 'Alla hudtyper'],
    timeToResults: '1-2 veckor för inflammation, 4-6 veckor för leverstöd och anti-aging',
    clinicalStudies: [
      {
        title: 'Chinese Skullcap and Inflammation',
        results: 'Signifikant minskning av inflammationsmarkörer och förbättrad leverfunktion',
        duration: '4 veckor',
        participants: 80
      }
    ],
    beforeAfter: {
      description: 'Gradvis minskning av inflammation och förbättrad leverfunktion',
      timeline: 'Steady förbättring över 2-6 veckor',
      expectedResults: [
        'Veck 1-2: Minskad inflammation och rodnad',
        'Veck 2-4: Förbättrad leverfunktion och energi',
        'Veck 4-6: Optimal anti-inflammatorisk effekt och avslappning'
      ]
    },
    relatedProducts: [39, 40, 41, 42],
    warnings: [
      'Undvik vid akuta infektioner',
      'Kan orsaka mild dåsighet',
      'Konsultera läkare vid leversjukdomar eller mediciner'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot ljus',
    shelfLife: '24 månader',
    manufacturer: 'TCM Wellness Sweden',
    certifications: ['80% Baikalin', 'Traditionell Kinesisk Medicin', 'GMP-certifierad']
  },
  {
    id: 46,
    name: 'Cordyceps (Dong Chong Xia Cao) 350mg - Energi & Lungor',
    price: 589,
    description: 'Cordyceps sinensis, känd som Dong Chong Xia Cao eller "vinterns mask, sommarens gräs" i traditionell kinesisk medicin, är en av de mest värdefulla medicinska svamparna. Denna kraftfulla adaptogen stödjer lungfunktion, ökar fysisk uthållighet och främjar anti-aging genom att stärka kroppens grundläggande energi.',
    category: 'Kinesisk Medicin',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Cordyceps%20Mushroom%20supplement%20bottle%2C%20traditional%20chinese%20medicine%20design%2C%20cordyceps%20mushroom%20and%20caterpillar%20illustration%2C%20orange%20and%20brown%20colors%2C%20ancient%20chinese%20energy%20and%20lung%20tonic%2C%20athletic%20performance%20and%20anti-aging&image_size=square',
    scientificName: 'Cordyceps militaris (L.) Fr (30% polysackarider, 0.3% cordycepin)',
    molecularFormula: 'C10H13N5O3 (Cordycepin)',
    concentration: '350mg Cordyceps extrakt (30% polysackarider, 0.3% cordycepin)',
    pHLevel: 'Neutral',
    molecularWeight: '251.2 g/mol (Cordycepin)',
    ingredients: [
      'Cordyceps militaris svampextrakt (30% polysackarider)',
      'Vegetabilisk kapsel',
      'Risextrakt',
      'Magnesiumstearat (vegetabilisk)',
      'Kiseldioxid'
    ],
    benefits: [
      'Stärker lung-Qi och fysisk uthållighet (TCM)',
      'Ökar ATP-produktion och energi',
      'Förbättrar syreupptagning och atletisk prestation',
      'Adaptogen för stresshantering',
      'Kraftfull anti-aging och vitalitet'
    ],
    usage: 'Ta 1-2 kapslar dagligen, helst på morgonen. Använd regelbundet för bästa energiförbättring.',
    skinTypes: ['Trött hud', 'Åldrande hud', 'Alla hudtyper'],
    timeToResults: '2-3 veckor för energi, 4-6 veckor för lungstöd och anti-aging',
    clinicalStudies: [
      {
        title: 'Cordyceps and Athletic Performance',
        results: 'Förbättrad syreupptagning, ATP-produktion och atletisk prestation',
        duration: '6 veckor',
        participants: 100
      }
    ],
    beforeAfter: {
      description: 'Gradvis förbättring av energi, uthållighet och andningsfunktion',
      timeline: 'Steady förbättring över 3-6 veckor',
      expectedResults: [
        'Veck 1-2: Ökad energi och mental klarhet',
        'Veck 2-4: Förbättrad uthållighet och syreupptagning',
        'Veck 4-6: Optimal lungfunktion och vitalitet'
      ]
    },
    relatedProducts: [39, 40, 41, 42],
    warnings: [
      'Undvik vid autoimmuna sjukdomar utan läkarkonsultation',
      'Kan interagera med immunsuppressiva mediciner',
      'Konsultera läkare vid andningssjukdomar'
    ],
    storage: 'Förvaras torrt och svalt, skydda mot ljus och värme',
    shelfLife: '36 månader',
    manufacturer: 'TCM Wellness Sweden',
    certifications: ['30% Polysackarider', '0.3% Cordycepin', 'Ekologisk svamp', 'GMP-certifierad']
  },
  // Hälsotestprodukter
  {
    id: 47,
    name: 'pH-Test Strips - Kroppsbalans',
    price: 199,
    description: 'Högkvalitativa pH-test strips för att mäta kroppens syra-bas balans genom urin och saliv. Att upprätthålla optimal pH-balans (7.35-7.45) är grundläggande för hälsa, energi och anti-aging. Dessa professionella test strips ger snabba och noggranna resultat hemma.',
    category: 'Hälsotester',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20pH%20test%20strips%20box%2C%20modern%20health%20testing%20design%2C%20colorful%20pH%20scale%20and%20urine%20saliva%20testing%20illustration%2C%20blue%20and%20white%20colors%2C%20body%20acid-base%20balance%20monitoring%2C%20home%20health%20testing%20kit&image_size=square',
    scientificName: 'pH-indikatorpapper med färgkodning',
    molecularFormula: 'Indikatorblandning för pH-mätning',
    concentration: 'pH-intervall 4.5-9.0 med 0.5 intervall noggrannhet',
    pHLevel: 'Testar pH-nivåer i urin (6.0-7.5) och saliv (6.5-7.5)',
    molecularWeight: 'Ej tillämpligt för test strips',
    ingredients: [
      'pH-känsligt indikatorpapper',
      'Färgreferensskala',
      'Användarinstruktioner på svenska',
      'Förvaringsfodral',
      'Kvalitetskontrollcertifikat'
    ],
    benefits: [
      'Snabb och noggrann pH-mätning hemma',
      'Monitorerar kroppens syra-bas balans',
      'Hjälper optimera hälsa och energi',
      'Professionell kvalitet för pålitliga resultat',
      '100 test strips per förpackning'
    ],
    usage: 'Testa urin eller saliv på morgonen. Jämför färgen med medföljande skala. Optimal pH är 6.5-7.5 för saliv och 6.0-7.0 för urin.',
    skinTypes: ['Alla hudtyper', 'Stressad hud', 'Inflammerad hud'],
    timeToResults: 'Omedelbara resultat, använd regelbundet för att monitorera trender',
    clinicalStudies: [
      {
        title: 'pH Balance and Health Monitoring',
        results: 'Regelbunden pH-monitorering hjälper optimera kost och livsstil för bättre hälsa',
        duration: '12 veckor',
        participants: 200
      }
    ],
    beforeAfter: {
      description: 'Förbättrad kroppsbalans genom regelbunden pH-monitorering och livsstilsjusteringar',
      timeline: 'Gradvis förbättring över 2-4 veckor',
      expectedResults: [
        'Veck 1: Identifiera nuvarande pH-status',
        'Veck 2-3: Justera kost och livsstil baserat på resultat',
        'Veck 4: Uppnå optimal pH-balans och förbättrad hälsa'
      ]
    },
    relatedProducts: [48, 49, 50, 51],
    warnings: [
      'Förvaras torrt och svalt för att bevara noggrannhet',
      'Ersätter inte professionell medicinsk rådgivning',
      'Konsultera läkare vid extrema pH-värden'
    ],
    storage: 'Förvaras torrt och svalt, förslut behållaren ordentligt efter användning',
    shelfLife: '24 månader från öppning',
    manufacturer: 'HealthTest Sweden',
    certifications: ['CE-märkt', 'ISO 13485', 'Svenska instruktioner', 'Kliniskt validerad']
  },
  {
    id: 48,
    name: 'Kväveoxid Test Strips - Hjärt-Kärl',
    price: 249,
    description: 'Avancerade test strips för att mäta kväveoxid (NO) nivåer i saliv. Kväveoxid är avgörande för hjärt-kärlhälsa, blodcirkulation och anti-aging. Dessa professionella test strips hjälper dig monitorera din kardiovaskulära hälsa hemma och optimera ditt NO-understödjande livsstil.',
    category: 'Hälsotester',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Nitric%20Oxide%20test%20strips%20box%2C%20modern%20cardiovascular%20health%20design%2C%20saliva%20testing%20and%20heart%20circulation%20illustration%2C%20red%20and%20white%20colors%2C%20nitric%20oxide%20level%20monitoring%2C%20home%20heart%20health%20testing%20kit&image_size=square',
    scientificName: 'NO-indikator med färgkodning',
    molecularFormula: 'Nitritdetektion för NO-nivåer',
    concentration: 'Detekterar NO-nivåer: Låg, Optimal, Hög',
    pHLevel: 'Testar saliv NO-produktion',
    molecularWeight: 'Ej tillämpligt för test strips',
    ingredients: [
      'NO-känsligt indikatorpapper',
      'Färgreferensskala med NO-nivåer',
      'Detaljerade användarinstruktioner',
      'Förvaringsfodral',
      'Kvalitetskontrollcertifikat'
    ],
    benefits: [
      'Mäter kväveoxid för hjärt-kärlhälsa',
      'Monitorerar blodcirkulation och vaskulär funktion',
      'Hjälper optimera träning och kost för NO-produktion',
      'Professionell kvalitet för pålitliga resultat',
      '50 test strips per förpackning'
    ],
    usage: 'Testa saliv på morgonen före frukost. Jämför färgen med skalan. Optimala NO-nivåer stödjer blodcirkulation och hjärt hälsa.',
    skinTypes: ['Alla hudtyper', 'Åldrande hud', 'Cirkulationsproblem'],
    timeToResults: 'Omedelbara resultat, använd regelbundet för att monitorera kardiovaskulära trender',
    clinicalStudies: [
      {
        title: 'Nitric Oxide Testing and Cardiovascular Health',
        results: 'Regelbunden NO-monitorering korrelerar med förbättrad blodcirkulation och hjärthälsa',
        duration: '8 veckor',
        participants: 150
      }
    ],
    beforeAfter: {
      description: 'Förbättrad kväveoxidproduktion och kardiovaskulär hälsa genom regelbordn testing',
      timeline: 'Gradvis förbättring över 3-6 veckor',
      expectedResults: [
        'Veck 1: Identifiera nuvarande NO-status',
        'Veck 2-4: Justera kost, motion och kosttillskott',
        'Veck 6: Uppnå optimala NO-nivåer och förbättrad cirkulation'
      ]
    },
    relatedProducts: [47, 49, 50, 51],
    warnings: [
      'Förvaras torrt och svalt för att bevara noggrannhet',
      'Ersätter inte professionell medicinsk rådgivning',
      'Konsultera läkare vid kardiovaskulära problem'
    ],
    storage: 'Förvaras torrt och svalt, förslut behållaren ordentligt',
    shelfLife: '18 månader från öppning',
    manufacturer: 'HealthTest Sweden',
    certifications: ['CE-märkt', 'ISO 13485', 'Svenska instruktioner', 'Kliniskt validerad']
  },
  {
    id: 49,
    name: 'Socker/Keton Test Strips - Blodsocker',
    price: 229,
    description: 'Professionella test strips för att mäta glukos och ketoner i urin. Dessa dubbla test strips är avgörande för att monitorera blodsockerkontroll, ketos-tillstånd och metabol hälsa. Perfekt för personer som följer ketogen diet, har diabetes eller vill optimera sin metaboliska hälsa.',
    category: 'Hälsotester',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Glucose%20Ketone%20test%20strips%20box%2C%20modern%20metabolic%20health%20design%2C%20urine%20testing%20and%20blood%20sugar%20ketosis%20illustration%2C%20blue%20and%20green%20colors%2C%20diabetes%20monitoring%20and%20ketogenic%20diet%2C%20home%20metabolic%20health%20testing%20kit&image_size=square',
    scientificName: 'Glukos/keton-detektion med enzymatisk reaktion',
    molecularFormula: 'Glukosoxidaskedja och nitroprussidreaktion',
    concentration: 'Mäter glukos: 0-2000 mg/dL, Ketoner: 0-160 mg/dL',
    pHLevel: 'Testar urin glukos och ketonnivåer',
    molecularWeight: 'Ej tillämpligt för test strips',
    ingredients: [
      'Glukosoxidaspapper för sockerdetektion',
      'Nitroprussidpapper för ketondetektion',
      'Färgreferensskala för båda parametrar',
      'Detaljerade användarinstruktioner',
      'Förvaringsfodral'
    ],
    benefits: [
      'Dubbel testning: både glukos och ketoner',
      'Monitorerar blodsocker och ketos-tillstånd',
      'Hjälper optimera ketogen diet och diabeteskontroll',
      'Professionell kvalitet för pålitliga resultat',
      '100 test strips per förpackning'
    ],
    usage: 'Testa urin på morgonen och före måltider. Jämför färgerna med skalan. Använd för att monitorera metabol hälsa och dieteffektivitet.',
    skinTypes: ['Alla hudtyper', 'Diabetisk hud', 'Metabol problemhud'],
    timeToResults: 'Omedelbara resultat, använd dagligen för att monitorera metabol trender',
    clinicalStudies: [
      {
        title: 'Home Glucose and Ketone Monitoring',
        results: 'Regelbordn monitorering förbättrar blodsockerkontroll och dieteffektivitet',
        duration: '12 veckor',
        participants: 180
      }
    ],
    beforeAfter: {
      description: 'Förbättrad metabol kontroll genom regelbunden glukos och keton monitorering',
      timeline: 'Gradvis förbättring över 2-8 veckor',
      expectedResults: [
        'Veck 1: Identifiera nuvarande glukos/keton-status',
        'Veck 2-4: Justera kost och livsstil baserat på resultat',
        'Veck 8: Uppnå optimal metabol kontroll och hälsa'
      ]
    },
    relatedProducts: [47, 48, 50, 51],
    warnings: [
      'Förvaras torrt och svalt för att bevara noggrannhet',
      'Ersätter inte professionell medicinsk rådgivning',
      'Konsultera läkare vid diabetes eller metaboliska sjukdomar'
    ],
    storage: 'Förvaras torrt och svalt, förslut behållaren ordentligt',
    shelfLife: '18 månader från öppning',
    manufacturer: 'HealthTest Sweden',
    certifications: ['CE-märkt', 'ISO 13485', 'Svenska instruktioner', 'Kliniskt validerad']
  },
  {
    id: 50,
    name: 'Njurfunktion Test Kit - Hemmakontroll',
    price: 349,
    description: 'Komplett test kit för att monitorera njurfunktion hemma genom urinanalys. Mäter kreatinin, protein, blod och andra viktiga markörer som indikerar njurhälsa. Dessa avancerade test strips är avgörande för att upptäcka tidiga njurproblem och optimera din hälsa.',
    category: 'Hälsotester',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Kidney%20Function%20test%20kit%20box%2C%20modern%20renal%20health%20design%2C%20urine%20testing%20and%20kidney%20illustration%2C%20blue%20and%20white%20colors%2C%20home%20kidney%20health%20monitoring%2C%20creatinine%20and%20protein%20detection%20strips&image_size=square',
    scientificName: 'Njurfunktionsdetektion med multiparameteranalys',
    molecularFormula: 'Multipelt test för kreatinin, protein, blod etc.',
    concentration: 'Detekterar 10 parametrar inklusive kreatinin och mikroalbumin',
    pHLevel: 'Testar flera njurhälsoparametrar i urin',
    molecularWeight: 'Ej tillämpligt för test strips',
    ingredients: [
      'Multiparameter test strips för njurfunktion',
      'Färgreferensskala för alla parametrar',
      'Detaljerade tolkningsinstruktioner',
      'Förvaringsfodral',
      'Kvalitetskontrollcertifikat'
    ],
    benefits: [
      'Komplett njurfunktionsmonitorering hemma',
      'Detekterar kreatinin, protein, blod och 7 andra parametrar',
      'Tidig varning för njurproblem',
      'Hjälper optimera vätskeintag och hälsa',
      '25 test strips per förpackning'
    ],
    usage: 'Testa urin på morgonen. Använd medföljande skala för att tolka resultat för alla 10 parametrar. Följ medföljande tolkningsguide noggrant.',
    skinTypes: ['Alla hudtyper', 'Njurproblemshud', 'Allmän hälsokontroll'],
    timeToResults: 'Omedelbara resultat, använd veckovis för att monitorera njurtrender',
    clinicalStudies: [
      {
        title: 'Home Kidney Function Monitoring',
        results: 'Tidig upptäckt av njurproblem genom regelbunden hemtestning',
        duration: '24 veckor',
        participants: 250
      }
    ],
    beforeAfter: {
      description: 'Förbättrad njurhälsa genom regelbordn monitorering och tidig intervention',
      timeline: 'Gradvis förbättring över 4-12 veckor',
      expectedResults: [
        'Veck 1: Identifiera nuvarande njurstatus',
        'Veck 2-6: Justera vätskeintag och kost baserat på resultat',
        'Veck 12: Uppnå optimal njurfunktion och hälsa'
      ]
    },
    relatedProducts: [47, 48, 49, 51],
    warnings: [
      'Förvaras torrt och svalt för att bevara noggrannhet',
      'Ersätter inte professionell medicinsk rådgivning',
      'Konsultera läkare vid onormala resultat eller njurproblem'
    ],
    storage: 'Förvaras torrt och svalt, förslut behållaren ordentligt',
    shelfLife: '24 månader från öppning',
    manufacturer: 'HealthTest Sweden',
    certifications: ['CE-märkt', 'ISO 13485', 'Svenska instruktioner', 'Kliniskt validerad']
  },
  {
    id: 51,
    name: 'Leverfunktion Test Kit - Hemmakontroll',
    price: 379,
    description: 'Avancerat test kit för att monitorera leverfunktion hemma genom urinanalys. Detekterar bilirubin, urobilinogen och andra levermarkörer som indikerar leverhälsa. Dessa professionella test strips är avgörande för att upptäcka tidiga leverproblem och optimera din detox och anti-aging rutin.',
    category: 'Hälsotester',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Liver%20Function%20test%20kit%20box%2C%20modern%20hepatic%20health%20design%2C%20urine%20testing%20and%20liver%20detox%20illustration%2C%20green%20and%20white%20colors%2C%20home%20liver%20health%20monitoring%2C%20bilirubin%20and%20detox%20detection%20strips&image_size=square',
    scientificName: 'Leverfunktionsdetektion med bilirubin och urobilinogen',
    molecularFormula: 'Bilirubin och urobilinogen detektion',
    concentration: 'Detekterar bilirubin, urobilinogen och 8 andra leverparametrar',
    pHLevel: 'Testar leverhälsoparametrar i urin',
    molecularWeight: 'Ej tillämpligt för test strips',
    ingredients: [
      'Multiparameter test strips för leverfunktion',
      'Färgreferensskala för alla parametrar',
      'Detaljerade tolkningsinstruktioner',
      'Förvaringsfodral',
      'Kvalitetskontrollcertifikat'
    ],
    benefits: [
      'Komplett leverfunktionsmonitorering hemma',
      'Detekterar bilirubin, urobilinogen och 8 andra parametrar',
      'Tidig varning för leverproblem',
      'Hjälper optimera detox och anti-aging',
      '25 test strips per förpackning'
    ],
    usage: 'Testa urin på morgonen. Använd medföljande skala för att tolka resultat för alla 10 parametrar. Följ tolkningsguiden noggrant för leverhälsa.',
    skinTypes: ['Alla hudtyper', 'Leverproblemshud', 'Detox och anti-aging'],
    timeToResults: 'Omedelbara resultat, använd veckovis för att monitorera levertrender',
    clinicalStudies: [
      {
        title: 'Home Liver Function Monitoring',
        results: 'Tidig upptäckt av leverproblem genom regelbunden hemtestning och detox-optimering',
        duration: '16 veckor',
        participants: 180
      }
    ],
    beforeAfter: {
      description: 'Förbättrad leverhälsa och detox genom regelbordn monitorering och tidig intervention',
      timeline: 'Gradvis förbättring över 4-12 veckor',
      expectedResults: [
        'Veck 1: Identifiera nuvarande leverstatus',
        'Veck 2-6: Justera detox-rutin och kost baserat på resultat',
        'Veck 12: Uppnå optimal leverfunktion och anti-aging'
      ]
    },
    relatedProducts: [47, 48, 49, 50],
    warnings: [
      'Förvaras torrt och svalt för att bevara noggrannhet',
      'Ersätter inte professionell medicinsk rådgivning',
      'Konsultera läkare vid onormala resultat eller leverproblem'
    ],
    storage: 'Förvaras torrt och svalt, förslut behållaren ordentligt',
    shelfLife: '24 månader från öppning',
    manufacturer: 'HealthTest Sweden',
    certifications: ['CE-märkt', 'ISO 13485', 'Svenska instruktioner', 'Kliniskt validerad']
  },
  {
    id: 52,
    name: 'Vitamin D Test Kit - Hemmakontroll',
    price: 299,
    description: 'Avancerat blodtest för att mäta vitamin D3 (25-OH) nivåer hemma. Vitamin D är avgörande för immunförsvar, benhälsa, humör och anti-aging. Detta professionella test kit ger noggranna resultat och hjälper dig optimera ditt D-vitaminintag för optimal hälsa.',
    category: 'Hälsotester',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Vitamin%20D%20test%20kit%20box%2C%20modern%20bone%20health%20design%2C%20blood%20spot%20testing%20and%20sun%20vitamin%20illustration%2C%20orange%20and%20blue%20colors%2C%20home%20vitamin%20D%20monitoring%2C%25-OH%20D3%20detection%20and%20immune%20health&image_size=square',
    scientificName: '25-hydroxyvitamin D3 (25-OH-D3) detektion',
    molecularFormula: 'C27H44O (Vitamin D3)',
    concentration: 'Mäter 25-OH-D3: 10-100 ng/mL med 5 ng/mL noggrannhet',
    pHLevel: 'Blodtest för vitamin D-status',
    molecularWeight: '384.6 g/mol (Vitamin D3)',
    ingredients: [
      'Blodprovtagningsset med lansett',
      'Testkort för 25-OH-D3 analys',
      'Förbehandlingslösning',
      'Detaljerade instruktioner och tolkningsguide',
      'Förvaringsfodral och returkuvert'
    ],
    benefits: [
      'Noggrann mätning av vitamin D3 nivåer',
      'Avgörande för immunförsvar och benhälsa',
      'Hjälper optimera sol exponering och kosttillskott',
      'Professionell kvalitet för pålitliga resultat',
      'Snabba resultat inom 5-7 dagar'
    ],
    usage: 'Ta ett blodprov med fingerstick. Skicka till labb enligt instruktioner. Få resultat och tolkning inom en vecka.',
    skinTypes: ['Alla hudtyper', 'Immunproblemshud', 'Benhälsoproblem'],
    timeToResults: '5-7 dagar för labbresultat, optimala nivåer är 30-50 ng/mL',
    clinicalStudies: [
      {
        title: 'Vitamin D Testing and Immune Health',
        results: 'Tillräckliga D-vitaminnivåer korrelerar med starkt immunförsvar och bättre benhälsa',
        duration: 'Årlig monitorering',
        participants: 1000
      }
    ],
    beforeAfter: {
      description: 'Förbättrad vitamin D-status genom regelbunden monitorering och optimering',
      timeline: 'Gradvis förbättring över 8-12 veckor',
      expectedResults: [
        'Veck 1: Testa nuvarande D-vitaminstatus',
        'Veck 2-8: Justera sol exponering och kosttillskott',
        'Veck 12: Uppnå optimala D-vitaminnivåer och hälsa'
      ]
    },
    relatedProducts: [53, 54, 55, 56],
    warnings: [
      'Följ blodprovtagningsinstruktioner noggrant',
      'Ersätter inte professionell medicinsk rådgivning',
      'Konsultera läkare vid extrema resultat eller hälsoproblem'
    ],
    storage: 'Förvara testkort torrt och svalt, skicka snabbt till labb',
    shelfLife: '12 månader',
    manufacturer: 'HealthTest Sweden',
    certifications: ['CE-märkt', 'ISO 13485', 'CLIA-certifierad labb', 'Svenska instruktioner']
  },
  {
    id: 53,
    name: 'Omega-3 Index Test - Fettsyror',
    price: 449,
    description: 'Avancerat blodtest för att mäta omega-3 fettsyror (EPA/DHA) i röda blodkroppar. Omega-3 index är en viktig markör för hjärt-kärlhälsa, inflammation och anti-aging. Detta professionella test ger noggrann analys av dina omega-3 nivåer och hjälper optimera ditt intag.',
    category: 'Hälsotester',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Omega-3%20Index%20test%20kit%20box%2C%20modern%20fatty%20acid%20analysis%20design%2C%20blood%20spot%20testing%20and%20fish%20oil%20illustration%2C%20blue%20and%20green%20colors%2C%20home%20omega-3%20monitoring%2C%20EPA%20DHA%20detection%20and%20heart%20health&image_size=square',
    scientificName: 'Omega-3 fettsyror (EPA/DHA) i röda blodkroppar',
    molecularFormula: 'C20H30O2 (EPA), C22H32O2 (DHA)',
    concentration: 'Mäter Omega-3 Index: 0-12% med 0.1% noggrannhet',
    pHLevel: 'Blodtest för omega-3 status',
    molecularWeight: '302.5 g/mol (EPA), 328.5 g/mol (DHA)',
    ingredients: [
      'Blodprovtagningsset med lansett',
      'Testkort för omega-3 analys',
      'Förbehandlingslösning',
      'Detaljerade instruktioner och tolkningsguide',
      'Förvaringsfodral och returkuvert'
    ],
    benefits: [
      'Noggrann mätning av omega-3 index',
      'Viktig markör för hjärt-kärlhälsa',
      'Hjälper optimera fiskoljetillskott och kost',
      'Professionell kvalitet för pålitliga resultat',
      'Snabba resultat inom 7-10 dagar'
    ],
    usage: 'Ta ett blodprov med fingerstick. Skicka till labb enligt instruktioner. Få detaljerad omega-3 analys inom 10 dagar.',
    skinTypes: ['Alla hudtyper', 'Inflammerad hud', 'Hjärt-kärlproblem'],
    timeToResults: '7-10 dagar för labbresultat, optimala nivåer är 8-12%',
    clinicalStudies: [
      {
        title: 'Omega-3 Index and Cardiovascular Health',
        results: 'Högt omega-3 index korrelerar med minskad hjärt-kärl risk och minskad inflammation',
        duration: 'Longitudinell studie',
        participants: 2500
      }
    ],
    beforeAfter: {
      description: 'Förbättrad omega-3 status genom regelbunden monitorering och optimering',
      timeline: 'Gradvis förbättring över 12-16 veckor',
      expectedResults: [
        'Veck 1: Testa nuvarande omega-3 index',
        'Veck 2-12: Justera fiskoljetillskott och kost',
        'Veck 16: Uppnå optimala omega-3 nivåer och anti-aging'
      ]
    },
    relatedProducts: [52, 54, 55, 56],
    warnings: [
      'Följ blodprovtagningsinstruktioner noggrant',
      'Ersätter inte professionell medicinsk rådgivning',
      'Konsultera läkare vid extrema resultat eller hjärtproblem'
    ],
    storage: 'Förvara testkort torrt och svalt, skicka snabbt till labb',
    shelfLife: '12 månader',
    manufacturer: 'HealthTest Sweden',
    certifications: ['CE-märkt', 'ISO 13485', 'CLIA-certifierad labb', 'Svenska instruktioner']
  },
  {
    id: 54,
    name: 'HbA1c Test - Långtidsblodsocker',
    price: 329,
    description: 'Avancerat blodtest för att mäta HbA1c (glykerat hemoglobin) nivåer. HbA1c visar ditt genomsnittliga blodsocker de senaste 2-3 månaderna och är den guldstandard för diabetesmonitorering. Detta professionella test hjälper optimera blodsockerkontroll och anti-aging.',
    category: 'Hälsotester',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20HbA1c%20test%20kit%20box%2C%20modern%20diabetes%20monitoring%20design%2C%20blood%20spot%20testing%20and%20sugar%20molecule%20illustration%2C%20red%20and%20white%20colors%2C%20home%20long-term%20glucose%20monitoring%2C%20glycated%20hemoglobin%20detection&image_size=square',
    scientificName: 'Glykerat hemoglobin (HbA1c) i röda blodkroppar',
    molecularFormula: 'C42H68N11O16 (HbA1c)',
    concentration: 'Mäter HbA1c: 4.0-15.0% med 0.1% noggrannhet',
    pHLevel: 'Blodtest för långtidsglukos',
    molecularWeight: '151.2 g/mol (Glukos)',
    ingredients: [
      'Blodprovtagningsset med lansett',
      'Testkort för HbA1c analys',
      'Förbehandlingslösning',
      'Detaljerade instruktioner och tolkningsguide',
      'Förvaringsfodral och returkuvert'
    ],
    benefits: [
      'Noggrann mätning av långtidsblodsocker',
      'Guldstandard för diabetesmonitorering',
      'Hjälper optimera kost och diabeteshantering',
      'Professionell kvalitet för pålitliga resultat',
      'Snabba resultat inom 3-5 dagar'
    ],
    usage: 'Ta ett blodprov med fingerstick. Skicka till labb enligt instruktioner. Få detaljerad HbA1c analys inom 5 dagar.',
    skinTypes: ['Alla hudtyper', 'Diabetisk hud', 'Metabol problemhud'],
    timeToResults: '3-5 dagar för labbresultat, optimala nivåer är <5.7%',
    clinicalStudies: [
      {
        title: 'HbA1c Testing and Diabetes Management',
        results: 'Regelbunden HbA1c-monitorering förbättrar blodsockerkontroll och minskar komplikationer',
        duration: 'Longitudinell studie',
        participants: 3000
      }
    ],
    beforeAfter: {
      description: 'Förbättrad blodsockerkontroll genom regelbunden HbA1c-monitorering och optimering',
      timeline: 'Gradvis förbättring över 12-16 veckor',
      expectedResults: [
        'Veck 1: Testa nuvarande HbA1c-nivå',
        'Veck 2-12: Justera kost, motion och mediciner',
        'Veck 16: Uppnå optimala blodsockernivåer och hälsa'
      ]
    },
    relatedProducts: [52, 53, 55, 56],
    warnings: [
      'Följ blodprovtagningsinstruktioner noggrant',
      'Ersätter inte professionell medicinsk rådgivning',
      'Konsultera läkare vid extrema resultat eller diabetes'
    ],
    storage: 'Förvara testkort torrt och svalt, skicka snabbt till labb',
    shelfLife: '12 månader',
    manufacturer: 'HealthTest Sweden',
    certifications: ['CE-märkt', 'ISO 13485', 'CLIA-certifierad labb', 'Svenska instruktioner']
  },
  {
    id: 55,
    name: 'CRP Test - Inflammation i Kroppen',
    price: 279,
    description: 'Avancerat blodtest för att mäta C-reaktivt protein (CRP) nivåer. CRP är en känslig inflammationsmarkör som indikerar låggradig inflammation i kroppen, vilket är kopplat till åldrande, hjärt-kärlsjukdom och autoimmuna tillstånd. Detta test hjälper optimera anti-aging och inflammation.',
    category: 'Hälsotester',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20CRP%20test%20kit%20box%2C%20modern%20inflammation%20monitoring%20design%2C%20blood%20spot%20testing%20and%20inflammation%20molecule%20illustration%2C%20red%20and%20white%20colors%2C%20home%20CRP%20monitoring%2C%20C-reactive%20protein%20detection%20and%20anti-aging&image_size=square',
    scientificName: 'C-reaktivt protein (CRP) i blodserum',
    molecularFormula: 'C27H44O2 (CRP)',
    concentration: 'Mäter CRP: 0.5-200 mg/L med 0.1 mg/L noggrannhet',
    pHLevel: 'Blodtest för inflammation',
    molecularWeight: '115.1 kDa (CRP)',
    ingredients: [
      'Blodprovtagningsset med lansett',
      'Testkort för CRP analys',
      'Förbehandlingslösning',
      'Detaljerade instruktioner och tolkningsguide',
      'Förvaringsfodral och returkuvert'
    ],
    benefits: [
      'Noggrann mätning av inflammationsnivåer',
      'Känslig markör för låggradig inflammation',
      'Hjälper optimera anti-aging och hälsa',
      'Professionell kvalitet för pålitliga resultat',
      'Snabba resultat inom 2-3 dagar'
    ],
    usage: 'Ta ett blodprov med fingerstick. Skicka till labb enligt instruktioner. Få detaljerad CRP analys inom 3 dagar.',
    skinTypes: ['Alla hudtyper', 'Inflammerad hud', 'Autoimmun hud'],
    timeToResults: '2-3 dagar för labbresultat, optimala nivåer är <3.0 mg/L',
    clinicalStudies: [
      {
        title: 'CRP Testing and Anti-aging',
        results: 'Låga CRP-nivåer korrelerar med minskad åldrande och bättre hälsa',
        duration: 'Longitudinell studie',
        participants: 5000
      }
    ],
    beforeAfter: {
      description: 'Minskad inflammation genom regelbunden CRP-monitorering och anti-aging optimering',
      timeline: 'Gradvis förbättring över 8-12 veckor',
      expectedResults: [
        'Veck 1: Testa nuvarande CRP-nivå',
        'Veck 2-8: Justera kost, motion och anti-aging rutin',
        'Veck 12: Uppnå optimala inflammationsnivåer och hälsa'
      ]
    },
    relatedProducts: [52, 53, 54, 56],
    warnings: [
      'Följ blodprovtagningsinstruktioner noggrant',
      'Ersätter inte professionell medicinsk rådgivning',
      'Konsultera läkare vid höga resultat eller hälsoproblem'
    ],
    storage: 'Förvara testkort torrt och svalt, skicka snabbt till labb',
    shelfLife: '12 månader',
    manufacturer: 'HealthTest Sweden',
    certifications: ['CE-märkt', 'ISO 13485', 'CLIA-certifierad labb', 'Svenska instruktioner']
  },
  {
    id: 56,
    name: 'Homocystein Test - Hjärt-Kärl Risk',
    price: 359,
    description: 'Avancerat blodtest för att mäta homocystein nivåer. Homocystein är en viktig markör för hjärt-kärl risk, B-vitamin status och anti-aging. Förhöjda nivåer är kopplade till ökad hjärt-kärl risk, åldrande och kognitiv nedgång. Detta test hjälper optimera din hjärthälsa.',
    category: 'Hälsotester',
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20Homocysteine%20test%20kit%20box%2C%20modern%20cardiovascular%20risk%20design%2C%20blood%20spot%20testing%20and%20heart%20molecule%20illustration%2C%20red%20and%20blue%20colors%2C%20home%20homocysteine%20monitoring%2C%20B-vitamin%20status%20and%20heart%20health&image_size=square',
    scientificName: 'Homocystein i blodserum',
    molecularFormula: 'C4H9NO2S (Homocystein)',
    concentration: 'Mäter homocystein: 2-50 µmol/L med 0.5 µmol/L noggrannhet',
    pHLevel: 'Blodtest för hjärt-kärl risk',
    molecularWeight: '135.2 g/mol (Homocystein)',
    ingredients: [
      'Blodprovtagningsset med lansett',
      'Testkort för homocystein analys',
      'Förbehandlingslösning',
      'Detaljerade instruktioner och tolkningsguide',
      'Förvaringsfodral och returkuvert'
    ],
    benefits: [
      'Noggrann mätning av hjärt-kärl riskmarkör',
      'Viktig B-vitamin status indikator',
      'Hjälper optimera B-vitamin tillskott och kost',
      'Professionell kvalitet för pålitliga resultat',
      'Snabba resultat inom 3-4 dagar'
    ],
    usage: 'Ta ett blodprov med fingerstick. Skicka till labb enligt instruktioner. Få detaljerad homocystein analys inom 4 dagar.',
    skinTypes: ['Alla hudtyper', 'Hjärt-kärlproblem', 'B-vitamin brist'],
    timeToResults: '3-4 dagar för labbresultat, optimala nivåer är <10 µmol/L',
    clinicalStudies: [
      {
        title: 'Homocysteine and Cardiovascular Risk',
        results: 'Låga homocysteinnivåer korrelerar med minskad hjärt-kärl risk och bättre anti-aging',
        duration: 'Longitudinell studie',
        participants: 4000
      }
    ],
    beforeAfter: {
      description: 'Minskad hjärt-kärl risk genom regelbunden homocystein-monitorering och optimering',
      timeline: 'Gradvis förbättring över 8-12 veckor',
      expectedResults: [
        'Veck 1: Testa nuvarande homocystein-nivå',
        'Veck 2-8: Justera B-vitamin tillskott och kost',
        'Veck 12: Uppnå optimala homocysteinnivåer och minskad risk'
      ]
    },
    relatedProducts: [52, 53, 54, 55],
    warnings: [
      'Följ blodprovtagningsinstruktioner noggrant',
      'Ersätter inte professionell medicinsk rådgivning',
      'Konsultera läkare vid höga resultat eller hjärtproblem'
    ],
    storage: 'Förvara testkort torrt och svalt, skicka snabbt till labb',
    shelfLife: '12 månader',
    manufacturer: 'HealthTest Sweden',
    certifications: ['CE-märkt', 'ISO 13485', 'CLIA-certifierad labb', 'Svenska instruktioner']
  }
];

export const getProductById = (id: number): EnhancedProduct | undefined => {
  return enhancedProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): EnhancedProduct[] => {
  return enhancedProducts.filter(product => product.category === category);
};

export const getRelatedProducts = (productId: number): EnhancedProduct[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return product.relatedProducts
    .map(id => getProductById(id))
    .filter((p): p is EnhancedProduct => p !== undefined);
};