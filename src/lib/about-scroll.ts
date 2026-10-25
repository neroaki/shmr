// A short sticky reading distance, not a blank approach zone.
export function createAboutScroll(viewportHeight: number, reduced = false) {
  const travel = reduced ? 0 : Math.min(112, viewportHeight * .16)
  return { travel, anchor: travel / 2 }
}
