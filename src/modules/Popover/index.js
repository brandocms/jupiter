import { gsap } from 'gsap/all'
import Dom from '../Dom'
import _defaultsDeep from 'lodash.defaultsdeep'
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
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)

    this.trigger = trigger
    this.position = this.trigger.getAttribute('data-popover-position') || 'top'
    this.className = 'popover'
    this.orderedPositions = ['top', 'right', 'bottom', 'left']
    this.currentPosition = this.position

    const popoverTemplate = document.querySelector(
      `[data-popover-template=${trigger.dataset.popoverTarget}]`
    )
    this.popover = document.createElement('div')
    this.popover.innerHTML = popoverTemplate.innerHTML

    Object.assign(this.popover.style, {
      position: 'fixed',
    })

    // Add base popover class
    this.popover.classList.add(this.className)

    // Add any classes from the template element
    if (popoverTemplate.classList && popoverTemplate.classList.length > 0) {
      popoverTemplate.classList.forEach((className) => {
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
        this.trigger.addEventListener(
          'mouseenter',
          this.handleMouseEnter.bind(this)
        )
        this.trigger.addEventListener(
          'mouseleave',
          this.handleMouseLeave.bind(this)
        )
      }
    } else {
      this.trigger.addEventListener(
        'touchstart',
        this.handleTouchStart.bind(this)
      )
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
        this.addScrollListener()
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
  updatePosition(animate = true) {
    const { top: triggerTop, left: triggerLeft } =
      this.trigger.getBoundingClientRect()
    const { offsetHeight: triggerHeight, offsetWidth: triggerWidth } =
      this.trigger
    const { offsetHeight: popoverHeight, offsetWidth: popoverWidth } =
      this.popover

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
      .map((pos) => positions[pos])
      .find((pos) => {
        // Temporarily set position to check viewport
        if (!animate) {
          this.popover.style.top = `${pos.top}px`
          this.popover.style.left = `${pos.left}px`
        }
        return Dom.inViewport(this.popover)
      })

    // Remove previous position classes
    this.orderedPositions.forEach((pos) => {
      this.popover.classList.remove(`${this.className}--${pos}`)
    })

    // Set position and apply appropriate class
    if (position) {
      if (animate && this.isVisible) {
        gsap.to(this.popover, {
          top: Math.max(0, position.top),
          left: Math.max(0, position.left),
          duration: this.opts.followSpeed,
          ease: 'power2.out',
        })
      } else if (!animate) {
        this.popover.style.top = `${Math.max(0, position.top)}px`
        this.popover.style.left = `${Math.max(0, position.left)}px`
      }
      this.popover.classList.add(`${this.className}--${position.name}`)
      this.currentPosition = position.name
    } else {
      // Fallback to bottom if no position works
      if (animate && this.isVisible) {
        gsap.to(this.popover, {
          top: Math.max(0, positions.bottom.top),
          left: Math.max(0, positions.bottom.left),
          duration: this.opts.followSpeed,
          ease: 'power2.out',
        })
      } else if (!animate) {
        this.popover.style.top = `${Math.max(0, positions.bottom.top)}px`
        this.popover.style.left = `${Math.max(0, positions.bottom.left)}px`
      }
      this.popover.classList.add(`${this.className}--bottom`)
      this.currentPosition = 'bottom'
    }
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
    if (
      this.isVisible &&
      !this.popover.contains(e.target) &&
      !this.trigger.contains(e.target)
    ) {
      this.hide()
    }
  }

  // Close all popovers except the specified one
  closeAllExcept(exceptPopover) {
    activePopovers.forEach((popover) => {
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
    window.removeEventListener(
      Events.APPLICATION_SCROLL,
      this.boundHandleScroll
    )
  }
}
