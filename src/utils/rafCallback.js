const DEFAULT_FPS = 60
const SCOPES = new Map()

export default (callback, fps = DEFAULT_FPS) =>
  (...passedArgs) =>
    requestAnimationFrame(() => {
      const msCurrent = new Date().getTime()
      const fpsInterval = 1000 / fps

      const msLast = SCOPES.get(callback) || null
      const msDelta = msLast ? msCurrent - msLast : null

      if (msDelta === null || msDelta > fpsInterval) {
        SCOPES.set(callback, msCurrent - (msDelta % fpsInterval))
        callback(...passedArgs)
      }
    })
