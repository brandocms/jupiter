import { animate, stagger } from 'motion'
import { set } from '../../utils/motion-helpers'

export async function animateDebugPanel(app, mode) {
  const active = () => app.debugType === mode && !app.listeners.signal.aborted
  if (!active()) return
  const breakpoint = app.debugOverlay.querySelector('.breakpoint')
  const userAgent = app.debugOverlay.querySelector('.user-agent')
  if (mode === 0) {
    const elements = [breakpoint, userAgent]
    await animate(elements, { opacity: 0 }, { duration: 0.3 }).finished
    if (!active()) return
    set(elements, { visibility: 'hidden' })
    await animate(elements, { width: 0 }, { duration: 0.7 }).finished
    if (active()) set(elements, { display: 'none' })
  } else {
    const element = mode === 1 ? breakpoint : userAgent
    set(element, { width: 'auto', display: 'block', visibility: 'visible' })
    await animate(element, { width: [0, 'auto'] }, { duration: 0.7 }).finished
    if (active()) animate(element, { opacity: 1 }, { duration: 0.3 })
  }
}

export async function animateDebugGrid(guides) {
  const cols = guides.querySelectorAll('b')
  if (!cols.length) return
  const closing = guides.classList.contains('visible')
  set(cols, { width: closing ? 'auto' : 0 })
  if (!closing) guides.classList.add('visible')
  await animate(cols, { width: closing ? 0 : '100%' }, {
    duration: 0.35,
    delay: stagger(0.02),
    ease: 'easeInOut',
  }).finished
  if (closing) guides.classList.remove('visible')
}
