export default class Lightbox {
    constructor(app: any, opts?: {});
    app: any;
    opts: any;
    lightboxes: NodeListOf<Element>;
    elements: {};
    imgAlts: any[];
    imgs: any[];
    sections: {};
    currentIndex: any;
    firstTransition: boolean;
    previousCaption: any;
    timelines: {
        caption: any;
        image: any;
    };
    showBox(section: any, index: any): void;
    buildBox(section: any, index: any): void;
    keyUpCallback: (event: any) => void;
    close(): void;
    currentImage: any;
    destroy(): void;
    setImg(section: any, index: any): void;
    nextImage: any;
    getNextIdx(section: any): any;
    getPrevIdx(section: any): number;
    onClick(e: any, section: any): void;
    onKeyup(e: any, section: any): void;
    onMouseMove(e: any): void;
    pointerDirection: string;
    attachSwiper(section: any, el: any, initialIdx: any): void;
}
