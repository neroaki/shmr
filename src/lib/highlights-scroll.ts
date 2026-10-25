// Scroll distances, not timeouts: every input continues to move the scene.
export function createHighlightsScroll(distance: number, viewportHeight: number) {
  const soften = Math.min(distance, Math.max(160, Math.min(280, viewportHeight * 0.28)))
  const linearEnd = distance - soften / 2
  const horizontalEnd = distance + soften / 2
  const travel = horizontalEnd + Math.min(96, viewportHeight * 0.12)

  return {
    travel,
    horizontalEnd,
    soften,
    at(position: number) {
      const progress = Math.max(0, position)
      const u = Math.max(0, Math.min(1, (progress - linearEnd) / soften))
      const left = progress <= linearEnd
        ? progress
        : linearEnd + soften * (u - u * u / 2)
      return {
        left: Math.min(distance, left),
        // Keep the scene attached to its wrapper. A short pinned tail gives the
        // last object breathing room without opening a gap before the next scene.
        offset: 0,
      }
    },
    positionFor(left: number) {
      const target = Math.max(0, Math.min(distance, left))
      return target <= linearEnd
        ? target
        : linearEnd + soften * (1 - Math.sqrt(Math.max(0, 1 - 2 * (target - linearEnd) / soften)))
    },
  }
}
