/**
 * @typedef {Object} TypographySettings
 * @property {number} [minWords=4] - Minimum number of words required to apply fixes
 * @property {string} [selector='[data-typo]'] - Selector for elements to process
 * @property {string} [ignoreClass='no-typo-fix'] - Class to exclude elements from processing
 * @property {boolean} [ignoreExistingSpaceChars=false] - Whether to ignore elements with existing non-breaking spaces
 */
/**
 * Typography class for enhancing text presentation, including orphan prevention
 */
export default class Typography {
    /**
     * Create a new Typography instance
     * @param {HTMLElement|undefined} parent - Parent element to search for typography elements, or undefined for document
     * @param {TypographySettings} settings - Typography settings
     */
    constructor(parent: HTMLElement | undefined, settings?: TypographySettings);
    settings: {
        /**
         * - Minimum number of words required to apply fixes
         */
        minWords: number;
        /**
         * - Selector for elements to process
         */
        selector: string;
        /**
         * - Class to exclude elements from processing
         */
        ignoreClass: string;
        /**
         * - Whether to ignore elements with existing non-breaking spaces
         */
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
export type TypographySettings = {
    /**
     * - Minimum number of words required to apply fixes
     */
    minWords?: number;
    /**
     * - Selector for elements to process
     */
    selector?: string;
    /**
     * - Class to exclude elements from processing
     */
    ignoreClass?: string;
    /**
     * - Whether to ignore elements with existing non-breaking spaces
     */
    ignoreExistingSpaceChars?: boolean;
};
