'use client'
import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Leaf, Heart, Brain, Zap, Shield, Clock, Apple, Fish, Droplets } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AntiAgingNutritionArticle() {
  const { language } = useLanguage();
  const foodsToAvoid = [
    {
      category: "Sockerhaltiga livsmedel",
      examples: ["Läsk", "Godis", "Kakor", "Bakverk", "Donuts", "Choklad", "Fettfri yoghurt", "Vitaminvatten", "Sportdrycker", "Müslibars"],
      reason: "Höga glukostoppar leder till glykering och accelererat åldrande",
      icon: XCircle,
      color: "text-red-500"
    },
    {
      category: "Stärkelserika livsmedel",
      examples: ["Bröd", "Pasta", "Ris", "Potatis", "Fullkornsprodukter"],
      reason: "Leder till höga och långvariga glukostoppar som stimulerar åldringsmekanismer",
      icon: AlertTriangle,
      color: "text-orange-500"
    },
    {
      category: "För mycket animaliskt protein",
      examples: ["Rött processat kött", "Stora mängder kött"],
      reason: "För mycket animaliskt protein accelererar åldrandet",
      icon: XCircle,
      color: "text-red-500"
    },
    {
      category: "Ohälsosamma fetter",
      examples: ["Transfetter", "Omega-6-fetter", "Stekt mat", "Snabbmat", "Bageriprodukter", "Solrosolja", "Majsolja", "Margarin"],
      reason: "Främjar inflammation och oxidativ stress",
      icon: XCircle,
      color: "text-red-500"
    },
    {
      category: "Mjölkprodukter",
      examples: ["Mjölk", "Ost", "Yoghurt"],
      reason: "Stimulerar pro-åldrande mekanismer som mTOR, IGF och innehåller galaktos",
      icon: XCircle,
      color: "text-red-500"
    }
  ];

  const beneficialFoods = [
    {
      category: "Grönsaker",
      examples: ["Grönkål", "Broccoli", "Spenat", "Brysselkål", "Gröna bladgrönsaker"],
      benefits: ["Högt antioxidantinnehåll", "Anti-inflammatoriska", "Rik på vitaminer och mineraler"],
      icon: Leaf,
      color: "text-green-500"
    },
    {
      category: "Fet fisk",
      examples: ["Lax", "Sill", "Makrill", "Sardiner"],
      benefits: ["Omega-3 fettsyror", "Anti-inflammatoriskt", "Hjärthälsa"],
      icon: Fish,
      color: "text-blue-500"
    },
    {
      category: "Bär och frukt",
      examples: ["Blåbär", "Granatäpple", "Jordgubbar", "Mörk choklad"],
      benefits: ["Högt antioxidantinnehåll", "Polyphenoler", "Anti-aging egenskaper"],
      icon: Apple,
      color: "text-purple-500"
    },
    {
      category: "Nötter och frön",
      examples: ["Valnötter", "Chiafrön", "Linfrön", "Almond"],
      benefits: ["Hälsosamma fetter", "Fiber", "Protein", "Mineraler"],
      icon: Shield,
      color: "text-amber-500"
    },
    {
      category: "Svamp",
      examples: ["Shiitake", "Ostronskivling", "Champinjoner"],
      benefits: ["Beta-glukaner", "Immunstödjande", "Anti-virala egenskaper"],
      icon: Zap,
      color: "text-brown-500"
    }
  ];

  const grassFedBenefits = [
    "Mer hälsosamma fetter (omega-3, CLA)",
    "En av de bästa protein-källorna",
    "Full av antioxidanter (vitamin E, beta-karoten)",
    "Packad med vitaminer och mineraler",
    "Förbättrar planetens biologiska mångfald",
    "Mindre E. coli-bakterier",
    "Mindre antibiotika-resistens",
    "Mer miljövänligt vid bra förvaltning"
  ];

  const healthyHabits = [
    {
      title: "Drick mycket vatten",
      description: "Håller cellerna hydrerade och stödjer avgiftning",
      icon: Droplets,
      color: "text-blue-500"
    },
    {
      title: "Grönt te och kaffe",
      description: "Innehåller antioxidanter och kan minska risk för åldersrelaterade sjukdomar",
      icon: Heart,
      color: "text-green-500"
    },
    {
      title: "Ät mindre portioner",
      description: "Försök med två måltider om dagen, frukost är viktigast",
      icon: Clock,
      color: "text-purple-500"
    },
    {
      title: "Tidsbegränsat ätande",
      description: "Ät inom 12-timmarsfönster för att ge kroppen fastetid",
      icon: Clock,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {language === 'sv' ? 'Anti-Aging genom' : 'Anti-Aging through'}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                {language === 'sv' ? 'Rätt Näring' : 'Proper Nutrition'}
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {language === 'sv' 
                ? 'Upptäck hur din kost påverkar åldringsprocessen. Lär dig vilka livsmedel som bromsar åldrandet och vilka som accelererar det. Nutrition är den mest kraftfulla livsstilsinterventionen för att leva längre.'
                : 'Discover how your diet affects the aging process. Learn which foods slow aging and which accelerate it. Nutrition is the most powerful lifestyle intervention for longevity.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Key Message */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">{language === 'sv' ? 'Viktigt Meddelande' : 'Important Message'}</h2>
          <p className="text-lg">
            {language === 'sv' ? 'Nutrition är den mest kraftfulla livsstilsinterventionen för att leva längre. Ja, det är till och med viktigare än motion!' : 'Nutrition is the most powerful lifestyle intervention for longevity. Yes, it can even be more important than exercise!'}
          </p>
        </div>

        {/* Foods to Avoid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === 'sv' ? 'Livsmedel att Undvika för Anti-Aging' : 'Foods to Avoid for Anti-Aging'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodsToAvoid.map((food, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
                <div className="flex items-center mb-4">
                  <food.icon className={`w-8 h-8 ${food.color} mr-3`} />
                  <h3 className="text-lg font-semibold text-gray-900">{food.category}</h3>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">{language === 'sv' ? 'Exempel:' : 'Examples:'}</p>
                  <div className="flex flex-wrap gap-2">
                    {food.examples.map((example, i) => (
                      <span key={i} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>{language === 'sv' ? 'Varför undvika:' : 'Why avoid:'}</strong> {food.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficial Foods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === 'sv' ? 'Livsmedel som Främjar Anti-Aging' : 'Foods that Promote Anti-Aging'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficialFoods.map((food, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
                <div className="flex items-center mb-4">
                  <food.icon className={`w-8 h-8 ${food.color} mr-3`} />
                  <h3 className="text-lg font-semibold text-gray-900">{food.category}</h3>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">{language === 'sv' ? 'Exempel:' : 'Examples:'}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {food.examples.map((example, i) => (
                      <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">{language === 'sv' ? 'Fördelar:' : 'Benefits:'}</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {food.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grass-fed Meat Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === 'sv' ? 'Grass-fed Kött: En Närmare Titt' : 'Grass-fed Meat: A Closer Look'}
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">{language === 'sv' ? 'Fördelar med Grass-fed Kött' : 'Benefits of Grass-fed Meat'}</h3>
                <div className="space-y-4">
                  {grassFedBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 mb-3">{language === 'sv' ? 'Att Tänka På' : 'Considerations'}</h4>
                <div className="space-y-3 text-sm text-yellow-700">
                  <p>{language === 'sv' ? '• Grass-fed nötkreatur tar längre tid att nå full vikt' : '• Grass-fed cattle take longer to reach full weight'}</p>
                  <p>{language === 'sv' ? '• Smaken skiljer sig från konventionellt kött' : '• Flavor differs from conventional meat'}</p>
                  <p>{language === 'sv' ? '• Välj allt ekologiskt och närproducerat när möjligt' : '• Choose organic and locally produced when possible'}</p>
                  <p>{language === 'sv' ? '• Ät måttliga mängder även av grass-fed kött' : '• Eat moderate amounts even of grass-fed meat'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Healthy Habits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {language === 'sv' ? 'Hälsosamma Vanor för Anti-Aging' : 'Healthy Habits for Anti-Aging'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {healthyHabits.map((habit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center mb-4">
                  <habit.icon className={`w-8 h-8 ${habit.color} mr-3`} />
                  <h3 className="text-lg font-semibold text-gray-900">{habit.title}</h3>
                </div>
                <p className="text-gray-600">{habit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Guidelines */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {language === 'sv' ? 'Sammanfattning: Dina Anti-Aging Kostriktlinjer' : 'Summary: Your Anti-Aging Dietary Guidelines'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">{language === 'sv' ? 'Ät Mer Av:' : 'Eat More Of:'}</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Grönsaker, baljväxter och svamp
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Fet fisk och vitt kött (måttligt)
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Nötter, frön och avokado
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Bär och mörk choklad
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Grönt te och mycket vatten
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-4">{language === 'sv' ? 'Undvik eller Minska:' : 'Avoid or Reduce:'}</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  Socker och söta livsmedel
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  Bröd, pasta, ris och potatis
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  Processat och rött kött
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  Omega-6 oljor och transfetter
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  Mjölk och alkohol (överdrivet)
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-white rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{language === 'sv' ? 'Nyckeln till Framgång:' : 'Key to Success:'}</h3>
            <p className="text-gray-700 leading-relaxed">
              {language === 'sv' 
                ? (<>
                    <strong>Ät mindre och välj livsmedel med minimal bearbetning.</strong> 
                    Tänk på vad din gammelmormor skulle känna igen som riktig mat. 
                    Konsumera mycket grönsaker istället för bröd, pasta och potatis. 
                    Välj hälsosamma fetter från oliver, nötter och avokado. 
                    Och kom ihåg: <strong>nutrition är viktigare än motion för långt liv!</strong>
                  </>)
                : (<>
                    <strong>Eat less and choose minimally processed foods.</strong>
                    Think about what your great-grandmother would recognize as real food.
                    Consume plenty of vegetables instead of bread, pasta and potatoes.
                    Choose healthy fats from olives, nuts and avocado.
                    And remember: <strong>nutrition is more important than exercise for longevity!</strong>
                  </>)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}