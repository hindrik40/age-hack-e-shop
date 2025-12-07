import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";

export default function ArticleDynamicPage({ params }: { params: { slug: string } }) {
  const a = articles.find((x) => x.slug === params.slug);
  if (!a) return notFound();

  const isNature2025 = a.slug === "peptide-drug-development-2025";
  const isMDPI2024 = a.slug === "synthetic-peptides-peptidomimetics-2024";
  const isMLAMP = a.slug === "non-hemolytic-amp-ml";

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

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{a.title}</h1>
          <p className="text-gray-600">Kategori: {a.category} · Läsningstid: {a.readTime} · Publicerad: {a.date}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-8 space-y-10">
          {/* Excerpt */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Sammanfattning</h2>
            <p className="text-gray-700">{a.excerpt}</p>
          </section>

          {/* Specific content per article */}
          {isNature2025 && (
            <>
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Kliniska prövningar (GLP-1, vacciner)</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Semaglutid: viktreglering, kardiometabola markörer, hög acceptans.</li>
                  <li>Lungcancer-vacciner: peptidbaserade antigenscocktails; kombination med checkpoint-hämmare utvärderas.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Leveranssystem (liposomer, PEGylering)</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Liposomala peptider ger stabilisering och kontrollerad frisättning.</li>
                  <li>PEGylering förlänger halveringstid och minskar immunogenicitet.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Referens (open access)</h2>
                <p className="text-gray-700">
                  Nature 2025, "Recent advances in peptide-based drug development".
                  <a
                    href="https://www.nature.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >Läs fulltext</a>
                </p>
              </section>
            </>
          )}

          {isMDPI2024 && (
            <>
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Originalstudier: AMP & peptidomimetik</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Myxinidin-derivat mot biofilm vid cystisk fibros.</li>
                  <li>Cykliska lipopeptider: aktivitet mot S. aureus och C. albicans (MIC ~4 µg/mL).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Källa</h2>
                <p className="text-gray-700">MDPI Special Issue 2024 – open access sammanställning.</p>
              </section>
            </>
          )}

          {isMLAMP && (
            <>
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">ML-design av icke-hemolytiska AMP</h2>
                <p className="text-gray-700">
                  Modell tränad på &gt;40 000 peptider genererade 18 kandidater med hög selektivitet (IC50 ≤ 2 µM) och &lt; 1 % hemolys.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Öppen data</h2>
                <p className="text-gray-700">PMC gratis – kod och dataset publikt tillgängliga.</p>
              </section>
            </>
          )}

          {/* Placeholder for items without full content yet */}
          {!isNature2025 && !isMDPI2024 && !isMLAMP && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Fler detaljer kommer snart</h2>
              <p className="text-gray-700">Vi utökar fortlöpande artikelinnehållet för denna post.</p>
            </section>
          )}

          {/* Tags */}
          {a.tags?.length ? (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Taggar</h2>
              <div className="flex flex-wrap gap-2">
                {a.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{t}</span>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}