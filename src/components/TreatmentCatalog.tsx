'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTreatments, getTreatmentCategories, getAilments, Treatment, TreatmentCategory, Ailment } from '@/lib/treatments';
import TreatmentCard from '@/components/TreatmentCard';
import TreatmentFilter, { FilterState } from '@/components/TreatmentFilter';
import { Grid, List } from 'lucide-react';

interface TreatmentCatalogProps {
  className?: string;
}

export default function TreatmentCatalog({ className = '' }: TreatmentCatalogProps) {
  const { language } = useLanguage();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [categories, setCategories] = useState<TreatmentCategory[]>([]);
  const [ailments, setAilments] = useState<Ailment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    systemType: 'all',
    categoryId: '',
    ailmentId: '',
    bodyPart: ''
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [treatmentsRes, categoriesRes, ailmentsRes] = await Promise.allSettled([
        getTreatments(),
        getTreatmentCategories(),
        getAilments()
      ]);

      if (treatmentsRes.status === 'fulfilled') {
        setTreatments(treatmentsRes.value);
      } else {
        console.error('Error loading treatments:', treatmentsRes.reason);
        setTreatments([]);
        setError(language === 'sv' ? 'Kunde inte ladda behandlingar' : 'Could not load treatments');
      }

      if (categoriesRes.status === 'fulfilled') {
        setCategories(categoriesRes.value);
      } else {
        console.warn('Error loading categories:', categoriesRes.reason);
        setCategories([]);
      }

      if (ailmentsRes.status === 'fulfilled') {
        setAilments(ailmentsRes.value);
      } else {
        console.warn('Error loading ailments:', ailmentsRes.reason);
        setAilments([]);
      }
    } catch (err) {
      setError(language === 'sv' ? 'Kunde inte ladda behandlingar' : 'Could not load treatments');
      console.error('Error loading treatment data:', err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const filteredTreatments = treatments.filter(treatment => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = language === 'sv' 
        ? treatment.name_sv.toLowerCase().includes(searchLower)
        : treatment.name_en.toLowerCase().includes(searchLower);
      const descriptionMatch = language === 'sv'
        ? treatment.description_sv.toLowerCase().includes(searchLower)
        : treatment.description_en.toLowerCase().includes(searchLower);
      
      if (!nameMatch && !descriptionMatch) return false;
    }

    // System type filter
    if (filters.systemType !== 'all') {
      if (filters.systemType === 'ayurveda' && treatment.system_type !== 'ayurveda') return false;
      if (filters.systemType === 'tcm' && treatment.system_type !== 'tcm') return false;
      if (filters.systemType === 'both' && treatment.system_type !== 'both') return false;
    }

    // Category filter
    if (filters.categoryId && treatment.category_id !== filters.categoryId) return false;

    // Body part filter (simplified - you might want to enhance this)
    if (filters.bodyPart) {
      const description = language === 'sv' ? treatment.description_sv : treatment.description_en;
      const bodyPartLower = filters.bodyPart.toLowerCase();
      if (!description.toLowerCase().includes(bodyPartLower)) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-[400px] ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-[400px] ${className}`}>
        <div className="text-red-600 text-lg mb-4">{error}</div>
        <button
          onClick={loadData}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          {language === 'sv' ? 'Försök igen' : 'Try again'}
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'sv' ? 'Behandlingar' : 'Treatments'}
          </h1>
          <p className="text-gray-600">
            {language === 'sv' 
              ? `Visar ${filteredTreatments.length} av ${treatments.length} behandlingar`
              : `Showing ${filteredTreatments.length} of ${treatments.length} treatments`
            }
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-md p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' 
                ? 'bg-white shadow-sm text-green-600' 
                : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' 
                ? 'bg-white shadow-sm text-green-600' 
                : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <TreatmentFilter
            categories={categories}
            ailments={ailments}
            onFilterChange={handleFilterChange}
            className="sticky top-24"
          />
        </div>

        {/* Treatment Cards */}
        <div className="lg:col-span-3">
          {filteredTreatments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                {language === 'sv' ? 'Inga behandlingar hittades' : 'No treatments found'}
              </div>
              <div className="text-gray-400 text-sm">
                {language === 'sv' 
                  ? 'Försök ändra dina filter för att se fler resultat.'
                  : 'Try changing your filters to see more results.'
                }
              </div>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredTreatments.map(treatment => (
                <TreatmentCard
                  key={treatment.id}
                  treatment={treatment}
                  className={viewMode === 'list' ? 'flex' : ''}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}