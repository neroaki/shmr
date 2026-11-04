import { useLayoutEffect, useRef, type RefObject } from 'react'
import { contain, transformBetween, clipToBox, collectionModalLayout, type Box } from '../lib/collection-modal-layout'

const DURATION = 800
const TEXT_REVEAL_DURATION = 220
const OPEN_EASE = 'cubic-bezier(.22, .8, .22, 1)'
const CLOSE_EASE = 'cubic-bezier(.4, 0, .2, 1)'

// Keep the final text layout stationary while shell and image move independently.
export function useCollectionModalMotion(triggerRef: RefObject<HTMLButtonElement | null>, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const textClipRef = useRef<HTMLDivElement>(null)
  const dimRef = useRef<HTMLDivElement>(null)
  const requestClose = useRef<() => void>(() => {})
  const onClosed = useRef(onClose)
  useLayoutEffect(() => { onClosed.current = onClose }, [onClose])

  useLayoutEffect(() => {
    const panel = panelRef.current!
    const shell = shellRef.current!
    const image = imageRef.current!
    const text = textRef.current!
    const textClip = textClipRef.current!
    const dim = dimRef.current!
    const trigger = triggerRef.current!
    const sourceImage = trigger.querySelector('img')!
    const grid = trigger.closest<HTMLElement>('.archive-grid')!
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animations: Animation[] = []
    let closing = false
    let resizeFrame = 0
    let finalPanel!: Box
    let finalImage!: Box

    const cancel = () => { animations.forEach(animation => animation.cancel()); animations = [] }
    const animate = (element: HTMLElement, frames: Keyframe[], easing = OPEN_EASE, timing: KeyframeAnimationOptions = {}) => {
      const animation = element.animate(frames, { duration: DURATION, easing, fill: 'both', ...timing })
      animations.push(animation)
      return animation
    }
    const source = () => ({
      panel: trigger.getBoundingClientRect(),
      image: contain(sourceImage.getBoundingClientRect(), sourceImage.naturalWidth / sourceImage.naturalHeight),
    })
    const layout = () => {
      const bounds = grid.getBoundingClientRect()
      const geometry = collectionModalLayout(bounds, window.innerWidth, sourceImage.naturalWidth / sourceImage.naturalHeight)
      finalPanel = geometry.panel
      finalImage = geometry.image
      Object.assign(panel.style, {
        left: `${finalPanel.left}px`, top: `${finalPanel.top}px`,
        width: `${finalPanel.width}px`, height: `${finalPanel.height}px`,
      })
      // Keep the existing grid-relative text inset even though the modal is portaled.
      panel.style.setProperty('--collection-detail-padding', `clamp(1.2rem, ${bounds.width * .024}px, 3.2rem)`)
      Object.assign(image.style, {
        left: `${finalImage.left - finalPanel.left}px`, top: `${finalImage.top - finalPanel.top}px`,
        width: `${finalImage.width}px`, height: `${finalImage.height}px`,
      })
    }

    const start = source()
    layout()
    panel.dataset.phase = reducedMotion ? 'open' : 'opening'
    if (!reducedMotion) {
      animate(shell, [{ transform: transformBetween(start.panel, finalPanel) }, { transform: 'none' }])
      animate(image, [{ transform: transformBetween(start.image, finalImage) }, { transform: 'none' }])
      animate(textClip, [{ clipPath: clipToBox(start.panel, finalPanel) }, { clipPath: 'inset(0px 0px 0px 0px)' }])
      // A real-time delay, not a keyframe offset on the shell's front-loaded
      // easing: the text stays hidden until both shell and image have settled.
      const reveal = animate(text, [{ opacity: 0 }, { opacity: 1 }], 'ease-in-out', {
        delay: DURATION,
        duration: TEXT_REVEAL_DURATION,
      })
      animate(dim, [{ opacity: 0 }, { opacity: 1, offset: .35 }, { opacity: 1 }], 'linear')
      reveal.onfinish = () => { if (!closing) panel.dataset.phase = 'open' }
    }

    requestClose.current = () => {
      if (closing) return
      closing = true
      panel.dataset.phase = 'closing'
      if (reducedMotion) { onClosed.current(); return }
      // Capture the currently visible pose, including interrupted openings. No
      // snap to the finished pose, and no unlock/unmount until the return finishes.
      const shellTransform = getComputedStyle(shell).transform
      const imageTransform = getComputedStyle(image).transform
      const textStyle = getComputedStyle(text)
      const textOpacity = textStyle.opacity
      const textTransform = textStyle.transform
      const textClipPath = getComputedStyle(textClip).clipPath
      const dimOpacity = getComputedStyle(dim).opacity
      const destination = source()
      cancel()
      const motion = animate(shell, [
        { transform: shellTransform }, { transform: transformBetween(destination.panel, finalPanel) },
      ], CLOSE_EASE)
      animate(image, [
        { transform: imageTransform }, { transform: transformBetween(destination.image, finalImage) },
      ], CLOSE_EASE)
      animate(textClip, [
        { clipPath: textClipPath }, { clipPath: clipToBox(destination.panel, finalPanel) },
      ], CLOSE_EASE)
      animate(text, [
        { opacity: textOpacity, transform: textTransform },
        { opacity: 0, transform: 'translateX(10px)', offset: .3 },
        { opacity: 0, transform: 'translateX(10px)' },
      ], 'ease-out')
      animate(dim, [{ opacity: dimOpacity }, { opacity: dimOpacity, offset: .65 }, { opacity: 0 }], 'linear')
      motion.onfinish = () => onClosed.current()
    }

    const resize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        if (closing) return
        cancel()
        layout()
        panel.dataset.phase = 'open'
      })
    }
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(resizeFrame)
      window.removeEventListener('resize', resize)
      cancel()
      requestClose.current = () => {}
    }
  }, [triggerRef])

  return { panelRef, shellRef, imageRef, textRef, textClipRef, dimRef, requestClose }
}
