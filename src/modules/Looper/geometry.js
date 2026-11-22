/** Closest physical copy of an original snap point, including on later turns. */
export function nearestSnap(target, times, count, speed, cycleWidth, maxScroll, loop) {
  let index = 0
  let position = target
  let best = Infinity
  for (let i = 0; i < count; i++) {
    const base = times[i] * speed
    // At an exact tie, retain the earlier copy just like the ordered scan.
    const candidate = loop && cycleWidth > 0
      ? base + Math.ceil((target - base) / cycleWidth - 0.5) * cycleWidth
      : Math.min(base, maxScroll)
    const distance = Math.abs(candidate - target)
    if (distance < best) {
      best = distance
      index = i
      position = candidate
    }
  }
  return { index, position }
}

export function stretch(raw, max, width, elasticity) {
  const edge = Math.max(0, Math.min(max, raw))
  const delta = raw - edge
  if (!delta || !width || !elasticity) return edge
  return edge + Math.sign(delta) * width * (1 - 1 / (1 + Math.abs(delta) * elasticity / width))
}

export function unstretch(shown, max, width, elasticity) {
  const edge = Math.max(0, Math.min(max, shown))
  const delta = shown - edge
  if (!delta || !width || !elasticity) return shown
  const over = Math.min(Math.abs(delta), width - 1)
  return edge + Math.sign(delta) * width / elasticity * (1 / (1 - over / width) - 1)
}

export function stretchRate(shown, max, width, elasticity) {
  const over = Math.max(-shown, shown - max, 0)
  return over && width && elasticity ? elasticity * (1 - over / width) ** 2 : 1
}
