/**
 * Lazyload class for handling image lazy loading
 */
export default class Lazyload {
    /**
     * Create a new Lazyload instance
     * @param {Object} app - Application instance
     * @param {LazyloadOptions} [opts={}] - Lazyload options
     */
    constructor(app: any, opts?: LazyloadOptions);
    app: any;
    opts: any;
    target: any;
    resizePending: Map<any, any>;
    rafId: number;
    srcsetReadyObserver: MutationObserver;
    watch(): void;
    /**
     * Observe new lazyload elements within a container
     * Handles both [data-ll-image] and [data-ll-srcset] elements
     * Useful for dynamically added content (e.g., Looper clones)
     * @param {HTMLElement|HTMLElement[]|NodeList} elements - Container element(s) or lazyload element(s) to observe
     */
    observe(elements: HTMLElement | HTMLElement[] | NodeList): void;
    initialize(): void;
    lazyPictures: any;
    loadObserver: IntersectionObserver;
    revealObserver: IntersectionObserver;
    imageObserver: IntersectionObserver;
    lazyImages: any;
    initObserver(observer: any, setAttrs?: boolean): void;
    /**
     * Force load all lazyload elements within a container, bypassing intersection observers.
     * Used by modules like Looper when dynamically adding content that needs immediate loading.
     * @param {HTMLElement} [$container=document.body] - Container to search for lazyload elements
     * @param {Object} [options]
     * @param {boolean} [options.reveal=true] - Whether to also reveal (set data-ll-loaded) after loading
     */
    forceLoad($container?: HTMLElement, { reveal }?: {
        reveal?: boolean;
    }): void;
    initializeResizeObserver(): void;
    sizeObserver: ResizeObserver;
    flushSizeUpdates(): void;
    initializeSections(): void;
    handleLoadEntries(entries: any): void;
    handleRevealEntries(entries: any): void;
    loadPicture(picture: any): void;
    /**
     * Reveal a picture element by setting `data-ll-loaded` on its img child.
     * @param {HTMLElement} picture - The picture element to reveal
     */
    revealPicture(picture: HTMLElement): void;
    /**
     * Swap source attributes on a picture element for the native lazyload path.
     * Copies data-srcset to srcset on all sources and the img element.
     * @param {HTMLElement} picture - The picture element to swap
     */
    swapPicture(picture: HTMLElement): void;
    lazyloadImages(entries: any): void;
    swapImage(image: any): void;
    /**
     * Destroy the Lazyload instance, disconnecting all observers and freeing resources.
     */
    destroy(): void;
}
export type IntersectionObserverConfig = {
    /**
     * - Margin around the root
     */
    rootMargin?: string;
    /**
     * - Threshold for intersection
     */
    threshold?: number;
};
export type LazyloadOptions = {
    /**
     * - Configuration for the reveal intersection observer
     */
    revealIntersectionObserverConfig?: IntersectionObserverConfig;
    /**
     * - Configuration for the load intersection observer
     */
    loadIntersectionObserverConfig?: IntersectionObserverConfig;
    /**
     * - Whether to use native lazyloading if available
     */
    useNativeLazyloadIfAvailable?: boolean;
    /**
     * - Minimum size for auto sizing
     */
    minSize?: number;
    /**
     * - Whether to update sizes attribute
     */
    updateSizes?: boolean;
    /**
     * - Whether to register a callback for APPLICATION_REVEALED event
     */
    registerCallback?: boolean;
    /**
     * - Container element to scope lazyloading to. Defaults to document.body
     */
    target?: HTMLElement | null;
};
