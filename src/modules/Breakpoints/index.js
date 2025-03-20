import _defaultsDeep from 'lodash.defaultsdeep'
import * as Events from '../../events'

/**
 * @typedef {Object} BreakpointsOptions
 * @property {boolean} [runListenerOnInit=false] - Whether to run listener on initialization
 * @property {string[]} [breakpoints=['xs', 'sm', 'md', 'lg']] - Breakpoint names
 * @property {Object.<string, Function>} [listeners={}] - Listener functions for breakpoints
 */

/** @type {BreakpointsOptions} */
const DEFAULT_OPTIONS = {
  runListenerOnInit: false,
  breakpoints: ['xs', 'sm', 'md', 'lg'],

  listeners: {
    // xs: (mq) => {
    //   if (mq.matches) {
    //     // XS NOW
    //   } else {
    //     // NOT XS ANYMORE
    //   }
    // }
  },
}

/**
 * Breakpoints module for responsive design
 */
export default class Breakpoints {
  /**
   * Create a new Breakpoints instance
   * @param {Object} app - Application instance
   * @param {BreakpointsOptions} [opts={}] - Breakpoints options
   */
  constructor(app, opts = {}) {
    this.app = app
    this.mediaQueries = {}
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.currentBreakpoint = null
    this.initialized = false
    window.addEventListener(Events.APPLICATION_PRELUDIUM, () => {
      this.initialize(false)
    })
    window.addEventListener(Events.APPLICATION_REVEALED, () => {
      this.initialize(true)
    })
  }

  initialize(reveal = false) {
    if (!reveal) {
      this.opts.breakpoints.forEach((size) => {
        this.mediaQueries[size] = this._getVal(`--breakpoint-${size}`)
      })

      const keys = Object.keys(this.mediaQueries)
      keys.forEach((key) => {
        let query = ''
        const next = keys[(keys.indexOf(key) + 1) % keys.length]
        if (
          key === this.opts.breakpoints[0] &&
          this.mediaQueries[key] === '0'
        ) {
          query = `(min-width: 0px) and (max-width: ${parseInt(this.mediaQueries[next]) - 1}px)`
        } else if (next === this.opts.breakpoints[0]) {
          // max size
          query = `(min-width: ${this.mediaQueries[key]})`
        } else {
          query = `(min-width: ${this.mediaQueries[key]}) and (max-width: ${
            parseInt(this.mediaQueries[next]) - 1
          }px)`
        }

        this.mediaQueries[key] = window.matchMedia(query)

        // Replace the direct listener with a combined one that handles both core and custom behavior
        const combinedListener = (e) => {
          if (e.matches) {
            // Get the current breakpoint
            const oldBreakpoint = this.currentBreakpoint
            this.setCurrentBreakpoint()

            // Only dispatch event if breakpoint actually changed
            if (oldBreakpoint !== this.currentBreakpoint) {
              const evt = new CustomEvent(Events.BREAKPOINT_CHANGE, {
                detail: {
                  leaveBreakpoint: oldBreakpoint,
                  enterBreakpoint: this.currentBreakpoint,
                },
              })
              window.dispatchEvent(evt)
            }
          }

          // Run any custom listener if one exists for this breakpoint
          if (Object.prototype.hasOwnProperty.call(this.opts.listeners, key)) {
            this.opts.listeners[key](e)
          }
        }

        this.mediaQueries[key].addListener(combinedListener)
      })
    }

    // Set the current breakpoint first
    this.setCurrentBreakpoint()

    // Only fire events and run listeners for initialization if needed
    if (reveal && this.opts.runListenerOnInit && !this.initialized) {
      this.initialized = true
      const result = this.getCurrentBreakpoint()

      if (result && result.key && result.mq) {
        // Create a fake event object that mimics MediaQueryListEvent
        const fakeEvent = {
          matches: result.mq.matches,
          media: result.mq.media,
          target: result.mq,
        }

        // Fire the BREAKPOINT_CHANGE event only once during initialization
        const evt = new CustomEvent(Events.BREAKPOINT_CHANGE)
        window.dispatchEvent(evt)

        // Run any custom listener if one exists for this breakpoint
        if (
          Object.prototype.hasOwnProperty.call(this.opts.listeners, result.key)
        ) {
          this.opts.listeners[result.key](fakeEvent)
        }
      }
    }
  }

  getCurrentBreakpoint() {
    // First check if mediaQueries is populated
    if (!Object.keys(this.mediaQueries).length) {
      return null
    }

    const key = Object.keys(this.mediaQueries).find((q) => {
      return this.mediaQueries[q] && this.mediaQueries[q].matches
    })

    // Only return if we found a matching breakpoint
    if (key && this.mediaQueries[key]) {
      return { key, mq: this.mediaQueries[key] }
    }

    return null
  }

  defaultListener(e) {
    if (e.matches) {
      this.setCurrentBreakpoint()
    }
  }

  setCurrentBreakpoint() {
    const result = this.getCurrentBreakpoint()
    if (result && result.key) {
      this.currentBreakpoint = result.key
      this.app.breakpoint = result.key
    }
  }

  _getVal(key) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(key)
      .trim()
  }
}
