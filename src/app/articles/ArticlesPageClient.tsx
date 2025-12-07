'use client'

import { Suspense } from 'react'
import ArticleList from '@/components/ArticleList'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ArticlesPageClient({ articles }: { articles: any[] }) {
  const { language } = useLanguage()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3005'
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: articles.map((a, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${siteUrl}/articles/${a.slug}`,
      name: a.title,
    })),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {language === 'sv' ? 'Kunskapsbank' : 'Knowledge Base'}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'sv' ? 'Fördjupa dig i vetenskapligt baserad information om anti-aging, hälsa och välbefinnande' : 'Dive into science-based articles on anti-aging, health and wellbeing'}
          </p>
        </div>
        <Suspense fallback={<div className="p-6">{language === 'sv' ? 'Laddar artiklar...' : 'Loading articles...'}</div>}>
          <ArticleList articles={articles} />
        </Suspense>
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{language === 'sv' ? 'Fler artiklar kommer snart' : 'More articles coming soon'}</h3>
            <p className="text-gray-600 mb-6">
              {language === 'sv' ? 'Vi arbetar kontinuerligt med att utöka vår kunskapsbank med vetenskapligt baserad information om anti-aging, hälsa och välbefinnande.' : 'We are continuously expanding our knowledge base with science-backed information on anti-aging, health and wellbeing.'}
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}