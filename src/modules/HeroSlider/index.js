/**
 *
 * HERO SLIDER
 * ============
 *
 * ## Example
 *
 *    const hs = HeroSlider(sliderEl, opts)
 *
 */

import { animate } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import prefersReducedMotion from '../../utils/prefersReducedMotion'
import * as Events from '../../events'
import imageIsLoaded from '../../utils/imageIsLoaded'
import { set, delayedCall } from '../../utils/motion-helpers'

const DEFAULT_OPTIONS = {
  el: '[data-hero-slider]',
  /* time between slides */
  interval: 4.2,
  /* the slide number we start with */
  initialSlideNumber: 0,
  /* are the slider images lazyloaded? */
  lazyImages: false,
  /* zIndexes for the slide mechanism */
  zIndex: {
    visible: 5,
    next: 4,
    regular: 3,
  },
  transition: {
    /* how long the actual transition from slide to slide takes */
    duration: 0.8,
    /* the transition type. 'parallax' or 'fade' */
    type: 'parallax',
    /* how much to scale when 'idle' */
    scale: 1.05,
  },

  onTransition: (hs) => {
    hs.slide('parallax')
  },

  onInitialize: (/* hs */) => {},

  onFadeIn: (hs, callback) => {
    // Get the first slide's image to start zooming during reveal
    const firstSlideImg = hs.slides[hs._currentSlideIdx].querySelector('.hero-slide-img')

    // Fade in the container
    animate(hs.el, { opacity: 1 }, { duration: 0.25 })

    // Start zoom immediately as container fades in
    if (firstSlideImg && hs.slides.length > 1) {
      // Animate with linear easing - MUST specify type: "tween"!
      animate(
        firstSlideImg,
        { scale: [1, hs.opts.transition.scale] },
        { type: "tween", duration: hs.opts.interval, ease: "linear" }
      ).finished.then(callback)
    }
  },
}

export default class HeroSlider {
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)

    if (typeof this.opts.el === 'string') {
      this.el = document.querySelector(this.opts.el)
    } else {
      this.el = this.opts.el
    }

    if (!this.el) {
      return
    }

    this.initialize()
  }

  initialize() {
    this._addResizeHandler()
    this._addVisibilityHandler()
    // style the container
    set(this.el, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    })

    this.slides = this.el.querySelectorAll('[data-hero-slide]')
    this.images = this.el.querySelectorAll('.hero-slide-img')

    this.slideCount = this.slides.length - 1
    this._currentSlideIdx = this.opts.initialSlideNumber

    // style the slides
    Array.from(this.slides).forEach((s, index) => {
      set(s, {
        zIndex: this.opts.zIndex.regular,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: index === 0 ? 1 : 0, // Only first slide visible initially
      })

      const img = s.querySelector('.hero-slide-img')

      if (img) {
        set(img, {
          width: document.body.clientWidth,
          height: '100%',
          top: 0,
          left: 0,
          position: 'absolute',
          transition: 'none',
          transformOrigin: 'center center',
          willChange: 'transform',
          scale: 1, // Initialize scale
        })
      } else {
        console.error(
          '==> JUPITER/HEROSLIDER: MISSING .hero-slide-img INSIDE [data-hero-slide]'
        )
      }
    })

    // Set proper z-indexes for first two slides
    this.slides[0].style.zIndex = this.opts.zIndex.visible
    if (this.slides[1]) {
      this.slides[1].style.zIndex = this.opts.zIndex.next
    }

    this.opts.onInitialize(this)

    const callback = this.slides.length > 1 ? this.next.bind(this) : () => {}

    this.app.registerCallback(Events.APPLICATION_REVEALED, () => {
      /* Wait for the first image to load, then fade in container element */
      const firstImg = this.slides[this._currentSlideIdx].querySelector('img')

      if (firstImg) {
        imageIsLoaded(firstImg, this.opts.lazyImages).then(() => {
          this.opts.onFadeIn(this, callback)
        })
      }
    })
  }

  /**
   * Calculate which slide is next, and call the slide function
   */
  next() {
    if (prefersReducedMotion() && this.app.opts.respectReducedMotion) {
      return
    }

    if (this._currentSlideIdx === this.slideCount) {
      this._previousSlide = this.slides[this._currentSlideIdx]
      // last slide --> next slide will be 0
      this._currentSlideIdx = 0
      this._nextSlide = this.slides[this._currentSlideIdx + 1]
    } else {
      this._previousSlide = this.slides[this._currentSlideIdx]
      this._currentSlideIdx += 1
      if (this._currentSlideIdx === this.slideCount) {
        ;[this._nextSlide] = this.slides
      } else {
        this._nextSlide = this.slides[this._currentSlideIdx + 1]
      }
    }

    this._currentSlide = this.slides[this._currentSlideIdx]

    this.opts.onTransition(this)
  }

  /**
   * Switches between slides
   */
  slide(type) {
    switch (type) {
      case 'fade':
        {
          // Setup: set current slide invisible at correct z-index
          set(this._currentSlide, {
            opacity: 0,
            zIndex: this.opts.zIndex.visible,
          })
          set(this._nextSlide, { opacity: 0 })

          // Get the images to animate
          const previousSlideImg = this._previousSlide.querySelector('.hero-slide-img')
          const currentSlideImg = this._currentSlide.querySelector('.hero-slide-img')

          // Explicitly set starting scale for current slide
          set(currentSlideImg, { scale: 1 })

          // Build animation sequence
          // Previous slide continues zooming at same rate during fade out
          // Zoom rate: (scale - 1) / interval, so in transition.duration we zoom by that rate * duration
          const zoomRate = (this.opts.transition.scale - 1) / this.opts.interval
          const continueZoomAmount = zoomRate * this.opts.transition.duration
          const continueZoomTarget = this.opts.transition.scale + continueZoomAmount

          const sequence = [
            // Previous slide continues zooming during fade at same rate
            [
              previousSlideImg,
              { scale: [this.opts.transition.scale, continueZoomTarget] },
              { type: "tween", duration: this.opts.transition.duration, ease: "linear", at: 0 },
            ],
            // Current slide fade-in (starts immediately)
            [
              this._currentSlide,
              { opacity: 1 },
              {
                type: "tween",
                duration: this.opts.transition.duration,
                ease: [0.45, 0, 0.55, 1], // sine.inOut bezier
                at: 0,
              },
            ],
            // Current slide image zoom (starts immediately as it fades in)
            [
              currentSlideImg,
              { scale: [1, this.opts.transition.scale] },
              { type: "tween", duration: this.opts.interval, ease: "linear", at: 0 },
            ],
          ]

          this._currentAnimation = animate(sequence)

          this._currentAnimation.finished.then(() => {
            // Cleanup after animation completes
            set(this._previousSlide, { opacity: 0 })
            set(this._currentSlide, { opacity: 1 })
            set(previousSlideImg, { scale: 1 })
            this._nextSlide.style.zIndex = this.opts.zIndex.visible
            this._currentSlide.style.zIndex = this.opts.zIndex.regular
            this._previousSlide.style.zIndex = this.opts.zIndex.regular
            this.next()
          })
        }
        break

      case 'parallax':
        {
          // Setup: current slide behind previous slide
          set(this._currentSlide, {
            zIndex: this.opts.zIndex.next,
            width: '100%',
            opacity: 1, // Make sure it's visible underneath
          })
          set(this._previousSlide, { overflow: 'hidden' })

          // Get the current slide's image to animate
          const previousSlideImg = this._previousSlide.querySelector('.hero-slide-img')
          const currentSlideImg = this._currentSlide.querySelector('.hero-slide-img')

          // Explicitly set starting scale for current slide
          set(currentSlideImg, { scale: 1 })

          // Build animation sequence
          // Previous slide continues zooming at same rate during collapse
          // Zoom rate: (scale - 1) / interval, so in transition.duration we zoom by that rate * duration
          const zoomRate = (this.opts.transition.scale - 1) / this.opts.interval
          const continueZoomAmount = zoomRate * this.opts.transition.duration
          const continueZoomTarget = this.opts.transition.scale + continueZoomAmount

          const sequence = [
            // Previous slide continues zooming during collapse at same rate
            [
              previousSlideImg,
              { scale: [this.opts.transition.scale, continueZoomTarget] },
              { type: "tween", duration: this.opts.transition.duration, ease: "linear", at: 0 },
            ],
            // Previous slide width collapse (starts immediately)
            [
              this._previousSlide,
              { width: 0 },
              {
                type: "tween",
                duration: this.opts.transition.duration,
                ease: [0.895, 0.03, 0.685, 0.22], // power3.in bezier
                at: 0,
              },
            ],
            // Current slide image zoom (starts immediately as it's revealed)
            [
              currentSlideImg,
              { scale: [1, this.opts.transition.scale] },
              { type: "tween", duration: this.opts.interval, ease: "linear", at: 0 },
            ],
          ]

          this._currentAnimation = animate(sequence)

          this._currentAnimation.finished.then(() => {
            // Cleanup and shuffle z-indexes
            set(this._nextSlide, { zIndex: this.opts.zIndex.next, opacity: 1 })
            set(this._currentSlide, {
              zIndex: this.opts.zIndex.visible,
              width: '100%',
              opacity: 1,
            })
            set(this._previousSlide, {
              zIndex: this.opts.zIndex.regular,
              width: '100%',
              opacity: 0, // Hide previous slide
            })
            // Reset previous slide image scale for next time
            set(previousSlideImg, { scale: 1.0 })
            this.next()
          })
        }
        break

      default:
        console.error(
          '==> JUPITER/HEROSLIDER: Unrecognized `opts.transition.type` option.'
        )
    }
  }

  /**
   * Add a window resize handler that resizes slide widths
   */
  _addResizeHandler() {
    this.observer = new IntersectionObserver((entries) => {
      const [{ isIntersecting }] = entries
      if (isIntersecting) {
        this._resizeSlides()
        window.addEventListener(
          Events.APPLICATION_RESIZE,
          this._resizeSlides.bind(this)
        )
      } else {
        window.removeEventListener(
          Events.APPLICATION_RESIZE,
          this._resizeSlides.bind(this)
        )
      }
    })

    this.observer.observe(this.el)
  }

  _resizeSlides() {
    // Stop any running resize animations
    if (this.resizeAnimation) {
      this.resizeAnimation.stop()
    }

    this.resizeAnimation = animate(
      this.images,
      { width: document.body.clientWidth },
      { duration: 0.15 }
    )
  }

  /**
   * Add a visibility change handler to restart animations when tab becomes visible
   */
  _addVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Cancel running animation when tab becomes hidden
        if (this._currentAnimation) {
          this._currentAnimation.cancel()
          this._currentAnimation = null
        }
      } else {
        // Reset and restart when tab becomes visible
        this._resetAndRestart()
      }
    })
  }

  /**
   * Reset slide states and restart the animation cycle
   */
  _resetAndRestart() {
    // Reset all slides to initial state
    Array.from(this.slides).forEach((s, index) => {
      const nextSlideIdx = (this._currentSlideIdx + 1) % this.slides.length
      set(s, {
        width: '100%',
        opacity: index === this._currentSlideIdx ? 1 : 0,
        zIndex: index === this._currentSlideIdx ? this.opts.zIndex.visible :
                index === nextSlideIdx ? this.opts.zIndex.next :
                this.opts.zIndex.regular
      })
      const img = s.querySelector('.hero-slide-img')
      if (img) {
        set(img, { scale: 1 })
      }
    })

    // Restart the zoom animation on current slide, then continue cycle
    const currentSlideImg = this.slides[this._currentSlideIdx].querySelector('.hero-slide-img')
    if (currentSlideImg && this.slides.length > 1) {
      this._currentAnimation = animate(
        currentSlideImg,
        { scale: [1, this.opts.transition.scale] },
        { type: "tween", duration: this.opts.interval, ease: "linear" }
      )
      this._currentAnimation.finished.then(() => this.next())
    }
  }
}
