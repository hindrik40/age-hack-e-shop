import Link from "next/link";

export default function AntiAgingScience2025Page() {
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
            Turning Back the Clock – Anti-Aging Science in 2025
          </h1>
          <p className="text-gray-600">Av [Ditt Namn], publicerad [datum]</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-8 space-y-10">
          {/* 1. Paradigmskifte */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Paradigmskifte: Från ett mål till många</h2>
            <p className="text-gray-700">
              Fältet har lämnat idén om en enskild "åldrande-gen" till förmån för polyfarmakologi –
              läkemedel som samtidigt påverkar flera åldrandedrivande proteiner och nätverk.
              En AI-screen av Petrascheck m.fl. identifierade 14 befintliga läkemedel som förlängde livslängden
              hos C. elegans med &gt;30 %, vilket illustrerar kraften i kombinerade verkningsmekanismer.
            </p>
          </section>

          {/* 2. De sju stora vägarna */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. De sju huvudvägarna forskare jagar</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Genomisk instabilitet – DNA-reparationsboosters (NAD⁺-prekursorer, p53-modulatorer)</li>
              <li>Telomerförkortning – telomerasaktivatorer (TA-65, GRN510)</li>
              <li>Epigenetisk drift – reprogrammeringsfaktorer (partial OKSM, cyklisk Yamanaka)</li>
              <li>Proteostas-kollaps – autofagi-höjare (spermidin, rapamycin-analoger)</li>
              <li>Mitokondriell dysfunktion – mitofagiinducerare (urolithin A, SS-31-peptid)</li>
              <li>Cellulär senescens – senolytika (dasatinib–quercetin, fisetin)</li>
              <li>Inflamm-aging – NLRP3-, IL-1β- och TNF-α-blockerare</li>
            </ul>
            <p className="text-gray-700 mt-3">Kandidater som påverkar två eller fler pelare rankas högst i longevity-screenings.</p>
          </section>

          {/* 3. AI och deep learning */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. AI &amp; Deep Learning: Från 24 månader till 3</h2>
            <p className="text-gray-700">
              Generativa modeller (HydrAMP, DeepPep-FS) föreslår kandidater på dagar och bedömer toxicitet på veckor.
              Scripps–Gero 2025 skannade 3 200 FDA-godkända läkemedel för multi-receptor-affinitet (dopamin D2,
              serotonin 5-HT2, histamin H3). 70 % av topp-40 ökade C. elegans livslängd; meflokin, trifluoperazin och
              cinnarizin presterade bäst, med kortare väg till klinisk prövning tack vare befintliga säkerhetsdata.
            </p>
          </section>

          {/* 4. Senolytika */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Senolytika – först-i-människa 2024–25</h2>
            <p className="text-gray-700">
              DQ-kombon (dasatinib + quercetin) eliminerade ~38 % senescenta fettceller i Mayo Clinic 2024 (n=60, 65–85 år)
              och förbättrade 6-minuters gång med 12 % efter 9 månader. Procyanidin C1 (fisetin) i NCT04675035 visar
              förbättrad greppstyrka och lägre IL-6 &amp; CRP hos 72 % av deltagarna (interim 2025).
            </p>
          </section>

          {/* 5. Mitokondriepeptider */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Mitokondriella målinriktade peptider</h2>
            <p className="text-gray-700">
              SS-31 (elamipretide) binder kardio-lipin och återställer cristae-struktur. I en randomiserad 2025-studie på
              HFpEF ökade VO₂ max med 14 % och 6-minuters gång med 8 % vs placebo. Oral cyklisk MTP-131 är i Fas I
              med &gt;40 % oral biotillgänglighet – potentiell game-changer för en injektionsklass.
            </p>
          </section>

          {/* 6. Kalorirestriktionsmimetika */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Kalorirestriktionsmimetika</h2>
            <p className="text-gray-700">
              Rapamycin (mTORC1) förlänger livslängd i gnagare (upp till ~28 %). I PEARL (2024, n=200, 6 veckor) gav 6 mg/vecka
              ökad T-cell naive:memory-ratio och sänkt SASP med ~22 % utan större biverkningar. 12-månaders uppföljning
              rekryterar; primärt endpoint är Pace of Aging (metylationsklocka).
            </p>
          </section>

          {/* 7. Ung plasma */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Ung plasma – data över hype</h2>
            <p className="text-gray-700">
              Att späda gammal plasma (TPE) snarare än att tillsätta "unga" faktorer gav &gt;20 % föryngring av muskel, lever och
              hjärnans transkriptom hos möss. Stanford 2024 (NCT04650054) replikerade i människa: TPE 2×/månad i 3 månader
              förbättrade handgrepp med 7 % och minskade γ-H2AX med 15 %. PLASMA-Age (n=300) startar Q3 2025.
            </p>
          </section>

          {/* 8. NAD+ boosters */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. NAD⁺-höjare – mikro-doser slår mega-doser</h2>
            <p className="text-gray-700">
              Höga doser NR kan ge metylgruppsbrist och leverstress. 2025 crossover (n=48) visade att 100 mg NR + 50 mg
              pterostilben 2×/dag ökade intracellulärt NAD⁺ med 55 % utan förändrad homocystein; FMD förbättrades 1,8 % vs placebo.
              Låg-dos kombos (NR + resveratrol + glycin) väntas i apotek i slutet av 2025.
            </p>
          </section>

          {/* 9. Reprogrammering */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Reprogrammering – partial Yamanaka i levande möss</h2>
            <p className="text-gray-700">
              Cyklisk partial reprogrammering (2 dagar OKSM, 5 dagar OFF) vände synnervsskada i 12-månaders möss och
              återställde synen. En icke-integrativ mRNA-cocktail (OCT4 + SOX2 + LIN28) är i GLP-tox; första mänsklig fas I/IIa
              för AMD planeras 2026.
            </p>
          </section>

          {/* 10. Vägkarta */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Vad händer härnäst? Vägkarta till 2030</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>2025–26: Senolytika (fisetin) &amp; mitokondriepeptider (SS-31) rapporterar primära endpoints</li>
              <li>2027: AI-designade polyfarmakologiska läkemedel går in i adaptiva Fas II/III</li>
              <li>2028: Reprogrammering flyttar från oftalmologi till systemisk fibros &amp; skörhet</li>
              <li>2030: Kombinationspaket (senolytika + NAD⁺-höjare + mitokondriepeptid) som första-linjens prevention &gt;60 år</li>
            </ul>
          </section>

          {/* Bottom line */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Bottom line</h2>
            <p className="text-gray-700">
              Anti-aging är inte längre science fiction. Med AI-accelererad upptäckt, robusta kliniska data och regulatoriska
              vägar för åldrande som sjukdom (TAME-liknande protokoll) kan de kommande fem åren leverera den första
              certifierade "longevity pill".
            </p>
          </section>

          {/* Referenser */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Referenser</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Singh P et al. Cell Commun Signal 2024;22:123. Open access.</li>
              <li>Petrascheck M, Fedichev P.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}