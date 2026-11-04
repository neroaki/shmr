import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { highlights } from '../data/home'
import { createHighlightsScroll } from '../lib/highlights-scroll'
import { scrollPageTo } from '../lib/page-scroll'

export function useHighlightsScene() {
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

      overviewCopy.style.width = `${expandedCopyWidth + (Math.ceil(railWidth) + 2 - railPadding * 2 - expandedCopyWidth) * dock}px`
      overviewCopy.style.setProperty('--overview-copy-dock', String(dock))
      indexList.style.width = `${expandedIndexWidth + (Math.ceil(railWidth) + 2 - railPadding - indexInset - expandedIndexWidth) * dock}px`

      indexList.style.setProperty('--highlights-index-row-padding', `${8 - 3 * dock}px`)
      indexList.style.setProperty('--highlights-index-meta-height', `${1 - dock}lh`)
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
      // The toolbar controls are temporarily commented out below.
      if (countRef.current) {
        countRef.current.textContent = active === 0 ? `${t('전체')} ${highlights.length}${t('점')}` : `${String(active).padStart(2, '0')} / ${String(highlights.length).padStart(2, '0')}`
        countRef.current.setAttribute('aria-label', active === 0 ? `${t('전시품')} ${highlights.length}${t('점')}` : `${t('전시품')} ${active} / ${highlights.length}`)
      }
      if (previousRef.current) previousRef.current.disabled = left <= 1
      if (nextRef.current) nextRef.current.disabled = left >= (panels.length - 1) * width - 1
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

  return { sequenceRef, sceneRef, stageRef, toolbarRef, goToRef, countRef, previousRef, nextRef, moveRef }
}
