/**
 * Toggler component for show/hide functionality
 * Uses [data-toggle-trigger] for the toggle button and [data-toggle-content] for toggleable content
 */
export default class Toggler {
    /**
     * Create a new Toggler instance
     * @param {Object} app - Application instance
     * @param {HTMLElement} el - Container element with [data-toggle] attribute
     */
    constructor(app: any, el: HTMLElement);
    open: boolean;
    app: any;
    el: HTMLElement;
    trigger: any;
    triggerIcon: any;
    content: any;
    /**
     * Handle click on trigger element
     */
    onClick(): void;
    /**
     * Toggle open/closed state
     */
    toggleState(): void;
}
