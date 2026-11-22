export function find(arg1, arg2) {
  if (typeof arg1 === 'string' && typeof arg2 === 'object') {
    throw new Error('Dom.find: Wrong syntax, use -> Dom.find(node, selector)')
  }

  if (typeof arg1 === 'string') {
    return document.querySelector(arg1)
  }

  if (typeof arg2 === 'string') {
    return arg1.querySelector(arg2)
  }

  return null
}

export function all(arg1, arg2) {
  if (typeof arg1 === 'string') {
    return Array.from(document.querySelectorAll(arg1))
  }

  if (typeof arg2 === 'string') {
    return Array.from(arg1.querySelectorAll(arg2))
  }

  return []
}
