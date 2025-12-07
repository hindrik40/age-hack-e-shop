'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getQuestions, getSpecializations, Question, ExpertSpecialization } from '@/lib/api/forum';
import { QuestionCard } from './QuestionCard';
import { ExpertFilter } from './ExpertFilter';

import { Input } from '@/components/ui/input';
import { Loader2, Search, MessageSquare, Users } from 'lucide-react';

export function ExpertForum() {
  const { t, language } = useLanguage();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [specializations, setSpecializations] = useState<ExpertSpecialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [showAnsweredOnly, setShowAnsweredOnly] = useState<boolean>(false);

  const categories = [
    { value: 'all', label: { en: t('categories.all', 'All Categories'), sv: t('categories.all', 'Alla Kategorier') } },
    { value: 'ayurveda', label: { en: 'Ayurveda', sv: 'Ayurveda' } },
    { value: 'tcm', label: { en: 'Traditional Chinese Medicine', sv: 'Traditionell Kinesisk Medicin' } },
    { value: 'antiaging', label: { en: 'Anti-Aging', sv: 'Anti-Aging' } },
    { value: 'diet', label: { en: t('categories.diet', 'Diet'), sv: t('categories.diet', 'Kost') } },
    { value: 'sleep', label: { en: t('categories.sleep', 'Sleep'), sv: t('categories.sleep', 'Sömn') } },
    { value: 'movement', label: { en: t('categories.movement', 'Movement'), sv: t('categories.movement', 'Rörelse') } },
    { value: 'stress', label: { en: t('categories.stress', 'Stress'), sv: t('categories.stress', 'Stress') } },
    { value: 'spirituality', label: { en: t('categories.spirituality', 'Spirituality'), sv: t('categories.spirituality', 'Andlighet') } },
    { value: 'mentalHealth', label: { en: t('categories.mentalHealth', 'Mental Health'), sv: t('categories.mentalHealth', 'Själslig hälsa') } }
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [searchTerm, selectedCategory, selectedSpecialization, showAnsweredOnly]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [questionsData, specializationsData] = await Promise.all([
        getQuestions(),
        getSpecializations()
      ]);
      setQuestions(questionsData);
      setSpecializations(specializationsData);
    } catch (error) {
      console.error('Error loading forum data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterQuestions = () => {
    let filtered = questions;

    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(q => q.specialization_id === selectedSpecialization);
    }

    if (showAnsweredOnly) {
      filtered = filtered.filter(q => q.is_answered);
    }

    return filtered;
  };

  const filteredQuestions = filterQuestions();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('expert_forum', 'Expert Forum')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('expert_forum_desc', 'Ask questions to our certified experts in Ayurveda, Traditional Chinese Medicine, and Anti-Aging therapies')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Search className="h-5 w-5" />
                {t('filter_questions', 'Filter Questions')}
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('search', 'Search')}
                </label>
                <Input
                  placeholder={t('search_questions', 'Search questions...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('category', 'Category')}
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label[language as keyof typeof cat.label]}
                    </option>
                  ))}
                </select>
              </div>

              <ExpertFilter
                specializations={specializations}
                selectedSpecialization={selectedSpecialization}
                onSpecializationChange={setSelectedSpecialization}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="answered-only"
                  checked={showAnsweredOnly}
                  onChange={(e) => setShowAnsweredOnly(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="answered-only" className="text-sm">
                  {t('answered_only', 'Answered only')}
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button 
              onClick={() => window.location.href = '/forum/ask'}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              {t('ask_question', 'Ask a Question')}
            </button>
            
            <button 
              onClick={() => window.location.href = '/experts'}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Users className="h-4 w-4 mr-2" />
              {t('view_experts', 'View Experts')}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              {t('recent_questions', 'Recent Questions')}
            </h2>
            <p className="text-gray-600">
              {filteredQuestions.length} {t('questions_found', 'questions found')}
            </p>
          </div>

          <div className="space-y-6">
            {filteredQuestions.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t('no_questions_found', 'No questions found')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('try_different_filters', 'Try adjusting your filters or be the first to ask a question!')}
                  </p>
                  <button onClick={() => window.location.href = '/forum/ask'} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    {t('ask_first_question', 'Ask the First Question')}
                  </button>
                </div>
              </div>
            ) : (
              filteredQuestions.map(question => (
                <QuestionCard 
                  key={question.id} 
                  question={question}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}