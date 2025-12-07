import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { EnhancedProduct } from '@/data/enhancedProducts'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from './authStore'

export interface CartItem extends EnhancedProduct {
  quantity: number
}

interface CartState {
  items: CartItem[]
  savedForLater: CartItem[]
  isLoading: boolean
  lastSynced: Date | null
  
  // Core cart operations
  addItem: (product: EnhancedProduct, quantity?: number) => Promise<void>
  removeItem: (productId: number) => Promise<void>
  updateQuantity: (productId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  
  // Save for later functionality
  saveForLater: (productId: number) => void
  moveToCart: (productId: number) => Promise<void>
  removeFromSaved: (productId: number) => void
  
  // Database operations
  syncCart: () => Promise<void>
  loadCartFromDB: () => Promise<void>
  saveCartToDB: () => Promise<void>
  
  // Calculations
  getTotalItems: () => number
  getTotalPrice: () => number
  getSubtotal: () => number
  getTaxAmount: () => number
  getShippingCost: () => number
  getSavedItemsCount: () => number
}

export const useCartStore = create<CartState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        items: [],
        savedForLater: [],
        isLoading: false,
        lastSynced: null,
        
        // Core cart operations
        addItem: async (product, quantity = 1) => {
          const items = get().items
          const existingItem = items.find(item => item.id === product.id)
          
          if (existingItem) {
            const newItems = items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
            set({ items: newItems })
          } else {
            set({ items: [...items, { ...product, quantity }] })
          }
          
          // Sync to database if user is logged in
          await get().saveCartToDB()
        },
        
        removeItem: async (productId) => {
          set({ items: get().items.filter(item => item.id !== productId) })
          await get().saveCartToDB()
        },
        
        updateQuantity: async (productId, quantity) => {
          if (quantity <= 0) {
            await get().removeItem(productId)
            return
          }
          
          set({
            items: get().items.map(item =>
              item.id === productId
                ? { ...item, quantity }
                : item
            )
          })
          
          await get().saveCartToDB()
        },
        
        clearCart: async () => {
          set({ items: [] })
          await get().saveCartToDB()
        },
        
        // Save for later functionality
        saveForLater: (productId) => {
          const item = get().items.find(item => item.id === productId)
          if (item) {
            set({
              items: get().items.filter(item => item.id !== productId),
              savedForLater: [...get().savedForLater, item]
            })
          }
        },
        
        moveToCart: async (productId) => {
          const item = get().savedForLater.find(item => item.id === productId)
          if (item) {
            set({
              savedForLater: get().savedForLater.filter(item => item.id !== productId),
              items: [...get().items, item]
            })
            await get().saveCartToDB()
          }
        },
        
        removeFromSaved: (productId) => {
          set({
            savedForLater: get().savedForLater.filter(item => item.id !== productId)
          })
        },
        
        // Sync cart with database
        syncCart: async () => {
          const { user } = useAuthStore.getState()
          if (!user) return

          set({ isLoading: true })
          try {
            // Load cart from database
            await get().loadCartFromDB()
            
            // Save current local cart to database
            await get().saveCartToDB()
            
            set({ lastSynced: new Date() })
          } catch (error) {
            console.error('Error syncing cart:', error)
          } finally {
            set({ isLoading: false })
          }
        },
        
        loadCartFromDB: async () => {
          const { user } = useAuthStore.getState()
          if (!user) return
          
          try {
            if (!supabase) {
              console.error('Supabase not initialized')
              return
            }
            
            const { data, error } = await supabase
              .from('cart_items')
              .select(`
                *,
                product:products(*)
              `)
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
            
            if (error) throw error
            
            if (data) {
              const cartItems = data.map(item => ({
                ...item.product,
                quantity: item.quantity,
                cart_item_id: item.id
              }))
              set({ items: cartItems })
            }
          } catch (error) {
            console.error('Error loading cart from database:', error)
          }
        },
        
        saveCartToDB: async () => {
          const { user } = useAuthStore.getState()
          if (!user) return
          
          try {
            if (!supabase) {
              console.error('Supabase not initialized')
              return
            }
            
            // Delete existing cart items
            await supabase
              .from('cart_items')
              .delete()
              .eq('user_id', user.id)
            
            // Insert new cart items
            if (get().items.length > 0) {
              const cartItems = get().items.map(item => ({
                user_id: user.id,
                product_id: item.id,
                quantity: item.quantity,
                created_at: new Date().toISOString()
              }))
              
              await supabase
                .from('cart_items')
                .insert(cartItems)
            }
            
            set({ lastSynced: new Date() })
          } catch (error) {
            console.error('Error saving cart to database:', error)
          }
        },
        
        // Calculations
        getTotalItems: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0)
        },
        
        getTotalPrice: () => {
          const subtotal = get().getSubtotal()
          const shipping = get().getShippingCost()
          const tax = get().getTaxAmount()
          return subtotal + shipping + tax
        },
        
        getSubtotal: () => {
          return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
        },
        
        getTaxAmount: () => {
          const subtotal = get().getSubtotal()
          return Math.round(subtotal * 0.25) // 25% moms
        },
        
        getShippingCost: () => {
          const subtotal = get().getSubtotal()
          return subtotal > 500 ? 0 : 99 // Fri frakt över 500 kr
        },
        
        getSavedItemsCount: () => {
          return get().savedForLater.length
        }
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({
          items: state.items,
          savedForLater: state.savedForLater
        })
      }
    )
  )
)