import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl!, supabaseAnonKey!) : null

// Product types
export interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  image: string
  created_at?: string
  updated_at?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id?: number
  customer_name: string
  customer_email: string
  customer_phone?: string
  shipping_address: string
  shipping_city: string
  shipping_postal_code: string
  order_items: CartItem[]
  subtotal: number
  shipping_cost: number
  tax_amount: number
  total_amount: number
  payment_method?: string
  order_status?: string
  created_at?: string
}

// Database operations
import { mockProducts } from '@/data/mockProducts'

export async function getProducts(): Promise<Product[]> {
  // Fallback to mock data if Supabase env is not configured
  if (!supabase) {
    console.warn('Supabase is not configured. Using mock products.')
    return mockProducts
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Using mock products due to database error:', error)
      return mockProducts
    }
    
    // Return mock products if database is empty
    return data && data.length > 0 ? data : mockProducts
  } catch (error) {
    console.error('Error fetching products, using mock data:', error)
    return mockProducts
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!supabase) {
    console.warn('Supabase is not configured. getProductById will return null.')
    return null
  }
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function createOrder(order: Order): Promise<{ data?: Order; error?: Error }> {
  if (!supabase) {
    console.warn('Supabase is not configured. createOrder will be skipped.')
    return { error: new Error('Supabase not configured') }
  }
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single()

    if (error) throw error
    return { data }
  } catch (error) {
    console.error('Error creating order:', error)
    return { error: error instanceof Error ? error : new Error('Unknown error occurred') }
  }
}

export async function logUserActivity(activity: {
  type: string
  data?: Record<string, unknown>
  user_agent?: string
}) {
  if (!supabase) {
    // No-op if not configured
    return
  }
  try {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : ''
    
    await supabase.from('user_activity').insert([{
      activity_type: activity.type,
      activity_data: activity.data || {},
      user_agent: activity.user_agent || userAgent,
    }])
  } catch (error) {
    console.error('Error logging activity:', error)
  }
}