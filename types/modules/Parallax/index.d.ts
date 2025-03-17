/**
 * Parallax scrolling effect for background images
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
    /**
     * Initialize GSAP timeline for parallax effect
     */
    initializeTimeline(): void;
    timeline: any;
    /**
     * Handle scroll event to update parallax effect
     */
    onScroll(): void;
}
export type ParallaxOptions = {
    /**
     * - Target element selector or element
     */
    el?: string | HTMLElement;
    /**
     * - Parallax movement factor
     */
    factor?: number;
    /**
     * - Whether to fade content while scrolling
     */
    fadeContent?: boolean;
};
