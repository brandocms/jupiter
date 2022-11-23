import gsap from 'gsap/gsap-core'
import _defaultsDeep from 'lodash.defaultsdeep'
import Dom from '../Dom'

const DEFAULT_OPTIONS = {
  speed: 100,
  extraHeight: 0,
  slowDownOnHover: true,
  paddingLeft: 0, //DEPRECATED
  startProgress: 0,
  spacer: '<span>&nbsp;&mdash;&nbsp;</span>',

  onReveal: marqueeEl => {
    gsap.to(marqueeEl, { opacity: 1, ease: 'none' })
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
    gsap.set(this.elements.$marquee, { opacity: 0 })
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
    this.setHeight()
    this.fillText()

    const holderWidth = this.elements.$holder.offsetWidth
    const $allHolders = Dom.all(this.elements.$el, '[data-marquee-holder]')
    const marqueeWidth = holderWidth * $allHolders.length

    this.duration = holderWidth / this.opts.speed

    gsap.set(this.elements.$marquee, { width: marqueeWidth })
    this.initializeTween()

    if (Dom.inViewport(this.elements.$el)) {
      this.play()
    }
  }

  clearHolders() {
    const $allHolders = Dom.all(this.elements.$el, '[data-marquee-holder]')
    Array.from($allHolders).forEach(h => gsap.set(h, { clearProps: 'all' }))
  }

  killTweens() {
    if (this.timeline) {
      this.timeline.kill()
      this.timeline = null
    }
  }

  initializeTween() {
    const $allHolders = Dom.all(this.elements.$el, '[data-marquee-holder]')

    Array.from($allHolders).forEach((h, idx) => {
      gsap.set(h, { position: 'absolute', left: h.offsetWidth * idx })
    })

    this.timeline = gsap.timeline({ paused: true })
    this.timeline
      .to($allHolders, { xPercent: -100, ease: 'none', duration: this.duration }, 'standard')
      .repeat(-1)

    this.timeline.totalProgress(this.opts.startProgress)

    window.timeline = this.timeline
    window.marquee = this
  }

  play(rampUp = false) {
    this.playing = true
    gsap.killTweensOf(this.timeline)

    if (rampUp) {
      this.timeline.play()
      gsap.to(this.timeline, {
        timeScale: 1,
        ease: 'sine.in',
        duration: 0.8
      })
    } else {
      this.timeline.timeScale(1)
      this.timeline.play()
    }
  }

  pause() {
    this.playing = false
    gsap.to(this.timeline, {
      timeScale: 0.01,
      onComplete: () => {
        this.timeline.pause()
      },
      duration: 0.8
    })
  }

  slowDown() {
    gsap.to(this.timeline, {
      timeScale: 0.5,
      duration: 0.8
    })
  }

  speedUp() {
    gsap.to(this.timeline, {
      timeScale: 1,
      duration: 0.8,
      ease: 'sine.in'
    })
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
    this.elements.$marquee.innerHTML = ''
    this.elements.$marquee.appendChild(this.elements.$holder)

    this.elements.$holder.innerHTML = ''
    this.elements.$holder.appendChild(this.elements.$item)

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
    const height = this.elements.$item.offsetHeight + this.opts.extraHeight
    gsap.set(this.elements.$el, { height })
  }
}
