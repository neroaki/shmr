import { useEffect } from 'react'
import Lenis from 'lenis'
import { aboutWheelFactor } from './about-scroll'
import { installSectionSettle } from './section-settle'
import 'lenis/dist/lenis.css'

let pageScroll: Lenis | undefined
let cancelSettle: (() => void) | undefined

export function usePageScroll() {
  useEffect(() => {
    const controller = new Lenis({
      autoRaf: true,
      lerp: 0.095,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      allowNestedScroll: true,
      respectReducedMotion: true,
      virtualScroll: input => {
        if (!(input.event instanceof WheelEvent) || input.event.ctrlKey || !input.deltaY
          || Math.abs(input.deltaX) > Math.abs(input.deltaY)
          || matchMedia('(prefers-reduced-motion: reduce)').matches) return true
        if (input.event.composedPath().some(node => node instanceof HTMLElement
          && node.matches('.about-panel-layout, .about-center')
          && node.scrollHeight > node.clientHeight + 1
          && /auto|scroll/.test(getComputedStyle(node).overflowY))) return true
        const about = document.querySelector<HTMLElement>('#about')
        const travel = Number(about?.dataset.scrollEnd)
        if (!about || !travel) return true
        const header = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0
        const start = about.getBoundingClientRect().top + scrollY - header
        const approach = Math.min(240, Math.max(120, (innerHeight - header) * .25))
        const position = pageScroll?.targetScroll ?? scrollY
        input.deltaY *= aboutWheelFactor(position, start, start + travel, approach)
        return true
      },
    })
    pageScroll = controller
    const settling = installSectionSettle(controller)
    cancelSettle = settling.cancel
    return () => {
      settling.destroy()
      cancelSettle = undefined
      controller.destroy()
      if (pageScroll === controller) pageScroll = undefined
    }
  }, [])
}

export function scrollPageTo(top: number, immediate = false) {
  cancelSettle?.()
  if (pageScroll) pageScroll.scrollTo(top, { immediate })
  else window.scrollTo({ top, behavior: 'instant' })
}

export function scrollPageToSection(section: HTMLElement) {
  const headerHeight = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0
  const top = section.getBoundingClientRect().top + window.scrollY - headerHeight
  scrollPageTo(top + (Number(section.dataset.scrollOffset) || 0))
}
