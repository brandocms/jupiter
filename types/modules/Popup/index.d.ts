export default class Popup {
    constructor(app: any, opts?: {});
    app: any;
    opts: any;
    bindTriggers(): void;
    createBackdrop(): void;
    backdrop: HTMLDivElement;
    open(trigger: any, target: any): void;
    keyUpListener: any;
    close(): void;
    onKeyup(e: any): void;
}
