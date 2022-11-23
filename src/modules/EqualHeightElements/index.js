import { gsap } from 'gsap'
import Dom from '../Dom'
import _defaultsDeep from 'lodash.defaultsdeep'
import * as Events from '../../events'

const DEFAULT_OPTIONS = {}

export default class EqualHeightElements {
  constructor (app, selector, opts = {}, container = document.body) {
    this.app = app
    this.container = container
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.selector = selector
    this.initialize()
    window.addEventListener(Events.APPLICATION_RESIZE, () => {
      gsap.set('[data-eq-height-elements-adjusted]', { clearProps: 'minHeight' })
      this.initialize()
    })
  }

  initialize () {
    const canvases = Dom.all(this.container, '[data-eq-height-elements]')
    Array.from(canvases).forEach(canvas => {
      let lastTop = null
      const actionables = []
      let elements = []
      let height = 0
      const eqElements = Dom.all(canvas, this.selector)

      eqElements.forEach(el => {
        const rect = el.getBoundingClientRect()
        
        if (lastTop === null) {
          height = rect.height
          elements.push(el)
          lastTop = rect.top
          return
        }

        if (lastTop !== rect.top) {
          console.debug('== pushing actionables', { elements, height })
          actionables.push({ elements, height })
          elements = []
          height = rect.height
        } else if (lastTop === rect.top) {
          if (rect.height > height) {
            height = rect.height
          }
        } else {
          height = rect.height
        }
        elements.push(el)
        lastTop = rect.top
      })

      if (elements.length) {
        actionables.push({ elements, height })
      }

      if (actionables.length) {
        actionables.forEach(a => {
          gsap.set(a.elements, { minHeight: a.height, attr: { 'data-eq-height-elements-adjusted': true } })
        })
      }
    })
  }
}