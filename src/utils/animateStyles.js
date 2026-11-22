import { animate as animateNative } from 'motion/mini'

/** The widgets use the finished promise on both animation paths. */
export default function animateStyles(element, keyframes, options) {
  if (typeof element.animate === 'function') return animateNative(element, keyframes, options)
  return {
    finished: import('./animateFallback').then(({ default: animate }) => animate(element, keyframes, options).finished)
  }
}
