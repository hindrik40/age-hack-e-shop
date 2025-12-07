export default function CitrullinArticle() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Citrullin: Kväveoxid och Åldrande
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              En djupgående artikel om hur citrullin påverkar produktionen av kväveoxid och dess betydelse för hjärtats hälsa och åldrande.
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-12 prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed mb-0">
                Citrullin är en aminosyra som spelar en viktig roll i produktionen av kväveoxid (NO) i kroppen. Här är en översikt över hur citrullin påverkar produktionen av kväveoxid och dess fördelar.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                1. Urea-cykeln
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Citrullin är en central komponent i urea-cykeln, en process i levern som omvandlar kväve från aminosyror och ammoniak till urea för utsöndring genom urinen. Under denna cykel omvandlas citrullin till arginin, en annan aminosyra.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                2. Produktion av kväveoxid
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Arginin fungerar som substrat för enzymet kväveoxidsyntas (NOS), som omvandlar arginin till kväveoxid. Eftersom citrullin omvandlas till arginin i kroppen, kan tillskott av citrullin öka nivåerna av arginin och därmed produktionen av kväveoxid.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                3. Fördelar med kväveoxid
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Kväveoxid är en viktig molekyl som har flera funktioner i kroppen:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Vasodilatation
                  </h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Kväveoxid hjälper till att vidga blodkärlen, vilket förbättrar blodflödet. Detta kan bidra till förbättrad syre- och näringsleverans till musklerna, vilket kan vara fördelaktigt under fysisk aktivitet.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Blodtrycksreglering
                  </h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    Genom att vidga blodkärlen kan kväveoxid hjälpa till att sänka blodtrycket.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Cellkommunikation
                  </h3>
                  <p className="text-purple-700 text-sm leading-relaxed">
                    Kväveoxid spelar en roll i överföring av signaler mellan celler.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                4. Tillskott av citrullin
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Citrullin finns i två huvudsakliga former som tillskott: L-citrullin och citrullinmalat. Många idrottare och träningsentusiaster tar citrullintillskott för att förbättra träningens prestanda och återhämtning, baserat på idén att ökad kväveoxidproduktion kan förbättra blodflödet till musklerna.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2">
                5. Forskning
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Flera studier har visat att citrullintillskott kan förbättra träningsprestanda, minska trötthet och förbättra återhämtning. Detta kan delvis bero på ökad kväveoxidproduktion. Men mer forskning behövs för att fastställa de optimala doserna och fullständigt förstå alla fördelar och potentiella biverkningar.
              </p>
            </section>

            <section className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                <h2 className="text-2xl font-bold mb-4">Slutsats</h2>
                <p className="text-blue-100 leading-relaxed mb-0">
                  Citrullin spelar en central roll i produktionen av kväveoxid genom sin omvandling till arginin. Tillskott av citrullin kan därför ha fördelar för kardiovaskulär hälsa och idrottsprestanda genom att förbättra blodflödet och leveransen av syre och näringsämnen till musklerna.
                </p>
              </div>
            </section>

            {/* Related Articles */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Relaterade artiklar</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-gray-800 mb-2">Arginin och kväveoxid</h4>
                  <p className="text-gray-600 text-sm">Lär dig mer om hur arginin direkt påverkar kväveoxidproduktionen.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-gray-800 mb-2">Kväveoxid och hjärthälsa</h4>
                  <p className="text-gray-600 text-sm">Utforska sambandet mellan kväveoxid och kardiovaskulär hälsa.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}