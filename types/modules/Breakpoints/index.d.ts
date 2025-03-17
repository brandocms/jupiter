export default class Breakpoints {
    constructor(app: any, opts?: {});
    app: any;
    mediaQueries: {};
    opts: any;
    initialize(reveal?: boolean): void;
    getCurrentBreakpoint(): {
        key: string;
        mq: any;
    };
    defaultListener(e: any): void;
    setCurrentBreakpoint(): void;
    _getVal(key: any): string;
}
