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
  const container =
    center === true
      ? items[0].parentNode
      : (typeof center === 'string' ? document.querySelector(center) : center) ||
        items[0].parentNode

  console.log('[Looper:horizontalLoop]    → Container:', container)

  // State
  let curIndex = 0
  let totalWidth = 0
  let originalItemsWidth = 0 // Width of ONLY original items (for wrapping)
  let pixelsPerSecond = (config.speed || 1) * 100
  let animation = null
  let position = motionValue(0) // Source of truth for position
  let boundedPos = motionValue(0) // Bounded position (0 to originalItemsWidth)
  let lastBoundedValue = 0 // Track last value to detect wraps
  let originalItemCount = 0 // Track count of ORIGINAL items (before clones)

  // Cached measurements
  let widths = []
  let xPercents = []
  let times = []
  let startX = 0
  let gap = 0 // CSS gap between items
  let offsetLefts = [] // Cache offsetLeft values to avoid layout thrashing
  let containerWidth = 0 // Cache container width to avoid layout reads on every frame
  let itemWrapOffsets = [] // Cache current wrap offset for each item

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
    // Total = sum of item widths + gaps between items + paddingRight + trailing gap
    const totalWidth =
      last.offsetLeft + lastWidth - startX + (parseFloat(config.paddingRight) || 0) + gap

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

    console.log(
      '[Looper:replicate]    → Min required width:',
      minRequiredWidth,
      'px',
      '(2.5x container + buffer)'
    )

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

    console.log(
      '[Looper:replicate]    → Starting replication (original items:',
      originalItemCount,
      ')'
    )

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

      console.log(
        `[Looper:replicate]    → Replication #${count}: added ${originalItemCount} items, total width now ${totalWidth}px`
      )

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

    console.log(
      `[Looper:replicate]    ✅ Replication complete: ${items.length} total items (${count} replication rounds)`
    )
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

    // Calculate width of ONLY original items (for wrapping distance)
    // This is the distance from first item to first clone
    if (originalItemCount > 0 && items.length > originalItemCount) {
      originalItemsWidth = items[originalItemCount].offsetLeft - items[0].offsetLeft // + gap
      console.log('[Looper:populateWidths]    → Original items width:', originalItemsWidth, 'px')
    } else {
      // No clones yet, use totalWidth
      originalItemsWidth = totalWidth
    }
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
    // Use same wrapping formula as frame.render to handle negative positions (reversed mode)
    const boundedPos = ((pos % originalItemsWidth) + originalItemsWidth) % originalItemsWidth

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

      // Original items only ever have -totalWidth, 0, or +totalWidth offset
      // This positions them AFTER all clones (not just after wrapping area)
      let newOffset = 0

      // Ticker boundary pattern: Check if item should be at the END or at the START
      // When container cycles (boundedPos wraps from ~originalItemsWidth to ~0),
      // items with large offsets get reset back to 0

      // Wrap distance includes the trailing gap for seamless cycling
      const wrapOffset = totalWidth + gap

      // Check if we're in the "reset zone" near wrap boundaries
      const nearForwardWrap = boundedPos > originalItemsWidth - gap
      const nearReverseWrap = boundedPos < gap

      // RESET: When in reset zone, reset items and SKIP wrap checks to avoid fighting
      if (nearForwardWrap && itemWrapOffsets[i] === wrapOffset) {
        // Container about to wrap (forward), reset items at END back to START
        newOffset = 0
      } else if (nearReverseWrap && itemWrapOffsets[i] === -wrapOffset) {
        // Container about to wrap (reverse), reset items at START back to END
        newOffset = 0
      } else if (nearForwardWrap || nearReverseWrap) {
        // In reset zone but item doesn't need reset → keep current offset
        newOffset = itemWrapOffsets[i]
      } else if (itemLeft < -(widths[i] + containerWidth * 0.5)) {
        // Item exited left edge → move to END (after all clones + gap)
        newOffset = wrapOffset
      } else if (itemLeft > containerWidth + containerWidth * 0.5) {
        // Item entered from right (reverse direction) → move to START
        newOffset = -wrapOffset
      } else {
        // Keep current offset
        newOffset = itemWrapOffsets[i]
      }

      // ONLY update transform if the offset has changed!
      if (newOffset !== itemWrapOffsets[i]) {
        item.style.transform = newOffset !== 0 ? `translateX(${newOffset}px)` : 'none'
        itemWrapOffsets[i] = newOffset
        console.log(`[Looper:wrap] ✅ Item #${i + 1} offset changed to ${newOffset}px`, {
          boundedPos: boundedPos.toFixed(2),
          itemLeft: itemLeft.toFixed(2),
          offsetLeft: offsetLefts[i],
          transform: newOffset !== 0 ? `translateX(${newOffset}px)` : 'none',
        })
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

        animation = animate(position, totalWidth - container.offsetWidth, {
          duration,
          ease: 'linear',
        })

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
    console.log(
      '[Looper:init]    → After replication: ',
      items.length,
      'items (',
      items.length - originalItemCount,
      'clones )'
    )

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
    function startRenderLoop() {
      if (renderUnsubscribe) return // Already running

      const containerElement = items[0].parentElement

      // Set up boundedPos motionValue to automatically sync with position
      // This calculates the bounded position (0 to originalItemsWidth)
      const positionUnsubscribe = position.on('change', (latest) => {
        const bounded = ((latest % originalItemsWidth) + originalItemsWidth) % originalItemsWidth
        boundedPos.set(bounded)
      })

      // Detect when boundedPos wraps (crosses boundary) and reset all items
      // This prevents stuck items during fast drags
      const boundedPosUnsubscribe = boundedPos.on('change', (latest) => {
        const wrappedForward = lastBoundedValue > originalItemsWidth / 2 && latest < originalItemsWidth / 2
        const wrappedBackward = lastBoundedValue < originalItemsWidth / 2 && latest > originalItemsWidth / 2

        if (wrappedForward || wrappedBackward) {
          console.log('[Looper:boundedPos] 🔄 Boundary crossed, resetting all items', {
            lastValue: lastBoundedValue.toFixed(2),
            newValue: latest.toFixed(2),
            direction: wrappedForward ? 'forward' : 'backward',
          })
          // Reset all original items immediately to prevent stuck state
          items.forEach((item, i) => {
            if (!item.hasAttribute('data-looper-clone')) {
              item.style.transform = 'none'
              itemWrapOffsets[i] = 0
            }
          })
        }

        lastBoundedValue = latest
      })

      let frameCount = 0
      renderUnsubscribe = frame.render(() => {
        // Read bounded position from motionValue
        const currentBoundedPos = boundedPos.get()

        // Debug logging every 60 frames (~1 second)
        if (frameCount % 60 === 0) {
          console.log('[Looper:frame]', {
            rawPos: position.get().toFixed(2),
            boundedPos: currentBoundedPos.toFixed(2),
            originalItemsWidth,
            totalWidth,
            containerTransform: `-${currentBoundedPos.toFixed(2)}px`,
          })
        }
        frameCount++

        // Apply bounded transform to container
        containerElement.style.transform = `translateX(${-currentBoundedPos}px)`

        // Wrap items based on bounded position
        updateItemPositions(currentBoundedPos)
      }, true) // true = keep alive

      // Store unsubscribe functions for cleanup
      renderUnsubscribe.positionUnsubscribe = positionUnsubscribe
      renderUnsubscribe.boundedPosUnsubscribe = boundedPosUnsubscribe
    }

    function stopRenderLoop() {
      if (renderUnsubscribe) {
        // Unsubscribe from motionValue listeners
        if (renderUnsubscribe.positionUnsubscribe) {
          renderUnsubscribe.positionUnsubscribe()
        }
        if (renderUnsubscribe.boundedPosUnsubscribe) {
          renderUnsubscribe.boundedPosUnsubscribe()
        }
        cancelFrame(renderUnsubscribe)
        renderUnsubscribe = null
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

      const duration = originalItemsWidth / pixelsPerSecond
      const currentPos = position.get()
      // Reversed: crawl backwards (right-to-left), Normal: crawl forward (left-to-right)
      const target = config.reversed
        ? currentPos - originalItemsWidth
        : currentPos + originalItemsWidth

      // Animate the position motionValue
      // frame.render loop will apply bounded position to DOM
      animation = animate(position, target, {
        duration,
        repeat: Infinity,
        ease: 'linear',
      })

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
      // Reversed: negative target, Normal: positive target
      const target = config.reversed ? -maxScroll : maxScroll

      animation = animate(position, target, {
        duration,
        ease: 'linear',
      })

      animation.pause()
      console.log(
        '[Looper:init]    → Created non-looping animation (maxScroll:',
        maxScroll,
        'px, reversed:',
        config.reversed,
        ')'
      )
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
    let velocityTracker = [] // Track recent movements for velocity calculation

    /**
     * Calculate velocity from recent pointer movements
     * Uses weighted average of last few movements
     * @returns {number} Velocity in pixels per second
     */
    function getVelocity() {
      if (velocityTracker.length < 2) return 0

      // Use last 5 movements for smoothing
      const recent = velocityTracker.slice(-5)
      let totalVelocity = 0
      let totalWeight = 0

      for (let i = 1; i < recent.length; i++) {
        const prev = recent[i - 1]
        const curr = recent[i]
        const deltaX = curr.x - prev.x
        const deltaTime = curr.time - prev.time

        if (deltaTime > 0) {
          // Weight more recent movements higher
          const weight = i / recent.length
          const velocity = (deltaX / deltaTime) * 1000 // Convert to px/second
          totalVelocity += velocity * weight
          totalWeight += weight
        }
      }

      return totalWeight > 0 ? totalVelocity / totalWeight : 0
    }

    /**
     * Handle pointer down - start drag
     */
    function onPointerDown(e) {
      // Only handle primary pointer (left click, first touch)
      if (e.button !== undefined && e.button !== 0) return

      isDragging = true
      startX = e.clientX
      startPosition = position.get()
      velocityTracker = [{ x: e.clientX, time: Date.now() }]

      // Stop any ongoing animations
      if (inertiaAnimation) {
        inertiaAnimation.stop()
        inertiaAnimation = null
      }
      if (animation) {
        animation.stop()
        animation = null
      }
      if (speedRampAnimation) {
        speedRampAnimation.stop()
        speedRampAnimation = null
      }

      // Change cursor
      container.style.cursor = 'grabbing'

      // Prevent text selection
      e.preventDefault()

      // Add move/up listeners to window for better tracking
      window.addEventListener('pointermove', onPointerMove, { passive: false })
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('pointercancel', onPointerUp)
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

      // Calculate drag delta and new position
      const deltaX = startX - currentX
      const newPosition = startPosition + deltaX

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
    }

    /**
     * Handle pointer up - end drag and start inertia
     */
    function onPointerUp(e) {
      if (!isDragging) return

      isDragging = false

      // Clean up listeners
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)

      // Reset cursor
      container.style.cursor = 'grab'

      // Calculate final velocity
      const velocity = getVelocity()

      // Start inertia if we have velocity
      if (Math.abs(velocity) > 1) {
        startInertia(velocity)
      } else if (config.snap) {
        snapToNearest()
      } else if (config.crawl) {
        resumeCrawl()
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

      // Calculate estimated target based on inertia physics
      const power = 0.8
      const timeConstant = 325 / 1000 // Convert to seconds
      const estimatedDistance = motionVelocity * timeConstant * 0.5
      const targetPos = currentPos + estimatedDistance

      // Animate position motionValue with inertia
      inertiaAnimation = animate(position, targetPos, {
        type: 'inertia',
        velocity: motionVelocity,
        power,
        timeConstant: 325,
        restSpeed: 10,
        restDelta: 0.5,
        // For non-looping, add boundaries
        ...(shouldLoop
          ? {}
          : {
              min: 0,
              max: Math.max(0, totalWidth - container.offsetWidth),
              bounceStiffness: 300,
              bounceDamping: 30,
            }),
      })

      // When inertia completes
      inertiaAnimation
        .then(() => {
          inertiaAnimation = null
          if (config.crawl) {
            resumeCrawl()
          }
        })
        .catch(() => {
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
      const snapAnimation = animate(position, snapPos, {
        type: 'spring',
        bounce: 0.2,
        duration: 0.5,
      })

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
      if (!config.crawl) return

      // Stop any existing animations
      if (animation) {
        animation.stop()
      }
      if (speedRampAnimation) {
        speedRampAnimation.stop()
        speedRampAnimation = null
      }

      // Read current position from motionValue
      const currentPos = position.get()

      // Calculate position within current cycle (using originalItemsWidth)
      const cyclePos = currentPos % originalItemsWidth
      const remainingDist = originalItemsWidth - cyclePos
      const remainingDuration = remainingDist / pixelsPerSecond

      // Animate position to complete this cycle
      // Reversed: move backwards, Normal: move forward
      const targetPos = config.reversed ? currentPos - remainingDist : currentPos + remainingDist
      animation = animate(position, targetPos, {
        duration: remainingDuration,
        ease: 'linear',
      })

      // When cycle completes, restart infinite loop
      animation
        .then(() => {
          console.log(
            '[Looper:resumeCrawl] → Remaining distance complete, restarting infinite loop'
          )

          // Capture current speed before replacing animation
          const currentSpeed = animation.speed
          console.log('[Looper:resumeCrawl] → Current animation speed:', currentSpeed)

          // Create new infinite loop animation
          const currentPos = position.get()
          // Reversed: crawl backwards, Normal: crawl forward
          const target = config.reversed
            ? currentPos - originalItemsWidth
            : currentPos + originalItemsWidth
          animation = animate(position, target, {
            duration: originalItemsWidth / pixelsPerSecond,
            repeat: Infinity,
            ease: 'linear',
          })

          // Inherit the current speed from the ramp
          animation.speed = currentSpeed
          console.log(
            '[Looper:resumeCrawl] → New animation created with inherited speed:',
            currentSpeed
          )

          // If speed ramp is still running, re-target it to continue ramping the new animation
          if (speedRampAnimation) {
            speedRampAnimation.stop()
            // Calculate remaining ramp duration based on current speed
            // speed goes from 0.001 to 1.0, so progress = (currentSpeed - 0.001) / (1.0 - 0.001)
            const rampProgress = (currentSpeed - 0.001) / 0.999
            const remainingRampDuration = 2 * (1 - rampProgress)
            console.log(
              '[Looper:resumeCrawl] → Continuing speed ramp from',
              currentSpeed,
              'for',
              remainingRampDuration,
              's'
            )
            speedRampAnimation = animate(
              animation,
              { speed: 1 },
              { duration: remainingRampDuration, ease: 'easeIn' }
            )
          }
        })
        .catch(err => {
          console.log('[Looper:resumeCrawl] → Animation stopped/cancelled:', err)
        })

      // Start at nearly-stopped speed and ramp up to full speed
      // Use 0.001 instead of 0 to keep animation running (speed = 0 completely pauses)
      animation.speed = 0.001
      speedRampAnimation = animate(animation, { speed: 1 }, { duration: 2, ease: 'easeIn' })
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
      },
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

    const navAnimation = animate(position, targetPos, {
      duration,
      ease,
    })

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
    },
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
    console.log(
      '[Looper] 📦 Found',
      this.looperElements.length,
      'looper elements matching selector:',
      this.opts.selector
    )

    this.looperElements.forEach((element, idx) => {
      console.log(`[Looper] 🔍 Processing looper #${idx + 1}:`, element)

      const items = Dom.all(element, '[data-panner-item], [data-looper-item]')
      console.log(`[Looper]    → Found ${items.length} items`)

      if (!items.length) {
        console.warn('[Looper] ⚠️ No items found in', element)
        return
      }

      // Find the wrapper element (with opacity: 0)
      const wrapper =
        Dom.find(element, '[data-looper-container]') || Dom.find(element, '.looper-wrapper')
      console.log(`[Looper]    → Found wrapper:`, wrapper)

      if (!wrapper) {
        console.warn(
          '[Looper] ⚠️ No wrapper element found (expected [data-looper-container] or .looper-wrapper)'
        )
      }

      const speed = ['mobile', 'iphone'].includes(this.app.breakpoint)
        ? this.opts.speed.sm
        : this.opts.speed.lg

      const isReverse = element.querySelector('[data-looper-reverse]') !== null
      const hasSnapAttribute = element
        .querySelector('[data-looper]')
        ?.hasAttribute('data-looper-snap')
      const shouldSnap = this.opts.snap || hasSnapAttribute

      console.log(
        `[Looper]    → Config: speed=${speed}, reverse=${isReverse}, snap=${shouldSnap}, loop=${this.opts.loop}, crawl=${this.opts.crawl}`
      )

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
        },
      })
      console.log(
        `[Looper]    ✅ Added to pending loopers (total: ${this.pendingLoopers.length})`
      )
    })

    console.log('[Looper] 🎯 Registering APPLICATION:REVEALED callback')
    console.log('[Looper] 💤 Waiting for APPLICATION:REVEALED event to finalize loopers...')

    // Register callback for when layout is ready
    this.app.registerCallback('APPLICATION:REVEALED', () => {
      this.finalizeLoopers()
    })
  }

  finalizeLoopers() {
    console.log(
      '[Looper] 🎬 APPLICATION:REVEALED fired! Finalizing',
      this.pendingLoopers.length,
      'pending loopers...'
    )

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
