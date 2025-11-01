import { animate } from 'motion'

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
    return animate(element, { opacity: value }, {
      ...options,
      onComplete: () => {
        options.onComplete?.()
      }
    })
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
 *
 * @param {number} delay - Delay in seconds
 * @param {Function} callback - Callback function
 * @returns {Promise} Promise that resolves after delay
 */
export function delayedCall(delay, callback) {
  return new Promise(resolve => {
    setTimeout(() => {
      callback()
      resolve()
    }, delay * 1000)  // Convert to ms
  })
}
