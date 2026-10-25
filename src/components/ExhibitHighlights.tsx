import { useEffect, useRef, type CSSProperties } from 'react'
import { highlights } from '../data/home'
import { createHighlightsScroll } from '../lib/highlights-scroll'
import { scrollPageTo } from '../lib/page-scroll'
import './exhibit-highlights.scss'

export function ExhibitHighlights() {
  const sequenceRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const previousRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const goToRef = useRef<(index: number, focus?: boolean) => void>(() => {})
  const moveRef = useRef<(direction: number) => void>(() => {})

  useEffect(() => {
    const sequence = sequenceRef.current!
    const scene = sceneRef.current!
    const stage = stageRef.current!
    const toolbar = toolbarRef.current!
    const header = document.querySelector<HTMLElement>('.site-header')!
    const panels = [...stage.querySelectorAll<HTMLElement>('.highlights-panel')]
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
    let width = 1
    let headerHeight = 0
    let frame = 0
    let disposed = false
    let active = 0
    let buttonTarget: number | null = null
    let motion = createHighlightsScroll(1, innerHeight)
    const clamp = (n: number) => Math.max(0, Math.min(1, n))
    const start = () => sequence.getBoundingClientRect().top + scrollY - headerHeight

    const sync = () => {
      frame = 0
      const { left, offset } = motion.at(scrollY - start())
      const progress = reducedMotion.matches ? Math.round(left / width) : left / width
      active = Math.min(panels.length - 1, Math.round(progress))
      scene.style.transform = `translateY(${offset}px)`
      panels.forEach((panel, index) => {
        // Each new section covers the preceding one. The old section only recedes 10%.
        const entering = index === 0 ? 0 : 100 * (1 - clamp(progress - index + 1))
        const receding = -10 * clamp(progress - index)
        panel.style.transform = `translateX(${entering + receding}%)`
        panel.inert = index !== active
        panel.setAttribute('aria-hidden', String(index !== active))
      })
      countRef.current!.textContent = active === 0 ? `총 ${highlights.length}점` : `${String(active).padStart(2, '0')} / ${String(highlights.length).padStart(2, '0')}`
      countRef.current!.setAttribute('aria-label', active === 0 ? `전시품 ${highlights.length}점` : `전시품 ${highlights.length}개 중 ${active}번째`)
      previousRef.current!.disabled = left <= 1
      nextRef.current!.disabled = left >= (panels.length - 1) * width - 1
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync) }
    const measure = () => {
      if (disposed) return
      headerHeight = header.getBoundingClientRect().height
      sequence.style.setProperty('--highlights-top', `${headerHeight}px`)
      sequence.style.setProperty('--highlights-toolbar-height', `${toolbar.getBoundingClientRect().height}px`)
      const available = innerHeight - headerHeight
      width = stage.clientWidth
      motion = createHighlightsScroll((panels.length - 1) * width, available)
      // The overview and all objects always share one horizontal stack, at every size.
      sequence.dataset.pinned = 'true'
      sequence.style.setProperty('--highlights-travel', `${motion.travel}px`)
      sequence.dataset.scrollEnd = String(motion.horizontalEnd)
      buttonTarget = null
      sync()
    }
    const goTo = (index: number, focus = false) => {
      const target = Math.max(0, Math.min(panels.length - 1, index))
      scrollPageTo(start() + motion.positionFor(target * width), focus || reducedMotion.matches)
      if (focus) {
        sync()
        panels[target].querySelector<HTMLElement>('h2, h3')!.focus({ preventScroll: true })
      }
    }
    goToRef.current = goTo
    moveRef.current = direction => {
      buttonTarget = Math.max(0, Math.min(panels.length - 1, (buttonTarget ?? active) + direction))
      goTo(buttonTarget)
    }
    const resetTarget = () => { buttonTarget = null }
    const revealFocus = (event: FocusEvent) => {
      const panel = (event.target as HTMLElement).closest<HTMLElement>('.highlights-panel')
      if (!panel) return
      // Keyboard focus must reveal the complete section, even mid-transition.
      stage.scrollLeft = 0
      scene.scrollLeft = 0
      scrollPageTo(start() + motion.positionFor(panels.indexOf(panel) * width), true)
      sync()
    }
    const observer = new ResizeObserver(measure)
    observer.observe(scene)
    observer.observe(stage)
    observer.observe(toolbar)
    observer.observe(header)
    stage.addEventListener('focusin', revealFocus)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('wheel', resetTarget, { passive: true })
    window.addEventListener('touchstart', resetTarget, { passive: true })
    window.addEventListener('keydown', resetTarget)
    reducedMotion.addEventListener('change', measure)
    measure()
    void document.fonts.ready.then(measure)
    return () => {
      disposed = true
      observer.disconnect()
      stage.removeEventListener('focusin', revealFocus)
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      window.removeEventListener('wheel', resetTarget)
      window.removeEventListener('touchstart', resetTarget)
      window.removeEventListener('keydown', resetTarget)
      reducedMotion.removeEventListener('change', measure)
      goToRef.current = () => {}
      moveRef.current = () => {}
    }
  }, [])

  return (
    <section className="highlights" id="featured" aria-labelledby="highlights-title">
      <div className="highlights-sequence" ref={sequenceRef}>
        <div className="highlights-scene" ref={sceneRef}>
          <div className="highlights-toolbar" ref={toolbarRef}>
            <span className="highlights-label">주요 전시품</span>
            <div className="highlights-navigation">
              <span className="highlights-count" ref={countRef}>총 {highlights.length}점</span>
              <button className="highlights-list-button" type="button" aria-label="주요 전시품 목록으로 돌아가기" onClick={event => goToRef.current(0, event.detail === 0)}>목록 <span aria-hidden="true">↖</span></button>
              <div className="highlights-buttons">
                <button type="button" ref={previousRef} aria-label="이전 전시품" onClick={() => moveRef.current(-1)}>←</button>
                <button type="button" ref={nextRef} aria-label="다음 전시품" onClick={() => moveRef.current(1)}>→</button>
              </div>
              <a className="highlights-skip" href="#exhibitions">기획전시로 이동 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="highlights-stage" ref={stageRef}>
            <header className="highlights-panel highlights-overview" style={{ '--exhibit-layer': 0 } as CSSProperties}>
              <div className="highlights-overview-heading">
                <h2 id="highlights-title" tabIndex={-1}>주요 전시품</h2>
                <span className="section-index">(01)</span>
              </div>
              <div className="highlights-overview-body">
                <div className="highlights-overview-copy">
                  <p>지도와 책, 거리와 집에서<br />서울의 변화를 살펴보세요</p>
                  <p>한양의 지도를 시작으로 새로운 문물을 담은 책과 교통, 주거와 올림픽의 기록까지 여섯 점을 소개합니다</p>
                  <a className="text-link" href="#exhibitions">기획전시로 이동 <span aria-hidden="true">↓</span></a>
                </div>
                <ol className="highlights-index" aria-label="주요 전시품 목록">
                  {highlights.map((item, index) => (
                    <li key={item.id}>
                      <button type="button" aria-controls={`exhibit-${item.id}`} onClick={event => goToRef.current(index + 1, event.detail === 0)}>
                        <span className="highlights-index-number">{item.number}</span>
                        <span>{item.title}<small>{item.category}</small></span>
                        <span aria-hidden="true">↗</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </header>

            {highlights.map((item, index) => (
              <section className="highlights-panel exhibit-panel" id={`exhibit-${item.id}`} aria-labelledby={`exhibit-title-${item.id}`} key={item.id} style={{
                '--exhibit-image-width': `${item.displayWidth}px`,
                '--exhibit-image-height': `${item.displayWidth * item.height / item.width}px`,
                '--exhibit-image-ratio': `${item.width} / ${item.height}`,
                '--exhibit-layer': index + 1,
              } as CSSProperties}>
                <header className="exhibit-panel-heading">
                  <h3 id={`exhibit-title-${item.id}`} tabIndex={-1}>{item.title}</h3>
                  <span>({item.number})</span>
                </header>
                <div className="exhibit-panel-body">
                  <div className="exhibit-panel-image">
                    <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
                  </div>
                  <div className="exhibit-panel-copy">
                    <p className="eyebrow">{item.category}</p>
                    <p className="exhibit-panel-description">{item.description}</p>
                    <p className="exhibit-panel-credit">서울역사박물관 제공</p>
                    <a className="text-link" href={item.source} aria-label={`${item.title} 공식 전시물 설명 보기`}>전시물 설명 보기 <span aria-hidden="true">↗</span></a>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
