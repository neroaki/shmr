import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { archiveObjects } from '../data/archive-objects'
import { official } from '../data/home'
import { CollectionCard } from './collection/CollectionCard'
import './collection-archive.scss'

export function CollectionArchive() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'intro' | 'docking' | 'revealing' | 'ready'>('intro')
  const docked = phase !== 'intro'
  const revealing = phase === 'revealing' || phase === 'ready'
  const ready = phase === 'ready'
  const [revealRanks, setRevealRanks] = useState(() => archiveObjects.map((_, index) => index))
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
    if (opened.current || !ready) return
    cancelIntent()
    opened.current = true
    setSelected(index)
  }
  function beginIntent(index: number, event: PointerEvent<HTMLButtonElement>) {
    if (!ready || opened.current || event.pointerType !== 'mouse' || event.timeStamp < resumeAfter.current
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
    let introTimer: ReturnType<typeof setTimeout> | undefined
    let entered = false
    let hasDocked = false
    const dock = () => {
      if (hasDocked) return
      hasDocked = true
      clearTimeout(introTimer)
      setPhase(matchMedia('(prefers-reduced-motion: reduce)').matches ? 'ready' : 'docking')
    }
    const inspect = () => {
      const scene = sceneRef.current!
      const rect = scene.getBoundingClientRect()
      const header = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 54
      scene.style.setProperty('--archive-top', `${header}px`)
      const visible = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, header)) / rect.height
      if (visible > .85 && !entered) {
        entered = true
        // Shuffle only the arrival order; grid positions and keyboard order stay stable.
        const ranks = archiveObjects.map((_, index) => index)
        for (let index = ranks.length - 1; index > 0; index--) {
          const other = Math.floor(Math.random() * (index + 1))
          ;[ranks[index], ranks[other]] = [ranks[other], ranks[index]]
        }
        setRevealRanks(ranks)
        introTimer = setTimeout(dock, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1400)
      }
      if (visible < .05 && entered && !opened.current) {
        entered = false
        hasDocked = false
        clearTimeout(introTimer)
        setPhase('intro')
      }
      if (hoverTimer.current) clearTimeout(hoverTimer.current)
      pending.current = null
      setPreview(null)
      resumeAfter.current = Math.max(resumeAfter.current, performance.now() + 220)
    }
    const onWheel = (event: WheelEvent) => { if (entered && event.deltaY > 0) dock() }
    const onKey = (event: KeyboardEvent) => { if (entered && ['ArrowDown', 'PageDown', ' '].includes(event.key)) dock() }
    window.addEventListener('scroll', inspect, { passive: true })
    window.addEventListener('resize', inspect)
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKey)
    const initial = requestAnimationFrame(inspect)
    return () => {
      cancelAnimationFrame(initial)
      clearTimeout(introTimer)
      if (hoverTimer.current) clearTimeout(hoverTimer.current)
      window.removeEventListener('scroll', inspect)
      window.removeEventListener('resize', inspect)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <section className="archive" id="collection" aria-labelledby="collection-title">
      <div ref={sceneRef} data-phase={phase} className={`archive-scene${docked ? ' is-docked' : ''}${revealing ? ' is-revealing' : ''}${selected !== null ? ' has-selection' : ''}`}>
        <header className="archive-intro">
          <p className="eyebrow">서울역사아카이브 <span>/03</span></p>
          <h2 id="collection-title" aria-label="소장자료">
            {Array.from('소장자료').map((letter, index) => <span key={index} aria-hidden="true"
              className="archive-title-letter" style={{ '--letter-index': index } as CSSProperties}>{letter}</span>)}
          </h2>
          <p className="archive-theme" onAnimationEnd={event => {
            // The trailing subtitle settles after the heading and its individual letters.
            if (event.target === event.currentTarget && event.animationName === 'archive-theme-dock') {
              setPhase(current => current === 'docking' ? 'revealing' : current)
            }
          }}>서울을 기록한 자료들</p>
          <div className="archive-intro-more" aria-hidden={!docked} inert={!docked}>
            <p className="archive-summary">책과 그림, 생활 속 물건에 남은 서울의 시간을 살펴보세요</p>
            <dl className="archive-groups">
              <div><dt>전적과 서예</dt><dd>불경 · 서첩</dd></div>
              <div><dt>회화와 공예</dt><dd>초상 · 백자 · 목가구</dd></div>
              <div><dt>도시의 생활</dt><dd>음향 · 광학 · 군사</dd></div>
            </dl>
            <p className="archive-selection-note">소장자료 중에서 고른 12점<br />머무르거나 클릭해 자세히 살펴보세요</p>
            <a className="archive-cta" href={official.archive} target="_blank" rel="noreferrer">아카이브 보기 <span aria-hidden="true">↗</span><span className="sr-only"> (새 창)</span></a>
          </div>
        </header>
        <div className="archive-grid-wrap" inert={!ready}>
          <ul className="archive-grid" aria-label="소장자료 12점" onAnimationEnd={event => {
            if (event.animationName === 'archive-card-reveal' && event.target instanceof HTMLElement && event.target.dataset.revealOrder === String(archiveObjects.length - 1)) {
              resumeAfter.current = performance.now() + 220
              setPhase(current => current === 'revealing' ? 'ready' : current)
            }
          }}>
            {archiveObjects.map((item, index) => <CollectionCard key={item.id} item={item} index={index} revealOrder={revealRanks[index]}
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
    </section>
  )
}
