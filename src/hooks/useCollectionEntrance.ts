import { useEffect, type RefObject } from 'react'

// Recheck actual geometry at activation time, not just the completed entrance state.
export function isCollectionAligned(scene: HTMLElement | null) {
  if (!scene) return false
  const header = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 54
  const rect = scene.getBoundingClientRect()
  return Math.abs(rect.top - header) <= 3 && Math.abs(rect.bottom - innerHeight) <= 3
}

// One 800ms entrance for the complete composition, without locking page scroll.
// Card interaction requires both visual completion and actual section alignment.
export function useCollectionEntrance(sceneRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const scene = sceneRef.current!
    const section = scene.closest<HTMLElement>('.archive')!
    const grid = scene.querySelector<HTMLElement>('.archive-grid')!
    const composition = scene.querySelector<HTMLElement>('.archive-composition')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let entered = false
    let frame = 0

    const syncInteraction = () => {
      const aligned = isCollectionAligned(scene)
      scene.dataset.aligned = String(aligned)
      grid.inert = scene.dataset.entrance !== 'ready' || !aligned
    }
    const ready = () => {
      scene.dataset.entrance = 'ready'
      syncInteraction()
    }
    const reset = () => {
      entered = false
      scene.dataset.entrance = reduced.matches ? 'ready' : 'waiting'
      syncInteraction()
    }
    const start = () => {
      entered = true
      if (reduced.matches || document.hidden) { ready(); return }
      scene.dataset.entrance = 'settling'
    }
    const inspect = () => {
      frame = 0
      const bounds = section.getBoundingClientRect()
      const header = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 54
      scene.style.setProperty('--archive-top', `${header}px`)
      syncInteraction()
      if (bounds.bottom <= 0 || bounds.top >= innerHeight) {
        if (entered && !scene.classList.contains('has-selection')) reset()
        return
      }
      const rect = scene.getBoundingClientRect()
      if (!entered && rect.top <= header + 2 && rect.bottom >= innerHeight - 2) start()
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(inspect) }
    const interrupt = () => {
      if (entered || reduced.matches) ready()
      else reset()
      schedule()
    }
    const visibility = () => { if (document.hidden && entered) ready() }

    const onSettled = (event: AnimationEvent) => {
      if (event.target === composition && event.animationName === 'archive-composition-settle' && entered) ready()
    }

    composition.addEventListener('animationend', onSettled)
    reset()
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', interrupt)
    document.addEventListener('visibilitychange', visibility)
    reduced.addEventListener('change', interrupt)
    return () => {
      cancelAnimationFrame(frame)
      composition.removeEventListener('animationend', onSettled)
      grid.inert = false
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', interrupt)
      document.removeEventListener('visibilitychange', visibility)
      reduced.removeEventListener('change', interrupt)
    }
  }, [sceneRef])
}
