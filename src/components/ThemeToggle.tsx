import { useLanguage } from '../i18n/LanguageContext'
import { useLayoutEffect, useState } from 'react'

type Theme = 'dark' | 'light'

export function ThemeToggle() {
  const { t } = useLanguage()
  const [theme, setTheme] = useState<Theme>('light')

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f5f2eb' : '#1c1c1c')
  }, [theme])

  return (
    <button className="theme-toggle" type="button" aria-pressed={theme === 'light'}
      aria-label={t("테마 변경: 라이트 모드")} title={t(theme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경')}
      onClick={() => setTheme(current => current === 'dark' ? 'light' : 'dark')}>
      {t("테마 변경")} <span className="theme-toggle-state" aria-hidden="true">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}
