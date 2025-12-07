'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Package, Clock, CheckCircle, XCircle, Eye, Star, Heart, User, ShoppingBag, CreditCard, MapPin, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  items: OrderItem[];
  shipping_address: {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
  };
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface WishlistItem {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  image: string;
  added_at: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    order_number: 'ORD-2024-001',
    total_amount: 1299,
    status: 'delivered',
    created_at: '2024-01-15T10:30:00Z',
    items: [
      {
        id: '1',
        product_name: 'Retinol Komplex 1.0%',
        quantity: 1,
        price: 899,
        image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Premium%20anti-aging%20skincare%20serum%20bottle%20with%20dropper%20on%20white%20background%20professional%20lighting%20clean%20minimalist%20design&image_size=square'
      },
      {
        id: '2',
        product_name: 'Matrixyl 3000 Komplex',
        quantity: 1,
        price: 400,
        image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Anti-aging%20peptide%20serum%20bottle%20elegant%20packaging%20white%20background%20professional%20photography&image_size=square'
      }
    ],
    shipping_address: {
      first_name: 'Anna',
      last_name: 'Andersson',
      address: 'Storgatan 12',
      city: 'Stockholm',
      postal_code: '114 51',
      country: 'Sverige'
    }
  },
  {
    id: '2',
    order_number: 'ORD-2024-002',
    total_amount: 699,
    status: 'shipped',
    created_at: '2024-01-20T14:15:00Z',
    items: [
      {
        id: '3',
        product_name: 'Vitamin C Serum 20%',
        quantity: 1,
        price: 699,
        image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Vitamin%20C%20serum%20bottle%20with%20dropper%20bright%20packaging%20white%20background%20professional%20lighting&image_size=square'
      }
    ],
    shipping_address: {
      first_name: 'Anna',
      last_name: 'Andersson',
      address: 'Storgatan 12',
      city: 'Stockholm',
      postal_code: '114 51',
      country: 'Sverige'
    }
  }
];

const mockWishlist: WishlistItem[] = [
  {
    id: '1',
    product_id: '3',
    product_name: 'Hyaluronsyra Serum 2%',
    price: 599,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Hyaluronic%20acid%20serum%20bottle%20minimalist%20design%20white%20background%20professional%20photography%20clean%20aesthetic&image_size=square',
    added_at: '2024-01-18T09:00:00Z'
  },
  {
    id: '2',
    product_id: '4',
    product_name: 'Niacinamide Serum 5%',
    price: 449,
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Niacinamide%20serum%20bottle%20modern%20packaging%20white%20background%20professional%20lighting%20skincare%20product&image_size=square',
    added_at: '2024-01-22T16:30:00Z'
  }
];

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'settings'>('overview');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(mockWishlist);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Levererad';
      case 'shipped': return 'Skickad';
      case 'processing': return 'Bearbetas';
      case 'pending': return 'Väntar';
      case 'cancelled': return 'Avbruten';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Obehörig åtkomst</h2>
          <p className="text-gray-600 mb-6">Du måste vara inloggad för att se denna sida.</p>
          <a
            href="/auth/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Logga in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Välkommen tillbaka, {profile?.full_name || user.email?.split('@')[0] || 'Användare'}!
          </h1>
          <p className="text-gray-600">
            Hantera dina beställningar, önskelista och kontoinställningar
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex space-x-0">
            {[
              { key: 'overview', label: 'Översikt', icon: User },
              { key: 'orders', label: 'Beställningar', icon: Package },
              { key: 'wishlist', label: 'Önskelista', icon: Heart },
              { key: 'settings', label: 'Inställningar', icon: Settings },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-4 text-sm font-medium transition-colors ${
                  activeTab === key
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stats Cards */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Totala beställningar</p>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Levererade</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.filter(o => o.status === 'delivered').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Önskelista</p>
                    <p className="text-2xl font-bold text-gray-900">{wishlist.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <CreditCard className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total spenderat</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.reduce((sum, order) => sum + order.total_amount, 0)} kr
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="md:col-span-2 lg:col-span-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Senaste beställningar</h3>
                  </div>
                  <div className="p-6">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            <Package className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{order.order_number}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.created_at).toLocaleDateString('sv-SE')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{order.total_amount} kr</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.order_number}</h3>
                        <p className="text-sm text-gray-500">
                          Placerad {new Date(order.created_at).toLocaleDateString('sv-SE')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{order.total_amount} kr</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.product_name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.product_name}</h4>
                            <p className="text-sm text-gray-500">Antal: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-900">{item.price} kr</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Leveransadress:</span>
                        <span>
                          {order.shipping_address.first_name} {order.shipping_address.last_name}
                          <br />
                          {order.shipping_address.address}
                          <br />
                          {order.shipping_address.postal_code} {order.shipping_address.city}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.product_name}</h3>
                    <p className="text-lg font-bold text-blue-600 mb-4">{item.price} kr</p>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Lägg i varukorg
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Kontoinställningar</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Personlig information</h4>
                  <p className="text-sm text-gray-500 mb-4">Uppdatera din profilinformation</p>
                  <a
                    href="/profile"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                  >
                    Redigera profil
                  </a>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Nyhetsbrev</h4>
                  <p className="text-sm text-gray-500 mb-4">Hantera dina prenumerationer</p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Erbjudanden och kampanjer</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Nyheter och produktuppdateringar</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}