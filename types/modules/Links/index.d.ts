/**
 * Links handler for navigation and transitions
 */
export default class Links {
    /**
     * Create a new Links instance
     * @param {Object} app - Application instance
     * @param {LinksOptions} [opts={}] - Links options
     */
    constructor(app: any, opts?: LinksOptions);
    app: any;
    opts: any;
    transitioned: boolean;
    /**
     * Restoring a page from the bfcache resumes the page transition's animations. Motion
     * completes them on the first frame and renders `main` hidden again (`opacity: 0`,
     * `y: 25`) over the Application's visibility fix, leaving a blank page between header
     * and footer. Starting a new animation to the resting values replaces them and keeps
     * Motion's own values in step, so nothing renders the hidden state back.
     */
    onPageShow(event: any): void;
    bindHeroLink(): void;
    bindAnchors(anchors: any): void;
    bindLinks(links: any): void;
    normalizeHostname(hostname: any): any;
}
export type LinksOptions = {
    /**
     * - Whether to trigger events when scrolling
     */
    triggerEvents?: boolean;
    /**
     * - Duration of scroll animation
     */
    scrollDuration?: number;
    /**
     * - Whether to offset scroll for nav header
     */
    scrollOffsetNav?: boolean;
    /**
     * - Delay for mobile menu before scrolling
     */
    mobileMenuDelay?: number;
    /**
     * - Whether to open external links in new window
     */
    openExternalInWindow?: boolean;
    /**
     * - Query selector for regular links
     */
    linkQuery?: string;
    /**
     * - Query selector for anchor links
     */
    anchorQuery?: string;
    /**
     * - Called when an anchor link is clicked
     */
    onAnchor?: Function;
    /**
     * - Called when transitioning between pages
     */
    onTransition?: Function;
};
