import { useLanguage } from '../i18n/LanguageContext'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { archiveObjects } from '../data/archive-objects'
import { official } from '../data/home'
import { isCollectionAligned, useCollectionEntrance } from '../hooks/useCollectionEntrance'
import { CollectionCard } from './collection/CollectionCard'
import './collection-archive.scss'

// Five columns × three rows. The unoccupied L-shaped area carries the section copy.
const collectionSlots = [
  { id: 'bulanggi', column: 1, row: 0, span: 1 },
  { id: 'yeonggajip', column: 2, row: 0, span: 1 },
  { id: 'ryu-sunjeong', column: 3, row: 0, span: 2 },
  { id: 'hanho', column: 4, row: 0, span: 1 },
  { id: 'victrola', column: 2, row: 1, span: 1 },
  { id: 'ryu-hong', column: 4, row: 1, span: 2 },
  { id: 'landscape-jar', column: 0, row: 2, span: 1 },
  { id: 'military-chest', column: 1, row: 2, span: 1 },
  { id: 'copper-jar', column: 2, row: 2, span: 1 },
  { id: 'surangama', column: 3, row: 2, span: 1 },
].map(slot => ({ ...slot, item: archiveObjects.find(item => item.id === slot.id)! }))

export function CollectionArchive() {
  const { t } = useLanguage()
  const sceneRef = useRef<HTMLDivElement>(null)
  useCollectionEntrance(sceneRef)
  const [preview, setPreview] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pending = useRef<number | null>(null)
  const suppressed = useRef<number | null>(null)
  const opened = useRef(false)
  const resumeAfter = useRef(0)

  function cancelIntent() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = null
    pending.current = null
    setPreview(null)
  }
  function open(index: number) {
    if (opened.current || sceneRef.current?.dataset.entrance !== 'ready' || !isCollectionAligned(sceneRef.current)) {
      cancelIntent()
      return
    }
    cancelIntent()
    opened.current = true
    setSelected(index)
  }
  function beginIntent(index: number, event: PointerEvent<HTMLButtonElement>) {
    if (!isCollectionAligned(sceneRef.current) || sceneRef.current?.dataset.entrance !== 'ready' || opened.current || event.pointerType !== 'mouse' || event.timeStamp < resumeAfter.current
      || suppressed.current === index || pending.current === index) return
    cancelIntent()
    const button = event.currentTarget
    pending.current = index
    setPreview(index)
    hoverTimer.current = setTimeout(() => {
      if (button.matches(':hover') && pending.current === index) open(index)
      else cancelIntent()
    }, 850)
  }

  useEffect(() => {
    const cancelWhenAway = () => {
      if (!isCollectionAligned(sceneRef.current)) {
        if (hoverTimer.current) clearTimeout(hoverTimer.current)
        hoverTimer.current = null
        pending.current = null
        setPreview(null)
      }
    }
    window.addEventListener('scroll', cancelWhenAway, { passive: true })
    window.addEventListener('resize', cancelWhenAway)
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current)
      window.removeEventListener('scroll', cancelWhenAway)
      window.removeEventListener('resize', cancelWhenAway)
    }
  }, [])

  return (
    <section className="archive" id="collection" aria-labelledby="collection-title">
      <div ref={sceneRef} data-entrance="waiting" className={`archive-scene${selected !== null ? ' has-selection' : ''}`}>
        <div className="archive-composition">
          <header className="archive-intro">
            <div className="archive-copy-heading">
            <p className="eyebrow">{t("서울역사아카이브")} <span>/03</span></p>
            <h2 id="collection-title">{t("소장자료")}</h2>
            <p className="archive-theme">{t("서울을 기록한 자료들")}</p>
            </div>
            <div className="archive-intro-more">
              <div className="archive-copy-summary">
                <p className="archive-summary">{t("책과 그림, 생활 속 물건에 남은 서울의 시간을 살펴보세요")}</p>
                <p className="archive-selection-note">{t("소장자료 중에서 고른 10점")}<br />{t("머무르거나 클릭해 자세히 살펴보세요")}</p>
              </div>
              <div className="archive-copy-links">
                <dl className="archive-groups">
                <div><dt>{t("전적과 서예")}</dt><dd>{t("불경 · 서첩")}</dd></div>
                <div><dt>{t("회화와 공예")}</dt><dd>{t("초상 · 백자 · 목가구")}</dd></div>
                <div><dt>{t("도시의 생활")}</dt><dd>{t("음향 · 광학 · 군사")}</dd></div>
                </dl>
                <a className="archive-cta" href={official.archive} target="_blank" rel="noreferrer">{t("아카이브 보기")} <span aria-hidden="true">↗</span><span className="sr-only"> {t("(새 창)")}</span></a>
              </div>
            </div>
          </header>
          <div className="archive-grid-wrap">
            <ul className="archive-grid" aria-label={t("소장자료 10점")}>
              {collectionSlots.map(({ item, column, row, span }, index) => <CollectionCard key={item.id} item={item} column={column} row={row} rowSpan={span}
                active={selected === index} preview={preview === index} onIntent={event => beginIntent(index, event)}
                onLeave={() => {
                  if (suppressed.current === index) suppressed.current = null
                  if (pending.current === index) cancelIntent()
                }} onOpen={() => open(index)} onClose={() => {
                  cancelIntent()
                  resumeAfter.current = performance.now() + 1100
                  suppressed.current = index
                  opened.current = false
                  setSelected(null)
                }} />)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
