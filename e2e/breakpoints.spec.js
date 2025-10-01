// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Breakpoints Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the breakpoints test page from Vite server
    await page.goto('/breakpoints.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait additional time for Jupiter to initialize
    await page.waitForTimeout(1000)
  })

  test('should initialize and set current breakpoint', async ({ page }) => {
    // Check if current breakpoint is displayed
    const currentBreakpoint = page.locator('[data-testid="current-breakpoint"]')

    // Wait for the breakpoint to be set (not "Loading...")
    await expect(currentBreakpoint).not.toHaveText('Loading...')

    // Current breakpoint should be one of the defined breakpoints
    const breakpointText = await currentBreakpoint.textContent()
    expect(breakpointText).toMatch(/^(xs|sm|md|lg|xl)$/)
  })

  test('should activate the correct breakpoint indicator', async ({ page, browserName }) => {
    // Get current breakpoint text
    const currentBreakpoint = page.locator('[data-testid="current-breakpoint"]')

    // Wait for the breakpoint to be set (not "Loading...")
    await expect(currentBreakpoint).not.toHaveText('Loading...')

    const breakpointText = await currentBreakpoint.textContent()

    // Check that the corresponding indicator is active (has the 'active' class)
    const activeIndicator = page.locator(`[data-testid="${breakpointText}-indicator"]`)
    await expect(activeIndicator).toHaveClass(/active/)
    
    // Check that other indicators are not active
    const allBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl']
    for (const bp of allBreakpoints) {
      if (bp !== breakpointText) {
        const indicator = page.locator(`[data-testid="${bp}-indicator"]`)
        await expect(indicator).not.toHaveClass(/active/)
      }
    }
  })

  test('should update breakpoint when viewport size changes', async ({ page }) => {
    // Get the initial breakpoint
    const currentBreakpoint = page.locator('[data-testid="current-breakpoint"]')
    const initialBreakpoint = await currentBreakpoint.textContent()
    
    // Change viewport size to force a breakpoint change
    // Choose a size that will trigger a different breakpoint
    if (['md', 'lg', 'xl'].includes(initialBreakpoint)) {
      // If we're at a larger breakpoint, resize to a smaller one
      await page.setViewportSize({ width: 400, height: 800 })
    } else {
      // If we're at a smaller breakpoint, resize to a larger one
      await page.setViewportSize({ width: 800, height: 800 })
    }
    
    // Wait for breakpoint change event to be processed
    await page.waitForTimeout(500)
    
    // Get the new breakpoint
    const newBreakpoint = await currentBreakpoint.textContent()
    
    // Breakpoint should have changed
    expect(newBreakpoint).not.toBe(initialBreakpoint)
    
    // Check that the correct indicator is now active
    const activeIndicator = page.locator(`[data-testid="${newBreakpoint}-indicator"]`)
    await expect(activeIndicator).toHaveClass(/active/)
  })

  test('should trigger breakpoint listeners and increment change counter', async ({ page }) => {
    // Get the initial counter value
    const counter = page.locator('[data-testid="breakpoint-change-counter"]')
    const initialCount = await counter.textContent()
    
    // Get the log element to check for listener events
    const log = page.locator('[data-testid="breakpoint-log"]')
    
    // Change viewport size to trigger a breakpoint change
    await page.setViewportSize({ width: 400, height: 800 })
    
    // Wait for events to be processed
    await page.waitForTimeout(500)
    
    // Check that counter has increased
    const newCount = await counter.textContent()
    expect(parseInt(newCount)).toBeGreaterThan(parseInt(initialCount))
    
    // Check that log contains entry about breakpoint change
    const logContent = await log.textContent()
    expect(logContent).toContain('Breakpoint changed to:')
  })

  test('should update font size based on current breakpoint', async ({ page }) => {
    // Get the font size display element
    const fontSizeDisplay = page.locator('[data-testid="font-size-display"]')
    const initialFontSize = await fontSizeDisplay.textContent()
    
    // Change viewport to a different breakpoint
    if (await page.evaluate(() => window.innerWidth > 800)) {
      // If we're at a larger viewport, go smaller
      await page.setViewportSize({ width: 400, height: 800 })
    } else {
      // If we're at a smaller viewport, go larger
      await page.setViewportSize({ width: 1000, height: 800 })
    }
    
    // Wait for changes to be processed
    await page.waitForTimeout(500)
    
    // Get the new font size text
    const newFontSize = await fontSizeDisplay.textContent()
    
    // Font size should have changed
    expect(newFontSize).not.toBe(initialFontSize)
  })

  test('should log events when breakpoints change', async ({ page }) => {
    // Get the log element
    const log = page.locator('[data-testid="breakpoint-log"]')
    const initialLogContent = await log.textContent()
    
    // Change viewport size to force a breakpoint change
    await page.setViewportSize({ width: 800, height: 800 })
    
    // Wait for events to be processed
    await page.waitForTimeout(500)
    
    // Get the new log content
    const newLogContent = await log.textContent()
    
    // Log should have new entries
    expect(newLogContent.length).toBeGreaterThan(initialLogContent.length)
    
    // Change viewport size again
    await page.setViewportSize({ width: 400, height: 800 })
    
    // Wait for events to be processed
    await page.waitForTimeout(500)
    
    // Get the final log content
    const finalLogContent = await log.textContent()
    
    // Log should have even more entries
    expect(finalLogContent.length).toBeGreaterThan(newLogContent.length)
  })
})