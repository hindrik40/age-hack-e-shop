'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Leaf, Heart, Brain, Sun, Sparkles } from 'lucide-react';

export default function WellnessPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('nav.wellness')}
          </h1>
          <p className="text-xl text-gray-600">
            Holistisk guide för välmående: kost, sömn, stress och rörelse.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <Leaf className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Kost</h2>
            </div>
            <p className="text-gray-600">Fokusera på hela livsmedel, balanserade makronutrienter, och regelbundna måltider. Undvik raffinerat socker och processad mat.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <Sun className="w-6 h-6 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Sömn</h2>
            </div>
            <p className="text-gray-600">Prioritera 7-9 timmars sömn, begränsa skärmtid på kvällen och skapa en lugn sovmiljö.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-pink-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Rörelse</h2>
            </div>
            <p className="text-gray-600">Kombinera styrketräning, kondition och rörlighet. Sikta på minst 150 minuter aktivitet per vecka.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Stress</h2>
            </div>
            <p className="text-gray-600">Praktisera mindfulness, andningsövningar och planera återhämtning. Identifiera stresskällor och hantera dem proaktivt.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg md:col-span-2">
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Andlighet & själslig hälsa</h2>
            </div>
            <p className="text-gray-600 mb-4">Utforska existentiella frågor, värderingar och mening. Regelbunden reflektion kan stärka din själsliga balans och välmående.</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Daglig stillhet: meditation, bön eller kontemplation i 5–10 minuter.</li>
              <li>Journaling: skriv ner tankar och känslor för klarhet och självkännedom.</li>
              <li>Naturkontakt: promenader i naturen för att återställa lugn och närvaro.</li>
              <li>Gemenskap: dela och diskutera livsfrågor i trygga sammanhang.</li>
              <li>Tacksamhet: notera tre saker du uppskattar varje dag.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}