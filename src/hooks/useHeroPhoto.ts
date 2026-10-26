import { useEffect, type RefObject } from 'react'

export function useHeroPhoto(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const bounds = hero.getBoundingClientRect()
      const progress = reduced.matches ? 0 : Math.max(0, Math.min(1, -bounds.top / (bounds.height * .75)))
      // Follow the already-smoothed document scroll without adding another lag.
      hero.style.setProperty('--hero-photo-scale', String(1 + progress * .14))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', schedule)
      hero.style.removeProperty('--hero-photo-scale')
    }
  }, [heroRef])
}
