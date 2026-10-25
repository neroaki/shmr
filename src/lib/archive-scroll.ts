import { createHighlightsScroll } from './highlights-scroll'

// The same attached release as the exhibit stack; no separate vertical lift.
export function createArchiveScroll(distance: number, viewportHeight: number) {
  return createHighlightsScroll(distance, viewportHeight)
}
