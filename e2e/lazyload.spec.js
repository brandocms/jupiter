// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Lazyload Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the lazyload test page from Vite server
    await page.goto('/lazyload.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait additional time for Jupiter to initialize
    await page.waitForTimeout(1000)
  })

  test('should initialize and mark images with appropriate attributes', async ({
    page,
  }) => {
    // First image should be initialized
    const firstImage = page.locator('[data-testid="landscape-image"]')
    await expect(firstImage).toBeVisible()

    // Check if parent picture element has the initialized attribute
    const firstPicture = page.locator('[data-testid="landscape-picture"]')
    await expect(firstPicture).toHaveAttribute('data-ll-srcset-initialized')
  })

  test('should lazy load images when scrolled into view', async ({ page }) => {
    // Second image (below the fold)
    const secondImage = page.locator('[data-testid="portrait-image"]')

    // Before scrolling, image should have placeholder attributes
    await expect(secondImage).toHaveAttribute('data-ll-blurred')
    await expect(secondImage).not.toHaveAttribute('data-ll-ready')
    await expect(secondImage).not.toHaveAttribute('data-ll-loaded')

    // Scroll to the second image
    await secondImage.scrollIntoViewIfNeeded()

    // Wait for image to be loaded and revealed
    await expect(secondImage).toHaveAttribute('data-ll-ready', {
      timeout: 10000,
    })
    await expect(secondImage).toHaveAttribute('data-ll-loaded', {
      timeout: 10000,
    })

    // Check if image src has been updated from data-src
    const dataSrc = await secondImage.getAttribute('data-src')
    const currentSrc = await secondImage.evaluate((el) => el.currentSrc)

    // Current source should not be the placeholder anymore
    expect(currentSrc).not.toBe(dataSrc)
  })

  test('should load all images in a lazyload section when section becomes visible', async ({
    page,
  }) => {
    // Get the lazyload section
    const lazyloadSection = page.locator('[data-testid="lazyload-section"]')
    const sectionImage = page.locator('[data-testid="section-image"]')

    // Before scrolling, section image should not be loaded
    await expect(sectionImage).not.toHaveAttribute('data-ll-ready')

    // Scroll to the section
    await lazyloadSection.scrollIntoViewIfNeeded()

    // Wait for the section image to be loaded
    await expect(sectionImage).toHaveAttribute('data-ll-ready', {
      timeout: 10000,
    })

    // Check if parent picture has the ready attribute
    const sectionPicture = page.locator('[data-testid="section-picture"]')
    await expect(sectionPicture).toHaveAttribute('data-ll-srcset-ready', {
      timeout: 10000,
    })
  })

  test('should update sizes attribute for auto-sized images', async ({
    page,
  }) => {
    // First image has data-sizes="auto"
    const firstImage = page.locator('[data-testid="landscape-image"]')

    // Check if sizes attribute was set
    await expect(firstImage).toHaveAttribute('sizes')

    // Get the sizes value and ensure it's not empty
    const sizesValue = await firstImage.getAttribute('sizes')
    expect(sizesValue).toBeTruthy()
    expect(sizesValue).toMatch(/^\d+px$/)

    // Resize window and check if sizes attribute is updated
    await page.setViewportSize({ width: 800, height: 600 })

    // Force a resize event
    await page.evaluate(() => {
      window.dispatchEvent(new Event('resize'))
    })

    // Wait a bit for the resize handler to complete
    await page.waitForTimeout(500)

    // Get the new sizes value after resize
    const newSizesValue = await firstImage.getAttribute('sizes')
    expect(newSizesValue).toBeTruthy()
    expect(newSizesValue).toMatch(/^\d+px$/)
  })

  test('should swap legacy data-ll-image elements when scrolled into view', async ({
    page,
  }) => {
    const legacyImage = page.locator('[data-testid="legacy-image"]')

    // Before scrolling, should not be loaded
    await expect(legacyImage).not.toHaveAttribute('data-ll-loaded')

    // Scroll to the legacy image
    await legacyImage.scrollIntoViewIfNeeded()

    // Wait for image to be swapped
    await expect(legacyImage).toHaveAttribute('data-ll-loaded', {
      timeout: 10000,
    })

    // src should now be the real image
    const src = await legacyImage.getAttribute('src')
    expect(src).toContain('blue-400x300.svg')
  })

  test('should force load images in a container via forceLoad()', async ({
    page,
  }) => {
    const forceLoadImage = page.locator('[data-testid="force-load-image"]')
    const forceLoadPicture = page.locator('[data-testid="force-load-picture"]')

    // Before forceLoad, image should not have ready/loaded attributes
    await expect(forceLoadImage).not.toHaveAttribute('data-ll-ready')
    await expect(forceLoadImage).not.toHaveAttribute('data-ll-loaded')

    // Call forceLoad on the container
    await page.evaluate(() => {
      const container = document.querySelector('[data-testid="force-load-container"]')
      window.__lazyload.forceLoad(container, { reveal: true })
    })

    // Wait for image to be loaded
    await expect(forceLoadPicture).toHaveAttribute('data-ll-srcset-ready', {
      timeout: 10000,
    })

    // With reveal: true, img should also have data-ll-loaded
    await expect(forceLoadImage).toHaveAttribute('data-ll-loaded', {
      timeout: 10000,
    })
  })

  test('should force load without reveal when reveal: false', async ({
    page,
  }) => {
    const forceLoadImage = page.locator('[data-testid="force-load-image"]')

    // Call forceLoad with reveal: false
    await page.evaluate(() => {
      const container = document.querySelector('[data-testid="force-load-container"]')
      window.__lazyload.forceLoad(container, { reveal: false })
    })

    // Wait for sources to be swapped
    await page.locator('[data-testid="force-load-picture"]').evaluate(el => {
      return new Promise(resolve => {
        const check = () => el.hasAttribute('data-ll-srcset-ready') ? resolve(true) : setTimeout(check, 50)
        check()
      })
    })

    // Image should NOT have data-ll-loaded since reveal was false
    await expect(forceLoadImage).not.toHaveAttribute('data-ll-loaded')
  })

  test('should clean up observers on destroy()', async ({ page }) => {
    // Verify lazyload is initialized
    const firstPicture = page.locator('[data-testid="landscape-picture"]')
    await expect(firstPicture).toHaveAttribute('data-ll-srcset-initialized')

    // Call destroy
    await page.evaluate(() => {
      window.__lazyload.destroy()
    })

    // Verify observers are disconnected by checking the instance state
    const state = await page.evaluate(() => {
      const ll = window.__lazyload
      return {
        rafId: ll.rafId,
        resizePendingSize: ll.resizePending.size,
      }
    })

    expect(state.rafId).toBeNull()
    expect(state.resizePendingSize).toBe(0)
  })
})
