"use client"

import React, { useEffect, useState } from 'react'
import { Brain, Heart, Target, Lightbulb, Users, Calendar, Clock, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { seedAgingSignsKnowledge, seedDMAEKnowledge, seedCorePersonalDevelopmentCourses, PDCourse } from '@/data/personalDevelopment'

export default function PersonalDevelopmentCourse() {
  const [knowledgeDocs, setKnowledgeDocs] = useState<Array<{ id: string | number; title: string; slug: string; content: any; description: string }>>([])
  const [courses, setCourses] = useState<PDCourse[]>([])

  useEffect(() => {
    try {
      // Seed kunskapsdokument vid behov
      const raw = localStorage.getItem('personal_development_documents')
      const docs = raw ? JSON.parse(raw) : []
      const hasAging = docs.some((d: any) => d.slug === 'aging-signs-knowledge')
      const hasDMAE = docs.some((d: any) => d.slug === 'dmae-knowledge')

      if (!hasAging) {
        const res = seedAgingSignsKnowledge()
        console.log(`📚 Seedade åldrande-kunskap: +${res.addedDocuments} dokument`)
      }
      if (!hasDMAE) {
        const res2 = seedDMAEKnowledge()
        console.log(`📚 Seedade DMAE-kunskap: +${res2.addedDocuments} dokument`)
      }

      const updated = JSON.parse(localStorage.getItem('personal_development_documents') || '[]')
      const relevant = updated.filter((d: any) => ['aging-signs-knowledge', 'dmae-knowledge'].includes(d.slug))
      setKnowledgeDocs(relevant)

      // Seed kurser vid behov
      const rawCourses = localStorage.getItem('personal_development_courses')
      const existingCourses = rawCourses ? JSON.parse(rawCourses) : []
      if (!Array.isArray(existingCourses) || existingCourses.length === 0) {
        const res3 = seedCorePersonalDevelopmentCourses()
        console.log(`🎓 Seedade personliga utvecklingskurser: +${res3.addedCourses} kurser`)
      }
      const updatedCourses = JSON.parse(localStorage.getItem('personal_development_courses') || '[]')
      setCourses(updatedCourses)
    } catch (e) {
      console.error('Kunde inte ladda kunskapsdokument/kurser:', e)
    }
  }, [])

  const benefits = [
    {
      icon: Heart,
      title: "Mindre stress",
      description: "Lär dig tekniker för att minska vardaglig stress och förhindra stressrelaterade sjukdomar genom mental träning och avslappning."
    },
    {
      icon: Target,
      title: "Bättre resultat",
      description: "Öka din prestationsförmåga markant genom att arbeta med mål och målbilder för att möta livets utmaningar."
    },
    {
      icon: Brain,
      title: "Bättre självförtroende",
      description: "Stärk din självkänsla, självbild och ditt självförtroende för att våga vara dig själv och leva livet fullt ut."
    },
    {
      icon: Lightbulb,
      title: "Ökad medvetenhet",
      description: "Lär dig att leva i nuet istället för att fastna i det förflutna eller oroa dig för framtiden."
    },
    {
      icon: Users,
      title: "Ökad kreativitet",
      description: "Utveckla din kreativitet och bli en bättre problemlösare genom mental utveckling och inre bilder."
    }
  ];

  const courseDates = [
    { date: "5 mars 2023", time: "09:00-15:00", session: "Tillfälle 1: Grundläggande tekniker" },
    { date: "19 mars 2023", time: "09:00-15:00", session: "Tillfälle 2: Fördjupning och praktik" },
    { date: "2 april 2023", time: "09:00-15:00", session: "Tillfälle 3: Integration och framtid" }
  ];

  const methods = [
    "Meditation och mindfulness",
    "Arbete med inre bilder och visualisering",
    "Avslappningsövningar",
    "Mental träning och självreflektion",
    "Gruppdiskussioner och erfarenhetsutbyte"
  ];

  const relatedSlugs = ['vagus-nerve-health', 'anti-aging-nutrition', 'supplement-timing'];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Personlig Utveckling med
              <span className="block text-purple-600">Inre Bilder</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              En transformerande kurs där du lär dig att använda dina inre bilder för att skapa 
              positiv förändring, minska stress och öka ditt välbefinnande.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Anmäl dig nu
              </button>
              <a href="#kursupplagg" className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Läs mer
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Practical Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3 Söndagar</h3>
            <p className="text-gray-600">5/3, 19/3, 2/4</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tid</h3>
            <p className="text-gray-600">09:00-15:00</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Plats</h3>
            <p className="text-gray-600">Koarp 266</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Max 6 deltagare</h3>
            <p className="text-gray-600">Liten grupp</p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Varför personlig utveckling med inre bilder?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <benefit.icon className="w-16 h-16 text-purple-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Schedule */}
        <div id="kursupplagg" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Kursupplägg</h2>
          <div className="space-y-6">
            {courseDates.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-600">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.session}</h3>
                    <p className="text-purple-600 font-medium">{item.date}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Arbetssätt</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {methods.map((method, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-lg">
                <CheckCircle className="w-8 h-8 text-purple-600 mb-4" />
                <p className="text-gray-700">{method}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Registration */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pris & Anmälan</h2>
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
            <p className="text-gray-700 mb-4">Pris: 2500:- för nya deltagare och 2000:- för tidigare deltagare.</p>
            <p className="text-gray-700 mb-6">Kursmaterial ingår och skickas delvis ut innan samt delas ut under kursen.</p>
            <div className="text-center">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Anmäl dig
              </button>
            </div>
          </div>
        </div>

        {/* Kontakt */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Kontakt</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Phone className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-gray-700">Telefon: 0709783708</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Mail className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-gray-700">Mail: hindrikounpuu@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Kunskap */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Kunskap</h2>
          {knowledgeDocs && knowledgeDocs.length > 0 ? (
            knowledgeDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl p-8 shadow-lg mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{doc.title}</h3>
                <p className="text-gray-700 mb-4">{doc.description}</p>
                <div className="space-y-4">
                  {doc.content?.sections?.map((s: any, i: number) => (
                    <div key={i} className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="text-lg font-semibold text-purple-700">{s.title}</h4>
                      <p className="text-gray-800">{s.description}</p>
                    </div>
                  ))}
                </div>
                {doc.content?.conclusion && (
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <p className="text-gray-800"><strong>Slutsats:</strong> {doc.content.conclusion}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Inga kunskapsdokument tillgängliga just nu.</p>
          )}
        </div>

        {/* Kurser */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Våra kurser</h2>
          {courses && courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{course.level}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{course.duration}</span>
                  </div>
                  {course.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.slice(0, 4).map((t) => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                  {course.modules && course.modules.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900">Moduler ({course.modules.length})</h4>
                      <ul className="list-disc ml-5 text-gray-700">
                        {course.modules.slice(0, 2).map((m) => (
                          <li key={m.id}>
                            <span className="font-medium">{m.title}</span>{m.description ? ` – ${m.description}` : ''}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-6">
                    <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      Starta kurs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Inga kurser tillgängliga just nu.</p>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Vill du utvecklas?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Majoriteten av svenska folket vill utvecklas, men få tar sig tid. 
              Ge dig själv chansen att uppleva känslan av personlig utveckling!
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Anmäl dig till kursen nu
            </button>
          </div>
        </div>
        {/* Anti-Aging Grundkurs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Anti-Aging Grundkurs</h2>
          {courses && courses.filter(c => c.slug === 'anti-aging-grundkurs').length > 0 ? (
            courses.filter(c => c.slug === 'anti-aging-grundkurs').map((course) => (
              <div key={course.id} className="bg-white rounded-xl p-8 shadow-lg mb-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{course.level}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{course.duration}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{course.price}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-700 mb-4">{course.description}</p>
                {course.modules && course.modules.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Moduler & Lektioner</h4>
                    {course.modules.map((m) => (
                      <div key={m.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">{m.title}</div>
                        {m.description && <div className="text-gray-700 mb-2">{m.description}</div>}
                        {m.lessons && (
                          <ul className="list-disc ml-5 text-gray-700">
                            {m.lessons.map((l) => (
                              <li key={l.id}>{l.title}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Anti-Aging Grundkursen är inte tillgänglig just nu.</p>
          )}
        </div>
        {/* Kontakt */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Kontakt</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Phone className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-gray-700">Telefon: 0709783708</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Mail className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-gray-700">Mail: hindrikounpuu@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Kunskap */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Kunskap</h2>
          {knowledgeDocs && knowledgeDocs.length > 0 ? (
            knowledgeDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl p-8 shadow-lg mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{doc.title}</h3>
                <p className="text-gray-700 mb-4">{doc.description}</p>
                <div className="space-y-4">
                  {doc.content?.sections?.map((s: any, i: number) => (
                    <div key={i} className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="text-lg font-semibold text-purple-700">{s.title}</h4>
                      <p className="text-gray-800">{s.description}</p>
                    </div>
                  ))}
                </div>
                {doc.content?.conclusion && (
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <p className="text-gray-800"><strong>Slutsats:</strong> {doc.content.conclusion}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Inga kunskapsdokument tillgängliga just nu.</p>
          )}
        </div>

        {/* Kurser */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Våra kurser</h2>
          {courses && courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{course.level}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{course.duration}</span>
                  </div>
                  {course.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.slice(0, 4).map((t) => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                  {course.modules && course.modules.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900">Moduler ({course.modules.length})</h4>
                      <ul className="list-disc ml-5 text-gray-700">
                        {course.modules.slice(0, 2).map((m) => (
                          <li key={m.id}>
                            <span className="font-medium">{m.title}</span>{m.description ? ` – ${m.description}` : ''}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-6">
                    <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      Starta kurs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Inga kurser tillgängliga just nu.</p>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Vill du utvecklas?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Majoriteten av svenska folket vill utvecklas, men få tar sig tid. 
              Ge dig själv chansen att uppleva känslan av personlig utveckling!
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Anmäl dig till kursen nu
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}