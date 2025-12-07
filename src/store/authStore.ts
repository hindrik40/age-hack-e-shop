import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  date_of_birth?: string;
  skin_type?: string;
  skin_concerns?: string[];
  preferences?: {
    newsletter?: boolean;
    sms_notifications?: boolean;
    language?: 'sv' | 'en';
  };
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
}))