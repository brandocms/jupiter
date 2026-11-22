import ScrollHeader from '../ScrollHeader'

/** @typedef {import('../ScrollHeader').ScrollHeaderOptions} StickyHeaderOptions */
/** @typedef {import('../ScrollHeader').ScrollHeaderEvents} StickyHeaderEvents */
/** @typedef {import('../ScrollHeader').ScrollHeaderSectionOptions} StickyHeaderSectionOptions */

/**
 * A header that uses position: sticky. Hides when scrolling down and is revealed on scrolling up.
 * Unlike FixedHeader, the sticky header stays in document flow - when hidden via transform,
 * its space is still reserved.
 *
 * @example
 * new StickyHeader(app, {
 *   el: 'header[data-nav]',
 *   default: { offset: 60, offsetSmall: 1, offsetBg: 200 },
 *   sections: { index: { offsetBg: '#content' } }
 * })
 */
export default class StickyHeader extends ScrollHeader {}
