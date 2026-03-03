export default class HeroSlider {
    constructor(app: any, opts?: {});
    app: any;
    opts: any;
    el: any;
    initialize(): void;
    slides: any;
    images: any;
    slideCount: number;
    _currentSlideIdx: any;
    /**
     * Calculate which slide is next, and call the slide function
     */
    next(): void;
    _previousSlide: any;
    _nextSlide: any;
    _currentSlide: any;
    /**
     * Switches between slides
     */
    slide(type: any): void;
    _currentAnimation: any;
    /**
     * Add a window resize handler that resizes slide widths
     */
    _addResizeHandler(): void;
    observer: IntersectionObserver;
    _resizeSlides(): void;
    resizeAnimation: any;
    /**
     * Add a visibility change handler to restart animations when tab becomes visible
     */
    _addVisibilityHandler(): void;
    /**
     * Reset slide states and restart the animation cycle
     */
    _resetAndRestart(): void;
}
