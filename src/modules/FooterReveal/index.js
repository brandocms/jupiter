import { set } from '../../utils/motion-helpers'
import applyDefaults from '../../utils/applyDefaults'

const DEFAULT_OPTIONS = {
  shadow: false,
  shadowColor: 'rgba(255, 255, 255, 1)',
}

export default class FooterReveal {
  constructor(app, opts) {
    this.app = app
    this.opts = applyDefaults(opts, DEFAULT_OPTIONS)

    const main = document.querySelector('main')
    const footer = document.querySelector('[data-footer-reveal]')
    // fix footer
    set(footer, {
      zIndex: -100,
      position: 'fixed',
      bottom: 0,
    })
    const update = () => set(main, { marginBottom: footer.offsetHeight })
    update()
    this.observer = new ResizeObserver(update)
    this.observer.observe(footer)
    if (this.opts.shadow) {
      const shadowStyle = `0 50px 50px -20px ${this.opts.shadowColor}`
      main.style.mozBoxShadow = shadowStyle
      main.style.webkitBoxShadow = shadowStyle
      main.style.boxShadow = shadowStyle
    }
  }

  destroy() {
    this.observer.disconnect()
  }
}
