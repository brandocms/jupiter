/**
 * Toggler component for show/hide functionality
 * Uses [data-toggle-trigger] for the toggle button and [data-toggle-content] for toggleable content
 * Can be grouped using [data-toggle-group] to create accordion-like behavior
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
    triggerTarget: string;
    group: string;
    triggerIcon: any;
    content: any;
    /**
     * Handle click on trigger element
     */
    onClick(): void;
    /**
     * Close all other togglers in the same group
     */
    closeOthersInGroup(): void;
    /**
     * Toggle open/closed state
     */
    toggleState(): void;
}
