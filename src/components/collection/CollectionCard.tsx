import { type CSSProperties, type PointerEvent } from 'react'
import { InlineCardDetail } from '../InlineCardDetail'
import type { ArchiveObject } from '../../data/archive-objects'
import { containCardFocus } from '../../hooks/useInlineCardDialog'

interface Props {
  item: ArchiveObject
  index: number
  revealOrder: number
  active: boolean
  preview: boolean
  onIntent: (event: PointerEvent<HTMLButtonElement>) => void
  onLeave: () => void
  onOpen: () => void
  onClose: () => void
}

export function CollectionCard({ item, index, revealOrder, active, preview, onIntent, onLeave, onOpen, onClose }: Props) {
  return (
    <li className={`collection-card${active ? ' is-open' : ''}${preview ? ' is-previewing' : ''}`}
      style={{ '--reveal-index': revealOrder, '--column': index % 4, '--row': Math.floor(index / 4) } as CSSProperties}
      data-reveal-order={revealOrder} data-inline-card role={active ? 'dialog' : undefined} aria-modal={active || undefined}
      aria-labelledby={active ? `collection-title-${item.id}` : undefined}
      aria-describedby={active ? `collection-description-${item.id}` : undefined}
      onKeyDown={event => { if (active) containCardFocus(event) }}>
      <button type="button" className="collection-card-image" data-card-trigger
        aria-label={`${item.shortTitle} 상세 보기`} aria-haspopup="dialog" aria-expanded={active} disabled={active}
        onPointerEnter={onIntent} onPointerMove={onIntent} onPointerLeave={onLeave} onClick={onOpen}>
        <img src={item.image} alt={item.alt} loading="lazy" draggable={false} />
        <span className="collection-card-caption"><span>{item.shortTitle}</span><span aria-hidden="true">↗</span></span>
      </button>
      <InlineCardDetail active={active} onClose={onClose} titleId={`collection-title-${item.id}`}
        descriptionId={`collection-description-${item.id}`} category={item.category} title={item.title}
        description={item.description} fields={[
          { label: '시기', value: item.period }, { label: '분류', value: item.kind },
          ...(item.recordNumber ? [{ label: '번호', value: item.recordNumber }] : []),
        ]} source={item.source} cta="아카이브 원문 보기" credit="서울역사박물관 소장 · 서울역사아카이브" />
    </li>
  )
}
