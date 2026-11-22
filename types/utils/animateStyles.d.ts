/** The widgets use the finished promise on both animation paths. */
export default function animateStyles(element: any, keyframes: any, options: any): import("motion-dom").AnimationPlaybackControlsWithThen | {
    finished: Promise<any>;
};
