import './inline-card-detail.scss'
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
  const { t } = useLanguage()
  const detailRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useInlineCardDialog(active, detailRef, closeRef, onClose)

  // Fit the complete text column together, preserving its role sizes and spacing ratios.
  // Re-measure after locale/font changes and during the existing card expansion.
  useLayoutEffect(() => {
    const surface = detailRef.current
    if (!active || !surface) return
    const inner = surface.querySelector<HTMLElement>('.programme-detail-inner')!
    const fit = () => {
      if (surface.clientWidth < 1 || surface.clientHeight < 1) return
      let low = .25
      let high = Math.min(1, surface.clientWidth / 360)
      const apply = (scale: number) => {
        surface.style.setProperty('--detail-fit', String(scale))
        inner.style.width = `${(surface.clientWidth - 1) / scale}px`
        inner.style.height = 'auto'
      }
      for (let i = 0; i < 9; i++) {
        const scale = (low + high) / 2
        apply(scale)
        if (inner.getBoundingClientRect().height > surface.clientHeight - 2
          || inner.scrollWidth > inner.clientWidth + 1) high = scale
        else low = scale
      }
      apply(low)
      inner.style.height = `${(surface.clientHeight - 2) / low}px`
    }
    const observer = new ResizeObserver(fit)
    observer.observe(surface)
    fit()
    let alive = true
    void document.fonts.ready.then(() => { if (alive) fit() })
    return () => { alive = false; observer.disconnect() }
  }, [active, t, title, description])

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
