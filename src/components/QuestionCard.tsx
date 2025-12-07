'use client'

import { useState } from 'react'
import { MessageCircle, User, Clock, CheckCircle, ChevronDown, ChevronUp, Eye, ChevronRight } from 'lucide-react'
import { Question } from '@/lib/api/forum'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { formatDistanceToNow } from 'date-fns'
import { sv, enUS } from 'date-fns/locale'

interface QuestionCardProps {
  question: Question
  onQuestionClick?: () => void
}

export default function QuestionCard({ question, onQuestionClick }: QuestionCardProps) {
  const { language } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAllAnswers, setShowAllAnswers] = useState(false)

  const getTimeAgo = (date: string) => {
    const locale = language === 'sv' ? sv : enUS
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true, 
      locale 
    })
  }

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

  const getSpecializationName = () => {
    if (!question.specialization) return ''
    return language === 'sv' ? question.specialization.name_sv : question.specialization.name
  }

  const getSpecializationDescription = () => {
    if (!question.specialization) return ''
    return language === 'sv' 
      ? question.specialization.description_sv 
      : question.specialization.description
  }

  const displayName = question.is_anonymous 
    ? (language === 'sv' ? 'Anonym användare' : 'Anonymous user')
    : question.user_name

  const hasAnswers = question.answers && question.answers.length > 0
  const displayedAnswers = showAllAnswers 
    ? question.answers 
    : question.answers?.slice(0, 2)

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${getCategoryColor(question.category)}`}>
                {question.category}
              </span>
              {question.specialization && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {getSpecializationName()}
                </span>
              )}
              {hasAnswers && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {language === 'sv' ? 'Besvarad' : 'Answered'}
                </span>
              )}
            </div>
            
            <h3 
              className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors"
              onClick={onQuestionClick}
            >
              {question.title}
            </h3>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{displayName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{getTimeAgo(question.created_at)}</span>
              </div>
              {hasAnswers && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{question.answers?.length} {language === 'sv' ? 'svar' : 'answers'}</span>
                </div>
              )}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Question Content */}
        <div className={`mb-6 ${isExpanded ? '' : 'line-clamp-3'}`}>
          <p className="text-gray-700 leading-relaxed">
            {question.content}
          </p>
        </div>

        {/* Answers Section */}
        {hasAnswers && (
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                {language === 'sv' ? 'Expert Svar' : 'Expert Answers'}
              </h4>
              
              {question.answers && question.answers.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllAnswers(!showAllAnswers)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {showAllAnswers 
                    ? (language === 'sv' ? 'Visa färre' : 'Show less')
                    : `${language === 'sv' ? 'Visa alla' : 'Show all'} (${question.answers.length})`
                  }
                </Button>
              )}
            </div>
            
            <div className="space-y-4">
              {displayedAnswers?.map((answer) => (
                <div key={answer.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {answer.expert?.photo_url ? (
                        <img
                          src={answer.expert.photo_url}
                          alt={answer.expert.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {answer.expert?.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-gray-900">{answer.expert?.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <span>{answer.expert?.years_of_experience} {language === 'sv' ? 'års erfarenhet' : 'years experience'}</span>
                          {answer.is_featured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                              ⭐ {language === 'sv' ? 'Utvald' : 'Featured'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {getTimeAgo(answer.created_at)}
                    </div>
                  </div>
                  
                  <div className="text-gray-700 leading-relaxed">
                    {answer.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={onQuestionClick}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {language === 'sv' ? 'Läs mer' : 'Read more'}
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          {!hasAnswers && (
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {language === 'sv' ? 'Väntar på svar' : 'Waiting for answer'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}