/**
 * Popup component for modal dialogs and popups
 */
export default class Popup {
    /**
     * Create a new Popup instance
     * @param {Object} app - Application instance
     * @param {PopupOptions} [opts={}] - Popup options
     */
    constructor(app: any, opts?: PopupOptions);
    app: any;
    opts: any;
    /**
     * Bind click handlers to popup triggers and close buttons
     */
    bindTriggers(): void;
    /**
     * Create backdrop element for popup
     */
    createBackdrop(): void;
    backdrop: HTMLDivElement;
    /**
     * Open a popup
     * @param {HTMLElement} trigger - Element that triggered the popup
     * @param {HTMLElement|string} target - Popup element or selector
     */
    open(trigger: HTMLElement, target: HTMLElement | string): void;
    keyUpListener: any;
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
