'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getExperts, Expert, ExpertSpecialization } from '@/lib/api/forum';
import { ExpertCard } from '@/components/forum/ExpertCard';
import { ExpertFilter } from '@/components/forum/ExpertFilter';
import { Users, Search, Filter, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ExpertsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [specializations, setSpecializations] = useState<ExpertSpecialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const loadData = async () => {
    try {
      setLoading(true);
      const expertsData = await getExperts();
      setExperts(expertsData);
      
      const allSpecializations = expertsData.flatMap(expert => expert.specializations || []);
      const uniqueSpecializations = Array.from(
        new Map(allSpecializations.map(spec => [spec.id, spec]))
      ).map(([, spec]) => spec);
      setSpecializations(uniqueSpecializations);
    } catch (error) {
      console.error('Error loading experts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExperts = experts.filter(expert => {
    if (selectedCategory !== 'all') {
      const hasCategorySpecialization = expert.specializations?.some(
        spec => spec.category === selectedCategory
      );
      if (!hasCategorySpecialization) return false;
    }

    if (selectedSpecialization !== 'all') {
      const hasSpecialization = expert.specializations?.some(
        spec => spec.id === selectedSpecialization
      );
      if (!hasSpecialization) return false;
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        expert.name.toLowerCase().includes(searchLower) ||
        expert.bio.toLowerCase().includes(searchLower) ||
        expert.specializations?.some(spec => 
          spec.name.toLowerCase().includes(searchLower) ||
          spec.name_sv.toLowerCase().includes(searchLower)
        );
      if (!matchesSearch) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Users className="h-10 w-10 text-primary" />
            {t('experts.title', 'Our Expert Panel')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('experts.subtitle', 'Meet our certified experts in Ayurveda, Traditional Chinese Medicine, and Anti-Aging therapies')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Filter className="h-5 w-5" />
                  {t('experts.filterTitle', 'Filter Experts')}
                </h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('experts.search', 'Search')}
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('experts.searchPlaceholder', 'Search experts...')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('experts.category', 'Category')}
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
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

                <div className="pt-4">
                  <p className="text-sm text-gray-600">
                    {filteredExperts.length} {t('experts.expertsFound', 'experts found')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredExperts.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-8 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {t('experts.noExperts', 'No experts found')}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {t('experts.adjustFiltersHint', 'Try adjusting your filters or search terms')}
                    </p>
                    <button 
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedSpecialization('all');
                        setSearchTerm('');
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      {t('experts.clearFilters', 'Clear Filters')}
                    </button>
                  </div>
                </div>
              ) : (
                filteredExperts.map(expert => (
                  <ExpertCard
                    key={expert.id}
                    expert={expert}
                    language={language}
                    onViewProfile={() => router.push(`/experts/${expert.id}`)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}