// @ts-check
const { test, expect } = require('@playwright/test')

/**
 * Navigate to the draggable marquee page and wait for it to reveal.
 */
async function gotoMarquee(page) {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto('/marquee/drag.html')
  await page.waitForLoadState('networkidle')

  const dragMarquee = page.locator('[data-testid="marquee-drag"]')
  await expect(dragMarquee).toHaveCSS('opacity', '1', { timeout: 5000 })
}

/**
 * Read the current raw position of a marquee.
 */
async function getPos(page, testId) {
  return page.locator(`[data-testid="${testId}"]`).evaluate(el => el.$marquee.position.get())
}

/**
 * Stop all motion (crawl, speed ramp, inertia) and mark the marquee as not
 * playing so nothing auto-resumes — leaves position frozen for assertions.
 */
async function freeze(page, testId) {
  await page.locator(`[data-testid="${testId}"]`).evaluate(el => {
    const m = el.$marquee
    m.playing = false
    m.killTweens()
  })
}

/**
 * Perform a horizontal drag gesture across a marquee.
 *
 * The [data-marquee] element is much wider than the viewport, so we anchor the
 * gesture to the viewport-center X (keeping both endpoints on screen) and the
 * marquee's vertical center.
 */
async function dragMarquee(page, testId, deltaX, steps = 10) {
  // Use the clipping container's rect: the [data-marquee] element itself is far
  // wider than the viewport and taller than its overflow-hidden container, so
  // its own box center would fall outside the visible (interactive) area.
  const rect = await page
    .locator(`[data-testid="${testId}"]`)
    .evaluate(el => {
      const c = el.closest('.marquee-container').getBoundingClientRect()
      return { x: c.x, y: c.y, width: c.width, height: c.height }
    })
  const viewport = page.viewportSize()
  const startX = viewport.width / 2
  const startY = rect.y + rect.height / 2

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.mouse.move(startX + deltaX, startY, { steps })
  await page.mouse.up()
}

test.describe('Marquee', () => {
  test.beforeEach(async ({ page }) => {
    await gotoMarquee(page)
  })

  test.describe('Auto-crawl', () => {
    test('advances position over time', async ({ page }) => {
      const start = await getPos(page, 'marquee-drag')
      await page.waitForTimeout(400)
      const later = await getPos(page, 'marquee-drag')
      expect(later).toBeGreaterThan(start)
    })

    test('renders a transform on the marquee element', async ({ page }) => {
      const transform = await page
        .locator('[data-testid="marquee-drag"]')
        .evaluate(el => getComputedStyle(el).transform)
      // matrix(...) — anything other than 'none' means a transform is applied
      expect(transform).not.toBe('none')
    })
  })

  test.describe('Drag', () => {
    test('dragging left advances the marquee', async ({ page }) => {
      await freeze(page, 'marquee-drag')
      const start = await getPos(page, 'marquee-drag')

      await dragMarquee(page, 'marquee-drag', -250)
      await page.waitForTimeout(400)

      const end = await getPos(page, 'marquee-drag')
      // Drag left scrolls content left => position increases
      expect(end).toBeGreaterThan(start + 100)
    })

    test('dragging right rewinds the marquee', async ({ page }) => {
      await freeze(page, 'marquee-drag')
      const start = await getPos(page, 'marquee-drag')

      await dragMarquee(page, 'marquee-drag', 250)
      await page.waitForTimeout(400)

      const end = await getPos(page, 'marquee-drag')
      expect(end).toBeLessThan(start - 100)
    })

    test('static (non-draggable) marquee ignores drag', async ({ page }) => {
      await freeze(page, 'marquee-static')
      const start = await getPos(page, 'marquee-static')

      await dragMarquee(page, 'marquee-static', -250)
      await page.waitForTimeout(300)

      const end = await getPos(page, 'marquee-static')
      expect(Math.abs(end - start)).toBeLessThan(20)
    })

    test('reversed (mirrored) marquee drags the opposite internal way', async ({ page }) => {
      // For a non-flipped row, dragging right rewinds (position decreases).
      // A mirrored row must invert that so the content still follows the
      // finger on screen — i.e. dragging right should advance position.
      await freeze(page, 'marquee-reverse')
      const start = await getPos(page, 'marquee-reverse')

      await dragMarquee(page, 'marquee-reverse', 250)
      await page.waitForTimeout(400)

      const end = await getPos(page, 'marquee-reverse')
      expect(end).toBeGreaterThan(start + 100)
    })

    test('does not navigate item links at the end of a drag', async ({ page }) => {
      await page.evaluate(() => {
        window.location.hash = ''
      })

      const link = page.locator('[data-testid="marquee-drag"] a[href="#dragged-link"]').first()
      const box = await link.boundingBox()

      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
      await page.mouse.down()
      await page.mouse.move(box.x + box.width / 2 - 150, box.y + box.height / 2, { steps: 10 })
      await page.mouse.up()
      await page.waitForTimeout(300)

      const hash = await page.evaluate(() => window.location.hash)
      expect(hash).not.toBe('#dragged-link')
    })
  })

  test.describe('Reversed option', () => {
    test('crawls in the opposite direction (position decreases)', async ({ page }) => {
      const start = await getPos(page, 'marquee-revopt')
      await page.waitForTimeout(400)
      const later = await getPos(page, 'marquee-revopt')
      expect(later).toBeLessThan(start)
    })

    test('speed is still controllable', async ({ page }) => {
      // Measure crawl rate at normal speed, then at 3x, and compare magnitudes.
      const sample = async () => {
        const a = await getPos(page, 'marquee-revopt')
        await page.waitForTimeout(250)
        const b = await getPos(page, 'marquee-revopt')
        return Math.abs(b - a)
      }

      const setSpeed = mult =>
        page
          .locator('[data-testid="marquee-revopt"]')
          .evaluate((el, m) => {
            el.$marquee.killTweens()
            el.$marquee.timeline = el.$marquee.createCrawl()
            el.$marquee.timeline.play()
            el.$marquee.timeline.speed = m
          }, mult)

      await setSpeed(1)
      const slow = await sample()

      await setSpeed(3)
      const fast = await sample()

      expect(fast).toBeGreaterThan(slow)
    })
  })

  test.describe('Throw / inertia', () => {
    test('a throw glides a long way then decelerates', async ({ page }) => {
      await freeze(page, 'marquee-drag')
      const start = await getPos(page, 'marquee-drag')

      // Drive the inertia integration directly with a known velocity so the
      // assertion is deterministic (independent of synthetic mouse timing).
      await page.locator('[data-testid="marquee-drag"]').evaluate(el => {
        el.$marquee.startInertia(-2500)
      })

      await page.waitForTimeout(80)
      const early = await getPos(page, 'marquee-drag')
      const earlyDelta = early - start

      await page.waitForTimeout(700)
      const beforeLate = await getPos(page, 'marquee-drag')
      await page.waitForTimeout(150)
      const afterLate = await getPos(page, 'marquee-drag')
      const lateDelta = afterLate - beforeLate

      // It moved a meaningful distance from the throw...
      expect(earlyDelta).toBeGreaterThan(80)
      // ...and decelerated: it covers less ground late than early (inertia).
      expect(lateDelta).toBeLessThan(earlyDelta)
    })

    test('crawl resumes and keeps advancing after a throw', async ({ page }) => {
      // Leave playing = true so the crawl resumes once inertia settles.
      await dragMarquee(page, 'marquee-drag', -300, 5)

      // Let inertia finish and crawl ramp back up
      await page.waitForTimeout(2000)
      const a = await getPos(page, 'marquee-drag')
      await page.waitForTimeout(500)
      const b = await getPos(page, 'marquee-drag')

      expect(b).toBeGreaterThan(a)
    })
  })
})
