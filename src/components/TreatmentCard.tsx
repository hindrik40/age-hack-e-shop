'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Treatment } from '@/lib/treatments';
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';
import { Clock, DollarSign, Tag } from 'lucide-react';

interface TreatmentCardProps {
  treatment: Treatment;
  className?: string;
}

export default function TreatmentCard({ treatment, className = '' }: TreatmentCardProps) {
  const { language } = useLanguage();

  const name = language === 'sv' ? treatment.name_sv : treatment.name_en;
  const description = language === 'sv' ? treatment.description_sv : treatment.description_en;
  const benefitsSource: unknown = language === 'sv' ? treatment.benefits_sv : treatment.benefits_en;
  const benefits = Array.isArray(benefitsSource)
    ? (benefitsSource as string[])
    : typeof benefitsSource === 'string' && benefitsSource
      ? (benefitsSource as string).split(',').map(s => s.trim()).filter(Boolean)
      : [];

  const getSystemTypeColor = (systemType: string) => {
    switch (systemType) {
      case 'ayurveda': return 'bg-orange-100 text-orange-800';
      case 'tcm': return 'bg-red-100 text-red-800';
      case 'both': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSystemTypeLabel = (systemType: string) => {
    switch (systemType) {
      case 'ayurveda': return 'Ayurveda';
      case 'tcm': return 'TCM';
      case 'both': return language === 'sv' ? 'Båda systemen' : 'Both systems';
      default: return systemType;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="relative h-48 w-full">
        {treatment.image_url ? (
          <SafeImage
            src={treatment.image_url}
            alt={name}
            containerClassName="absolute inset-0"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <span className="text-gray-500 text-lg font-medium">{name}</span>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSystemTypeColor(treatment.system_type)}`}>
            {getSystemTypeLabel(treatment.system_type)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        
        {treatment.category && (
          <div className="flex items-center mb-2">
            <Tag className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">
              {language === 'sv' ? treatment.category.name_sv : treatment.category.name_en}
            </span>
          </div>
        )}
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {description}
        </p>
        
        {benefits && benefits.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              {language === 'sv' ? 'Fördelar:' : 'Benefits:'}
            </h4>
            <div className="flex flex-wrap gap-1">
              {benefits.slice(0, 3).map((benefit, index) => (
                <span key={index} className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {benefit}
                </span>
              ))}
              {benefits.length > 3 && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{benefits.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            {treatment.duration_minutes} min
          </div>
          <div className="flex items-center text-sm font-medium text-green-600">
            <DollarSign className="w-4 h-4 mr-1" />
            {treatment.price} kr
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link
            href={`/treatments/${treatment.id}`}
            className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
          >
            {language === 'sv' ? 'Läs mer' : 'Learn more'}
          </Link>
        </div>
      </div>
    </div>
  );
}