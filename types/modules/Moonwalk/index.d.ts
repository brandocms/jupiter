/**
 * Normalize alphaTween config into a consistent object form.
 * Returns a new object (never mutates the original).
 */
export function normalizeAlphaTween(alphaTween: any, duration: any): any;
/**
 * Moonwalk animation system for scroll-based reveal animations.
 *
 * ## HTML attributes
 *
 * - `data-moonwalk` / `data-moonwalk="{walkName}"` — marks an element for scroll-triggered animation
 * - `data-moonwalk-section` / `data-moonwalk-section="{walkName}"` — groups elements; unnamed sections
 *   animate children individually, named sections stagger-reveal all children at once
 * - `data-moonwalk-children` / `data-moonwalk-children="{walkName}"` — converts direct children
 *   into `data-moonwalk` (or `data-moonwalk="{walkName}"`) elements automatically
 * - `data-moonwalk-stage="{walkName}"` — applies a walk transition to the section element itself
 *   before its children animate (e.g. fade in a container, then reveal items)
 * - `data-moonwalk-order="{number}"` — overrides the DOM order of children inside a named section;
 *   elements with order are sorted first, unordered elements keep their relative position
 * - `data-moonwalk-run="{runName}"` — standalone observer-based callback (not part of walk system)
 * - `data-placeholder` / `data-ll-placeholder` — skip waiting for image load before tweening
 *
 * ## CSS-only mode
 *
 * Set `transition: null` on a walk to use CSS-only animations. Moonwalk will stagger-add the
 * `data-moonwalked` attribute instead of running JS tweens. Style the reveal via CSS:
 * ```css
 * [data-moonwalk="fade"] { opacity: 0; transition: opacity 0.5s; }
 * [data-moonwalk="fade"][data-moonwalked] { opacity: 1; }
 * ```
 *
 * ## alphaTween
 *
 * Can be `true` (defaults: duration from walk, ease `'easeIn'`) or an object:
 * `{ duration?: number, ease?: string, delay?: number }` for fine-grained control
 * over a separate opacity animation layered on top of the main transition.
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
    _observers: any[];
    sections: any[] | {
        id: string;
        el: any;
        name: any;
        animation: {
            lastDelay: number;
            lastDuration: number;
            lastStartTime: any;
        };
        observer: any;
        stage: {
            name: any;
            running: boolean;
            firstTween: boolean;
        };
        elements: any[];
    }[];
    runs: any[] | {
        el: Element;
        threshold: any;
        initialize: any;
        onReady: any;
        callback: any;
        onExit: any;
        repeated: any;
        rootMargin: any;
    }[];
    _boundOnReady: any;
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
        onReady: any;
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
        animation: {
            lastDelay: number;
            lastDuration: number;
            lastStartTime: any;
        };
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
        animation: {
            lastDelay: number;
            lastDuration: number;
            lastStartTime: any;
        };
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
    /**
     * Calculate the delay for the next animation in the section.
     * This replaces GSAP's timeline.recent() logic.
     *
     * @param {*} section - The section object
     * @param {*} duration - Duration of the animation to add
     * @param {*} overlap - How much the animations should overlap
     * @returns {number} The delay in seconds
     */
    calculateDelay(section: any, duration: any, overlap: any): number;
    /**
     * Update the animation state after adding an animation.
     *
     * @param {*} section - The section object
     * @param {*} delay - The delay that was used
     * @param {*} duration - The duration of the animation
     */
    updateAnimationState(section: any, delay: any, duration: any): void;
    destroy(): void;
    onReady(): void;
    /**
     * Called on `APPLICATION_READY` event, if `config.fireOnReady`.
     * Otherwise must be triggered manually
     */
    ready(): void;
    /**
     * Get the viewport entry direction based on current scroll direction.
     * When entering, elements appear from the opposite side of scroll direction.
     *
     * @param {boolean} isEntry - Whether this is an entry (true) or exit (false)
     * @returns {string|null}
     */
    getScrollDirection(isEntry: boolean): string | null;
    /**
     * Get the exit direction for an element, falling back to position-based
     * detection when scroll direction is unavailable.
     *
     * @param {IntersectionObserverEntry} entry
     * @returns {string|null}
     */
    getExitDirection(entry: IntersectionObserverEntry): string | null;
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
     * @param {*} tweenInterval
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
     * @param {*} tweenDuration
     * @param {*} tweenInterval
     * @param {*} tweenTransition
     * @param {*} tweenOverlap
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
export type AlphaTweenConfig = {
    /**
     * - Duration of the alpha tween (defaults to walk duration)
     */
    duration?: number;
    /**
     * - Easing function (defaults to 'easeIn')
     */
    ease?: string;
    /**
     * - Additional delay before the alpha tween starts
     */
    delay?: number;
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
     * - Whether to add a separate opacity tween. Pass `true` for defaults or an AlphaTweenConfig object for control.
     */
    alphaTween?: boolean | AlphaTweenConfig;
    /**
     * - The transition configuration. Set to `null` for CSS-only mode (uses `data-moonwalked` attribute for CSS transitions).
     */
    transition: MoonwalkTransition | null;
    /**
     * - CSS selector for targeting elements in named sections (instead of using direct children)
     */
    sectionTargets?: string;
};
export type MoonwalkRunMeta = {
    /**
     * - The viewport entry/exit direction ('top', 'bottom', 'left', 'right', or null)
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
     */
    callback: (el: HTMLElement, repeated: boolean, meta: MoonwalkRunMeta) => void;
    /**
     * - Function called when element exits viewport
     */
    onExit?: (el: HTMLElement, exited: boolean, meta: MoonwalkRunMeta) => void;
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
    initialize?: (el: HTMLElement) => void;
    /**
     * - Function called when APPLICATION_REVEALED fires, before viewport observers start
     */
    onReady?: (el: HTMLElement) => void;
};
export type MoonwalkOptions = {
    /**
     * - Event name to trigger animations. Set to `null` to trigger manually via `ready()`.
     */
    on?: string | null;
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
    walks?: {
        [x: string]: MoonwalkWalk;
    };
};
