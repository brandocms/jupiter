const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => page.goto('/module-contracts.html'))

test('named sections, children, run selection and teardown', async ({ page }) => {
  const warnings = []
  page.on('console', msg => { if (msg.type() === 'warning') warnings.push(msg.text()) })
  const result = await page.evaluate(() => {
    document.body.innerHTML = `
      <section data-moonwalk-section><div data-moonwalk-children><i></i></div></section>
      <section data-moonwalk-section="named"><div data-moonwalk-children="slide"><i></i></div></section>
      <div data-moonwalk-run="one"></div><div data-moonwalk-run="two"></div><div data-moonwalk-run="unknown"></div>`
    const mw = new window.contracts.Moonwalk({ opts: {} }, { runs: { one: {}, two: {} } })
    const sections = mw.sections.map(section => section.name)
    const children = [...document.querySelectorAll('i')].map(el => el.dataset.moonwalk)
    const runs = mw.runs.map(run => run.el.dataset.moonwalkRun)
    mw.destroy()
    return { sections, children, runs, disposed: [mw.sections.length, mw.runs.length, mw._observers.length] }
  })
  expect(result).toEqual({ sections: [null, 'named'], children: ['', 'slide'], runs: ['one', 'two'], disposed: [0, 0, 0] })
  expect(warnings.some(text => text.includes('Unknown run "unknown"'))).toBe(true)
})

test('child order preserves unordered siblings', async ({ page }) => {
  expect(await page.evaluate(() => {
    const mw = new window.contracts.Moonwalk({ opts: {} })
    return [[null, null, null], [3, 1, 2], [null, 2, 1, null]].map(orders => {
      const children = orders.map((order, i) => {
        const el = document.createElement('i')
        el.textContent = String(i)
        if (order !== null) el.dataset.moonwalkOrder = order
        return el
      })
      return mw.orderChildren(children).map(el => el.textContent)
    })
  })).toEqual([['0','1','2'], ['1','2','0'], ['2','1','0','3']])
})

test('alpha configuration and sequence timing', async ({ page }) => {
  const result = await page.evaluate(() => {
    const { Moonwalk, normalizeAlphaTween } = window.contracts
    const mw = new Moonwalk({ opts: {} })
    const section = { animation: { lastStartTime: null, lastDuration: 0.65, lastDelay: 0 } }
    const first = mw.calculateDelay(section, 0.65, -0.5)
    section.animation.lastStartTime = performance.now()
    return { first, second: mw.calculateDelay(section, 0.65, -0.5),
      alpha: [true, false, { ease: 'circOut' }, { duration: 0.3, delay: 0.1 }].map(v => normalizeAlphaTween(v, 0.65)) }
  })
  expect(result.alpha).toEqual([{ duration: 0.65, ease: 'easeIn' }, false, { ease: 'circOut', duration: 0.65 }, { duration: 0.3, delay: 0.1 }])
  expect(result.first).toBe(0)
  expect(result.second).toBeCloseTo(0.15, 2)
})
