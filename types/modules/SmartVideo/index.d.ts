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
    /**
     * A wrapper's source, once set: null, or while hls.js loads, a promise.
     * @type {Map<HTMLElement, Promise<void>|null>}
     */
    sources: Map<HTMLElement, Promise<void> | null>;
    /**
     * The hls.js players of the streams the browser cannot play itself
     * @type {Map<HTMLElement, { destroy(): void }>}
     */
    streams: Map<HTMLElement, {
        destroy(): void;
    }>;
    /**
     * Wrappers to play once hls.js has loaded
     * @type {Set<HTMLElement>}
     */
    waiting: Set<HTMLElement>;
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
     * @returns {Promise<void>|null} A promise while hls.js loads for the video
     */
    load(el: HTMLElement): Promise<void> | null;
    /**
     * @param {HTMLElement} el - The `[data-smart-video]` wrapper
     * @param {HTMLVideoElement} video - The video inside it
     * @returns {Promise<void>|null}
     */
    setSource(el: HTMLElement, video: HTMLVideoElement): Promise<void> | null;
    /**
     * Play an HLS playlist through hls.js, which is loaded only for it.
     * @param {HTMLElement} el - The `[data-smart-video]` wrapper
     * @param {HTMLVideoElement} video - The video inside it
     * @param {string} src - The playlist
     */
    attachStream(el: HTMLElement, video: HTMLVideoElement, src: string): Promise<void>;
    /**
     * Load and play a wrapper's video.
     * @param {HTMLElement} el - The `[data-smart-video]` wrapper
     */
    play(el: HTMLElement): void;
    /**
     * Pause a wrapper's video, or keep it from starting once hls.js has loaded.
     * @param {HTMLElement} el - The `[data-smart-video]` wrapper
     */
    pause(el: HTMLElement): void;
    handleLoadEntries(entries: any): void;
    handlePlayEntries(entries: any): void;
    /**
     * Stop observing, remove the click handlers and destroy the hls.js players.
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
