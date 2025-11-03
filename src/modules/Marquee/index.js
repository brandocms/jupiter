import { animate } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'
import Dom from '../Dom'
import { set, clearProps } from '../../utils/motion-helpers'

const DEFAULT_OPTIONS = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: true,
  paddingLeft: 0, //DEPRECATED
  startProgress: 0,
  spacer: '<span>&nbsp;&mdash;&nbsp;</span>',

  onReveal: marqueeEl => {
    animate(marqueeEl, { opacity: 1 }, { easing: 'linear' })
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
    this.timeline = null
    this.observer = null

    this.initialize()
  }

  initialize() {
    set(this.elements.$marquee, { opacity: 0 })
    window.addEventListener('APPLICATION:RESIZE', this.updateMarquee.bind(this))
    window.addEventListener('APPLICATION:REVEALED', this.revealMarquee.bind(this))
    this.updateMarquee()
    this.setupObserver()
    if (this.opts.slowDownOnHover) {
      this.elements.$el.addEventListener('mouseenter', this.slowDown.bind(this))
      this.elements.$el.addEventListener('mouseleave', this.speedUp.bind(this))
    }
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

    const holderWidth = this.elements.$holder.offsetWidth
    const $allHolders = Dom.all(this.elements.$el, '[data-marquee-holder]')
    const marqueeWidth = holderWidth * $allHolders.length
    // Cap duration at 40s to prevent precision issues at slow speeds
    this.duration = Math.min(
      (holderWidth + marqueeWidth) / this.opts.speed,
      40
    )

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
    if (this.timeline) {
      this.timeline.stop()
      this.timeline = null
    }
    if (this.speedAnimation) {
      this.speedAnimation.stop()
      this.speedAnimation = null
    }
  }

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

    this.timeline = animate(
      $allHolders,
      { transform: ['translateX(0) translateZ(0)', 'translateX(-100%) translateZ(0)'] },
      { duration: this.duration, easing: 'linear', repeat: Infinity }
    )
    this.timeline.pause()

    // Set initial progress if specified
    if (this.opts.startProgress > 0) {
      this.timeline.currentTime = this.opts.startProgress * this.duration
    }

    window.timeline = this.timeline
    window.marquee = this
  }

  play(rampUp = false) {
    this.playing = true
    if (this.speedAnimation) {
      this.speedAnimation.stop()
    }

    if (rampUp) {
      this.timeline.play()
      const state = { speed: this.timeline.speed || 0 }
      this.speedAnimation = animate(
        state,
        { speed: 1 },
        {
          duration: 0.8,
          easing: 'ease-in',
          onUpdate: () => {
            this.timeline.speed = state.speed
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
    const state = { speed: this.timeline.speed || 1 }
    this.speedAnimation = animate(
      state,
      { speed: 0.01 },
      {
        duration: 0.8,
        onUpdate: () => {
          this.timeline.speed = state.speed
        }
      }
    )
    this.speedAnimation.finished.then(() => {
      // Only pause if we're still in paused state (haven't called play() in the meantime)
      if (!this.playing) {
        this.timeline.pause()
      }
    })
  }

  slowDown() {
    if (this.speedAnimation) {
      this.speedAnimation.stop()
    }
    const state = { speed: this.timeline.speed || 1 }
    this.speedAnimation = animate(
      state,
      { speed: 0.5 },
      {
        duration: 0.3,
        easing: [0.4, 0, 0.2, 1], // ease-out
        onUpdate: () => {
          this.timeline.speed = state.speed
        }
      }
    )
  }

  speedUp() {
    if (this.speedAnimation) {
      this.speedAnimation.stop()
    }
    const state = { speed: this.timeline.speed || 0.5 }
    this.speedAnimation = animate(
      state,
      { speed: 1 },
      {
        duration: 0.3,
        easing: [0.4, 0, 0.2, 1], // ease-out
        onUpdate: () => {
          this.timeline.speed = state.speed
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

      this.elements.$marquee.appendChild(this.elements.$holder.cloneNode(true))
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
}
