import { useLanguage } from '../i18n/LanguageContext'
import { featuredProgrammes } from '../data/programme-candidates'
import { ProgrammeGallery } from './programme/ProgrammeGallery'
import './exhibition-programme.scss'

export function ExhibitionProgramme() {
  const { t } = useLanguage()

  return (
    <section className="programme" id="exhibitions" aria-labelledby="exhibitions-title">
      <div className="programme-scene">
        <header className="programme-heading">
          <h2 id="exhibitions-title">{t('기획전시·프로그램')}</h2>
        </header>
        <ProgrammeGallery items={featuredProgrammes} />
      </div>
    </section>
  )
}
