import _defaultsDeep from 'lodash.defaultsdeep'
import Dom from '../Dom'

/**
 * @typedef {Object} ScrollSpyOptions
 * @property {Function} [onIntersect] - Called when a target intersects with the viewport
 */

/** @type {ScrollSpyOptions} */
const DEFAULT_OPTIONS = {
  onIntersect: (target, trigger) => {}
}

/**
 * ScrollSpy component for highlighting active sections during scrolling
 */
export default class ScrollSpy {
  /**
   * Create a new ScrollSpy instance
   * @param {Object} app - Application instance
   * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
   */
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.initialize()
  }

  /**
   * Initialize ScrollSpy
   */
  initialize() {
    this.triggers = Dom.all('[data-scrollspy-trigger]')
    const config = {
      rootMargin: '-55px 0px -85%'
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.intersectionHandler(entry)
        }
      })
    }, config)

    this.triggers.forEach(section => observer.observe(section))
  }

  /**
   * Handle intersection with viewport
   * @param {IntersectionObserverEntry} entry - Intersection observer entry
   */
  intersectionHandler(entry) {
    const id = entry.target.dataset.scrollspyTrigger
    const currentlyActive = document.querySelector('[data-scrollspy-active]')
    const shouldBeActive = document.querySelector(`[data-scrollspy-target="${id}"]`)

    if (currentlyActive) {
      currentlyActive.removeAttribute('data-scrollspy-active')
    }
    if (shouldBeActive) {
      shouldBeActive.dataset.scrollspyActive = ''
      this.opts.onIntersect(entry.target, shouldBeActive)
    }
  }
}
