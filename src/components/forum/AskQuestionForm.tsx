'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createQuestion } from '@/lib/api/forum';

import { Input } from '@/components/ui/input';
import Label from '@/components/ui/label';
import Textarea from '@/components/ui/textarea';

import { useToast } from '@/hooks/use-toast';
import { Send, User, Mail, Tag, MessageSquare } from 'lucide-react';

interface AskQuestionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AskQuestionForm({ onSuccess, onCancel }: AskQuestionFormProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    user_name: '',
    user_email: '',
    category: 'ayurveda',
    specialization: '',
    is_anonymous: false
  });

  const categories = [
    { value: 'ayurveda', label: { en: 'Ayurveda', sv: 'Ayurveda' } },
    { value: 'tcm', label: { en: 'Traditional Chinese Medicine', sv: 'Traditionell Kinesisk Medicin' } },
    { value: 'antiaging', label: { en: 'Anti-Aging', sv: 'Anti-Aging' } }
  ];

  const specializations = {
    ayurveda: [
      { value: '', label: { en: 'General Question', sv: 'Allmän Fråga' } },
      { value: 'panchakarma', label: { en: 'Panchakarma Therapy', sv: 'Panchakarma Terapi' } },
      { value: 'herbal', label: { en: 'Herbal Medicine', sv: 'Örtmedicin' } },
      { value: 'diet', label: { en: 'Diet & Nutrition', sv: 'Kost & Näring' } },
      { value: 'yoga', label: { en: 'Yoga Therapy', sv: 'Yogaterapi' } }
    ],
    tcm: [
      { value: '', label: { en: 'General Question', sv: 'Allmän Fråga' } },
      { value: 'acupuncture', label: { en: 'Acupuncture', sv: 'Akupunktur' } },
      { value: 'herbal', label: { en: 'Herbal Formulas', sv: 'Örtformler' } },
      { value: 'tuina', label: { en: 'Tui Na Massage', sv: 'Tui Na Massage' } },
      { value: 'qigong', label: { en: 'Qi Gong', sv: 'Qi Gong' } }
    ],
    antiaging: [
      { value: '', label: { en: 'General Question', sv: 'Allmän Fråga' } },
      { value: 'longevity', label: { en: 'Longevity Medicine', sv: 'Längemedisin' } },
      { value: 'cellular', label: { en: 'Cellular Regeneration', sv: 'Cellulär Regenerering' } },
      { value: 'hormone', label: { en: 'Hormone Optimization', sv: 'Hormonoptimering' } },
      { value: 'nutrition', label: { en: 'Nutritional Therapy', sv: 'Näringssterapi' } }
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.user_name.trim() || !formData.user_email.trim()) {
      toast({
        title: t('error', 'Error'),
        description: t('please_fill_all_fields', 'Please fill in all required fields'),
        variant: 'destructive'
      });
      return;
    }

    if (!formData.user_email.includes('@')) {
      toast({
        title: t('error', 'Error'),
        description: t('please_enter_valid_email', 'Please enter a valid email address'),
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const result = await createQuestion({
        title: formData.title,
        content: formData.content,
        user_name: formData.user_name,
        user_email: formData.user_email,
        category: formData.category,
        specialization_id: formData.specialization || undefined,
        is_anonymous: formData.is_anonymous
      });

      if (result) {
        toast({
          title: t('success', 'Success'),
          description: t('question_submitted', 'Your question has been submitted successfully!')
        });
        
        if (onSuccess) {
          onSuccess();
        } else {
          // Reset form
          setFormData({
            title: '',
            content: '',
            user_name: '',
            user_email: '',
            category: 'ayurveda',
            specialization: '',
            is_anonymous: false
          });
        }
      } else {
        throw new Error('Failed to submit question');
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      toast({
        title: t('error', 'Error'),
        description: t('failed_to_submit_question', 'Failed to submit question. Please try again.'),
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          {t('ask_question', 'Ask a Question')}
        </h2>
      </div>
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                {t('category', 'Category')}
              </Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label[language as keyof typeof cat.label]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="specialization">
                {t('specialization', 'Specialization')}
              </Label>
              <select
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {specializations[formData.category as keyof typeof specializations]?.map(spec => (
                  <option key={spec.value} value={spec.value}>
                    {spec.label[language as keyof typeof spec.label]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="title" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {t('question_title', 'Question Title')}
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder={t('enter_question_title', 'Enter your question title...')}
              className="focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <Label htmlFor="content">
              {t('question_details', 'Question Details')}
            </Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder={t('describe_your_question', 'Please describe your question or concern in detail...')}
              rows={6}
              className="focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="user_name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {t('your_name', 'Your Name')}
              </Label>
              <Input
                id="user_name"
                name="user_name"
                type="text"
                value={formData.user_name}
                onChange={handleInputChange}
                placeholder={t('enter_your_name', 'Enter your name...')}
                className="focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <Label htmlFor="user_email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t('your_email', 'Your Email')}
              </Label>
              <Input
                id="user_email"
                name="user_email"
                type="email"
                value={formData.user_email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_anonymous"
              name="is_anonymous"
              checked={formData.is_anonymous}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="is_anonymous" className="text-sm">
              {t('ask_anonymously', 'Ask anonymously (your name will not be displayed publicly)')}
            </Label>
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {t('submitting', 'Submitting...')}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {t('submit_question', 'Submit Question')}
                </>
              )}
            </button>
            
            {onCancel && (
              <button 
                type="button" 
                onClick={onCancel}
                disabled={loading}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('cancel', 'Cancel')}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}