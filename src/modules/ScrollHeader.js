import HeaderState from './HeaderState'
import { animate, stagger } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import * as Events from '../events'
import Dom from './Dom/index'
import { set } from '../utils/motion-helpers'

/**
 * @typedef {Object} ScrollHeaderEvents
 * @property {Function} [onPin] - Called when header is pinned
 * @property {Function} [onUnpin] - Called when header is unpinned
 * @property {Function} [onAltBg] - Called when alternate background is applied
 * @property {Function} [onNotAltBg] - Called when regular background is applied
 * @property {Function} [onSmall] - Called when header becomes small
 * @property {Function} [onNotSmall] - Called when header becomes normal size
 * @property {Function} [onTop] - Called when page is at the top
 * @property {Function} [onNotTop] - Called when page is not at the top
 * @property {Function} [onBottom] - Called when page is at the bottom
 * @property {Function} [onNotBottom] - Called when page is not at the bottom
 * @property {Function} [onMobileMenuOpen] - Called when mobile menu opens
 * @property {Function} [onMobileMenuClose] - Called when mobile menu closes
 * @property {Function} [onIntersect] - Called when header intersects with an element
 * @property {Function} [onOutline] - Called when user tabs (outline mode)
 */

/**
 * @typedef {Object} ScrollHeaderSectionOptions
 * @property {boolean} [unPinOnResize=true] - Whether to unpin header on window resize
 * @property {boolean} [headerHeightTracksPin=true] - Whether --header-height drops to 0 when the header unpins. Set false for a header that never retracts.
 * @property {Window|HTMLElement} [canvas=window] - Scrolling element
 * @property {string|null} [intersects=null] - Selector for elements to check intersection with
 * @property {Function} [beforeEnter] - Called before header enters
 * @property {Function} [enter] - Called when header enters
 * @property {number} [enterDelay=0] - Delay before enter animation
 * @property {number} [tolerance=3] - Scroll tolerance before triggering hide/show
 * @property {number|string|Function} [offset=0] - Offset from top before triggering hide
 * @property {number|string|Function} [offsetSmall=50] - Offset from top before shrinking header
 * @property {number|string|Function} [offsetBg=200] - Offset from top before changing background color
 * @property {string|null} [regBgColor=null] - Regular background color
 * @property {string|null} [altBgColor=null] - Alternate background color
 */

/**
 * @typedef {Object} ScrollHeaderOptions
 * @property {string|HTMLElement} [el='header[data-nav]'] - Header element or selector
 * @property {string} [on=Events.APPLICATION_REVEALED] - Event to initialize on
 * @property {boolean} [unpinOnForcedScrollStart=true] - Whether to unpin on forced scroll start
 * @property {boolean} [pinOnForcedScrollEnd=true] - Whether to pin on forced scroll end
 * @property {boolean} [ignoreForcedScroll=false] - Whether to ignore forced scroll events
 * @property {boolean} [rafScroll=true] - Whether to use requestAnimationFrame for scrolling
 * @property {ScrollHeaderSectionOptions} [default] - Default options for all sections
 * @property {Object.<string, ScrollHeaderSectionOptions>} [sections] - Section-specific options
 */

/** @type {ScrollHeaderEvents} */
const DEFAULT_EVENTS = {
  onPin: (h) => {
    animate(h.el, {
      y: '0%'
    }, {
      duration: 0.35,
      ease: 'easeOut'
    })
  },

  onUnpin: (h) => {
    h._hiding = true
    animate(h.el, {
      y: '-100%'
    }, {
      duration: 0.25,
      ease: 'easeIn'
    }).finished.then(() => {
      h._hiding = false
    })
  },

  onAltBg: (h) => {
    if (h.opts.altBgColor) {
      animate(h.el, {
        backgroundColor: h.opts.altBgColor
      }, {
        duration: 0.2
      })
    }
  },

  onNotAltBg: (h) => {
    if (h.opts.regBgColor) {
      animate(h.el, {
        backgroundColor: h.opts.regBgColor
      }, {
        duration: 0.4
      })
    }
  },

  // eslint-disable-next-line no-unused-vars
  onSmall: (h) => {},
  // eslint-disable-next-line no-unused-vars
  onNotSmall: (h) => {},
  // eslint-disable-next-line no-unused-vars
  onTop: (h) => {},
  // eslint-disable-next-line no-unused-vars
  onNotTop: (h) => {},
  // eslint-disable-next-line no-unused-vars
  onBottom: (h) => {},
  // eslint-disable-next-line no-unused-vars
  onNotBottom: (h) => {},
  // eslint-disable-next-line no-unused-vars
  onMobileMenuOpen: (h) => {},
  // eslint-disable-next-line no-unused-vars
  onMobileMenuClose: (h) => {},
  // eslint-disable-next-line no-unused-vars
  onIntersect: (h) => {},
  onOutline: (h) => {
    h.preventUnpin = true
    h.pin()
  },
}

/** @type {ScrollHeaderOptions} */
const DEFAULT_OPTIONS = {
  el: 'header[data-nav]',
  on: Events.APPLICATION_REVEALED,
  unpinOnForcedScrollStart: true,
  pinOnForcedScrollEnd: true,
  ignoreForcedScroll: false,
  rafScroll: true,

  default: {
    unPinOnResize: true,
    headerHeightTracksPin: true,
    canvas: window,
    intersects: null,
    beforeEnter: (h) => {
      set(h.el, { y: '-100%' })
      set(h.lis, { opacity: 0 })
    },

    enter: (h) => {
      // Header slides down
      animate(h.el, {
        y: '0%'
      }, {
        duration: 1,
        delay: h.opts.enterDelay,
        ease: 'easeOut'
      })

      // Menu items fade in with stagger (starts at same time as header: '-=1' means 1s overlap)
      animate(h.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: stagger(0.1, { startDelay: h.opts.enterDelay }),
        ease: 'easeIn'
      })
    },

    enterDelay: 0,
    tolerance: 3,
    offset: 0, // how far from the top before we trigger hide
    offsetSmall: 50, // how far from the top before we trigger the shrinked padding,
    offsetBg: 200, // how far down before changing backgroundcolor
    regBgColor: null,
    altBgColor: null,
    ...DEFAULT_EVENTS,
  },
}

/**
 * Scroll behavior shared by fixed and sticky navigation headers.
 */
export default class ScrollHeader extends HeaderState {
  /**
   * Create a new ScrollHeader instance
   * @param {Object} app - Application instance
   * @param {ScrollHeaderOptions} [opts={}] - ScrollHeader options
   */
  constructor(app, opts = {}) {
    super(DEFAULT_EVENTS)
    this.app = app
    // Preserve raw section configs before _defaultsDeep mutates them
    this._rawSections = opts.sections
      ? Object.fromEntries(
          Object.entries(opts.sections).map(([k, v]) => [k, { ...v }])
        )
      : {}
    this.mainOpts = _defaultsDeep(opts, DEFAULT_OPTIONS)

    if (typeof this.mainOpts.el === 'string') {
      this.el = document.querySelector(this.mainOpts.el)
    } else {
      this.el = this.mainOpts.el
    }

    if (!this.el) {
      return
    }

    const section = document.body.getAttribute('data-script')

    this.opts = this._getOptionsForSection(section, opts)
    this.lis = this.el.querySelectorAll('li')

    this.preventPin = false
    this.preventUnpin = false
    this._firstLoad = true
    this._pinned = true
    this._top = false
    this._bottom = false
    this._small = false
    this._altBg = false
    this._isResizing = false
    this._hiding = false // if we're in the process of hiding the bar
    this.lastKnownScrollY = 0
    this.lastKnownScrollHeight = 0
    this.currentScrollHeight = 0
    this.currentScrollY = 0
    this.mobileMenuOpen = false
    this.timer = null
    this.resetResizeTimer = null
    this.scrollSettleTimeout = null

    if (this.opts.intersects) {
      this.intersectingElements = Dom.all('[data-intersect]')
    }

    this.listen(Events.APPLICATION_OUTLINE, () => {
      this.opts.onOutline(this)
    })

    this.initialize()
  }

  initialize() {
    // bind to canvas scroll
    this.lastKnownScrollY = this.getScrollY()
    this.lastKnownScrollHeight = document.body.scrollHeight
    this.currentScrollY = this.lastKnownScrollY
    this.currentScrollHeight = this.lastKnownScrollHeight
    this.pageIsScrolledOnReady = false

    this.resolveOffsets()

    if (this.mainOpts.unpinOnForcedScrollStart) {
      this.listen(
        Events.APPLICATION_FORCED_SCROLL_START,
        this.unpin.bind(this)
      )
    }

    if (this.mainOpts.pinOnForcedScrollEnd) {
      this.listen(
        Events.APPLICATION_FORCED_SCROLL_END,
        this.pin.bind(this)
      )
    }

    this.subscribe(Events.APPLICATION_REVEALED, () => {
      let SCROLL_EVENT = Events.APPLICATION_SCROLL
      if (!this.mainOpts.rafScroll) {
        SCROLL_EVENT = 'scroll'
      }

      this.listen(SCROLL_EVENT, this.redraw.bind(this), {
        capture: false,
        passive: true,
      })

      // Add debounced scroll listener for accurate top/bottom detection after scroll settles
      // RAF-throttled events can lag behind actual scroll position during fast scrolls
      this.listen('scroll', () => {
        clearTimeout(this.scrollSettleTimeout)
        this.scrollSettleTimeout = setTimeout(() => {
          // Get real-time scroll position after scroll has settled
          const actualScrollY = this.opts.canvas === window || this.opts.canvas === document.body
            ? window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            : this.opts.canvas.scrollTop

          // Update current scroll and force accurate boundary checks
          this.currentScrollY = actualScrollY
          this.checkTop(true)
          this.checkBot(true)
        }, 100)
      }, {
        capture: false,
        passive: true,
      })
    })

    this.subscribe(
      Events.APPLICATION_READY,
      this.unpinIfScrolled.bind(this)
    )

    this.preflight()

    this.listen(this.mainOpts.on, this.enter.bind(this))

    this._bindMobileMenuListeners()

    // DON'T unpin on iOS since this will unpin when bottom menu bar appears on scrolling upwards!
    if (this.opts.unPinOnResize && !this.app.featureTests.results.ios) {
      this.listen(
        Events.APPLICATION_RESIZE,
        this.setResizeTimer.bind(this)
      )
    }

    this.opts.beforeEnter(this)
  }

  resolveOffsets() {
    for (const [key, fallback] of [['offset', 0], ['offsetSmall', 50], ['offsetBg', 200]]) {
      const offset = this.opts[key]
      if (typeof offset === 'function') this.opts[key] = offset(this) - 1
      else if (typeof offset === 'string') {
        const target = document.querySelector(offset)
        this.opts[key] = target ? target.offsetTop - (key === 'offsetBg' ? 0 : 1) : fallback
      }
    }
  }

  preflight() {
    if (!this.opts.enter) {
      this.checkSize(true)
      this.checkBg(true)
      this.checkTop(true)
    }

    this.subscribe(Events.APPLICATION_REVEALED, () => {
      this.revealTimer = setTimeout(() => {
        this.el.setAttribute('data-header-transitions', '')
      }, 350)
    })
  }

  isScrolled() {
    return (
      (window.pageYOffset || document.documentElement.scrollTop) -
        (document.documentElement.clientTop || 0) >
      0
    )
  }

  unpinIfScrolled() {
    if (this.isScrolled()) {
      // page is scrolled on ready -- ensure we unpin
      this.pageIsScrolledOnReady = true
      this.unpin()
    }
  }

  enter() {
    if (this.opts.enter) {
      this.checkSize(true)
      this.checkBg(true)
      this.checkTop(true)
      this.opts.enter(this)
    }
  }

  setResizeTimer() {
    this._isResizing = true
    if (this._pinned) {
      // unpin if resizing to prevent visual clutter.
      this.unpin()
    }

    if (this.resetResizeTimer) {
      clearTimeout(this.resetResizeTimer)
    }
    this.resetResizeTimer = setTimeout(() => {
      this._isResizing = false
      clearTimeout(this.resetResizeTimer)
      this.resetResizeTimer = null
    }, 500)
  }

  update() {
    this.redraw()
  }

  checkBg(force) {
    if (this.currentScrollY > this.opts.offsetBg) {
      if (force) {
        this.altBg()
      } else if (!this._altBg && !this._hiding) {
        this.altBg()
      }
    } else if (force) {
      this.notAltBg()
    } else if (this._altBg) {
      this.notAltBg()
    }
  }

  checkPin(force, toleranceExceeded) {
    if (this.shouldUnpin(toleranceExceeded)) {
      if (this.mobileMenuOpen) {
        return
      }
      if (force) {
        this.unpin()
      } else if (this._pinned) {
        this.unpin()
      }
    } else if (this.shouldPin(toleranceExceeded)) {
      if (force) {
        this.pin()
      } else if (!this._pinned) {
        this.pin()
      }
    }
  }

  redraw() {
    this.currentScrollY = this.getScrollY()
    this.currentScrollHeight = document.body.scrollHeight
    const toleranceExceeded = this.toleranceExceeded()

    const height = this.getScrollerHeight()
    if (this.isOutOfBounds(height)) {
      // Ignore bouncy scrolling in OSX
      return
    }

    /* content-visibility: auto may CHANGE the scrollheight of the document
    as we roll down/up. Try to avoid false positives here */
    if (
      this.currentScrollHeight !== this.lastKnownScrollHeight &&
      !this._firstLoad
    ) {
      this.lastKnownScrollY = this.currentScrollY
      this.lastKnownScrollHeight = this.currentScrollHeight
      return
    }

    this.checkSize(false)
    this.checkBg(false)
    this.checkTop(false)
    this.checkBot(false, height)

    if (this.mainOpts.ignoreForcedScroll && this.app.state.forcedScroll) {
      // ignore forced scroll
    } else {
      this.checkPin(false, toleranceExceeded)
    }

    this.lastKnownScrollY = this.currentScrollY
    this.lastKnownScrollHeight = this.currentScrollHeight

    this._firstLoad = false
  }

  unpin() {
    if (this.preventUnpin) {
      return
    }
    this._pinned = false
    this.el.setAttribute('data-header-unpinned', '')
    this.el.removeAttribute('data-header-pinned')
    this._updateHeaderHeight()
    this.opts.onUnpin(this)
  }

  pin() {
    if (this.preventPin) {
      return
    }
    this._pinned = true
    this.el.setAttribute('data-header-pinned', '')
    this.el.removeAttribute('data-header-unpinned')
    this._updateHeaderHeight()
    this.opts.onPin(this)
  }

  notSmall() {
    this._small = false
    this.el.setAttribute('data-header-big', '')
    this.el.removeAttribute('data-header-small')
    this._updateHeaderHeight()
    this.opts.onNotSmall(this)
  }

  small() {
    this._small = true
    this.el.setAttribute('data-header-small', '')
    this.el.removeAttribute('data-header-big')
    this._updateHeaderHeight()
    this.opts.onSmall(this)
  }

  notAltBg() {
    this._altBg = false
    this.el.setAttribute('data-header-reg-bg', '')
    this.el.removeAttribute('data-header-alt-bg')
    this.opts.onNotAltBg(this)
  }

  altBg() {
    this._altBg = true
    this.el.setAttribute('data-header-alt-bg', '')
    this.el.removeAttribute('data-header-reg-bg')
    this.opts.onAltBg(this)
  }

  shouldUnpin(toleranceExceeded) {
    const scrollingDown = this.currentScrollY > this.lastKnownScrollY
    const pastOffset = this.currentScrollY >= this.opts.offset

    return scrollingDown && pastOffset && toleranceExceeded
  }

  shouldPin(toleranceExceeded) {
    if (this._isResizing) {
      return false
    }

    const scrollingUp = this.currentScrollY < this.lastKnownScrollY
    const pastOffset = this.currentScrollY <= this.opts.offset

    return (scrollingUp && toleranceExceeded) || pastOffset
  }

  _bindMobileMenuListeners() {
    this.listen(
      'APPLICATION:MOBILE_MENU:OPEN',
      this._onMobileMenuOpen.bind(this)
    )
    this.listen(
      'APPLICATION:MOBILE_MENU:CLOSED',
      this._onMobileMenuClose.bind(this)
    )
  }

  _onMobileMenuOpen() {
    this.opts.onMobileMenuOpen(this)
    this.mobileMenuOpen = true
  }

  _onMobileMenuClose() {
    this.opts.onMobileMenuClose(this)
    this.mobileMenuOpen = false
  }
}
