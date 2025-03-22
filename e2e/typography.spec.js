// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Typography Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the typography test page from Vite server
    await page.goto('/typography.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait additional time for Jupiter to initialize
    await page.waitForTimeout(1000)
  })

  test('should apply orphan prevention to basic paragraph', async ({
    page,
  }) => {
    // Check if the basic paragraph has the &nbsp; entity
    const basicParagraph = page.locator('[data-testid="basic-paragraph"]')

    // Get the paragraph's innerHTML
    const innerHTML = await basicParagraph.innerHTML()

    // Verify that &nbsp; is inserted between the penultimate and last words
    expect(innerHTML).toContain('this&nbsp;line')
  })

  test('should respect minimum words setting', async ({ page }) => {
    // Check if short text is ignored (not enough words)
    const shortText = page.locator('[data-testid="short-text"]')
    const shortTextHTML = await shortText.innerHTML()
    expect(shortTextHTML).not.toContain('&nbsp;')

    // Check if medium text is processed (exactly at the threshold)
    const mediumText = page.locator('[data-testid="medium-text"]')
    const mediumTextHTML = await mediumText.innerHTML()
    expect(mediumTextHTML).toContain('words&nbsp;exactly')

    // Check if long text is processed
    const longText = page.locator('[data-testid="long-text"]')
    const longTextHTML = await longText.innerHTML()
    expect(longTextHTML).toContain('&nbsp;correctly')
  })

  test('should process children with data-typo-children', async ({ page }) => {
    // Check if children in the container are processed
    const firstChild = page.locator('[data-testid="child-paragraph-1"]')
    const firstChildHTML = await firstChild.innerHTML()
    expect(firstChildHTML).toContain('applied&nbsp;automatically')

    const secondChild = page.locator('[data-testid="child-paragraph-2"]')
    const secondChildHTML = await secondChild.innerHTML()
    expect(secondChildHTML).toContain('Typography&nbsp;module')

    const childDiv = page.locator('[data-testid="child-div"]')
    const childDivHTML = await childDiv.innerHTML()
    expect(childDivHTML).toContain('to&nbsp;it')
  })

  test('should ignore elements with the specified ignore class', async ({
    page,
  }) => {
    // Check if element with ignore class is not processed
    const ignoredParagraph = page.locator('[data-testid="ignored-paragraph"]')
    const ignoredHTML = await ignoredParagraph.innerHTML()
    // Should not contain &nbsp;
    expect(ignoredHTML).not.toContain('&nbsp;')

    // Check if normal element is processed
    const processedParagraph = page.locator(
      '[data-testid="processed-paragraph"]'
    )
    const processedHTML = await processedParagraph.innerHTML()
    // Should contain &nbsp;
    expect(processedHTML).toContain('ignore&nbsp;class')
  })

  test('should reset typography formatting when reset is called', async ({
    page,
  }) => {
    // First check if the paragraph has formatting
    const resetParagraph = page.locator('[data-testid="reset-paragraph"]')
    const initialHTML = await resetParagraph.innerHTML()
    expect(initialHTML).toContain('button&nbsp;below')

    // Click the reset button
    await page.locator('[data-testid="reset-button"]').click()

    // Wait a moment for the reset to apply
    await page.waitForTimeout(500)

    // Check if formatting was removed
    const resetHTML = await resetParagraph.innerHTML()
    expect(resetHTML).not.toContain('&nbsp;')

    // Click the apply button to reapply formatting
    await page.locator('[data-testid="apply-button"]').click()

    // Wait a moment for the formatting to be reapplied
    await page.waitForTimeout(500)

    // Check if formatting was reapplied
    const reappliedHTML = await resetParagraph.innerHTML()
    expect(reappliedHTML).toContain('button&nbsp;below')
  })
})
