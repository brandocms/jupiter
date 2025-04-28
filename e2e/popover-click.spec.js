// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Popover Module with Click Toggle', () => {
  test.beforeEach(async ({ page }) => {
    // Load the popover test page from Vite server
    await page.goto('/popover.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')
    
    // Clear any existing popovers to start fresh
    await page.evaluate(() => {
      // The test page now automatically initializes the click popover,
      // but we'll reset the popovers array to ensure a clean state
      if (window.app.popovers) {
        window.app.popovers.forEach(popover => {
          if (popover.isVisible) {
            popover.hide();
          }
        });
      }
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
    // Make sure the basic-trigger is also using click toggle for this test
    await page.evaluate(() => {
      // Find the existing popover for the basic trigger
      const basicTrigger = document.querySelector('[data-testid="basic-trigger"]')
      const existingPopover = window.app.popovers.find(p => p.trigger === basicTrigger)
      
      // Remove it if it exists
      if (existingPopover) {
        const index = window.app.popovers.indexOf(existingPopover)
        if (index !== -1) {
          window.app.popovers.splice(index, 1)
        }
      }
      
      // Add a new one with clickToggle
      const popover = new window.Popover(window.app, basicTrigger, {
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
    // Setup popovers for this test: one normal click popover, one with allowMultiple
    await page.evaluate(() => {
      // First clear all existing popovers
      window.app.popovers.forEach(popover => {
        if (popover.isVisible) {
          popover.hide();
        }
      });
      window.app.popovers = [];
      
      // Create the click popover (first one)
      const clickTrigger = document.querySelector('[data-testid="click-trigger"]')
      const clickPopover = new window.Popover(window.app, clickTrigger, {
        clickToggle: true
      });
      window.app.popovers.push(clickPopover);
      
      // Create the basic trigger with allowMultiple
      const basicTrigger = document.querySelector('[data-testid="basic-trigger"]')
      const basicPopover = new window.Popover(window.app, basicTrigger, {
        clickToggle: true,
        allowMultiple: true
      });
      window.app.popovers.push(basicPopover);
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