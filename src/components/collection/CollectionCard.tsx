import { useLanguage } from '../../i18n/LanguageContext'
import { type CSSProperties, type PointerEvent } from 'react'
import { InlineCardDetail } from '../InlineCardDetail'
import type { ArchiveObject } from '../../data/archive-objects'
import { containCardFocus } from '../../hooks/useInlineCardDialog'

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
  return (
    <li className={`collection-card${active ? ' is-open' : ''}${preview ? ' is-previewing' : ''}`}
      style={{ '--column': column, '--row': row, '--row-span': rowSpan } as CSSProperties}
      data-inline-card role={active ? 'dialog' : undefined} aria-modal={active || undefined}
      aria-labelledby={active ? `collection-title-${item.id}` : undefined}
      aria-describedby={active ? `collection-description-${item.id}` : undefined}
      onKeyDown={event => { if (active) containCardFocus(event) }}>
      <button type="button" className="collection-card-image" data-card-trigger
        aria-label={`${t(item.shortTitle)} ${t('상세 보기')}`} aria-haspopup="dialog" aria-expanded={active} disabled={active}
        onPointerEnter={onIntent} onPointerMove={onIntent} onPointerLeave={onLeave} onClick={onOpen}>
        <img src={item.image} alt={t(item.alt)} loading="eager" fetchPriority="low" draggable={false} />
        <span className="collection-card-caption"><span>{t(item.shortTitle)}</span><span aria-hidden="true">↗</span></span>
      </button>
      <InlineCardDetail active={active} onClose={onClose} titleId={`collection-title-${item.id}`}
        descriptionId={`collection-description-${item.id}`} category={t(item.category)} title={t(item.title)}
        description={t(item.description)} fields={[
          { label: '시기', value: item.period }, { label: '분류', value: item.kind },
          ...(item.recordNumber ? [{ label: '번호', value: item.recordNumber }] : []),
        ]} source={item.source} cta={t("아카이브 원문 보기")} credit={t("서울역사박물관 소장 · 서울역사아카이브")} />
    </li>
  )
}
