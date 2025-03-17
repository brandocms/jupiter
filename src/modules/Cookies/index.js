import { gsap } from 'gsap/all'
import _defaultsDeep from 'lodash.defaultsdeep'
import * as Events from '../../events'

/**
 * @typedef {Object} CookiesOptions
 * @property {Function} [onAccept] - Called when cookies are accepted
 * @property {Function} [onRefuse] - Called when cookies are refused
 * @property {Function} [alreadyConsented] - Called if user has already consented to cookies
 * @property {Function} [alreadyRefused] - Called if user has already refused cookies
 * @property {Function} [setCookies] - Custom function to set cookies
 * @property {Function} [showCC] - Custom function to display cookie consent dialog
 */

/** @type {CookiesOptions} */
const DEFAULT_OPTIONS = {
  onAccept: (c) => {
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

    const timeline = gsap.timeline()
    c.setCookie('COOKIES_CONSENT_STATUS', 1, oneYearFromNow, '/')
    c.opts.setCookies(c)

    timeline
      .to(c.cc, { duration: 0.35, y: '120%', ease: 'power3.in' }, '0')
      .to(c.inner, { duration: 0.3, opacity: 0, ease: 'power3.in' }, '0')
      .set(c.cc, { display: 'none' })
  },

  onRefuse: (c) => {
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

    const timeline = gsap.timeline()
    c.setCookie('COOKIES_CONSENT_STATUS', 0, oneYearFromNow, '/')

    timeline
      .to(c.cc, { duration: 0.35, y: '120%', ease: 'power3.in' }, '0')
      .to(c.inner, { duration: 0.3, opacity: 0, ease: 'power3.in' }, '0')
      .set(c.cc, { display: 'none' })
  },

  alreadyConsented: (c) => {
    // user has already consented to cookies. Can be used to update/load gtm etc.
  },

  alreadyRefused: (c) => {
    // user has already refused cookies.
  },

  setCookies: (c) => {},

  showCC: (c) => {
    if (c.hasCookie('COOKIES_CONSENT_STATUS')) {
      if (c.getCookie('COOKIES_CONSENT_STATUS') === '1') {
        c.opts.alreadyConsented(c)
      } else {
        c.opts.alreadyRefused(c)
      }
      return
    }

    const timeline = gsap.timeline()

    timeline
      .fromTo(
        c.cc,
        {
          duration: 0.5,
          y: '120%',
          display: 'block',
        },
        {
          duration: 0.5,
          y: '0%',
          delay: '0.5',
          ease: 'power3.out',
        },
        '0.5'
      )
      .fromTo(
        c.text,
        {
          duration: 0.7,
          opacity: 0,
        },
        {
          duration: 0.7,
          opacity: 1,
          ease: 'power3.out',
        },
        '-=0.35'
      )
      .fromTo(
        c.btns,
        {
          duration: 0.7,
          opacity: 0,
        },
        {
          duration: 0.7,
          opacity: 1,
          ease: 'power3.out',
        },
        '-=0.35'
      )
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

    if (!this.btn) {
      return
    }

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
