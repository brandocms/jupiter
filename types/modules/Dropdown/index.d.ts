interface DropdownOptions {
    multipleActive?: boolean;
    selectors?: {
        trigger: string;
        menu: string;
        menuItems: string;
    };
    overlapTweens?: boolean;
    menuOpenDuration?: number;
    tweens?: {
        items: {
            duration: number;
            autoAlpha: number;
            stagger: number;
        }
    };
    onBeforeOpen?: (dropdown: Dropdown) => Promise<void>;
    onAfterOpen?: (dropdown: Dropdown) => Promise<void>;
    onBeforeClose?: (dropdown: Dropdown) => Promise<void>;
    onAfterClose?: (dropdown: Dropdown) => Promise<void>;
    el?: HTMLElement;
}

export default class Dropdown {
    constructor(app: any, opts?: Partial<DropdownOptions>);
    app: any;
    opts: DropdownOptions;
    elements: Record<string, HTMLElement>;
    open: boolean;
    element: HTMLElement;
    timeline: gsap.core.Timeline;
    handleDocumentClick(event: Event): void;
    initialize(): void;
    onClick(event: Event): Promise<void>;
    openMenu(): Promise<void>;
    closeMenu(): Promise<void>;
    checkForInitialOpen(): void;
}
