import { createContext, useContext } from 'react'
export type Language = 'ko' | 'ja'
export type Translate = (text: string | undefined) => string
export const LanguageContext = createContext<{ language: Language; toggleLanguage: () => void; t: Translate } | null>(null)
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('LanguageProvider is required')
  return context
}
