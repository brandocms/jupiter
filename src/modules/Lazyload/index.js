import applyDefaults from '../../utils/applyDefaults'
import dispatchElementEvent from '../../utils/dispatchElementEvent'
import imagesAreLoaded from '../../utils/imagesAreLoaded'
import * as Events from '../../events'

/**
 * @typedef {Object} IntersectionObserverConfig
 * @property {string} [rootMargin] - Margin around the root
 * @property {number} [threshold] - Threshold for intersection
 */

/**
 * @typedef {Object} LazyloadOptions
 * @property {IntersectionObserverConfig} [revealIntersectionObserverConfig] - Configuration for the reveal intersection observer
 * @property {IntersectionObserverConfig} [loadIntersectionObserverConfig] - Configuration for the load intersection observer
 * @property {boolean} [useNativeLazyloadIfAvailable=true] - Whether to use native lazyloading if available
 * @property {number} [minSize=40] - Minimum size for auto sizing
 * @property {boolean} [updateSizes=true] - Whether to update sizes attribute
 * @property {boolean} [registerCallback=true] - Whether to register a callback for APPLICATION_REVEALED event
 * @property {HTMLElement|null} [target=null] - Container element to scope lazyloading to. Defaults to document.body
 */

const REVEAL_CONFIG = { rootMargin: '0px 100px 0px 100px', threshold: 0 }
const LOAD_CONFIG = { rootMargin: '850px 500px 850px 500px', threshold: 0 }

/** @type {LazyloadOptions} */
const DEFAULT_OPTIONS = {
  useNativeLazyloadIfAvailable: true,
  minSize: 40,
  updateSizes: true,
  registerCallback: true,
  target: null,
}

function matchingElements(root, selector) {
  return root.matches?.(selector) ? [root] : root.querySelectorAll(selector)
}

function setSize(img, width) {
  const sizes = width + 'px'
  if (img.getAttribute('sizes') !== sizes) img.setAttribute('sizes', sizes)
  if (img.parentElement?.tagName !== 'PICTURE') return
  for (const source of img.parentElement.querySelectorAll('source')) {
    if (source.getAttribute('sizes') !== sizes) source.setAttribute('sizes', sizes)
  }
}

function copyImageSource(element, attribute) {
  const value = element.getAttribute('data-' + attribute)
  if (value === null || value === element.getAttribute(attribute)) return false
  element.setAttribute(attribute, value)
  return true
}

/**
 * Lazyload class for handling image lazy loading
 */
export default class Lazyload {
  /**
   * Create a new Lazyload instance
   * @param {Object} app - Application instance
   * @param {LazyloadOptions} [opts={}] - Lazyload options
   */
  constructor(app, opts = {}) {
    this.app = app
    this.opts = applyDefaults(opts, DEFAULT_OPTIONS)
    // A consumer can override individual observer options and pass a custom root.
    for (const [key, config] of [
      ['revealIntersectionObserverConfig', REVEAL_CONFIG],
      ['loadIntersectionObserverConfig', LOAD_CONFIG],
    ]) {
      if (this.opts[key] === undefined) Reflect.set(this.opts, key, { ...config })
      else if (this.opts[key] !== null) applyDefaults(this.opts[key], config)
    }
    this.target = this.opts.target || document.body
    this.sectionObservers = new Set()
    this.resizePending = new Map()
    this.rafId = null

    this.native = this.opts.useNativeLazyloadIfAvailable && 'loading' in HTMLImageElement.prototype
    this.observed = new WeakSet()
    this.sized = new WeakSet()
    this.pendingReveals = new Set()
    this.loadingPictures = new WeakMap()
    this.events = new AbortController()

    this.initialize()

    if (this.revealObserver && this.opts.registerCallback) {
      if (this.app.state.revealed) {
        this.watch()
      } else {
        this.unsubscribe = this.app.registerCallback(Events.APPLICATION_REVEALED, () => {
          this.watch()
        })
      }
    }
  }

  watch() {
    if (this.revealObserver) this.initObserver(this.revealObserver, false)
  }

  /**
   * Observe new lazyload elements within a container
   * Handles both [data-ll-image] and [data-ll-srcset] elements
   * Useful for dynamically added content (e.g., Looper clones)
   * @param {HTMLElement|HTMLElement[]|NodeList} elements - Container element(s) or lazyload element(s) to observe
   */
  observe(elements) {
    const roots = elements instanceof NodeList || Array.isArray(elements) ? elements : [elements]
    for (const root of roots) {
      this.initializeResizeObserver(root)
      if (this.native) {
        this.observeNative(root)
        continue
      }
      for (const img of matchingElements(root, '[data-ll-image]')) this.observeImage(img)
      for (const picture of matchingElements(root, '[data-ll-srcset]')) {
        if (this.observed.has(picture) || picture.hasAttribute('data-ll-srcset-ready')) continue
        this.preparePicture(picture, this.nextPictureIndex++)
        this.loadObserver.observe(picture)
        this.revealObserver.observe(picture)
      }
    }
  }

  observeNative(root) {
    for (const item of matchingElements(root, '[data-ll-srcset], [data-ll-image]')) {
      if (this.observed.has(item)) continue
      this.observed.add(item)
      if (item.hasAttribute('data-ll-srcset')) {
        this.swapPicture(item)
      } else {
        item.loading = 'lazy'
        this.swapImage(item)
      }
    }
  }

  preparePicture(picture, index) {
    this.observed.add(picture)
    picture.setAttribute('data-ll-srcset-initialized', '')
    for (const img of picture.querySelectorAll('img:not([data-ll-loaded])')) {
      img.setAttribute('data-ll-blurred', '')
      img.setAttribute('data-ll-idx', index)
      img.style.setProperty('--ll-idx', index)
    }
  }

  observeImage(img) {
    if (this.observed.has(img) || img.hasAttribute('data-ll-loaded')) return
    this.observed.add(img)
    img.setAttribute('data-ll-blurred', '')
    img.setAttribute('data-ll-idx', this.nextImageIndex)
    img.style.setProperty('--ll-idx', this.nextImageIndex++)
    this.imageObserver.observe(img)
  }

  initialize() {
    this.initializeResizeObserver(this.target)
    if (this.native) {
      this.observeNative(this.target)
      return
    }

    this.lazyPictures = this.target.querySelectorAll('[data-ll-srcset]')

    this.loadObserver = new IntersectionObserver(
      this.handleLoadEntries.bind(this),
      this.opts.loadIntersectionObserverConfig
    )

    this.revealObserver = new IntersectionObserver(
      this.handleRevealEntries.bind(this),
      this.opts.revealIntersectionObserverConfig
    )

    this.initObserver(this.loadObserver)

    // look for lazyload sections. if we find, add an observer that triggers
    // lazyload for all images within.
    this.initializeSections()

    // Legacy images and pictures use the same load margin.
    this.imageObserver = this.loadObserver
    this.lazyImages = this.target.querySelectorAll('[data-ll-image]')
    this.nextImageIndex = this.lazyImages.length
    this.nextPictureIndex = this.lazyPictures.length
    for (const img of this.lazyImages) this.observeImage(img)
  }

  initObserver(observer, setAttrs = true) {
    this.lazyPictures.forEach((picture, idx) => {
      if (setAttrs) this.preparePicture(picture, idx)
      observer.observe(picture)
    })
  }

  /**
   * Force load all lazyload elements within a container, bypassing intersection observers.
   * Used by modules like Looper when dynamically adding content that needs immediate loading.
   * @param {HTMLElement} [$container=document.body] - Container to search for lazyload elements
   * @param {Object} [options]
   * @param {boolean} [options.reveal=true] - Whether to also reveal (set data-ll-loaded) after loading
   */
  forceLoad($container = document.body, { reveal = true } = {}) {
    // Set the responsive candidate width before assigning sources.
    this.initializeResizeObserver($container, true)
    for (const img of $container.querySelectorAll('[data-ll-image]')) this.swapImage(img)
    for (const picture of $container.querySelectorAll('[data-ll-srcset]')) {
      this.loadPicture(picture)
      if (reveal) this.revealPicture(picture)
    }
  }

  initializeResizeObserver(root = this.target, refresh = false) {
    if (!this.opts.updateSizes) return
    const candidates = matchingElements(root, '[data-sizes="auto"]')
    if (!candidates.length) return
    const images = Array.from(candidates).filter(img => refresh || !this.sized.has(img))
    if (!images.length) return

    if (!this.sizeObserver) {
      this.sizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          const width = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width
          const size = Math.max(this.opts.minSize, Math.round(width))
          if (entry.target.getAttribute('sizes') === size + 'px') this.resizePending.delete(entry.target)
          else this.resizePending.set(entry.target, size)
        }
        if (this.resizePending.size && this.rafId === null) {
          this.rafId = requestAnimationFrame(() => this.flushSizeUpdates())
        }
      })
    }
    // Read all slot widths before writing sizes or assigning any srcset. Otherwise
    // the browser can start a viewport-width request before the first resize delivery.
    const widths = images.map(img => Math.max(this.opts.minSize, img.offsetWidth))
    images.forEach((img, index) => {
      setSize(img, widths[index])
      this.sized.add(img)
      this.sizeObserver.observe(img)
    })
  }

  flushSizeUpdates() {
    this.resizePending.forEach((width, img) => setSize(img, width))
    this.resizePending.clear()
    this.rafId = null
  }

  initializeSections() {
    const sections = this.target.querySelectorAll('[data-lazyload-section]')
    if (!sections.length) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting && entry.intersectionRatio <= 0) continue
        const section = entry.target
        observer.unobserve(section)
        imagesAreLoaded(section, true).then(() => {
          if (!this.events.signal.aborted) dispatchElementEvent(section, Events.SECTION_LAZYLOADED)
        })
        for (const picture of section.querySelectorAll('picture')) {
          this.loadPicture(picture)
          this.loadObserver.unobserve(picture)
        }
      }
    }, this.opts.loadIntersectionObserverConfig)
    this.sectionObservers.add(observer)
    for (const section of sections) observer.observe(section)
  }

  handleLoadEntries(entries) {
    entries.forEach(item => {
      if (item.isIntersecting || item.intersectionRatio > 0) {
        const target = item.target
        if (target.hasAttribute('data-ll-image')) this.swapImage(target)
        else this.loadPicture(target)
        this.loadObserver.unobserve(target)
      }
    })
  }

  handleRevealEntries(entries) {
    for (const entry of entries) {
      if (!entry.isIntersecting && entry.intersectionRatio <= 0) continue
      const picture = entry.target
      if (picture.hasAttribute('data-ll-srcset-ready')) {
        this.revealPicture(picture)
        this.revealObserver.unobserve(picture)
      } else {
        this.waitForPicture(picture)
      }
    }
  }

  waitForPicture(picture) {
    if (this.pendingReveals.has(picture)) return
    this.pendingReveals.add(picture)
    this.srcsetReadyObserver ??= new MutationObserver(records => {
      for (const { target } of records) {
        if (target.hasAttribute('data-ll-srcset-ready') && this.pendingReveals.delete(target)) {
          this.revealPicture(target)
          this.revealObserver.unobserve(target)
        }
      }
      if (!this.pendingReveals.size) this.srcsetReadyObserver.disconnect()
    })
    this.srcsetReadyObserver.observe(picture, { attributeFilter: ['data-ll-srcset-ready'] })
  }

  loadPicture(picture) {
    const img = picture.querySelector('img')
    if (!img) return
    let changed = false
    for (const source of picture.querySelectorAll('source[data-srcset]')) {
      if (copyImageSource(source, 'srcset')) changed = true
      if (!source.hasAttribute('data-ll-ready')) source.setAttribute('data-ll-ready', '')
    }
    if (copyImageSource(img, 'srcset')) changed = true
    if (img.dataset.src && copyImageSource(img, 'src')) changed = true

    // A section, an individual observer and forceLoad can reach the same picture.
    const pending = this.loadingPictures.get(img)
    if (!changed && (pending || picture.hasAttribute('data-ll-srcset-ready'))) return
    if (pending) img.removeEventListener('load', pending)
    const ready = () => {
      this.loadingPictures.delete(img)
      img.removeAttribute('data-ll-placeholder')
      img.removeAttribute('data-ll-blurred')
      img.removeAttribute('data-ll-loading')
      img.setAttribute('data-ll-ready', '')
      picture.setAttribute('data-ll-srcset-ready', '')
    }
    img.setAttribute('data-ll-loading', '')
    if (img.complete) ready()
    else {
      this.loadingPictures.set(img, ready)
      img.addEventListener('load', ready, { once: true, signal: this.events.signal })
    }
    dispatchElementEvent(img, Events.IMAGE_LAZYLOADED)
  }

  /**
   * Reveal a picture element by setting `data-ll-loaded` on its img child.
   * @param {HTMLElement} picture - The picture element to reveal
   */
  revealPicture(picture) {
    const img = picture.querySelector('img')
    if (!img || img.hasAttribute('data-ll-loaded')) return
    img.setAttribute('data-ll-loaded', '')
    dispatchElementEvent(img, Events.IMAGE_REVEALED)
  }

  /**
   * Swap source attributes on a picture element for the native lazyload path.
   * Copies data-srcset to srcset on all sources and the img element.
   * @param {HTMLElement} picture - The picture element to swap
   */
  swapPicture(picture) {
    const img = picture.querySelector('img')
    if (!img) return
    if (this.native) img.loading = 'lazy'
    for (const source of picture.querySelectorAll('source[data-srcset]')) copyImageSource(source, 'srcset')
    copyImageSource(img, 'srcset')
    if (img.dataset.src) copyImageSource(img, 'src')
    this.observed.add(img)
    img.setAttribute('data-ll-loaded', '')
    dispatchElementEvent(img, Events.IMAGE_LAZYLOADED)
  }

  lazyloadImages(entries) {
    entries.forEach(item => {
      if (item.isIntersecting || item.intersectionRatio > 0) {
        const image = item.target
        this.swapImage(image)
        this.imageObserver.unobserve(image)
      }
    })
  }

  swapImage(image) {
    if (image.dataset.src) copyImageSource(image, 'src')
    image.setAttribute('data-ll-loaded', '')
    dispatchElementEvent(image, Events.IMAGE_LAZYLOADED)
  }

  /**
   * Destroy the Lazyload instance, disconnecting all observers and freeing resources.
   */
  destroy() {
    this.events.abort()
    this.unsubscribe?.()
    this.pendingReveals.clear()
    this.sectionObservers.forEach(observer => observer.disconnect())
    this.sectionObservers.clear()
    this.srcsetReadyObserver?.disconnect()
    this.loadObserver?.disconnect()
    this.revealObserver?.disconnect()
    this.sizeObserver?.disconnect()

    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }

    this.resizePending.clear()
  }
}
