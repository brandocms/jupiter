export interface PopoverOptions {
    clickToggle?: boolean;
    allowMultiple?: boolean;
    followTrigger?: boolean;
    followSpeed?: number;
    onShow?: (popover: Popover) => void;
}

export default class Popover {
    constructor(app: any, trigger: any, opts?: Partial<PopoverOptions>);
    app: any;
    opts: any;
    trigger: any;
    position: any;
    className: string;
    orderedPositions: string[];
    popover: HTMLDivElement;
    boundHandleDocumentClick: (e: Event) => void;
    handleMouseEnter(e: any): void;
    handleMouseLeave(e: any): void;
    handleTouchStart(e: any): void;
    handleClick(e: any): void;
    handleDocumentClick(e: Event): void;
    get isVisible(): boolean;
    show(): void;
    hide(): void;
    toggle(): void;
    addDocumentClickHandler(): void;
    removeDocumentClickHandler(): void;
    closeAllExcept(exceptPopover: Popover): void;
}
