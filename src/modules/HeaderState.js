import _defaultsDeep from 'lodash.defaultsdeep'

export default class HeaderState {
  constructor(defaultEvents) {
    this.defaultEvents = defaultEvents
    this.listeners = new AbortController()
    this.subscriptions = []
  }

  listen(type, callback, options = {}) {
    window.addEventListener(type, callback, { ...options, signal: this.listeners.signal })
  }

  subscribe(type, callback) {
    const dispose = this.app.registerCallback(type, callback)
    if (typeof dispose === 'function') this.subscriptions.push(dispose)
  }

  destroy() {
    this.listeners.abort()
    for (const dispose of this.subscriptions.splice(0)) dispose()
    clearTimeout(this.revealTimer)
    clearTimeout(this.scrollSettleTimeout)
    clearTimeout(this.resetResizeTimer)
  }

  lock() {
    this.preventPin = true
    this.preventUnpin = true
  }

  unlock() {
    this.preventPin = false
    this.preventUnpin = false
  }

  checkSize(force) {
    const active = this.currentScrollY > this.opts.offsetSmall
    if (active) {
      if (force || !this._small) this.small()
    } else if (force || this._small) {
      this.notSmall()
    }
  }

  checkTop(force) {
    const active = this.currentScrollY <= this.opts.offset
    if (active) {
      if (force || !this._top) this.top()
    } else if (force || this._top) {
      this.notTop()
    }
  }

  checkBot(force, height = this.getScrollerHeight()) {
    const active = this.currentScrollY + this.getViewportHeight() >= height
    if (active) {
      if (force || !this._bottom) this.bottom()
    } else if (force || this._bottom) {
      this.notBottom()
    }
  }

  notTop() {
    this._top = false
    this.el.removeAttribute('data-header-top')
    this.el.setAttribute('data-header-not-top', '')
    this.opts.onNotTop(this)
  }

  top() {
    this._top = true
    this.el.setAttribute('data-header-top', '')
    this.el.removeAttribute('data-header-not-top')
    this.opts.onTop(this)
  }

  notBottom() {
    this._bottom = false
    this.el.setAttribute('data-header-not-bottom', '')
    this.el.removeAttribute('data-header-bottom')
    this.opts.onNotBottom(this)
  }

  bottom() {
    this._bottom = true
    this.el.setAttribute('data-header-bottom', '')
    this.el.removeAttribute('data-header-not-bottom')
    this.opts.onBottom(this)
  }

  // A non-retracting header can retain its layout reservation across pin-state changes.
  _updateHeaderHeight() {
    const tracksPin = this.opts.headerHeightTracksPin !== false
    const height = tracksPin && !this._pinned ? '0px' : `${this.el.clientHeight}px`
    document.documentElement.style.setProperty('--header-height', height)
  }

  isOutOfBounds(height = this.getScrollerHeight()) {
    const pastTop = this.currentScrollY < 0
    const pastBottom =
      this.currentScrollY + this.getScrollerPhysicalHeight() > height

    return pastTop || pastBottom
  }

  getScrollerPhysicalHeight() {
    return this.opts.canvas === window || this.opts.canvas === document.body
      ? this.getViewportHeight()
      : this.getElementPhysicalHeight(this.opts.canvas)
  }

  getScrollerHeight() {
    return this.opts.canvas === window || this.opts.canvas === document.body
      ? this.getDocumentHeight()
      : this.getElementHeight(this.opts.canvas)
  }

  getDocumentHeight() {
    const { body } = document
    const { documentElement } = document

    return Math.max(
      body.scrollHeight,
      documentElement.scrollHeight,
      body.offsetHeight,
      documentElement.offsetHeight,
      body.clientHeight,
      documentElement.clientHeight
    )
  }

  getViewportHeight() {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    )
  }

  getElementHeight(el) {
    return Math.max(el.scrollHeight, el.offsetHeight, el.clientHeight)
  }

  getElementPhysicalHeight(el) {
    return Math.max(el.offsetHeight, el.clientHeight)
  }

  getScrollY() {
    if (this.opts.canvas.pageYOffset !== undefined) {
      return this.opts.canvas.pageYOffset
    }
    if (this.opts.canvas.scrollTop !== undefined) {
      return this.opts.canvas.scrollTop
    }
    return (
      document.documentElement ||
      document.body.parentNode ||
      document.body
    ).scrollTop
  }

  toleranceExceeded() {
    return (
      Math.abs(this.currentScrollY - this.lastKnownScrollY) >=
      this.opts.tolerance
    )
  }

  _getOptionsForSection(section, opts) {
    // if section is not a key in opts, return default opts
    if (
      !Object.prototype.hasOwnProperty.call(opts, 'sections') ||
      !Object.prototype.hasOwnProperty.call(opts.sections, section)
    ) {
      return opts.default
    }

    // merge in default events, in case they're not supplied
    const sectionOpts = opts.sections[section]
    opts = _defaultsDeep(sectionOpts, this.defaultEvents, opts.default || {})
    return opts
  }
}
