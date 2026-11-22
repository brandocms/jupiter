import ScrollHeader from '../ScrollHeader'

/** @typedef {import('../ScrollHeader').ScrollHeaderOptions} FixedHeaderOptions */
/** @typedef {import('../ScrollHeader').ScrollHeaderEvents} FixedHeaderEvents */
/** @typedef {import('../ScrollHeader').ScrollHeaderSectionOptions} FixedHeaderSectionOptions */

/**
 * A header that stays fixed. Hides when scrolling down and is revealed on scrolling up.
 *
 * @example
 * new FixedHeader(app, {
 *   el: 'header[data-nav]',
 *   default: { offset: 60, offsetSmall: 1, offsetBg: 200 },
 *   sections: { index: { offsetBg: '#content' } }
 * })
 */
export default class FixedHeader extends ScrollHeader {
  /**
   * Reconfigure the header for a new section/page.
   * Call this after a view transition or SPA navigation
   * to re-resolve section options and reset scroll state.
   */
  reconfigure() {
    const section = document.body.getAttribute('data-script')

    // Build a fresh opts object from raw sections so function
    // offsets that were previously resolved to numbers are restored
    const freshOpts = {
      ...this.mainOpts,
      sections: Object.fromEntries(
        Object.entries(this._rawSections).map(([k, v]) => [k, { ...v }])
      )
    }
    this.opts = this._getOptionsForSection(section, freshOpts)

    this.resolveOffsets()

    // Reset scroll tracking to prevent the scroll-height-change
    // guard from bailing out after content swap
    this.lastKnownScrollY = this.getScrollY()
    this.lastKnownScrollHeight = document.body.scrollHeight
    this.currentScrollY = this.lastKnownScrollY
    this.currentScrollHeight = this.lastKnownScrollHeight

    // Re-check current state
    this.checkSize(true)
    this.checkBg(true)
    this.checkTop(true)
  }
}
