const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  await page.goto('/module-contracts.html')
})

test('loaders commit consecutive successful pages and own their loading indicators', async ({ page }) => {
  await page.evaluate(() => {
    const requests = window.requests = []
    window.fetch = (url, { signal }) => new Promise(resolve => {
      requests.push({ url, signal, finish: (html, status = 200) => resolve(new Response(html, { status })) })
    })
    window.callbacks = []
    for (const name of ['first', 'second']) {
      const el = document.createElement('section')
      el.dataset.loader = '/' + name
      el.innerHTML = '<main data-loader-canvas>initial</main><button data-loader-more>More</button>'
      document.body.append(el)
      window[name + 'Loader'] = new window.contracts.Dataloader({}, el, {
        onFetch: loader => window.callbacks.push([name, loader.opts.page])
      })
    }
    const more = window.firstLoader.$moreBtn
    more.click()
    more.click()
    window.secondLoader.fetch()
  })
  expect(await page.evaluate(() => window.requests.map(r => r.url))).toEqual(['/first/1?filter=', '/second/0?filter='])
  await page.evaluate(() => window.requests[0].finish('error body', 503))
  const first = page.locator('[data-loader="/first"]')
  await expect(first).not.toHaveAttribute('data-loader-loading', '')
  await expect(first.locator('main')).toHaveText('initial')
  await expect(page.locator('html')).toHaveAttribute('data-loading', '')
  await first.getByRole('button').click()
  await page.evaluate(() => {
    window.requests[2].finish(' page one')
    window.secondLoader.destroy()
    window.requests[1].finish('late response')
  })
  await expect(first.locator('main')).toHaveText('initial page one')
  await expect(page.locator('html')).not.toHaveAttribute('data-loading', '')
  await expect(page.locator('[data-loader="/second"] main')).toHaveText('initial')
  expect(await page.evaluate(() => [window.requests[1].signal.aborted, window.requests[2].url, window.callbacks]))
    .toEqual([true, '/first/1?filter=', [['first', 1]]])
})

test('filter state survives initialization, encoded segments and navigation after pagination', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const el = document.createElement('section')
    el.dataset.loader = '/results'
    el.dataset.loaderId = 'results'
    el.innerHTML = '<main data-loader-canvas></main><input type="checkbox" checked data-loader-param="true" data-loader-param-key="active">'
    const labels = ['A/B', '50%, off', 'C']
    labels.forEach((value, i) => {
      const btn = document.createElement('button')
      btn.dataset.loaderParam = value
      btn.dataset.loaderParamKey = 'topic'
      btn.dataset.loaderParamMulti = ''
      btn.toggleAttribute('data-loader-param-selected', i < 2)
      el.append(btn)
    })
    document.body.append(el)
    const requests = []
    window.fetch = async url => {
      requests.push(url)
      return new Response('ok')
    }
    const loader = new window.contracts.Dataloader({}, el, {
      page: 2, urlSync: { results: { templates: { en: '/news/:missing/:topic/:active' } } }
    })
    const initial = { ...loader.opts.loaderParam }
    const url = location.pathname
    const parsed = loader.urlSync.parseUrl()
    const [first,, third] = el.querySelectorAll('button')
    first.click()
    third.click()
    const selected = [...el.querySelectorAll('button[data-loader-param-selected]')].map(b => b.dataset.loaderParam)
    history.replaceState({}, '', url)
    dispatchEvent(new PopStateEvent('popstate'))
    const restored = loader.opts.loaderParam
    history.replaceState({}, '', '/news//%/true')
    const malformed = loader.urlSync.parseUrl()
    loader.destroy()
    return { initial, url, parsed, selected, restored, malformed, last: requests.at(-1) }
  })
  expect(result.initial).toEqual({ topic: ['A/B', '50%, off'], active: true })
  expect(result.url).toBe('/news//A%2FB,50%25%2C%20off/true')
  expect(result.parsed.topic).toEqual(result.initial.topic)
  expect(result.selected).toEqual(['50%, off', 'C'])
  expect(result.restored).toEqual(result.initial)
  expect(result.malformed).toEqual({})
  expect(result.last).toMatch(/^\/results\/0\?/)
})

test('concurrent image consumers settle alongside native handlers, including cached failure', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const { imageIsLoaded } = window.contracts
    const image = new Image()
    let loads = 0
    image.onload = () => loads++
    image.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"/>'
    const results = await Promise.all([imageIsLoaded(image), imageIsLoaded(image)])
    const broken = new Image()
    broken.src = 'data:image/png,invalid'
    const failed = await imageIsLoaded(broken)
    const cached = await imageIsLoaded(broken)
    const lazy = new Image()
    lazy.dataset.src = image.src
    lazy.dataset.llImage = ''
    document.body.append(lazy)
    const pending = imageIsLoaded(lazy, true)
    const loader = new window.contracts.Lazyload({ state: { revealed: true }, registerCallback() {} }, {
      useNativeLazyloadIfAvailable: true
    })
    const handedOff = [(await pending).status, (await imageIsLoaded(lazy, true)).status]
    loader.destroy()
    return [loads, ...results.map(r => r.status), failed.status, cached.status, ...handedOff]
  })
  expect(result).toEqual([1, 'ok', 'ok', 'error', 'error', 'ok', 'ok'])
})

test('a burst delivers its latest arguments in one frame and can be cancelled', async ({ page }) => {
  const result = await page.evaluate(() => {
    const frames = new Map()
    let requested = 0
    window.requestAnimationFrame = fn => {
      frames.set(++requested, fn)
      return requested
    }
    window.cancelAnimationFrame = id => frames.delete(id)
    const ran = []
    const scheduled = window.contracts.rafCallback(value => ran.push(value), 30)
    for (let i = 0; i < 100; i++) scheduled(i)
    const burst = requested
    frames.get(1)(100)
    scheduled(100)
    frames.get(2)(116)
    frames.get(3)(134)
    scheduled(101)
    scheduled.cancel()
    return { burst, ran, cancelled: !frames.has(4) }
  })
  expect(result).toEqual({ burst: 1, ran: [99, 100], cancelled: true })
})

test('snap geometry handles negative cycles, ties and constrained edges', async ({ page }) => {
  const result = await page.evaluate(() => {
    const { nearestSnap, stretch, unstretch, stretchRate } = window.contracts.geometry
    const snap = (x, loop) => nearestSnap(x, [0, 2, 6], 3, 10, 100, 52, loop)
    const raw = [-115, 0, 23, 52, 130]
    return {
      snaps: [snap(-285, true), snap(310, true), snap(96, false)],
      inverse: raw.map(pos => Math.round(unstretch(stretch(pos, 52, 100, 0.55), 52, 100, 0.55))),
      rate: stretchRate(23, 52, 100, 0.55)
    }
  })
  expect(result).toEqual({
    snaps: [{ index: 1, position: -280 }, { index: 0, position: 300 }, { index: 2, position: 52 }],
    inverse: [-115, 0, 23, 52, 130], rate: 1
  })
})

test('all header variants retain section callbacks and top, bottom and size transitions', async ({ page }) => {
  const result = await page.evaluate(() => {
    const { FixedHeader, StickyHeader, DoubleHeader } = window.contracts
    document.body.dataset.script = 'demo'
    const app = { registerCallback() {}, state: {}, featureTests: { results: {} } }
    return [FixedHeader, StickyHeader, DoubleHeader].map(Header => {
      const el = document.createElement('header')
      document.body.append(el)
      let calls = 0
      const header = new Header(app, { el, sections: { demo: { offset: 5, offsetSmall: 10, onTop: () => calls++ } } })
      header.currentScrollY = 0
      header.checkTop(true)
      header.checkTop(false)
      const top = el.hasAttribute('data-header-top')
      header.currentScrollY = 50
      header.checkTop(false)
      header.checkSize(true)
      header.checkBot(true, 51)
      const states = [top, el.hasAttribute('data-header-not-top'), el.hasAttribute('data-header-bottom'), header._small, calls]
      if (Header === FixedHeader) header.reconfigure()
      header.destroy()
      return [...states, !document.querySelector('[data-auxiliary-nav]')]
    })
  })
  expect(result).toEqual(Array(3).fill([true, true, true, true, 1, true]))
})

test('gallery keyboard entry, caption text, focus containment and completed close', async ({ page }) => {
  await page.evaluate(() => {
    document.body.innerHTML = '<div data-lightbox><img></div>'
    const trigger = document.querySelector('[data-lightbox]')
    trigger.dataset.lightbox = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"/>'
    trigger.firstChild.alt = 'Size <small> & large'
    new window.contracts.Lightbox({ size: { width: 1000 }, scrollLock() {}, scrollRelease() {} }, {
      captions: true,
      onAfterClose: () => { document.body.dataset.dialogsAtClose = document.querySelectorAll('[role="dialog"]').length }
    })
  })
  const opener = page.locator('[data-lightbox]')
  await opener.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Image gallery' })
  await expect(dialog.getByLabel('Close')).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByLabel('Image 1', { exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(dialog.getByLabel('Close')).toBeFocused()
  await expect(dialog.locator('.lightbox-caption')).toHaveText('Size <small> & large')
  await expect(dialog.locator('.lightbox-caption > *')).toHaveCount(0)
  await page.keyboard.press('Escape')
  await expect(page.locator('body')).toHaveAttribute('data-dialogs-at-close', '0')
  await expect(opener).toBeFocused()
})

test('cookie remount replaces toggle ownership and typography preserves inline identity', async ({ page }) => {
  const result = await page.evaluate(() => {
    document.body.innerHTML = '<button data-cookie-consent></button><p data-typo>One two three<span> </span><a>four</a></p>'
    const { Cookies, Typography } = window.contracts
    const calls = [0, 0]
    const old = new Cookies({}, { onConsentChanged: () => calls[0]++ })
    const current = new Cookies({}, { onConsentChanged: () => calls[1]++ })
    old.destroy()
    document.querySelector('button').click()
    const cookie = [document.querySelectorAll('[data-cookie-consent-label]').length, current.getCookie('COOKIES_CONSENT_STATUS')]
    current.destroy()
    const anchor = document.querySelector('a')
    let clicks = 0
    anchor.addEventListener('click', () => clicks++)
    const typography = new Typography(document.body)
    const formatted = document.querySelector('p').textContent
    typography.reset()
    document.querySelector('a').click()
    return { calls, cookie, formatted, reset: document.querySelector('p').textContent, clicks }
  })
  expect(result).toEqual({ calls: [0, 1], cookie: [1, '1'], formatted: 'One two three\u00a0four', reset: 'One two three four', clicks: 1 })
})

test('each visible parallax item is measured once and an edge popover chooses a fitting side', async ({ page }) => {
  const result = await page.evaluate(() => {
    const app = { size: { height: innerHeight }, opts: {}, featureTests: { results: { touch: false } } }
    document.body.innerHTML = '<button data-popover-target="example" style="position:fixed;top:0;left:100px">Open</button><template data-popover-template="example">Details</template>' +
      '<i class="item" style="display:block;height:2px"></i>'.repeat(100)
    const parallax = new window.contracts.Parallax(app, { el: '.item' })
    let reads = 0
    const measure = Element.prototype.getBoundingClientRect
    Element.prototype.getBoundingClientRect = function () {
      reads++
      return measure.call(this)
    }
    try {
      parallax.onScroll()
      const items = reads
      const popover = new window.contracts.Popover(app, document.querySelector('button'))
      reads = 0
      popover.show()
      return { items, placement: reads, side: popover.currentPosition }
    } finally {
      Element.prototype.getBoundingClientRect = measure
      parallax.destroy()
    }
  })
  expect(result).toEqual({ items: 100, placement: 1, side: 'right' })
})

test('silent and superseded scrolling release application state and subscriptions dispose independently', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const app = new window.contracts.Application()
    let calls = 0
    const cb = () => calls++
    const first = app.registerCallback('example', cb)
    app.registerCallback('example', cb)
    first()
    first()
    app.executeCallbacks('example')
    document.body.style.overflow = 'auto'
    app.scrollLock()
    app.scrollRelease()
    app.scrollTo(1, 2)
    app.scrollTo(0, 0, false)
    await new Promise(requestAnimationFrame)
    const finished = !app.state.forcedScroll
    app.scrollTo(10, 2, false)
    app.destroy()
    app.executeCallbacks('example')
    return { calls, finished, stopped: !app.state.forcedScroll, overflow: document.body.style.overflow }
  })
  expect(result).toEqual({ calls: 1, finished: true, stopped: true, overflow: 'auto' })
})

test('hero slider shows the configured slide and tolerates single and empty lists', async ({ page }) => {
  const result = await page.evaluate(() => {
    const { HeroSlider } = window.contracts
    const app = { opts: {}, registerCallback() {} }
    return [3, 1, 0].map(count => {
      const el = document.createElement('section')
      el.innerHTML = '<div data-hero-slide><img class="hero-slide-img"></div>'.repeat(count)
      document.body.append(el)
      const hero = new HeroSlider(app, { el, initialSlideNumber: 1 })
      if (count < 2) hero.next()
      const visible = [...el.children].map(child => child.style.opacity)
      hero.destroy()
      return visible
    })
  })
  expect(result).toEqual([['0', '1', '0'], ['1'], []])
})

test('box geometry, footer resize and inline styles use the rendered dimensions', async ({ page }) => {
  const result = await page.evaluate(() => {
    const { Dom, FooterReveal, StackedBoxes, clearProps, convertEasing } = window.contracts
    document.body.innerHTML = '<main></main><footer data-footer-reveal style="height:20px"></footer>' +
      '<div class="box" style="position:absolute;top:10px;height:30px;margin:0"></div>' +
      '<div class="box" style="position:absolute;top:20px;height:10px;margin:0"></div>' +
      '<section data-boxes-stacked><div data-boxes-stacked-size-target></div></section>' +
      '<section data-boxes-stacked><div data-boxes-stacked-size-target></div><div data-boxes-stacked-size-src style="height:22px"></div></section>'.repeat(2)
    new StackedBoxes({})
    new FooterReveal({})
    const [a, b] = document.querySelectorAll('.box')
    const nested = Dom.overlapsVertically(a, b)
    b.style.top = '40px'
    const touching = Dom.overlapsVertically(b, a)
    b.style.top = '60px'
    const disjoint = Dom.overlapsVertically(b, a)
    a.style.minHeight = '5px'
    clearProps(a, ['minHeight'])
    return [nested, touching, disjoint, a.style.minHeight, convertEasing('power2.inOut')]
  })
  expect(result).toEqual([10, 0, 0, '', 'easeInOut'])
  const footer = page.locator('footer')
  await expect(footer).toHaveCSS('z-index', '-100')
  await expect(page.locator('main')).toHaveCSS('margin-bottom', '20px')
  await footer.evaluate(el => { el.style.height = '36px' })
  await expect(page.locator('main')).toHaveCSS('margin-bottom', '36px')
  for (const box of await page.locator('[data-boxes-stacked]:has([data-boxes-stacked-size-src]) [data-boxes-stacked-size-target]').all()) {
    await expect(box).toHaveCSS('height', '22px')
  }
})

test('published browser builds expose the same API and run Motion without a Node global', async ({ page }) => {
  const fs = require('node:fs/promises')
  const path = require('node:path')
  const dist = path.resolve(__dirname, '../test-pages/dist')
  // Load the shipped bytes directly, bypassing Vite's development transforms.
  const [umd, es] = await Promise.all(['umd', 'es'].map(format =>
    fs.readFile(path.join(dist, `jupiter.${format}.js`), 'utf8')))
  await page.addScriptTag({ content: umd })
  const result = await page.evaluate(async code => {
    const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }))
    try {
      const esm = await import(url)
      const btn = document.body.appendChild(document.createElement('button'))
      for (const api of [window.Jupiter, esm]) {
        const value = api.motionValue(0)
        const unsubscribe = value.onChange(() => {})
        unsubscribe()
        await api.animate(btn, { opacity: [0, 1] }, { duration: 0.01 }).finished
      }
      const names = api => Object.keys(api).sort().join(',')
      const { normalizeAlphaTween, geometry, clearProps, convertEasing, ...source } = window.contracts
      return {
        matching: names(esm) === names(window.Jupiter),
        source: names(esm) === names(source),
        process: typeof window.process,
        finalOpacity: getComputedStyle(btn).opacity,
      }
    } finally {
      URL.revokeObjectURL(url)
    }
  }, es)
  expect(result).toEqual({ matching: true, source: true, process: 'undefined', finalOpacity: '1' })
})

test('flat widget defaults preserve the options object and explicit values', async ({ page }) => {
  const result = await page.evaluate(() => {
    const opts = { el: '.absent', factor: undefined, fadeContent: false, delay: 0, extra: null }
    const parallax = new window.contracts.Parallax({ opts: {}, size: {} }, opts)
    parallax.destroy()
    return { same: parallax.opts === opts, factor: opts.factor, fade: opts.fadeContent, delay: opts.delay, extra: opts.extra }
  })
  expect(result).toEqual({ same: true, factor: 1.3, fade: false, delay: 0, extra: null })
})

test('popup opens and closes when the browser has no native animate method', async ({ page }) => {
  // Change the capability before loading the package so Motion detects the same browser.
  await page.addInitScript(() => { delete Element.prototype.animate })
  await page.reload()
  await page.evaluate(() => {
    document.body.innerHTML = '<button data-popup-trigger="#info">Open</button><div data-popup id="info" style="display:none;position:fixed;left:50%;top:50%;z-index:5000"><button data-popup-close>Close</button></div>'
    new window.contracts.Popup({}, '[data-popup]')
  })
  await page.getByRole('button', { name: 'Open' }).click()
  const target = page.locator('#info')
  await expect(target).toBeVisible()
  await target.getByRole('button', { name: 'Close' }).click()
  await expect(target).toBeHidden()
})

test('native Lazyload hands off newly inserted sources once and sizes only their own picture', async ({ page }) => {
  await page.evaluate(() => {
    const container = document.createElement('main')
    document.body.append(container)
    const loader = new window.contracts.Lazyload({}, { target: container })
    window.handoffs = 0
    container.innerHTML = `
      <img data-ll-image data-src="/images/blue-400x300.svg" data-sizes="auto" style="width:200px">
      <picture data-ll-srcset><source data-srcset="/images/blue-400x300.svg 400w">
        <img data-sizes="auto" data-src="/images/blue-400x300.svg" style="width:80px">
      </picture>`
    for (const img of container.querySelectorAll('img')) {
      img.addEventListener(window.contracts.Events.IMAGE_LAZYLOADED, () => window.handoffs++)
    }
    loader.observe(container)
    loader.observe(container)
  })
  const images = page.locator('main img')
  await expect(images.first()).toHaveAttribute('loading', 'lazy')
  await expect(images.last()).toHaveAttribute('loading', 'lazy')
  await expect(images.first()).toHaveAttribute('sizes', '200px')
  await expect(page.locator('picture source')).toHaveAttribute('sizes', '80px')
  await images.first().evaluate(img => { img.style.width = '260px' })
  await expect(images.first()).toHaveAttribute('sizes', '260px')
  await expect(page.locator('picture source')).toHaveAttribute('sizes', '80px')
  expect(await page.evaluate(() => window.handoffs)).toBe(2)
})

test('grouped Lazyload sections signal their own handoff once when picture and section observers overlap', async ({ page }) => {
  await page.evaluate(() => {
    const { Lazyload, Events } = window.contracts
    const root = document.createElement('main')
    document.body.append(root)
    window.received = { images: 0, sections: [] }
    for (const name of ['one', 'two']) {
      const section = document.createElement('section')
      section.dataset.lazyloadSection = ''
      section.innerHTML = '<picture data-ll-srcset><img data-src="/images/blue-400x300.svg"></picture>'
      section.querySelector('img').addEventListener(Events.IMAGE_LAZYLOADED, () => window.received.images++)
      section.addEventListener(Events.SECTION_LAZYLOADED, () => window.received.sections.push(name))
      root.append(section)
    }
    const loader = new Lazyload({ state: { revealed: true } }, {
      target: root, useNativeLazyloadIfAvailable: false,
      loadIntersectionObserverConfig: { threshold: 0.1 }
    })
    window.loadOptions = [loader.loadObserver.rootMargin, ...loader.loadObserver.thresholds]
  })
  await expect(page.locator('picture img[data-ll-loaded]')).toHaveCount(2)
  const events = await page.evaluate(() => window.received)
  expect(events.images).toBe(2)
  expect(events.sections.sort()).toEqual(['one', 'two'])
  const [margin, threshold] = await page.evaluate(() => window.loadOptions)
  expect(margin).toBe('850px 500px 850px 500px')
  expect(threshold).toBeCloseTo(0.1)
})

test('application reveals after its fader and opens the debug panel on demand', async ({ page }) => {
  await page.goto('/application.html')
  await expect(page.locator('body')).toHaveAttribute('data-app-revealed', 'true')
  await expect(page.locator('#fader')).toHaveCSS('opacity', '0')
  const panel = page.locator('.dbg-breakpoints')
  await panel.click()
  await expect(panel.locator('.user-agent')).toBeVisible()
  await expect(panel.locator('.user-agent')).toHaveCSS('opacity', '1')
  await panel.click()
  await expect(panel.locator('.user-agent')).toBeHidden()
  const grid = page.locator('.dbg-grid')
  await page.keyboard.press('Control+g')
  await expect(grid).toHaveClass(/visible/)
  await page.keyboard.press('Control+g')
  await expect(grid).not.toHaveClass(/visible/)
})

test('application fader completes when native Web Animations are unavailable', async ({ page }) => {
  await page.addInitScript(() => { delete Element.prototype.animate })
  await page.goto('/application.html')
  await expect(page.locator('body')).toHaveAttribute('data-app-revealed', 'true')
  await expect(page.locator('#fader')).toHaveCSS('opacity', '0')
})

for (const native of [true, false]) {
  test('responsive Lazyload chooses the first image using its slot width, native=' + native, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    const requests = []
    await page.route('**/candidate-*.svg', route => {
      requests.push(new URL(route.request().url()).pathname)
      return route.fulfill({
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"></svg>',
      })
    })
    await page.evaluate(useNativeLazyloadIfAvailable => {
      const root = document.createElement('main')
      document.body.append(root)
      root.innerHTML = `<picture data-ll-srcset>
        <source data-srcset="/candidate-320.svg 320w, /candidate-1280.svg 1280w">
        <img width="320" height="200" data-sizes="auto" style="width:240px">
      </picture>`
      new window.contracts.Lazyload({ state: { revealed: true } }, { target: root, useNativeLazyloadIfAvailable })
    }, native)
    await expect.poll(() => page.locator('picture img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true)
    expect(requests).toEqual(['/candidate-320.svg'])
  })
}
