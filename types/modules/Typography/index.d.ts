export default class Typography {
    constructor(parent: any, settings?: {});
    settings: {
        minWords: number;
        selector: string;
        ignoreClass: string;
        ignoreExistingSpaceChars: boolean;
    };
    elems: any[];
    /**
     * Apply formatting to the loaded elements
     * @return void
     */
    apply(): void;
    /**
     * Apply the orphans filter to the passed text and return it
     * @param {string} textItems
     */
    preventOrphans(textItems: string): string;
    /**
     * Reset any formatting
     * @return void
     */
    reset(): void;
    /**
     * Run checks to see if the passed element should be skipped
     *
     * @param {HTMLElement} elem
     * @returns boolean
     */
    shouldElementBeIgnored(elem: HTMLElement): boolean;
}
