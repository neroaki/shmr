import { useLayoutEffect, type RefObject } from 'react'

// Match the small name to the actual ink of History's final r/y, independent of
// the transforms used by the introductory title animation.
export function useHeroBrandLayout(ref: RefObject<HTMLElement | null>, label: string) {
  useLayoutEffect(() => {
    const root = ref.current!
    const title = root.querySelector<HTMLElement>('.hero-title')!
    const history = root.querySelector<HTMLElement>('[data-hero-word="history"]')!
    const baseline = history.querySelector<HTMLElement>('.hero-baseline-marker')!
    const brand = root.querySelector<HTMLElement>('.hero-brand')!
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
      root.style.setProperty('--hero-brand-right', `${title.clientWidth - right}px`)
      root.style.setProperty('--hero-brand-width', `${width}px`)
      root.style.setProperty('--hero-brand-size', `${fontSize}px`)
      root.style.setProperty('--hero-brand-top', `${Math.max(0, inkTop - fontSize * 2.2)}px`)
    }
    const observer = new ResizeObserver(align)
    observer.observe(title)
    observer.observe(history)
    align()
    void document.fonts.ready.then(() => { if (alive) align() })
    return () => { alive = false; observer.disconnect() }
  }, [ref, label])
}
