import Dom from '../Dom'
import _defaultsDeep from 'lodash.defaultsdeep'
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
const DEFAULT_OPTIONS = {
  page: 0,
  loaderParam: {},
  filter: '',
  filterDebounce: 650,
  urlSync: null,
  onFetch: dataloader => {
    /**
     * Called after fetch complete. Do your DOM manipulation here
     *
     * Example:
     *
     *
     *    const mw = new Moonwalk(dataloader.app, configureMoonwalk(dataloader.app), dataloader.$canvasEl)
     *    new Lazyload(dataloader.app, { useNativeLazyloadIfAvailable: false }, dataloader.$canvasEl)
     *    new EqualHeightImages(dataloader.app, {}, dataloader.$canvasEl)
     *    mw.ready()
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
      this.$canvasEl = Dom.find($el.getAttribute('data-loader-canvas-target'))
    } else {
      this.$canvasEl = Dom.find($el, '[data-loader-canvas]')
    }

    // Support new pattern: data-loader-canvas-for
    if (!this.$canvasEl && this.id) {
      this.$canvasEl = Dom.find(`[data-loader-canvas-for="${this.id}"]`)
    }

    if (!this.$canvasEl) {
      throw new Error('No canvas element found.')
    }
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
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
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html
        return el
      })
  }

  debounce(func, delay) {
    let timerId
    return (...args) => {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }

  updateBaseURL(url) {
    this.baseURL = url
  }

  setInitialParams() {
    // Set initial parameters from pre-selected elements
    this.$paramEls.forEach($paramEl => {
      if ($paramEl.hasAttribute('data-loader-param-selected')) {
        const key = $paramEl.dataset.loaderParamKey || 'defaultParam'
        this.opts.loaderParam[key] = $paramEl.dataset.loaderParam
      }
    })
    
    // Update URL with initial params if URL sync is enabled
    if (this.urlSync && this.opts.urlSync[this.id].updateOnInit !== false) {
      this.urlSync.updateUrl(this.opts.loaderParam)
    }
  }

  initialize() {
    this.baseURL = this.$el.dataset.loader
    this.$paramEls = Dom.all(this.$el, '[data-loader-param]')

    // Store bound handlers for cleanup in destroy()
    this._boundOnParam = this.onParam.bind(this)
    this._boundOnMore = this.onMore.bind(this)
    this._boundOnFilter = this.debounce(this.onFilterInput.bind(this), this.opts.filterDebounce)

    // Initialize URL sync if config exists for this dataloader ID
    if (this.opts.urlSync?.[this.id]) {
      this.urlSync = new DataloaderUrlSync(this, this.opts.urlSync[this.id])
    }

    // Set initial parameters from pre-selected elements
    this.setInitialParams()

    this.$paramEls.forEach($paramEl => {
      $paramEl.addEventListener('click', this._boundOnParam)
    })

    this.$moreBtn = Dom.find(this.$el, '[data-loader-more]')

    if (!this.$moreBtn && this.id) {
      this.$moreBtn = Dom.find(`[data-loader-more-for="${this.id}"]`)
    }

    if (this.$moreBtn) {
      this.$moreBtn.addEventListener('click', this._boundOnMore)
    }

    this.$filterInput = Dom.find(this.$el, '[data-loader-filter]')

    if (!this.$filterInput && this.id) {
      this.$filterInput = Dom.find(`[data-loader-filter-for="${this.id}"]`)
    }

    if (this.$filterInput) {
      this.$filterInput.addEventListener('input', this._boundOnFilter)
    }
  }

  onFilterInput(e) {
    e.preventDefault()
    this.loading()
    this.opts.page = 0
    this.opts.filter = this.$filterInput.value
    this.fetch(false)
  }

  onMore(e) {
    e.preventDefault()
    this.loading()
    this.opts.page += 1
    this.fetch(true)
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
    if (!Object.hasOwn(this.opts.loaderParam, key)) {
      this.opts.loaderParam[key] = []
    }
    this.opts.loaderParam[key].push(el.dataset.loaderParam)
    el.setAttribute('data-loader-param-selected', '')
  }

  handleSingleSelectParam(el) {
    const paramKey = el.dataset.loaderParamKey
    this.$paramEls.forEach($paramEl => {
      if (paramKey) {
        if ($paramEl.dataset.loaderParamKey === paramKey) {
          $paramEl.removeAttribute('data-loader-param-selected')
        }
      } else {
        $paramEl.removeAttribute('data-loader-param-selected')
      }
    })
    el.setAttribute('data-loader-param-selected', '')
    const key = this.getParamKey(el)
    this.opts.loaderParam[key] = el.dataset.loaderParam
  }

  onParam(e) {
    this.loading()
    this.opts.page = 0

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

    this.fetch()
  }

  fetch(addEntries = false) {
    // Cancel any in-flight request to prevent race conditions
    if (this._abortController) {
      this._abortController.abort()
    }
    this._abortController = new AbortController()

    const { defaultParam, ...otherParams } = this.opts.loaderParam
    const filter = this.opts.filter

    const fetchUrl = `${this.baseURL}/${defaultParam ? defaultParam + '/' : ''}${this.opts.page}?` +
        new URLSearchParams({ filter, ...otherParams })

    fetch(fetchUrl, { signal: this._abortController.signal })
      .then(res => {
        this.status = res.headers.get('jpt-dataloader') || 'available'
        this.updateButton()
        return res.text()
      })
      .then(html => {
        if (addEntries) {
          this.$canvasEl.insertAdjacentHTML('beforeend', html)
        } else {
          this.$canvasEl.innerHTML = html
        }
        this.opts.onFetch(this)
        this.complete()
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        console.error(`Dataloader[${this.id}] fetch error:`, err)
        this.complete()
      })
  }

  /**
   * Set [data-loader-loading] on main el
   */
  loading() {
    document.documentElement.setAttribute('data-loading', '')
    this.$el.setAttribute('data-loader-loading', '')
  }

  /**
   * Remove [data-loader-loading] on main el
   */
  complete() {
    this.$el.removeAttribute('data-loader-loading')
    document.documentElement.removeAttribute('data-loading')
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
