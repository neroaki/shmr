import { useEffect, type RefObject } from 'react'

export function useProgrammeHeading(sectionRef: RefObject<HTMLElement | null>, headingRef: RefObject<HTMLHeadingElement | null>) {
  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    if (!section || !heading) return
    const words = Array.from(heading.querySelectorAll<HTMLElement>('[data-title-part]'))
    const dot = heading.querySelector<HTMLElement>('[data-title-dot]')
    const roll = section.querySelector<HTMLElement>('.programme-gallery')
    if (!dot || !roll) return
    const letters = words.map(word => Array.from(word.querySelectorAll<HTMLElement>('[data-title-letter]')))
    const header = document.querySelector<HTMLElement>('.site-header')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let lastTime = 0
    let current = 0
    let initialized = false

    let measureNeeded = true
    let geometry: { startX: number; endX: number; endY: number }[][] = []
    const smoothstep = (value: number) => {
      const p = Math.min(1, Math.max(0, value))
      return p * p * (3 - 2 * p)
    }
    const measure = () => {
      const headingBox = heading.getBoundingClientRect()
      const contentBox = roll.getBoundingClientRect()
      const sectionBox = section.getBoundingClientRect()
      const sectionStyle = getComputedStyle(section)
      const innerLeft = sectionBox.left + parseFloat(sectionStyle.paddingLeft)
      const innerRight = sectionBox.right - parseFloat(sectionStyle.paddingRight)
      const size = parseFloat(getComputedStyle(heading).fontSize)
      const axes = [
        (innerLeft + contentBox.left) / 2 - headingBox.left,
        (contentBox.right + innerRight) / 2 - headingBox.left,
      ]
      geometry = letters.map((group, side) => {
        let startX = words[side].getBoundingClientRect().left - headingBox.left
        return group.map((letter, index) => {
          const width = letter.getBoundingClientRect().width
          const scene = section.querySelector<HTMLElement>('.programme-scene')!
          const railTop = Math.max(0, (scene.clientHeight - size * 4.48) / 2 - headingBox.top + scene.getBoundingClientRect().top)
          const point = { startX, endX: axes[side] - width / 2, endY: railTop + index * size * 1.12 }
          startX += width
          return point
        })
      })
      measureNeeded = false
    }

    const update = (time: number) => {
      frame = 0
      const headerHeight = header?.getBoundingClientRect().height ?? 54
      section.style.setProperty('--programme-header-height', `${headerHeight}px`)
      if (measureNeeded) measure()
      const distance = Math.min(420, window.innerHeight * 0.46)
      const progress = window.innerWidth <= 900 ? 0 : reducedMotion.matches ? 1 : Math.min(1, Math.max(0,
        (headerHeight - section.getBoundingClientRect().top) / distance,
      ))
      const target = 1 - (1 - progress) ** 2
      // Time-based damping preserves a short, soft follow-through at any refresh rate.
      // Stop requesting frames once settled; no idle animation or scroll interception.
      const elapsed = lastTime ? Math.min(64, time - lastTime) : 16.67
      lastTime = time
      const outside = section.getBoundingClientRect().bottom <= headerHeight
        || section.getBoundingClientRect().top >= window.innerHeight
      if (!initialized || reducedMotion.matches || outside) current = target
      else current += (target - current) * (1 - Math.exp(-elapsed / 170))
      initialized = true
      const settled = Math.abs(target - current) < 0.0002
      if (settled) current = target
      // One damped progress drives all eight upright glyphs; no independent drift.
      const travel = smoothstep(current / 0.65)
      const fold = smoothstep((current - 0.55) / 0.45)
      letters.forEach((group, side) => group.forEach((letter, index) => {
        const point = geometry[side][index]
        // Move the word as a group first, then fold the letters onto a vertical axis.
        const groupStart = geometry[side][0].startX
        const groupWidth = words[side].offsetWidth
        const wordShift = point.endX + letter.offsetWidth / 2 - (groupStart + groupWidth / 2)
        const localShift = (groupStart + groupWidth / 2) - (point.startX + letter.offsetWidth / 2)
        letter.style.transform = `translate3d(${wordShift * travel + localShift * fold}px, ${point.endY * fold}px, 0)`
      }))
      dot.style.opacity = String(1 - smoothstep(current / 0.45))
      if (!settled) frame = requestAnimationFrame(update)
      else lastTime = 0
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const invalidate = () => { measureNeeded = true; schedule() }
    const observer = new ResizeObserver(invalidate)
    observer.observe(heading)
    observer.observe(roll)
    if (header) observer.observe(header)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', invalidate)
    reducedMotion.addEventListener('change', schedule)
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) invalidate() })
    update(performance.now())
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', invalidate)
      reducedMotion.removeEventListener('change', schedule)
    }
  }, [sectionRef, headingRef])

}
