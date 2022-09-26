import { gsap } from 'gsap'
import Dom from '../Dom'
import imagesAreLoaded from '../../utils/imagesAreLoaded'

export default class EqualHeightImages {
  constructor (app) {
    this.app = app
    this.initialize()
  }

  initialize () {
    const canvases = Dom.all('[data-eq-height-images]')
    Array.from(canvases).forEach(canvas => {
      // if (app.breakpoints.mediaQueries.iphone.matches || app.breakpoints.mediaQueries.mobile.matches) {
      //   return
      // }
      let lastTop = null
      const actionables = []
      let elements = []
      let height = 0
      const imgs = Dom.all(canvas, 'img')

      imagesAreLoaded(imgs, false).then(() => {
        imgs.forEach(el => {
          const rect = el.getBoundingClientRect()
          const size = this.getImgSizeInfo(el)

          console.log('go')

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

  getRenderedSize (contains, cWidth, cHeight, width, height, pos) {
    const oRatio = width / height
    const cRatio = cWidth / cHeight
    // eslint-disable-next-line func-names
    return function () {
      if (contains ? (oRatio > cRatio) : (oRatio < cRatio)) {
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

  getImgSizeInfo (img) {
    const pos = window
      .getComputedStyle(img)
      .getPropertyValue('object-position')
      .split(' ')

    return this.getRenderedSize(true,
      img.width,
      img.height,
      img.naturalWidth,
      img.naturalHeight,
      parseInt(pos[0]))
  }
}