import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import _defaultsDeep from 'lodash.defaultsdeep'

gsap.registerPlugin(ScrollToPlugin)

const DEFAULT_OPTIONS = {
  triggerEvents: true,
  scrollDuration: 0.8,
  scrollOffsetNav: false,
  mobileMenuDelay: 800,
  openExternalInWindow: true,
  linkQuery:
    'a:not([href^="#"]):not([target="_blank"]):not([data-lightbox]):not(.noanim)',
  anchorQuery: 'a[href^="#"]:not(.noanim)',

  onAnchor: (target, links) => {
    if (links.opts.scrollOffsetNav) {
      const header = document.querySelector('header[data-nav]')
      const headerHeight = header ? header.clientHeight : 0
      target = { y: target, offsetY: headerHeight }
    }
    links.app.scrollTo(
      target,
      links.opts.scrollDuration,
      links.opts.triggerEvents
    )
  },

  onTransition: (href, app) => {
    const main = document.querySelector('main')
    const header = document.querySelector('header[data-nav]')
    const footer = document.querySelector('footer')
    const fader = document.querySelector('#fader')

    if (fader) {
      gsap.set(fader, { display: 'block', opacity: 0 })
      gsap.to(main, {
        duration: 0.8,
        y: 25,
        ease: 'power3.out',
      })

      if (header) {
        gsap.to(header, { duration: 0.2, opacity: 0 })
      }

      if (footer) {
        gsap.to(footer, { duration: 0.2, opacity: 0 })
      }

      gsap.to(fader, {
        duration: 0.2,
        opacity: 1,
        onComplete: () => {
          window.location = href
        },
      })
    } else {
      gsap.to(main, {
        duration: 0.8,
        y: 25,
        ease: 'power3.out',
      })

      if (header) {
        gsap.to(header, { duration: 0.2, opacity: 0 })
      }

      if (footer) {
        gsap.to(footer, { duration: 0.2, opacity: 0 })
      }

      gsap.to(main, {
        duration: 0.2,
        opacity: 0,
        onComplete: () => {
          window.location = href
        },
      })
    }
  },
}

export default class Links {
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)

    const links = document.querySelectorAll(this.opts.linkQuery)
    const anchors = document.querySelectorAll(this.opts.anchorQuery)

    this.bindHeroLink()
    this.bindAnchors(anchors)
    this.bindLinks(links)
  }

  bindHeroLink() {
    const el = document.querySelector('[data-link-to-content]')
    if (el) {
      el.addEventListener('click', (e) => {
        const dataTarget = document.querySelector('main')
        e.preventDefault()
        if (dataTarget) {
          this.opts.onAnchor(dataTarget, this)
        }
      })
    }
  }

  bindAnchors(anchors) {
    let wait = false
    Array.from(anchors).forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const href = anchor.getAttribute('href')
        if (href === '#') {
          return
        }

        if (document.body.classList.contains('open-menu')) {
          this.app.mobileMenu.toggleMenuClosed()
          wait = true
        }

        const move = () => {
          const dataID = href
          const dataTarget = document.querySelector(dataID)

          e.preventDefault()

          if (dataTarget) {
            this.opts.onAnchor(dataTarget, this)
            if (!dataTarget.hasAttribute('data-skip-history')) {
              history.pushState({}, '', href)
            }

            if (!this.app.header) {
              return
            }
            if (dataTarget.id === 'top') {
              return
            }
            if (this.app.header.mainOpts.ignoreForcedScroll) {
              return
            }
            if (this.app.header.mainOpts.pinOnForcedScrollEnd) {
              return
            }

            setTimeout(() => {
              this.app.header.unpin()
            }, 800)
          }
        }

        if (wait) {
          setTimeout(move, this.opts.mobileMenuDelay)
        } else {
          move()
        }
      })
    })
  }

  bindLinks(links) {
    const loadingContainer = document.querySelector('.loading-container')

    Array.from(links).forEach((link) => {
      const href = link.getAttribute('href')
      if (!href || href === '#' || href.startsWith('javascript:')) {
        return // Skip empty, anchor, or JS-based links
      }

      // Determine the normalized hostname of the current document.
      const normalizedCurrentHost = this.normalizeHostname(
        document.location.hostname
      )

      // For absolute URLs, use the URL constructor.
      let linkHostname
      try {
        linkHostname = new URL(href, document.location.href).hostname
      } catch (error) {
        // If URL construction fails, assume it's not internal.
        console.warn(`Failed to parse URL for href "${href}":`, error) // Log errors for debugging
        linkHostname = ''
      }
      const normalizedLinkHost = this.normalizeHostname(linkHostname)

      // Check if the link is internal by comparing the normalized hostnames.
      const internalLink = normalizedLinkHost === normalizedCurrentHost

      if (this.opts.openExternalInWindow && !internalLink) {
        link.setAttribute('target', '_blank')
      }

      link.addEventListener('click', (e) => {
        if (e.shiftKey || e.metaKey || e.ctrlKey) {
          return
        }

        if (loadingContainer) {
          loadingContainer.style.display = 'none'
        }

        if (internalLink) {
          e.preventDefault()
          this.opts.onTransition(href, this.app)
        }
      })
    })
  }

  normalizeHostname(hostname) {
    return hostname.replace(/^www\./, '')
  }
}
