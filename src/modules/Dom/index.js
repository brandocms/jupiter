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
    if (typeof arg1 === 'string' && typeof arg2 === 'object') {
      throw new Error('Dom.find: Wrong syntax, use -> Dom.find(node, selector)')
    }

    if (typeof arg1 === 'string') {
      return document.querySelector(arg1)
    }

    if (typeof arg2 === 'string') {
      return arg1.querySelector(arg2)
    }

    return null
  }

  all(arg1, arg2) {
    if (typeof arg1 === 'string') {
      return Array.from(document.querySelectorAll(arg1))
    }

    if (typeof arg2 === 'string') {
      return Array.from(arg1.querySelectorAll(arg2))
    }

    return []
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
    // Div 1 data
    const d1Offset = $div1.getBoundingClientRect()
    const d1Height = this.outerHeight($div1)
    const d1DistanceFromTop = d1Offset.top + d1Height

    // Div 2 data
    const d2Offset = $div2.getBoundingClientRect()
    const d2Height = this.outerHeight($div2)
    const d2DistanceFromTop = d2Offset.top + d2Height

    if (d1DistanceFromTop > d2Offset.top) {
      return d1DistanceFromTop - d2Offset.top
    }

    if (d1Offset.top > d2DistanceFromTop) {
      return d1Offset.top - d2DistanceFromTop
    }

    return 0
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
