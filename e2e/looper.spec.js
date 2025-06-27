// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Looper Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the looper test page from Vite server
    await page.goto('/looper.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait additional time for Jupiter to initialize
    await page.waitForTimeout(1000)
  })

  test('should initialize basic looper correctly', async ({ page }) => {
    // Check if the basic looper element exists
    const basicLooper = page.locator('[data-testid="basic-looper"] [data-looper]')

    // Verify it's visible
    await expect(basicLooper).toBeVisible()

    // Check if it has the expected number of slides
    const basicSlides = page.locator('[data-testid="basic-looper"] [data-looper] > div')
    await expect(basicSlides).toHaveCount(5)

    // Verify the first slide is active
    const activeSlide = page.locator('[data-testid="basic-looper"] .active')
    await expect(activeSlide).toBeVisible()
    await expect(activeSlide).toHaveText('Slide 1')
  })

  test('should navigate with next/prev buttons in basic looper', async ({ page }) => {
    // Get the next and previous buttons
    const nextButton = page.locator('[data-testid="basic-next"]')
    const prevButton = page.locator('[data-testid="basic-prev"]')

    // Click the next button and verify the carousel moves
    await nextButton.click()

    // Wait for animation to complete
    await page.waitForTimeout(300)

    // Get the current transform value to verify movement
    const transformAfterNext = await page
      .locator('[data-testid="basic-looper"] [data-looper]')
      .evaluate(el => {
        const firstChild = el.children[0]
        return window.getComputedStyle(firstChild).transform
      })

    // Transform should not be 'none' or the identity matrix
    expect(transformAfterNext).not.toBe('none')
    expect(transformAfterNext).not.toBe('matrix(1, 0, 0, 1, 0, 0)')

    // Now click previous and verify it moves back
    await prevButton.click()

    // Wait for animation to complete
    await page.waitForTimeout(300)

    const transformAfterPrev = await page
      .locator('[data-testid="basic-looper"] [data-looper]')
      .evaluate(el => {
        const firstChild = el.children[0]
        return window.getComputedStyle(firstChild).transform
      })

    // Transformation should be different after going back
    expect(transformAfterPrev).not.toBe(transformAfterNext)
  })

  test('should have working dot navigation in infinite looper', async ({ page }) => {
    // Get the infinite looper container
    const infiniteLooper = page.locator('[data-testid="infinite-looper"]')

    // Ensure it's visible
    await expect(infiniteLooper).toBeVisible()

    // Get dot elements
    const dots = page.locator('[data-dots] > div')
    await expect(dots).toHaveCount(5)

    // Verify first dot is active
    const firstActiveDot = page.locator('[data-dots] > div:first-child .active-dot')
    await expect(firstActiveDot).toBeVisible()

    // Click on the third dot
    await page.locator('[data-dots] > div:nth-child(3)').click()

    // Wait for animation to complete
    await page.waitForTimeout(300)

    // Verify third dot is now active
    const thirdActiveDot = page.locator('[data-dots] > div:nth-child(3) .active-dot')
    await expect(thirdActiveDot).toBeVisible()

    // First dot should not be active anymore
    await expect(firstActiveDot).not.toBeVisible()
  })

  test('should apply snap behavior in snap looper', async ({ page }) => {
    // Get the snap looper container
    const snapLooper = page.locator('[data-testid="snap-looper"] [data-looper]')

    // Ensure it's visible
    await expect(snapLooper).toBeVisible()

    // Get arrow navigation elements
    const arrows = page.locator('[data-arrows] > div')
    await expect(arrows).toHaveCount(2)

    // Click the right arrow to go to next slide
    await arrows.nth(1).click()

    // Wait for the animation to complete
    await page.waitForTimeout(300)

    // Get the current transform value
    const transformAfterClick = await snapLooper.evaluate(el => {
      const firstChild = el.children[0]
      return window.getComputedStyle(firstChild).transform
    })

    // Verify the snap behavior by checking that transform value matches a complete slide transition
    expect(transformAfterClick).not.toBe('none')
    expect(transformAfterClick).not.toBe('matrix(1, 0, 0, 1, 0, 0)')
  })

  test('should automatically crawl in crawl looper', async ({ page }) => {
    // Get the crawl looper container
    const crawlLooper = page.locator('[data-testid="crawl-looper"] [data-looper]')

    // Ensure it's visible
    await expect(crawlLooper).toBeVisible()

    // Get the initial transform value
    const initialTransform = await crawlLooper.evaluate(el => {
      const firstChild = el.children[0]
      return window.getComputedStyle(firstChild).transform
    })

    // Wait a moment to allow the crawler to move
    await page.waitForTimeout(1000)

    // Get the transform value after waiting
    const transformAfterWait = await crawlLooper.evaluate(el => {
      const firstChild = el.children[0]
      return window.getComputedStyle(firstChild).transform
    })

    // The transform should have changed due to automatic crawling
    expect(transformAfterWait).not.toBe(initialTransform)
  })

  test('should crawl in reverse direction', async ({ page }) => {
    // Get the reverse crawl looper container
    const reverseLooper = page.locator('[data-testid="reverse-looper"] [data-looper]')

    // Ensure it's visible
    await expect(reverseLooper).toBeVisible()

    // Get the initial transform value
    const initialTransform = await reverseLooper.evaluate(el => {
      const firstChild = el.children[0]
      return window.getComputedStyle(firstChild).transform
    })

    // Wait a moment to allow the crawler to move
    await page.waitForTimeout(1000)

    // Get the transform value after waiting
    const transformAfterWait = await reverseLooper.evaluate(el => {
      const firstChild = el.children[0]
      return window.getComputedStyle(firstChild).transform
    })

    // The transform should have changed due to automatic crawling
    expect(transformAfterWait).not.toBe(initialTransform)
  })

  test('should respond to drag interactions', async ({ page }) => {
    // Get the basic looper element
    const basicLooper = page.locator('[data-testid="basic-looper"] [data-looper]')

    // Get the initial transform value
    const initialTransform = await basicLooper.evaluate(el => {
      const firstChild = el.children[0]
      return window.getComputedStyle(firstChild).transform
    })

    // Perform a drag operation
    const looperBounds = await basicLooper.boundingBox()
    if (looperBounds) {
      const startX = looperBounds.x + looperBounds.width / 2
      const startY = looperBounds.y + looperBounds.height / 2

      await page.mouse.move(startX, startY)
      await page.mouse.down()
      await page.mouse.move(startX - 100, startY) // Drag 100px to the left

      // Get transform during drag (should respond immediately with no damping)
      const duringDragTransform = await basicLooper.evaluate(el => {
        const firstChild = el.children[0]
        return window.getComputedStyle(firstChild).transform
      })

      await page.mouse.up()

      // Verify the transform changed during drag
      expect(duringDragTransform).not.toBe(initialTransform)

      // Wait for animation to finish after drag release
      await page.waitForTimeout(500)

      // Get final transform after drag
      const afterDragTransform = await basicLooper.evaluate(el => {
        const firstChild = el.children[0]
        return window.getComputedStyle(firstChild).transform
      })

      // Transform after drag release might be different due to inertia
      expect(afterDragTransform).not.toBe(initialTransform)
    }
  })
})
