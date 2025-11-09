// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter EqualHeightImages Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the equal-height-images test page from Vite server
    await page.goto('/equal-height-images.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait for Jupiter initialization and images to load
    await page.waitForTimeout(3000)
  })

  test('should set equal heights for images in same row', async ({ page }) => {
    // Get all images in first gallery (select the img elements, not the wrapper divs)
    const img1 = page.locator('[data-testid="img-1"] img')
    const img2 = page.locator('[data-testid="img-2"] img')
    const img3 = page.locator('[data-testid="img-3"] img')

    // Get the heights
    const height1 = await img1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    const height2 = await img2.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    const height3 = await img3.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // All should have the same minHeight
    expect(height1).toBe(height2)
    expect(height2).toBe(height3)

    // Should not be 0 or auto
    expect(height1).not.toBe('0px')
    expect(height1).not.toBe('auto')
  })

  test('should handle multiple galleries independently', async ({ page }) => {
    // Get images from first gallery (select img elements)
    const gallery1Img1 = page.locator('[data-testid="img-1"] img')
    const gallery1Height = await gallery1Img1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Get images from second gallery (select img elements)
    const gallery2Img1 = page.locator('[data-testid="img-4"] img')
    const gallery2Height = await gallery2Img1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Both should have minHeight set
    expect(gallery1Height).not.toBe('0px')
    expect(gallery2Height).not.toBe('0px')

    // They might be different since galleries are independent
    // Just verify both are set
    expect(parseFloat(gallery1Height)).toBeGreaterThan(0)
    expect(parseFloat(gallery2Height)).toBeGreaterThan(0)
  })

  test('should set minHeight CSS property', async ({ page }) => {
    const img = page.locator('[data-testid="img-1"] img')

    // minHeight should be set
    const minHeight = await img.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Should be a pixel value, not auto or 0
    expect(minHeight).toMatch(/^\d+(\.\d+)?px$/)
    expect(parseFloat(minHeight)).toBeGreaterThan(0)
  })

  test('should handle mixed aspect ratios', async ({ page }) => {
    // Gallery 1 has landscape and portrait images (select img elements)
    const landscape1 = page.locator('[data-testid="img-1"] img')
    const portrait = page.locator('[data-testid="img-2"] img')
    const landscape2 = page.locator('[data-testid="img-3"] img')

    const height1 = await landscape1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    const height2 = await portrait.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    const height3 = await landscape2.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // All should match despite different aspect ratios
    expect(height1).toBe(height2)
    expect(height2).toBe(height3)
  })

  test('should handle square images gallery', async ({ page }) => {
    // Gallery 2 has square images (select img elements)
    const img4 = page.locator('[data-testid="img-4"] img')
    const img5 = page.locator('[data-testid="img-5"] img')
    const img6 = page.locator('[data-testid="img-6"] img')
    const img7 = page.locator('[data-testid="img-7"] img')

    const heights = await Promise.all([
      img4.evaluate((el) => window.getComputedStyle(el).minHeight),
      img5.evaluate((el) => window.getComputedStyle(el).minHeight),
      img6.evaluate((el) => window.getComputedStyle(el).minHeight),
      img7.evaluate((el) => window.getComputedStyle(el).minHeight)
    ])

    // All square images in same row should have equal heights
    const uniqueHeights = [...new Set(heights)]
    expect(uniqueHeights.length).toBe(1)
    expect(parseFloat(uniqueHeights[0])).toBeGreaterThan(0)
  })

  test('should handle wide panorama images', async ({ page }) => {
    // Gallery 3 has wide images (select img elements)
    const img8 = page.locator('[data-testid="img-8"] img')
    const img9 = page.locator('[data-testid="img-9"] img')

    const height8 = await img8.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    const height9 = await img9.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Both panoramas should have same height
    expect(height8).toBe(height9)
    expect(parseFloat(height8)).toBeGreaterThan(0)
  })

  test('should wait for images to load before calculating', async ({ page }) => {
    // All images should be loaded
    const images = await page.locator('[data-eq-height-images-item] img').all()

    for (const img of images) {
      const complete = await img.evaluate((el) => {
        return el.complete
      })
      expect(complete).toBe(true)
    }

    // And heights should be calculated (select img element)
    const firstItem = page.locator('[data-testid="img-1"] img')
    const minHeight = await firstItem.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    expect(parseFloat(minHeight)).toBeGreaterThan(0)
  })

  test('should recalculate on window resize', async ({ page }) => {
    // Get initial height (select img element)
    const img1 = page.locator('[data-testid="img-1"] img')
    const initialHeight = await img1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Resize window to a smaller width
    await page.setViewportSize({ width: 600, height: 800 })
    await page.waitForTimeout(1000)

    // Get new height
    const newHeight = await img1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Height should still be set (might be different due to resize)
    expect(parseFloat(newHeight)).toBeGreaterThan(0)

    // Resize back to larger
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.waitForTimeout(1000)

    // Height should still be set
    const finalHeight = await img1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    expect(parseFloat(finalHeight)).toBeGreaterThan(0)
  })

  test('should handle gallery with different number of images per row', async ({ page }) => {
    // Gallery 4 has mixed aspect ratios (select img elements)
    const img10 = page.locator('[data-testid="img-10"] img')
    const img11 = page.locator('[data-testid="img-11"] img')
    const img12 = page.locator('[data-testid="img-12"] img')
    const img13 = page.locator('[data-testid="img-13"] img')

    // All images in gallery should have minHeight set
    const heights = await Promise.all([
      img10.evaluate((el) => window.getComputedStyle(el).minHeight),
      img11.evaluate((el) => window.getComputedStyle(el).minHeight),
      img12.evaluate((el) => window.getComputedStyle(el).minHeight),
      img13.evaluate((el) => window.getComputedStyle(el).minHeight)
    ])

    // All should have heights set
    heights.forEach(height => {
      expect(parseFloat(height)).toBeGreaterThan(0)
    })
  })
})
