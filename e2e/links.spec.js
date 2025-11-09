// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Links Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the links test page from Vite server
    await page.goto('/links.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait for Jupiter initialization
    await page.waitForTimeout(1000)
  })

  test('should scroll smoothly to anchor links', async ({ page }) => {
    // Start at section 1 (top of page)
    const section2 = page.locator('[data-testid="section2"]')
    const link = page.locator('[data-testid="link-to-section2"]')

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY)

    // Click link to section 2
    await link.click()

    // Wait for scroll animation
    await page.waitForTimeout(1000)

    // Check that we scrolled down
    const finalScroll = await page.evaluate(() => window.scrollY)
    expect(finalScroll).toBeGreaterThan(initialScroll)

    // Section 2 should be in viewport
    await expect(section2).toBeInViewport()
  })

  test('should update URL hash on anchor click', async ({ page }) => {
    const link = page.locator('[data-testid="link-to-section3"]')

    // Click link to section 3
    await link.click()

    // Wait for navigation
    await page.waitForTimeout(500)

    // URL should have #section3 hash
    expect(page.url()).toContain('#section3')
  })

  test('should handle external links with target="_blank"', async ({ page }) => {
    const externalLink = page.locator('[data-testid="external-link"]')

    // External link should have target="_blank"
    await expect(externalLink).toHaveAttribute('target', '_blank')
  })

  test('should handle multiple anchor navigations', async ({ page }) => {
    // Navigate to section 2
    await page.locator('[data-testid="link-to-section2"]').click()
    await page.waitForTimeout(1000)
    expect(page.url()).toContain('#section2')
    await expect(page.locator('[data-testid="section2"]')).toBeInViewport()

    // Navigate to section 3
    await page.locator('[data-testid="link-to-section3-from-2"]').click()
    await page.waitForTimeout(1000)
    expect(page.url()).toContain('#section3')
    await expect(page.locator('[data-testid="section3"]')).toBeInViewport()

    // Navigate back to section 1
    await page.locator('[data-testid="link-to-section1-from-3"]').click()
    await page.waitForTimeout(1000)
    expect(page.url()).toContain('#section1')
    await expect(page.locator('[data-testid="section1"]')).toBeInViewport()
  })

  test('should account for sticky header in scroll position', async ({ page }) => {
    const section2 = page.locator('[data-testid="section2"]')

    // Click link to section 2
    await page.locator('[data-testid="link-to-section2"]').click()
    await page.waitForTimeout(1000)

    // Section 2 should be in viewport (not scrolled way off screen)
    await expect(section2).toBeInViewport()

    // Check that we scrolled to approximately the right position
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeGreaterThan(100) // Should have scrolled down
  })

  test('should scroll to top when clicking section1 link', async ({ page }) => {
    // First scroll down to section 3
    await page.locator('[data-testid="link-to-section3"]').click()
    await page.waitForTimeout(1000)

    // Verify we're scrolled down
    let scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeGreaterThan(100)

    // Click back to section 1
    await page.locator('[data-testid="link-to-section1-from-3"]').click()
    await page.waitForTimeout(1000)

    // Should be near top of page
    scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(200)
  })
})
