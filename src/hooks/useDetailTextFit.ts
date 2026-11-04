import { useLayoutEffect, type RefObject } from 'react'

export function useDetailTextFit(active: boolean, surfaceRef: RefObject<HTMLDivElement | null>, contentKey: string) {
  // Fit the complete text column together, preserving its role sizes and spacing ratios.
  // Re-measure after locale/font changes and during the existing card expansion.
  useLayoutEffect(() => {
    const surface = surfaceRef.current
    if (!active || !surface) return
    const inner = surface.querySelector<HTMLElement>('.programme-detail-inner')
    if (!inner) return
    const fit = () => {
      if (surface.clientWidth < 1 || surface.clientHeight < 1) return
      let high = Math.min(1, surface.clientWidth / 360)
      let low = Math.min(.25, high)
      const apply = (scale: number) => {
        surface.style.setProperty('--detail-fit', String(scale))
        inner.style.width = `${(surface.clientWidth - 1) / scale}px`
        inner.style.height = 'auto'
      }
      for (let i = 0; i < 9; i++) {
        const scale = (low + high) / 2
        apply(scale)
        if (inner.getBoundingClientRect().height > surface.clientHeight - 2
          || inner.scrollWidth > inner.clientWidth + 1) high = scale
        else low = scale
      }
      apply(low)
      inner.style.height = `${(surface.clientHeight - 2) / low}px`
    }
    const observer = new ResizeObserver(fit)
    observer.observe(surface)
    fit()
    let alive = true
    void document.fonts.ready.then(() => { if (alive) fit() })
    return () => { alive = false; observer.disconnect() }
  }, [active, surfaceRef, contentKey])

}
