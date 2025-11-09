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
          [btn, { opacity: 0 }, { duration: 0.5, ease: 'easeIn', at: 0 }],
          [overlay, { opacity: 0 }, { duration: 1, ease: 'easeIn', at: 0 }],
          [iframe, { opacity: 1 }, { duration: 0.5, ease: 'easeOut', at: 0.5 }],
          [overlay, { display: 'none' }, { duration: 0, at: 1 }]
        ]

        animate(timeline).finished.then(() => {
          if (player) {
            // Vimeo player
            player.play()
          } else if (iframe && iframe.src.includes('youtube.com')) {
            // YouTube postMessage API
            iframe.contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              '*'
            )
          }
        })
      })
    })
  }
}
