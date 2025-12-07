'use client';
import React from 'react';
import { ChevronDown, Clock, Users, Star, BookOpen, Heart, Brain, Dumbbell, Sparkles, Apple, Sun, Moon, CheckCircle, AlertTriangle, Info, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { articles } from '@/data/articles';
import { seedAntiAgingCourse } from '@/data/personalDevelopment';

export default function AntiAgingCourse() {
  const router = useRouter();
  const [expandedSession, setExpandedSession] = React.useState<number | null>(null);
  const [expandedSupplement, setExpandedSupplement] = React.useState<number | null>(null);

  // Progress-state och hjälpfunktioner
  type SessionProgress = {
    checklist: Record<string, boolean>
    selfAssessment: number
    reflection: string
    completed: boolean
    lastSaved?: string
  }

  const createDefaultProgress = (): Record<number, SessionProgress> => ({
    1: { checklist: {}, selfAssessment: 3, reflection: '', completed: false },
    2: { checklist: {}, selfAssessment: 3, reflection: '', completed: false },
    3: { checklist: {}, selfAssessment: 3, reflection: '', completed: false },
    4: { checklist: {}, selfAssessment: 3, reflection: '', completed: false },
    5: { checklist: {}, selfAssessment: 3, reflection: '', completed: false },
    6: { checklist: {}, selfAssessment: 3, reflection: '', completed: false }
  })

  const [progress, setProgress] = React.useState<Record<number, SessionProgress>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('anti_aging_progress')
        if (saved) {
          return JSON.parse(saved)
        }
      } catch {}
    }
    return createDefaultProgress()
  })

  const [course, setCourse] = React.useState<any | null>(null)
  const agingSignsDoc: any | null = React.useMemo(() => {
    try {
      return articles.find((a: any) => a?.slug === 'aging-signs') || null
    } catch {
      return null
    }
  }, [])
  const persistProgress = (p: Record<number, SessionProgress>) => {
    try {
      localStorage.setItem('anti_aging_progress', JSON.stringify(p))
    } catch {}
  }

  function saveSessionProgress(
    sessionId: number,
    update: (prev: SessionProgress) => SessionProgress
  ): void {
    setProgress(prev => {
      const prevSession = prev[sessionId] || { checklist: {}, selfAssessment: 3, reflection: '', completed: false }
      const nextSession = { ...update(prevSession), lastSaved: new Date().toISOString() }
      const next = { ...prev, [sessionId]: nextSession }
      persistProgress(next)
      return next
    })
  }

  function markSessionComplete(sessionId: number): void {
    saveSessionProgress(sessionId, prev => ({ ...prev, completed: true }))
  }

  function getCompletionPercent(): number {
    const ids = [1, 2, 3, 4, 5, 6]
    const total = ids.length
    const done = ids.filter(id => progress[id]?.completed).length
    return Math.round((done / total) * 100)
  }

  function resetProgress(): void {
    try {
      localStorage.removeItem('anti_aging_progress');
    } catch {}
    setProgress(createDefaultProgress());
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  React.useEffect(() => {
    try {
      const res = seedAntiAgingCourse();
      console.log(`📘 Anti-Aging-kurs seedad i personlig utveckling: ${res.addedCourses} kurs(er)`);
    } catch (e) {
      console.error('Fel vid seeding av Anti-Aging-kurs:', e);
    }
    // Läs in kurs från localStorage (seedad av personalDevelopment)
    try {
      const raw = localStorage.getItem('personal_development_courses')
      if (raw) {
        const list = JSON.parse(raw)
        const found = Array.isArray(list) ? list.find((c: any) => c?.slug === 'anti-aging-grundkurs') : null
        setCourse(found || null)
      }
    } catch {}
  }, []);

  const sessions = [
    {
      id: 1,
      title: "Introduktion till Anti-Aging",
      subtitle: "Förståelse för åldringsprocessen",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-blue-500",
      topics: [
        "Biologi av åldrande: Cellförändringar, DNA-mutationer och hormonella förändringar",
        "Faktorer som bidrar till åldrande: Genetik, miljö, livsstil och stress",
        "Intrinsiskt vs. extrinsiskt åldrande: Naturligt åldrande jämfört med externa faktorer som soleksponering och föroreningar"
      ]
    },
    {
      id: 2,
      title: "Nutrition och åldrande",
      subtitle: "Kostens roll i åldrande",
      icon: <Apple className="w-6 h-6" />,
      color: "bg-green-500",
      topics: [
        "Grundläggande kostbehov: Makronäringsämnen, mikronäringsämnen och vätskeintag",
        "Supermat för Anti-Aging: Bär, nötter, grönt te och fet fisk",
        "Mat att undvika: Bearbetade livsmedel, för mycket socker och transfetter. Antioxidanternas roll i att bekämpa fria radikaler"
      ]
    },
    {
      id: 3,
      title: "Hudvård och Anti-Aging",
      subtitle: "Upprätthålla ungdomlig hud",
      icon: <Sun className="w-6 h-6" />,
      color: "bg-yellow-500",
      topics: [
        "Grundläggande hudvård: Vikten av pH-balans, dubbelrengöring och att applicera produkter i rätt ordning",
        "Sol-skydd: Bredspektrum solskyddsmedel, UVA jämfört med UVB-strålar och vitamin D:s roll",
        "Nyckelingredienser: Retinoider, hyaluronsyra, peptider och vitamin C"
      ]
    },
    {
      id: 4,
      title: "Fysisk aktivitet och åldrande",
      subtitle: "Förbli aktiv för en längre livslängd",
      icon: <Dumbbell className="w-6 h-6" />,
      color: "bg-red-500",
      topics: [
        "Fördelar med träning: Förbättrad cirkulation, muskelton och bentäthet",
        "Skräddarsydda rutiner: Aerobics för hjärt-kärlhälsa, styrketräning för muskelmassa och yoga för flexibilitet",
        "Benhälsa: Vikten av kalcium, vitamin D och viktbelastande övningar"
      ]
    },
    {
      id: 5,
      title: "Mental välbefinnande och åldrande",
      subtitle: "Hålla sinnet skarpt",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-purple-500",
      topics: [
        "Hjärnhälsa: Neuroplasticitet, kognitiva reserver och sömnens betydelse",
        "Aktiviteter för kognitiv funktion: Hjärnträningsappar, språkinlärning och musikinstrument",
        "Stresshantering: Meditation, djupa andningsövningar och vikten av sociala relationer"
      ]
    },
    {
      id: 6,
      title: "Avancerade Anti-Aging-tekniker",
      subtitle: "Utforska moderna Anti-Aging-lösningar",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-pink-500",
      topics: [
        "Kosmetiska behandlingar: Fördelar och risker med Botox, fillers och kemiska peelingar",
        "Tillskott för Anti-Aging: Coenzym Q10, resveratrol och kollagen",
        "Framtida trender: Stamcellsforskning, telomerförlängning och personanpassad medicin"
      ]
    }
  ];

  const supplements = [
    { name: "Kollagen", benefit: "Nödvändigt för att upprätthålla hudens elasticitet och ledhälsa", icon: "🌟" },
    { name: "Coenzym Q10 (CoQ10)", benefit: "Skyddar celler från oxidativ skada och hjälper till med cellernas energiproduktion", icon: "⚡" },
    { name: "Resveratrol", benefit: "En antioxidant som kan skydda huden och minska inflammation", icon: "🍇" },
    { name: "Omega-3 Fettsyror", benefit: "Minskar inflammation, förbättrar hudhälsa och erbjuder kardiovaskulära fördelar", icon: "🐟" },
    { name: "Vitamin C", benefit: "Hjälper till med kollagenproduktion och erbjuder skydd mot fria radikaler", icon: "🍊" },
    { name: "Vitamin E", benefit: "Stöder frisk hud och ögon samt stärker immunsystemet", icon: "🥜" },
    { name: "Hyaluronsyra", benefit: "Behåller hudens fuktighet, vilket säkerställer hydrering och smidighet", icon: "💧" },
    { name: "Niacinamid (Vitamin B3)", benefit: "Förbättrar hudens utseende genom att hantera förstorade porer och ojämn hudton", icon: "✨" },
    { name: "Gurkmeja (Curcumin)", benefit: "Känd för sina kraftfulla antiinflammatoriska egenskaper", icon: "🌿" },
    { name: "Astaxanthin", benefit: "En kraftfull antioxidant som kan förbättra hudens elasticitet", icon: "🦐" },
    { name: "Grönt te-extrakt", benefit: "Innehåller hudskyddande polyfenoler", icon: "🍃" },
    { name: "Quercetin", benefit: "Bekämpar oxidativ stress och kan potentiellt bromsa åldringsprocesserna", icon: "🧅" },
    { name: "NMN (Nicotinamide Mononucleotide)", benefit: "Ökar NAD+ nivåer, vilket potentiellt förbättrar cellhälsa", icon: "🧬" },
    { name: "NAC (N-Acetylcysteine)", benefit: "Ökar nivåerna av glutathione, bekämpar oxidativ stress och stöder leverfunktion", icon: "🛡️" },
    { name: "Arginin (L-Arginin)", benefit: "Förbättrar blodflödet, stöder kollagenproduktion och stärker immunfunktionen", icon: "❤️" },
    { name: "Alpha (Alpha-Lipoic Acid)", benefit: "Neutraliserar fria radikaler och stöder cellernas energiproduktion", icon: "🔥" },
    { name: "Taurin", benefit: "Skyddar celler från oxidativ stress och stöder cellhydrering", icon: "🌊" },
    { name: "Biotin", benefit: "Främjar friskt hår, hud och naglar", icon: "💅" },
    { name: "Selen", benefit: "Skyddar huden från oxidativ skada", icon: "🔆" },
    { name: "Zink", benefit: "Stöder hudhälsa, immunfunktion och inflammationshantering", icon: "⚙️" }
  ];

  const fastingBenefits = [
    { title: "Cellulär autofagi", desc: "Kroppens sätt att rensa ut skadade celler och regenerera nyare, friskare celler", icon: "🧹" },
    { title: "Förbättrad metabol hälsa", desc: "Kan leda till förbättrad insulinkänslighet och minskad inflammation", icon: "📊" },
    { title: "Hormonell balans", desc: "Ökar nivåerna av tillväxthormon, som har anti-aging-egenskaper", icon: "⚖️" },
    { title: "Hjärnhälsa", desc: "Kan öka produktionen av hjärnderiverad neurotrofisk faktor (BDNF), som stöder kognitiv funktion", icon: "🧠" },
    { title: "Hudhälsa", desc: "Kan förbättra hudhälsan genom att minska oxidativ stress och inflammation", icon: "✨" }
  ];

  const sessionLinks: Record<number, { slug: string; label: string }> = {
    1: { slug: 'aging-signs', label: 'Läs mer i artikel: tecken på åldrande' },
    2: { slug: 'anti-aging-nutrition', label: 'Läs mer i artikel: kost och anti-aging' },
    3: { slug: 'anti-aging-science-2025', label: 'Läs mer i artikel: hudvård och vetenskap' },
    4: { slug: 'anti-aging-science-2025', label: 'Läs mer i artikel: träning och anti-aging' },
    5: { slug: 'anti-aging-science-2025', label: 'Läs mer i artikel: mental hälsa' },
    6: { slug: 'anti-aging-science-2025', label: 'Läs mer i artikel: avancerade tekniker' },
  };

  const sessionDetails: Record<number, { explanation: string; tips: string[]; exercises: string[]; relatedSlugs: string[] }> = {
    1: {
      explanation: 'Åldrande drivs av cellulära förändringar, ackumulerad oxidativ stress och hormonella skiften. Genetik sätter ramen, men livsstil och miljö avgör oftast takten.',
      tips: [
        'Kartlägg dina livsstilsvanor: kost, sömn, stress, fysisk aktivitet',
        'Optimera baslinjen: hydrering, daglig rörelse och regelbundna hälsokontroller',
        'Skydda mot miljöstress: använd solskydd och minimera föroreningsexponering'
      ],
      exercises: [
        'Sätt dina anti-aging mål (hälsa, energi, hud) och skriv ned dem',
        'Gör en 7-dagars logg över sömn, kost och stressnivåer',
        'Beställ baslinjemarkörer (t.ex. HbA1c, lipidprofil) via vårdcentral'
      ],
      relatedSlugs: ['aging-signs', 'anti-aging-science-2025']
    },
    2: {
      explanation: 'Näring påverkar oxidativ stress, inflammation och hormonell balans. Antioxidantrik kost och tillräckligt med protein stöttar reparation och livslängd.',
      tips: [
        'Ät färgrikt: bär, bladgrönt, korsblommiga grönsaker',
        'Prioritera kvalitetsprotein (ägg, fisk) och omega-3',
        'Begränsa snabba kolhydrater och raffinerat socker'
      ],
      exercises: [
        'Planera en 7-dagars antiinflammatorisk meny',
        'Testa tidsfönster för mat (t.ex. 10–12 h) utan överdrift',
        'Mät individuell respons: energi, mättnad och hudstatus'
      ],
      relatedSlugs: ['anti-aging-nutrition', 'supplement-timing']
    },
    3: {
      explanation: 'Hudens åldrande påverkas av UV, oxidation och minskad kollagenproduktion. Rätt ingredienser och konsekvent rutin ger mätbara resultat.',
      tips: [
        'Använd SPF 30+ dagligen och återapplicera vid behov',
        'Introducera retinoider försiktigt (kvällar) och återfukta rikligt',
        'Välj peptider och vitamin C för struktur och lyster'
      ],
      exercises: [
        'Bygg en morgon- och kvällsrutin och följ den i 4 veckor',
        'Patch-testa nya produkter och öka dosering gradvis',
        'Fota före/efter för att följa förändringar'
      ],
      relatedSlugs: ['anti-aging-science-2025']
    },
    4: {
      explanation: 'Träning bevarar muskelmassa, förbättrar mitokondriell funktion och ökar insulin-känslighet – centralt för långsiktig hälsa.',
      tips: [
        'Kombinera styrka (2–3 ggr/vecka) med lågintensiv kondition',
        'Öka vardagsrörelse (NEAT): promenaders, stå mer, ta trappor',
        'Prioritera återhämtning: sömn, aktiv vila och rörlighet'
      ],
      exercises: [
        'Gör ett helkroppsprogram med baslyft (knäböj, press, rodd)',
        'Lägg till daglig 30-min promenad i lugnt tempo',
        'Logga belastning och progression varje vecka'
      ],
      relatedSlugs: ['anti-aging-science-2025']
    },
    5: {
      explanation: 'Mental hälsa påverkar hormoner, inflammation och beteenden. Neuroplasticitet gynnas av sömn, fokusövningar och social kontakt.',
      tips: [
        'Meditera 10 minuter dagligen, gärna med guidning',
        'Skapa sömnhygien: regelbundna tider, mörkt och svalt rum',
        'Vårda relationer: planera meningsfullt socialt umgänge'
      ],
      exercises: [
        'Gör en daglig tacksamhetsövning (3 saker)',
        'Inför digital detox fönster (1–2 h utan skärmar)',
        'Testa andningsövningar (t.ex. 4-7-8-metoden)'
      ],
      relatedSlugs: ['anti-aging-science-2025']
    },
    6: {
      explanation: 'Avancerade tekniker inkluderar peptider och nya interventioner. Sätt säkerhet och evidens först och arbeta med kunnig vårdgivare.',
      tips: [
        'Verifiera källor och evidens innan användning',
        'Följ lagar och medicinska riktlinjer; konsultera professionell',
        'Dokumentera respons och justera försiktigt'
      ],
      exercises: [
        'Gör en evidensgenomgång av en teknik (t.ex. peptider)',
        'Skapa ett risk/nytta-dokument och diskutera med expert',
        'Sätt upp uppföljningsplan för effekt och biverkningar'
      ],
      relatedSlugs: ['peptide-drug-development-2025', 'anti-aging-science-2025']
    }
  };

  const learnMoreSlugs = ['anti-aging-nutrition', 'peptide-drug-development-2025', 'supplement-timing'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="sticky top-20 md:top-24 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium"
            >
              Tillbaka
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Till startsidan
            </button>
          </div>
          <div className="text-sm text-gray-600 hidden sm:block">Det ultimata Anti-Aging konceptet</div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Komplett Anti-Aging Kurs
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Mästra konsten att åldras graciöst med vår omfattande 6-sessioners kurs. 
              Lär dig allt från grundläggande biologi till avancerade tekniker för optimal åldrande.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>6 Sessioner</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Alla Nivåer</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Premium Innehåll</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Summary & Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Kursprogress</p>
              <div className="mt-2 w-full bg-gray-100 h-2 rounded">
                <div className="bg-purple-600 h-2 rounded" style={{ width: `${getCompletionPercent()}%` }} />
              </div>
              <p className="mt-2 text-gray-700 text-sm">{getCompletionPercent()}% klart</p>
            </div>
            <div className="flex items-center gap-3">
              {[1,2,3,4,5,6].map((id) => (
                <a key={id} href={`#session-${id}`} className={`px-3 py-1 rounded-lg text-sm border ${progress[id]?.completed ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                  S{id}
                </a>
              ))}
              <button onClick={resetProgress} className="px-3 py-1 rounded-lg text-sm border bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
                Återställ
              </button>
            </div>
          </div>
          {course && (
            <div className="mt-4 text-xs text-gray-500">
              Senaste revision: v{course.version || '1.x'} • rev {course.revision || '-'}
            </div>
          )}
        </div>
      </div>

      {/* Course Sessions */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Kursens 6 Sessioner
        </h2>
        
        <div className="space-y-6">
          {sessions.map((session) => (
            <section id={`session-${session.id}`} key={session.id} className="bg-white rounded-2l shadow-lg overflow-hidden">
              <button
                onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
                className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`${session.color} text-white p-3 rounded-xl`}>
                      {session.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Session {session.id}: {session.title}
                      </h3>
                      <p className="text-gray-600">{session.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 hidden sm:inline">Läs mer</span>
                    <ChevronDown 
                      className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                        expandedSession === session.id ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </div>
              </button>
              
              {expandedSession === session.id && (
                <div className="px-8 pb-6 border-t border-gray-100">
                  <div className="pt-6 space-y-4">
                    {session.topics.map((topic, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{topic}</p>
                      </div>
                    ))}
                  </div>

                  {sessionDetails[session.id] && (
                    <>
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Fördjupad förklaring</h4>
                        <p className="text-gray-700">{sessionDetails[session.id].explanation}</p>
                      </div>

                      {/* Integrera 12 tecken (session 1) */}
                      {session.id === 1 && agingSignsDoc && (
                        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
                          <h5 className="font-semibold text-blue-900 mb-2">De 12 tecknen på åldrande (sammanfattning)</h5>
                          <ul className="text-sm text-blue-800 list-disc list-inside">
                            {(agingSignsDoc.content?.sections || []).slice(0, 4).map((s: any, i: number) => (
                              <li key={i}>{s.title}: {s.description}</li>
                            ))}
                          </ul>
                          <Link href="/articles/aging-signs" className="inline-flex items-center text-blue-700 mt-2">
                            Läs hela artikeln <span className="ml-1">→</span>
                          </Link>
                        </div>
                      )}

                      <div className="mt-6 grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Praktiska tips</h5>
                          <ul className="space-y-2">
                            {sessionDetails[session.id].tips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                <span className="text-gray-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Övningar (checklista)</h5>
                          <ul className="space-y-2">
                            {sessionDetails[session.id].exercises.map((ex, i) => {
                              const key = `ex-${i}`;
                              const checked = progress[session.id]?.checklist?.[key] || false;
                              return (
                                <li key={i} className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    className="accent-purple-600"
                                    checked={checked}
                                    onChange={(e) => {
                                      saveSessionProgress(session.id, (prev) => ({
                                        ...prev,
                                        checklist: { ...prev.checklist, [key]: e.target.checked }
                                      }));
                                    }}
                                  />
                                  <span className="text-gray-700">{ex}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      {/* Självutvärdering & Reflektion */}
                      <div className="mt-6 grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-3">Självutvärdering (1–5)</h5>
                          <input
                            type="range"
                            min={1}
                            max={5}
                            value={progress[session.id]?.selfAssessment ?? 3}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              saveSessionProgress(session.id, (prev) => ({ ...prev, selfAssessment: value }));
                            }}
                            className="w-full"
                          />
                          <p className="text-sm text-gray-600 mt-2">Nivå: {progress[session.id]?.selfAssessment ?? 3}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-3">Reflektion</h5>
                          <textarea
                            className="w-full border border-gray-300 rounded-md p-2 text-sm"
                            rows={4}
                            placeholder="Skriv dina insikter, lärdomar och nästa steg…"
                            value={progress[session.id]?.reflection ?? ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              saveSessionProgress(session.id, (prev) => ({ ...prev, reflection: value }));
                            }}
                          />
                          <div className="mt-2 text-xs text-gray-500">Senast sparad: {progress[session.id]?.lastSaved ? new Date(progress[session.id]!.lastSaved!).toLocaleString() : '-'}</div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-3">
                        <button
                          onClick={() => markSessionComplete(session.id)}
                          className={`px-4 py-2 rounded-lg font-semibold ${progress[session.id]?.completed ? 'bg-green-600 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                        >
                          {progress[session.id]?.completed ? 'Markerad klar' : 'Markera session som klar'}
                        </button>
                        <Link href={sessionLinks[session.id] ? `/articles/${sessionLinks[session.id].slug}` : '#'} className="text-blue-600 hover:text-blue-800">
                          {sessionLinks[session.id]?.label || 'Läs mer'} <span className="ml-1">→</span>
                        </Link>
                      </div>
                    </>
                  )}

                  {sessionLinks[session.id] && (
                    <div className="mt-6">
                      <Link href={`/articles/${sessionLinks[session.id].slug}`} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                        {sessionLinks[session.id].label} <span className="ml-1">→</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Fasta Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fasta och Anti-Aging
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fasta innebär att man frivilligt avstår från mat (och ibland dryck) under en bestämd period. 
              Fasta har studerats omfattande för sina potentiella hälso- och anti-aging-fördelar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fastingBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supplements Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Anti-Aging Tillskott
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Utforska de mest effektiva tillskotten för anti-aging och deras specifika fördelar för hud, energi och övergripande hälsa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplements.map((supplement, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setExpandedSupplement(expandedSupplement === index ? null : index)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl">{supplement.icon}</div>
                  <div className="text-xs text-gray-400">#{index + 1}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{supplement.name}</h3>
                <p className={`text-gray-600 text-sm transition-all duration-200 ${
                  expandedSupplement === index ? 'line-clamp-none' : 'line-clamp-2'
                }`}>
                  {supplement.benefit}
                </p>
                {expandedSupplement === index && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Vetenskapligt stöd för fördelarna</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fördjupning */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Fördjupning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.filter(a => learnMoreSlugs.includes(a.slug)).map(a => (
            <div key={a.id} className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{a.readTime} • {a.date}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{a.category}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{a.title}</h4>
                <p className="text-gray-700 mb-4">{a.excerpt}</p>
                <Link href={`/articles/${a.slug}`} className="inline-flex items-center text-blue-600">
                  Läs mer <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kursöversikt & Revisioner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Kursöversikt & Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(id => (
            <div key={id} className="bg-white rounded-xl shadow border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Session {id}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${progress[id]?.completed ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
                  {progress[id]?.completed ? 'Klar' : 'Pågående'}
                </span>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                Självutvärdering: {progress[id]?.selfAssessment ?? '-'} / 5
              </div>
              <div className="mt-1 text-xs text-gray-500">Senast sparad: {progress[id]?.lastSaved ? new Date(progress[id]!.lastSaved!).toLocaleString() : '-'}</div>
            </div>
          ))}
        </div>
        {course && (
          <div className="mt-6 text-sm text-gray-600">
            Kurs: {course.title} • Slug: {course.slug} • Revision: {course.revision ?? '-'}
          </div>
        )}
      </div>

      {/* Relaterade Artiklar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Relaterade artiklar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.filter(a => ['anti-aging-nutrition', 'aging-signs', 'anti-aging-science-2025'].includes(a.slug)).map((a) => (
            <div key={a.id} className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{a.readTime} • {a.date}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{a.category}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{a.title}</h4>
                <p className="text-gray-700 mb-4">{a.excerpt}</p>
                <Link href={`/articles/${a.slug}`} className="inline-flex items-center text-blue-600">
                  Läs mer <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Starta din Anti-Aging resa idag</h2>
          <p className="text-xl text-purple-100 mb-8">
            Gå igenom alla 6 sessioner och lär dig de bästa strategierna för att åldras graciöst och behålla din ungdomliga energi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('session-1')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Börja Kursen
            </button>
            <Link href="/articles?category=Anti-aging" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Läs Artiklar Först
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

}
