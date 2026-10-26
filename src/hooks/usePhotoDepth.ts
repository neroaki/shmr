import { useEffect, useRef } from 'react'

export function usePhotoDepth(disabled: boolean) {
  const mediaRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = mediaRef.current
    if (!media) return
    const permitted = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let previousTime = 0
    let x = 0, y = 0, targetX = 0, targetY = 0
    const paint = () => {
      media.style.setProperty('--photo-x', `${x.toFixed(3)}px`)
      media.style.setProperty('--photo-y', `${y.toFixed(3)}px`)
    }
    const tick = (time: number) => {
      const elapsed = previousTime ? Math.min(50, time - previousTime) : 16.67
      previousTime = time
      const blend = 1 - Math.exp(-elapsed / 140)
      x += (targetX - x) * blend
      y += (targetY - y) * blend
      if (Math.abs(targetX - x) + Math.abs(targetY - y) < .03) {
        x = targetX; y = targetY; frame = 0; previousTime = 0
      } else frame = requestAnimationFrame(tick)
      paint()
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(tick) }
    const reset = () => { targetX = 0; targetY = 0; schedule() }
    const move = (event: PointerEvent) => {
      if (disabled || !permitted.matches || event.pointerType !== 'mouse') return
      const bounds = media.getBoundingClientRect()
      targetX = (Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)) * 2 - 1) * Math.min(18, bounds.width * .015)
      targetY = (Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height)) * 2 - 1) * Math.min(12, bounds.height * .015)
      schedule()
    }
    const resetImmediately = () => {
      cancelAnimationFrame(frame); frame = 0; previousTime = 0
      x = 0; y = 0; targetX = 0; targetY = 0; paint()
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) resetImmediately()
    })
    observer.observe(media)
    media.addEventListener('pointermove', move)
    media.addEventListener('pointerleave', reset)
    permitted.addEventListener('change', resetImmediately)
    window.addEventListener('resize', resetImmediately)
    return () => {
      resetImmediately()
      observer.disconnect()
      media.removeEventListener('pointermove', move)
      media.removeEventListener('pointerleave', reset)
      permitted.removeEventListener('change', resetImmediately)
      window.removeEventListener('resize', resetImmediately)
    }
  }, [disabled])
  return mediaRef
}
