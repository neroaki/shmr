import { useLayoutEffect, type RefObject } from 'react'

// Measure the final title geometry, independent of the introductory word motion.
export function useHeroLayout(ref: RefObject<HTMLElement | null>, label: string) {
  useLayoutEffect(() => {
    const root = ref.current!
    const title = root.querySelector<HTMLElement>('.hero-title')!
    const history = root.querySelector<HTMLElement>('[data-hero-word="history"]')!
    const baseline = history.querySelector<HTMLElement>('.hero-baseline-marker')!
    const brand = root.querySelector<HTMLElement>('.hero-brand')!
    const highlight = root.querySelector<HTMLElement>('.hero-title-highlight')!
    const figure = root.querySelector<HTMLElement>('.hero-figure')!
    const slot = root.querySelector<HTMLElement>('.hero-photo-slot')!
    const notes = root.querySelector<HTMLElement>('.hero-notes')!
    const context = document.createElement('canvas').getContext('2d')!
    let alive = true
    const align = () => {
      const style = getComputedStyle(title)
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      const tracking = parseFloat(style.letterSpacing) || 0
      const full = context.measureText('History')
      const end = context.measureText('ry')
      const start = history.offsetLeft + full.width - end.width + tracking * 5
      const left = start - end.actualBoundingBoxLeft
      const right = start + end.actualBoundingBoxRight + tracking
      const width = right - left
      const inkTop = baseline.offsetTop - end.actualBoundingBoxAscent
      const brandStyle = getComputedStyle(brand)
      context.font = `${brandStyle.fontWeight} 100px ${brandStyle.fontFamily}`
      const units = context.measureText(label).width / 100
      // Fit the label plus restrained tracking, leaving exactly one font-size
      // between its line box and the r/y ink. Both boxes stay inside the h1.
      const fontSize = Math.min(width / (units + (Array.from(label).length - 1) * .08), inkTop / 2.2)
      const anchor = highlight.getBoundingClientRect().right
      // Remove previous corrections before measuring so repeated calls cannot drift.
      const imageRight = slot.getBoundingClientRect().right - (parseFloat(getComputedStyle(slot).left) || 0)
      const notesLeft = notes.getBoundingClientRect().left - (parseFloat(getComputedStyle(notes).left) || 0)
      const minimumGap = parseFloat(getComputedStyle(document.documentElement).fontSize) * .7
      const brandRight = title.clientWidth - right
      // Read all geometry before writing, to avoid repeated layout recalculation.
      root.style.setProperty('--hero-notes-shift', `${anchor - notesLeft}px`)
      root.style.setProperty('--hero-map-shift', `${Math.min(0, anchor - minimumGap - imageRight)}px`)
      root.style.setProperty('--hero-brand-right', `${brandRight}px`)
      root.style.setProperty('--hero-brand-width', `${width}px`)
      root.style.setProperty('--hero-brand-size', `${fontSize}px`)
      root.style.setProperty('--hero-brand-top', `${Math.max(0, inkTop - fontSize * 2.2)}px`)
    }
    const observer = new ResizeObserver(align)
    observer.observe(title)
    observer.observe(history)
    observer.observe(highlight)
    observer.observe(figure)
    align()
    const frame = requestAnimationFrame(align)
    window.addEventListener('resize', align)
    document.fonts.addEventListener('loadingdone', align)
    void document.fonts.ready.then(() => { if (alive) align() })
    return () => {
      alive = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', align)
      document.fonts.removeEventListener('loadingdone', align)
    }
  }, [ref, label])
}
