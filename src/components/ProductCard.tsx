'use client'
import Link from 'next/link'
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react'
import { Product } from '@/lib/supabase'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'
import { toast } from 'sonner'
import ProductQuickView from './ProductQuickView'
import { useLanguage } from '@/contexts/LanguageContext'
import { EnhancedProduct } from '@/data/enhancedProducts'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  // Helper function to convert Product to EnhancedProduct
  const convertToEnhancedProduct = (product: Product): EnhancedProduct => {
    return {
      id: parseInt(product.id) || 0,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
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
      images: [product.image],
      rating: 4.8,
      reviews: 128
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const enhancedProduct = convertToEnhancedProduct(product)
    addItem(enhancedProduct)
    toast.success(`${product.name} har lagts till i varukorgen`, {
      description: 'Fortsätt handla eller gå till kassan',
      icon: '🛍️',
      duration: 3000,
    })
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Borttagen från favoriter' : 'Tillagd i favoriter', {
      duration: 2000,
      className: 'bg-gray-800 text-white',
    })
  }

  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'anti-aging':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      case 'ayurvediska':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
      case 'wellness':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
      case 'peptider':
        return 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    }
  }

  return (
    <>
      <ProductQuickView 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
      <div 
        className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200 hover-lift touch-manipulation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Product Image Container */}
        <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 animate-scale-in"
          />
          
          {/* Quick View Button */}
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 touch-manipulation"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95 touch-manipulation animate-fade-in-up"
          >
            Lägg i varukorg
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getBadgeColor(product.category)}`}>
              {product.category}
            </span>
            {product.category === 'Anti-aging' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                ✨ Premium
              </span>
            )}
          </div>
          
          <button
            onClick={toggleWishlist}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isWishlisted 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Rating */}
        <div className="hidden sm:flex absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-gray-900">4.8</span>
        </div>
        
        {/* Product Info */}
        <div className="p-6">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                {product.price} kr
              </span>
              <span className="text-xs text-gray-500">Inkl. moms</span>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              <ShoppingCart className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Köp</span>
            </button>
          </div>

          {/* Purchase Counter */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600 font-medium">
                🔥 {Math.floor(Math.random() * 50) + 10} {t('products.purchased')}
              </span>
              <span className="text-xs text-blue-500">
                {Math.floor(Math.random() * 20) + 5} {t('products.purchaseCount')}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>✨ Anti-Aging</span>
            <span>🌿 Naturlig</span>
            <span>🇪🇺 EU Certifierad</span>
          </div>
        </div>

        {/* Hover Animation Elements */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </>
  )
}
