// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Popup Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the popup test page from Vite server
    await page.goto('/popup.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')
  })

  test('should show basic popup when trigger is clicked', async ({ page }) => {
    // Get the basic trigger element
    const basicTrigger = page.locator('[data-testid="basic-trigger"]')

    // Initially, the popup should not be visible
    const basicPopup = page.locator('[data-testid="basic-popup"]')
    await expect(basicPopup).not.toBeVisible()

    // Click the trigger
    await basicTrigger.click()

    // Now the popup should be visible
    await expect(basicPopup).toBeVisible()

    // Backdrop should also be visible
    const backdrop = page.locator('[data-popup-backdrop]')
    await expect(backdrop).toBeVisible()
  })

  test('should close popup when close button is clicked', async ({ page }) => {
    // Open the popup first
    await page.locator('[data-testid="basic-trigger"]').click()

    // Verify popup is visible
    const basicPopup = page.locator('[data-testid="basic-popup"]')
    await expect(basicPopup).toBeVisible()

    // Click the close button
    await page.locator('[data-testid="basic-close"]').click()

    // Now the popup should not be visible
    await expect(basicPopup).not.toBeVisible()

    // Backdrop should also not be visible
    const backdrop = page.locator('[data-popup-backdrop]')
    await expect(backdrop).not.toBeVisible()
  })

  test('should close popup when backdrop is clicked', async ({ page }) => {
    // Open the popup first
    await page.locator('[data-testid="basic-trigger"]').click()

    // Verify popup is visible
    const basicPopup = page.locator('[data-testid="basic-popup"]')
    await expect(basicPopup).toBeVisible()

    // Click the backdrop
    await page
      .locator('[data-popup-backdrop]')
      .click({ position: { x: 10, y: 10 } })

    // Now the popup should not be visible
    await expect(basicPopup).not.toBeVisible()
  })

  test('should close popup when ESC key is pressed', async ({ page }) => {
    // Open the popup first
    await page.locator('[data-testid="esc-trigger"]').click()

    // Verify popup is visible
    const escPopup = page.locator('[data-testid="esc-popup"]')
    await expect(escPopup).toBeVisible()

    // Press ESC key
    await page.keyboard.press('Escape')

    // Now the popup should not be visible
    await expect(escPopup).not.toBeVisible()
  })

  test('should execute onOpen and onClose callbacks', async ({ page }) => {
    // Get the callback trigger and status element
    const callbackTrigger = page.locator('[data-testid="callback-trigger"]')
    const statusElement = page.locator('[data-testid="callback-status"]')

    // Initially, the status should show "Not opened yet"
    await expect(statusElement).toHaveText('Status: Not opened yet')

    // Click to open the popup
    await callbackTrigger.click()

    // Status should now show "Opened"
    await expect(statusElement).toHaveText('Status: Opened')

    // Click the close button
    await page.locator('[data-testid="callback-close"]').click()

    // Status should now show "Closed"
    await expect(statusElement).toHaveText('Status: Closed')
  })

  test('should apply custom animations for popup', async ({ page }) => {
    // Cannot directly test animations but can verify behavior

    // Open the custom animation popup
    const customTrigger = page.locator('[data-testid="custom-trigger"]')
    await customTrigger.click()

    // Verify popup is visible
    const customPopup = page.locator('[data-testid="custom-popup"]')
    await expect(customPopup).toBeVisible()

    // Check if content is correct
    const popupContent = await customPopup.textContent()
    expect(popupContent).toContain('Custom Animation')

    // Close the popup
    await page.locator('[data-testid="custom-close"]').click()

    // Verify popup is hidden
    await expect(customPopup).not.toBeVisible()
  })

  test('should allow responsive configuration', async ({ page }) => {
    // Test responsive functionality by setting a custom responsive handler
    await page.evaluate(() => {
      // Mock responsive handler to prevent popups on "mobile"
      const popupInstance = window.app.popups.find(
        (comp) => comp.opts && comp.opts.responsive
      )

      // Override responsive check to always return false (as if on incompatible breakpoint)
      popupInstance.opts.responsive = () => false

      return true
    })

    // Try to open a popup by clicking a trigger
    await page.locator('[data-testid="basic-trigger"]').click()

    // Popup should not be visible because responsive returned false
    const basicPopup = page.locator('[data-testid="basic-popup"]')
    await expect(basicPopup).not.toBeVisible()

    // Reset responsive check to always return true
    await page.evaluate(() => {
      const popupInstance = window.app.popups.find(
        (comp) => comp.opts && comp.opts.responsive
      )
      popupInstance.opts.responsive = () => true
      return true
    })

    // Try again, this time it should work
    await page.locator('[data-testid="basic-trigger"]').click()

    // Popup should be visible now
    await expect(basicPopup).toBeVisible()
  })
})
