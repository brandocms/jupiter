/**
 * Set properties immediately (like gsap.set)
 * Uses direct DOM manipulation for synchronous style application
 *
 * @param {Element|string|NodeList|Array} target - Element(s) or selector
 * @param {Object} values - Properties to set
 */
export function set(target: Element | string | NodeList | any[], values: any): void;
/**
 * Animate autoAlpha (opacity + visibility)
 * Mimics GSAP's autoAlpha property
 *
 * @param {Element|string} target - Element or selector
 * @param {number} value - Target alpha value (0 or 1)
 * @param {Object} options - Animation options
 * @returns {Object} Animation object
 */
export function animateAutoAlpha(target: Element | string, value: number, options?: any): any;
/**
 * Clear inline styles
 * Mimics GSAP's clearProps
 *
 * @param {Element|string|NodeList|Array} target - Element(s) or selector
 * @param {string|Array} props - Properties to clear or 'all'
 */
export function clearProps(target: Element | string | NodeList | any[], props?: string | any[]): void;
/**
 * Delayed call helper
 * Mimics gsap.delayedCall
 * Uses Motion's delay function (locked to animation frame loop for better sync)
 *
 * @param {number} duration - Delay in seconds
 * @param {Function} callback - Callback function
 * @returns {Promise} Promise that resolves after delay
 */
export function delayedCall(duration: number, callback: Function): Promise<any>;
/**
 * Convert GSAP easing strings to Motion.js compatible easings
 * Handles common GSAP easing types and returns valid Motion.js easing
 *
 * @param {string|Array} easing - GSAP easing string or bezier array
 * @returns {string|Array} Motion.js compatible easing
 *
 * Valid Motion.js easings:
 * - "linear"
 * - "easeIn"
 * - "easeInOut"
 * - "easeOut"
 * - "circIn"
 * - "circInOut"
 * - "circOut"
 * - "backIn"
 * - "backInOut"
 * - "backOut"
 * - "anticipate"
 * - Bezier arrays: [x1, y1, x2, y2]
 */
export function convertEasing(easing: string | any[]): string | any[];
/**
 * Paused Timeline helper
 * Mimics GSAP's paused timeline pattern for building sequences
 * Used by modules like Lightbox that build animations before playing them
 */
export class PausedTimeline {
    sequence: any[];
    /**
     * Add animation to timeline
     * @param {Element|string} target - Element or selector
     * @param {Object} values - Properties to animate
     * @param {Object} options - Animation options
     * @returns {PausedTimeline} this for chaining
     */
    to(target: Element | string, values: any, options?: any): PausedTimeline;
    /**
     * Add callback to timeline
     * @param {Function} callback - Function to call
     * @returns {PausedTimeline} this for chaining
     */
    call(callback: Function): PausedTimeline;
    /**
     * Clear timeline sequence
     * @returns {PausedTimeline} this for chaining
     */
    clear(): PausedTimeline;
    /**
     * Play timeline sequence
     * Executes all animations and callbacks in order
     * @returns {Promise} Promise that resolves when sequence completes
     */
    play(): Promise<any>;
}
