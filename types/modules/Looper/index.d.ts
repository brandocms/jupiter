/**
 * Looper Module Class
 */
export default class Looper {
    constructor(app: any, opts?: {});
    app: any;
    opts: any;
    loopers: any[];
    pendingLoopers: any[];
    init(): void;
    looperElements: any;
    finalizeLoopers(): void;
    destroy(): void;
}
