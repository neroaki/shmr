// Positions come from the loaded font, so the same composition works at desktop and 4K.
export const HERO_TITLE_DURATION = 3100
const REORDER = 1900
const INSERT = 2450
const smooth = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)

export function animateHeroTitle(title: HTMLElement): Animation[] {
  const words = ['seoul', 'of', 'history'].map(name => title.querySelector<HTMLElement>(`[data-hero-word="${name}"]`)!)
  const [seoul, of, history] = words.map(word => word.getBoundingClientRect())
  const box = title.getBoundingClientRect()
  const gap = parseFloat(getComputedStyle(title).columnGap)
  const fontSize = parseFloat(getComputedStyle(title).fontSize)
  const sentenceWidth = seoul.width + of.width + history.width + gap * 2
  const left = box.left + (box.width - sentenceWidth) / 2
  // First: History of Seoul, centered without an invisible Museum-sized hole.
  const first = [left + history.width + gap + of.width + gap - seoul.left,
    left + history.width + gap - of.left, left - history.left]
  // Then: Seoul of History, with Seoul already at its final anchor.
  const compact = [0, seoul.right + gap - of.left, seoul.right + gap + of.width + gap - history.left]
  const animations: Animation[] = []
  words.forEach((word, index) => {
    const frames: Keyframe[] = [
      { transform: `translate(${first[index]}px, 0)`, opacity: 1, offset: 0 },
      { transform: `translate(${first[index]}px, 0)`, opacity: 1, offset: REORDER / HERO_TITLE_DURATION },
    ]
    // Sample a continuous arc: Seoul passes above, the other words pass below.
    for (let step = 1; step <= 36; step++) {
      const t = step / 36
      const p = smooth(t)
      const x = first[index] + (compact[index] - first[index]) * p
      const y = Math.sin(Math.PI * p) * fontSize * (index === 0 ? -.65 : .24)
      // Let the small connector recede while the two large words cross its lane.
      const opacity = index === 1 ? smooth(Math.max(0, 1 - Math.min(p, 1 - p) / .12)) : 1
      frames.push({ transform: `translate(${x}px, ${y}px)`, opacity, offset: (REORDER + (INSERT - REORDER) * t) / HERO_TITLE_DURATION })
    }
    for (let step = 1; step <= 36; step++) {
      const t = step / 36
      frames.push({ transform: `translate(${compact[index] * (1 - smooth(t))}px, 0)`, opacity: 1, offset: (INSERT + (HERO_TITLE_DURATION - INSERT) * t) / HERO_TITLE_DURATION })
    }
    animations.push(word.animate(frames, { duration: HERO_TITLE_DURATION, fill: 'both', easing: 'linear' }))
    animations.push(word.querySelector('.hero-word-ink')!.animate([
      { opacity: 0, transform: 'translateY(.12em)', clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0)' },
    ], { duration: 400, delay: [1280, 1150, 1000][index], fill: 'both', easing: 'cubic-bezier(.22,1,.36,1)' }))
  })
  const museum = title.querySelector<HTMLElement>('.hero-title-highlight')!
  const museumBox = museum.getBoundingClientRect()
  const highlightFrames: Keyframe[] = []
  for (let step = 0; step <= 60; step++) {
    const t = step / 60
    highlightFrames.push({ clipPath: `inset(0 ${(1 - smooth(t)) * 100}% 0 0)`, offset: t })
  }
  animations.push(museum.animate(highlightFrames, { duration: HERO_TITLE_DURATION - INSERT, delay: INSERT, fill: 'both', easing: 'linear' }))
  museum.querySelectorAll<HTMLElement>('.hero-museum-letter').forEach(letter => {
    const rect = letter.getBoundingClientRect()
    const start = rect.left - museumBox.left
    const frames: Keyframe[] = []
    // Letters reveal independently while one continuous background opens beneath them.
    for (let step = 0; step <= 60; step++) {
      const t = step / 60
      const front = smooth(t) * museumBox.width
      const visible = Math.min(1, Math.max(0, (front - start) / rect.width))
      frames.push({ clipPath: `inset(0 ${(1 - visible) * 100}% 0 0)`, offset: t })
    }
    animations.push(letter.animate(frames, { duration: HERO_TITLE_DURATION - INSERT, delay: INSERT, fill: 'both', easing: 'linear' }))
  })
  return animations
}
