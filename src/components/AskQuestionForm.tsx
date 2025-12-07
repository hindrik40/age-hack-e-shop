'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Send, User, Mail, Tag, MessageSquare, UserCheck, AlertCircle } from 'lucide-react'
import { createQuestion } from '@/lib/api/forum'
import { getSpecializations } from '@/lib/api/forum'
import { ExpertSpecialization } from '@/lib/api/forum'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'
import { toast } from 'sonner'

interface AskQuestionFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function AskQuestionForm({ onSuccess, onCancel }: AskQuestionFormProps) {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [specializations, setSpecializations] = useState<ExpertSpecialization[]>([])
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    user_name: '',
    user_email: '',
    category: 'ayurveda',
    specialization_id: '',
    is_anonymous: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    { id: 'ayurveda', name: 'Ayurveda', name_sv: 'Ayurveda' },
    { id: 'tcm', name: 'Traditional Chinese Medicine', name_sv: 'Kinesisk Medicin' },
    { id: 'antiaging', name: 'Anti-aging', name_sv: 'Anti-aging' }
  ]

  useEffect(() => {
    loadSpecializations()
  }, [])

  const loadSpecializations = async () => {
    try {
      const specs = await getSpecializations()
      setSpecializations(specs)
    } catch (error) {
      console.error('Error loading specializations:', error)
      toast.error(t('forum.errorLoadingSpecializations'))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = language === 'sv' ? 'Titel är obligatorisk' : 'Title is required'
    } else if (formData.title.length < 10) {
      newErrors.title = language === 'sv' ? 'Titel måste vara minst 10 tecken' : 'Title must be at least 10 characters'
    }

    if (!formData.content.trim()) {
      newErrors.content = language === 'sv' ? 'Fråga är obligatorisk' : 'Question is required'
    } else if (formData.content.length < 20) {
      newErrors.content = language === 'sv' ? 'Fråga måste vara minst 20 tecken' : 'Question must be at least 20 characters'
    }

    if (!formData.is_anonymous) {
      if (!formData.user_name.trim()) {
        newErrors.user_name = language === 'sv' ? 'Namn är obligatoriskt' : 'Name is required'
      }

      if (!formData.user_email.trim()) {
        newErrors.user_email = language === 'sv' ? 'E-post är obligatorisk' : 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
        newErrors.user_email = language === 'sv' ? 'Ogiltig e-postadress' : 'Invalid email address'
      }
    }

    if (!formData.category) {
      newErrors.category = language === 'sv' ? 'Kategori är obligatorisk' : 'Category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error(language === 'sv' ? 'Vänligen korrigera felen i formuläret' : 'Please correct the errors in the form')
      return
    }

    setLoading(true)
    
    try {
      const question = await createQuestion({
        title: formData.title.trim(),
        content: formData.content.trim(),
        user_name: formData.is_anonymous ? 'Anonym' : formData.user_name.trim(),
        user_email: formData.is_anonymous ? 'anonymous@forum.com' : formData.user_email.trim(),
        category: formData.category,
        specialization_id: formData.specialization_id || undefined,
        is_anonymous: formData.is_anonymous
      })

      if (question) {
        toast.success(
          language === 'sv' 
            ? 'Din fråga har skickats! En expert kommer att svara snart.' 
            : 'Your question has been submitted! An expert will respond soon.'
        )
        
        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/forum')
        }
      } else {
        throw new Error('Failed to create question')
      }
    } catch (error) {
      console.error('Error submitting question:', error)
      toast.error(
        language === 'sv' 
          ? 'Det uppstod ett fel när din fråga skulle skickas. Försök igen.' 
          : 'An error occurred while submitting your question. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const filteredSpecializations = specializations.filter(spec => spec.category === formData.category)

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {language === 'sv' ? 'Ställ en fråga till våra experter' : 'Ask a question to our experts'}
        </CardTitle>
        <p className="text-center text-gray-600 mt-2">
          {language === 'sv' 
            ? 'Få personliga svar från certifierade experter inom ayurveda, kinesisk medicin och anti-aging.'
            : 'Get personalized answers from certified experts in Ayurveda, Traditional Chinese Medicine, and anti-aging.'
          }
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forum.category')} *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.category ? 'border-red-500' : 'border-gray-200'
              }`}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {language === 'sv' ? category.name_sv : category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.category}
              </p>
            )}
          </div>

          {/* Specialization Selection */}
          {filteredSpecializations.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('forum.specialization')} (valfritt)
              </label>
              <select
                name="specialization_id"
                value={formData.specialization_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">{t('forum.selectSpecialization')}</option>
                {filteredSpecializations.map(spec => (
                  <option key={spec.id} value={spec.id}>
                    {language === 'sv' ? spec.name_sv : spec.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forum.questionTitle')} *
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={language === 'sv' ? 'Vad vill du veta?' : 'What would you like to know?'}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.title ? 'border-red-500' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Question Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forum.yourQuestion')} *
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder={language === 'sv' 
                  ? 'Beskriv din fråga i detalj... Ge så mycket information som möjligt så att experten kan ge dig det bästa svaret.'
                  : 'Describe your question in detail... Provide as much information as possible so the expert can give you the best answer.'
                }
                rows={6}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                  errors.content ? 'border-red-500' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.content && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.content}
              </p>
            )}
          </div>

          {/* Anonymous Option */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_anonymous"
                checked={formData.is_anonymous}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {t('forum.askAnonymously')}
                </span>
              </div>
            </label>
            <p className="text-xs text-gray-500 mt-2 ml-8">
              {language === 'sv' 
                ? 'Din fråga kommer att publiceras anonymt. Du kommer fortfarande att få ett e-postmeddelande när någon svarar.'
                : 'Your question will be posted anonymously. You will still receive an email when someone responds.'
              }
            </p>
          </div>

          {/* User Info (only if not anonymous) */}
          {!formData.is_anonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.name')} *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    placeholder={t('common.yourName')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.user_name ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.user_name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.user_name}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.email')} *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    placeholder={t('common.yourEmail')}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.user_email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.user_email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.user_email}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {t('common.sending')}...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {t('forum.submitQuestion')}
                </>
              )}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                {t('common.cancel')}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}