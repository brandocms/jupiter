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
    elements: Record<string, HTMLElement>;
    parallaxElements: Array<{
        element: HTMLElement;
        factor: number;
        fadeContent: boolean;
        orientation: string;
        content: HTMLElement | null;
        figure: HTMLElement | null;
        elementHeight: number;
        elementWidth: number;
        lastPosition: number;
    }>;
    
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
    calculateTransform(item: any, scrollPosition: number): { transform: string, opacity: number };
    
    /**
     * Apply a smooth transition between current and target position
     * @param {Object} item - Parallax element data
     * @param {Object} target - Target transform and opacity values
     */
    applyTransform(item: any, target: { transform: string, opacity: number }): void;
    
    /**
     * Handle scroll event to update parallax effect
     */
    onScroll(): void;
    
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
    orientation?: 'up' | 'down' | 'left' | 'right';
    
    /**
     * - Whether to show element overflow
     */
    overflow?: boolean;
};
