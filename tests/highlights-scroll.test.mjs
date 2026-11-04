import test from 'node:test'
import assert from 'node:assert/strict'
import { createHighlightsScroll } from '../src/lib/highlights-scroll.ts'

test('empty or collapsed rails produce finite, stationary positions', () => {
  for (const distance of [0, -1]) {
    const scroll = createHighlightsScroll(distance, 900)
    assert.equal(scroll.travel, 0)
    for (const position of [-100, 0, 500]) {
      assert.deepEqual(scroll.at(position), { left: 0, offset: 0 })
      assert.equal(scroll.positionFor(position), 0)
    }
  }
})

test('scroll remains monotonic and bounded across desktop rail sizes', () => {
  for (const distance of [1, 100, 2500, 12000]) {
    for (const height of [720, 1080, 2160]) {
      const scroll = createHighlightsScroll(distance, height)
      let previous = 0
      for (let step = 0; step <= 200; step++) {
        const { left, offset } = scroll.at(scroll.travel * step / 200)
        assert.ok(left >= previous && left <= distance)
        assert.equal(offset, 0)
        previous = left
      }
      assert.equal(scroll.at(-100).left, 0)
      assert.equal(scroll.at(scroll.travel + 100).left, distance)
    }
  }
})

test('navigation targets map back to the exact horizontal panel position', () => {
  for (const distance of [100, 2500, 12000]) {
    const scroll = createHighlightsScroll(distance, 1080)
    for (let step = 0; step <= 100; step++) {
      const target = distance * step / 100
      assert.ok(Math.abs(scroll.at(scroll.positionFor(target)).left - target) < 1e-6)
    }
    assert.equal(scroll.positionFor(-1), 0)
    assert.equal(scroll.positionFor(distance + 1), scroll.horizontalEnd)
  }
})

test('the final panel holds its position during the vertical handoff', () => {
  const scroll = createHighlightsScroll(2500, 1080)
  assert.ok(scroll.travel > scroll.horizontalEnd)
  assert.equal(scroll.at(scroll.horizontalEnd).left, 2500)
  assert.equal(scroll.at(scroll.travel).left, 2500)
  const arrival = scroll.at(scroll.horizontalEnd).left - scroll.at(scroll.horizontalEnd - 1).left
  assert.ok(arrival < 0.01, 'horizontal movement should ease to rest')
})
