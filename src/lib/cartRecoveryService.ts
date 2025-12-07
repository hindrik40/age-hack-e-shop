import { supabase } from '@/lib/supabase'

export interface AbandonedCart {
  id: string
  userId: string
  userEmail: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }>
  totalValue: number
  abandonedAt: string
  lastUpdated: string
}

export interface CartRecoveryEmail {
  id: string
  userId: string
  emailType: 'first' | 'reminder' | 'final'
  sentAt: string
  opened: boolean
  clicked: boolean
}

export class CartRecoveryService {
  static async getAbandonedCarts(hoursAgo: number = 24): Promise<{ data?: AbandonedCart[]; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      const cutoffTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString()
      
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          users(id, email, created_at),
          products(id, name, price, image)
        `)
        .lt('updated_at', cutoffTime)
        .order('updated_at', { ascending: false })

      if (error) throw error

      // Group by user and calculate totals
      const abandonedCarts: AbandonedCart[] = []
      const userCarts = new Map()

      data?.forEach((item: any) => {
        const userId = item.user_id
        if (!userCarts.has(userId)) {
          userCarts.set(userId, {
            id: `${userId}-${Date.now()}`,
            userId,
            userEmail: item.users?.email || '',
            items: [],
            totalValue: 0,
            abandonedAt: item.updated_at,
            lastUpdated: item.updated_at
          })
        }

        const cart = userCarts.get(userId)
        cart.items.push({
          id: item.product_id,
          name: item.products?.name || 'Unknown Product',
          price: item.products?.price || 0,
          quantity: item.quantity,
          image: item.products?.image || ''
        })
        cart.totalValue += (item.products?.price || 0) * item.quantity
      })

      return { data: Array.from(userCarts.values()) }
    } catch (error) {
      console.error('Error fetching abandoned carts:', error)
      return { error }
    }
  }

  static async sendRecoveryEmail(userId: string, emailType: 'first' | 'reminder' | 'final'): Promise<{ data?: any; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      // Check if email was already sent recently
      const { data: existingEmails } = await supabase
        .from('cart_recovery_emails')
        .select('*')
        .eq('user_id', userId)
        .eq('email_type', emailType)
        .gte('sent_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

      if (existingEmails && existingEmails.length > 0) {
        return { error: 'Email already sent recently' }
      }

      // Get user's cart items
      const { data: cartItems } = await supabase!
        .from('cart_items')
        .select(`
          *,
          products(id, name, price, image, description)
        `)
        .eq('user_id', userId)

      if (!cartItems || cartItems.length === 0) {
        return { error: 'No items in cart' }
      }

      // Calculate total
      const total = cartItems.reduce((sum, item) => {
        return sum + (item.products?.price || 0) * item.quantity
      }, 0)

      // Create email content based on type
      const emailContent = this.generateEmailContent(cartItems, total, emailType)

      // Log the email (in a real implementation, you'd integrate with an email service)
      const { data, error } = await supabase!
        .from('cart_recovery_emails')
        .insert({
          user_id: userId,
          email_type: emailType,
          sent_at: new Date().toISOString(),
          opened: false,
          clicked: false
        })

      if (error) throw error

      console.log(`Recovery email sent to user ${userId}:`, emailContent)

      return { data }
    } catch (error) {
      console.error('Error sending recovery email:', error)
      return { error }
    }
  }

  private static generateEmailContent(cartItems: any[], total: number, emailType: 'first' | 'reminder' | 'final'): string {
    const itemsList = cartItems.map(item => ({
      name: item.products?.name || 'Unknown Product',
      price: item.products?.price || 0,
      quantity: item.quantity,
      image: item.products?.image || ''
    }))

    const subjectLines = {
      first: 'Glöm inte dina produkter!',
      reminder: 'Dina produkter väntar fortfarande på dig',
      final: 'Sista chansen - dina produkter väntar'
    }

    const callToActions = {
      first: 'Gå till kassan nu',
      reminder: 'Komplettera ditt köp',
      final: 'Handla nu innan det är för sent'
    }

    return `
      Subject: ${subjectLines[emailType]}
      
      Hej!
      
      Vi noterade att du har lagt produkter i din varukorg men inte slutfört ditt köp.
      
      Dina produkter:
      ${itemsList.map(item => `- ${item.name} (${item.quantity}st) - ${item.price} kr`).join('\n')}
      
      Totalbelopp: ${total} kr
      
      ${callToActions[emailType]}: [Complete Purchase Link]
      
      Med vänliga hälsningar,
      Ditt Anti-Aging Team
    `
  }

  static async scheduleRecoveryEmails(): Promise<void> {
    try {
      // Get abandoned carts from different time periods
      const timeframes = [
        { hours: 1, emailType: 'first' as const },
        { hours: 24, emailType: 'reminder' as const },
        { hours: 72, emailType: 'final' as const }
      ]

      for (const timeframe of timeframes) {
        const { data: abandonedCarts } = await this.getAbandonedCarts(timeframe.hours)
        
        if (abandonedCarts) {
          for (const cart of abandonedCarts) {
            await this.sendRecoveryEmail(cart.userId, timeframe.emailType)
            
            // Add delay to avoid overwhelming the email service
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }
      }
    } catch (error) {
      console.error('Error scheduling recovery emails:', error)
    }
  }

  static async trackEmailInteraction(emailId: string, interactionType: 'open' | 'click'): Promise<{ data?: any; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      const updateData = interactionType === 'open' 
        ? { opened: true }
        : { clicked: true }

      const { data, error } = await supabase
        .from('cart_recovery_emails')
        .update(updateData)
        .eq('id', emailId)

      if (error) throw error

      return { data }
    } catch (error) {
      console.error('Error tracking email interaction:', error)
      return { error }
    }
  }

  static async getRecoveryStats(): Promise<{ data?: any; error?: any }> {
    try {
      if (!supabase) {
        return { error: 'Supabase not initialized' }
      }
      
      const { data, error } = await supabase
        .from('cart_recovery_emails')
        .select('*')

      if (error) throw error

      const stats = {
        totalEmails: data.length,
        openedEmails: data.filter((email: any) => email.opened).length,
        clickedEmails: data.filter((email: any) => email.clicked).length,
        recoveryRate: data.length > 0 ? (data.filter((email: any) => email.clicked).length / data.length) * 100 : 0
      }

      return { data: stats }
    } catch (error) {
      console.error('Error getting recovery stats:', error)
      return { error }
    }
  }
}

export default CartRecoveryService