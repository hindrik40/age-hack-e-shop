'use client'

import { useRouter } from 'next/navigation'
import { User, Award, Globe, MessageCircle, ChevronRight, Star, MapPin } from 'lucide-react'
import { Expert } from '@/lib/api/forum'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface ExpertCardProps {
  expert: Expert
  showFullBio?: boolean
}

export default function ExpertCard({ expert, showFullBio = false }: ExpertCardProps) {
  const router = useRouter()
  const { language } = useLanguage()

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ayurveda':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
      case 'tcm':
        return 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
      case 'antiaging':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      default:
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
    }
  }

  const getRatingDisplay = () => {
    // Generera ett betyg baserat på expertens erfarenhet och certifieringar
    const baseRating = 4.5
    const experienceBonus = Math.min(expert.years_of_experience * 0.02, 0.3)
    const certificationBonus = Math.min((expert.certifications?.length || 0) * 0.05, 0.2)
    const rating = Math.min(baseRating + experienceBonus + certificationBonus, 5.0)
    
    return {
      rating: rating.toFixed(1),
      reviews: Math.floor(rating * 20 + Math.random() * 50) // Simulerat antal recensioner
    }
  }

  const ratingInfo = getRatingDisplay()

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          {/* Expert Photo */}
          <div className="relative">
            {expert.photo_url ? (
              <img
                src={expert.photo_url}
                alt={expert.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                {expert.name.charAt(0)}
              </div>
            )}
            
            {/* Online Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg">
              <div className="w-full h-full rounded-full bg-green-400 animate-pulse"></div>
            </div>
          </div>

          {/* Expert Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {expert.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(parseFloat(ratingInfo.rating))
                        ? 'text-yellow-400 fill-current'
                        : i < parseFloat(ratingInfo.rating)
                        ? 'text-yellow-400 fill-current opacity-50'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{ratingInfo.rating}</span>
              <span className="text-sm text-gray-500">({ratingInfo.reviews})</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>{expert.years_of_experience} {language === 'sv' ? 'års erfarenhet' : 'years experience'}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 100) + 50} {language === 'sv' ? 'svar' : 'answers'}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Specializations */}
        {expert.specializations && expert.specializations.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {language === 'sv' ? 'Specialiseringar' : 'Specializations'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {expert.specializations.map((spec) => (
                <span
                  key={spec.id}
                  className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getCategoryColor(spec.category)}`}
                >
                  {language === 'sv' ? spec.name_sv : spec.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bio */}
        <div className="mb-4">
          <p className={`text-gray-600 leading-relaxed ${!showFullBio ? 'line-clamp-3' : ''}`}>
            {expert.bio}
          </p>
          {!showFullBio && expert.bio.length > 150 && (
            <button
              onClick={() => {}}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1"
            >
              {language === 'sv' ? 'Läs mer' : 'Read more'}
            </button>
          )}
        </div>

        {/* Certifications */}
        {expert.certifications && expert.certifications.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              {language === 'sv' ? 'Certifieringar' : 'Certifications'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {expert.certifications.slice(0, 3).map((cert, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium"
                >
                  {cert}
                </span>
              ))}
              {expert.certifications.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                  +{expert.certifications.length - 3} {language === 'sv' ? 'fler' : 'more'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        {expert.languages && expert.languages.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {language === 'sv' ? 'Språk' : 'Languages'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {expert.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => router.push(`/experts/${expert.id}`)}
            className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
          >
            <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {language === 'sv' ? 'Visa Profil' : 'View Profile'}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/forum/ask')}
            className="w-full sm:w-auto px-4 py-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>

        {/* Availability Status */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">
              {language === 'sv' ? 'Tillgänglig för konsultation' : 'Available for consultation'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}