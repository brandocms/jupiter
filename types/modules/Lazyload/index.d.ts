/**
 * Types for Lazyload module
 */
import Application from '../Application';

/**
 * Intersection Observer configuration
 */
export interface IntersectionObserverConfig {
  /** Margin around the root */
  rootMargin?: string;
  /** Threshold for intersection */
  threshold?: number;
}

/**
 * Lazyload options
 */
export interface LazyloadOptions {
  /** Configuration for the reveal intersection observer */
  revealIntersectionObserverConfig?: IntersectionObserverConfig;
  
  /** Configuration for the load intersection observer */
  loadIntersectionObserverConfig?: IntersectionObserverConfig;
  
  /** Configuration for general intersection observers */
  intersectionObserverConfig?: IntersectionObserverConfig;
  
  /** Whether to use native lazyloading if available */
  useNativeLazyloadIfAvailable?: boolean;
  
  /** Lazyload mode */
  mode?: string;
  
  /** Minimum size for auto sizing */
  minSize?: number;
  
  /** Whether to update sizes attribute */
  updateSizes?: boolean;
  
  /** Whether to register a callback for APPLICATION_REVEALED event */
  registerCallback?: boolean;
}

/**
 * Lazyload class for handling image lazy loading
 */
export default class Lazyload {
  /** Application instance */
  app: Application;
  
  /** Lazyload options */
  opts: LazyloadOptions;
  
  /** Images with auto sizes */
  $autoSizesImages: NodeListOf<HTMLImageElement>;
  
  /** All lazy pictures */
  lazyPictures: NodeListOf<HTMLElement>;
  
  /** All lazy images */
  lazyImages: NodeListOf<HTMLImageElement>;
  
  /** Observer for loading images */
  loadObserver: IntersectionObserver;
  
  /** Observer for revealing images */
  revealObserver: IntersectionObserver;
  
  /** Observer for loading individual images */
  imageObserver: IntersectionObserver;
  
  /**
   * Create a new Lazyload instance
   * @param app - Application instance
   * @param opts - Lazyload options
   */
  constructor(app: Application, opts?: Partial<LazyloadOptions>);
  
  /**
   * Start watching for elements to come into view
   */
  watch(): void;
  
  /**
   * Initialize lazyloading
   */
  initialize(): void;
  
  /**
   * Initialize an observer for pictures
   * @param observer - IntersectionObserver to use
   * @param setAttrs - Whether to set attributes on elements
   */
  initObserver(observer: IntersectionObserver, setAttrs?: boolean): void;
  
  /**
   * Force load all images in a container
   * @param container - Container element
   */
  forceLoad(container?: HTMLElement): void;
  
  /**
   * Initialize auto sizes for images
   */
  initializeAutoSizes(): void;
  
  /**
   * Set sizes attribute for all imgs with data-sizes="auto"
   */
  autoSizes(): void;
  
  /**
   * Get width of an image
   * @param img - Image element
   */
  getWidth(img: HTMLImageElement): number;
  
  /**
   * Initialize lazyload for sections
   */
  initializeSections(): void;
  
  /**
   * Handle entries for loading pictures
   * @param elements - Intersection observer entries
   */
  handleLoadEntries(elements: IntersectionObserverEntry[]): void;
  
  /**
   * Handle entries for revealing pictures
   * @param elements - Intersection observer entries
   */
  handleRevealEntries(elements: IntersectionObserverEntry[]): void;
  
  /**
   * Load a picture
   * @param picture - Picture element
   */
  loadPicture(picture: HTMLElement): void;
  
  /**
   * Reveal a picture
   * @param picture - Picture element
   */
  revealPicture(picture: HTMLElement): void;
  
  /**
   * Handle lazyloading of images
   * @param elements - Intersection observer entries
   */
  lazyloadImages(elements: IntersectionObserverEntry[]): void;
  
  /**
   * Swap image src with data-src
   * @param image - Image element
   */
  swapImage(image: HTMLImageElement): void;
  
  /**
   * Swap picture srcset with data-srcset
   * @param picture - Picture element
   */
  swapPicture(picture: HTMLElement): void;
}
