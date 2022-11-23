import Dom from '../Dom'
import _defaultsDeep from 'lodash.defaultsdeep'

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
 */

const DEFAULT_OPTIONS = {
  page: 0,
  loaderParam: 'all',
  filter: '',
  onFetch: dataloader => {
    /**
     * Called after fetch complete. Do your DOM manipulation here
     *
     * Example:
     *
     *    const mw = new Moonwalk(dataloader.app, configureMoonwalk(dataloader.app), dataloader.$el)
     *    new Lazyload(dataloader.app, { useNativeLazyloadIfAvailable: false }, dataloader.$el)
     *    new EqualHeightImages(dataloader.app, {}, dataloader.$el)
     *    mw.ready()
     */
  }
}

export default class Dataloader {
  constructor(app, $el, opts = {}) {
    this.status = 'available'
    this.app = app
    this.$el = $el
    this.$canvasEl = Dom.find($el, '[data-loader-canvas]')
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.initialize()
  }

  debounce(func, delay = 650) {
    let timerId
    return (...args) => {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }

  initialize() {
    this.baseURL = this.$el.dataset.loader
    this.$paramEls = Dom.all(this.$el, '[data-loader-param]')

    this.$paramEls.forEach($paramEl => {
      $paramEl.addEventListener('click', this.onParam.bind(this))
    })

    this.$moreBtn = Dom.find(this.$el, '[data-loader-more]')

    if (this.$moreBtn) {
      this.$moreBtn.addEventListener('click', this.onMore.bind(this))
    }

    this.$filterInput = Dom.find(this.$el, '[data-loader-filter]')

    if (!this.$filterInput && this.$el.dataset.loaderId) {
      this.id = this.$el.dataset.loaderId
      this.$filterInput = Dom.find(`[data-loader-filter-for="${this.id}"]`)
    }

    if (this.$filterInput) {
      this.$filterInput.addEventListener('input', this.debounce(this.onFilterInput.bind(this)))
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

  onParam(e) {
    e.preventDefault()
    this.loading()
    // reset page when switching param!
    this.opts.page = 0
    this.$paramEls.forEach($paramEl => $paramEl.removeAttribute('data-loader-param-selected'))
    e.currentTarget.setAttribute('data-loader-param-selected', '')
    this.opts.loaderParam = e.currentTarget.dataset.loaderParam
    this.fetch()
  }

  fetch(addEntries = false) {
    const param = this.opts.loaderParam
    const filter = this.opts.filter

    fetch(`${this.baseURL}/${param}/${this.opts.page}?` + new URLSearchParams({ filter }))
      .then(res => {
        this.status = res.headers.get('jpt-dataloader') || 'available'
        this.updateButton()
        return res.text()
      })
      .then(html => {
        if (addEntries) {
          this.$canvasEl.innerHTML += html
        } else {
          this.$canvasEl.innerHTML = html
        }
        this.opts.onFetch(this)
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
}
