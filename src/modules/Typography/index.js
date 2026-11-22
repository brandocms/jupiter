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

    const root = parent || document
    const elements = new Set(root.querySelectorAll(this.settings.selector))
    for (const container of root.querySelectorAll('[data-typo-children]')) {
      for (const child of container.children) elements.add(child)
    }
    this.elems = [...elements]
    this.edits = new Map()
    this.apply()
  }

  /**
   * Apply formatting to the loaded elements
   * @return void
   */
  apply() {
    for (const el of this.elems) {
      if (this.shouldElementBeIgnored(el)) continue
      const text = el.textContent
      const boundary = /([^\S\u00a0]+)\S+\s*$/.exec(text)
      if (!boundary || text.trim().split(/\s+/).length < this.settings.minWords) continue

      // The last word and its preceding whitespace may occupy different inline nodes.
      const start = boundary.index
      const end = start + boundary[1].length
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
      let offset = 0
      for (let node = walker.nextNode(); node && offset < end; node = walker.nextNode()) {
        const original = node.data
        const next = offset + original.length
        if (next > start && offset < end) {
          const from = Math.max(0, start - offset)
          node.replaceData(from, Math.min(next, end) - offset - from, offset <= start ? '\u00a0' : '')
          this.edits.set(node, { original, formatted: node.data })
        }
        offset = next
      }
    }
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
    for (const [node, { original, formatted }] of this.edits) {
      if (node.data === formatted) node.data = original
    }
    this.edits.clear()
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
    if (this.settings.ignoreExistingSpaceChars && elem.textContent.includes('\u00a0')) {
      return true
    }

    // Check if the element has the ignore class
    if (elem.classList.contains(this.settings.ignoreClass)) {
      return true
    }

    return false
  }
}
