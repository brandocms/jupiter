import { set } from '../../utils/motion-helpers'

export default class StackedBoxes {
  constructor(app, opts = {}) {
    this.app = app
    this.opts = Object(opts)
    this.initialize()
  }

  initialize() {
    const boxes = document.querySelectorAll('[data-boxes-stacked]')

    const observer = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target } of entries) {
        if (isIntersecting) this.adjustBox(target)
      }
    })

    Array.from(boxes).forEach((box) => {
      observer.observe(box)
    })
  }

  adjustBox(box) {
    const sizeTarget = box.querySelector('[data-boxes-stacked-size-target]')
    const sizeSrc = box.querySelector('[data-boxes-stacked-size-src]')

    if (sizeTarget && sizeSrc) {
      this.size(sizeTarget, sizeSrc)
    }

    const pull = box.querySelector('[data-boxes-stacked-pull]')

    if (pull) {
      const pullAmount = pull.getAttribute('data-boxes-stacked-pull')
      let pullPx

      switch (pullAmount) {
        case '1/3':
          pullPx = pull.clientHeight / 3
          break

        case '2/3':
          pullPx = (pull.clientHeight / 3) * 2
          break

        case '1/2':
          pullPx = pull.clientHeight / 2
          break

        default:
          console.error(
            '==> JUPITER/STACKEDBOXES: `data-boxes-stacked-pull` has wrong value'
          )
      }
      if (pullPx !== undefined) this.pull(pull, pullPx)
    }
  }

  pull(box, amnt) {
    set(box, { y: amnt * -1, marginBottom: amnt * -1 })
  }

  size(target, src) {
    set(target, { height: src.clientHeight })
  }
}
