'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TreatmentCategory, Ailment } from '@/lib/treatments';
import { Search, Filter, X } from 'lucide-react';

interface TreatmentFilterProps {
  categories: TreatmentCategory[];
  ailments: Ailment[];
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  search: string;
  systemType: 'all' | 'ayurveda' | 'tcm' | 'both';
  categoryId: string;
  ailmentId: string;
  bodyPart: string;
}

export default function TreatmentFilter({ 
  categories, 
  ailments, 
  onFilterChange, 
  className = '' 
}: TreatmentFilterProps) {
  const { language } = useLanguage();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    systemType: 'all',
    categoryId: '',
    ailmentId: '',
    bodyPart: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const systemTypes = [
    { value: 'all', label_sv: 'Alla system', label_en: 'All systems' },
    { value: 'ayurveda', label_sv: 'Ayurveda', label_en: 'Ayurveda' },
    { value: 'tcm', label_sv: 'Traditionell Kinesisk Medicin', label_en: 'Traditional Chinese Medicine' },
    { value: 'both', label_sv: 'Båda systemen', label_en: 'Both systems' }
  ];

  const bodyParts = [
    { value: '', label_sv: 'Alla kroppsdelar', label_en: 'All body parts' },
    { value: 'mind', label_sv: 'Sinne', label_en: 'Mind' },
    { value: 'head', label_sv: 'Huvud', label_en: 'Head' },
    { value: 'back', label_sv: 'Rygg', label_en: 'Back' },
    { value: 'joints', label_sv: 'Leder', label_en: 'Joints' },
    { value: 'abdomen', label_sv: 'Mage', label_en: 'Abdomen' },
    { value: 'skin', label_sv: 'Hud', label_en: 'Skin' },
    { value: 'body', label_sv: 'Hela kroppen', label_en: 'Whole body' }
  ];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      systemType: 'all',
      categoryId: '',
      ailmentId: '',
      bodyPart: ''
    });
  };

  const hasActiveFilters = filters.search || filters.systemType !== 'all' || 
                           filters.categoryId || filters.ailmentId || filters.bodyPart;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {language === 'sv' ? 'Filtrera behandlingar' : 'Filter treatments'}
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <Filter className="w-4 h-4 mr-1" />
          {isExpanded ? (language === 'sv' ? 'Dölj' : 'Hide') : (language === 'sv' ? 'Visa filter' : 'Show filters')}
        </button>
      </div>

      {/* Basic search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={language === 'sv' ? 'Sök behandlingar...' : 'Search treatments...'}
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="space-y-4 border-t pt-4">
          {/* System Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'sv' ? 'Behandlingssystem' : 'Treatment system'}
            </label>
            <select
              value={filters.systemType}
              onChange={(e) => handleFilterChange('systemType', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {systemTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {language === 'sv' ? type.label_sv : type.label_en}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'sv' ? 'Kategori' : 'Category'}
            </label>
            <select
              value={filters.categoryId}
              onChange={(e) => handleFilterChange('categoryId', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">
                {language === 'sv' ? 'Alla kategorier' : 'All categories'}
              </option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {language === 'sv' ? category.name_sv : category.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Ailment Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'sv' ? 'Åkomma' : 'Ailment'}
            </label>
            <select
              value={filters.ailmentId}
              onChange={(e) => handleFilterChange('ailmentId', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">
                {language === 'sv' ? 'Alla åkommor' : 'All ailments'}
              </option>
              {ailments.map(ailment => (
                <option key={ailment.id} value={ailment.id}>
                  {language === 'sv' ? ailment.name_sv : ailment.name_en}
                </option>
              ))}
            </select>
          </div>

          {/* Body Part Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'sv' ? 'Kroppsdel' : 'Body part'}
            </label>
            <select
              value={filters.bodyPart}
              onChange={(e) => handleFilterChange('bodyPart', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {bodyParts.map(part => (
                <option key={part.value} value={part.value}>
                  {language === 'sv' ? part.label_sv : part.label_en}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center text-sm text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4 mr-1" />
              {language === 'sv' ? 'Rensa filter' : 'Clear filters'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}