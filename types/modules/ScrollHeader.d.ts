/**
 * Scroll behavior shared by fixed and sticky navigation headers.
 */
export default class ScrollHeader extends HeaderState {
    /**
     * Create a new ScrollHeader instance
     * @param {Object} app - Application instance
     * @param {ScrollHeaderOptions} [opts={}] - ScrollHeader options
     */
    constructor(app: any, opts?: ScrollHeaderOptions);
    app: any;
    _rawSections: any;
    mainOpts: any;
    el: any;
    opts: any;
    lis: any;
    _firstLoad: boolean;
    _pinned: boolean;
    _small: boolean;
    _altBg: boolean;
    _isResizing: boolean;
    _hiding: boolean;
    lastKnownScrollY: number;
    lastKnownScrollHeight: number;
    currentScrollHeight: number;
    currentScrollY: number;
    mobileMenuOpen: boolean;
    timer: any;
    resetResizeTimer: any;
    scrollSettleTimeout: number;
    intersectingElements: any[];
    initialize(): void;
    pageIsScrolledOnReady: boolean;
    resolveOffsets(): void;
    preflight(): void;
    revealTimer: number;
    isScrolled(): boolean;
    unpinIfScrolled(): void;
    enter(): void;
    setResizeTimer(): void;
    update(): void;
    checkBg(force: any): void;
    checkPin(force: any, toleranceExceeded: any): void;
    redraw(): void;
    unpin(): void;
    pin(): void;
    notSmall(): void;
    small(): void;
    notAltBg(): void;
    altBg(): void;
    shouldUnpin(toleranceExceeded: any): any;
    shouldPin(toleranceExceeded: any): any;
    _bindMobileMenuListeners(): void;
    _onMobileMenuOpen(): void;
    _onMobileMenuClose(): void;
}
export type ScrollHeaderEvents = {
    /**
     * - Called when header is pinned
     */
    onPin?: Function;
    /**
     * - Called when header is unpinned
     */
    onUnpin?: Function;
    /**
     * - Called when alternate background is applied
     */
    onAltBg?: Function;
    /**
     * - Called when regular background is applied
     */
    onNotAltBg?: Function;
    /**
     * - Called when header becomes small
     */
    onSmall?: Function;
    /**
     * - Called when header becomes normal size
     */
    onNotSmall?: Function;
    /**
     * - Called when page is at the top
     */
    onTop?: Function;
    /**
     * - Called when page is not at the top
     */
    onNotTop?: Function;
    /**
     * - Called when page is at the bottom
     */
    onBottom?: Function;
    /**
     * - Called when page is not at the bottom
     */
    onNotBottom?: Function;
    /**
     * - Called when mobile menu opens
     */
    onMobileMenuOpen?: Function;
    /**
     * - Called when mobile menu closes
     */
    onMobileMenuClose?: Function;
    /**
     * - Called when header intersects with an element
     */
    onIntersect?: Function;
    /**
     * - Called when user tabs (outline mode)
     */
    onOutline?: Function;
};
export type ScrollHeaderSectionOptions = {
    /**
     * - Whether to unpin header on window resize
     */
    unPinOnResize?: boolean;
    /**
     * - Whether --header-height drops to 0 when the header unpins. Set false for a header that never retracts.
     */
    headerHeightTracksPin?: boolean;
    /**
     * - Scrolling element
     */
    canvas?: Window | HTMLElement;
    /**
     * - Selector for elements to check intersection with
     */
    intersects?: string | null;
    /**
     * - Called before header enters
     */
    beforeEnter?: Function;
    /**
     * - Called when header enters
     */
    enter?: Function;
    /**
     * - Delay before enter animation
     */
    enterDelay?: number;
    /**
     * - Scroll tolerance before triggering hide/show
     */
    tolerance?: number;
    /**
     * - Offset from top before triggering hide
     */
    offset?: number | string | Function;
    /**
     * - Offset from top before shrinking header
     */
    offsetSmall?: number | string | Function;
    /**
     * - Offset from top before changing background color
     */
    offsetBg?: number | string | Function;
    /**
     * - Regular background color
     */
    regBgColor?: string | null;
    /**
     * - Alternate background color
     */
    altBgColor?: string | null;
};
export type ScrollHeaderOptions = {
    /**
     * - Header element or selector
     */
    el?: string | HTMLElement;
    /**
     * - Event to initialize on
     */
    on?: string;
    /**
     * - Whether to unpin on forced scroll start
     */
    unpinOnForcedScrollStart?: boolean;
    /**
     * - Whether to pin on forced scroll end
     */
    pinOnForcedScrollEnd?: boolean;
    /**
     * - Whether to ignore forced scroll events
     */
    ignoreForcedScroll?: boolean;
    /**
     * - Whether to use requestAnimationFrame for scrolling
     */
    rafScroll?: boolean;
    /**
     * - Default options for all sections
     */
    default?: ScrollHeaderSectionOptions;
    /**
     * - Section-specific options
     */
    sections?: {
        [x: string]: ScrollHeaderSectionOptions;
    };
};
import HeaderState from './HeaderState';
