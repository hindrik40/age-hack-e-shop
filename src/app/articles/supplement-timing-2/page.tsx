'use client';

import { useLanguage } from '../../../contexts/LanguageContext'

export default function SupplementTiming2() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Kosttillskott: När och Hur du ska ta dem för Maximal Effekt
            </h1>
            <p className="text-lg text-gray-600">
              En komplett guide för att optimera ditt tillskottsschema och maximera absorptionen av dina kosttillskott.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Varför Timing är Viktigt
            </h2>
            <p className="text-gray-700 mb-4">
              Att ta kosttillskott vid rätt tidpunkt kan dramatiskt förbättra deras effektivitet. Vissa vitaminer absorberas bättre med mat, andra på fastande mage, och vissa konkurrerar om samma absorptionsvägar i kroppen.
            </p>
          </section>

          {/* Fat-soluble vitamins */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-yellow-600 text-xl">🧈</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Fettlösliga Vitaminer (A, D, E, K)
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              Dessa vitaminer kräver fett för optimal absorption och lagras i kroppens fettvävnad.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                Bästa Timing:
              </h3>
              <ul className="text-blue-700 space-y-1">
                <li>• Ta med din fettrikaste måltid</li>
                <li>• Morgon eller lunch fungerar oftast bäst</li>
                <li>• Undvik att ta på kvällen om du har känslig mage</li>
              </ul>
            </div>
          </section>

          {/* Water-soluble vitamins */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 text-xl">💧</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Vattenlösliga Vitaminer (C, B-vitaminer)
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              Dessa vitaminer löser sig i vatten och överskottet utsöndras via urinen. De behöver tas regelbundet.
            </p>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <h3 className="font-semibold text-green-800 mb-2">
                Bästa Timing:
              </h3>
              <ul className="text-green-700 space-y-1">
                <li>• Vitamin C: På fastande mage för bästa absorption</li>
                <li>• B-vitaminer: På morgonen för energi genom dagen</li>
                <li>• Kan tas med eller utan mat</li>
              </ul>
            </div>
          </section>

          {/* Minerals */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600 text-xl">⚒️</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Mineraler
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Kalcium</h3>
                <p className="text-purple-700 text-sm mb-2">
                  Ta med mat, max 500mg åt gången
                </p>
                <p className="text-purple-600 text-xs">
                  Kvällen är idealisk för benhälsa
                </p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-800 mb-2">Magnesium</h3>
                <p className="text-indigo-700 text-sm mb-2">
                  Ta på kvällen för avslappning
                </p>
                <p className="text-indigo-600 text-xs">
                  Kan tas med eller utan mat
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Zink</h3>
                <p className="text-orange-700 text-sm mb-2">
                  Ta på fastande mage, 1-2 timmar före/efter måltid
                </p>
                <p className="text-orange-600 text-xs">
                  Undvik att ta med kalcium/järn
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Järn</h3>
                <p className="text-red-700 text-sm mb-2">
                  Ta på fastande mage med C-vitamin
                </p>
                <p className="text-red-600 text-xs">
                  Undvik kaffe/te 1 timme före/efter
                </p>
              </div>
            </div>
          </section>

          {/* Special supplements */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-600 text-xl">🐟</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Specialtillskott
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="font-semibold text-teal-800 mb-2">Omega-3</h3>
                <p className="text-teal-700">
                  Ta med mat för att undvika fiskrapsmak. Morgon eller lunch fungerar bäst.
                </p>
              </div>
              
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h3 className="font-semibold text-emerald-800 mb-2">Probiotika</h3>
                <p className="text-emerald-700">
                  Ta på fastande mage, 30 minuter före frukost eller 2-3 timmar efter måltid.
                </p>
              </div>
            </div>
          </section>

          {/* Negative interactions */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Tillskott som INTE ska tas tillsammans
              </h2>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-4">
                Farliga Kombinationer:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-red-700 mb-2">
                    Kalcium + Järn
                  </h4>
                  <p className="text-red-600 text-sm mb-3">
                    Kalcium blockerar järnabsorptionen. Ta minst 2 timmar isär.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">
                    Zink + Kopparn
                  </h4>
                  <p className="text-red-600 text-sm mb-3">
                    Höga zinkdoser kan störa kopparnupptaget. Balansera noggrant.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">
                    Magnesium + Järn
                  </h4>
                  <p className="text-red-600 text-sm mb-3">
                    Magnesium kan minska järnabsorptionen. Ta vid olika tidpunkter.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">
                    Kaffe/Te + Järn
                  </h4>
                  <p className="text-red-600 text-sm mb-3">
                    Tanniner i kaffe och te blockerar järn. Vänta 1 timme.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Positive combinations */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-xl">✅</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Tillskott som Fungerar Bra Tillsammans
              </h2>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-4">
                Synergistiska Kombinationer:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">
                    Kalcium + Vitamin D
                  </h4>
                  <p className="text-green-600 text-sm mb-3">
                    Vitamin D förbättrar kalciumabsorptionen avsevärt.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">
                    Järn + Vitamin C
                  </h4>
                  <p className="text-green-600 text-sm mb-3">
                    C-vitamin ökar järnabsorptionen med upp till 300%.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">
                    Magnesium + Vitamin B6
                  </h4>
                  <p className="text-green-600 text-sm mb-3">
                    B6 hjälper till att transportera magnesium till cellerna.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">
                    Zink + C-vitamin
                  </h4>
                  <p className="text-green-600 text-sm mb-3">
                    Båda stödjer immunförsvaret och fungerar synergistiskt.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Daily schedule */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-indigo-600 text-xl">📅</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Praktiskt Dagsschema
              </h2>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-indigo-50 px-6 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-indigo-800">
                  Optimalt Schema för Dina Tillskott
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="px-6 py-4 flex items-center">
                  <div className="w-20 text-sm font-medium text-gray-500">07:00</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      På fastande mage
                    </h4>
                    <p className="text-sm text-gray-600">
                      Probiotika, C-vitamin (om mage tillåter)
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 flex items-center bg-gray-50">
                  <div className="w-20 text-sm font-medium text-gray-500">08:00</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      Med Frukost
                    </h4>
                    <p className="text-sm text-gray-600">
                      Multivitamin, B-vitaminer, Omega-3, D-vitamin
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 flex items-center">
                  <div className="w-20 text-sm font-medium text-gray-500">12:00</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      Med Lunch
                    </h4>
                    <p className="text-sm text-gray-600">
                      Eventuella fettlösliga vitaminer du missade till frukost
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 flex items-center bg-gray-50">
                  <div className="w-20 text-sm font-medium text-gray-500">18:00</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      Med Middag
                    </h4>
                    <p className="text-sm text-gray-600">
                      Kalcium (max 500mg), magnesium, eventuella mineraler
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 flex items-center">
                  <div className="w-20 text-sm font-medium text-gray-500">22:00</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      Före Sömn
                    </h4>
                    <p className="text-sm text-gray-600">
                      Magnesium (om du inte tog det till middag), melatonin om behövs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick reference table */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-yellow-600 text-xl">📊</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Snabbreferens Tabell
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tillskott
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bästa Tid
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Med/Utan Mat
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Varningar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">A, D, E, K</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Morgon/Lunch</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Med mat
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">-</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">C-vitamin</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Morgon</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Utan mat
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      Kan irritera magen
                    </td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">B-vitaminer</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Morgon</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Med mat
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">-</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Kalcium</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Kväll</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Med mat
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="text-red-600">Ej med järn</span>
                    </td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Magnesium</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Kväll</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Med mat
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">-</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Zink</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Morgon</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Utan mat
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="text-red-600">Ej med kalcium</span>
                    </td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Järn</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Morgon</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Utan mat
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="text-red-600">Ej med kaffe</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Slutsats och Rekommendationer
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Att optimera ditt tillskottsschema är inte komplicerat, men det kräver planering. Genom att följa dessa riktlinjer kan du maximera absorptionen och minimera negativa interaktioner.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Nyckelprinciper:
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Fettlösliga vitaminer med mat</li>
                      <li>• Vattenlösliga på fastande mage</li>
                      <li>• Undvik konkurrerande mineraler</li>
                      <li>• Sprid ut intaget under dagen</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Kom ihåg:
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Konsultera alltid en läkare</li>
                      <li>• Börja med låga doser</li>
                      <li>• Övervaka dina reaktioner</li>
                      <li>• Kvalitet framför kvantitet</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <div className="text-center text-sm text-gray-500 border-t pt-6">
            <p>
              Denna information är endast för utbildningsändamål och ersätter inte professionell medicinsk rådgivning. Konsultera alltid med en kvalificerad hälsovårdspersonal innan du påbörjar nya kosttillskott.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}