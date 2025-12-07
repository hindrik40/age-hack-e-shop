import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  created_at: string;
}

export function useWishlist() {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist items
  const fetchWishlist = useCallback(async () => {
    if (!user || !supabase) {
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWishlistItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Kunde inte hämta önskelistan');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Add item to wishlist
  const addToWishlist = useCallback(async (product: {
    id: string;
    name: string;
    image: string;
    price: number;
  }) => {
    if (!user || !supabase) {
      toast.error('Du måste vara inloggad för att lägga till i önskelistan');
      return false;
    }

    // Check if item already exists
    const exists = wishlistItems.some(item => item.product_id === product.id);
    if (exists) {
      toast.info('Produkten finns redan i din önskelista');
      return false;
    }

    try {
      const { error } = await supabase
        .from('wishlist')
        .insert({
          user_id: user.id,
          product_id: product.id,
          product_name: product.name,
          product_image: product.image,
          product_price: product.price,
        });

      if (error) throw error;
      
      toast.success('Tillagd i önskelistan!');
      await fetchWishlist(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Kunde inte lägga till i önskelistan');
      return false;
    }
  }, [user, wishlistItems, fetchWishlist]);

  // Remove item from wishlist
  const removeFromWishlist = useCallback(async (wishlistItemId: string) => {
    if (!user || !supabase) {
      toast.error('Du måste vara inloggad');
      return false;
    }

    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('id', wishlistItemId)
        .eq('user_id', user.id); // Ensure user owns this item

      if (error) throw error;
      
      toast.success('Borttagen från önskelistan');
      await fetchWishlist(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Kunde inte ta bort från önskelistan');
      return false;
    }
  }, [user, fetchWishlist]);

  // Check if product is in wishlist
  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.some(item => item.product_id === productId);
  }, [wishlistItems]);

  // Toggle wishlist item (add if not exists, remove if exists)
  const toggleWishlist = useCallback(async (product: {
    id: string;
    name: string;
    image: string;
    price: number;
  }) => {
    if (isInWishlist(product.id)) {
      const item = wishlistItems.find(item => item.product_id === product.id);
      if (item) {
        return removeFromWishlist(item.id);
      }
    } else {
      return addToWishlist(product);
    }
  }, [isInWishlist, wishlistItems, addToWishlist, removeFromWishlist]);

  // Clear entire wishlist
  const clearWishlist = useCallback(async () => {
    if (!user || !supabase) {
      toast.error('Du måste vara inloggad');
      return false;
    }

    if (wishlistItems.length === 0) {
      toast.info('Din önskelista är redan tom');
      return true;
    }

    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast.success('Önskelistan tömd!');
      await fetchWishlist();
      return true;
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast.error('Kunde inte tömma önskelistan');
      return false;
    }
  }, [user, wishlistItems.length, fetchWishlist]);

  // Initialize wishlist on mount
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    refreshWishlist: fetchWishlist,
  };
}