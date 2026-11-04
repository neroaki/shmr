import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'

const HOVER_DELAY = 850
const REOPEN_COOLDOWN = 1100
const alwaysAvailable = () => true

interface Options {
  canOpen?: () => boolean
  scrollQuietTime?: number
}

// Shared intent policy: mouse dwell or explicit click opens a card; leaving never closes it.
export function useCardIntent({ canOpen = alwaysAvailable, scrollQuietTime = 0 }: Options = {}) {
  const [preview, setPreview] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pending = useRef<number | null>(null)
  const suppressed = useRef<number | null>(null)
  const opened = useRef(false)
  const lastScroll = useRef(0)
  const resumeAfter = useRef(0)

  const cancelIntent = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current)
    timer.current = null
    pending.current = null
    setPreview(null)
  }, [])

  const open = useCallback((index: number) => {
    cancelIntent()
    if (opened.current || !canOpen()) return
    opened.current = true
    setSelected(index)
  }, [canOpen, cancelIntent])

  function beginIntent(index: number, event: PointerEvent<HTMLButtonElement>) {
    if (opened.current || !canOpen() || event.pointerType !== 'mouse'
      || event.timeStamp < resumeAfter.current || event.timeStamp - lastScroll.current < scrollQuietTime
      || suppressed.current === index || pending.current === index) return
    cancelIntent()
    const button = event.currentTarget
    pending.current = index
    setPreview(index)
    timer.current = setTimeout(() => {
      if (button.matches(':hover') && pending.current === index) open(index)
      else cancelIntent()
    }, HOVER_DELAY)
  }

  function leave(index: number) {
    if (suppressed.current === index) suppressed.current = null
    if (pending.current === index) cancelIntent()
  }

  function close(index: number) {
    cancelIntent()
    resumeAfter.current = performance.now() + REOPEN_COOLDOWN
    suppressed.current = index
    opened.current = false
    setSelected(null)
  }

  useEffect(() => {
    const onScroll = (event: Event) => {
      lastScroll.current = event.timeStamp
      if (scrollQuietTime > 0 || !canOpen()) cancelIntent()
    }
    const onResize = () => { if (!canOpen()) cancelIntent() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (timer.current !== null) clearTimeout(timer.current)
    }
  }, [canOpen, cancelIntent, scrollQuietTime])

  return { preview, selected, beginIntent, leave, open, close }
}
