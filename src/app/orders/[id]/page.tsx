'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  Home, 
  ArrowLeft,
  Download,
  MapPin,
  Calendar,
  CreditCard,
  User,
  XCircle
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import OrderService, { Order } from '@/lib/orderService'

const statusSteps = [
  { key: 'pending', label: 'Order mottagen', icon: Clock },
  { key: 'confirmed', label: 'Order bekräftad', icon: CheckCircle },
  { key: 'processing', label: 'Bearbetas', icon: Package },
  { key: 'shipped', label: 'Skickad', icon: Truck },
  { key: 'delivered', label: 'Levererad', icon: Home }
]

const statusColors = {
  pending: 'text-yellow-600',
  confirmed: 'text-blue-600',
  processing: 'text-purple-600',
  shipped: 'text-indigo-600',
  delivered: 'text-green-600',
  cancelled: 'text-red-600',
  refunded: 'text-orange-600'
}

export default function OrderTrackingPage() {
  const params = useParams()
  const { user } = useAuthStore()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user && params?.id) {
      loadOrder()
    }
  }, [user, params?.id])

  const loadOrder = async () => {
    if (!user || !params?.id) return

    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await OrderService.getOrderById(params.id as string, user.id)
      
      if (error) {
        throw error
      }

      setOrder(data || null)
    } catch (error) {
      console.error('Error loading order:', error)
      setError('Kunde inte hämta orderinformation')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return `${amount} kr`
  }

  const getCurrentStepIndex = () => {
    if (!order) return -1
    
    const currentStatus = order.status
    const stepIndex = statusSteps.findIndex(step => step.key === currentStatus)
    return stepIndex
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Laddar orderinformation...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Ett fel uppstod</h2>
              <p className="text-red-600">{error || 'Kunde inte hitta ordern'}</p>
            </div>
            <Link
              href="/orders"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Tillbaka till orderhistorik
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/orders"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Tillbaka till orderhistorik
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order #{order.orderNumber}
              </h1>
              <p className="text-gray-600">
                Placerad {formatDate(order.createdAt)}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600">Status</p>
              <p className={`text-lg font-semibold ${statusColors[order.status as keyof typeof statusColors]}`}>
                {order.status === 'pending' && 'Väntar på bekräftelse'}
                {order.status === 'confirmed' && 'Bekräftad'}
                {order.status === 'processing' && 'Bearbetas'}
                {order.status === 'shipped' && 'Skickad'}
                {order.status === 'delivered' && 'Levererad'}
                {order.status === 'cancelled' && 'Avbruten'}
                {order.status === 'refunded' && 'Återbetalad'}
              </p>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Orderstatus</h2>
          
          <div className="relative">
            <div className="absolute left-0 right-0 top-6 h-1 bg-gray-200"></div>
            <div 
              className="absolute left-0 top-6 h-1 bg-blue-600 transition-all duration-500"
              style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
            ></div>
            
            <div className="relative flex justify-between">
              {statusSteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = index <= currentStepIndex
                const isCurrent = index === currentStepIndex
                
                return (
                  <div key={step.key} className="flex flex-col items-center">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-2 z-10 relative
                      ${isCompleted ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
                      ${isCurrent ? 'ring-4 ring-blue-200' : ''}
                    `}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`text-sm font-medium ${isCompleted ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Beställda produkter</h2>
              
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{item.productName}</h3>
                      <p className="text-sm text-gray-600">Antal: {item.quantity}</p>
                      <p className="text-sm text-gray-600">{formatCurrency(item.productPrice)} st</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item.subtotal)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frakt:</span>
                    <span>{order.shipping === 0 ? 'Fri' : formatCurrency(order.shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moms:</span>
                    <span>{formatCurrency(order.tax)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                    <span>Totalt:</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Leveransinformation
              </h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Mottagare</p>
                  <p className="font-medium">{order.shippingName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">E-post</p>
                  <p className="font-medium">{order.shippingEmail}</p>
                </div>
                
                {order.shippingPhone && (
                  <div>
                    <p className="text-sm text-gray-600">Telefon</p>
                    <p className="font-medium">{order.shippingPhone}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-600">Adress</p>
                  <p className="font-medium">
                    {order.shippingAddress?.street}<br />
                    {order.shippingAddress?.postalCode} {order.shippingAddress?.city}<br />
                    {order.shippingAddress?.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Betalningsinformation
              </h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Betalningsmetod</p>
                  <p className="font-medium capitalize">
                    {order.paymentMethod === 'card' && 'Kortbetalning'}
                    {order.paymentMethod === 'invoice' && 'Faktura'}
                    {order.paymentMethod === 'swish' && 'Swish'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Betalningsstatus</p>
                  <p className="font-medium">
                    {order.paymentStatus === 'pending' && 'Väntar på betalning'}
                    {order.paymentStatus === 'paid' && 'Betald'}
                    {order.paymentStatus === 'failed' && 'Misslyckad'}
                    {order.paymentStatus === 'refunded' && 'Återbetalad'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking Information */}
            {order.trackingNumber && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Spårningsinformation</h2>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Spårningsnummer</p>
                    <p className="font-mono font-medium">{order.trackingNumber}</p>
                  </div>
                  
                  {order.carrier && (
                    <div>
                      <p className="text-sm text-gray-600">Fraktbolag</p>
                      <p className="font-medium">{order.carrier}</p>
                    </div>
                  )}
                  
                  {order.shippedAt && (
                    <div>
                      <p className="text-sm text-gray-600">Skickad</p>
                      <p className="font-medium">{formatDate(order.shippedAt)}</p>
                    </div>
                  )}
                  
                  {order.deliveredAt && (
                    <div>
                      <p className="text-sm text-gray-600">Levererad</p>
                      <p className="font-medium">{formatDate(order.deliveredAt)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Åtgärder</h2>
              
              <div className="space-y-3">
                <Link
                  href={`/orders/${order.id}/invoice`}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Ladda ner faktura
                </Link>
                
                {order.status === 'delivered' && (
                  <Link
                    href={`/orders/${order.id}/return`}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Package className="h-4 w-4" />
                    Returnera varor
                  </Link>
                )}
                
                {['pending', 'confirmed', 'processing'].includes(order.status) && (
                  <button
                    onClick={async () => {
                      if (confirm('Är du säker på att du vill avbryta denna order?')) {
                        const { error } = await OrderService.updateOrderStatus(order.id, user!.id, 'cancelled')
                        if (!error) {
                          window.location.reload()
                        }
                      }
                    }}
                    className="w-full border border-red-300 text-red-700 py-2 px-4 rounded-md hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Avbryt order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}