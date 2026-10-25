import type Lenis from 'lenis'

// Only finish a nearly completed arrival. Never pull back across a boundary,
// snap between horizontal objects, or hold an ongoing wheel/touch gesture.
export function installSectionSettle(controller: Lenis) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let timer = 0
  let direction = 0
  let armed = false
  let settling = false

  const cancel = () => {
    clearTimeout(timer)
    armed = false
    if (settling) {
      settling = false
      controller.scrollTo(controller.animatedScroll, { immediate: true })
    }
  }
  const settle = () => {
    if (!armed || reduced.matches || document.hidden) return
    if (Math.abs(controller.velocity) > .2 || Math.abs(controller.targetScroll - controller.animatedScroll) > 1) {
      timer = window.setTimeout(settle, 80)
      return
    }
    armed = false
    const header = document.querySelector<HTMLElement>('.site-header')
    const top = header?.getBoundingClientRect().height ?? 0
    const viewport = innerHeight - top
    const radius = Math.min(48, viewport * .065)
    const position = controller.animatedScroll
    const boundaries = ['#featured .highlights-sequence', '#exhibitions', '#collection', '#about']
      .flatMap(selector => {
        const section = document.querySelector<HTMLElement>(selector)
        if (!section) return []
        const start = section.getBoundingClientRect().top + scrollY - top
        const end = section.dataset.scrollEnd
        return end === undefined
          ? [start, start + Math.max(0, section.offsetHeight - viewport)]
          : [start, start + Number(end)]
      })
    const target = boundaries
      .filter(point => (point - position) * direction > 1 && Math.abs(point - position) <= radius)
      .sort((a, b) => Math.abs(a - position) - Math.abs(b - position))[0]
    if (target === undefined) return
    settling = true
    controller.scrollTo(target, {
      duration: .32,
      easing: t => 1 - (1 - t) ** 3,
      onComplete: () => { settling = false },
    })
  }
  const schedule = () => {
    clearTimeout(timer)
    if (armed) timer = window.setTimeout(settle, 180)
  }
  const wheel = (event: WheelEvent) => {
    cancel()
    if (event.ctrlKey || reduced.matches || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return
    // Leave scrollable descriptions and open information panels to native scrolling.
    if (event.composedPath().some(node => node instanceof HTMLElement
      && node !== document.body && node !== document.documentElement
      && node.scrollHeight > node.clientHeight + 1
      && /auto|scroll/.test(getComputedStyle(node).overflowY))) return
    direction = Math.sign(event.deltaY)
    armed = true
    schedule()
  }
  const key = (event: KeyboardEvent) => {
    cancel()
    if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable="true"], button, a')) return
    if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(event.key)) return
    direction = ['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey) ? -1 : 1
    armed = true
    schedule()
  }
  // Capture lets a fresh input interrupt the correction before Lenis consumes it.
  window.addEventListener('wheel', wheel, { passive: true, capture: true })
  window.addEventListener('keydown', key, true)
  window.addEventListener('pointerdown', cancel, true)
  window.addEventListener('touchstart', cancel, { passive: true, capture: true })
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', cancel)
  reduced.addEventListener('change', cancel)
  return {
    cancel,
    destroy() {
      cancel()
      window.removeEventListener('wheel', wheel, true)
      window.removeEventListener('keydown', key, true)
      window.removeEventListener('pointerdown', cancel, true)
      window.removeEventListener('touchstart', cancel, true)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', cancel)
      reduced.removeEventListener('change', cancel)
    },
  }
}
