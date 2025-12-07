import React from 'react';
import { Clock, AlertTriangle, CheckCircle, Sun, Moon, Coffee, Apple, Fish, Pill, Heart, Shield, Zap } from 'lucide-react';

export default function SupplementTimingArticle() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kosttillskott: Timing, Absorption och Kombinationer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Lär dig när du ska ta dina kosttillskott för maximal effektivitet. 
            Rätt timing och kombinationer kan göra stor skillnad för hur väl dina kropp absorberar näringen.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Varför timing spelar roll</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tidpunkten när du tar kosttillskott kan påverka deras absorption och effektivitet. 
                Vissa vitaminer absorberas bättre med mat, andra på tom mage, och vissa kombinationer 
                kan hämma eller förbättra varandras effekter.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 font-medium">
                  💡 Genom att förstå dessa principer kan du maximera nyttan av dina kosttillskott 
                  och undvika potentiella negativa interaktioner.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fat-soluble Vitamins */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Sun className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Fettlösliga vitaminer (A, D, E, K)</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                Vitamin D
              </h3>
              <p className="text-gray-700 mb-3">
                Eftersom det är fettlösligt, tas det bäst med en måltid som innehåller lite fett. 
                Många människor tar det på morgonen med frukost.
              </p>
              <div className="flex items-center gap-2 text-sm text-yellow-700">
                <Clock className="w-4 h-4" />
                <span>Bäst: På morgonen med frukost</span>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                Vitamin A, E, K
              </h3>
              <p className="text-gray-700 mb-3">
                Dessa fettlösliga vitaminer tas också bäst med måltider som innehåller lite fett.
              </p>
              <div className="flex items-center gap-2 text-sm text-yellow-700">
                <Apple className="w-4 h-4" />
                <span>Bäst: Med måltid som innehåller fett</span>
              </div>
            </div>
          </div>
        </div>

        {/* Water-soluble Vitamins */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Coffee className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Vattenlösliga vitaminer (C, B-vitaminer)</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Vitamin C
              </h3>
              <p className="text-gray-700 mb-3">
                Detta kan tas när som helst på dagen, men många väljer att ta det på morgonen 
                eftersom det kan ge en energikick.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Zap className="w-4 h-4" />
                <span>Bäst: På morgonen för energi</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                B-vitaminer
              </h3>
              <p className="text-gray-700 mb-3">
                De flesta B-vitaminer tas bäst med måltider eftersom mat hjälper till att förbättra deras absorption.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Apple className="w-4 h-4" />
                <span>Bäst: Med måltid</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minerals */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Mineraler (kalcium, magnesium, zink, järn)</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Kalcium
              </h3>
              <p className="text-gray-700 mb-3">
                Kan tas vid olika tidpunkter, men undvik att ta det samtidigt som zink eller järn.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <Clock className="w-4 h-4" />
                <span>Undvik: Samtidigt med zink/järn</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Magnesium
              </h3>
              <p className="text-gray-700 mb-3">
                Tas oftast på kvällen eftersom det kan ha en avslappnande effekt på musklerna och hjälpa till med sömnen.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <Moon className="w-4 h-4" />
                <span>Bäst: På kvällen för avslappning</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Zink
              </h3>
              <p className="text-gray-700 mb-3">
                Bäst om det tas på morgonen eller under dagen.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <Sun className="w-4 h-4" />
                <span>Bäst: På morgonen eller dagen</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Järn
              </h3>
              <p className="text-gray-700 mb-3">
                Bäst att ta på morgonen, med eller utan mat, men undvik att ta det tillsammans med kalcium eller kalciumrika livsmedel.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-700">
                <Sun className="w-4 h-4" />
                <span>Bäst: På morgonen, undvik kalcium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Supplements */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Fish className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Specialtillskott</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Fish className="w-5 h-5 text-green-600" />
                Omega-3-fettsyror (fiskolja)
              </h3>
              <p className="text-gray-700 mb-3">
                Tas oftast med en måltid för att förbättra absorptionen. Vissa väljer att ta det på morgonen med frukost.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Apple className="w-4 h-4" />
                <span>Bäst: Med måltid för bättre absorption</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Pill className="w-5 h-5 text-green-600" />
                Probiotika
              </h3>
              <p className="text-gray-700 mb-3">
                Probiotika tas oftast med eller före måltider. Det finns ingen specifik tidpunkt som anses vara den bästa.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Apple className="w-4 h-4" />
                <span>Bäst: Med eller före måltid</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Pill className="w-5 h-5 text-green-600" />
                Multivitaminer
              </h3>
              <p className="text-gray-700 mb-3">
                Detta kan variera beroende på märket och formuleringen. Många människor tar multivitaminer på morgonen med frukost för enkelhetens skull.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Coffee className="w-4 h-4" />
                <span>Bäst: På morgonen med frukost</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Pill className="w-5 h-5 text-green-600" />
                Vitamin B12
              </h3>
              <p className="text-gray-700 mb-3">
                B12 kan tas när som helst på dagen. Det absorberas oftast bra i magen.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Clock className="w-4 h-4" />
                <span>Bäst: När som helst på dagen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Negative Interactions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Tillskott som INTE bör kombineras</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Kalcium och järn
              </h3>
              <p className="text-red-800">
                Kalcium kan störa absorptionen av järn om de tas samtidigt. Om du behöver både kalcium och järn, 
                överväg att ta dem vid olika tidpunkter på dagen.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Zink och järn
              </h3>
              <p className="text-red-800">
                Höga doser av zink kan hämma absorptionen av järn om de tas samtidigt. Detta kan vara en viktig faktor 
                för personer som tar zinktillskott och lider av järnbrist.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Kalcium och magnesium
              </h3>
              <p className="text-red-800">
                Kalcium och magnesium kan konkurrera om absorption i tarmen om de tas i höga doser samtidigt. 
                Om du är orolig för interaktionen, kan du ta dem vid olika tidpunkter på dagen.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Koppar och zink
              </h3>
              <p className="text-red-800">
                Att ta mycket höga doser av zink under långa perioder kan minska kroppens förmåga att absorbera koppar. 
                Detta kan leda till en obalans i dessa två mineraler.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Vitamin C och B12
              </h3>
              <p className="text-red-800">
                Det finns rapporter om att höga doser av vitamin C kan påverka absorptionen av vitamin B12 negativt. 
                Om du tar båda dessa vitaminer som kosttillskott, överväg att ta dem vid olika tidpunkter på dagen.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Vitamin D och magnesium
              </h3>
              <p className="text-red-800">
                Båda dessa tillskott är viktiga för benhälsa, men höga doser av vitamin D kan orsaka ökad kalciumabsorption, 
                vilket kan påverka magnesiumbalansen. Övervaka doseringen om du tar höga doser.
              </p>
            </div>
          </div>
        </div>

        {/* Positive Combinations */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Tillskott som fungerar bra tillsammans</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Kalcium och D-vitamin
              </h3>
              <p className="text-green-800">
                D-vitamin hjälper till att öka absorptionen av kalcium, och dessa två är viktiga för benhälsa.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Järn och C-vitamin
              </h3>
              <p className="text-green-800">
                C-vitamin kan öka absorptionen av icke-hemjärn (järn från växtbaserade källor). 
                Att ta C-vitamin tillsammans med järntillskott eller järnrika livsmedel kan vara fördelaktigt för personer med risk för järnbrist.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Omega-3-fettsyror och vitamin D
              </h3>
              <p className="text-green-800">
                Dessa tillskott kan tas tillsammans eftersom de har visat sig ha positiva effekter på hjärthälsa och inflammation.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Magnesium och kalcium
              </h3>
              <p className="text-green-800">
                Dessa två mineraler kan tas tillsammans eftersom de är viktiga för ben- och muskelhälsa. 
                De konkurrerar inte om absorptionen, så de kan tas vid olika tillfällen under dagen.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
              <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Probiotika och prebiotika
              </h3>
              <p className="text-green-800">
                Probiotiska tillskott innehåller nyttiga bakterier för tarmhälsa. Prebiotika är kosttillskott som fungerar som mat för dessa bakterier. 
                Att ta både probiotika och prebiotika kan stödja en sund tarmflora.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Praktisk tidslinje för dina tillskott</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-l-4 border-orange-400">
              <div className="flex items-center gap-3 mb-3">
                <Sun className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-900">Morgon (med frukost)</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">🌟 Optimalt:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Vitamin D (med fett)</li>
                    <li>• Multivitamin</li>
                    <li>• Omega-3 (med måltid)</li>
                    <li>• Vitamin C (för energi)</li>
                    <li>• B-vitaminer (med mat)</li>
                    <li>• Zink</li>
                    <li>• Järn (undvik kalcium)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">⚠️ Kombinationstips:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Ta järn med C-vitamin för bättre absorption</li>
                    <li>• Undvik kalcium samtidigt med järn</li>
                    <li>• Vitamin D fungerar bra med kalcium</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-400">
              <div className="flex items-center gap-3 mb-3">
                <Coffee className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900">Dag (med lunch)</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">🌟 Optimalt:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Probiotika (med eller före måltid)</li>
                    <li>• Eventuella missade morgontillskott</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">💡 Tips:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Bra tid för probiotika</li>
                    <li>• Komplettera om du missade morgondosen</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-400">
              <div className="flex items-center gap-3 mb-3">
                <Moon className="w-6 h-6 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-900">Kväll (med middag eller före sänggående)</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">🌟 Optimalt:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Magnesium (för avslappning och sömn)</li>
                    <li>• Kalcium (om du inte tar det på morgonen)</li>
                    <li>• Eventuella fettlösliga vitaminer (med middag)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">💤 Sömntips:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Magnesium hjälper muskelavslappning</li>
                    <li>• Kan förbättra sömnkvaliteten</li>
                    <li>• Ta 1-2 timmar före sänggående</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-indigo-600" />
            </div>
            Snabbreferens: Tillskott & Timing
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Tillskott</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Bästa tid</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Med/utan mat</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Varningar</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-yellow-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Vitamin D</td>
                  <td className="border border-gray-200 px-4 py-3">Morgon</td>
                  <td className="border border-gray-200 px-4 py-3">Med fett</td>
                  <td className="border border-gray-200 px-4 py-3">-</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Vitamin C</td>
                  <td className="border border-gray-200 px-4 py-3">Morgon</td>
                  <td className="border border-gray-200 px-4 py-3">När som helst</td>
                  <td className="border border-gray-200 px-4 py-3">Kan påverka B12</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Järn</td>
                  <td className="border border-gray-200 px-4 py-3">Morgon</td>
                  <td className="border border-gray-200 px-4 py-3">Med/utan mat</td>
                  <td className="border border-gray-200 px-4 py-3">Undvik kalcium</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Magnesium</td>
                  <td className="border border-gray-200 px-4 py-3">Kväll</td>
                  <td className="border border-gray-200 px-4 py-3">När som helst</td>
                  <td className="border border-gray-200 px-4 py-3">-</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Omega-3</td>
                  <td className="border border-gray-200 px-4 py-3">Morgon/kväll</td>
                  <td className="border border-gray-200 px-4 py-3">Med måltid</td>
                  <td className="border border-gray-200 px-4 py-3">-</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium">Probiotika</td>
                  <td className="border border-gray-200 px-4 py-3">När som helst</td>
                  <td className="border border-gray-200 px-4 py-3">Med/före måltid</td>
                  <td className="border border-gray-200 px-4 py-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Final Recommendations */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Viktiga slutsatser och rekommendationer</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Nyckelprinciper
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Fettlösliga vitaminer: Ta med måltid som innehåller fett</li>
                <li>• Vattenlösliga vitaminer: Flexibel timing, morgon rekommenderas</li>
                <li>• Mineraler: Separera konkurrerande mineraler</li>
                <li>• Magnesium: Kväll för avslappning</li>
                <li>• Omega-3: Med måltid för bättre absorption</li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Var försiktig med
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Kalcium + Järn (samtidigt)</li>
                <li>• Zink + Järn (höga doser)</li>
                <li>• Höga doser C-vitamin + B12</li>
                <li>• Vitamin D + Magnesium (övervaka doser)</li>
                <li>• Alltid följ rekommenderade doser</li>
              </ul>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Slutord
            </h3>
            <p className="text-sm leading-relaxed">
              Det är viktigt att förstå att kosten vanligtvis innehåller en mångfald av näringsämnen, 
              och kroppen är generellt bra på att hantera dessa interaktioner. Om du är osäker på hur du 
              ska kombinera dina kosttillskott eller har specifika näringsbehov på grund av hälsotillstånd, 
              rekommenderas det starkt att du rådfrågar en läkare, en näringsrådgivare eller en apotekare. 
              De kan ge dig personliga rekommendationer baserade på din hälsa och kostvanor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}