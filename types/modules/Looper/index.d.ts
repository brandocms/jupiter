/**
 * Options for configuring the Looper module
 */
export interface LooperOptions {
  /** Center the loop container. Can be true, false, or a selector string */
  center?: boolean | string;
  /** Enable snap-to-item behavior. Can be true, false, or a number for custom snap distance */
  snap?: boolean | number;
  /** Enable continuous auto-scrolling */
  crawl?: boolean;
  /** Enable infinite looping. If false, creates linear scrolling */
  loop?: boolean;
  /** Enable drag interaction with mouse/touch */
  draggable?: boolean;
  /** Speed multipliers for different breakpoints */
  speed?: {
    sm?: number;
    lg?: number;
  };
  /** Easing configuration for hover interactions */
  ease?: {
    mouseOver?: {
      speed?: number;
      duration?: number;
    };
    mouseOut?: {
      speed?: number;
      duration?: number;
    };
  };
  /** CSS selector for looper elements */
  selector?: string;
  /** Extra padding on the right side in pixels */
  paddingRight?: number | string;
  /** Start in reversed direction */
  reversed?: boolean;
}

/**
 * Loop controller returned by horizontalLoop function
 */
export interface LoopController {
  /** Motion value tracking the current position */
  position: any;
  /** Main animation instance */
  animation: any;
  /** Array of item elements */
  items: HTMLElement[];
  /** Array of snap time positions */
  times: number[];
  /** Whether the loop is reversed */
  isReversed: boolean;
  /** Whether the loop is in looping mode */
  isLooping: boolean;

  /** Start/resume the loop animation */
  play(): void;

  /** Pause the loop animation */
  pause(): void;

  /** Get the current active item index */
  current(): number;

  /** Find the closest item index to current position */
  closestIndex(setCurrent?: boolean): number;

  /** Navigate to the next item */
  next(vars?: { duration?: number; easing?: string }): any;

  /** Navigate to the previous item */
  previous(vars?: { duration?: number; easing?: string }): any;

  /** Navigate to a specific item index */
  toIndex(index: number, vars?: { duration?: number; easing?: string }): any;

  /** Refresh measurements and recalculate (useful after resize) */
  refresh(deep?: boolean): void;

  /** Clean up and destroy the loop */
  destroy(): void;
}

/**
 * Looper Module
 * Creates seamless horizontal infinite scrolling carousels with drag interaction,
 * momentum/inertia, auto-crawl, snap-to-item, and responsive resize handling
 */
export default class Looper {
  /**
   * Create a new Looper instance
   * @param app - Jupiter application instance
   * @param opts - Configuration options
   */
  constructor(app: any, opts?: Partial<LooperOptions>);

  /** Configuration options */
  opts: LooperOptions;

  /** Jupiter application instance */
  app: any;

  /** Array of active loop controllers */
  loopers: LoopController[];

  /** Array of pending loopers waiting for initialization */
  pendingLoopers: any[];

  /** DOM elements matching the selector */
  looperElements: HTMLElement[];

  /**
   * Initialize the module and find all looper elements
   */
  init(): void;

  /**
   * Finalize loopers after APPLICATION:REVEALED event
   * This is when actual measurements and animations are set up
   */
  finalizeLoopers(): void;

  /**
   * Destroy all loopers and clean up
   */
  destroy(): void;
}
