import { animate, motionValue, frame, cancelFrame } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import Dom from '../Dom'

/**
 * Looper Module
 *
 * Creates seamless horizontal infinite scrolling carousels with:
 * - Draggable interaction with momentum/inertia
 * - Auto-crawl (continuous scrolling)
 * - Snap-to-item behavior
 * - Next/Previous navigation
 * - Responsive resize handling
 * - Moonwalk integration (play/pause on viewport entry/exit)
 *
 * Optimized Motion.js implementation replacing GSAP Draggable + InertiaPlugin
 */

const DEFAULT_OPTIONS = {
  center: false,
  snap: false, // Set to true to enable snap-to-item behavior
  crawl: true, // Continuous auto-scrolling
  loop: true, // Infinite looping (false for linear scrolling)
  draggable: true, // Enable drag interaction

  speed: {
    sm: 0.1, // Speed for mobile (multiplier)
    lg: 0.35, // Speed for desktop (multiplier)
  },

  ease: {
    mouseOver: { speed: 0.3, duration: 0.75 },
    mouseOut: { speed: 1, duration: 0.75 },
  },

  selector: '[data-moonwalk-run="loop"]',
}

/**
 * Create a horizontal looping carousel
 * @param {Object} app - Jupiter application instance
 * @param {Array|NodeList} items - Items to loop
 * @param {Object} config - Configuration options
 * @returns {Object} Loop controller with methods
 */
function horizontalLoop(app, items, config) {
  console.log('[Looper:horizontalLoop] 🏗️ Creating horizontal loop')
  console.log('[Looper:horizontalLoop]    → Items:', items.length)
  console.log('[Looper:horizontalLoop]    → Config:', config)

  // Convert to array
  items = Array.from(items)
  config = config || {}

  const shouldLoop = config.loop !== false
  const shouldDrag = config.draggable !== false

  console.log('[Looper:horizontalLoop]    → shouldLoop:', shouldLoop)
  console.log('[Looper:horizontalLoop]    → shouldDrag:', shouldDrag)

  // Container setup
  const center = config.center
  const container = center === true
    ? items[0].parentNode
    : (typeof center === 'string' ? document.querySelector(center) : center) || items[0].parentNode

  console.log('[Looper:horizontalLoop]    → Container:', container)

  // State
  let curIndex = 0
  let totalWidth = 0
  let pixelsPerSecond = (config.speed || 1) * 100
  let animation = null
  let position = motionValue(0) // Source of truth for position
  let originalItemCount = 0 // Track count of ORIGINAL items (before clones)

  // Cached measurements
  let widths = []
  let xPercents = []
  let times = []
  let startX = 0
  let gap = 0 // CSS gap between items
  let offsetLefts = [] // Cache offsetLeft values to avoid layout thrashing
  let containerWidth = 0 // Cache container width to avoid layout reads on every frame
  let lastTransforms = [] // Cache last transform values to avoid unnecessary DOM writes
  let itemWrapOffsets = [] // Cache current wrap offset for each item to avoid redundant animate() calls

  // Drag state and cleanup handlers
  let dragState = {}
  let isDragging = false // Track if user is actively dragging
  let speedRampAnimation = null // Track speed ramp animation
  let inertiaAnimation = null // Track inertia animation
  let positionUnsubscribe = null // Track position listener for cleanup
  let renderUnsubscribe = null // Track frame.render loop for cleanup

  /**
   * Measure total width of all items as currently laid out
   * @returns {number} Total width in pixels
   */
  function getTotalWidthOfItems() {
    if (!items.length) return 0

    const first = items[0]
    const last = items[items.length - 1]

    // Get measurements
    const startX = first.offsetLeft
    const lastRect = last.getBoundingClientRect()
    const lastWidth = lastRect.width

    // Calculate CSS gap between items
    gap = parseFloat(getComputedStyle(container).gap) || 0

    // Calculate total including gaps and padding
    // Total = sum of item widths + gaps between items + paddingRight
    const totalWidth = last.offsetLeft + lastWidth - startX + (parseFloat(config.paddingRight) || 0)

    console.log('[Looper:getTotalWidth]    → Gap:', gap, 'px')
    console.log('[Looper:getTotalWidth]    → Total width:', totalWidth, 'px')

    return totalWidth
  }

  /**
   * Replicate items until total width >= container width + buffer
   * Fixes exponential duplication bug from original
   */
  function replicateItemsIfNeeded() {
    if (!shouldLoop) {
      console.log('[Looper:replicate] ⏭️ Skipping replication (loop disabled)')
      return
    }

    const containerWidth = container.offsetWidth
    let totalWidth = getTotalWidthOfItems()

    console.log('[Looper:replicate] 📏 Checking if replication needed')
    console.log('[Looper:replicate]    → Container width:', containerWidth, 'px')
    console.log('[Looper:replicate]    → Initial total width:', totalWidth, 'px')

    // Safety: bail if no layout yet
    if (containerWidth === 0 || totalWidth === 0) {
      console.warn('[Looper:replicate] ⚠️ No layout yet, skipping replication')
      return
    }

    // Calculate minimum width needed for seamless looping
    // We need enough width so that when an item exits one side, there are always
    // enough items on the other side to fill the viewport without visible gaps
    const firstItemWidth = items[0].offsetWidth
    const lastItemWidth = items[items.length - 1].offsetWidth
    const maxItemWidth = Math.max(firstItemWidth, lastItemWidth)

    // Use 2.5x container width to ensure plenty of buffer for wrapping
    // This prevents items from visibly moving to the back before they're off-screen
    const minRequiredWidth = containerWidth * 2.5 + maxItemWidth

    console.log('[Looper:replicate]    → Min required width:', minRequiredWidth, 'px', '(2.5x container + buffer)')

    // Only replicate if needed
    if (totalWidth >= minRequiredWidth) {
      console.log('[Looper:replicate]    ✅ No replication needed')
      return
    }

    // Store original count to prevent exponential growth
    const originalItemCount = items.length
    const maxReplications = 10
    let count = 0
    let previousTotalWidth = totalWidth

    console.log('[Looper:replicate]    → Starting replication (original items:', originalItemCount, ')')

    while (totalWidth < minRequiredWidth && count < maxReplications) {
      // Clone ONLY original items
      for (let i = 0; i < originalItemCount; i++) {
        const clone = items[i].cloneNode(true)
        clone.setAttribute('data-looper-clone', 'true')
        container.appendChild(clone)
        items.push(clone)
      }

      // Force layout recalculation
      container.getBoundingClientRect()
      totalWidth = getTotalWidthOfItems()
      count++

      console.log(`[Looper:replicate]    → Replication #${count}: added ${originalItemCount} items, total width now ${totalWidth}px`)

      // Safety: detect if width isn't increasing
      if (totalWidth <= previousTotalWidth && count > 1) {
        console.warn('[Looper:replicate] ⚠️ Item replication not increasing width, stopping')
        break
      }

      previousTotalWidth = totalWidth
    }

    if (count >= maxReplications) {
      console.warn('[Looper:replicate] ⚠️ Hit max replication limit')
    }

    console.log(`[Looper:replicate]    ✅ Replication complete: ${items.length} total items (${count} replication rounds)`)
  }

  /**
   * Measure and cache all item widths and positions
   * Batched to avoid layout thrashing
   */
  function populateWidths() {
    const containerRect = container.getBoundingClientRect()
    let prevRect = containerRect

    items.forEach((el, i) => {
      const rect = el.getBoundingClientRect()
      widths[i] = rect.width

      // Cache offsetLeft to avoid reading it on every frame
      offsetLefts[i] = el.offsetLeft

      // Calculate xPercent based on current position
      const computedStyle = window.getComputedStyle(el)
      const transform = computedStyle.transform
      let currentX = 0

      if (transform && transform !== 'none') {
        const matrix = new DOMMatrix(transform)
        currentX = matrix.m41
      }

      xPercents[i] = (currentX / widths[i]) * 100
      prevRect = rect
    })

    // Update startX and cache container width
    startX = items[0].offsetLeft
    containerWidth = container.offsetWidth // Cache once here instead of reading every frame
    totalWidth = getTotalWidthOfItems()
  }

  /**
   * Calculate time positions for snapping
   * These represent when each item hits the "start" position
   */
  function populateSnapTimes() {
    if (!shouldLoop) {
      // For non-looping, evenly distribute
      items.forEach((item, i) => {
        times[i] = i / Math.max(1, items.length - 1)
      })
      return
    }

    // For looping, calculate based on item positions including gaps
    items.forEach((item, i) => {
      const curX = (xPercents[i] / 100) * widths[i]
      const distanceToStart = item.offsetLeft + curX - startX
      times[i] = distanceToStart / pixelsPerSecond
    })

    // Adjust for container padding if present
    const itemsContainer = items[0].parentNode
    const containerPaddingLeft = parseFloat(getComputedStyle(itemsContainer).paddingLeft) || 0

    if (containerPaddingLeft > 0) {
      const paddingTime = containerPaddingLeft / pixelsPerSecond
      times = times.map(time => time - paddingTime)
    }

    console.log('[Looper:populateSnapTimes]    → Gap included in calculations:', gap, 'px')
  }

  /**
   * Check item positions and wrap when needed
   * Container is animated DIRECTLY (not updated here!)
   * This function only reads position to determine wrapping
   * @param {number} pos - Current position value (can grow infinitely)
   */
  function updateItemPositions(pos) {
    const containerElement = items[0].parentElement

    if (!shouldLoop) {
      // Non-looping: we'll handle this with direct animation
      return
    }

    // Calculate bounded position for checking item wrap points
    const boundedPos = pos % totalWidth

    // Initialize wrap offsets cache if needed
    if (itemWrapOffsets.length === 0) {
      itemWrapOffsets = new Array(items.length).fill(0)
    }

    // TICKER PATTERN: ONLY move ORIGINAL items to the back, NEVER touch clones!
    // This massively reduces DOM manipulation and style recalculation
    items.forEach((item, i) => {
      // Skip clones - they stay in natural flow!
      if (item.hasAttribute('data-looper-clone')) {
        return
      }

      // Calculate where this ORIGINAL item is on screen (relative to bounded container)
      const itemLeft = offsetLefts[i] - boundedPos

      // Original items only ever have -totalWidth, 0, or +totalWidth offset (never accumulating!)
      let newOffset = 0

      // Wrap by fixed amount only (include gap for proper spacing)
      if (itemLeft < -(widths[i] + containerWidth * 0.5)) {
        newOffset = totalWidth + gap // Wrap to right WITH gap
      } else if (itemLeft > containerWidth + containerWidth * 0.5) {
        newOffset = -totalWidth - gap // Wrap to left WITH gap
      }

      // ONLY update transform if the offset has changed!
      if (newOffset !== itemWrapOffsets[i]) {
        // Use direct style.transform like Ticker example (via MotionValues in React)
        if (newOffset !== 0) {
          item.style.transform = `translateX(${newOffset}px)`
          console.log('[Looper:wrap] Original item', i, 'offset changed:', itemWrapOffsets[i], '→', newOffset)
        } else {
          item.style.transform = 'none'
        }
        itemWrapOffsets[i] = newOffset
      }
    })
  }

  /**
   * Refresh measurements and recalculate animation
   * @param {boolean} deep - Whether to rebuild animation (on resize)
   */
  function refresh(deep = false) {
    // Save progress to preserve position
    const progress = animation ? animation.time / animation.duration : 0
    const currentPos = position.get()

    // Pause animation if running
    const wasPlaying = animation && animation.speed !== 0
    if (animation) {
      animation.pause()
    }

    // Remeasure everything
    populateWidths()

    if (deep) {
      // Check if we need to replicate more items
      const containerWidth = container.offsetWidth
      const currentTotalWidth = getTotalWidthOfItems()

      // Use same 2.5x buffer as replication logic
      if (shouldLoop && currentTotalWidth < containerWidth * 2.5) {
        replicateItemsIfNeeded()
        populateWidths()
      }

      populateSnapTimes()

      // Recreate animation with new measurements
      if (shouldLoop && config.crawl) {
        // Stop old animation
        if (animation) {
          animation.stop()
        }

        // Use startLoopAnimation for bounded position (no repeat: Infinity!)
        animation = startLoopAnimation()

        // Restore playback state
        if (wasPlaying) {
          animation.play()
        } else {
          animation.pause()
        }
      } else if (config.crawl) {
        // Non-looping: recreate animation
        const duration = (totalWidth - container.offsetWidth) / pixelsPerSecond

        if (animation) {
          animation.stop()
        }

        animation = animate(
          position,
          totalWidth - container.offsetWidth,
          {
            duration,
            ease: 'linear',
          }
        )

        if (wasPlaying) {
          animation.time = progress * animation.duration
          animation.play()
        } else {
          animation.pause()
        }
      }
    } else {
      // Light refresh - just update measurements
      populateSnapTimes()
    }

    // Update positions based on current scroll
    updateItemPositions(currentPos)
  }

  /**
   * Initialize the loop animation
   */
  function init() {
    console.log('[Looper:init] 🎬 Initializing loop animation')

    // Store original item count BEFORE replication
    originalItemCount = items.length
    console.log('[Looper:init]    → Original items:', originalItemCount)

    // Replicate items if needed
    replicateItemsIfNeeded()
    console.log('[Looper:init]    → After replication: ', items.length, 'items (', items.length - originalItemCount, 'clones )')

    // Measure everything
    populateWidths()
    console.log('[Looper:init]    → Total width:', totalWidth, 'px')
    console.log('[Looper:init]    → Container width:', container.offsetWidth, 'px')
    console.log('[Looper:init]    → Pixels per second:', pixelsPerSecond)

    populateSnapTimes()
    console.log('[Looper:init]    → Snap times:', times)

    // Set initial container position
    const containerElement = items[0].parentElement
    containerElement.style.willChange = 'transform'
    containerElement.style.transform = 'translateX(0px)'
    console.log('[Looper:init]    → Initialized container at position 0')

    // Set up RAF loop to check item positions for wrapping
    // Frame.render loop to apply bounded position to DOM
    // This is Motion's optimized render loop - prevents layout thrashing
    let frameCount = 0
    let lastFpsCheck = performance.now()
    let framesInLastSecond = 0

    function startRenderLoop() {
      if (renderUnsubscribe) return // Already running

      const containerElement = items[0].parentElement

      renderUnsubscribe = frame.render(() => {
        // Read position from motionValue (single source of truth)
        const pos = position.get()

        // Defensive check - position should be a number
        if (typeof pos !== 'number' || isNaN(pos)) {
          console.error('[Looper:render] ⚠️ Invalid position:', pos, 'typeof:', typeof pos)
          console.error('[Looper:render]    → position:', position)
          console.error('[Looper:render]    → position.get:', position.get)
          console.error('[Looper:render]    → typeof position.get():', typeof position.get())
          return
        }

        // Keep container bounded within 0 to totalWidth
        const boundedPos = ((pos % totalWidth) + totalWidth) % totalWidth

        // Apply bounded transform to container
        containerElement.style.transform = `translateX(${-boundedPos}px)`

        // Wrap items based on bounded position
        updateItemPositions(boundedPos)

        // FPS tracking
        frameCount++
        framesInLastSecond++
        const now = performance.now()
        const elapsed = now - lastFpsCheck

        if (elapsed >= 1000) {
          const fps = (framesInLastSecond / elapsed * 1000).toFixed(1)
          console.log('[Looper:FPS]', fps, 'fps | Position:', pos.toFixed(2), 'px | Bounded:', boundedPos.toFixed(2), 'px')
          framesInLastSecond = 0
          lastFpsCheck = now
        }
      }, true) // true = keep alive

      console.log('[Looper:init]    → Started frame.render loop')
    }

    function stopRenderLoop() {
      if (renderUnsubscribe) {
        cancelFrame(renderUnsubscribe)
        renderUnsubscribe = null
        console.log('[Looper:cleanup] Stopped frame.render loop')
      }
    }

    // Start the frame.render loop
    if (shouldLoop) {
      startRenderLoop()
    }

    // Function to create and start the animation loop
    // Animates the position motionValue (frame.render loop applies to DOM)
    function startLoopAnimation() {
      if (!shouldLoop || !config.crawl) return null

      const duration = totalWidth / pixelsPerSecond
      const currentPos = position.get()
      const target = currentPos + totalWidth

      // Animate the position motionValue
      // frame.render loop will apply bounded position to DOM
      animation = animate(
        position,
        target,
        {
          duration,
          repeat: Infinity,
          ease: 'linear',
        }
      )

      console.log('[Looper:loop] 🎬 Position animation started (motionValue, repeat: Infinity)')
      console.log('[Looper:loop]    → From:', currentPos, 'to:', target, 'duration:', duration, 's')

      return animation
    }

    // Create animation by animating the position motionValue
    if (shouldLoop && config.crawl) {
      const duration = totalWidth / pixelsPerSecond
      console.log('[Looper:init]    → Creating crawl animation (duration:', duration, 's)')

      // Create initial animation (paused)
      animation = startLoopAnimation()
      animation.pause()

      console.log('[Looper:init]    → Created position animation with auto-restart')
    } else if (!shouldLoop && config.crawl) {
      // Non-looping: animate to max scroll distance
      const maxScroll = Math.max(0, totalWidth - container.offsetWidth)
      const duration = maxScroll / pixelsPerSecond

      animation = animate(
        position,
        maxScroll,
        {
          duration,
          ease: 'linear',
        }
      )

      animation.pause()
      console.log('[Looper:init]    → Created non-looping animation (maxScroll:', maxScroll, 'px)')
    }

    // Setup drag if enabled
    if (shouldDrag) {
      console.log('[Looper:init]    → Setting up drag interaction')
      setupDrag()
    } else {
      console.log('[Looper:init]    → Drag disabled')
    }

    // Setup hover effects
    console.log('[Looper:init]    → Setting up hover effects')
    setupHoverEffects()

    // Set initial position
    updateItemPositions(position.get())
    console.log('[Looper:init]    → Updated initial item positions')

    // Listen for resize events
    window.addEventListener('APPLICATION:RESIZE', handleResize)
    console.log('[Looper:init]    → Registered resize listener')

    console.log('[Looper:init] ✅ Initialization complete!')
  }

  /**
   * Handle window resize
   */
  function handleResize(e) {
    // Only refresh if width actually changed
    if (e.detail && !e.detail.widthChanged) {
      return
    }

    refresh(true)
  }

  /**
   * Setup pointer-based drag interaction
   * Replaces GSAP Draggable with optimized pointer events
   */
  function setupDrag() {
    let isDragging = false
    let startX = 0
    let startPosition = 0
    let lastX = 0
    let lastTime = 0
    let velocityTracker = [] // Track recent movements for velocity calculation
    let currentDragPosition = 0 // Store the current drag position

    /**
     * Calculate velocity from recent pointer movements
     * Uses weighted average of last few movements
     * @returns {number} Velocity in pixels per second
     */
    function getVelocity() {
      if (velocityTracker.length < 2) {
        console.log('[Looper:velocity] Not enough data points:', velocityTracker.length)
        return 0
      }

      // Use last 5 movements for smoothing
      const recent = velocityTracker.slice(-5)
      let totalVelocity = 0
      let totalWeight = 0

      console.log('[Looper:velocity] Calculating from', recent.length, 'points')

      for (let i = 1; i < recent.length; i++) {
        const prev = recent[i - 1]
        const curr = recent[i]

        const deltaX = curr.x - prev.x
        const deltaTime = curr.time - prev.time

        if (deltaTime > 0) {
          // Weight more recent movements higher
          const weight = i / recent.length
          const velocity = (deltaX / deltaTime) * 1000 // Convert to px/second
          console.log(`[Looper:velocity]   [${i}] deltaX: ${deltaX.toFixed(2)}, deltaTime: ${deltaTime}ms, velocity: ${velocity.toFixed(2)} px/s, weight: ${weight.toFixed(2)}`)
          totalVelocity += velocity * weight
          totalWeight += weight
        }
      }

      const finalVelocity = totalWeight > 0 ? totalVelocity / totalWeight : 0
      console.log('[Looper:velocity] Final velocity:', finalVelocity.toFixed(2), 'px/s')
      return finalVelocity
    }

    /**
     * Handle pointer down - start drag
     */
    function onPointerDown(e) {
      console.log('[Looper:drag] 👆 Pointer down at', e.clientX)

      // Only handle primary pointer (left click, first touch)
      if (e.button !== undefined && e.button !== 0) {
        console.log('[Looper:drag]    → Ignoring non-primary button')
        return
      }

      isDragging = true
      startX = e.clientX
      lastX = e.clientX

      // Read current position from motionValue
      startPosition = position.get()

      // Defensive check
      if (typeof startPosition !== 'number' || isNaN(startPosition)) {
        console.error('[Looper:drag] ⚠️ Invalid start position:', startPosition, 'typeof:', typeof startPosition)
        console.error('[Looper:drag]    → position motionValue:', position)
        return
      }

      lastTime = Date.now()
      velocityTracker = [{ x: e.clientX, time: lastTime }]

      console.log('[Looper:drag]    → Start position:', startPosition, 'px')
      console.log('[Looper:drag]    → isDragging:', isDragging)

      // Stop any ongoing inertia animation
      if (inertiaAnimation) {
        inertiaAnimation.stop()
        inertiaAnimation = null
        console.log('[Looper:drag]    → Stopped inertia animation')
      }

      // STOP main animation completely (RAF loop continues for item wrapping)
      if (animation) {
        animation.stop()
        animation = null
        console.log('[Looper:drag]    → STOPPED animation (RAF continues)')
      }

      // Stop any speed ramp animation
      if (speedRampAnimation) {
        speedRampAnimation.stop()
        speedRampAnimation = null
        console.log('[Looper:drag]    → Stopped speed ramp animation')
      }

      // Change cursor
      container.style.cursor = 'grabbing'

      // Prevent text selection
      e.preventDefault()

      // Add move/up listeners to window for better tracking
      window.addEventListener('pointermove', onPointerMove, { passive: false })
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('pointercancel', onPointerUp)
      console.log('[Looper:drag]    → Added move/up listeners')
    }

    /**
     * Handle pointer move - update position
     */
    function onPointerMove(e) {
      if (!isDragging) return

      e.preventDefault()

      const currentX = e.clientX
      const currentTime = Date.now()

      // Track for velocity calculation
      velocityTracker.push({ x: currentX, time: currentTime })

      // Keep only recent movements (last 100ms)
      while (velocityTracker.length > 0 && currentTime - velocityTracker[0].time > 100) {
        velocityTracker.shift()
      }

      // Calculate drag delta in pixels
      const deltaX = startX - currentX

      // Calculate new position
      const newPosition = startPosition + deltaX

      // Defensive check
      if (typeof newPosition !== 'number' || isNaN(newPosition)) {
        console.error('[Looper:drag] ⚠️ Invalid newPosition:', newPosition)
        console.error('[Looper:drag]    → startPosition:', startPosition, 'deltaX:', deltaX)
        return
      }

      // Update position motionValue
      // frame.render loop will apply bounded transform to DOM
      if (shouldLoop) {
        // For looping, allow unbounded position (frame.render will bound it)
        position.set(newPosition)
      } else {
        // For non-looping, clamp position
        const maxPos = Math.max(0, totalWidth - container.offsetWidth)
        const clampedPos = Math.max(0, Math.min(maxPos, newPosition))
        position.set(clampedPos)
      }

      // frame.render loop will apply position to DOM and wrap items

      lastX = currentX
      lastTime = currentTime
    }

    /**
     * Handle pointer up - end drag and start inertia
     */
    function onPointerUp(e) {
      if (!isDragging) return

      console.log('[Looper:drag] 🖐️ Pointer up')
      isDragging = false

      // Clean up listeners
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      console.log('[Looper:drag]    → Removed move/up listeners')

      // Read final position from container transform
      const containerElement = items[0].parentElement
      const transform = window.getComputedStyle(containerElement).transform
      let currentX = 0
      if (transform && transform !== 'none') {
        const matrix = new DOMMatrix(transform)
        currentX = matrix.m41
      }
      const finalPosition = Math.abs(currentX)

      console.log('[Looper:drag]    → Final position:', finalPosition, 'px')

      // Reset cursor
      container.style.cursor = 'grab'

      // Calculate final velocity
      const velocity = getVelocity()
      console.log('[Looper:drag]    → Final velocity:', velocity, 'px/s')
      console.log('[Looper:drag]    → Velocity threshold: 1 px/s')
      console.log('[Looper:drag]    → Velocity tracker:', velocityTracker.map(v => `${v.x.toFixed(1)}px @ ${v.time}`).join(', '))

      // Start inertia if we have velocity (lowered threshold from 10 to 1)
      if (Math.abs(velocity) > 1) {
        console.log('[Looper:drag]    → ✅ Starting inertia (velocity > 1)')
        startInertia(velocity)
      } else if (config.snap) {
        console.log('[Looper:drag]    → Snapping to nearest (low velocity)')
        // Snap to nearest if snap enabled
        snapToNearest()
      } else if (config.crawl) {
        console.log('[Looper:drag]    → Resuming crawl (low velocity)')
        // Resume crawl
        resumeCrawl()
      } else {
        console.log('[Looper:drag]    → No action (velocity too low:', velocity, 'px/s)')
      }
    }

    /**
     * Start inertia animation with momentum
     * Uses Motion's inertia type for physics-based deceleration
     * @param {number} velocity - Initial velocity in pixels per second
     */
    function startInertia(velocity) {
      // Read current position from motionValue
      const currentPos = position.get()

      // Calculate inertia velocity accounting for direction
      // Cursor velocity and position velocity are OPPOSITE:
      // - Drag left (cursor decreases) = scroll right (position increases)
      // - Drag right (cursor increases) = scroll left (position decreases)
      const motionVelocity = config.reversed ? velocity : -velocity

      console.log('[Looper:inertia] 💨 Starting with velocity:', velocity, 'px/s')
      console.log('[Looper:inertia]    → config.reversed:', config.reversed)
      console.log('[Looper:inertia]    → motionVelocity (for animate):', motionVelocity, 'px/s')
      console.log('[Looper:inertia]    → Current position:', currentPos, 'px')

      // Calculate estimated target based on inertia physics
      // Using formula: distance = velocity * timeConstant * (1 - e^(-power))
      // Simplified: distance ≈ velocity * timeConstant * 0.5 for typical values
      const power = 0.8
      const timeConstant = 325 / 1000 // Convert to seconds
      const estimatedDistance = motionVelocity * timeConstant * 0.5
      const targetPos = currentPos + estimatedDistance

      console.log('[Looper:inertia]    → Estimated distance:', estimatedDistance, 'px')
      console.log('[Looper:inertia]    → Target position:', targetPos, 'px')

      // Animate position motionValue with inertia
      inertiaAnimation = animate(
        position,
        targetPos,
        {
          type: 'inertia',
          velocity: motionVelocity,
          power,
          timeConstant: 325,
          restSpeed: 10,
          restDelta: 0.5,
          // For non-looping, add boundaries
          ...(shouldLoop ? {} : {
            min: 0,
            max: Math.max(0, totalWidth - container.offsetWidth),
            bounceStiffness: 300,
            bounceDamping: 30,
          })
        }
      )

      console.log('[Looper:inertia]    → Animation started on position motionValue')
      if (!shouldLoop) {
        const maxPos = Math.max(0, totalWidth - container.offsetWidth)
        console.log('[Looper:inertia]    → Boundaries: min=0, max=', maxPos)
      } else {
        console.log('[Looper:inertia]    → Looping mode: no boundaries')
      }

      // When inertia completes
      inertiaAnimation.then(() => {
        console.log('[Looper:inertia]    ✅ Inertia complete')
        inertiaAnimation = null

        // Resume crawl animation
        if (config.crawl) {
          console.log('[Looper:inertia]    → Resuming crawl')
          resumeCrawl()
        }
      }).catch(err => {
        console.log('[Looper:inertia] ⚠️ Animation stopped/cancelled')
        inertiaAnimation = null
      })
    }

    /**
     * Find the nearest snap point to a given position
     * @param {number} targetPos - Position to find nearest snap point for
     * @returns {number} The snap position
     */
    function findNearestSnapPoint(targetPos) {
      if (!times || times.length === 0) {
        return targetPos
      }

      // Convert position to time
      const targetTime = targetPos / pixelsPerSecond

      // Find closest snap time
      let closestIndex = 0
      let closestDist = Infinity

      times.forEach((time, i) => {
        let dist = Math.abs(time - targetTime)

        // For looping, also check wrapped distance
        if (shouldLoop) {
          const duration = totalWidth / pixelsPerSecond
          const wrappedDist = Math.min(
            Math.abs(time + duration - targetTime),
            Math.abs(time - duration - targetTime)
          )
          dist = Math.min(dist, wrappedDist)
        }

        if (dist < closestDist) {
          closestDist = dist
          closestIndex = i
        }
      })

      // Convert back to position
      const snapTime = times[closestIndex]
      const snapPos = snapTime * pixelsPerSecond

      // Update current index
      curIndex = closestIndex

      return snapPos
    }

    /**
     * Snap to nearest item with spring animation
     */
    function snapToNearest() {
      const currentPos = position.get()
      const snapPos = findNearestSnapPoint(currentPos)

      // Don't snap if we're already there
      if (Math.abs(snapPos - currentPos) < 1) {
        if (config.crawl && animation) {
          resumeCrawl()
        }
        return
      }

      // Animate to snap position with spring
      const snapAnimation = animate(
        position,
        snapPos,
        {
          type: 'spring',
          bounce: 0.2,
          duration: 0.5,
        }
      )

      // Resume crawl after snap
      snapAnimation.then(() => {
        if (config.crawl && animation) {
          resumeCrawl()
        }
      })
    }

    /**
     * Resume crawl animation after drag/inertia
     * Reads current position and resumes infinite loop
     */
    function resumeCrawl() {
      console.log('[Looper:resumeCrawl] 🔄 Resuming animation')

      if (!config.crawl) {
        console.log('[Looper:resumeCrawl]    ⚠️ Crawl disabled')
        return
      }

      // Stop any existing animations
      if (animation) {
        animation.stop()
        console.log('[Looper:resumeCrawl]    → Stopped old animation')
      }

      if (speedRampAnimation) {
        speedRampAnimation.stop()
        speedRampAnimation = null
        console.log('[Looper:resumeCrawl]    → Stopped old speed ramp')
      }

      // Read current position from motionValue
      const currentPos = position.get()
      console.log('[Looper:resumeCrawl]    → Current position:', currentPos, 'px')

      // Calculate position within current cycle
      const cyclePos = currentPos % totalWidth
      const remainingDist = totalWidth - cyclePos
      const remainingDuration = remainingDist / pixelsPerSecond

      console.log('[Looper:resumeCrawl]    → Position in cycle:', cyclePos, 'px')
      console.log('[Looper:resumeCrawl]    → Remaining distance:', remainingDist, 'px')
      console.log('[Looper:resumeCrawl]    → Remaining duration:', remainingDuration, 's')

      // Animate position to complete this cycle
      const targetPos = currentPos + remainingDist
      animation = animate(position, targetPos, {
        duration: remainingDuration,
        ease: 'linear'
      })

      // When cycle completes, restart infinite loop
      animation.then(() => {
        console.log('[Looper:resumeCrawl]    → Cycle complete, restarting infinite loop')
        // Position will be at targetPos, which is fine
        // startLoopAnimation will continue from there
        animation = startLoopAnimation()
      }).catch(() => {
        // Animation stopped - this is fine
      })

      console.log('[Looper:resumeCrawl]    ✅ Resume animation started')
    }

    // Set up touch-action CSS for proper touch handling
    container.style.touchAction = 'pan-y' // Allow vertical scroll, prevent horizontal

    // Add pointer down listener
    container.style.cursor = 'grab'
    container.addEventListener('pointerdown', onPointerDown)

    // Store cleanup function
    dragState = {
      cleanup: () => {
        container.removeEventListener('pointerdown', onPointerDown)
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerup', onPointerUp)
        window.removeEventListener('pointercancel', onPointerUp)
      }
    }
  }

  /**
   * Setup hover slow-down effects
   */
  function setupHoverEffects() {
    if (!config.crawl || !animation) return

    // Speed is always positive - direction is baked into animation
    const targetSpeed = 1
    const hoverSpeed = config.ease.mouseOver.speed

    // Track hover animations to prevent accumulation
    let hoverAnimation = null

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (!animation) return

        // Stop previous hover animation before creating new one
        if (hoverAnimation) {
          hoverAnimation.stop()
        }

        hoverAnimation = animate(
          animation,
          { speed: hoverSpeed },
          { duration: config.ease.mouseOver.duration, ease: 'easeOut' }
        )
      })

      item.addEventListener('mouseleave', () => {
        if (!animation) return

        // Stop previous hover animation before creating new one
        if (hoverAnimation) {
          hoverAnimation.stop()
        }

        hoverAnimation = animate(
          animation,
          { speed: targetSpeed },
          { duration: config.ease.mouseOut.duration, ease: 'easeOut' }
        )
      })
    })
  }

  /**
   * Find closest index based on current position
   * @param {boolean} setCurrent - Whether to update curIndex
   * @returns {number} Closest item index
   */
  function closestIndex(setCurrent = false) {
    if (!times || times.length === 0) return 0

    const currentPos = position.get()
    const currentTime = currentPos / pixelsPerSecond

    let closest = 0
    let closestDist = Infinity

    times.forEach((time, i) => {
      let dist = Math.abs(time - currentTime)

      // For looping, check wrapped distance
      if (shouldLoop) {
        const duration = totalWidth / pixelsPerSecond
        const wrappedDist = Math.min(
          Math.abs(time + duration - currentTime),
          Math.abs(time - duration - currentTime)
        )
        dist = Math.min(dist, wrappedDist)
      }

      if (dist < closestDist) {
        closestDist = dist
        closest = i
      }
    })

    if (setCurrent) {
      curIndex = closest
    }

    return closest
  }

  /**
   * Animate to a specific index
   * @param {number} index - Target index
   * @param {Object} vars - Animation options (duration, easing, etc.)
   */
  function toIndex(index, vars = {}) {
    vars = vars || {}

    if (!times || times.length === 0) return

    // Calculate target index with shortest path for looping
    let targetIndex = index

    if (shouldLoop) {
      // Always go in shortest direction
      const length = items.length
      if (Math.abs(index - curIndex) > length / 2) {
        targetIndex = index + (index > curIndex ? -length : length)
      }
      targetIndex = ((targetIndex % length) + length) % length
    } else {
      // Clamp to valid indices for non-looping
      targetIndex = Math.max(0, Math.min(index, items.length - 1))
    }

    // Get target position
    const targetTime = times[targetIndex]
    const targetPos = targetTime * pixelsPerSecond

    // Update current index
    curIndex = targetIndex

    // Animate to target
    const duration = vars.duration !== undefined ? vars.duration : 0.85
    const ease = vars.ease || 'easeInOut'

    const navAnimation = animate(
      position,
      targetPos,
      {
        duration,
        ease,
      }
    )

    return navAnimation
  }

  /**
   * Public API
   */
  const loopController = {
    position,
    animation,
    items,
    times,
    isReversed: config.reversed,
    isLooping: shouldLoop,

    play() {
      if (animation) {
        animation.play()
      }
    },

    pause() {
      if (animation) {
        animation.pause()
      }
    },

    current() {
      return curIndex
    },

    closestIndex(setCurrent) {
      return closestIndex(setCurrent)
    },

    next(vars) {
      const nextIndex = curIndex + 1
      return toIndex(nextIndex, vars)
    },

    previous(vars) {
      const prevIndex = curIndex - 1
      return toIndex(prevIndex, vars)
    },

    toIndex(index, vars) {
      return toIndex(index, vars)
    },

    refresh(deep) {
      return refresh(deep)
    },

    destroy() {
      console.log('[Looper:destroy] 🧹 Cleaning up loop')

      // Stop animation
      if (animation) {
        animation.stop()
        console.log('[Looper:destroy]    → Stopped animation')
      }

      // Stop frame.render loop
      stopRenderLoop()

      // Cleanup position listener
      if (positionUnsubscribe) {
        positionUnsubscribe()
        console.log('[Looper:destroy]    → Unsubscribed from position changes')
      }

      // Cleanup drag
      if (dragState && dragState.cleanup) {
        dragState.cleanup()
        console.log('[Looper:destroy]    → Cleaned up drag handlers')
      }

      // Cleanup resize listener
      window.removeEventListener('APPLICATION:RESIZE', handleResize)
      console.log('[Looper:destroy]    → Removed resize listener')

      // Destroy position value
      position.destroy()
      console.log('[Looper:destroy]    ✅ Destroy complete')
    }
  }

  // Initialize
  init()

  return loopController
}

/**
 * Looper Module Class
 */
export default class Looper {
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.loopers = []
    this.pendingLoopers = []
    this.init()
  }

  init() {
    console.log('[Looper] 🚀 Initializing module with options:', this.opts)

    this.looperElements = Dom.all(this.opts.selector)
    console.log('[Looper] 📦 Found', this.looperElements.length, 'looper elements matching selector:', this.opts.selector)

    this.looperElements.forEach((element, idx) => {
      console.log(`[Looper] 🔍 Processing looper #${idx + 1}:`, element)

      const items = Dom.all(element, '[data-panner-item], [data-looper-item]')
      console.log(`[Looper]    → Found ${items.length} items`)

      if (!items.length) {
        console.warn('[Looper] ⚠️ No items found in', element)
        return
      }

      // Find the wrapper element (with opacity: 0)
      const wrapper = Dom.find(element, '[data-looper-container]') || Dom.find(element, '.looper-wrapper')
      console.log(`[Looper]    → Found wrapper:`, wrapper)

      if (!wrapper) {
        console.warn('[Looper] ⚠️ No wrapper element found (expected [data-looper-container] or .looper-wrapper)')
      }

      const speed = ['mobile', 'iphone'].includes(this.app.breakpoint)
        ? this.opts.speed.sm
        : this.opts.speed.lg

      const isReverse = element.querySelector('[data-looper-reverse]') !== null
      const hasSnapAttribute = element.querySelector('[data-looper]')?.hasAttribute('data-looper-snap')
      const shouldSnap = this.opts.snap || hasSnapAttribute

      console.log(`[Looper]    → Config: speed=${speed}, reverse=${isReverse}, snap=${shouldSnap}, loop=${this.opts.loop}, crawl=${this.opts.crawl}`)

      // Create stub for Moonwalk compatibility
      const stubLoop = {
        play: () => {},
        pause: () => {},
        isReversed: isReverse,
      }

      element.$loop = stubLoop
      console.log(`[Looper]    → Created stub loop for Moonwalk`)

      // Store for later initialization
      this.pendingLoopers.push({
        element,
        wrapper,
        items,
        config: {
          paused: true,
          repeat: -1,
          draggable: this.opts.draggable,
          center: this.opts.center,
          snap: shouldSnap,
          speed,
          reversed: isReverse,
          loop: this.opts.loop,
          crawl: this.opts.crawl,
          ease: this.opts.ease,
        }
      })
      console.log(`[Looper]    ✅ Added to pending loopers (total: ${this.pendingLoopers.length})`)
    })

    console.log('[Looper] 🎯 Registering APPLICATION:REVEALED callback')
    console.log('[Looper] 💤 Waiting for APPLICATION:REVEALED event to finalize loopers...')

    // Register callback for when layout is ready
    this.app.registerCallback('APPLICATION:REVEALED', () => {
      this.finalizeLoopers()
    })
  }

  finalizeLoopers() {
    console.log('[Looper] 🎬 APPLICATION:REVEALED fired! Finalizing', this.pendingLoopers.length, 'pending loopers...')

    this.pendingLoopers.forEach(({ element, wrapper, items, config }, idx) => {
      console.log(`[Looper] 🔧 Creating loop #${idx + 1} with ${items.length} items`)
      console.log(`[Looper]    → Element:`, element)
      console.log(`[Looper]    → Wrapper:`, wrapper)
      console.log(`[Looper]    → Config:`, config)

      // Create the real loop
      const loop = horizontalLoop(this.app, items, config)
      console.log(`[Looper]    ✅ Loop created successfully`)

      // Start playing if crawl enabled
      if (config.crawl) {
        console.log(`[Looper]    ▶️ Starting crawl animation`)
        loop.play()
      }

      // Replace stub with real loop
      element.$loop = loop
      console.log(`[Looper]    → Replaced stub with real loop controller`)

      // Setup navigation buttons if present
      const next = Dom.find(element, '[data-panner-next]')
      const previous = Dom.find(element, '[data-panner-previous]')

      if (next) {
        console.log(`[Looper]    → Found "Next" button, attaching handler`)
        next.addEventListener('click', () => {
          console.log('[Looper] 👉 Next button clicked')
          loop.next({ duration: 0.85, ease: 'easeInOut' })
        })
      }

      if (previous) {
        console.log(`[Looper]    → Found "Previous" button, attaching handler`)
        previous.addEventListener('click', () => {
          console.log('[Looper] 👈 Previous button clicked')
          loop.previous({ duration: 0.85, ease: 'easeInOut' })
        })
      }

      // Fade in the WRAPPER (not the outer element!)
      if (wrapper) {
        console.log(`[Looper]    🎨 Fading in wrapper (opacity 0 → 1)`)
        animate(wrapper, { opacity: 1 }, { duration: 0.5, delay: 0.5, ease: 'easeOut' })
      } else {
        console.warn(`[Looper]    ⚠️ No wrapper found, cannot fade in`)
      }

      this.loopers.push(loop)
      console.log(`[Looper]    ✅ Loop #${idx + 1} finalized and added to active loopers`)
    })

    // Clear pending
    this.pendingLoopers = []
    console.log('[Looper] 🎉 All loopers finalized! Active loopers:', this.loopers.length)
  }

  destroy() {
    this.loopers.forEach(loop => loop.destroy())
    this.loopers = []
    this.pendingLoopers = []
  }
}
