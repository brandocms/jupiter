// @ts-check
const { test, expect } = require('@playwright/test')
const path = require('path')

test.describe('Jupiter Components with HTML Fixture', () => {
  test.beforeEach(async ({ page }) => {
    // Load the fixture HTML file
    await page.goto(`file://${path.resolve(__dirname, './fixtures/test-page.html')}`)
  })

  test('Moonwalk animation should activate when scrolled into view', async ({ page }) => {
    const moonwalkElement = page.locator('.moonwalk')
    
    // Element should exist but start without is-in-view class
    await expect(moonwalkElement).toBeVisible()
    await expect(moonwalkElement).not.toHaveClass(/is-in-view/)
    
    // Scroll to the element
    await moonwalkElement.scrollIntoViewIfNeeded()
    
    // Wait for animation to be applied
    await expect(moonwalkElement).toHaveClass(/is-in-view/, { timeout: 5000 })
  })

  test('Toggler should show and hide content', async ({ page }) => {
    const toggleButton = page.locator('[data-toggler="toggle-example"]')
    const toggleTarget = page.locator('[data-toggler-target="toggle-example"]')
    
    // Target should initially be hidden
    await expect(toggleTarget).not.toBeVisible()
    
    // Click toggle button
    await toggleButton.click()
    
    // Target should become visible
    await expect(toggleTarget).toBeVisible()
    await expect(toggleTarget).toHaveClass(/is-active/)
    
    // Click toggle button again
    await toggleButton.click()
    
    // Target should be hidden again
    await expect(toggleTarget).not.toBeVisible()
    await expect(toggleTarget).not.toHaveClass(/is-active/)
  })
})