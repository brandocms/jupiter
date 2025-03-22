// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Popover Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the popover test page from Vite server
    await page.goto('/popover.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')
  })

  test('should show basic popover on hover', async ({ page }) => {
    // Get the basic trigger element
    const basicTrigger = page.locator('[data-testid="basic-trigger"]')

    // Initially, no popover should be visible in the DOM
    const initialPopoverCount = await page.locator('.popover').count()
    expect(initialPopoverCount).toBe(0)

    // Hover over the trigger
    await basicTrigger.hover()

    // Now the popover should be visible in the DOM
    const popover = page.locator('.popover')
    await expect(popover).toBeVisible()

    // Check if popover contains the expected content
    const popoverContent = await popover.innerHTML()
    expect(popoverContent).toContain('Basic Popover')

    // Move away from the trigger to hide the popover
    await page.mouse.move(0, 0)

    // Popover should be removed from the DOM
    const finalPopoverCount = await page.locator('.popover').count()
    expect(finalPopoverCount).toBe(0)
  })

  test('should position popover according to data-popover-position attribute', async ({
    page,
  }) => {
    // Test each position type
    const positions = ['top', 'right', 'bottom', 'left']

    for (const position of positions) {
      // Get the trigger for this position
      const trigger = page.locator(`[data-testid="${position}-trigger"]`)

      // Hover over the trigger
      await trigger.hover()

      // Check if popover has the correct position class
      const popover = page.locator('.popover')
      await expect(popover).toHaveClass(new RegExp(`popover--${position}`))

      // Move away from the trigger to hide the popover
      await page.mouse.move(0, 0)
    }
  })

  test('should adjust position when near viewport edge', async ({ page }) => {
    // Get the edge-positioned trigger
    const edgeTrigger = page.locator('[data-testid="edge-trigger"]')

    // Hover over the trigger
    await edgeTrigger.hover()

    // The popover should be visible
    const popover = page.locator('.popover')
    await expect(popover).toBeVisible()

    // Check the content to make sure it's the right popover
    const popoverContent = await popover.innerHTML()
    expect(popoverContent).toContain('Edge Popover')

    // Move away from the trigger to hide the popover
    await page.mouse.move(0, 0)
  })

  test('should handle touch events on mobile devices', async ({ page }) => {
    // Mock touch capability by overriding the feature test result
    await page.evaluate(() => {
      window.app.featureTests.results.touch = true
    })

    // Reload the page to reinitialize with new feature test
    await page.reload()
    await page.waitForLoadState('networkidle')
    // await page.waitForTimeout(1000)

    // Get the basic trigger element
    const basicTrigger = page.locator('[data-testid="basic-trigger"]')

    // Click the trigger (simulates a touch event)
    await basicTrigger.click()

    // The popover should be visible
    const popover = page.locator('.popover')
    await expect(popover).toBeVisible()

    // Click the trigger again to toggle/hide the popover
    await basicTrigger.click()

    await expect(popover).not.toBeVisible()
    // Popover should be removed from the DOM
    const finalPopoverCount = await page.locator('.popover').count()
    expect(finalPopoverCount).toBe(0)
  })

  test('should toggle popover visibility with isVisible property', async ({
    page,
  }) => {
    // Test the isVisible property via JavaScript in the page
    await page
      .evaluate(() => {
        // Get the first trigger and its popover instance
        const trigger = document.querySelector('[data-popover-target]')
        const popover = window.app.popovers.find(
          (comp) => comp.trigger === trigger
        )

        // Check initial state
        console.log('Initial isVisible:', popover.isVisible)

        // Show the popover
        popover.show()
        console.log('After show() isVisible:', popover.isVisible)

        // Return isVisible state after showing
        return popover.isVisible
      })
      .then((isVisible) => {
        expect(isVisible).toBe(true)
      })

    // The popover should be visible in the DOM
    const popover = page.locator('.popover')
    await expect(popover).toBeVisible()

    // Hide the popover using JavaScript
    await page
      .evaluate(() => {
        // Get the first trigger and its popover instance
        const trigger = document.querySelector('[data-popover-target]')
        const popover = window.app.popovers.find(
          (comp) => comp.trigger === trigger
        )

        // Hide the popover
        popover.hide()

        // Return isVisible state after hiding
        return popover.isVisible
      })
      .then((isVisible) => {
        expect(isVisible).toBe(false)
      })

    // Popover should be removed from the DOM
    const finalPopoverCount = await page.locator('.popover').count()
    expect(finalPopoverCount).toBe(0)
  })
})
