/**
 * ScrollSpy component for highlighting active sections during scrolling
 */
export default class ScrollSpy {
    /**
     * Create a new ScrollSpy instance
     * @param {Object} app - Application instance
     * @param {ScrollSpyOptions} [opts={}] - ScrollSpy options
     */
    constructor(app: any, opts?: ScrollSpyOptions);
    app: any;
    opts: any;
    /**
     * Initialize ScrollSpy
     */
    initialize(): void;
    triggers: any[];
    /**
     * Handle intersection with viewport
     * @param {IntersectionObserverEntry} entry - Intersection observer entry
     */
    intersectionHandler(entry: IntersectionObserverEntry): void;
}
export type ScrollSpyOptions = {
    /**
     * - Called when a target intersects with the viewport
     */
    onIntersect?: Function;
};
