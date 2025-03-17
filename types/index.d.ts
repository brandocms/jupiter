/**
 * @file Type definitions for Jupiter - a frontend toolkit for animations and interactions
 */

export { 
  default as Application,
  ApplicationOptions,
  ApplicationSize,
  ApplicationPosition,
  ApplicationState
} from './modules/Application';

export {
  default as Lazyload,
  LazyloadOptions,
  IntersectionObserverConfig
} from './modules/Lazyload';

export { 
  default as Moonwalk, 
  MoonwalkOptions, 
  MoonwalkWalk, 
  MoonwalkRun, 
  MoonwalkTransition 
} from './modules/Moonwalk';

// Global module augmentation
declare global {
  interface Window {
    bfTO?: number;
    Vimeo?: any;
    picturefill?: () => void;
    objectFitPolyfill?: () => void;
    timeline?: any;
    marquee?: any;
  }
}
