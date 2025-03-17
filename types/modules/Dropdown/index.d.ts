export default class Dropdown {
    constructor(app: any, opts?: {});
    app: any;
    opts: any;
    elements: {};
    open: boolean;
    element: any;
    timeline: any;
    handleDocumentClick(event: any): void;
    initialize(): void;
    onClick(event: any): Promise<void>;
    openMenu(): Promise<void>;
    closeMenu(): Promise<void>;
    checkForInitialOpen(): void;
}
