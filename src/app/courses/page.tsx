import { Metadata } from 'next'
import { Course } from '@/components/CourseList'
import CoursesPageClient from './CoursesPageClient'

export const metadata: Metadata = {
  title: 'Kurser - Anti-Aging & Hälsa',
  description: 'Utforska våra kurser inom anti-aging, hälsa, personlig utveckling och nutrition. Lär dig från experter och förbättra din livskvalitet.',
  openGraph: {
    title: 'Kurser - Anti-Aging & Hälsa',
    description: 'Utforska våra kurser inom anti-aging, hälsa, personlig utveckling och nutrition.',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Anti-Aging Kurser',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurser - Anti-Aging & Hälsa',
    description: 'Utforska våra kurser inom anti-aging, hälsa, personlig utveckling och nutrition.',
    images: ['https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&h=630&fit=crop'],
  },
  keywords: ['kurser', 'anti-aging', 'hälsa', 'personlig utveckling', 'nutrition', 'välmående'],
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Anti-Aging Grundkurs',
    slug: 'anti-aging-grundkurs',
    description: 'Lär dig grunderna i anti-aging och hur du kan sakta ner åldrandeprocessen genom livsstilsförändringar och vetenskapligt baserade metoder.',
    category: 'Anti-aging',
    level: 'Nybörjare',
    duration: '8 veckor',
    price: '2 490 kr',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop',
    rating: 4.8,
    tags: ['anti-aging', 'hälsa', 'livsstil', 'vetenskap']
  },
  {
    id: 2,
    title: 'Avancerad Näringsterapi',
    slug: 'avancerad-naringsterapi',
    description: 'Fördjupa dina kunskaper i nutrition och lär dig hur olika näringsämnen påverkar åldrandet och din hälsa.',
    category: 'Nutrition',
    level: 'Avancerad',
    duration: '12 veckor',
    price: '4 990 kr',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
    rating: 4.9,
    tags: ['nutrition', 'hälsa', 'näringslära', 'optimering']
  },
  {
    id: 3,
    title: 'Personlig Utveckling & Mindfulness',
    slug: 'personlig-utveckling-mindfulness',
    description: 'Utveckla din mentala hälsa och lär dig tekniker för stresshantering och personlig tillväxt.',
    category: 'Personlig Utveckling',
    level: 'Mellanliggande',
    duration: '6 veckor',
    price: '1 990 kr',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    rating: 4.7,
    tags: ['personlig utveckling', 'mindfulness', 'stresshantering', 'mental hälsa']
  },
  {
    id: 4,
    title: 'Mental Hälsa & Kognitiv Förbättring',
    slug: 'mental-halsa-kognitiv-forbattring',
    description: 'Förbättra din kognitiva funktion och mentala hälsa genom beprövade strategier och tekniker.',
    category: 'Mental Hälsa',
    level: 'Mellanliggande',
    duration: '10 veckor',
    price: '3 490 kr',
    status: 'coming-soon',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop',
    rating: 4.6,
    tags: ['mental hälsa', 'kognition', 'hjärna', 'strategier']
  },
  {
    id: 5,
    title: 'Hormonell Balans för Kvinnor',
    slug: 'hormonell-balans-kvinnor',
    description: 'Förstå dina hormoner och lär dig hur du uppnår optimal hormonell balans genom alla livets faser.',
    category: 'Anti-aging',
    level: 'Mellanliggande',
    duration: '8 veckor',
    price: '3 990 kr',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    rating: 4.8,
    tags: ['hormoner', 'kvinnohälsa', 'balans', 'anti-aging']
  },
  {
    id: 6,
    title: 'Sömnoptimering & Recovery',
    slug: 'sömnoptimering-recovery',
    description: 'Mastera konsten att optimera din sömn och återhämtning för bättre hälsa och längre liv.',
    category: 'Mental Hälsa',
    level: 'Nybörjare',
    duration: '4 veckor',
    price: '1 490 kr',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    rating: 4.9,
    tags: ['sömn', 'återhämtning', 'optimering', 'hälsa']
  }
]

export default function CoursesPage() {
  return (
    <>
      <CoursesPageClient courses={courses} />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Anti-Aging & Hälsa Kurser",
            "description": "Expertledda onlinekurser inom anti-aging, hälsa och personlig utveckling",
            "itemListOrder": "https://schema.org/ItemListOrderAscending",
            "numberOfItems": courses.length,
            "itemListElement": courses.map((course, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://anti-aging-halsa.se/courses/${course.slug}`,
              "item": {
                "@type": "Course",
                "name": course.title,
                "description": course.description,
                "courseMode": "online",
                "educationalLevel": course.level,
                "timeRequired": `PT${course.duration.replace(' veckor', '')}W`,
                "image": course.imageUrl,
                "provider": {
                  "@type": "Organization",
                  "name": "Anti-Aging & Hälsa",
                  "url": "https://anti-aging-halsa.se"
                },
                "offers": {
                  "@type": "Offer",
                  "price": course.price.replace(' kr', '').replace(' ', ''),
                  "priceCurrency": "SEK",
                  "availability": course.status === 'active' ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
                  "url": `https://anti-aging-halsa.se/courses/${course.slug}`
                }
              }
            }))
          })
        }}
      />
    </>
  )
}