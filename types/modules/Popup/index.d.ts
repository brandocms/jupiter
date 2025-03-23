/**
 * Popup component for modal dialogs and popups
 */
export default class Popup {
    /**
     * Create a new Popup instance
     * @param {Object} app - Application instance
     * @param {string} [selector] - CSS selector to find popup elements
     * @param {PopupOptions} [opts={}] - Popup options
     */
    constructor(app: any, selector?: string, opts?: PopupOptions);
    app: any;
    opts: any;
    backdrop: HTMLDivElement | null;
    currentPopup: HTMLElement | null;
    popupKey: string | null;
    keyUpListener: any;
    
    /**
     * Bind click handlers to popup triggers and close buttons
     */
    bindTriggers(): void;
    
    /**
     * Extract key from target selector or element
     * @param {HTMLElement|string} target - Target element or selector
     * @returns {string|null} - The popup key or null
     */
    getKeyFromTarget(target: HTMLElement | string): string | null;
    
    /**
     * Create backdrop element for popup
     * @param {string|null} key - Optional popup key to associate with backdrop
     * @returns {HTMLElement} The created backdrop element
     */
    createBackdrop(key?: string | null): HTMLElement;
    
    /**
     * Open a popup
     * @param {HTMLElement} trigger - Element that triggered the popup
     * @param {HTMLElement|string} target - Popup element or selector
     * @param {string|null} key - Optional popup key
     */
    open(trigger: HTMLElement, target: HTMLElement | string, key?: string | null): void;
    
    /**
     * Close the popup
     */
    close(): void;
    
    /**
     * Handle keyup event for Escape key to close popup
     * @param {KeyboardEvent} e - Keyboard event
     */
    onKeyup(e: KeyboardEvent): void;
}

export type PopupOptions = {
    /**
     * - CSS selector to find popup elements
     * Default: '[data-popup]'
     */
    selector?: string;
    
    /**
     * - Function that determines if popup should be shown on current breakpoint
     */
    responsive?: Function;
    
    /**
     * - Called when popup opens
     */
    onOpen?: Function;
    
    /**
     * - Called when popup closes
     */
    onClose?: Function;
    
    /**
     * - Animation function for opening popup
     */
    tweenIn?: Function;
    
    /**
     * - Animation function for closing popup
     */
    tweenOut?: Function;
};