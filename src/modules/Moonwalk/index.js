/**
 * Vendor imports
 */
import { animate, stagger } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'

/**
 * Jupiter imports
 */
import * as Events from '../../events'
import prefersReducedMotion from '../../utils/prefersReducedMotion'
import imageIsLoaded from '../../utils/imageIsLoaded'
import imagesAreLoaded from '../../utils/imagesAreLoaded'
import { set, delayedCall, convertEasing } from '../../utils/motion-helpers'
import Dom from '../Dom'

/**
 * Debug logging
 */
const DEBUG = false
let _idCounter = 0

const MOONWALK_ATTRS = ['data-moonwalk', 'data-moonwalk-section', 'data-moonwalk-children']

function logMoonwalk(category, message, data = {}) {
  if (DEBUG) {
    console.log(`[Moonwalk:${category}]`, message, data)
  }
}

function logComputedStyle(element, props = ['opacity', 'transform']) {
  if (DEBUG && element) {
    const computed = window.getComputedStyle(element)
    const values = {}
    props.forEach((prop) => (values[prop] = computed[prop]))
    console.log('[Moonwalk:ComputedStyle]', element, values)
  }
}

/**
 * @typedef {Object} MoonwalkTransition
 * @property {Object} from - Starting properties for the transition
 * @property {Object} to - Ending properties for the transition
 */

/**
 * @typedef {Object} AlphaTweenConfig
 * @property {number} [duration] - Duration of the alpha tween (defaults to walk duration)
 * @property {string} [ease] - Easing function (defaults to 'easeIn')
 * @property {number} [delay] - Additional delay before the alpha tween starts
 */

/**
 * @typedef {Object} MoonwalkWalk
 * @property {number} [startDelay=0] - Delay before the animation starts
 * @property {number} [interval=0.15] - Time between animations in a sequence
 * @property {number} [duration=0.65] - Duration of the animation
 * @property {boolean|AlphaTweenConfig} [alphaTween=false] - Whether to add a separate opacity tween. Pass `true` for defaults or an AlphaTweenConfig object for control.
 * @property {MoonwalkTransition|null} transition - The transition configuration. Set to `null` for CSS-only mode (uses `data-moonwalked` attribute for CSS transitions).
 * @property {string} [sectionTargets] - CSS selector for targeting elements in named sections (instead of using direct children)
 */

/**
 * @typedef {Object} MoonwalkRunMeta
 * @property {string|null} direction - The viewport entry/exit direction ('top', 'bottom', 'left', 'right', or null)
 */

/**
 * @typedef {Object} MoonwalkRun
 * @property {number} [threshold=0] - IntersectionObserver threshold
 * @property {(el: HTMLElement, repeated: boolean, meta: MoonwalkRunMeta) => void} callback - Function called when element enters viewport
 * @property {(el: HTMLElement, exited: boolean, meta: MoonwalkRunMeta) => void} [onExit] - Function called when element exits viewport
 * @property {boolean} [repeated=false] - Whether the run should repeat
 * @property {string} [rootMargin] - IntersectionObserver rootMargin
 * @property {(el: HTMLElement) => void} [initialize] - Function called during initialization
 * @property {(el: HTMLElement) => void} [onReady] - Function called when APPLICATION_REVEALED fires, before viewport observers start
 */

/**
 * @typedef {Object} MoonwalkOptions
 * @property {string|null} [on=Events.APPLICATION_REVEALED] - Event name to trigger animations. Set to `null` to trigger manually via `ready()`.
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
 * @property {Object.<string, MoonwalkWalk>} [walks] - Walk configurations
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
 * Normalize alphaTween config into a consistent object form.
 * Returns a new object (never mutates the original).
 */
export function normalizeAlphaTween(alphaTween, duration) {
  if (typeof alphaTween === 'object' && alphaTween !== null) {
    return { ...alphaTween, duration: alphaTween.duration || duration }
  }
  if (alphaTween === true) {
    return { duration, ease: 'easeIn' }
  }
  return alphaTween
}

/**
 * Moonwalk animation system for scroll-based reveal animations.
 *
 * ## HTML attributes
 *
 * - `data-moonwalk` / `data-moonwalk="{walkName}"` — marks an element for scroll-triggered animation
 * - `data-moonwalk-section` / `data-moonwalk-section="{walkName}"` — groups elements; unnamed sections
 *   animate children individually, named sections stagger-reveal all children at once
 * - `data-moonwalk-children` / `data-moonwalk-children="{walkName}"` — converts direct children
 *   into `data-moonwalk` (or `data-moonwalk="{walkName}"`) elements automatically
 * - `data-moonwalk-stage="{walkName}"` — applies a walk transition to the section element itself
 *   before its children animate (e.g. fade in a container, then reveal items)
 * - `data-moonwalk-order="{number}"` — overrides the DOM order of children inside a named section;
 *   elements with order are sorted first, unordered elements keep their relative position
 * - `data-moonwalk-run="{runName}"` — standalone observer-based callback (not part of walk system)
 * - `data-placeholder` / `data-ll-placeholder` — skip waiting for image load before tweening
 *
 * ## CSS-only mode
 *
 * Set `transition: null` on a walk to use CSS-only animations. Moonwalk will stagger-add the
 * `data-moonwalked` attribute instead of running JS tweens. Style the reveal via CSS:
 * ```css
 * [data-moonwalk="fade"] { opacity: 0; transition: opacity 0.5s; }
 * [data-moonwalk="fade"][data-moonwalked] { opacity: 1; }
 * ```
 *
 * ## alphaTween
 *
 * Can be `true` (defaults: duration from walk, ease `'easeIn'`) or an object:
 * `{ duration?: number, ease?: string, delay?: number }` for fine-grained control
 * over a separate opacity animation layered on top of the main transition.
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
      this.opts.on = null
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
    this._observers = []
    this.sections = this.initializeSections(container)
    this.runs = this.initializeRuns(container)

    if (this.opts.clearLazyload) {
      this.clearLazyloads(container)
    }

    if (prefersReducedMotion() && this.app.opts.respectReducedMotion) {
      this.removeAllWalks(container)
    }

    if (this.opts.on && typeof this.opts.on === 'string') {
      this._boundOnReady = this.onReady.bind(this)
      window.addEventListener(this.opts.on, this._boundOnReady)
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
    MOONWALK_ATTRS.forEach((key) => {
      const elems = container.querySelectorAll(`[${key}]`)
      Array.from(elems).forEach((el) => el.removeAttribute(key))
      container.removeAttribute(key)
    })
  }

  removeFor(container = document.body, selector) {
    MOONWALK_ATTRS.forEach((key) => {
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
      el.setAttribute('data-moonwalk-id', `mw-${++_idCounter}`)
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
    })
  }

  /**
   * Go through each `data-moonwalk-run`, parse children, add IDs/indexes
   * (if wanted), initialize a new object for each.
   */
  initializeRuns(container = document.body) {
    const runs = container.querySelectorAll('[data-moonwalk-run]')
    return Array.from(runs).map((run) => {
      const runName = run.getAttribute('data-moonwalk-run')
      const foundRun = this.opts.runs[runName]
      if (!foundRun) {
        console.warn(`==> JUPITER/MOONWALK: Unknown run "${runName}" — not found in opts.runs`)
        return null
      }

      if (foundRun.initialize) {
        foundRun.initialize(run)
      }
      return {
        el: run,
        threshold: foundRun.threshold || 0,
        initialize: foundRun.initialize,
        onReady: foundRun.onReady,
        callback: foundRun.callback,
        onExit: foundRun.onExit,
        repeated: foundRun.repeated,
        rootMargin: foundRun.rootMargin,
      }
    }).filter(Boolean)
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

    return {
      id: `mw-${++_idCounter}`,
      el: section,
      name: section.getAttribute('data-moonwalk-section') || null,
      animation: {
        lastDelay: 0,
        lastDuration: 0,
        lastStartTime: null,
      },
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

    Array.from(element.children).forEach((c) => {
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

      // Only set initial states for JS animations (transition !== null)
      if (sectionWalk.transition) {
        const fromTransition = sectionWalk.alphaTween
          ? {
              ...sectionWalk.transition.from,
              opacity: 0,
            }
          : sectionWalk.transition.from

        logMoonwalk('InitialState', 'Setting initial state for named section', {
          section: section.name,
          childCount: section.children.length,
          fromTransition,
        })
        set(section.children, fromTransition)

        // Check if styles were actually applied
        if (section.children.length > 0) {
          logComputedStyle(section.children[0])
        }
      } else {
        logMoonwalk('InitialState', 'Skipping initial state for CSS-only section', {
          section: section.name,
          childCount: section.children.length,
        })
      }
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
        logMoonwalk('InitialState', 'Setting stage initial state', {
          stage: section.stage.name,
          from: stageTween.transition.from,
        })
        set(section.el, stageTween.transition.from)
        logComputedStyle(section.el)
      }
    }

    const observer = this.sectionObserver(section)
    section.observer = observer
    this._observers.push(observer)
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

                animate(entry.target, stageTween.transition.to, {
                  duration: stageTween.duration,
                })
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

              logMoonwalk('SectionObserver', 'Named section triggered', {
                sectionName: section.name,
                childCount: section.children.length,
                interval: tween.interval,
                duration: tween.duration,
                hasAlphaTween: !!tween.alphaTween,
                isCssOnly: !tween.transition,
              })

              // Check if this is CSS-only animation (transition: null)
              if (!tween.transition) {
                // CSS-only mode - stagger adding the data-moonwalked attribute
                logMoonwalk('SectionObserver', 'Using CSS-only mode', {
                  sectionName: section.name,
                })

                section.children.forEach((child, index) => {
                  const delay = (tween.startDelay || 0) + index * tween.interval
                  delayedCall(delay, () => {
                    child.setAttribute('data-moonwalked', '')
                  })
                })
              } else {
                // JS animation mode
                const resolvedAlpha = normalizeAlphaTween(tween.alphaTween, tween.duration)

                // Extract ease from to values and convert for Motion.js
                const { ease: tweenEase, ...toValues } = tween.transition.to
                const convertedEase = convertEasing(tweenEase || 'easeOut')

                const animationOptions = {
                  duration: tween.duration,
                  ease: convertedEase,
                  delay: stagger(tween.interval, {
                    startDelay: tween.startDelay || 0,
                  }),
                }

                logMoonwalk('SectionObserver', 'Starting stagger animation', {
                  sectionName: section.name,
                  to: toValues,
                  ease: convertedEase,
                  options: animationOptions,
                })

                animate(section.children, toValues, animationOptions)

                if (resolvedAlpha) {
                  animate(
                    section.children,
                    { opacity: 1 },
                    {
                      duration: resolvedAlpha.duration,
                      ease: convertEasing(resolvedAlpha.ease || 'easeIn'),
                      delay: stagger(tween.interval, {
                        startDelay: tween.startDelay || 0,
                      }),
                    }
                  )
                }
              }
            }

            self.unobserve(entry.target)
          }
        }
      },
      { rootMargin: opts.rootMargin, threshold: opts.threshold }
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
      const orderB = b.getAttribute('data-moonwalk-order')
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

  /**
   * Calculate the delay for the next animation in the section.
   * This replaces GSAP's timeline.recent() logic.
   *
   * @param {*} section - The section object
   * @param {*} duration - Duration of the animation to add
   * @param {*} overlap - How much the animations should overlap
   * @returns {number} The delay in seconds
   */
  calculateDelay(section, duration, overlap) {
    if (!section.animation.lastStartTime) {
      // First animation in section
      logMoonwalk('DelayCalc', 'First animation in section', { delay: 0 })
      return 0
    }

    const now = performance.now()
    const elapsed = (now - section.animation.lastStartTime) / 1000
    // overlap is negative when animations should stagger (start before previous ends)
    // So we ADD overlap (which is negative) to get the correct next start time
    const idealNextStart =
      section.animation.lastDelay + section.animation.lastDuration + overlap
    const actualDelay = Math.max(0, idealNextStart - elapsed)

    logMoonwalk('DelayCalc', 'Calculating delay', {
      elapsed: elapsed.toFixed(3),
      lastDelay: section.animation.lastDelay,
      lastDuration: section.animation.lastDuration,
      overlap,
      idealNextStart,
      actualDelay: actualDelay.toFixed(3),
    })

    return actualDelay
  }

  /**
   * Update the animation state after adding an animation.
   *
   * @param {*} section - The section object
   * @param {*} delay - The delay that was used
   * @param {*} duration - The duration of the animation
   */
  updateAnimationState(section, delay, duration) {
    const previousState = { ...section.animation }

    section.animation.lastDelay = delay
    section.animation.lastDuration = duration
    section.animation.lastStartTime = performance.now()

    logMoonwalk('StateUpdate', 'Updating animation state', {
      delay,
      duration,
      previousState,
      newState: { ...section.animation },
    })
  }

  destroy() {
    if (this.opts.on && typeof this.opts.on === 'string' && this._boundOnReady) {
      window.removeEventListener(this.opts.on, this._boundOnReady)
      this._boundOnReady = null
    }

    if (this._observers) {
      this._observers.forEach(obs => obs.disconnect())
      this._observers = []
    }

    if (this.sections) {
      this.sections.forEach(section => {
        section.el = null
        section.elements = []
        section.children = null
        section.observer = null
      })
      this.sections = []
    }

    if (this.runs) {
      this.runs.forEach(run => {
        run.el = null
        run.observer = null
      })
      this.runs = []
    }
  }

  onReady() {
    if (this.opts.initialDelay) {
      setTimeout(() => {
        this.ready()
      }, this.opts.initialDelay * 1000)
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

    // Execute onReady callbacks for all runs
    for (let idx = 0; idx < this.runs.length; idx += 1) {
      const run = this.runs[idx]
      if (run.onReady) {
        run.onReady(run.el)
      }
    }

    for (let idx = 0; idx < this.runs.length; idx += 1) {
      const run = this.runs[idx]

      // if this is the last section, set rootMargin to 0
      let rootMargin

      if (idx === this.runs.length - 1) {
        rootMargin = '0px'
      } else {
        if (run.rootMargin) {
          rootMargin = run.rootMargin
        } else {
          rootMargin = opts.rootMargin
        }
      }

      const runObserver = this.runObserver(run, rootMargin)
      run.observer = runObserver
      this._observers.push(runObserver)
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
        this._observers.push(section.observer)
      }

      section.elements = section.el.querySelectorAll('[data-moonwalk]')

      // Only set initial states and observe individual elements for unnamed sections
      // Named sections are observed at the section level via sectionObserver
      if (!section.name) {
        // Set initial states for tweenJS elements BEFORE observing
        section.elements.forEach((element) => {
          const walkName = element.getAttribute('data-moonwalk')
          const cfg = !walkName.length
            ? opts.walks.default
            : opts.walks[walkName]

          // Only set initial state if this uses tweenJS (has transition property)
          if (cfg && cfg.transition) {
            logMoonwalk('InitialState', 'Setting initial state for individual element', {
              walkName: walkName || 'default',
              from: cfg.transition.from,
            })
            set(element, cfg.transition.from)
          }
        })

        section.elements.forEach((box) => section.observer.observe(box))
      }
    }
  }

  /**
   * Get the viewport entry direction based on current scroll direction.
   * When entering, elements appear from the opposite side of scroll direction.
   *
   * @param {boolean} isEntry - Whether this is an entry (true) or exit (false)
   * @returns {string|null}
   */
  getScrollDirection(isEntry) {
    if (!this.app.state || !this.app.state.scrollDirection) {
      return null
    }

    const entryMap = { down: 'bottom', up: 'top', right: 'left', left: 'right' }
    const exitMap = { down: 'top', up: 'bottom', right: 'right', left: 'left' }
    const map = isEntry ? entryMap : exitMap

    return map[this.app.state.scrollDirection] || null
  }

  /**
   * Get the exit direction for an element, falling back to position-based
   * detection when scroll direction is unavailable.
   *
   * @param {IntersectionObserverEntry} entry
   * @returns {string|null}
   */
  getExitDirection(entry) {
    const scrollDir = this.getScrollDirection(false)
    if (scrollDir) {
      return scrollDir
    }

    const { boundingClientRect: rect } = entry
    if (rect.bottom <= 0) return 'top'
    if (rect.top >= window.innerHeight) return 'bottom'
    if (rect.right <= 0) return 'left'
    if (rect.left >= window.innerWidth) return 'right'
    return null
  }

  /**
   * Creates and returns the RUN observer for data-moonwalk-run elements
   *
   * @param {*} run
   * @param {*} rootMargin
   */
  runObserver(run, rootMargin) {
    return new IntersectionObserver(
      (entries, self) => {
        for (let i = 0; i < entries.length; i += 1) {
          const entry = entries[i]

          if (entry.isIntersecting && run.callback) {
            const meta = { direction: this.getScrollDirection(true) }

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

              const meta = { direction: this.getExitDirection(entry) }

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
            const walkName = entry.target.getAttribute('data-moonwalk')
            const targetId =
              entry.target.getAttribute('data-testid') ||
              walkName ||
              entry.target.className

            logMoonwalk('Observer', 'Element entered viewport', {
              target: targetId,
              walkName,
              isIntersecting: entry.isIntersecting,
              intersectionRatio: entry.intersectionRatio,
            })
            const cfg = !walkName.length
              ? opts.walks.default
              : opts.walks[walkName]

            const { duration, transition, startDelay } = cfg
            // Default interval to 0.15 if not specified (same as default walk)
            const interval = cfg.interval !== undefined ? cfg.interval : 0.15

            const alphaTween = normalizeAlphaTween(cfg.alphaTween, duration)
            let overlap = interval - duration

            if (section.stage.firstTween) {
              overlap = 0
              section.stage.firstTween = false
            }

            const tweenFn = () => {
              if (transition) {
                this.tweenJS(
                  section,
                  entry.target,
                  duration,
                  interval,
                  transition,
                  overlap,
                  alphaTween
                )
              } else {
                this.tweenCSS(
                  section,
                  entry.target,
                  duration,
                  interval,
                  transition,
                  overlap
                )
              }
            }

            const wrappedTweenFn = () => {
              if (startDelay) {
                delayedCall(startDelay, tweenFn)
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
   * @param {*} tweenInterval
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
    const targetId =
      target.getAttribute('data-testid') ||
      target.getAttribute('data-moonwalk') ||
      target.className

    logMoonwalk('TweenJS', 'Starting tweenJS', {
      target: targetId,
      duration: tweenDuration,
      overlap: tweenOverlap,
      hasAlphaTween: !!alphaTween,
    })

    if (Dom.hasAttribute(target, 'data-moonwalked')) {
      logMoonwalk('TweenJS', 'Already moonwalked, skipping', { target: targetId })
      return
    }

    // Calculate delay using our new helper method
    const delay = this.calculateDelay(section, tweenDuration, tweenOverlap)

    // Initial state should already be set during ready()
    // Only log for debugging
    logMoonwalk('TweenJS', 'Element should already have initial state', {
      target: targetId,
      expectedFrom: tweenTransition.from,
    })
    logComputedStyle(target, ['opacity', 'transform', 'x', 'y'])

    // Extract ease from to values (GSAP format) and convert to Motion easing option
    const { ease, ...toValues } = tweenTransition.to
    const easingOption = convertEasing(ease || 'easeOut')

    logMoonwalk('TweenJS', 'Starting animation', {
      target: targetId,
      toValues,
      duration: tweenDuration,
      delay: delay.toFixed(3),
      ease: easingOption,
    })

    // Animate to final state
    const animation = animate(target, toValues, {
      duration: tweenDuration,
      delay,
      ease: easingOption,
    })

    // Use .finished promise for completion callback
    if (animation && animation.finished) {
      animation.finished
        .then(() => {
          logMoonwalk('TweenJS', 'Animation completed', { target: targetId })
          target.setAttribute('data-moonwalked', '')
        })
        .catch((err) => {
          // Animation cancelled or failed, still mark as walked
          logMoonwalk('TweenJS', 'Animation failed/cancelled', {
            target: targetId,
            error: err,
          })
          target.setAttribute('data-moonwalked', '')
        })
    } else {
      // No animation object returned, mark immediately
      logMoonwalk('TweenJS', 'No animation object returned', { target: targetId })
      target.setAttribute('data-moonwalked', '')
    }

    // Optional separate alpha animation
    if (alphaTween) {
      logMoonwalk('TweenJS', 'Adding alpha tween', {
        target: targetId,
        duration: alphaTween.duration,
        delay: (delay + (alphaTween.delay || 0)).toFixed(3),
      })
      animate(target, { opacity: 1 }, {
        duration: alphaTween.duration,
        ease: convertEasing(alphaTween.ease || 'easeIn'),
        delay: delay + (alphaTween.delay || 0),
      })
    }

    // Update animation state for next element
    this.updateAnimationState(section, delay, tweenDuration)
  }

  /**
   * CSS version. Not quite ready yet.
   *
   * @param {*} section
   * @param {*} target
   * @param {*} tweenDuration
   * @param {*} tweenInterval
   * @param {*} tweenTransition
   * @param {*} tweenOverlap
   */
  tweenCSS(
    section,
    target,
    tweenDuration,
    tweenInterval,
    tweenTransition,
    tweenOverlap
  ) {
    if (Dom.hasAttribute(target, 'data-moonwalked')) {
      return
    }

    // Calculate delay using our helper method for stagger effect
    const calculatedDelay = this.calculateDelay(
      section,
      tweenDuration,
      tweenOverlap
    )

    const targetId = target.getAttribute('data-testid') || target.className

    logMoonwalk('TweenCSS', 'Scheduling CSS animation', {
      target: targetId,
      delay: calculatedDelay.toFixed(3),
      duration: tweenDuration,
    })

    // Add class after delay to trigger CSS transition
    delayedCall(calculatedDelay, () => {
      logMoonwalk('TweenCSS', 'Adding moonwalked attribute', {
        target: targetId,
      })
      target.classList.add('moonwalked')
      target.setAttribute('data-moonwalked', '')
    })

    // Update animation state for next element in section
    this.updateAnimationState(section, calculatedDelay, tweenDuration)
  }
}
