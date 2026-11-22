// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Links Module', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/links.html')
  })

  test('should scroll smoothly to anchor links', async ({ page }) => {
    const start = await page.evaluate(() => window.scrollY)
    await page.getByTestId('link-to-section2').click()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(start)
    await expect(page.getByTestId('section2')).toBeInViewport()
  })

  test('should update URL hash on anchor click', async ({ page }) => {
    await page.getByTestId('link-to-section3').click()
    await expect(page).toHaveURL(/#section3$/)
  })

  test('should handle external links with target="_blank"', async ({ page }) => {
    await expect(page.getByTestId('external-link')).toHaveAttribute('target', '_blank')
  })

  test('should handle multiple anchor navigations', async ({ page }) => {
    for (const [link, section] of [
      ['link-to-section2', 'section2'],
      ['link-to-section3-from-2', 'section3'],
      ['link-to-section1-from-3', 'section1'],
    ]) {
      await page.getByTestId(link).click()
      await expect(page).toHaveURL(new RegExp(`#${section}$`))
      await expect(page.getByTestId(section)).toBeInViewport()
    }
  })

  test('should account for sticky header in scroll position', async ({ page }) => {
    await page.getByTestId('link-to-section2').click()
    await expect.poll(() => page.getByTestId('section2').evaluate(el =>
      Math.abs(el.getBoundingClientRect().top - document.querySelector('header').offsetHeight)
    )).toBeLessThan(2)
    await expect(page.getByTestId('section2')).toBeInViewport()
  })

  test('should scroll to top when clicking section1 link', async ({ page }) => {
    await page.getByTestId('link-to-section3').click()
    const scrollY = () => page.evaluate(() => window.scrollY)
    await expect.poll(scrollY).toBeGreaterThan(100)
    await page.getByTestId('link-to-section1-from-3').click()
    await expect.poll(scrollY).toBeLessThan(200)
  })
})
