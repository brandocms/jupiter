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
    reconfigure(): void;
}
export type FixedHeaderOptions = import("../ScrollHeader").ScrollHeaderOptions;
export type FixedHeaderEvents = import("../ScrollHeader").ScrollHeaderEvents;
export type FixedHeaderSectionOptions = import("../ScrollHeader").ScrollHeaderSectionOptions;
import ScrollHeader from '../ScrollHeader';
