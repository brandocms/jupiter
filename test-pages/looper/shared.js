import { Application, Lazyload, Looper, Moonwalk } from '../../src/index.js'

export function initLooper(opts = {}) {
  const app = new Application({ debug: true })

  if (opts.lazyload) {
    app.lazyload = new Lazyload(app, {
      useNativeLazyloadIfAvailable: false,
      registerCallback: false,
    })
  }

  const looper = new Looper(app, {
    selector: '[data-moonwalk-run="loop"]',
    crawl: true,
    loop: true,
    draggable: true,
    snap: false,
    speed: { sm: 0.1, lg: 1 },
    snapDuration: 0.75,
    snapBounce: 0.1,
  })

  const moonwalk = new Moonwalk(app, {
    runs: {
      loop: {
        threshold: 0.0,
        repeated: true,
        callback: (element, repeated) => {
          if (repeated) {
            element.$loop.play()
            return
          }
        },
        onExit: (element, repeated) => {
          element.$loop.pause()
        },
      },
    },
  })

  app.fadeIn()
  return { app, looper, moonwalk }
}
