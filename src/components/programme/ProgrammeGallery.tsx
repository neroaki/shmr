import { useLanguage } from '../../i18n/LanguageContext'
import { useCardIntent } from '../../hooks/useCardIntent'
import type { ProgrammeCard as Programme } from '../../data/programme-candidates'
import { ProgrammeCard } from './ProgrammeCard'

export function ProgrammeGallery({ items }: { items: Programme[] }) {
  const { t } = useLanguage()
  const { preview, selected: selectedIndex, beginIntent, leave, open, close } = useCardIntent({ scrollQuietTime: 250 })

  return (
    <div className={`programme-gallery${selectedIndex !== null ? ' has-selection' : ''}`}>
      <div className="programme-gallery-intro">
        <span>{t("선택한 다섯 가지 / 05")}</span>
      </div>
      <ul className="programme-gallery-track" aria-label={t("기획전시와 프로그램 5선")}>
        {items.map((item, index) => <ProgrammeCard key={item.id} item={item} index={index} count={items.length}
          selectedIndex={selectedIndex} preview={preview === index} onIntent={event => beginIntent(index, event)}
          onLeave={() => leave(index)} onOpen={() => open(index)} onClose={() => close(index)} />)}
      </ul>
      <div className="programme-gallery-baseline">
        <p>{t("포스터에 잠시 머무르거나 클릭해 자세히 살펴보세요")}</p>
        <span aria-hidden="true">{t("기획전시 · 행사 · 교육")}</span>
      </div>
    </div>
  )
}
