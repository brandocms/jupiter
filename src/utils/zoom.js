const _binarySearch = (a, b, maxIter, epsilon, property, unit) => {
  const mid = (a + b) / 2
  if (maxIter <= 0 || b - a < epsilon) {
    return mid
  }
  const query = `(${property}:${mid}${unit})`
  if (window.matchMedia(query).matches) {
    return _binarySearch(mid, b, maxIter - 1, epsilon, property, unit)
  }

  return _binarySearch(a, mid, maxIter - 1, epsilon, property, unit)
}

const calculateFirefox = () => {
  return (
    Math.round(
      _binarySearch(0, 10, 20, 0.0001, 'min--moz-device-pixel-ratio', '') * 10
    ) / 10
  )
}

const calculateChrome = initial => Math.round(window.devicePixelRatio * 100) - initial
const calculateDefault = () => Math.round((window.outerWidth / window.innerWidth) * 10) / 10

const impls = {
  firefox: calculateFirefox,
  chrome: calculateChrome,
  default: calculateDefault
}

export default {
  calculate: (browser, initial) =>
    impls[browser] ? impls[browser](initial) : impls.default(initial)
}
