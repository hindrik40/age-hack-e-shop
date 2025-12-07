'use client'

import { useState, useEffect } from 'react'
import { Filter, X, ChevronDown, Search } from 'lucide-react'
import { ExpertSpecialization } from '@/lib/api/forum'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'

interface Category {
  id: string
  name: string
  name_sv: string
}

interface ExpertFilterProps {
  categories: Category[]
  specializations: ExpertSpecialization[]
  selectedCategory: string
  selectedSpecialization: string
  onCategoryChange: (category: string) => void
  onSpecializationChange: (specialization: string) => void
  onClearFilters?: () => void
}

export default function ExpertFilter({
  categories,
  specializations,
  selectedCategory,
  selectedSpecialization,
  onCategoryChange,
  onSpecializationChange,
  onClearFilters
}: ExpertFilterProps) {
  const { t, language } = useLanguage()
  const [showSpecializations, setShowSpecializations] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSpecializations, setFilteredSpecializations] = useState<ExpertSpecialization[]>([])

  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'all') {
      const categorySpecializations = specializations.filter(
        spec => spec.category === selectedCategory
      )
      setFilteredSpecializations(categorySpecializations)
      setShowSpecializations(true)
    } else {
      setFilteredSpecializations(specializations)
      setShowSpecializations(false)
      onSpecializationChange('')
    }
  }, [selectedCategory, specializations])

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const filtered = specializations.filter(spec => {
        const name = language === 'sv' ? spec.name_sv.toLowerCase() : spec.name.toLowerCase()
        const description = language === 'sv' 
          ? spec.description_sv.toLowerCase() 
          : spec.description.toLowerCase()
        return name.includes(term) || description.includes(term)
      })
      setFilteredSpecializations(filtered)
    } else if (selectedCategory && selectedCategory !== 'all') {
      const categorySpecializations = specializations.filter(
        spec => spec.category === selectedCategory
      )
      setFilteredSpecializations(categorySpecializations)
    } else {
      setFilteredSpecializations(specializations)
    }
  }, [searchTerm, specializations, selectedCategory, language])

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category)
    if (category === 'all') {
      onSpecializationChange('')
    }
  }

  const handleClearFilters = () => {
    onCategoryChange('all')
    onSpecializationChange('')
    setSearchTerm('')
    setShowSpecializations(false)
    onClearFilters?.()
  }

  const hasActiveFilters = selectedCategory !== 'all' || selectedSpecialization !== ''

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ayurveda':
        return 'from-green-500 to-emerald-500'
      case 'tcm':
        return 'from-red-500 to-orange-500'
      case 'antiaging':
        return 'from-purple-500 to-pink-500'
      default:
        return 'from-blue-500 to-cyan-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">
            {t('forum.filters')}
          </h3>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('forum.category')}
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${getCategoryColor(category.id)} text-white border-transparent shadow-md`
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {language === 'sv' ? category.name_sv : category.name}
                </span>
                {selectedCategory === category.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Specialization Filter */}
      {showSpecializations && filteredSpecializations.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              {t('forum.specialization')}
            </label>
            <button
              onClick={() => setShowSpecializations(!showSpecializations)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
                showSpecializations ? 'rotate-180' : ''
              }`} />
            </button>
          </div>

          {showSpecializations && (
            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={language === 'sv' ? 'Sök specialisering...' : 'Search specialization...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Specialization List */}
              <div className="max-h-48 overflow-y-auto space-y-2">
                {filteredSpecializations.map((spec) => {
                  const isSelected = selectedSpecialization === spec.id
                  const name = language === 'sv' ? spec.name_sv : spec.name
                  
                  return (
                    <button
                      key={spec.id}
                      onClick={() => onSpecializationChange(isSelected ? '' : spec.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {language === 'sv' ? spec.description_sv : spec.description}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {filteredSpecializations.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  {language === 'sv' ? 'Inga specialiseringar hittades' : 'No specializations found'}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            {language === 'sv' ? 'Aktiva filter' : 'Active filters'}
          </h4>
          <div className="space-y-1">
            {selectedCategory !== 'all' && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-700">
                  {language === 'sv' ? 'Kategori:' : 'Category:'} 
                  <span className="font-medium">
                    {language === 'sv' 
                      ? categories.find(c => c.id === selectedCategory)?.name_sv
                      : categories.find(c => c.id === selectedCategory)?.name
                    }
                  </span>
                </span>
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {selectedSpecialization && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-700">
                  {language === 'sv' ? 'Specialisering:' : 'Specialization:'} 
                  <span className="font-medium">
                    {language === 'sv' 
                      ? specializations.find(s => s.id === selectedSpecialization)?.name_sv
                      : specializations.find(s => s.id === selectedSpecialization)?.name
                    }
                  </span>
                </span>
                <button
                  onClick={() => onSpecializationChange('')}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-sm text-gray-500 pt-2 border-t border-gray-200">
        {language === 'sv' 
          ? `Visar ${filteredSpecializations.length} specialiseringar`
          : `Showing ${filteredSpecializations.length} specializations`
        }
      </div>
    </div>
  )
}