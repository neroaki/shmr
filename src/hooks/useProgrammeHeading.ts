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

    const splitScale = .78
    let measureNeeded = true
    let geometry: { startX: number; endX: number; endY: number; rowY: number }[][] = []
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
      const clusterInset = contentBox.width * .11
      const axes = [
        (innerLeft + contentBox.left + clusterInset) / 2 - headingBox.left,
        (contentBox.right - clusterInset + innerRight) / 2 - headingBox.left,
      ]
      geometry = letters.map((group, side) => {
        const scene = section.querySelector<HTMLElement>('.programme-scene')!
        const railTop = (scene.clientHeight - size * 2.24 * splitScale) / 2
          - (headingBox.top - scene.getBoundingClientRect().top)
        return group.map((letter, index) => {
          const rowStart = Math.floor(index / 2) * 2
          const rowWidth = group[rowStart].offsetWidth + group[rowStart + 1].offsetWidth
          const localX = index % 2 ? group[rowStart].offsetWidth : 0
          return {
            startX: words[side].offsetLeft + letter.offsetLeft,
            endX: axes[side] - rowWidth * splitScale / 2 + localX * splitScale,
            endY: railTop,
            rowY: Math.floor(index / 2) * size * 1.12 * splitScale,
          }
        })
      })
      measureNeeded = false
    }

    const update = (time: number) => {
      frame = 0
      const headerHeight = header?.getBoundingClientRect().height ?? 54
      section.style.setProperty('--programme-header-height', `${headerHeight}px`)
      if (measureNeeded) measure()
      const sectionBox = section.getBoundingClientRect()
      // Use the approach to the viewport, not the extra scroll distance inside the
      // pinned section. Even a slow arrival has already unfolded the heading.
      const viewport = window.innerHeight - headerHeight
      const entryStart = headerHeight + viewport * .78
      const entryEnd = headerHeight + viewport * .12
      const target = window.innerWidth > 900
        ? Math.min(1, Math.max(0, (entryStart - sectionBox.top) / (entryStart - entryEnd)))
        : 0
      // A longer, time-based follow-through softens fast wheel and menu navigation.
      // Stop requesting frames once settled; no idle animation or scroll interception.
      const elapsed = lastTime ? Math.min(64, time - lastTime) : 16.67
      lastTime = time
      const outside = sectionBox.bottom <= headerHeight || sectionBox.top >= window.innerHeight
      if (reducedMotion.matches || outside) current = target
      else current += (target - current) * (1 - Math.exp(-elapsed / 340))
      const settled = Math.abs(target - current) < 0.0002
      if (settled) current = target
      // The same reversible progress forms two compact rows and scales them to 78%.
      const travel = smoothstep(current)
      const fold = smoothstep((current - .15) / .85)
      // Give the lower pair vertical room before compressing it into two columns.
      const row = smoothstep(current / .45)
      letters.forEach((group, side) => group.forEach((letter, index) => {
        const point = geometry[side][index]
        letter.style.transform = `translate3d(${(point.endX - point.startX) * travel}px, ${point.endY * fold + point.rowY * row}px, 0) scale(${1 - (1 - splitScale) * travel})`
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
