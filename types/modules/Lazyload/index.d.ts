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
    watch(): void;
    initialize(): void;
    lazyPictures: NodeListOf<Element>;
    loadObserver: IntersectionObserver;
    revealObserver: IntersectionObserver;
    imageObserver: IntersectionObserver;
    lazyImages: NodeListOf<Element>;
    initObserver(observer: any, setAttrs?: boolean): void;
    forceLoad($container?: HTMLElement): void;
    initializeAutoSizes(): void;
    $autoSizesImages: any[];
    /**
     * Set sizes attribute for all imgs with `data-sizes="auto"` and source within the <picture>
     */
    autoSizes(): void;
    getWidth(img: any): any;
    initializeSections(): void;
    handleLoadEntries(elements: any): void;
    handleRevealEntries(elements: any): void;
    loadPicture(picture: any): void;
    revealPicture(picture: any): void;
    lazyloadImages(elements: any): void;
    swapImage(image: any): void;
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
     * - Configuration for general intersection observers
     */
    intersectionObserverConfig?: IntersectionObserverConfig;
    /**
     * - Whether to use native lazyloading if available
     */
    useNativeLazyloadIfAvailable?: boolean;
    /**
     * - Lazyload mode
     */
    mode?: string;
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
};
