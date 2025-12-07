'use client'

import { Suspense } from 'react'
import CourseList, { Course } from '@/components/CourseList'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CoursesPageClient({ courses }: { courses: Course[] }) {
  const { language } = useLanguage()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {language === 'sv' ? 'Våra Kurser' : 'Our Courses'}
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto">
              {language === 'sv' ? 'Fördjupa dina kunskaper inom anti-aging, hälsa och personlig utveckling med våra expertledda onlinekurser' : 'Deepen your knowledge in anti-aging, health and personal development with our expert-led online courses'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="text-center py-8">{language === 'sv' ? 'Laddar kurser...' : 'Loading courses...'}</div>}>
          <CourseList courses={courses} />
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'sv' ? 'Fler kurser kommer snart' : 'More courses coming soon'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'sv' ? 'Vi arbetar kontinuerligt med att utveckla nya kurser inom hälsa och välmående.' : 'We are continuously developing new courses in health and wellbeing.'}
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            {language === 'sv' ? 'Få uppdateringar om nya kurser' : 'Get updates on new courses'}
          </div>
        </div>
      </div>
    </div>
  )
}