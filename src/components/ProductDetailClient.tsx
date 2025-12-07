'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Info, Check, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { enhancedProducts, getProductById, getRelatedProducts } from '@/data/enhancedProducts';
import type { Product } from '@/lib/supabase';
import type { EnhancedProduct } from '@/data/enhancedProducts';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  
  const addToCart = useCartStore((state) => state.addItem);
  const wishlistItems = useWishlistStore((state) => state.items);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);

  const numericId = Number(productId);
  const product = getProductById(numericId);
  const images = product ? ((product.images && product.images.length > 0) ? product.images : [product.image]) : [];
  const relatedProducts = product ? getRelatedProducts(product.id) : [];

  useEffect(() => {
    if (!product) {
      toast.error(language === 'sv' ? 'Produkten kunde inte hittas' : 'Product could not be found');
      router.push('/products');
    }
  }, [product, router, language]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-medium mx-auto"></div>
        <p className="mt-4 text-gray-600">{language === 'sv' ? 'Laddar produkt...' : 'Loading product...'}</p>
      </div>
    );
  }

  const productObj: Product = {
    id: product.id.toString(),
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    image: images[0]
  };

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

  const isInWishlist = wishlistItems.some(item => item.id === productObj.id);

  const handleAddToCart = () => {
    const enhancedProduct = convertToEnhancedProduct(productObj);
    addToCart(enhancedProduct, quantity);
    toast.success(language === 'sv' ? `La till ${quantity}st ${product.name} i kundvagnen` : `Added ${quantity} ${product.name} to cart`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(productObj.id);
      toast.info(language === 'sv' ? 'Tog bort från favoriter' : 'Removed from wishlist');
    } else {
      addToWishlist(productObj);
      toast.success(language === 'sv' ? 'La till i favoriter' : 'Added to wishlist');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log(language === 'sv' ? 'Dela avbruten' : 'Share canceled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(language === 'sv' ? 'Länk kopierad till urklipp' : 'Link copied to clipboard');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <button onClick={() => router.push('/')} className="hover:text-blue-medium">
          {language === 'sv' ? 'Hem' : 'Home'}
        </button>
        <span>›</span>
        <button onClick={() => router.push('/products')} className="hover:text-blue-medium">
          {language === 'sv' ? 'Produkter' : 'Products'}
        </button>
        <span>›</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Produktbilder */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Bildnavigering */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          
          {/* Miniatyrbilder */}
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-blue-medium' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Produktinformation */}
        <div>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{product.category}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">{product.price} {language === 'sv' ? 'kr' : 'SEK'}</p>
              <p className="text-gray-600 text-sm">{language === 'sv' ? 'inkl. moms' : 'incl. VAT'}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              <Star className="w-5 h-5" />
              <span className="font-medium">{language === 'sv' ? 'Betyg' : 'Rating'}: {product.rating ?? 4.8} / 5</span>
              <span className="text-gray-600">({product.reviews ?? 128} {language === 'sv' ? 'recensioner' : 'reviews'})</span>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <p>{product.description}</p>
          </div>

          {/* Köpsektion */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 border rounded-l-md bg-white hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-t border-b"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 border rounded-r-md bg-white hover:bg-gray-50"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                <ShoppingCart className="w-5 h-5" />
                {language === 'sv' ? 'Lägg i kundvagn' : 'Add to cart'}
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`px-4 py-2 rounded-md border ${isInWishlist ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                aria-label={isInWishlist ? (language === 'sv' ? 'Ta bort från favoriter' : 'Remove from wishlist') : (language === 'sv' ? 'Lägg till i favoriter' : 'Add to wishlist')}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Info-sektion */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border">
              <Info className="w-5 h-5 text-blue-medium mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">{language === 'sv' ? 'Vetenskaplig fakta' : 'Scientific facts'}</h3>
              <p className="text-gray-700 text-sm">{language === 'sv' ? 'Formulerad med kliniskt dokumenterade ingredienser.' : 'Formulated with clinically documented ingredients.'}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <Check className="w-5 h-5 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">{language === 'sv' ? 'Dermatologiskt testad' : 'Dermatologically tested'}</h3>
              <p className="text-gray-700 text-sm">{language === 'sv' ? 'Säker för daglig användning.' : 'Safe for daily use.'}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">{language === 'sv' ? 'Varningar' : 'Warnings'}</h3>
              <p className="text-gray-700 text-sm">{language === 'sv' ? 'Följ användningsinstruktioner och undvik ögonkontakt.' : 'Follow usage instructions and avoid eye contact.'}</p>
            </div>
          </div>

          {/* Relaterade produkter */}
          {relatedProducts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{language === 'sv' ? 'Relaterade produkter' : 'Related products'}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((rp) => (
                  <div key={rp.id} className="bg-white rounded-lg shadow p-4">
                    <img src={rp.image} alt={rp.name} className="w-full h-40 object-cover rounded" />
                    <h3 className="font-semibold mt-3">{rp.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{rp.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-green-600 font-bold">{rp.price} kr</span>
                      <button
                        onClick={() => {
                          const rpObj: Product = {
                            id: rp.id.toString(),
                            name: rp.name,
                            price: rp.price,
                            description: rp.description,
                            category: rp.category,
                            image: rp.image
                          };
                          const enhancedRpObj = convertToEnhancedProduct(rpObj);
                          addToCart(enhancedRpObj, 1);
                          toast.success(language === 'sv' ? `La till ${rp.name} i kundvagnen` : `Added ${rp.name} to cart`);
                        }}
                        className="text-blue-medium hover:underline"
                      >
                        {language === 'sv' ? 'Köp' : 'Buy'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}