import { supabase } from '@/lib/supabase'

export interface CreateOrderData {
  userId: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  subtotal: number
  shipping: number
  tax: number
  total: number
  shippingInfo: {
    name: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      postalCode: string
      country: string
    }
  }
  paymentMethod: string
  notes?: string
}

export interface OrderStatus {
  id: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  previousStatus?: string
  createdAt: string
  notes?: string
}

export interface Order {
  id: string
  orderNumber: string
  status: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  currency: string
  shippingName: string
  shippingEmail: string
  shippingPhone?: string
  shippingAddress: any
  paymentMethod: string
  paymentStatus: string
  trackingNumber?: string
  carrier?: string
  shippedAt?: string
  deliveredAt?: string
  notes?: string
  metadata: any
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  statusHistory: OrderStatus[]
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productPrice: number
  quantity: number
  subtotal: number
  productSnapshot: any
}

export class OrderService {
  static async createOrder(orderData: CreateOrderData): Promise<{ data?: Order; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: orderData.userId,
          order_number: orderNumber,
          subtotal: orderData.subtotal,
          shipping: orderData.shipping,
          tax: orderData.tax,
          total: orderData.total,
          shipping_name: orderData.shippingInfo.name,
          shipping_email: orderData.shippingInfo.email,
          shipping_phone: orderData.shippingInfo.phone,
          shipping_address: orderData.shippingInfo.address,
          payment_method: orderData.paymentMethod,
          notes: orderData.notes
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        product_snapshot: {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image
        }
      }))

      const { error: itemsError } = await supabase!
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Clear user's cart after successful order creation
      const { error: cartError } = await supabase!
        .from('cart_items')
        .delete()
        .eq('user_id', orderData.userId)

      if (cartError) {
        console.warn('Failed to clear cart:', cartError)
      }

      return { data: order as Order }
    } catch (error) {
      console.error('Error creating order:', error)
      return { error }
    }
  }

  static async getUserOrders(userId: string): Promise<{ data?: Order[]; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*),
          order_status_history(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data: data as Order[] }
    } catch (error) {
      console.error('Error fetching user orders:', error)
      return { error }
    }
  }

  static async getOrderById(orderId: string, userId: string): Promise<{ data?: Order; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*),
          order_status_history(*)
        `)
        .eq('id', orderId)
        .eq('user_id', userId)
        .single()

      if (error) throw error

      return { data: data as Order }
    } catch (error) {
      console.error('Error fetching order:', error)
      return { error }
    }
  }

  static async updateOrderStatus(
    orderId: string, 
    userId: string, 
    status: string, 
    notes?: string
  ): Promise<{ data?: Order; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error

      return { data: data as Order }
    } catch (error) {
      console.error('Error updating order status:', error)
      return { error }
    }
  }

  static async updateOrderTracking(
    orderId: string,
    userId: string,
    trackingNumber: string,
    carrier: string
  ): Promise<{ data?: Order; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          tracking_number: trackingNumber,
          carrier,
          shipped_at: new Date().toISOString(),
          status: 'shipped',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error

      return { data: data as Order }
    } catch (error) {
      console.error('Error updating order tracking:', error)
      return { error }
    }
  }

  static async getOrdersByStatus(status: string): Promise<{ data?: Order[]; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*),
          order_status_history(*)
        `)
        .eq('status', status)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data: data as Order[] }
    } catch (error) {
      console.error('Error fetching orders by status:', error)
      return { error }
    }
  }

  static async getAbandonedCarts(): Promise<{ data?: any[]; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          cart:cart_id(*)
        `)
        .gte('created_at', twentyFourHoursAgo)
        .order('created_at', { ascending: false })

      if (error) throw error

      return { data }
    } catch (error) {
      console.error('Error fetching abandoned carts:', error)
      return { error }
    }
  }
}

export default OrderService