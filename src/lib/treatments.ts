import { supabase } from './supabase'
import { mockTreatments } from '@/data/mockTreatments'

// Types for treatments
export interface Treatment {
  id: string;
  name_sv: string;
  name_en: string;
  description_sv: string;
  description_en: string;
  category_id: string;
  system_type: 'ayurveda' | 'tcm' | 'both';
  duration_minutes: number;
  price: number;
  benefits_sv: string[];
  benefits_en: string[];
  contraindications_sv: string[];
  contraindications_en: string[];
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: TreatmentCategory;
  ailments?: Ailment[];
  products?: Product[];
}

export interface TreatmentCategory {
  id: string;
  name_sv: string;
  name_en: string;
  description_sv?: string;
  description_en?: string;
  system_type: 'ayurveda' | 'tcm' | 'both';
}

export interface Ailment {
  id: string;
  name_sv: string;
  name_en: string;
  description_sv?: string;
  description_en?: string;
  body_part?: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category?: string;
  usage_instructions_sv?: string;
  usage_instructions_en?: string;
  recommended_quantity?: number;
  is_core_product?: boolean;
}

// Get all treatments with optional filtering
export async function getTreatments(options?: {
  systemType?: 'ayurveda' | 'tcm' | 'both';
  categoryId?: string;
  ailmentId?: string;
  search?: string;
  language?: 'sv' | 'en';
  limit?: number;
  offset?: number;
}) {
  try {
    if (!supabase) {
      console.warn('Supabase not configured in getTreatments; using mockTreatments fallback.')
      return mockTreatments
    }

    let query = supabase
      .from('treatments')
      .select('*')
      .eq('is_active', true)

    // Apply filters
    if (options?.systemType && options.systemType !== 'both') {
      query = query.eq('system_type', options.systemType)
    }

    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId)
    }

    if (options?.search) {
      const searchTerm = options.search.toLowerCase()
      query = query.or(`name_sv.ilike.%${searchTerm}%,name_en.ilike.%${searchTerm}%,description_sv.ilike.%${searchTerm}%,description_en.ilike.%${searchTerm}%`)
    }

    if (options?.ailmentId) {
      // If relationships are not configured, this filter may not work; skip or handle separately
      query = query.eq('treatment_ailments.ailment_id', options.ailmentId)
    }

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.warn('Error fetching treatments; using mockTreatments fallback:', error)
      return mockTreatments
    }

    return data && data.length > 0 ? (data || []).map(normalizeTreatment) : mockTreatments
  } catch (error) {
    console.error('Error in getTreatments; using mockTreatments fallback:', error)
    return mockTreatments
  }
}

// Get single treatment by ID
export async function getTreatmentById(id: string) {
  try {
    if (!supabase) {
      console.warn('Supabase not configured in getTreatmentById; using mockTreatments fallback.')
      return mockTreatments.find(t => t.id === id) || null
    }

    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) {
      console.warn('Error fetching treatment by ID; using mockTreatments fallback:', error)
      return mockTreatments.find(t => t.id === id) || null
    }

    return data ? normalizeTreatment(data) : (mockTreatments.find(t => t.id === id) || null)
  } catch (error) {
    console.error('Error in getTreatmentById; using mockTreatments fallback:', error)
    return mockTreatments.find(t => t.id === id) || null
  }
}

// Get treatment categories
export async function getTreatmentCategories() {
  try {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('treatment_categories')
      .select('*')
      .order('name_sv');

    if (error) {
      console.error('Error fetching treatment categories:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getTreatmentCategories:', error);
    throw error;
  }
}

// Get ailments
export async function getAilments(options?: {
  bodyPart?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  search?: string;
}) {
  try {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    let query = supabase
      .from('ailments')
      .select('*')
      .order('name_sv');

    if (options?.bodyPart) {
      query = query.eq('body_part', options.bodyPart);
    }

    if (options?.severity) {
      query = query.eq('severity', options.severity);
    }

    if (options?.search) {
      const searchTerm = options.search.toLowerCase();
      query = query.or(`name_sv.ilike.%${searchTerm}%,name_en.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching ailments:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getAilments:', error);
    throw error;
  }
}

// Get treatments by ailment
export async function getTreatmentsByAilment(ailmentId: string) {
  try {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('treatment_ailments')
      .select(`
        treatment:treatments(*),
        effectiveness
      `)
      .eq('ailment_id', ailmentId)
      .eq('treatments.is_active', true)
      .order('effectiveness', { ascending: false });

    if (error) {
      console.error('Error fetching treatments by ailment:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getTreatmentsByAilment:', error);
    throw error;
  }
}

// Get related products for a treatment
export async function getTreatmentProducts(treatmentId: string): Promise<Product[]> {
  try {
    if (!supabase) {
      console.warn('Supabase not configured in getTreatmentProducts; returning empty list.')
      return []
    }

    const { data, error } = await supabase
      .from('treatment_products')
      .select(`
        product:products(*),
        usage_instructions_sv,
        usage_instructions_en,
        recommended_quantity,
        is_core_product
      `)
      .eq('treatment_id', treatmentId)
      .order('is_core_product', { ascending: false });

    if (error) {
      console.error('Error fetching treatment products:', error);
      return []
    }

    const flattened = (data || []).map((row: any) => ({
      ...(row.product || {}),
      usage_instructions_sv: row.usage_instructions_sv,
      usage_instructions_en: row.usage_instructions_en,
      recommended_quantity: row.recommended_quantity,
      is_core_product: row.is_core_product
    }));

    return flattened as Product[];
  } catch (error) {
    console.error('Error in getTreatmentProducts; returning empty list:', error);
    return []
  }
}

// Normalization helper to ensure arrays and flatten relations
function normalizeTreatment(row: any): Treatment {
  const benefitsSv = Array.isArray(row.benefits_sv)
    ? row.benefits_sv
    : typeof row.benefits_sv === 'string' && row.benefits_sv
      ? row.benefits_sv.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];
  const benefitsEn = Array.isArray(row.benefits_en)
    ? row.benefits_en
    : typeof row.benefits_en === 'string' && row.benefits_en
      ? row.benefits_en.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];
  const contraSv = Array.isArray(row.contraindications_sv)
    ? row.contraindications_sv
    : typeof row.contraindications_sv === 'string' && row.contraindications_sv
      ? row.contraindications_sv.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];
  const contraEn = Array.isArray(row.contraindications_en)
    ? row.contraindications_en
    : typeof row.contraindications_en === 'string' && row.contraindications_en
      ? row.contraindications_en.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];

  const flatAilments = Array.isArray(row.ailments)
    ? row.ailments.map((a: any) => (a && typeof a === 'object' && 'ailment' in a ? a.ailment : a)).filter(Boolean)
    : [];

  return {
    ...row,
    benefits_sv: benefitsSv,
    benefits_en: benefitsEn,
    contraindications_sv: contraSv,
    contraindications_en: contraEn,
    ailments: flatAilments,
  } as Treatment;
}