import _defaultsDeep from 'lodash.defaultsdeep'
import dispatchElementEvent from '../../utils/dispatchElementEvent'
import imagesAreLoaded from '../../utils/imagesAreLoaded'
import Dom from '../Dom'
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
 * @property {IntersectionObserverConfig} [intersectionObserverConfig] - Configuration for general intersection observers
 * @property {boolean} [useNativeLazyloadIfAvailable=true] - Whether to use native lazyloading if available
 * @property {string} [mode='default'] - Lazyload mode
 * @property {number} [minSize=40] - Minimum size for auto sizing
 * @property {boolean} [updateSizes=true] - Whether to update sizes attribute
 * @property {boolean} [registerCallback=true] - Whether to register a callback for APPLICATION_REVEALED event
 */

/** @type {LazyloadOptions} */
const DEFAULT_OPTIONS = {
  revealIntersectionObserverConfig: {
    rootMargin: '0px 100px 0px 100px',
    threshold: 0.0,
  },
  loadIntersectionObserverConfig: {
    rootMargin: '850px 500px 850px 500px',
    threshold: 0.0,
  },
  useNativeLazyloadIfAvailable: true,
  mode: 'default',
  minSize: 40,
  updateSizes: true,
  registerCallback: true,
  target: null,
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
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.target = this.opts.target || document.body
    this.resizePending = new Map()
    this.rafId = null

    // Create reusable MutationObserver for reveal handling
    this.srcsetReadyObserver = new MutationObserver(mutations => {
      mutations.forEach(record => {
        if (record.type === 'attributes' && record.attributeName === 'data-ll-srcset-ready') {
          this.revealPicture(record.target)
          this.revealObserver.unobserve(record.target)
        }
      })
    })

    this.initialize()

    if (this.opts.registerCallback) {
      if (this.app.state.revealed) {
        this.watch()
      } else {
        this.app.registerCallback(Events.APPLICATION_REVEALED, () => {
          this.watch()
        })
      }
    }
  }

  watch() {
    this.initObserver(this.revealObserver, false)
  }

  initialize() {
    // initialize ResizeObserver for images with data-sizes="auto"
    this.initializeResizeObserver()
    // look for lazyload sections. if we find, add an observer that triggers
    // lazyload for all images within.
    this.initializeSections()

    // if we have native lazyload, use it.
    if ('loading' in HTMLImageElement.prototype && this.opts.useNativeLazyloadIfAvailable) {
      const lazyImages = this.target.querySelectorAll('[data-ll-image]')
      lazyImages.forEach(img => {
        img.setAttribute('loading', 'lazy')
        this.swapImage(img)
      })

      const lazyPictures = this.target.querySelectorAll('[data-ll-srcset]')
      lazyPictures.forEach(picture => {
        picture.querySelectorAll('img').forEach(img => img.setAttribute('loading', 'lazy'))
        this.swapPicture(picture)
      })

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

    // Deprecate data-ll-image sometime
    this.imageObserver = new IntersectionObserver(
      this.lazyloadImages.bind(this),
      this.opts.intersectionObserverConfig
    )

    this.lazyImages = this.target.querySelectorAll('[data-ll-image]')
    this.lazyImages.forEach((img, idx) => {
      img.setAttribute('data-ll-blurred', '')
      img.setAttribute('data-ll-idx', idx)
      img.style.setProperty('--ll-idx', idx)
      this.imageObserver.observe(img)
    })
  }

  initObserver(observer, setAttrs = true) {
    this.lazyPictures.forEach((picture, idx) => {
      if (setAttrs) {
        picture.setAttribute('data-ll-srcset-initialized', '')
        picture.querySelectorAll('img:not([data-ll-loaded])').forEach(img => {
          img.setAttribute('data-ll-blurred', '')
          img.setAttribute('data-ll-idx', idx)
          img.style.setProperty('--ll-idx', idx)
        })
      }
      observer.observe(picture)
    })
  }

  forceLoad($container = document.body) {
    const images = Dom.all($container, '[data-ll-image]')
    images.forEach(img => this.swapImage(img))

    const pictures = Dom.all($container, '[data-ll-srcset]')
    pictures.forEach(picture => this.revealPicture(picture))
  }

  initializeResizeObserver() {
    if (!this.opts.updateSizes) {
      return
    }

    // Use ResizeObserver to watch images with data-sizes="auto"
    // This eliminates layout thrashing from repeated offsetWidth reads
    this.sizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const img = entry.target
        // Use contentBoxSize for better performance (avoids layout queries)
        let width = entry.borderBoxSize?.[0]?.inlineSize || entry.contentRect.width

        // Round to prevent decimal fluctuations causing loops
        width = Math.round(width)

        // Fallback to minSize if element is too small
        if (width < this.opts.minSize) {
          width = this.opts.minSize
        }

        // Only queue update if width actually changed from current sizes attribute
        const currentSizes = img.getAttribute('sizes')
        const expectedSizes = `${width}px`

        if (currentSizes !== expectedSizes) {
          // Batch updates using RAF to avoid layout thrashing
          this.resizePending.set(img, width)

          if (!this.rafId) {
            this.rafId = requestAnimationFrame(() => {
              this.flushSizeUpdates()
            })
          }
        }
      })
    })

    // Observe all images with data-sizes="auto" within the target container
    const autoSizesImages = Dom.all(this.target, '[data-sizes="auto"]')

    // Deduplicate in case of multiple Lazyload instances
    const uniqueImages = new Set(autoSizesImages)

    uniqueImages.forEach(img => {
      this.sizeObserver.observe(img)
    })
  }

  flushSizeUpdates() {
    // Batch all size updates together to minimize reflows
    this.resizePending.forEach((width, img) => {
      const currentSizes = img.getAttribute('sizes')
      const newSizes = `${Math.round(width)}px`

      // Only update if value actually changed to prevent resize loops
      if (currentSizes !== newSizes) {
        img.setAttribute('sizes', newSizes)
        if (img.parentNode) {
          Array.from(Dom.all(img.parentNode, 'source')).forEach(source => {
            if (source.getAttribute('sizes') !== newSizes) {
              source.setAttribute('sizes', newSizes)
            }
          })
        }
      }
    })

    this.resizePending.clear()
    this.rafId = null
  }

  initializeSections() {
    const sections = document.querySelectorAll('[data-lazyload-section]')
    if (sections) {
      const sectionObserver = (section, children) => {
        const imagesInSection = Dom.all(section, 'img')
        return new IntersectionObserver((entries, self) => {
          entries.forEach(entry => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              imagesAreLoaded(imagesInSection, true).then(() => {
                dispatchElementEvent(section, Events.SECTION_LAZYLOADED)
              })
              children.forEach(picture => {
                this.loadPicture(picture)
                this.loadObserver.unobserve(picture)
              })
              self.unobserve(section)
            }
          })
        }, this.opts.intersectionObserverConfig)
      }

      sections.forEach(section => {
        const children = section.querySelectorAll('picture')
        const obs = sectionObserver(section, children)
        obs.observe(section)
      })
    }
  }

  // we load the picture a ways before it enters the viewport
  handleLoadEntries(elements) {
    elements.forEach(item => {
      if (item.isIntersecting || item.intersectionRatio > 0) {
        const picture = item.target
        this.loadPicture(picture)
        this.loadObserver.unobserve(item.target)
      }
    })
  }

  // we reveal the picture when it enters the viewport
  handleRevealEntries(elements) {
    elements.forEach(item => {
      if (item.isIntersecting || item.intersectionRatio > 0) {
        const picture = item.target
        const ready = item.target.hasAttribute('data-ll-srcset-ready')
        if (!ready) {
          // element is not loaded, observe the picture and wait for
          // `data-ll-srcset-ready` before revealing
          // Use reusable MutationObserver to prevent memory leaks
          this.srcsetReadyObserver.observe(picture, { attributes: true })
        } else {
          this.revealPicture(picture)
          this.revealObserver.unobserve(item.target)
        }
      }
    })
  }

  loadPicture(picture) {
    // gather all the source elements in picture
    const sources = picture.querySelectorAll('source')
    let loadedSomething = false

    for (let s = 0; s < sources.length; s += 1) {
      const source = sources[s]
      if (!source.hasAttribute('data-ll-ready')) {
        loadedSomething = true
      }
      if (source.hasAttribute('data-srcset')) {
        source.setAttribute('srcset', source.dataset.srcset)
        source.setAttribute('data-ll-ready', '')
      }
    }

    if (!loadedSomething && sources.length > 0) {
      return
    }

    const img = picture.querySelector('img')

    const onload = () => {
      // ResizeObserver now handles size updates automatically,
      // including Firefox's delayed dimension calculation
      img.removeAttribute('data-ll-placeholder')
      img.removeAttribute('data-ll-blurred')
      img.removeAttribute('data-ll-loading')
      img.setAttribute('data-ll-ready', '')
      picture.setAttribute('data-ll-srcset-ready', '')
    }

    img.addEventListener('load', onload, false)
    img.setAttribute('data-ll-loading', '')

    if (img.dataset.src) {
      img.setAttribute('src', img.dataset.src)
    }

    if (img.dataset.srcset) {
      img.setAttribute('srcset', img.dataset.srcset)
    }

    if (this.app.featureTests.results.ie11) {
      if (window.picturefill) {
        window.picturefill({ reevaluate: true })
      }
    }

    // safari sometimes caches, so force load
    if (img.complete) {
      onload()
    }

    dispatchElementEvent(img, Events.IMAGE_LAZYLOADED)
  }

  /* reveal by just setting `data-ll-loaded` */
  revealPicture(picture) {
    const img = picture.querySelector('img')
    if (img.hasAttribute('data-ll-loaded')) {
      return
    }
    img.setAttribute('data-ll-loaded', '')
    dispatchElementEvent(img, Events.IMAGE_REVEALED)
  }

  lazyloadImages(elements) {
    elements.forEach(item => {
      if (item.isIntersecting || item.intersectionRatio > 0) {
        const image = item.target
        this.swapImage(image)
        this.imageObserver.unobserve(image)
      }
    })
  }

  swapImage(image) {
    image.src = image.dataset.src
    image.setAttribute('data-ll-loaded', '')
  }
}
