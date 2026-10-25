import { useEffect } from 'react'
import Lenis from 'lenis'
import { installSectionSettle } from './section-settle'
import 'lenis/dist/lenis.css'

let pageScroll: Lenis | undefined
let cancelSettle: (() => void) | undefined

export function usePageScroll() {
  useEffect(() => {
    const controller = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      allowNestedScroll: true,
      respectReducedMotion: true,
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
