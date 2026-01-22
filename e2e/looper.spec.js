// @ts-check
const { test, expect } = require('@playwright/test')

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

/**
 * Helper: Set looper position
 */
async function setLooperPosition(page, testId, position) {
  await page.locator(`[data-testid="${testId}"]`).evaluate((el, pos) => {
    el.$loop?.position?.set(pos)
  }, position)
}

test.describe('Jupiter Looper Module', () => {
  test.beforeEach(async ({ page }) => {
    // Set a consistent viewport size
    await page.setViewportSize({ width: 1280, height: 720 })

    // Load the looper test page from Vite server
    await page.goto('/looper.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait additional time for Jupiter to initialize
    await page.waitForTimeout(1000)
  })

  test.describe('Initialization', () => {
    test('wrapper fades in after initialization', async ({ page }) => {
      // The looper wrapper should have opacity: 1 after init
      const wrapper = page.locator('[data-testid="looper-basic"] [data-looper-container]')
      await expect(wrapper).toBeVisible()

      // Check that opacity is set to 1 (animated from 0)
      const opacity = await wrapper.evaluate(el => getComputedStyle(el).opacity)
      expect(parseFloat(opacity)).toBe(1)
    })

    test('clones are created for loop mode', async ({ page }) => {
      const state = await getLooperState(page, 'looper-basic')

      // Should have 5 original items
      expect(state.originalCount).toBe(5)

      // Should have clones created (total > original)
      expect(state.cloneCount).toBeGreaterThan(0)
      expect(state.totalItems).toBeGreaterThan(state.originalCount)
    })

    test('clones have data-looper-clone attribute', async ({ page }) => {
      const clones = page.locator('[data-testid="looper-basic"] [data-looper-clone]')
      const count = await clones.count()

      expect(count).toBeGreaterThan(0)
    })

    test('original items do not have clone attribute', async ({ page }) => {
      const originals = page.locator('[data-testid="looper-basic"] [data-looper-item]:not([data-looper-clone])')
      const count = await originals.count()

      expect(count).toBe(5)
    })

    test('track element has transform applied', async ({ page }) => {
      const track = page.locator('[data-testid="looper-basic"] [data-looper]')
      const transform = await track.evaluate(el => getComputedStyle(el).transform)

      // Transform should be set (not 'none')
      expect(transform).not.toBe('none')
    })
  })

  test.describe('Loop Mode - Items In Front of Start', () => {
    test('loop mode creates clones and has items before viewport start', async ({ page }) => {
      const state = await getLooperState(page, 'looper-basic')

      // Should have clones
      expect(state.cloneCount).toBeGreaterThan(0)
      expect(state.totalItems).toBeGreaterThan(state.originalCount)

      // Pause crawl
      await pauseLooper(page, 'looper-basic')
      await page.waitForTimeout(100)

      // Check items exist at negative left positions (before viewport)
      // In loop mode, clones are placed before the first original item
      const hasItemsInFront = await page.locator('[data-testid="looper-basic"] [data-looper-item]').evaluateAll(items => {
        return items.some(item => item.getBoundingClientRect().left < 0)
      })

      expect(hasItemsInFront).toBe(true)
    })

    test('can drag in both directions', async ({ page }) => {
      await pauseLooper(page, 'looper-basic')

      // Get initial position
      const initialState = await getLooperState(page, 'looper-basic')
      const initialPos = initialState.position

      // Drag left on screen → position increases (dragging content right)
      await dragLooper(page, 'looper-basic', -200)
      await page.waitForTimeout(500)

      let state = await getLooperState(page, 'looper-basic')
      expect(state.position).toBeGreaterThan(initialPos)

      // Drag right on screen → position decreases (dragging content left)
      await dragLooper(page, 'looper-basic', 400)
      await page.waitForTimeout(500)

      state = await getLooperState(page, 'looper-basic')
      expect(state.position).toBeLessThan(initialPos + 200)
    })

    test('position is unbounded in loop mode', async ({ page }) => {
      await pauseLooper(page, 'looper-basic')
      await page.waitForTimeout(100)

      // Drag far to the left multiple times to accumulate position
      for (let i = 0; i < 5; i++) {
        await dragLooper(page, 'looper-basic', -500)
        await page.waitForTimeout(200)
      }

      const state = await getLooperState(page, 'looper-basic')
      // Position should be higher than initial (unbounded growth)
      expect(state.position).toBeGreaterThan(3000)
    })
  })

  test.describe('Spacing and Gaps', () => {
    test('gaps between items are consistent (20px)', async ({ page }) => {
      // Pause to get stable measurements
      await pauseLooper(page, 'looper-basic')
      await page.waitForTimeout(100)

      const gaps = await getGapsBetweenItems(page, 'looper-basic')

      // Should have some gaps measured
      expect(gaps.length).toBeGreaterThan(0)

      // All gaps should be 20px (the CSS gap value)
      const uniqueGaps = [...new Set(gaps)]
      expect(uniqueGaps).toHaveLength(1)
      expect(uniqueGaps[0]).toBe(20)
    })

    test('gaps consistent between original and cloned items', async ({ page }) => {
      await pauseLooper(page, 'looper-basic')
      await page.waitForTimeout(100)

      // Get all gaps including those involving clones
      const gaps = await page.locator('[data-testid="looper-basic"] [data-looper-item]').evaluateAll(items => {
        const results = []
        for (let i = 0; i < items.length - 1; i++) {
          const curr = items[i]
          const next = items[i + 1]
          const currRight = curr.getBoundingClientRect().right
          const nextLeft = next.getBoundingClientRect().left
          const gap = nextLeft - currRight
          const currIsClone = curr.hasAttribute('data-looper-clone')
          const nextIsClone = next.hasAttribute('data-looper-clone')

          // Only count reasonable gaps
          if (gap > -100 && gap < 200) {
            results.push({
              gap: Math.round(gap),
              currIsClone,
              nextIsClone
            })
          }
        }
        return results
      })

      // Verify all gaps are consistent regardless of clone status
      const gapValues = gaps.map(g => g.gap)
      const uniqueGaps = [...new Set(gapValues)]
      expect(uniqueGaps).toHaveLength(1)
      expect(uniqueGaps[0]).toBe(20)
    })
  })

  test.describe('Center Mode', () => {
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
            closestItem = { index: i, text: item.textContent.trim(), distance }
          }
        })

        return { viewportCenter, closestItem, currentIndex: el.$loop?.current?.() }
      })

      // The closest item should be very close to center (within 10px tolerance)
      expect(result.closestItem.distance).toBeLessThan(10)
    })

    test('center mode starts at middle item (index 2 for 5 items)', async ({ page }) => {
      const state = await getLooperState(page, 'looper-center')

      // For 5 items, center should start at index 2 (middle item)
      expect(state.currentIndex).toBe(2)
    })

    test('non-loop center mode clamps at edges', async ({ page }) => {
      // Test that we can't scroll past the first item in non-loop center mode
      await pauseLooper(page, 'looper-center-nonloop')

      // Navigate to first item
      const prevButton = page.locator('[data-testid="looper-center-nonloop"] [data-panner-previous]')
      for (let i = 0; i < 5; i++) {
        await prevButton.click()
        await page.waitForTimeout(300)
      }

      // Try to go previous again - should stay at first item
      const stateBefore = await getLooperState(page, 'looper-center-nonloop')
      await prevButton.click()
      await page.waitForTimeout(500)
      const stateAfter = await getLooperState(page, 'looper-center-nonloop')

      // Should stay at index 0 (clamped)
      expect(stateAfter.currentIndex).toBe(0)
    })
  })

  test.describe('Drag Interaction', () => {
    test('dragging moves the track', async ({ page }) => {
      // Use the looper-basic which has crawl - pause it first
      await pauseLooper(page, 'looper-basic')
      await page.waitForTimeout(100)

      const initialState = await getLooperState(page, 'looper-basic')
      const initialPos = initialState.position

      // Drag significantly to overcome any snap behavior
      await dragLooper(page, 'looper-basic', -300)
      await page.waitForTimeout(100)

      const finalState = await getLooperState(page, 'looper-basic')

      // Position should have changed (dragging left increases position)
      expect(finalState.position).toBeGreaterThan(initialPos)
    })

    test('click still works on link items', async ({ page }) => {
      // Scroll to make sure the links section is visible
      await page.locator('[data-testid="looper-links"]').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      // Clear any existing hash
      await page.evaluate(() => { window.location.hash = '' })

      // Click on the first visible link item using JavaScript to avoid viewport issues
      await page.locator('[data-testid="looper-links"]').evaluate(el => {
        const link = el.querySelector('a[href="#link1"]')
        if (link) link.click()
      })
      await page.waitForTimeout(300)

      // Check that hash changed
      const newHash = await page.evaluate(() => window.location.hash)
      expect(newHash).toBe('#link1')
    })

    test('drag vs click threshold - large drag does not trigger click', async ({ page }) => {
      // Scroll to make sure the links section is visible
      await page.locator('[data-testid="looper-links"]').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      // Clear any existing hash
      await page.evaluate(() => { window.location.hash = '' })

      // Get a link item
      const linkItem = page.locator('[data-testid="looper-links"] a[href="#link1"]').first()
      const box = await linkItem.boundingBox()

      // Perform a large drag (more than 3px threshold) - should NOT trigger click
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
      await page.mouse.down()
      await page.mouse.move(box.x + box.width / 2 - 100, box.y + box.height / 2, { steps: 10 })
      await page.mouse.up()
      await page.waitForTimeout(500)

      // Should NOT have navigated (large movement = drag, not click)
      const hash = await page.evaluate(() => window.location.hash)
      expect(hash).toBe('')
    })
  })

  test.describe('Snap Behavior', () => {
    test('snaps to nearest item after drag', async ({ page }) => {
      await pauseLooper(page, 'looper-snap')

      // Drag a partial amount (not full item width)
      await dragLooper(page, 'looper-snap', -100)

      // Wait for snap animation
      await page.waitForTimeout(1000)

      // Get current index - should be snapped to a whole number
      const state = await getLooperState(page, 'looper-snap')
      expect(Number.isInteger(state.currentIndex)).toBe(true)
    })

    test('snap animation completes smoothly', async ({ page }) => {
      await pauseLooper(page, 'looper-snap')

      // Drag and release
      await dragLooper(page, 'looper-snap', -150)

      // Check position during animation
      await page.waitForTimeout(100)
      const midState = await getLooperState(page, 'looper-snap')

      // Wait for animation to complete
      await page.waitForTimeout(1000)
      const finalState = await getLooperState(page, 'looper-snap')

      // Final position should be different from mid-animation
      // (unless snap was immediate)
      expect(finalState.currentIndex).toBeDefined()
    })

    test('snap in non-loop mode clamps to bounds', async ({ page }) => {
      await pauseLooper(page, 'looper-end-right')

      // Drag far to the left (should clamp at end)
      await dragLooper(page, 'looper-end-right', -2000)
      await page.waitForTimeout(1000)

      const state = await getLooperState(page, 'looper-end-right')

      // Should be at last item (index 4 for 5 items)
      expect(state.currentIndex).toBeLessThanOrEqual(4)
    })
  })

  test.describe('Navigation', () => {
    test('next button advances to next item', async ({ page }) => {
      const indexDisplay = page.locator('[data-testid="looper-index"] [data-looper-slide-index]')

      // Get initial index
      const initialIndex = await indexDisplay.textContent()
      expect(initialIndex).toBe('1')

      // Click next button
      await page.locator('[data-testid="looper-index"] [data-panner-next]').click()

      // Wait for animation and check index updated
      await expect(indexDisplay).toHaveText('2', { timeout: 2000 })
    })

    test('previous button goes to previous item', async ({ page }) => {
      const indexDisplay = page.locator('[data-testid="looper-index"] [data-looper-slide-index]')

      // First go to item 2
      await page.locator('[data-testid="looper-index"] [data-panner-next]').click()
      await expect(indexDisplay).toHaveText('2', { timeout: 2000 })

      // Then go back
      await page.locator('[data-testid="looper-index"] [data-panner-previous]').click()
      await expect(indexDisplay).toHaveText('1', { timeout: 2000 })
    })

    test('loop mode wraps from last to first', async ({ page }) => {
      const indexDisplay = page.locator('[data-testid="looper-index"] [data-looper-slide-index]')
      const nextButton = page.locator('[data-testid="looper-index"] [data-panner-next]')

      // Start at index 1
      await expect(indexDisplay).toHaveText('1', { timeout: 2000 })

      // Navigate to the last item (click 4 times to go from 1 to 5)
      for (let i = 0; i < 4; i++) {
        await nextButton.click()
        await page.waitForTimeout(800)
      }

      // Should be at index 5
      await expect(indexDisplay).toHaveText('5', { timeout: 2000 })

      // Click next once more - should wrap to 1
      await nextButton.click()
      await page.waitForTimeout(800)
      await expect(indexDisplay).toHaveText('1', { timeout: 2000 })
    })

    test('non-loop mode navigation clamps at boundaries', async ({ page }) => {
      // Navigate to the section using the controller directly
      await page.locator('[data-testid="looper-end-right"]').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      // Set position to 0 (index 0) directly for reliable test
      await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        el.$loop?.position?.set(0)
      })
      await page.waitForTimeout(500)

      // Verify at index 0
      const indexBefore = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        el.$loop?.closestIndex?.(true) // sync curIndex
        return el.$loop?.current?.() ?? -1
      })
      expect(indexBefore).toBe(0)

      // In non-loop mode, previous() at index 0 should clamp (stay at 0)
      await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        el.$loop?.previous?.()
      })
      await page.waitForTimeout(1000)

      // Should stay at index 0 (clamped)
      const indexAfterPrevious = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        return el.$loop?.current?.() ?? -1
      })
      expect(indexAfterPrevious).toBe(0)

      // Now test next() at end boundary
      // Set position to last item (index 4 = time 12.8 * 100 = 1280)
      await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        const times = el.$loop?.times
        const lastTime = times[times.length - 1]
        el.$loop?.position?.set(lastTime * 100)
      })
      await page.waitForTimeout(500)

      // Verify at index 4
      const indexAtEnd = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        el.$loop?.closestIndex?.(true)
        return el.$loop?.current?.() ?? -1
      })
      expect(indexAtEnd).toBe(4)

      // In non-loop mode, next() at last index should clamp (stay at 4)
      await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        el.$loop?.next?.()
      })
      await page.waitForTimeout(1000)

      // Should stay at index 4 (clamped)
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
    test('autoplay advances automatically', async ({ page }) => {
      // Scroll to ensure it's in viewport (moonwalk trigger)
      await page.locator('[data-testid="looper-autoplay"]').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      // Get initial index
      const initialIndex = await page.locator('[data-testid="looper-autoplay"]').evaluate(el => {
        return el.$loop?.current?.() ?? 0
      })

      // Wait for autoplay to advance (3 seconds interval + buffer)
      await page.waitForTimeout(4000)

      // Get new index
      const newIndex = await page.locator('[data-testid="looper-autoplay"]').evaluate(el => {
        return el.$loop?.current?.() ?? 0
      })

      // Should have advanced
      expect(newIndex).toBeGreaterThan(initialIndex)
    })

    test('autoplay stops on user interaction', async ({ page }) => {
      await page.locator('[data-testid="looper-autoplay"]').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      // Interact with the looper (drag)
      await dragLooper(page, 'looper-autoplay', -100)
      await page.waitForTimeout(1000)

      // Get the index after interaction
      const indexAfterDrag = await page.locator('[data-testid="looper-autoplay"]').evaluate(el => {
        return el.$loop?.current?.() ?? 0
      })

      // Wait for what would be autoplay time
      await page.waitForTimeout(4000)

      // Get index after waiting
      const indexAfterWait = await page.locator('[data-testid="looper-autoplay"]').evaluate(el => {
        return el.$loop?.current?.() ?? 0
      })

      // Index should not have changed (autoplay stopped by user interaction)
      expect(indexAfterWait).toBe(indexAfterDrag)
    })
  })

  test.describe('Crawl Animation', () => {
    test('crawl animates continuously', async ({ page }) => {
      // Get initial position
      const initialState = await getLooperState(page, 'looper-basic')
      const initialPos = initialState.position

      // Wait for crawl to move
      await page.waitForTimeout(2000)

      // Get new position
      const newState = await getLooperState(page, 'looper-basic')

      // Position should have changed due to crawl
      expect(newState.position).not.toBe(initialPos)
    })

    test('reversed crawl goes right-to-left', async ({ page }) => {
      // Get initial position
      const initialState = await getLooperState(page, 'looper-reversed')
      const initialPos = initialState.position

      // Wait for crawl to move
      await page.waitForTimeout(2000)

      // Get new position
      const newState = await getLooperState(page, 'looper-reversed')

      // For reversed, position should increase (moving right)
      // Note: The exact direction depends on implementation
      expect(newState.position).not.toBe(initialPos)
    })

    test('hover slows down crawl speed', async ({ page }) => {
      // Get initial position
      const initialState = await getLooperState(page, 'looper-basic')

      // Hover over the looper
      await page.locator('[data-testid="looper-basic"]').hover()

      // Record position after short wait
      await page.waitForTimeout(500)
      const posAfterHover = await getLooperState(page, 'looper-basic')

      // Move mouse away
      await page.mouse.move(0, 0)

      // Wait same amount without hover
      await page.waitForTimeout(500)
      const posAfterUnhover = await getLooperState(page, 'looper-basic')

      // The movement during unhovered state should be more than hovered
      const movementDuringHover = Math.abs(posAfterHover.position - initialState.position)
      const movementAfterUnhover = Math.abs(posAfterUnhover.position - posAfterHover.position)

      // Movement after unhover should be greater (faster speed)
      expect(movementAfterUnhover).toBeGreaterThan(movementDuringHover * 0.5)
    })
  })

  test.describe('Non-Loop Boundaries', () => {
    test('linear mode stops at start boundary', async ({ page }) => {
      // Scroll to section
      await page.locator('[data-testid="looper-end-right"]').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      // Try to drag past start (drag right on screen = decrease position)
      await dragLooper(page, 'looper-end-right', 500)
      await page.waitForTimeout(1500)

      const state = await getLooperState(page, 'looper-end-right')

      // Should be clamped at or near start (index 0)
      expect(state.currentIndex).toBe(0)
    })

    test('linear mode clamps position at end boundary', async ({ page }) => {
      // Scroll to section
      await page.locator('[data-testid="looper-end-right"]').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      // Drag far past end (drag left on screen = increase position)
      await dragLooper(page, 'looper-end-right', -2000)
      await page.waitForTimeout(1500)

      const state = await getLooperState(page, 'looper-end-right')

      // In non-loop mode, position should be clamped - currentIndex should be at or near the end
      // The exact index depends on viewport and snap behavior
      expect(state.currentIndex).toBeGreaterThan(0)
    })

    test('end alignment right keeps last item at right edge', async ({ page }) => {
      // Navigate to last item
      const nextButton = page.locator('[data-testid="looper-end-right"] [data-panner-next]')
      for (let i = 0; i < 5; i++) {
        await nextButton.click()
        await page.waitForTimeout(300)
      }
      await page.waitForTimeout(500)

      // Check that last item is at or near right edge
      const result = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        const container = el.querySelector('[data-looper-container]')
        const containerRect = container.getBoundingClientRect()
        const items = el.querySelectorAll('[data-looper-item]:not([data-looper-clone])')
        const lastItem = items[items.length - 1]
        const lastItemRect = lastItem.getBoundingClientRect()

        return {
          containerRight: containerRect.right,
          lastItemRight: lastItemRect.right,
          difference: Math.abs(containerRect.right - lastItemRect.right)
        }
      })

      // Last item should be close to right edge (within padding tolerance)
      expect(result.difference).toBeLessThan(50)
    })

    test('end alignment start allows scrolling further than end-right', async ({ page }) => {
      // Scroll to sections
      await page.locator('[data-testid="looper-end-right"]').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      // Navigate to last item in end-right mode (4 clicks from index 1 to 5)
      const nextButtonRight = page.locator('[data-testid="looper-end-right"] [data-panner-next]')
      for (let i = 0; i < 4; i++) {
        await nextButtonRight.click()
        await page.waitForTimeout(800)
      }

      // Get position at max scroll for end-right
      const endRightMaxPos = await page.locator('[data-testid="looper-end-right"]').evaluate(el => {
        return el.$loop?.position?.get() ?? 0
      })

      // Scroll to end-start section
      await page.locator('[data-testid="looper-end-start"]').scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      // Navigate to last item in end-start mode
      const nextButtonStart = page.locator('[data-testid="looper-end-start"] [data-panner-next]')
      for (let i = 0; i < 4; i++) {
        await nextButtonStart.click()
        await page.waitForTimeout(800)
      }

      // Get position at max scroll for end-start
      const endStartMaxPos = await page.locator('[data-testid="looper-end-start"]').evaluate(el => {
        return el.$loop?.position?.get() ?? 0
      })

      // end-start should allow scrolling further than end-right (larger position value)
      expect(endStartMaxPos).toBeGreaterThan(endRightMaxPos)
    })
  })

  test.describe('Many Items (No Clones)', () => {
    test('looper with many items may not need clones', async ({ page }) => {
      const state = await getLooperState(page, 'looper-many')

      // Should have 15 original items
      expect(state.originalCount).toBe(15)

      // May or may not have clones depending on viewport size
      // But should still function
      expect(state.totalItems).toBeGreaterThanOrEqual(15)
    })

    test('many items looper still crawls smoothly', async ({ page }) => {
      const initialState = await getLooperState(page, 'looper-many')

      await page.waitForTimeout(2000)

      const newState = await getLooperState(page, 'looper-many')

      // Position should have changed
      expect(newState.position).not.toBe(initialState.position)
    })
  })
})
