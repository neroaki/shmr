import { useMemo, type RefObject } from 'react'
import { useCollectionModalMotion } from '../../hooks/useCollectionModalMotion'
import { createPortal } from 'react-dom'
import type { ArchiveObject } from '../../data/archive-objects'
import { useLanguage } from '../../i18n/LanguageContext'
import { containCardFocus } from '../../hooks/useInlineCardDialog'
import { InlineCardDetail } from '../InlineCardDetail'
import './collection-modal.scss'

interface Props {
  item: ArchiveObject
  triggerRef: RefObject<HTMLButtonElement | null>
  onClose: () => void
}

export function CollectionModal({ item, triggerRef, onClose }: Props) {
  const { t } = useLanguage()
  const { panelRef, shellRef, imageRef, textRef, textClipRef, dimRef, requestClose } = useCollectionModalMotion(triggerRef, onClose)
  const origin = useMemo(() => ({ triggerRef }), [triggerRef])

  return createPortal(<div className="collection-modal-layer">
    <div ref={dimRef} className="collection-modal-dim" aria-hidden="true" />
    <div ref={panelRef} className="collection-modal is-open" data-inline-card role="dialog" aria-modal="true"
      aria-labelledby={`collection-title-${item.id}`} aria-describedby={`collection-description-${item.id}`}
      onKeyDown={containCardFocus}>
      <div ref={shellRef} className="collection-modal-shell" aria-hidden="true" />
      <img ref={imageRef} className="collection-modal-image" src={item.image} alt={t(item.alt)} draggable={false} />
      <div ref={textClipRef} className="collection-modal-text-clip">
        <div ref={textRef} className="collection-modal-text">
          <InlineCardDetail active origin={origin} onClose={() => requestClose.current()}
            titleId={`collection-title-${item.id}`} descriptionId={`collection-description-${item.id}`}
            category={item.category} title={item.title} description={item.description}
            fields={[{ label: '시기', value: item.period }, { label: '분류', value: item.kind },
              ...(item.recordNumber ? [{ label: '번호', value: item.recordNumber }] : [])]}
            source={item.source} cta="아카이브 원문 보기" credit="서울역사박물관 소장 · 서울역사아카이브" />
        </div>
      </div>
    </div>
  </div>, document.body)
}
