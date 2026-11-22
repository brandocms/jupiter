export default class EqualHeightImages {
    constructor(app: any, opts?: {}, container?: HTMLElement);
    app: any;
    container: HTMLElement;
    opts: any;
    adjusted: WeakSet<object>;
    onResize: () => void;
    run(): void;
    generation: any;
    destroy(): void;
    initialize(): void;
    canvases: any[];
    getRenderedSize(contains: any, cWidth: any, cHeight: any, width: any, height: any, pos: any): any;
    getImgSizeInfo(img: any): any;
}
