import { animate } from 'motion'
import Dom from '../Dom'
import { set } from '../../utils/motion-helpers'

/**
 * Toggler component for show/hide functionality
 * Uses [data-toggle-trigger] for the toggle button and [data-toggle-content] for toggleable content
 * Can be grouped using [data-toggle-group] to create accordion-like behavior
 */
export default class Toggler {
  /**
   * Create a new Toggler instance
   * @param {Object} app - Application instance
   * @param {HTMLElement} el - Container element with [data-toggle] attribute
   * @param {Object} options - Configuration options
   * @param {Function} options.onOpen - Callback when toggle opens
   * @param {Function} options.onClose - Callback when toggle closes
   */
  constructor(app, el, options = {}) {
    this.open = false
    this.app = app
    this.el = el
    this.onOpen = options.onOpen
    this.onClose = options.onClose
    this.onBeforeOpen = options.onBeforeOpen
    this.onBeforeClose = options.onBeforeClose
    this.trigger = Dom.find(this.el, '[data-toggle-trigger]')
    this.triggerTarget = this.trigger.dataset.toggleTrigger
    this.group = this.el.dataset.toggleGroup
    if (this.triggerTarget) {
      this.content = Dom.all(this.el, `[data-toggle-content="${this.triggerTarget}"]`)
    } else {
      this.content = Dom.all(this.el, '[data-toggle-content]')
    }
    this.triggerIcon = Dom.find(this.trigger, 'span.icon')
    this.trigger.addEventListener('click', this.onClick.bind(this))
  }

  /**
   * Get the index of this toggle within its group (1-based)
   * @returns {number} The 1-based index of this toggle in its group
   */
  getGroupIndex() {
    if (!this.group || !this.app.togglers) return 1

    const groupTogglers = this.app.togglers.filter(t => t.group === this.group)
    return groupTogglers.indexOf(this) + 1
  }

  /**
   * Handle click on trigger element
   */
  onClick() {
    // If this toggler belongs to a group and is currently closed,
    // close all others in the same group
    if (this.group && !this.open) {
      this.closeOthersInGroup()
    }

    this.toggleState()

    if (this.open) {
      if (this.triggerIcon) {
        this.triggerIcon.classList.toggle('active')
      }
      this.trigger.setAttribute('data-toggle-trigger-active', '')
      this.content.forEach(el => {
        el.style.display = 'block'
      })
      this.el.classList.toggle('open')
      if (this.onBeforeOpen) {
        this.onBeforeOpen(this, this.getGroupIndex())
      }

      // Animate each content element with stagger
      const animations = []
      this.content.forEach((el, index) => {
        animations.push(
          animate(el, { height: [0, 'auto'] }, {
            easing: 'ease-in-out',
            delay: index * 0.1
          })
        )
      })

      // Wait for the last animation to complete
      const lastAnimation = animations[animations.length - 1]
      if (lastAnimation) {
        lastAnimation.finished.then(() => {
          this.content.forEach(el => el.removeAttribute('data-toggle-hidden'))
          this.content.forEach(el => el.setAttribute('data-toggle-visible', ''))
          if (this.onOpen) {
            this.onOpen(this, this.getGroupIndex())
          }
        })
      }
    } else {
      if (this.triggerIcon) {
        this.triggerIcon.classList.toggle('active')
      }
      this.trigger.removeAttribute('data-toggle-trigger-active')
      if (this.onBeforeClose) {
        this.onBeforeClose(this, this.getGroupIndex())
      }

      // Animate each content element with stagger
      const animations = []
      this.content.forEach((el, index) => {
        animations.push(
          animate(el, { height: 0 }, {
            duration: 0.25,
            easing: 'ease-out',
            delay: index * 0.1
          })
        )
      })

      // Wait for the last animation to complete
      const lastAnimation = animations[animations.length - 1]
      if (lastAnimation) {
        lastAnimation.finished.then(() => {
          this.el.classList.toggle('open')
          this.content.forEach(el => el.removeAttribute('data-toggle-visible'))
          this.content.forEach(el => el.setAttribute('data-toggle-hidden', ''))
          if (this.onClose) {
            this.onClose(this, this.getGroupIndex())
          }
        })
      }
    }
  }

  /**
   * Close all other togglers in the same group
   */
  closeOthersInGroup() {
    if (!this.group || !this.app.togglers) return

    this.app.togglers.forEach(toggler => {
      // Skip if it's this toggler or not in the same group
      if (toggler === this || toggler.group !== this.group) return

      // Only close if it's open
      if (toggler.open) {
        // Close the toggler
        toggler.open = false

        // Update UI
        if (toggler.triggerIcon) {
          toggler.triggerIcon.classList.remove('active')
        }

        toggler.trigger.removeAttribute('data-toggle-trigger-active')
        toggler.el.classList.remove('open')

        // Animate content closing with stagger
        const animations = []
        toggler.content.forEach((el, index) => {
          animations.push(
            animate(el, { height: 0 }, {
              duration: 0.25,
              easing: 'ease-out',
              delay: index * 0.1
            })
          )
        })

        // Wait for the last animation to complete
        const lastAnimation = animations[animations.length - 1]
        if (lastAnimation) {
          lastAnimation.finished.then(() => {
            toggler.content.forEach(el => el.removeAttribute('data-toggle-visible'))
            toggler.content.forEach(el => el.setAttribute('data-toggle-hidden', ''))

            if (toggler.onClose) {
              toggler.onClose(toggler, toggler.getGroupIndex())
            }
          })
        }
      }
    })
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
