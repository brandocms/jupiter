import HeaderState from '../HeaderState'
/**
 * A dual-header module that clones the original header element. The clone stays fixed and
 * hides when scrolling down, revealing on scroll up. Uses IntersectionObserver to detect
 * when the original header is visible.
 *
 * @example
 * new DoubleHeader(app, {
 *   el: 'header[data-nav]',
 *   default: { offset: 60, offsetSmall: 1, offsetBg: 200 },
 *   sections: { index: { offsetBg: '#content' } }
 * })
 */

import { animate, stagger } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import * as Events from '../../events'
import { set } from '../../utils/motion-helpers'

const DEFAULT_EVENTS = {
  onMainVisible: (h) => {
    animate(h.el, {
      opacity: 1
    }, {
      duration: 3,
      delay: 0.5
    })
  },

  onMainInvisible: (h) => {
    animate(h.el, {
      opacity: 0
    }, {
      duration: 1
    })
  },

  onPin: (h) => {
    animate(h.auxEl, {
      y: '0%'
    }, {
      duration: 0.35,
      ease: 'easeOut'
    })
  },

  onUnpin: (h) => {
    h._hiding = true
    animate(h.auxEl, {
      y: '-100%'
    }, {
      duration: 0.25,
      ease: 'easeIn'
    }).finished.then(() => {
      h._hiding = false
    })
  },
  onSmall: () => {},
  onNotSmall: () => {},
  onTop: () => {},
  onNotTop: () => {},
  onBottom: () => {},
  onNotBottom: () => {},
}

const DEFAULT_OPTIONS = {
  el: 'header[data-nav]',
  on: Events.APPLICATION_REVEALED,
  pinOnOutline: false,
  pinOnForcedScroll: true,
  unPinOnResize: false,

  default: {
    onClone: (h) => h.el.cloneNode(true),
    headerHeightTracksPin: true,
    canvas: window,
    beforeEnter: (h) => {
      set(h.el, { opacity: 0 })
    },
    enter: (h) => {
      // Set initial states
      set(h.auxEl, { y: '-100%' })
      set(h.lis, { opacity: 0 })

      // Auxiliary header slides down
      animate(h.auxEl, {
        y: '0%'
      }, {
        duration: 1,
        delay: h.opts.enterDelay,
        ease: 'easeOut'
      })

      // Menu items fade in with stagger (starts at same time: '-=1' means 1s overlap)
      animate(h.lis, {
        opacity: 1
      }, {
        duration: 0.8,
        delay: stagger(0.1, { startDelay: h.opts.enterDelay }),
        ease: 'easeIn'
      })
    },
    enterDelay: 1.2,
    tolerance: 3,
    offset: 0, // how far from the top before we trigger hide
    offsetSmall: 50, // how far from the top before we trigger the shrinked padding,
    offsetBg: 200, // how far down before changing backgroundcolor
    ...DEFAULT_EVENTS,
  },
}

export default class DoubleHeader extends HeaderState {
  constructor(app, opts = {}) {
    super(DEFAULT_EVENTS)
    this.app = app
    this.mainOpts = _defaultsDeep(opts, DEFAULT_OPTIONS)

    if (this.mainOpts.pinOnOutline) {
      this.listen(Events.APPLICATION_OUTLINE, () => {
        this.preventUnpin = true
        this.pin()
      })
    }

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

    this.auxEl = this.opts.onClone(this)
    this.auxEl.setAttribute('data-header-pinned', '')
    this.auxEl.setAttribute('data-auxiliary-nav', '')
    this.auxEl.removeAttribute('data-nav')

    document.body.appendChild(this.auxEl)

    this.small()
    this.unpin()

    this.lis = this.el.querySelectorAll('li')
    this.preventPin = false
    this.preventUnpin = false
    this._isResizing = false
    this._firstLoad = true
    this._pinned = true
    this._top = false
    this._bottom = false
    this._small = false
    this._hiding = false // if we're in the process of hiding the bar
    this.lastKnownScrollY = 0
    this.currentScrollY = 0
    this.mobileMenuOpen = false
    this.timer = null
    this.resetResizeTimer = null
    this.scrollSettleTimeout = null
    this.firstReveal = true

    this.initialize()
  }

  destroy() {
    super.destroy()
    this.observer?.disconnect()
    this.auxEl?.remove()
  }

  initialize() {
    // bind to canvas scroll
    this.lastKnownScrollY = this.getScrollY()
    this.currentScrollY = this.lastKnownScrollY

    if (typeof this.opts.offsetBg === 'string') {
      // get offset of element, with height of header subtracted
      const elm = document.querySelector(this.opts.offsetBg)
      this.opts.offsetBg = elm.offsetTop - this.el.offsetHeight
    }

    this.setupObserver()

    this.listen(this.mainOpts.on, this.bindObserver.bind(this))
    this._bindMobileMenuListeners()

    if (this.opts.unPinOnResize) {
      this.listen(
        Events.APPLICATION_RESIZE,
        this.setResizeTimer.bind(this)
      )
    }

    this.opts.beforeEnter(this)
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      const [{ isIntersecting }] = entries

      if (isIntersecting) {
        if (this._navVisible !== true) {
          this.opts.onMainVisible(this)
          if (this.firstReveal) {
            this.firstReveal = false
          }
        }
        this._navVisible = true
      } else {
        if (this._navVisible === true) {
          this.opts.onMainInvisible(this)
        }
        this._navVisible = false
      }
    })

    this.listen(
      Events.APPLICATION_SCROLL,
      this.update.bind(this)
    )

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

    if (this.mainOpts.pinOnForcedScroll) {
      this.listen(Events.APPLICATION_FORCED_SCROLL_START, () => {
        this.preventUnpin = false
        this.unpin()
        this.preventPin = true
      })
      this.listen(
        Events.APPLICATION_FORCED_SCROLL_END,
        () => {
          this.preventPin = false
          this.pin()
          this.preventUnpin = false
        }
      )
    }
  }

  bindObserver() {
    this.observer.observe(this.el)
  }

  setResizeTimer() {
    this._isResizing = true
    if (this._pinned) {
      // unpin if resizing to prevent visual clutter
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

  _hideAlt() {
    this.unpin()
  }

  _showAlt() {
    this.pin()
  }

  update() {
    this.redraw(false)
  }

  checkPin(force, toleranceExceeded) {
    if (this._navVisible) {
      if (this._pinned) {
        this.unpin()
        return
      }
    }

    if (this.shouldUnpin(toleranceExceeded)) {
      if (this.mobileMenuOpen) {
        return
      }
      if (this._pinned) {
        this.unpin()
      }
    } else if (this.shouldPin(toleranceExceeded)) {
      if (!this._pinned) {
        this.pin()
      }
    }
  }

  redraw(force = false) {
    this.currentScrollY = this.getScrollY()
    const toleranceExceeded = this.toleranceExceeded()

    if (this.isOutOfBounds()) {
      // Ignore bouncy scrolling in OSX
      return
    }

    this.checkPin(force, toleranceExceeded)
    this.lastKnownScrollY = this.currentScrollY
    this._firstLoad = false
  }

  unpin() {
    if (!this.preventUnpin) {
      this._pinned = false
      this._updateHeaderHeight()
      this.opts.onUnpin(this)
    }
  }

  pin() {
    if (!this.preventPin) {
      this._pinned = true
      this._updateHeaderHeight()
      this.opts.onSmall(this)
      this.opts.onPin(this)
    }
  }

  notSmall() {
    this._small = false
    this.auxEl.setAttribute('data-header-big', '')
    this.auxEl.removeAttribute('data-header-small')
    this._updateHeaderHeight()
    this.opts.onNotSmall(this)
  }

  small() {
    this._small = true
    this.auxEl.setAttribute('data-header-small', '')
    this.auxEl.removeAttribute('data-header-big')
    this._updateHeaderHeight()
    this.opts.onSmall(this)
  }

  shouldUnpin(toleranceExceeded) {
    if (this._navVisible) {
      return true
    }
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
      Events.APPLICATION_MOBILE_MENU_OPEN,
      this._onMobileMenuOpen.bind(this)
    )
    this.listen(
      Events.APPLICATION_MOBILE_MENU_CLOSED,
      this._onMobileMenuClose.bind(this)
    )
  }

  _onMobileMenuOpen() {
    this.mobileMenuOpen = true
  }

  _onMobileMenuClose() {
    this.mobileMenuOpen = false
  }
}
