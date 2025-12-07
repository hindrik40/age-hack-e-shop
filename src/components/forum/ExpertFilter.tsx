'use client';

import { ExpertSpecialization } from '@/lib/api/forum';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExpertFilterProps {
  specializations: ExpertSpecialization[];
  selectedSpecialization: string;
  onSpecializationChange: (specialization: string) => void;
  showCategoryFilter?: boolean;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function ExpertFilter({
  specializations,
  selectedSpecialization,
  onSpecializationChange,
  showCategoryFilter = false,
  selectedCategory = 'all',
  onCategoryChange
}: ExpertFilterProps) {
  const { language, t } = useLanguage();

  const categories = [
    { value: 'all', label: { en: t('categories.all', 'All Categories'), sv: t('categories.all', 'Alla kategorier') } },
    { value: 'ayurveda', label: { en: 'Ayurveda', sv: 'Ayurveda' } },
    { value: 'tcm', label: { en: 'Traditional Chinese Medicine', sv: 'Traditionell Kinesisk Medicin' } },
    { value: 'antiaging', label: { en: 'Anti-Aging', sv: 'Anti-Aging' } },
    { value: 'diet', label: { en: t('categories.diet', 'Diet'), sv: t('categories.diet', 'Kost') } },
    { value: 'sleep', label: { en: t('categories.sleep', 'Sleep'), sv: t('categories.sleep', 'Sömn') } },
    { value: 'movement', label: { en: t('categories.movement', 'Movement'), sv: t('categories.movement', 'Rörelse') } },
    { value: 'stress', label: { en: t('categories.stress', 'Stress'), sv: t('categories.stress', 'Stress') } },
    { value: 'spirituality', label: { en: t('categories.spirituality', 'Spirituality'), sv: t('categories.spirituality', 'Andlighet') } },
    { value: 'mentalHealth', label: { en: t('categories.mentalHealth', 'Mental Health'), sv: t('categories.mentalHealth', 'Själslig hälsa') } },
  ];

  const groupedSpecializations = specializations.reduce((acc, spec) => {
    if (!acc[spec.category]) {
      acc[spec.category] = [];
    }
    acc[spec.category].push(spec);
    return acc;
  }, {} as Record<string, ExpertSpecialization[]>);

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.label[language as keyof typeof cat.label] || category;
  };

  return (
    <div>
      {showCategoryFilter && onCategoryChange && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            {t('forum.category', language === 'sv' ? 'Kategori' : 'Category')}
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label[language as keyof typeof cat.label]}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">
          {t('forum.specialization', language === 'sv' ? 'Specialisering' : 'Specialization')}
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          value={selectedSpecialization}
          onChange={(e) => onSpecializationChange(e.target.value)}
        >
          <option value="all">
            {t('forum.allSpecializations', language === 'sv' ? 'Alla Specialiseringar' : 'All Specializations')}
          </option>
          
          {Object.entries(groupedSpecializations).map(([category, specs]) => (
            <optgroup key={category} label={getCategoryLabel(category)}>
              {specs.map(spec => (
                <option key={spec.id} value={spec.id}>
                  {language === 'sv' ? spec.name_sv : spec.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}