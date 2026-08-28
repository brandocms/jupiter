import { animate, motionValue } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import Dom from '../Dom'
import { set, clearProps } from '../../utils/motion-helpers'

// Velocity sampling window for throws (ms)
const VELOCITY_WINDOW_MS = 150
// Speed the crawl ramps up from after a throw settles
const MIN_CRAWL_SPEED = 0.001
const SPEED_RAMP_DURATION = 1.2

const DEFAULT_OPTIONS = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: true,
  paddingLeft: 0, //DEPRECATED
  startProgress: 0,
  spacer: '<span>&nbsp;&mdash;&nbsp;</span>',

  // Crawl direction. false = scroll content leftward (default), true = rightward.
  // Speed is controlled independently via `speed` (and the live timeline.speed).
  reversed: false,

  // Drag + throw (inertia). Opt-in — existing marquees are unaffected.
  draggable: false,
  minimumMovement: 3, // Pixels for mouse - below this a press is a click, above is a drag
  touchMinimumMovement: 10, // Higher threshold for touch (finger imprecision)
  throwResistance: 325, // Inertia time constant (higher = longer glide)
  throwPower: 0.8, // Deceleration curve (0-1)
  throwVelocityMultiplier: 0.8, // Scale release velocity

  onReveal: marqueeEl => {
    animate(marqueeEl, { opacity: 1 }, { ease: 'linear' })
  }
}

export default class Marquee {
  constructor(app, el, opts) {
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.app = app
    this.elements = {}
    this.elements.$el = el
    this.elements.$marquee = Dom.find(this.elements.$el, '[data-marquee]')
    this.elements.$holder = Dom.find(this.elements.$el, '[data-marquee-holder]')
    this.elements.$item = Dom.find(this.elements.$el, '[data-marquee-item]')

    // Position model: a single motionValue is the source of truth. The crawl
    // animation, drag and inertia all write to it; a change listener applies a
    // seamless (modulo holderWidth) transform to the marquee element.
    this.position = motionValue(0)
    this.holderWidth = 0
    this.duration = 0

    this.timeline = null // crawl animation (kept named `timeline` for back-compat)
    this.speedAnimation = null
    this.inertiaAnimation = null
    this.observer = null
    this.playing = false

    // Bound handlers (stored so they can be removed in destroy)
    this._onResize = this.updateMarquee.bind(this)
    this._onReveal = this.revealMarquee.bind(this)
    this._positionUnsubscribe = null
    this._dragCleanup = null

    this.initialize()
  }

  initialize() {
    set(this.elements.$marquee, { opacity: 0, willChange: 'transform' })

    // Apply the position to the DOM whenever it changes (crawl, drag or inertia)
    this._positionUnsubscribe = this.position.on('change', latest => {
      this.render(latest)
    })

    window.addEventListener('APPLICATION:RESIZE', this._onResize)
    window.addEventListener('APPLICATION:REVEALED', this._onReveal)
    this.updateMarquee()
    this.setupObserver()

    if (this.opts.slowDownOnHover) {
      this.elements.$el.addEventListener('mouseenter', this.slowDown.bind(this))
      this.elements.$el.addEventListener('mouseleave', this.speedUp.bind(this))
    }

    if (this.opts.draggable) {
      this.setupDrag()
    }
  }

  /**
   * Apply the current raw position to the marquee element.
   * Holders are laid out side by side at i * holderWidth, so translating by
   * the position modulo holderWidth produces a seamless infinite scroll.
   */
  render(rawPos) {
    if (!this.holderWidth) return
    const m = ((rawPos % this.holderWidth) + this.holderWidth) % this.holderWidth
    this.elements.$marquee.style.transform = `translateX(${-m}px) translateZ(0)`
  }

  /**
   * Detect whether the marquee element is horizontally mirrored (scaleX(-1)),
   * as used for "reverse" rows. Read from the live computed transform so it
   * works no matter how the flip is applied (and survives responsive changes).
   */
  isAxisFlipped() {
    const t = getComputedStyle(this.elements.$el).transform
    if (!t || t === 'none') return false
    // matrix(a, b, c, d, e, f) / matrix3d(a, ...) — a < 0 means a horizontal flip
    const inner = t.slice(t.indexOf('(') + 1)
    const a = parseFloat(inner)
    return Number.isFinite(a) && a < 0
  }

  revealMarquee(e) {
    this.updateMarquee()
    this.opts.onReveal(this.elements.$marquee)
  }

  updateMarquee(e) {
    if (e) {
      // updating cause of a resize. we only care about width change
      if (!e.detail.widthChanged) {
        return
      }
    }

    this.killTweens()
    this.clearHolders()
    this.fillText()
    this.setHeight()

    this.holderWidth = this.elements.$holder.offsetWidth
    const $allHolders = Dom.all(this.elements.$el, '[data-marquee-holder]')
    const marqueeWidth = this.holderWidth * $allHolders.length
    this.duration = this.holderWidth / this.opts.speed

    set(this.elements.$marquee, { width: marqueeWidth })
    this.initializeTween()

    if (Dom.inViewport(this.elements.$el)) {
      this.play()
    }
  }

  clearHolders() {
    const $allHolders = Dom.all(this.elements.$el, '[data-marquee-holder]')
    Array.from($allHolders).forEach(h => clearProps(h, 'all'))
  }

  killTweens() {
    if (this.speedAnimation) {
      this.speedAnimation.stop()
      this.speedAnimation = null
    }
    if (this.inertiaAnimation) {
      this.inertiaAnimation.stop()
      this.inertiaAnimation = null
    }
    if (this.timeline) {
      this.timeline.stop()
      this.timeline = null
    }
  }

  /**
   * Lay out holders and create the (paused) crawl animation.
   */
  initializeTween() {
    const $allHolders = Dom.all(this.elements.$el, '[data-marquee-holder]')

    Array.from($allHolders).forEach((h, idx) => {
      set(h, {
        position: 'absolute',
        left: h.offsetWidth * idx,
        transform: 'translateZ(0)',
        willChange: 'transform'
      })
    })

    // Set initial progress before creating the crawl so it starts from there.
    // On resize rebuilds the existing position is preserved (modulo render
    // keeps it seamless regardless of the new holderWidth).
    if (!this._initialized && this.opts.startProgress > 0) {
      this.position.set(this.opts.startProgress * this.holderWidth)
    }
    this._initialized = true
    this.render(this.position.get())

    this.timeline = this.createCrawl()
    this.timeline.pause()

    window.timeline = this.timeline
    window.marquee = this
  }

  /**
   * Create an infinite crawl animation from the current position.
   * Animating exactly one holderWidth and relying on the modulo render keeps
   * the loop reset (repeat) invisible. Always recreated from the live position
   * so it stays correct after drags and throws.
   */
  createCrawl() {
    const from = this.position.get()
    // Direction is baked into the target; speed stays positive so timeline.speed
    // (hover slow-down, pause ramps, etc.) keeps working regardless of direction.
    const target = this.opts.reversed ? from - this.holderWidth : from + this.holderWidth
    return animate(this.position, target, {
      duration: this.duration,
      ease: 'linear',
      repeat: Infinity
    })
  }

  play(rampUp = false) {
    this.playing = true
    if (this.speedAnimation) {
      this.speedAnimation.stop()
      this.speedAnimation = null
    }

    if (!this.holderWidth) return

    // Recreate the crawl from the live position so it is always seamless,
    // regardless of where a drag/throw left the marquee.
    if (this.timeline) this.timeline.stop()
    this.timeline = this.createCrawl()

    if (rampUp) {
      this.timeline.play()
      const state = { speed: 0 }
      this.timeline.speed = MIN_CRAWL_SPEED
      this.speedAnimation = animate(
        state,
        { speed: 1 },
        {
          duration: 0.8,
          ease: 'easeIn',
          onUpdate: () => {
            if (this.timeline) this.timeline.speed = state.speed
          }
        }
      )
    } else {
      this.timeline.speed = 1
      this.timeline.play()
    }
  }

  pause() {
    this.playing = false
    if (!this.timeline) return
    const state = { speed: this.timeline.speed || 1 }
    this.speedAnimation = animate(
      state,
      { speed: 0.01 },
      {
        duration: 0.8,
        onUpdate: () => {
          if (this.timeline) this.timeline.speed = state.speed
        }
      }
    )
    this.speedAnimation.finished.then(() => {
      if (!this.playing && this.timeline) {
        this.timeline.pause()
      }
    })
  }

  slowDown() {
    if (this.speedAnimation) {
      this.speedAnimation.stop()
    }
    if (!this.timeline) return
    const state = { speed: this.timeline.speed || 1 }
    this.speedAnimation = animate(
      state,
      { speed: 0.5 },
      {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1], // ease-out
        onUpdate: () => {
          if (this.timeline) this.timeline.speed = state.speed
        }
      }
    )
  }

  speedUp() {
    if (this.speedAnimation) {
      this.speedAnimation.stop()
    }
    if (!this.timeline) return
    const state = { speed: this.timeline.speed || 0.5 }
    this.speedAnimation = animate(
      state,
      { speed: 1 },
      {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1], // ease-out
        onUpdate: () => {
          if (this.timeline) this.timeline.speed = state.speed
        }
      }
    )
  }

  /**
   * Setup pointer-based drag + throw interaction.
   * Mirrors the Looper module's physics (velocity sampling + Motion inertia).
   */
  setupDrag() {
    const $el = this.elements.$el

    let startX = 0
    let startY = 0
    let startPosition = 0
    let velocityTracker = []
    let isDragging = false
    let hasDragged = false
    let axisDecided = false
    let activeMinimumMovement = this.opts.minimumMovement
    let dragDir = 1 // -1 when the marquee is horizontally mirrored (scaleX(-1))

    const swallowClick = e => {
      e.preventDefault()
      e.stopPropagation()
    }

    const getVelocity = () => {
      if (velocityTracker.length < 2) return 0
      const recent = velocityTracker.slice(-6)
      let totalVelocity = 0
      let totalWeight = 0
      for (let i = 1; i < recent.length; i++) {
        const prev = recent[i - 1]
        const curr = recent[i]
        const deltaX = curr.x - prev.x
        const deltaTime = curr.time - prev.time
        if (deltaTime > 0) {
          const weight = i / recent.length
          const velocity = (deltaX / deltaTime) * 1000 // px/second
          totalVelocity += velocity * weight
          totalWeight += weight
        }
      }
      return totalWeight > 0 ? totalVelocity / totalWeight : 0
    }

    const onPointerDown = e => {
      if (e.button !== undefined && e.button !== 0) return

      isDragging = true
      startX = e.clientX
      startY = e.clientY
      startPosition = this.position.get()
      velocityTracker = [{ x: e.clientX, time: e.timeStamp }]
      hasDragged = false
      axisDecided = false
      activeMinimumMovement =
        e.pointerType === 'touch' ? this.opts.touchMinimumMovement : this.opts.minimumMovement

      // A reversed row is mirrored with scaleX(-1), so screen-space pointer
      // movement maps to the opposite direction in the marquee's own space.
      dragDir = this.isAxisFlipped() ? -1 : 1

      // Stop crawl + any ongoing throw / speed ramp
      if (this.speedAnimation) {
        this.speedAnimation.stop()
        this.speedAnimation = null
      }
      if (this.inertiaAnimation) {
        this.inertiaAnimation.stop()
        this.inertiaAnimation = null
      }
      if (this.timeline) {
        this.timeline.stop()
        this.timeline = null
      }

      if (e.pointerType === 'mouse') {
        e.preventDefault()
      }

      window.addEventListener('pointermove', onPointerMove, { passive: false })
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('pointercancel', onPointerUp)
    }

    const onPointerMove = e => {
      if (!isDragging) return

      const currentX = e.clientX
      const currentTime = e.timeStamp

      if (!axisDecided) {
        const dX = Math.abs(currentX - startX)
        const dY = Math.abs(e.clientY - startY)
        if (Math.max(dX, dY) < activeMinimumMovement) return
        axisDecided = true

        // Clearly vertical → abort, let the page scroll
        if (dY > dX * 1.2) {
          isDragging = false
          window.removeEventListener('pointermove', onPointerMove)
          window.removeEventListener('pointerup', onPointerUp)
          window.removeEventListener('pointercancel', onPointerUp)
          if (this.playing) this.resumeCrawl()
          return
        }

        hasDragged = true
        $el.style.cursor = 'grabbing'
      }

      e.preventDefault()

      velocityTracker.push({ x: currentX, time: currentTime })
      while (
        velocityTracker.length > 0 &&
        currentTime - velocityTracker[0].time > VELOCITY_WINDOW_MS
      ) {
        velocityTracker.shift()
      }

      // Drag left (cursor decreases) scrolls content left (position increases).
      // dragDir flips this for mirrored (reversed) rows.
      const deltaX = (startX - currentX) * dragDir
      this.position.set(startPosition + deltaX)
    }

    const onPointerUp = e => {
      if (!isDragging) return
      isDragging = false

      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)

      if (hasDragged) {
        $el.style.cursor = 'grab'
        // Swallow the click the browser fires after pointerup so item links
        // don't navigate at the end of a drag.
        $el.addEventListener('click', swallowClick, { capture: true, once: true })
      } else {
        // A tap that didn't move — just resume crawling.
        if (this.playing) this.resumeCrawl()
        return
      }

      let velocity = getVelocity()
      const lastTrackedX =
        velocityTracker.length > 0 ? velocityTracker[velocityTracker.length - 1].x : e.clientX
      const overallDelta = lastTrackedX - startX

      // Velocity direction must match the overall drag direction
      if (overallDelta > 0 && velocity < 0) velocity = 0
      if (overallDelta < 0 && velocity > 0) velocity = 0

      if (Math.abs(velocity) > 1) {
        // Flip the throw velocity into the marquee's own space for mirrored rows
        this.startInertia(velocity * dragDir)
      } else if (this.playing) {
        this.resumeCrawl()
      }
    }

    $el.style.touchAction = 'pan-y'
    $el.style.cursor = 'grab'
    $el.addEventListener('pointerdown', onPointerDown)

    this._dragCleanup = () => {
      $el.removeEventListener('pointerdown', onPointerDown)
      $el.removeEventListener('click', swallowClick, { capture: true })
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      $el.style.touchAction = ''
      $el.style.cursor = ''
    }
  }

  /**
   * Throw the marquee with momentum after a drag release.
   * @param {number} velocity - Cursor velocity in px/second
   */
  startInertia(velocity) {
    const currentPos = this.position.get()
    // Cursor and content velocity are opposite: drag left → position increases
    const motionVelocity = -velocity * this.opts.throwVelocityMultiplier
    const estimatedDistance = this.opts.throwPower * motionVelocity
    const targetPos = currentPos + estimatedDistance

    this.inertiaAnimation = animate(this.position, targetPos, {
      type: 'inertia',
      velocity: motionVelocity,
      power: this.opts.throwPower,
      timeConstant: this.opts.throwResistance,
      restSpeed: 10,
      restDelta: 0.5
    })

    this.inertiaAnimation.finished
      .then(() => {
        this.inertiaAnimation = null
        if (this.playing) this.resumeCrawl()
      })
      .catch(() => {
        this.inertiaAnimation = null
      })
  }

  /**
   * Resume the auto-crawl from the current position, ramping back up to full
   * speed so it eases out of a throw rather than snapping.
   */
  resumeCrawl() {
    if (this.speedAnimation) {
      this.speedAnimation.stop()
      this.speedAnimation = null
    }
    if (this.timeline) this.timeline.stop()

    this.timeline = this.createCrawl()
    this.timeline.play()

    const state = { speed: MIN_CRAWL_SPEED }
    this.timeline.speed = MIN_CRAWL_SPEED
    this.speedAnimation = animate(
      state,
      { speed: 1 },
      {
        duration: SPEED_RAMP_DURATION,
        ease: 'easeIn',
        onUpdate: () => {
          if (this.timeline) this.timeline.speed = state.speed
        }
      }
    )
  }

  setupObserver() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const { isIntersecting } = entry

          if (isIntersecting && !this.playing) {
            this.play()
          } else if (!isIntersecting && this.playing) {
            this.pause()
          }
        })
      },
      {
        root: null,
        threshold: 0
      }
    )

    this.observer.observe(this.elements.$el)
  }

  fillText() {
    // Clear any previously set heights to get accurate measurement
    clearProps(this.elements.$el, 'height')
    clearProps(this.elements.$marquee, 'height')

    this.elements.$marquee.innerHTML = ''
    this.elements.$marquee.appendChild(this.elements.$holder)

    this.elements.$holder.innerHTML = ''
    this.elements.$holder.appendChild(this.elements.$item)

    // Measure height of item only (marquee padding will be added by CSS)
    this.measuredHeight = this.elements.$item.offsetHeight

    const textWidth = this.elements.$item.offsetWidth
    if (textWidth) {
      if (this.opts.spacer) {
        this.elements.$holder.appendChild(Dom.new(this.opts.spacer)[0])
      }
      const count = Math.max(Math.ceil(this.app.size.width / textWidth) - 1, 2)

      for (let i = 0; i < count; i += 1) {
        this.elements.$holder.append(this.elements.$item.cloneNode(true))
        if (this.opts.spacer) {
          this.elements.$holder.appendChild(Dom.new(this.opts.spacer)[0])
        }
      }

      // Duplicate holders until they cover the viewport plus a full holder
      // width — guarantees seamless coverage across the whole modulo cycle.
      const holderWidth = this.elements.$holder.offsetWidth
      const required = this.app.size.width + holderWidth
      let totalWidth = holderWidth
      let guard = 0
      while (totalWidth < required && guard < 10) {
        this.elements.$marquee.appendChild(this.elements.$holder.cloneNode(true))
        totalWidth += holderWidth
        guard += 1
      }
    } else {
      console.error(
        'no textWidth! probably image? Set width to elements inside holder',
        this.elements.$item
      )
    }
  }

  setHeight() {
    // Use the height measured in fillText() (before cloning) plus any extra height
    const height = this.measuredHeight + this.opts.extraHeight
    // Set height on both container and marquee to preserve it when holders become absolute
    set(this.elements.$el, { height })
    set(this.elements.$marquee, { height })
  }

  destroy() {
    this.killTweens()

    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    if (this._positionUnsubscribe) {
      this._positionUnsubscribe()
      this._positionUnsubscribe = null
    }
    if (this._dragCleanup) {
      this._dragCleanup()
      this._dragCleanup = null
    }

    window.removeEventListener('APPLICATION:RESIZE', this._onResize)
    window.removeEventListener('APPLICATION:REVEALED', this._onReveal)
  }
}
