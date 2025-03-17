export default class Popover {
    constructor(app: any, trigger: any, opts?: {});
    app: any;
    opts: any;
    trigger: any;
    position: any;
    className: string;
    orderedPositions: string[];
    popover: HTMLDivElement;
    handleMouseEnter(e: any): void;
    handleMouseLeave(e: any): void;
    handleTouchStart(e: any): void;
    get isVisible(): boolean;
    show(): void;
    hide(): void;
    toggle(): void;
}
