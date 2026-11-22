import { find, all } from './query'

/**
 * DOM utility class for simplifying DOM operations
 */
class DOM {
  /**
   * Create a new DOM utility instance
   */
  constructor() {
    this.body = document.body
    this.html = document.documentElement
  }

  new(arg) {
    const doc = new DOMParser().parseFromString(arg.trim(), 'text/html')
    return Array.from(doc.body.childNodes)
  }

  find(arg1, arg2) {
    return find(arg1, arg2)
  }

  all(arg1, arg2) {
    return all(arg1, arg2)
  }

  create(element, ...classes) {
    const el = document.createElement(element)
    this.addClass(el, ...classes)
    return el
  }

  append(element) {
    document.body.appendChild(element)
  }

  remove(element) {
    element.remove()
  }

  addClass(element, ...classes) {
    classes.forEach(className => {
      element.classList.add(className)
    })
    return element
  }

  removeClass(element, ...classes) {
    classes.forEach(className => {
      element.classList.remove(className)
    })
    return element
  }

  hasClass(element, className) {
    return element.classList.contains(className)
  }

  toggleClass(element, ...classes) {
    return classes.map(className => element.classList.toggle(className))
  }

  hasAttribute(element, attributeName) {
    return element.hasAttribute(attributeName)
  }

  overlapsVertically($div1, $div2) {
    const bounds = el => {
      const rect = el.getBoundingClientRect()
      const style = getComputedStyle(el)
      return {
        top: rect.top - (parseFloat(style.marginTop) || 0),
        bottom: rect.bottom + (parseFloat(style.marginBottom) || 0)
      }
    }
    const first = bounds($div1)
    const second = bounds($div2)
    return Math.max(0, Math.min(first.bottom, second.bottom) - Math.max(first.top, second.top))
  }

  outerHeight(el) {
    let height = el.offsetHeight
    const style = getComputedStyle(el)

    height += parseInt(style.marginTop) + parseInt(style.marginBottom)
    return height
  }

  outerWidth(el) {
    let width = el.offsetWidth
    const style = getComputedStyle(el)

    width += parseInt(style.marginLeft) + parseInt(style.marginRight)
    return width
  }

  getCSSVar(key, element = document.documentElement) {
    return getComputedStyle(element).getPropertyValue(key).trim()
  }

  setCSSVar(key, val, element = document.documentElement) {
    element.style.setProperty(`--${key}`, val)
  }

  removeCSSVar(key, element = document.documentElement) {
    element.style.removeProperty(`--${key}`)
  }

  offset(el) {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    }
  }

  position(el) {
    return {
      top: el.offsetTop,
      left: el.offsetLeft
    }
  }

  /**
   * Check if parts of `el` is in viewport
   *
   * @param {*} el
   */
  inViewport(el) {
    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const windowWidth = window.innerWidth || document.documentElement.clientWidth

    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0

    return vertInView && horInView
  }

  /**
   * Strict viewport check - element must be fully contained within viewport bounds
   * Useful for popovers/tooltips that need to be completely visible
   *
   * @param {*} el
   */
  inViewportStrict(el) {
    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const windowWidth = window.innerWidth || document.documentElement.clientWidth

    // Element must be fully within viewport bounds
    const vertInView = rect.top >= 0 && rect.bottom <= windowHeight
    const horInView = rect.left >= 0 && rect.right <= windowWidth

    return vertInView && horInView
  }
}

export default new DOM()
