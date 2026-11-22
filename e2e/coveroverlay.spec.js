// @ts-check
const { test, expect } = require('@playwright/test')

test.describe('Jupiter CoverOverlay Module', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('https://player.vimeo.com/api/player.js', route => route.fulfill({
      contentType: 'application/javascript',
      body: 'window.Vimeo = {Player: class { constructor(el) { this.el = el } play() { this.el.dataset.played = "true" } }}'
    }))
    await page.route('https://player.vimeo.com/video/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Vimeo fixture</title>' }))
    await page.route('https://www.youtube.com/embed/**', route => route.fulfill({
      contentType: 'text/html',
      body: '<body><script>addEventListener("message", e => { if (JSON.parse(e.data).func === "playVideo") document.body.dataset.played = "true" })</script>'
    }))
    await page.route('https://picsum.photos/**', route => route.fulfill({ status: 204 }))
    await page.goto('/coveroverlay.html')
  })

  test('should initialize correctly', async ({ page }) => {
    // Check if the video container exists
    const videoContainer = page.locator('[data-testid="video-container"]')
    await expect(videoContainer).toBeVisible()

    // Check if the overlay is visible
    const overlay = page.locator('[data-testid="overlay"]')
    await expect(overlay).toBeVisible()

    // Check if the play button is visible
    const playButton = page.locator('[data-testid="play-button"]')
    await expect(playButton).toBeVisible()

    // Check if the iframe is loaded but not visible
    const iframe = page.locator('[data-testid="video-iframe"]')
    await expect(iframe).toBeAttached()

    // Check for correct attributes on iframe
    const allow = await iframe.getAttribute('allow')
    expect(allow).toContain('accelerometer')
    expect(allow).toContain('autoplay')
    expect(allow).toContain('encrypted-media')
    expect(allow).toContain('gyroscope')
    expect(allow).toContain('picture-in-picture')
  })

  test('should hide overlay and show video when play button is clicked', async ({
    page,
  }) => {
    // Reset the overlay to ensure fresh state
    await page.locator('[data-testid="reset-button"]').click()

    // Verify initial state
    const overlay = page.locator('[data-testid="overlay"]')
    const playButton = page.locator('[data-testid="play-button"]')
    const iframe = page.locator('[data-testid="video-iframe"]')

    await expect(overlay).toBeVisible()
    await expect(playButton).toBeVisible()
    await expect(iframe).toHaveCSS('opacity', '0')

    // Click play button
    await playButton.click()

    // Check that overlay is hidden and iframe is visible
    await expect(overlay).not.toBeVisible()
    await expect(playButton).toHaveCSS('opacity', '0')
    await expect(iframe).toHaveCSS('opacity', '1')
    await expect(page.frameLocator('[data-testid="video-iframe"]').locator('body')).toHaveAttribute('data-played', 'true')
  })

  test('should handle Vimeo integration', async ({ page }) => {
    // Check if the Vimeo container exists
    const vimeoContainer = page.locator('[data-testid="vimeo-container"]')
    await expect(vimeoContainer).toBeVisible()

    // Reset the Vimeo overlay to ensure fresh state
    await page.locator('[data-testid="vimeo-reset-button"]').click()

    // Verify initial state
    const overlay = page.locator('[data-testid="vimeo-overlay"]')
    const playButton = page.locator('[data-testid="vimeo-play-button"]')
    const iframe = page.locator('[data-testid="vimeo-iframe"]')

    await expect(overlay).toBeVisible()
    await expect(playButton).toBeVisible()
    await expect(iframe).toHaveCSS('opacity', '0')

    // Click play button
    await playButton.click()

    // Check that overlay is hidden and iframe is visible
    await expect(overlay).not.toBeVisible()
    await expect(playButton).toHaveCSS('opacity', '0')
    await expect(iframe).toHaveCSS('opacity', '1')
    await expect(iframe).toHaveAttribute('data-played', 'true')
  })

  test('should reset video overlay correctly', async ({ page }) => {
    // First play the video
    await page.locator('[data-testid="play-button"]').click()

    // Check if overlay is hidden
    const overlay = page.locator('[data-testid="overlay"]')
    await expect(overlay).not.toBeVisible()

    // Reset the overlay
    await page.locator('[data-testid="reset-button"]').click()

    // Check if overlay is visible again
    await expect(overlay).toBeVisible()

    // Check if play button is visible again
    const playButton = page.locator('[data-testid="play-button"]')
    await expect(playButton).toBeVisible()

    // Check if iframe is hidden again
    const iframe = page.locator('[data-testid="video-iframe"]')
    await expect(iframe).toHaveCSS('opacity', '0')
  })
})
