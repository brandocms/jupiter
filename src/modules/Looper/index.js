import { animate, motionValue, frame, cancelFrame } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import Dom from '../Dom'
import prefersReducedMotion from '../../utils/prefersReducedMotion'

/**
 * Modulo that centers the result around zero: (-base/2, base/2]
 * Useful for finding shortest distance on a cycle.
 */
function symmetricMod(value, base) {
  let m = value % base
  if (Math.abs(m) > base / 2) {
    m = m > 0 ? m - base : m + base
  }
  return m
}

// Named constants (M5)
const CLONE_BUFFER_MULTIPLIER = 2.5
const MIN_CRAWL_SPEED = 0.001
const PING_PONG_PAUSE_MS = 200
const VELOCITY_WINDOW_MS = 150
const SPEED_RAMP_DURATION = 2

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
  peek: false, // Centers viewport on the gap between two items (half | full | full | half)
  snap: false, // Set to true to enable snap-to-item behavior
  crawl: true, // Continuous auto-scrolling
  loop: true, // Infinite looping (false for linear scrolling)
  draggable: true, // Enable drag interaction
  endAlignment: 'right', // For non-looping: 'right' = last item at viewport right edge, 'start' = last item at viewport left edge
  minimumMovement: 3, // Pixels for mouse - movement below this is treated as click, above as drag
  touchMinimumMovement: 10, // Pixels for touch - higher threshold for finger imprecision

  // Inertia/throw configuration (when dragging and releasing)
  throwResistance: 325, // Time constant for deceleration (lower = more resistance/faster stop, higher = less resistance/longer glide)
  throwPower: 0.8, // Deceleration curve (0-1, higher = more gradual slowdown)
  throwVelocityMultiplier: 0.8, // Scale velocity for all throws (0.5 = half speed, 2.0 = double)
  snapVelocityMultiplier: 0.8, // Additional scaling for snapped loopers (stacks with throwVelocityMultiplier)

  // Snap animation configuration (when snap: true)
  snapDuration: 0.5, // Duration of snap animation in seconds (0.3-1.0, lower = faster/snappier)
  snapBounce: 0.15, // Spring bounce amount (0-1, 0 = no bounce, higher = more bouncy)

  speed: {
    sm: 0.1, // Speed for mobile (multiplier)
    lg: 0.35, // Speed for desktop (multiplier)
  },

  ease: {
    mouseOver: { speed: 0.3, duration: 0.75 },
    mouseOut: { speed: 1, duration: 0.75 },
  },

  // Called when the looper is ready to reveal. Receives (wrapper, loop) args.
  // Override to control the reveal animation yourself. Default fades in the wrapper.
  onReveal: null,

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
  // Convert to array
  items = Array.from(items)
  config = config || {}

  const shouldLoop = config.loop !== false
  const shouldDrag = config.draggable !== false
  const reducedMotion = prefersReducedMotion() && app?.opts?.respectReducedMotion

  // Container setup
  const center = config.center
  const container =
    center === true
      ? items[0].parentNode
      : (typeof center === 'string' ? document.querySelector(center) : center) ||
        items[0].parentNode

  // State
  let curIndex = 0
  let totalWidth = 0
  let originalItemsWidth = 0 // Width of ONLY original items (for wrapping)
  let pixelsPerSecond = (config.speed || 1) * 100
  let animation = null
  let position = motionValue(0) // Source of truth for position (raw, unbounded)
  let originalItemCount = 0 // Track count of ORIGINAL items (before clones)
  let maxScrollPosition = 0 // For non-looping: max scroll where last item is at right edge

  // Cached measurements
  let widths = []
  let xPercents = []
  let times = []
  let startX = 0
  let gap = 0 // CSS gap between items
  let offsetLefts = [] // Cache offsetLeft values to avoid layout thrashing
  let containerWidth = 0 // Cache container width to avoid layout reads on every frame
  let itemWrapOffsets = [] // Cache current wrap offset for each item
  let isCloneCache = [] // Cache which items are clones (avoid hasAttribute checks)
  let itemsHaveTransforms = null // Cache whether any original items have CSS transforms (H5)

  // Drag state and cleanup handlers
  let dragState = {}
  let isDragging = false  // Track if user is actively dragging (for wrap detection guard)
  let speedRampAnimation = null // Track speed ramp animation
  let inertiaAnimation = null // Track inertia animation
  let snapAnimation = null // Track snap animation
  let navAnimation = null // Track navigation animation (next/previous/toIndex)
  let positionUnsubscribe = null // Track position listener for cleanup
  let renderUnsubscribe = null // Track frame.render loop for cleanup
  let indexUnsubscribe = null // Track index display position listener (C3)
  let pingPongTimeout = null // Track ping-pong pause timeout (C4)
  let resumeCrawlGeneration = 0 // Generation counter for resumeCrawl race condition (C7)
  let hoverCleanup = null // Track hover effects cleanup function (C1/C9)
  let startPingPongCrawl = null // Closure-scoped ping-pong starter (M2)
  let indexSetByNav = false // True when curIndex was set by toIndex, cleared on drag

  // Scroll direction tracking for wrap logic
  let scrollDirection = 0 // -1 = backward, 0 = neutral, 1 = forward
  let lastPositionForDirection = 0

  // Display elements for index/count
  let indexElements = []
  let countElements = []

  // Cache track element reference (M3)
  const trackElement = items[0].parentElement

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

    // Use cached gap, or calculate if not yet cached
    if (gap === 0) {
      gap = parseFloat(getComputedStyle(container).gap) || 0
    }

    // Calculate total including gaps and padding
    // Total = sum of item widths + gaps between items + paddingRight + trailing gap
    const totalWidth =
      last.offsetLeft + lastWidth - startX + (parseFloat(config.paddingRight) || 0) + gap

    return totalWidth
  }

  /**
   * Replicate items until total width >= container width + buffer
   * Fixes exponential duplication bug from original
   */
  function replicateItemsIfNeeded() {
    if (!shouldLoop) {
      return
    }

    const containerWidth = container.offsetWidth
    let totalWidth = getTotalWidthOfItems()

    // Safety: bail if no layout yet
    if (containerWidth === 0 || totalWidth === 0) {
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
    const minRequiredWidth = containerWidth * CLONE_BUFFER_MULTIPLIER + maxItemWidth

    // Store original count to prevent exponential growth
    const originalItemCount = items.length
    const maxReplications = 10
    let count = 0
    let previousTotalWidth = totalWidth

    // Always create at least TWO sets of clones - needed for starting at first clone position
    // Then continue until we have enough width for seamless looping
    while ((count < 2 || totalWidth < minRequiredWidth) && count < maxReplications) {
      // Clone ONLY original items
      for (let i = 0; i < originalItemCount; i++) {
        const clone = items[i].cloneNode(true)
        clone.setAttribute('data-looper-clone', 'true')
        container.appendChild(clone)
        items.push(clone)

        // Force-load cloned lazyload elements without revealing them
        // Sources are swapped immediately (no flash on wrap), but data-ll-loaded
        // is not set — the reveal happens after the wrapper fade-in animation
        if (app?.lazyload?.forceLoad) {
          app.lazyload.forceLoad(clone, { reveal: false })
        }
      }

      // Force layout recalculation
      container.getBoundingClientRect()
      totalWidth = getTotalWidthOfItems()
      count++

      // Safety: detect if width isn't increasing
      if (totalWidth <= previousTotalWidth && count > 1) {
        break
      }

      previousTotalWidth = totalWidth
    }
  }

  /**
   * Measure and cache all item widths and positions
   * Batched to avoid layout thrashing
   */
  function populateWidths() {
    // Cache CSS gap (only changes on resize)
    gap = parseFloat(getComputedStyle(container).gap) || 0

    items.forEach((el, i) => {
      // Cache offsetLeft for all items (needed for positioning calculations)
      offsetLefts[i] = el.offsetLeft

      // For clones, copy width from corresponding original item (avoid getBoundingClientRect)
      // Clones are exact copies so they have the same dimensions
      if (isCloneCache[i]) {
        const originalIndex = i % originalItemCount
        widths[i] = widths[originalIndex]
        xPercents[i] = 0 // Clones don't have any initial transform
      } else {
        // For original items, measure actual dimensions
        const rect = el.getBoundingClientRect()
        widths[i] = rect.width

        // Check transforms only if items have them (H5)
        // Check once at first call, cache for subsequent calls
        if (itemsHaveTransforms === null) {
          itemsHaveTransforms = items.slice(0, originalItemCount || items.length).some(item => {
            const t = window.getComputedStyle(item).transform
            return t && t !== 'none'
          })
        }

        if (itemsHaveTransforms) {
          const computedStyle = window.getComputedStyle(el)
          const transform = computedStyle.transform
          let currentX = 0

          if (transform && transform !== 'none') {
            const matrix = new DOMMatrix(transform)
            currentX = matrix.m41
          }

          xPercents[i] = (currentX / widths[i]) * 100
        } else {
          xPercents[i] = 0
        }
      }
    })

    // Update startX and cache container width
    startX = items[0].offsetLeft
    containerWidth = container.offsetWidth // Cache once here instead of reading every frame
    totalWidth = getTotalWidthOfItems()

    // Calculate width of ONLY original items (for wrapping distance)
    // This is the distance from first item to first clone
    if (originalItemCount > 0 && items.length > originalItemCount) {
      originalItemsWidth = items[originalItemCount].offsetLeft - items[0].offsetLeft // + gap
    } else {
      // No clones yet, use totalWidth
      originalItemsWidth = totalWidth
    }

    // Calculate max scroll for non-looping based on endAlignment
    if (!shouldLoop && originalItemCount > 0) {
      if (config.peek) {
        // Peek mode: max scroll where gap after last item is at viewport center
        const lastItemIndex = originalItemCount - 1
        const lastItemRightEdge = offsetLefts[lastItemIndex] + widths[lastItemIndex] - startX
        const viewportCenter = containerWidth / 2
        const idealMaxScroll = lastItemRightEdge + gap / 2 - viewportCenter
        const absoluteMax = lastItemRightEdge - containerWidth
        maxScrollPosition = Math.max(0, Math.min(idealMaxScroll, absoluteMax))
      } else if (config.centerSlide) {
        // Center mode: max scroll is where last item's center is at viewport center
        // But clamped so we don't show empty space
        const lastItemIndex = originalItemCount - 1
        const lastItemCenter = offsetLefts[lastItemIndex] + widths[lastItemIndex] / 2 - startX
        const viewportCenter = containerWidth / 2
        const idealMaxScroll = lastItemCenter - viewportCenter
        // Clamp to ensure last item doesn't go past right edge
        const lastItemRightEdge = offsetLefts[lastItemIndex] + widths[lastItemIndex] - startX
        const absoluteMax = lastItemRightEdge - containerWidth
        maxScrollPosition = Math.max(0, Math.min(idealMaxScroll, absoluteMax))
      } else if (config.endAlignment === 'start') {
        // 'start' alignment: last item can scroll to left edge (traditional behavior)
        const lastItemIndex = originalItemCount - 1
        const lastItemLeftEdge = offsetLefts[lastItemIndex] - startX
        maxScrollPosition = Math.max(0, lastItemLeftEdge)
      } else {
        // 'right' alignment (default): last item's right edge at viewport's right edge
        const lastItemIndex = originalItemCount - 1
        const lastItemRightEdge = offsetLefts[lastItemIndex] + widths[lastItemIndex] - startX
        maxScrollPosition = Math.max(0, lastItemRightEdge - containerWidth)
      }
    }
  }

  /**
   * Calculate snap position for an item (M4 - shared between loop and non-loop paths)
   */
  function calculateSnapPos(item, i) {
    const curX = (xPercents[i] / 100) * widths[i]

    if (config.peek) {
      const itemRightEdge = item.offsetLeft + curX + widths[i] - startX
      const viewportCenter = containerWidth / 2
      return itemRightEdge + gap / 2 - viewportCenter
    } else if (config.centerSlide) {
      const itemCenter = item.offsetLeft + curX + widths[i] / 2 - startX
      const viewportCenter = containerWidth / 2
      return itemCenter - viewportCenter
    } else {
      return item.offsetLeft + curX - startX
    }
  }

  /**
   * Calculate time positions for snapping
   * These represent when each item hits the "start" position
   */
  function populateSnapTimes() {
    items.forEach((item, i) => {
      times[i] = calculateSnapPos(item, i) / pixelsPerSecond
    })

    if (!shouldLoop) return

    // Adjust for container padding if present (looping only)
    const containerPaddingLeft = parseFloat(getComputedStyle(trackElement).paddingLeft) || 0

    if (containerPaddingLeft > 0) {
      const paddingTime = containerPaddingLeft / pixelsPerSecond
      times = times.map(time => time - paddingTime)
    }
  }

  /**
   * Check item positions and wrap when needed
   * Container uses RAW position - items wrap individually when far off-screen
   * @param {number} rawPos - Current raw position value (unbounded)
   */
  function updateItemPositions(rawPos) {
    if (!shouldLoop) return

    // Items wrap by the full cycle distance (totalWidth) to maintain relative positions
    // This keeps all items within viewing distance as position grows/shrinks
    const cycleDistance = totalWidth

    // Initialize wrap offsets - calculate correct cycle directly (not incrementally)
    // so items land in the right place even when position is many cycles away
    if (itemWrapOffsets.length === 0) {
      itemWrapOffsets = new Array(items.length)
      for (let i = 0; i < items.length; i++) {
        const distance = offsetLefts[i] - rawPos
        const offset = Math.round(distance / -cycleDistance) * cycleDistance
        itemWrapOffsets[i] = offset
        items[i].style.transform = offset !== 0 ? `translateX(${offset}px)` : 'none'
      }
      return
    }

    // Wrap threshold: when an item is more than half a cycle from view, wrap it
    const wrapThreshold = cycleDistance / 2

    for (let i = 0; i < items.length; i++) {
      // Calculate this item's effective position (DOM position + wrap offset)
      const effectivePos = offsetLefts[i] + itemWrapOffsets[i]

      // Distance from current view position
      // Positive = item is ahead (to the right), Negative = item is behind (to the left)
      const distanceFromView = effectivePos - rawPos

      let newOffset = itemWrapOffsets[i]

      if (distanceFromView < -wrapThreshold) {
        // Item is too far left (behind), wrap it forward (to the right)
        newOffset = itemWrapOffsets[i] + cycleDistance
      } else if (distanceFromView > wrapThreshold + containerWidth) {
        // Item is too far right (ahead), wrap it backward (to the left)
        newOffset = itemWrapOffsets[i] - cycleDistance
      }

      // Only update DOM if offset changed
      if (newOffset !== itemWrapOffsets[i]) {
        items[i].style.transform = newOffset !== 0 ? `translateX(${newOffset}px)` : 'none'
        itemWrapOffsets[i] = newOffset
      }
    }
  }

  /**
   * Refresh measurements and recalculate animation
   * @param {boolean} deep - Whether to rebuild animation (on resize)
   */
  function refresh(deep = false) {
    // Pause animation if running
    const wasPlaying = animation && animation.speed !== 0
    if (animation) {
      animation.pause()
    }

    if (deep) {
      // Save pre-resize measurements for proportional position restore
      const oldOriginalItemsWidth = originalItemsWidth
      const oldMaxScrollPosition = maxScrollPosition
      const oldPosition = position.get()

      if (shouldLoop) {
        // DEEP REFRESH: Reset wrap offset tracking (DOM transforms written by updateItemPositions init)
        itemWrapOffsets = []
      }

      // Remeasure everything
      populateWidths()

      // Check if we need to replicate more items
      const currentContainerWidth = container.offsetWidth
      const currentTotalWidth = getTotalWidthOfItems()

      // Use same buffer multiplier as replication logic
      if (shouldLoop && currentTotalWidth < currentContainerWidth * CLONE_BUFFER_MULTIPLIER) {
        replicateItemsIfNeeded()
        // Re-cache clone status for any new items
        isCloneCache = items.map((item, i) => i >= originalItemCount)
        populateWidths()
      }

      populateSnapTimes()

      // Restore position proportionally to preserve scroll progress across resize
      let restoredPos
      if (shouldLoop) {
        const ratio = oldOriginalItemsWidth > 0
          ? oldPosition / oldOriginalItemsWidth
          : 1
        restoredPos = ratio * originalItemsWidth
      } else {
        const ratio = oldMaxScrollPosition > 0
          ? oldPosition / oldMaxScrollPosition
          : 0
        restoredPos = ratio * maxScrollPosition
      }

      position.set(restoredPos)
      lastPositionForDirection = restoredPos

      // Apply position and item wraps synchronously to avoid flash
      // (frame.render is async so we must write DOM directly here)
      trackElement.style.transform = `translateX(${-restoredPos}px)`
      updateItemPositions(restoredPos)

      // If snap is enabled, settle to nearest snap point
      if (config.snap && !config.crawl) {
        const snapPos = findNearestSnapPoint(restoredPos)
        const clampedPos = shouldLoop ? snapPos : Math.max(0, Math.min(snapPos, maxScrollPosition))
        animate(position, clampedPos, { duration: 0.3, ease: 'easeOut' })
      }

      // Recreate animation with new measurements
      if (shouldLoop && config.crawl) {
        // Stop old animation
        if (animation) {
          animation.stop()
        }

        // Recreate loop animation with new measurements
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
          animation.play()
        } else {
          animation.pause()
        }
      }

      // Update index display
      updateIndexDisplay()
    } else {
      // Light refresh - just update measurements
      populateWidths()
      populateSnapTimes()
      // Update positions based on current scroll
      updateItemPositions(position.get())
    }
  }

  /**
   * Update the slide index display elements
   */
  function updateIndexDisplay() {
    if (indexElements.length === 0) return
    const displayIndex =
      (((curIndex % originalItemCount) + originalItemCount) % originalItemCount) + 1 // 1-based, handle negative
    indexElements.forEach(el => {
      el.textContent = displayIndex
    })
  }

  /**
   * Create and start the crawl animation loop
   * Animates the position motionValue (frame.render loop applies to DOM)
   */
  function startLoopAnimation() {
    if (!shouldLoop || !config.crawl) return null

    const duration = originalItemsWidth / pixelsPerSecond
    const currentPos = position.get()
    // Reversed: crawl backwards (right-to-left), Normal: crawl forward (left-to-right)
    const target = config.reversed
      ? currentPos - originalItemsWidth
      : currentPos + originalItemsWidth

    // Animate the position motionValue
    // frame.render loop will apply raw position to container and wrap items
    animation = animate(position, target, {
      duration,
      repeat: Infinity,
      ease: 'linear',
    })

    return animation
  }

  /**
   * Stop the frame.render loop and cleanup listeners
   * Called from init() and destroy()
   */
  function stopRenderLoop() {
    if (renderUnsubscribe) {
      // Unsubscribe from motionValue listener
      if (renderUnsubscribe.positionUnsubscribe) {
        renderUnsubscribe.positionUnsubscribe()
      }
      cancelFrame(renderUnsubscribe)
      renderUnsubscribe = null
    }
  }

  /**
   * Initialize the loop animation
   */
  function init() {
    // Inject CSS for drag pointer-events (H3) - once per page
    if (!document.getElementById('looper-drag-style')) {
      const style = document.createElement('style')
      style.id = 'looper-drag-style'
      style.textContent = '.looper-dragging [data-looper-item] { pointer-events: none; }'
      document.head.appendChild(style)
    }

    // Store original item count BEFORE replication
    originalItemCount = items.length

    // Replicate items if needed
    replicateItemsIfNeeded()

    // Cache which items are clones (avoid hasAttribute checks in hot paths)
    isCloneCache = items.map((item, i) => i >= originalItemCount)

    // Measure everything
    populateWidths()
    populateSnapTimes()

    // Warn if [data-looper] has overflow-x: clip — this clips wrapped items
    // whose individual translateX positions fall outside the container's bounds,
    // even when they are visually positioned within the viewport.
    // Apply overflow-x: clip on a parent element instead.
    const containerOverflow = getComputedStyle(trackElement).overflowX
    if (containerOverflow === 'clip') {
      console.warn(
        `[Looper] [data-looper] has overflow-x: clip which will hide looped items. Apply overflow-x: clip on a parent wrapper element instead.`,
        trackElement
      )
    }

    // Set initial container position
    trackElement.style.willChange = 'transform'

    // For looping (non-center mode): start viewing first CLONE, not originals
    // This positions originals OFF-SCREEN LEFT so backward scroll reveals them smoothly
    if (shouldLoop && !config.centerSlide) {
      position.set(originalItemsWidth)
      lastPositionForDirection = originalItemsWidth
      trackElement.style.transform = `translateX(${-originalItemsWidth}px)`
    } else {
      trackElement.style.transform = 'translateX(0px)'
    }

    // Set up RAF loop to update container position and wrap items
    // Uses RAW position (no modulo) for container transform
    // This is Motion's optimized render loop - prevents layout thrashing
    function startRenderLoop() {
      if (renderUnsubscribe) return // Already running

      // Track scroll direction for wrap logic
      const positionUnsubscribe = position.on('change', latest => {
        const delta = latest - lastPositionForDirection
        if (Math.abs(delta) > 1) {
          scrollDirection = delta > 0 ? 1 : -1
        }
        lastPositionForDirection = latest
      })

      renderUnsubscribe = frame.render(() => {
        // Use RAW position (no bounded) for container
        const currentPos = position.get()
        trackElement.style.transform = `translateX(${-currentPos}px)`

        // Wrap items based on raw position
        updateItemPositions(currentPos)
      }, true) // true = keep alive

      // Store unsubscribe function for cleanup
      renderUnsubscribe.positionUnsubscribe = positionUnsubscribe
    }

    // Start the frame.render loop
    if (shouldLoop) {
      startRenderLoop()
    } else {
      // Non-looping: simple position listener to update container transform
      positionUnsubscribe = position.on('change', latest => {
        trackElement.style.transform = `translateX(${-latest}px)`
      })
    }

    // Create animation by animating the position motionValue
    // Skip crawl entirely when reduced motion is preferred (H4)
    if (shouldLoop && config.crawl && !reducedMotion) {
      const duration = totalWidth / pixelsPerSecond

      // Create initial animation (paused)
      animation = startLoopAnimation()
      animation.pause()
    } else if (!shouldLoop && config.crawl && !reducedMotion) {
      // Non-looping: ping-pong animation (crawl to end, reverse to start)
      // Use maxScrollPosition (last item at right edge) instead of totalWidth
      const duration = maxScrollPosition / pixelsPerSecond

      // Create a ping-pong crawl animation
      startPingPongCrawl = function pingPongCrawl(fromStart = true) {
        const currentPos = position.get()
        const target = fromStart ? maxScrollPosition : 0
        const remainingDist = Math.abs(target - currentPos)
        const remainingDuration = remainingDist / pixelsPerSecond

        // Use easeInOut for smooth acceleration and deceleration at boundaries
        // This creates a natural "bounce back" feel at the edges
        animation = animate(position, target, {
          duration: remainingDuration,
          ease: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for smooth ease-in-out
        })

        // When reaching the end, reverse direction
        animation.then(() => {
          // Brief pause at boundary for visual clarity
          pingPongTimeout = setTimeout(() => {
            if (animation && animation.speed !== 0) {
              pingPongCrawl(!fromStart)
            }
          }, PING_PONG_PAUSE_MS)
        })
      }

      // Create initial animation (starts paused)
      animation = animate(position, maxScrollPosition, {
        duration,
        ease: 'linear',
      })
      animation.pause()
    }

    // Setup drag if enabled
    if (shouldDrag) {
      setupDrag()
    }

    // Setup hover effects (skip in reduced motion - H4)
    if (!reducedMotion) {
      setupHoverEffects()
    }

    // Setup slide index/count display elements
    if (config.wrapper) {
      indexElements = Array.from(config.wrapper.querySelectorAll('[data-looper-slide-index]'))
      countElements = Array.from(config.wrapper.querySelectorAll('[data-looper-slide-count]'))

      if (countElements.length > 0) {
        countElements.forEach(el => {
          el.textContent = originalItemCount
        })
      }

      // Only setup real-time index tracking if display elements exist
      if (indexElements.length > 0) {
        updateIndexDisplay()

        // Update display in real-time as position changes
        let lastDisplayedIndex = -1
        const updateIndexOnChange = () => {
          // Find closest slide to current position
          const closest = closestIndex(false)

          // Only update DOM if index changed (avoid thrashing)
          if (closest !== lastDisplayedIndex) {
            lastDisplayedIndex = closest
            const displayIndex = closest + 1
            indexElements.forEach(el => {
              el.textContent = displayIndex
            })
          }
        }

        // Update index display whenever position changes (closestIndex normalizes internally)
        indexUnsubscribe = position.on('change', updateIndexOnChange)
      }
    }

    // Set initial position
    updateItemPositions(position.get())

    // For center mode, start at middle slide
    if (config.centerSlide && originalItemCount > 0) {
      const middleIndex = Math.floor(originalItemCount / 2)
      const targetTime = times[middleIndex]
      let initialPos = targetTime * pixelsPerSecond

      // Clamp for non-looping
      if (!shouldLoop) {
        initialPos = Math.max(0, Math.min(initialPos, maxScrollPosition))
      }

      position.set(initialPos)
      curIndex = middleIndex
      updateIndexDisplay()
    }

    // Listen for resize events
    window.addEventListener('APPLICATION:RESIZE', handleResize)
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
    // isDragging is now module-level so wrap detection can see it
    let startX = 0
    let startY = 0
    let startPosition = 0
    let velocityTracker = [] // Track recent movements for velocity calculation
    let hasDragged = false // Did movement exceed minimumMovement threshold?
    let axisDecided = false // Has the drag axis been determined? (horizontal vs vertical)
    let stoppedAnimation = false // Was an animation stopped by this pointer down? (tap-to-stop)
    let resumeTimeout = null // Delayed crawl resume after tap-to-stop
    let activeMinimumMovement = config.minimumMovement // Adjusted per pointer type (touch vs mouse)

    /**
     * Capture-phase click handler that prevents link navigation after a drag.
     * Added once per drag and auto-removes via { once: true }.
     */
    function swallowClick(e) {
      e.preventDefault()
      e.stopPropagation()
    }

    /**
     * Calculate velocity from recent pointer movements
     * Uses weighted average of last few movements
     * @returns {number} Velocity in pixels per second
     */
    function getVelocity() {
      if (velocityTracker.length < 2) return 0

      // Use last 6 movements for smoothing
      const recent = velocityTracker.slice(-6)
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
      indexSetByNav = false
      startX = e.clientX
      startY = e.clientY
      startPosition = position.get()
      velocityTracker = [{ x: e.clientX, time: e.timeStamp }]
      hasDragged = false // Reset - will be set true if movement exceeds threshold
      axisDecided = false // Reset - will be decided on first significant movement

      // Use higher threshold for touch to prevent accidental drags from finger imprecision
      activeMinimumMovement = e.pointerType === 'touch'
        ? config.touchMinimumMovement
        : config.minimumMovement

      // Stop autoplay on user interaction
      if (loopController && loopController.stopAutoplay) {
        loopController.stopAutoplay()
      }

      // Cancel any pending resume from a previous tap-to-stop
      clearTimeout(resumeTimeout)

      // Detect if we're stopping a running animation (tap-to-stop)
      stoppedAnimation = !!(
        inertiaAnimation ||
        snapAnimation ||
        (animation && animation.speed !== 0) ||
        speedRampAnimation
      )

      // Stop any ongoing animations
      if (inertiaAnimation) {
        inertiaAnimation.stop()
        inertiaAnimation = null
      }
      if (snapAnimation) {
        snapAnimation.stop()
        snapAnimation = null
      }
      if (animation) {
        animation.stop()
        animation = null
      }
      if (speedRampAnimation) {
        speedRampAnimation.stop()
        speedRampAnimation = null
      }

      // For mouse: prevent default to stop native drag behavior on links/images
      // For touch: don't preventDefault here — we need the browser to be able to scroll
      // if the gesture turns out to be vertical. CSS touch-action: pan-y handles horizontal.
      if (e.pointerType === 'mouse') {
        e.preventDefault()
      }

      // Add move/up listeners to window so events are never lost
      // (pointer capture can silently fail or be released mid-drag)
      window.addEventListener('pointermove', onPointerMove, { passive: false })
      window.addEventListener('pointerup', onPointerUp)
      window.addEventListener('pointercancel', onPointerUp)
    }

    /**
     * Handle pointer move - update position
     */
    function onPointerMove(e) {
      if (!isDragging) return

      const currentX = e.clientX
      const currentTime = e.timeStamp

      // Axis locking: when movement first exceeds threshold, check if primarily
      // horizontal or vertical. If vertical, abort drag and let the browser scroll.
      if (!axisDecided) {
        const deltaX = Math.abs(currentX - startX)
        const deltaY = Math.abs(e.clientY - startY)
        const maxDelta = Math.max(deltaX, deltaY)

        // Wait until enough movement to decide
        if (maxDelta < activeMinimumMovement) return

        axisDecided = true

        // If clearly vertical, abort — release pointer and let browser scroll.
        // Bias toward carousel interaction: vertical must be 1.2x horizontal to abort.
        if (deltaY > deltaX * 1.2) {
          isDragging = false
          window.removeEventListener('pointermove', onPointerMove)
          window.removeEventListener('pointerup', onPointerUp)
          window.removeEventListener('pointercancel', onPointerUp)
          // Resume crawl if we stopped it on pointerdown
          if (stoppedAnimation && config.crawl) {
            resumeCrawl()
          }
          return
        }

        // Horizontal — commit to drag
        hasDragged = true
        container.style.cursor = 'grabbing'
        trackElement.classList.add('looper-dragging')
      }

      // Prevent default only for actual drags (not clicks)
      e.preventDefault()

      // Track for velocity calculation
      velocityTracker.push({ x: currentX, time: currentTime })

      // Keep only recent movements
      while (velocityTracker.length > 0 && currentTime - velocityTracker[0].time > VELOCITY_WINDOW_MS) {
        velocityTracker.shift()
      }

      // Calculate drag delta and new position
      const deltaX = startX - currentX
      const newPosition = startPosition + deltaX

      // Update position motionValue
      // frame.render loop applies raw position to container
      if (shouldLoop) {
        // For looping, position grows freely - items wrap as groups
        position.set(newPosition)
      } else {
        // For non-looping, clamp position to maxScrollPosition (last item at right edge)
        const clampedPos = Math.max(0, Math.min(maxScrollPosition, newPosition))
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

      // Reset cursor and re-enable hover effects (only if we actually dragged)
      if (hasDragged) {
        container.style.cursor = 'grab'
        trackElement.classList.remove('looper-dragging')

        // Swallow the next click event so links don't navigate after a drag.
        // The browser fires click after pointerup — capture it before it reaches any <a>.
        container.addEventListener('click', swallowClick, { capture: true, once: true })
      }

      // If this was a click (not a drag):
      // - If we stopped a running animation, silently stop (like native iOS scroll tap-to-stop)
      //   then resume crawl after a delay so it doesn't feel jittery
      // - Otherwise, forward the click to the element under the pointer
      if (!hasDragged) {
        if (!stoppedAnimation) {
          const clickedElement = document.elementFromPoint(e.clientX, e.clientY)
          if (clickedElement) {
            clickedElement.click()
          }
        }
        if (stoppedAnimation && config.crawl) {
          clearTimeout(resumeTimeout)
          resumeTimeout = setTimeout(() => resumeCrawl(), 5000)
        }
        return
      }

      // Calculate velocity from pointermove samples only.
      // Do NOT use pointerup/pointercancel clientX — iOS Safari often reports 0
      // on pointercancel which corrupts velocity and direction calculations.
      let velocity = getVelocity()

      // Use last reliable pointermove position for direction check (not e.clientX
      // which may be 0 from a pointercancel event on iOS)
      const lastTrackedX = velocityTracker.length > 0
        ? velocityTracker[velocityTracker.length - 1].x
        : e.clientX
      const overallDelta = lastTrackedX - startX

      // Sanity check: velocity direction must match overall drag direction.
      if (overallDelta > 0 && velocity < 0) velocity = 0
      if (overallDelta < 0 && velocity > 0) velocity = 0

      // If snap is enabled, always use it (GSAP-style: snap modifies inertia target)
      // Otherwise use old logic: inertia if velocity, or resume crawl
      if (config.snap) {
        snapToNearest(velocity)
      } else if (Math.abs(velocity) > 1) {
        startInertia(velocity)
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
      // Note: This is ALWAYS opposite, regardless of reversed setting
      // (reversed only affects auto-crawl, not drag)
      // Apply velocity multiplier for tuning throw feel
      // Reduce inertia when reduced motion is preferred (H4)
      const velocityMultiplier = reducedMotion ? config.throwVelocityMultiplier * 0.3 : config.throwVelocityMultiplier
      const motionVelocity = -velocity * velocityMultiplier

      // Estimate target for Motion.js (it recomputes internally for type: 'inertia',
      // but we pass a reasonable target to avoid a zero-distance animation)
      const power = config.throwPower
      const estimatedDistance = power * motionVelocity
      const targetPos = currentPos + estimatedDistance

      // Animate position motionValue with inertia
      inertiaAnimation = animate(position, targetPos, {
        type: 'inertia',
        velocity: motionVelocity,
        power,
        timeConstant: config.throwResistance,
        restSpeed: 10,
        restDelta: 0.5,
        // For non-looping, add boundaries (last item at right edge)
        ...(shouldLoop
          ? {}
          : {
              min: 0,
              max: maxScrollPosition,
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
      if (!times || times.length === 0 || originalItemCount === 0) {
        return targetPos
      }

      // Find closest snap point by checking each original item at different cycle offsets
      let closestIndex = 0
      let closestSnapPos = 0
      let closestDist = Infinity

      // Calculate which cycle the target is in to determine which cycles to check
      const targetCycle = Math.floor(targetPos / originalItemsWidth)

      // Only iterate over original items
      for (let i = 0; i < originalItemCount; i++) {
        const snapTime = times[i]
        const baseSnapPos = snapTime * pixelsPerSecond

        // For looping, check this snap point at multiple cycle offsets relative to target
        if (shouldLoop) {
          // Check previous cycle, target cycle, and next cycle relative to where target is
          for (let cycleOffset = -1; cycleOffset <= 1; cycleOffset++) {
            const candidatePos = baseSnapPos + (targetCycle + cycleOffset) * originalItemsWidth
            const dist = Math.abs(candidatePos - targetPos)

            if (dist < closestDist) {
              closestDist = dist
              closestIndex = i
              closestSnapPos = candidatePos
            }
          }
        } else {
          // Non-looping: just use base position, clamped to maxScrollPosition
          const clampedSnapPos = Math.min(baseSnapPos, maxScrollPosition)
          const dist = Math.abs(clampedSnapPos - targetPos)
          if (dist < closestDist) {
            closestDist = dist
            closestIndex = i
            closestSnapPos = clampedSnapPos
          }
        }
      }

      // Update current index
      curIndex = closestIndex

      // Return the snap position closest to the inertia target
      // DO NOT normalize to current position - we want to preserve momentum
      // and allow the carousel to spin through multiple cycles for high-velocity throws
      return closestSnapPos
    }

    /**
     * Snap to nearest item with animation
     * Uses Motion's native inertia with modifyTarget for natural physics + snap
     * @param {number} velocity - Optional cursor velocity for inertia-based snapping
     */
    function snapToNearest(velocity = 0) {
      const currentPos = position.get()

      // Reduced motion: instant snap with short duration, no inertia (H4)
      if (reducedMotion) {
        const snapPos = findNearestSnapPoint(currentPos)
        const clampedPos = shouldLoop ? snapPos : Math.max(0, Math.min(snapPos, maxScrollPosition))
        snapAnimation = animate(position, clampedPos, {
          duration: 0.15,
          ease: 'easeOut',
        })
        snapAnimation
          .then(() => {
            snapAnimation = null
            updateIndexDisplay()
          })
          .catch(() => { snapAnimation = null })
        return
      }

      // Apply both velocity multipliers for snapped loopers
      const motionVelocity =
        -velocity * config.throwVelocityMultiplier * config.snapVelocityMultiplier

      // Calculate ideal inertia target (Motion will recalculate, but we need a non-zero animation)
      // This ensures Motion starts the inertia physics
      const idealTarget =
        currentPos + motionVelocity * config.throwPower * (config.throwResistance / 1000)

      // Use Motion's native inertia animation with modifyTarget
      // This gives us identical physics to non-snapped, but snaps to nearest item
      snapAnimation = animate(position, idealTarget, {
        type: 'inertia',
        velocity: motionVelocity,
        power: config.throwPower,
        timeConstant: config.throwResistance,
        modifyTarget: target => {
          const snapPos = findNearestSnapPoint(target)
          // For non-looping, clamp snap position to valid range
          if (!shouldLoop) {
            return Math.max(0, Math.min(snapPos, maxScrollPosition))
          }
          return snapPos
        },
        restSpeed: 10,
        restDelta: 0.5,
        // For non-looping, add boundaries to prevent overshooting
        ...(shouldLoop
          ? {}
          : {
              min: 0,
              max: maxScrollPosition,
              bounceStiffness: 300,
              bounceDamping: 30,
            }),
      })

      // Resume crawl after snap
      snapAnimation
        .then(() => {
          snapAnimation = null
          // Update display to reflect landed position
          updateIndexDisplay()
          if (config.crawl) {
            resumeCrawl()
          }
        })
        .catch(err => {
          snapAnimation = null
        })
    }

    /**
     * Resume crawl animation after drag/inertia
     * Reads current position and resumes infinite loop
     */
    function resumeCrawl() {
      if (!config.crawl || reducedMotion) return

      // Increment generation to invalidate any pending .then() callbacks (C7)
      const generation = ++resumeCrawlGeneration

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
      // Use proper modulo for negative positions (dragging right/backward)
      const cyclePos = ((currentPos % originalItemsWidth) + originalItemsWidth) % originalItemsWidth
      // For reversed carousels, remaining distance to complete cycle backward is cyclePos (C6)
      const remainingDist = config.reversed
        ? (cyclePos || originalItemsWidth)
        : (originalItemsWidth - cyclePos)
      const remainingDuration = remainingDist / pixelsPerSecond

      // Animate position to complete this cycle
      // Reversed: move backwards, Normal: move forward
      const targetPos = config.reversed ? currentPos - remainingDist : currentPos + remainingDist
      animation = animate(position, targetPos, {
        duration: remainingDuration,
        ease: 'linear',
      })

      // When cycle completes, restart infinite loop
      animation.then(() => {
        // Check generation to avoid stale .then() callbacks (C7)
        if (generation !== resumeCrawlGeneration) return

        // Capture current speed before replacing animation
        const currentSpeed = animation.speed

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

        // If speed ramp is still running, re-target it to continue ramping the new animation
        if (speedRampAnimation) {
          speedRampAnimation.stop()
          // Calculate remaining ramp duration based on current speed
          const rampProgress = (currentSpeed - MIN_CRAWL_SPEED) / (1 - MIN_CRAWL_SPEED)
          const remainingRampDuration = SPEED_RAMP_DURATION * (1 - rampProgress)

          speedRampAnimation = animate(
            animation,
            { speed: 1 },
            { duration: remainingRampDuration, ease: 'easeIn' }
          )
        }
      })

      // Start at nearly-stopped speed and ramp up to full speed
      // Use MIN_CRAWL_SPEED instead of 0 to keep animation running (speed = 0 completely pauses)
      animation.speed = MIN_CRAWL_SPEED
      speedRampAnimation = animate(animation, { speed: 1 }, { duration: SPEED_RAMP_DURATION, ease: 'easeIn' })
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
        container.removeEventListener('click', swallowClick, { capture: true })
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerup', onPointerUp)
        window.removeEventListener('pointercancel', onPointerUp)
      },
    }
  }

  /**
   * Setup hover slow-down effects using event delegation on container (H1/C1/C5)
   * Single listener pair on container covers all items including future clones
   */
  function setupHoverEffects() {
    if (!config.crawl || !animation) return

    // Speed is always positive - direction is baked into animation
    const targetSpeed = 1
    const hoverSpeed = config.ease.mouseOver.speed

    // Track hover animations to prevent accumulation
    let hoverAnimation = null

    function onMouseEnter(e) {
      if (!animation) return
      if (!e.target.closest('[data-looper-item]')) return

      if (hoverAnimation) {
        hoverAnimation.stop()
      }

      hoverAnimation = animate(
        animation,
        { speed: hoverSpeed },
        { duration: config.ease.mouseOver.duration, ease: 'easeOut' }
      )
    }

    function onMouseLeave(e) {
      if (!animation) return
      if (!e.target.closest('[data-looper-item]')) return

      if (hoverAnimation) {
        hoverAnimation.stop()
      }

      hoverAnimation = animate(
        animation,
        { speed: targetSpeed },
        { duration: config.ease.mouseOut.duration, ease: 'easeOut' }
      )
    }

    container.addEventListener('mouseenter', onMouseEnter, true)
    container.addEventListener('mouseleave', onMouseLeave, true)

    // Return cleanup function (C1/C9)
    hoverCleanup = () => {
      if (hoverAnimation) {
        hoverAnimation.stop()
        hoverAnimation = null
      }
      container.removeEventListener('mouseenter', onMouseEnter, true)
      container.removeEventListener('mouseleave', onMouseLeave, true)
    }
  }

  /**
   * Find closest index based on current position
   * @param {boolean} setCurrent - Whether to update curIndex
   * @returns {number} Closest item index
   */
  function closestIndex(setCurrent = false) {
    if (!times || times.length === 0) return 0

    // If curIndex was set by toIndex (nav button), trust it.
    // Position-based lookup fails when maxScrollPosition clamps positions
    // too close together to distinguish items.
    if (indexSetByNav) return curIndex

    // Use bounded position to find what's actually visible
    const currentPos = position.get()

    // For looping, use bounded position; for non-looping, use direct position
    let currentTime
    if (shouldLoop) {
      const boundedCurrentPos =
        ((currentPos % originalItemsWidth) + originalItemsWidth) % originalItemsWidth
      currentTime = boundedCurrentPos / pixelsPerSecond
    } else {
      currentTime = currentPos / pixelsPerSecond
    }

    let closest = 0
    let closestDist = Infinity
    const duration = shouldLoop ? originalItemsWidth / pixelsPerSecond : 0

    // Only check original items, not clones
    for (let i = 0; i < originalItemCount; i++) {
      const time = times[i]
      const dist = shouldLoop
        ? Math.abs(symmetricMod(time - currentTime, duration))
        : Math.abs(time - currentTime)

      if (dist < closestDist) {
        closestDist = dist
        closest = i
      }
    }

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
      // IMPORTANT: Use originalItemCount, not items.length (which includes clones)
      const length = originalItemCount
      if (Math.abs(index - curIndex) > length / 2) {
        targetIndex = index + (index > curIndex ? -length : length)
      }
      targetIndex = ((targetIndex % length) + length) % length
    } else {
      // Clamp to valid indices for non-looping (use originalItemCount, not items.length)
      targetIndex = Math.max(0, Math.min(index, originalItemCount - 1))
    }

    // Get target position
    const targetTime = times[targetIndex]
    let targetPos = targetTime * pixelsPerSecond

    // For looping, normalize target to be close to current position
    // This ensures we take the shortest path and don't cross boundaries unnecessarily
    if (shouldLoop) {
      const currentPos = position.get()

      // Find which cycle the current position is in
      // This handles cases where position has drifted to -4800 or +9600 etc.
      const currentCycle = Math.floor(currentPos / originalItemsWidth)

      let minDist = Infinity
      let bestCandidate = targetPos

      // Check cycles around the current cycle (not around cycle 0)
      for (let offset = -1; offset <= 1; offset++) {
        const candidate = targetPos + (currentCycle + offset) * originalItemsWidth
        const dist = Math.abs(candidate - currentPos)
        if (dist < minDist) {
          minDist = dist
          bestCandidate = candidate
        }
      }

      targetPos = bestCandidate
    } else {
      // For non-looping, clamp target position to valid range [0, maxScrollPosition]
      // This ensures first item stays at left edge and last item at right edge
      targetPos = Math.max(0, Math.min(targetPos, maxScrollPosition))
    }

    // Update current index
    curIndex = targetIndex
    indexSetByNav = true

    // Update display immediately
    updateIndexDisplay()

    // Animate to target
    const duration = vars.duration !== undefined ? vars.duration : 0.85
    const ease = vars.ease || 'easeInOut'

    // Track navigation animation to prevent sync interference
    navAnimation = animate(position, targetPos, {
      duration,
      ease,
    })

    // Clear navAnimation when done
    navAnimation
      .then(() => {
        navAnimation = null
      })
      .catch(() => {
        navAnimation = null
      })

    return navAnimation
  }

  /**
   * Public API
   */
  let autoplayTimer = null

  const loopController = {
    position,
    get animation() { return animation },
    items,
    get times() { return times },
    isReversed: config.reversed,
    isLooping: shouldLoop,

    play() {
      if (!shouldLoop && config.crawl && startPingPongCrawl) {
        // Non-looping: start ping-pong crawl
        const currentPos = position.get()
        // Determine direction based on current position
        const goForward = currentPos < maxScrollPosition / 2
        startPingPongCrawl(goForward)
      } else if (animation) {
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

    stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
      }
    },

    startAutoplay(seconds) {
      this.stopAutoplay()
      const interval = Math.abs(seconds) * 1000
      const direction = seconds > 0 ? 'next' : 'previous'
      autoplayTimer = setInterval(() => {
        if (direction === 'next') {
          this.next(null, { autoplay: true })
        } else {
          this.previous(null, { autoplay: true })
        }
      }, interval)
    },

    next(vars, options = {}) {
      // Stop autoplay on user interaction (unless this IS autoplay)
      if (!options.autoplay) {
        this.stopAutoplay()
      }
      // Sync curIndex with current scroll position before navigating
      closestIndex(true)
      let nextIndex = curIndex + 1

      // Non-looping: clamp at boundaries
      if (!shouldLoop) {
        const currentPos = position.get()
        const atEnd = currentPos >= maxScrollPosition - 1

        if (nextIndex >= originalItemCount || atEnd) {
          // Autoplay resets to start, user navigation clamps
          if (options.autoplay) {
            nextIndex = 0
          } else {
            return // Clamp - do nothing at boundary
          }
        }
      }

      return toIndex(nextIndex, vars)
    },

    previous(vars, options = {}) {
      // Stop autoplay on user interaction (unless this IS autoplay)
      if (!options.autoplay) {
        this.stopAutoplay()
      }
      // Sync curIndex with current scroll position before navigating
      closestIndex(true)
      let prevIndex = curIndex - 1

      // Non-looping: clamp at boundaries
      if (!shouldLoop && prevIndex < 0) {
        // Autoplay resets to end, user navigation clamps
        if (options.autoplay) {
          prevIndex = originalItemCount - 1
        } else {
          return // Clamp - do nothing at boundary
        }
      }

      return toIndex(prevIndex, vars)
    },

    toIndex(index, vars) {
      return toIndex(index, vars)
    },

    refresh(deep) {
      return refresh(deep)
    },

    destroy() {
      // Stop autoplay
      this.stopAutoplay()

      // Stop all animations (C9)
      if (animation) {
        animation.stop()
        animation = null
      }
      if (speedRampAnimation) {
        speedRampAnimation.stop()
        speedRampAnimation = null
      }
      if (inertiaAnimation) {
        inertiaAnimation.stop()
        inertiaAnimation = null
      }
      if (snapAnimation) {
        snapAnimation.stop()
        snapAnimation = null
      }
      if (navAnimation) {
        navAnimation.stop()
        navAnimation = null
      }

      // Clear pending timeouts (C4)
      if (pingPongTimeout) {
        clearTimeout(pingPongTimeout)
        pingPongTimeout = null
      }

      // Cleanup hover effects (C1/C9)
      if (hoverCleanup) {
        hoverCleanup()
        hoverCleanup = null
      }

      // Stop frame.render loop
      stopRenderLoop()

      // Cleanup position listeners (C3)
      if (positionUnsubscribe) {
        positionUnsubscribe()
        positionUnsubscribe = null
      }
      if (indexUnsubscribe) {
        indexUnsubscribe()
        indexUnsubscribe = null
      }

      // Cleanup drag
      if (dragState && dragState.cleanup) {
        dragState.cleanup()
      }

      // Cleanup resize listener
      window.removeEventListener('APPLICATION:RESIZE', handleResize)

      // Remove clone elements from DOM (C10)
      const clones = trackElement.querySelectorAll('[data-looper-clone]')
      clones.forEach(clone => clone.remove())

      // Clear inline styles on track element (C10)
      trackElement.style.willChange = ''
      trackElement.style.transform = ''

      // Clear inline styles on container
      container.style.touchAction = ''
      container.style.cursor = ''

      // Clear item wrap transforms
      items.forEach(item => {
        item.style.transform = ''
      })

      // Destroy position value
      position.destroy()
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
    this.looperElements = Dom.all(this.opts.selector)
    this.looperElements.forEach((element, idx) => {
      const items = Dom.all(element, '[data-panner-item], [data-looper-item]')

      if (!items.length) {
        return
      }

      // Find the wrapper element (with opacity: 0)
      const wrapper =
        Dom.find(element, '[data-looper-container]') || Dom.find(element, '.looper-wrapper')

      if (!wrapper) {
        console.error(
          '[Looper] No wrapper element found (expected [data-looper-container] or .looper-wrapper)'
        )
      }

      const speed = ['mobile', 'iphone'].includes(this.app.breakpoint)
        ? this.opts.speed.sm
        : this.opts.speed.lg

      // Parse data attributes with support for explicit "false" values
      const looperEl = element.querySelector('[data-looper]')

      // Snap: data-looper-snap or data-looper-snap="false"
      const hasSnapAttr = looperEl?.hasAttribute('data-looper-snap')
      const snapValue = looperEl?.getAttribute('data-looper-snap')
      const shouldSnap = snapValue === 'false' ? false : this.opts.snap || hasSnapAttr

      // Crawl: data-looper-crawl or data-looper-crawl="false"
      const hasCrawlAttr = looperEl?.hasAttribute('data-looper-crawl')
      const crawlValue = looperEl?.getAttribute('data-looper-crawl')
      const shouldCrawl = crawlValue === 'false' ? false : hasCrawlAttr || this.opts.crawl

      // Reverse: data-looper-reverse or data-looper-reverse="false"
      const hasReverseAttr = looperEl?.hasAttribute('data-looper-reverse')
      const reverseValue = looperEl?.getAttribute('data-looper-reverse')
      const isReverse = reverseValue === 'false' ? false : hasReverseAttr

      // Autoplay: data-looper-autoplay="5" (seconds, negative for previous)
      const autoplayValue = looperEl?.getAttribute('data-looper-autoplay')
      const autoplayInterval = autoplayValue ? parseFloat(autoplayValue) : null

      // Loop: data-looper-loop or data-looper-loop="false"
      const hasLoopAttr = looperEl?.hasAttribute('data-looper-loop')
      const loopValue = looperEl?.getAttribute('data-looper-loop')
      const shouldLoop = loopValue === 'false' ? false : this.opts.loop

      // End alignment: data-looper-end-alignment="right" or "start"
      const endAlignmentValue = looperEl?.getAttribute('data-looper-end-alignment')
      const endAlignment = endAlignmentValue || this.opts.endAlignment

      // Center: data-looper-center or data-looper-center="false"
      const hasCenterAttr = looperEl?.hasAttribute('data-looper-center')
      const centerValue = looperEl?.getAttribute('data-looper-center')
      const shouldCenterSlide = centerValue === 'false' ? false : hasCenterAttr

      // Peek: data-looper-peek or data-looper-peek="false"
      // Centers viewport on the gap between two items (half | full | full | half)
      const hasPeekAttr = looperEl?.hasAttribute('data-looper-peek')
      const peekValue = looperEl?.getAttribute('data-looper-peek')
      const shouldPeek = peekValue === 'false' ? false : hasPeekAttr || this.opts.peek

      // Create stub for Moonwalk compatibility
      const stubLoop = {
        play: () => {},
        pause: () => {},
        isReversed: isReverse,
      }

      element.$loop = stubLoop

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
          centerSlide: shouldCenterSlide || shouldPeek,
          peek: shouldPeek,
          snap: shouldSnap,
          speed,
          reversed: isReverse,
          loop: shouldLoop,
          crawl: shouldCrawl,
          autoplayInterval,
          endAlignment,
          ease: this.opts.ease,
          throwResistance: this.opts.throwResistance,
          throwPower: this.opts.throwPower,
          throwVelocityMultiplier: this.opts.throwVelocityMultiplier,
          snapVelocityMultiplier: this.opts.snapVelocityMultiplier,
          snapDuration: this.opts.snapDuration,
          snapBounce: this.opts.snapBounce,
          minimumMovement: this.opts.minimumMovement,
          touchMinimumMovement: this.opts.touchMinimumMovement,
        },
      })
    })

    // Register callback for when layout is ready
    this.app.registerCallback('APPLICATION:REVEALED', () => {
      this.finalizeLoopers()
    })
  }

  finalizeLoopers() {
    this.pendingLoopers.forEach(({ element, wrapper, items, config }, idx) => {
      // Pass wrapper to config for display element lookup
      config.wrapper = wrapper

      // Create the real loop
      const loop = horizontalLoop(this.app, items, config)

      // Start playing if crawl enabled
      if (config.crawl) {
        loop.play()
      }

      // Start autoplay if configured
      if (config.autoplayInterval && !isNaN(config.autoplayInterval)) {
        loop.startAutoplay(config.autoplayInterval)
      }

      // Replace stub with real loop
      element.$loop = loop

      // Setup navigation buttons if present (C2 - store refs for cleanup)
      const next = Dom.find(element, '[data-panner-next]')
      const previous = Dom.find(element, '[data-panner-previous]')
      const navCleanups = []

      if (next) {
        const onNext = () => loop.next({ duration: 0.85, ease: 'easeInOut' })
        next.addEventListener('click', onNext)
        navCleanups.push(() => next.removeEventListener('click', onNext))
      }

      if (previous) {
        const onPrev = () => loop.previous({ duration: 0.85, ease: 'easeInOut' })
        previous.addEventListener('click', onPrev)
        navCleanups.push(() => previous.removeEventListener('click', onPrev))
      }

      // Store nav cleanup on the loop controller
      loop._navCleanups = navCleanups

      // Reveal lazyload images: immediately reveal off-screen items (no visible transition),
      // defer reveal of viewport items until after wrapper fade-in for a nice per-image fade
      if (this.opts.onReveal) {
        // Custom reveal callback — caller handles animation and lazyload
        if (this.app?.lazyload && wrapper) {
          const pictures = Dom.all(wrapper, '[data-ll-srcset]')
          pictures.forEach(picture => this.app.lazyload.revealPicture(picture))
        }
        this.opts.onReveal(wrapper, loop)
      } else if (this.app?.lazyload && wrapper) {
        const wrapperRect = wrapper.getBoundingClientRect()
        const pictures = Dom.all(wrapper, '[data-ll-srcset]')
        const viewportPictures = []

        pictures.forEach(picture => {
          const rect = picture.getBoundingClientRect()
          const inViewport = rect.right > wrapperRect.left && rect.left < wrapperRect.right
          if (inViewport) {
            viewportPictures.push(picture)
          } else {
            this.app.lazyload.revealPicture(picture)
          }
        })

        // Fade in the WRAPPER (not the outer element!)
        animate(wrapper, { opacity: 1 }, { duration: 0.5, delay: 0.5, ease: 'easeOut' })
          .then(() => {
            viewportPictures.forEach(picture => this.app.lazyload.revealPicture(picture))
          })
      } else if (wrapper) {
        animate(wrapper, { opacity: 1 }, { duration: 0.5, delay: 0.5, ease: 'easeOut' })
      }

      this.loopers.push(loop)
    })

    // Clear pending
    this.pendingLoopers = []
  }

  destroy() {
    this.loopers.forEach(loop => {
      // Clean up navigation button listeners (C2)
      if (loop._navCleanups) {
        loop._navCleanups.forEach(fn => fn())
        loop._navCleanups = null
      }
      loop.destroy()
    })
    this.loopers = []
    this.pendingLoopers = []
  }
}
