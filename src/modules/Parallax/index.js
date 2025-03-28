import _defaultsDeep from 'lodash.defaultsdeep'
import * as Events from '../../events'

/**
 * @typedef {Object} ParallaxOptions
 * @property {string|HTMLElement} [el='[data-parallax]'] - Target element selector or element
 * @property {number} [factor=1.3] - Default parallax movement factor
 * @property {boolean} [fadeContent=true] - Whether to fade content while scrolling
 * @property {number} [scale=1.2] - Scale factor to apply to parallax images
 * @property {number} [delay=0.1] - Delay factor to smooth the effect
 * @property {string} [orientation='up'] - Direction of parallax effect ('up', 'down', 'left', 'right')
 * @property {boolean} [overflow=false] - Whether to show element overflow
 */

/** @type {ParallaxOptions} */
const DEFAULT_OPTIONS = {
  el: '[data-parallax]',
  factor: 1.3,
  fadeContent: true,
  scale: 1.2,
  delay: 0.1,
  orientation: 'up',
  overflow: false,
}

/**
 * Parallax scrolling effect inspired by SimpleParallax.js
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
    this.parallaxElements = []
    
    // Get all elements to apply parallax to
    if (typeof this.opts.el === 'string') {
      if (this.opts.el.includes('[data-parallax-parent]')) {
        // Handle multiple elements within parent
        const parent = document.querySelector(this.opts.el)
        if (parent) {
          this.elements.parent = parent
          const children = parent.querySelectorAll('[data-parallax-factor]')
          children.forEach(el => this.setupParallaxElement(el))
        }
      } else {
        // Handle single element or multiple elements with same selector
        const elements = document.querySelectorAll(this.opts.el)
        elements.forEach(el => this.setupParallaxElement(el))
      }
    } else if (this.opts.el instanceof HTMLElement) {
      // Handle single element passed directly
      this.setupParallaxElement(this.opts.el)
    }
    
    // Bind events
    this.onScroll = this.onScroll.bind(this)
    window.addEventListener(Events.APPLICATION_SCROLL, this.onScroll)
    window.addEventListener('resize', this.onScroll)
    
    // Initial positioning
    this.onScroll()
  }
  
  /**
   * Set up a parallax element with its properties
   * @param {HTMLElement} el - Element to set up
   */
  setupParallaxElement(el) {
    // Get element-specific options
    const factor = el.hasAttribute('data-parallax-factor') ? 
      parseFloat(el.getAttribute('data-parallax-factor')) : 
      this.opts.factor
      
    // For traditional parallax, use the global fadeContent option
    // For individual elements, check for data-parallax-fade attribute
    let fadeContent = el.hasAttribute('data-parallax') ? 
      this.opts.fadeContent : 
      el.hasAttribute('data-parallax-fade')
    
    const orientation = el.hasAttribute('data-parallax-orientation') ? 
      el.getAttribute('data-parallax-orientation') : 
      this.opts.orientation
    
    // Set up for traditional parallax if needed
    let contentEl = null
    let figureEl = null
    
    if (el.hasAttribute('data-parallax')) {
      contentEl = el.querySelector('[data-parallax-content]')
      figureEl = el.querySelector('[data-parallax-figure]')
      
      // Apply overflow style if needed
      if (!this.opts.overflow) {
        el.style.overflow = 'hidden'
      }
      
      // Scale up the figure element to prevent showing background during parallax
      if (figureEl) {
        figureEl.style.transform = `scale(${this.opts.scale})`
        figureEl.style.willChange = 'transform'
        figureEl.style.transformOrigin = 'center'
        
        // Make sure background fills the container
        const computedStyle = window.getComputedStyle(figureEl)
        if (computedStyle.backgroundImage && computedStyle.backgroundImage !== 'none') {
          if (computedStyle.backgroundSize !== 'cover') {
            figureEl.style.backgroundSize = 'cover'
          }
          if (computedStyle.backgroundPosition !== 'center') {
            figureEl.style.backgroundPosition = 'center'
          }
        }
      }
      
      if (contentEl) {
        contentEl.style.willChange = fadeContent ? 'transform, opacity' : 'transform'
        contentEl.style.zIndex = '1' // Ensure content is above the figure
      }
    } else {
      // For individual elements in multi-element parallax
      el.style.willChange = fadeContent ? 'transform, opacity' : 'transform'
    }
    
    // Store the element and its settings
    this.parallaxElements.push({
      element: el,
      factor,
      fadeContent,
      orientation,
      content: contentEl,
      figure: figureEl,
      elementHeight: el.offsetHeight,
      elementWidth: el.offsetWidth,
      lastPosition: 0
    })
  }
  
  /**
   * Calculate the transform value based on scroll position
   * @param {Object} item - Parallax element data
   * @param {number} scrollPosition - Current scroll position
   * @returns {Object} Transform and opacity values
   */
  calculateTransform(item, scrollPosition) {
    const { element, factor, fadeContent, orientation } = item
    
    // Get element position
    const rect = element.getBoundingClientRect()
    const windowHeight = this.app.size.height
    const windowMiddle = windowHeight / 2
    
    // Calculate how far the element is from the middle of the viewport
    const elementMiddle = rect.top + rect.height / 2
    const distanceFromMiddle = elementMiddle - windowMiddle
    
    // Calculate percentage through viewport (-1 to 1 range, 0 at center)
    const percentageThrough = distanceFromMiddle / windowHeight
    
    // Apply the factor to create parallax effect
    const movement = percentageThrough * factor * 100
    
    // Calculate opacity for fade effect
    let opacity = 1;
    
    // Only apply fade if explicitly enabled
    if (fadeContent) {
      // Calculate position in viewport (0 = top of viewport, 1 = bottom of viewport)
      const viewportPosition = rect.top / windowHeight;
      
      // Fade in as element enters viewport from bottom (opacity 0->1)
      // Fade out as element leaves viewport at top (opacity 1->0)
      if (viewportPosition <= 0) {
        // Element is at top or above viewport - fade out based on how far above
        opacity = Math.max(0, 1 + (viewportPosition * 1.5));
      } else if (viewportPosition >= 0.7) {
        // Element is at bottom of viewport - fade in based on position
        opacity = Math.max(0, 1 - ((viewportPosition - 0.7) * 3.33));
      }
      
      // Ensure opacity is within valid range
      opacity = Math.max(0, Math.min(1, opacity));
    }
    
    // Create transform based on orientation
    let transform = ''
    
    switch (orientation) {
      case 'up':
        transform = `translate3d(0, ${movement}px, 0)`
        break
      case 'down':
        transform = `translate3d(0, ${-movement}px, 0)`
        break
      case 'left':
        transform = `translate3d(${movement}px, 0, 0)`
        break
      case 'right':
        transform = `translate3d(${-movement}px, 0, 0)`
        break
      default:
        transform = `translate3d(0, ${movement}px, 0)`
    }
    
    return { transform, opacity }
  }
  
  /**
   * Apply a smooth transition between current and target position
   * @param {Object} item - Parallax element data
   * @param {Object} target - Target transform and opacity values
   */
  applyTransform(item, target) {
    const { element, figure, content } = item
    
    // For traditional parallax with background and content
    if (figure) {
      // Extract and maintain the scale transform
      let scaleTransform = 'scale(1.2)';
      const currentTransform = figure.style.transform;
      if (currentTransform) {
        const scaleMatch = currentTransform.match(/scale\([^)]+\)/);
        if (scaleMatch) {
          scaleTransform = scaleMatch[0];
        }
      }
      
      figure.style.transform = `${scaleTransform} ${target.transform}`;
    }
    
    // Apply transform and opacity to content
    if (content) {
      content.style.transform = target.transform;
      content.style.opacity = target.opacity;
    }
    
    // For multi-element parallax items
    if (!figure && !content) {
      element.style.transform = target.transform;
      element.style.opacity = target.opacity;
    }
  }
  
  /**
   * Handle scroll event to update parallax effect
   */
  onScroll() {
    if (!this.parallaxElements.length) return
    
    const scrollPosition = window.pageYOffset
    
    // Update each parallax element
    this.parallaxElements.forEach(item => {
      const rect = item.element.getBoundingClientRect()
      
      // Only apply parallax if the element is in or near the viewport
      if (rect.bottom > -100 && rect.top < this.app.size.height + 100) {
        const transform = this.calculateTransform(item, scrollPosition)
        this.applyTransform(item, transform)
      }
    })
  }
  
  /**
   * Destroy the parallax instance and clean up
   */
  destroy() {
    window.removeEventListener(Events.APPLICATION_SCROLL, this.onScroll)
    window.removeEventListener('resize', this.onScroll)
    
    // Reset element styles
    this.parallaxElements.forEach(item => {
      const { element, figure, content } = item
      
      if (figure) {
        figure.style.transform = ''
        figure.style.willChange = ''
      }
      
      if (content) {
        content.style.transform = ''
        content.style.opacity = ''
        content.style.willChange = ''
      }
      
      if (!figure && !content) {
        element.style.transform = ''
        element.style.opacity = ''
        element.style.willChange = ''
      }
      
      element.style.overflow = ''
    })
    
    this.parallaxElements = []
  }
}
