import { useLayoutEffect, type RefObject } from 'react'
import { lockPageScroll } from '../lib/page-scroll'
import { animateHeroTitle } from '../lib/hero-title-motion'

// One photograph and one heading travel continuously into their resting layout.
export function useHeroIntro(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = ref.current!
    const photo = root.querySelector<HTMLElement>('.hero-photo')!
    const image = photo.querySelector('img')!
    const slot = root.querySelector<HTMLElement>('.hero-photo-slot')!
    const title = root.querySelector<HTMLElement>('.hero-title')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    // Strict Mode re-runs the effect: keep the loading frame full-bleed too.
    root.dataset.intro = 'preparing'
    let alive = true
    let running = false
    let armed = true
    let loaded = false
    let animations: Animation[] = []
    let observer: IntersectionObserver | undefined
    let unlock: (() => void) | undefined
    let dockTimer = 0
    const releaseScroll = () => {
      clearTimeout(dockTimer)
      const release = unlock
      unlock = undefined
      release?.()
    }
    const finish = () => {
      running = false
      root.dataset.intro = 'settled'
      releaseScroll()
      animations.forEach(animation => animation.cancel())
      animations = []
      photo.removeAttribute('style')
      title.removeAttribute('style')
    }
    const play = () => {
      if (!loaded || !armed || running) return
      armed = false
      if (reduced.matches) { finish(); return }
      running = true
      root.dataset.intro = 'preparing'
      const target = slot.getBoundingClientRect()
      const ease = 'cubic-bezier(.45, 0, .2, 1)'
      unlock = lockPageScroll()
      const animate = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
        const animation = element.animate(frames, { fill: 'both', ...options })
        animations.push(animation)
        return animation
      }
      Object.assign(photo.style, { position: 'fixed', inset: 'auto', left: '0px', top: '0px', width: `${innerWidth}px`, height: `${innerHeight}px`, zIndex: '2' })
      root.dataset.intro = 'playing'
      // A slow image push precedes the retreat; the typography stays on a separate plane.
      animate(image, [{ transform: 'scale(1.09)' }, { transform: 'scale(1.025)', offset: .46 }, { transform: 'scale(1)' }], { duration: 1600, easing: 'cubic-bezier(.25,.1,.25,1)' })
      animate(photo, [
        { left: '0px', top: '0px', width: `${innerWidth}px`, height: `${innerHeight}px` },
        { left: `${target.left}px`, top: `${target.top}px`, width: `${target.width}px`, height: `${target.height}px` },
      ], { duration: 1300, delay: 300, easing: ease })
      animate(root.querySelector('.hero-photo-shade')!, [{ opacity: .33 }, { opacity: 0 }], { duration: 1200, delay: 350, easing: ease })
      // Return the photograph to document flow before scrolling becomes available.
      const travel = [...animations]
      const dock = () => {
        if (!alive || !running || !unlock) return
        travel.forEach(animation => animation.cancel())
        photo.removeAttribute('style')
        title.removeAttribute('style')
        root.dataset.intro = 'revealing'
        releaseScroll()
      }
      dockTimer = window.setTimeout(dock, 1600)
      const titleMotion = animateHeroTitle(title)
      animations.push(...titleMotion)
      root.querySelectorAll('.hero-meta, .hero-notes, .hero-brand').forEach(element => {
        animate(element, element.classList.contains('hero-brand') ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600, delay: 1600, easing: 'cubic-bezier(.22,1,.36,1)' })
      })
      // The photo releases scrolling at 1.6s; the typography finishes independently.
      const last = titleMotion.at(-1)!
      void last.finished.then(() => { if (alive && running) finish() }).catch(() => {})
    }
    const onScroll = () => {
      const bounds = root.getBoundingClientRect()
      if (running && !unlock && bounds.bottom <= 0) finish()
      if (bounds.bottom <= 0) armed = true
      if (armed && bounds.top >= -2 && bounds.top < 40) play()
    }
    const interrupt = () => { if (running) finish() }
    const onKey = (event: KeyboardEvent) => {
      if (['Tab', 'Escape'].includes(event.key)) interrupt()
      else if (unlock && ['PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End', ' '].includes(event.key)) event.preventDefault()
    }
    void Promise.allSettled([document.fonts.ready, image.decode()]).then(() => {
      if (!alive) return
      loaded = true
      const rect = root.getBoundingClientRect()
      if (rect.top >= -2 && rect.top < 40) play()
      else finish()
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) armed = true
        onScroll()
      }, { threshold: [0, .95] })
      observer.observe(root)
    })
    window.addEventListener('scroll', onScroll, { passive: true })
    const onNavigate = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a')) interrupt()
    }
    const onVisibility = () => { if (document.hidden) interrupt() }
    window.addEventListener('click', onNavigate, true)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', interrupt)
    reduced.addEventListener('change', interrupt)
    return () => {
      alive = false
      observer?.disconnect()
      finish()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', onNavigate, true)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', interrupt)
      reduced.removeEventListener('change', interrupt)
    }
  }, [ref])
}
