export default class Application {
    constructor(opts?: {});
    debugType: number;
    debugOverlay: Element;
    userAgent: string;
    _lastWindowHeight: number;
    breakpoint: any;
    language: string;
    size: {
        width: number;
        height: number;
        initialInnerHeight: number;
        initialOuterHeight: number;
        initialInnerWidth: number;
        initialOuterWidth: number;
        zoom: number;
    };
    position: {
        top: number;
        left: number;
    };
    state: {
        revealed: boolean;
        forcedScroll: boolean;
    };
    opts: any;
    focusableSelectors: any;
    featureTests: FeatureTests;
    breakpoints: Breakpoints;
    fontLoader: Fontloader;
    fader: any;
    callbacks: {};
    SCROLL_LOCKED: boolean;
    SCROLLBAR_WIDTH: number;
    INITIALIZED: boolean;
    PREFERS_REDUCED_MOTION: boolean;
    beforeInitializedEvent: CustomEvent<any>;
    initializedEvent: CustomEvent<any>;
    readyEvent: CustomEvent<any>;
    revealedEvent: CustomEvent<any>;
    /**
     * Main init. Called from client application on DOMReady.
     */
    initialize(): void;
    /**
     * Application is initialized and ready.
     * Fade in, then execute callbacks
     */
    ready(): void;
    getZoom(): void;
    _lastDevicePixelRatio: number;
    _initialZoom: any;
    _zoomSVG: SVGSVGElement;
    zoomCalculateChrome(dimsChanged: any): void;
    zoomCalculateSafari(): void;
    updateZoom(dimsChanged?: boolean, dprDelta?: number): void;
    /**
     * Fade in application, as declared in the `faderOpts`
     */
    fadeIn(): void;
    /**
     * Register callbacks by `type`
     */
    registerCallback(type: any, callback: any): void;
    /**
     * Execute callbacks by `type`
     */
    executeCallbacks(type: any): void;
    /**
     * Set section
     */
    setSection(): void;
    section: string;
    /**
     * Check if document is scrolled
     */
    isScrolled(): boolean;
    /**
     * Locks body scroll
     * `extraPaddedElements` can be a list of elements that also need padding, such as the header!
     * @param {*} extraPaddedElements
     */
    scrollLock(extraPaddedElements?: any): void;
    _scrollPaddedElements: any[];
    scrollRelease(defaultOverflow?: string): void;
    /**
     *
     * @param {*} target
     * this can be an object too if you want to override scrollTo: `{y: "#someID", offsetY: 50}`
     * @param {*} time
     * @param {*} emitEvents
     */
    scrollTo(target: any, time?: any, emitEvents?: any, ease?: string): void;
    hardScrollToTop(): void;
    hardScrollTo(target: any): void;
    scrollVoid(e: any): void;
    /**
     * Get current scrollbar width — if there is none, there is none
     */
    getCurrentScrollBarWidth(): number;
    /**
     * Get scrollbar width by FORCE. No matter if there is
     * currently a scrollbar or not
     */
    getScrollBarWidth(): void;
    /**
     * Ugly hacks
     */
    hacks(): void;
    getIOSCurrentInnerHeight(): number;
    getIOSInnerHeightMax(): number;
    /**
     * Event emitters
     */
    _emitBeforeInitializedEvent(): void;
    _emitInitializedEvent(): void;
    _emitReadyEvent(): void;
    _emitRevealedEvent(): void;
    _getBaseVW(): string;
    setDims(): void;
    setFontBaseVw(): void;
    setZoom(): void;
    /**
     * Inner height of mobiles may change when showing hiding bottom bar.
     */
    setvh100(): void;
    setvw100(): void;
    /**
     * Get the max 100vh for iOS
     */
    setvh100Max(): void;
    setScrollHeight(): void;
    onBreakpointChanged(): void;
    /**
     * RAF'ed resize event
     */
    onResize(e: any): void;
    /**
     * RAF'ed scroll event
     */
    onScroll(e: any): void;
    onVisibilityChange(e: any): void;
    pollForElement(selector: any, time?: number, callback?: () => void): void;
    pollForVar(variable: any, time?: number, callback?: () => void): void;
    setupDebug(): void;
    toggleDebug(): void;
    /**
     * CTRL-G to show grid overlay
     */
    setupGridoverlay(): void;
    /**
     * Add in extra selectors that are focusable
     * @param {array} extraSelectors
     */
    addFocusableSelectors(extraSelectors: any[]): void;
    /**
     * Set focusable selectors. Replaces default array.
     * @param {array} selectors
     */
    setFocusableSelectors(selectors: any[]): void;
    /**
     * Returns focusable selectors as a comma separated list
     */
    getFocusableSelectors(): any;
}
import FeatureTests from '../FeatureTests';
import Breakpoints from '../Breakpoints';
import Fontloader from '../Fontloader';
