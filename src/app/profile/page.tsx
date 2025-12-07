'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { User, Mail, Phone, Calendar, Heart, Settings, Save, Edit3 } from 'lucide-react';

const skinTypes = [
  { value: 'normal', label: 'Normal' },
  { value: 'dry', label: 'Tor' },
  { value: 'oily', label: 'Fet' },
  { value: 'combination', label: 'Blandad' },
  { value: 'sensitive', label: 'Känslig' },
  { value: 'mature', label: 'Mogen' },
];

const skinConcerns = [
  { value: 'aging', label: 'Åldrande' },
  { value: 'acne', label: 'Acne' },
  { value: 'hyperpigmentation', label: 'Pigmentfläckar' },
  { value: 'redness', label: 'Rodnad' },
  { value: 'dryness', label: 'Torrhet' },
  { value: 'sensitivity', label: 'Känslighet' },
  { value: 'enlarged_pores', label: 'Stora porer' },
  { value: 'fine_lines', label: 'Fina linjer' },
];

export default function ProfilePage() {
  const { user, profile, loading, updateProfile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    date_of_birth: '',
    skin_type: '',
    skin_concerns: [] as string[],
    preferences: {
      newsletter: true,
      sms_notifications: false,
      language: 'sv' as 'sv' | 'en',
    },
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        date_of_birth: profile.date_of_birth || '',
        skin_type: profile.skin_type || '',
        skin_concerns: profile.skin_concerns || [],
        preferences: {
          newsletter: profile.preferences?.newsletter ?? true,
          sms_notifications: profile.preferences?.sms_notifications ?? false,
          language: profile.preferences?.language || 'sv',
        },
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await updateProfile(formData);
      
      if (error) {
        toast.error('Kunde inte uppdatera profilen');
      } else {
        toast.success('Profilen uppdaterad!');
        setIsEditing(false);
        await refreshProfile();
      }
    } catch (error) {
      toast.error('Ett fel uppstod');
    }
  };

  const handleSkinConcernChange = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      skin_concerns: prev.skin_concerns.includes(concern)
        ? prev.skin_concerns.filter(c => c !== concern)
        : [...prev.skin_concerns, concern]
    }));
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Min Profil</h1>
                  <p className="text-blue-100">Hantera dina personliga uppgifter och preferenser</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'Avbryt' : 'Redigera'}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Grundläggande information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-postadress</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fullständigt namn</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      disabled={!isEditing}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg transition-colors ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                          : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      placeholder="För- och efternamn"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefonnummer</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg transition-colors ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                          : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      placeholder="+46 70 123 45 67"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Födelsedatum</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
                      disabled={!isEditing}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg transition-colors ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                          : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Skin Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <span>Hudinformation</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hudtyp</label>
                  <select
                    value={formData.skin_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, skin_type: e.target.value }))}
                    disabled={!isEditing}
                    className={`block w-full px-3 py-3 border rounded-lg transition-colors ${
                      isEditing 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <option value="">Välj hudtyp</option>
                    {skinTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Språk</label>
                  <select
                    value={formData.preferences.language}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, language: e.target.value as 'sv' | 'en' }
                    }))}
                    disabled={!isEditing}
                    className={`block w-full px-3 py-3 border rounded-lg transition-colors ${
                      isEditing 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <option value="sv">Svenska</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Hudproblem (välj flera)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skinConcerns.map(concern => (
                    <label key={concern.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.skin_concerns.includes(concern.value)}
                        onChange={() => handleSkinConcernChange(concern.value)}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${isEditing ? 'text-gray-700' : 'text-gray-400'}`}>
                        {concern.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <span>Preferenser</span>
              </h2>

              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences.newsletter}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, newsletter: e.target.checked }
                    }))}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm ${isEditing ? 'text-gray-700' : 'text-gray-400'}`}>
                    Jag vill ta emot nyhetsbrev med erbjudanden och tips
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences.sms_notifications}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, sms_notifications: e.target.checked }
                    }))}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm ${isEditing ? 'text-gray-700' : 'text-gray-400'}`}>
                    Jag vill ta emot SMS-notiser om orderuppdateringar
                  </span>
                </label>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2 transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>Spara ändringar</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}