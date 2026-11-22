import { Moonwalk } from '../../src'
import { normalizeAlphaTween } from '../../src/modules/Moonwalk'

test('creates sections', () => {
  // Set up our document body
  document.body.innerHTML = `
  <html>
    <head></head>
    <body>
      <div data-moonwalk-section>
        <div data-moonwalk>
          1
        </div>
        <div data-moonwalk>
          2
        </div>
        <div data-moonwalk>
          3
        </div>
      </div>
      <div data-moonwalk-section>
        <div data-moonwalk>
          1
        </div>
        <div data-moonwalk>
          2
        </div>
        <div data-moonwalk>
          3
        </div>
      </div>
    </body>
  </html>
  `
  const moonwalk = new Moonwalk()

  expect(moonwalk.sections.length).toEqual(2)
})

test('creates named section', () => {
  // Set up our document body
  document.body.innerHTML = `
  <html>
    <head></head>
    <body>
      <div data-moonwalk-section>
        <div data-moonwalk>
          1
        </div>
        <div data-moonwalk>
          2
        </div>
        <div data-moonwalk>
          3
        </div>
      </div>
      <div data-moonwalk-section="sectionName">
        <div data-moonwalk>
          1
        </div>
        <div data-moonwalk>
          2
        </div>
        <div data-moonwalk>
          3
        </div>
      </div>
    </body>
  </html>
  `
  const moonwalk = new Moonwalk()

  expect(moonwalk.sections.length).toEqual(2)
  expect(moonwalk.sections[1].name).toEqual('sectionName')
})

test('creates runs', () => {
  // Set up our document body
  document.body.innerHTML = `
  <html>
    <head></head>
    <body>
      <div data-moonwalk-section>
        <div data-moonwalk-run="test">
          <div>
          </div>
        </div>
        <div data-moonwalk-run="test2">
          <div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `
  const moonwalk = new Moonwalk({}, {
    runs: {
      test: {
        threshold: 0,
        callback: () => {}
      },
      test2: {
        threshold: 0,
        callback: () => {}
      }
    }
  })

  expect(moonwalk.runs.length).toEqual(2)
})

test('creates children', () => {
  // Set up our document body
  document.body.innerHTML = `
  <html>
    <head></head>
    <body>
      <div data-moonwalk-section>
        <div data-moonwalk-children>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
      </div>
    </body>
  </html>
  `

  const CORRECT_DOC = `
    <div data-moonwalk-section="">
      <div data-moonwalk-children="">
        <div data-moonwalk="">1</div>
        <div data-moonwalk="">2</div>
        <div data-moonwalk="">3</div>
        <div data-moonwalk="">4</div>
        <div data-moonwalk="">5</div>
      </div>
    </div>
  `

  // eslint-disable-next-line no-new
  new Moonwalk()

  expect(document.body.innerHTML.replace(/\s/g, '')).toEqual(CORRECT_DOC.replace(/\s/g, ''))
})

test('creates named children', () => {
  // Set up our document body
  document.body.innerHTML = `
  <html>
    <head></head>
    <body>
      <div data-moonwalk-section>
        <div data-moonwalk-children="slide">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
      </div>
    </body>
  </html>
  `

  const CORRECT_DOC = `
    <div data-moonwalk-section="">
      <div data-moonwalk-children="slide">
        <div data-moonwalk="slide">1</div>
        <div data-moonwalk="slide">2</div>
        <div data-moonwalk="slide">3</div>
        <div data-moonwalk="slide">4</div>
        <div data-moonwalk="slide">5</div>
      </div>
    </div>
  `

  // eslint-disable-next-line no-new
  new Moonwalk()

  expect(document.body.innerHTML.replace(/\s/g, '')).toEqual(CORRECT_DOC.replace(/\s/g, ''))
})

describe('orderChildren', () => {
  let moonwalk

  beforeEach(() => {
    document.body.innerHTML = `
      <div data-moonwalk-section>
        <div data-moonwalk>1</div>
      </div>
    `
    moonwalk = new Moonwalk()
  })

  test('elements without order maintain position', () => {
    document.body.innerHTML = `
      <div id="container">
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </div>
    `
    const children = document.getElementById('container').children
    const result = moonwalk.orderChildren(children)

    expect(result.map(el => el.textContent)).toEqual(['A', 'B', 'C'])
  })

  test('ordered elements sort correctly', () => {
    document.body.innerHTML = `
      <div id="container">
        <div data-moonwalk-order="3">C</div>
        <div data-moonwalk-order="1">A</div>
        <div data-moonwalk-order="2">B</div>
      </div>
    `
    const children = document.getElementById('container').children
    const result = moonwalk.orderChildren(children)

    expect(result.map(el => el.textContent)).toEqual(['A', 'B', 'C'])
  })

  test('mixed ordered/unordered elements', () => {
    document.body.innerHTML = `
      <div id="container">
        <div>unordered1</div>
        <div data-moonwalk-order="2">ordered2</div>
        <div data-moonwalk-order="1">ordered1</div>
        <div>unordered2</div>
      </div>
    `
    const children = document.getElementById('container').children
    const result = moonwalk.orderChildren(children)

    // Ordered elements come first (sorted), then unordered maintain relative position
    expect(result.map(el => el.textContent)).toEqual([
      'ordered1', 'ordered2', 'unordered1', 'unordered2'
    ])
  })
})

describe('normalizeAlphaTween', () => {
  test('returns config object with defaults filled in', () => {
    const result = normalizeAlphaTween({ ease: 'circOut' }, 0.65)
    expect(result).toEqual({ ease: 'circOut', duration: 0.65 })
  })

  test('object form preserves custom duration', () => {
    const result = normalizeAlphaTween({ duration: 0.3, ease: 'easeIn', delay: 0.1 }, 0.65)
    expect(result).toEqual({ duration: 0.3, ease: 'easeIn', delay: 0.1 })
  })

  test('true returns default config', () => {
    const result = normalizeAlphaTween(true, 0.65)
    expect(result).toEqual({ duration: 0.65, ease: 'easeIn' })
  })

  test('false returns false', () => {
    const result = normalizeAlphaTween(false, 0.65)
    expect(result).toBe(false)
  })
})

describe('calculateDelay', () => {
  let moonwalk

  beforeEach(() => {
    document.body.innerHTML = `
      <div data-moonwalk-section>
        <div data-moonwalk>1</div>
      </div>
    `
    moonwalk = new Moonwalk()
  })

  test('first animation returns 0', () => {
    const section = {
      animation: { lastDelay: 0, lastDuration: 0, lastStartTime: null }
    }
    expect(moonwalk.calculateDelay(section, 0.65, -0.5)).toBe(0)
  })

  test('subsequent animation returns correct delay', () => {
    const section = {
      animation: {
        lastDelay: 0,
        lastDuration: 0.65,
        lastStartTime: performance.now()
      }
    }
    // With overlap of -0.5 (duration 0.65 - interval 0.15 = 0.5, negated),
    // idealNextStart = 0 + 0.65 + (-0.5) = 0.15
    // Since elapsed is ~0, actualDelay ≈ 0.15
    const delay = moonwalk.calculateDelay(section, 0.65, -0.5)
    expect(delay).toBeGreaterThanOrEqual(0)
    expect(delay).toBeLessThanOrEqual(0.15)
  })
})

describe('initializeRuns', () => {
  test('unknown run name filters out with warning', () => {
    document.body.innerHTML = `
      <div data-moonwalk-section>
        <div data-moonwalk-run="known">
          <div></div>
        </div>
        <div data-moonwalk-run="unknown">
          <div></div>
        </div>
      </div>
    `
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const moonwalk = new Moonwalk({}, {
      runs: {
        known: {
          threshold: 0,
          callback: () => {}
        }
      }
    })

    expect(moonwalk.runs.length).toEqual(1)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unknown run "unknown"')
    )
    warnSpy.mockRestore()
  })
})

describe('destroy', () => {
  test('cleans up observers and references', () => {
    document.body.innerHTML = `
      <div data-moonwalk-section>
        <div data-moonwalk>1</div>
      </div>
    `
    const moonwalk = new Moonwalk()

    expect(moonwalk.sections.length).toBe(1)
    expect(moonwalk._observers).toBeDefined()

    moonwalk.destroy()

    expect(moonwalk.sections).toEqual([])
    expect(moonwalk.runs).toEqual([])
    expect(moonwalk._observers).toEqual([])
  })
})
