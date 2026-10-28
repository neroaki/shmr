import { useLayoutEffect, useRef, type RefObject, type KeyboardEvent } from 'react'
import { lockPageScroll } from '../lib/page-scroll'

// Shared modal scope; background remains inert while outside clicks dismiss safely.
export function useInlineCardDialog(active: boolean, detailRef: RefObject<HTMLDivElement | null>, closeRef: RefObject<HTMLButtonElement | null>, onClose: () => void) {
  const dismiss = useRef(onClose)
  useLayoutEffect(() => { dismiss.current = onClose }, [onClose])
  useLayoutEffect(() => {
    if (!active) return
    const card = detailRef.current!.closest<HTMLElement>('[data-inline-card]')!
    const trigger = card.querySelector<HTMLButtonElement>('[data-card-trigger]')!
    const unlock = lockPageScroll()
    const previous: { element: HTMLElement; inert: boolean }[] = []
    let branch: HTMLElement = card
    while (branch.parentElement && branch !== document.body) {
      for (const sibling of branch.parentElement.children) {
        if (sibling !== branch && sibling instanceof HTMLElement) {
          previous.push({ element: sibling, inert: sibling.inert })
          sibling.inert = true
        }
      }
      branch = branch.parentElement
    }
    // Start at the content heading, without painting a button focus ring on entry.
    // Keyboard navigation still exposes the normal focus-visible control outline.
    const heading = detailRef.current?.querySelector<HTMLElement>('[data-dialog-heading]')
    ;(heading ?? closeRef.current)?.focus({ preventScroll: true })
    let outsidePress = false
    const outside = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
    }
    const down = (event: PointerEvent) => { outsidePress = event.button === 0 && outside(event) }
    const click = (event: MouseEvent) => {
      if (outsidePress && outside(event)) {
        // Consume the entire dismissal click; links behind the card must not activate.
        event.preventDefault()
        event.stopImmediatePropagation()
        dismiss.current()
      }
      outsidePress = false
    }
    const keydown = (event: WindowEventMap['keydown']) => {
      if (event.key !== 'Escape' || event.isComposing) return
      event.preventDefault()
      event.stopImmediatePropagation()
      dismiss.current()
    }
    document.addEventListener('keydown', keydown, true)
    document.addEventListener('pointerdown', down, true)
    document.addEventListener('click', click, true)
    return () => {
      document.removeEventListener('keydown', keydown, true)
      document.removeEventListener('pointerdown', down, true)
      document.removeEventListener('click', click, true)
      previous.forEach(({ element, inert }) => { element.inert = inert })
      unlock()
      // React re-enables the trigger during the closing commit, after layout cleanup.
      requestAnimationFrame(() => {
        if (trigger.isConnected && !document.querySelector('[aria-modal="true"]')) trigger.focus({ preventScroll: true })
      })
    }
  }, [active, closeRef, detailRef])
}

export function containCardFocus(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== 'Tab') return
  const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]'))
  const first = controls[0]
  const last = controls.at(-1)
  if (!controls.includes(document.activeElement as HTMLElement)) {
    event.preventDefault()
    ;(event.shiftKey ? last : first)?.focus()
  }
  else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}
