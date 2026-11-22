import { all, find } from '../Dom/query'
import applyDefaults from '../../utils/applyDefaults'
import DataloaderUrlSync from './url-sync'

/**
 * Load data by ajax
 *
 * Example DOM:
 *
 *  <div class="filter">
 *    <input type="text" data-loader-filter-for="news" placeholder="Search">
 *  </div>
 *
 *  <div data-loader="/api/posts" data-loader-id="news">
 *    <ul>
 *      <li>
 *        <a class="noanim" href="{{ category.url }}" data-loader-param="all" data-loader-param-selected>All</a>
 *      </li>
 *    </ul>
 *    <div class="posts-grid" data-moonwalk-section data-loader-canvas>
 *      <!-- render posts here -->
 *    </div>
 *    <div class="load-more" data-moonwalk-section>
 *      <button type="button" data-loader-more data-moonwalk="u">
 *        Load more posts <span class="arrow-d">&darr;</span>
 *      </button>
 *    </div>
 *  </div>
 *
 * You can set a custom key for each param:
 *
 * <a class="noanim" href="{{ category.url }}" data-loader-param-key="category" data-loader-param="all" data-loader-param-selected>All</a>
 *
 *
 * You can also set a target for the canvas if the category selector and canvas are in different modules:
 *
 * Option 1 (legacy): Using data-loader-canvas-target
 * <div data-loader="/api/posts" data-loader-id="news" data-loader-canvas-target="#news-canvas">
 * <div data-loader-canvas id="news-canvas">
 *
 * Option 2 (recommended): Using data-loader-canvas-for
 * <div data-loader="/api/posts" data-loader-id="news">
 * <div data-loader-canvas data-loader-canvas-for="news">
 *
 * And if the "more" button is outside the loader element, use data-loader-more-for:
 * <button data-loader-more-for="news">Load more</button>
 */

/**
 * @typedef {Object} DataloaderOptions
 * @property {number} page - Starting page index for pagination
 * @property {Object} loaderParam - Initial parameter key/value pairs for API requests
 * @property {string} filter - Initial search filter string
 * @property {number} filterDebounce - Debounce delay in ms for filter input
 * @property {Object|null} urlSync - URL sync config keyed by loader ID
 * @property {function} onFetch - Callback after fetch completes, receives dataloader instance
 */
const activeLoaders = new Set()

function requireSuccess(response) {
  if (!response.ok) throw new Error('HTTP ' + response.status)
  return response
}

const DEFAULT_OPTIONS = {
  page: 0,
  filter: '',
  filterDebounce: 650,
  urlSync: null,
  onFetch: dataloader => {
    /**
     * Called after new markup is committed. For observer-based lazy loading,
     * reuse the existing Lazyload instance with lazyload.observe(dataloader.$canvasEl).
     */
  },
}

export default class Dataloader {
  constructor(app, $el, opts = {}) {
    this.status = 'available'
    this.app = app
    this.$el = $el
    this.id = $el.dataset.loaderId

    if ($el.hasAttribute('data-loader-canvas-target')) {
      this.$canvasEl = find($el.getAttribute('data-loader-canvas-target'))
    } else {
      this.$canvasEl = find($el, '[data-loader-canvas]')
    }

    // Support new pattern: data-loader-canvas-for
    if (!this.$canvasEl && this.id) {
      this.$canvasEl = find(`[data-loader-canvas-for="${this.id}"]`)
    }

    if (!this.$canvasEl) {
      throw new Error('No canvas element found.')
    }
    this.opts = applyDefaults(opts, { ...DEFAULT_OPTIONS, loaderParam: {} })
    this.initialize()
  }

  /**
   * Replace an element's innerHTML with content fetched from a URL
   *
   * @param {HTMLElement} el - Target element
   * @param {string} url - URL to fetch HTML from
   * @returns {Promise<HTMLElement>} The element with updated content
   */
  static replaceInnerHTML(el, url) {
    return fetch(url)
      .then(requireSuccess)
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html
        return el
      })
  }

  debounce(func, delay) {
    let timerId
    const debounced = (...args) => {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
    debounced.cancel = () => clearTimeout(timerId)
    return debounced
  }

  updateBaseURL(url) {
    this.baseURL = url
  }

  setInitialParams() {
    for (const el of this.$paramEls) {
      if (el.type === 'checkbox') {
        this.handleCheckboxParam(el)
      } else if (el.hasAttribute('data-loader-param-selected')) {
        if (el.hasAttribute('data-loader-param-multi')) this.handleMultiSelectParam(el)
        else this.opts.loaderParam[this.getParamKey(el)] = el.dataset.loaderParam
      }
    }
  }

  initialize() {
    this.baseURL = this.$el.dataset.loader
    this.$paramEls = all(this.$el, '[data-loader-param]')

    // Store bound handlers for cleanup in destroy()
    this._boundOnParam = this.onParam.bind(this)
    this._boundOnMore = this.onMore.bind(this)
    this._boundOnFilter = this.debounce(this.onFilterInput.bind(this), this.opts.filterDebounce)

    this.setInitialParams()

    // Initialize URL sync if config exists for this dataloader ID
    if (this.opts.urlSync?.[this.id]) {
      this.urlSync = new DataloaderUrlSync(this, this.opts.urlSync[this.id])
    }

    if (this.urlSync && this.opts.urlSync[this.id].updateOnInit !== false) {
      this.urlSync.updateUrl(this.opts.loaderParam)
    }

    this.$paramEls.forEach($paramEl => {
      $paramEl.addEventListener('click', this._boundOnParam)
    })

    this.$moreBtn = find(this.$el, '[data-loader-more]')

    if (!this.$moreBtn && this.id) {
      this.$moreBtn = find(`[data-loader-more-for="${this.id}"]`)
    }

    if (this.$moreBtn) {
      this.$moreBtn.addEventListener('click', this._boundOnMore)
    }

    this.$filterInput = find(this.$el, '[data-loader-filter]')

    if (!this.$filterInput && this.id) {
      this.$filterInput = find(`[data-loader-filter-for="${this.id}"]`)
    }

    if (this.$filterInput) {
      this.$filterInput.addEventListener('input', this._boundOnFilter)
    }
  }

  onFilterInput(e) {
    e.preventDefault()
    this.opts.filter = this.$filterInput.value
    this.fetch(false, 0)
  }

  onMore(e) {
    e.preventDefault()
    if (this._abortController) return
    if (this.replacementPage != null) this.fetch(false, this.replacementPage)
    else if (this.status !== 'starved') this.fetch(true, this.opts.page + 1)
  }

  getParamKey(el) {
    return el.dataset.loaderParamKey || 'defaultParam'
  }

  handleCheckboxParam(el) {
    const key = this.getParamKey(el)
    this.opts.loaderParam[key] = el.checked
  }

  handleDeselectParam(el, multiVals) {
    const key = this.getParamKey(el)
    if (multiVals) {
      this.opts.loaderParam[key] = this.opts.loaderParam[key].filter(val => {
        return val !== el.dataset.loaderParam
      })
    } else {
      delete this.opts.loaderParam[key]
    }
    el.removeAttribute('data-loader-param-selected')
  }

  handleMultiSelectParam(el) {
    const key = this.getParamKey(el)
    const current = this.opts.loaderParam[key]
    const values = Array.isArray(current) ? current : current == null ? [] : [current]
    this.opts.loaderParam[key] = [...new Set([...values, el.dataset.loaderParam])]
    el.setAttribute('data-loader-param-selected', '')
  }

  handleSingleSelectParam(el) {
    const key = this.getParamKey(el)
    for (const other of this.$paramEls) {
      if (this.getParamKey(other) === key) other.removeAttribute('data-loader-param-selected')
    }
    el.setAttribute('data-loader-param-selected', '')
    this.opts.loaderParam[key] = el.dataset.loaderParam
  }

  onParam(e) {

    const el = e.currentTarget
    const multiVals = el.hasAttribute('data-loader-param-multi')

    if (el.getAttribute('type') === 'checkbox') {
      this.handleCheckboxParam(el)
    } else {
      e.preventDefault()
      if (el.hasAttribute('data-loader-param-selected')) {
        this.handleDeselectParam(el, multiVals)
      } else if (multiVals) {
        this.handleMultiSelectParam(el)
      } else {
        this.handleSingleSelectParam(el)
      }
    }

    // Update URL if sync is enabled
    if (this.urlSync) {
      this.urlSync.updateUrl(this.opts.loaderParam)
    }

    this.fetch(false, 0)
  }

  async fetch(addEntries = false, page = this.opts.page) {
    this._abortController?.abort()
    const controller = this._abortController = new AbortController()
    if (!addEntries) this.replacementPage = page
    this.loading()
    const { defaultParam, ...params } = this.opts.loaderParam
    const query = new URLSearchParams({ filter: this.opts.filter, ...params })
    const prefix = defaultParam ? encodeURIComponent(defaultParam) + '/' : ''
    try {
      const res = requireSuccess(await fetch(
        this.baseURL + '/' + prefix + page + '?' + query, { signal: controller.signal }
      ))
      const html = await res.text()
      if (controller.signal.aborted) return
      if (addEntries) this.$canvasEl.insertAdjacentHTML('beforeend', html)
      else this.$canvasEl.innerHTML = html
      this.replacementPage = null
      this.opts.page = page
      this.status = res.headers.get('jpt-dataloader') || 'available'
      this.updateButton()
      this.opts.onFetch(this)
    } catch (error) {
      if (!controller.signal.aborted) console.error('Dataloader fetch failed', error)
    } finally {
      if (this._abortController === controller) {
        this._abortController = null
        this.complete()
      }
    }
  }

  /**
   * Set [data-loader-loading] on main el
   */
  loading() {
    activeLoaders.add(this)
    document.documentElement.setAttribute('data-loading', '')
    this.$el.setAttribute('data-loader-loading', '')
  }

  /**
   * Remove [data-loader-loading] on main el
   */
  complete() {
    this.$el.removeAttribute('data-loader-loading')
    activeLoaders.delete(this)
    if (!activeLoaders.size) document.documentElement.removeAttribute('data-loading')
  }

  /**
   * Update the MORE button
   *
   * Sets [data-loader-starved] attribute if there is no more to fetch
   */
  updateButton() {
    if (!this.$moreBtn) {
      return
    }

    if (this.status === 'starved') {
      this.$moreBtn.setAttribute('data-loader-starved', '')
    } else {
      this.$moreBtn.removeAttribute('data-loader-starved')
    }
  }

  /**
   * Remove all event listeners and clean up resources
   */
  destroy() {
    this._boundOnFilter.cancel()
    // Abort any in-flight fetch
    if (this._abortController) {
      this._abortController.abort()
    }

    // Remove param listeners
    this.$paramEls.forEach($paramEl => {
      $paramEl.removeEventListener('click', this._boundOnParam)
    })

    // Remove more button listener
    if (this.$moreBtn) {
      this.$moreBtn.removeEventListener('click', this._boundOnMore)
    }

    // Remove filter input listener
    if (this.$filterInput) {
      this.$filterInput.removeEventListener('input', this._boundOnFilter)
    }

    // Clean up URL sync
    if (this.urlSync) {
      this.urlSync.destroy()
    }

    // Remove loading state
    this.complete()
  }
}
