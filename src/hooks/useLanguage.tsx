import { create } from 'zustand'

interface LanguageState {
  language: 'en' | 'sv'
  setLanguage: (lang: 'en' | 'sv') => void
}

const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang })
}))

export function useLanguage() {
  const { language, setLanguage } = useLanguageStore()
  
  const t = (key: string, fallback: string) => {
    // Simple translation fallback for now
    return fallback
  }
  
  return { language, setLanguage, t }
}