export default class Cookies {
    constructor(app: any, opts?: {});
    app: any;
    opts: any;
    cc: Element;
    inner: Element;
    text: Element;
    btns: Element;
    btn: Element;
    btnRefuse: Element;
    getCookie(sKey: any): string;
    setCookie(sKey: any, sValue: any, vEnd: any, sPath: any, sDomain: any, bSecure: any): boolean;
    removeCookie(sKey: any, sPath: any, sDomain: any): boolean;
    hasCookie(sKey: any): boolean;
    keys(): string[];
}
