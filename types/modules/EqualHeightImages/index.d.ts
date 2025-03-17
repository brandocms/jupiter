export default class EqualHeightImages {
    constructor(app: any, opts?: {}, container?: HTMLElement);
    app: any;
    container: HTMLElement;
    opts: any;
    run(): void;
    initialize(): void;
    canvases: any[];
    getRenderedSize(contains: any, cWidth: any, cHeight: any, width: any, height: any, pos: any): any;
    getImgSizeInfo(img: any): any;
}
