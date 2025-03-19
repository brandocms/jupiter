import { gsap } from 'gsap/all'
import Dom from '../Dom'

/**
 * Toggler component for show/hide functionality
 * Uses [data-toggle-trigger] for the toggle button and [data-toggle-content] for toggleable content
 */
export default class Toggler {
  /**
   * Create a new Toggler instance
   * @param {Object} app - Application instance
   * @param {HTMLElement} el - Container element with [data-toggle] attribute
   */
  constructor(app, el) {
    this.open = false
    this.app = app
    this.el = el
    this.trigger = Dom.find(this.el, '[data-toggle-trigger]')
    this.triggerTarget = this.trigger.dataset.toggleTrigger
    if (this.triggerTarget) {
      this.content = Dom.all(
        this.el,
        `[data-toggle-content="${this.triggerTarget}"]`
      )
    } else {
      this.content = Dom.all(this.el, '[data-toggle-content]')
    }
    this.triggerIcon = Dom.find(this.trigger, 'span.icon')
    this.trigger.addEventListener('click', this.onClick.bind(this))
  }

  /**
   * Handle click on trigger element
   */
  onClick() {
    this.toggleState()

    if (this.open) {
      if (this.triggerIcon) {
        this.triggerIcon.classList.toggle('active')
      }
      gsap.set(this.content, { height: 'auto', display: 'block' })
      this.el.classList.toggle('open')
      gsap.from(this.content, {
        height: 0,
        ease: 'power1.inOut',
        stagger: 0.1,
        onComplete: () => {
          this.content.forEach((el) => el.removeAttribute('data-toggle-hidden'))
          this.content.forEach((el) =>
            el.setAttribute('data-toggle-visible', '')
          )
        },
      })
    } else {
      if (this.triggerIcon) {
        this.triggerIcon.classList.toggle('active')
      }
      gsap.to(this.content, {
        duration: 0.25,
        onComplete: () => {
          this.el.classList.toggle('open')
          this.content.forEach((el) =>
            el.removeAttribute('data-toggle-visible')
          )
          this.content.forEach((el) =>
            el.setAttribute('data-toggle-hidden', '')
          )
        },
      })

      gsap.to(this.content, { height: 0, ease: 'power3.out', stagger: 0.1 })
    }
  }

  /**
   * Toggle open/closed state
   */
  toggleState() {
    if (this.open) {
      this.open = false
    } else {
      this.open = true
    }
  }
}
