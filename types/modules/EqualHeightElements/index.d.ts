export default class EqualHeightElements {
    constructor(app: any, selector: any, opts?: {}, container?: HTMLElement);
    app: any;
    container: HTMLElement;
    opts: any;
    selector: any;
    onResize: () => void;
    initialize(): void;
    destroy(): void;
}
