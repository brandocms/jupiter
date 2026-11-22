import { IMAGE_LAZYLOADED } from '../events'

export default function imageIsLoaded(img, lazy = false) {
  return new Promise(resolve => {
    if (lazy) {
      const loaded = () => resolve({ img, status: 'ok' })
      if (img.matches('[data-ll-loading], [data-ll-ready], [data-ll-loaded]')) loaded()
      else img.addEventListener(IMAGE_LAZYLOADED, loaded, { once: true })
      return
    }
    function settle() {
      img.removeEventListener('load', settle)
      img.removeEventListener('error', settle)
      resolve({ img, status: img.naturalWidth ? 'ok' : 'error' })
    }
    if (img.complete) settle()
    else {
      img.addEventListener('load', settle)
      img.addEventListener('error', settle)
    }
  })
}
