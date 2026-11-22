// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter MobileMenu Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the mobile-menu test page from Vite server
    await page.goto('/mobile-menu.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait for Jupiter initialization
    await page.waitForTimeout(1000)
  })

  test('should have menu closed initially', async ({ page }) => {
    // Body should not have open-menu class
    const body = page.locator('body')
    await expect(body).not.toHaveClass(/open-menu/)

    // Hamburger should not have is-active class
    const hamburger = page.locator('[data-testid="hamburger"]')
    await expect(hamburger).not.toHaveClass(/is-active/)

    // Menu items should not be visible (opacity 0)
    const menuItem = page.locator('[data-testid="menu-item-1"]')
    const opacity = await menuItem.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })
    expect(opacity).toBe('0')
  })

  test('should open menu when hamburger is clicked', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')
    const body = page.locator('body')

    // Click the hamburger
    await hamburger.click()

    // Wait for animation
    await page.waitForTimeout(500)

    // Body should have open-menu class
    await expect(body).toHaveClass(/open-menu/)

    // Hamburger should have is-active class
    await expect(hamburger).toHaveClass(/is-active/)
  })

  test('should show background overlay when menu is open', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')
    const mobileBg = page.locator('[data-testid="mobile-bg"]')

    // Background should start with opacity 0
    let opacity = await mobileBg.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })
    expect(parseFloat(opacity)).toBeLessThan(0.1)

    // Click to open menu
    await hamburger.click()

    // Wait for background fade-in animation
    await page.waitForTimeout(500)

    // Background opacity should be close to 1
    opacity = await mobileBg.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })
    expect(parseFloat(opacity)).toBeGreaterThan(0.9)
  })

  test('should display menu items with stagger animation', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')

    // Click to open menu
    await hamburger.click()

    // Wait for stagger animation to complete
    await page.waitForTimeout(1500)

    // All menu items should be visible (opacity 1)
    const menuItems = [
      page.locator('[data-testid="menu-item-1"]'),
      page.locator('[data-testid="menu-item-2"]'),
      page.locator('[data-testid="menu-item-3"]'),
      page.locator('[data-testid="menu-item-4"]'),
      page.locator('[data-testid="menu-item-5"]')
    ]

    for (const item of menuItems) {
      const opacity = await item.evaluate((el) => {
        return window.getComputedStyle(el).opacity
      })
      expect(parseFloat(opacity)).toBeGreaterThan(0.8)
    }
  })

  test('should close menu when hamburger is clicked again', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')
    const body = page.locator('body')

    // Open menu
    await hamburger.click()
    await page.waitForTimeout(500)
    await expect(body).toHaveClass(/open-menu/)

    // Close menu
    await hamburger.click()
    await page.waitForTimeout(500)

    // Body should not have open-menu class
    await expect(body).not.toHaveClass(/open-menu/)

    // Hamburger should not have is-active class
    await expect(hamburger).not.toHaveClass(/is-active/)
  })

  test('should make menu items clickable when open', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')
    const menuLink = page.locator('[data-testid="menu-item-1"] a')

    // Open menu
    await hamburger.click()
    await page.waitForTimeout(1500)

    // Menu link should be clickable
    await menuLink.click()

    // URL should have hash
    expect(page.url()).toContain('#home')
  })

  test('should support multiple toggle cycles', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')
    const body = page.locator('body')

    // Open
    await hamburger.click()
    await page.waitForTimeout(500)
    await expect(body).toHaveClass(/open-menu/)

    // Close
    await hamburger.click()
    await page.waitForTimeout(500)
    await expect(body).not.toHaveClass(/open-menu/)

    // Open again
    await hamburger.click()
    await page.waitForTimeout(500)
    await expect(body).toHaveClass(/open-menu/)

    // Close again
    await hamburger.click()
    await page.waitForTimeout(500)
    await expect(body).not.toHaveClass(/open-menu/)
  })

  test('should change header background to transparent when open', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')
    const header = page.locator('[data-testid="header"]')

    // Click to open menu
    await hamburger.click()

    // Wait for animation
    await page.waitForTimeout(700)

    // Header background should be transparent
    const bgColor = await header.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })

    // Check if background is transparent (rgba with alpha 0 or transparent keyword)
    expect(bgColor).toMatch(/rgba?\(.*,\s*0\)|transparent/)
  })
})
