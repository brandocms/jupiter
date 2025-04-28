// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Popover Module with Click Toggle', () => {
  test.beforeEach(async ({ page }) => {
    // Load the popover test page from Vite server
    await page.goto('/popover.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Initialize a popover with clickToggle enabled
    await page.evaluate(() => {
      // Get the click trigger element
      const clickTrigger = document.querySelector('[data-testid="click-trigger"]')
      
      // Initialize the popover with clickToggle enabled
      const popover = new window.Popover(window.app, clickTrigger, {
        clickToggle: true
      })
      
      // Add to app's popovers array for tracking
      window.app.popovers.push(popover)
    })
  })

  test('should show popover on click and hide on outside click', async ({ page }) => {
    // Get the click trigger element
    const clickTrigger = page.locator('[data-testid="click-trigger"]')

    // Initially, no popover should be visible in the DOM
    const initialPopoverCount = await page.locator('.popover').count()
    expect(initialPopoverCount).toBe(0)

    // Click the trigger
    await clickTrigger.click()

    // Now the popover should be visible in the DOM
    const popover = page.locator('.popover')
    await expect(popover).toBeVisible()

    // Check if popover contains the expected content
    const popoverContent = await popover.innerHTML()
    expect(popoverContent).toContain('Click Popover')
    
    // Check if custom class from template is added to popover
    await expect(popover).toHaveClass(/custom-popover-class/)

    // Click outside the popover to hide it
    await page.mouse.click(10, 10)

    // Popover should be removed from the DOM
    const finalPopoverCount = await page.locator('.popover').count()
    expect(finalPopoverCount).toBe(0)
  })

  test('should toggle popover on repeated clicks on trigger', async ({ page }) => {
    // Get the click trigger element
    const clickTrigger = page.locator('[data-testid="click-trigger"]')

    // Click to show
    await clickTrigger.click()
    let popoverCount = await page.locator('.popover').count()
    expect(popoverCount).toBe(1)

    // Click again to hide
    await clickTrigger.click()
    popoverCount = await page.locator('.popover').count()
    expect(popoverCount).toBe(0)

    // Click a third time to show again
    await clickTrigger.click()
    popoverCount = await page.locator('.popover').count()
    expect(popoverCount).toBe(1)
  })

  test('should only show one popover at a time by default', async ({ page }) => {
    // Initialize a second popover with clickToggle
    await page.evaluate(() => {
      // Get another trigger element
      const secondTrigger = document.querySelector('[data-testid="basic-trigger"]')
      
      // Initialize the popover with clickToggle enabled
      const popover = new window.Popover(window.app, secondTrigger, {
        clickToggle: true
      })
      
      // Add to app's popovers array
      window.app.popovers.push(popover)
    })

    // Get both trigger elements
    const firstTrigger = page.locator('[data-testid="click-trigger"]')
    const secondTrigger = page.locator('[data-testid="basic-trigger"]')

    // Click first trigger
    await firstTrigger.click()
    
    // First popover should be visible
    let popoverCount = await page.locator('.popover').count()
    expect(popoverCount).toBe(1)
    
    // Check content to ensure it's the first popover
    let popoverContent = await page.locator('.popover').innerHTML()
    expect(popoverContent).toContain('Click Popover')

    // Click second trigger
    await secondTrigger.click()
    
    // Should still be only one popover
    popoverCount = await page.locator('.popover').count()
    expect(popoverCount).toBe(1)
    
    // But now it should be the second popover
    popoverContent = await page.locator('.popover').innerHTML()
    expect(popoverContent).toContain('Basic Popover')
  })

  test('should allow multiple popovers when allowMultiple is true', async ({ page }) => {
    // Initialize a second popover with clickToggle and allowMultiple
    await page.evaluate(() => {
      // Get another trigger element
      const secondTrigger = document.querySelector('[data-testid="basic-trigger"]')
      
      // Initialize the popover with clickToggle and allowMultiple enabled
      const popover = new window.Popover(window.app, secondTrigger, {
        clickToggle: true,
        allowMultiple: true
      })
      
      // Add to app's popovers array
      window.app.popovers.push(popover)
    })

    // Get both trigger elements
    const firstTrigger = page.locator('[data-testid="click-trigger"]')
    const secondTrigger = page.locator('[data-testid="basic-trigger"]')

    // Click first trigger
    await firstTrigger.click()
    
    // First popover should be visible
    let popoverCount = await page.locator('.popover').count()
    expect(popoverCount).toBe(1)

    // Click second trigger
    await secondTrigger.click()
    
    // Now both popovers should be visible
    popoverCount = await page.locator('.popover').count()
    expect(popoverCount).toBe(2)
    
    // Click outside to close both
    await page.mouse.click(10, 10)
    
    // All popovers should be closed
    popoverCount = await page.locator('.popover').count()
    expect(popoverCount).toBe(0)
  })
})