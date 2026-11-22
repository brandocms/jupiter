// @ts-check
const { test, expect } = require('@playwright/test')
const { serveFixtureImages } = require('./fixtures/images')

test.describe('Jupiter Lightbox Module', () => {
  test.beforeEach(async ({ page }) => {
    await serveFixtureImages(page)
    await page.goto('/lightbox.html')

  })

  test('should open lightbox when image is clicked', async ({ page }) => {
    const galleryItem = page.locator('[data-testid="gallery-item-1"]')

    // Click the first gallery item
    await galleryItem.click()

    // Lightbox backdrop should be visible
    const backdrop = page.locator('.lightbox-backdrop')
    await expect(backdrop).toBeVisible()

    // Check opacity is close to 1
    await expect(backdrop).toHaveCSS('opacity', '1')
  })

  test('should display correct image in lightbox', async ({ page }) => {
    const galleryItem = page.locator('[data-testid="gallery-item-2"]')

    // Click the second gallery item
    await galleryItem.click()

    // Check which index is active
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '1')

    // The lightbox image with that index should have the correct src
    const lightboxImage = page.locator('.lightbox-image[data-idx="1"]')
    const src = await lightboxImage.getAttribute('src')
    expect(src).toContain('picsum.photos/id/20')
  })

  test('should close lightbox with close button', async ({ page }) => {
    // Open lightbox
    await page.locator('[data-testid="gallery-item-1"]').click()

    const backdrop = page.locator('.lightbox-backdrop')
    await expect(backdrop).toBeVisible()

    // Click close button
    const closeButton = page.locator('.lightbox-close')
    await closeButton.click()

    // Lightbox should be hidden
    await expect(backdrop).not.toBeVisible()
  })

  test('should navigate to next image with arrow button', async ({ page }) => {
    // Open lightbox on first image
    await page.locator('[data-testid="gallery-item-1"]').click()

    // Verify first image is active
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '0')

    // Click next button
    const nextButton = page.locator('.lightbox-next')
    await nextButton.click()

    // Second image should now be active
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '1')
  })

  test('should navigate to previous image with arrow button', async ({ page }) => {
    // Open lightbox on second image
    await page.locator('[data-testid="gallery-item-2"]').click()

    // Verify second image is active
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '1')

    // Click previous button
    const prevButton = page.locator('.lightbox-prev')
    await prevButton.click()

    // First image should now be active
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '0')
  })

  test('should navigate with keyboard arrows', async ({ page }) => {
    // Open lightbox
    await page.locator('[data-testid="gallery-item-1"]').click()

    // Press right arrow key
    await page.keyboard.press('ArrowRight')

    // Second image should be active
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '1')

    // Press left arrow key
    await page.keyboard.press('ArrowLeft')

    // First image should be active again
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '0')
  })

  test('should close with Escape key', async ({ page }) => {
    // Open lightbox
    await page.locator('[data-testid="gallery-item-1"]').click()

    const backdrop = page.locator('.lightbox-backdrop')
    await expect(backdrop).toBeVisible()

    // Press Escape key
    await page.keyboard.press('Escape')

    // Lightbox should be closed
    await expect(backdrop).not.toBeVisible()
  })

  test('should update active dot indicator', async ({ page }) => {
    // Open lightbox on first image
    await page.locator('[data-testid="gallery-item-1"]').click()

    // First dot should be active
    const dots = page.locator('.lightbox-dots a')
    const firstDot = dots.nth(0)
    await expect(firstDot).toHaveClass(/active/)

    // Navigate to next image
    await page.keyboard.press('ArrowRight')

    // Second dot should be active
    const secondDot = dots.nth(1)
    await expect(secondDot).toHaveClass(/active/)

    // First dot should not be active anymore
    await expect(firstDot).not.toHaveClass(/active/)
  })

  test('should navigate with dot clicks', async ({ page }) => {
    // Open lightbox
    await page.locator('[data-testid="gallery-item-1"]').click()

    // Click third dot
    const dots = page.locator('.lightbox-dots a')
    const thirdDot = dots.nth(2)
    await thirdDot.click()

    // Third image should be active (index 2)
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '2')

    // Third dot should be active
    await expect(thirdDot).toHaveClass(/active/)
  })

  test('should wrap around at end of gallery', async ({ page }) => {
    // Open lightbox on last image (6th)
    await page.locator('[data-testid="gallery-item-6"]').click()

    // Verify last image is active (index 5)
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '5')

    // Press right arrow (should wrap to first)
    await page.keyboard.press('ArrowRight')

    // First image should be active (index 0)
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '0')
  })

  test('should wrap around at start of gallery', async ({ page }) => {
    // Open lightbox on first image
    await page.locator('[data-testid="gallery-item-1"]').click()

    // Verify first image is active (index 0)
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '0')

    // Press left arrow (should wrap to last)
    await page.keyboard.press('ArrowLeft')

    // Last image should be active (index 5)
    await expect(page.locator('.lightbox-content')).toHaveAttribute('data-current-idx', '5')
  })

  test('should prevent body scroll when lightbox is open', async ({ page }) => {
    // Open lightbox
    await page.locator('[data-testid="gallery-item-1"]').click()

    // Body should have overflow hidden when lightbox is open
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

    // Close lightbox
    await page.keyboard.press('Escape')

    // Lightbox should be closed
    const backdrop = page.locator('.lightbox-backdrop')
    await expect(backdrop).not.toBeVisible()
  })
})
