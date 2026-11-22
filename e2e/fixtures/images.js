/** Serve Picsum fixtures at their requested intrinsic dimensions, including /id/<id>/ URLs. */
async function serveFixtureImages(page) {
  await page.route('https://picsum.photos/**', route => {
    const url = new URL(route.request().url())
    const match = url.pathname.match(/^\/(?:id\/\d+\/)?(\d+)\/(\d+)$/)
    if (!match) throw new Error(`Unexpected image fixture path ${url.pathname}`)

    const [, width, height] = match
    return route.fulfill({
      contentType: 'image/svg+xml',
      body: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="skyblue"/></svg>`,
    })
  })
}

module.exports = { serveFixtureImages }
