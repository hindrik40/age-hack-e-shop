'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, Users, Search, Filter, Plus, ChevronRight, Clock, CheckCircle } from 'lucide-react'
import { getQuestions, getSpecializations } from '@/lib/api/forum'
import { Question, ExpertSpecialization } from '@/lib/api/forum'
import QuestionCard from './QuestionCard'
import ExpertFilter from './ExpertFilter'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ExpertForum() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [questions, setQuestions] = useState<Question[]>([])
  const [specializations, setSpecializations] = useState<ExpertSpecialization[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: 'all', name: 'Alla kategorier', name_sv: 'Alla kategorier' },
    { id: 'ayurveda', name: 'Ayurveda', name_sv: 'Ayurveda' },
    { id: 'tcm', name: 'Kinesisk medicin', name_sv: 'Kinesisk medicin' },
    { id: 'antiaging', name: 'Anti-aging', name_sv: 'Anti-aging' }
  ]

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadQuestions()
  }, [selectedCategory, selectedSpecialization])

  const loadData = async () => {
    try {
      setLoading(true)
      const [questionsData, specializationsData] = await Promise.all([
        getQuestions(),
        getSpecializations()
      ])
      setQuestions(questionsData)
      setSpecializations(specializationsData)
    } catch (error) {
      console.error('Error loading forum data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadQuestions = async () => {
    try {
      const filters = {
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        specialization: selectedSpecialization || undefined
      }
      const questionsData = await getQuestions(filters)
      setQuestions(questionsData)
    } catch (error) {
      console.error('Error loading questions:', error)
    }
  }

  const filteredQuestions = questions.filter(question => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        question.title.toLowerCase().includes(term) ||
        question.content.toLowerCase().includes(term)
      )
    }
    return true
  })

  const stats = {
    totalQuestions: questions.length,
    answeredQuestions: questions.filter(q => q.is_answered).length,
    totalExperts: 12 // Detta bör hämtas från API senare
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('common.loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Expertforum
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              {language === 'sv' 
                ? 'Få svar på dina frågor om ayurveda, kinesisk medicin och anti-aging från våra certifierade experter.'
                : 'Get answers to your questions about Ayurveda, Traditional Chinese Medicine, and anti-aging from our certified experts.'
              }
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => router.push('/forum/ask')}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {t('forum.askQuestion')}
              </Button>
              <Button
                onClick={() => router.push('/experts')}
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                {t('forum.meetExperts')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalQuestions}</div>
              <div className="text-gray-600 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                {t('forum.totalQuestions')}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.answeredQuestions}</div>
              <div className="text-gray-600 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {t('forum.answeredQuestions')}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalExperts}</div>
              <div className="text-gray-600 flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                {t('forum.certifiedExperts')}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {t('forum.filters')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ExpertFilter
                  categories={categories}
                  specializations={specializations}
                  selectedCategory={selectedCategory}
                  selectedSpecialization={selectedSpecialization}
                  onCategoryChange={setSelectedCategory}
                  onSpecializationChange={setSelectedSpecialization}
                />
              </CardContent>
            </Card>
          </div>

          {/* Questions List */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('forum.searchQuestions')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {filteredQuestions.length === 0 ? (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      {t('forum.noQuestions')}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {t('forum.beFirstToAsk')}
                    </p>
                    <Button
                      onClick={() => router.push('/forum/ask')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300"
                    >
                      {t('forum.askFirstQuestion')}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onQuestionClick={() => router.push(`/forum/question/${question.id}`)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}