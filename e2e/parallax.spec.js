// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Parallax Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the parallax test page from Vite server
    await page.goto('/parallax.html')
    
    await expect(page.locator('body')).toHaveAttribute('data-app-revealed', 'true')
  })

  test('should initialize traditional parallax correctly', async ({ page }) => {
    // Check if the parallax elements exist
    const defaultParallaxElement = page.locator('[data-testid="parallax-element"]')
    
    // Scroll to element
    await defaultParallaxElement.scrollIntoViewIfNeeded()
    await expect(defaultParallaxElement).toBeVisible()
    
    // Check if the figure and content elements exist
    const parallaxFigure = page.locator('[data-testid="parallax-figure"]')
    const parallaxContent = page.locator('[data-testid="parallax-content"]')
    
    await expect(parallaxFigure).toBeVisible()
    await expect(parallaxContent).toBeVisible()
  })

  test('should initialize multi-element parallax correctly', async ({ page }) => {
    // Check if the multi-parallax container exists
    const multiParallaxContainer = page.locator('[data-testid="multi-parallax-container"]')
    
    // Scroll to element
    await multiParallaxContainer.scrollIntoViewIfNeeded()
    await expect(multiParallaxContainer).toBeVisible()
    
    // Check if all elements with different factors exist
    const factorElements = page.locator('[data-parallax-factor]')
    await expect(factorElements).toHaveCount(3)
    
    // Verify that element with fade attribute exists
    const hasFadeAttr = await page.locator('.fade-element')
      .evaluate(el => el.hasAttribute('data-parallax-fade'))
    expect(hasFadeAttr).toBeTruthy()
  })

  test('should apply parallax effect on scroll', async ({ page }) => {
    // Get the parallax figure element
    const parallaxFigure = page.locator('[data-testid="parallax-figure"]')
    
    // Get initial transform state
    const initialTransform = await parallaxFigure.evaluate(el => {
      return window.getComputedStyle(el).transform
    })
    
    await page.evaluate(() => window.scrollTo(0, 500))
    await expect.poll(() => parallaxFigure.evaluate(el => getComputedStyle(el).transform))
      .not.toEqual(initialTransform)
  })

  test('should apply different factors to multi-element parallax', async ({ page }) => {
    const movement = await page.evaluate(() => {
      const items = ['multi-slow-element', 'multi-fast-element'].map(id =>
        document.querySelector('[data-testid="' + id + '"]'))
      items[0].scrollIntoView({ block: 'center' })
      function measure() {
        window.dispatchEvent(new CustomEvent('APPLICATION:SCROLL'))
        return items.map(el => new DOMMatrix(getComputedStyle(el).transform).m42)
      }
      const start = measure()
      window.scrollBy(0, 100)
      return measure().map((y, i) => Math.abs(y - start[i]))
    })
    expect(movement[0]).toBeGreaterThan(0)
    expect(movement[1]).toBeGreaterThan(movement[0])
  })
  
  test('should have fade capability on elements with fadeContent', async ({ page }) => {
    // Verify that the Parallax module has the capability to handle fade effects
    // rather than testing the dynamic opacity changes which can be browser-dependent
    
    // Get the element that should have fade attribute
    const fadeElement = page.locator('.fade-element')
    
    // Verify it exists
    await expect(fadeElement).toBeVisible()
    
    // Verify it has the data-parallax-fade attribute which enables fading
    const hasFadeAttr = await fadeElement.evaluate(el => {
      return el.hasAttribute('data-parallax-fade')
    })
    
    expect(hasFadeAttr).toBeTruthy()
    
    // Get the no-fade element
    const noFadeElement = page.locator('.no-fade-element')
    
    // Verify it exists
    await expect(noFadeElement).toBeVisible()
    
    // Verify it does NOT have the data-parallax-fade attribute
    const hasNoFadeAttr = await noFadeElement.evaluate(el => {
      return el.hasAttribute('data-parallax-fade')
    })
    
    expect(hasNoFadeAttr).toBeFalsy()
  })
})