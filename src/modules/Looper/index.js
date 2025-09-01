import Core from './core'
import gsap from 'gsap/all'

export default class Looper extends Core {
  constructor(container, config = {}) {
    super(container.querySelector('[data-looper]'), config)
    this.container = container
    this.state = {
      dots: false,
      arrows: false,
    }
    this.createInterface()
    this.onSlideChange(0, 0)
    gsap.ticker.add(this.update.bind(this))
  }

  createInterface() {
    // do we have dots?
    const dots = this.container.querySelector('[data-dots]')
    if (dots) {
      this.state.dots = true
      this.dots = [...dots.children]
      this.dots.forEach((dot, index) => (dot.onclick = () => this.goToIndex(index)))
    }

    // do we have arrows?
    const prevArrow = this.container.querySelector('[data-panner-previous]')
    const nextArrow = this.container.querySelector('[data-panner-next]')
    if (prevArrow || nextArrow) {
      this.state.arrows = true
      this.arrows = []
      if (prevArrow) {
        this.arrows.push(prevArrow)
        prevArrow.onclick = () => this.goToPrev()
      }
      if (nextArrow) {
        this.arrows.push(nextArrow)
        nextArrow.onclick = () => this.goToNext()
      }
    }
  }

  onSlideChange = (current, previous) => {
    this.items[previous].children[0].classList.remove('active')
    this.items[current].children[0].classList.add('active')

    if (this.state.dots) {
      this.dots[previous].children[0].classList.remove('active-dot')
      this.dots[current].children[0].classList.add('active-dot')
    }

    if (this.state.arrows && !this.config.infinite) {
      // TODO check slide position and disable arrows if needed (never if looped)
    }
  }
}
