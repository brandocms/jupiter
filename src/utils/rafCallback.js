export default function rafCallback(callback, fps = 60) {
  const interval = fps > 0 ? 1000 / fps : 1000 / 60
  let frame = null
  let last = -Infinity
  let args

  function run(now) {
    if (now - last + 0.1 < interval) {
      frame = requestAnimationFrame(run)
      return
    }
    frame = null
    last = now
    const latest = args
    args = undefined
    callback(...latest)
  }

  function schedule(...latest) {
    args = latest
    if (frame === null) frame = requestAnimationFrame(run)
  }
  schedule.cancel = () => {
    args = undefined
    cancelAnimationFrame(frame)
    frame = null
  }
  return schedule
}
