import { animate, stagger } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import * as Events from '../../events'
import { set, clearProps } from '../../utils/motion-helpers'

/**
 * @typedef {Object} MobileMenuOptions
 * @property {string} [logoColor='#000'] - Color for logo when menu is open
 * @property {string} [logoPathSelector='svg path'] - Selector for logo SVG paths
 * @property {string} [contentSelector='section'] - Selector for menu content
 * @property {string} [liSelector='li'] - Selector for menu items
 * @property {string} [hamburgerColor='#000'] - Color for hamburger icon
 * @property {Function|null} [onResize=null] - Called when window is resized
 * @property {Function} [openTween] - Animation for opening menu
 * @property {Function} [closeTween] - Animation for closing menu
 */

/** @type {MobileMenuOptions} */
const DEFAULT_OPTIONS = {
  logoColor: '#000',
  logoPathSelector: 'svg path',
  contentSelector: 'section',
  liSelector: 'li',
  hamburgerColor: '#000',

  onResize: null,
  openTween: async (m) => {
    m.hamburger.classList.toggle('is-active')
    document.body.classList.toggle('open-menu')

    // Set initial state for bg
    set(m.bg, { x: '0%', opacity: 0, height: window.innerHeight })

    // Parallel animations at start (0-0.35s)
    const timeline = [
      [m.bg, { opacity: 1 }, { duration: 0.35, easing: 'ease-in', at: 0 }],
      [m.logo, { opacity: 0 }, { duration: 0.35, easing: 'ease-out', at: 0 }],
      [m.header, { backgroundColor: 'transparent' }, { duration: 0.55, easing: 'ease-out', at: 0 }]
    ]

    await animate(timeline).finished

    // Immediate settings
    m.nav.style.gridTemplateRows = 'auto 1fr'
    set(m.nav, { height: window.innerHeight })
    Array.from(m.content).forEach(el => set(el, { display: 'block' }))
    Array.from(m.logoPath).forEach(path => path.setAttribute('fill', m.opts.logoColor))
    set(m.logo, { x: '3%' })

    // Staggered li animations and logo animation in parallel
    const lisAnimation = animate(
      m.lis,
      { opacity: [0, 1], x: [20, 0] },
      { duration: 1, easing: 'ease-out', delay: stagger(0.05) }
    )

    const logoAnimation = animate(
      m.logo,
      { opacity: 1, x: ['3%', '0%'] },
      { duration: 0.55, easing: 'ease-in-out', at: 0.15 }
    )

    await Promise.all([lisAnimation.finished, logoAnimation.finished])

    m._emitMobileMenuOpenEvent()
  },

  closeTween: async (m) => {
    document.body.classList.toggle('open-menu')
    m.hamburger.classList.toggle('is-active')

    // Fade out logo
    await animate(m.logo, { opacity: 0, x: '5%' }, { duration: 0.2, easing: 'ease-out' }).finished

    // Clear logo fill
    Array.from(m.logoPath).forEach(path => path.removeAttribute('fill'))

    // Stagger out lis and slide bg in parallel
    const lisAnimation = animate(
      m.lis,
      { opacity: 0, x: 20 },
      { duration: 0.5, easing: 'ease-out', delay: stagger(0.04) }
    )

    // bg animation starts 0.3s before lis finish
    // lis duration is 0.5s + last stagger delay, so starts around 0.2s
    setTimeout(() => {
      animate(m.bg, { x: '100%' }, { duration: 0.25, easing: 'ease-in' })
    }, 200)

    await lisAnimation.finished

    // Cleanup
    clearProps(m.nav, 'height')
    m._emitMobileMenuClosedEvent()
    Array.from(m.content).forEach(el => set(el, { display: 'none' }))
    m.nav.style.gridTemplateRows = 'auto'
    Array.from(m.lis).forEach(li => clearProps(li, 'opacity'))

    // Fade logo back in
    await animate(m.logo, { opacity: 1 }, { duration: 0.35, easing: 'ease-in' }).finished
  },
}

/**
 * MobileMenu component for mobile navigation menu
 */
export default class MobileMenu {
  /**
   * Create a new MobileMenu instance
   * @param {Object} app - Application instance
   * @param {MobileMenuOptions} [opts={}] - MobileMenu options
   */
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)

    this.open = false
    this.header = document.querySelector('header')
    this.bg = this.header.querySelector('.mobile-bg')
    this.logo = this.header.querySelector('figure.brand')
    this.logoPath = this.logo
      ? this.logo.querySelectorAll(this.opts.logoPathSelector)
      : null
    this.menuButton = this.header.querySelector('figure.menu-button')
    this.hamburger = this.menuButton
      ? this.menuButton.querySelector('.hamburger')
      : null
    this.hamburgerInner = this.menuButton
      ? this.menuButton.querySelector('.hamburger-inner')
      : null
    this.content = this.header.querySelectorAll(this.opts.contentSelector)
    this.lis = this.header.querySelectorAll(this.opts.liSelector)
    this.nav = this.header.querySelector('nav')

    if (this.hamburger) {
      this.hamburger.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.toggleMenu()
      })
    }

    if (this.opts.onResize) {
      window.addEventListener(Events.APPLICATION_RESIZE, () => {
        this.opts.onResize(this)
      })
    }
  }

  toggleMenu() {
    if (document.body.classList.contains('open-menu')) {
      this.toggleMenuClosed()
    } else {
      this.toggleMenuOpen()
    }
  }

  toggleMenuClosed() {
    // CLOSING MENU
    this.opts.closeTween(this)
    this.open = false
  }

  toggleMenuOpen() {
    // OPENING MENU
    this.opts.openTween(this)
    this.open = true
  }

  _emitMobileMenuOpenEvent() {
    const mobileMenuOpenEvent = new window.CustomEvent(
      Events.APPLICATION_MOBILE_MENU_OPEN
    )
    window.dispatchEvent(mobileMenuOpenEvent)
  }

  _emitMobileMenuClosedEvent() {
    const mobileMenuClosedEvent = new window.CustomEvent(
      Events.APPLICATION_MOBILE_MENU_CLOSED
    )
    window.dispatchEvent(mobileMenuClosedEvent)
  }
}
