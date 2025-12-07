'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getExpertById, getQuestions, Expert, Question } from '@/lib/api/forum';
import { ExpertCard } from '@/components/forum/ExpertCard';
import { QuestionCard } from '@/components/forum/QuestionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { ArrowLeft, Mail, Award, Clock, Globe, MessageSquare, User } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ExpertProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [expertQuestions, setExpertQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      loadExpertData();
    }
  }, [id]);

  const loadExpertData = async () => {
    try {
      setLoading(true);
      const expertData = await getExpertById(id!);
      setExpert(expertData);

      if (expertData) {
        // Load questions answered by this expert
        const specializationIds = expertData.specializations?.map(s => s.id) || [];
        const questionsData = await getQuestions();
        const expertQs = questionsData.filter(q => 
          q.answers?.some(answer => answer.expert_id === id) ||
          specializationIds.includes(q.specialization_id || '')
        );
        setExpertQuestions(expertQs);
      }
    } catch (error) {
      console.error('Error loading expert data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('experts.notFound', 'Expert Not Found')}</h1>
          <p className="text-gray-600 mb-6">{t('experts.notFoundDesc', "The expert you're looking for could not be found.")}</p>
          <button 
            onClick={() => router.push('/experts')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('experts.backToExperts', 'Back to Experts')}
          </button>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      ayurveda: 'bg-orange-100 text-orange-800',
      tcm: 'bg-red-100 text-red-800',
      antiaging: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatLanguages = (languages: string[]) => {
    const langNames = {
      en: 'English',
      sv: 'Swedish', 
      hi: 'Hindi',
      gu: 'Gujarati',
      zh: 'Chinese',
      es: 'Spanish'
    };
    return languages.map(lang => 
      langNames[lang as keyof typeof langNames] || lang
    ).join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => router.push('/experts')}
          className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('experts.backToExperts', 'Back to Experts')}
        </button>

        {/* Expert Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-gray-600" />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {expert.name}
                </h1>
                
                <div className="flex items-center gap-6 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{expert.years_of_experience} {t('forum.yearsExperience', 'years experience')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>{formatLanguages(expert.languages)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{expert.email}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.specializations?.map((spec) => (
                    <span 
                      key={spec.id} 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(spec.category)}`}
                    >
                      {spec.name}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {expert.bio}
                </p>

                {expert.certifications && expert.certifications.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      {t('forum.certifications', 'Certifications')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {expert.certifications.map((cert, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-700">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Expert's Recent Activity */}
        {expertQuestions.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <MessageSquare className="h-5 w-5" />
                  {t('experts.recentQA', 'Recent Questions & Answers')}
                </h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-6">
                {expertQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {expertQuestions.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('experts.noRecentActivity', 'No Recent Activity')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('experts.noRecentActivityHint', "This expert hasn't answered any questions yet. Check back soon!")}
              </p>
              <Button onClick={() => router.push('/forum')}>
                {t('experts.browseForum', 'Browse Forum Questions')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}