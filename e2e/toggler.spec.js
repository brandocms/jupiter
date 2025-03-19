// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Toggler Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the toggler test page from Vite server
    await page.goto('/toggler.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait additional time for Jupiter to initialize
    await page.waitForTimeout(1000)
  })

  test('should toggle visibility of target element', async ({ page }) => {
    // Get the toggle button and target
    const toggleButton = page.locator('[data-testid="basic-toggle-button"]')
    const toggleTarget = page.locator('[data-testid="basic-toggle-target"]')

    // Target should initially be hidden
    await expect(toggleTarget).not.toBeVisible()

    // Click the toggle button
    await toggleButton.click()

    // Target should now be visible and have active class
    await expect(toggleTarget).toHaveAttribute('data-toggle-visible')

    // Click toggle button again
    await toggleButton.click()

    // Target should be hidden again
    await expect(toggleTarget).toHaveAttribute('data-toggle-hidden')
  })

  test('should toggle multiple targets with a single button', async ({
    page,
  }) => {
    // Get the toggle button and targets
    const multiToggleButton = page.locator(
      '[data-testid="multi-toggle-button"]'
    )
    const multiToggleTarget1 = page.locator(
      '[data-testid="multi-toggle-target-1"]'
    )
    const multiToggleTarget2 = page.locator(
      '[data-testid="multi-toggle-target-2"]'
    )
    const multiToggleTarget3 = page.locator(
      '[data-testid="multi-toggle-target-3"]'
    )

    // All targets should be hidden initially
    await expect(multiToggleTarget1).not.toBeVisible()
    await expect(multiToggleTarget2).not.toBeVisible()
    await expect(multiToggleTarget3).not.toBeVisible()

    // Click the toggle button
    await multiToggleButton.click()

    // All targets should now be visible
    await expect(multiToggleTarget1).toHaveAttribute('data-toggle-visible')
    await expect(multiToggleTarget2).toHaveAttribute('data-toggle-visible')
    await expect(multiToggleTarget3).toHaveAttribute('data-toggle-visible')

    // Click toggle button again
    await multiToggleButton.click()

    // All targets should be hidden again
    await expect(multiToggleTarget1).toHaveAttribute('data-toggle-hidden')
    await expect(multiToggleTarget2).toHaveAttribute('data-toggle-hidden')
    await expect(multiToggleTarget3).toHaveAttribute('data-toggle-hidden')
  })

  test('should function as an accordion', async ({ page }) => {
    // Get the accordion headers and contents
    const accordionHeader1 = page.locator('[data-testid="accordion-header-1"]')
    const accordionHeader2 = page.locator('[data-testid="accordion-header-2"]')
    const accordionHeader3 = page.locator('[data-testid="accordion-header-3"]')

    const accordionContent1 = page.locator(
      '[data-testid="accordion-content-1"]'
    )
    const accordionContent2 = page.locator(
      '[data-testid="accordion-content-2"]'
    )
    const accordionContent3 = page.locator(
      '[data-testid="accordion-content-3"]'
    )

    // All contents should be hidden initially
    await expect(accordionContent1).not.toBeVisible()
    await expect(accordionContent2).not.toBeVisible()
    await expect(accordionContent3).not.toBeVisible()

    // Click the first accordion header
    await accordionHeader1.click()

    // First content should be visible, others still hidden
    await expect(accordionContent1).toHaveAttribute('data-toggle-visible')
    await expect(accordionContent2).not.toBeVisible()
    await expect(accordionContent3).not.toBeVisible()

    // Click the second accordion header
    await accordionHeader2.click()

    // First and second content should be visible, third still hidden
    await expect(accordionContent1).toHaveAttribute('data-toggle-visible')
    await expect(accordionContent2).toHaveAttribute('data-toggle-visible')
    await expect(accordionContent3).not.toBeVisible()

    // Click the first header again to close it
    await accordionHeader1.click()

    // First should now be hidden, second still visible
    await expect(accordionContent1).toHaveAttribute('data-toggle-hidden')
    await expect(accordionContent2).toHaveAttribute('data-toggle-visible')
  })
})
