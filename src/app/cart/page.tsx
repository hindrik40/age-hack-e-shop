'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ArrowLeft, Heart, Clock, RefreshCw } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useEffect } from 'react'

export default function CartPage() {
  const router = useRouter()
  const { 
    items, 
    savedForLater, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    saveForLater, 
    moveToCart, 
    removeFromSaved,
    syncCart,
    getSubtotal, 
    getTaxAmount, 
    getShippingCost, 
    getTotalPrice,
    getSavedItemsCount
  } = useCartStore()

  const subtotal = getSubtotal()
  const shipping = getShippingCost()
  const tax = getTaxAmount()
  const total = getTotalPrice()

  const handleCheckout = () => {
    router.push('/checkout')
  }

  // Sync cart when component mounts
  useEffect(() => {
    syncCart()
  }, [])

  if (items.length === 0 && getSavedItemsCount() === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Din varukorg är tom</h1>
            <p className="text-gray-600 mb-8">Lägg till några produkter för att fortsätta handla.</p>
            <Link 
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Fortsätt handla
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/products"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Fortsätt handla
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Din varukorg</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Produkter ({items.length})</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Töm varukorg
                </button>
              </div>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0">
                    <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.category}</p>
                      <p className="text-blue-600 font-semibold">{item.price} kr</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">{item.price * item.quantity} kr</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => saveForLater(item.id)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          title="Spara för senare"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Ta bort"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Sammanställning</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{subtotal} kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Frakt:</span>
                  <span>{shipping === 0 ? 'Fri' : `${shipping} kr`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Moms (25%):</span>
                  <span>{tax} kr</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Totalt:</span>
                    <span>{total} kr</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Gå till kassan
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                {shipping > 0 && 'Fri frakt på beställningar över 500 kr'}
              </p>
            </div>
          </div>
        </div>

        {/* Saved for Later Section */}
        {savedForLater.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold">Sparade för senare ({savedForLater.length})</h2>
              </div>
              
              <div className="space-y-4">
                {savedForLater.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.category}</p>
                      <p className="text-blue-600 font-semibold">{item.price} kr</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveToCart(item.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Flytta till varukorg
                      </button>
                      <button
                        onClick={() => removeFromSaved(item.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Ta bort"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
