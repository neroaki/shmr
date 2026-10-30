import { useLanguage } from '../../i18n/LanguageContext'
import type { CSSProperties, PointerEvent } from 'react'
import type { ProgrammeCard as Programme } from '../../data/programme-candidates'
import { containCardFocus } from '../../hooks/useInlineCardDialog'
import { ProgrammeModal } from './ProgrammeModal'

interface Props {
  item: Programme
  index: number
  count: number
  selectedIndex: number | null
  preview: boolean
  onIntent: (event: PointerEvent<HTMLButtonElement>) => void
  onLeave: () => void
  onOpen: () => void
  onClose: () => void
}

export function ProgrammeCard({ item, index, count, selectedIndex, preview, onIntent, onLeave, onOpen, onClose }: Props) {
  const { t } = useLanguage()
  const offset = index - (count - 1) / 2
  const active = selectedIndex === index
  const expanded = selectedIndex !== null
  // Only the selected card moves. Its neighbours retain their resting geometry.
  const restingAngle = offset === 0 ? -28 : -Math.sign(offset) * (24 + (Math.abs(offset) - 1) * 18)
  const style = {
    '--card-image-ratio': item.width / item.height,
    '--card-x': `${active ? 50 : 50 + offset * 15}%`,
    '--card-angle': `${restingAngle}deg`,
    '--card-scale': 1 - Math.abs(offset) * .14,
    '--card-lift': `${(2 - Math.abs(offset)) * 1.6}rem`,
    '--card-order': count - Math.abs(offset),
  } as CSSProperties

  return (
    <li className={`programme-card${preview && !expanded ? ' is-previewing' : ''}${active ? ' is-open' : ''}${expanded && !active ? ' is-neighbour' : ''}`}
      data-inline-card style={style} role={active ? 'dialog' : undefined} aria-modal={active || undefined}
      aria-labelledby={active ? `programme-title-${item.id}` : undefined}
      aria-describedby={active ? `programme-description-${item.id}` : undefined}
      onKeyDown={event => { if (active) containCardFocus(event) }}>
      <div className="programme-card-plane">
        <div className="programme-card-surface">
          <button type="button" data-card-trigger className="programme-card-button" aria-haspopup="dialog" aria-expanded={active}
            disabled={active} aria-label={`${t(item.title)} ${t('상세 보기')}`}
            onPointerEnter={onIntent} onPointerMove={onIntent} onPointerLeave={onLeave} onClick={onOpen}>
            <span className="programme-card-image">
              <img src={item.image} alt={t(item.alt)} width={item.width} height={item.height} loading="lazy" />
              <span className="programme-card-open" aria-hidden="true">{t("상세 보기")} <span>↗</span></span>
            </span>
          </button>
          <ProgrammeModal item={item} active={active} onClose={onClose} />
        </div>
        <div className="programme-card-label" aria-hidden={active}>
          <span className="programme-card-meta"><span>{t(item.category)}</span><span>{String(index + 1).padStart(2, '0')}</span></span>
          <span className="programme-card-title">{t(item.title)}</span>
        </div>
      </div>
    </li>
  )
}
