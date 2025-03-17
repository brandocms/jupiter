import { gsap } from 'gsap/all'
import _defaultsDeep from 'lodash.defaultsdeep'
import Dom from '../Dom'

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
    this.timeline = gsap.timeline({ paused: true, reversed: true })

    this.elements.trigger = Dom.find(this.element, this.opts.selectors.trigger)
    if (this.elements.trigger.hasAttribute('data-dropdown-target')) {
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
    this.timeline
      .set(this.elements.menu, { display: 'none', clearProps: 'height' })
      .set(this.elements.menu, { display: 'flex', opacity: 0 })
      .from(
        this.elements.menu,
        {
          className: `${this.elements.menu.className} zero-height`,
          duration: 0.1,
        },
        'open'
      )
      .to(
        this.elements.menu,
        {
          height: 'auto',
          duration: 0.1,
        },
        'open'
      )
      .call(() => {
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
          // Shift right by the amount it’s off the left edge
          this.elements.menu.style.left = `${currentLeft - menuRect.left}px`
        } else if (menuRect.right > viewportWidth) {
          // Shift left by the amount it’s off the right edge
          this.elements.menu.style.left = `${currentLeft - (menuRect.right - viewportWidth)}px`
        }
      })
      .to(this.elements.menu, { opacity: 1 })

    if (this.elements.menuItems.length) {
      this.timeline.from(
        this.elements.menuItems,
        this.opts.tweens.items,
        'open+=.1'
      )
    }

    if (!this.elements.trigger) {
      return
    }
    this.elements.trigger.addEventListener('click', this.onClick.bind(this))
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
        this.app.currentMenu.closeMenu()
      }
      this.app.currentMenu = this
    }
    this.open = true
    this.elements.trigger.dataset.dropdownActive = ''

    // Add document click listener when menu is open.
    document.addEventListener('click', this.handleDocumentClick)

    if (this.timeline.reversed()) {
      await this.timeline.play()
    } else {
      await this.timeline.reverse()
    }
  }

  async closeMenu() {
    this.app.currentMenu = null
    this.open = false
    delete this.elements.trigger.dataset.dropdownActive

    // Remove the document click listener when menu closes.
    document.removeEventListener('click', this.handleDocumentClick)

    if (this.timeline.reversed()) {
      await this.timeline.play()
    } else {
      await this.timeline.reverse()
    }
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
    if (this.elements.trigger.hasAttribute('data-dropdown-active')) {
      this.openMenu()
    }
  }
}
