/**
 * FixedHeader component for sticky navigation headers with scroll behaviors
 */
export default class FixedHeader {
    /**
     * Create a new FixedHeader instance
     * @param {Object} app - Application instance
     * @param {FixedHeaderOptions} [opts={}] - FixedHeader options
     */
    constructor(app: any, opts?: FixedHeaderOptions);
    app: any;
    mainOpts: any;
    el: any;
    opts: any;
    lis: any;
    preventPin: boolean;
    preventUnpin: boolean;
    _firstLoad: boolean;
    _pinned: boolean;
    _top: boolean;
    _bottom: boolean;
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
    intersectingElements: any[];
    initialize(): void;
    pageIsScrolledOnReady: boolean;
    preflight(): void;
    lock(): void;
    unlock(): void;
    isScrolled(): boolean;
    unpinIfScrolled(): void;
    enter(): void;
    setResizeTimer(): void;
    update(): void;
    checkSize(force: any): void;
    checkBg(force: any): void;
    checkTop(force: any): void;
    checkBot(force: any): void;
    checkPin(force: any, toleranceExceeded: any): void;
    redraw(): void;
    notTop(): void;
    top(): void;
    notBottom(): void;
    bottom(): void;
    unpin(): void;
    pin(): void;
    notSmall(): void;
    small(): void;
    notAltBg(): void;
    altBg(): void;
    shouldUnpin(toleranceExceeded: any): any;
    shouldPin(toleranceExceeded: any): any;
    isOutOfBounds(): boolean;
    getScrollerPhysicalHeight(): number;
    getScrollerHeight(): number;
    getDocumentHeight(): number;
    getViewportHeight(): number;
    getElementHeight(el: any): number;
    getElementPhysicalHeight(el: any): number;
    getScrollY(): any;
    toleranceExceeded(): boolean;
    _getOptionsForSection(section: any, opts: any): any;
    _bindMobileMenuListeners(): void;
    _onMobileMenuOpen(): void;
    _onMobileMenuClose(): void;
}
export type FixedHeaderEvents = {
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
export type FixedHeaderSectionOptions = {
    /**
     * - Whether to unpin header on window resize
     */
    unPinOnResize?: boolean;
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
export type FixedHeaderOptions = {
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
    default?: FixedHeaderSectionOptions;
    /**
     * - Section-specific options
     */
    sections?: {
        [x: string]: FixedHeaderSectionOptions;
    };
};
