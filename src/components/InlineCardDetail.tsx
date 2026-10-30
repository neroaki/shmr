import { useLanguage } from '../i18n/LanguageContext'
import { useLayoutEffect, useRef } from 'react'
import { useInlineCardDialog } from '../hooks/useInlineCardDialog'

interface Props {
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

// Both galleries expand their existing card into this shared React detail surface.
export function InlineCardDetail({ active, onClose, titleId, descriptionId, category, title, description, fields, notes = [], source, cta, credit }: Props) {
  const { t, language } = useLanguage()
  const detailRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  useInlineCardDialog(active, detailRef, closeRef, onClose)

  useLayoutEffect(() => {
    if (!active) return
    const body = bodyRef.current!
    const content = contentRef.current!
    let frame = 0
    const fit = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        content.style.zoom = '1'
        // Fit the full content, including the official link, without a nested scroll area.
        for (let pass = 0; pass < 4; pass++) {
          const height = content.getBoundingClientRect().height
          if (height <= body.clientHeight || body.clientHeight < 80) break
          const current = Number(content.style.zoom)
          content.style.zoom = String(Math.max(.7, current * (body.clientHeight / height) * .98))
        }
      })
    }
    const observer = new ResizeObserver(fit)
    observer.observe(body)
    fit()
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [active, language])

  return <div ref={detailRef} className="programme-detail" aria-hidden={!active} inert={!active}>
    <div className="programme-detail-inner">
      <div className="programme-detail-top">
        <span>{t(category)}</span>
        <button ref={closeRef} className="programme-detail-close" type="button" onClick={onClose} tabIndex={active ? 0 : -1}>
          {t("닫기")} <span aria-hidden="true">×</span>
        </button>
      </div>
      <div ref={bodyRef} className="programme-detail-body">
        <div ref={contentRef} className="inline-detail-content">
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
