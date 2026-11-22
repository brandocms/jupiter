export default class Marquee {
    constructor(app: any, el: any, opts: any);
    opts: any;
    app: any;
    elements: {};
    position: any;
    holderWidth: number;
    duration: number;
    timeline: any;
    speedAnimation: any;
    inertiaAnimation: any;
    observer: IntersectionObserver;
    playing: boolean;
    hovering: boolean;
    _onResize: any;
    _onReveal: any;
    _onMouseEnter: any;
    _onMouseLeave: any;
    _positionUnsubscribe: any;
    _dragCleanup: () => void;
    initialize(): void;
    /**
     * Apply the current raw position to the marquee element.
     * Holders are laid out side by side at i * holderWidth, so translating by
     * the position modulo holderWidth produces a seamless infinite scroll.
     */
    render(rawPos: any): void;
    /**
     * Detect whether the marquee element is horizontally mirrored (scaleX(-1)),
     * as used for "reverse" rows. Read from the live computed transform so it
     * works no matter how the flip is applied (and survives responsive changes).
     */
    isAxisFlipped(): boolean;
    revealMarquee(e: any): void;
    updateMarquee(e: any): void;
    clearHolders(): void;
    killTweens(): void;
    /**
     * Lay out holders and create the (paused) crawl animation.
     */
    initializeTween(): void;
    _initialized: boolean;
    /**
     * Create an infinite crawl animation from the current position.
     * Animating exactly one holderWidth and relying on the modulo render keeps
     * the loop reset (repeat) invisible. Always recreated from the live position
     * so it stays correct after drags and throws.
     */
    createCrawl(): any;
    /**
     * The speed the crawl should settle at. Half speed while the pointer rests
     * on the marquee, so a crawl recreated after a drag or throw doesn't lose
     * the hover slow-down.
     * @returns {number}
     */
    targetSpeed(): number;
    play(rampUp?: boolean): void;
    pause(): void;
    slowDown(): void;
    speedUp(): void;
    /**
     * Setup pointer-based drag + throw interaction.
     * Mirrors the Looper module's physics (velocity sampling + Motion inertia).
     */
    setupDrag(): void;
    /**
     * Throw the marquee with momentum after a drag release.
     * @param {number} velocity - Cursor velocity in px/second
     */
    startInertia(velocity: number): void;
    /**
     * Resume the auto-crawl from the current position, ramping back up to full
     * speed so it eases out of a throw rather than snapping.
     */
    resumeCrawl(): void;
    setupObserver(): void;
    fillText(): void;
    measuredHeight: any;
    setHeight(): void;
    destroy(): void;
}
