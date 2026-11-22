/**
 * Parallax scrolling effect inspired by SimpleParallax.js
 */
export default class Parallax {
    /**
     * Create a new Parallax instance
     * @param {Object} app - Application instance
     * @param {ParallaxOptions} [opts={}] - Parallax options
     */
    constructor(app: any, opts?: ParallaxOptions);
    app: any;
    opts: any;
    elements: {};
    parallaxElements: any[];
    /**
     * Handle scroll event to update parallax effect
     */
    onScroll(): void;
    /**
     * Set up a parallax element with its properties
     * @param {HTMLElement} el - Element to set up
     */
    setupParallaxElement(el: HTMLElement): void;
    /**
     * Calculate the transform value based on scroll position
     * @param {Object} item - Parallax element data
     * @param {number} scrollPosition - Current scroll position
     * @returns {Object} Transform and opacity values
     */
    calculateTransform(item: any, scrollPosition: number): any;
    /**
     * Apply a smooth transition between current and target position
     * @param {Object} item - Parallax element data
     * @param {Object} target - Target transform and opacity values
     */
    applyTransform(item: any, target: any): void;
    /**
     * Destroy the parallax instance and clean up
     */
    destroy(): void;
}
export type ParallaxOptions = {
    /**
     * - Target element selector or element
     */
    el?: string | HTMLElement;
    /**
     * - Default parallax movement factor
     */
    factor?: number;
    /**
     * - Whether to fade content while scrolling
     */
    fadeContent?: boolean;
    /**
     * - Scale factor to apply to parallax images
     */
    scale?: number;
    /**
     * - Delay factor to smooth the effect
     */
    delay?: number;
    /**
     * - Direction of parallax effect ('up', 'down', 'left', 'right')
     */
    orientation?: string;
    /**
     * - Whether to show element overflow
     */
    overflow?: boolean;
};
