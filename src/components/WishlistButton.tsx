'use client';

import { useWishlist } from '@/hooks/useWishlist';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface WishlistButtonProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function WishlistButton({ 
  product, 
  className = '', 
  size = 'md',
  showLabel = false 
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist, loading } = useWishlist();
  const isInList = isInWishlist(product.id);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    
    await toggleWishlist(product);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        inline-flex items-center justify-center
        transition-all duration-200 ease-in-out
        rounded-full
        ${isInList 
          ? 'text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100' 
          : 'text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50'
        }
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
        ${className}
      `}
      title={isInList ? 'Ta bort från önskelistan' : 'Lägg till i önskelistan'}
    >
      <Heart 
        className={`${sizeClasses[size]} ${isInList ? 'fill-current' : ''}`} 
      />
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isInList ? 'I önskelistan' : 'Lägg till'}
        </span>
      )}
    </button>
  );
}