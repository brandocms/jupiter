import { gsap } from 'gsap'
import Dom from '../Dom'

const DEFAULT_OPTIONS = {}

export default class Toggler {
  constructor(app, el) {
    this.open = false
    this.app = app
    this.el = el
    // this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.trigger = Dom.find(this.el, '[data-toggle-trigger]')
    this.triggerIcon = Dom.find(this.trigger, 'span.icon')
    this.content = Dom.find(this.el, '[data-toggle-content]')
    this.trigger.addEventListener('click', this.onClick.bind(this))
  }

  onClick() {
    this.toggleState()

    if (this.open) {
      this.triggerIcon.classList.toggle('active')
      gsap.set(this.content, { height: 'auto' })
      this.el.classList.toggle('open')
      gsap.from(this.content, { height: 0, ease: 'power1.inOut' })
    } else {
      this.triggerIcon.classList.toggle('active')
      gsap.to(this.content, {
        duration: 0.25,
        onComplete: () => {
          this.el.classList.toggle('open')
        }
      })

      gsap.to(this.content, { height: 0, ease: 'power3.out' })
    }
  }

  toggleState() {
    if (this.open) {
      this.open = false
    } else {
      this.open = true
    }
  }
}
