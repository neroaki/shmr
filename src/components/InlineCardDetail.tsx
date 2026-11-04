import './inline-card-detail.scss'
import { useLanguage } from '../i18n/LanguageContext'
import { useRef } from 'react'
import { useDetailTextFit } from '../hooks/useDetailTextFit'
import { useInlineCardDialog, type DialogOrigin } from '../hooks/useInlineCardDialog'

interface Props {
  origin?: DialogOrigin
  active: boolean
  onClose: () => void
  titleId: string
  descriptionId: string
  category: string
  title: string
  description: string
  fields: { label: string; value: string }[]
  notes?: string[]
  source: string
  cta: string
  credit: string
}

// Shared detail content and dialog accessibility for both galleries.
export function InlineCardDetail({ origin, active, onClose, titleId, descriptionId, category, title, description, fields, notes = [], source, cta, credit }: Props) {
  const { t } = useLanguage()
  const detailRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useInlineCardDialog(active, detailRef, closeRef, onClose, origin)

  const contentKey = JSON.stringify([category, title, description, fields, notes, cta, credit, t('닫기')])
  useDetailTextFit(active, detailRef, contentKey)

  return <div ref={detailRef} className="programme-detail" aria-hidden={!active} inert={!active}>
    <div className="programme-detail-inner">
      <div className="programme-detail-top">
        <span>{t(category)}</span>
        <button ref={closeRef} className="programme-detail-close" type="button" onClick={onClose} tabIndex={active ? 0 : -1}>
          {t("닫기")} <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="programme-detail-body">
        <div className="inline-detail-content">
          <h3 id={titleId} className="programme-detail-heading" data-dialog-heading tabIndex={-1}>{t(title)}</h3>
          <p id={descriptionId} className="programme-detail-description">{t(description)}</p>
          <dl>{fields.map(field => <div key={t(field.label)}><dt>{t(field.label)}</dt><dd>{t(field.value)}</dd></div>)}</dl>
          {notes.map(note => <p className="programme-detail-note" key={t(note)}>{t(note)}</p>)}
          <a className="text-link" href={source} target="_blank" rel="noreferrer" tabIndex={active ? 0 : -1}>
            {t(cta)}<span aria-hidden="true">↗</span><span className="sr-only"> {t("(공식 사이트, 새 창)")}</span>
          </a>
        </div>
      </div>
      <p className="programme-detail-credit">{t(credit)}</p>
    </div>
  </div>
}
