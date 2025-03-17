/**
 * Types for Moonwalk animation module
 */

/**
 * Transition configuration for animations
 */
export interface MoonwalkTransition {
  /**
   * Starting properties for the transition
   */
  from: Record<string, any>;
  
  /**
   * Ending properties for the transition
   */
  to: Record<string, any>;
}

/**
 * Configuration for a walk animation
 */
export interface MoonwalkWalk {
  /**
   * Delay before the animation starts (in seconds)
   * @default 0
   */
  startDelay?: number;
  
  /**
   * Time between animations in a sequence (in seconds)
   * @default 0.15
   */
  interval?: number;
  
  /**
   * Duration of the animation (in seconds)
   * @default 0.65
   */
  duration?: number;
  
  /**
   * Whether to add a separate opacity tween
   * @default false
   */
  alphaTween?: boolean | Record<string, any>;
  
  /**
   * The transition configuration
   */
  transition: MoonwalkTransition;
  
  /**
   * CSS selector for targeting elements in named sections
   */
  sectionTargets?: string;
}

/**
 * Configuration for a run animation
 */
export interface MoonwalkRun {
  /**
   * IntersectionObserver threshold
   * @default 0
   */
  threshold?: number;
  
  /**
   * Function called when element enters viewport
   */
  callback: (element: HTMLElement, repeated?: boolean) => void;
  
  /**
   * Function called when element exits viewport
   */
  onExit?: (element: HTMLElement, exited?: boolean) => void;
  
  /**
   * Whether the run should repeat
   * @default false
   */
  repeated?: boolean;
  
  /**
   * IntersectionObserver rootMargin
   */
  rootMargin?: string;
  
  /**
   * Function called during initialization
   */
  initialize?: (element: HTMLElement) => void;
}

/**
 * Moonwalk options configuration
 */
export interface MoonwalkOptions {
  /**
   * Event to trigger animations
   * @default Events.APPLICATION_REVEALED
   */
  on?: string | (() => void);
  
  /**
   * Delay before starting animations (in seconds)
   * @default 0.1
   */
  initialDelay?: number;
  
  /**
   * Clear data-ll-srcset attributes
   * @default false
   */
  clearLazyload?: boolean;
  
  /**
   * Remove nested data-moonwalk-section attributes
   * @default true
   */
  clearNestedSections?: boolean;
  
  /**
   * Remove nested data-moonwalk attributes
   * @default true
   */
  clearNestedWalks?: boolean;
  
  /**
   * Disable animations when page loaded via anchor
   * @default true
   */
  clearMoonwalkOnAnchors?: boolean;
  
  /**
   * Warn when run and section on same element
   * @default true
   */
  warnRunWithSection?: boolean;
  
  /**
   * Default IntersectionObserver rootMargin
   * @default '-10% 0%'
   */
  rootMargin?: string;
  
  /**
   * Default IntersectionObserver threshold
   * @default 0
   */
  threshold?: number;
  
  /**
   * Generate unique IDs for moonwalk elements
   * @default false
   */
  uniqueIds?: boolean;
  
  /**
   * Add index attributes to elements
   * @default false
   */
  addIndexes?: boolean;
  
  /**
   * Run configurations
   * @default {}
   */
  runs?: Record<string, MoonwalkRun>;
  
  /**
   * Walk configurations
   */
  walks: Record<string, MoonwalkWalk>;
}

/**
 * Moonwalk animation system for scroll-based reveal animations
 */
export default class Moonwalk {
  /**
   * @param app - The application instance
   * @param opts - Configuration options
   * @param container - Container element
   */
  constructor(app: any, opts?: Partial<MoonwalkOptions>, container?: HTMLElement);
  
  /**
   * Initialize the Moonwalk instance
   */
  initialize(container?: HTMLElement): void;
  
  /**
   * Remove all moonwalks from the container
   */
  removeAllWalks(container?: HTMLElement): void;
  
  /**
   * Remove specific moonwalks by selector
   */
  removeFor(container: HTMLElement, selector: string): void;
  
  /**
   * Remove run matching name
   */
  removeRun(container: HTMLElement, name: string): void;
  
  /**
   * Remove all runs
   */
  removeRuns(container?: HTMLElement): void;
  
  /**
   * Trigger the ready state and start animating
   */
  ready(): void;
}
