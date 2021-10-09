import { gsap } from 'gsap'
import _defaultsDeep from 'lodash.defaultsdeep'

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
        gsap.fromTo(target, {
          duration: 0.3,
          yPercent: -50,
          x: -5,
          xPercent: -50,
          opacity: 0,
          display: 'block'
        }, {
          duration: 0.3,
          yPercent: -50,
          xPercent: -50,
          x: 0,
          opacity: 1
        })
      }
    })
  },

  tweenOut: popup => {
    const popups = document.querySelectorAll('[data-popup]')
    gsap.to(popups, {
      duration: 0.3,
      opacity: 0,
      display: 'none'
    })
    gsap.to(popup.backdrop, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        gsap.set(popup.backdrop, { display: 'none' })
      }
    })
  }
}

export default class Popup {
  constructor (app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.createBackdrop()
    this.bindTriggers()
  }

  bindTriggers () {
    const triggers = document.querySelectorAll('[data-popup-trigger]')
    const closers = document.querySelectorAll('[data-popup-close]')

    Array.from(triggers).forEach(trigger => {
      const triggerTarget = trigger.getAttribute('data-popup-trigger')
      trigger.addEventListener('click', event => {
        if (this.opts.responsive(this.app)) {
          event.stopImmediatePropagation()
          event.preventDefault()
          this.open(trigger, triggerTarget)
        }
      })
    })

    Array.from(closers).forEach(closer => {
      closer.addEventListener('click', event => {
        event.stopImmediatePropagation()
        event.preventDefault()
        this.opts.onClose(this)
        this.close()
      })
    })
  }

  createBackdrop () {
    const backdrop = document.createElement('div')
    backdrop.setAttribute('data-popup-backdrop', '')
    gsap.set(backdrop, { opacity: 0, display: 'none', zIndex: 4999 })

    backdrop.addEventListener('click', e => {
      e.stopPropagation()
      this.close()
    })

    document.body.append(backdrop)
    this.backdrop = backdrop
  }

  open (trigger, target) {
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

  close () {
    document.removeEventListener('keyup', this.keyUpListener)
    this.opts.onClose(this)
    this.opts.tweenOut(this)
  }

  onKeyup (e) {
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
