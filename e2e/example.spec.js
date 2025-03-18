// @ts-check
const { test, expect } = require('@playwright/test')
const path = require('path')

test.describe('Jupiter Module Example Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Use file protocol to load the fixture
    await page.goto(`file://${path.resolve(__dirname, './fixtures/test-page.html')}`)
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')
  })
  
  test('Moonwalk animation should work correctly', async ({ page }) => {
    // Example assertion for Moonwalk animation
    const moonwalkElement = page.locator('.moonwalk')
    await expect(moonwalkElement).toBeVisible()
    
    // Check if animation class is applied after scroll
    await moonwalkElement.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500) // Wait a bit for animation
    
    // Check if moonwalk is applied
    await expect(moonwalkElement).toHaveClass(/is-in-view/, { timeout: 5000 })
  })

  test('Toggler component should toggle elements', async ({ page }) => {
    const togglerButton = page.locator('[data-toggler="toggle-example"]')
    const toggleTarget = page.locator('[data-toggler-target="toggle-example"]')
    
    await togglerButton.scrollIntoViewIfNeeded()
    
    // Check initial state
    await expect(toggleTarget).not.toBeVisible()
    
    // Trigger toggle
    await togglerButton.click()
    
    // Wait for the toggle to take effect
    await page.waitForTimeout(300)
    
    // Check if toggled
    await expect(toggleTarget).toBeVisible()
    await expect(toggleTarget).toHaveClass(/is-active/)
    
    // Toggle back
    await togglerButton.click()
    
    // Wait for the toggle to take effect
    await page.waitForTimeout(300)
    
    // Check if toggled back
    await expect(toggleTarget).not.toBeVisible()
  })
})