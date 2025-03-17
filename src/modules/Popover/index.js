import { gsap } from 'gsap/all'
import Dom from '../Dom'
import _defaultsDeep from 'lodash.defaultsdeep'

const DEFAULT_OPTIONS = {}

export default class Popover {
  constructor(app, trigger, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)

    this.trigger = trigger
    this.position = this.trigger.getAttribute('data-popover-position') || 'top'
    this.className = 'popover'
    this.orderedPositions = ['top', 'right', 'bottom', 'left']

    const popoverTemplate = document.querySelector(
      `[data-popover-template=${trigger.dataset.popoverTarget}]`
    )
    this.popover = document.createElement('div')
    this.popover.innerHTML = popoverTemplate.innerHTML

    Object.assign(this.popover.style, {
      position: 'fixed',
    })

    this.popover.classList.add(this.className)

    if (!app.featureTests.results.touch) {
      this.trigger.addEventListener(
        'mouseenter',
        this.handleMouseEnter.bind(this)
      )
      this.trigger.addEventListener(
        'mouseleave',
        this.handleMouseLeave.bind(this)
      )
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

  get isVisible() {
    return document.body.contains(this.popover)
  }

  show() {
    document.body.appendChild(this.popover)

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

    const position = this.orderedPositions
      .slice(positionIndex)
      .concat(this.orderedPositions.slice(0, positionIndex))
      .map((pos) => positions[pos])
      .find((pos) => {
        this.popover.style.top = `${pos.top}px`
        this.popover.style.left = `${pos.left}px`
        return Dom.inViewport(this.popover)
      })

    this.orderedPositions.forEach((pos) => {
      this.popover.classList.remove(`${this.className}--${pos}`)
    })

    if (position) {
      this.popover.classList.add(`${this.className}--${position.name}`)
    } else {
      this.popover.style.top = positions.bottom.top
      this.popover.style.left = positions.bottom.left
      this.popover.classList.add(`${this.className}--bottom`)
    }
  }

  hide() {
    this.popover.remove()
  }

  toggle() {
    if (this.isVisible) {
      this.hide()
    } else {
      this.show()
    }
  }
}
