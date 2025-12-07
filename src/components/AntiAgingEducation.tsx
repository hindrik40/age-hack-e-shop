'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, FlaskConical, Microscope, Heart, Shield, Clock, Home } from 'lucide-react';
import { antiAgingIngredients, antiAgingRoutines, ageSpecificRecommendations, skinConcerns } from '@/data/antiAgingEducation';

export default function AntiAgingEducation() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('20-30');
  const [selectedConcern, setSelectedConcern] = useState<string>('rynkor');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">Tillbaka</button>
          <button onClick={() => router.push('/')} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 flex items-center gap-2">
            <Home className="w-4 h-4" />
            Till startsidan
          </button>
        </div>
      </div>
      {/* Huvudrubrik */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Din Kompletta Guide till Anti-Aging
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upptäck vetenskapligt bevisade ingredienser och rutiner för att behålla ungdomlig hud. 
          Lär dig om de mest effektiva anti-aging komponenterna och hur de fungerar på cellulär nivå.
        </p>
      </div>

      {/* Anti-Aging Ingredienser Sektion */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Microscope className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">
            Vetenskapligt Bevisade Anti-Aging Ingredienser
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {antiAgingIngredients.map((ingredient, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <FlaskConical className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">{ingredient.name}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{ingredient.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Huvudfördelar:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {ingredient.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-sm space-y-2">
                <div>
                  <span className="font-semibold">Optimal koncentration:</span>
                  <span className="text-gray-600 ml-2">{ingredient.concentration}</span>
                </div>
                <div>
                  <span className="font-semibold">Tid till resultat:</span>
                  <span className="text-gray-600 ml-2">{ingredient.timeToResults}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Vetenskapligt stöd:</strong> {ingredient.scientificEvidence}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Åldersspecifika Rekommendationer */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Clock className="w-8 h-8 text-green-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">
            Åldersspecifika Anti-Aging Rutiner
          </h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-wrap gap-4 mb-8">
            {Object.keys(ageSpecificRecommendations).map((ageGroup) => (
              <button
                key={ageGroup}
                onClick={() => setSelectedAgeGroup(ageGroup)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedAgeGroup === ageGroup
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {ageGroup} år
              </button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Fokus för {selectedAgeGroup} år
              </h3>
              <p className="text-gray-600 mb-4">
                {ageSpecificRecommendations[selectedAgeGroup as keyof typeof ageSpecificRecommendations].focus}
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Nyckelingredienser:</h4>
              <div className="flex flex-wrap gap-2">
                {ageSpecificRecommendations[selectedAgeGroup as keyof typeof ageSpecificRecommendations].keyIngredients.map((ingredient, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rekommenderad rutin:</h3>
              <p className="text-gray-600">
                {ageSpecificRecommendations[selectedAgeGroup as keyof typeof ageSpecificRecommendations].routine}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hudproblem och Lösningar */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Heart className="w-8 h-8 text-red-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">
            Specifika Hudproblem och Anti-Aging Lösningar
          </h2>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-4">
            {Object.keys(skinConcerns).map((concern) => (
              <button
                key={concern}
                onClick={() => setSelectedConcern(concern)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors capitalize ${
                  selectedConcern === concern
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {concern.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                {selectedConcern.replace('-', ' ')}
              </h3>
              <p className="text-gray-600 mb-6">
                {skinConcerns[selectedConcern as keyof typeof skinConcerns].description}
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Bästa ingredienser:</h4>
              <div className="space-y-2 mb-6">
                {skinConcerns[selectedConcern as keyof typeof skinConcerns].bestIngredients.map((ingredient, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Rekommenderade produkter:</h4>
              <div className="space-y-3 mb-6">
                {skinConcerns[selectedConcern as keyof typeof skinConcerns].recommendedProducts.map((product, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium text-gray-900">{product}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Appliceringstips:</h4>
                <p className="text-yellow-700 text-sm">
                  {skinConcerns[selectedConcern as keyof typeof skinConcerns].applicationTips}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kompletta Anti-Aging Rutiner */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <Shield className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">
            Kompletta Anti-Aging Rutiner
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Morgonrutin */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">☀️</span>
              Morgon Rutin
            </h3>
            <ol className="space-y-3">
              {antiAgingRoutines.morning.map((step, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Kvällsrutin */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">🌙</span>
              Kväll Rutin
            </h3>
            <ol className="space-y-3">
              {antiAgingRoutines.evening.map((step, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Veckorutin */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">📅</span>
              Veckorutin
            </h3>
            <ol className="space-y-3">
              {antiAgingRoutines.weekly.map((step, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Upplysande avsnitt om anti-aging vetenskap */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Förstå Anti-Aging Vetenskapen
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Hur huden åldras:</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>• <strong>Kollagen minskning:</strong> 1% per år efter 25 års ålder</li>
              <li>• <strong>Elastin nedbrytning:</strong> Huden förlorar sin spänst</li>
              <li>• <strong>Cellförnyelse saktar:</strong> Från 28 dagar till 40+ dagar</li>
              <li>• <strong>Antioxidant minskning:</strong> Skydd mot fria radikaler försvagas</li>
              <li>• <strong>Hyaluronsyra förlust:</strong> Minskad fukt och volym</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Hur anti-aging ingredienser hjälper:</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>• <strong>Retinoider:</strong> Stimulerar kollagen och cellförnyelse</li>
              <li>• <strong>Peptider:</strong> Signalerar reparation och kollagenproduktion</li>
              <li>• <strong>Antioxidanter:</strong> Neutraliserar fria radikaler</li>
              <li>• <strong>Hyaluronsyra:</strong> Återfuktar och fyller ut huden</li>
              <li>• <strong>AHA-syror:</strong> Exfolierar och stimulerar förnyelse</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Viktigt:</strong> Konsekvent användning och solskydd är avgörande för anti-aging framgång. 
            Resultat varierar beroende på individuella faktorer som genetik, livsstil och miljöpåverkan.
          </p>
        </div>
      </div>
    </div>
  );
}
