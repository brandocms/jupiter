import { all } from '../Dom/query'
import equalizeRows from '../../utils/equalizeRows'
import * as Events from '../../events'

export default class EqualHeightElements {
  constructor(app, selector, opts = {}, container = document.body) {
    this.app = app
    this.container = container
    this.opts = Object(opts)
    this.selector = selector
    this.initialize()
    this.onResize = () => this.initialize()
    window.addEventListener(Events.APPLICATION_RESIZE, this.onResize)
  }

  initialize() {
    for (const canvas of all(this.container, '[data-eq-height-elements]')) {
      const elements = all(canvas, this.selector)
      for (const el of elements) {
        if (el.hasAttribute('data-eq-height-elements-adjusted')) el.style.removeProperty('min-height')
      }
      equalizeRows(elements, (_el, rect) => rect.height, true)
    }
  }

  destroy() {
    window.removeEventListener(Events.APPLICATION_RESIZE, this.onResize)
  }
}
