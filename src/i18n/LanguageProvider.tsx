import { useCallback, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext, type Language } from './LanguageContext'
import { ja } from './ja'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('shm-language') === 'ja' ? 'ja' : 'ko' }
    catch { return 'ko' }
  })
  const t = useCallback((text: string | undefined) => {
    if (!text) return ''
    return language === 'ja' ? (ja[text] ?? text) : text
  }, [language])
  const toggleLanguage = useCallback(() => setLanguage(current => current === 'ko' ? 'ja' : 'ko'), [])
  useLayoutEffect(() => {
    document.documentElement.lang = language
    document.title = t('서울역사박물관')
    try { localStorage.setItem('shm-language', language) } catch { /* Storage is optional. */ }
  }, [language, t])
  const value = useMemo(() => ({ language, toggleLanguage, t }), [language, toggleLanguage, t])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
