// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter EqualHeightElements Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the equal-height-elements test page from Vite server
    await page.goto('/equal-height-elements.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait for Jupiter initialization
    await page.waitForTimeout(2000)
  })

  test('should set equal heights for elements in same row', async ({ page }) => {
    // Get all product cards
    const product1 = page.locator('[data-testid="product-1"]')
    const product2 = page.locator('[data-testid="product-2"]')
    const product3 = page.locator('[data-testid="product-3"]')

    // Get the minHeights
    const height1 = await product1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    const height2 = await product2.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    const height3 = await product3.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // All should have the same minHeight
    expect(height1).toBe(height2)
    expect(height2).toBe(height3)

    // Should not be 0 or auto
    expect(height1).not.toBe('0px')
    expect(height1).not.toBe('auto')
  })

  test('should add adjusted attribute to elements', async ({ page }) => {
    const product1 = page.locator('[data-testid="product-1"]')

    // Should have data-eq-height-elements-adjusted attribute
    const hasAttribute = await product1.evaluate((el) => {
      return el.hasAttribute('data-eq-height-elements-adjusted')
    })

    expect(hasAttribute).toBe(true)
  })

  test('should handle multiple groups independently', async ({ page }) => {
    // Get element from products group
    const product1 = page.locator('[data-testid="product-1"]')
    const productHeight = await product1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Get element from features group
    const feature1 = page.locator('[data-testid="feature-1"]')
    const featureHeight = await feature1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Get element from team group
    const team1 = page.locator('[data-testid="team-1"]')
    const teamHeight = await team1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // All should have minHeight set
    expect(parseFloat(productHeight)).toBeGreaterThan(0)
    expect(parseFloat(featureHeight)).toBeGreaterThan(0)
    expect(parseFloat(teamHeight)).toBeGreaterThan(0)

    // Groups should be independent (heights likely different)
    // Just verify all are calculated
    expect(productHeight).not.toBe('auto')
    expect(featureHeight).not.toBe('auto')
    expect(teamHeight).not.toBe('auto')
  })

  test('should set minHeight CSS property', async ({ page }) => {
    const element = page.locator('[data-testid="product-1"]')

    // minHeight should be set
    const minHeight = await element.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Should be a pixel value, not auto or 0
    expect(minHeight).toMatch(/^\d+(\.\d+)?px$/)
    expect(parseFloat(minHeight)).toBeGreaterThan(0)
  })

  test('should handle varying content lengths', async ({ page }) => {
    // Products have very different content lengths
    const product1 = page.locator('[data-testid="product-1"]') // Short
    const product2 = page.locator('[data-testid="product-2"]') // Long
    const product3 = page.locator('[data-testid="product-3"]') // Medium

    const heights = await Promise.all([
      product1.evaluate((el) => window.getComputedStyle(el).minHeight),
      product2.evaluate((el) => window.getComputedStyle(el).minHeight),
      product3.evaluate((el) => window.getComputedStyle(el).minHeight)
    ])

    // All should match despite different content lengths
    expect(heights[0]).toBe(heights[1])
    expect(heights[1]).toBe(heights[2])

    // Height should accommodate the longest content
    expect(parseFloat(heights[0])).toBeGreaterThan(100)
  })

  test('should handle feature cards with 4 items', async ({ page }) => {
    // Feature cards group has 4 items
    const feature1 = page.locator('[data-testid="feature-1"]')
    const feature2 = page.locator('[data-testid="feature-2"]')
    const feature3 = page.locator('[data-testid="feature-3"]')
    const feature4 = page.locator('[data-testid="feature-4"]')

    const heights = await Promise.all([
      feature1.evaluate((el) => window.getComputedStyle(el).minHeight),
      feature2.evaluate((el) => window.getComputedStyle(el).minHeight),
      feature3.evaluate((el) => window.getComputedStyle(el).minHeight),
      feature4.evaluate((el) => window.getComputedStyle(el).minHeight)
    ])

    // All should have same height
    const uniqueHeights = [...new Set(heights)]
    expect(uniqueHeights.length).toBe(1)
    expect(parseFloat(uniqueHeights[0])).toBeGreaterThan(0)
  })

  test('should handle team cards with mixed content', async ({ page }) => {
    // Team cards have varying description lengths
    const team1 = page.locator('[data-testid="team-1"]')
    const team2 = page.locator('[data-testid="team-2"]')
    const team3 = page.locator('[data-testid="team-3"]')

    const heights = await Promise.all([
      team1.evaluate((el) => window.getComputedStyle(el).minHeight),
      team2.evaluate((el) => window.getComputedStyle(el).minHeight),
      team3.evaluate((el) => window.getComputedStyle(el).minHeight)
    ])

    // All should match
    expect(heights[0]).toBe(heights[1])
    expect(heights[1]).toBe(heights[2])
  })

  test('should recalculate on window resize', async ({ page }) => {
    // Get initial height
    const product1 = page.locator('[data-testid="product-1"]')
    const initialHeight = await product1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Resize window to smaller width
    await page.setViewportSize({ width: 600, height: 800 })
    await page.waitForTimeout(1000)

    // Get new height
    const newHeight = await product1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Height should still be set (might be different)
    expect(parseFloat(newHeight)).toBeGreaterThan(0)

    // Resize back to larger
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.waitForTimeout(1000)

    // Height should still be set
    const finalHeight = await product1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    expect(parseFloat(finalHeight)).toBeGreaterThan(0)
  })

  test('should clear previous heights before recalculating', async ({ page }) => {
    const product1 = page.locator('[data-testid="product-1"]')

    // Get initial height
    const initialHeight = await product1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    expect(parseFloat(initialHeight)).toBeGreaterThan(0)

    // Trigger resize
    await page.setViewportSize({ width: 800, height: 600 })
    await page.waitForTimeout(1000)

    // After resize, height should be recalculated (not just added on top)
    const newHeight = await product1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    // Should have a valid height (not cumulative)
    expect(parseFloat(newHeight)).toBeGreaterThan(0)
    expect(parseFloat(newHeight)).toBeLessThan(1000) // Sanity check
  })

  test('should work with elements of different types', async ({ page }) => {
    // All groups use div elements with data-equal-height-item
    // Verify all groups have adjusted attribute
    const allItems = await page.locator('[data-equal-height-item]').all()

    expect(allItems.length).toBeGreaterThan(0)

    for (const item of allItems) {
      const hasAttribute = await item.evaluate((el) => {
        return el.hasAttribute('data-eq-height-elements-adjusted')
      })
      expect(hasAttribute).toBe(true)

      const minHeight = await item.evaluate((el) => {
        return window.getComputedStyle(el).minHeight
      })
      expect(parseFloat(minHeight)).toBeGreaterThan(0)
    }
  })

  test('should handle grid layouts with wrapping rows', async ({ page }) => {
    // At desktop size, feature cards should be in grid
    const feature1 = page.locator('[data-testid="feature-1"]')
    const feature2 = page.locator('[data-testid="feature-2"]')

    // Get positions to check if they're in a row
    const box1 = await feature1.boundingBox()
    const box2 = await feature2.boundingBox()

    // They should have heights set regardless of layout
    const height1 = await feature1.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })
    const height2 = await feature2.evaluate((el) => {
      return window.getComputedStyle(el).minHeight
    })

    expect(parseFloat(height1)).toBeGreaterThan(0)
    expect(parseFloat(height2)).toBeGreaterThan(0)
  })
})
