import { TweenMax, Power1 } from 'gsap/all'
import _defaultsDeep from 'lodash.defaultsdeep'

const DEFAULT_OPTIONS = {
  fadeOutDuration: 0.85,
  fadeOutDelay: 0.35
}

export default class Fader {
  constructor (app, el, opts = {}) {
    if (typeof el === 'string') {
      this.el = document.querySelector(el)
    } else {
      this.el = el
    }

    if (!this.el) {
      return
    }

    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
  }

  out (callback = () => {}) {
    // fire ready event before fade
    this.app._emitReadyEvent()
    TweenMax.to(this.el, this.opts.fadeOutDuration, {
      opacity: 0,
      ease: Power1.easeInOut,
      delay: this.opts.fadeOutDelay,
      onComplete: () => {
        this.el.style.display = 'none'
        document.body.classList.remove('unloaded')
        callback.apply(this.app)
      }
    })
  }
}
