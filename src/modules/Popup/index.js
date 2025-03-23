import { gsap } from 'gsap/all'
import _defaultsDeep from 'lodash.defaultsdeep'

/**
 * @typedef {Object} PopupOptions
 * @property {string} [selector] - CSS selector to find popup elements
 * @property {Function} [responsive] - Function that determines if popup should be shown on current breakpoint
 * @property {Function} [onOpen] - Called when popup opens
 * @property {Function} [onClose] - Called when popup closes
 * @property {Function} [tweenIn] - Animation function for opening popup
 * @property {Function} [tweenOut] - Animation function for closing popup
 */

/** @type {PopupOptions} */
const DEFAULT_OPTIONS = {
  /**
   * selector
   *
   * CSS selector to find popup elements
   * Default: '[data-popup]'
   */
  selector: '[data-popup]',

  /**
   * responsive
   *
   * Runs to check if popup should be shown on this breakpoint.
   * Passes app object to callback
   *
   * Example:
   *
   *  responsive: app => { return (app.breakpoint === 'iphone') }
   */
  responsive: () => true,
  onOpen: () => {},
  onClose: () => {},

  tweenIn: (trigger, target, popup) => {
    gsap.set(popup.backdrop, { display: 'block' })
    gsap.to(popup.backdrop, {
      duration: 0.3,
      opacity: 1,
      onComplete: () => {
        gsap.fromTo(
          target,
          {
            duration: 0.3,
            yPercent: -50,
            x: -5,
            xPercent: -50,
            opacity: 0,
            display: 'block',
          },
          {
            duration: 0.3,
            yPercent: -50,
            xPercent: -50,
            x: 0,
            opacity: 1,
          }
        )
      },
    })
  },

  tweenOut: (popup) => {
    console.log('default tweenOut')
    const popupElement = popup.currentPopup
    if (popupElement) {
      gsap.to(popupElement, {
        duration: 0.3,
        opacity: 0,
        display: 'none',
      })
    }
    gsap.to(popup.backdrop, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        // Remove the backdrop completely instead of just hiding it
        popup.backdrop.remove()
      },
    })
  },
}

/**
 * Popup component for modal dialogs and popups
 */
export default class Popup {
  /**
   * Create a new Popup instance
   * @param {Object} app - Application instance
   * @param {string} [selector] - CSS selector to find popup elements
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(app, selector = '[data-popup]', opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.opts.selector = selector
    this.backdrop = null
    this.currentPopup = null
    this.popupKey = null
    this.bindTriggers()
  }

  /**
   * Bind click handlers to popup triggers and close buttons
   */
  bindTriggers() {
    // Find all triggers that match this popup's selector
    const allTriggers = document.querySelectorAll('[data-popup-trigger]')
    const matchingTriggers = Array.from(allTriggers).filter(trigger => {
      const target = trigger.getAttribute('data-popup-trigger')
      if (typeof target === 'string') {
        const element = document.querySelector(target)
        return element && element.matches(this.opts.selector)
      }
      return false
    })

    // Get all popups that match this instance's selector
    const popups = document.querySelectorAll(this.opts.selector)
    
    // Find all close buttons inside matching popups
    const closers = []
    popups.forEach(popup => {
      const popupClosers = popup.querySelectorAll('[data-popup-close]')
      closers.push(...popupClosers)
    })

    // Bind click handlers to matching triggers
    matchingTriggers.forEach((trigger) => {
      const triggerTarget = trigger.getAttribute('data-popup-trigger')
      // Get the popup key if present
      const popupKey = trigger.getAttribute('data-popup-key') || this.getKeyFromTarget(triggerTarget)
      
      trigger.addEventListener('click', (event) => {
        if (this.opts.responsive(this.app)) {
          event.stopImmediatePropagation()
          event.preventDefault()
          this.open(trigger, triggerTarget, popupKey)
        }
      })
    })

    // Bind click handlers to close buttons
    closers.forEach((closer) => {
      // Get the popup key from the closest parent popup element
      const popupElement = closer.closest(this.opts.selector)
      const popupKey = popupElement ? popupElement.getAttribute('data-popup-key') : null
      
      closer.addEventListener('click', (event) => {
        event.stopImmediatePropagation()
        event.preventDefault()
        
        // Only close if keys match or no key is set
        if (!this.popupKey || !popupKey || this.popupKey === popupKey) {
          this.opts.onClose(this)
          this.close()
        }
      })
    })
  }

  /**
   * Extract key from target selector or element
   * @param {HTMLElement|string} target - Target element or selector
   * @returns {string|null} - The popup key or null
   */
  getKeyFromTarget(target) {
    if (typeof target === 'string') {
      const element = document.querySelector(target)
      return element ? element.getAttribute('data-popup-key') : null
    } else if (target instanceof HTMLElement) {
      return target.getAttribute('data-popup-key')
    }
    return null
  }

  /**
   * Create backdrop element for popup
   * @param {string|null} key - Optional popup key to associate with backdrop
   * @returns {HTMLElement} The created backdrop element
   */
  createBackdrop(key) {
    const backdrop = document.createElement('div')
    backdrop.setAttribute('data-popup-backdrop', '')
    if (key) {
      backdrop.setAttribute('data-popup-key', key)
    }
    gsap.set(backdrop, { opacity: 0, display: 'none', zIndex: 4999 })

    backdrop.addEventListener('click', (e) => {
      e.stopPropagation()
      this.close()
    })

    document.body.append(backdrop)
    return backdrop
  }

  /**
   * Open a popup
   * @param {HTMLElement} trigger - Element that triggered the popup
   * @param {HTMLElement|string} target - Popup element or selector
   * @param {string|null} key - Optional popup key
   */
  open(trigger, target, key = null) {
    this.keyUpListener = this.onKeyup.bind(this)
    document.addEventListener('keyup', this.keyUpListener)

    // Store the popup key
    this.popupKey = key || this.getKeyFromTarget(target)

    // Create a new backdrop for this popup
    this.backdrop = this.createBackdrop(this.popupKey)

    if (typeof target === 'string') {
      target = document.querySelector(target)
    }

    if (!target) {
      console.error(`JUPITER/POPUP >>> Element ${target} not found`)
      return
    }

    // Store the current popup element for reference
    this.currentPopup = target
    
    // If key isn't already set on the popup element, set it now
    if (this.popupKey && !target.hasAttribute('data-popup-key')) {
      target.setAttribute('data-popup-key', this.popupKey)
    }

    this.opts.onOpen(trigger, target, this)
    this.opts.tweenIn(trigger, target, this)
  }

  /**
   * Close the popup
   */
  close() {
    document.removeEventListener('keyup', this.keyUpListener)
    this.opts.onClose(this)
    this.opts.tweenOut(this)
    
    // Reset popup state
    this.popupKey = null
    this.currentPopup = null
  }

  /**
   * Handle keyup event for Escape key to close popup
   * @param {KeyboardEvent} e - Keyboard event
   */
  onKeyup(e) {
    const key = e.keyCode || e.which

    switch (key) {
      case 27:
        this.close()
        break
      default:
        break
    }
  }
}
