'use client';

import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import ProductSkeleton from '@/components/ProductSkeleton'
import { getProducts } from '@/lib/supabase'
import { logUserActivity } from '@/lib/supabase'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import SafeImage from '@/components/SafeImage'

// Age-specific women data with different age groups
const ageGroups = [
  {
    id: 'young',
    age: 'young',
    image: '/images/young.svg',
    description: 'För den unga huden'
  },
  {
    id: 'middle',
    age: 'middle',
    image: '/images/middle.svg',
    description: 'För mogen hud'
  },
  {
    id: 'senior',
    age: 'senior',
    image: '/images/senior.svg',
    description: 'För den mogna huden'
  }
];

// Age-specific women and men data with real photos
const womenAgeGroups = [
  {
    id: 'young',
    age: 'young',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    description: 'För den unga huden'
  },
  {
    id: 'middle',
    age: 'middle',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    description: 'För mogen hud'
  },
  {
    id: 'senior',
    age: 'senior',
    image: 'https://source.unsplash.com/featured/800x1200?senior,woman,portrait',
    description: 'För den mogna huden'
  }
];

const menAgeGroups = [
  {
    id: 'young',
    age: 'young',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=80',
    description: 'För den unga huden'
  },
  {
    id: 'middle',
    age: 'middle',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=800&q=80',
    description: 'För mogen hud'
  },
  {
    id: 'senior',
    age: 'senior',
    image: 'https://source.unsplash.com/featured/800x1200?senior,man,portrait',
    description: 'För den mogna huden'
  }
];

async function getHomepageProducts() {
  const products = await getProducts()
  return products.slice(0, 8) // Show first 8 products on homepage
}

export default function Home() {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedAge, setSelectedAge] = useState('young');
  const [selectedGender, setSelectedGender] = useState<'women' | 'men'>('women');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const homepageProducts = await getHomepageProducts();
        setProducts(homepageProducts);
        
        // Log page view
        await logUserActivity({
          type: 'page_view',
          data: { page: 'home', message: 'User visited homepage' }
        });
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProducts();
  }, []);

  const currentGroups = selectedGender === 'women' ? womenAgeGroups : menAgeGroups;
  const currentAgeGroup = currentGroups.find(group => group.id === selectedAge) || currentGroups[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Premium Brand Style with Age Selection */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-float delay-500"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in-up">
            <span className="inline-block px-8 py-3 bg-blue-600/10 backdrop-blur-sm rounded-full text-sm font-semibold tracking-wider uppercase mb-6 border border-blue-200/50 text-blue-600">
              Premium Wellness & Beauty
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none animate-fade-in-up animate-delay-200" style={{fontFamily: 'Playfair Display, serif'}}>
            <span className="block text-gray-900 drop-shadow-sm">
              {t('hero.title')}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto font-light leading-relaxed text-gray-700 animate-fade-in-up animate-delay-300">
            {t('hero.subtitle')}
          </p>
          
          {/* Age Selection */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 animate-fade-in-up animate-delay-350">
            <button
              onClick={() => setSelectedGender('women')}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${selectedGender === 'women' ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-pink-50 shadow-md'}`}
            >
            -              Kvinnor
            +              {t('gender.women')}
            </button>
            <button
              onClick={() => setSelectedGender('men')}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${selectedGender === 'men' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md'}`}
            >
            -              Män
            +              {t('gender.men')}
            </button>
          </div>
          
          {/* Age Selection Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animate-delay-400">
            {currentGroups.map((group) => (
              <button
                key={`age-${selectedGender}-${group.id}`}
                onClick={() => setSelectedAge(group.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedAge === group.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md hover:scale-105'
                }`}
              >
                {t(`age.${group.age}`)}
              </button>
            ))}
          </div>
          
          {/* Age-specific woman image - Mobile responsive */}
          <div className="group relative max-w-xs sm:max-w-sm md:max-w-md mx-auto h-[28rem] sm:h-[30rem] md:h-[32rem] rounded-3xl overflow-hidden shadow-2xl animate-scale-in animate-delay-500 hover-lift mb-12">
            <SafeImage
              containerClassName="absolute inset-0"
              key={`hero-${selectedGender}-${currentAgeGroup.id}`}
              src={currentAgeGroup.image}
              alt={`${selectedGender === 'women' ? 'Kvinna' : 'Man'} ${t(`age.${currentAgeGroup.age}`)}`}
              className="w-full h-full object-[50%_15%] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="eager"
              fallbackSrc={selectedGender === 'women' ? (currentAgeGroup.id === 'senior' ? 'https://source.unsplash.com/featured/800x1200?senior,woman,portrait' : '/images/unavailable.svg') : (currentAgeGroup.id === 'senior' ? 'https://source.unsplash.com/featured/800x1200?senior,man,portrait' : '/images/unavailable.svg')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <p className="text-white text-sm sm:text-base md:text-lg font-semibold bg-black/30 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2">
                {currentAgeGroup.description}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 animate-fade-in-up animate-delay-500">
            {currentGroups.map((group) => (
              <div key={`agecard-${selectedGender}-${group.id}`} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <SafeImage
                  src={group.image}
                  alt={`${selectedGender === 'women' ? t('gender.woman') : t('gender.man')} ${t(`age.${group.age}`)}`}
                  className="w-full h-full object-[50%_15%] object-cover"
                  loading="eager"
                  fallbackSrc={selectedGender === 'women' ? (group.id === 'senior' ? 'https://source.unsplash.com/featured/800x1200?senior,woman,portrait' : '/images/unavailable.svg') : (group.id === 'senior' ? 'https://source.unsplash.com/featured/800x1200?senior,man,portrait' : '/images/unavailable.svg')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-semibold bg-black/30 backdrop-blur-sm rounded-md px-3 py-1">
                    {selectedGender === 'women' ? t('gender.woman') : t('gender.man')} – {t(`age.${group.age}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animate-delay-600">
            <Link
              href="/products"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-3 hover-lift"
            >
              <span>{t('hero.cta.primary')}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link
              href="/about"
              className="group bg-white border-2 border-blue-200 text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 hover-lift"
            >
              <span>{t('hero.cta.secondary')}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products - Modern Grid */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              Premium Collection
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 break-words leading-tight fluid-h1">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed break-words fluid-p">
              Explore our carefully curated selection of quality products for inner and outer beauty
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-w-0">
              {products.map((product, index) => (
                <div key={product.id} className="group relative" style={{ '--delay': `${index * 100}ms` } as CSSProperties}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  <ProductCard key={product.id} product={product} />
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-16">
            <Link 
              href="/products"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-blue-600/50"
            >
              <span>View All Products</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain similar but with translation support */}
      {/* Features Section - Modern Cards */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 break-words leading-tight fluid-h1">
              Your Wellness Partner
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed break-words fluid-p">
              We combine modern science with traditional wisdom for optimal health and beauty
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover-lift touch-manipulation animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="absolute -top-2 -left-2 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 mt-4 break-words">Quality Products</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">We offer only carefully selected products of the highest quality, tested and certified for optimal effectiveness.</p>
              <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Read more</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover-lift touch-manipulation animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="absolute -top-2 -left-2 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/25 transition-all duration-500 hover:scale-110">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 mt-4 break-words">Fast Delivery</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">Get your products delivered quickly and safely to your door with trackable shipping and insurance.</p>
              <div className="mt-6 flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Track your order</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover-lift touch-manipulation animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="absolute -top-2 -left-2 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-500 hover:scale-110">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 mt-4 break-words">Customer Support</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">Our expertise in wellness and beauty is here to help you with all your questions and needs.</p>
              <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Contact us</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue with other sections... */}
    </div>
  )
}