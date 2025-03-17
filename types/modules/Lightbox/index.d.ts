/**
 * Lightbox component for displaying images in a fullscreen overlay
 */
export default class Lightbox {
    /**
     * Create a new Lightbox instance
     * @param {Object} app - Application instance
     * @param {LightboxOptions} [opts={}] - Lightbox options
     */
    constructor(app: any, opts?: LightboxOptions);
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
export type LightboxElements = {
    /**
     * - Function to create right arrow element
     */
    arrowRight?: Function;
    /**
     * - Function to create left arrow element
     */
    arrowLeft?: Function;
    /**
     * - Function to create close button element
     */
    close?: Function;
    /**
     * - Function to create dot/indicator element
     */
    dot?: Function;
};
export type LightboxOptions = {
    /**
     * - Enable captions
     */
    captions?: boolean;
    /**
     * - Enable index numbers
     */
    numbers?: boolean;
    /**
     * - Enable swipe - this breaks native zoom
     */
    swipe?: boolean;
    /**
     * - Selector for trigger element to open the lightbox
     */
    trigger?: string | boolean;
    /**
     * - Custom elements configuration
     */
    elements?: LightboxElements;
    /**
     * - Click handler for lightbox
     */
    onClick?: Function;
    /**
     * - Called when pointer moves left
     */
    onPointerLeft?: Function;
    /**
     * - Called when pointer moves right
     */
    onPointerRight?: Function;
    /**
     * - Called when caption fades out
     */
    onCaptionOut?: Function;
    /**
     * - Called when caption fades in
     */
    onCaptionIn?: Function;
    /**
     * - Called when image fades out
     */
    onImageOut?: Function;
    /**
     * - Called when image fades in
     */
    onImageIn?: Function;
    /**
     * - Called when numbers display updates
     */
    onNumbers?: Function;
    /**
     * - Called before opening lightbox
     */
    onBeforeOpen?: Function;
    /**
     * - Called when lightbox opens
     */
    onOpen?: Function;
    /**
     * - Called after lightbox closes
     */
    onAfterClose?: Function;
    /**
     * - Called when lightbox closes
     */
    onClose?: Function;
};
