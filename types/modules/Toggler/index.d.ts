/**
 * Options for the Toggler module
 */
export interface TogglerOptions {
    /**
     * Callback when toggle opens
     * @param toggler - The Toggler instance
     * @param index - The 1-based index within the group (1 if not in a group)
     */
    onOpen?: (toggler: Toggler, index: number) => void;
    
    /**
     * Callback when toggle closes
     * @param toggler - The Toggler instance
     * @param index - The 1-based index within the group (1 if not in a group)
     */
    onClose?: (toggler: Toggler, index: number) => void;
    
    /**
     * Callback before toggle opens (before animation starts)
     * @param toggler - The Toggler instance
     * @param index - The 1-based index within the group (1 if not in a group)
     */
    onBeforeOpen?: (toggler: Toggler, index: number) => void;
    
    /**
     * Callback before toggle closes (before animation starts)
     * @param toggler - The Toggler instance
     * @param index - The 1-based index within the group (1 if not in a group)
     */
    onBeforeClose?: (toggler: Toggler, index: number) => void;
}

/**
 * Toggler component for show/hide functionality
 * Uses [data-toggle-trigger] for the toggle button and [data-toggle-content] for toggleable content
 * Can be grouped using [data-toggle-group] to create accordion-like behavior
 */
export default class Toggler {
    /**
     * Create a new Toggler instance
     * @param app - Application instance
     * @param el - Container element with [data-toggle] attribute
     * @param options - Configuration options
     */
    constructor(app: any, el: HTMLElement, options?: TogglerOptions);
    open: boolean;
    app: any;
    el: HTMLElement;
    trigger: any;
    triggerTarget: string;
    group: string;
    triggerIcon: any;
    content: any;
    onOpen?: (toggler: Toggler, index: number) => void;
    onClose?: (toggler: Toggler, index: number) => void;
    onBeforeOpen?: (toggler: Toggler, index: number) => void;
    onBeforeClose?: (toggler: Toggler, index: number) => void;
    /**
     * Get the index of this toggle within its group (1-based)
     * @returns The 1-based index of this toggle in its group
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
