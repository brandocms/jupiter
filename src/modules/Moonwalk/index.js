/**
 * Vendor imports
 */
import { gsap, CSSPlugin } from 'gsap/all'
import _defaultsDeep from 'lodash.defaultsdeep'

/**
 * Jupiter imports
 */
import * as Events from '../../events'
import prefersReducedMotion from '../../utils/prefersReducedMotion'
import imageIsLoaded from '../../utils/imageIsLoaded'
import imagesAreLoaded from '../../utils/imagesAreLoaded'
import Dom from '../Dom'

gsap.registerPlugin(CSSPlugin)

/**
 * @typedef {Object} MoonwalkTransition
 * @property {Object} from - Starting properties for the transition
 * @property {Object} to - Ending properties for the transition
 */

/**
 * @typedef {Object} MoonwalkWalk
 * @property {number} [startDelay=0] - Delay before the animation starts
 * @property {number} [interval=0.15] - Time between animations in a sequence
 * @property {number} [duration=0.65] - Duration of the animation
 * @property {boolean|Object} [alphaTween=false] - Whether to add a separate opacity tween
 * @property {MoonwalkTransition} transition - The transition configuration
 * @property {string} [sectionTargets] - CSS selector for targeting elements in named sections
 */

/**
 * @typedef {Object} MoonwalkRun
 * @property {number} [threshold=0] - IntersectionObserver threshold
 * @property {Function} callback - Function called when element enters viewport
 * @property {Function} [onExit] - Function called when element exits viewport
 * @property {boolean} [repeated=false] - Whether the run should repeat
 * @property {string} [rootMargin] - IntersectionObserver rootMargin
 * @property {Function} [initialize] - Function called during initialization
 */

/**
 * @typedef {Object} MoonwalkOptions
 * @property {string|Function} [on=Events.APPLICATION_REVEALED] - Event to trigger animations
 * @property {number} [initialDelay=0.1] - Delay before starting animations
 * @property {boolean} [clearLazyload=false] - Clear data-ll-srcset attributes
 * @property {boolean} [clearNestedSections=true] - Remove nested data-moonwalk-section attributes
 * @property {boolean} [clearNestedWalks=true] - Remove nested data-moonwalk attributes
 * @property {boolean} [clearMoonwalkOnAnchors=true] - Disable animations when page loaded via anchor
 * @property {boolean} [warnRunWithSection=true] - Warn when run and section on same element
 * @property {string} [rootMargin='-10% 0%'] - Default IntersectionObserver rootMargin
 * @property {number} [threshold=0] - Default IntersectionObserver threshold
 * @property {boolean} [uniqueIds=false] - Generate unique IDs for moonwalk elements
 * @property {boolean} [addIndexes=false] - Add index attributes to elements
 * @property {Object.<string, MoonwalkRun>} [runs={}] - Run configurations
 * @property {Object.<string, MoonwalkWalk>} walks - Walk configurations
 */

/** @type {MoonwalkOptions} */
const DEFAULT_OPTIONS = {
  /**
   * If your app needs to do some initialization before the
   * application:ready has been fired, you can set this to
   * `() => {}`. You will then have to call `this.ready()`
   * to start the reveals
   */

  on: Events.APPLICATION_REVEALED,

  /**
   * Set a delay for the initial reveal. Could be useful if you want the reveal to happen
   * after for instance a header has been revealed
   */
  initialDelay: 0.1,

  /**
   * Clear out all `data-ll-srcset` from moonwalk elements
   */
  clearLazyload: false,

  /**
   * Clear out all nested [data-moonwalk-section]s
   */
  clearNestedSections: true,

  /**
   * Clear out all nested [data-moonwalk]s
   */
  clearNestedWalks: true,

  /**
   * If page is linked with an anchor, remove moonwalk for the page
   */
  clearMoonwalkOnAnchors: true,

  /**
   * If an element with moonwalk-run also has moonwalk-section, print a console warning
   */
  warnRunWithSection: true,

  /**
   * Determines how early the IntersectionObserver triggers
   */
  rootMargin: '-10% 0%',

  /**
   * How much of the element must be visible before IO trigger
   */
  threshold: 0,

  /**
   * Create unique `id` prop for each moonwalk element
   */
  uniqueIds: false,

  /**
   * Create indexes inside of each section per key
   */
  addIndexes: false,

  runs: {},

  walks: {
    default: {
      /* How long to wait before firing timeline */
      startDelay: 0,
      /* How long between multiple entries in a moonwalk-section */
      interval: 0.15,
      /* How long each tween is */
      duration: 0.65,
      /* */
      alphaTween: false,
      /* The transitions that will be tweened */
      transition: {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
    },
  },
}

/**
 * Moonwalk animation system for scroll-based reveal animations
 */
export default class Moonwalk {
  /**
   * @param {Object} app - The application instance
   * @param {MoonwalkOptions} [opts={}] - Configuration options
   * @param {HTMLElement} [container=document.body] - Container element
   */
  constructor(app, opts = {}, container = document.body) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    if (container !== document.body) {
      this.opts.on = () => {}
    }
    this.initialize(container)
  }

  initialize(container = document.body) {
    if (this.opts.clearNestedSections) {
      container
        .querySelectorAll('[data-moonwalk-section] [data-moonwalk-section]')
        .forEach((ms) => ms.removeAttribute('data-moonwalk-section'))
    }

    if (this.opts.clearNestedWalks) {
      container
        .querySelectorAll('[data-moonwalk] [data-moonwalk]')
        .forEach((ms) => ms.removeAttribute('data-moonwalk'))
    }

    if (this.opts.warnRunWithSection) {
      container
        .querySelectorAll('[data-moonwalk-run][data-moonwalk-section]')
        .forEach((ms) =>
          console.warn(
            'Element with moonwalk-run also has moonwalk-section. This may lead to rendering issues.',
            ms
          )
        )
    }

    if (this.opts.clearMoonwalkOnAnchors) {
      if (window.location.hash) {
        this.walkToThisPoint(window.location.hash)
      }
    }

    this.addClass()
    this.sections = this.initializeSections(container)
    this.runs = this.initializeRuns(container)

    if (this.opts.clearLazyload) {
      this.clearLazyloads(container)
    }

    if (prefersReducedMotion() && this.app.opts.respectReducedMotion) {
      this.removeAllWalks(container)
    }

    if (this.opts.on) {
      window.addEventListener(this.opts.on, this.onReady.bind(this))
    }
  }

  /**
   * Add `moonwalk` class to html element to identify ourselves.
   */
  addClass() {
    document.documentElement.classList.add('moonwalk')
  }

  /**
   * Matching moonwalk elements before the element matching the hash should be set to visible
   * by setting the `data-moonwalked` attribute on `data-moonwalk` elements and
   * `data-moonwalk-section-ready` on `data-moonwalk-section` elements.
   */
  walkToThisPoint(hash) {
    // Find the target element using the hash
    const targetElement = document.querySelector(hash)
    if (!targetElement) return // Exit if the element is not found

    // Get all elements with the 'data-moonwalk' attribute
    const moonwalkElements = document.querySelectorAll('[data-moonwalk]')
    moonwalkElements.forEach((el) => {
      const position = el.compareDocumentPosition(targetElement)
      // Check if 'el' comes before 'targetElement' or is the same element
      if (position & Node.DOCUMENT_POSITION_FOLLOWING || el === targetElement) {
        el.setAttribute('data-moonwalked', '')
        el.classList.add('moonwalked')
      }
    })

    // Get all elements with the 'data-moonwalk-section' attribute
    const moonwalkSectionElements = document.querySelectorAll(
      '[data-moonwalk-section]'
    )
    moonwalkSectionElements.forEach((el) => {
      const position = el.compareDocumentPosition(targetElement)
      // Check if 'el' comes before 'targetElement' or is the same element
      if (position & Node.DOCUMENT_POSITION_FOLLOWING || el === targetElement) {
        el.setAttribute('data-moonwalk-section-ready', '')
      }
    })
  }

  /**
   * Remove all moonwalks. Useful for clients who prefer reduced motion
   */
  removeAllWalks(container = document.body) {
    const keys = [
      'data-moonwalk',
      'data-moonwalk-section',
      'data-moonwalk-children',
    ]
    keys.forEach((key) => {
      const elems = container.querySelectorAll(`[${key}]`)
      Array.from(elems).forEach((el) => el.removeAttribute(key))
      container.removeAttribute(key)
    })
  }

  removeFor(container = document.body, selector) {
    const keys = [
      'data-moonwalk',
      'data-moonwalk-section',
      'data-moonwalk-children',
    ]
    keys.forEach((key) => {
      const elems = container.querySelectorAll(`${selector}[${key}]`)
      Array.from(elems).forEach((el) => el.removeAttribute(key))
    })
  }

  /**
   * Remove run matching name
   */
  removeRun(container = document.body, name) {
    const key = 'data-moonwalk-run'
    const elems = container.querySelectorAll(`[${key}="${name}"]`)
    Array.from(elems).forEach((el) => el.removeAttribute(key))
  }

  /**
   * Remove all runs
   */
  removeRuns(container = document.body) {
    const key = 'data-moonwalk-run'
    const elems = container.querySelectorAll(`[${key}]`)
    Array.from(elems).forEach((el) => el.removeAttribute(key))
  }

  /**
   * Add a random ID to each moonwalk element
   *
   * @param {*} section
   */
  addIds(section) {
    Array.from(section.querySelectorAll('[data-moonwalk]')).forEach((el) => {
      el.setAttribute(
        'data-moonwalk-id',
        Math.random().toString(36).substring(7)
      )
    })
  }

  /**
   * Add index to each moonwalk element in `section`
   *
   * @param {*} section
   */
  addIndexes(section) {
    Object.keys(this.opts.walks).forEach((key) => {
      const searchAttr =
        key === 'default' ? '[data-moonwalk=""]' : `[data-moonwalk="${key}"]`
      const elements = section.querySelectorAll(searchAttr)

      Array.from(elements).forEach((element, index) => {
        element.setAttribute('data-moonwalk-idx', index + 1)
      })
    }, this)
  }

  /**
   * Go through each `data-moonwalk-run`, parse children, add IDs/indexes
   * (if wanted), initialize a new object for each.
   */
  initializeRuns(container = document.body) {
    const runs = container.querySelectorAll('[data-moonwalk-run]')
    return Array.from(runs).map((run) => {
      const foundRun = this.opts.runs[run.getAttribute('data-moonwalk-run')]
      if (foundRun) {
        if (foundRun.initialize) {
          foundRun.initialize(run)
        }
        return {
          el: run,
          threshold: foundRun.threshold || 0,
          initialize: foundRun.initialize,
          callback: foundRun.callback,
          onExit: foundRun.onExit,
          repeated: foundRun.repeated,
          rootMargin: foundRun.rootMargin,
        }
      }

      return null
    })
  }

  /**
   * Go through each `data-moonwalk-section`, parse children, add IDs/indexes
   * (if wanted), initialize a new object for each.
   */
  initializeSections(container = document.body) {
    const sections = container.querySelectorAll('[data-moonwalk-section]')

    if (
      container !== document &&
      !sections.length &&
      container.hasAttribute('data-moonwalk-section')
    ) {
      return [this.initializeSection(container)]
    }

    return Array.from(sections).map((section) =>
      this.initializeSection(section)
    )
  }

  initializeSection(section) {
    this.parseChildren(section)

    if (this.opts.uniqueIds) {
      this.addIds(section)
    }

    if (this.opts.addIndexes) {
      this.addIndexes(section)
    }

    const timeline = gsap.timeline({
      autoRemoveChildren: false,
      smoothChildTiming: false,
    })

    return {
      id: Math.random().toString(36).substring(7),
      el: section,
      name: section.getAttribute('data-moonwalk-section') || null,
      timeline,
      observer: null,
      stage: {
        name: section.getAttribute('data-moonwalk-stage') || null,
        running: false,
        firstTween: false,
      },
      elements: [],
    }
  }

  /**
   * Removes `data-moonwalk` from all elements who already have `data-ll-srcset´
   * Can be used if Moonwalking interferes with custom lazyloading animations
   */
  clearLazyloads(container = document.body) {
    const srcsets = container.querySelectorAll(
      '[data-ll-srcset][data-moonwalk]'
    )
    Array.from(srcsets).forEach((srcset) =>
      srcset.removeAttribute('data-moonwalk')
    )
  }

  /**
   * Look through section for `data-moonwalk-children` or
   * `data-moonwalk-children="{walkName}"`, then convert all children to
   * `data-moonwalk` or `data-moonwalk-{walkName}`
   *
   * @param {*} section
   */
  parseChildren(section) {
    const mwc = Dom.all(section, '[data-moonwalk-children]')

    Array.from(mwc).forEach((c) => {
      const key = c.getAttribute('data-moonwalk-children')
      this.setAttrs(c, key)
    })
  }

  /**
   * Sets all `element`s childrens `data-moonwalk` to `val`
   *
   * @param {*} element
   * @param {*} val
   */
  setAttrs(element, val) {
    const affectedElements = []

    Array.prototype.forEach.call(element.children, (c) => {
      c.setAttribute('data-moonwalk', val)
      affectedElements.push(c)
    })

    return affectedElements
  }

  /**
   * If we have advanced sections, either named sections or section stages.
   * Resets the entry's `from` state, then creates an observer that will
   * watch this section.
   *
   * @param {*} section
   */
  setupNamesAndStages(section) {
    section.el.setAttribute('data-moonwalk-section-ready', '')

    if (!section.stage.name && !section.name) {
      return
    }

    const {
      opts: { walks },
    } = this

    if (section.name) {
      // set initial tweens
      const sectionWalk = walks[section.name]
      if (sectionWalk.sectionTargets) {
        section.children = this.orderChildren(
          section.el.querySelectorAll(sectionWalk.sectionTargets)
        )
      } else {
        section.children = this.orderChildren(section.el.children)
      }

      const fromTransition = sectionWalk.alphaTween
        ? {
            ...sectionWalk.transition.from,
            opacity: 0,
          }
        : sectionWalk.transition.from

      gsap.set(section.children, fromTransition)
    }

    if (section.stage.name) {
      // reset the element to its `from` state.
      const stageTween = walks[section.stage.name]
      if (!stageTween) {
        console.error(
          '==> JUPITER/MOONWALK: MISSING referenced moonwalk stage',
          section.stage.name
        )
      } else {
        gsap.set(section.el, stageTween.transition.from)
      }
    }

    const observer = this.sectionObserver(section)
    observer.observe(section.el)
  }

  /**
   * Create and return an observer for `section`
   *
   * @param {*} section
   */
  sectionObserver(section) {
    const { opts } = this
    const { walks } = opts

    return new IntersectionObserver(
      (entries, self) => {
        for (let i = 0; i < entries.length; i += 1) {
          const entry = entries[i]

          if (entry.isIntersecting) {
            /* stage section */
            if (section.stage.name) {
              if (!section.stage.running) {
                // we have a stage and the section is not running.
                // run stage tween
                const stageTween = walks[section.stage.name]

                const to = {
                  ...stageTween.transition.to,
                  duration: stageTween.duration,
                }

                section.timeline.to(entry.target, to, 0)
                section.stage.firstTween = true
              }
            }

            /* named section. stagger reveal children */
            if (section.name) {
              const tween = walks[section.name]

              if (!tween) {
                console.error(
                  `==> JUPITER: Walk [${section.name}] not found in config`
                )
              }

              if (typeof tween.alphaTween === 'object') {
                tween.alphaTween.duration = tween.alphaTween.duration
                  ? tween.alphaTween.duration
                  : tween.duration
              } else if (tween.alphaTween === true) {
                tween.alphaTween = {
                  duration: tween.duration,
                  ease: 'sine.in',
                }
              }

              if (tween.startDelay) {
                tween.transition.to = {
                  ...tween.transition.to,
                  delay: tween.startDelay,
                }
              }

              section.timeline.staggerTo(
                section.children,
                tween.duration,
                tween.transition.to,
                tween.interval,
                0
              )

              if (tween.alphaTween) {
                section.timeline.staggerTo(
                  section.children,
                  tween.alphaTween.duration,
                  {
                    opacity: 1,
                    ease: tween.alphaTween.ease,
                    delay: tween.startDelay || 0,
                  },
                  tween.interval,
                  0
                )
              }
            }

            self.unobserve(entry.target)
          }
        }
      },
      { rootMargin: opts.rootMargin }
    )
  }

  /**
   * Order `children` by `data-moonwalk-order`.
   *
   * @param {*} children
   */
  orderChildren(children) {
    return Array.from(children).sort((a, b) => {
      const orderA = a.getAttribute('data-moonwalk-order')
        ? parseInt(a.getAttribute('data-moonwalk-order'))
        : null
      const orderB = a.getAttribute('data-moonwalk-order')
        ? parseInt(b.getAttribute('data-moonwalk-order'))
        : null

      if (!orderA && !orderB) {
        return 0
      }

      if (orderA && !orderB) {
        return -1
      }

      if (!orderA && orderB) {
        return 1
      }

      return orderA - orderB
    })
  }

  onReady() {
    if (this.opts.initialDelay) {
      setTimeout(() => {
        this.ready()
      }, this.opts.initialDelay)
    } else {
      this.ready()
    }
  }

  /**
   * Called on `APPLICATION_READY` event, if `config.fireOnReady`.
   * Otherwise must be triggered manually
   */
  ready() {
    const { opts } = this

    for (let idx = 0; idx < this.runs.length; idx += 1) {
      const run = this.runs[idx]

      if (!run) {
        return
      }

      // if this is the last section, set rootMargin to 0
      let rootMargin

      if (idx === this.sections.length - 1) {
        rootMargin = '0px'
      } else {
        if (run.rootMargin) {
          rootMargin = run.rootMargin
        } else {
          rootMargin = opts.rootMargin
        }
      }

      const runObserver = this.runObserver(run, rootMargin)
      runObserver.observe(run.el)
    }

    for (let idx = 0; idx < this.sections.length; idx += 1) {
      const section = this.sections[idx]
      // if this is the last section, set rootMargin to 0
      let rootMargin

      if (idx === this.sections.length - 1) {
        rootMargin = '0px'
      } else {
        rootMargin = opts.rootMargin
      }

      this.setupNamesAndStages(section)

      if (!section.name) {
        section.observer = this.observer(section, rootMargin)
      }

      section.elements = section.el.querySelectorAll('[data-moonwalk]')
      section.elements.forEach((box) => section.observer.observe(box))
    }
  }

  /**
   * Creates and returns the RUN observer for data-moonwalk-run elements
   *
   * @param {*} run
   * @param {*} rootMargin
   */
  runObserver(run, rootMargin) {
    // Store the previous positions of observed elements to compare for exit direction
    const elementPositions = new WeakMap()

    return new IntersectionObserver(
      (entries, self) => {
        for (let i = 0; i < entries.length; i += 1) {
          const entry = entries[i]

          // Store the element's current position in the viewport
          const boundingRect = entry.boundingClientRect
          const viewportHeight = window.innerHeight
          const viewportWidth = window.innerWidth

          if (entry.isIntersecting && run.callback) {
            // Calculate entry direction
            let meta = { direction: null }
            
            // Use the app's scroll direction for reliable detection
            // If scrollDirection is null, the element was likely revealed on initial load
            if (this.app.state && this.app.state.scrollDirection) {
              // Map scroll direction to viewport entry direction
              switch (this.app.state.scrollDirection) {
                case 'down':
                  meta.direction = 'bottom' // When scrolling down, elements enter from bottom
                  break
                case 'up':
                  meta.direction = 'top' // When scrolling up, elements enter from top
                  break
                case 'right':
                  meta.direction = 'left' // When scrolling right, elements enter from left
                  break
                case 'left':
                  meta.direction = 'right' // When scrolling left, elements enter from right
                  break
              }
            }
            // If no scroll direction is available, direction remains null
            
            // Store the element's position when it enters the viewport
            elementPositions.set(entry.target, {
              top: boundingRect.top,
              bottom: boundingRect.bottom,
              left: boundingRect.left,
              right: boundingRect.right
            })
            
            const runRepeated = entry.target.hasAttribute(
              'data-moonwalk-run-triggered'
            )
            run.callback(entry.target, runRepeated, meta)
            entry.target.setAttribute('data-moonwalk-run-triggered', '')
            if (!run.onExit && !run.repeated) {
              self.unobserve(entry.target)
            }
          } else {
            if (
              run.onExit &&
              entry.target.hasAttribute('data-moonwalk-run-triggered')
            ) {
              const runExited = entry.target.hasAttribute(
                'data-moonwalk-run-exit-triggered'
              )
              entry.target.setAttribute('data-moonwalk-run-exit-triggered', '')
              
              // Calculate exit direction
              let meta = { direction: null }
              
              // Use the app's scroll direction for reliable detection
              // For exit direction, it's the opposite of the entry direction for the same scroll
              if (this.app.state && this.app.state.scrollDirection) {
                // Map scroll direction to viewport exit direction
                switch (this.app.state.scrollDirection) {
                  case 'down':
                    meta.direction = 'top' // When scrolling down, elements exit from top
                    break
                  case 'up':
                    meta.direction = 'bottom' // When scrolling up, elements exit from bottom
                    break
                  case 'right':
                    meta.direction = 'right' // When scrolling right, elements exit from right
                    break
                  case 'left':
                    meta.direction = 'left' // When scrolling left, elements exit from left
                    break
                }
              } else {
                // If no scroll direction is available, use the simplest position-based check
                if (boundingRect.bottom <= 0) {
                  meta.direction = 'top'
                } else if (boundingRect.top >= viewportHeight) {
                  meta.direction = 'bottom'
                } else if (boundingRect.right <= 0) {
                  meta.direction = 'left'
                } else if (boundingRect.left >= viewportWidth) {
                  meta.direction = 'right'
                }
              }

              run.onExit(entry.target, runExited, meta)
              if (!run.repeated) {
                self.unobserve(entry.target)
              }
            }
          }
        }
      },
      {
        rootMargin,
        threshold: run.threshold,
      }
    )
  }

  /**
   * Creates and returns the standard observer for all moonwalk elements
   * inside a section.
   *
   * @param {*} section
   * @param {*} rootMargin
   */
  observer(section, rootMargin) {
    const { opts } = this

    return new IntersectionObserver(
      (entries, self) => {
        for (let i = 0; i < entries.length; i += 1) {
          const entry = entries[i]

          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            section.running = true

            if (entry.target.dataset.moonwalkId) {
              console.debug('-- intersecting', entry.target.dataset.moonwalkId)
            }

            const walkName = entry.target.getAttribute('data-moonwalk')
            const cfg = !walkName.length
              ? opts.walks.default
              : opts.walks[walkName]

            const { duration, transition, interval, startDelay } = cfg

            let { alphaTween } = cfg
            let overlap = (duration - interval) * -1 // flip it

            if (section.stage.firstTween) {
              overlap = 0
              section.stage.firstTween = false
            }

            if (typeof alphaTween === 'object' && alphaTween !== null) {
              alphaTween.duration = alphaTween.duration
                ? alphaTween.duration
                : duration
            } else if (alphaTween === true) {
              alphaTween = {
                duration,
                ease: 'sine.in',
              }
            }

            const tween = transition ? this.tweenJS : this.tweenCSS

            const tweenFn = () => {
              tween(
                section,
                entry.target,
                duration,
                interval,
                transition,
                overlap,
                alphaTween
              )
            }

            const wrappedTweenFn = () => {
              if (startDelay) {
                gsap.delayedCall(startDelay, tweenFn)
              } else {
                tweenFn()
              }
            }

            if (entry.target.tagName === 'IMG') {
              // ensure image is loaded before we tween
              imageIsLoaded(entry.target).then(() => wrappedTweenFn())
            } else {
              if (entry.target.hasAttribute('data-placeholder')) {
                // if the moonwalked element has data-placeholder, we don't want to wait
                // for the image to load before tweening
                wrappedTweenFn()
              } else {
                const imagesInEntry = entry.target.querySelectorAll('img')
                if (imagesInEntry.length) {
                  const allPlaceholders = Array.from(imagesInEntry).every(
                    (img) => img.hasAttribute('data-ll-placeholder')
                  )

                  // if all images in the entry have `data-ll-placeholder`,
                  // they are lazyloaded and we don't need to wait
                  if (allPlaceholders) {
                    wrappedTweenFn()
                  } else {
                    imagesAreLoaded(imagesInEntry).then(() => wrappedTweenFn())
                  }
                } else {
                  // regular entry, just tween it
                  wrappedTweenFn()
                }
              }
            }
            self.unobserve(entry.target)
          }
        }
      },
      {
        rootMargin,
        threshold: opts.threshold,
      }
    )
  }

  /**
   * The main tween function
   *
   * @param {*} section
   * @param {*} target
   * @param {*} tweenDuration
   * @param {*} tweenTransition
   * @param {*} tweenOverlap
   * @param {*} alphaTween
   */
  tweenJS(
    section,
    target,
    tweenDuration,
    tweenInterval,
    tweenTransition,
    tweenOverlap,
    alphaTween
  ) {
    let tweenPosition
    const startingPoint = tweenDuration - tweenOverlap

    if (Dom.hasAttribute(target, 'data-moonwalked')) {
      return
    }

    if (section.timeline.isActive() && section.timeline.recent()) {
      const currentTime = section.timeline.time()
      const lastTweenTime = section.timeline.recent().time()
      const lastTweenEndTime = section.timeline.recent().endTime()
      if (lastTweenTime > startingPoint) {
        /* We're late for this tween if it was supposed to be sequential,
        so insert at current time in timeline instead */
        tweenPosition = () => section.timeline.time()
      } else {
        if (currentTime + tweenOverlap * -1 < lastTweenEndTime) {
          /* Still time, add as normal overlap at the end */
          tweenPosition = () => `>${tweenOverlap}`
        } else {
          /* Won't make it */
          tweenPosition = () => section.timeline.time()
        }
      }
    } else {
      tweenPosition = () => '>'
    }

    gsap.set(target, tweenTransition.from)

    const toTransition = {
      ...tweenTransition.to,
      duration: tweenDuration,
      onComplete: () => target.setAttribute('data-moonwalked', ''),
    }

    section.timeline.to(target, toTransition, tweenPosition())

    if (alphaTween) {
      section.timeline.to(
        target,
        {
          duration: alphaTween.duration,
          opacity: 1,
          ease: alphaTween.ease,
          delay: alphaTween.delay ? alphaTween.delay : 0,
        },
        '<'
      )
    }
  }

  /**
   * CSS version. Not quite ready yet.
   *
   * @param {*} section
   * @param {*} target
   * @param {*} duration
   * @param {*} transition
   * @param {*} overlap
   */
  tweenCSS(
    section,
    target,
    tweenDuration,
    tweenInterval,
    tweenTransition,
    tweenOverlap
  ) {
    let tweenPosition
    const startingPoint = tweenDuration - tweenOverlap * -1

    if (Dom.hasAttribute(target, 'data-moonwalked')) {
      return
    }

    if (section.timeline.isActive() && section.timeline.recent()) {
      const currentTime = section.timeline.time()
      const lastTweenTime = section.timeline.recent().time()
      const lastTweenEndTime = section.timeline.recent().endTime()
      if (lastTweenTime > startingPoint) {
        /* We're late for this tween if it was supposed to be sequential,
        so insert at current time in timeline instead */
        tweenPosition = () => section.timeline.time()
      } else {
        if (currentTime + tweenOverlap * -1 < lastTweenEndTime) {
          /* Still time, add as normal overlap at the end */
          tweenPosition = () => `>${tweenOverlap}`
        } else {
          /* Won't make it */
          tweenPosition = () => section.timeline.time()
        }
      }
    } else {
      tweenPosition = () => '>'
    }

    section.timeline
      .to(
        target,
        {
          css: {
            className: target.className
              ? `${target.className} moonwalked`
              : 'moonwalked',
          },
          duration: tweenDuration,
        },
        tweenPosition()
      )
      .call(() => target.setAttribute('data-moonwalked', ''), null, '>')
  }
}
