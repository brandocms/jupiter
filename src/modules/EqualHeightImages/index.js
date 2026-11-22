import { all } from '../Dom/query'
import equalizeRows from '../../utils/equalizeRows'
import * as Events from '../../events'
import imagesAreLoaded from '../../utils/imagesAreLoaded'
import applyDefaults from '../../utils/applyDefaults'

const DEFAULT_OPTIONS = {
  listenForResize: true,
}

export default class EqualHeightImages {
  constructor(app, opts = {}, container = document.body) {
    this.app = app
    this.container = container
    this.opts = applyDefaults(opts, DEFAULT_OPTIONS)
    this.adjusted = new WeakSet()
    this.initialize()

    if (this.opts.listenForResize) {
      this.onResize = () => this.initialize()
      window.addEventListener(Events.APPLICATION_RESIZE, this.onResize)
    }
  }

  run() {
    const generation = this.generation = (this.generation || 0) + 1
    for (const canvas of this.canvases) {
      const images = canvas.querySelectorAll('img')
      imagesAreLoaded(images).then(() => {
        if (generation !== this.generation) return
        for (const img of images) {
          if (this.adjusted.has(img)) img.style.removeProperty('min-height')
          this.adjusted.add(img)
        }
        equalizeRows(images, img => img.naturalWidth
          ? Math.min(img.height, img.width * img.naturalHeight / img.naturalWidth)
          : img.height)
      })
    }
  }

  destroy() {
    this.generation++
    window.removeEventListener(Events.APPLICATION_RESIZE, this.onResize)
  }

  initialize() {
    this.canvases = all(this.container, '[data-eq-height-images]')
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
    const pos = window
      .getComputedStyle(img)
      .getPropertyValue('object-position')
      .split(' ')

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
