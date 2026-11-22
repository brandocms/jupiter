// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Breakpoints Module', () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test.beforeEach(async ({ page }) => {
    await page.goto('/breakpoints.html')
    await expect(page.getByTestId('current-breakpoint')).toHaveText(/^(xs|sm|md|lg|xl)$/)
  })

  test('should initialize and set current breakpoint', async ({ page }) => {
    await expect(page.getByTestId('current-breakpoint')).toHaveText('xl')
  })

  test('should activate the correct breakpoint indicator', async ({ page }) => {
    for (const bp of ['xs', 'sm', 'md', 'lg']) {
      await expect(page.getByTestId(`${bp}-indicator`)).not.toHaveClass(/active/)
    }
    await expect(page.getByTestId('xl-indicator')).toHaveClass(/active/)
  })

  test('should update breakpoint when viewport size changes', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 800 })
    await expect(page.getByTestId('current-breakpoint')).toHaveText('xs')
    await expect(page.getByTestId('xs-indicator')).toHaveClass(/active/)
  })

  test('should trigger breakpoint listeners and increment change counter', async ({ page }) => {
    const counter = page.getByTestId('breakpoint-change-counter')
    const initialCount = Number(await counter.textContent())
    await page.setViewportSize({ width: 400, height: 800 })
    await expect.poll(async () => Number(await counter.textContent())).toBeGreaterThan(initialCount)
    await expect(page.getByTestId('breakpoint-log')).toContainText('Breakpoint changed to: xs')
  })

  test('should update font size based on current breakpoint', async ({ page }) => {
    const display = page.getByTestId('font-size-display')
    await expect(display).toHaveText('Current font-size: 18px')
    await page.setViewportSize({ width: 400, height: 800 })
    await expect(display).toHaveText('Current font-size: 14px')
  })

  test('should log events when breakpoints change', async ({ page }) => {
    const log = page.getByTestId('breakpoint-log')
    await page.setViewportSize({ width: 800, height: 800 })
    await expect(log).toContainText('Breakpoint changed to: md')
    await page.setViewportSize({ width: 400, height: 800 })
    await expect(log).toContainText('Breakpoint changed to: xs')
  })
})
