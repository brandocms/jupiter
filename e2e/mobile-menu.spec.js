// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter MobileMenu Module', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mobile-menu.html')
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

    // Body should have open-menu class
    await expect(body).toHaveClass(/open-menu/)

    // Hamburger should have is-active class
    await expect(hamburger).toHaveClass(/is-active/)
  })

  test('should show background overlay when menu is open', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')
    const mobileBg = page.locator('[data-testid="mobile-bg"]')

    // Background should start with opacity 0
    await expect(mobileBg).toHaveCSS('opacity', '0')

    // Click to open menu
    await hamburger.click()

    // Background opacity should be close to 1
    await expect(mobileBg).toHaveCSS('opacity', '1')
  })

  test('should display menu items with stagger animation', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')

    // Click to open menu
    await hamburger.click()

    // All menu items should be visible (opacity 1)
    const menuItems = [
      page.locator('[data-testid="menu-item-1"]'),
      page.locator('[data-testid="menu-item-2"]'),
      page.locator('[data-testid="menu-item-3"]'),
      page.locator('[data-testid="menu-item-4"]'),
      page.locator('[data-testid="menu-item-5"]')
    ]

    for (const item of menuItems) {
      await expect(item).toHaveCSS('opacity', '1')
    }
  })

  test('should close menu when hamburger is clicked again', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')
    const body = page.locator('body')

    // Open menu
    await hamburger.click()
    await expect(body).toHaveClass(/open-menu/)

    // Close menu
    await hamburger.click()

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

    // Menu link should be clickable
    await menuLink.click()

    // URL should have hash
    await expect(page).toHaveURL(/#home$/)
  })

  test('should support multiple toggle cycles', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')
    const body = page.locator('body')

    // Open
    await hamburger.click()
    await expect(body).toHaveClass(/open-menu/)

    // Close
    await hamburger.click()
    await expect(body).not.toHaveClass(/open-menu/)

    // Open again
    await hamburger.click()
    await expect(body).toHaveClass(/open-menu/)

    // Close again
    await hamburger.click()
    await expect(body).not.toHaveClass(/open-menu/)
  })

  test('should change header background to transparent when open', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger"]')
    const header = page.locator('[data-testid="header"]')

    // Click to open menu
    await hamburger.click()

    // Header background should be transparent
    await expect(header).toHaveCSS('background-color', /rgba?\(.*,\s*0\)|transparent/)
  })
})
