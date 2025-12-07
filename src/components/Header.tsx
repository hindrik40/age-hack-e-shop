'use client'

import { ShoppingCart, Search, User, Menu, X, ChevronDown, Sparkles, Leaf, Heart, LogIn, LogOut, Settings, Package } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useState, useEffect } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { getTotalItems } = useCartStore()
  const cartItemCount = getTotalItems()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, profile, loading, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    setMounted(true)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100' 
        : 'bg-white/90 backdrop-blur-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('hero.title')}
              </h1>
              <p className="text-xs text-gray-500 font-medium">{t('nav.wellness')}</p>
            </div>
          </Link>
          
          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            <Link href="/feedback" className="hidden md:inline-flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
              <span>Ge synpunkter</span>
            </Link>
            
            {/* User Account */}
            {loading ? (
              <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  aria-label={t('nav.account') || 'Account'}
                  className="p-1 rounded-full hover:ring-2 hover:ring-blue-200 transition-all"
                >
                  <img
                    src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || user.email?.split('@')[0] || 'User')}&background=6366f1&color=fff`}
                    alt="Profil"
                    className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    <Link href="/profile" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Min profil</span>
                    </Link>
                    <Link href="/dashboard" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Package className="w-4 h-4" />
                      <span>Översikt</span>
                    </Link>
                    <Link href="/wishlist" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>Önskelista</span>
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button 
                      onClick={() => {
                        signOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logga ut</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/auth/login"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Logga in</span>
              </Link>
            )}
            
            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-center py-4 border-t border-gray-100">
          <div className="flex space-x-8">
            {/* Home */}
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                {t('nav.home')}
              </span>
            </Link>

            {/* Products Mega Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                <span>{t('nav.products')}</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              
              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Leaf className="w-4 h-4 mr-2 text-green-500" />
                        Anti-Aging
                      </h3>
                      <div className="space-y-2">
                        <Link href="/products?category=Peptider" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Peptider</Link>
                        <Link href="/products?category=Retinoider" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Retinoider</Link>
                        <Link href="/products?category=Vitamin C" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Vitamin C</Link>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Heart className="w-4 h-4 mr-2 text-pink-500" />
                        Wellness
                      </h3>
                      <div className="space-y-2">
                        <Link href="/products?category=Ayurvediska" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Ayurvediska Produkter</Link>
                        <Link href="/products?category=Meditation" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Meditation</Link>
                        <Link href="/products?category=Hälsa" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Allmän Hälsa</Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="w-4 h-4 mr-2">☯️</span>
                        Kinesisk Medicin
                      </h3>
                      <div className="space-y-2">
                        <Link href="/products?category=Kinesisk%20Medicin" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Ginseng & Adaptogener</Link>
                        <Link href="/products?category=Kinesisk%20Medicin" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Medicinska Svampar</Link>
                        <Link href="/products?category=Kinesisk%20Medicin" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Örter & Bär</Link>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <span className="w-4 h-4 mr-2">🔬</span>
                        Hälsotester
                      </h3>
                      <div className="space-y-2">
                        <Link href="/products?category=Hälsotester" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">pH & Kväveoxid</Link>
                        <Link href="/products?category=Hälsotester" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Vitamin & Mineral Test</Link>
                        <Link href="/products?category=Hälsotester" className="block text-gray-600 hover:text-blue-600 text-sm transition-colors">Organfunktion</Link>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Link href="/products" className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                      Se alla produkter →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Wellness */}
            <Link href="/wellness" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                {t('nav.wellness')}
              </span>
            </Link>

            {/* Forum */}
            <Link href="/forum" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                {t('nav.forum')}
              </span>
            </Link>

            {/* Experts */}
            <Link href="/experts" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                {t('nav.experts')}
              </span>
            </Link>

            {/* Courses */}
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                Kurser
              </span>
            </Link>

            {/* Articles/Knowledge */}
            <Link href="/articles" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                Kunskap
              </span>
            </Link>

            {/* Treatments */}
            <Link href="/treatments" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                {t('nav.treatments')}
              </span>
            </Link>

            {/* About */}
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                {t('nav.about')}
              </span>
            </Link>

            {/* Scientific Studies */}
            <Link href="/studies" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                {t('nav.studies')}
              </span>
            </Link>

            {/* Blog */}
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                {t('nav.blog')}
              </span>
            </Link>

            {/* Revisionshantering */}
            <Link href="/revisions-dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                Revisionshantering
              </span>
            </Link>

            {/* Anti-Aging Space */}
            <Link href="/external/anti-aging-space" className="text-gray-700 hover:text-blue-600 font-medium transition-colors group">
              <span className="relative group-hover:after:content-[''] group-hover:after:absolute group-hover:after:-bottom-1 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-blue-600">
                Anti-Aging Space
              </span>
            </Link>
          </div>
        </nav>
      </div>

          {/* Mobile Menu - Modern Touch-Friendly */}
          {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-lg flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('nav.wellness')}
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-3 rounded-full hover:bg-gray-100 transition-all duration-200 touch-manipulation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-2 pb-32">
            <Link href="/" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Hem
            </Link>
            <Link href="/products" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Produkter
            </Link>
            <Link href="/products?category=Anti-aging" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Anti-Aging
            </Link>
            <Link href="/products?category=Ayurvediska" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Ayurvediska Produkter
            </Link>
            <Link href="/products?category=Kinesisk%20Medicin" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Kinesisk Medicin
            </Link>
            <Link href="/products?category=Hälsotester" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Hälsotester
            </Link>
            <Link href="/wellness" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Wellness Guide
            </Link>
            <Link href="/external/anti-aging-space" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Anti-Aging Space
            </Link>
            <Link href="/forum" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Expert Forum
            </Link>
            <Link href="/experts" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Experter
            </Link>
            <Link href="/courses" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Kurser
            </Link>
            <Link href="/articles" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Kunskap
            </Link>
            <Link href="/cart" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation flex items-center justify-between">
              <span>{t('mobile.cart')}</span>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{mounted ? cartItemCount : 0}</span>
            </Link>
            <Link href="/about" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Om Oss
            </Link>
            <Link href="/studies" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              {t('nav.studies')}
            </Link>
            <Link href="/blog" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              {t('nav.blog')}
            </Link>
            <Link href="/revisions-dashboard" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Revisionshantering
            </Link>
            <Link href="/feedback" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              Ge synpunkter
            </Link>
            <Link href="/complaints" className="block text-lg font-semibold hover:text-blue-600 transition-all duration-200 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 touch-manipulation">
              {t('nav.complaints')}
            </Link>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent">
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg active:scale-95 touch-manipulation">
              {t('mobile.startShopping')}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}