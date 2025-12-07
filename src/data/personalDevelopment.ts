// Personlig utveckling - struktur, typer och util-funktioner

export interface PDDocument {
  id: string | number
  title: string
  slug: string
  category: 'Mindfulness' | 'Mental Träning' | 'Mål & Motivation' | 'Stresshantering' | 'Självbild'
  description: string
  content: any
  author: string
  createdAt: string
  updatedAt: string
  status: 'draft' | 'published' | 'archived'
  version?: string
  revision?: number
}

export interface PDCourse {
  id: string | number
  title: string
  slug: string
  description: string
  level: 'Nybörjare' | 'Mellanliggande' | 'Avancerad'
  duration: string
  price: string | number
  status: 'active' | 'inactive'
  imageUrl?: string
  rating?: number
  tags?: string[]
  modules?: Array<{
    id: string
    title: string
    description: string
    lessons: Array<{ id: string; title: string; description?: string }>
  }>
  version?: string
  revision?: number
}

// Grunddata (kan fyllas på av användaren)
export const personalDevelopmentDocuments: PDDocument[] = []
export const personalDevelopmentCourses: PDCourse[] = []

// Import/Export helpers för enkel hantering
export function importPersonalDevelopment(data: {
  documents?: PDDocument[]
  courses?: PDCourse[]
  author?: string
}): { addedDocuments: number; addedCourses: number } {
  const now = new Date().toISOString()
  let addedDocuments = 0
  let addedCourses = 0

  if (Array.isArray(data.documents)) {
    for (const doc of data.documents) {
      const existing = personalDevelopmentDocuments.find(d => d.slug === doc.slug || d.id === doc.id)
      const newDoc: PDDocument = {
        ...doc,
        author: doc.author || data.author || 'System',
        createdAt: doc.createdAt || now,
        updatedAt: now,
        status: doc.status || 'draft'
      }
      if (!existing) {
        personalDevelopmentDocuments.push(newDoc)
        addedDocuments++
      } else {
        // Uppdatera befintlig
        Object.assign(existing, newDoc)
      }
    }
  }

  if (Array.isArray(data.courses)) {
    for (const course of data.courses) {
      const existing = personalDevelopmentCourses.find(c => c.slug === course.slug || c.id === course.id)
      const newCourse: PDCourse = {
        ...course,
        status: course.status || 'active'
      }
      if (!existing) {
        personalDevelopmentCourses.push(newCourse)
        addedCourses++
      } else {
        Object.assign(existing, newCourse)
      }
    }
  }

  // Spara i localStorage för backupService att hitta
  try {
    localStorage.setItem('personal_development_documents', JSON.stringify(personalDevelopmentDocuments))
    localStorage.setItem('personal_development_courses', JSON.stringify(personalDevelopmentCourses))
  } catch {}

  return { addedDocuments, addedCourses }
}

export function exportPersonalDevelopment() {
  return {
    documents: [...personalDevelopmentDocuments],
    courses: [...personalDevelopmentCourses]
  }
}

// Revision helpers via versionControl
import { versionControl, ContentVersion } from '@/data/versionControl'

export function assignRevisionForDocument(doc: PDDocument, changes: string[], author: string = 'System'): ContentVersion {
  const version = versionControl.createVersion(
    'article',
    doc.id,
    doc.title,
    doc,
    changes,
    author
  )
  // Uppdatera doc med version/revision
  doc.version = version.version
  doc.revision = version.revision
  doc.updatedAt = new Date().toISOString()
  return version
}

export function assignRevisionForCourse(course: PDCourse, changes: string[], author: string = 'System'): ContentVersion {
  const version = versionControl.createVersion(
    'course',
    course.id,
    course.title,
    course,
    changes,
    author
  )
  course.version = version.version
  course.revision = version.revision
  return version
}

// Hjälpfunktioner för att hämta senaste versioner
export function getLatestDocumentRevision(id: string | number): ContentVersion | undefined {
  return versionControl.getLatestVersion('article', id)
}

export function getLatestCourseRevision(id: string | number): ContentVersion | undefined {
  return versionControl.getLatestVersion('course', id)
}

// Seed-funktion: lägger in kursinbjudan och kurs som användaren skickat
export function seedPersonalDevelopmentInvitation() {
  const now = new Date().toISOString()
  const author = 'Hindrik Ounpuu'

  const invitationText = `Inbjudan till kursen personlig utveckling med inre bilder\n\nUpplägg: Kursen kommer att gå tre söndagar med två veckor mellan kurstillfällena. Vi arbetar 09.00–15.00 med lunch och fika. Jag står för en lättare lunch och egenbakade kakor till kaffet.\nNär: Första tillfället är den 5/3, nästa 19/3 och sista tillfället den 2/4\nPlats: Koarp 266\nAntal deltagare: Max 6 st\nKostnad: 2500:- för nya deltagare och 2000:- för tidigare deltagare. Kursmaterial ingår och kommer delvis att skickas ut innan samt delas ut under kursens gång.\n\nVarför personlig utveckling med inre bilder?\n1. Mindre stress – lär dig rätt knep och tekniker för att minska vardaglig stress.\n2. Bättre resultat – arbeta med mål och målbilder för ökad prestationsförmåga.\n3. Bättre självförtroende – stärk självkänsla, självbild och självförtroende.\n4. Ökad medvetenhet – lev i nuet, släpp det som passerat och sluta oroa dig för framtiden.\n5. Ökad kreativitet – utveckla din kreativitet och problemlösningsförmåga.\n\nPersonlig utveckling – arbetssätt\nVi arbetar med den personliga utvecklingen genom inre bilder där du kommunicerar med dig själv och får reflektioner från övriga deltagare. Fokuset är här och nu, med positivt lärande från dåtid.\n\nPersonlig utveckling – två förändringssätt\n1. Fysiska förändringar (t.ex. byta jobb).\n2. Mentala förändringar: självförtroende, självkänsla, målbilder, motivation m.m.\n\nVi fokuserar på mental utveckling genom meditation, inre bilder och avslappningsövningar.\n\nVälkomna, Hindrik\nPS. Referenser från tidigare deltagare finns.\nTelefon: 0709783708\nMail: hindrikounpuu@gmail.com`

  const doc: PDDocument = {
    id: 'pd-inbjudan-inre-bilder-2023',
    title: 'Inbjudan: Personlig utveckling med inre bilder',
    slug: 'personlig-utveckling-inre-bilder-inbjudan',
    category: 'Mindfulness',
    description: 'Kursinbjudan med upplägg, tider, plats, kostnad och motiv för personlig utveckling.',
    content: invitationText,
    author,
    createdAt: now,
    updatedAt: now,
    status: 'published'
  }

  const course: PDCourse = {
    id: 'pd-course-inre-bilder-2023',
    title: 'Personlig utveckling med inre bilder',
    slug: 'personlig-utveckling-inre-bilder',
    description: 'Tre kursdtillfällen med fokus på mental utveckling, inre bilder och avslappning.',
    level: 'Nybörjare',
    duration: 'Tre söndagar, 09:00–15:00',
    price: '2500:- nya / 2000:- tidigare',
    status: 'active',
    tags: ['Koarp 266', 'Max 6 deltagare', 'Meditation', 'Inre bilder', 'Avslappningsövningar'],
    modules: [
      { id: 'm1', title: 'Tillfälle 1: Grundläggande tekniker', description: 'Introduktion till inre bilder och mental träning', lessons: [] },
      { id: 'm2', title: 'Tillfälle 2: Fördjupning och praktik', description: 'Praktiska övningar och målarbete', lessons: [] },
      { id: 'm3', title: 'Tillfälle 3: Integration och framtid', description: 'Integrera teknikerna i vardagen', lessons: [] }
    ]
  }

  // Importera och tilldela revisioner
  const { addedDocuments, addedCourses } = importPersonalDevelopment({ documents: [doc], courses: [course], author })
  assignRevisionForDocument(doc, ['Initial inbjudan till kursen inlagd'], author)
  assignRevisionForCourse(course, ['Kursdefinition baserad på inbjudan inlagd'], author)

  return { addedDocuments, addedCourses }
}

// Seed-funktion: lägger in kunskap om de 12 tecknen på åldrande
export function seedAgingSignsKnowledge() {
  const now = new Date().toISOString()
  const author = 'System'

  const sections = [
    { title: '1. Förändrad Cellkommunikation', description: 'När vi blir äldre kommunicerar våra celler sämre med varandra. Det kan leda till sjukdomar.' },
    { title: '2. Genomisk Instabilitet', description: 'Vårt DNA blir instabilt och mer skadat med tiden, vilket kan orsaka problem som cancer.' },
    { title: '3. Telomerförkortning', description: 'Varje gång en cell delar sig, blir ändarna av DNA:t, kallade telomerer, kortare. Det gör att cellerna slutar fungera ordentligt.' },
    { title: '4. Epigenetiska Förändringar', description: 'Hur generna i vårt DNA agerar kan ändras över tid på grund av saker som stress och kost.' },
    { title: '5. Förlust av Proteostas', description: 'Cellerna blir sämre på att hantera och reparera proteiner, vilket kan leda till sjukdomar som Alzheimers.' },
    { title: '6. Cellulär Senescens', description: 'Gamla celler slutar att dela sig och kan skada närliggande celler, vilket skapar inflammation.' },
    { title: '7. Mitokondriell Dysfunktion', description: 'De delar av cellerna som skapar energi fungerar sämre när vi blir äldre, vilket gör oss tröttare och mer mottagliga för sjukdomar.' },
    { title: '8. Nedsatt Autofagi', description: 'Cellerna blir sämre på att städa upp skadade delar inuti sig själva, vilket gör dem mindre effektiva.' },
    { title: '9. Stamcellsutmattning', description: 'Vi har färre stamceller när vi blir äldre, vilket gör att kroppen reparerar sig själv långsammare.' },
    { title: '10. Inflammation', description: 'Långvarig inflammation kan vara skadlig och är en av de viktigaste orsakerna till åldersrelaterade sjukdomar.' },
    { title: '11. Skada på Extracellulära Matrix', description: 'Det som håller ihop våra celler blir svagare, vilket kan leda till att vävnader och organ inte fungerar som de ska.' },
    { title: '12. Nedsatt Adaptiv Stressrespons', description: 'Våra celler blir sämre på att anpassa sig till förändringar, som höga temperaturer eller näringsbrist, vilket gör dem skörare.' }
  ]

  const conclusion = 'Genom att förstå dessa tecken på åldrande kan vi kanske bromsa eller till och med vända effekterna av åldrande. Forskning pågår för att se hur vi kan förbättra dessa processer för ett längre och friskare liv.'

  const doc: PDDocument = {
    id: 'pd-knowledge-aging-signs-2025',
    title: 'De 12 tecknen på åldrande och varför de är viktiga',
    slug: 'aging-signs-knowledge',
    category: 'Självbild',
    description: 'Kunskapsöversikt över tolv biologiska tecken på åldrande med förklaringar och slutsats.',
    content: { sections, conclusion },
    author: author,
    createdAt: now,
    updatedAt: now,
    status: 'published'
  }

  const { addedDocuments } = importPersonalDevelopment({ documents: [doc], author })
  assignRevisionForDocument(doc, ['Kunskapsdokument: De 12 tecknen på åldrande uppdaterad/inlagd'], author)

  return { addedDocuments }
}

// Seed-funktion: lägger in kunskap om DMAE
export function seedDMAEKnowledge() {
  const now = new Date().toISOString()
  const author = 'System'

  const content = {
    overview: 'Dimetylaminoetanol (DMAE) är en förening som kan påverka acetylkolinsystemet, hjärnans funktion och hudens fasthet. Evidensen är blandad men lovande inom vissa områden.',
    brainEffects: [
      { title: 'Kognition', description: 'DMAE kan stödja fokus och uppmärksamhet via kolinerga vägar.' },
      { title: 'Neuroprotektion', description: 'Viss data pekar på antioxidativ verkan och minskad oxidativ stress.' }
    ],
    antiAging: [
      { title: 'Hud', description: 'Topikal eller oral användning har kopplats till förbättrad hudfasthet i mindre studier.' },
      { title: 'Energi', description: 'Användare rapporterar förbättrad energi, men högkvalitativa kontrollerade studier behövs.' }
    ],
    clinicalStudies: 'Sammanställning av äldre och nyare studier indikerar potential inom hud och kognition, men fler randomiserade kontrollerade prövningar krävs.',
    conclusion: 'DMAE kan vara ett komplement men ska användas med försiktighet och individuell utvärdering.',
    references: [
      'Duffy, R. (2004). The effects of DMAE on cognitive function. Journal of Nutritional Biochemistry.',
      'Kahn, S. (2005). DMAE: A potential treatment for age-related cognitive decline. Journal of Aging Research.',
      'Kligman, A. M., & Christophers, E. (1974). Dermatologic therapy with DMAE. Archives of Dermatology.'
    ]
  }

  const doc: PDDocument = {
    id: 'pd-knowledge-dmae-2025',
    title: 'DMAE – Effekter på hjärnan och anti-aging',
    slug: 'dmae-knowledge',
    category: 'Mindfulness',
    description: 'Kunskapsöversikt och vetenskaplig sammanställning om DMAE: hjärna, hud, anti-aging och referenser.',
    content,
    author,
    createdAt: now,
    updatedAt: now,
    status: 'published'
  }

  const { addedDocuments } = importPersonalDevelopment({ documents: [doc], author })
  assignRevisionForDocument(doc, ['Kunskapsdokument: DMAE sammanställning inlagd'], author)
  return { addedDocuments }
}

// Seed-funktion: lägger in Anti-Aging-kurs som PDCourse för backup & revision
export function seedAntiAgingBasicCourse() {
  const author = 'System'
  const now = new Date().toISOString()

  const course: PDCourse = {
    id: 'pd-course-anti-aging-basic-2025',
    title: 'Anti-Aging Grundkurs',
    slug: 'anti-aging-grundkurs',
    description: 'Grundkurs som täcker principer, hudvård, nutrition, livsstil, tillskott och mental hälsa för hälsosamt åldrande.',
    level: 'Nybörjare',
    duration: '8 veckor',
    price: '2 490 kr',
    status: 'active',
    tags: ['Anti-aging', 'Hudvård', 'Nutrition', 'Livsstil', 'Tillskott', 'Mental hälsa'],
    modules: [
      {
        id: 'ag1',
        title: 'Grundläggande anti-aging principer',
        description: 'Biologi, intrinsiskt/extrinsiskt åldrande, riskfaktorer och mätning.',
        lessons: [
          { id: 'agl1', title: 'Åldringsbiologi – cellkommunikation och DNA' },
          { id: 'agl2', title: 'Intrinsiskt vs extrinsiskt åldrande' },
          { id: 'agl3', title: 'Övning: Livsstilsinventering & baslinjemätning (checklista)' }
        ]
      },
      {
        id: 'ag2',
        title: 'Hudvård och näring',
        description: 'SPF, retinoider, C-vitamin, peptider samt makro/mikronäring.',
        lessons: [
          { id: 'agl4', title: 'Hudvårdsgrunder: solskydd och aktiva ingredienser' },
          { id: 'agl5', title: 'Nutrition: antioxidanter, protein, fiber' },
          { id: 'agl6', title: 'Övning: Hudvårdsrutin + kostdagbok (checklista)' }
        ]
      },
      {
        id: 'ag3',
        title: 'Livsstilsfaktorer som påverkar åldrande',
        description: 'Sömn, stress, rörelse, alkohol/tobak och miljö.',
        lessons: [
          { id: 'agl7', title: 'Sömnritualer och återhämtning' },
          { id: 'agl8', title: 'Rörelse: styrka, kondition, rörlighet' },
          { id: 'agl9', title: 'Övning: Veckoplan för sömn/stress/rörelse (checklista)' }
        ]
      },
      {
        id: 'ag4',
        title: 'Tillskott och behandlingar',
        description: 'Evidens, dosering och riskhantering inklusive DMAE koppling.',
        lessons: [
          { id: 'agl10', title: 'Genomgång av vanliga tillskott (C, D, omega-3, kolagen)' },
          { id: 'agl11', title: 'Behandlingar: peels, microneedling, laser – översikt' },
          { id: 'agl12', title: 'Övning: Tillskottsinventering & nytta/risk (checklista)' }
        ]
      },
      {
        id: 'ag5',
        title: 'Mental hälsa och åldrande',
        description: 'Stressreglering, mindfulness, inre bilder och neuroplasticitet.',
        lessons: [
          { id: 'agl13', title: 'Mindfulness och stresshantering (andningsövningar)' },
          { id: 'agl14', title: 'Inre bilder: visualisering för beteendeförändring' },
          { id: 'agl15', title: 'Övning: Daglig journaling och reflektionsfrågor (checklista)' }
        ]
      }
    ],
    version: undefined,
    revision: undefined
  }

  const { addedCourses } = importPersonalDevelopment({ courses: [course], author })
  assignRevisionForCourse(course, ['Seed: Anti-Aging Grundkurs skapad'], author)

  try {
    localStorage.setItem('personal_development_courses', JSON.stringify(personalDevelopmentCourses))
  } catch {}

  return { addedCourses }
}

export function seedCorePersonalDevelopmentCourses() {
  const author = 'System'
  const now = new Date().toISOString()

  const courses: PDCourse[] = [
    {
      id: 'pd-course-mindfulness-2025',
      title: 'Mindfulness och Medveten Närvaro',
      slug: 'mindfulness-beginners',
      description: 'Grundkurs i mindfulness: andning, kroppsskanning, vardagsnärvaro och reflektion för ökad medvetenhet.',
      level: 'Nybörjare',
      duration: '4 veckor',
      price: '0 kr',
      status: 'active',
      tags: ['Mindfulness', 'Närvaro', 'Andning'],
      modules: [
        { id: 'm1', title: 'Grunderna i mindfulness', description: 'Vad är mindfulness och hur praktiseras det i vardagen.', lessons: [
          { id: 'l1', title: 'Andningsankare' },
          { id: 'l2', title: 'Kroppsskanning' }
        ] },
        { id: 'm2', title: 'Vardagsnärvaro', description: 'Integrera närvaro i vardagliga aktiviteter.', lessons: [
          { id: 'l3', title: 'Medvetet ätande' },
          { id: 'l4', title: 'Gångmeditation' }
        ] },
        { id: 'm3', title: 'Reflektion och journaling', description: 'Reflektera över upplevelser och lärdomar.', lessons: [
          { id: 'l5', title: 'Daglig journaling' },
          { id: 'l6', title: 'Veckoreflektioner' }
        ] },
        { id: 'm4', title: 'Fördjupning och stabilitet', description: 'Bygg stabil rutin och hållbar praktik.', lessons: [
          { id: 'l7', title: 'Rutinplan' },
          { id: 'l8', title: 'Reflektionsfrågor: Vad förändras?' }
        ] }
      ],
      version: undefined,
      revision: undefined
    },
    {
      id: 'pd-course-stress-2025',
      title: 'Stresshantering och Resiliens',
      slug: 'stress-management-resilience',
      description: 'Lär dig stressfysiologi, verktyg för återhämtning, resiliensbyggande och praktiska övningar.',
      level: 'Mellanliggande',
      duration: '3 sessioner',
      price: '0 kr',
      status: 'active',
      tags: ['Stress', 'Resiliens', 'Återhämtning'],
      modules: [
        { id: 's1', title: 'Stressfysiologi & medvetenhet', description: 'Förstå hur stress påverkar kropp och hjärna.', lessons: [
          { id: 'ls1', title: 'Pulskontroll med andning' },
          { id: 'ls2', title: 'Reflektion: Triggers & svar' }
        ] },
        { id: 's2', title: 'Verktyg & återhämtning', description: 'Praktiska verktyg för snabb nedreglering.', lessons: [
          { id: 'ls3', title: 'Box-breathing 4-4-4-4' },
          { id: 'ls4', title: 'Progressiv muskelavslappning' }
        ] },
        { id: 's3', title: 'Resiliens & integration', description: 'Bygg vanor för långsiktig resiliens.', lessons: [
          { id: 'ls5', title: 'Vanedesign: Återhämtningsfönster' },
          { id: 'ls6', title: 'Reflektion: Vad fungerar för mig?' }
        ] }
      ],
      version: undefined,
      revision: undefined
    },
    {
      id: 'pd-course-goal-2025',
      title: 'Mål, Motivation och Självbild',
      slug: 'goal-motivation-self-image',
      description: 'Arbeta med mål, målbilder, motivationssystem och stärkt självbild genom praktiska övningar.',
      level: 'Mellanliggande',
      duration: '3 sessioner',
      price: '0 kr',
      status: 'active',
      tags: ['Mål', 'Motivation', 'Självbild'],
      modules: [
        { id: 'g1', title: 'Målsättning & klarhet', description: 'Definiera tydliga mål med SMART/WOOP.', lessons: [
          { id: 'gl1', title: 'SMART + WOOP workshop' },
          { id: 'gl2', title: 'Reflektion: Varför detta mål?' }
        ] },
        { id: 'g2', title: 'Målbilder & visualisering', description: 'Bygg inre bilder som driver beteende.', lessons: [
          { id: 'gl3', title: 'Guidad visualisering' },
          { id: 'gl4', title: 'Reflektionsfrågor: Hinder & resurser' }
        ] },
        { id: 'g3', title: 'Motivation & självbild', description: 'Förstå interna/externa drivkrafter, stärk självbild.', lessons: [
          { id: 'gl5', title: 'Motivationskartläggning' },
          { id: 'gl6', title: 'Självbildsövning: spegel & journaling' }
        ] }
      ],
      version: undefined,
      revision: undefined
    },
    {
      id: 'pd-course-neuro-2025',
      title: 'Kognitiv Resiliens och Neuroplasticitet',
      slug: 'cognitive-resilience',
      description: 'Träna hjärnans flexibilitet genom fokus, distraktionskontroll, sömn, rörelse och inre bilder.',
      level: 'Avancerad',
      duration: '3 sessioner',
      price: '0 kr',
      status: 'active',
      tags: ['Hjärna', 'Neuroplasticitet', 'Fokus'],
      modules: [
        { id: 'n1', title: 'Fokus & distraktionskontroll', description: 'Designa miljö och verktyg för djupfokus.', lessons: [
          { id: 'nl1', title: 'Pomodoro + miljödesign' },
          { id: 'nl2', title: 'Reflektion: Distraktionsdagbok' }
        ] },
        { id: 'n2', title: 'Sömn & återhämtning', description: 'Sömnritualer, ljus, koffein, temperatur.', lessons: [
          { id: 'nl3', title: 'Sömnchecklista' },
          { id: 'nl4', title: 'Reflektion: Energitoppar & dalar' }
        ] },
        { id: 'n3', title: 'Rörelse & hjärnhälsa', description: 'Kondition, styrka, rörlighet för kognitiv funktion.', lessons: [
          { id: 'nl5', title: 'Minimalistiskt träningsprogram' },
          { id: 'nl6', title: 'Mindful rörelse' }
        ] }
      ],
      version: undefined,
      revision: undefined
    },
    {
      id: 'pd-course-healthy-aging-2025',
      title: 'Hälsosamt Åldrande – Livsstil & Vanor',
      slug: 'healthy-aging-lifestyle',
      description: 'Komplement till anti-aging: kost, fasta, hudvård, stress, sömn och tillskott.',
      level: 'Nybörjare',
      duration: '5 moduler',
      price: '0 kr',
      status: 'active',
      tags: ['Anti-aging', 'Livsstil', 'Vanor'],
      modules: [
        { id: 'ha1', title: 'Kost & näring', description: 'Makro/mikro, antioxidanter, proteiner, fiber.', lessons: [
          { id: 'hal1', title: 'Tallriksmodell för anti-aging' },
          { id: 'hal2', title: 'Reflektion: Kostdagbok' }
        ] },
        { id: 'ha2', title: 'Fasta & metabol flexibilitet', description: 'Tidsbegränsat ätande, 16:8, 24h-fasta.', lessons: [
          { id: 'hal3', title: 'Fasteplan (pilot)' },
          { id: 'hal4', title: 'Reflektion: Energi & hunger' }
        ] },
        { id: 'ha3', title: 'Hudvård & solskydd', description: 'SPF, retinoider, C-vitamin, peptider.', lessons: [
          { id: 'hal5', title: 'Hudvårdsrutin' },
          { id: 'hal6', title: 'Reflektion: Hudens respons' }
        ] },
        { id: 'ha4', title: 'Stress & sömn', description: 'Återhämtning, stressreglering, sömnritualer.', lessons: [
          { id: 'hal7', title: 'Sömnritualer' },
          { id: 'hal8', title: 'Andningsövningar' }
        ] },
        { id: 'ha5', title: 'Tillskott & säkerhet', description: 'Evidens, dosering, risker, DMAE koppling.', lessons: [
          { id: 'hal9', title: 'Tillskottsinventering' },
          { id: 'hal10', title: 'Reflektion: Nytta vs risk' }
        ] }
      ],
      version: undefined,
      revision: undefined
    }
  ]

  const { addedCourses } = importPersonalDevelopment({ courses, author })
  for (const course of courses) {
    assignRevisionForCourse(course, [`Seed: ${course.title} skapad`], author)
  }

  try {
    localStorage.setItem('personal_development_courses', JSON.stringify(personalDevelopmentCourses))
  } catch {}

  return { addedCourses }
}

// Kompatibilitet: behåll äldre exportnamn för anti-aging kurs
export function seedAntiAgingCourse() {
  return seedAntiAgingBasicCourse()
}