import test from 'node:test'
import assert from 'node:assert/strict'
import { contain, collectionModalLayout } from '../src/lib/collection-modal-layout.ts'

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-6, `${a} != ${b}`)

test('wide and tall artifacts retain proportions and stay centered inside their media area', () => {
  const box = { left: 24, top: 40, width: 480, height: 320 }
  for (const aspect of [.25, .7, 1, 2, 4]) {
    const image = contain(box, aspect)
    near(image.width / image.height, aspect)
    near(image.left + image.width / 2, box.left + box.width / 2)
    near(image.top + image.height / 2, box.top + box.height / 2)
    assert.ok(image.width <= box.width && image.height <= box.height)
  }
})

test('modal fits and centers within the grid on both sides of its breakpoint and at 4K', () => {
  for (const width of [800, 1100, 1101, 1600, 3200]) {
    const bounds = { left: 40, top: 80, width, height: 700 }
    for (const aspect of [.25, 1, 3]) {
      const { panel, image } = collectionModalLayout(bounds, width + 80, aspect)
      near(panel.left + panel.width / 2, bounds.left + bounds.width / 2)
      near(panel.top + panel.height / 2, bounds.top + bounds.height / 2)
      assert.ok(panel.width <= bounds.width && panel.height <= bounds.height)
      assert.ok(image.left > panel.left && image.top > panel.top)
      assert.ok(image.left + image.width < panel.left + panel.width * .45)
      assert.ok(image.top + image.height < panel.top + panel.height)
      near(image.width / image.height, aspect)
    }
  }
})
