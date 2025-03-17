import _defaultsDeep from 'lodash.defaultsdeep'
import { gsap } from 'gsap/all'
import * as Events from '../../events'

/**
 * @typedef {Object} ParallaxOptions
 * @property {string|HTMLElement} [el='[data-parallax]'] - Target element selector or element
 * @property {number} [factor=1.3] - Parallax movement factor
 * @property {boolean} [fadeContent=true] - Whether to fade content while scrolling
 */

/** @type {ParallaxOptions} */
const DEFAULT_OPTIONS = {
  el: '[data-parallax]',
  factor: 1.3,
  fadeContent: true,
}

/**
 * Parallax scrolling effect for background images
 */
export default class Parallax {
  /**
   * Create a new Parallax instance
   * @param {Object} app - Application instance
   * @param {ParallaxOptions} [opts={}] - Parallax options
   */
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.elements = {}

    if (typeof this.opts.el === 'string') {
      this.elements.wrapper = document.querySelector(this.opts.el)
    } else {
      this.elements.wrapper = this.opts.el
    }

    this.elements.content = this.elements.wrapper.querySelector(
      '[data-parallax-content]'
    )
    this.elements.figure = this.elements.wrapper.querySelector(
      '[data-parallax-figure]'
    )

    this.initializeTimeline()
    window.addEventListener(Events.APPLICATION_SCROLL, this.onScroll.bind(this))
  }

  /**
   * Initialize GSAP timeline for parallax effect
   */
  initializeTimeline() {
    this.timeline = gsap.timeline({
      useFrames: true,
      paused: true,
    })

    if (this.opts.fadeContent) {
      this.timeline.to(
        this.elements.content,
        {
          duration: this.app.size.height * 0.4,
          opacity: 0,
          ease: 'power0.none',
        },
        0
      )
    }

    this.timeline.to(
      this.elements.content,
      {
        duration: this.app.size.height * 0.5,
        y: this.app.size.height * 0.1,
        ease: 'power0.none',
      },
      0
    )

    this.timeline.fromTo(
      this.elements.figure,
      {
        duration: this.app.size.height,
        yPercent: 0,
      },
      {
        duration: this.app.size.height,
        yPercent: (this.app.size.height * this.opts.factor) / 100,
        ease: 'power0.none',
      },
      0
    )
  }

  /**
   * Handle scroll event to update parallax effect
   */
  onScroll() {
    const elTop = this.elements.wrapper.getBoundingClientRect().top
    const progress = Math.max(0, Math.min(elTop / this.timeline.duration(), 1))
    this.timeline.progress(progress)
  }
}
