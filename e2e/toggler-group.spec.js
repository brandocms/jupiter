// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Toggler Group Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the toggler group test page from Vite server
    await page.goto('/toggler-group.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait additional time for Jupiter to initialize
    await page.waitForTimeout(1000)
  })

  test('should allow only one toggler open in a group', async ({ page }) => {
    // Get the toggle buttons for the phases group
    const phase1Button = page.locator('[data-toggle-trigger="phase-1"]')
    const phase2Button = page.locator('[data-toggle-trigger="phase-2"]')
    const phase3Button = page.locator('[data-toggle-trigger="phase-3"]')

    // Get the toggle content elements
    const phase1Content = page.locator('[data-toggle-content="phase-1"]')
    const phase2Content = page.locator('[data-toggle-content="phase-2"]')
    const phase3Content = page.locator('[data-toggle-content="phase-3"]')

    // All content should initially be hidden
    await expect(phase1Content).not.toHaveAttribute('data-toggle-visible')
    await expect(phase2Content).not.toHaveAttribute('data-toggle-visible')
    await expect(phase3Content).not.toHaveAttribute('data-toggle-visible')

    // Click the first phase button
    await phase1Button.click()

    // First phase should now be visible and button should be active
    await expect(phase1Content).toHaveAttribute('data-toggle-visible')
    await expect(phase1Button).toHaveAttribute('data-toggle-trigger-active')
    await expect(phase2Content).not.toHaveAttribute('data-toggle-visible')
    await expect(phase2Button).not.toHaveAttribute('data-toggle-trigger-active')
    await expect(phase3Content).not.toHaveAttribute('data-toggle-visible')
    await expect(phase3Button).not.toHaveAttribute('data-toggle-trigger-active')

    // Click the second phase button
    await phase2Button.click()

    // Second phase should now be visible, first phase should be hidden
    await expect(phase1Content).not.toHaveAttribute('data-toggle-visible')
    await expect(phase1Button).not.toHaveAttribute('data-toggle-trigger-active')
    await expect(phase2Content).toHaveAttribute('data-toggle-visible')
    await expect(phase2Button).toHaveAttribute('data-toggle-trigger-active')
    await expect(phase3Content).not.toHaveAttribute('data-toggle-visible')
    await expect(phase3Button).not.toHaveAttribute('data-toggle-trigger-active')

    // Click the third phase button
    await phase3Button.click()

    // Third phase should now be visible, others should be hidden
    await expect(phase1Content).not.toHaveAttribute('data-toggle-visible')
    await expect(phase1Button).not.toHaveAttribute('data-toggle-trigger-active')
    await expect(phase2Content).not.toHaveAttribute('data-toggle-visible')
    await expect(phase2Button).not.toHaveAttribute('data-toggle-trigger-active')
    await expect(phase3Content).toHaveAttribute('data-toggle-visible')
    await expect(phase3Button).toHaveAttribute('data-toggle-trigger-active')
  })

  test('different groups should operate independently', async ({ page }) => {
    // Get buttons from different groups
    const groupA1Button = page.locator('[data-toggle-trigger="group-a-1"]')
    const groupA2Button = page.locator('[data-toggle-trigger="group-a-2"]')
    const groupB1Button = page.locator('[data-toggle-trigger="group-b-1"]')
    const groupB2Button = page.locator('[data-toggle-trigger="group-b-2"]')

    // Get content elements
    const groupA1Content = page.locator('[data-toggle-content="group-a-1"]')
    const groupA2Content = page.locator('[data-toggle-content="group-a-2"]')
    const groupB1Content = page.locator('[data-toggle-content="group-b-1"]')
    const groupB2Content = page.locator('[data-toggle-content="group-b-2"]')

    // Open A1 and B1
    await groupA1Button.click()
    await groupB1Button.click()

    // Both A1 and B1 should be visible and their buttons active
    await expect(groupA1Content).toHaveAttribute('data-toggle-visible')
    await expect(groupA1Button).toHaveAttribute('data-toggle-trigger-active')
    await expect(groupA2Content).not.toHaveAttribute('data-toggle-visible')
    await expect(groupA2Button).not.toHaveAttribute('data-toggle-trigger-active')
    await expect(groupB1Content).toHaveAttribute('data-toggle-visible')
    await expect(groupB1Button).toHaveAttribute('data-toggle-trigger-active')
    await expect(groupB2Content).not.toHaveAttribute('data-toggle-visible')
    await expect(groupB2Button).not.toHaveAttribute('data-toggle-trigger-active')

    // Open A2 - should close A1 but not affect B1
    await groupA2Button.click()

    // A2 and B1 should be visible, A1 and B2 should be hidden
    await expect(groupA1Content).not.toHaveAttribute('data-toggle-visible')
    await expect(groupA1Button).not.toHaveAttribute('data-toggle-trigger-active')
    await expect(groupA2Content).toHaveAttribute('data-toggle-visible')
    await expect(groupA2Button).toHaveAttribute('data-toggle-trigger-active')
    await expect(groupB1Content).toHaveAttribute('data-toggle-visible')
    await expect(groupB1Button).toHaveAttribute('data-toggle-trigger-active')
    await expect(groupB2Content).not.toHaveAttribute('data-toggle-visible')
    await expect(groupB2Button).not.toHaveAttribute('data-toggle-trigger-active')

    // Open B2 - should close B1 but not affect A2
    await groupB2Button.click()

    // A2 and B2 should be visible, A1 and B1 should be hidden
    await expect(groupA1Content).not.toHaveAttribute('data-toggle-visible')
    await expect(groupA1Button).not.toHaveAttribute('data-toggle-trigger-active')
    await expect(groupA2Content).toHaveAttribute('data-toggle-visible')
    await expect(groupA2Button).toHaveAttribute('data-toggle-trigger-active')
    await expect(groupB1Content).not.toHaveAttribute('data-toggle-visible')
    await expect(groupB1Button).not.toHaveAttribute('data-toggle-trigger-active')
    await expect(groupB2Content).toHaveAttribute('data-toggle-visible')
    await expect(groupB2Button).toHaveAttribute('data-toggle-trigger-active')
  })

  test('non-grouped togglers should operate independently', async ({ page }) => {
    // Get the independent toggle button and a grouped toggle button
    const independentButton = page.locator('[data-toggle-trigger="no-group"]')
    const phase1Button = page.locator('[data-toggle-trigger="phase-1"]')

    // Get the content elements
    const independentContent = page.locator('[data-toggle-content="no-group"]')
    const phase1Content = page.locator('[data-toggle-content="phase-1"]')

    // Click the independent toggle button
    await independentButton.click()

    // Independent content should be visible and button active
    await expect(independentContent).toHaveAttribute('data-toggle-visible')
    await expect(independentButton).toHaveAttribute('data-toggle-trigger-active')
    await expect(phase1Content).not.toHaveAttribute('data-toggle-visible')
    await expect(phase1Button).not.toHaveAttribute('data-toggle-trigger-active')

    // Click a grouped toggle button
    await phase1Button.click()

    // Both should now be visible as they're not in the same group
    await expect(independentContent).toHaveAttribute('data-toggle-visible')
    await expect(independentButton).toHaveAttribute('data-toggle-trigger-active')
    await expect(phase1Content).toHaveAttribute('data-toggle-visible')
    await expect(phase1Button).toHaveAttribute('data-toggle-trigger-active')
  })
})
