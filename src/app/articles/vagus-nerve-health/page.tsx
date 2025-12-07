import { Brain, Heart, Activity, Users, Music, Moon, Fish, Dumbbell, Snowflake, Utensils } from 'lucide-react';

export default function VagusNerveHealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mage-tarm-vagusnerven: Din Hjälp till Bättre Hälsa och Längre Liv
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upptäck hur vagusnerven styr ditt autonoma nervsystem och lär dig 10 bevisade metoder för att stimulera den för bättre hälsa, minskad stress och förbättrad livskvalitet.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            Vad är vagusnerven och varför är den livsviktig?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Vagusnerven spelar en avgörande roll för hur väl vår kropp fungerar genom att reglera det autonoma nervsystemet (ANS). Det autonoma nervsystemet förbinder organ som hjärta och mage och styr processer som ligger utom vår medvetna kontroll - andning, matsmältning, hjärtfrekvens, humör och immunförsvar.
            </p>
            <p className="mb-4">
              ANS binder samman stress och hur vår kropp reagerar på det. Systemet har två grenar: det sympatiska ("fly eller fäkta") och det parasympatiska nervsystemet ("lugn och ro"). Vagusnerven är den centrala nerven i den parasympatiska responsen och utgör den primära kommunikationsvägen mellan våra tarmar och vår hjärna.
            </p>
          </div>
        </div>

        {/* Autonomic Nervous System */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Activity className="w-8 h-8 text-orange-500 mr-3" />
            Autonoma nervsystemet: Balansen mellan stress och lugn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                <div className="w-6 h-6 bg-red-500 rounded-full mr-2"></div>
                Sympatiska systemet (Fly eller fäkta)
              </h3>
              <ul className="text-red-700 space-y-2">
                <li>• Ökad hjärtfrekvens</li>
                <li>• Tyngre andning</li>
                <li>• Hämmad matsmältning</li>
                <li>• Frisättning av stresshormoner</li>
              </ul>
            </div>
            <div className="bg-green-100 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full mr-2"></div>
                Parasympatiska systemet (Vila och smält)
              </h3>
              <ul className="text-green-700 space-y-2">
                <li>• Sänkt hjärtfrekvens</li>
                <li>• Lugnare andning</li>
                <li>• Stimulerad matsmältning</li>
                <li>• Återhämtning och reparation</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-700 mt-4">
            När vi är stressade dominerar det sympatiska nervsystemet. När vi är lugna tar det parasympatiska systemet över. Genom att stimulera vagusnerven kan vi aktivt främja det parasympatiska tillståndet och därmed förbättra vår hälsa.
          </p>
        </div>

        {/* 10 Methods to Stimulate Vagus Nerve */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            10 Bevisade Metoder för att Stimulera Din Vagusnerv
          </h2>
          
          <div className="grid gap-6">
            {[
              {
                icon: <Activity className="w-6 h-6 text-blue-500" />,
                title: "Diafragmaandning",
                description: "Djup, långsam andning med diafragman i en hastighet av 8 andetag per minut. Detta stimulerar vagusnerven och ökar den parasympatiska aktiviteten omedelbart."
              },
              {
                icon: <Dumbbell className="w-6 h-6 text-green-500" />,
                title: "Aerob träning (uthållighet)",
                description: "Regelbunden aerob träning höjer den parasympatiska tonen genom kontinuerlig stimulering av vagusnerven. Löpning, simning och cykling är utmärkta alternativ."
              },
              {
                icon: <Dumbbell className="w-6 h-6 text-purple-500" />,
                title: "Styrketräning",
                description: "Styrketräning har visat sig öka vagusnervens aktivitet, särskilt hos personer med metabola ohälsotillstånd som fetma och hjärt-kärlsjukdomar."
              },
              {
                icon: <Snowflake className="w-6 h-6 text-cyan-500" />,
                title: "Kallbad",
                description: "Att ta ett kallbad eller kall dusch i vatten som är max 14°C har visat sig stimulera vagusnerven effektivt. Börja med korta intervaller."
              },
              {
                icon: <Music className="w-6 h-6 text-pink-500" />,
                title: "Sjunga/Nynna/Mantra",
                description: "Vibrationerna från att sjunga, nynna eller upprepa ett mantra aktiverar vagusnerven. Detta är en enkel men kraftfull metod som du kan använda när som helst."
              },
              {
                icon: <Users className="w-6 h-6 text-orange-500" />,
                title: "Positiva sociala interaktioner",
                description: "Att vara socialt engagerad i relationer som ger positiv energi ökar vagusnervaktiviteten. Umgås med människor som gör dig glad och avslappnad."
              },
              {
                icon: <Heart className="w-6 h-6 text-red-500" />,
                title: "Skratta",
                description: "Att skratta har visat sig öka vagusnervens aktivitet. Se roliga filmer, umgås med humoristiska vänner eller gör aktiviteter som får dig att skratta."
              },
              {
                icon: <Brain className="w-6 h-6 text-indigo-500" />,
                title: "Yoga och mindfulness",
                description: "Flera studier har påvisat att mindfulnessmeditation och yoga stimulerar vagusnerven. Regelbunden praktik ger långsiktiga fördelar."
              },
              {
                icon: <Moon className="w-6 h-6 text-blue-600" />,
                title: "Sova på höger sida",
                description: "Studier visar att sova på höger sida ökar vagusnervens aktivitet jämfört med andra sovpositioner. Detta är en enkel men effektiv justering."
              },
              {
                icon: <Fish className="w-6 h-6 text-teal-500" />,
                title: "Omega-3 och kalorirestriktion",
                description: "Tillskott av omega-3-fettsyror eller konsumtion av fet fisk ökar vagusnervaktiviteten. Kalorirestriktion under 6 månader har också visat positiva effekter."
              }
            ].map((method, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {index + 1}. {method.title}
                    </h3>
                    <p className="text-gray-700">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplements Section */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Utensils className="w-8 h-8 text-green-600 mr-3" />
            Kosttillskott för Optimal Hälsa och Vagusnervstimulering
          </h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Viktiga hälsotillskott:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Vitamin D3", "Vitamin K2", "Jod", "Selen", 
                "Magnesiummalat", "B-vitaminer", "Omega-3 fettsyror (låg TOTOX)"
              ].map((supplement, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                  <span className="font-medium text-gray-800">{supplement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Långtidsverkande anti-aging tillskott:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Fisetin", "Alfa-ketoglutarat", "Litium", "Glycin",
                "NMN (Nicotinamidadenindinukleotid)", "Glukosamin"
              ].map((supplement, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                  <span className="font-medium text-gray-800">{supplement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>Viktigt:</strong> Många antioxidanter förlänger inte livslängden enligt vetenskapliga studier, och vissa kan till och med förkorta den. Välj tillskott baserat på vetenskaplig evidens.
            </p>
          </div>
        </div>

        {/* Exercise and Sleep */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Activity className="w-6 h-6 text-blue-500 mr-2" />
              Motion och Vagusnerven
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Ägna dig åt både anaerob träning (styrketräning) och aerob träning (löpning, simning). 
                Högintensiv intervallträning (HIIT) är särskilt bra för att förbättra ämnesomsättningen 
                och öka mitokondriebiosyntesen.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-medium text-blue-900">
                  Även en 20-minuters promenad dagligen kan minska risken för hjärtsjukdomar, 
                  Alzheimers och många andra åldersrelaterade sjukdomar.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Moon className="w-6 h-6 text-purple-500 mr-2" />
              Sömnens Betydelse
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Sömn är avgörande för din hälsa. Under sömnen reparerar kroppen sig själv och 
                vagusnerven är som mest aktiv under djupsömn.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="font-medium text-purple-900">
                  Sömnbrist leder till accelererat åldrande och nedsatt vagusnervfunktion. 
                  Prioritera 7-9 timmar kvalitetssömn per natt.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Tips */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Praktiska Tips för Daglig Vagusnervstrimulering
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Morgonrutin:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• 5 minuter diafragmaandning</li>
                <li>• Drick ett glas vatten med omega-3</li>
                <li>• 10 minuter yoga eller stretching</li>
                <li>• Sjung eller nynna medan du duschar</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kvällsrutin:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Sov på höger sida</li>
                <li>• Undvik skärmar 1 timme före sömn</li>
                <li>• Praktisera mindfulness eller meditation</li>
                <li>• Avsluta med djupandningsövningar</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Sammanfattning: Din Väg till Bättre Hälsa
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Vagusnerven är din kropps naturliga väg till lugn och återhämtning. Genom att implementera dessa 10 metoder i din dagliga rutin kan du aktivt förbättra din hälsa, minska stress och potentiellt förlänga ditt liv.
            </p>
            <p className="mb-4">
              Kom ihåg att konsistens är nyckeln. Börja med en eller två metoder som känns naturliga för dig och bygg sedan på din rutin successivt. Din kropp kommer att tacka dig med bättre hälsa, mer energi och förbättrat välbefinnande.
            </p>
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mt-6">
              <p className="text-lg font-medium text-center text-gray-800">
                "En frisk vagusnerv är grunden för ett långt och hälsosamt liv. Ta hand om din vagusnerv - den tar hand om dig."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}