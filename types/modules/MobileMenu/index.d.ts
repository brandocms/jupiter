/**
 * MobileMenu component for mobile navigation menu
 */
export default class MobileMenu {
    /**
     * Create a new MobileMenu instance
     * @param {Object} app - Application instance
     * @param {MobileMenuOptions} [opts={}] - MobileMenu options
     */
    constructor(app: any, opts?: MobileMenuOptions);
    app: any;
    opts: any;
    open: boolean;
    header: HTMLElement;
    bg: Element;
    logo: Element;
    logoPath: NodeListOf<any>;
    menuButton: Element;
    hamburger: Element;
    hamburgerInner: Element;
    content: NodeListOf<any>;
    lis: NodeListOf<any>;
    nav: HTMLElement;
    toggleMenu(): void;
    toggleMenuClosed(): void;
    toggleMenuOpen(): void;
    _emitMobileMenuOpenEvent(): void;
    _emitMobileMenuClosedEvent(): void;
}
export type MobileMenuOptions = {
    /**
     * - Color for logo when menu is open
     */
    logoColor?: string;
    /**
     * - Selector for logo SVG paths
     */
    logoPathSelector?: string;
    /**
     * - Selector for menu content
     */
    contentSelector?: string;
    /**
     * - Selector for menu items
     */
    liSelector?: string;
    /**
     * - Color for hamburger icon
     */
    hamburgerColor?: string;
    /**
     * - Called when window is resized
     */
    onResize?: Function | null;
    /**
     * - Animation for opening menu
     */
    openTween?: Function;
    /**
     * - Animation for closing menu
     */
    closeTween?: Function;
};
