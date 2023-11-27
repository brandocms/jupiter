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
 * You can set a custom key for each param:
 *
 * <a class="noanim" href="{{ category.url }}" data-loader-param-key="category" data-loader-param="all" data-loader-param-selected>All</a>
 *
 *
 * You can also set a target for the canvas if the category selector and canvas are in different modules:
 *
 * <div data-loader="/api/posts" data-loader-id="news" data-loader-canvas-target="#news-canvas">
 *
 * <div data-loader-canvas id="#news-canvas">
 */

const DEFAULT_OPTIONS = {
  page: 0,
  loaderParam: {},
  filter: '',
  onFetch: dataloader => {
    /**
     * Called after fetch complete. Do your DOM manipulation here
     *
     * Example:
     *
     *    const mw = new Moonwalk(dataloader.app, configureMoonwalk(dataloader.app), dataloader.$canvasEl)
     *    new Lazyload(dataloader.app, { useNativeLazyloadIfAvailable: false }, dataloader.$canvasEl)
     *    new EqualHeightImages(dataloader.app, {}, dataloader.$canvasEl)
     *    mw.ready()
     */
  }
}

export default class Dataloader {
  constructor(app, $el, opts = {}) {
    this.status = 'available'
    this.app = app
    this.$el = $el
    if ($el.hasAttribute('data-loader-canvas-target')) {
      this.$canvasEl = Dom.find($el.getAttribute('data-loader-canvas-target'))
    } else {
      this.$canvasEl = Dom.find($el, '[data-loader-canvas]')
    }
    this.opts = _defaultsDeep(opts, DEFAULT_OPTIONS)
    this.initialize()
  }

  static replaceInnerHTML(el, url) {
    return new Promise(resolve => {
      fetch(url)
        .then(res => {
          return res.text()
        })
        .then(html => {
          el.innerHTML = html
          return resolve(html)
        })
    })
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
    const paramKey = e.currentTarget.dataset.loaderParamKey
    this.$paramEls.forEach($paramEl => {
      if (paramKey) {
        if ($paramEl.dataset.loaderParamKey === paramKey) {
          $paramEl.removeAttribute('data-loader-param-selected')
        }
      } else {
        $paramEl.removeAttribute('data-loader-param-selected')
      }
    })
    e.currentTarget.setAttribute('data-loader-param-selected', '')
    const key = e.currentTarget.dataset.loaderParamKey || 'defaultParam'
    this.opts.loaderParam[key] = e.currentTarget.dataset.loaderParam

    this.fetch()
  }

  fetch(addEntries = false) {
    const { defaultParam, ...otherParams } = this.opts.loaderParam
    const filter = this.opts.filter

    fetch(
      `${this.baseURL}/${defaultParam ? defaultParam + '/' : ''}${this.opts.page}?` +
        new URLSearchParams({ filter, ...otherParams })
    )
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
