export default class FeatureTests {
    constructor(app: any, tests: any);
    app: any;
    testFns: {
        touch: () => boolean;
    };
    results: {};
    deviceLastTouched: number;
    runTests(tests: any): void;
    testFor(feature: any, result: any): void;
    /**
     * Check if we should outline elements. If the user hits TAB, we should outline,
     * otherwise we skip it.
     */
    testOutlineEvents(): void;
    /**
     * Sometimes the initial test for touch/mouse fail, so
     * listen for events as well
     */
    testTouchMouseEvents(): void;
    bindEventTests(): void;
    testTouch(): boolean;
    testIE11(): boolean;
    testIOS(): RegExpMatchArray;
    testBrowsers(): string;
    testWebview(): RegExpMatchArray;
}
