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

  test('consent toggle should show refused state initially', async ({ page }) => {
    // Clear any existing cookies
    await page.locator('[data-testid="clear-cookies"]').click()
    await page.reload()
    await page.waitForLoadState('networkidle')

    const toggle = page.locator('[data-testid="consent-toggle"]')
    await expect(toggle).toHaveAttribute('data-cookie-consent-status', 'refused')

    const icon = toggle.locator('[data-cookie-consent-icon]')
    await expect(icon).toHaveText('\u2715')

    const label = toggle.locator('[data-cookie-consent-label]')
    await expect(label).toHaveText('Accept cookies')
  })

  test('consent toggle should accept cookies when clicked from refused state', async ({ page }) => {
    // Clear any existing cookies
    await page.locator('[data-testid="clear-cookies"]').click()
    await page.reload()
    await page.waitForLoadState('networkidle')

    const toggle = page.locator('[data-testid="consent-toggle"]')

    // Click to accept
    await toggle.click()

    // Verify toggle updated to accepted state
    await expect(toggle).toHaveAttribute('data-cookie-consent-status', 'accepted')

    const icon = toggle.locator('[data-cookie-consent-icon]')
    await expect(icon).toHaveText('\u2713')

    const label = toggle.locator('[data-cookie-consent-label]')
    await expect(label).toHaveText('Refuse cookies')

    // Verify consent status display updated via onConsentChanged
    const consentStatus = page.locator('[data-testid="consent-status"]')
    await expect(consentStatus).toHaveText('Accepted')
  })

  test('consent toggle should refuse cookies when clicked from accepted state', async ({ page }) => {
    // Clear any existing cookies
    await page.locator('[data-testid="clear-cookies"]').click()
    await page.reload()
    await page.waitForLoadState('networkidle')

    const toggle = page.locator('[data-testid="consent-toggle"]')

    // First click to accept
    await toggle.click()
    await expect(toggle).toHaveAttribute('data-cookie-consent-status', 'accepted')

    // Second click to refuse
    await toggle.click()

    // Verify toggle updated to refused state
    await expect(toggle).toHaveAttribute('data-cookie-consent-status', 'refused')

    const icon = toggle.locator('[data-cookie-consent-icon]')
    await expect(icon).toHaveText('\u2715')

    const label = toggle.locator('[data-cookie-consent-label]')
    await expect(label).toHaveText('Accept cookies')

    // Verify consent status display updated
    const consentStatus = page.locator('[data-testid="consent-status"]')
    await expect(consentStatus).toHaveText('Declined')
  })

  test('consent toggle should sync with dialog accept', async ({ page }) => {
    // Clear any existing cookies
    await page.locator('[data-testid="clear-cookies"]').click()
    await page.reload()
    await page.waitForLoadState('networkidle')

    const toggle = page.locator('[data-testid="consent-toggle"]')
    await expect(toggle).toHaveAttribute('data-cookie-consent-status', 'refused')

    // Accept via dialog
    await page.locator('[data-testid="show-cookie-dialog"]').click()
    await page.locator('[data-testid="accept-cookies"]').click()

    // Toggle should now show accepted
    await expect(toggle).toHaveAttribute('data-cookie-consent-status', 'accepted')
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
