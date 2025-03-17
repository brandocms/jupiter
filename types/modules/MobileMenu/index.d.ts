export default class MobileMenu {
    constructor(app: any, opts?: {});
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
