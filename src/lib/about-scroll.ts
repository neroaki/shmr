// Keep the full-screen scene in view long enough to read before either exit.
export function createAboutScroll(viewportHeight: number, reduced = false) {
  const travel = reduced ? 0 : Math.min(340, Math.max(200, viewportHeight * .3))
  return { travel, anchor: travel / 2 }
}

// Wheel distance changes continuously near both edges, with no scroll lock.
export function aboutWheelFactor(position: number, start: number, end: number, approach: number) {
  if (position >= start && position <= end) return .56
  const distance = position < start ? start - position : position - end
  const progress = Math.min(1, distance / approach)
  const eased = progress * progress * (3 - 2 * progress)
  return .56 + .44 * eased
}
