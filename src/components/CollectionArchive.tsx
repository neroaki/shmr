import { useEffect, useRef } from 'react'
import { collections, official } from '../data/home'
import { createArchiveScroll } from '../lib/archive-scroll'
import { scrollPageTo } from '../lib/page-scroll'
import './collection-archive.scss'

export function CollectionArchive() {
  const sectionRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const previousRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const moveRef = useRef<(direction: number) => void>(() => {})

  useEffect(() => {
    const section = sectionRef.current!
    const scene = sceneRef.current!
    const viewport = viewportRef.current!
    const track = trackRef.current!
    const header = document.querySelector<HTMLElement>('.site-header')!
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.archive-item'))
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let disposed = false
    let headerHeight = 0
    let cardWidth = 1
    let distance = 1
    let left = 0
    let buttonTarget: number | null = null
    let motion = createArchiveScroll(1, innerHeight)
    const start = () => section.getBoundingClientRect().top + scrollY - headerHeight

    const sync = () => {
      frame = 0
      const position = motion.at(scrollY - start())
      left = reducedMotion.matches
        ? Math.min(distance, Math.round(position.left / cardWidth) * cardWidth)
        : position.left
      track.style.transform = `translate3d(${-left}px, 0, 0)`
      scene.style.transform = `translateY(${position.offset}px)`
      const first = Math.min(cards.length, Math.floor((left + 1) / cardWidth) + 1)
      const last = Math.min(cards.length, Math.ceil((left + viewport.clientWidth - 1) / cardWidth))
      const range = first === last ? String(first).padStart(2, '0') : `${String(first).padStart(2, '0')}–${String(last).padStart(2, '0')}`
      countRef.current!.textContent = `${range} / ${String(cards.length).padStart(2, '0')}`
      previousRef.current!.disabled = left <= 1
      nextRef.current!.disabled = left >= distance - 1
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync) }
    const measure = () => {
      if (disposed) return
      headerHeight = header.getBoundingClientRect().height
      section.style.setProperty('--archive-top', `${headerHeight}px`)
      cardWidth = cards[0].getBoundingClientRect().width
      distance = Math.max(1, cardWidth * cards.length - viewport.clientWidth)
      motion = createArchiveScroll(distance, innerHeight - headerHeight)
      section.style.setProperty('--archive-travel', `${motion.travel}px`)
      section.dataset.scrollEnd = String(motion.horizontalEnd)
      buttonTarget = null
      sync()
    }
    const goTo = (target: number, immediate = false) => {
      scrollPageTo(start() + motion.positionFor(Math.max(0, Math.min(distance, target))), immediate || reducedMotion.matches)
    }
    moveRef.current = direction => {
      buttonTarget = Math.max(0, Math.min(distance, (buttonTarget ?? left) + direction * cardWidth))
      goTo(buttonTarget)
    }
    const resetTarget = () => { buttonTarget = null }
    const revealFocus = (event: FocusEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>('.archive-item')
      if (!card) return
      // Reveal offscreen links when tabbing without leaving a hidden native scroll offset.
      viewport.scrollLeft = 0
      scene.scrollLeft = 0
      const index = cards.indexOf(card)
      const cardLeft = index * cardWidth
      if (cardLeft < left || cardLeft + cardWidth > left + viewport.clientWidth + 1) {
        goTo(cardLeft < left ? cardLeft : cardLeft + cardWidth - viewport.clientWidth, true)
        sync()
      }
    }
    const horizontalWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      const position = scrollY - start()
      if (position < -1 || position > motion.horizontalEnd + 1) return
      event.preventDefault()
      buttonTarget = null
      const delta = event.deltaX * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1)
      scrollPageTo(scrollY + delta)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(header)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('wheel', resetTarget, { passive: true })
    window.addEventListener('touchstart', resetTarget, { passive: true })
    viewport.addEventListener('focusin', revealFocus)
    scene.addEventListener('wheel', horizontalWheel, { passive: false })
    reducedMotion.addEventListener('change', measure)
    measure()
    void document.fonts.ready.then(measure)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      window.removeEventListener('wheel', resetTarget)
      window.removeEventListener('touchstart', resetTarget)
      viewport.removeEventListener('focusin', revealFocus)
      scene.removeEventListener('wheel', horizontalWheel)
      reducedMotion.removeEventListener('change', measure)
      moveRef.current = () => {}
    }
  }, [])

  return (
    <section className="archive" id="collection" ref={sectionRef} aria-labelledby="collection-title">
      <div className="archive-scene" ref={sceneRef}>
      <header className="archive-intro">
        <p className="eyebrow">서울역사아카이브 <span aria-hidden="true">/ 03</span></p>
        <h2 id="collection-title">소장자료</h2>
        <div className="archive-intro-copy">
          <p className="archive-theme">서울을 기록한 자료들</p>
          <p className="archive-summary">서울역사아카이브에서 유물과 지도, 사진, 도시와 생활의 조사기록을 찾아보세요.</p>
          <dl className="archive-groups">
            <div><dt>유물</dt><dd>박물관 소장유물과 주요 유물</dd></div>
            <div><dt>지도</dt><dd>고지도 · 근현대지도 · 지적도</dd></div>
            <div><dt>사진</dt><dd>근현대 서울과 서울시정의 기록</dd></div>
            <div><dt>조사기록</dt><dd>발굴 · 미래유산 · 생활문화</dd></div>
          </dl>
          <p className="archive-selection-note">여섯 자료군에서 고른 대표 기록</p>
        </div>
        <div className="archive-intro-bottom">
          <div className="archive-controls" aria-label="소장자료 탐색">
            <span ref={countRef} className="archive-count">01–03 / 06</span>
            <div className="archive-buttons">
              <button ref={previousRef} type="button" aria-label="이전 소장자료" onClick={() => moveRef.current(-1)}>←</button>
              <button ref={nextRef} type="button" aria-label="다음 소장자료" onClick={() => moveRef.current(1)}>→</button>
            </div>
          </div>
          <a className="archive-cta" href={official.archive}>전체 아카이브 보기 <span aria-hidden="true">↗</span></a>
        </div>
      </header>
      <div className="archive-viewport" ref={viewportRef}>
      <div className="archive-items" ref={trackRef}>
        {collections.map(item => (
          <article className="archive-item" key={item.record} aria-labelledby={`archive-${item.number}`}>
            <a className="archive-image" href={item.source} aria-label={`${item.description} 공식 자료 보기`}>
              <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
            </a>
            <div className="archive-copy">
              <h3 id={`archive-${item.number}`}>{item.title}</h3>
              <p className="archive-description">{item.description}</p>
              <p className="archive-record">{item.period}</p>
              <p className="archive-credit">{item.credit}</p>
              <div className="archive-baseline">
                <span aria-hidden="true">({item.number})</span>
                <a className="text-link" href={item.source}>자료 보기 <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>
        ))}
      </div>
      </div>
      </div>
    </section>
  )
}
