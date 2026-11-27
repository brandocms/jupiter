/**
 * SMART VIDEO
 *
 * Loads, reveals and plays the `[data-smart-video]` wrappers Brando renders.
 *
 * ## Example
 *
 *    app.smartVideo = new SmartVideo(app)
 */

import applyDefaults from '../../utils/applyDefaults'

/**
 * @typedef {Object} SmartVideoOptions
 * @property {string} [selector='[data-smart-video]'] - Selector for the video wrappers
 * @property {HTMLElement|null} [target=null] - Container to find the wrappers in. Defaults to document.body
 * @property {string} [loadRootMargin='300px 0px'] - How near the viewport a lazy video gets its source
 */

/** @type {SmartVideoOptions} */
const DEFAULT_OPTIONS = {
  selector: '[data-smart-video]',
  target: null,
  loadRootMargin: '300px 0px',
}

// An autoplay video starts just before it scrolls into view.
const PLAY_ROOT_MARGIN = '10% 0px'

/**
 * SmartVideo class for lazy loading and in-view playback of videos
 */
export default class SmartVideo {
  /**
   * Create a new SmartVideo instance
   * @param {Object} app - Application instance
   * @param {SmartVideoOptions} [opts={}] - SmartVideo options
   */
  constructor(app, opts = {}) {
    this.app = app
    this.opts = applyDefaults(opts, DEFAULT_OPTIONS)
    this.target = this.opts.target || document.body
    /** @type {Map<HTMLElement, HTMLVideoElement>} */
    this.videos = new Map()
    this.events = new AbortController()
    this.loadObserver = new IntersectionObserver(this.handleLoadEntries.bind(this), {
      rootMargin: this.opts.loadRootMargin,
    })
    this.playObserver = new IntersectionObserver(this.handlePlayEntries.bind(this), {
      rootMargin: PLAY_ROOT_MARGIN,
    })

    for (const el of this.target.querySelectorAll(this.opts.selector)) {
      const video = el.querySelector('video')
      if (video) this.initializeVideo(/** @type {HTMLElement} */ (el), video)
    }
  }

  /**
   * @param {HTMLElement} el - The `[data-smart-video]` wrapper
   * @param {HTMLVideoElement} video - The video inside it
   */
  initializeVideo(el, video) {
    const { signal } = this.events
    this.videos.set(el, video)

    video.addEventListener('play', () => el.setAttribute('data-playing', ''), { signal })
    video.addEventListener('pause', () => el.removeAttribute('data-playing'), { signal })

    if (video.autoplay) {
      // The attribute would play the video wherever it is on the page.
      video.autoplay = false
      video.muted = true
      this.playObserver.observe(el)
    }

    if (el.querySelector('.video-play-button')) {
      el.addEventListener('click', event => {
        const clicked = /** @type {Element} */ (event.target)
        if (clicked === video && video.controls) return
        if (!clicked.closest('.video-play-button, video')) return
        if (video.paused) this.play(el)
        else video.pause()
      }, { signal })
    }

    if (el.hasAttribute('data-preload')) this.loadObserver.observe(el)
    else this.load(el)
  }

  /**
   * Give a wrapper's video its source and reveal the wrapper.
   * @param {HTMLElement} el - The `[data-smart-video]` wrapper
   */
  load(el) {
    const video = this.videos.get(el)
    this.loadObserver.unobserve(el)
    const src = video.dataset.src || el.dataset.src
    if (!video.hasAttribute('src') && src) video.src = src
    el.setAttribute('data-revealed', '')
  }

  /**
   * Load and play a wrapper's video.
   * @param {HTMLElement} el - The `[data-smart-video]` wrapper
   */
  play(el) {
    this.load(el)
    // A pause before playback starts rejects the promise.
    this.videos.get(el).play().catch(() => {})
  }

  handleLoadEntries(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) this.load(/** @type {HTMLElement} */ (entry.target))
    }
  }

  handlePlayEntries(entries) {
    for (const entry of entries) {
      const el = /** @type {HTMLElement} */ (entry.target)
      if (entry.isIntersecting) this.play(el)
      else this.videos.get(el).pause()
    }
  }

  /**
   * Stop observing and remove the click handlers.
   */
  destroy() {
    this.events.abort()
    this.loadObserver.disconnect()
    this.playObserver.disconnect()
    this.videos.clear()
  }
}
