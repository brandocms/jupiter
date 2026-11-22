import { animate, delay } from 'motion'

/**
 * Set properties immediately (like gsap.set)
 * Uses direct DOM manipulation for synchronous style application
 *
 * @param {Element|string|NodeList|Array} target - Element(s) or selector
 * @param {Object} values - Properties to set
 */
export function set(target, values) {
  // Get elements as array
  let elements
  if (typeof target === 'string') {
    elements = Array.from(document.querySelectorAll(target))
  } else if (target instanceof NodeList) {
    elements = Array.from(target)
  } else if (Array.isArray(target)) {
    elements = target
  } else {
    elements = [target]
  }

  elements.forEach((element) => {
    if (!element) return

    // Build transform string from transform properties
    const transformProps = []
    const styleProps = {}

    Object.entries(values).forEach(([key, value]) => {
      // Handle transform properties
      if (key === 'x') {
        transformProps.push(`translateX(${typeof value === 'number' ? value + 'px' : value})`)
      } else if (key === 'y') {
        transformProps.push(`translateY(${typeof value === 'number' ? value + 'px' : value})`)
      } else if (key === 'yPercent') {
        transformProps.push(`translateY(${value}%)`)
      } else if (key === 'scale') {
        transformProps.push(`scale(${value})`)
      } else if (key === 'scaleX') {
        transformProps.push(`scaleX(${value})`)
      } else if (key === 'scaleY') {
        transformProps.push(`scaleY(${value})`)
      } else if (key === 'rotate') {
        transformProps.push(`rotate(${typeof value === 'number' ? value + 'deg' : value})`)
      } else if (key === 'rotateX') {
        transformProps.push(`rotateX(${typeof value === 'number' ? value + 'deg' : value})`)
      } else if (key === 'rotateY') {
        transformProps.push(`rotateY(${typeof value === 'number' ? value + 'deg' : value})`)
      } else if (key === 'rotateZ') {
        transformProps.push(`rotateZ(${typeof value === 'number' ? value + 'deg' : value})`)
      } else {
        // Regular CSS property
        styleProps[key] = value
      }
    })

    // Apply transform
    if (transformProps.length > 0) {
      element.style.transform = transformProps.join(' ')
    }

    // Properties that are unitless (don't need 'px')
    const unitless = new Set([
      'opacity', 'zIndex', 'fontWeight', 'lineHeight', 'orphans',
      'widows', 'order', 'flexGrow', 'flexShrink', 'columnCount',
      'fillOpacity', 'strokeOpacity', 'tabSize',
    ])

    // Apply other styles
    Object.entries(styleProps).forEach(([key, value]) => {
      if (typeof value === 'number' && !unitless.has(key)) {
        element.style[key] = value + 'px'
      } else {
        element.style[key] = value
      }
    })
  })
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
 * @param {Element|string|NodeList|Array} target - Element(s) or selector
 * @param {string|Array} props - Properties to clear or 'all'
 */
export function clearProps(target, props = 'all') {
  // Get elements as array
  let elements
  if (typeof target === 'string') {
    elements = Array.from(document.querySelectorAll(target))
  } else if (target instanceof NodeList) {
    elements = Array.from(target)
  } else if (Array.isArray(target)) {
    elements = target
  } else {
    elements = [target]
  }

  elements.forEach(element => {
    if (!element) return

    if (props === 'all') {
      element.removeAttribute('style')
    } else {
      const properties = Array.isArray(props) ? props : [props]
      properties.forEach(prop => {
        element.style.removeProperty(prop)
      })
    }
  })
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

/**
 * Convert GSAP easing strings to Motion.js compatible easings
 * Handles common GSAP easing types and returns valid Motion.js easing
 *
 * @param {string|Array} easing - GSAP easing string or bezier array
 * @returns {string|Array} Motion.js compatible easing
 *
 * Valid Motion.js easings:
 * - "linear"
 * - "easeIn"
 * - "easeInOut"
 * - "easeOut"
 * - "circIn"
 * - "circInOut"
 * - "circOut"
 * - "backIn"
 * - "backInOut"
 * - "backOut"
 * - "anticipate"
 * - Bezier arrays: [x1, y1, x2, y2]
 */
export function convertEasing(easing) {
  // If already an array (bezier), return as-is
  if (Array.isArray(easing)) {
    return easing
  }

  // If not a string, return default
  if (typeof easing !== 'string') {
    return 'easeOut'
  }

  // Already a valid Motion.js easing
  const validMotionEasings = [
    'linear',
    'easeIn',
    'easeInOut',
    'easeOut',
    'circIn',
    'circInOut',
    'circOut',
    'backIn',
    'backInOut',
    'backOut',
    'anticipate',
  ]

  if (validMotionEasings.includes(easing)) {
    return easing
  }

  // Convert GSAP easings to Motion.js equivalents
  const easingMap = {
    // Power easings (most common)
    'power1.in': 'easeIn',
    'power1.out': 'easeOut',
    'power1.inOut': 'easeInOut',
    'power2.in': 'easeIn',
    'power2.out': 'easeOut',
    'power2.inOut': 'easeInOut',
    'power3.in': 'easeIn',
    'power3.out': 'easeOut',
    'power3.inOut': 'easeInOut',
    'power4.in': 'easeIn',
    'power4.out': 'easeOut',
    'power4.inOut': 'easeInOut',

    // Sine easings
    'sine.in': 'easeIn',
    'sine.out': 'easeOut',
    'sine.inOut': 'easeInOut',

    // Expo easings
    'expo.in': 'easeIn',
    'expo.out': 'easeOut',
    'expo.inOut': 'easeInOut',

    // Circ easings (Motion.js has these!)
    'circ.in': 'circIn',
    'circ.out': 'circOut',
    'circ.inOut': 'circInOut',

    // Back easings (Motion.js has these!)
    'back.in': 'backIn',
    'back.out': 'backOut',
    'back.inOut': 'backInOut',

    // Elastic and bounce - no direct equivalent, use anticipate or backOut
    'elastic.in': 'backIn',
    'elastic.out': 'backOut',
    'elastic.inOut': 'backInOut',
    'bounce.in': 'backIn',
    'bounce.out': 'anticipate',
    'bounce.inOut': 'backInOut',

    // Common aliases
    none: 'linear',
    'linear': 'linear',
  }

  // Try to find a mapping
  const converted = easingMap[easing.toLowerCase()]

  if (converted) {
    return converted
  }

  // If no mapping found, log warning and return default
  console.warn(
    `[Motion Helpers] Unknown easing type "${easing}", using "easeOut" as fallback`
  )
  return 'easeOut'
}
