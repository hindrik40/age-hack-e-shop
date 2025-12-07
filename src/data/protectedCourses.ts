import { Course } from '@/components/CourseList'

// FULLSTÄNDIG ÅTERSTÄLLNING AV ANVÄNDARENS KURSER
// Detta är den ursprungliga kompletta listan över kurser som användaren skapat
// SKA ALDRIG RADERAS ELLER MODIFIERAS UTAN GODKÄNNANDE

export const originalCourses: Course[] = [
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
    description: 'Utveckla din mentala hälsa och lär dig tekniker för stresshantering och personlig tillväxt genom mindfulness och meditation.',
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
    title: 'Vetenskaplig Forskning & Anti-aging',
    slug: 'vetenskaplig-forskning-anti-aging',
    description: 'Utforska den senaste vetenskapliga forskningen inom anti-aging och lär dig att tolka och applicera forskningsresultat.',
    category: 'Forskning',
    level: 'Avancerad',
    duration: '10 veckor',
    price: '6 490 kr',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b99?w=800&h=600&fit=crop',
    rating: 4.9,
    tags: ['forskning', 'vetenskap', 'anti-aging', 'evidensbaserat']
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

// PROTECTED CONTENT - DO NOT MODIFY WITHOUT APPROVAL
export const courseProtection = {
  protectedCourses: originalCourses.map(course => ({
    id: course.id,
    title: course.title,
    slug: course.slug,
    protected: true,
    lastBackup: new Date().toISOString()
  })),
  protectionEnabled: true,
  requireApprovalForChanges: true
}