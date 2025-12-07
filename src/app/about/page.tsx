'use client';

import Image from 'next/image'
import { Heart, Users, Award, Leaf } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.storyTitle')}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {t('about.storyText')}
                </p>
                <p>
                  {t('about.storyText2')}
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <Leaf className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Naturens Kraft</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t('about.missionTitle')}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t('about.visionTitle')}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t('about.visionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.teamTitle')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about.teamSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Founder/CEO - Placeholder for user's image */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-blue-600" />
                </div>
                {/* Replace this div with actual Image component when you have your photo */}
                {/* <Image
                  src="/path-to-your-image.jpg"
                  alt="Ditt Namn"
                  fill
                  className="rounded-full object-cover"
                /> */}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('about.founderName')}</h3>
                <p className="text-blue-600 font-medium mb-3">{t('about.founderTitle')}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('about.founderText')}
                </p>
              </div>
            </div>

            {/* Health Expert */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('about.healthExpertName')}</h3>
                <p className="text-green-600 font-medium mb-3">{t('about.healthExpertTitle')}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('about.healthExpertText')}
                </p>
              </div>
            </div>

            {/* Beauty Expert */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <Award className="w-12 h-12 text-purple-600" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('about.beautyExpertName')}</h3>
                <p className="text-purple-600 font-medium mb-3">{t('about.beautyExpertTitle')}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t('about.beautyExpertText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.ourValues')}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.natural')}</h3>
              <p className="text-gray-600 text-sm">{t('about.values.naturalText')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.caring')}</h3>
              <p className="text-gray-600 text-sm">{t('about.values.caringText')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.quality')}</h3>
              <p className="text-gray-600 text-sm">{t('about.values.qualityText')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about.community')}</h3>
              <p className="text-gray-600 text-sm">{t('about.values.communityText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('about.ctaTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('about.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('about.ctaButton')}
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Kontakta Oss
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}