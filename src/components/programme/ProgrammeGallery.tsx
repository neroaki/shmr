import { useLanguage } from '../../i18n/LanguageContext'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { ProgrammeCard as Programme } from '../../data/programme-candidates'
import { ProgrammeCard } from './ProgrammeCard'

export function ProgrammeGallery({ items }: { items: Programme[] }) {
  const { t } = useLanguage()
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pending = useRef<string | null>(null)
  const suppressed = useRef<string | null>(null)
  const modalOpen = useRef(false)
  const lastScroll = useRef(0)
  const resumeHoverAfter = useRef(0)

  function cancelIntent() {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    pending.current = null
    setPreview(null)
  }

  function open(index: number) {
    if (modalOpen.current) return
    cancelIntent()
    modalOpen.current = true
    setSelectedIndex(index)
  }

  function beginIntent(item: Programme, index: number, event: PointerEvent<HTMLButtonElement>) {
    if (event.timeStamp < resumeHoverAfter.current || event.pointerType !== 'mouse' || modalOpen.current || suppressed.current === item.id
      || pending.current === item.id || event.timeStamp - lastScroll.current < 250) return
    cancelIntent()
    const button = event.currentTarget
    pending.current = item.id
    setPreview(item.id)
    timer.current = setTimeout(() => {
      if (button.matches(':hover') && pending.current === item.id) open(index)
      else cancelIntent()
    }, 850)
  }

  useEffect(() => {
    const onScroll = (event: Event) => {
      lastScroll.current = event.timeStamp
      if (timer.current) clearTimeout(timer.current)
      timer.current = null
      pending.current = null
      setPreview(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return (
    <div className={`programme-gallery${selectedIndex !== null ? ' has-selection' : ''}`}>
      <div className="programme-gallery-intro">
        <span>{t("선택한 다섯 가지 / 05")}</span>
      </div>
      <ul className="programme-gallery-track" aria-label={t("기획전시와 프로그램 5선")}>
        {items.map((item, index) => <ProgrammeCard key={item.id} item={item} index={index} count={items.length}
          selectedIndex={selectedIndex} preview={preview === item.id} onIntent={event => beginIntent(item, index, event)}
          onLeave={() => {
            if (suppressed.current === item.id) suppressed.current = null
            if (pending.current === item.id) cancelIntent()
          }} onOpen={() => open(index)} onClose={() => {
            cancelIntent()
            resumeHoverAfter.current = performance.now() + 1100
            suppressed.current = item.id
            modalOpen.current = false
            setSelectedIndex(null)
          }} />)}
      </ul>
      <div className="programme-gallery-baseline">
        <p>{t("포스터에 잠시 머무르거나 클릭해 자세히 살펴보세요")}</p>
        <span aria-hidden="true">{t("기획전시 · 행사 · 교육")}</span>
      </div>
    </div>
  )
}
