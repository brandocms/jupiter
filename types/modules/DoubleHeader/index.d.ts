export default class DoubleHeader {
    constructor(app: any, opts?: {});
    app: any;
    mainOpts: any;
    preventUnpin: boolean;
    el: any;
    opts: any;
    auxEl: any;
    lis: any;
    preventPin: boolean;
    _isResizing: boolean;
    _firstLoad: boolean;
    _pinned: boolean;
    _top: boolean;
    _bottom: boolean;
    _small: boolean;
    _hiding: boolean;
    lastKnownScrollY: number;
    currentScrollY: number;
    mobileMenuOpen: boolean;
    timer: any;
    resetResizeTimer: any;
    scrollSettleTimeout: NodeJS.Timeout;
    firstReveal: boolean;
    initialize(): void;
    setupObserver(): void;
    observer: IntersectionObserver;
    _navVisible: boolean;
    bindObserver(): void;
    setResizeTimer(): void;
    _hideAlt(): void;
    _showAlt(): void;
    update(): void;
    lock(): void;
    unlock(): void;
    checkSize(force: any): void;
    checkTop(force: any): void;
    checkBot(force: any): void;
    checkPin(force: any, toleranceExceeded: any): void;
    redraw(force?: boolean): void;
    notTop(): void;
    top(): void;
    notBottom(): void;
    bottom(): void;
    unpin(): void;
    pin(): void;
    notSmall(): void;
    small(): void;
    /**
     * Update the --header-height CSS variable on :root.
     *
     * Measured from `el`, the main header — `auxEl` is the clone. By default this
     * is how much header is *visible*, the measured height when pinned and 0 when
     * unpinned, so anything positioned under the bar follows it out of the way as
     * the clone retracts.
     *
     * That is wrong for a header configured never to retract, whether through
     * `preventUnpin` or by no-opping `onPin` / `onUnpin`. The bar stays put, but
     * `_pinned` still flips on every change of scroll direction, so the variable
     * drops to 0 and back while nothing moves. Any layout sized from it then grows
     * and shrinks the document under the reader. Scroll anchoring absorbs that
     * mid-page, but not at the very bottom, where the scroll offset is clamped to
     * the document and the page visibly jumps instead.
     *
     * `headerHeightTracksPin: false` publishes the measured height throughout.
     */
    _updateHeaderHeight(): void;
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
