const _binarySearch = (a, b, maxIter, epsilon, property, unit) => {
  const mid = (a + b) / 2;
  if (maxIter <= 0 || b - a < epsilon) {
    return mid;
  }
  const query = `(${property}:${mid}${unit})`
  if (window.matchMedia(query).matches) {
    return _binarySearch(mid, b, maxIter - 1, epsilon, property, unit)
  }

  return _binarySearch(a, mid, maxIter - 1, epsilon, property, unit)
}

const _mediaQueryBinarySearch = (property, unit, a, b, maxIter, epsilon) => {
  let head
  let style
  let div

  const ratio = _binarySearch(a, b, maxIter, epsilon, property, unit)
  if (div) {
    head.removeChild(style);
    document.body.removeChild(div);
  }
  return ratio
}

const calculateFirefox = () => Math.round(_mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001) * 10) / 10
const calculateDefault = () => Math.round(((window.outerWidth) / window.innerWidth) * 10) / 10

const impls = {
  firefox: calculateFirefox,
  default: calculateDefault
}

export default {
  calculate: browser => (impls[browser] ? impls[browser]() : impls.default())
}
