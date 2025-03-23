// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Dataloader Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the dataloader test page from Vite server
    await page.goto('/dataloader.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait additional time for Jupiter to initialize
    await page.waitForTimeout(1000)
    
    // Make sure the article grid and test articles are loaded
    await page.waitForSelector('[data-testid="article-1"]', { state: 'visible', timeout: 5000 })
    await page.waitForSelector('[data-testid="article-2"]', { state: 'visible', timeout: 5000 })
  })

  test('should load initial content', async ({ page }) => {
    // Check if dataloader is initialized
    const dataloader = page.locator('[data-testid="dataloader"]')
    await expect(dataloader).toBeVisible()

    // Check if articles are loaded
    const articles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(articles).toHaveCount(2) // We display 2 per page
  })

  test('should handle category selection interaction', async ({ page }) => {
    // Click on "Technology" category
    await page.locator('[data-testid="category-technology"]').click()
    
    // Wait for loading indicator to appear and disappear
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
    
    // Verify the Technology category gets the selected attribute
    await expect(page.locator('[data-testid="category-technology"]')).toHaveAttribute('data-loader-param-selected')
    
    // The "All" category should lose its selected attribute
    await expect(page.locator('[data-testid="category-all"]')).not.toHaveAttribute('data-loader-param-selected')
    
    // Click on "Health" category
    await page.locator('[data-testid="category-health"]').click()
    
    // Wait for loading to complete
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
    
    // Verify the Health category gets the selected attribute
    await expect(page.locator('[data-testid="category-health"]')).toHaveAttribute('data-loader-param-selected')
    
    // The Technology category should lose its selected attribute
    await expect(page.locator('[data-testid="category-technology"]')).not.toHaveAttribute('data-loader-param-selected')
  })

  test('should support multiple tag selection', async ({ page }) => {
    // Click on Web tag
    await page.locator('[data-testid="tag-web"]').click()
    
    // Wait for loading to complete
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
    
    // Web tag should be selected
    await expect(page.locator('[data-testid="tag-web"]')).toHaveAttribute('data-loader-param-selected')
    
    // Click on AI tag as well (multi-select)
    await page.locator('[data-testid="tag-ai"]').click()
    
    // Wait for loading to complete
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
    
    // Both tags should be selected
    await expect(page.locator('[data-testid="tag-web"]')).toHaveAttribute('data-loader-param-selected')
    await expect(page.locator('[data-testid="tag-ai"]')).toHaveAttribute('data-loader-param-selected')
    
    // Deselect Web tag (click again)
    await page.locator('[data-testid="tag-web"]').click()
    
    // Wait for loading to complete
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
    
    // Only AI tag should be selected now
    await expect(page.locator('[data-testid="tag-web"]')).not.toHaveAttribute('data-loader-param-selected')
    await expect(page.locator('[data-testid="tag-ai"]')).toHaveAttribute('data-loader-param-selected')
  })

  test('should handle search input interaction', async ({ page }) => {
    // Type search term in the filter input
    await page.locator('[data-testid="search-input"]').fill('Climate')
    
    // Wait for debounce and loading to complete
    await page.waitForTimeout(700) // Wait for debounce
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
    
    // Clear search and check if articles are shown
    await page.locator('[data-testid="search-input"]').fill('')
    
    // Wait for debounce and loading to complete
    await page.waitForTimeout(700) // Wait for debounce
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
  })

  test('should interact with load more button', async ({ page }) => {
    // Initial count of articles
    const initialArticles = page.locator('[data-testid="article-grid"] .article-card')
    await expect(initialArticles).toHaveCount(2) // We show 2 per page initially
    
    // Click load more button
    await page.locator('[data-testid="load-more"]').click()
    
    // Wait for loading to complete
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
    
    // Click the load more button again
    await page.locator('[data-testid="load-more"]').click()
    
    // Wait for loading to complete
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
    
    // One more click on load more
    await page.locator('[data-testid="load-more"]').click()
    
    // Wait for loading to complete
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
  })

  test('should show loading state during data fetching', async ({ page }) => {
    // Observe the loading state after clicking a category
    const dataloader = page.locator('[data-testid="dataloader"]')
    
    // Click category to trigger loading
    await page.locator('[data-testid="category-science"]').click()
    
    // Should briefly show loading state
    await expect(dataloader).toHaveAttribute('data-loader-loading')
    
    // Wait for loading to complete
    await expect(dataloader).not.toHaveAttribute('data-loader-loading', { timeout: 3000 })
    
    // HTML should have the loading attribute briefly
    await expect(page.locator('html')).not.toHaveAttribute('data-loading')
  })

  test('should change filters correctly', async ({ page }) => {
    // First load more articles
    await page.locator('[data-testid="load-more"]').click()
    
    // Wait for loading to complete
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
    
    // Change category 
    await page.locator('[data-testid="category-technology"]').click()
    
    // Wait for loading to complete
    await expect(page.locator('[data-loader-loading]')).toBeVisible({ timeout: 1000 })
    await expect(page.locator('[data-loader-loading]')).not.toBeVisible({ timeout: 3000 })
    
    // The tech category should be selected
    await expect(page.locator('[data-testid="category-technology"]')).toHaveAttribute('data-loader-param-selected')
  })
})