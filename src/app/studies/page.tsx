'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { articles } from '@/data/articles';

export default function StudiesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('studies.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {t('studies.subtitle')}
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            {t('studies.description')}
          </p>
        </div>

        {/* Statisk kortlayout */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Peptidforskning-kort */}
            <Link href="#peptidforskning" className="group bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden border border-gray-100">
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1581092923955-12cb8c2c1d3a?auto=format&fit=crop&w=800&q=60')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('studies.cardPeptidesTitle', 'Peptidforskning')}</h3>
                <p className="text-gray-600">{t('studies.cardPeptidesDesc', 'Aktuella studier om terapeutiska peptider, AMP och leveranssystem.')}</p>
                <span className="inline-flex items-center text-blue-600 mt-3">{t('studies.viewStudies', 'Visa studier')} <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span></span>
              </div>
            </Link>
            {/* Anti-aging-kort */}
            <Link href="#anti-aging" className="group bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden border border-gray-100">
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1532009324734-20a7a5813719?auto=format&fit=crop&w=800&q=60')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('studies.cardAntiAgingTitle', 'Anti-aging forskning')}</h3>
                <p className="text-gray-600">{t('studies.cardAntiAgingDesc', 'Översikter och kliniska data kring anti-aging interventioner.')}</p>
                <span className="inline-flex items-center text-blue-600 mt-3">{t('studies.viewStudies', 'Visa studier')} <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span></span>
              </div>
            </Link>
            {/* Ayurvedisk Medicin */}
            <Link href="/courses/ayurveda" className="group bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden border border-gray-100">
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1604908554063-f7c245f17f85?auto=format&fit=crop&w=800&q=60')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ayurvedisk Medicin</h3>
                <p className="text-gray-600">Traditionella metoder med modern evidens för välbefinnande.</p>
                <span className="inline-flex items-center text-blue-600 mt-3">Utforska <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span></span>
              </div>
            </Link>
            {/* TKM */}
            <Link href="/courses/tcm" className="group bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden border border-gray-100">
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=60')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Traditionell Kinesisk Medicin</h3>
                <p className="text-gray-600">Akupunktur, örter och holistiska terapier med kliniskt stöd.</p>
                <span className="inline-flex items-center text-blue-600 mt-3">Utforska <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span></span>
              </div>
            </Link>
          </div>
        </div>

        {/* Studier under rubriker */}
        {(() => {
          const peptides = articles.filter(a => a.category.includes('Vetenskapliga studier') && a.category.includes('Peptidforskning'));
          const antiAging = articles.filter(a => a.category.includes('Vetenskapliga studier') && a.category.includes('Anti-aging'));
          const ArticleCard = ({ a }: { a: typeof articles[number] }) => (
            <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
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
          );
          return (
            <div>
              {peptides.length > 0 && (
                <section id="peptidforskning" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Peptidforskning</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {peptides.map((a) => (<ArticleCard key={a.id} a={a} />))}
                  </div>
                </section>
              )}
              {antiAging.length > 0 && (
                <section id="anti-aging" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Anti-aging</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {antiAging.map((a) => (<ArticleCard key={a.id} a={a} />))}
                  </div>
                </section>
              )}
            </div>
          );
        })()}

        {/* Sammanfattning av Forskning */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Sammanfattning av Forskning
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">95%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kundnöjdhet</h3>
              <p className="text-gray-600">Av våra kunder rapporterar förbättrad hudkvalitet</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">87%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Effektivitet</h3>
              <p className="text-gray-600">Minskning av ålderstecken efter 8 veckors användning</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">100%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Naturliga Ingredienser</h3>
              <p className="text-gray-600">Alla våra produkter innehåller naturliga ingredienser</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}