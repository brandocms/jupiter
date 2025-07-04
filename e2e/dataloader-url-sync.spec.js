// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Dataloader URL Sync Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the dataloader URL sync test page
    await page.goto('/dataloader-url-sync.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait additional time for Jupiter to initialize
    await page.waitForTimeout(1000)
    
    // Make sure the initial articles are loaded
    await page.waitForSelector('.article-card', { state: 'visible', timeout: 5000 })
  })

  test('should initialize and sync URL from initial state', async ({ page }) => {
    // Since updateOnInit is false, URL should remain as the test page
    const currentUrl = await page.url()
    expect(currentUrl).toContain('dataloader-url-sync.html')
    
    // Check that dataloader is initialized
    const dataloader = page.locator('[data-testid="dataloader"]')
    await expect(dataloader).toBeVisible()
    
    // Check that articles are loaded
    const articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(6) // All articles should be loaded initially
  })

  test('should update URL when category filter is selected', async ({ page }) => {
    // Click on "Technology" filter
    await page.click('[data-testid="filter-tech"]')
    
    // Wait for the URL to update
    await page.waitForTimeout(500)
    
    // Check that URL has been updated
    const currentUrl = await page.url()
    expect(currentUrl).toBe('http://localhost:8448/articles/tech')
    
    // Check that only tech articles are displayed
    const articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(2) // Should have 2 tech articles
    
    // Verify the tech filter is selected
    await expect(page.locator('[data-testid="filter-tech"]')).toHaveAttribute('data-loader-param-selected', '')
  })

  test('should update URL with multiple parameters', async ({ page }) => {
    // Click on "Design" category
    await page.click('[data-testid="filter-design"]')
    await page.waitForTimeout(300)
    
    // Click on "Oslo" location
    await page.click('[data-testid="filter-oslo"]')
    await page.waitForTimeout(500)
    
    // Check that URL has both parameters
    const currentUrl = await page.url()
    expect(currentUrl).toBe('http://localhost:8448/articles/design/oslo')
    
    // Check that only design articles from Oslo are displayed
    const articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(1) // Should have 1 design article from Oslo
    
    // Verify both filters are selected
    await expect(page.locator('[data-testid="filter-design"]')).toHaveAttribute('data-loader-param-selected', '')
    await expect(page.locator('[data-testid="filter-oslo"]')).toHaveAttribute('data-loader-param-selected', '')
  })

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Start with all articles
    let articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(6)
    
    // Navigate to tech category
    await page.click('[data-testid="filter-tech"]')
    await page.waitForTimeout(500)
    
    // Check tech articles are shown
    articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(2)
    expect(await page.url()).toBe('http://localhost:8448/articles/tech')
    
    // Navigate to design category
    await page.click('[data-testid="filter-design"]')
    await page.waitForTimeout(500)
    
    // Check design articles are shown
    articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(2)
    expect(await page.url()).toBe('http://localhost:8448/articles/design')
    
    // Go back in browser history
    await page.goBack()
    await page.waitForTimeout(500)
    
    // Should be back to tech articles
    articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(2)
    expect(await page.url()).toBe('http://localhost:8448/articles/tech')
    await expect(page.locator('[data-testid="filter-tech"]')).toHaveAttribute('data-loader-param-selected', '')
    
    // Go forward in browser history
    await page.goForward()
    await page.waitForTimeout(500)
    
    // Should be back to design articles
    articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(2)
    expect(await page.url()).toBe('http://localhost:8448/articles/design')
    await expect(page.locator('[data-testid="filter-design"]')).toHaveAttribute('data-loader-param-selected', '')
  })

  test('should sync state from URL when simulating direct navigation', async ({ page }) => {
    // Use history API to simulate direct navigation to a URL with parameters
    await page.evaluate(() => {
      history.pushState({}, '', '/articles/business/bergen')
      // Trigger popstate to simulate browser navigation
      window.dispatchEvent(new PopStateEvent('popstate', { state: {} }))
    })
    
    // Wait for sync to complete
    await page.waitForTimeout(1000)
    
    // Check that the correct filters are selected
    await expect(page.locator('[data-testid="filter-business"]')).toHaveAttribute('data-loader-param-selected', '')
    await expect(page.locator('[data-testid="filter-bergen"]')).toHaveAttribute('data-loader-param-selected', '')
    
    // Check that only business articles from Bergen are displayed
    const articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(1) // Should have 1 business article from Bergen
  })

  test('should handle URL parsing edge cases', async ({ page }) => {
    // Test with base articles path (should show all articles)
    await page.evaluate(() => {
      history.pushState({}, '', '/articles')
      window.dispatchEvent(new PopStateEvent('popstate', { state: {} }))
    })
    await page.waitForTimeout(1000)
    
    // Should show all articles
    const articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(6)
    
    // Test with invalid category
    await page.evaluate(() => {
      history.pushState({}, '', '/articles/invalid-category')
      window.dispatchEvent(new PopStateEvent('popstate', { state: {} }))
    })
    await page.waitForTimeout(1000)
    
    // Should show no articles (no matches)
    const articlesInvalid = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articlesInvalid).toHaveCount(0)
  })

  test('should clear selections when returning to "All"', async ({ page }) => {
    // First select a category
    await page.click('[data-testid="filter-tech"]')
    await page.waitForTimeout(500)
    
    // Verify tech filter is selected
    await expect(page.locator('[data-testid="filter-tech"]')).toHaveAttribute('data-loader-param-selected', '')
    
    // Click "All" to clear selection
    await page.click('[data-testid="filter-all"]')
    await page.waitForTimeout(500)
    
    // Check that URL is reset
    const currentUrl = await page.url()
    expect(currentUrl).toBe('http://localhost:8448/articles')
    
    // Check that all articles are displayed
    const articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(6)
    
    // Verify "All" filter is selected and others are not
    await expect(page.locator('[data-testid="filter-all"]')).toHaveAttribute('data-loader-param-selected', '')
    await expect(page.locator('[data-testid="filter-tech"]')).not.toHaveAttribute('data-loader-param-selected', '')
  })

  test('should handle URL token replacement correctly', async ({ page }) => {
    // Test various combinations to ensure token replacement works
    const testCases = [
      { category: 'tech', location: 'oslo', expected: '/articles/tech/oslo' },
      { category: 'design', location: 'bergen', expected: '/articles/design/bergen' },
      { category: 'business', location: 'trondheim', expected: '/articles/business/trondheim' }
    ]
    
    for (const testCase of testCases) {
      // Click category filter
      await page.click(`[data-testid="filter-${testCase.category}"]`)
      await page.waitForTimeout(300)
      
      // Click location filter
      await page.click(`[data-testid="filter-${testCase.location}"]`)
      await page.waitForTimeout(500)
      
      // Check URL is correctly formatted
      const currentUrl = await page.url()
      expect(currentUrl).toBe(`http://localhost:8448${testCase.expected}`)
      
      // Reset to all before next test
      await page.click('[data-testid="filter-all"]')
      await page.waitForTimeout(300)
    }
  })

  test('should maintain URL sync with search functionality', async ({ page }) => {
    // Start with tech category
    await page.click('[data-testid="filter-tech"]')
    await page.waitForTimeout(500)
    
    // Use search functionality
    await page.fill('[data-testid="search-input"]', 'Components')
    await page.waitForTimeout(1000) // Wait for debounced search
    
    // URL should still maintain category parameter
    const currentUrl = await page.url()
    expect(currentUrl).toBe('http://localhost:8448/articles/tech')
    
    // Should show filtered results
    const articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(1) // Should have 1 article matching "Components"
  })

  test('should handle debug info updates', async ({ page }) => {
    // Check initial debug info
    const debugInfo = page.locator('[data-testid="debug-info"]')
    await expect(debugInfo).toBeVisible()
    
    // Check current URL display
    const currentUrlDisplay = page.locator('[data-testid="current-url"]')
    await expect(currentUrlDisplay).toContainText('/dataloader-url-sync.html')
    
    // Select a filter and check debug info updates
    await page.click('[data-testid="filter-tech"]')
    await page.waitForTimeout(500)
    
    // Check that debug info shows updated URL
    await expect(currentUrlDisplay).toContainText('/articles/tech')
    
    // Check that params are displayed
    const currentParams = page.locator('[data-testid="current-params"]')
    await expect(currentParams).toContainText('category')
    await expect(currentParams).toContainText('tech')
  })
})