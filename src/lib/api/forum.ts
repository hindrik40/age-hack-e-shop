import { supabase } from '@/lib/supabase';

export interface Expert {
  id: string;
  name: string;
  email: string;
  bio: string;
  photo_url: string;
  years_of_experience: number;
  certifications: string[];
  languages: string[];
  is_active: boolean;
  specializations?: ExpertSpecialization[];
}

export interface ExpertSpecialization {
  id: string;
  name: string;
  name_sv: string;
  description: string;
  description_sv: string;
  category: 'ayurveda' | 'tcm' | 'antiaging' | 'diet' | 'sleep' | 'movement' | 'stress' | 'spirituality' | 'mentalHealth';
}

export interface Question {
  id: string;
  title: string;
  content: string;
  user_name: string;
  user_email: string;
  category: string;
  specialization_id?: string;
  is_anonymous: boolean;
  is_answered: boolean;
  created_at: string;
  answers?: Answer[];
  specialization?: ExpertSpecialization;
}

export interface Answer {
  id: string;
  question_id: string;
  expert_id: string;
  content: string;
  is_featured: boolean;
  created_at: string;
  expert?: Expert;
}

// Hämta alla experter med valfri filtrering
export async function getExperts(filters?: {
  category?: string;
  specialization?: string;
  language?: string;
}): Promise<Expert[]> {
  try {
    const FAKE_SPECIALIZATIONS: ExpertSpecialization[] = [
      { id: 'spec-antiaging', name: 'Anti-Aging', name_sv: 'Anti-Aging', description: 'Longevity & skincare', description_sv: 'Långlevnad & hudvård', category: 'antiaging' },
      { id: 'spec-ayurveda', name: 'Ayurveda', name_sv: 'Ayurveda', description: 'Holistic wellness', description_sv: 'Holistisk hälsa', category: 'ayurveda' },
      { id: 'spec-tcm', name: 'Traditional Chinese Medicine', name_sv: 'Traditionell Kinesisk Medicin', description: 'Herbal & acupuncture', description_sv: 'Örter & akupunktur', category: 'tcm' },
      { id: 'spec-diet', name: 'Diet', name_sv: 'Kost', description: 'Nutrition & longevity', description_sv: 'Nutrition & långlevnad', category: 'diet' },
      { id: 'spec-sleep', name: 'Sleep', name_sv: 'Sömn', description: 'Sleep optimization', description_sv: 'Sömnoptimering', category: 'sleep' },
      { id: 'spec-movement', name: 'Movement', name_sv: 'Rörelse', description: 'Exercise & mobility', description_sv: 'Träning & rörlighet', category: 'movement' },
      { id: 'spec-stress', name: 'Stress', name_sv: 'Stress', description: 'Stress management', description_sv: 'Stresshantering', category: 'stress' },
      { id: 'spec-spirituality', name: 'Spirituality', name_sv: 'Andlighet', description: 'Mindfulness & purpose', description_sv: 'Mindfulness & mening', category: 'spirituality' },
      { id: 'spec-mental', name: 'Mental Health', name_sv: 'Själslig hälsa', description: 'Resilience & mental wellbeing', description_sv: 'Resiliens & själslig hälsa', category: 'mentalHealth' }
    ]
    const FAKE_EXPERTS: Expert[] = [
      {
        id: 'fake-1',
        name: 'Dr. Aurora Levin',
        email: 'aurora.levin@example.com',
        bio: 'Specialist inom anti-aging och cellulär regenerering. 12 års erfarenhet.',
        photo_url: 'https://ui-avatars.com/api/?name=Aurora+Levin&background=0ea5e9&color=fff',
        years_of_experience: 12,
        certifications: ['Dermatologi', 'Longevity Science'],
        languages: ['sv', 'en'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[0]]
      },
      {
        id: 'fake-2',
        name: 'Sage Mehta',
        email: 'sage.mehta@example.com',
        bio: 'Ayurvedisk rådgivare med fokus på nutrition och livsstil. 9 års erfarenhet.',
        photo_url: 'https://ui-avatars.com/api/?name=Sage+Mehta&background=22c55e&color=fff',
        years_of_experience: 9,
        certifications: ['Ayurvedic Practitioner'],
        languages: ['sv', 'en'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[1]]
      },
      {
        id: 'fake-3',
        name: 'Li Wei',
        email: 'li.wei@example.com',
        bio: 'TCM-expert inom örter och akupunktur. 15 års klinisk erfarenhet.',
        photo_url: 'https://ui-avatars.com/api/?name=Li+Wei&background=8b5cf6&color=fff',
        years_of_experience: 15,
        certifications: ['TCM Herbalist', 'Acupuncturist'],
        languages: ['sv', 'en'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[2]]
      },
      {
        id: 'fake-4',
        name: 'Eva Bergström',
        email: 'eva.bergstrom@example.com',
        bio: 'Näringsfysiolog med fokus på antiinflammatorisk kost och långlevnad.',
        photo_url: 'https://ui-avatars.com/api/?name=Eva+Bergström&background=ef4444&color=fff',
        years_of_experience: 11,
        certifications: ['Nutritionist'],
        languages: ['sv'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[3]]
      },
      {
        id: 'fake-5',
        name: 'Noah Lind',
        email: 'noah.lind@example.com',
        bio: 'Sömncoach som optimerar dygnsrytm och återhämtning.',
        photo_url: 'https://ui-avatars.com/api/?name=Noah+Lind&background=059669&color=fff',
        years_of_experience: 8,
        certifications: ['Sleep Coach'],
        languages: ['sv', 'en'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[4]]
      },
      {
        id: 'fake-6',
        name: 'Mira Ahl',
        email: 'mira.ahl@example.com',
        bio: 'Träningsfysiolog med fokus på styrka, mobilitet och NEAT.',
        photo_url: 'https://ui-avatars.com/api/?name=Mira+Ahl&background=2563eb&color=fff',
        years_of_experience: 10,
        certifications: ['Exercise Physiology'],
        languages: ['sv'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[5]]
      },
      {
        id: 'fake-7',
        name: 'Aron Falk',
        email: 'aron.falk@example.com',
        bio: 'Stresshantering och HRV-träning för hållbar prestation.',
        photo_url: 'https://ui-avatars.com/api/?name=Aron+Falk&background=f59e0b&color=fff',
        years_of_experience: 13,
        certifications: ['Stress Management'],
        languages: ['sv', 'en'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[6]]
      },
      {
        id: 'fake-8',
        name: 'Luna Ek',
        email: 'luna.ek@example.com',
        bio: 'Andlighet och mindfulness. Hjälper klienter att hitta mening och närvaro.',
        photo_url: 'https://ui-avatars.com/api/?name=Luna+Ek&background=7c3aed&color=fff',
        years_of_experience: 7,
        certifications: ['Mindfulness Instructor'],
        languages: ['sv'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[7]]
      },
      {
        id: 'fake-9',
        name: 'Elin Själander',
        email: 'elin.sjalander@example.com',
        bio: 'Själslig hälsa och mental resiliens med evidensbaserade metoder.',
        photo_url: 'https://ui-avatars.com/api/?name=Elin+Själander&background=0ea5e9&color=fff',
        years_of_experience: 6,
        certifications: ['CBT Practitioner'],
        languages: ['sv'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[8]]
      }
    ]
    if (!supabase) {
      let list = FAKE_EXPERTS
      if (filters?.category) {
        list = list.filter(e => e.specializations?.some(s => s.category === filters.category))
      }
      if (filters?.specialization) {
        list = list.filter(e => e.specializations?.some(s => s.id === filters.specialization))
      }
      {
        const lang = filters?.language
        if (lang) {
          list = list.filter(e => e.languages.includes(lang))
        }
      }
      return list
    }
    
    let query = supabase
      .from('experts')
      .select(`
        *,
        expert_specialization_links!inner(
          specialization_id,
          expert_specializations!inner(
            id,
            name,
            name_sv,
            description,
            description_sv,
            category
          )
        )
      `)
      .eq('is_active', true);

    if (filters?.category) {
      query = query.eq('expert_specialization_links.expert_specializations.category', filters.category);
    }

    if (filters?.specialization) {
      query = query.eq('expert_specialization_links.specialization_id', filters.specialization);
    }

    const { data, error } = await query;

    if (error) {
      let list = FAKE_EXPERTS
      if (filters?.category) {
        list = list.filter(e => e.specializations?.some(s => s.category === filters.category))
      }
      if (filters?.specialization) {
        list = list.filter(e => e.specializations?.some(s => s.id === filters.specialization))
      }
      {
        const lang = filters?.language
        if (lang) {
          list = list.filter(e => e.languages.includes(lang))
        }
      }
      return list
    }

    const mapped = data?.map(expert => ({
      ...expert,
      specializations: expert.expert_specialization_links?.map((link: any) => link.expert_specializations) || []
    })) || []
    if (mapped.length === 0) {
      let list = FAKE_EXPERTS
      if (filters?.category) {
        list = list.filter(e => e.specializations?.some(s => s.category === filters.category))
      }
      if (filters?.specialization) {
        list = list.filter(e => e.specializations?.some(s => s.id === filters.specialization))
      }
      {
        const lang = filters?.language
        if (lang) {
          list = list.filter(e => e.languages.includes(lang))
        }
      }
      return list
    }
    return mapped
  } catch (error: unknown) {
    return [
      {
        id: 'fake-fallback',
        name: 'Nova Anders',
        email: 'nova.anders@example.com',
        bio: 'Rådgivare inom anti-aging och mindfulness.',
        photo_url: 'https://ui-avatars.com/api/?name=Nova+Anders&background=f59e0b&color=fff',
        years_of_experience: 7,
        certifications: ['Mindfulness Coach'],
        languages: ['sv'],
        is_active: true,
        specializations: [
          { id: 'spec-antiaging', name: 'Anti-Aging', name_sv: 'Anti-Aging', description: 'Longevity', description_sv: 'Långlevnad', category: 'antiaging' }
        ]
      }
    ]
  }
}

// Hämta specifik expert med ID
export async function getExpertById(id: string): Promise<Expert | null> {
  try {
    const FAKE_SPECIALIZATIONS: ExpertSpecialization[] = [
      { id: 'spec-antiaging', name: 'Anti-Aging', name_sv: 'Anti-Aging', description: 'Longevity & skincare', description_sv: 'Långlevnad & hudvård', category: 'antiaging' },
      { id: 'spec-ayurveda', name: 'Ayurveda', name_sv: 'Ayurveda', description: 'Holistic wellness', description_sv: 'Holistisk hälsa', category: 'ayurveda' },
      { id: 'spec-tcm', name: 'Traditional Chinese Medicine', name_sv: 'Traditionell Kinesisk Medicin', description: 'Herbal & acupuncture', description_sv: 'Örter & akupunktur', category: 'tcm' },
      { id: 'spec-diet', name: 'Diet', name_sv: 'Kost', description: 'Nutrition & longevity', description_sv: 'Nutrition & långlevnad', category: 'diet' },
      { id: 'spec-sleep', name: 'Sleep', name_sv: 'Sömn', description: 'Sleep optimization', description_sv: 'Sömnoptimering', category: 'sleep' },
      { id: 'spec-movement', name: 'Movement', name_sv: 'Rörelse', description: 'Exercise & mobility', description_sv: 'Träning & rörlighet', category: 'movement' },
      { id: 'spec-stress', name: 'Stress', name_sv: 'Stress', description: 'Stress management', description_sv: 'Stresshantering', category: 'stress' },
      { id: 'spec-spirituality', name: 'Spirituality', name_sv: 'Andlighet', description: 'Mindfulness & purpose', description_sv: 'Mindfulness & mening', category: 'spirituality' },
      { id: 'spec-mental', name: 'Mental Health', name_sv: 'Själslig hälsa', description: 'Resilience & mental wellbeing', description_sv: 'Resiliens & själslig hälsa', category: 'mentalHealth' }
    ]
    const FAKE_EXPERTS: Expert[] = [
      {
        id: 'fake-1',
        name: 'Dr. Aurora Levin',
        email: 'aurora.levin@example.com',
        bio: 'Specialist inom anti-aging och cellulär regenerering. 12 års erfarenhet.',
        photo_url: 'https://ui-avatars.com/api/?name=Aurora+Levin&background=0ea5e9&color=fff',
        years_of_experience: 12,
        certifications: ['Dermatologi', 'Longevity Science'],
        languages: ['sv', 'en'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[0]]
      },
      {
        id: 'fake-2',
        name: 'Sage Mehta',
        email: 'sage.mehta@example.com',
        bio: 'Ayurvedisk rådgivare med fokus på nutrition och livsstil. 9 års erfarenhet.',
        photo_url: 'https://ui-avatars.com/api/?name=Sage+Mehta&background=22c55e&color=fff',
        years_of_experience: 9,
        certifications: ['Ayurvedic Practitioner'],
        languages: ['sv', 'en'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[1]]
      },
      {
        id: 'fake-3',
        name: 'Li Wei',
        email: 'li.wei@example.com',
        bio: 'TCM-expert inom örter och akupunktur. 15 års klinisk erfarenhet.',
        photo_url: 'https://ui-avatars.com/api/?name=Li+Wei&background=8b5cf6&color=fff',
        years_of_experience: 15,
        certifications: ['TCM Herbalist', 'Acupuncturist'],
        languages: ['sv', 'en'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[2]]
      },
      {
        id: 'fake-4',
        name: 'Eva Bergström',
        email: 'eva.bergstrom@example.com',
        bio: 'Näringsfysiolog med fokus på antiinflammatorisk kost och långlevnad.',
        photo_url: 'https://ui-avatars.com/api/?name=Eva+Bergström&background=ef4444&color=fff',
        years_of_experience: 11,
        certifications: ['Nutritionist'],
        languages: ['sv'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[3]]
      },
      {
        id: 'fake-5',
        name: 'Noah Lind',
        email: 'noah.lind@example.com',
        bio: 'Sömncoach som optimerar dygnsrytm och återhämtning.',
        photo_url: 'https://ui-avatars.com/api/?name=Noah+Lind&background=059669&color=fff',
        years_of_experience: 8,
        certifications: ['Sleep Coach'],
        languages: ['sv', 'en'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[4]]
      },
      {
        id: 'fake-6',
        name: 'Mira Ahl',
        email: 'mira.ahl@example.com',
        bio: 'Träningsfysiolog med fokus på styrka, mobilitet och NEAT.',
        photo_url: 'https://ui-avatars.com/api/?name=Mira+Ahl&background=2563eb&color=fff',
        years_of_experience: 10,
        certifications: ['Exercise Physiology'],
        languages: ['sv'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[5]]
      },
      {
        id: 'fake-7',
        name: 'Aron Falk',
        email: 'aron.falk@example.com',
        bio: 'Stresshantering och HRV-träning för hållbar prestation.',
        photo_url: 'https://ui-avatars.com/api/?name=Aron+Falk&background=f59e0b&color=fff',
        years_of_experience: 13,
        certifications: ['Stress Management'],
        languages: ['sv', 'en'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[6]]
      },
      {
        id: 'fake-8',
        name: 'Luna Ek',
        email: 'luna.ek@example.com',
        bio: 'Andlighet och mindfulness. Hjälper klienter att hitta mening och närvaro.',
        photo_url: 'https://ui-avatars.com/api/?name=Luna+Ek&background=7c3aed&color=fff',
        years_of_experience: 7,
        certifications: ['Mindfulness Instructor'],
        languages: ['sv'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[7]]
      },
      {
        id: 'fake-9',
        name: 'Elin Själander',
        email: 'elin.sjalander@example.com',
        bio: 'Själslig hälsa och mental resiliens med evidensbaserade metoder.',
        photo_url: 'https://ui-avatars.com/api/?name=Elin+Själander&background=0ea5e9&color=fff',
        years_of_experience: 6,
        certifications: ['CBT Practitioner'],
        languages: ['sv'],
        is_active: true,
        specializations: [FAKE_SPECIALIZATIONS[8]]
      }
    ]
    if (!supabase) {
      const found = FAKE_EXPERTS.find(e => e.id === id)
      return found || null
    }
    
    const { data, error } = await supabase
      .from('experts')
      .select(`
        *,
        expert_specialization_links!inner(
          specialization_id,
          expert_specializations!inner(
            id,
            name,
            name_sv,
            description,
            description_sv,
            category
          )
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      const found = FAKE_EXPERTS.find(e => e.id === id)
      return found || null
    }

    if (!data) {
      const found = FAKE_EXPERTS.find(e => e.id === id)
      return found || null
    }

    return {
      ...data,
      specializations: data.expert_specialization_links?.map((link: any) => link.expert_specializations) || []
    };
  } catch (error: unknown) {
    return null
  }
}

// Hämta alla specialiseringar
export async function getSpecializations(): Promise<ExpertSpecialization[]> {
  try {
    const FAKE_SPECIALIZATIONS: ExpertSpecialization[] = [
      { id: 'spec-antiaging', name: 'Anti-Aging', name_sv: 'Anti-Aging', description: 'Longevity & skincare', description_sv: 'Långlevnad & hudvård', category: 'antiaging' },
      { id: 'spec-ayurveda', name: 'Ayurveda', name_sv: 'Ayurveda', description: 'Holistic wellness', description_sv: 'Holistisk hälsa', category: 'ayurveda' },
      { id: 'spec-tcm', name: 'Traditional Chinese Medicine', name_sv: 'Traditionell Kinesisk Medicin', description: 'Herbal & acupuncture', description_sv: 'Örter & akupunktur', category: 'tcm' },
      { id: 'spec-diet', name: 'Diet', name_sv: 'Kost', description: 'Nutrition & longevity', description_sv: 'Nutrition & långlevnad', category: 'diet' },
      { id: 'spec-sleep', name: 'Sleep', name_sv: 'Sömn', description: 'Sleep optimization', description_sv: 'Sömnoptimering', category: 'sleep' },
      { id: 'spec-movement', name: 'Movement', name_sv: 'Rörelse', description: 'Exercise & mobility', description_sv: 'Träning & rörlighet', category: 'movement' },
      { id: 'spec-stress', name: 'Stress', name_sv: 'Stress', description: 'Stress management', description_sv: 'Stresshantering', category: 'stress' },
      { id: 'spec-spirituality', name: 'Spirituality', name_sv: 'Andlighet', description: 'Mindfulness & purpose', description_sv: 'Mindfulness & mening', category: 'spirituality' },
      { id: 'spec-mental', name: 'Mental Health', name_sv: 'Själslig hälsa', description: 'Resilience & mental wellbeing', description_sv: 'Resiliens & själslig hälsa', category: 'mentalHealth' }
    ]
    if (!supabase) {
      return FAKE_SPECIALIZATIONS
    }
    
    const { data, error } = await supabase
      .from('expert_specializations')
      .select('*')
      .order('category');

    if (error) {
      return FAKE_SPECIALIZATIONS
    }

    const list = data || []
    if (list.length === 0) {
      return FAKE_SPECIALIZATIONS
    }
    return list
  } catch (error) {
    return []
  }
}

// Hämta frågor med svar
export async function getQuestions(filters?: {
  category?: string;
  specialization?: string;
  answered?: boolean;
}): Promise<Question[]> {
  try {
    if (!supabase) {
      console.error('Supabase client is not initialized');
      return [];
    }
    
    let query = supabase
      .from('forum_questions')
      .select(`
        *,
        forum_answers!inner(
          *,
          experts!inner(*)
        ),
        expert_specializations!inner(*)
      `)
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.specialization) {
      query = query.eq('specialization_id', filters.specialization);
    }

    if (filters?.answered !== undefined) {
      query = query.eq('is_answered', filters.answered);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }

    return data?.map(question => ({
      ...question,
      answers: question.forum_answers || [],
      specialization: question.expert_specializations
    })) || [];
  } catch (error) {
    console.error('Error in getQuestions:', error);
    return [];
  }
}

// Skapa ny fråga
export async function createQuestion(question: {
  title: string;
  content: string;
  user_name: string;
  user_email: string;
  category: string;
  specialization_id?: string;
  is_anonymous?: boolean;
}): Promise<Question | null> {
  try {
    if (!supabase) {
      console.error('Supabase client is not initialized');
      return null;
    }
    
    const { data, error } = await supabase
      .from('forum_questions')
      .insert([{
        ...question,
        is_anonymous: question.is_anonymous || false,
        is_answered: false
      }])
      .select('*')
      .single();

    if (error) {
      console.error('Error creating question:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createQuestion:', error);
    return null;
  }
}

// Skapa svar (endast för experter)
export async function createAnswer(answer: {
  question_id: string;
  expert_id: string;
  content: string;
  is_featured?: boolean;
}): Promise<Answer | null> {
  try {
    if (!supabase) {
      console.error('Supabase client is not initialized');
      return null;
    }
    
    const { data, error } = await supabase
      .from('forum_answers')
      .insert([{
        ...answer,
        is_featured: answer.is_featured || false
      }])
      .select('*')
      .single();

    if (error) {
      console.error('Error creating answer:', error);
      throw error;
    }

    // Uppdatera frågan som besvarad
    await supabase
      .from('forum_questions')
      .update({ is_answered: true, updated_at: new Date().toISOString() })
      .eq('id', answer.question_id);

    return data;
  } catch (error) {
    console.error('Error in createAnswer:', error);
    return null;
  }
}

// Hämta frågor som en specifik expert har svarat på
export async function getQuestionsByExpert(expertId: string): Promise<Question[]> {
  try {
    if (!supabase) {
      console.error('Supabase client is not initialized');
      return [];
    }
    
    const { data, error } = await supabase
      .from('forum_questions')
      .select(`
        *,
        forum_answers!inner(
          *,
          experts!inner(*)
        ),
        expert_specializations(*)
      `)
      .eq('forum_answers.expert_id', expertId)
      .eq('is_answered', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching questions by expert:', error);
      throw error;
    }

    return data?.map(question => ({
      ...question,
      answers: question.forum_answers || [],
      specialization: question.expert_specializations
    })) || [];
  } catch (error) {
    console.error('Error in getQuestionsByExpert:', error);
    return [];
  }
}