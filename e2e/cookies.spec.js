// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Cookies Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the cookies test page from Vite server
    await page.goto('/cookies.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')
  })

  test('should initialize correctly', async ({ page }) => {
    // Check if the cookie container exists
    const cookieContainer = page.locator('[data-testid="cookie-container"]')
    await expect(cookieContainer).toBeVisible()
  })

  test('should show cookie consent dialog', async ({ page }) => {
    // Trigger the cookie dialog
    await page.locator('[data-testid="show-cookie-dialog"]').click()

    // Check if the dialog is visible
    const cookieContainer = page.locator('[data-testid="cookie-container"]')
    await expect(cookieContainer).toBeVisible({ timeout: 5000 })

    // Check if buttons are visible
    const acceptButton = page.locator('[data-testid="accept-cookies"]')
    const refuseButton = page.locator('[data-testid="refuse-cookies"]')

    await expect(acceptButton).toBeVisible()
    await expect(refuseButton).toBeVisible()
  })

  test('should accept cookies when accept button is clicked', async ({
    page,
  }) => {
    // Clear any existing cookies first
    await page.locator('[data-testid="clear-cookies"]').click()

    // Show cookie dialog
    await page.locator('[data-testid="show-cookie-dialog"]').click()

    // Click accept button
    await page.locator('[data-testid="accept-cookies"]').click()

    // Check status has been updated
    await page.locator('[data-testid="check-cookie-status"]').click()

    // Get the content of the status display
    const consentStatus = page.locator('[data-testid="consent-status"]')
    await expect(consentStatus).toHaveText(/Accepted/)

    // Check cookie container is hidden
    const cookieContainer = page.locator('[data-testid="cookie-container"]')
    await expect(cookieContainer).not.toBeVisible({ timeout: 5000 })
  })

  test('should refuse cookies when refuse button is clicked', async ({
    page,
  }) => {
    // Clear any existing cookies first
    await page.locator('[data-testid="clear-cookies"]').click()

    // Show cookie dialog
    await page.locator('[data-testid="show-cookie-dialog"]').click()

    // Click refuse button
    await page.locator('[data-testid="refuse-cookies"]').click()

    // Check status has been updated
    await page.locator('[data-testid="check-cookie-status"]').click()

    // Get the content of the status display
    const consentStatus = page.locator('[data-testid="consent-status"]')
    await expect(consentStatus).toHaveText(/Declined/)

    // Check cookie container is hidden
    const cookieContainer = page.locator('[data-testid="cookie-container"]')
    await expect(cookieContainer).not.toBeVisible({ timeout: 5000 })
  })

  test('should set, get and remove cookies properly', async ({ page }) => {
    // Clear any existing cookies first
    await page.locator('[data-testid="clear-cookies"]').click()

    // Set a test cookie
    await page.fill('[data-testid="cookie-key"]', 'test_cookie')
    await page.fill('[data-testid="cookie-value"]', 'test_value_123')
    await page.locator('[data-testid="set-cookie"]').click()

    // Verify cookie was set successfully
    const operationResult = page.locator('[data-testid="operation-result"]')
    await expect(operationResult).toContainText('Success')

    // Get the cookie value
    await page.locator('[data-testid="get-cookie"]').click()

    // Verify the retrieved value
    await expect(operationResult).toContainText('test_value_123')

    // Remove the cookie
    await page.locator('[data-testid="remove-cookie"]').click()

    // Verify cookie was removed
    await expect(operationResult).toContainText('Success')

    // Try to get the removed cookie
    await page.locator('[data-testid="get-cookie"]').click()

    // Verify it returns null
    await expect(operationResult).toContainText('test_cookie" = "null"')
  })
})
