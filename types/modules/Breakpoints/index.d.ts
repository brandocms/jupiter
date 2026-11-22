/**
 * Breakpoints module for responsive design
 */
export default class Breakpoints {
    /**
     * Create a new Breakpoints instance
     * @param {Object} app - Application instance
     * @param {BreakpointsOptions} [opts={}] - Breakpoints options
     */
    constructor(app: any, opts?: BreakpointsOptions);
    app: any;
    mediaQueries: {};
    listeners: AbortController;
    mediaCleanups: any[];
    opts: any;
    currentBreakpoint: string;
    initialized: boolean;
    initialize(reveal?: boolean): void;
    getCurrentBreakpoint(): {
        key: string;
        mq: any;
    };
    destroy(): void;
    defaultListener(e: any): void;
    setCurrentBreakpoint(): void;
    _getVal(key: any): string;
}
export type BreakpointsOptions = {
    /**
     * - Whether to run listener on initialization
     */
    runListenerOnInit?: boolean;
    /**
     * - Breakpoint names
     */
    breakpoints?: string[];
    /**
     * - Listener functions for breakpoints
     */
    listeners?: {
        [x: string]: Function;
    };
};
