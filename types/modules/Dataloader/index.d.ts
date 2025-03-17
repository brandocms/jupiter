export default class Dataloader {
    static replaceInnerHTML(el: any, url: any): Promise<any>;
    constructor(app: any, $el: any, opts?: {});
    status: string;
    app: any;
    $el: any;
    $canvasEl: any;
    opts: any;
    debounce(func: any, delay?: number): (...args: any[]) => void;
    updateBaseURL(url: any): void;
    baseURL: any;
    initialize(): void;
    $paramEls: any[];
    $moreBtn: any;
    $filterInput: any;
    id: any;
    onFilterInput(e: any): void;
    onMore(e: any): void;
    onParam(e: any): void;
    fetch(addEntries?: boolean): void;
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
}
