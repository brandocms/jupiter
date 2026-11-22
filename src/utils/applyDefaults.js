/** Fill missing scalar and callback options on the caller's object. */
export default function applyDefaults(options, defaults) {
  const target = Object(options)
  for (const key of Object.keys(defaults)) {
    if (target[key] === undefined) Reflect.set(target, key, defaults[key])
  }
  return target
}
