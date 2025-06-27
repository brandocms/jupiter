export function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t
}

export function damp(a, b, lambda, deltaTime) {
  const t = 1 - Math.exp(-lambda * deltaTime)
  return a + (b - a) * t
}

export function symmetricMod(value, base) {
  let m = value % base
  if (Math.abs(m) > base / 2) {
    m = m > 0 ? m - base : m + base
  }
  return m
}
