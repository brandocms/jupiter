import { animate, stagger } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import Dom from '../Dom'
import { set } from '../../utils/motion-helpers'

/**
 * <ul data-dropdown>
 *   <li data-dropdown-trigger>Menu trigger</li>
 *   <ul data-dropdown-menu>
 *     <li>Item</li>
 *     <li>Item</li>
 *   </ul>
 * </ul>
 *
 * If you need to trigger a dropdown menu outside of the data-dropdown element, you can target it
 * with
 *
 *    <li data-dropdown-trigger data-dropdown-target="#mydropdown">Trigger</li>
 *
 * This is useful if you run into clipping bugs/problems. Move your dropdown
 * menu outside of the clipping container.
 */

const DEFAULT_OPTIONS = {
  multipleActive: false,
  selectors: {
    trigger: '[data-dropdown-trigger]',
    menu: '[data-dropdown-menu]',
    menuItems: '[data-dropdown-menu] > li',
  },
  overlapTweens: true,
  menuOpenDuration: 0.1,
  tweens: {
    items: {
      duration: 0.2,
      autoAlpha: 0,
      stagger: 0.03,
    },
  },

  onBeforeOpen: async (dropdown) => {},
  onAfterOpen: async (dropdown) => {},
  onBeforeClose: async (dropdown) => {},
  onAfterClose: async (dropdown) => {},
}

export default class Dropdown {
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.elements = {}
    this.open = false
    this.element = opts.el

    // Check if the element itself is the trigger, or find it inside
    if (this.element.matches && this.element.matches(this.opts.selectors.trigger)) {
      this.elements.trigger = this.element
    } else {
      this.elements.trigger = Dom.find(this.element, this.opts.selectors.trigger)
    }

    if (this.elements.trigger && this.elements.trigger.hasAttribute('data-dropdown-target')) {
      const dropdownTarget = this.elements.trigger.getAttribute(
        'data-dropdown-target'
      )
      this.elements.menu = Dom.find(dropdownTarget)
    } else {
      this.elements.menu = Dom.find(this.element, this.opts.selectors.menu)
    }

    this.elements.menuItems = Dom.all(
      this.elements.menu,
      this.opts.selectors.menuItems
    )

    // Bind the document click handler to this instance
    this.handleDocumentClick = this.handleDocumentClick.bind(this)

    this.initialize()
    this.checkForInitialOpen()
  }

  initialize() {
    if (!this.elements.menu) {
      console.error('Dropdown menu element not found')
      return
    }

    // Initial setup - menu hidden with height cleared
    this.elements.menu.style.removeProperty('height')
    set(this.elements.menu, { display: 'none', opacity: 0 })

    // Store initial menu items opacity
    if (this.elements.menuItems && this.elements.menuItems.length) {
      set(this.elements.menuItems, { opacity: 0 })
    }

    if (!this.elements.trigger) {
      console.error('Dropdown trigger element not found')
      return
    }
    this.elements.trigger.addEventListener('click', this.onClick.bind(this))
  }

  positionMenu() {
    // Get current bounds and viewport dimensions
    const menuRect = this.elements.menu.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    const menuHeight = menuRect.height
    const menuTop = menuRect.top

    // Update CSS variable for height (if used in your styles)
    Dom.setCSSVar(
      'dropdown-menu-height',
      `${menuHeight}px`,
      this.elements.menu
    )

    // Vertical placement: if the menu overflows the bottom, set placement to "top"
    if (menuHeight + menuTop > viewportHeight) {
      this.elements.menu.setAttribute('data-dropdown-placement', 'top')
    } else {
      this.elements.menu.setAttribute('data-dropdown-placement', 'bottom')
    }

    // Horizontal check: adjust left offset if the menu is offscreen
    const computedStyle = window.getComputedStyle(this.elements.menu)
    let currentLeft = parseFloat(computedStyle.left) || 0

    if (menuRect.left < 0) {
      // Shift right by the amount it's off the left edge
      this.elements.menu.style.left = `${currentLeft - menuRect.left}px`
    } else if (menuRect.right > viewportWidth) {
      // Shift left by the amount it's off the right edge
      this.elements.menu.style.left = `${currentLeft - (menuRect.right - viewportWidth)}px`
    }
  }

  async onClick(event) {
    event.preventDefault()
    event.stopPropagation()

    if (this.open) {
      await this.opts.onBeforeClose(this)
      await this.closeMenu()
      this.opts.onAfterClose(this)
    } else {
      await this.opts.onBeforeOpen(this)
      await this.openMenu()
      this.opts.onAfterOpen(this)
    }
  }

  async openMenu() {
    if (!this.opts.multipleActive) {
      if (this.app.currentMenu) {
        if (this.opts.overlapTweens) {
          this.app.currentMenu.closeMenu()
        } else {
          await this.app.currentMenu.closeMenu()
        }
      }
      this.app.currentMenu = this
    }
    this.open = true
    this.elements.trigger.dataset.dropdownActive = ''

    // Add document click listener when menu is open.
    document.addEventListener('click', this.handleDocumentClick)

    // Show menu (display: flex, still invisible)
    set(this.elements.menu, { display: 'flex', opacity: 0 })

    // Add zero-height class for animation
    this.elements.menu.classList.add('zero-height')

    // Brief delay to let browser calculate dimensions, then remove zero-height
    await new Promise(resolve => setTimeout(resolve, 50))
    this.elements.menu.classList.remove('zero-height')

    // Position menu based on viewport
    this.positionMenu()

    // Fade in menu
    await animate(this.elements.menu, { opacity: 1 }, {
      duration: this.opts.menuOpenDuration
    }).finished

    // Animate menu items if present
    if (this.elements.menuItems.length) {
      await animate(this.elements.menuItems, { opacity: 1 }, {
        duration: this.opts.tweens.items.duration,
        delay: stagger(this.opts.tweens.items.stagger)
      }).finished
    }
  }

  async closeMenu() {
    this.app.currentMenu = null
    this.open = false
    delete this.elements.trigger.dataset.dropdownActive

    // Remove the document click listener when menu closes.
    document.removeEventListener('click', this.handleDocumentClick)

    // Animate menu items out first (reverse order, faster)
    if (this.elements.menuItems.length) {
      await animate(this.elements.menuItems, { opacity: 0 }, {
        duration: this.opts.tweens.items.duration * 0.5,
      }).finished
    }

    // Fade out menu
    await animate(this.elements.menu, { opacity: 0 }, {
      duration: this.opts.menuOpenDuration
    }).finished

    // Add zero-height class back for collapse
    this.elements.menu.classList.add('zero-height')

    // Brief delay for height animation
    await new Promise(resolve => setTimeout(resolve, 50))

    // Finally hide completely
    set(this.elements.menu, { display: 'none' })
    this.elements.menu.classList.remove('zero-height')
  }

  // Handler that checks if a click was outside the dropdown element.
  handleDocumentClick(event) {
    // If the click target is not inside the dropdown, close the menu.
    if (!this.element.contains(event.target)) {
      // this.closeMenu()
      this.onClick(event)
    }
  }

  checkForInitialOpen() {
    if (this.elements.trigger && this.elements.trigger.hasAttribute('data-dropdown-active')) {
      this.openMenu()
    }
  }
}
