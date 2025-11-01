export default class Popover {
    constructor(app: any, trigger: any, opts?: {});
    app: any;
    opts: any;
    trigger: any;
    position: any;
    className: string;
    orderedPositions: string[];
    currentPosition: any;
    popover: HTMLDivElement;
    boundHandleDocumentClick: any;
    boundHandleScroll: any;
    handleMouseEnter(e: any): void;
    handleMouseLeave(e: any): void;
    handleTouchStart(e: any): void;
    handleClick(e: any): void;
    get isVisible(): boolean;
    show(): void;
    updatePosition(animate?: boolean): void;
    hide(): void;
    toggle(): void;
    addDocumentClickHandler(): void;
    removeDocumentClickHandler(): void;
    handleDocumentClick(e: any): void;
    closeAllExcept(exceptPopover: any): void;
    handleScroll(): void;
    addScrollListener(): void;
    removeScrollListener(): void;
}
