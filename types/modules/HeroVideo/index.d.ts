export default class HeroVideo {
    constructor(app: any, opts?: {});
    app: any;
    booting: boolean;
    playing: boolean;
    forcePaused: boolean;
    opts: any;
    elements: {};
    el: any;
    initialize(): void;
    cover: any;
    videoDiv: any;
    video: any;
    setSrc(): void;
    addEvents(): void;
    play(): void;
    pause(): void;
    fadeIn(): void;
    fadeInCover(): void;
    addObserver(): void;
    /**
     * Add a window resize handler that resizes video width
     */
    _addResizeHandler(): void;
    observer: IntersectionObserver;
    _resize(): void;
}
