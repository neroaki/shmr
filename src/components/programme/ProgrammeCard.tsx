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
  const offset = index - (count - 1) / 2
  const active = selectedIndex === index
  const expanded = selectedIndex !== null
  // Keep the original order around the chosen item while bringing it to the centre.
  const relative = expanded ? ((index - selectedIndex + count + 2) % count) - 2 : offset
  const style = {
    '--card-x': `${expanded ? 50 + relative * (Math.abs(relative) === 2 ? 23 : 40) : 50 + offset * 20 + (offset > 0 ? 1.3 : 0)}%`,
    '--card-angle': `${expanded ? active ? 0 : relative < 0 ? 48 : -48 : offset < 0 ? 38 : offset > 0 ? -38 : -28}deg`,
    '--card-scale': expanded ? active ? 1 : .65 : 1 - Math.abs(offset) * .14,
    '--card-lift': expanded ? active ? '0px' : '-2rem' : `${(2 - Math.abs(offset)) * 1.6}rem`,
    '--card-order': active ? 10 : count - Math.abs(relative),
  } as CSSProperties

  return (
    <li className={`programme-card${preview && !expanded ? ' is-previewing' : ''}${active ? ' is-open' : ''}${expanded && !active ? ' is-neighbour' : ''}`}
      data-inline-card style={style} role={active ? 'dialog' : undefined} aria-modal={active || undefined}
      aria-labelledby={active ? `programme-title-${item.id}` : undefined}
      aria-describedby={active ? `programme-description-${item.id}` : undefined}
      onKeyDown={event => { if (active) containCardFocus(event) }}>
      <div className="programme-card-surface">
        <button type="button" data-card-trigger className="programme-card-button" aria-haspopup="dialog" aria-expanded={active}
          disabled={active} aria-label={`${item.title} 상세 보기`}
          onPointerEnter={onIntent} onPointerMove={onIntent} onPointerLeave={onLeave} onClick={onOpen}>
          <span className="programme-card-image">
            <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
            <span className="programme-card-open" aria-hidden="true">상세 보기 <span>↗</span></span>
          </span>
        </button>
        <ProgrammeModal item={item} active={active} onClose={onClose} />
      </div>
      <div className="programme-card-label" aria-hidden={active}>
        <span className="programme-card-meta"><span>{item.category}</span><span>{String(index + 1).padStart(2, '0')}</span></span>
        <span className="programme-card-title">{item.title}</span>
      </div>
    </li>
  )
}
