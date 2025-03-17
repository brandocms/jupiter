/**
 * HeroVideo component for handling responsive background videos with controls
 */
export default class HeroVideo {
    /**
     * Create a new HeroVideo instance
     * @param {Object} app - Application instance
     * @param {HeroVideoOptions} [opts={}] - HeroVideo options
     */
    constructor(app: any, opts?: HeroVideoOptions);
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
export type HeroVideoElementGenerators = {
    /**
     * - Function that returns the pause button HTML
     */
    pause?: Function;
    /**
     * - Function that returns the play button HTML
     */
    play?: Function;
};
export type HeroVideoOptions = {
    /**
     * - Target element selector or element
     */
    el?: string | HTMLElement;
    /**
     * - Called when video fades in
     */
    onFadeIn?: Function;
    /**
     * - Called when cover fades in
     */
    onFadeInCover?: Function;
    /**
     * - Called when cover fades out
     */
    onFadeOutCover?: Function;
    /**
     * - Called when video is ready to play
     */
    onPlayReady?: Function;
    /**
     * - Called when play button is clicked
     */
    onClickPlay?: Function;
    /**
     * - Called when pause button is clicked
     */
    onClickPause?: Function;
    /**
     * - Selector for parent element to append pause button to
     */
    pauseParent?: string;
    /**
     * - Element generators for UI components
     */
    elements?: HeroVideoElementGenerators;
};
