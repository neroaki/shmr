export type Box = { left: number; top: number; width: number; height: number }

export function contain(box: Box, aspect: number): Box {
  const width = Math.min(box.width, box.height * aspect)
  const height = width / aspect
  return { left: box.left + (box.width - width) / 2, top: box.top + (box.height - height) / 2, width, height }
}

export function transformBetween(from: Box, to: Box) {
  return `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`
}

export function clipToBox(box: Box, container: Box) {
  return `inset(${box.top - container.top}px ${container.left + container.width - box.left - box.width}px ${container.top + container.height - box.top - box.height}px ${box.left - container.left}px)`
}

// Existing art direction: centered panel, 45% media column, 80% image inset.
// Narrow grids use more of the available area without changing artifact proportions.
export function collectionModalLayout(bounds: Box, viewportWidth: number, aspect: number) {
  const narrow = bounds.width <= 1100
  const panel = {
    left: bounds.left + bounds.width * (narrow ? .03 : .148),
    top: bounds.top + bounds.height * (narrow ? 0 : .164),
    width: bounds.width * (narrow ? .94 : .704),
    height: bounds.height * (narrow ? 1 : .672),
  }
  const padding = Math.min(60, Math.max(18, viewportWidth * .018))
  const mediaWidth = panel.width * .45
  const width = Math.max(1, mediaWidth - 2 * padding) * .8
  const height = Math.max(1, panel.height - 2 * padding) * .8
  const image = contain({
    left: panel.left + (mediaWidth - width) / 2,
    top: panel.top + (panel.height - height) / 2,
    width, height,
  }, aspect)
  return { panel, image }
}
