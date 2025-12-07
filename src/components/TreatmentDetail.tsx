'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTreatmentById, getTreatmentProducts, Treatment, Product } from '@/lib/treatments';
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';
import { Clock, DollarSign, Tag, ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { EnhancedProduct } from '@/data/enhancedProducts';

interface TreatmentDetailProps {
  treatmentId: string;
}

export default function TreatmentDetail({ treatmentId }: TreatmentDetailProps) {
  const { language } = useLanguage();
  const { addItem } = useCartStore();
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTreatmentData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [treatmentData, productsData] = await Promise.all([
        getTreatmentById(treatmentId),
        getTreatmentProducts(treatmentId)
      ]);

      setTreatment(treatmentData);
      setProducts(productsData);
    } catch (err) {
      setError(language === 'sv' ? 'Kunde inte ladda behandling' : 'Could not load treatment');
      console.error('Error loading treatment data:', err);
    } finally {
      setLoading(false);
    }
  }, [treatmentId, language]);

  useEffect(() => {
    loadTreatmentData();
  }, [loadTreatmentData]);

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

  // Helper function to convert Product to EnhancedProduct
  const convertToEnhancedProduct = (product: Product): EnhancedProduct => {
    return {
      id: parseInt(product.id) || 0,
      name: product.name,
      price: product.price,
      description: product.description || '',
      category: product.category || '',
      image: product.image_url || '',
      scientificName: product.name,
      molecularFormula: '',
      concentration: 'Standard',
      pHLevel: '7.0',
      molecularWeight: 'N/A',
      ingredients: [],
      benefits: [],
      usage: '',
      skinTypes: ['Normal'],
      timeToResults: '4-8 veckor',
      clinicalStudies: [],
      beforeAfter: {
        description: 'Förbättrad hudstruktur och lyster',
        timeline: '4-8 veckor',
        expectedResults: ['Förbättrad hudstruktur', 'Ökad lyster', 'Jämnare hudton']
      },
      relatedProducts: [],
      warnings: [],
      storage: 'Förvaras svalt och mörkt',
      shelfLife: '12 månader',
      manufacturer: 'Premium Skincare',
      certifications: [],
      images: [product.image_url || ''],
      rating: 4.8,
      reviews: 128
    };
  };

  const handleAddToCart = (product: Product) => {
    const enhancedProduct = convertToEnhancedProduct(product);
    addItem(enhancedProduct, product.recommended_quantity || 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !treatment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px]">
        <div className="text-red-600 text-lg mb-4">{error || 'Treatment not found'}</div>
        <Link
          href="/treatments"
          className="flex items-center text-green-600 hover:text-green-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'sv' ? 'Tillbaka till behandlingar' : 'Back to treatments'}
        </Link>
      </div>
    );
  }

  const name = language === 'sv' ? treatment.name_sv : treatment.name_en;
  const description = language === 'sv' ? treatment.description_sv : treatment.description_en;
  const benefits = language === 'sv' ? treatment.benefits_sv : treatment.benefits_en;
  const contraindications = language === 'sv' ? treatment.contraindications_sv : treatment.contraindications_en;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/treatments"
        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {language === 'sv' ? 'Tillbaka till behandlingar' : 'Back to treatments'}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Treatment Image */}
        <div className="relative">
          {treatment.image_url ? (
            <SafeImage
              src={treatment.image_url}
              alt={name}
              containerClassName="rounded-2xl shadow-lg w-full h-auto"
              className="rounded-2xl shadow-lg w-full h-auto"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center">
              <span className="text-gray-500 text-2xl font-medium">{name}</span>
            </div>
          )}
          
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSystemTypeColor(treatment.system_type)}`}>
              {getSystemTypeLabel(treatment.system_type)}
            </span>
          </div>
        </div>

        {/* Treatment Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{name}</h1>
            {treatment.category && (
              <div className="flex items-center text-gray-600 mb-4">
                <Tag className="w-4 h-4 mr-2" />
                <span>{language === 'sv' ? treatment.category.name_sv : treatment.category.name_en}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{treatment.duration_minutes} min</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              <span className="text-2xl font-bold text-green-600">{treatment.price} kr</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
          </div>

          {/* Benefits */}
          {benefits && benefits.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'sv' ? 'Fördelar' : 'Benefits'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contraindications */}
          {contraindications && contraindications.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                {language === 'sv' ? 'Kontraindikationer' : 'Contraindications'}
              </h3>
              <ul className="text-yellow-700 space-y-1">
                {contraindications.map((contra, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>{contra}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ailments */}
          {treatment.ailments && treatment.ailments.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'sv' ? 'Effektiv för' : 'Effective for'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {treatment.ailments.map((ailment, index) => (
                  <span key={index} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {language === 'sv' ? ailment.name_sv : ailment.name_en}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {products && products.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {language === 'sv' ? 'Rekommenderade produkter' : 'Recommended products'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {product.image_url && (
                  <SafeImage
                    src={product.image_url}
                    alt={product.name}
                    containerClassName="w-full h-48"
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">{product.price} kr</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      {language === 'sv' ? 'Köp' : 'Buy'}
                    </button>
                  </div>
                  {product.recommended_quantity && (
                    <p className="text-xs text-gray-500 mt-2">
                      {language === 'sv' 
                        ? `Rekommenderad mängd: ${product.recommended_quantity}`
                        : `Recommended quantity: ${product.recommended_quantity}`
                      }
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}