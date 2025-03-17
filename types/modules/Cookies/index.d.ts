/**
 * Cookies module for handling cookie consent
 */
export default class Cookies {
    /**
     * Create a new Cookies instance
     * @param {Object} app - Application instance
     * @param {CookiesOptions} [opts={}] - Cookies options
     */
    constructor(app: any, opts?: CookiesOptions);
    app: any;
    opts: any;
    cc: Element;
    inner: Element;
    text: Element;
    btns: Element;
    btn: Element;
    btnRefuse: Element;
    /**
     * Get a cookie value by key
     * @param {string} sKey - Cookie key
     * @returns {string|null} Cookie value or null if not found
     */
    getCookie(sKey: string): string | null;
    /**
     * Set a cookie
     * @param {string} sKey - Cookie key
     * @param {string|number} sValue - Cookie value
     * @param {Date|string|number} vEnd - Expiration date, string date, or max age in seconds
     * @param {string} [sPath] - Cookie path
     * @param {string} [sDomain] - Cookie domain
     * @param {boolean} [bSecure] - Secure flag
     * @returns {boolean} Whether cookie was set successfully
     */
    setCookie(sKey: string, sValue: string | number, vEnd: Date | string | number, sPath?: string, sDomain?: string, bSecure?: boolean): boolean;
    /**
     * Remove a cookie
     * @param {string} sKey - Cookie key
     * @param {string} [sPath] - Cookie path
     * @param {string} [sDomain] - Cookie domain
     * @returns {boolean} Whether cookie was removed successfully
     */
    removeCookie(sKey: string, sPath?: string, sDomain?: string): boolean;
    /**
     * Check if a cookie exists
     * @param {string} sKey - Cookie key
     * @returns {boolean} Whether cookie exists
     */
    hasCookie(sKey: string): boolean;
    /**
     * Get all cookie keys
     * @returns {string[]} Array of cookie keys
     */
    keys(): string[];
}
export type CookiesOptions = {
    /**
     * - Called when cookies are accepted
     */
    onAccept?: Function;
    /**
     * - Called when cookies are refused
     */
    onRefuse?: Function;
    /**
     * - Called if user has already consented to cookies
     */
    alreadyConsented?: Function;
    /**
     * - Called if user has already refused cookies
     */
    alreadyRefused?: Function;
    /**
     * - Custom function to set cookies
     */
    setCookies?: Function;
    /**
     * - Custom function to display cookie consent dialog
     */
    showCC?: Function;
};
