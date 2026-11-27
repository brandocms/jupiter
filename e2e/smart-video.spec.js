// @ts-check
const { test, expect } = require('@playwright/test')

const playing = video => video.evaluate(el => !el.paused && el.currentTime > 0)
const hlsJs = url => /hls[._]+js/.test(url)

test.describe('Jupiter SmartVideo Module', () => {
  /** @type {string[]} */
  let requests

  test.beforeEach(async ({ page }) => {
    requests = []
    page.on('request', request => requests.push(request.url()))
    await page.goto('/smart-video.html')
    await expect(page.locator('body')).toHaveAttribute('data-app-revealed', 'true')
  })

  test('a lazy video gets its source when it nears the viewport, not before', async ({ page }) => {
    const wrapper = page.getByTestId('lazy')
    const video = wrapper.locator('video')

    await expect(wrapper).not.toHaveAttribute('data-revealed')
    await expect(wrapper).toBeHidden()
    expect(await video.getAttribute('src')).toBeNull()
    expect(requests.some(url => url.includes('clip.webm?lazy'))).toBe(false)

    // Still 150px below the fold
    await wrapper.evaluate(el => {
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight - 150)
    })

    await expect(video).toHaveJSProperty('currentSrc', new URL('/videos/clip.webm?lazy', page.url()).href)
    await expect(wrapper).toHaveAttribute('data-revealed')
    await expect(wrapper).toBeVisible()
    expect(await wrapper.evaluate(el => el.getBoundingClientRect().top > window.innerHeight)).toBe(true)
  })

  test('a video that is not lazy is revealed at once', async ({ page }) => {
    const wrapper = page.getByTestId('eager')

    await expect(wrapper).toHaveAttribute('data-revealed')
    await expect(wrapper).toBeVisible()
    await expect(wrapper.locator('video')).toHaveJSProperty(
      'currentSrc',
      new URL('/videos/clip.webm?eager', page.url()).href
    )
    expect(await wrapper.evaluate(el => el.getBoundingClientRect().top > window.innerHeight)).toBe(true)
  })

  test('an autoplay video plays in view and pauses out of it', async ({ page }) => {
    const wrapper = page.getByTestId('autoplay')
    const video = wrapper.locator('video')

    await expect(wrapper).toBeVisible()
    await expect.poll(() => playing(video)).toBe(true)
    await expect(wrapper).toHaveAttribute('data-playing')

    await page.getByTestId('button').scrollIntoViewIfNeeded()
    await expect(video).toHaveJSProperty('paused', true)
    await expect(wrapper).not.toHaveAttribute('data-playing')

    await wrapper.scrollIntoViewIfNeeded()
    await expect(video).toHaveJSProperty('paused', false)
    await expect(wrapper).toHaveAttribute('data-playing')
  })

  test('the play button plays the video and a click on it pauses', async ({ page }) => {
    const wrapper = page.getByTestId('button')
    const video = wrapper.locator('video')

    await wrapper.scrollIntoViewIfNeeded()
    await expect(wrapper).toBeVisible()
    await expect(video).toHaveJSProperty('paused', true)

    await wrapper.getByRole('button').click()
    await expect.poll(() => playing(video)).toBe(true)
    await expect(wrapper).toHaveAttribute('data-playing')

    await video.click()
    await expect(video).toHaveJSProperty('paused', true)
    await expect(wrapper).not.toHaveAttribute('data-playing')
  })

  test('an intersection entry delivered after destroy() is ignored', async ({ page }) => {
    const error = await page.evaluate(() => {
      const smartVideo = window.__smartVideo
      const target = document.querySelector('[data-testid="autoplay"]')
      smartVideo.destroy()
      try {
        smartVideo.handlePlayEntries([{ target, isIntersecting: false }])
        smartVideo.handleLoadEntries([{ target, isIntersecting: true }])
        return null
      } catch (e) {
        return String(e)
      }
    })

    expect(error).toBeNull()
  })

  test('an autoplay video just outside the viewport is loaded and paused', async ({ page }) => {
    const wrapper = page.getByTestId('autoplay')
    const video = wrapper.locator('video')

    await expect.poll(() => playing(video)).toBe(true)

    // Its bottom edge 20px above the viewport
    await wrapper.evaluate(el => window.scrollTo(0, el.getBoundingClientRect().bottom + window.scrollY + 20))

    await expect(video).toHaveJSProperty('paused', true)
    await expect(wrapper).toHaveAttribute('data-revealed')
    await expect(video).toHaveJSProperty('currentSrc', new URL('/videos/clip.webm?autoplay', page.url()).href)
  })

  test('a new instance after destroy() still plays an autoplay video in view', async ({ page }) => {
    const wrapper = page.getByTestId('autoplay')
    const video = wrapper.locator('video')

    await expect.poll(() => playing(video)).toBe(true)
    await page.getByTestId('button').scrollIntoViewIfNeeded()
    await expect(video).toHaveJSProperty('paused', true)

    await page.evaluate(() => {
      const old = window.__smartVideo
      old.destroy()
      window.__smartVideo = new old.constructor(old.app)
    })

    await wrapper.scrollIntoViewIfNeeded()
    await expect.poll(() => playing(video)).toBe(true)
  })

  test('the play button of a video with a cover plays it and the cover goes', async ({ page }) => {
    const wrapper = page.getByTestId('cover')
    const video = wrapper.locator('video')
    const cover = wrapper.locator('[data-cover]')
    const button = wrapper.locator('.video-play-button-wrapper')

    await wrapper.scrollIntoViewIfNeeded()
    await expect(wrapper).toHaveCSS('opacity', '1')
    await expect(cover).toBeVisible()

    await wrapper.getByRole('button').click()
    await expect.poll(() => playing(video)).toBe(true)
    await expect(cover).toBeHidden()
    await expect(button).toHaveCSS('opacity', '0')

    await video.click()
    await expect(video).toHaveJSProperty('paused', true)
    await expect(button).toHaveCSS('opacity', '1')
    await expect(cover).toBeVisible()
  })

  test('a click on a video without controls or a play button plays and pauses it', async ({ page }) => {
    const wrapper = page.getByTestId('lazy')
    const video = wrapper.locator('video')

    await wrapper.scrollIntoViewIfNeeded()
    await expect(wrapper).toHaveAttribute('data-revealed')

    await video.click()
    await expect.poll(() => playing(video)).toBe(true)

    await video.click()
    await expect(video).toHaveJSProperty('paused', true)
  })

  test('an HLS stream plays through hls.js in a browser without native HLS', async ({ page }) => {
    await page.addInitScript(() => {
      const canPlayType = HTMLMediaElement.prototype.canPlayType
      HTMLMediaElement.prototype.canPlayType = function (type) {
        return type === 'application/vnd.apple.mpegurl' ? '' : canPlayType.call(this, type)
      }
    })
    requests.length = 0
    await page.goto('/smart-video.html')
    await expect(page.locator('body')).toHaveAttribute('data-app-revealed', 'true')

    const wrapper = page.getByTestId('hls')
    const video = wrapper.locator('video')
    expect(requests.some(hlsJs)).toBe(false)

    await wrapper.scrollIntoViewIfNeeded()
    await wrapper.getByRole('button').click()

    await expect.poll(() => playing(video)).toBe(true)
    await expect(wrapper).toHaveAttribute('data-playing')
    expect(await video.evaluate(el => el.currentSrc)).toMatch(/^blob:/)
    expect(requests.some(hlsJs)).toBe(true)

    // destroy() destroys the hls.js player, which takes its source off the video.
    await page.evaluate(() => window.__smartVideo.destroy())
    await expect(video).not.toHaveAttribute('src')
  })

  test('a failed hls.js load raises no error and leaves the video paused', async ({ page }) => {
    await page.addInitScript(() => {
      const canPlayType = HTMLMediaElement.prototype.canPlayType
      HTMLMediaElement.prototype.canPlayType = function (type) {
        return type === 'application/vnd.apple.mpegurl' ? '' : canPlayType.call(this, type)
      }
    })
    const errors = []
    page.on('pageerror', error => errors.push(error))
    await page.route(hlsJs, route => route.abort())
    requests.length = 0
    await page.goto('/smart-video.html')
    await expect(page.locator('body')).toHaveAttribute('data-app-revealed', 'true')

    const wrapper = page.getByTestId('hls')
    const video = wrapper.locator('video')
    await wrapper.scrollIntoViewIfNeeded()
    await wrapper.getByRole('button').click()
    await expect.poll(() => requests.filter(hlsJs).length).toBeGreaterThan(0)

    // A second play waits on the same failed load
    await wrapper.getByRole('button').click()
    await expect(wrapper).not.toHaveAttribute('data-playing')
    expect(await video.evaluate(el => el.paused)).toBe(true)
    expect(errors).toEqual([])
  })

  test('an HLS stream plays natively where the browser can, without hls.js', async ({ page }) => {
    const wrapper = page.getByTestId('hls')
    const video = wrapper.locator('video')
    const native = await video.evaluate(el => el.canPlayType('application/vnd.apple.mpegurl'))
    test.skip(!native, 'this browser has no native HLS')

    await wrapper.scrollIntoViewIfNeeded()
    await wrapper.getByRole('button').click()

    await expect.poll(() => playing(video)).toBe(true)
    await expect(video).toHaveJSProperty('currentSrc', new URL('/videos/hls/clip.m3u8', page.url()).href)
    expect(requests.some(hlsJs)).toBe(false)
  })
})
