import { useLanguage } from '../../i18n/LanguageContext'
import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { CollectionModal } from './CollectionModal'
import type { ArchiveObject } from '../../data/archive-objects'

interface Props {
  item: ArchiveObject
  column: number
  row: number
  rowSpan: number
  active: boolean
  preview: boolean
  onIntent: (event: PointerEvent<HTMLButtonElement>) => void
  onLeave: () => void
  onOpen: () => void
  onClose: () => void
}

export function CollectionCard({ item, column, row, rowSpan, active, preview, onIntent, onLeave, onOpen, onClose }: Props) {
  const { t } = useLanguage()
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <li className={`collection-card${active ? ' is-selected' : ''}${preview ? ' is-previewing' : ''}`}
      style={{ '--column': column, '--row': row, '--row-span': rowSpan } as CSSProperties}>
      <button ref={triggerRef} type="button" className="collection-card-image" data-card-trigger
        aria-label={`${t(item.shortTitle)} ${t('상세 보기')}`} aria-haspopup="dialog" aria-expanded={active} disabled={active}
        onPointerEnter={onIntent} onPointerMove={onIntent} onPointerLeave={onLeave} onClick={onOpen}>
        <img src={item.image} alt={t(item.alt)} loading="eager" fetchPriority="low" draggable={false} />
        <span className="collection-card-caption"><span>{t(item.shortTitle)}</span><span aria-hidden="true">↗</span></span>
      </button>
      {active && <CollectionModal item={item} triggerRef={triggerRef} onClose={onClose} />}
    </li>
  )
}
