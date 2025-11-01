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
     * @param {Object} options - Configuration options
     * @param {Function} options.onOpen - Callback when toggle opens
     * @param {Function} options.onClose - Callback when toggle closes
     */
    constructor(app: any, el: HTMLElement, options?: {
        onOpen: Function;
        onClose: Function;
    });
    open: boolean;
    app: any;
    el: HTMLElement;
    onOpen: Function;
    onClose: Function;
    onBeforeOpen: any;
    onBeforeClose: any;
    trigger: any;
    triggerTarget: any;
    group: string;
    content: any;
    triggerIcon: any;
    /**
     * Get the index of this toggle within its group (1-based)
     * @returns {number} The 1-based index of this toggle in its group
     */
    getGroupIndex(): number;
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
