import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'

// Initialize cart synchronization on client side
export function initializeCartSync() {
  if (typeof window === 'undefined') return

  // Subscribe to cart changes to auto-save to database
  useCartStore.subscribe(
    (state) => state.items,
    async (items) => {
      const { user } = useAuthStore.getState()
      if (user) {
        // Auto-save to database when cart changes and user is logged in
        const store = useCartStore.getState()
        await store.saveCartToDB()
      }
    }
  )

  // Subscribe to auth changes
  let previousUser = useAuthStore.getState().user
  useAuthStore.subscribe(async (state) => {
    const user = state.user
    const store = useCartStore.getState()
    
    if (user && !previousUser) {
      // User just logged in - sync cart from database
      await store.loadCartFromDB()
    } else if (!user && previousUser) {
      // User just logged out - clear cart (but keep saved items)
      store.clearCart()
    }
    
    previousUser = user
  })
}