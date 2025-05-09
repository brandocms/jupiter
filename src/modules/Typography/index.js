/**
 * @typedef {Object} TypographySettings
 * @property {number} [minWords=4] - Minimum number of words required to apply fixes
 * @property {string} [selector='[data-typo]'] - Selector for elements to process
 * @property {string} [ignoreClass='no-typo-fix'] - Class to exclude elements from processing
 * @property {boolean} [ignoreExistingSpaceChars=false] - Whether to ignore elements with existing non-breaking spaces
 */

/**
 * Typography class for enhancing text presentation, including orphan prevention
 */
export default class Typography {
  /**
   * Create a new Typography instance
   * @param {HTMLElement|undefined} parent - Parent element to search for typography elements, or undefined for document
   * @param {TypographySettings} settings - Typography settings
   */
  constructor(parent, settings = {}) {
    // Set some settings, by merging defaults and passed settings
    this.settings = {
      minWords: 4,
      selector: '[data-typo]',
      ignoreClass: 'no-typo-fix',
      ignoreExistingSpaceChars: false,
      ...settings
    }

    this.elems = []

    // Either load from root or the passed parent element
    if (typeof parent === 'undefined') {
      this.elems = [...this.elems, ...document.querySelectorAll(this.settings.selector)]
    } else {
      this.elems = [...this.elems, ...parent.querySelectorAll(this.settings.selector)]
    }

    // load children
    const typoParents = document.querySelectorAll('[data-typo-children]')
    typoParents.forEach(typoParent => {
      this.elems = [...this.elems, ...typoParent.children]
    })

    this.apply()
  }

  /**
   * Apply formatting to the loaded elements
   * @return void
   */
  apply() {
    this.elems.map(elem => {
      // Run the ignore checker nd bail if required
      if (this.shouldElementBeIgnored(elem)) {
        return false
      }

      // The result string will be tacked on to this
      let result = ''

      // Split words/tags into array
      let textItems = elem.innerHTML
        .trim()
        .replace(/&nbsp;/g, ' ')
        .split(/ (?=[^>]*(?:<|$))/)

      // Check if the text warrants this module
      if (textItems.length < this.settings.minWords) {
        return false
      }

      // Run orphans filter
      textItems = this.preventOrphans(textItems)

      // Join the words back together
      result = textItems.join(' ')

      // Replace whitespace after no break spaces
      result = result.replace(/&nbsp; /g, '&nbsp;')

      // Set the content of the element with our shiny string
      elem.innerHTML = result

      return true
    })
  }

  /**
   * Apply the orphans filter to the passed text and return it
   * @param {string} textItems
   */
  preventOrphans(textItems) {
    // Find the second to last work
    const targetWord = textItems[textItems.length - 2]

    // Stick a no break space to the end of the word and replace the instance in the array
    textItems[textItems.length - 2] = `${targetWord}&nbsp;`

    return textItems
  }

  /**
   * Reset any formatting
   * @return void
   */
  reset() {
    this.elems.map(elem => {
      // Run the ignore checker nd bail if required
      if (this.shouldElementBeIgnored(elem)) {
        return false
      }

      elem.innerHTML = elem.innerHTML.replace(/&nbsp;/g, ' ')
      return true
    })
  }

  /**
   * Run checks to see if the passed element should be skipped
   *
   * @param {HTMLElement} elem
   * @returns boolean
   */
  shouldElementBeIgnored(elem) {
    // Check if the element already contains 1 or more &nbsp; characters and the
    // ignore setting is true. If so: bail.
    if (elem.innerHTML.indexOf('&nbsp;') > -1 && this.settings.ignoreExistingSpaceChars) {
      return true
    }

    // Check if the element has the ignore class
    if (elem.classList.contains(this.settings.ignoreClass)) {
      return true
    }

    return false
  }
}
