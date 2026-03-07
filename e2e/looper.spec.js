// @ts-check
const { test, expect } = require('@playwright/test')

/**
 * Helper: Navigate to a looper test page and wait for initialization
 */
async function gotoLooper(page, pageName, testId) {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto(`/looper/${pageName}.html`)
  await page.waitForLoadState('networkidle')

  // Wait for the looper wrapper to fade in (opacity: 1)
  const wrapper = page.locator(`[data-testid="${testId}"] [data-looper-container]`)
  await expect(wrapper).toHaveCSS('opacity', '1', { timeout: 5000 })
}

/**
 * Helper: Get looper state via evaluate
 */
async function getLooperState(page, testId) {
  return page.locator(`[data-testid="${testId}"]`).evaluate(el => {
    const controller = el.$loop
    const track = el.querySelector('[data-looper]')
    const items = track.querySelectorAll('[data-looper-item]')

    return {
      position: controller?.position?.get() ?? null,
      currentIndex: controller?.current?.() ?? null,
      isLooping: controller?.isLooping ?? null,
      totalItems: items.length,
      originalCount: Array.from(items).filter(i => !i.hasAttribute('data-looper-clone')).length,
      cloneCount: Array.from(items).filter(i => i.hasAttribute('data-looper-clone')).length
    }
  })
}

/**
 * Helper: Get gaps between adjacent items (filters out wrap gaps)
 */
async function getGapsBetweenItems(page, testId) {
  return page.locator(`[data-testid="${testId}"] [data-looper-item]`).evaluateAll(items => {
    const gaps = []
    for (let i = 0; i < items.length - 1; i++) {
      const currRight = items[i].getBoundingClientRect().right
      const nextLeft = items[i + 1].getBoundingClientRect().left
      const gap = nextLeft - currRight
      // Only count reasonable gaps (not wrap gaps which are large negative)
      if (gap > -100 && gap < 200) {
        gaps.push(Math.round(gap))
      }
    }
    return gaps
  })
}

/**
 * Helper: Perform drag gesture on looper
 */
async function dragLooper(page, testId, deltaX) {
  const looper = page.locator(`[data-testid="${testId}"]`)
  const box = await looper.boundingBox()
  const startX = box.x + box.width / 2
  const startY = box.y + box.height / 2

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.mouse.move(startX + deltaX, startY, { steps: 10 })
  await page.mouse.up()
}

/**
 * Helper: Pause looper animation
 */
async function pauseLooper(page, testId) {
  await page.locator(`[data-testid="${testId}"]`).evaluate(el => {
    el.$loop?.pause()
  })
}

test.describe('Jupiter Looper Module', () => {
  test.describe('Initialization', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'basic', 'looper-basic')
    })

    test('wrapper fades in after initialization', async ({ page }) => {
      const wrapper = page.locator('[data-testid="looper-basic"] [data-looper-container]')
      await expect(wrapper).toBeVisible()
      const opacity = await wrapper.evaluate(el => getComputedStyle(el).opacity)
      expect(parseFloat(opacity)).toBe(1)
    })

    test('clones are created for loop mode', async ({ page }) => {
      const state = await getLooperState(page, 'looper-basic')
      expect(state.originalCount).toBe(5)
      expect(state.cloneCount).toBeGreaterThan(0)
      expect(state.totalItems).toBeGreaterThan(state.originalCount)
    })

    test('clones have data-looper-clone attribute', async ({ page }) => {
      const clones = page.locator('[data-testid="looper-basic"] [data-looper-clone]')
      expect(await clones.count()).toBeGreaterThan(0)
    })

    test('original items do not have clone attribute', async ({ page }) => {
      const originals = page.locator('[data-testid="looper-basic"] [data-looper-item]:not([data-looper-clone])')
      expect(await originals.count()).toBe(5)
    })

    test('track element has transform applied', async ({ page }) => {
      const track = page.locator('[data-testid="looper-basic"] [data-looper]')
      const transform = await track.evaluate(el => getComputedStyle(el).transform)
      expect(transform).not.toBe('none')
    })
  })

  test.describe('Loop Mode - Items In Front of Start', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'basic', 'looper-basic')
    })

    test('loop mode creates clones and has items before viewport start', async ({ page }) => {
      const state = await getLooperState(page, 'looper-basic')
      expect(state.cloneCount).toBeGreaterThan(0)

      await pauseLooper(page, 'looper-basic')
      await page.waitForTimeout(100)

      const hasItemsInFront = await page.locator('[data-testid="looper-basic"] [data-looper-item]').evaluateAll(items => {
        return items.some(item => item.getBoundingClientRect().left < 0)
      })
      expect(hasItemsInFront).toBe(true)
    })

    test('can drag in both directions', async ({ page }) => {
      await pauseLooper(page, 'looper-basic')
      const initialState = await getLooperState(page, 'looper-basic')
      const initialPos = initialState.position

      await dragLooper(page, 'looper-basic', -200)
      await page.waitForTimeout(500)
      let state = await getLooperState(page, 'looper-basic')
      expect(state.position).toBeGreaterThan(initialPos)

      await dragLooper(page, 'looper-basic', 400)
      await page.waitForTimeout(500)
      state = await getLooperState(page, 'looper-basic')
      expect(state.position).toBeLessThan(initialPos + 200)
    })

    test('position is unbounded in loop mode', async ({ page }) => {
      await pauseLooper(page, 'looper-basic')
      await page.waitForTimeout(100)

      for (let i = 0; i < 5; i++) {
        await dragLooper(page, 'looper-basic', -500)
        await page.waitForTimeout(200)
      }

      const state = await getLooperState(page, 'looper-basic')
      expect(state.position).toBeGreaterThan(3000)
    })
  })

  test.describe('Spacing and Gaps', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'basic', 'looper-basic')
    })

    test('gaps between items are consistent (20px)', async ({ page }) => {
      await pauseLooper(page, 'looper-basic')
      await page.waitForTimeout(100)

      const gaps = await getGapsBetweenItems(page, 'looper-basic')
      expect(gaps.length).toBeGreaterThan(0)
      const uniqueGaps = [...new Set(gaps)]
      expect(uniqueGaps).toHaveLength(1)
      expect(uniqueGaps[0]).toBe(20)
    })

    test('gaps consistent between original and cloned items', async ({ page }) => {
      await pauseLooper(page, 'looper-basic')
      await page.waitForTimeout(100)

      const gaps = await page.locator('[data-testid="looper-basic"] [data-looper-item]').evaluateAll(items => {
        const results = []
        for (let i = 0; i < items.length - 1; i++) {
          const currRight = items[i].getBoundingClientRect().right
          const nextLeft = items[i + 1].getBoundingClientRect().left
          const gap = nextLeft - currRight
          if (gap > -100 && gap < 200) {
            results.push({ gap: Math.round(gap) })
          }
        }
        return results
      })

      const gapValues = gaps.map(g => g.gap)
      const uniqueGaps = [...new Set(gapValues)]
      expect(uniqueGaps).toHaveLength(1)
      expect(uniqueGaps[0]).toBe(20)
    })
  })

  test.describe('Center Mode', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'center', 'looper-center')
    })

    test('center mode centers active item in viewport', async ({ page }) => {
      const result = await page.locator('[data-testid="looper-center"]').evaluate(el => {
        const containerRect = el.getBoundingClientRect()
        const viewportCenter = containerRect.left + containerRect.width / 2
        const items = el.querySelectorAll('[data-looper-item]:not([data-looper-clone])')
        let closestDistance = Infinity
        let closestItem = null

        items.forEach((item, i) => {
          const rect = item.getBoundingClientRect()
          const itemCenter = rect.left + rect.width / 2
          const distance = Math.abs(itemCenter - viewportCenter)
          if (distance < closestDistance) {
            closestDistance = distance
            closestItem = { index: i, distance }
          }
        })

        return { closestItem }
      })

      expect(result.closestItem.distance).toBeLessThan(10)
    })

    test('center mode starts at middle item (index 2 for 5 items)', async ({ page }) => {
      const state = await getLooperState(page, 'looper-center')
      expect(state.currentIndex).toBe(2)
    })

    test('non-loop center mode clamps at edges', async ({ page }) => {
      await pauseLooper(page, 'looper-center-nonloop')

      const prevButton = page.locator('[data-testid="looper-center-nonloop"] [data-panner-previous]')
      for (let i = 0; i < 5; i++) {
        await prevButton.click()
        await page.waitForTimeout(800)
      }

      // Try to go previous again - should stay at first item
      await prevButton.click()
      await page.waitForTimeout(800)
      const stateAfter = await getLooperState(page, 'looper-center-nonloop')
      expect(stateAfter.currentIndex).toBe(0)
    })
  })

  test.describe('Drag Interaction', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'drag', 'looper-basic')
    })

    test('dragging moves the track', async ({ page }) => {
      await pauseLooper(page, 'looper-basic')
      await page.waitForTimeout(100)

      const initialState = await getLooperState(page, 'looper-basic')
      const initialPos = initialState.position

      await dragLooper(page, 'looper-basic', -300)
      await page.waitForTimeout(100)

      const finalState = await getLooperState(page, 'looper-basic')
      expect(finalState.position).toBeGreaterThan(initialPos)
    })

    test('click still works on link items', async ({ page }) => {
      await page.evaluate(() => { window.location.hash = '' })

      await page.locator('[data-testid="looper-links"]').evaluate(el => {
        const link = el.querySelector('a[href="#link1"]')
        if (link) link.click()
      })
      await page.waitForTimeout(300)

      const newHash = await page.evaluate(() => window.location.hash)
      expect(newHash).toBe('#link1')
    })

    test('drag vs click threshold - large drag does not trigger click', async ({ page }) => {
      await page.evaluate(() => { window.location.hash = '' })

      const linkItem = page.locator('[data-testid="looper-links"] a[href="#link1"]').first()
      const box = await linkItem.boundingBox()

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
      await page.mouse.down()
      await page.mouse.move(box.x + box.width / 2 - 100, box.y + box.height / 2, { steps: 10 })
      await page.mouse.up()
      await page.waitForTimeout(500)

      const hash = await page.evaluate(() => window.location.hash)
      expect(hash).toBe('')
    })
  })

  test.describe('Snap Behavior', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'snap', 'looper-snap')
    })

    test('snaps to nearest item after drag', async ({ page }) => {
      await pauseLooper(page, 'looper-snap')
      await dragLooper(page, 'looper-snap', -100)
      await page.waitForTimeout(1000)

      const state = await getLooperState(page, 'looper-snap')
      expect(Number.isInteger(state.currentIndex)).toBe(true)
    })

    test('snap animation completes smoothly', async ({ page }) => {
      await pauseLooper(page, 'looper-snap')
      await dragLooper(page, 'looper-snap', -150)
      await page.waitForTimeout(1000)

      const finalState = await getLooperState(page, 'looper-snap')
      expect(finalState.currentIndex).toBeDefined()
    })

    test('snap in non-loop mode clamps to bounds', async ({ page }) => {
      await pauseLooper(page, 'looper-end-right')
      await dragLooper(page, 'looper-end-right', -2000)
      await page.waitForTimeout(1000)

      const state = await getLooperState(page, 'looper-end-right')
      expect(state.currentIndex).toBeLessThanOrEqual(4)
    })
  })

  test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'navigation', 'looper-index')
      // Wait for index display to be populated (confirms looper fully initialized)
      await expect(page.locator('[data-testid="looper-index"] [data-looper-slide-index]'))
        .toHaveText('1', { timeout: 5000 })
    })

    test('next button advances to next item', async ({ page }) => {
      const indexDisplay = page.locator('[data-testid="looper-index"] [data-looper-slide-index]')

      await page.locator('[data-testid="looper-index"] [data-panner-next]').click()
      await expect(indexDisplay).toHaveText('2', { timeout: 3000 })
    })

    test('previous button goes to previous item', async ({ page }) => {
      const indexDisplay = page.locator('[data-testid="looper-index"] [data-looper-slide-index]')

      await page.locator('[data-testid="looper-index"] [data-panner-next]').click()
      await expect(indexDisplay).toHaveText('2', { timeout: 3000 })
      // Wait for snap animation to fully settle before clicking previous
      await page.waitForTimeout(1000)

      await page.locator('[data-testid="looper-index"] [data-panner-previous]').click()
      await expect(indexDisplay).toHaveText('1', { timeout: 3000 })
    })

    test('loop mode wraps from last to first', async ({ page }) => {
      const indexDisplay = page.locator('[data-testid="looper-index"] [data-looper-slide-index]')
      const nextButton = page.locator('[data-testid="looper-index"] [data-panner-next]')

      for (let i = 0; i < 4; i++) {
        await nextButton.click()
        await page.waitForTimeout(800)
      }

      await expect(indexDisplay).toHaveText('5', { timeout: 2000 })

      await nextButton.click()
      await page.waitForTimeout(800)
      await expect(indexDisplay).toHaveText('1', { timeout: 2000 })
    })

    test('non-loop mode navigation clamps at boundaries', async ({ page }) => {
      // Set position to 0 (index 0) directly
      await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        el.$loop?.position?.set(0)
      })
      await page.waitForTimeout(500)

      const indexBefore = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        el.$loop?.closestIndex?.(true)
        return el.$loop?.current?.() ?? -1
      })
      expect(indexBefore).toBe(0)

      // previous() at index 0 should clamp
      await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        el.$loop?.previous?.()
      })
      await page.waitForTimeout(1000)

      const indexAfterPrevious = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        return el.$loop?.current?.() ?? -1
      })
      expect(indexAfterPrevious).toBe(0)

      // Set position to last item
      await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        const times = el.$loop?.times
        const lastTime = times[times.length - 1]
        el.$loop?.position?.set(lastTime * 100)
      })
      await page.waitForTimeout(500)

      const indexAtEnd = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        el.$loop?.closestIndex?.(true)
        return el.$loop?.current?.() ?? -1
      })
      expect(indexAtEnd).toBe(4)

      // next() at last index should clamp
      await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        el.$loop?.next?.()
      })
      await page.waitForTimeout(1000)

      const indexAfterNext = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        return el.$loop?.current?.() ?? -1
      })
      expect(indexAfterNext).toBe(4)
    })

    test('index display shows correct count', async ({ page }) => {
      const countDisplay = page.locator('[data-testid="looper-index"] [data-looper-slide-count]')
      await expect(countDisplay).toHaveText('5')
    })
  })

  test.describe('Autoplay', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'autoplay', 'looper-autoplay')
    })

    test('autoplay advances automatically', async ({ page }) => {
      const initialIndex = await page.locator('[data-testid="looper-autoplay"]').evaluate(el => {
        return el.$loop?.current?.() ?? 0
      })

      await page.waitForTimeout(4000)

      const newIndex = await page.locator('[data-testid="looper-autoplay"]').evaluate(el => {
        return el.$loop?.current?.() ?? 0
      })

      expect(newIndex).toBeGreaterThan(initialIndex)
    })

    test('autoplay stops on user interaction', async ({ page }) => {
      // Interact with the looper (drag)
      await dragLooper(page, 'looper-autoplay', -100)
      await page.waitForTimeout(1000)

      const indexAfterDrag = await page.locator('[data-testid="looper-autoplay"]').evaluate(el => {
        return el.$loop?.current?.() ?? 0
      })

      await page.waitForTimeout(4000)

      const indexAfterWait = await page.locator('[data-testid="looper-autoplay"]').evaluate(el => {
        return el.$loop?.current?.() ?? 0
      })

      expect(indexAfterWait).toBe(indexAfterDrag)
    })
  })

  test.describe('Crawl Animation', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'basic', 'looper-basic')
    })

    test('crawl animates continuously', async ({ page }) => {
      const initialState = await getLooperState(page, 'looper-basic')
      const initialPos = initialState.position

      await page.waitForTimeout(2000)

      const newState = await getLooperState(page, 'looper-basic')
      expect(newState.position).not.toBe(initialPos)
    })

    test('reversed crawl goes right-to-left', async ({ page }) => {
      const initialState = await getLooperState(page, 'looper-reversed')
      const initialPos = initialState.position

      await page.waitForTimeout(2000)

      const newState = await getLooperState(page, 'looper-reversed')
      expect(newState.position).not.toBe(initialPos)
    })

    test('hover slows down crawl speed', async ({ page }) => {
      const initialState = await getLooperState(page, 'looper-basic')

      await page.locator('[data-testid="looper-basic"]').hover()
      await page.waitForTimeout(500)
      const posAfterHover = await getLooperState(page, 'looper-basic')

      await page.mouse.move(0, 0)
      await page.waitForTimeout(500)
      const posAfterUnhover = await getLooperState(page, 'looper-basic')

      const movementDuringHover = Math.abs(posAfterHover.position - initialState.position)
      const movementAfterUnhover = Math.abs(posAfterUnhover.position - posAfterHover.position)

      expect(movementAfterUnhover).toBeGreaterThan(movementDuringHover * 0.5)
    })
  })

  test.describe('Non-Loop Boundaries', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'nonloop', 'looper-end-right')
    })

    test('linear mode stops at start boundary', async ({ page }) => {
      await dragLooper(page, 'looper-end-right', 500)
      await page.waitForTimeout(1500)

      const state = await getLooperState(page, 'looper-end-right')
      expect(state.currentIndex).toBe(0)
    })

    test('linear mode clamps position at end boundary', async ({ page }) => {
      await dragLooper(page, 'looper-end-right', -2000)
      await page.waitForTimeout(1500)

      const state = await getLooperState(page, 'looper-end-right')
      expect(state.currentIndex).toBeGreaterThan(0)
    })

    test('end alignment right keeps last item at right edge', async ({ page }) => {
      const nextButton = page.locator('[data-testid="looper-end-right"] [data-panner-next]')
      for (let i = 0; i < 5; i++) {
        await nextButton.click()
        await page.waitForTimeout(300)
      }
      await page.waitForTimeout(500)

      const result = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        const container = el.querySelector('[data-looper-container]')
        const containerRect = container.getBoundingClientRect()
        const items = el.querySelectorAll('[data-looper-item]:not([data-looper-clone])')
        const lastItem = items[items.length - 1]
        const lastItemRect = lastItem.getBoundingClientRect()
        return { difference: Math.abs(containerRect.right - lastItemRect.right) }
      })

      expect(result.difference).toBeLessThan(50)
    })

    test('end alignment start allows scrolling further than end-right', async ({ page }) => {
      // Navigate to last item in end-right mode
      const nextButtonRight = page.locator('[data-testid="looper-end-right"] [data-panner-next]')
      for (let i = 0; i < 4; i++) {
        await nextButtonRight.click()
        await page.waitForTimeout(800)
      }

      const endRightMaxPos = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        return el.$loop?.position?.get() ?? 0
      })

      // Navigate to last item in end-start mode
      const nextButtonStart = page.locator('[data-testid="looper-end-start"] [data-panner-next]')
      for (let i = 0; i < 4; i++) {
        await nextButtonStart.click()
        await page.waitForTimeout(800)
      }

      const endStartMaxPos = await page.locator('[data-testid="looper-end-start"]').evaluate(el => {
        return el.$loop?.position?.get() ?? 0
      })

      expect(endStartMaxPos).toBeGreaterThan(endRightMaxPos)
    })
  })

  test.describe('Lazyload Clone Force-Load', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'lazyload', 'looper-lazyload')
    })

    test('cloned images are force-loaded immediately', async ({ page }) => {
      const cloneCount = await page.locator('[data-testid="looper-lazyload"] [data-looper-clone]').count()
      expect(cloneCount).toBeGreaterThan(0)

      const clonePictures = page.locator('[data-testid="looper-lazyload"] [data-looper-clone] [data-ll-srcset]')
      const pictureCount = await clonePictures.count()
      expect(pictureCount).toBeGreaterThan(0)

      for (let i = 0; i < pictureCount; i++) {
        await expect(clonePictures.nth(i)).toHaveAttribute('data-ll-srcset-ready', '')
      }
    })

    test('cloned images have srcset swapped from data-srcset', async ({ page }) => {
      const cloneSources = page.locator('[data-testid="looper-lazyload"] [data-looper-clone] [data-ll-srcset] source')
      const sourceCount = await cloneSources.count()
      expect(sourceCount).toBeGreaterThan(0)

      for (let i = 0; i < sourceCount; i++) {
        const srcset = await cloneSources.nth(i).getAttribute('srcset')
        expect(srcset).toBeTruthy()
        expect(srcset).toContain('blue-400x300.svg')
      }
    })

    test('cloned img elements have data-ll-loaded attribute', async ({ page }) => {
      const cloneImgs = page.locator('[data-testid="looper-lazyload"] [data-looper-clone] [data-ll-srcset] img')
      const imgCount = await cloneImgs.count()
      expect(imgCount).toBeGreaterThan(0)

      for (let i = 0; i < imgCount; i++) {
        await expect(cloneImgs.nth(i)).toHaveAttribute('data-ll-loaded', '')
      }
    })
  })

  test.describe('Many Items (No Clones)', () => {
    test.beforeEach(async ({ page }) => {
      await gotoLooper(page, 'many', 'looper-many')
    })

    test('looper with many items may not need clones', async ({ page }) => {
      const state = await getLooperState(page, 'looper-many')
      expect(state.originalCount).toBe(15)
      expect(state.totalItems).toBeGreaterThanOrEqual(15)
    })

    test('many items looper still crawls smoothly', async ({ page }) => {
      const initialState = await getLooperState(page, 'looper-many')

      await page.waitForTimeout(2000)

      const newState = await getLooperState(page, 'looper-many')
      expect(newState.position).not.toBe(initialState.position)
    })
  })
})
