/**
 * SmartVideo class for lazy loading and in-view playback of videos
 */
export default class SmartVideo {
    /**
     * Create a new SmartVideo instance
     * @param {Object} app - Application instance
     * @param {SmartVideoOptions} [opts={}] - SmartVideo options
     */
    constructor(app: any, opts?: SmartVideoOptions);
    app: any;
    opts: any;
    target: any;
    /** @type {Map<HTMLElement, HTMLVideoElement>} */
    videos: Map<HTMLElement, HTMLVideoElement>;
    events: AbortController;
    loadObserver: IntersectionObserver;
    playObserver: IntersectionObserver;
    /**
     * @param {HTMLElement} el - The `[data-smart-video]` wrapper
     * @param {HTMLVideoElement} video - The video inside it
     */
    initializeVideo(el: HTMLElement, video: HTMLVideoElement): void;
    /**
     * Give a wrapper's video its source and reveal the wrapper.
     * @param {HTMLElement} el - The `[data-smart-video]` wrapper
     */
    load(el: HTMLElement): void;
    /**
     * Load and play a wrapper's video.
     * @param {HTMLElement} el - The `[data-smart-video]` wrapper
     */
    play(el: HTMLElement): void;
    handleLoadEntries(entries: any): void;
    handlePlayEntries(entries: any): void;
    /**
     * Stop observing and remove the click handlers.
     */
    destroy(): void;
}
export type SmartVideoOptions = {
    /**
     * - Selector for the video wrappers
     */
    selector?: string;
    /**
     * - Container to find the wrappers in. Defaults to document.body
     */
    target?: HTMLElement | null;
    /**
     * - How near the viewport a lazy video gets its source
     */
    loadRootMargin?: string;
};
