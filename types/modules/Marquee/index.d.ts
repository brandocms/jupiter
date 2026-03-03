export default class Marquee {
    constructor(app: any, el: any, opts: any);
    opts: any;
    app: any;
    elements: {};
    timeline: any;
    observer: IntersectionObserver;
    initialize(): void;
    revealMarquee(e: any): void;
    updateMarquee(e: any): void;
    duration: number;
    clearHolders(): void;
    killTweens(): void;
    speedAnimation: any;
    initializeTween(): void;
    play(rampUp?: boolean): void;
    playing: boolean;
    pause(): void;
    slowDown(): void;
    speedUp(): void;
    setupObserver(): void;
    fillText(): void;
    measuredHeight: any;
    setHeight(): void;
}
