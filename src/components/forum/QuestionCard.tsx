'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';


import { ChevronDown, ChevronUp, MessageCircle, User, Calendar, CheckCircle } from 'lucide-react';
import { Question } from '@/lib/api/forum';

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const categoryColors = {
    ayurveda: 'bg-orange-100 text-orange-800',
    tcm: 'bg-red-100 text-red-800', 
    antiaging: 'bg-purple-100 text-purple-800'
  };

  const categoryLabels = {
    ayurveda: { en: 'Ayurveda', sv: 'Ayurveda' },
    tcm: { en: 'TCM', sv: 'TKM' },
    antiaging: { en: 'Anti-Aging', sv: 'Anti-Aging' }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'sv' ? 'sv-SE' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const displayedAnswers = showAllAnswers 
    ? question.answers 
    : question.answers?.slice(0, 2);

  const hasMoreAnswers = (question.answers?.length || 0) > 2;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[question.category as keyof typeof categoryColors]}`}>
                {categoryLabels[question.category as keyof typeof categoryLabels]?.[language as keyof typeof categoryLabels.ayurveda] || question.category}
              </span>
              {question.is_answered && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {t('forum.answered', language === 'sv' ? 'Besvarad' : 'Answered')}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {question.title}
            </h3>
            {question.specialization && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-700 mb-2">
                {language === 'sv' ? question.specialization.name_sv : question.specialization.name}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{question.is_anonymous ? t('forum.anonymous', language === 'sv' ? 'Anonym' : 'Anonymous') : question.user_name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(question.created_at)}</span>
          </div>
          {question.answers && question.answers.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{question.answers.length} {t('forum.answers', language === 'sv' ? 'svar' : 'answers')}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4">
        <div className={`mb-4 ${!isExpanded ? 'line-clamp-3' : ''}`}>
          <p className="text-gray-700 leading-relaxed">
            {question.content}
          </p>
        </div>

        {question.content.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors mb-4"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                {t('forum.showLess', language === 'sv' ? 'Visa mindre' : 'Show less')}
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                {t('forum.showMore', language === 'sv' ? 'Visa mer' : 'Show more')}
              </>
            )}
          </button>
        )}

        {/* Answers Section */}
        {displayedAnswers && displayedAnswers.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">
              {t('forum.expertAnswers', language === 'sv' ? 'Expert Svar' : 'Expert Answers')}
            </h4>
            <div className="space-y-4">
              {displayedAnswers.map((answer) => (
                <div key={answer.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-gray-900">
                          {answer.expert?.name || 'Expert'}
                        </h5>
                        {answer.is_featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {t('forum.featured', language === 'sv' ? 'Utvald' : 'Featured')}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {answer.expert?.years_of_experience} {t('forum.yearsExperience', language === 'sv' ? 'års erfarenhet' : 'years experience')}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {answer.content}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    {formatDate(answer.created_at)}
                  </div>
                </div>
              ))}
              
              {hasMoreAnswers && !showAllAnswers && (
                <button
                  onClick={() => setShowAllAnswers(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {`${t('forum.showAllAnswers', language === 'sv' ? 'Visa alla' : 'Show all')} ${question.answers?.length} ${t('forum.answers', language === 'sv' ? 'svar' : 'answers')}` }
                </button>
              )}
            </div>
          </div>
        )}

        {!question.is_answered && (
          <div className="border-t pt-4 mt-4">
            <p className="text-gray-500 text-center py-4">
              {t('forum.waitingForAnswer', language === 'sv' ? 'Väntar på expertsvar...' : 'Waiting for expert answer...')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}