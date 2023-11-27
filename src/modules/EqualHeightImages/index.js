import { gsap } from 'gsap'
import Dom from '../Dom'
import * as Events from '../../events'
import imagesAreLoaded from '../../utils/imagesAreLoaded'
import _defaultsDeep from 'lodash.defaultsdeep'

const DEFAULT_OPTIONS = {
  listenForResize: true
}

export default class EqualHeightImages {
  constructor(app, opts = {}, container = document.body) {
    this.app = app
    this.container = container
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.initialize()

    if (opts.listenForResize) {
      window.addEventListener(Events.APPLICATION_RESIZE, () => {
        this.initialize()
      })
    }
  }

  run() {
    Array.from(this.canvases).forEach(canvas => {
      let lastTop = null
      const actionables = []
      let elements = []
      let height = 0
      const imgs = Dom.all(canvas, 'img')

      imagesAreLoaded(imgs, false).then(() => {
        imgs.forEach(el => {
          const rect = el.getBoundingClientRect()
          const size = this.getImgSizeInfo(el)

          if (lastTop === null) {
            height = size.height
            elements.push(el)
            lastTop = rect.top
            return
          }

          if (lastTop !== rect.top) {
            actionables.push({ elements, height })
            elements = []
            height = size.height
          } else if (lastTop === rect.top) {
            if (size.height > height) {
              height = size.height
            }
          } else {
            height = size.height
          }
          elements.push(el)
          lastTop = rect.top
        })

        if (elements.length) {
          actionables.push({ elements, height })
        }

        if (actionables.length) {
          actionables.forEach(a => {
            gsap.set(a.elements, { minHeight: a.height })
          })
        }
      })
    })
  }

  initialize() {
    this.canvases = Dom.all(this.container, '[data-eq-height-images]')
    this.run()
  }

  getRenderedSize(contains, cWidth, cHeight, width, height, pos) {
    const oRatio = width / height
    const cRatio = cWidth / cHeight
    // eslint-disable-next-line func-names
    return function () {
      if (contains ? oRatio > cRatio : oRatio < cRatio) {
        this.width = cWidth
        this.height = cWidth / oRatio
      } else {
        this.width = cHeight * oRatio
        this.height = cHeight
      }
      this.left = (cWidth - this.width) * (pos / 100)
      this.right = this.width + this.left
      return this
    }.call({})
  }

  getImgSizeInfo(img) {
    const pos = window.getComputedStyle(img).getPropertyValue('object-position').split(' ')

    return this.getRenderedSize(
      true,
      img.width,
      img.height,
      img.naturalWidth,
      img.naturalHeight,
      parseInt(pos[0])
    )
  }
}
