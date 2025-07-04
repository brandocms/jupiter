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
    
    this.initialize()
  }
  
  initialize() {
    // Set initial state from URL
    this.syncFromUrl()
    
    // Listen for browser navigation
    this.popstateHandler = () => {
      this.syncFromUrl()
      this.dataloader.fetch()
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
    
    const template = this.config.templates[this.language] || 
                    this.config.templates[this.defaultLanguage] || 
                    Object.values(this.config.templates)[0] // Fallback to first template
    
    if (!template) {
      console.error('No URL template found for dataloader:', this.dataloader.id)
      return window.location.pathname
    }
    
    // Replace tokens in template
    let url = template
    Object.entries(params).forEach(([key, value]) => {
      // Check if this value should be omitted from URL for the current language
      const omitValues = this.omitFromUrl[this.language] || this.omitFromUrl[this.defaultLanguage] || []
      const shouldOmit = !value || omitValues.includes(value)
      
      url = url.replace(`:${key}`, shouldOmit ? '' : value)
    })
    
    // Clean up any remaining tokens and trailing slashes
    url = url.replace(/\/:[^\/]+/g, '')
    url = url.replace(/\/+$/, '') // Remove trailing slashes
    
    // Ensure we don't end up with empty path
    if (!url || url === '') {
      url = template.split(':')[0].replace(/\/+$/, '') || '/'
    }
    
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
    
    const template = this.config.templates[this.language] || 
                    this.config.templates[this.defaultLanguage] || 
                    Object.values(this.config.templates)[0]
    
    if (!template) {
      return {}
    }
    
    let path = window.location.pathname
    
    // Strip language prefix if configured
    if (this.languageInPath) {
      const langPrefix = `/${this.language}/`
      if (path.startsWith(langPrefix)) {
        path = path.substring(langPrefix.length - 1)
      } else if (this.hideDefaultLanguage && path.startsWith('/')) {
        // Path might not have language prefix if it's the default language
        // Continue with the path as-is
      }
    }
    
    // Convert template to regex pattern
    // First escape special regex characters (except for our tokens)
    let pattern = template.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    
    // Extract parameter names from template
    const paramNames = []
    pattern = pattern.replace(/:(\w+)/g, (match, paramName) => {
      paramNames.push(paramName)
      return '([^/]+)'
    })
    
    // Make trailing parameters optional by replacing them with optional groups
    const templateParts = template.split('/')
    const pathParts = path.split('/')
    
    // If path is shorter than template, try matching partial patterns
    if (pathParts.length <= templateParts.length) {
      const partialTemplate = templateParts.slice(0, pathParts.length).join('/')
      let partialPattern = partialTemplate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const partialParamNames = []
      partialPattern = partialPattern.replace(/:(\w+)/g, (match, paramName) => {
        partialParamNames.push(paramName)
        return '([^/]+)'
      })
      
      const partialRegex = new RegExp(`^${partialPattern}$`)
      const partialMatch = path.match(partialRegex)
      
      if (partialMatch) {
        // Build params object from partial matches
        const params = {}
        partialParamNames.forEach((name, index) => {
          if (partialMatch[index + 1]) {
            params[name] = decodeURIComponent(partialMatch[index + 1])
          }
        })
        return params
      }
    }
    
    // Try full pattern match
    const regex = new RegExp(`^${pattern}$`)
    const match = path.match(regex)
    
    if (!match) {
      return {}
    }
    
    // Build params object from matches
    const params = {}
    paramNames.forEach((name, index) => {
      if (match[index + 1]) {
        params[name] = decodeURIComponent(match[index + 1])
      }
    })
    
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
        url
      )
    }
  }
  
  /**
   * Sync dataloader parameters from current URL
   */
  syncFromUrl() {
    const params = this.parseUrl()
    
    // Clear all current selections first
    this.dataloader.$paramEls.forEach($el => {
      $el.removeAttribute('data-loader-param-selected')
    })
    
    // Clear internal state
    this.dataloader.opts.loaderParam = {}
    
    // Update dataloader parameters from URL
    Object.entries(params).forEach(([key, value]) => {
      // Find the corresponding data-loader-param element
      const $paramEl = this.dataloader.$paramEls.find($el => {
        const paramKey = $el.dataset.loaderParamKey || 'defaultParam'
        return paramKey === key && $el.dataset.loaderParam === value
      })
      
      
      if ($paramEl) {
        // Mark as selected
        $paramEl.setAttribute('data-loader-param-selected', '')
      }
      
      // Always update internal state, even if no UI element found
      // This ensures the API gets the parameter for filtering
      if (key === 'defaultParam') {
        this.dataloader.opts.loaderParam.defaultParam = value
      } else {
        this.dataloader.opts.loaderParam[key] = value
      }
    })
    
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