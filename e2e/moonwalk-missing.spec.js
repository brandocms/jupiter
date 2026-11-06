// @ts-check
const { test, expect } = require('@playwright/test')

// Config mistakes and odd anchors are reported, and reveal the rest of the page.
test.describe('Moonwalk with missing walks', () => {
  /** @type {string[]} */
  let pageErrors
  /** @type {string[]} */
  let consoleErrors

  test.beforeEach(async ({ page }) => {
    pageErrors = []
    consoleErrors = []
    page.on('pageerror', (error) => pageErrors.push(error.message))
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })
  })

  test('unknown section, stage and element walks reveal the page', async ({
    page,
  }) => {
    await page.goto('/moonwalk-missing.html')
    await expect(page.locator('html')).toHaveClass(/moonwalk/)

    for (const id of [
      'ghost-walk',
      'phantom-walk',
      'unknown-walk',
      'known-walk',
    ]) {
      const el = page.getByTestId(id)
      await el.scrollIntoViewIfNeeded()
      await expect(el).toHaveAttribute('data-moonwalked', '')
    }

    // A named section after the broken ones still runs its walk
    await page.getByTestId('fade-section').scrollIntoViewIfNeeded()
    await expect(page.getByTestId('fade-child-2')).toHaveCSS('opacity', '1')

    expect(pageErrors).toEqual([])
    expect(consoleErrors.join('\n')).toContain('ghost')
    expect(consoleErrors.join('\n')).toContain('phantom')
    expect(consoleErrors.filter((e) => e.includes('nope'))).toHaveLength(1)
  })

  test('an anchor that is not a valid selector reveals up to its target', async ({
    page,
  }) => {
    await page.goto('/moonwalk-missing.html#1-intro')
    await expect(page.locator('html')).toHaveClass(/moonwalk/)

    await expect(page.getByTestId('anchor-walk')).toHaveAttribute(
      'data-moonwalked',
      ''
    )
    await expect(page.getByTestId('known-walk')).toHaveAttribute(
      'data-moonwalked',
      ''
    )
    expect(pageErrors).toEqual([])
  })

  test('the Application swaps no-js for js without the inline head script', async ({
    page,
  }) => {
    await page.goto('/moonwalk-missing.html')
    await expect(page.locator('html')).toHaveClass(/\bjs\b/)
    await expect(page.locator('html')).not.toHaveClass(/no-js/)
  })
})
