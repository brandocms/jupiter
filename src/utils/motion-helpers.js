import { animate, delay } from 'motion'

/**
 * Set properties immediately (like gsap.set)
 * Mimics GSAP's set() by using animate with duration: 0
 *
 * @param {Element|string} target - Element or selector
 * @param {Object} values - Properties to set
 * @returns {Object} Animation object
 */
export function set(target, values) {
  return animate(target, values, { duration: 0 })
}

/**
 * Animate autoAlpha (opacity + visibility)
 * Mimics GSAP's autoAlpha property
 *
 * @param {Element|string} target - Element or selector
 * @param {number} value - Target alpha value (0 or 1)
 * @param {Object} options - Animation options
 * @returns {Object} Animation object
 */
export function animateAutoAlpha(target, value, options = {}) {
  const element = typeof target === 'string'
    ? document.querySelector(target)
    : target

  if (value === 0) {
    // Fade out, then hide
    return animate(element, { opacity: 0 }, {
      ...options,
      onComplete: () => {
        element.style.visibility = 'hidden'
        options.onComplete?.()
      }
    })
  } else {
    // Show, then fade in
    element.style.visibility = 'visible'
    return animate(element, { opacity: value }, options)
  }
}

/**
 * Clear inline styles
 * Mimics GSAP's clearProps
 *
 * @param {Element|string} target - Element or selector
 * @param {string|Array} props - Properties to clear or 'all'
 */
export function clearProps(target, props = 'all') {
  const element = typeof target === 'string'
    ? document.querySelector(target)
    : target

  if (props === 'all') {
    element.removeAttribute('style')
  } else {
    const properties = Array.isArray(props) ? props : [props]
    properties.forEach(prop => {
      element.style.removeProperty(prop)
    })
  }
}

/**
 * Delayed call helper
 * Mimics gsap.delayedCall
 * Uses Motion's delay function (locked to animation frame loop for better sync)
 *
 * @param {number} duration - Delay in seconds
 * @param {Function} callback - Callback function
 * @returns {Promise} Promise that resolves after delay
 */
export function delayedCall(duration, callback) {
  return new Promise(resolve => {
    delay(() => {
      callback()
      resolve()
    }, duration)
  })
}

/**
 * Paused Timeline helper
 * Mimics GSAP's paused timeline pattern for building sequences
 * Used by modules like Lightbox that build animations before playing them
 */
export class PausedTimeline {
  constructor() {
    this.sequence = []
  }

  /**
   * Add animation to timeline
   * @param {Element|string} target - Element or selector
   * @param {Object} values - Properties to animate
   * @param {Object} options - Animation options
   * @returns {PausedTimeline} this for chaining
   */
  to(target, values, options = {}) {
    this.sequence.push(['animate', target, values, options])
    return this
  }

  /**
   * Add callback to timeline
   * @param {Function} callback - Function to call
   * @returns {PausedTimeline} this for chaining
   */
  call(callback) {
    this.sequence.push(['call', callback])
    return this
  }

  /**
   * Clear timeline sequence
   * @returns {PausedTimeline} this for chaining
   */
  clear() {
    this.sequence = []
    return this
  }

  /**
   * Play timeline sequence
   * Executes all animations and callbacks in order
   * @returns {Promise} Promise that resolves when sequence completes
   */
  async play() {
    const sequence = [...this.sequence] // Copy so we can clear while playing
    this.sequence = [] // Clear for next time

    for (const item of sequence) {
      if (item[0] === 'animate') {
        const [, target, values, options] = item
        // Handle autoAlpha
        if (values.autoAlpha !== undefined) {
          const autoAlphaOptions = { ...options }
          delete autoAlphaOptions.autoAlpha
          await animateAutoAlpha(target, values.autoAlpha, autoAlphaOptions).finished
        } else {
          await animate(target, values, options).finished
        }
      } else if (item[0] === 'call') {
        item[1]() // Execute callback
      }
    }
  }
}
