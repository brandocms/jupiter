import _defaultsDeep from 'lodash.defaultsdeep'
import dispatchElementEvent from '../../utils/dispatchElementEvent'
import imagesAreLoaded from '../../utils/imagesAreLoaded'
import Dom from '../Dom'
import * as Events from '../../events'

const DEFAULT_OPTIONS = {
  revealIntersectionObserverConfig: {
    rootMargin: '0px 100px 0px 100px',
    threshold: 0.0
  },
  loadIntersectionObserverConfig: {
    rootMargin: '850px 500px 850px 500px',
    threshold: 0.0
  },
  useNativeLazyloadIfAvailable: true,
  mode: 'default',
  minSize: 40,
  updateSizes: true,
  registerCallback: true
}

export default class Lazyload {
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.initialize()

    if (this.opts.registerCallback) {
      this.app.registerCallback(Events.APPLICATION_REVEALED, () => {
        this.watch()
      })
    }
  }

  watch() {
    this.initObserver(this.revealObserver, false)
  }

  initialize() {
    // initialize all images that have data-sizes="auto" and set sizes="<actual width>px"
    this.initializeAutoSizes()
    // look for lazyload sections. if we find, add an observer that triggers
    // lazyload for all images within.
    this.initializeSections()

    // if we have native lazyload, use it.
    if ('loading' in HTMLImageElement.prototype && this.opts.useNativeLazyloadIfAvailable) {
      const lazyImages = document.querySelectorAll('[data-ll-image]')
      lazyImages.forEach(img => {
        img.setAttribute('loading', 'lazy')
        this.swapImage(img)
      })

      const lazyPictures = document.querySelectorAll('[data-ll-srcset]')
      lazyPictures.forEach(picture => {
        picture.querySelectorAll('img').forEach(img => img.setAttribute('loading', 'lazy'))
        this.swapPicture(picture)
      })

      return
    }

    this.lazyPictures = document.querySelectorAll('[data-ll-srcset]')

    this.loadObserver = new IntersectionObserver(
      this.handleLoadEntries.bind(this),
      this.opts.loadIntersectionObserverConfig
    )

    this.revealObserver = new IntersectionObserver(
      this.handleRevealEntries.bind(this),
      this.opts.revealIntersectionObserverConfig
    )

    this.lazyPictures = document.querySelectorAll('[data-ll-srcset]')
    this.initObserver(this.loadObserver)

    // Deprecate data-ll-image sometime
    this.imageObserver = new IntersectionObserver(
      this.lazyloadImages.bind(this),
      this.opts.intersectionObserverConfig
    )

    this.lazyImages = document.querySelectorAll('[data-ll-image]')
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
        picture.querySelectorAll('img:not([data-ll-loaded])').forEach(img => {
          img.setAttribute('data-ll-blurred', '')
          img.setAttribute('data-ll-idx', idx)
          img.style.setProperty('--ll-idx', idx)
        })
      }
      observer.observe(picture)
    })
  }

  initializeAutoSizes() {
    if (this.opts.updateSizes) {
      this.$autoSizesImages = Dom.all('[data-sizes="auto"]')
      this.autoSizes()
      window.addEventListener(Events.APPLICATION_RESIZE, () => this.autoSizes())
    }
  }

  /**
   * Set sizes attribute for all imgs with `data-sizes="auto"` and source within the <picture>
   */
  autoSizes() {
    Array.from(this.$autoSizesImages).forEach(img => {
      const width = this.getWidth(img)
      img.setAttribute('sizes', `${width}px`)
      if (img.parentNode) {
        Array.from(Dom.all(img.parentNode, 'source')).forEach(source =>
          source.setAttribute('sizes', `${width}px`)
        )
      }
    })
  }

  getWidth(img) {
    let width = img.offsetWidth
    let parent = img.parentNode

    while (width < this.opts.minSize && parent) {
      width = parent.offsetWidth
      parent = parent.parentNode
    }

    return width
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
        this.revealPicture(picture)
        this.revealObserver.unobserve(item.target)
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
      if (!img.getAttribute('data-ll-ready') && this.app.browser === 'firefox') {
        // set sizes attribute on load again,
        // since firefox sometimes is a bit slow to
        // get the actual image width
        const width = this.getWidth(img)

        img.setAttribute('sizes', `${width}px`)
        if (img.parentNode) {
          Array.from(Dom.all(img.parentNode, 'source')).forEach(source =>
            source.setAttribute('sizes', `${width}px`)
          )
        }
      }

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
