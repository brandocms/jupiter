/**
 * Types for Application module
 */
import Breakpoints from '../Breakpoints';
import Fontloader from '../Fontloader';
import FeatureTests from '../FeatureTests';

/**
 * Application size information
 */
export interface ApplicationSize {
  /** Current window width */
  width: number;
  /** Current window height */
  height: number;
  /** Initial inner height on page load */
  initialInnerHeight: number;
  /** Initial outer height on page load */
  initialOuterHeight: number;
  /** Initial inner width on page load */
  initialInnerWidth: number;
  /** Initial outer width on page load */
  initialOuterWidth: number;
  /** Current zoom level */
  zoom: number;
  /** Device pixel ratio */
  devicePixelRatio?: number;
  /** Container padding from CSS var */
  container?: string;
  /** Scroll height */
  scrollHeight?: number;
  /** Maximum viewport height */
  vh100max?: number;
  /** Base viewport width */
  baseVW?: string;
}

/**
 * Application position information
 */
export interface ApplicationPosition {
  /** Current scroll position from top */
  top: number;
  /** Current scroll position from left */
  left: number;
}

/**
 * Application state information
 */
export interface ApplicationState {
  /** Whether the application has been revealed */
  revealed: boolean;
  /** Whether scrolling is currently forced */
  forcedScroll: boolean;
}

/**
 * Fader options
 */
export interface FaderOptions {
  /** Function to fade in the application */
  fadeIn: (callback?: () => void) => void;
}

/**
 * Application options
 */
export interface ApplicationOptions {
  /** Whether to respect reduced motion user preference */
  respectReducedMotion?: boolean;
  
  /** Feature tests configuration */
  featureTests?: Record<string, any>;
  
  /** Elements that can receive focus */
  focusableSelectors?: string[];
  
  /** Whether to bind scroll events */
  bindScroll?: boolean;
  
  /** Whether to bind resize events */
  bindResize?: boolean;
  
  /** Whether to disable WebP in Safari */
  disableWebpSafari?: boolean;
  
  /** Fader options */
  faderOpts?: FaderOptions;
  
  /** Breakpoint configuration - can be object or function that returns config */
  breakpointConfig?: Record<string, any> | ((app: Application) => Record<string, any>);
  
  /** Fonts to load */
  fonts?: string[];
}

/**
 * Main application class for Jupiter framework
 */
export default class Application {
  /** Current debug state */
  debugType: number;
  /** Debug overlay element */
  debugOverlay: HTMLElement | null;
  /** User agent string */
  userAgent: string;
  /** Last recorded window height */
  _lastWindowHeight: number;
  /** Current breakpoint */
  breakpoint: string | null;
  /** Document language */
  language: string;
  /** Current browser name */
  browser?: string;
  
  /** Application size information */
  size: ApplicationSize;
  /** Application position information */
  position: ApplicationPosition;
  /** Application state information */
  state: ApplicationState;
  
  /** Application options */
  opts: ApplicationOptions;
  /** List of focusable selectors */
  focusableSelectors: string[];
  
  /** Feature tests instance */
  featureTests: FeatureTests;
  /** Breakpoints instance */
  breakpoints: Breakpoints;
  /** Font loader instance */
  fontLoader: Fontloader;
  
  /** Fader element */
  fader: HTMLElement | null;
  /** Registered callbacks by event type */
  callbacks: Record<string, Function[]>;
  
  /** Whether scrolling is locked */
  SCROLL_LOCKED: boolean;
  /** Width of scrollbar */
  SCROLLBAR_WIDTH: number | null;
  /** Whether application is initialized */
  INITIALIZED: boolean;
  /** Whether user prefers reduced motion */
  PREFERS_REDUCED_MOTION: boolean;
  
  /** Custom event for preludium phase */
  beforeInitializedEvent: CustomEvent;
  /** Custom event for initialized phase */
  initializedEvent: CustomEvent;
  /** Custom event for ready phase */
  readyEvent: CustomEvent;
  /** Custom event for revealed phase */
  revealedEvent: CustomEvent;
  
  /** Elements with scroll padding */
  _scrollPaddedElements?: Element[];
  
  /**
   * Create a new Application instance
   * @param opts - Configuration options
   */
  constructor(opts?: Partial<ApplicationOptions>);
  
  /**
   * Main initialization method. Called from client application on DOMReady.
   */
  initialize(): void;
  
  /**
   * Application is initialized and ready. Fade in, then execute callbacks.
   */
  ready(): void;
  
  /**
   * Get zoom level for current browser
   */
  getZoom(): void;
  
  /**
   * Calculate zoom for Chrome browser
   * @param dimsChanged Whether dimensions have changed
   */
  zoomCalculateChrome(dimsChanged: boolean): void;
  
  /**
   * Calculate zoom for Safari browser
   */
  zoomCalculateSafari(): void;
  
  /**
   * Update zoom level
   * @param dimsChanged Whether dimensions have changed
   * @param dprDelta Device pixel ratio delta
   */
  updateZoom(dimsChanged?: boolean, dprDelta?: number): void;
  
  /**
   * Fade in application, as declared in the faderOpts
   */
  fadeIn(): void;
  
  /**
   * Register callbacks by type
   * @param type Event type
   * @param callback Callback function
   */
  registerCallback(type: string, callback: (app: Application) => void): void;
  
  /**
   * Execute callbacks by type
   * @param type Event type
   */
  executeCallbacks(type: string): void;
  
  /**
   * Set section from data-script attribute on body
   */
  setSection(): void;
  
  /**
   * Check if document is scrolled
   */
  isScrolled(): boolean;
  
  /**
   * Locks body scroll
   * @param extraPaddedElements Additional elements to add padding to
   */
  scrollLock(extraPaddedElements?: Element[]): void;
  
  /**
   * Releases body scroll
   * @param defaultOverflow Default overflow value after release
   */
  scrollRelease(defaultOverflow?: string): void;
  
  /**
   * Scroll to a target element or position
   * @param target Element or position to scroll to
   * @param time Duration of scroll animation
   * @param emitEvents Whether to emit events
   * @param ease Easing function
   */
  scrollTo(target: string | HTMLElement | Record<string, any>, time?: number, emitEvents?: boolean, ease?: string): void;
  
  /**
   * Hard scroll to top without animation
   */
  hardScrollToTop(): void;
  
  /**
   * Hard scroll to element without animation
   * @param target Element to scroll to
   */
  hardScrollTo(target: string | HTMLElement): void;
  
  /**
   * Prevent scrolling
   * @param e Event object
   */
  scrollVoid(e: Event): void;
  
  /**
   * Get current scrollbar width
   */
  getCurrentScrollBarWidth(): number;
  
  /**
   * Get scrollbar width by force
   */
  getScrollBarWidth(): void;
  
  /**
   * Apply browser-specific hacks
   */
  hacks(): void;
  
  /**
   * Get iOS current inner height
   */
  getIOSCurrentInnerHeight(): number;
  
  /**
   * Get iOS max inner height
   */
  getIOSInnerHeightMax(): number;
  
  /**
   * Emit before initialized event
   */
  _emitBeforeInitializedEvent(): void;
  
  /**
   * Emit initialized event
   */
  _emitInitializedEvent(): void;
  
  /**
   * Emit ready event
   */
  _emitReadyEvent(): void;
  
  /**
   * Emit revealed event
   */
  _emitRevealedEvent(): void;
  
  /**
   * Get base viewport width
   */
  _getBaseVW(): string;
  
  /**
   * Set dimensions
   */
  setDims(): void;
  
  /**
   * Set font base viewport width
   */
  setFontBaseVw(): void;
  
  /**
   * Set zoom level CSS var
   */
  setZoom(): void;
  
  /**
   * Set viewport height
   */
  setvh100(): void;
  
  /**
   * Set viewport width
   */
  setvw100(): void;
  
  /**
   * Set max viewport height
   */
  setvh100Max(): void;
  
  /**
   * Set scroll height
   */
  setScrollHeight(): void;
  
  /**
   * Handle breakpoint change
   */
  onBreakpointChanged(): void;
  
  /**
   * Handle resize event
   * @param e Event object
   */
  onResize(e?: Event): void;
  
  /**
   * Handle scroll event
   * @param e Event object
   */
  onScroll(e?: Event): void;
  
  /**
   * Handle visibility change
   * @param e Event object
   */
  onVisibilityChange(e?: Event): void;
  
  /**
   * Poll for element to appear in DOM
   * @param selector Element selector
   * @param time Polling interval
   * @param callback Callback when element found
   */
  pollForElement(selector: string, time?: number, callback?: (el: Element) => void): void;
  
  /**
   * Poll for variable to be truthy
   * @param variable Variable to check
   * @param time Polling interval
   * @param callback Callback when variable is truthy
   */
  pollForVar(variable: any, time?: number, callback?: (variable: any) => void): void;
  
  /**
   * Setup debug tools
   */
  setupDebug(): void;
  
  /**
   * Toggle debug state
   */
  toggleDebug(): void;
  
  /**
   * Setup grid overlay (CTRL+G)
   */
  setupGridoverlay(): void;
  
  /**
   * Add additional focusable selectors
   * @param extraSelectors Additional selectors
   */
  addFocusableSelectors(extraSelectors: string[]): void;
  
  /**
   * Set focusable selectors
   * @param selectors Selectors to set
   */
  setFocusableSelectors(selectors: string[]): void;
  
  /**
   * Get focusable selectors as comma-separated string
   */
  getFocusableSelectors(): string;
}
