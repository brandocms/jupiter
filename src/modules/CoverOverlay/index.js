import { animate } from 'motion'
import _defaultsDeep from 'lodash.defaultsdeep'

const DEFAULT_OPTIONS = {}

export default class CoverOverlay {
  constructor(app, opts = {}) {
    this.app = app
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.initialize()
  }

  initialize() {
    const coveredModules = document.querySelectorAll('[data-cover-overlay]')

    Array.from(coveredModules).forEach((v) => {
      let player
      const overlay = v.querySelector('.picture-wrapper')
      const btn = v.querySelector('[data-cover-overlay-button]')
      const iframe = v.querySelector('iframe')

      if (iframe) {
        iframe.setAttribute(
          'allow',
          'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        )
      }

      if (v.hasAttribute('data-cover-overlay-vimeo-play')) {
        if (window.Vimeo && iframe) {
          player = new window.Vimeo.Player(iframe)
        } else {
          console.error('==> JUPITER// Missing vimeo JS or iframe')
        }
      }

      btn.addEventListener('click', () => {
        const timeline = [
          [iframe, { opacity: 1 }, { duration: 0 }],
          [btn, { opacity: 0 }, { duration: 0.5, easing: 'ease-in' }],
          [overlay, { opacity: 0 }, { duration: 1, easing: 'ease-in' }],
          [overlay, { display: 'none' }, { duration: 0 }]
        ]

        const animation = animate(timeline)
        animation.finished.then(() => {
          if (player) {
            player.play()
          }
        })
      })
    })
  }
}
