import VirtualScroll from 'virtual-scroll'
import { damp, symmetricMod } from './utils'

/** default config */
const DEFAULT_CONFIG = {
  /** Params */
  infinite: false,
  snap: false,
  crawl: false,
  crawlSpeed: 0.03,
  reverse: false,
  dragSensitivity: 0.007,
  lerpFactor: 0.3,
  scrollSensitivity: 1,
  snapStrength: 0.1,
  speedDecay: 0.85,
  bounceLimit: 1,
  slowCrawlOnHover: false,
  virtualScroll: {
    mouseMultiplier: 0.5,
    touchMultiplier: 2,
    firefoxMultiplier: 30,
    useKeyboard: false,
    passive: true,
  },
  setOffset: ({ itemWidth, wrapperWidth }) => itemWidth,

  /** Functionality */
  scrollInput: false,
}

export class Core {
  /* config */
  speed = 0
  crawlSpeed = 0
  #lspeed = 0
  #previousSpeed = 0
  #offset = 0
  #previousTime = 0
  deltaTime = 0
  atRest = true
  #crawlTimer = null
  #currentCrawlSpeed = 0
  #isHovering = false
  #targetCrawlSpeedMultiplier = 1
  snapping = false

  /* flags */
  #isActive = true
  #isPaused = false

  #currentSlide = 0
  #previousSlide = 0

  config = {}
  wrapper = null
  items = []
  viewport = null
  isDragging = false
  dragStart = 0
  dragStartTarget = 0
  isVisible = false
  current = 0
  target = 0
  maxScroll = 0
  resizeTimeout = null
  virtualScroll = null
  observer = null
  touchStartY = 0
  touchStartX = 0
  scrollDirection = 'horizontal'
  parallaxValues = []
  webglValue = 0

  constructor(wrapper, config = {}) {
    this.speed = 0
    this.#lspeed = 0
    this.#offset = 0
    this.#previousTime = 0
    this.deltaTime = 0
    this.crawlSpeed = 0
    this.crawling = false
    this.snapping = false
    this.#currentCrawlSpeed = 0

    /* flags */
    this.#isActive = true
    this.#isPaused = false

    this.#currentSlide = 0
    this.#previousSlide = 0

    // Parse data attributes from the wrapper
    const dataConfig = this.#parseDataAttributes(wrapper)

    this.config = {
      ...DEFAULT_CONFIG,
      ...dataConfig,
      ...config,
    }

    if (config.onSlideChange) this.onSlideChange = config.onSlideChange
    if (config.onResize) this.onResize = config.onResize
    if (config.onUpdate) this.onUpdate = config.onUpdate

    delete this.config.onSlideChange
    delete this.config.onResize
    delete this.config.onUpdate

    this.wrapper = wrapper
    this.items = [...wrapper.children]

    this.current = 0
    this.target = 0
    this.isDragging = false
    this.dragStart = 0
    this.dragStartTarget = 0
    this.isVisible = false

    this.#currentSlide = 0
    this.#previousSlide = 0

    // Initialize
    this.#setupViewport()
    this.#setupCrawl()
    this.#setupIntersectionObserver()
    this.#addEventListeners()
    this.wrapper.style.cursor = 'grab'

    this.#preventDrag()
    this.#setupViewport()
    this.#setupVirtualScroll()

    // Initialize snapping state based on config
    // If crawling is active from the start, don't enable snapping
    this.snapping = this.config.snap && !this.crawling

    // Start at rest, and start crawling immediately if crawl is enabled
    this.atRest = true
    if (this.config.crawl && this.config.crawlSpeed) {
      this.crawling = true
      this.snapping = false
    }
  }

  #parseDataAttributes(wrapper) {
    const dataConfig = {}

    // Parse data-looper-infinite
    if (wrapper.hasAttribute('data-looper-infinite')) {
      dataConfig.infinite = true
    }

    // Parse data-looper-snap
    if (wrapper.hasAttribute('data-looper-snap')) {
      dataConfig.snap = true
    }

    // Parse data-looper-crawl
    if (wrapper.hasAttribute('data-looper-crawl')) {
      dataConfig.crawl = true
    }

    // Parse data-looper-reverse
    if (wrapper.hasAttribute('data-looper-reverse')) {
      dataConfig.reverse = true
    }

    return dataConfig
  }

  #preventDrag() {
    this.items.forEach(item => {
      // find image
      const image = item.querySelector('img')
      if (image) {
        image.draggable = false
      }
    })
  }

  #setupCrawl() {
    if (this.config.crawl && this.config.crawlSpeed) {
      this.originalCrawlSpeed = Math.abs(this.config.crawlSpeed)
      this.crawlSpeed = this.config.reverse ? -this.originalCrawlSpeed : this.originalCrawlSpeed
      this.#currentCrawlSpeed = 0
      this.crawling = false
      this.snapping = false
    }
  }

  #setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0,
    }

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting
      })
    }, options)

    this.observer.observe(this.wrapper)
  }

  duplicateItems() {
    const extraItems = []
    this.items.forEach(item => {
      const clonedItem = item.cloneNode(true)
      clonedItem.setAttribute('aria-hidden', 'true')
      this.wrapper.appendChild(clonedItem)
      extraItems.push(clonedItem)
    })
    this.items.push(...extraItems)
    this.#setupViewport()
  }

  #setupViewport() {
    this.viewport = {
      itemWidth: this.items[0].getBoundingClientRect().width,
      wrapperWidth: this.wrapper.clientWidth,
      totalWidth: this.items.reduce((sum, item) => sum + item.clientWidth, 0),
    }

    // get the totalWidth without the last two items
    const totalWidthWithoutLastTwoItems =
      this.items.reduce((sum, item) => sum + item.clientWidth, 0) -
      this.items[this.items.length - 1].clientWidth -
      this.items[this.items.length - 2].clientWidth

    if (totalWidthWithoutLastTwoItems < window.innerWidth) {
      this.duplicateItems()
      return
    }

    this.#offset = this.config.setOffset(this.viewport)
    this.maxScroll = -(this.viewport.totalWidth - this.#offset) / this.viewport.itemWidth

    queueMicrotask(() => {
      if (this.onResize) this.onResize(this)
    })
  }

  #addEventListeners() {
    // Store references to event handlers for proper cleanup
    this.mouseDownHandler = e => this.#handleDragStart(e)
    this.mouseMoveHandler = e => this.#handleDragMove(e)
    this.mouseUpHandler = () => this.#handleDragEnd()

    this.wrapper.addEventListener('mousedown', this.mouseDownHandler)
    window.addEventListener('mousemove', this.mouseMoveHandler)
    window.addEventListener('mouseup', this.mouseUpHandler)

    const SCROLL_THRESHOLD = 5

    this.touchStartHandler = e => {
      const touch = e.touches[0]
      this.touchStartY = touch.clientY
      this.touchStartX = touch.clientX
      this.scrollDirection = undefined
      this.#handleDragStart(touch)
    }

    this.touchMoveHandler = e => {
      const touch = e.touches[0]
      const deltaY = Math.abs(touch.clientY - this.touchStartY)
      const deltaX = Math.abs(touch.clientX - this.touchStartX)

      if (!this.scrollDirection && (deltaX > SCROLL_THRESHOLD || deltaY > SCROLL_THRESHOLD)) {
        this.scrollDirection = deltaX > deltaY ? 'horizontal' : 'vertical'
      }

      if (this.scrollDirection === 'horizontal') {
        e.preventDefault()
        this.#handleDragMove(touch)
      }
    }

    this.touchEndHandler = () => {
      this.scrollDirection = undefined
      this.#handleDragEnd()
    }

    this.wrapper.addEventListener('touchstart', this.touchStartHandler)
    window.addEventListener('touchmove', this.touchMoveHandler, { passive: false })
    window.addEventListener('touchend', this.touchEndHandler)

    // Add hover event listeners if slowCrawlOnHover is enabled
    if (this.config.slowCrawlOnHover) {
      this.mouseEnterHandler = () => {
        this.#isHovering = true
        this.#targetCrawlSpeedMultiplier = 0.5 // Slow to half speed
      }

      this.mouseLeaveHandler = () => {
        this.#isHovering = false
        this.#targetCrawlSpeedMultiplier = 1 // Back to full speed
      }

      this.wrapper.addEventListener('mouseenter', this.mouseEnterHandler)
      this.wrapper.addEventListener('mouseleave', this.mouseLeaveHandler)
    }

    const resizeObserver = new ResizeObserver(() => {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(() => this.resize(), 10)
    })
    resizeObserver.observe(this.wrapper)
  }

  /** Events */

  #calculateBounds(newTarget) {
    if (!this.config.infinite) {
      if (newTarget > this.config.bounceLimit) {
        return this.config.bounceLimit
      } else if (newTarget < this.maxScroll - this.config.bounceLimit) {
        return this.maxScroll - this.config.bounceLimit
      }
    }
    return newTarget
  }

  #setupVirtualScroll() {
    this.virtualScroll = new VirtualScroll({
      ...this.config.virtualScroll,
      el: this.wrapper,
    })

    const SCROLL_THRESHOLD = 5

    this.virtualScroll.on(event => {
      if (!this.isDragging && !this.#isPaused) {
        if (event.touchDevice) {
          const deltaY = Math.abs(event.deltaY)
          const deltaX = Math.abs(event.deltaX)

          if (deltaY < SCROLL_THRESHOLD && deltaX < SCROLL_THRESHOLD) return
          if (deltaY > deltaX) return
        }

        const delta = !this.config.scrollInput
          ? event.deltaX
          : Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY

        const deltaX = delta * this.config.scrollSensitivity * 0.001
        let newTarget = this.target + deltaX

        if (!this.config.infinite) {
          if (newTarget > 0) {
            newTarget = 0
          } else if (newTarget < this.maxScroll) {
            newTarget = this.maxScroll
          }
        }

        this.target = this.#calculateBounds(newTarget)
        this.speed = -deltaX * 10
      }
    })
  }

  #handleDragStart(event) {
    if (this.#isPaused) return
    this.isDragging = true
    this.dragStart = event.clientX
    this.dragStartTarget = this.target
    this.wrapper.style.cursor = 'grabbing'
    this.atRest = false

    // Always enable snapping during drag if config.snap is true
    if (this.config.snap) {
      this.snapping = true
    }

    if (this.#crawlTimer) {
      clearTimeout(this.#crawlTimer)
      this.#crawlTimer = null
    }

    // Stop crawling when drag starts
    this.crawling = false
    this.#currentCrawlSpeed = 0
  }

  #handleDragMove(event) {
    if (!this.isDragging || this.#isPaused) return

    const deltaX = event.clientX - this.dragStart
    let newTarget = this.dragStartTarget + deltaX * this.config.dragSensitivity

    this.target = this.#calculateBounds(newTarget)
    if ('movementX' in event) {
      this.speed += event.movementX * 0.01
    }
  }

  #handleDragEnd() {
    this.isDragging = false
    this.wrapper.style.cursor = 'grab'

    // Keep snapping enabled after drag if config.snap is true
    // It will stay true until we're at rest and crawling starts
    if (this.config.snap) {
      this.snapping = true
    }

    if (!this.config.infinite) {
      // Handle bounds for non-infinite mode
      if (this.target > 0) {
        this.target = 0
      } else if (this.target < this.maxScroll) {
        this.target = this.maxScroll
      } else if (this.snapping) {
        const snapped = Math.round(this.target)
        this.target = Math.min(0, Math.max(this.maxScroll, snapped))
      }
    } else if (this.snapping) {
      // Only snap if snapping is enabled
      this.target = Math.round(this.target)
    }

    // Always reset speed to ensure it will reach the atRest state
    this.speed = 0
    this.#previousSpeed = 0

    // Let the update method handle starting crawling when it detects the carousel is at rest
  }

  /** Update */
  update() {
    if (!this.isVisible || !this.#isActive) return

    const currentTime = performance.now()
    this.deltaTime = (currentTime - this.#previousTime) / 1000
    this.#previousTime = currentTime

    // Only apply snapping if snapping is enabled and not dragging
    if (this.snapping && !this.isDragging) {
      const currentSnap = Math.round(this.target)
      const diff = currentSnap - this.target
      this.target += diff * this.config.snapStrength
    }

    this.current = damp(this.current, this.target, 1 / this.config.lerpFactor, this.deltaTime)

    if (this.config.infinite) {
      const rawIndex = Math.round(-this.current)
      const length = this.items.length
      const normalizedIndex = ((rawIndex % length) + length) % length
      this.#updateCurrentSlide(normalizedIndex)
      this.#updateInfinite()
    } else {
      this.#updateCurrentSlide(Math.round(Math.abs(this.current)))
      this.#updateFinite()
    }

    this.#renderSpeed()

    // Handle crawl speed lerping with a simple direct approach
    if (this.crawling) {
      // Use a fixed increment approach instead of damping for more predictable results
      const maxSpeed = Math.abs(this.crawlSpeed) // Use absolute value for calculations

      // Calculate the target speed based on hover state and direction
      let currentSpeedMultiplier = this.#targetCrawlSpeedMultiplier

      // Determine direction multiplier (-1 for reverse, 1 for normal)
      const directionMultiplier = this.crawlSpeed < 0 ? -1 : 1

      // Smoothly transition between normal and slow speed
      const targetSpeed = maxSpeed * currentSpeedMultiplier * directionMultiplier
      const incrementPerSecond = maxSpeed / 3 // Take 3 seconds to reach full speed

      if (Math.abs(this.#currentCrawlSpeed) < maxSpeed) {
        // Increment in the correct direction
        this.#currentCrawlSpeed += incrementPerSecond * this.deltaTime * directionMultiplier

        // Make sure we don't exceed the target speed
        if (directionMultiplier === 1 && this.#currentCrawlSpeed > targetSpeed) {
          this.#currentCrawlSpeed = targetSpeed
        } else if (directionMultiplier === -1 && this.#currentCrawlSpeed < targetSpeed) {
          this.#currentCrawlSpeed = targetSpeed
        }
      }

      // Ensure snapping is disabled when crawling
      this.snapping = false
    } else {
      // Simple linear deceleration
      const maxSpeed = Math.abs(this.crawlSpeed)
      const decrementPerSecond = maxSpeed / 2 // Take 2 seconds to stop
      const directionMultiplier = this.#currentCrawlSpeed < 0 ? -1 : 1

      if (Math.abs(this.#currentCrawlSpeed) > 0) {
        // Decelerate in the correct direction
        this.#currentCrawlSpeed -= decrementPerSecond * this.deltaTime * directionMultiplier

        // Stop completely when close to zero
        if (
          (directionMultiplier === 1 && this.#currentCrawlSpeed < 0) ||
          (directionMultiplier === -1 && this.#currentCrawlSpeed > 0)
        ) {
          this.#currentCrawlSpeed = 0
        }
      }
    }

    // Check if the carousel is completely stopped
    const isAtTarget = Math.abs(this.current - this.target) < 0.0001
    const isSpeedZero = this.speed === 0

    // Only set atRest when the carousel is completely stopped (at target and speed is zero)
    if (isAtTarget && isSpeedZero && !this.isDragging && !this.crawling) {
      // If we weren't at rest before and crawl is enabled, start the crawl timer
      if (!this.atRest && this.config.crawl && this.config.crawlSpeed && !this.#crawlTimer) {
        this.atRest = true

        // Wait a full second after completely at rest before starting to crawl
        this.#crawlTimer = setTimeout(() => {
          this.crawling = true
          this.snapping = false
          this.atRest = false
          this.#crawlTimer = null
        }, 1000)
      } else if (!this.atRest) {
        // If crawl is not enabled, just set atRest
        this.atRest = true
      }
    } else if (!isAtTarget || !isSpeedZero) {
      // If we're not at target or speed is not zero, we're not at rest
      this.atRest = false
    }

    // when crawling, update the target position
    if (this.crawling && !this.isDragging && this.speed === 0) {
      // Add the current crawl speed to the target
      this.target = this.current - this.#currentCrawlSpeed
    }

    if (this.onUpdate) this.onUpdate(this)
  }

  #updateFinite() {
    this.parallaxValues = this.items.map((item, i) => {
      const translateX = this.current * this.viewport.itemWidth
      item.style.transform = `translateX(${translateX}px)`

      return translateX
    })
  }

  #updateInfinite() {
    this.parallaxValues = this.items.map((item, i) => {
      const unitPos = this.current + i
      const x = symmetricMod(unitPos, this.items.length) - i

      const translateX = x * this.viewport.itemWidth
      item.style.transform = `translateX(${translateX}px)`

      return symmetricMod(unitPos, this.items.length / 2)
    })
  }

  #renderSpeed() {
    this.#lspeed = damp(this.#lspeed, this.speed, 1 / this.config.lerpFactor, this.deltaTime)
    this.speed = this.speed * this.config.speedDecay

    // Check if speed is effectively zero or very close to previous speed
    const isEffectivelyZero = Math.abs(this.speed) < 0.00001
    const isNotChanging = Math.abs(this.speed - this.#previousSpeed) < 0.00001

    if ((isEffectivelyZero || isNotChanging) && !this.isDragging) {
      this.speed = 0

      // Don't set atRest here - let the update method handle it when the carousel is fully stopped
      if (this.config.crawlSpeed) {
        if (!this.crawling && !this.isDragging && !this.#crawlTimer) {
          // We'll set atRest in the update method when current is very close to target
        }
      } else {
        // Only set atRest if we're not using crawlSpeed
        const isAtTarget = Math.abs(this.current - this.target) < 0.0001
        if (isAtTarget) {
          this.atRest = true
          // Enable snapping if config.snap is true and we're not crawling
          if (this.config.snap) {
            this.snapping = true
          }
        }
      }
    }
    this.#previousSpeed = this.speed
  }

  goToNext() {
    // Store the current slide index
    const currentIndex = this.#currentSlide

    // Temporarily disable snapping
    const wasSnapping = this.snapping
    this.snapping = false

    // Go to the next slide based on the current index
    if (!this.config.infinite) {
      const targetIndex = Math.min(this.items.length - 1, currentIndex + 1)
      this.target = -targetIndex
    } else {
      const targetIndex = (currentIndex + 1) % this.items.length
      this.target = -targetIndex
    }

    // Restore snapping state
    this.snapping = wasSnapping
  }

  goToPrev() {
    // Store the current slide index
    const currentIndex = this.#currentSlide

    // Temporarily disable snapping
    const wasSnapping = this.snapping
    this.snapping = false

    // Go to the previous slide based on the current index
    if (!this.config.infinite) {
      const targetIndex = Math.max(0, currentIndex - 1)
      this.target = -targetIndex
    } else {
      const targetIndex = (currentIndex - 1 + this.items.length) % this.items.length
      this.target = -targetIndex
    }

    // Restore snapping state
    this.snapping = wasSnapping
  }

  goToIndex(index) {
    this.target = -index
  }

  set snap(value) {
    this.config.snap = value
  }

  getProgress() {
    const totalSlides = this.items.length
    const currentIndex = Math.abs(this.current) % totalSlides
    return currentIndex / totalSlides
  }

  destroy() {
    this.kill()
    if (this.#crawlTimer) {
      clearTimeout(this.#crawlTimer)
      this.#crawlTimer = null
    }

    // Remove event listeners
    window.removeEventListener('mousemove', this.mouseMoveHandler)
    window.removeEventListener('mouseup', this.mouseUpHandler)
    window.removeEventListener('touchmove', this.touchMoveHandler)
    window.removeEventListener('touchend', this.touchEndHandler)
    this.wrapper.removeEventListener('mousedown', this.mouseDownHandler)
    this.wrapper.removeEventListener('touchstart', this.touchStartHandler)

    // Remove hover event listeners if they were added
    if (this.config.slowCrawlOnHover) {
      this.mouseEnterHandler = () => {
        this.#isHovering = true
        this.#targetCrawlSpeedMultiplier = 0.5
      }
      this.mouseLeaveHandler = () => {
        this.#isHovering = false
        this.#targetCrawlSpeedMultiplier = 1
      }

      this.wrapper.removeEventListener('mouseenter', this.mouseEnterHandler)
      this.wrapper.removeEventListener('mouseleave', this.mouseLeaveHandler)
    }

    if (this.resizeTimeout) clearTimeout(this.resizeTimeout)
    if (this.virtualScroll && this.config.scrollInput) {
      this.virtualScroll.destroy()
    }
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  get currentSlide() {
    return this.#currentSlide
  }

  #updateCurrentSlide(newSlide) {
    if (this.#currentSlide !== newSlide) {
      this.#previousSlide = this.#currentSlide
      this.#currentSlide = newSlide

      if (this.onSlideChange) this.onSlideChange(this.#currentSlide, this.#previousSlide)
    }
  }

  /** Interfaces */
  kill() {
    this.#isActive = false

    this.items.forEach(item => {
      item.style.transform = ''
    })

    this.current = 0
    this.target = 0
    this.speed = 0
    this.#lspeed = 0
  }

  init() {
    this.#isActive = true
    this.#previousTime = performance.now()
  }

  set paused(value) {
    this.#isPaused = value
  }

  get paused() {
    return this.#isPaused
  }

  get progress() {
    if (this.config.infinite) {
      const position = -this.target
      const total = this.items.length
      const normalizedPos = ((position % total) + total) % total

      return normalizedPos / (total - 1)
    } else {
      const current = Math.abs(this.current)
      const total = Math.abs(this.maxScroll)
      return Math.max(0, Math.min(1, current / total))
    }
  }

  resize() {
    this.#setupViewport()

    // Force a single update, bypassing visibility check
    const wasActive = this.#isActive
    const wasVisible = this.isVisible

    this.#isActive = true
    this.isVisible = true
    this.update()

    this.#isActive = wasActive
    this.isVisible = wasVisible
  }
}

export default Core
