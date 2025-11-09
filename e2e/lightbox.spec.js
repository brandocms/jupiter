// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Lightbox Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the lightbox test page from Vite server
    await page.goto('/lightbox.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait for Jupiter initialization
    await page.waitForTimeout(1000)
  })

  test('should open lightbox when image is clicked', async ({ page }) => {
    const galleryItem = page.locator('[data-testid="gallery-item-1"]')

    // Click the first gallery item
    await galleryItem.click()

    // Wait for lightbox animation
    await page.waitForTimeout(700)

    // Lightbox backdrop should be visible
    const backdrop = page.locator('.lightbox-backdrop')
    await expect(backdrop).toBeVisible()

    // Check opacity is close to 1
    const opacity = await backdrop.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })
    expect(parseFloat(opacity)).toBeGreaterThan(0.9)
  })

  test('should display correct image in lightbox', async ({ page }) => {
    const galleryItem = page.locator('[data-testid="gallery-item-2"]')

    // Click the second gallery item
    await galleryItem.click()

    // Wait for lightbox
    await page.waitForTimeout(1000)

    // Check which index is active
    const currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('1') // Second image (0-indexed)

    // The lightbox image with that index should have the correct src
    const lightboxImage = page.locator(`.lightbox-image[data-idx="${currentIdx}"]`)
    const src = await lightboxImage.getAttribute('src')
    expect(src).toContain('picsum.photos/id/20')
  })

  test('should close lightbox with close button', async ({ page }) => {
    // Open lightbox
    await page.locator('[data-testid="gallery-item-1"]').click()
    await page.waitForTimeout(700)

    const backdrop = page.locator('.lightbox-backdrop')
    await expect(backdrop).toBeVisible()

    // Click close button
    const closeButton = page.locator('.lightbox-close')
    await closeButton.click()

    // Wait for close animation
    await page.waitForTimeout(600)

    // Lightbox should be hidden
    await expect(backdrop).not.toBeVisible()
  })

  test('should navigate to next image with arrow button', async ({ page }) => {
    // Open lightbox on first image
    await page.locator('[data-testid="gallery-item-1"]').click()
    await page.waitForTimeout(1000)

    // Verify first image is active
    let currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('0')

    // Click next button
    const nextButton = page.locator('.lightbox-next')
    await nextButton.click()
    await page.waitForTimeout(700)

    // Second image should now be active
    currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('1')
  })

  test('should navigate to previous image with arrow button', async ({ page }) => {
    // Open lightbox on second image
    await page.locator('[data-testid="gallery-item-2"]').click()
    await page.waitForTimeout(1000)

    // Verify second image is active
    let currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('1')

    // Click previous button
    const prevButton = page.locator('.lightbox-prev')
    await prevButton.click()
    await page.waitForTimeout(700)

    // First image should now be active
    currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('0')
  })

  test('should navigate with keyboard arrows', async ({ page }) => {
    // Open lightbox
    await page.locator('[data-testid="gallery-item-1"]').click()
    await page.waitForTimeout(1000)

    // Press right arrow key
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(700)

    // Second image should be active
    let currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('1')

    // Press left arrow key
    await page.keyboard.press('ArrowLeft')
    await page.waitForTimeout(700)

    // First image should be active again
    currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('0')
  })

  test('should close with Escape key', async ({ page }) => {
    // Open lightbox
    await page.locator('[data-testid="gallery-item-1"]').click()
    await page.waitForTimeout(700)

    const backdrop = page.locator('.lightbox-backdrop')
    await expect(backdrop).toBeVisible()

    // Press Escape key
    await page.keyboard.press('Escape')
    await page.waitForTimeout(600)

    // Lightbox should be closed
    await expect(backdrop).not.toBeVisible()
  })

  test('should update active dot indicator', async ({ page }) => {
    // Open lightbox on first image
    await page.locator('[data-testid="gallery-item-1"]').click()
    await page.waitForTimeout(1000)

    // First dot should be active
    const dots = page.locator('.lightbox-dots a')
    const firstDot = dots.nth(0)
    await expect(firstDot).toHaveClass(/active/)

    // Navigate to next image
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(700)

    // Second dot should be active
    const secondDot = dots.nth(1)
    await expect(secondDot).toHaveClass(/active/)

    // First dot should not be active anymore
    await expect(firstDot).not.toHaveClass(/active/)
  })

  test('should navigate with dot clicks', async ({ page }) => {
    // Open lightbox
    await page.locator('[data-testid="gallery-item-1"]').click()
    await page.waitForTimeout(1000)

    // Click third dot
    const dots = page.locator('.lightbox-dots a')
    const thirdDot = dots.nth(2)
    await thirdDot.click()
    await page.waitForTimeout(700)

    // Third image should be active (index 2)
    const currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('2')

    // Third dot should be active
    await expect(thirdDot).toHaveClass(/active/)
  })

  test('should wrap around at end of gallery', async ({ page }) => {
    // Open lightbox on last image (6th)
    await page.locator('[data-testid="gallery-item-6"]').click()
    await page.waitForTimeout(1000)

    // Verify last image is active (index 5)
    let currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('5')

    // Press right arrow (should wrap to first)
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(700)

    // First image should be active (index 0)
    currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('0')
  })

  test('should wrap around at start of gallery', async ({ page }) => {
    // Open lightbox on first image
    await page.locator('[data-testid="gallery-item-1"]').click()
    await page.waitForTimeout(1000)

    // Verify first image is active (index 0)
    let currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('0')

    // Press left arrow (should wrap to last)
    await page.keyboard.press('ArrowLeft')
    await page.waitForTimeout(700)

    // Last image should be active (index 5)
    currentIdx = await page.locator('.lightbox-content').getAttribute('data-current-idx')
    expect(currentIdx).toBe('5')
  })

  test('should prevent body scroll when lightbox is open', async ({ page }) => {
    // Open lightbox
    await page.locator('[data-testid="gallery-item-1"]').click()
    await page.waitForTimeout(700)

    // Body should have overflow hidden when lightbox is open
    const openOverflow = await page.evaluate(() => {
      return document.body.style.overflow
    })
    expect(openOverflow).toBe('hidden')

    // Close lightbox
    await page.keyboard.press('Escape')
    await page.waitForTimeout(800)

    // Lightbox should be closed
    const backdrop = page.locator('.lightbox-backdrop')
    await expect(backdrop).not.toBeVisible()
  })
})
