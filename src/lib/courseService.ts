import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import coursesBackup from '@/data/backups/courses.backup.json'

export type UICourse = {
  id: number
  title: string
  slug: string
  description: string
  duration: string
  level: string
  category: string
  rating: number
  price: string
  status: 'active' | 'coming-soon'
  tags: string[]
  imageUrl: string
}

function mapDbCourseToUI(c: any): UICourse {
  return {
    id: c.id_hash ? parseInt(c.id_hash) : c.id || Math.floor(Math.random() * 1000000),
    title: c.title,
    slug: c.slug,
    description: c.description,
    duration: c.duration || '8 veckor',
    level: c.level || 'Alla nivåer',
    category: c.category || 'Övrigt',
    rating: typeof c.rating === 'number' ? c.rating : 4.8,
    price: c.price || '0 kr',
    status: (c.status === 'coming-soon') ? 'coming-soon' : 'active',
    tags: Array.isArray(c.tags) ? c.tags : [],
    imageUrl: c.image_url || c.imageUrl || 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=600&fit=crop'
  }
}

export async function getCourses(): Promise<UICourse[]> {
  // Fallback to backup if Supabase isn't configured
  if (!isSupabaseConfigured || !supabase) {
    return coursesBackup as UICourse[]
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('DB error for courses, using backup:', error)
      return coursesBackup as UICourse[]
    }

    if (!data || data.length === 0) {
      return coursesBackup as UICourse[]
    }

    return data.map(mapDbCourseToUI)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return coursesBackup as UICourse[]
  }
}