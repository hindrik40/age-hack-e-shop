import Link from "next/link";

export default function TherapeuticPeptides2025Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/articles"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200 group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            Tillbaka till artiklar
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terapeutiska peptider – översikter 2025
          </h1>
          <p className="text-gray-600">Kategori: Vetenskapliga studier · Läsningstid: 10 min</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-8 space-y-10">
          {/* Översikt */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Översikt</h2>
            <p className="text-gray-700">
              Den här artikeln sammanfattar aktuella användningsområden och framtida riktningar för terapeutiska peptider,
              inklusive godkända läkemedel (GLP-1, somatostatin, antimikrobiella peptider) och nya administrationsvägar
              (oral, nasal, mikronålar). Vi berör även utvecklingen inom antimikrobiella peptider (AMP) och biofilm,
              där syntetiska peptider och peptidomimetika visar lovande resultat.
            </p>
          </section>

          {/* Godkända peptidläkemedel */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Godkända peptidläkemedel</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>GLP-1-analoger (semaglutid) – metabola sjukdomar, viktreglering</li>
              <li>Somatostatin-analoger – endokrin behandling</li>
              <li>Antimikrobiella peptider – experimentell användning mot infektioner</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Peptider erbjuder hög specificitet och ofta bättre tolerabilitet, men kräver innovativa leveranssystem för
              att nå full klinisk potential.
            </p>
          </section>

          {/* Nya administrationsvägar */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Nya administrationsvägar</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Oral – cykliska peptider och permeabilitetsförstärkare</li>
              <li>Nasal – snabb systemisk exponering, förbättrad patientacceptans</li>
              <li>Mikronålar – lokal och kontrollerad leverans genom huden</li>
              <li>Liposomala system och PEGylering – förlängd halveringstid och stabilitet</li>
            </ul>
          </section>

          {/* AMP & biofilm */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Antimikrobiella peptider (AMP) & biofilm</h2>
            <p className="text-gray-700">
              AMP angriper bakteriers membran och kan bryta biofilmer som ofta ger behandlingsresistens.
              Prekliniska data visar effekt mot <em>S. aureus</em> och <em>C. albicans</em>, med MIC runt 4 µg/mL för cykliska
              lipopeptider. Nya myxinidin-derivat riktade mot cystisk fibros-biofilm utvärderas.
            </p>
          </section>

          {/* Syntetiska peptider och peptidomimetika */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Syntetiska peptider och peptidomimetika</h2>
            <p className="text-gray-700">
              Design av stabila, selektiva peptider ger möjligheter till nya terapier. Peptidomimetika kan efterlikna
              peptiders verkan med förbättrad farmakokinetik, vilket öppnar för oral administrering och längre verkan.
            </p>
          </section>

          {/* ML-designade icke-hemolytiska AMPs */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">ML-design av icke-hemolytiska AMPs</h2>
            <p className="text-gray-700">
              Maskininlärningsmodeller tränade på &gt;40 000 peptider har genererat ett dussintal nya kandidater med hög
              selektivitet (IC50 ≤ 2 µM) och &lt; 1 % hemolys. Dessa metoder möjliggör snabbare screening och optimering,
              med sikte på klinisk translation.
            </p>
          </section>

          {/* Slutsats */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Slutsats</h2>
            <p className="text-gray-700">
              Terapeutiska peptider befinner sig i snabb utveckling. Kombinationen av avancerade leveranssystem,
              peptidomimetisk design och AI-stödd kandidatframtagning talar för breddad klinisk användning under 2025–2027.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}