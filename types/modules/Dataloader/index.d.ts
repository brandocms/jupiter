export default class Dataloader {
    /**
     * Replace an element's innerHTML with content fetched from a URL
     *
     * @param {HTMLElement} el - Target element
     * @param {string} url - URL to fetch HTML from
     * @returns {Promise<HTMLElement>} The element with updated content
     */
    static replaceInnerHTML(el: HTMLElement, url: string): Promise<HTMLElement>;
    constructor(app: any, $el: any, opts?: {});
    status: string;
    app: any;
    $el: any;
    id: any;
    $canvasEl: any;
    opts: any;
    debounce(func: any, delay: any): (...args: any[]) => void;
    updateBaseURL(url: any): void;
    baseURL: any;
    setInitialParams(): void;
    initialize(): void;
    $paramEls: any;
    _boundOnParam: any;
    _boundOnMore: any;
    _boundOnFilter: (...args: any[]) => void;
    urlSync: DataloaderUrlSync;
    $moreBtn: any;
    $filterInput: any;
    onFilterInput(e: any): void;
    onMore(e: any): void;
    getParamKey(el: any): any;
    handleCheckboxParam(el: any): void;
    handleDeselectParam(el: any, multiVals: any): void;
    handleMultiSelectParam(el: any): void;
    handleSingleSelectParam(el: any): void;
    onParam(e: any): void;
    fetch(addEntries?: boolean): void;
    _abortController: AbortController;
    /**
     * Set [data-loader-loading] on main el
     */
    loading(): void;
    /**
     * Remove [data-loader-loading] on main el
     */
    complete(): void;
    /**
     * Update the MORE button
     *
     * Sets [data-loader-starved] attribute if there is no more to fetch
     */
    updateButton(): void;
    /**
     * Remove all event listeners and clean up resources
     */
    destroy(): void;
}
export type DataloaderOptions = {
    /**
     * - Starting page index for pagination
     */
    page: number;
    /**
     * - Initial parameter key/value pairs for API requests
     */
    loaderParam: any;
    /**
     * - Initial search filter string
     */
    filter: string;
    /**
     * - Debounce delay in ms for filter input
     */
    filterDebounce: number;
    /**
     * - URL sync config keyed by loader ID
     */
    urlSync: any | null;
    /**
     * - Callback after fetch completes, receives dataloader instance
     */
    onFetch: Function;
};
import DataloaderUrlSync from './url-sync';
