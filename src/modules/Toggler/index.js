import { gsap } from 'gsap'
import Dom from '../Dom'

export default class Toggler {
  constructor(app, el) {
    this.open = false
    this.app = app
    this.el = el
    this.trigger = Dom.find(this.el, '[data-toggle-trigger]')
    this.triggerIcon = Dom.find(this.trigger, 'span.icon')
    this.content = Dom.find(this.el, '[data-toggle-content]')
    this.trigger.addEventListener('click', this.onClick.bind(this))
  }

  onClick() {
    this.toggleState()

    if (this.open) {
      if (this.triggerIcon) {
        this.triggerIcon.classList.toggle('active')
      }
      gsap.set(this.content, { height: 'auto', display: 'block' })
      this.el.classList.toggle('open')
      gsap.from(this.content, { height: 0, ease: 'power1.inOut' })
    } else {
      if (this.triggerIcon) {
        this.triggerIcon.classList.toggle('active')
      }
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
