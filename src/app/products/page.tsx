'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, ChevronDown, Star, ShoppingCart, Heart, Grid, List } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductSkeleton from '@/components/ProductSkeleton';
import { enhancedProducts, getProductsByCategory } from '@/data/enhancedProducts';
import type { Product } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';

const categories = [
  { id: 'all', name: 'Alla produkter', icon: '🌟' },
  { id: 'retinoids', name: 'Retinoider', icon: '🔬' },
  { id: 'peptides', name: 'Peptider', icon: '🔗' },
  { id: 'antioxidants', name: 'Antioxidanter', icon: '🛡️' },
  { id: 'hyaluronic', name: 'Hyaluronsyra', icon: '💧' },
  { id: 'niacinamide', name: 'Niacinamide', icon: '✨' },
  { id: 'aha', name: 'AHA-syror', icon: '🧪' },
  { id: 'growth-factors', name: 'Tillväxtfaktorer', icon: '🌱' },
  { id: 'dna-repair', name: 'DNA-reparation', icon: '🧬' },
  { id: 'collagen', name: 'Kollagen', icon: '💪' },
];

const skinTypes = ['Alla hudtyper', 'Torr', 'Fet', 'Kombinerad', 'Känslig', 'Mogen'];
const priceRanges = [
  { label: 'Alla priser', min: 0, max: Infinity },
  { label: 'Under 500 kr', min: 0, max: 500 },
  { label: '500-1000 kr', min: 500, max: 1000 },
  { label: '1000-2000 kr', min: 1000, max: 2000 },
  { label: 'Över 2000 kr', min: 2000, max: Infinity },
];

function ProductsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const [products, setProducts] = useState(enhancedProducts);
  const [filteredProducts, setFilteredProducts] = useState(enhancedProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkinType, setSelectedSkinType] = useState('Alla hudtyper');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  // Init from URL query: ?category=Peptider or ?category=peptides
  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    if (categoryParam) {
      // Try match by id first
      const byId = categories.find(c => c.id.toLowerCase() === categoryParam.toLowerCase());
      if (byId) {
        setSelectedCategory(byId.id);
      } else {
        // Fallback: match by display name
        const byName = categories.find(c => c.name.toLowerCase() === categoryParam.toLowerCase());
        if (byName) {
          setSelectedCategory(byName.id);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    let filtered = products;

    // Show loading state
    setLoading(true);

    // Kategorifilter
    if (selectedCategory !== 'all') {
      const categoryDisplayName = categories.find(c => c.id === selectedCategory)?.name;
      if (categoryDisplayName) {
        filtered = getProductsByCategory(categoryDisplayName);
      } else {
        filtered = getProductsByCategory(selectedCategory);
      }
    }

    // Sökfilter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Hudtypfilter
    if (selectedSkinType !== 'Alla hudtyper') {
      filtered = filtered.filter(product =>
        product.skinTypes.includes(selectedSkinType)
      );
    }

    // Prisfilter
    filtered = filtered.filter(product =>
      product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
    );

    // Sortering
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating ?? 0) - (a.rating ?? 0);
        default:
          return 0;
      }
    });

    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setFilteredProducts(filtered);
      setLoading(false);
    }, 300);
  }, [products, searchTerm, selectedCategory, selectedSkinType, selectedPriceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Sidhuvud */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 fluid-h1">
          {language === 'sv' ? '🧬 Komplett Anti-Aging Katalog' : '🧬 Complete Anti-Aging Catalog'}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto fluid-p">
          {language === 'sv' 
            ? 'Utforska vårt omfattande sortiment av vetenskapligt bevisade anti-aging produkter. Från retinoider till peptider - hitta de perfekta ingredienserna för din hudvårdsrutin.'
            : 'Explore our comprehensive selection of science-backed anti-aging products. From retinoids to peptides — find the perfect ingredients for your skincare routine.'}
        </p>
      </div>

      {/* Sök- och filterfält - Modern Mobile First */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Sökfält */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'sv' ? 'Sök efter produkter, ingredienser...' : 'Search products, ingredients...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg touch-manipulation"
            />
          </div>

          {/* Sortering */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-4 pr-12 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg touch-manipulation"
            >
              <option value="name">{language === 'sv' ? 'Sortera efter namn' : 'Sort by name'}</option>
              <option value="price-low">{language === 'sv' ? 'Pris: Lägst först' : 'Price: Lowest first'}</option>
              <option value="price-high">{language === 'sv' ? 'Pris: Högst först' : 'Price: Highest first'}</option>
              <option value="rating">{language === 'sv' ? 'Högst betyg' : 'Highest rating'}</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Vy-läge */}
          <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-4 transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100 touch-manipulation'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-4 transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100 touch-manipulation'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Filter-knapp */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center font-semibold hover:scale-105 active:scale-95 touch-manipulation"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>

        {/* Avancerade filter */}
        {showFilters && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Kategorier */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Kategori</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2 text-blue-medium focus:ring-blue-medium"
                      />
                      <span className="mr-2">{category.icon}</span>
                      <span className="text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hudtyper */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Hudtyp</h3>
                <div className="space-y-2">
                  {skinTypes.map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="skinType"
                        value={type}
                        checked={selectedSkinType === type}
                        onChange={(e) => setSelectedSkinType(e.target.value)}
                        className="mr-2 text-blue-medium focus:ring-blue-medium"
                      />
                      <span className="text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Prisintervall */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Prisintervall</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.label}
                        checked={selectedPriceRange.label === range.label}
                        onChange={() => setSelectedPriceRange(range)}
                        className="mr-2 text-blue-medium focus:ring-blue-medium"
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Kategori-navigering */}
      <div className="mb-8">
        <div className="flex overflow-x-auto pb-2 space-x-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-colors duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-medium text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resultat-info */}
      <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {language === 'sv' ? 'Visar' : 'Showing'} <span className="font-semibold">{filteredProducts.length}</span> {language === 'sv' ? 'produkter' : 'products'}
          </p>
        </div>

      {/* Produktlista - Modern Mobile First */}
      {loading ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-w-0' : 'space-y-6'}>
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-w-0' : 'space-y-6'}>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{language === 'sv' ? 'Inga produkter hittades' : 'No products found'}</h3>
              <p className="text-gray-600 text-lg mb-6">{language === 'sv' ? 'Försök justera dina filter eller sökterm' : 'Try adjusting your filters or search term'}</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedSkinType('Alla hudtyper');
                  setSelectedPriceRange(priceRanges[0]);
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
              >
                {language === 'sv' ? 'Rensa filter' : 'Clear filters'}
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const productCardData: Product = {
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
              };
              return (
                <div key={product.id}>
                  <ProductCard product={productCardData} />
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Anti-Aging Guide-sektion */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {language === 'sv' ? '🧪 Din Guide till Anti-Aging Ingredienser' : '🧪 Your Guide to Anti-Aging Ingredients'}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'sv' ? 'Förstå hur olika ingredienser arbetar för att bekämpa ålderstecken och ge dig en yngre, friskare hud.' : 'Understand how different ingredients work to address signs of aging and give you younger, healthier-looking skin.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/products?category=Retinoider" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🔬</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Retinoider</h3>
            <p className="text-gray-600 text-sm">
              Guldstandarden inom anti-aging. Stimulerar kollagenproduktion och cellförnyelse.
            </p>
          </Link>
          
          <Link href="/products?category=Hyaluronsyra" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">💧</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hyaluronsyra</h3>
            <p className="text-gray-600 text-sm">
              Binder fukt och ger omedelbar fyllighet. Perfekt för fina linjer och torr hud.
            </p>
          </Link>
          
          <Link href="/products?category=Vitamin%20C" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vitamin C</h3>
            <p className="text-gray-600 text-sm">
              Kraftfull antioxidant som skyddar mot miljöskador och jämnar ut hudtonen.
            </p>
          </Link>
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/education')}
            className="bg-autumn-red text-white px-8 py-3 rounded-lg hover:bg-autumn-orange transition-colors duration-300"
          >
            {language === 'sv' ? 'Läs mer om Anti-Aging Vetenskap →' : 'Learn more about Anti-Aging Science →'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-6">Laddar produkter...</div>}>
      <ProductsPageInner />
    </Suspense>
  );
}