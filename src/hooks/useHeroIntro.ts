import { useLayoutEffect, type RefObject } from 'react'

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
    const finish = () => {
      running = false
      root.dataset.intro = 'settled'
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
      const text = title.getBoundingClientRect()
      const shift = innerHeight * .51 - (text.top + text.height / 2)
      const ease = 'cubic-bezier(.65, 0, .2, 1)'
      const animate = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
        const animation = element.animate(frames, { fill: 'both', ...options })
        animations.push(animation)
        return animation
      }
      Object.assign(photo.style, { position: 'fixed', inset: 'auto', left: '0px', top: '0px', width: `${innerWidth}px`, height: `${innerHeight}px`, zIndex: '2' })
      root.dataset.intro = 'playing'
      // A slow image push precedes the retreat; the typography stays on a separate plane.
      animate(image, [{ transform: 'scale(1.09)' }, { transform: 'scale(1.025)', offset: .46 }, { transform: 'scale(1)' }], { duration: 4300, easing: 'cubic-bezier(.25,.1,.25,1)' })
      animate(photo, [
        { left: '0px', top: '0px', width: `${innerWidth}px`, height: `${innerHeight}px` },
        { left: `${target.left}px`, top: `${target.top}px`, width: `${target.width}px`, height: `${target.height}px` },
      ], { duration: 2200, delay: 2100, easing: ease })
      animate(title, [
        { transform: `translateY(${shift}px) scale(.74)`, color: '#fdfaf2' },
        { transform: 'translateY(0) scale(1)', color: '#fdfaf2' },
      ], { duration: 2200, delay: 2100, easing: ease })
      Array.from(title.children).forEach((word, index) => {
        animate(word, [
          { opacity: 0, transform: 'translateY(.22em)', filter: 'blur(5px)' },
          { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
        ], { duration: 1250, delay: 500 + index * 95, easing: 'cubic-bezier(.22,1,.36,1)' })
      })
      animate(root.querySelector('.hero-photo-shade')!, [{ opacity: .33 }, { opacity: 0 }], { duration: 1900, delay: 2250, easing: ease })
      const end = animate(root.querySelector('.hero-title-highlight-inverse')!, [
        { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)' },
      ], { duration: 600, delay: 4350, easing: 'cubic-bezier(.4,0,.2,1)' })
      root.querySelectorAll('.hero-meta, .hero-notes, .hero-baseline').forEach(element => {
        animate(element, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, delay: 4300, easing: 'cubic-bezier(.22,1,.36,1)' })
      })
      // All supporting copy has settled after 5s; cancellation never queues a stale replay.
      const last = animations.at(-1) ?? end
      void last.finished.then(() => { if (alive && running) finish() }).catch(() => {})
    }
    const onScroll = () => {
      const bounds = root.getBoundingClientRect()
      if (running && Math.abs(bounds.top) > 64) finish()
      if (bounds.bottom <= 0) armed = true
      if (armed && bounds.top >= -2 && bounds.top < 40) play()
    }
    const interrupt = () => { if (running) finish() }
    const onKey = (event: KeyboardEvent) => {
      if (['Tab', 'Escape', 'PageDown', 'ArrowDown', 'End', ' '].includes(event.key)) interrupt()
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
    window.addEventListener('wheel', interrupt, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', interrupt)
    reduced.addEventListener('change', interrupt)
    return () => {
      alive = false
      observer?.disconnect()
      finish()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', interrupt)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', interrupt)
      reduced.removeEventListener('change', interrupt)
    }
  }, [ref])
}
