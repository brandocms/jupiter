/**
 * URL synchronization module for Dataloader
 * Handles bidirectional sync between dataloader parameters and browser URL
 */
export default class DataloaderUrlSync {
  constructor(dataloader, config) {
    this.dataloader = dataloader
    this.config = config
    this.language = document.documentElement.lang || 'en'
    
    // Language handling options
    this.languageInPath = config.languageInPath || false
    this.hideDefaultLanguage = config.hideDefaultLanguage !== false // default true
    this.defaultLanguage = config.defaultLanguage || 'en'
    
    // Configure values that should be omitted from URLs (like "all" filters)
    this.omitFromUrl = config.omitFromUrl || {
      en: ['all'],
      no: ['alle'],
      // Add more languages as needed
    }
    
    const templates = config.templates || {}
    this.template = templates[this.language] || templates[this.defaultLanguage] || Object.values(templates)[0]
    this.parts = this.template?.split('/').map(part => {
      const tokens = part.split(/(:\w+)/)
      const keys = []
      const pattern = tokens.map(token => {
        if (token.startsWith(':')) {
          keys.push(token.slice(1))
          return '(.*?)'
        }
        return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      }).join('')
      return { tokens, keys, pattern: new RegExp('^' + pattern + '$') }
    })
    this.initialize()
  }
  
  initialize() {
    const initial = this.parseUrl()
    if (initial && Object.keys(initial).length) this.syncFromUrl(initial)
    
    // Listen for browser navigation
    this.popstateHandler = () => {
      this.syncFromUrl()
      this.dataloader.fetch(false, 0)
    }
    window.addEventListener('popstate', this.popstateHandler)
  }
  
  /**
   * Build URL from parameters using template
   */
  buildUrl(params) {
    // Use custom buildUrl function if provided
    if (typeof this.config.buildUrl === 'function') {
      return this.config.buildUrl(params, this.language, window.location.pathname)
    }
    
    if (!this.template) return window.location.pathname
    const omitted = this.omitFromUrl[this.language] || this.omitFromUrl[this.defaultLanguage] || []
    const renderToken = token => {
      if (!token.startsWith(':')) return token
      const value = params[token.slice(1)]
      if (value == null || value === false || omitted.includes(value)) return ''
      return (Array.isArray(value) ? value : [value]).map(encodeURIComponent).join(',')
    }
    let url = this.parts.map(part => part.tokens.map(renderToken).join('')).join('/').replace(/\/+$/, '') || '/'

    // Add language prefix if configured
    if (this.languageInPath) {
      const shouldAddLang = this.language !== this.defaultLanguage || !this.hideDefaultLanguage
      if (shouldAddLang && !url.startsWith(`/${this.language}/`)) {
        url = `/${this.language}${url}`
      }
    }
    
    return url
  }
  
  /**
   * Parse current URL and extract parameters based on template
   */
  parseUrl() {
    // Use custom parseUrl function if provided
    if (typeof this.config.parseUrl === 'function') {
      return this.config.parseUrl(window.location.pathname, this.language)
    }
    
    if (!this.parts) return {}
    let path = window.location.pathname
    if (this.languageInPath && path.startsWith('/' + this.language + '/')) {
      path = path.slice(this.language.length + 1)
    }
    const segments = path.replace(/\/+$/, '').split('/')
    if (segments.length > this.parts.length) return {}
    const params = Object.create(null)
    for (const [index, part] of this.parts.entries()) {
      const match = part.pattern.exec(segments[index] || '')
      if (!match) return {}
      for (const [i, key] of part.keys.entries()) {
        if (!match[i + 1]) continue
        try {
          const values = match[i + 1].split(',').map(decodeURIComponent)
          params[key] = values.length === 1 ? values[0] : values
        } catch {
          return {}
        }
      }
    }
    return params
  }

  /**
   * Update browser URL with current parameters
   */
  updateUrl(params) {
    const url = this.buildUrl(params)
    
    // Only update if URL actually changed
    if (url !== window.location.pathname) {
      history.pushState(
        { dataloaderId: this.dataloader.id, params }, 
        '', 
        url.startsWith('//') ? location.origin + url : url
      )
    }
  }
  
  /**
   * Sync dataloader parameters from current URL
   */
  syncFromUrl(params = this.parseUrl() || {}) {

    this.dataloader.opts.loaderParam = { ...params }
    for (const el of this.dataloader.$paramEls) {
      const key = this.dataloader.getParamKey(el)
      const value = params[key]
      let selected = false
      if (el.type === 'checkbox') {
        selected = value === true || value === 'true'
        el.checked = selected
        this.dataloader.opts.loaderParam[key] = selected
      } else if (el.hasAttribute('data-loader-param-multi')) {
        const values = Array.isArray(value) ? value : value == null ? [] : [value]
        this.dataloader.opts.loaderParam[key] = values
        selected = values.includes(el.dataset.loaderParam)
      } else {
        selected = el.dataset.loaderParam === value
      }
      el.toggleAttribute('data-loader-param-selected', selected)
    }
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    if (this.popstateHandler) {
      window.removeEventListener('popstate', this.popstateHandler)
    }
  }
}