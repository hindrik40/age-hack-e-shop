'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Package, Clock, CheckCircle, Truck, XCircle, Eye, Download } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import OrderService, { Order } from '@/lib/orderService'

const statusIcons = {
  pending: <Clock className="h-5 w-5 text-yellow-500" />,
  confirmed: <CheckCircle className="h-5 w-5 text-blue-500" />,
  processing: <Package className="h-5 w-5 text-purple-500" />,
  shipped: <Truck className="h-5 w-5 text-indigo-500" />,
  delivered: <CheckCircle className="h-5 w-5 text-green-500" />,
  cancelled: <XCircle className="h-5 w-5 text-red-500" />,
  refunded: <XCircle className="h-5 w-5 text-orange-500" />
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-orange-100 text-orange-800'
}

const statusLabels = {
  pending: 'Väntar på bekräftelse',
  confirmed: 'Bekräftad',
  processing: 'Bearbetas',
  shipped: 'Skickad',
  delivered: 'Levererad',
  cancelled: 'Avbruten',
  refunded: 'Återbetalad'
}

export default function OrderHistoryPage() {
  const { user } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (user) {
      loadOrders()
    }
  }, [user])

  const loadOrders = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await OrderService.getUserOrders(user.id)
      
      if (error) {
        console.error('Error loading orders:', error)
        return
      }

      setOrders(data || [])
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return `${amount} kr`
  }

  const getOrderStatus = (order: Order) => {
    const latestStatus = order.statusHistory?.[0]
    return latestStatus?.status || order.status
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Orderhistorik</h1>
            <p className="text-gray-600 mb-8">Logga in för att se din orderhistorik</p>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              Logga in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Laddar orderhistorik...</p>
          </div>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Orderhistorik</h1>
            <p className="text-gray-600 mb-8">Du har inga beställningar ännu</p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Package className="h-5 w-5" />
              Börja handla
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orderhistorik</h1>
          <p className="text-gray-600">Spåra dina beställningar och se orderdetaljer</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => {
            const currentStatus = getOrderStatus(order)
            
            return (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {statusIcons[currentStatus as keyof typeof statusIcons]}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placerad {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[currentStatus as keyof typeof statusColors]}`}>
                        {statusLabels[currentStatus as keyof typeof statusLabels]}
                      </span>
                      
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        Visa detaljer
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Totalbelopp</p>
                        <p className="font-semibold">{formatCurrency(order.total)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Antal artiklar</p>
                        <p className="font-semibold">{order.items.reduce((sum, item) => sum + item.quantity, 0)} st</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Spårningsnummer</p>
                        <p className="font-semibold">
                          {order.trackingNumber || 'Ej tillgängligt'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <Package className="h-4 w-4" />
                          </div>
                          <span>{item.productName} ({item.quantity}st)</span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-sm text-gray-500">+{order.items.length - 3} till</span>
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/orders/${order.id}/invoice`}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                      >
                        <Download className="h-4 w-4" />
                        Ladda ner faktura
                      </Link>
                      
                      {order.trackingNumber && (
                        <Link
                          href={`/orders/${order.id}/tracking`}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                        >
                          <Truck className="h-4 w-4" />
                          Spåra paket
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}