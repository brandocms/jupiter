import animateStyles from '../../utils/animateStyles'
import applyDefaults from '../../utils/applyDefaults'
import * as Events from '../../events'

const DEFAULT_OPTIONS = {
  clickToggle: false,
  allowMultiple: false,
  followTrigger: false,
  followSpeed: 0.3,
  onShow: null,
}

// Static array to track active popovers
const activePopovers = []

export default class Popover {
  constructor(app, trigger, opts = {}) {
    this.app = app
    this.opts = applyDefaults(opts, DEFAULT_OPTIONS)

    this.trigger = trigger
    this.position = this.trigger.getAttribute('data-popover-position') || 'top'
    this.className = 'popover'
    this.orderedPositions = ['top', 'right', 'bottom', 'left']
    this.currentPosition = this.position

    const popoverTemplate = document.querySelector(
      `[data-popover-template=${trigger.dataset.popoverTarget}]`
    )

    if (!popoverTemplate) {
      console.warn(`Popover template not found for trigger: ${trigger.dataset.popoverTarget}`)
      return
    }

    this.popover = document.createElement('div')
    this.popover.innerHTML = popoverTemplate.innerHTML

    Object.assign(this.popover.style, {
      position: 'fixed',
    })

    // Add base popover class
    this.popover.classList.add(this.className)

    // Add any classes from the template element
    if (popoverTemplate.classList && popoverTemplate.classList.length > 0) {
      popoverTemplate.classList.forEach(className => {
        if (className !== 'popover-template') {
          this.popover.classList.add(className)
        }
      })
    }

    // Bind handlers
    this.boundHandleDocumentClick = this.handleDocumentClick.bind(this)
    this.boundHandleScroll = this.handleScroll.bind(this)

    if (!app.featureTests.results.touch) {
      if (this.opts.clickToggle) {
        this.trigger.addEventListener('click', this.handleClick.bind(this))
      } else {
        this.trigger.addEventListener('mouseenter', this.handleMouseEnter.bind(this))
        this.trigger.addEventListener('mouseleave', this.handleMouseLeave.bind(this))
      }
    } else {
      this.trigger.addEventListener('touchstart', this.handleTouchStart.bind(this))
    }
  }

  handleMouseEnter(e) {
    this.show()
  }

  handleMouseLeave(e) {
    this.hide()
  }

  handleTouchStart(e) {
    this.toggle()
  }

  handleClick(e) {
    e.stopPropagation()
    this.toggle()
  }

  get isVisible() {
    return document.body.contains(this.popover)
  }

  show() {
    // Close other popovers if not allowing multiple
    if (!this.opts.allowMultiple) {
      this.closeAllExcept(this)
    }

    document.body.appendChild(this.popover)

    // Add to active popovers list
    if (!activePopovers.includes(this)) {
      activePopovers.push(this)
    }

    // Calculate initial position
    this.updatePosition(false)

    // Setup document click handler for click outside closing
    if (this.opts.clickToggle) {
      this.addDocumentClickHandler()
    }

    // Setup scroll handler if followTrigger is enabled
    if (this.opts.followTrigger) {
      // Use requestAnimationFrame to ensure the popover is fully rendered
      requestAnimationFrame(() => {
        if (this.isVisible) this.addScrollListener()
      })
    }

    // Call onShow callback if provided
    if (typeof this.opts.onShow === 'function') {
      requestAnimationFrame(() => {
        this.opts.onShow(this)
      })
    }
  }

  // Update popover position based on trigger position
  updatePosition(shouldAnimate = true) {
    const {
      top: triggerTop,
      left: triggerLeft,
      width: triggerWidth,
      height: triggerHeight,
    } = this.trigger.getBoundingClientRect()
    const { offsetHeight: popoverHeight, offsetWidth: popoverWidth } = this.popover

    const positionIndex = this.orderedPositions.indexOf(this.position)

    const positions = {
      top: {
        name: 'top',
        top: triggerTop - popoverHeight,
        left: triggerLeft - (popoverWidth - triggerWidth) / 2,
      },
      right: {
        name: 'right',
        top: triggerTop - (popoverHeight - triggerHeight) / 2,
        left: triggerLeft + triggerWidth,
      },
      bottom: {
        name: 'bottom',
        top: triggerTop + triggerHeight,
        left: triggerLeft - (popoverWidth - triggerWidth) / 2,
      },
      left: {
        name: 'left',
        top: triggerTop - (popoverHeight - triggerHeight) / 2,
        left: triggerLeft - popoverWidth,
      },
    }

    // Try to find a position that keeps the popover in viewport
    const position = this.orderedPositions
      .slice(positionIndex)
      .concat(this.orderedPositions.slice(0, positionIndex))
      .map(pos => positions[pos])
      .find(pos => pos.left >= 0 && pos.top >= 0 &&
        pos.left + popoverWidth <= window.innerWidth &&
        pos.top + popoverHeight <= window.innerHeight) || positions.bottom

    const top = Math.max(0, Math.min(position.top, window.innerHeight - popoverHeight))
    const left = Math.max(0, Math.min(position.left, window.innerWidth - popoverWidth))
    if (shouldAnimate && this.isVisible) {
      animateStyles(this.popover, { top, left }, { duration: this.opts.followSpeed, ease: 'easeOut' })
    } else {
      this.popover.style.top = top + 'px'
      this.popover.style.left = left + 'px'
    }
    this.popover.classList.remove(this.className + '--' + this.currentPosition)
    this.currentPosition = position.name
    this.popover.classList.add(this.className + '--' + position.name)
  }

  hide() {
    this.popover.remove()

    // Remove from active popovers
    const index = activePopovers.indexOf(this)
    if (index !== -1) {
      activePopovers.splice(index, 1)
    }

    // Remove handlers
    if (this.opts.clickToggle) {
      this.removeDocumentClickHandler()
    }

    if (this.opts.followTrigger) {
      this.removeScrollListener()
    }
  }

  toggle() {
    if (this.isVisible) {
      this.hide()
    } else {
      this.show()
    }
  }

  // Add document click handler to close popover when clicking outside
  addDocumentClickHandler() {
    document.addEventListener('click', this.boundHandleDocumentClick)
  }

  // Remove document click handler
  removeDocumentClickHandler() {
    document.removeEventListener('click', this.boundHandleDocumentClick)
  }

  // Handle clicks on document to close popover when clicking outside
  handleDocumentClick(e) {
    // If click is outside the popover and the trigger, close it
    if (this.isVisible && !this.popover.contains(e.target) && !this.trigger.contains(e.target)) {
      this.hide()
    }
  }

  // Close all popovers except the specified one
  closeAllExcept(exceptPopover) {
    activePopovers.slice().forEach(popover => {
      if (popover !== exceptPopover) {
        popover.hide()
      }
    })
  }

  // Handle scroll events to update popover position
  handleScroll() {
    if (this.isVisible) {
      this.updatePosition(true)
    }
  }

  // Add scroll event listener using APPLICATION:SCROLL event
  addScrollListener() {
    window.addEventListener(Events.APPLICATION_SCROLL, this.boundHandleScroll)
  }

  // Remove scroll event listener
  removeScrollListener() {
    window.removeEventListener(Events.APPLICATION_SCROLL, this.boundHandleScroll)
  }
}
