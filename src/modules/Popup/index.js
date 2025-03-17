import { gsap } from 'gsap/all'
import _defaultsDeep from 'lodash.defaultsdeep'

/**
 * @typedef {Object} PopupOptions
 * @property {Function} [responsive] - Function that determines if popup should be shown on current breakpoint
 * @property {Function} [onOpen] - Called when popup opens
 * @property {Function} [onClose] - Called when popup closes
 * @property {Function} [tweenIn] - Animation function for opening popup
 * @property {Function} [tweenOut] - Animation function for closing popup
 */

/** @type {PopupOptions} */
const DEFAULT_OPTIONS = {
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
    const popups = document.querySelectorAll('[data-popup]')
    gsap.to(popups, {
      duration: 0.3,
      opacity: 0,
      display: 'none',
    })
    gsap.to(popup.backdrop, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        gsap.set(popup.backdrop, { display: 'none' })
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
   * @param {PopupOptions} [opts={}] - Popup options
   */
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.createBackdrop()
    this.bindTriggers()
  }

  /**
   * Bind click handlers to popup triggers and close buttons
   */
  bindTriggers() {
    const triggers = document.querySelectorAll('[data-popup-trigger]')
    const closers = document.querySelectorAll('[data-popup-close]')

    Array.from(triggers).forEach((trigger) => {
      const triggerTarget = trigger.getAttribute('data-popup-trigger')
      trigger.addEventListener('click', (event) => {
        if (this.opts.responsive(this.app)) {
          event.stopImmediatePropagation()
          event.preventDefault()
          this.open(trigger, triggerTarget)
        }
      })
    })

    Array.from(closers).forEach((closer) => {
      closer.addEventListener('click', (event) => {
        event.stopImmediatePropagation()
        event.preventDefault()
        this.opts.onClose(this)
        this.close()
      })
    })
  }

  /**
   * Create backdrop element for popup
   */
  createBackdrop() {
    const backdrop = document.createElement('div')
    backdrop.setAttribute('data-popup-backdrop', '')
    gsap.set(backdrop, { opacity: 0, display: 'none', zIndex: 4999 })

    backdrop.addEventListener('click', (e) => {
      e.stopPropagation()
      this.close()
    })

    document.body.append(backdrop)
    this.backdrop = backdrop
  }

  /**
   * Open a popup
   * @param {HTMLElement} trigger - Element that triggered the popup
   * @param {HTMLElement|string} target - Popup element or selector
   */
  open(trigger, target) {
    this.keyUpListener = this.onKeyup.bind(this)
    document.addEventListener('keyup', this.keyUpListener)
    if (typeof target === 'string') {
      target = document.querySelector(target)
    }

    if (!target) {
      console.error(`JUPITER/POPUP >>> Element ${target} not found`)
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
