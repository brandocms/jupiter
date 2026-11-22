import { find, all } from '../Dom/query'
import animateStyles from '../../utils/animateStyles'

/**
 * Toggler component for show/hide functionality
 * Uses [data-toggle-trigger] for the toggle button and [data-toggle-content] for toggleable content
 * Can be grouped using [data-toggle-group] to create accordion-like behavior
 *
 * IMPORTANT: For smooth animations, avoid padding/margins on [data-toggle-content].
 * Instead, wrap content in a child element with padding/margins:
 *
 * @example
 * // ❌ DON'T: Padding/margins directly on toggle content
 * <div data-toggle-content style="padding: 20px; margin-top: 10px">
 *   Content here
 * </div>
 *
 * // ✅ DO: Wrap content in child element
 * <div data-toggle-content>
 *   <div style="padding: 20px; margin-top: 10px">
 *     Content here
 *   </div>
 * </div>
 */
export default class Toggler {
  /**
   * Create a new Toggler instance
   * @param {Object} app - Application instance
   * @param {HTMLElement} el - Container element with [data-toggle] attribute
   * @param {Object} [options] - Configuration options
   * @param {Function} [options.onBeforeOpen] - Called before expanding
   * @param {Function} [options.onOpen] - Called after expanding
   * @param {Function} [options.onBeforeClose] - Called before the active trigger collapses its panel
   * @param {Function} [options.onClose] - Called after collapsing
   */
  constructor(app, el, options = {}) {
    this.open = false
    this.app = app
    this.el = el
    this.onOpen = options.onOpen
    this.onClose = options.onClose
    this.onBeforeOpen = options.onBeforeOpen
    this.onBeforeClose = options.onBeforeClose
    this.trigger = find(this.el, '[data-toggle-trigger]')
    this.triggerTarget = this.trigger.dataset.toggleTrigger
    this.group = this.el.dataset.toggleGroup
    const selector = this.triggerTarget ? `[data-toggle-content="${this.triggerTarget}"]` : '[data-toggle-content]'
    this.content = all(this.el, selector)
    this.triggerIcon = find(this.trigger, 'span.icon')
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

      // Set initial state before making visible
      this.content.forEach(el => {
        el.style.height = '0'
        el.style.display = 'block'
        // Force layout reflow to ensure 0 height is applied
        el.offsetHeight
      })

      this.el.classList.add('open')
      if (this.onBeforeOpen) {
        this.onBeforeOpen(this, this.getGroupIndex())
      }

      // Animate each content element with stagger
      const animations = []
      this.content.forEach((el, index) => {
        // Measure the actual height now
        const targetHeight = el.scrollHeight

        animations.push(
          animateStyles(el, { height: [0, targetHeight + 'px'] }, {
            ease: 'easeInOut',
            delay: index * 0.1
          })
        )
      })

      // Wait for the last animation to complete
      const lastAnimation = animations[animations.length - 1]
      if (lastAnimation) {
        lastAnimation.finished.then(() => {
          if (!this.open) return
          // Set height to auto for responsiveness
          this.content.forEach(el => {
            el.style.height = 'auto'
            el.removeAttribute('data-toggle-hidden')
            el.setAttribute('data-toggle-visible', '')
          })
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

      this.collapse()
    }
  }

  collapse() {
    const heights = this.content.map(el => el.scrollHeight)
    const animations = this.content.map((el, index) =>
      animateStyles(el, { height: [heights[index] + 'px', '0px'] }, {
        duration: 0.25, ease: 'easeOut', delay: index * 0.1
      })
    )
    const last = animations[animations.length - 1]
    last?.finished.then(() => {
      if (this.open) return
      this.el.classList.remove('open')
      for (const el of this.content) {
        el.style.display = 'none'
        el.style.removeProperty('height')
        el.removeAttribute('data-toggle-visible')
        el.setAttribute('data-toggle-hidden', '')
      }
      this.onClose?.(this, this.getGroupIndex())
    })
  }

  /**
   * Close all other togglers in the same group
   */
  closeOthersInGroup() {
    if (!this.group || !this.app.togglers) return

    this.app.togglers.forEach(toggler => {
      if (toggler === this || toggler.group !== this.group || !toggler.open) return
      toggler.open = false
      toggler.triggerIcon?.classList.remove('active')
      toggler.trigger.removeAttribute('data-toggle-trigger-active')
      toggler.el.classList.remove('open')
      toggler.collapse()
    })
  }

  /**
   * Toggle open/closed state
   */
  toggleState() {
    this.open = !this.open
  }
}
