'use client'

import { useState, useEffect } from 'react'
import { X, ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react'
import { Product } from '@/lib/supabase'
import { useCartStore } from '@/store/cartStore'
import type { EnhancedProduct } from '@/data/enhancedProducts'
import { toast } from 'sonner'

interface ProductQuickViewProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const { addItem } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !product) return null

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
    };
  };

  const handleAddToCart = () => {
    const enhancedProduct = convertToEnhancedProduct(product);
    for (let i = 0; i < quantity; i++) {
      addItem(enhancedProduct)
    }
    toast.success(`${product.name} har lagts till i varukorgen`, {
      description: `${quantity} ${quantity === 1 ? 'st' : 'st'} tillagd`,
      icon: '🛍️',
      duration: 3000,
    })
    onClose()
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(
      isWishlisted ? 'Produkt borttagen från favoriter' : 'Produkt tillagd i favoriter',
      {
        icon: isWishlisted ? '💔' : '❤️',
        duration: 2000,
      }
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-4xl w-full mx-auto shadow-2xl transform transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={product.image || `https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
                    `Premium ${product.name} supplement bottle, modern minimalist design, white background, professional product photography`
                  )}&image_size=square`}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Product Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.category === 'Anti-aging' && (
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full">
                    Premium
                  </span>
                )}
                {product.category === 'Ayurveda' && (
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full">
                    Ayurveda
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category and Name */}
              <div>
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-3">
                  {product.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price and Rating */}
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-gray-900">
                  {product.price} kr
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.8)</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Antal:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Lägg i varukorgen</span>
                </button>
                
                <button
                  onClick={toggleWishlist}
                  className={`w-full py-4 rounded-xl font-semibold border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isWishlisted
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Sparad i favoriter' : 'Spara som favorit'}</span>
                </button>
              </div>

              {/* Product Benefits */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Fördelar:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Högkvalitativa ingredienser</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Naturliga och rena produkter</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Snabb leverans i Sverige</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}