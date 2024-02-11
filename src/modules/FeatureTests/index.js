import * as Events from '../../events'

export default class FeatureTests {
  constructor(app, tests) {
    this.app = app

    this.testFns = {
      touch: this.testTouch
    }

    this.results = {}

    if (this.testIE11()) {
      this.testFor('ie11', true)
    } else {
      this.results.ie11 = false
    }

    if (this.testIOS()) {
      this.testFor('ios', true)
    } else {
      this.results.ios = false
    }

    if (this.testWebview()) {
      this.testFor('webview', true)
    } else {
      this.results.webview = false
    }

    const browser = this.testBrowsers()
    this.results.browser = browser
    this.app.browser = browser
    document.documentElement.setAttribute('data-browser', browser)

    const testKeys = Object.keys(tests)
    const wantedTests = testKeys.filter(t => tests[t])

    this.runTests(wantedTests)
    this.bindEventTests()
  }

  runTests(tests) {
    tests.forEach(test => {
      this.testFor(test, this.testFns[test]())
    })
  }

  testFor(feature, result) {
    this.results[feature] = result
    document.documentElement.setAttribute(`data-${feature}`, result)
  }

  /**
   * Check if we should outline elements. If the user hits TAB, we should outline,
   * otherwise we skip it.
   */
  testOutlineEvents() {
    document.addEventListener('mousedown', () => {
      this.testFor('outline', false)
    })

    document.addEventListener('keydown', e => {
      if (e.keyCode === 9 || e.which === 9) {
        this.testFor('outline', true)
        const outlineEvent = new window.CustomEvent(Events.APPLICATION_OUTLINE)
        window.dispatchEvent(outlineEvent)
      }
    })
  }

  /**
   * Sometimes the initial test for touch/mouse fail, so
   * listen for events as well
   */
  testTouchMouseEvents() {
    if (window.PointerEvent && 'maxTouchPoints' in navigator) {
      // if Pointer Events are supported, just check maxTouchPoints
      if (navigator.maxTouchPoints > 0) {
        this.results.touch = true
        this.results.mouse = false
        this.testFor('touch', true)
        this.testFor('mouse', false)
      }
    } else {
      // no Pointer Events...
      if (window.matchMedia && window.matchMedia('(any-pointer:coarse)').matches) {
        // check for any-pointer:coarse which mostly means touchscreen
        this.results.touch = true
        this.results.mouse = false
        this.testFor('touch', true)
        this.testFor('mouse', false)
      } else if (window.TouchEvent || 'ontouchstart' in window) {
        // last resort - check for exposed touch events API / event handler
        this.results.touch = true
        this.results.mouse = false
        this.testFor('touch', true)
        this.testFor('mouse', false)
      }
    }

    const onTouchStart = () => {
      if (!this.results.touch) {
        this.results.touch = true
        this.results.mouse = false
        this.testFor('touch', true)
        this.testFor('mouse', false)
        this.deviceLastTouched = Date.now()
      }
    }

    const onTouchEnd = () => {
      this.deviceLastTouched = Date.now()
    }

    document.addEventListener('touchstart', onTouchStart, false)
    document.addEventListener('touchend', onTouchEnd, false)

    const onMouseMove = () => {
      if (!this.results.mouse) {
        if (Date.now() - this.devicelastTouched > 300) {
          this.results.touch = false
          this.results.mouse = true
          this.testFor('touch', false)
          this.testFor('mouse', true)
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove, false)
  }

  bindEventTests() {
    this.testOutlineEvents()
    this.testTouchMouseEvents()
  }

  testTouch() {
    return (
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    )
  }

  testIE11() {
    return (
      '-ms-scroll-limit' in document.documentElement.style &&
      '-ms-ime-align' in document.documentElement.style
    )
  }

  testIOS() {
    return navigator.userAgent.match(/iphone|ipod|ipad/i)
  }

  testBrowsers() {
    let browser = 'unknown'
    let isChrome = false
    let isSafari = false
    if (navigator.userAgent.indexOf('Chrome') > -1) {
      browser = 'chrome'
      isChrome = true
    }
    if (navigator.userAgent.indexOf('MSIE') > -1) {
      browser = 'ie'
    }
    if (navigator.userAgent.indexOf('Firefox') > -1) {
      browser = 'firefox'
    }
    if (navigator.userAgent.indexOf('Safari') > -1) {
      browser = 'safari'
      isSafari = true
    }
    if (isChrome && isSafari) {
      browser = 'chrome'
    }

    return browser
  }

  testWebview() {
    return navigator.userAgent.match(/FBAN|FBAV|instagram|facebook|messenger/i)
  }
}
