// Keep the dialog in its card's layout/animation context. A viewport-level dim
// follows its four projected corners, so sticky/3D ancestors cannot clip it.
export function mountInlineModalBackdrop(surface: HTMLElement) {
  const backdrop = document.createElement('div')
  backdrop.className = 'inline-modal-backdrop'
  backdrop.setAttribute('aria-hidden', 'true')
  const corners = ['0 0 auto auto', 'auto 0 0 auto', 'auto auto 0 0', '0 auto auto 0'].map((inset) => {
    const corner = document.createElement('span')
    corner.className = 'inline-modal-corner'
    corner.style.inset = inset
    surface.append(corner)
    return corner
  })
  let frame = 0
  let previousPath = ''
  const update = () => {
    const points = corners.map((corner) => {
      const { x, y } = corner.getBoundingClientRect()
      return `${x}px ${y}px`
    })
    const path = `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${points.join(', ')}, ${points[0]})`
    if (path !== previousPath) {
      backdrop.style.clipPath = path
      previousPath = path
    }
    frame = requestAnimationFrame(update)
  }
  update()
  document.body.append(backdrop)
  const fade = backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, fill: 'forwards' })
  return () => {
    fade.cancel()
    const exit = backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: 'forwards' })
    const cleanup = () => {
      cancelAnimationFrame(frame)
      corners.forEach((corner) => corner.remove())
      backdrop.remove()
    }
    void exit.finished.then(cleanup, cleanup)
  }
}
