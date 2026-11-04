import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from '../i18n/LanguageProvider'
import { AboutPreview } from './about'
createRoot(document.getElementById('root')!).render(<StrictMode><LanguageProvider><AboutPreview /></LanguageProvider></StrictMode>)
