export default class HeroSlider {
    constructor(app: any, opts?: {});
    app: any;
    opts: any;
    el: any;
    initialize(): void;
    slides: any;
    events: AbortController;
    images: any;
    slideCount: number;
    _currentSlideIdx: number;
    unsubscribe: any;
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
    _currentAnimation: import("motion-dom").AnimationPlaybackControlsWithThen;
    /**
     * Add a window resize handler that resizes slide widths
     */
    _addResizeHandler(): void;
    resizeHandler: any;
    observer: IntersectionObserver;
    _resizeSlides(): void;
    resizeAnimation: import("motion-dom").AnimationPlaybackControlsWithThen;
    /**
     * Add a visibility change handler to restart animations when tab becomes visible
     */
    _addVisibilityHandler(): void;
    /**
     * Remove listeners and cancel running animations.
     */
    destroy(): void;
    _resetAndRestart(): void;
}
