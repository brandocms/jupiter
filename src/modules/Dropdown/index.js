import { gsap } from 'gsap'
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
    menuItems: '[data-dropdown-menu] > li'
  },
  tweens: {
    items: {
      duration: 0.2,
      autoAlpha: 0,
      stagger: 0.03
    }
  }
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
      const dropdownTarget = this.elements.trigger.getAttribute('data-dropdown-target')
      this.elements.menu = Dom.find(dropdownTarget)
    } else {
      this.elements.menu = Dom.find(this.element, this.opts.selectors.menu)
    }
    this.elements.menuItems = Dom.all(this.elements.menu, this.opts.selectors.menuItems)
    this.initialize()
  }

  initialize() {
    this.timeline
      .set(this.elements.menu, { display: 'none', clearProps: 'height' })
      .set(this.elements.menu, { display: 'flex', opacity: 0 })
      .from(
        this.elements.menu,
        {
          duration: 0.1,
          className: `${this.elements.menu.className} zero-height`
        },
        'open'
      )
      .to(
        this.elements.menu,
        {
          height: 'auto',
          duration: 0.1
        },
        'open'
      )
      .call(() => {
        // check if we have space
        const subMenuBound = this.elements.menu.getBoundingClientRect()
        const windowHeight = window.innerHeight

        const subMenuY = subMenuBound.y
        const subMenuHeight = subMenuBound.height

        Dom.setCSSVar('dropdown-menu-height', `${subMenuHeight}px`, this.elements.menu)

        if (subMenuHeight + subMenuY > windowHeight) {
          this.elements.menu.setAttribute('data-dropdown-placement', 'top')
        } else {
          this.elements.menu.setAttribute('data-dropdown-placement', 'bottom')
        }
      })
      .to(this.elements.menu, { opacity: 1 })
      .from(this.elements.menuItems, this.opts.tweens.items, 'open+=.1')

    if (!this.elements.trigger) {
      return
    }
    this.elements.trigger.addEventListener('click', this.onClick.bind(this))
  }

  onClick(event) {
    event.preventDefault()
    event.stopPropagation()

    if (this.open) {
      delete this.elements.trigger.dataset.dropdownActive
      this.closeMenu()
    } else {
      this.elements.trigger.dataset.dropdownActive = ''
      this.openMenu()
    }
  }

  openMenu() {
    if (!this.opts.multipleActive) {
      if (this.app.currentMenu) {
        this.app.currentMenu.closeMenu()
      }
      this.app.currentMenu = this
    }
    this.open = true

    if (this.timeline.reversed()) {
      this.timeline.play()
    } else {
      this.timeline.reverse()
    }
  }

  closeMenu() {
    this.app.currentMenu = null
    this.open = false

    if (this.timeline.reversed()) {
      this.timeline.play()
    } else {
      this.timeline.reverse()
    }
  }
}
