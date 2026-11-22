/**
 * URL synchronization module for Dataloader
 * Handles bidirectional sync between dataloader parameters and browser URL
 */
export default class DataloaderUrlSync {
    constructor(dataloader: any, config: any);
    dataloader: any;
    config: any;
    language: string;
    languageInPath: any;
    hideDefaultLanguage: boolean;
    defaultLanguage: any;
    omitFromUrl: any;
    initialize(): void;
    popstateHandler: () => void;
    /**
     * Build URL from parameters using template
     */
    buildUrl(params: any): any;
    /**
     * Parse current URL and extract parameters based on template
     */
    parseUrl(): any;
    /**
     * Update browser URL with current parameters
     */
    updateUrl(params: any): void;
    /**
     * Sync dataloader parameters from current URL
     */
    syncFromUrl(): void;
    /**
     * Clean up event listeners
     */
    destroy(): void;
}
