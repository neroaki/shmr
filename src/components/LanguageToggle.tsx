import { useLanguage } from '../i18n/LanguageContext'

export function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage()
  return <button className="theme-toggle language-toggle" type="button" onClick={toggleLanguage}
    aria-label={language === 'ko' ? '언어 변경: 일본어로 보기' : '言語変更：韓国語で表示'}>
    {t('언어 변경')} <span className="theme-toggle-state" lang={language === 'ko' ? 'ja' : 'ko'}>{language === 'ko' ? '日本語' : '한국어'}</span>
  </button>
}
