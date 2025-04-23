/**
 * Moonwalk animation system for scroll-based reveal animations
 */
export default class Moonwalk {
    /**
     * @param {Object} app - The application instance
     * @param {MoonwalkOptions} [opts={}] - Configuration options
     * @param {HTMLElement} [container=document.body] - Container element
     */
    constructor(app: any, opts?: MoonwalkOptions, container?: HTMLElement);
    app: any;
    opts: any;
    initialize(container?: HTMLElement): void;
    sections: {
        id: string;
        el: any;
        name: any;
        timeline: any;
        observer: any;
        stage: {
            name: any;
            running: boolean;
            firstTween: boolean;
        };
        elements: any[];
    }[];
    runs: {
        el: Element;
        threshold: any;
        initialize: any;
        callback: any;
        onExit: any;
        repeated: any;
        rootMargin: any;
    }[];
    /**
     * Add `moonwalk` class to html element to identify ourselves.
     */
    addClass(): void;
    /**
     * Matching moonwalk elements before the element matching the hash should be set to visible
     * by setting the `data-moonwalked` attribute on `data-moonwalk` elements and
     * `data-moonwalk-section-ready` on `data-moonwalk-section` elements.
     */
    walkToThisPoint(hash: any): void;
    /**
     * Remove all moonwalks. Useful for clients who prefer reduced motion
     */
    removeAllWalks(container?: HTMLElement): void;
    removeFor(container: HTMLElement, selector: any): void;
    /**
     * Remove run matching name
     */
    removeRun(container: HTMLElement, name: any): void;
    /**
     * Remove all runs
     */
    removeRuns(container?: HTMLElement): void;
    /**
     * Add a random ID to each moonwalk element
     *
     * @param {*} section
     */
    addIds(section: any): void;
    /**
     * Add index to each moonwalk element in `section`
     *
     * @param {*} section
     */
    addIndexes(section: any): void;
    /**
     * Go through each `data-moonwalk-run`, parse children, add IDs/indexes
     * (if wanted), initialize a new object for each.
     */
    initializeRuns(container?: HTMLElement): {
        el: Element;
        threshold: any;
        initialize: any;
        callback: any;
        onExit: any;
        repeated: any;
        rootMargin: any;
    }[];
    /**
     * Go through each `data-moonwalk-section`, parse children, add IDs/indexes
     * (if wanted), initialize a new object for each.
     */
    initializeSections(container?: HTMLElement): {
        id: string;
        el: any;
        name: any;
        timeline: any;
        observer: any;
        stage: {
            name: any;
            running: boolean;
            firstTween: boolean;
        };
        elements: any[];
    }[];
    initializeSection(section: any): {
        id: string;
        el: any;
        name: any;
        timeline: any;
        observer: any;
        stage: {
            name: any;
            running: boolean;
            firstTween: boolean;
        };
        elements: any[];
    };
    /**
     * Removes `data-moonwalk` from all elements who already have `data-ll-srcset´
     * Can be used if Moonwalking interferes with custom lazyloading animations
     */
    clearLazyloads(container?: HTMLElement): void;
    /**
     * Look through section for `data-moonwalk-children` or
     * `data-moonwalk-children="{walkName}"`, then convert all children to
     * `data-moonwalk` or `data-moonwalk-{walkName}`
     *
     * @param {*} section
     */
    parseChildren(section: any): void;
    /**
     * Sets all `element`s childrens `data-moonwalk` to `val`
     *
     * @param {*} element
     * @param {*} val
     */
    setAttrs(element: any, val: any): any[];
    /**
     * If we have advanced sections, either named sections or section stages.
     * Resets the entry's `from` state, then creates an observer that will
     * watch this section.
     *
     * @param {*} section
     */
    setupNamesAndStages(section: any): void;
    /**
     * Create and return an observer for `section`
     *
     * @param {*} section
     */
    sectionObserver(section: any): IntersectionObserver;
    /**
     * Order `children` by `data-moonwalk-order`.
     *
     * @param {*} children
     */
    orderChildren(children: any): any[];
    onReady(): void;
    /**
     * Called on `APPLICATION_READY` event, if `config.fireOnReady`.
     * Otherwise must be triggered manually
     */
    ready(): void;
    /**
     * Creates and returns the RUN observer for data-moonwalk-run elements
     *
     * @param {*} run
     * @param {*} rootMargin
     */
    runObserver(run: any, rootMargin: any): IntersectionObserver;
    /**
     * Creates and returns the standard observer for all moonwalk elements
     * inside a section.
     *
     * @param {*} section
     * @param {*} rootMargin
     */
    observer(section: any, rootMargin: any): IntersectionObserver;
    /**
     * The main tween function
     *
     * @param {*} section
     * @param {*} target
     * @param {*} tweenDuration
     * @param {*} tweenTransition
     * @param {*} tweenOverlap
     * @param {*} alphaTween
     */
    tweenJS(section: any, target: any, tweenDuration: any, tweenInterval: any, tweenTransition: any, tweenOverlap: any, alphaTween: any): void;
    /**
     * CSS version. Not quite ready yet.
     *
     * @param {*} section
     * @param {*} target
     * @param {*} duration
     * @param {*} transition
     * @param {*} overlap
     */
    tweenCSS(section: any, target: any, tweenDuration: any, tweenInterval: any, tweenTransition: any, tweenOverlap: any): void;
}
export type MoonwalkTransition = {
    /**
     * - Starting properties for the transition
     */
    from: any;
    /**
     * - Ending properties for the transition
     */
    to: any;
};
export type MoonwalkWalk = {
    /**
     * - Delay before the animation starts
     */
    startDelay?: number;
    /**
     * - Time between animations in a sequence
     */
    interval?: number;
    /**
     * - Duration of the animation
     */
    duration?: number;
    /**
     * - Whether to add a separate opacity tween
     */
    alphaTween?: boolean | any;
    /**
     * - The transition configuration
     */
    transition: MoonwalkTransition;
    /**
     * - CSS selector for targeting elements in named sections
     */
    sectionTargets?: string;
};
export type MoonwalkRunMeta = {
    /**
     * - Direction of viewport crossing ('top', 'bottom', 'left', 'right', or null)
     * - For entry callbacks: indicates which side the element entered from
     * - For exit callbacks: indicates which side the element exited to
     */
    direction: string | null;
};

export type MoonwalkRun = {
    /**
     * - IntersectionObserver threshold
     */
    threshold?: number;
    /**
     * - Function called when element enters viewport
     * - @param {HTMLElement} element - The element that triggered the callback
     * - @param {boolean} repeated - Whether this is a repeated trigger
     * - @param {MoonwalkRunMeta} meta - Information about how the element entered the viewport
     */
    callback: Function;
    /**
     * - Function called when element exits viewport
     * - @param {HTMLElement} element - The element that triggered the callback
     * - @param {boolean} repeated - Whether this is a repeated exit
     * - @param {MoonwalkRunMeta} meta - Information about how the element exited the viewport
     */
    onExit?: Function;
    /**
     * - Whether the run should repeat
     */
    repeated?: boolean;
    /**
     * - IntersectionObserver rootMargin
     */
    rootMargin?: string;
    /**
     * - Function called during initialization
     */
    initialize?: Function;
};
export type MoonwalkOptions = {
    /**
     * - Event to trigger animations
     */
    on?: string | Function;
    /**
     * - Delay before starting animations
     */
    initialDelay?: number;
    /**
     * - Clear data-ll-srcset attributes
     */
    clearLazyload?: boolean;
    /**
     * - Remove nested data-moonwalk-section attributes
     */
    clearNestedSections?: boolean;
    /**
     * - Remove nested data-moonwalk attributes
     */
    clearNestedWalks?: boolean;
    /**
     * - Disable animations when page loaded via anchor
     */
    clearMoonwalkOnAnchors?: boolean;
    /**
     * - Warn when run and section on same element
     */
    warnRunWithSection?: boolean;
    /**
     * - Default IntersectionObserver rootMargin
     */
    rootMargin?: string;
    /**
     * - Default IntersectionObserver threshold
     */
    threshold?: number;
    /**
     * - Generate unique IDs for moonwalk elements
     */
    uniqueIds?: boolean;
    /**
     * - Add index attributes to elements
     */
    addIndexes?: boolean;
    /**
     * - Run configurations
     */
    runs?: {
        [x: string]: MoonwalkRun;
    };
    /**
     * - Walk configurations
     */
    walks: {
        [x: string]: MoonwalkWalk;
    };
};
