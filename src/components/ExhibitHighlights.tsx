import { useLanguage } from '../i18n/LanguageContext'
import { useEffect, useRef, type CSSProperties } from 'react'
import { highlights } from '../data/home'
import { createHighlightsScroll } from '../lib/highlights-scroll'
import { scrollPageTo } from '../lib/page-scroll'
import './exhibit-highlights.scss'

export function ExhibitHighlights() {
  const { t } = useLanguage()
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
    const viewport = stage.querySelector<HTMLElement>('.highlights-viewport')!
    const toolbar = toolbarRef.current!
    const header = document.querySelector<HTMLElement>('.site-header')!
    const panels = [...stage.querySelectorAll<HTMLElement>('.highlights-panel')]
    const overview = panels[0]
    const heading = overview.querySelector<HTMLElement>('h2')!
    const overviewCopy = overview.querySelector<HTMLElement>('.highlights-overview-copy')!
    const indexList = overview.querySelector<HTMLElement>('.highlights-index')!
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
    let width = 1
    let railWidth = 1
    let railPadding = 1
    let indexInset = 1
    let expandedCopyWidth = 1
    let expandedIndexWidth = 1
    let expandedHeadingSize = 1
    let dockedHeadingSize = 1
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
      // The overview itself becomes the persistent left rail as the first object enters.
      const dock = clamp(progress)
      // A small overlap covers subpixel seams between the rail and incoming panel.
      const overviewWidth = Math.ceil(stage.clientWidth - dock * width) + 2
      overview.style.width = `${overviewWidth}px`
      heading.style.fontSize = `${expandedHeadingSize + (dockedHeadingSize - expandedHeadingSize) * dock}px`
      overviewCopy.style.width = `${expandedCopyWidth + (Math.ceil(railWidth) + 2 - railPadding * 2 - expandedCopyWidth) * dock}px`
      overviewCopy.style.setProperty('--overview-copy-dock', String(dock))
      indexList.style.width = `${expandedIndexWidth + (Math.ceil(railWidth) + 2 - railPadding - indexInset - expandedIndexWidth) * dock}px`
      indexList.style.setProperty('--highlights-index-font-size', `${26 - 3 * dock}px`)
      indexList.style.setProperty('--highlights-index-row-padding', `${8 - 3 * dock}px`)
      indexList.style.setProperty('--highlights-index-meta-height', `${24 * (1 - dock)}px`)
      indexList.style.setProperty('--highlights-index-meta-opacity', String(1 - dock))
      const indexHeight = indexList.offsetHeight
      const bottomPosition = stage.clientHeight - railPadding - indexHeight
      const listStart = heading.offsetTop + heading.offsetHeight + 24
      const listEnd = overviewCopy.offsetTop - 28
      const centeredPosition = Math.max(listStart, (listStart + listEnd - indexHeight) / 2)
      indexList.style.transform = `translateY(${(centeredPosition - bottomPosition) * dock}px)`
      panels.forEach((panel, index) => {
        if (index > 0) {
          // Exhibit panels stack only inside the right viewport; they never cross the rail.
          const entering = 100 * (1 - clamp(progress - index + 1))
          const receding = -10 * clamp(progress - index)
          panel.style.transform = `translateX(${entering + receding}%)`
        }
        // The docked list stays available for direct navigation between objects.
        panel.inert = index > 0 && index !== active
        panel.setAttribute('aria-hidden', String(index > 0 && index !== active))
      })
      countRef.current!.textContent = active === 0 ? `${t('전체')} ${highlights.length}${t('점')}` : `${String(active).padStart(2, '0')} / ${String(highlights.length).padStart(2, '0')}`
      countRef.current!.setAttribute('aria-label', active === 0 ? `${t('전시품')} ${highlights.length}${t('점')}` : `${t('전시품')} ${active} / ${highlights.length}`)
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
      width = viewport.clientWidth
      railWidth = stage.clientWidth - width
      railPadding = parseFloat(getComputedStyle(overview).paddingLeft)
      indexInset = parseFloat(getComputedStyle(indexList).right)
      overviewCopy.style.removeProperty('width')
      expandedCopyWidth = overviewCopy.offsetWidth
      expandedIndexWidth = Math.min(stage.clientWidth * .45, 42 * parseFloat(getComputedStyle(document.documentElement).fontSize))
      heading.style.removeProperty('font-size')
      expandedHeadingSize = parseFloat(getComputedStyle(heading).fontSize)
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
      dockedHeadingSize = Math.min(4.5 * rem, Math.max(2.625 * rem, innerWidth * .036)) * .7
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
      if (indexList.contains(event.target as Node)) return
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
    observer.observe(viewport)
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
  }, [t])

  return (
    <section className="highlights" id="featured" aria-labelledby="highlights-title">
      <div className="highlights-sequence" ref={sequenceRef}>
        <div className="highlights-scene" ref={sceneRef}>
          <div className="highlights-toolbar" ref={toolbarRef}>
            <div className="highlights-navigation">
              <span className="highlights-count" ref={countRef}>{t('전체')} {highlights.length}{t('점')}</span>
              <button className="highlights-list-button" type="button" aria-label={t("주요 전시품 목록으로 돌아가기")} onClick={event => goToRef.current(0, event.detail === 0)}>{t("목록")} <span aria-hidden="true">↖</span></button>
              <div className="highlights-buttons">
                <button type="button" ref={previousRef} aria-label={t("이전 전시품")} onClick={() => moveRef.current(-1)}>←</button>
                <button type="button" ref={nextRef} aria-label={t("다음 전시품")} onClick={() => moveRef.current(1)}>→</button>
              </div>
              <a className="highlights-skip" href="#exhibitions">{t("기획전시·프로그램으로 이동")} <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="highlights-stage" ref={stageRef}>
            <header className="highlights-panel highlights-overview" style={{ '--exhibit-layer': 0 } as CSSProperties}>
              <div className="highlights-overview-heading">
                <h2 id="highlights-title" tabIndex={-1}>{t("주요 전시품")}</h2>
              </div>
              <div className="highlights-overview-body">
                <div className="highlights-overview-copy">
                  <p>{t("지도와 책, 도시의 기록에서")}<br />{t("서울의 변화를 살펴보세요")}</p>
                  <p>{t("한양의 지도와 새로운 문물을 담은 책, 전차 안내서와 올림픽 성화봉까지 네 점을 소개합니다")}</p>
                </div>
                <ol className="highlights-index" aria-label={t("주요 전시품 목록")}>
                  {highlights.map((item, index) => (
                    <li key={item.id}>
                      <button type="button" aria-controls={`exhibit-${item.id}`} onClick={event => goToRef.current(index + 1, event.detail === 0)}>
                        <span className="highlights-index-number">{item.number}</span>
                        <span>{t(item.title)}<small>{t(item.category)}</small></span>
                        <span aria-hidden="true">↗</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </header>

            <div className="highlights-viewport">
              {highlights.map((item, index) => (
              <section className="highlights-panel exhibit-panel" id={`exhibit-${item.id}`} aria-labelledby={`exhibit-title-${item.id}`} key={item.id} style={{
                '--exhibit-image-width': `${item.displayWidth}px`,
                '--exhibit-image-height': `${item.displayWidth * item.height / item.width}px`,
                '--exhibit-image-ratio': `${item.width} / ${item.height}`,
                '--exhibit-layer': index + 1,
              } as CSSProperties}>
                <div className="exhibit-panel-body">
                  <div className="exhibit-panel-image">
                    <img src={item.image} alt={t(item.alt)} width={item.width} height={item.height} loading="lazy" decoding="async" />
                  </div>
                  <div className="exhibit-panel-copy">
                    <p className="eyebrow">{t(item.category)}</p>
                    <h3 id={`exhibit-title-${item.id}`} tabIndex={-1}>{t(item.title)}</h3>
                    <p className="exhibit-panel-description">{t(item.description)}</p>
                    <p className="exhibit-panel-credit">{t("서울역사박물관 제공")}</p>
                    <a className="text-link" href={item.source} aria-label={`${t(item.title)} ${t('공식 전시물 설명 보기')}`}>{t("전시물 설명 보기")} <span aria-hidden="true">↗</span></a>
                  </div>
                </div>
              </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
