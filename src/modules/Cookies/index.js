import { animate } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import * as Events from '../../events'
import { set } from '../../utils/motion-helpers'

/**
 * @module Cookies
 *
 * Cookie consent module with optional dialog and toggle button support.
 *
 * ## Consent dialog
 *
 * The traditional consent banner uses a fixed container at the bottom of the page:
 *
 * ```html
 * <div class="cookie-container">
 *   <div class="cookie-container-inner">
 *     <div class="cookie-law-text">
 *       <p>We use cookies...</p>
 *     </div>
 *     <div class="cookie-law-buttons">
 *       <button class="dismiss-cookielaw">Accept</button>
 *       <button class="refuse-cookielaw">Decline</button>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * ## Consent toggle button
 *
 * A toggle button can be placed anywhere on the page to let users change their
 * consent at any time. It can also serve as the sole consent mechanism (no
 * dialog required).
 *
 * ```html
 * <button data-cookie-consent
 *         data-cookie-consent-accept="Accept cookies"
 *         data-cookie-consent-refuse="Refuse cookies">
 * </button>
 * ```
 *
 * ### Data attributes
 *
 * | Attribute | Description |
 * |---|---|
 * | `data-cookie-consent` | Marks the element as a consent toggle |
 * | `data-cookie-consent-accept` | Label shown when user can accept (currently refused/unset) |
 * | `data-cookie-consent-refuse` | Label shown when user can retract (currently accepted) |
 * | `data-cookie-consent-status` | Set by the module: `"accepted"` or `"refused"` |
 * | `data-cookie-consent-icon` | Set on the injected icon `<span>` |
 * | `data-cookie-consent-label` | Set on the injected label `<span>` |
 *
 * ### CSS styling
 *
 * ```css
 * [data-cookie-consent-status="accepted"] [data-cookie-consent-icon] { color: green; }
 * [data-cookie-consent-status="refused"] [data-cookie-consent-icon] { color: red; }
 * ```
 *
 * ### Gettext / translation
 *
 * ```html
 * <button data-cookie-consent
 *         data-cookie-consent-accept="{{ _('Accept cookies') }}"
 *         data-cookie-consent-refuse="{{ _('Refuse cookies') }}">
 * </button>
 * ```
 *
 * ## Usage examples
 *
 * Dialog only (default):
 * ```js
 * new Cookies(app)
 * ```
 *
 * Toggle only (no dialog HTML needed):
 * ```js
 * new Cookies(app, { setCookies: (c) => { ... } })
 * ```
 *
 * Both dialog and toggle:
 * ```js
 * new Cookies(app, {
 *   onConsentChanged: (c) => {
 *     console.log(c.getCookie('COOKIES_CONSENT_STATUS'))
 *   }
 * })
 * ```
 */

/**
 * @typedef {Object} CookiesOptions
 * @property {Function} [onAccept] - Called when cookies are accepted
 * @property {Function} [onRefuse] - Called when cookies are refused
 * @property {Function} [alreadyConsented] - Called if user has already consented to cookies
 * @property {Function} [alreadyRefused] - Called if user has already refused cookies
 * @property {Function} [setCookies] - Custom function to set cookies
 * @property {Function} [showCC] - Custom function to display cookie consent dialog
 * @property {Function} [onConsentChanged] - Called after consent is toggled via the toggle button
 */

/** @type {CookiesOptions} */
const DEFAULT_OPTIONS = {
  onAccept: (c) => {
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

    c.setCookie('COOKIES_CONSENT_STATUS', 1, oneYearFromNow, '/')
    c.opts.setCookies(c)
    c.updateConsentToggles()

    const timeline = [
      [c.cc, { y: '120%' }, { duration: 0.35, ease: 'easeIn', at: 0 }],
      [c.inner, { opacity: 0 }, { duration: 0.3, ease: 'easeIn', at: 0 }]
    ]

    animate(timeline).finished.then(() => {
      c.cc.style.display = 'none'
    })
  },

  onRefuse: (c) => {
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

    c.setCookie('COOKIES_CONSENT_STATUS', 0, oneYearFromNow, '/')
    c.updateConsentToggles()

    const timeline = [
      [c.cc, { y: '120%' }, { duration: 0.35, ease: 'easeIn', at: 0 }],
      [c.inner, { opacity: 0 }, { duration: 0.3, ease: 'easeIn', at: 0 }]
    ]

    animate(timeline).finished.then(() => {
      c.cc.style.display = 'none'
    })
  },

  alreadyConsented: (c) => {
    // user has already consented to cookies. Can be used to update/load gtm etc.
  },

  alreadyRefused: (c) => {
    // user has already refused cookies.
  },

  setCookies: (c) => {},

  onConsentChanged: (c) => {},

  showCC: (c) => {
    if (c.hasCookie('COOKIES_CONSENT_STATUS')) {
      if (c.getCookie('COOKIES_CONSENT_STATUS') === '1') {
        c.opts.alreadyConsented(c)
      } else {
        c.opts.alreadyRefused(c)
      }
      return
    }

    // Set display block and reset state immediately
    c.cc.style.display = 'block'
    set(c.cc, { opacity: 1 })
    set(c.inner, { opacity: 1 })

    // Calculate timeline positions:
    // - c.cc: starts at 1s, duration 0.5s, ends at 1.5s
    // - c.text: starts at 1.15s (0.15s after cc starts), duration 0.7s, ends at 1.85s
    // - c.btns: starts at 1.5s (when cc finishes), duration 0.7s
    const timeline = [
      [c.cc, { y: ['120%', '0%'] }, { duration: 0.5, ease: 'easeOut', at: 1 }],
      [c.text, { opacity: [0, 1] }, { duration: 0.7, ease: 'easeOut', at: 1.15 }],
      [c.btns, { opacity: [0, 1] }, { duration: 0.7, ease: 'easeOut', at: 1.5 }]
    ]

    animate(timeline)
  },
}

/**
 * Cookies module for handling cookie consent
 */
export default class Cookies {
  /**
   * Create a new Cookies instance
   * @param {Object} app - Application instance
   * @param {CookiesOptions} [opts={}] - Cookies options
   */
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)

    this.cc = document.querySelector('.cookie-container')
    this.inner = document.querySelector('.cookie-container-inner')
    this.text = document.querySelector('.cookie-law-text')
    this.btns = document.querySelector('.cookie-law-buttons')
    this.btn = document.querySelector('.dismiss-cookielaw')
    this.btnRefuse = document.querySelector('.refuse-cookielaw')

    this.setupConsentToggles()

    if (!this.btn && this.consentToggles.length === 0) {
      return
    }

    if (this.btn) {
      this.app.registerCallback(Events.APPLICATION_REVEALED, () => {
        this.opts.showCC(this)
      })

      this.btn.addEventListener('click', () => {
        this.opts.onAccept(this)
      })
      if (this.btnRefuse) {
        this.btnRefuse.addEventListener('click', () => {
          this.opts.onRefuse(this)
        })
      }
    }
  }

  /**
   * Find all `[data-cookie-consent]` elements and wire them up.
   */
  setupConsentToggles() {
    this.consentToggles = [...document.querySelectorAll('[data-cookie-consent]')]

    this.consentToggles.forEach(el => {
      const icon = document.createElement('span')
      icon.setAttribute('data-cookie-consent-icon', '')

      const label = document.createElement('span')
      label.setAttribute('data-cookie-consent-label', '')

      el.appendChild(icon)
      el.appendChild(label)

      this.updateConsentToggle(el)

      el.addEventListener('click', () => {
        this.handleConsentToggle()
      })
    })
  }

  /**
   * Update a single consent toggle element to reflect current cookie state.
   * @param {Element} el - The toggle element
   */
  updateConsentToggle(el) {
    const accepted = this.getCookie('COOKIES_CONSENT_STATUS') === '1'
    const acceptText = el.getAttribute('data-cookie-consent-accept') || 'Accept cookies'
    const refuseText = el.getAttribute('data-cookie-consent-refuse') || 'Refuse cookies'

    const icon = el.querySelector('[data-cookie-consent-icon]')
    const label = el.querySelector('[data-cookie-consent-label]')

    if (accepted) {
      el.setAttribute('data-cookie-consent-status', 'accepted')
      icon.textContent = '\u2713'
      label.textContent = refuseText
    } else {
      el.setAttribute('data-cookie-consent-status', 'refused')
      icon.textContent = '\u2715'
      label.textContent = acceptText
    }
  }

  /**
   * Update all consent toggle elements.
   */
  updateConsentToggles() {
    this.consentToggles.forEach(el => {
      this.updateConsentToggle(el)
    })
  }

  /**
   * Handle a click on a consent toggle button.
   */
  handleConsentToggle() {
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

    const accepted = this.getCookie('COOKIES_CONSENT_STATUS') === '1'

    if (accepted) {
      this.setCookie('COOKIES_CONSENT_STATUS', 0, oneYearFromNow, '/')
    } else {
      this.setCookie('COOKIES_CONSENT_STATUS', 1, oneYearFromNow, '/')
      this.opts.setCookies(this)
    }

    this.updateConsentToggles()

    if (this.cc && this.cc.style.display !== 'none') {
      const timeline = [
        [this.cc, { y: '120%' }, { duration: 0.35, ease: 'easeIn', at: 0 }],
        [this.inner, { opacity: 0 }, { duration: 0.3, ease: 'easeIn', at: 0 }]
      ]

      animate(timeline).finished.then(() => {
        this.cc.style.display = 'none'
      })
    }

    this.opts.onConsentChanged(this)
  }

  /**
   * Get a cookie value by key
   * @param {string} sKey - Cookie key
   * @returns {string|null} Cookie value or null if not found
   */
  getCookie(sKey) {
    if (!sKey) {
      return null
    }
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            `(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(
              /[-.+*]/g,
              '\\$&'
            )}\\s*\\=\\s*([^;]*).*$)|^.*$`
          ),
          '$1'
        )
      ) || null
    )
  }

  /**
   * Set a cookie
   * @param {string} sKey - Cookie key
   * @param {string|number} sValue - Cookie value
   * @param {Date|string|number} vEnd - Expiration date, string date, or max age in seconds
   * @param {string} [sPath] - Cookie path
   * @param {string} [sDomain] - Cookie domain
   * @param {boolean} [bSecure] - Secure flag
   * @returns {boolean} Whether cookie was set successfully
   */
  setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
      return false
    }
    let sExpires = ''
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity
              ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
              : `; max-age=${vEnd}`
          break
        case String:
          sExpires = `; expires=${vEnd}`
          break
        case Date:
          sExpires = `; expires=${vEnd.toUTCString()}`
          break
        default:
          break
      }
    }
    document.cookie = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}${
      sDomain ? `; domain=${sDomain}` : ''
    }${sPath ? `; path=${sPath}` : ''}${bSecure ? '; secure' : ''}`
    return true
  }

  /**
   * Remove a cookie
   * @param {string} sKey - Cookie key
   * @param {string} [sPath] - Cookie path
   * @param {string} [sDomain] - Cookie domain
   * @returns {boolean} Whether cookie was removed successfully
   */
  removeCookie(sKey, sPath, sDomain) {
    if (!this.hasCookie(sKey)) {
      return false
    }
    document.cookie = `${encodeURIComponent(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${
      sDomain ? `; domain=${sDomain}` : ''
    }${sPath ? `; path=${sPath}` : ''}`
    return true
  }

  /**
   * Check if a cookie exists
   * @param {string} sKey - Cookie key
   * @returns {boolean} Whether cookie exists
   */
  hasCookie(sKey) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
      return false
    }
    return new RegExp(
      `(?:^|;\\s*)${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=`
    ).test(document.cookie)
  }

  /**
   * Get all cookie keys
   * @returns {string[]} Array of cookie keys
   */
  keys() {
    const aKeys = document.cookie
      .replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:=[^;]*)?;\s*/)
    for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx += 1) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
    }
    return aKeys
  }
}
