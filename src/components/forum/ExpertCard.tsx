import { User, Calendar, MessageCircle, Clock, Globe, Award, ChevronRight, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Expert } from '@/lib/api/forum';

interface ExpertCardProps {
  expert: Expert;
  language: string;
  showFullBio?: boolean;
  onViewProfile?: () => void;
}

export function ExpertCard({ expert, language, showFullBio = false, onViewProfile }: ExpertCardProps) {
  const { t } = useLanguage();
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

  const getCategoryLabel = (category: string) => {
    const labels = {
      ayurveda: { en: 'Ayurveda', sv: 'Ayurveda' },
      tcm: { en: 'TCM', sv: 'TKM' },
      antiaging: { en: 'Anti-Aging', sv: 'Anti-Aging' }
    };
    return labels[category as keyof typeof labels]?.[language as keyof typeof labels.ayurveda] || category;
  };

  const formatLanguages = (languages: string[]) => {
    const langNames = {
      en: t('lang.en', 'English'),
      sv: t('lang.sv', 'Swedish'),
      hi: t('lang.hi', 'Hindi'),
      gu: t('lang.gu', 'Gujarati'),
      zh: t('lang.zh', 'Chinese'),
      es: t('lang.es', 'Spanish')
    };
    return languages.map(lang => 
      langNames[lang as keyof typeof langNames] || lang
    ).join(', ');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
            {expert.photo_url ? (
              <img src={expert.photo_url} alt={expert.name} className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <User className="h-8 w-8" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {expert.name}
            </h3>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{expert.years_of_experience} {t('forum.yearsExperience', language === 'sv' ? 'års erfarenhet' : 'years experience')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{formatLanguages(expert.languages)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {expert.specializations?.map((spec) => (
                <span 
                  key={spec.id} 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(spec.category)}`}
                >
                  {language === 'sv' ? spec.name_sv : spec.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className={`mb-4 ${!showFullBio && expert.bio.length > 200 ? 'line-clamp-3' : ''}`}>
          <p className="text-gray-700 leading-relaxed">
            {expert.bio}
          </p>
        </div>

        {expert.certifications && expert.certifications.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Award className="h-4 w-4" />
              {language === 'sv' ? t('forum.certifications', 'Certifieringar') : t('forum.certifications', 'Certifications')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {expert.certifications.map((cert, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-700">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Mail className="h-4 w-4" />
            <span>{expert.email}</span>
          </div>
          
          {onViewProfile && (
            <button 
              onClick={onViewProfile}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              {t('forum.viewProfile', language === 'sv' ? 'Visa Profil' : 'View Profile')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}