declare const _default: DOM;
export default _default;
declare class DOM {
    body: HTMLElement;
    html: HTMLElement;
    "new"(arg: any): ChildNode[];
    find(arg1: any, arg2: any): any;
    all(arg1: any, arg2: any): any[];
    create(element: any, ...classes: any[]): any;
    append(element: any): void;
    remove(element: any): void;
    addClass(element: any, ...classes: any[]): any;
    removeClass(element: any, ...classes: any[]): any;
    hasClass(element: any, className: any): any;
    toggleClass(element: any, ...classes: any[]): any[];
    hasAttribute(element: any, attributeName: any): any;
    overlapsVertically($div1: any, $div2: any): number;
    outerHeight(el: any): any;
    outerWidth(el: any): any;
    getCSSVar(key: any, element?: HTMLElement): string;
    setCSSVar(key: any, val: any, element?: HTMLElement): void;
    removeCSSVar(key: any, element?: HTMLElement): void;
    offset(el: any): {
        top: any;
        left: any;
    };
    position(el: any): {
        top: any;
        left: any;
    };
    /**
     * Check if parts of `el` is in viewport
     *
     * @param {*} el
     */
    inViewport(el: any): boolean;
}
