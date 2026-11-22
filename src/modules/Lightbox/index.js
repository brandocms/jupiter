import { animate } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import imageIsLoaded from '../../utils/imageIsLoaded'
import Dom from '../Dom'
import { set, PausedTimeline } from '../../utils/motion-helpers'

/**
 * @typedef {Object} LightboxElements
 * @property {Function} [arrowRight] - Function to create right arrow element
 * @property {Function} [arrowLeft] - Function to create left arrow element
 * @property {Function} [close] - Function to create close button element
 * @property {Function} [dot] - Function to create dot/indicator element
 */

/**
 * @typedef {Object} LightboxOptions
 * @property {string} [dialogLabel] - Accessible name of the gallery dialog
 * @property {boolean} [captions=false] - Enable captions
 * @property {boolean} [numbers=false] - Enable index numbers
 * @property {string|boolean} [trigger=false] - Selector for trigger element to open the lightbox
 * @property {LightboxElements} [elements] - Custom elements configuration
 * @property {Function} [onClick] - Click handler for lightbox
 * @property {Function} [onPointerLeft] - Called when pointer moves left
 * @property {Function} [onPointerRight] - Called when pointer moves right
 * @property {Function} [onCaptionOut] - Called when caption fades out
 * @property {Function} [onCaptionIn] - Called when caption fades in
 * @property {Function} [onImageOut] - Called when image fades out
 * @property {Function} [onImageIn] - Called when image fades in
 * @property {Function} [onNumbers] - Called when numbers display updates
 * @property {Function} [onBeforeOpen] - Called before opening lightbox
 * @property {Function} [onOpen] - Called when lightbox opens
 * @property {Function} [onAfterClose] - Called after lightbox closes
 * @property {Function} [onClose] - Called when lightbox closes
 */

/** @type {LightboxOptions} */
const DEFAULT_OPTIONS = {
  /* enable captions */
  captions: false,

  /* enable index numbers */
  numbers: false,

  /* set to a selector if you want a specific trigger element to open the box */
  trigger: false,

  elements: {
    arrowRight: () => {
      const sp1 = document.createElement('span')
      sp1.classList.add('arrow-r')
      sp1.appendChild(document.createTextNode('→'))
      return sp1
    },

    arrowLeft: () => {
      const sp1 = document.createElement('span')
      sp1.classList.add('arrow-l')
      sp1.appendChild(document.createTextNode('←'))
      return sp1
    },

    close: () => document.createTextNode('×'),
    dot: () => document.createTextNode('▪'),
  },

  onClick: (lightbox, section, e) => {
    e.stopPropagation()
    e.preventDefault()

    if (lightbox.pointerDirection === 'left') {
      lightbox.setImg(section, lightbox.getPrevIdx(section))
    } else {
      lightbox.setImg(section, lightbox.getNextIdx(section))
    }
  },

  onPointerLeft: () => {},

  onPointerRight: () => {},

  onCaptionOut: (lightbox, captionHasChanged) => {
    if (!captionHasChanged) {
      return
    }

    lightbox.timelines.caption.to(lightbox.elements.caption, {
      duration: 0.4,
      autoAlpha: 0,
    })
  },

  onCaptionIn: (lightbox, captionHasChanged) => {
    if (!captionHasChanged) {
      return
    }

    lightbox.timelines.caption.to(lightbox.elements.caption, {
      duration: 0.4,
      autoAlpha: 1,
    })
  },

  onImageOut: (lightbox) => {
    lightbox.timelines.image.to(lightbox.currentImage, {
      duration: 0.5,
      autoAlpha: 0,
    })
  },

  onImageIn: (lightbox) => {
    const delay = lightbox.firstTransition ? 0.6 : 0.4
    lightbox.timelines.image.to(lightbox.nextImage, {
      duration: 0.5,
      autoAlpha: 1,
      delay,
    })
  },

  onNumbers: (lightbox, section) => {
    lightbox.elements.numbers.innerHTML = `${lightbox.currentIndex + 1}/${section.length}`
  },

  onBeforeOpen: () => {},

  onOpen: (h) => {
    h.app.scrollLock()

    animate(h.elements.wrapper, { opacity: 1 }, { duration: 0.5 })
  },

  onAfterClose: () => {},

  onClose: (h) => {
    if (h.opts.captions) {
      animate(h.elements.caption, { opacity: 0 }, { duration: 0.45 })
    }

    return animate(
      [
        h.elements.imgWrapper,
        h.elements.nextArrow,
        h.elements.prevArrow,
        h.elements.close,
        h.elements.dots,
      ],
      { opacity: 0 },
      { duration: 0.5 }
    ).finished.then(() => {
      return animate(h.elements.wrapper, { opacity: 0 }, { duration: 0.45 }).finished.then(() => {
        h.app.scrollRelease()
        h.destroy()
      })
    })
  },
}

/**
 * Lightbox component for displaying images in a fullscreen overlay
 */
export default class Lightbox {
  /**
   * Create a new Lightbox instance
   * @param {Object} app - Application instance
   * @param {LightboxOptions} [opts={}] - Lightbox options
   */
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.lightboxes = document.querySelectorAll('[data-lightbox]')
    this.elements = {}
    this.imgAlts = []
    this.imgs = []
    this.sections = {}
    this.currentIndex = null
    this.firstTransition = true
    this.previousCaption = null
    this.timelines = {
      caption: new PausedTimeline(),
      image: new PausedTimeline(),
    }

    this.lightboxes.forEach((lightbox) => {
      const href = lightbox.getAttribute('data-lightbox')
      const srcset = lightbox.getAttribute('data-srcset')
      const originalImage = lightbox.querySelector('img')
      const alt = originalImage?.alt || ''
      const section =
        lightbox.getAttribute('data-lightbox-section') || 'general'
      let trigger = lightbox
      if (this.opts.trigger) {
        trigger = Dom.find(lightbox, this.opts.trigger) || lightbox
      }

      if (!Object.prototype.hasOwnProperty.call(this.sections, section)) {
        this.sections[section] = []
      }

      const image = {
        href,
        alt,
        srcset,
      }

      const index = this.sections[section].push(image) - 1

      if (!trigger.matches('a[href], button, input, select, textarea, summary')) {
        if (!trigger.hasAttribute('tabindex')) trigger.tabIndex = 0
        if (!trigger.hasAttribute('role')) trigger.setAttribute('role', 'button')
        trigger.addEventListener('keydown', event => {
          if (event.target !== trigger || !['Enter', ' '].includes(event.key)) return
          event.preventDefault()
          this.showBox(section, index, trigger)
        })
      }
      trigger.addEventListener('click', (e) => {
        e.preventDefault()
        this.showBox(section, index, trigger)
      })
    })
  }

  showBox(section, index, trigger = document.activeElement) {
    if (this.currentIndex !== null || this.closing) return
    this.invoker = trigger
    this.opts.onBeforeOpen(this)
    this.buildBox(section, index)
  }

  buildBox(section, index) {
    this.elements.wrapper = document.createElement('div')
    this.elements.content = document.createElement('div')
    this.elements.imgWrapper = document.createElement('div')
    this.elements.dots = document.createElement('div')
    this.elements.numbers = document.createElement('div')
    this.elements.nextArrow = document.createElement('a')
    this.elements.prevArrow = document.createElement('a')
    this.elements.close = document.createElement('a')

    this.elements.content.setAttribute('data-current-idx', index)

    this.elements.content.classList.add('lightbox-content')
    this.elements.nextArrow.classList.add('lightbox-next')
    this.elements.prevArrow.classList.add('lightbox-prev')
    this.elements.close.classList.add('lightbox-close')
    this.elements.dots.classList.add('lightbox-dots')
    this.elements.numbers.classList.add('lightbox-numbers')
    this.elements.wrapper.setAttribute('role', 'dialog')
    this.elements.wrapper.setAttribute('aria-modal', 'true')
    this.elements.wrapper.setAttribute('aria-label', this.opts.dialogLabel || 'Image gallery')
    this.elements.close.setAttribute('aria-label', 'Close')
    this.elements.nextArrow.setAttribute('aria-label', 'Next image')
    this.elements.prevArrow.setAttribute('aria-label', 'Previous image')
    this.elements.wrapper.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return
      const links = this.elements.wrapper.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')
      const first = links[0]
      const last = links[links.length - 1]
      if (event.shiftKey ? document.activeElement === first : document.activeElement === last) {
        event.preventDefault()
        const target = event.shiftKey ? last : first
        target.focus()
      }
    })
    this.elements.wrapper.classList.add('lightbox-backdrop')
    this.elements.wrapper.setAttribute('data-lightbox-wrapper-section', section)
    this.elements.imgWrapper.classList.add('lightbox-image-wrapper')

    this.elements.close.appendChild(this.opts.elements.close())
    this.elements.close.href = '#'

    this.elements.nextArrow.appendChild(this.opts.elements.arrowRight())
    this.elements.nextArrow.href = '#'

    this.elements.nextArrow.addEventListener('click', (e) => {
      e.stopPropagation()
      e.preventDefault()
      this.setImg(section, this.getNextIdx(section))
    })

    this.elements.prevArrow.addEventListener('click', (e) => {
      e.stopPropagation()
      e.preventDefault()
      this.setImg(section, this.getPrevIdx(section))
    })

    this.keyUpCallback = (event) => {
      this.onKeyup(event, section)
    }

    document.removeEventListener('keyup', this.keyUpCallback)
    document.addEventListener('keyup', this.keyUpCallback)

    this.elements.wrapper.addEventListener('mousemove', (event) => {
      this.onMouseMove(event)
    })

    this.elements.wrapper.addEventListener('click', (event) => {
      this.onClick(event, section)
    })

    this.elements.prevArrow.appendChild(this.opts.elements.arrowLeft())
    this.elements.prevArrow.href = '#'

    // add dot links
    let activeLink

    this.sections[section].forEach((img, x) => {
      const imgElement = document.createElement('img')
      imgElement.alt = img.alt
      set(imgElement, { opacity: 0 })
      imgElement.style.visibility = 'hidden'
      imgElement.classList.add('lightbox-image', 'm-lg')
      imgElement.setAttribute('data-idx', x)
      this.elements.imgWrapper.appendChild(imgElement)
      this.imgs.push(imgElement)

      const a = document.createElement('a')
      a.setAttribute('href', '#')
      a.setAttribute('aria-label', 'Image ' + (x + 1))
      a.setAttribute('data-idx', x)

      if (x === index) {
        a.classList.add('active')
        activeLink = a
      }

      a.addEventListener('click', (e) => {
        a.classList.add('active')
        activeLink.classList.remove('active')
        activeLink = a
        e.stopPropagation()
        e.preventDefault()
        this.setImg(section, x, null)
      })

      a.appendChild(this.opts.elements.dot())
      this.elements.dots.appendChild(a)
    })

    this.elements.content.appendChild(this.elements.close)
    this.elements.content.appendChild(this.elements.imgWrapper)
    this.elements.content.appendChild(this.elements.nextArrow)
    this.elements.content.appendChild(this.elements.prevArrow)
    this.elements.content.appendChild(this.elements.dots)

    if (this.opts.numbers) {
      this.elements.content.appendChild(this.elements.numbers)
    }

    if (this.opts.captions) {
      this.elements.caption = document.createElement('div')
      this.elements.caption.classList.add('lightbox-caption')
      this.elements.content.appendChild(this.elements.caption)
    }

    this.elements.wrapper.appendChild(this.elements.content)
    document.body.appendChild(this.elements.wrapper)

    this.setImg(section, index, this.getPrevIdx(section))

    this.opts.onOpen(this)
    this.elements.close.focus({ preventScroll: true })

    this.elements.close.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      this.close()
    })
  }

  async close() {
    if (this.closing || this.currentIndex === null) return
    this.closing = true
    document.removeEventListener('keyup', this.keyUpCallback)
    try {
      await this.opts.onClose(this)
    } finally {
      this.closing = false
      this.resetAfterClose()
    }
    this.opts.onAfterClose(this)
  }

  resetAfterClose() {
    this.currentIndex = null
    this.currentImage = null
    this.firstTransition = true
    this.imgs = []
    if (this.invoker && this.invoker.tabIndex < 0 && !this.invoker.hasAttribute('tabindex')) {
      this.invoker.setAttribute('tabindex', '-1')
      this.invoker.focus({ preventScroll: true })
      this.invoker.removeAttribute('tabindex')
    } else {
      this.invoker?.focus?.({ preventScroll: true })
    }
  }

  destroy() {
    this.elements.wrapper?.remove()
  }

  setImg(section, index) {
    let captionHasChanged = false

    this.currentIndex = index
    this.elements.content.setAttribute('data-current-idx', index)

    let activeDot = this.elements.dots.querySelector('a.active')

    if (activeDot) {
      activeDot.classList.remove('active')
    }

    activeDot = this.elements.dots.querySelector(`a[data-idx="${index}"]`)
    activeDot.classList.add('active')

    if (this.elements.caption) {
      captionHasChanged =
        this.previousCaption !== this.sections[section][index].alt
      this.previousCaption = this.sections[section][index].alt
      this.opts.onCaptionOut(this, captionHasChanged)
      this.timelines.caption.call(() => {
        this.elements.caption.textContent = this.sections[section][index].alt
      })
    }

    if (this.elements.numbers) {
      this.opts.onNumbers(this, this.sections[section])
    }

    if (this.currentImage) {
      // fade out current image
      this.opts.onImageOut(this)
    }

    // preload a few

    for (let x = 0; x < 3; x += 1) {
      if (this.imgs[index + x]) {
        this.imgs[index + x].src = this.sections[section][index + x].href
        if (this.sections[section][index + x].srcset) {
          this.imgs[index + x].setAttribute(
            'srcset',
            this.sections[section][index + x].srcset
          )
        }
      } else {
        break
      }
    }

    this.nextImage = this.imgs[index]
    this.nextImage.src = this.sections[section][index].href
    if (this.sections[section][index].srcset) {
      this.nextImage.setAttribute(
        'srcset',
        this.sections[section][index].srcset
      )
    }

    this.opts.onImageIn(this)
    this.timelines.image.call(() => {
      if (this.firstTransition) {
        this.firstTransition = false
      }
    })

    if (this.elements.caption) {
      this.opts.onCaptionIn(this, captionHasChanged)
    }

    imageIsLoaded(this.nextImage).then(() => {
      this.timelines.caption.play()
      this.timelines.image.play()
    })

    this.currentImage = this.nextImage
  }

  getNextIdx(section) {
    const index = this.currentIndex
    if (index === this.sections[section].length - 1) {
      return 0
    }
    return index + 1
  }

  getPrevIdx(section) {
    const index = this.currentIndex
    if (index === 0) {
      return this.sections[section].length - 1
    }
    return index - 1
  }

  onClick(e, section) {
    this.opts.onClick(this, section, e)
  }

  onKeyup(e, section) {
    if (this.closing) return
    const key = e.keyCode || e.which

    switch (key) {
      case 27:
        this.close()
        break
      case 37:
        this.setImg(section, this.getPrevIdx(section))
        break
      case 39:
        this.setImg(section, this.getNextIdx(section))
        break
      default:
        break
    }
  }

  onMouseMove(e) {
    if (e.clientX < this.app.size.width / 2) {
      if (this.pointerDirection === 'left') {
        return
      }
      this.pointerDirection = 'left'
      this.opts.onPointerLeft(this)
    } else {
      if (this.pointerDirection === 'right') {
        return
      }
      this.pointerDirection = 'right'
      this.opts.onPointerRight(this)
    }
  }
}
