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
  endAlignment: 'right', // For non-looping: 'right' = last item at viewport right edge, 'start' = last item at viewport left edge
  minimumMovement: 3, // Pixels - movement below this is treated as click, above as drag

  // Inertia/throw configuration (when dragging and releasing)
  throwResistance: 325, // Time constant for deceleration (lower = more resistance/faster stop, higher = less resistance/longer glide)
  throwPower: 0.8, // Deceleration curve (0-1, higher = more gradual slowdown)
  throwVelocityMultiplier: 1.0, // Scale velocity for all throws (0.5 = half speed, 2.0 = double)
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
  let position = motionValue(0) // Source of truth for position
  let boundedPos = motionValue(0) // Bounded position (0 to originalItemsWidth)
  let lastBoundedValue = 0 // Track last value to detect wraps
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

  // Drag state and cleanup handlers
  let dragState = {}
  let speedRampAnimation = null // Track speed ramp animation
  let inertiaAnimation = null // Track inertia animation
  let snapAnimation = null // Track snap animation
  let navAnimation = null // Track navigation animation (next/previous/toIndex)
  let positionUnsubscribe = null // Track position listener for cleanup
  let renderUnsubscribe = null // Track frame.render loop for cleanup

  // Scroll direction tracking for wrap logic
  let scrollDirection = 0 // -1 = backward, 0 = neutral, 1 = forward
  let lastPositionForDirection = 0

  // Display elements for index/count
  let indexElements = []
  let countElements = []

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
    const minRequiredWidth = containerWidth * 2.5 + maxItemWidth

    // Store original count to prevent exponential growth
    const originalItemCount = items.length
    const maxReplications = 10
    let count = 0
    let previousTotalWidth = totalWidth

    // Always create at least one set of clones - the wrapping logic depends on clones existing
    // Then continue until we have enough width for seamless looping
    while ((count === 0 || totalWidth < minRequiredWidth) && count < maxReplications) {
      // Clone ONLY original items
      for (let i = 0; i < originalItemCount; i++) {
        const clone = items[i].cloneNode(true)
        clone.setAttribute('data-looper-clone', 'true')
        container.appendChild(clone)
        items.push(clone)

        // Register cloned lazyload elements with Lazyload module if available
        if (app?.lazyload?.observe) {
          // Clear data-ll-idx from unloaded [data-ll-image] images
          clone.querySelectorAll('[data-ll-image]:not([data-ll-loaded])').forEach(img => {
            img.removeAttribute('data-ll-idx')
          })

          // Clear attributes from unloaded [data-ll-srcset] pictures so they can be re-observed
          clone.querySelectorAll('[data-ll-srcset]:not([data-ll-srcset-ready])').forEach(picture => {
            picture.removeAttribute('data-ll-srcset-initialized')
            // Clear ready state from sources and img so they can be re-processed
            picture.querySelectorAll('source').forEach(source => {
              source.removeAttribute('data-ll-ready')
            })
            picture.querySelectorAll('img').forEach(img => {
              img.removeAttribute('data-ll-idx')
              img.removeAttribute('data-ll-loaded')
              img.removeAttribute('data-ll-ready')
            })
          })

          app.lazyload.observe(clone)
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

        // Calculate xPercent based on current transform (expensive, only for originals)
        const computedStyle = window.getComputedStyle(el)
        const transform = computedStyle.transform
        let currentX = 0

        if (transform && transform !== 'none') {
          const matrix = new DOMMatrix(transform)
          currentX = matrix.m41
        }

        xPercents[i] = (currentX / widths[i]) * 100
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
      if (config.centerSlide) {
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
   * Calculate time positions for snapping
   * These represent when each item hits the "start" position
   */
  function populateSnapTimes() {
    if (!shouldLoop) {
      // For non-looping, calculate based on actual item positions (pixels)
      // This ensures snap and navigation work correctly
      items.forEach((item, i) => {
        const curX = (xPercents[i] / 100) * widths[i]
        let snapPos

        if (config.centerSlide) {
          // Center mode: item's center at viewport's center
          const itemCenter = item.offsetLeft + curX + widths[i] / 2 - startX
          const viewportCenter = containerWidth / 2
          snapPos = itemCenter - viewportCenter
        } else {
          // Normal mode: item's left edge at viewport's left edge
          snapPos = item.offsetLeft + curX - startX
        }

        times[i] = snapPos / pixelsPerSecond
      })
      return
    }

    // For looping, calculate based on item positions including gaps
    items.forEach((item, i) => {
      const curX = (xPercents[i] / 100) * widths[i]
      let snapPos

      if (config.centerSlide) {
        // Center mode: item's center at viewport's center
        const itemCenter = item.offsetLeft + curX + widths[i] / 2 - startX
        const viewportCenter = containerWidth / 2
        snapPos = itemCenter - viewportCenter
      } else {
        // Normal mode: item's left edge at viewport's left edge
        snapPos = item.offsetLeft + curX - startX
      }

      times[i] = snapPos / pixelsPerSecond
    })

    // Adjust for container padding if present
    const itemsContainer = items[0].parentNode
    const containerPaddingLeft = parseFloat(getComputedStyle(itemsContainer).paddingLeft) || 0

    if (containerPaddingLeft > 0) {
      const paddingTime = containerPaddingLeft / pixelsPerSecond
      times = times.map(time => time - paddingTime)
    }
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
      // Skip clones - they stay in natural flow! (use cached value for performance)
      if (isCloneCache[i]) {
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
        // Item exited LEFT edge - only wrap during forward scroll
        // During reverse scroll (scrollDirection < 0), items off-screen left
        // will naturally scroll back into view - don't wrap them
        const isForwardScroll = scrollDirection >= 0
        newOffset = (isForwardScroll && boundedPos < originalItemsWidth / 2) ? wrapOffset : 0
      } else if (itemLeft > containerWidth + containerWidth * 0.5) {
        // Item exited RIGHT edge
        // This shouldn't happen much, but handle it
        newOffset = 0
      } else {
        // Keep current offset
        newOffset = itemWrapOffsets[i]
      }

      // ONLY update transform if the offset has changed!
      if (newOffset !== itemWrapOffsets[i]) {
        item.style.transform = newOffset !== 0 ? `translateX(${newOffset}px)` : 'none'
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
   * Initialize the loop animation
   */
  function init() {
    // Store original item count BEFORE replication
    originalItemCount = items.length

    // Replicate items if needed
    replicateItemsIfNeeded()

    // Cache which items are clones (avoid hasAttribute checks in hot paths)
    isCloneCache = items.map((item, i) => i >= originalItemCount)

    // Measure everything
    populateWidths()
    populateSnapTimes()

    // Set initial container position
    const containerElement = items[0].parentElement
    containerElement.style.willChange = 'transform'
    containerElement.style.transform = 'translateX(0px)'

    // Set up RAF loop to check item positions for wrapping
    // Frame.render loop to apply bounded position to DOM
    // This is Motion's optimized render loop - prevents layout thrashing
    function startRenderLoop() {
      if (renderUnsubscribe) return // Already running

      const containerElement = items[0].parentElement

      // Set up boundedPos motionValue to automatically sync with position
      // This calculates the bounded position (0 to originalItemsWidth)
      const positionUnsubscribe = position.on('change', latest => {
        // Track scroll direction for wrap logic
        const delta = latest - lastPositionForDirection
        if (Math.abs(delta) > 1) {
          scrollDirection = delta > 0 ? 1 : -1
        }
        lastPositionForDirection = latest

        const bounded = ((latest % originalItemsWidth) + originalItemsWidth) % originalItemsWidth
        boundedPos.set(bounded)
      })

      // Detect when boundedPos wraps (makes large jump) and reset all items
      // This prevents stuck items during fast drags in either direction
      const boundedPosUnsubscribe = boundedPos.on('change', latest => {
        const delta = Math.abs(latest - lastBoundedValue)

        // If boundedPos jumped by more than 40% of the width, it wrapped
        // Using 40% instead of 50% to catch edge cases
        const didWrap = delta > originalItemsWidth * 0.4

        if (didWrap) {
          const direction =
            latest > lastBoundedValue ? 'backward (drag right)' : 'forward (drag left)'

          // Count how many items have non-zero offset before reset
          const itemsWithOffset = items.filter(
            (item, i) => !isCloneCache[i] && itemWrapOffsets[i] !== 0
          ).length

          // Reset ALL original items to 0 (both positive and negative offsets)
          items.forEach((item, i) => {
            if (!isCloneCache[i] && itemWrapOffsets[i] !== 0) {
              item.style.transform = 'none'
              itemWrapOffsets[i] = 0
            }
          })

          // CRITICAL: Sync unbounded position with bounded position to prevent
          // inertia calculation bugs when dragging RIGHT across boundaries
          // BUT only do this when NOT animating snap or nav, otherwise it interferes
          if (!snapAnimation && !navAnimation) {
            position.set(latest)
          } else {
          }
        }

        lastBoundedValue = latest
      })

      renderUnsubscribe = frame.render(() => {
        // Read bounded position from motionValue
        const currentBoundedPos = boundedPos.get()

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
    } else {
      // Non-looping: simple position listener to update container transform
      const containerElement = items[0].parentElement
      positionUnsubscribe = position.on('change', latest => {
        containerElement.style.transform = `translateX(${-latest}px)`
      })
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

      // Create initial animation (paused)
      animation = startLoopAnimation()
      animation.pause()
    } else if (!shouldLoop && config.crawl) {
      // Non-looping: ping-pong animation (crawl to end, reverse to start)
      // Use maxScrollPosition (last item at right edge) instead of totalWidth
      const duration = maxScrollPosition / pixelsPerSecond

      // Create a ping-pong crawl animation
      function startPingPongCrawl(fromStart = true) {
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
          setTimeout(() => {
            if (animation && animation.speed !== 0) {
              startPingPongCrawl(!fromStart)
            }
          }, 200) // Slightly longer pause for smooth reversal
        })
      }

      // Store the ping-pong starter for later use
      config.startPingPongCrawl = startPingPongCrawl

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

    // Setup hover effects
    setupHoverEffects()

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
          // Find closest slide to current bounded position
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

        // For looping, use boundedPos; for non-looping, use position directly
        if (shouldLoop) {
          boundedPos.on('change', updateIndexOnChange)
        } else {
          position.on('change', updateIndexOnChange)
        }
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
    let isDragging = false
    let startX = 0
    let startPosition = 0
    let velocityTracker = [] // Track recent movements for velocity calculation
    let hasDragged = false // Did movement exceed minimumMovement threshold?
    let totalMovement = 0 // Total pixels moved (for click vs drag detection)

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
      hasDragged = false // Reset - will be set true if movement exceeds threshold
      totalMovement = 0

      // Stop autoplay on user interaction
      if (loopController && loopController.stopAutoplay) {
        loopController.stopAutoplay()
      }

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

      // Prevent default to stop native drag behavior on links/images
      // We'll manually trigger click in onPointerUp if it wasn't a real drag
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

      const currentX = e.clientX
      const currentTime = Date.now()

      // Track total movement for click vs drag detection
      const movementDelta = Math.abs(currentX - startX)

      // Check if this is now a real drag (exceeded minimum movement threshold)
      if (!hasDragged && movementDelta > config.minimumMovement) {
        hasDragged = true
        // Now that we know it's a drag, change cursor and disable pointer events on items
        container.style.cursor = 'grabbing'
        items.forEach(item => {
          item.style.pointerEvents = 'none'
        })
      }

      // Only update position if we've confirmed this is a drag
      if (!hasDragged) return

      // Prevent default only for actual drags (not clicks)
      e.preventDefault()

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
        // For non-looping, clamp position to maxScrollPosition (last item at right edge)
        const clampedPos = Math.max(0, Math.min(maxScrollPosition, newPosition))
        position.set(clampedPos)
      }
    }

    /**
     * Calculate where inertia would land based on velocity
     * Uses same physics as startInertia to predict landing position
     * Motion.js inertia formula: distance = velocity * timeConstant * (power / (1 - power))
     * @param {number} velocity - Cursor velocity in pixels per second
     * @returns {number} Predicted landing position
     */
    function calculateInertiaTarget(velocity) {
      const currentPos = position.get()
      const motionVelocity = -velocity
      const power = config.throwPower
      const timeConstant = config.throwResistance / 1000
      // Motion.js inertia distance formula
      const estimatedDistance = motionVelocity * timeConstant * (power / (1 - power))
      return currentPos + estimatedDistance
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
        items.forEach(item => {
          item.style.pointerEvents = ''
        })
      }

      // If this was a click (not a drag), trigger click on the element
      if (!hasDragged) {
        // Find the element under the pointer and trigger a click
        const clickedElement = document.elementFromPoint(e.clientX, e.clientY)
        if (clickedElement) {
          clickedElement.click()
        }
        return
      }

      // Calculate final velocity
      const velocity = getVelocity()

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
      const motionVelocity = -velocity * config.throwVelocityMultiplier

      // Calculate estimated target based on inertia physics
      const power = config.throwPower
      const timeConstant = config.throwResistance / 1000 // Convert to seconds
      const estimatedDistance = motionVelocity * timeConstant * 0.5
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
          if (config.crawl && animation) {
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
      // Use proper modulo for negative positions (dragging right/backward)
      const cyclePos = ((currentPos % originalItemsWidth) + originalItemsWidth) % originalItemsWidth
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
      animation.then(() => {
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
          // speed goes from 0.001 to 1.0, so progress = (currentSpeed - 0.001) / (1.0 - 0.001)
          const rampProgress = (currentSpeed - 0.001) / 0.999
          const remainingRampDuration = 2 * (1 - rampProgress)

          speedRampAnimation = animate(
            animation,
            { speed: 1 },
            { duration: remainingRampDuration, ease: 'easeIn' }
          )
        }
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

    // Only check original items, not clones
    for (let i = 0; i < originalItemCount; i++) {
      const time = times[i]
      let dist = Math.abs(time - currentTime)

      // For looping, check wrapped distance
      if (shouldLoop) {
        const duration = originalItemsWidth / pixelsPerSecond
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
    animation,
    items,
    times,
    isReversed: config.reversed,
    isLooping: shouldLoop,

    play() {
      if (!shouldLoop && config.crawl && config.startPingPongCrawl) {
        // Non-looping: start ping-pong crawl
        const currentPos = position.get()
        // Determine direction based on current position
        const goForward = currentPos < maxScrollPosition / 2
        config.startPingPongCrawl(goForward)
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

      // Non-looping: reset to start when reaching the end
      if (!shouldLoop) {
        const currentPos = position.get()
        const atEnd = currentPos >= maxScrollPosition - 1

        if (nextIndex >= originalItemCount || atEnd) {
          nextIndex = 0
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

      // Non-looping: reset to end when at the start
      if (!shouldLoop && prevIndex < 0) {
        prevIndex = originalItemCount - 1
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

      // Stop animation
      if (animation) {
        animation.stop()
      }

      // Stop frame.render loop
      stopRenderLoop()

      // Cleanup position listener
      if (positionUnsubscribe) {
        positionUnsubscribe()
      }

      // Cleanup drag
      if (dragState && dragState.cleanup) {
        dragState.cleanup()
      }

      // Cleanup resize listener
      window.removeEventListener('APPLICATION:RESIZE', handleResize)

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
          '[Looper] ⚠️ No wrapper element found (expected [data-looper-container] or .looper-wrapper)'
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
          centerSlide: shouldCenterSlide,
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

      // Setup navigation buttons if present
      const next = Dom.find(element, '[data-panner-next]')
      const previous = Dom.find(element, '[data-panner-previous]')

      if (next) {
        next.addEventListener('click', () => {
          loop.next({ duration: 0.85, ease: 'easeInOut' })
        })
      }

      if (previous) {
        previous.addEventListener('click', () => {
          loop.previous({ duration: 0.85, ease: 'easeInOut' })
        })
      }

      // Fade in the WRAPPER (not the outer element!)
      if (wrapper) {
        animate(wrapper, { opacity: 1 }, { duration: 0.5, delay: 0.5, ease: 'easeOut' })
      }

      this.loopers.push(loop)
    })

    // Clear pending
    this.pendingLoopers = []
  }

  destroy() {
    this.loopers.forEach(loop => loop.destroy())
    this.loopers = []
    this.pendingLoopers = []
  }
}
