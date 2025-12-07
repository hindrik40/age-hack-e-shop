'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import AntiAgingEducation from '@/components/AntiAgingEducation'

export default function EducationPage() {
  const router = useRouter()
  const { language } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-16">
        <AntiAgingEducation />
      </div>

      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] flex gap-3">
        <button
          aria-label={language === 'sv' ? 'Tillbaka' : 'Back'}
          onClick={() => router.back()}
          className="px-5 py-3 rounded-full bg-gray-900/85 text-white shadow-lg hover:bg-gray-800 text-sm sm:text-base"
        >
          {language === 'sv' ? 'Tillbaka' : 'Back'}
        </button>
        <button
          aria-label={language === 'sv' ? 'Till startsidan' : 'Home'}
          onClick={() => { if (typeof window !== 'undefined') window.location.href = '/' }}
          className="px-5 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 text-sm sm:text-base"
        >
          {language === 'sv' ? 'Till startsidan' : 'Home'}
        </button>
      </div>
    </div>
  )
}