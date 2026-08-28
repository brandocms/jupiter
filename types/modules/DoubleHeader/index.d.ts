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
     * Uses el height when pinned (el is the main header, auxEl is secondary).
     * Set to 0px when unpinned.
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
