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
    const toggleButton = page.locator('button[data-toggler="toggle-example"]')
    const toggleTarget = page.locator('.toggle-target[data-toggler-target="toggle-example"]')
    
    // Target should initially be hidden
    await expect(toggleTarget).not.toBeVisible()
    
    // Click the toggle button
    await toggleButton.click()
    
    // Target should now be visible and have active class
    await expect(toggleTarget).toBeVisible()
    await expect(toggleTarget).toHaveClass(/is-active/)
    
    // Click toggle button again
    await toggleButton.click()
    
    // Target should be hidden again
    await expect(toggleTarget).not.toBeVisible()
    await expect(toggleTarget).not.toHaveClass(/is-active/)
  })

  test('should toggle multiple targets with a single button', async ({ page }) => {
    // Get the toggle button and targets
    const multiToggleButton = page.locator('button[data-toggler="multi-toggle"]')
    const multiToggleTargets = page.locator('.toggle-target[data-toggler-target="multi-toggle"]')
    
    // Should have 3 targets and all should be hidden initially
    await expect(multiToggleTargets).toHaveCount(3)
    
    for (let i = 0; i < 3; i++) {
      await expect(multiToggleTargets.nth(i)).not.toBeVisible()
    }
    
    // Click the toggle button
    await multiToggleButton.click()
    
    // All targets should now be visible
    for (let i = 0; i < 3; i++) {
      await expect(multiToggleTargets.nth(i)).toBeVisible()
      await expect(multiToggleTargets.nth(i)).toHaveClass(/is-active/)
    }
    
    // Click toggle button again
    await multiToggleButton.click()
    
    // All targets should be hidden again
    for (let i = 0; i < 3; i++) {
      await expect(multiToggleTargets.nth(i)).not.toBeVisible()
      await expect(multiToggleTargets.nth(i)).not.toHaveClass(/is-active/)
    }
  })

  test('should function as an accordion', async ({ page }) => {
    // Get the accordion headers and contents
    const accordionHeaders = page.locator('.accordion-header')
    const accordionContents = page.locator('.accordion-content')
    
    // Should have 3 sections
    await expect(accordionHeaders).toHaveCount(3)
    await expect(accordionContents).toHaveCount(3)
    
    // All contents should be hidden initially
    for (let i = 0; i < 3; i++) {
      await expect(accordionContents.nth(i)).not.toBeVisible()
    }
    
    // Click the first accordion header
    await accordionHeaders.nth(0).click()
    
    // First content should be visible, others still hidden
    await expect(accordionContents.nth(0)).toBeVisible()
    await expect(accordionContents.nth(0)).toHaveClass(/is-active/)
    await expect(accordionContents.nth(1)).not.toBeVisible()
    await expect(accordionContents.nth(2)).not.toBeVisible()
    
    // Click the second accordion header
    await accordionHeaders.nth(1).click()
    
    // First and second content should be visible, third still hidden
    await expect(accordionContents.nth(0)).toBeVisible()
    await expect(accordionContents.nth(1)).toBeVisible()
    await expect(accordionContents.nth(1)).toHaveClass(/is-active/)
    await expect(accordionContents.nth(2)).not.toBeVisible()
    
    // Click the first header again to close it
    await accordionHeaders.nth(0).click()
    
    // First should now be hidden, second still visible
    await expect(accordionContents.nth(0)).not.toBeVisible()
    await expect(accordionContents.nth(0)).not.toHaveClass(/is-active/)
    await expect(accordionContents.nth(1)).toBeVisible()
  })
})