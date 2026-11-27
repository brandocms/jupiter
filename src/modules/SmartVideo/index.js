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

const HLS_TYPE = 'application/vnd.apple.mpegurl'
const HLS_PLAYLIST = /\.m3u8(\?|$)/

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
    /**
     * A wrapper's source, once set: null, or while hls.js loads, a promise.
     * @type {Map<HTMLElement, Promise<void>|null>}
     */
    this.sources = new Map()
    /**
     * The hls.js players of the streams the browser cannot play itself
     * @type {Map<HTMLElement, { destroy(): void }>}
     */
    this.streams = new Map()
    /**
     * Wrappers to play once hls.js has loaded
     * @type {Set<HTMLElement>}
     */
    this.waiting = new Set()
    this.events = new AbortController()
    this.loadObserver = new IntersectionObserver(this.handleLoadEntries.bind(this), {
      rootMargin: this.opts.loadRootMargin,
    })
    this.playObserver = new IntersectionObserver(this.handlePlayEntries.bind(this))

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

    // The attribute would play the video wherever it is on the page, so it
    // goes, and `data-autoplay` keeps the intent for a later instance.
    if (video.autoplay || 'autoplay' in video.dataset) {
      video.dataset.autoplay = ''
      video.autoplay = false
      video.muted = true
      this.playObserver.observe(el)
    }

    el.addEventListener('click', event => {
      const clicked = /** @type {Element} */ (event.target)
      if (clicked === video && video.controls) return
      if (!clicked.closest('.video-play-button, video')) return
      if (video.paused) this.play(el)
      else this.pause(el)
    }, { signal })

    if (el.hasAttribute('data-preload')) this.loadObserver.observe(el)
    else this.load(el)
  }

  /**
   * Give a wrapper's video its source and reveal the wrapper.
   * @param {HTMLElement} el - The `[data-smart-video]` wrapper
   * @returns {Promise<void>|null} A promise while hls.js loads for the video
   */
  load(el) {
    this.loadObserver.unobserve(el)
    el.setAttribute('data-revealed', '')
    if (!this.sources.has(el)) {
      const source = this.setSource(el, this.videos.get(el))
      // hls.js failed to load (the browser keeps the failed import until
      // a reload): resolve to false, so play() does not start a video
      // without a source.
      this.sources.set(el, source && source.catch(() => false))
    }
    return this.sources.get(el)
  }

  /**
   * @param {HTMLElement} el - The `[data-smart-video]` wrapper
   * @param {HTMLVideoElement} video - The video inside it
   * @returns {Promise<void>|null}
   */
  setSource(el, video) {
    const src = video.getAttribute('src') || video.dataset.src || el.dataset.src
    if (!src) return null
    if (!HLS_PLAYLIST.test(src) || video.canPlayType(HLS_TYPE)) {
      if (!video.hasAttribute('src')) video.src = src
      return null
    }
    return this.attachStream(el, video, src)
  }

  /**
   * Play an HLS playlist through hls.js, which is loaded only for it.
   * @param {HTMLElement} el - The `[data-smart-video]` wrapper
   * @param {HTMLVideoElement} video - The video inside it
   * @param {string} src - The playlist
   */
  async attachStream(el, video, src) {
    const { default: Hls } = await import('hls.js')
    // destroy() may have run while hls.js loaded.
    if (this.videos.get(el) !== video) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      this.streams.set(el, hls)
      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (!video.hasAttribute('src')) {
      video.src = src
    }
  }

  /**
   * Load and play a wrapper's video.
   * @param {HTMLElement} el - The `[data-smart-video]` wrapper
   */
  play(el) {
    const video = this.videos.get(el)
    // A pause before playback starts rejects the promise.
    const start = () => video.play().catch(() => {})
    const attaching = this.load(el)
    if (!attaching) {
      start()
      return
    }
    this.waiting.add(el)
    attaching.then(attached => {
      if (this.waiting.delete(el) && attached !== false) start()
    })
  }

  /**
   * Pause a wrapper's video, or keep it from starting once hls.js has loaded.
   * @param {HTMLElement} el - The `[data-smart-video]` wrapper
   */
  pause(el) {
    this.waiting.delete(el)
    this.videos.get(el).pause()
  }

  handleLoadEntries(entries) {
    for (const entry of entries) {
      const el = /** @type {HTMLElement} */ (entry.target)
      if (entry.isIntersecting && this.videos.has(el)) this.load(el)
    }
  }

  handlePlayEntries(entries) {
    for (const entry of entries) {
      const el = /** @type {HTMLElement} */ (entry.target)
      if (!this.videos.has(el)) continue
      if (entry.isIntersecting) this.play(el)
      else this.pause(el)
    }
  }

  /**
   * Stop observing, remove the click handlers and destroy the hls.js players.
   */
  destroy() {
    this.events.abort()
    this.loadObserver.disconnect()
    this.playObserver.disconnect()
    for (const hls of this.streams.values()) hls.destroy()
    this.streams.clear()
    this.waiting.clear()
    this.sources.clear()
    this.videos.clear()
  }
}
