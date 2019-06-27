// import Headroom from 'headroom.js'
import { TweenMax } from 'gsap/all'
import _defaultsDeep from 'lodash.defaultsdeep'

const DEFAULT_OPTIONS = {}

export default class StackedBoxes {
  constructor (app, opts = {}) {
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.initialize()
  }

  initialize () {
    // TODO: ensure images are loaded?

    const boxes = document.querySelectorAll('[data-boxes-stacked]')

    let observer = new IntersectionObserver(entries => {
      let [{ isIntersecting, target }] = entries
      if (isIntersecting) {
        this.adjustBox(target)
      }
    })

    for (let box of Array.from(boxes)) {
      observer.observe(box)
    }
  }

  adjustBox (box) {
    let sizeTarget = box.querySelector('[data-boxes-stacked-size-target]')
    let sizeSrc = box.querySelector('[data-boxes-stacked-size-src]')

    if (sizeTarget) {
      this.size(sizeTarget, sizeSrc)
    }

    let pull = box.querySelector('[data-boxes-stacked-pull]')

    if (pull) {
      let pullAmount = pull.getAttribute('data-boxes-stacked-pull')
      console.log(pullAmount)
      let pullPx

      switch (pullAmount) {
        case '1/3':
          pullPx = pull.clientHeight / 3
          break

        case '2/3':
          pullPx = pull.clientHeight / 3 * 2
          break

        case '1/2':
          pullPx = pull.clientHeight / 2
          break
      }
      console.log(pullPx)
      this.pull(pull, pullPx)
    }
  }

  pull (box, amnt) {
    TweenMax.set(box, { y: amnt * -1, marginBottom: amnt * -1 })
  }

  size (target, src) {
    TweenMax.set(target, { height: src.clientHeight })
  }
}