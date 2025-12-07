'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { ArrowLeft, Users, Dna, Scissors, BookOpen, BrainCircuit, AlertTriangle, Zap, Recycle, Sprout, Shield, Link2, Thermometer } from 'lucide-react'
import Link from 'next/link'

export default function AgingSignsArticle() {
  const { t, language } = useLanguage()

  const agingSigns = [
    {
      id: 1,
      title: "Förändrad Cellkommunikation",
      description: "När vi blir äldre kommunicerar våra celler sämre med varandra. Det kan leda till sjukdomar.",
      icon: Users,
      color: "bg-blue-100 border-blue-300 text-blue-800",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Genomisk Instabilitet",
      description: "Vårt DNA blir instabilt och mer skadat med tiden, vilket kan orsaka problem som cancer.",
      icon: Dna,
      color: "bg-purple-100 border-purple-300 text-purple-800",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      title: "Telomerförkortning",
      description: "Varje gång en cell delar sig, blir ändarna av DNA:t, kallade telomerer, kortare. Det gör att cellerna slutar fungera ordentligt.",
      icon: Scissors,
      color: "bg-pink-100 border-pink-300 text-pink-800",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      id: 4,
      title: "Epigenetiska Förändringar",
      description: "Hur generna i vårt DNA agerar kan ändras över tid på grund av saker som stress och kost.",
      icon: BookOpen,
      color: "bg-green-100 border-green-300 text-green-800",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 5,
      title: "Förlust av Proteostas",
      description: "Cellerna blir sämre på att hantera och reparera proteiner, vilket kan leda till sjukdomar som Alzheimers.",
      icon: BrainCircuit,
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 6,
      title: "Cellulär Senescens",
      description: "Gamla celler slutar att dela sig och kan skada närliggande celler, vilket skapar inflammation.",
      icon: AlertTriangle,
      color: "bg-orange-100 border-orange-300 text-orange-800",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 7,
      title: "Mitokondriell Dysfunktion",
      description: "De delar av cellerna som skapar energi fungerar sämre när vi blir äldre, vilket gör oss tröttare och mer mottagliga för sjukdomar.",
      icon: Zap,
      color: "bg-red-100 border-red-300 text-red-800",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 8,
      title: "Nedsatt Autofagi",
      description: "Cellerna blir sämre på att städa upp skadade delar inuti sig själva, vilket gör dem mindre effektiva.",
      icon: Recycle,
      color: "bg-teal-100 border-teal-300 text-teal-800",
      gradient: "from-teal-500 to-teal-600"
    },
    {
      id: 9,
      title: "Stamcellsutmattning",
      description: "Vi har färre stamceller när vi blir äldre, vilket gör att kroppen reparerar sig själv långsammare.",
      icon: Sprout,
      color: "bg-emerald-100 border-emerald-300 text-emerald-800",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      id: 10,
      title: "Inflammation",
      description: "Långvarig inflammation kan vara skadlig och är en av de viktigaste orsakerna till åldersrelaterade sjukdomar.",
      icon: Shield,
      color: "bg-rose-100 border-rose-300 text-rose-800",
      gradient: "from-rose-500 to-rose-600"
    },
    {
      id: 11,
      title: "Skada på Extracellulära Matrix",
      description: "Det som håller ihop våra celler blir svagare, vilket kan leda till att vävnader och organ inte fungerar som de ska.",
      icon: Link2,
      color: "bg-indigo-100 border-indigo-300 text-indigo-800",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      id: 12,
      title: "Nedsatt Adaptiv Stressrespons",
      description: "Våra celler blir sämre på att anpassa sig till förändringar, som höga temperaturer eller näringsbrist, vilket gör dem skörare.",
      icon: Thermometer,
      color: "bg-cyan-100 border-cyan-300 text-cyan-800",
      gradient: "from-cyan-500 to-cyan-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/articles"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {language === 'sv' ? 'Tillbaka till artiklar' : 'Back to articles'}
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {language === 'sv' ? 'De 12 Tecknen på Åldrande' : 'The 12 Hallmarks of Aging'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === 'sv' ? 'Förstå de biologiska processerna som driver åldrandet och upptäck hur modern forskning arbetar med att bromsa eller vända dessa effekter för ett längre och friskare liv.' : 'Understand the biological processes that drive aging and discover how modern research aims to slow or reverse these effects for a longer, healthier life.'}
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {language === 'sv' ? 'Åldrande är en komplex biologisk process som påverkar alla delar av vår kropp. Genom att förstå de 12 huvudsakliga tecknen på åldrande kan vi bättre förstå hur vår kropp förändras över tid och vad vi kan göra för att bibehålla vår hälsa och vitalitet.' : 'Aging is a complex biological process that affects every part of our body. By understanding the 12 principal hallmarks of aging, we can better grasp how our body changes over time and what we can do to maintain health and vitality.'}
            </p>
          </div>
        </div>

        {/* Aging Signs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {agingSigns.map((sign, index) => {
            const IconComponent = sign.icon
            return (
              <div
                key={sign.id}
                className={`${sign.color} rounded-xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${sign.gradient} flex items-center justify-center text-white shadow-lg`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-bold text-gray-500">#{sign.id}</span>
                      <h3 className="text-lg font-bold text-gray-900">
                        {sign.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {sign.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">{language === 'sv' ? 'Framtidens Möjligheter' : 'Future Opportunities'}</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed mb-6">
              {language === 'sv' ? 'Genom att förstå dessa tecken på åldrande kan vi kanske bromsa eller till och med vända effekterna av åldrande. Forskning pågår för att se hur vi kan förbättra dessa processer för ett längre och friskare liv.' : 'By understanding these hallmarks of aging, we may slow or even reverse aging effects. Ongoing research explores how to improve these processes for longer, healthier lives.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">{language === 'sv' ? '🔬 Pågående Forskning' : '🔬 Ongoing Research'}</h3>
                <p className="text-blue-100">
                  {language === 'sv' ? 'Forskare över hela världen arbetar med att utveckla terapier som kan reparera DNA, förlänga telomerer och förbättra cellkommunikation.' : 'Researchers worldwide are developing therapies to repair DNA, extend telomeres and improve cell communication.'}
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">{language === 'sv' ? '🌟 Livsstilsfaktorer' : '🌟 Lifestyle Factors'}</h3>
                <p className="text-blue-100">
                  {language === 'sv' ? 'Rätt kost, motion, sömn och stresshantering kan positivt påverlla många av dessa åldrandeprocesser och förbättra livskvaliteten.' : 'Proper diet, exercise, sleep and stress management can positively affect many of these aging processes and improve quality of life.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            href="/products?category=Anti-Aging"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {language === 'sv' ? 'Utforska Anti-Aging Produkter' : 'Explore Anti-Aging Products'}
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}