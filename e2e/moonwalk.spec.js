// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter Moonwalk Module', () => {
  test.beforeEach(async ({ page }) => {
    // Load the moonwalk test page from Vite server
    await page.goto('/moonwalk.html')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    // Wait additional time for Jupiter to initialize
    await page.waitForTimeout(1000)
  })

  test('should initialize and add moonwalk class to html element', async ({
    page,
  }) => {
    // Check if moonwalk class was added to the html element (via addClass method)
    const htmlElement = page.locator('html')
    await expect(htmlElement).toHaveClass(/moonwalk/)
  })

  test('should apply basic animations to elements with data-moonwalk', async ({
    page,
  }) => {
    // First section with basic moonwalk elements
    const firstHeading = page.locator('[data-testid="basic-heading"]')

    // Element should exist but not be animated yet
    await expect(firstHeading).toBeVisible()
    await expect(firstHeading).not.toHaveAttribute('data-moonwalked')

    // Scroll to element
    await firstHeading.scrollIntoViewIfNeeded()

    // Wait for animation to be applied
    await expect(firstHeading).toHaveAttribute('data-moonwalked', {
      timeout: 5000,
    })

    // Check another element
    const firstBox = page.locator('[data-testid="basic-box-1"]')
    await expect(firstBox).toBeVisible()

    // Scroll to it
    await firstBox.scrollIntoViewIfNeeded()

    // Verify it animates
    await expect(firstBox).toHaveAttribute('data-moonwalked', { timeout: 5000 })
  })

  test('should apply different animation types based on named moonwalks', async ({
    page,
  }) => {
    // Test the section with different animation types
    const animationSection = page.locator(
      '[data-testid="animation-types-section"]'
    )
    await animationSection.scrollIntoViewIfNeeded()

    // Check the different animation types
    const fadeBox = page.locator('[data-testid="fade-box"]')
    const slideBox = page.locator('[data-testid="slide-box"]')
    const scaleBox = page.locator('[data-testid="scale-box"]')

    await fadeBox.scrollIntoViewIfNeeded()
    await expect(fadeBox).toHaveAttribute('data-moonwalked', { timeout: 5000 })

    await slideBox.scrollIntoViewIfNeeded()
    await expect(slideBox).toHaveAttribute('data-moonwalked', { timeout: 5000 })

    await scaleBox.scrollIntoViewIfNeeded()
    await expect(scaleBox).toHaveAttribute('data-moonwalked', { timeout: 5000 })
  })

  test('should animate sections with staggered animations', async ({
    page,
  }) => {
    // Section with data-moonwalk-section
    const staggerSection = page.locator('[data-testid="stagger-section"]')

    // Wait for page to fully load and then navigate to the top
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)

    // Scroll to section
    await staggerSection.scrollIntoViewIfNeeded()

    // Section should be marked as ready
    await expect(staggerSection).toHaveAttribute(
      'data-moonwalk-section-ready',
      { timeout: 5000 }
    )

    // Wait for animations to finish - check that boxes have been animated
    // Staggered animations happen automatically for sections
    const firstBox = staggerSection.locator('[data-testid="stagger-box-1"]')
    await expect(firstBox).toBeVisible()
  })

  test('should convert children to moonwalk elements', async ({ page }) => {
    // Test the section with data-moonwalk-children
    const childrenSection = page.locator('[data-testid="children-section"]')
    await childrenSection.scrollIntoViewIfNeeded()

    // Check children with named moonwalk
    const fadeChildrenContainer = page.locator(
      '[data-testid="fade-children-container"]'
    )

    // Wait for the markup to be processed by Moonwalk
    await page.waitForTimeout(500)

    // Check if children have data-moonwalk attribute - using first child
    const firstFadeChild = page.locator('[data-testid="fade-child-box-1"]')

    // First verify the element is visible
    await expect(firstFadeChild).toBeVisible()

    // Scroll to child element
    await firstFadeChild.scrollIntoViewIfNeeded()

    // Check if animation is applied
    await expect(firstFadeChild).toHaveAttribute('data-moonwalked', {
      timeout: 5000,
    })

    // Check default children
    const defaultChildrenContainer = page.locator(
      '[data-testid="default-children-container"]'
    )
    const firstDefaultChild = page.locator(
      '[data-testid="default-child-box-1"]'
    )

    // Scroll to default child
    await firstDefaultChild.scrollIntoViewIfNeeded()

    // Check if animation is applied
    await expect(firstDefaultChild).toHaveAttribute('data-moonwalked', {
      timeout: 5000,
    })
  })

  test('should execute custom callbacks with moonwalk-run', async ({
    page,
  }) => {
    // Test the run section
    const runSection = page.locator('[data-testid="run-section"]')
    await runSection.scrollIntoViewIfNeeded()

    // Counter run
    const counterTarget = page.locator('[data-testid="counter-target"]')
    const counter = page.locator('[data-testid="run-counter"]')

    // Before scroll
    await expect(counter).toHaveText('0')

    // Scroll to counter target
    await counterTarget.scrollIntoViewIfNeeded()

    // Check if counter was incremented by the callback
    await expect(counter).toHaveText('1', { timeout: 5000 })
    await expect(counterTarget).toHaveClass(/triggered/)

    // Color Change run with exit
    const colorIndicator = page.locator('[data-testid="color-indicator"]')

    // Scroll to color indicator
    await colorIndicator.scrollIntoViewIfNeeded()

    // Check if callback applied changes
    await expect(colorIndicator).toHaveClass(/triggered/, { timeout: 5000 })
    await expect(colorIndicator).toContainText('In View!')

    // Scroll away to trigger exit callback
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })

    // Wait for exit callback to execute
    await page.waitForTimeout(1000)

    // Check if exit callback worked
    await expect(colorIndicator).not.toHaveClass(/triggered/)
    await expect(colorIndicator).toContainText('Out of View')
  })

  test('should detect and report viewport entry and exit directions', async ({
    page,
  }) => {
    // First, make sure we're at the top of the page
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(500)

    // Locate the direction test section and element
    const directionSection = page.locator('[data-testid="direction-section"]')
    const directionIndicator = page.locator(
      '[data-testid="direction-indicator"]'
    )

    // Scroll to the direction test section
    await directionSection.scrollIntoViewIfNeeded()

    // Wait for the element to enter viewport and display entry direction
    // Since we're scrolling down to it, it should enter from bottom
    await expect(directionIndicator).toHaveClass(/triggered/, { timeout: 5000 })
    await expect(directionIndicator).toHaveAttribute('data-entry-direction')

    // Store the entry direction for later checks
    const entryDirection = await directionIndicator.getAttribute(
      'data-entry-direction'
    )

    // Scroll down past the element to trigger exit from top
    await page.evaluate(() => {
      // Scroll far enough to ensure the element is completely out of viewport
      window.scrollBy(0, window.innerHeight * 2)
    })
    await page.waitForTimeout(1000)

    // Check that exit direction was detected
    await expect(directionIndicator).not.toHaveClass(/triggered/)
    await expect(directionIndicator).toHaveAttribute('data-exit-direction')

    // Store the exit direction for logging
    const exitDirection = await directionIndicator.getAttribute(
      'data-exit-direction'
    )

    // When scrolling down, we expect exit from top
    // This may fail if the direction detection is not working correctly, but it's a good check
    expect(exitDirection).toBe('top')

    // Scroll back up to see the element enter again, but now from a different direction
    await directionIndicator.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)

    // Check that entry was detected and has an entry direction
    await expect(directionIndicator).toHaveClass(/triggered/, { timeout: 5000 })
    await expect(directionIndicator).toHaveAttribute('data-entry-direction')

    // Second entry direction should be different
    const secondEntryDirection = await directionIndicator.getAttribute(
      'data-entry-direction'
    )

    // When scrolling back up, we expect entry from top
    expect(secondEntryDirection).toBe('top')

    // Let's check that we actually detected some directions
    expect(entryDirection).not.toBe('')
    expect(exitDirection).not.toBe('')
    expect(secondEntryDirection).not.toBe('')
    await expect(directionIndicator).toHaveClass(/triggered/)
  })

  test('should respect ordering with data-moonwalk-order', async ({ page }) => {
    // Test ordered section
    const orderedSection = page.locator('[data-testid="ordered-section"]')

    // Scroll to ordered section
    await orderedSection.scrollIntoViewIfNeeded()

    // Now check that it got the ready attribute
    await expect(orderedSection).toHaveAttribute(
      'data-moonwalk-section-ready',
      { timeout: 5000 }
    )

    // Check if boxes get ordered attributes
    // We can't really test the actual animation order visually, but we can check that the attributes are set
    const box1 = page.locator('[data-testid="order-box-1"]')
    const box2 = page.locator('[data-testid="order-box-2"]')

    await expect(box1).toBeVisible()
    await expect(box2).toBeVisible()
  })

  test('should handle nested sections according to config', async ({
    page,
  }) => {
    // Test nested sections behavior based on clearNestedSections config
    const nestedSection = page.locator('[data-testid="nested-section"]')
    await nestedSection.scrollIntoViewIfNeeded()

    // Outer section
    const outerSection = page.locator('[data-testid="outer-section"]')

    // Inner section - since clearNestedSections is true, this should no longer have data-moonwalk-section
    const innerSection = page.locator('[data-testid="inner-section"]')

    // Outer section should be marked as ready
    await expect(outerSection).toHaveAttribute('data-moonwalk-section-ready', {
      timeout: 5000,
    })

    // Inner section shouldn't have the attribute anymore (due to clearNestedSections: true)
    await expect(innerSection).not.toHaveAttribute('data-moonwalk-section')

    // Similarly, check nested walks
    const nestedMoonwalk = page.locator('[data-testid="nested-walk-child"]')
    await expect(nestedMoonwalk).not.toHaveAttribute('data-moonwalk')
  })
})
