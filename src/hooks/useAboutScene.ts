import { useEffect, useRef } from 'react'
import { createAboutScroll } from '../lib/about-scroll'

export function useAboutScene() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = section.current!, stage = scene.current!
    const header = document.querySelector<HTMLElement>('.site-header')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let top = 0
    let motion = createAboutScroll(innerHeight)
    const measure = () => {
      top = header.getBoundingClientRect().height
      motion = createAboutScroll(stage.clientHeight, reduced.matches)
      root.style.setProperty('--about-top', `${top}px`)
      root.style.setProperty('--about-travel', `${motion.travel}px`)
      root.dataset.scrollOffset = String(motion.anchor)
      root.dataset.scrollEnd = String(motion.travel)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(header)
    observer.observe(stage)
    reduced.addEventListener('change', measure)
    measure()
    return () => {
      observer.disconnect()
      reduced.removeEventListener('change', measure)
      delete root.dataset.scrollEnd
      delete root.dataset.scrollOffset
    }
  }, [])
  return { section, scene }
}
